package thx.cultures;

import thx.culture.Culture;

class DaDK extends Culture {
	function new() {
		language = thx.languages.Da.language;
		name = "da-DK";
		english = "Danish (Denmark)";
		native = "dansk (Danmark)";
		date = new thx.culture.core.DateTimeInfo(
			["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december", ""],
			["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],
			["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
			["sø", "ma", "ti", "on", "to", "fr", "lø"],
			["sø", "ma", "ti", "on", "to", "fr", "lø"],
			null,
			null,
			"-",
			":",
			1,
			"%B %Y",
			"%e. %B",
			"%e. %B %Y",
			"%d-%m-%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%e. %B %Y %H:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%H:%M:%S",
			"%H:%M");
		symbolNaN = "NaN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-INF";
		symbolPosInf = "INF";
		number = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ",", [3], ".", "$ -n", "$ n");
		percent = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n %", "n %");
		pluralRule = 1;
		englishCurrency = "Danish Krone";
		nativeCurrency = "Dansk krone";
		currencySymbol = "kr";
		currencyIso = "DKK";
		englishRegion = "Denmark";
		nativeRegion = "Danmark";
		iso2 = "DK";
		iso3 = "DNK";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new DaDK(); return culture; }
	static function __init__() { getCulture(); }
}