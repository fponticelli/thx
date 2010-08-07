/**
 * ...
 * @author Franco Ponticelli
 */

package udo.utils;

class IterableTools
{

	public static function indexOf<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return IteratorTools.indexOf(it.iterator(), v, f);
	}
	
	public static function contains<T>(it : Iterable<T>, ?v : T, ?f : T -> Bool)
	{
		return IteratorTools.contains(it.iterator(), v, f);
	}
}