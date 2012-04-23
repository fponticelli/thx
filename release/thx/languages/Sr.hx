package thx.languages;

import thx.culture.Language;

class Sr extends Language {
	function new() {
		name = "sr";
		english = "Serbian";
		native = "srpski";
		iso2 = "sr";
		iso3 = "srp";
		pluralRule = 7;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sr(); return language; }
	static function __init__() { getLanguage(); }
}