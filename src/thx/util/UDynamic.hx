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
		return copyToHash(ob, hash);
	}
	
	public static function copyToHash(ob : Dynamic, hash : Hash<Dynamic>) : Hash<Dynamic>
	{
		for (field in Reflect.fields(ob))
			hash.set(field, Reflect.field(ob, field));
		return hash;
	}
}