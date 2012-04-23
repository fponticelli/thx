package thx.languages;

import thx.culture.Language;

class Mn extends Language {
	function new() {
		name = "mn";
		english = "Mongolian";
		native = "Монгол хэл";
		iso2 = "mn";
		iso3 = "mon";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Mn(); return language; }
	static function __init__() { getLanguage(); }
}