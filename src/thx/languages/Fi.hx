package thx.languages;

import thx.culture.Language;

class Fi extends Language {
	function new() {
		name = "fi";
		english = "Finnish";
		native = "suomi";
		iso2 = "fi";
		iso3 = "fin";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Fi(); return language; }
	static function __init__() { getLanguage(); }
}