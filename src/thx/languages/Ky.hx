package thx.languages;

import thx.culture.Language;

class Ky extends Language {
	function new() {
		name = "ky";
		english = "Kyrgyz";
		native = "Кыргыз";
		iso2 = "ky";
		iso3 = "kir";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ky(); return language; }
	static function __init__() { getLanguage(); }
}