package thx.languages;

import thx.culture.Language;

class Lt extends Language {
	function new() {
		name = "lt";
		english = "Lithuanian";
		native = "lietuvių";
		iso2 = "lt";
		iso3 = "lit";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Lt(); return language; }
	static function __init__() { getLanguage(); }
}