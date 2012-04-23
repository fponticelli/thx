package thx.languages;

import thx.culture.Language;

class Sk extends Language {
	function new() {
		name = "sk";
		english = "Slovak";
		native = "slovenčina";
		iso2 = "sk";
		iso3 = "slk";
		pluralRule = 8;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sk(); return language; }
	static function __init__() { getLanguage(); }
}