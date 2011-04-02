package thx.languages;

import thx.culture.Language;

class ZhHant extends Language {
	function new() {
		name = "zh-Hant";
		english = "Chinese (Traditional)";
		native = "中文(繁體)";
		iso2 = "zh";
		iso3 = "zho";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new ZhHant(); return language; }
	static function __init__() { getLanguage(); }
}