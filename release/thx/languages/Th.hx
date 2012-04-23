package thx.languages;

import thx.culture.Language;

class Th extends Language {
	function new() {
		name = "th";
		english = "Thai";
		native = "ไทย";
		iso2 = "th";
		iso3 = "tha";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Th(); return language; }
	static function __init__() { getLanguage(); }
}