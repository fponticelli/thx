package thx.languages;

import thx.culture.Language;

class Te extends Language {
	function new() {
		name = "te";
		english = "Telugu";
		native = "తెలుగు";
		iso2 = "te";
		iso3 = "tel";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Te(); return language; }
	static function __init__() { getLanguage(); }
}