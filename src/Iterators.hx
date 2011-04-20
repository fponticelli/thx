/**
 * ...
 * @author Franco Ponticelli
 */

class Iterators
{
	public static function indexOf<T>(it : Iterator<T>, ?v : T, ?f : T -> Bool) : Int
	{
		if (null == f)
			f = function(v2) return v == v2;
		var c = 0;
		for (i in it)
			if(f(i))
				return c;
			else
				c++;
		return -1;
	}
	
	public static function contains < T > (it : Iterator < T > , ?v : T, ?f : T -> Bool) : Bool
	{
		if (null == f)
		f = function(v2) return v == v2;
		var c = 0;
		for (i in it)
			if(f(i))
				return true;
		return false;
	}
	
	public static function array<T>(it : Iterator<T>) : Array<T>
	{
		var result = [];
		for (v in it)
			result.push(v);
		return result;
	}
	
	public static function map<TIn,TOut>(it : Iterator<TIn>, f : TIn -> Int -> TOut) : Array<TOut>
	{
		var result = [], i = 0;
		for (v in it)
			result.push(f(v, i++));
		return result;
	}
	
	public static function each<T>(it : Iterator<T>, f : T -> Int -> Void) : Void
	{
		var i = 0;
		for (o in it)
			f(o, i++);
	}
	
	public static function reduce<TIn, TOut> (it : Iterator<TIn>, f : TOut -> TIn -> Int -> TOut, initialValue : TOut) : TOut
	{
		var accumulator = initialValue,
			i = 0;
		for (o in it)
			accumulator = f(accumulator, o, i++);
		return accumulator;
	}
	
	inline public static function random<T>(it : Iterator<T>) : T
	{
		return Arrays.random(Iterators.array(it));
	}
	
	public static function any<T>(it : Iterator<T>, f : T -> Bool) : Bool
	{
		for (v in it)
			if (f(v))
				return true;
		return false;
	}
	
	public static function all<T>(it : Iterator<T>, f : T -> Bool) : Bool
	{
		for (v in it)
			if (!f(v))
				return false;
		return true;
	}
}