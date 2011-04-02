package thx.languages;

import thx.culture.Language;

class Bg extends Language {
	function new() {
		name = "bg";
		english = "Bulgarian";
		native = "български";
		iso2 = "bg";
		iso3 = "bul";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Bg(); return language; }
	static function __init__() { getLanguage(); }
}