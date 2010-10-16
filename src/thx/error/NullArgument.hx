/**
 * ...
 * @author Franco Ponticelli
 */

package thx.error;
import haxe.PosInfos;

class NullArgument extends Error
{
	public function new(argumentName : String, ?posInfo : PosInfos)
	{
		super("invalid null argument '{0}'", argumentName, posInfo);
	}
	
	public static inline function throwIfNull(value : Dynamic, name : String, ?posInfo : PosInfos)
	{
		if (null == value)
			throw new NullArgument(name, posInfo);
	}
/*
@:macro public static function throwIfNull(value : Expr) : Expr
{   
	var name = null;
	trace(value);
	switch(value.expr) 
	{
		case EConst(c):
			switch(c)
			{
				case CType(s), CIdent(s):
					name = s;
				default:
					throw "argument must be an identifier";
			}               
		default:
			throw "argument must be an identifier";
	};
	
	var econd = { expr : EBinop(OpEq, { expr : EConst(CIdent("null")), pos : value.pos }, value), pos : value.pos };
	var eif = {
		expr : EThrow(
			{
				expr : ENew({
					pack   : ["thx", "error"],
					name   : "Error",
					params : [],
					sub    : null 
				}, [{
					expr : EConst(CString("invalid null argument '{0}'")),
					pos  : value.pos
				}, {
					expr : EConst(CIdent("null")),
					pos  : value.pos
				}, {
					expr : EConst(CString(name)),
					pos  : value.pos
				}//, {
				//	expr : EObjectDecl([         
				//		{ field : "fileName", expr : { expr : , pos : value.pos } },String;
				//		var lineNumber : Int;
				//		var className : String;
				//		var methodName : String;
				//		var customParams : Array<Dynamic>;  
				//	]),
				//	pos  : value.pos
				//}
				, {
					expr : EConst(CIdent("null")),
					pos  : value.pos
				}]),
				pos : value.pos  
			}
		),
		pos : value.pos
	};
	return eif;
	var expr = EIf(econd, eif, null);
	return { expr : expr, pos : value.pos };
}
*/
}