package thx.languages;

import thx.culture.Language;

class Es extends Language {
	function new() {
		name = "es";
		english = "Spanish";
		native = "español";
		iso2 = "es";
		iso3 = "spa";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Es(); return language; }
	static function __init__() { getLanguage(); }
}