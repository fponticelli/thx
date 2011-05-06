package thx.json;

import thx.data.ValueEncoder;
import thx.data.ValueHandler;

class Json
{
	public static function encode<T>(value : T)
	{
		var handler = new JsonEncoder();
		new ValueEncoder(handler).encode(value);
		return handler.encodedString;
	}
	
	public static function decode<T>(value : String) : T
	{
		var handler = new ValueHandler();
		var r = new JsonDecoder(handler).decode(value);
		return handler.value;
	}
}