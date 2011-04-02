package thx.languages;

import thx.culture.Language;

class Ka extends Language {
	function new() {
		name = "ka";
		english = "Georgian";
		native = "ქართული";
		iso2 = "ka";
		iso3 = "kat";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ka(); return language; }
	static function __init__() { getLanguage(); }
}