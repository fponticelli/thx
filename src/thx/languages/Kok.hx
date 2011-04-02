package thx.languages;

import thx.culture.Language;

class Kok extends Language {
	function new() {
		name = "kok";
		english = "Konkani";
		native = "कोंकणी";
		iso2 = "kok";
		iso3 = "kok";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Kok(); return language; }
	static function __init__() { getLanguage(); }
}