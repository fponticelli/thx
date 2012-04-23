package thx.languages;

import thx.culture.Language;

class Ms extends Language {
	function new() {
		name = "ms";
		english = "Malay";
		native = "Bahasa Malaysia";
		iso2 = "ms";
		iso3 = "msa";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ms(); return language; }
	static function __init__() { getLanguage(); }
}