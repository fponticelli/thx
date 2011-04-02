package thx.data;

/**
 * ...
 * @author Franco Ponticelli
 */

enum DataExpr
{
	CEObject(o : Array<CEPair>);
	CEArray(a : Array<DataExpr>);
	CEString(s : String);
	CEFloat(f : Float);
	CEInt(i : Int);
	CEDate(s : String);
	CEBool(b : Bool);
	CENull;
}

typedef CEPair = {
	k : String,
	v : DataExpr
}