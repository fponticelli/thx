package thx.cultures;

import thx.culture.Culture;

class TrTR extends Culture {
	function new() {
		language = thx.languages.Tr.language;
		name = "tr-TR";
		english = "Turkish (Turkey)";
		native = "Türkçe (Türkiye)";
		date = new thx.culture.core.DateTimeInfo(
			["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", ""],
			["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara", ""],
			["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
			["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
			["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
			null,
			null,
			".",
			":",
			1,
			"%B %Y",
			"%d %B",
			"%d %B %Y %A",
			"%d.%m.%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%d %B %Y %A %H:%M:%S",
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
		percent = new thx.culture.core.NumberInfo(2, ",", [3], ".", "-%n", "%n");
		pluralRule = 0;
		englishCurrency = "Turkish Lira";
		nativeCurrency = "Türk Lirası";
		currencySymbol = "TL";
		currencyIso = "TRY";
		englishRegion = "Turkey";
		nativeRegion = "Türkiye";
		iso2 = "TR";
		iso3 = "TUR";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new TrTR(); return culture; }
	static function __init__() { getCulture(); }
}