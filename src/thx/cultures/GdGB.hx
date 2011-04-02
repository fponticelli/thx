package thx.cultures;

import thx.culture.Culture;

class GdGB extends Culture {
	function new() {
		name = "gd-GB";
		english = "Scottish Gaelic (United Kingdom)";
		native = "Gàidhlig (An Rìoghachd Aonaichte)";
		date = new thx.culture.core.DateTimeInfo(
			["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd", ""],
			["Fao", "Gea", "Màr", "Gib", "Cèi", "Ògm", "Iuc", "Lùn", "Sul", "Dàm", "Sam", "Dùb", ""],
			["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
			["Dòm", "Lua", "Mài", "Cia", "Ard", "Hao", "Sat"],
			["D", "L", "M", "C", "A", "H", "S"],
			"m",
			"f",
			"/",
			":",
			1,
			"%B %Y",
			"%B %d",
			"%d %B %Y",
			"%d/%m/%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%d %B %Y %H:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%H:%M:%S",
			"%H:%M:%S");
		symbolNaN = "NaN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-Neo-chrìochnachd";
		symbolPosInf = "Neo-chrìochnachd";
		currency = new thx.culture.core.NumberInfo(2, ".", [3], ",", "-$n", "$n");
		englishCurrency = "UK Pound Sterling";
		nativeCurrency = "Nota Bhreatannach";
		currencySymbol = "£";
		currencyIso = "GBP";
		englishRegion = "United Kingdom";
		nativeRegion = "An Rìoghachd Aonaichte";
		iso2Region = "GB";
		iso3Region = "GBR";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = return new GdGB(); return culture; }
}