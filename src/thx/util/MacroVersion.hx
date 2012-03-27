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
	@:macro public static function currentVersion()
	{
		return expr(getInfo());
	}

	@:macro public static function incrementBuildVersion()
	{
		incrementBuild();
		saveInfo();
		return expr(getInfo());
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
			info = new Version(parts[0], parts[1], parts[2], parts[3]);
		}
		return info;
	}

	static function incrementBuild()
	{
		var i = getInfo();
		info = new Version(i.major, i.minor, i.maintenance, i.build + 1);
		return info;
	}

	static function saveInfo()
	{
		var info = getInfo();
		var file = neko.io.File.write(VERSION_FILE, false);
		file.writeString(info.fullVersion());
		file.close();
	}

	static function expr(ver : Version)
	{
		return {
			expr : ExprDef.EConst(Constant.CString(ver.fullVersion())),
			pos : Context.currentPos()
		};
	}
#end
}