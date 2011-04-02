package thx.languages;

import thx.culture.Language;

class ZhHans extends Language {
	function new() {
		name = "zh-Hans";
		english = "Chinese (Simplified)";
		native = "中文(简体)";
		iso2 = "zh";
		iso3 = "zho";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new ZhHans(); return language; }
	static function __init__() { getLanguage(); }
}