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
	
	inline public static function reduce<TIn,TOut>(it : Iterable<TIn>, f : TOut -> TIn -> Int -> TOut, initialValue : TOut) : TOut
	{
		return Iterators.reduce(it.iterator(), f, initialValue);
	}
}