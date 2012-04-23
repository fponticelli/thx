package thx.languages;

import thx.culture.Language;

class Pl extends Language {
	function new() {
		name = "pl";
		english = "Polish";
		native = "polski";
		iso2 = "pl";
		iso3 = "pol";
		pluralRule = 9;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Pl(); return language; }
	static function __init__() { getLanguage(); }
}