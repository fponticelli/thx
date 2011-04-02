package thx.languages;

import thx.culture.Language;

class It extends Language {
	function new() {
		name = "it";
		english = "Italian";
		native = "italiano";
		iso2 = "it";
		iso3 = "ita";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new It(); return language; }
	static function __init__() { getLanguage(); }
}