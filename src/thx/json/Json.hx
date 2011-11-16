package thx.json;

import thx.data.ValueEncoder;
import thx.data.ValueHandler;

class Json
{
	static var nativeEncoder : Dynamic -> String;
	static var nativeDecoder : String -> Dynamic;
	public static function encode<T>(value : T)
	{
		if (null != nativeEncoder)
			return nativeEncoder(value);
		var handler = new JsonEncoder();
		new ValueEncoder(handler).encode(value);
		return handler.encodedString;
	}
	
	public static function decode<T>(value : String) : T
	{
		if (null != nativeDecoder)
			return nativeDecoder(value);
		var handler = new ValueHandler();
		var r = new JsonDecoder(handler).decode(value);
		return handler.value;
	}
	
	static function __init__()
	{
#if js
		var JSON;
		if (null != (JSON = untyped __js__("JSON")))
		{
			nativeDecoder = JSON.parse;
			nativeEncoder = JSON.stringify;
		}
#end
	}
}