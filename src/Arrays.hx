/**
 * ...
 * @author Franco Ponticelli
 */
import thx.culture.Culture;
import thx.culture.FormatParams;

class Arrays
{
	public static function pushIf<T>(arr : Array<T>, ?condition : Bool, value : Null<T>) : Array<T>
	{
		if (null != condition)
		{
			if(condition)
				arr.push(value);
		} else if (null != value)
			arr.push(value);
		return arr;
	}
	
	public static function pushR<T>(arr : Array<T>, value : T) : Array<T>
	{
		arr.push(value);
		return arr;
	}
	
	public static function removeR<T>(arr : Array<T>, value : T) : Array<T>
	{
		arr.remove(value);
		return arr;
	}
	
	public static function filter<T>(arr : Array<T>, f : T -> Bool) : Array<T>
	{
		var result = [];
		for (i in arr)
			if (f(i))
				result.push(i);
		return result;
	}

	public static function min<T>(arr : Array<T>, ?f : T -> Float) : Null<T>
	{
		if (arr.length == 0)
			return null;
		if (null == f) {
			var a = arr[0], p = 0;
			for(i in 0...arr.length) if(Reflect.compare(a, arr[i]) > 0) a = arr[p = i];
			return arr[p];
		} else {
			var a = f(arr[0]), p = 0, b;
			for(i in 0...arr.length) if(a > (b = f(arr[i]))) { a = b; p = i; }
			return arr[p];
		}
	}
	
	public static function max<T>(arr : Array<T>, ?f : T -> Float) : Null<T>
	{
		if (arr.length == 0)
			return null;
		if (null == f) {
			var a = arr[0], p = 0;
			for(i in 0...arr.length) if(Reflect.compare(a, arr[i]) < 0) a = arr[p = i];
			return arr[p];
		} else {
			var a = f(arr[0]), p = 0, b;
			for(i in 0...arr.length) if(a < (b = f(arr[i]))) { a = b; p = i; }
			return arr[p];
		}
	}
	
	public static function flatten<T>(arr : Array<Array<T>>) : Array<T>
	{
		var r = [];
		for (v in arr)
			r = r.concat(v);
		return r;
	}
	
	public static function map<TIn,TOut>(arr : Array<TIn>, f : TIn -> Int -> TOut) : Array<TOut>
	{
		#if js
		return untyped arr.map(f);
		#else
		return Iterables.map(arr, f);
		#end
	}
	
	inline public static function order<T>(arr : Array<T>, ?f : T -> T -> Int)
	{
		arr.sort(null == f ? Reflect.compare : f);
		return arr;
	}
	
	public static function split<T>(arr : Array<T>, ?f : T -> Int -> Bool) : Array<Array<T>>
	{
		if (null == f) f = function(v, _) return v == null;
		var arrays = [], i = -1, values = [], value;
		for(i in 0...arr.length)
		{
			if (f(value = arr[i], i))
				values = [];
			else {
				if (values.length == 0) arrays.push(values);
				values.push(value);
			}
		}
		return arrays;
	}
	
	public static function exists<T>(arr : Array<T>, ?value : T, ?f : T -> Bool)
	{
		if (null != f)
		{
			for (v in arr)
				if (f(v))
					return true;
		} else {
			for (v in arr)
				if (v == value)
					return true;
		}
		return false;
	}
	
	public static function format(v : Array<Dynamic>, ?param : String, ?params : Array<String>, ?culture : Culture)
	{
		params = FormatParams.params(param, params, 'J');
		var format = params.shift();
		switch(format)
		{
			case 'J':
				
				
				if (v.length == 0)
				{
					var empty = null == params[1] ? '[]' : params[1];
					return empty;
				}
				
				var sep = null == params[2] ? ', ' : params[2];
				var max : Null<Int> = params[3] == null ? null : ('' == params[3] ? null : Std.parseInt(params[3]));
				if (null != max && max < v.length)
				{
					var elipsis = null == params[4] ? ' ...' : params[4];
					return Arrays.map(v.copy().splice(0, max), function(d, i) return Dynamics.format(d, params[0], culture)).join(sep) + elipsis;
				} else
					return Arrays.map(v, function(d, i) return Dynamics.format(d, params[0], culture)).join(sep);
			case 'C':
				return Ints.format(v.length, 'I', [], culture);
			default:
				throw "Unsupported array format: " + format;
		}
	}
	
