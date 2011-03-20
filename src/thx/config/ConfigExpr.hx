package thx.config;

/**
 * ...
 * @author Franco Ponticelli
 */

enum ConfigExpr
{
	CEObject(o : Array<CEPair>);
	CEArray(a : Array<ConfigExpr>);
	CEString(s : String);
	CEFloat(f : Float);
	CEInt(i : Int);
	CEDate(s : String);
	CEBool(b : Bool);
	CENull;
}

typedef CEPair = {
	k : String,
	v : ConfigExpr
}