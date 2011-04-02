package thx.languages;

import thx.culture.Language;

class Nl extends Language {
	function new() {
		name = "nl";
		english = "Dutch";
		native = "Nederlands";
		iso2 = "nl";
		iso3 = "nld";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Nl(); return language; }
	static function __init__() { getLanguage(); }
}