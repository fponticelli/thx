package thx.csv;

import thx.culture.Culture;
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
/**
 *  Parses and decodes well structured csv data.
 **/	
	public static function decode(value : String, ?check_type:Bool, ?delimiter : String,  ?emptytonull:Bool, ?newline: String, ?quote: String, ?doublequotations: Bool, ?skipwhitespace: Bool) : Array<Array<Dynamic>>
	{
		var handler = new ValueHandler();
		new CsvDecoder(handler, check_type, delimiter , emptytonull, newline, quote, doublequotations, skipwhitespace).decode(value);
		return handler.value;
	}
	


	
}