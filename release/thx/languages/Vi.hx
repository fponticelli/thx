package thx.languages;

import thx.culture.Language;

class Vi extends Language {
	function new() {
		name = "vi";
		english = "Vietnamese";
		native = "Tiếng Việt";
		iso2 = "vi";
		iso3 = "vie";
		pluralRule = 0;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Vi(); return language; }
	static function __init__() { getLanguage(); }
}