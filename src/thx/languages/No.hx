package thx.languages;

import thx.culture.Language;

class No extends Language {
	function new() {
		name = "no";
		english = "Norwegian";
		native = "norsk";
		iso2 = "no";
		iso3 = "nor";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new No(); return language; }
	static function __init__() { getLanguage(); }
}