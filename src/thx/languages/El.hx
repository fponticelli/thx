package thx.languages;

import thx.culture.Language;

class El extends Language {
	function new() {
		name = "el";
		english = "Greek";
		native = "ελληνικά";
		iso2 = "el";
		iso3 = "ell";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new El(); return language; }
	static function __init__() { getLanguage(); }
}