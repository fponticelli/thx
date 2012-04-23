package thx.languages;

import thx.culture.Language;

class Is extends Language {
	function new() {
		name = "is";
		english = "Icelandic";
		native = "íslenska";
		iso2 = "is";
		iso3 = "isl";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Is(); return language; }
	static function __init__() { getLanguage(); }
}