package thx.languages;

import thx.culture.Language;

class Lv extends Language {
	function new() {
		name = "lv";
		english = "Latvian";
		native = "latviešu";
		iso2 = "lv";
		iso3 = "lav";
		pluralRule = 3;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Lv(); return language; }
	static function __init__() { getLanguage(); }
}