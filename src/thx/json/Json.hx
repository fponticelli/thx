package thx.json;

import thx.data.ValueEncoder;
import thx.data.ValueHandler;

class Json
{
	public static function encode(value : Dynamic)
	{
		var handler = new JsonEncoder();
		new ValueEncoder(handler).encode(value);
		return handler.encodedString;
	}
	
	public static function decode(value : String)
	{
		var handler = new ValueHandler();
		var r = new JsonDecoder(handler).decode(value);
		return handler.value;
	}
}