	public static function formatf(?param : String, ?params : Array<String>, ?culture : Culture)
	{
		params = FormatParams.params(param, params, 'J');
		var format = params.shift();
		switch(format)
		{
			case 'J':
				return function(v : Array<Dynamic>)
				{
					if (v.length == 0)
					{
						var empty = null == params[1] ? '[]' : params[1];
						return empty;
					}
					
					var sep = null == params[2] ? ', ' : params[2];
					var max : Null<Int> = params[3] == null ? null : ('' == params[3] ? null : Std.parseInt(params[3]));
					if (null != max && max < v.length)
					{
						var elipsis = null == params[4] ? ' ...' : params[4];
						return Arrays.map(v.copy().splice(0, max), function(d, i) return Dynamics.format(d, params[0], culture)).join(sep) + elipsis;
					} else
						return Arrays.map(v, function(d, i) return Dynamics.format(d, params[0], culture)).join(sep);
				}
			case 'C':
				var f = Ints.formatf('I', [], culture);
				return function(v) return f(v.length);
			default:
				throw "Unsupported array format: " + format;
		}
	}
	
	public static function interpolate(v : Float, a : Array<Float>, b : Array<Float>, ?interpolator : Float -> Float) : Array<Float>
	{
		return interpolatef(a, b, interpolator)(v);
	}
	
	public static function interpolatef(a : Array<Float>, b : Array<Float>, ?interpolator : Float -> Float)
	{
		var functions = [],
			i = 0,
			min = Ints.min(a.length, b.length);
			
		while (i < min)
		{
			if (a[i] == b[i])
			{
				var v = b[i];
				functions.push(function(_) return v);
			} else
				functions.push(Floats.interpolatef(a[i], b[i], interpolator));
			i++;
		}
		while (i < b.length)
		{
			var v = b[i];
			functions.push(function(_) return v);
			i++;
		}
		return function(t) return Arrays.map(functions, function(f, _) return f(t));
	}
	
	public static function interpolateStrings(v : Float, a : Array<String>, b : Array<String>, ?interpolator : Float -> Float) : Array<String>
	{
		return interpolateStringsf(a, b, interpolator)(v);
	}
	
	public static function interpolateStringsf(a : Array<String>, b : Array<String>, ?interpolator : Float -> Float)
	{
		var functions = [],
			i = 0,
			min = Ints.min(a.length, b.length);
			
		while (i < min)
		{
			if (a[i] == b[i])
			{
				var v = b[i];
				functions.push(function(_) return v);
			} else
				functions.push(Strings.interpolatef(a[i], b[i], interpolator));
			i++;
		}
		while (i < b.length)
		{
			var v = b[i];
			functions.push(function(_) return v);
			i++;
		}
		return function(t) return Arrays.map(functions, function(f, _) return f(t));
	}
	
	public static function interpolateInts(v : Float, a : Array<Int>, b : Array<Int>, ?interpolator : Float -> Float) : Array<Int>
	{
		return interpolateIntsf(a, b, interpolator)(v);
	}
	
	public static function interpolateIntsf(a : Array<Int>, b : Array<Int>, ?interpolator : Float -> Float)
	{
		var functions = [],
			i = 0,
			min = Ints.min(a.length, b.length);
			
		while (i < min)
		{
			if (a[i] == b[i])
			{
				var v = b[i];
				functions.push(function(_) return v);
			} else
				functions.push(Ints.interpolatef(a[i], b[i], interpolator));
			i++;
		}
		while (i < b.length)
		{
			var v = b[i];
			functions.push(function(_) return v);
			i++;
		}
		return function(t) return Arrays.map(functions, function(f, _) return f(t));
	}
}