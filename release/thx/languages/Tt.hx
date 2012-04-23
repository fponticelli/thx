package thx.languages;

import thx.culture.Language;

class Tt extends Language {
	function new() {
		name = "tt";
		english = "Tatar";
		native = "Татар";
		iso2 = "tt";
		iso3 = "tat";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Tt(); return language; }
	static function __init__() { getLanguage(); }
}