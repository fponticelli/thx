package thx.text.json;

import thx.config.ConfigExpr;
import thx.config.Configs;

class Json
{
	public static function encode(value : ConfigExpr)
	{
		return new JsonEncoder().encode(value);
	}
	
	public static function decode(value : String)
	{
		return new JsonDecoder().decode(value);
	}
	
	public static function encodeObject(o : Dynamic)
	{
		return encode(Configs.toConfigExpr(o));
	}
	
	public static function decodeObject(s : String)
	{
		return Configs.toDynamic(decode(s));
	}
}