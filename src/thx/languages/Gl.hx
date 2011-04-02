package thx.languages;

import thx.culture.Language;

class Gl extends Language {
	function new() {
		name = "gl";
		english = "Galician";
		native = "galego";
		iso2 = "gl";
		iso3 = "glg";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Gl(); return language; }
	static function __init__() { getLanguage(); }
}