package thx.text.json;

import thx.data.DataExpr;
import thx.data.Data;

class Json
{
	public static function encode(value : DataExpr)
	{
		return new JsonEncoder().encode(value);
	}
	
	public static function decode(value : String)
	{
		return new JsonDecoder().decode(value);
	}
	
	public static function encodeObject(o : Dynamic)
	{
		return encode(Data.toConfigExpr(o));
	}
	
	public static function decodeObject(s : String)
	{
		return Data.toDynamic(decode(s));
	}
}