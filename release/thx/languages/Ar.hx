package thx.languages;

import thx.culture.Language;

class Ar extends Language {
	function new() {
		name = "ar";
		english = "Arabic";
		native = "العربية";
		iso2 = "ar";
		iso3 = "ara";
		pluralRule = 12;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ar(); return language; }
	static function __init__() { getLanguage(); }
}