package thx.languages;

import thx.culture.Language;

class Hi extends Language {
	function new() {
		name = "hi";
		english = "Hindi";
		native = "हिंदी";
		iso2 = "hi";
		iso3 = "hin";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Hi(); return language; }
	static function __init__() { getLanguage(); }
}