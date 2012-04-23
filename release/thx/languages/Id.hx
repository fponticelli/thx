package thx.languages;

import thx.culture.Language;

class Id extends Language {
	function new() {
		name = "id";
		english = "Indonesian";
		native = "Bahasa Indonesia";
		iso2 = "id";
		iso3 = "ind";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Id(); return language; }
	static function __init__() { getLanguage(); }
}