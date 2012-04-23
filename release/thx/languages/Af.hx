package thx.languages;

import thx.culture.Language;

class Af extends Language {
	function new() {
		name = "af";
		english = "Afrikaans";
		native = "Afrikaans";
		iso2 = "af";
		iso3 = "afr";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Af(); return language; }
	static function __init__() { getLanguage(); }
}