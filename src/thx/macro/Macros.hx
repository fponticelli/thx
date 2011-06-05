package thx.macro;
import haxe.macro.Expr;
/**
 * ...
 * @author Franco Ponticelli
 */

class Macros
{
	public static function stringOfExpr(e : Expr) : String
	{
		return stringOfExprDef(e.expr);
	}
	
	public static function stringOfExprDef(exp : ExprDef) : String
	{
		return switch(exp)
		{
			case EConst(c): 			stringOfConstant(c);
			case EArray(e1, e2): 		stringOfExpr(e1) + "[" + stringOfExpr(e2) + "]";
			case EBinop(op, e1, e2): 	stringOfExpr(e1) + stringOfBinop(op) + stringOfExpr(e2);
			case EField(e, field): 		stringOfExpr(e) + "." + field;
			case EType(e, field): 		stringOfExpr(e) + "." + field;
			case EParenthesis(e): 		"(" + stringOfExpr(e) + ")";
			case EObjectDecl(fields):	wrap(fields, function(f) return f.field + ":" + stringOfExpr(f.expr), "{", "}");
			case EArrayDecl(values):	wrap(values, stringOfExpr, "[", "]");
			case ECall(e, params):		stringOfExpr(e) + wrap(params, stringOfExpr, "(", ")");
/*
			case ENew( t : TypePath, params : Array<Expr> ):
			case EUnop( op : Unop, postFix : Bool, e : Expr ):
			case EVars( vars : Array<{ name : String, type : Null<ComplexType>, expr : Null<Expr> }> ):
			case EFunction( f : Function ):
			case EBlock( exprs : Array<Expr> ):
			case EFor( v : String, it : Expr, expr : Expr ):
			case EIf( econd : Expr, eif : Expr, eelse : Null<Expr> ):
			case EWhile( econd : Expr, e : Expr, normalWhile : Bool ):
			case ESwitch( e : Expr, cases : Array<{ values : Array<Expr>, expr : Expr }>, edef : Null<Expr> ):
			case ETry( e : Expr, catches : Array<{ name : String, type : ComplexType, expr : Expr }> ):
			case EReturn( e : Null<Expr> ):
			case EBreak:
			case EContinue:
			case EUntyped( e : Expr ):
			case EThrow( e : Expr ):
			case ECast( e : Expr, t : Null<ComplexType> ):
			case EDisplay( e : Expr, isCall : Bool ):
			case EDisplayNew( t : TypePath ):
			case ETernary( econd : Expr, eif : Expr, eelse : Expr )
*/
			default:
				"ERROR";
		}
	}
	
	static function wrap<T>(elements : Array<T>, handler : T -> String, prefix = "", suffix = "", separator = ",") : String
	{
		var buf = new StringBuf();
		buf.add(prefix);
		for (i in 0...elements.length)
		{
			if (i > 0)
				buf.add(separator);
			buf.add(handler(elements[i]));
		}
		buf.add(suffix);
		return buf.toString();
	}
	
	public static function stringOfBinop(b : Binop)
	{
		return switch(b)
		{
			case OpAdd:			"+";
			case OpMult:		"*";
			case OpDiv:			"/";
			case OpSub:			"-";
			case OpAssign:		"=";
			case OpEq:			"==";
			case OpNotEq:		"!=";
			case OpGt:			">";
			case OpGte:			">=";
			case OpLt:			"<";
			case OpLte:			"<=";
			case OpAnd:			"&";
			case OpOr:			"|";
			case OpXor:			"^";
			case OpBoolAnd:		"&&";
			case OpBoolOr:		"||";
			case OpShl:			"<<";
			case OpShr:			">>";
			case OpUShr:		">>>";
			case OpMod: 		"%";
			case OpAssignOp(op):stringOfBinop(op) + "=";
			case OpInterval: 	"...";
		}
	}
	
