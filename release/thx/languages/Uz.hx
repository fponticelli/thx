package thx.languages;

import thx.culture.Language;

class Uz extends Language {
	function new() {
		name = "uz";
		english = "Uzbek";
		native = "U'zbek";
		iso2 = "uz";
		iso3 = "uzb";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Uz(); return language; }
	static function __init__() { getLanguage(); }
}