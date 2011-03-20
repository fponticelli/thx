/**
 * ...
 * @author Franco Ponticelli
 */

package thx.collections;

class Iterables
{

	public static function indexOf<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return Iterators.indexOf(it.iterator(), v, f);
	}
	
	public static function contains<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return Iterators.contains(it.iterator(), v, f);
	}
	
	public static function array<T>(it : Iterable<T>) : Array<T>
	{
		return Iterators.array(it.iterator());
	}
}