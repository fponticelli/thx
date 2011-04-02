package thx.languages;

import thx.culture.Language;

class Pt extends Language {
	function new() {
		name = "pt";
		english = "Portuguese";
		native = "Português";
		iso2 = "pt";
		iso3 = "por";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Pt(); return language; }
	static function __init__() { getLanguage(); }
}