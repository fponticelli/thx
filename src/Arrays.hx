/**
 * ...
 * @author Franco Ponticelli
 */

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
}