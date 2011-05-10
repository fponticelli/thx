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
	
	public static function applyTo(src : { }, dest : { } )
	{
		for (field in Reflect.fields(src))
		{
			if (!Reflect.hasField(dest, field))
				continue;
			if (Reflect.isObject(Reflect.field(src, field)) && Reflect.isObject(Reflect.field(dest, field)))
				applyTo(Reflect.field(src, field), Reflect.field(dest, field))
			else
				Reflect.setField(dest, field, Reflect.field(src, field));
		}
		return dest;
	}
	
	public static function copyTo(src : { }, dest : { } )
	{
		for (field in Reflect.fields(src))
		{
			if (Reflect.isObject(Reflect.field(src, field)) && Reflect.isObject(Reflect.field(dest, field)))
				copyTo(Reflect.field(src, field), Reflect.field(dest, field))
			else
				Reflect.setField(dest, field, Reflect.field(src, field));
		}
		return dest;
	}
}

typedef Entry = { key : String, value : Dynamic };