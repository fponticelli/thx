package thx.languages;

import thx.culture.Language;

class Be extends Language {
	function new() {
		name = "be";
		english = "Belarusian";
		native = "Беларускі";
		iso2 = "be";
		iso3 = "bel";
		pluralRule = 7;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Be(); return language; }
	static function __init__() { getLanguage(); }
}