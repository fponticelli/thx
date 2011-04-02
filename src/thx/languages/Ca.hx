package thx.languages;

import thx.culture.Language;

class Ca extends Language {
	function new() {
		name = "ca";
		english = "Catalan";
		native = "català";
		iso2 = "ca";
		iso3 = "cat";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ca(); return language; }
	static function __init__() { getLanguage(); }
}