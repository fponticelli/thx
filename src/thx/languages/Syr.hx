package thx.languages;

import thx.culture.Language;

class Syr extends Language {
	function new() {
		name = "syr";
		english = "Syriac";
		native = "ܣܘܪܝܝܐ";
		iso2 = "syr";
		iso3 = "syr";
		pluralRule = 12;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Syr(); return language; }
	static function __init__() { getLanguage(); }
}