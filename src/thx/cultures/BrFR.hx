package thx.cultures;

import thx.culture.Culture;

class BrFR extends Culture {
	function new() {
		name = "br-FR";
		english = "Breton (France)";
		native = "brezhoneg (Frañs)";
		date = new thx.culture.core.DateTimeInfo(
			["Genver", "C'hwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu", ""],
			["Gen.", "C'hwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kzu", ""],
			["Sul", "Lun", "Meurzh", "Merc'her", "Yaou", "Gwener", "Sadorn"],
			["Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad."],
			["Su", "Lu", "Mz", "Mc", "Ya", "Gw", "Sa"],
			null,
			null,
			"/",
			":",
			1,
			"%B %Y",
			"%B %d",
			"%A %e %B %Y",
			"%d/%m/%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%A %e %B %Y %H:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%H:%M:%S",
			"%H:%M:%S");
		symbolNaN = "NkN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-Anfin";
		symbolPosInf = "+Anfin";
		number = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n $", "n $");
		percent = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n %", "n %");
		englishCurrency = "Euro";
		nativeCurrency = "euro";
		currencySymbol = "€";
		currencyIso = "EUR";
		englishRegion = "France";
		nativeRegion = "Frañs";
		iso2 = "FR";
		iso3 = "FRA";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new BrFR(); return culture; }
}