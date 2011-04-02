package thx.languages;

import thx.culture.Language;

class En extends Language {
	function new() {
		name = "en";
		english = "English";
		native = "English";
		iso2 = "en";
		iso3 = "eng";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new En(); return language; }
	static function __init__() { getLanguage(); }
}