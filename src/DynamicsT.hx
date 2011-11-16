/**
 * ...
 * @author Franco Ponticelli
 */

class DynamicsT
{
	public static function toHash<T>(ob : Dynamic<T>) : Hash<T>
	{
		var hash = new Hash();
		return copyToHash(ob, hash);
	}
	
	public static function copyToHash<T>(ob : Dynamic<T>, hash : Hash<T>) : Hash<T>
	{
		for (field in Reflect.fields(ob))
			hash.set(field, Reflect.field(ob, field));
		return hash;
	}
}