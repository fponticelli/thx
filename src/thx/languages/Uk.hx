package thx.languages;

import thx.culture.Language;

class Uk extends Language {
	function new() {
		name = "uk";
		english = "Ukrainian";
		native = "україньска";
		iso2 = "uk";
		iso3 = "ukr";
		pluralRule = 7;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Uk(); return language; }
	static function __init__() { getLanguage(); }
}