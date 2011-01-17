package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

class UDynamic 
{
	public static function toHash(ob : Dynamic) : Hash<Dynamic>
	{
		var hash = new Hash();
		for (field in Reflect.fields(ob))
			hash.set(field, Reflect.field(ob, field));
		return hash;
	}
}