	public static function stringOfConstant(c : Constant)
	{
		return switch(c)
		{
			case CInt(v), CFloat(v), CIdent(v), CType(v):v;
			case CString(s): "'" + StringTools.replace(s, "'", "\\'") + "'";
			case CRegexp(r, opt): "new EReg('" + StringTools.replace(r, "'", "\\'") + "')";
		}
	}
	
	public static function stringOfUnop(o : Unop)
	{
		return switch(o)
		{
			case OpIncrement:	"++";
			case OpDecrement:	"--";
			case OpNot:			"!";
			case OpNeg:			"-";
			case OpNegBits:		"~";
		}
	}
	
	public static function stringOfTypePath(t : TypePath)
	{
		var pack = t.pack.length == 0 ? "" : t.pack.join(".") + ".";
		var params = t.params.length == 0 ? "" : wrap(t.params, stringOfTypeParam, "<", ">");
		return pack + t.name + params;
	}
	
	public static function stringOfComplexType(t : ComplexType)
	{
		return switch(t)
		{
			case TPath(p): 				stringOfTypePath(p);
			case TFunction(args, ret):	wrap(args, stringOfComplexType, "", "", " -> ") + " -> " + stringOfComplexType(ret);
			case TAnonymous(fields):	wrap(fields, stringOfField, "{", "}");
			case TParent(t):			stringOfComplexType(t);
			case TExtend(p, fields):	"{>" + stringOfTypePath(p) + "," + wrap(fields, stringOfField, "", "}");
		}
	}
	
	public static function stringOfTypeParam(p : TypeParam)
	{
		return switch(p)
		{
			case TPType(t):		stringOfComplexType(t);
			case TPConst(c):	stringOfConstant(c);
		}
	}
	
	public static function stringOfTypeParams(p : Array<{ name : String, constraints : Array<ComplexType> }>)
	{
		return wrap(p, function(item) {
			return item.name + (null == item.constraints || item.constraints.length == 0 ? "" : " " + Arrays.map(item.constraints, function(d, i) return stringOfComplexType(d)).join(", ")); 
		}, "<", ">");
	}
	
	public static function stringOfFunction(f : Function)
	{
		return "function" + wrap(f.args, stringOfFunctionArg, "(", ")") + (null != f.ret ? " : " + stringOfComplexType(f.ret) : "") + stringOfExpr(f.expr);
	}
	
	public static function stringOfFunctionArg(a : FunctionArg)
	{
		return
			  (a.opt ? "?" : "")
			+ a.name
			+ (null != a.type ? " : " + stringOfComplexType(a.type) : "")
			+ (null != a.value ? " = " + stringOfExpr(a.value) : "");
	}
	
	public static function stringOfField(f : Field)
	{
		var s = "";
		for (access in f.access)
		{
			switch(access)
			{
				case APublic:
					s += "public ";
				case APrivate:
					s += "private ";
				case AStatic:
					s += "static ";
				case AOverride:
					s += "override ";
				case ADynamic:
					s += "dynamic ";
				case AInline:
					s += "inline ";
			}
		}
		return s + stringOfFieldType(f.kind, f.name) + ";";
	}
	
	public static function stringOfFieldType(f : FieldType, name : String)
	{
		return switch(f)
		{
			case FVar(t, e):
				"var " + name + " : " + stringOfComplexType(t) + (null == e ? "" : " = " + stringOfExpr(e));
			case FProp(get, set, t):
				"var " + name + "(" + get + "," + set + ") : " + stringOfComplexType(t);
			case FFun(f):
				var params = f.params.length == 0 ? "" : stringOfTypeParams(f.params);
				"function " + name + params + wrap(f.args, function(a) return (a.opt ? "?" : "") + a.name + " : " + stringOfComplexType(a.type), "(", ")") + " : " + stringOfComplexType(f.ret) + (null == f.expr ? "" : stringOfExpr(f.expr));
		}
	}
}