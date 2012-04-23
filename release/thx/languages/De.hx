package thx.languages;

import thx.culture.Language;

class De extends Language {
	function new() {
		name = "de";
		english = "German";
		native = "Deutsch";
		iso2 = "de";
		iso3 = "deu";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new De(); return language; }
	static function __init__() { getLanguage(); }
}