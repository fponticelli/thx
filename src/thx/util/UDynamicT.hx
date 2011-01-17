package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

class UDynamicT 
{
	public static function toHash<T>(ob : Dynamic<T>) : Hash<T>
	{
		var hash = new Hash();
		for (field in Reflect.fields(ob))
			hash.set(field, Reflect.field(ob, field));
		return hash;
	}	
}