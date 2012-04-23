package thx.languages;

import thx.culture.Language;

class Gu extends Language {
	function new() {
		name = "gu";
		english = "Gujarati";
		native = "ગુજરાતી";
		iso2 = "gu";
		iso3 = "guj";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Gu(); return language; }
	static function __init__() { getLanguage(); }
}