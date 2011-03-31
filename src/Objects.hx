package ;

/**
 * ...
 * @author Franco Ponticelli
 */

class Objects
{

	inline public static function keys(o : { } ) : Array<String>
	{
		return Reflect.fields(o);
	}
	
	public static function values(o : { } ) : Array<Dynamic>
	{
		var arr = [];
		for (key in Reflect.fields(o))
			arr.push(Reflect.field(o, key));
		return arr;
	}
	
	public static function entries(o : { } ) : Array<Entry>
	{
		var arr = [];
		for (key in Reflect.fields(o))
			arr.push({ key : key, value : Reflect.field(o, key) });
		return arr;
	}
}

typedef Entry = { key : String, value : Dynamic };