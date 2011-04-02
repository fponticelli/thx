package thx.languages;

import thx.culture.Language;

class Fr extends Language {
	function new() {
		name = "fr";
		english = "French";
		native = "français";
		iso2 = "fr";
		iso3 = "fra";
		pluralRule = 2;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Fr(); return language; }
	static function __init__() { getLanguage(); }
}