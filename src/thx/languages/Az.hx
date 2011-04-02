package thx.languages;

import thx.culture.Language;

class Az extends Language {
	function new() {
		name = "az";
		english = "Azeri";
		native = "Azərbaycan­ılı";
		iso2 = "az";
		iso3 = "aze";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Az(); return language; }
	static function __init__() { getLanguage(); }
}