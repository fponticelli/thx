package thx.languages;

import thx.culture.Language;

class Sv extends Language {
	function new() {
		name = "sv";
		english = "Swedish";
		native = "svenska";
		iso2 = "sv";
		iso3 = "swe";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sv(); return language; }
	static function __init__() { getLanguage(); }
}