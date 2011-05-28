/**
 * ...
 * @author Franco Ponticelli
 */

package thx.error;
import haxe.PosInfos;

class NullArgument #if !macro extends Error #end
{
#if !macro
	public function new(argumentName : String, ?posInfo : PosInfos)
	{
		super("invalid null argument {0} for method {1}.{2}()", [argumentName, posInfo.className, posInfo.methodName], posInfo);
	}

#end
	@:macro public static function throwIfNull(value : haxe.macro.Expr)
	{
		var name = null;
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
		
		var cond = "if(null == " + name + ") throw new NullArgument('" + name + "')";
		
		return haxe.macro.Context.parse(cond, value.pos);
	}
}