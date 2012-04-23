package thx.languages;

import thx.culture.Language;

class Ja extends Language {
	function new() {
		name = "ja";
		english = "Japanese";
		native = "日本語";
		iso2 = "ja";
		iso3 = "jpn";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Ja(); return language; }
	static function __init__() { getLanguage(); }
}