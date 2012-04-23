package thx.languages;

import thx.culture.Language;

class Sl extends Language {
	function new() {
		name = "sl";
		english = "Slovenian";
		native = "slovenski";
		iso2 = "sl";
		iso3 = "slv";
		pluralRule = 10;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sl(); return language; }
	static function __init__() { getLanguage(); }
}