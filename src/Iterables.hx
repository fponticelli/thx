/**
 * ...
 * @author Franco Ponticelli
 */

class Iterables
{

	inline public static function indexOf<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return Iterators.indexOf(it.iterator(), v, f);
	}
	
	inline public static function contains<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return Iterators.contains(it.iterator(), v, f);
	}
	
	inline public static function array<T>(it : Iterable<T>) : Array<T>
	{
		return Iterators.array(it.iterator());
	}
	
	inline public static function map<TIn,TOut>(it : Iterable<TIn>, f : TIn -> Int -> TOut) : Array<TOut>
	{
		return Iterators.map(it.iterator(), f);
	}
	
	inline public static function each<T>(it : Iterable<T>, f : T -> Int -> Void) : Void
	{
		return Iterators.each(it.iterator(), f);
	}
	
	inline public static function reduce<TIn,TOut>(it : Iterable<TIn>, f : TOut -> TIn -> Int -> TOut, initialValue : TOut) : TOut
	{
		return Iterators.reduce(it.iterator(), f, initialValue);
	}
	
	inline public static function random<T>(it : Iterable<T>) : T
	{
		return Arrays.random(Iterables.array(it));
	}
	
	inline public static function any<T>(it : Iterable<T>, f : T -> Bool) : Bool
	{
		return Iterators.any(it.iterator(), f);
	}
	
	inline public static function all<T>(it : Iterable<T>, f : T -> Bool) : Bool
	{
		return Iterators.all(it.iterator(), f);
	}
}