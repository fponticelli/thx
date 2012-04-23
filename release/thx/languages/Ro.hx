package thx.languages;

import thx.culture.Language;

class Ro extends Language {
	function new() {
		name = "ro";
		english = "Romanian";
		native = "română";
		iso2 = "ro";
		iso3 = "ron";
		pluralRule = 5;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ro(); return language; }
	static function __init__() { getLanguage(); }
}