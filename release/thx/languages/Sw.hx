package thx.languages;

import thx.culture.Language;

class Sw extends Language {
	function new() {
		name = "sw";
		english = "Kiswahili";
		native = "Kiswahili";
		iso2 = "sw";
		iso3 = "swa";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sw(); return language; }
	static function __init__() { getLanguage(); }
}