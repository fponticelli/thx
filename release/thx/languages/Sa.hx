package thx.languages;

import thx.culture.Language;

class Sa extends Language {
	function new() {
		name = "sa";
		english = "Sanskrit";
		native = "संस्कृत";
		iso2 = "sa";
		iso3 = "san";
		pluralRule = 4;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Sa(); return language; }
	static function __init__() { getLanguage(); }
}