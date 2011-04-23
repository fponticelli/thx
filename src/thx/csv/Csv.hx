package thx.csv;

import thx.data.ValueEncoder;
import thx.data.ValueHandler;
/**
 * ...
 * @author Franco Ponticelli
 */

class Csv
{
	public static function encode(value : Array<Array<Dynamic>>, ?delimiter : String, ?nulltoempty : Bool, ?newline : String)
	{
		var handler = new CsvEncoder(delimiter, nulltoempty, newline);
		new ValueEncoder(handler).encode(value);
		return handler.encodedString;
	}
	
	public static function decode(value : String) : Array<Array<Dynamic>>
	{
		var handler = new ValueHandler();
		new CsvDecoder(handler).decode(value);
		return handler.value;
	}
}