package thx.languages;

import thx.culture.Language;

class Eu extends Language {
	function new() {
		name = "eu";
		english = "Basque";
		native = "euskara";
		iso2 = "eu";
		iso3 = "eus";
		pluralRule = 1;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Eu(); return language; }
	static function __init__() { getLanguage(); }
}