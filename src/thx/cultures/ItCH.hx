package thx.cultures;

import thx.culture.Culture;

class ItCH extends Culture {
	function new() {
		language = thx.languages.It.language;
		name = "it-CH";
		english = "Italian (Switzerland)";
		native = "italiano (Svizzera)";
		date = new thx.culture.core.DateTimeInfo(
			["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],
			["gen", "feb", "mar", "apr", "mag", "gio", "lug", "ago", "set", "ott", "nov", "dic", ""],
			["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
			["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
			["do", "lu", "ma", "me", "gi", "ve", "sa"],
			null,
			null,
			".",
			":",
			1,
			"%B %Y",
			"%e. %B",
			"%A, %e. %B %Y",
			"%d.%m.%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%A, %e. %B %Y %H:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%H:%M:%S",
			"%H:%M");
		symbolNaN = "Non un numero reale";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-Infinito";
		symbolPosInf = "+Infinito";
		number = new thx.culture.core.NumberInfo(2, ".", [3], "'", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ".", [3], "'", "$-n", "$ n");
		percent = new thx.culture.core.NumberInfo(2, ".", [3], "'", "-n%", "n%");
		pluralRule = 1;
		englishCurrency = "Swiss Franc";
		nativeCurrency = "Franco svizzero";
		currencySymbol = "SFr.";
		currencyIso = "CHF";
		englishRegion = "Switzerland";
		nativeRegion = "Svizzera";
		iso2 = "CH";
		iso3 = "CHE";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new ItCH(); return culture; }
	static function __init__() { getCulture(); }
}