/**
 * ...
 * @author Franco Ponticelli
 */

import thx.color.Colors;

class Objects
{
	inline public static function field<T>(o : { }, fieldname : String, ?alt : Null<T> = null) : Null<T>
	{
		return Reflect.hasField(o, fieldname) ? Reflect.field(o, fieldname) : alt;
	}
	
	inline public static function keys(o : { } ) : Array<String>
	{
		return Reflect.fields(o);
	}
	
	public static function values(o : { } ) : Array<Dynamic>
	{
		var arr = [];
		for (key in Reflect.fields(o))
			arr.push(Reflect.field(o, key));
		return arr;
	}
	
	public static function entries(o : { } ) : Array<Entry>
	{
		var arr = [];
		for (key in Reflect.fields(o))
			arr.push({ key : key, value : Reflect.field(o, key) });
		return arr;
	}
	
	public static inline function with<T>(ob : T, f : T -> Void)
	{
		f(ob);
		return ob;
	}
	
	public static function toHash(ob : {}) : Hash<Dynamic>
	{
		var hash = new Hash();
		return copyToHash(ob, hash);
	}
	
	public static function copyToHash(ob : {}, hash : Hash<Dynamic>) : Hash<Dynamic>
	{
		for (field in Reflect.fields(ob))
			hash.set(field, Reflect.field(ob, field));
		return hash;
	}
	
	public static function interpolate<T>(v : Float, a : T, b : T, ?equation : Float -> Float) : T
	{
		return interpolatef(a, b, equation)(v);
	}
	
	public static function interpolatef<T>(a : T, b : T, ?equation : Float -> Float) : Float -> T
	{
		var i : Dynamic = { },
			c : Dynamic = { },
			keys = Reflect.fields(a);
		for (key in keys)
		{
			if (Reflect.hasField(b, key))
			{
				var va = Reflect.field(a, key);
				Reflect.setField(i, key, interpolateByName(key, va)(va, Reflect.field(b, key)));
			} else
				Reflect.setField(c, key, Reflect.field(a, key));
		}
		
		keys = Reflect.fields(b);
		for (key in keys)
		{
			if (!Reflect.hasField(a, key))
				Reflect.setField(c, key, Reflect.field(b, key));
		}
		
		return function(t) {
			for (k in Reflect.fields(i))
				Reflect.setField(c, k, Reflect.callMethod(i, Reflect.field(i, k), [t]));
			return c;
		};
	}
	
	static var _reCheckKeyIsColor = ~/color\b|\bbackground\b|\bstroke\b|\bfill\b/;
	static function interpolateByName(k : String, v : Dynamic)
	{
		return Std.is(v, String) && _reCheckKeyIsColor.match(k) ? Colors.interpolatef : Dynamics.interpolatef;
	}
	/*
	public static function applyTo(src : { }, dst : { } )
	{
		for (field in Reflect.fields(src))
		{
			if (!Reflect.hasField(dst, field))
				continue;
			if (Reflect.isObject(Reflect.field(src, field)) && Reflect.isObject(Reflect.field(dst, field)))
				applyTo(Reflect.field(src, field), Reflect.field(dst, field))
			else
				Reflect.setField(dst, field, Reflect.field(src, field));
		}
		return dst;
	}
	*/
	// @todo: add support for Array
	public static function copyTo(src : { }, dst : { } )
	{
		for (field in Reflect.fields(src))
		{
			var sv = Dynamics.clone(Reflect.field(src, field));
			var dv = Reflect.field(dst, field);
			if (Types.isAnonymous(sv) && Types.isAnonymous(dv))
			{
				copyTo(sv, dv);
			} else {
				Reflect.setField(dst, field, sv);
			}
		}
		return dst;
	}
	
	public static function clone<T>(src : T) : T
	{
		var dst = { };
		copyTo(src, dst);
		return cast dst;
	}
	
	static function _flatten(src : { }, cum : { fields : Array<String>, value : Dynamic }, arr : Array<{ fields : Array<String>, value : Dynamic }>)
	{
		for (field in Reflect.fields(src))
		{
			var clone = Objects.clone(cum);
			var v = Reflect.field(src, field);
			clone.fields.push(field);
			if (Types.isAnonymous(v))
			{
				_flatten(v, clone, arr);
			} else {
				clone.value = v;
				arr.push(clone);
			}
		}
	}
	
	public static function flatten(src : { } ) : Array<{ fields : Array<String>, value : Dynamic }>
	{
		var arr = [];
		for (field in Reflect.fields(src))
		{
			var v = Reflect.field(src, field);
			if (Types.isAnonymous(v))
			{
				var item = {
					fields : [field],
					value : null
				};
				_flatten(v, item, arr);
			} else {
				arr.push( { 
					fields : [field],
					value : v
				} );
			}
		}
		return arr;
	}
	
	public static function compare(a : { }, b : { } )
	{
		var v, fields;
		if ((v = Arrays.compare((fields = Reflect.fields(a)), Reflect.fields(b))) != 0)
			return v;
		for (field in fields)
		{
			if ((v = Dynamics.compare(Reflect.field(a, field), Reflect.field(b, field))) != 0)
				return v;
		}
		
		return 0;
	}
	
	public static function addFields(o : { }, fields : Array<String>, values : Array<Dynamic>)
	{
		for (i in 0...fields.length)
			addField(o, fields[i], values[i]); 
		return o;
	}
	
	public static function addField(o : { }, field : String, value : Dynamic)
	{
		Reflect.setField(o, field, value); 
		return o;
	}
}

typedef Entry = { key : String, value : Dynamic };