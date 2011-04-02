package thx.languages;

import thx.culture.Language;

class Sq extends Language {
	function new() {
		name = "sq";
		english = "Albanian";
		native = "shqipe";
		iso2 = "sq";
		iso3 = "sqi";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sq(); return language; }
	static function __init__() { getLanguage(); }
}