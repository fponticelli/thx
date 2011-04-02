package thx.languages;

import thx.culture.Language;

class Pa extends Language {
	function new() {
		name = "pa";
		english = "Punjabi";
		native = "ਪੰਜਾਬੀ";
		iso2 = "pa";
		iso3 = "pan";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Pa(); return language; }
	static function __init__() { getLanguage(); }
}