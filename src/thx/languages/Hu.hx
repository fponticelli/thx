package thx.languages;

import thx.culture.Language;

class Hu extends Language {
	function new() {
		name = "hu";
		english = "Hungarian";
		native = "magyar";
		iso2 = "hu";
		iso3 = "hun";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Hu(); return language; }
	static function __init__() { getLanguage(); }
}