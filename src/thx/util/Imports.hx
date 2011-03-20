/**
 * ...
 * @author Franco Ponticelli
 */

package thx.util;
import haxe.macro.Context;
import haxe.macro.Expr;
//import thx.macro.Macros;

class Imports
{
	@:macro public static function pack(expr : Expr)
	{
		switch(expr.expr)
		{
			case EConst(c):
				switch(c)
				{
					case CString(s):
						haxe.macro.Compiler.include(s);
					default:
						Context.error("thx.util.Import.pack only accepts one string argument", expr.pos);
				}
			default:
				Context.error("thx.util.Import.pack only accepts one string argument", expr.pos);
		}
		return expr;
	}
}