/**
 * ...
 * @author Franco Ponticelli
 */

package udo.util;

class UValue
{

	public static inline function alt<T>(v : Null<T>, alternative : T) : T
	{
		return (null == v ? alternative : v);
	}
	
}