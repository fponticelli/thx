package thx.languages;

import thx.culture.Language;

class Ta extends Language {
	function new() {
		name = "ta";
		english = "Tamil";
		native = "தமிழ்";
		iso2 = "ta";
		iso3 = "tam";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ta(); return language; }
	static function __init__() { getLanguage(); }
}