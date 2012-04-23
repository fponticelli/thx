package thx.languages;

import thx.culture.Language;

class Fo extends Language {
	function new() {
		name = "fo";
		english = "Faroese";
		native = "føroyskt";
		iso2 = "fo";
		iso3 = "fao";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Fo(); return language; }
	static function __init__() { getLanguage(); }
}