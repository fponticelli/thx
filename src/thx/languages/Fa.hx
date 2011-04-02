package thx.languages;

import thx.culture.Language;

class Fa extends Language {
	function new() {
		name = "fa";
		english = "Persian";
		native = "فارسى";
		iso2 = "fa";
		iso3 = "fas";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Fa(); return language; }
	static function __init__() { getLanguage(); }
}