package thx.cultures;

import thx.culture.Culture;

class RoRO extends Culture {
	function new() {
		language = thx.languages.Ro.language;
		name = "ro-RO";
		english = "Romanian (Romania)";
		native = "română (România)";
		date = new thx.culture.core.DateTimeInfo(
			["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie", ""],
			["ian.", "feb.", "mar.", "apr.", "mai.", "iun.", "iul.", "aug.", "sep.", "oct.", "nov.", "dec.", ""],
			["duminică", "luni", "marţi", "miercuri", "joi", "vineri", "sâmbătă"],
			["D", "L", "Ma", "Mi", "J", "V", "S"],
			["D", "L", "Ma", "Mi", "J", "V", "S"],
			null,
			null,
			".",
			":",
			1,
			"%B %Y",
			"%e %B",
			"%e %B %Y",
			"%d.%m.%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%e %B %Y %H:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%H:%M:%S",
			"%H:%M");
		symbolNaN = "NaN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-Infinity";
		symbolPosInf = "Infinity";
		number = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n $", "n $");
		percent = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-n%", "n%");
		pluralRule = 5;
		englishCurrency = "Romanian Leu";
		nativeCurrency = "Leu";
		currencySymbol = "lei";
		currencyIso = "ROL";
		englishRegion = "Romania";
		nativeRegion = "România";
		iso2 = "RO";
		iso3 = "ROU";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new RoRO(); return culture; }
	static function __init__() { getCulture(); }
}