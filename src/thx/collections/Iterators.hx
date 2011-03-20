/**
 * ...
 * @author Franco Ponticelli
 */

package thx.collections;

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
}