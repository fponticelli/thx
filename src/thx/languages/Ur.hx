package thx.languages;

import thx.culture.Language;

class Ur extends Language {
	function new() {
		name = "ur";
		english = "Urdu";
		native = "اُردو";
		iso2 = "ur";
		iso3 = "urd";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ur(); return language; }
	static function __init__() { getLanguage(); }
}