package thx.languages;

import thx.culture.Language;

class He extends Language {
	function new() {
		name = "he";
		english = "Hebrew";
		native = "עברית";
		iso2 = "he";
		iso3 = "heb";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new He(); return language; }
	static function __init__() { getLanguage(); }
}