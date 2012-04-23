package thx.text;

class ERegs
{
	static var _escapePattern = ~/[*+?|{[()^$.# \\]/;
	public static function escapeERegChars(s : String)
	{
		return _escapePattern.customReplace(s, function(e : EReg) return "\\" + e.matched(0));
	}
}