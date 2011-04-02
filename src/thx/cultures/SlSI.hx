package thx.cultures;

import thx.culture.Culture;

class SlSI extends Culture {
	function new() {
		language = thx.languages.Sl.language;
		name = "sl-SI";
		english = "Slovenian (Slovenia)";
		native = "slovenski (Slovenija)";
		date = new thx.culture.core.DateTimeInfo(
			["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december", ""],
			["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec", ""],
			["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"],
			["ned", "pon", "tor", "sre", "čet", "pet", "sob"],
			["ne", "po", "to", "sr", "če", "pe", "so"],
			null,
			null,
			".",
			":",
			1,
			"%B %Y",
			"%e. %B",
			"%e. %B %Y",
			"%e.%f.%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%e. %B %Y %k:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%k:%M:%S",
			"%k:%M");
		symbolNaN = "NaN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-neskončnost";
		symbolPosInf = "neskončnost";
		number = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n $", "n $");
		percent = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n%", "n%");
		pluralRule = 10;
		englishCurrency = "Euro";
		nativeCurrency = "Euro";
		currencySymbol = "€";
		currencyIso = "EUR";
		englishRegion = "Slovenia";
		nativeRegion = "Slovenija";
		iso2 = "SI";
		iso3 = "SVN";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new SlSI(); return culture; }
	static function __init__() { getCulture(); }
}