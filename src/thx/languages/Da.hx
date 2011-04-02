package thx.languages;

import thx.culture.Language;

class Da extends Language {
	function new() {
		name = "da";
		english = "Danish";
		native = "dansk";
		iso2 = "da";
		iso3 = "dan";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Da(); return language; }
	static function __init__() { getLanguage(); }
}