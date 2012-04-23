package thx.languages;

import thx.culture.Language;

class Mr extends Language {
	function new() {
		name = "mr";
		english = "Marathi";
		native = "मराठी";
		iso2 = "mr";
		iso3 = "mar";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Mr(); return language; }
	static function __init__() { getLanguage(); }
}