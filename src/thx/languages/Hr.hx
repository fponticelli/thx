package thx.languages;

import thx.culture.Language;

class Hr extends Language {
	function new() {
		name = "hr";
		english = "Croatian";
		native = "hrvatski";
		iso2 = "hr";
		iso3 = "hrv";
		pluralRule = 7;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Hr(); return language; }
	static function __init__() { getLanguage(); }
}