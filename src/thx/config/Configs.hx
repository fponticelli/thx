package thx.config;

import thx.config.ConfigExpr;
import thx.error.Error;

class Configs
{

	public static function toConfigExpr(o : Dynamic) : ConfigExpr
	{
		switch(Type.typeof(o))
		{
			case TUnknown, TEnum(_), TFunction:
				return throw new Error("unsupported type '{0}'", Std.string(o));
			case TClass(c):
				if (Std.is(o, Array))
				{
					var a : Array<Dynamic> = cast o;
					var arr = [];
					for (v in a)
						arr.push(toConfigExpr(v));
					return CEArray(arr);
				} else if (Std.is(o, Hash)) {
					var h : Hash<Dynamic> = cast o;
					var arr = [];
					for (k in h.keys())
						arr.push({ k : k, v : toConfigExpr(h.get(k)) });
					return CEObject(arr);
				}
				switch(Type.getClassName(c))
				{
					case "String":
						return CEString(o);
					case "Date":
						return CEDate(dateToString(o));
					default:
						return throw new Error("unsupported class '{0}'", c);
				}
			case TNull:
				return CENull;
			case TBool:
				return CEBool(o);
			case TInt:
				return CEInt(o);
			case TFloat:
				return CEFloat(o);
			case TObject:
				var arr = [];
				for (k in Reflect.fields(o))
					arr.push({ k : k, v : toConfigExpr(Reflect.field(o, k)) });
				return CEObject(arr);
		}
	}
	
	public static function toDynamic(ce : ConfigExpr) : Dynamic
	{
		switch(ce)
		{
			case CEObject(o):
				var obj : Dynamic = { };
				for (pair in o)
					Reflect.setField(obj, pair.k, toDynamic(pair.v));
				return obj;
			case CEArray(a):
				var arr = [];
				for (v in a)
					arr.push(toDynamic(v));
				return arr;
			case CEString(s):
				return s;
			case CEFloat(f):
				return f;
			case CEInt(i):
				return i;
			case CEDate(d):
				return stringToDate(d);
			case CEBool(b):
				return b;
			case CENull:
				return null;
		}
		return null;
	}
	
	public static function stringToDate(s : String) : Date
	{
		var parts = s.split(".");
		var d = Date.fromString(StringTools.replace(parts[0], "T", " "));
		if (parts.length == 1 || parts[1] == '0')
			return d;
		var t = d.getTime();
		t += Std.int(Std.parseFloat("0." + parts[1]) * 100);
		return Date.fromTime(t);
	}
	
	public static function dateToString(d : Date) : String
	{
		var t = d.getTime() / 1000;
		var m = ("" + (t - Std.int(t))).substr(1);
		return DateTools.format(d, "%Y-%m-%dT%H:%M:%S" + m);
	}
}