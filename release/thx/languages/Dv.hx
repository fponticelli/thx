package thx.languages;

import thx.culture.Language;

class Dv extends Language {
	function new() {
		name = "dv";
		english = "Divehi";
		native = "ދިވެހިބަސް";
		iso2 = "dv";
		iso3 = "div";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Dv(); return language; }
	static function __init__() { getLanguage(); }
}