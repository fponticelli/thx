/**
 * ...
 * @author Franco Ponticelli
 */

package thx.util;
#if macro
import haxe.macro.Context;
import haxe.macro.Expr;
#end
class MacroVersion 
{
	@:macro public static function fullVersion()
	{
		var v = getInfo().fullVersion();
		return {
			expr : ExprDef.EConst(Constant.CString(v)),
			pos : Context.currentPos()
		};
	}
#if macro
	static var info : Version;
	static var VERSION_FILE = "version";
	static function getInfo() : Version
	{
		if (null == info)
		{
			var parts = if (!neko.FileSystem.exists(VERSION_FILE))
			{
				[0, 0, 0, 0];
			} else {
				var out = [],
					t = neko.io.File.getContent(VERSION_FILE).split(".");
				for (i in 0...4)
				{
					if (null == t[i])
						out[i] = 0;
					else
						out[i] = Std.parseInt(t[i]);
				}
				out;
			}
			parts[3]++;
			info = new Version(parts[0], parts[1], parts[2], parts[3]);
			var file = neko.io.File.write(VERSION_FILE, false);
			file.writeString(parts.join("."));
			file.close();
		}
		return info;
	}
#end
}