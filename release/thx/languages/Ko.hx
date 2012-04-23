package thx.languages;

import thx.culture.Language;

class Ko extends Language {
	function new() {
		name = "ko";
		english = "Korean";
		native = "한국어";
		iso2 = "ko";
		iso3 = "kor";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ko(); return language; }
	static function __init__() { getLanguage(); }
}