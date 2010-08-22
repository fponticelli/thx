/**
 * ...
 * @author Franco Ponticelli
 */

package udo.collections;

class UIterable
{

	public static function indexOf<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return UIterator.indexOf(it.iterator(), v, f);
	}
	
	public static function contains<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return UIterator.contains(it.iterator(), v, f);
	}                            
	
	public static function array<T>(it : Iterable<T>) : Array<T>
	{
		return UIterator.array(it.iterator());
	}
}