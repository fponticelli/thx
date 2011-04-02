package thx.languages;

import thx.culture.Language;

class Mk extends Language {
	function new() {
		name = "mk";
		english = "Macedonian";
		native = "македонски јазик";
		iso2 = "mk";
		iso3 = "mkd";
		pluralRule = 14;
		Language.add(this);
	}
	public static var language(getLanguage, null) : Language; static function getLanguage() { if(null == language) language = new Mk(); return language; }
	static function __init__() { getLanguage(); }
}