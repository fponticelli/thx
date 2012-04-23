package thx.languages;

import thx.culture.Language;

class Kk extends Language {
	function new() {
		name = "kk";
		english = "Kazakh";
		native = "Қазащb";
		iso2 = "kk";
		iso3 = "kaz";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Kk(); return language; }
	static function __init__() { getLanguage(); }
}