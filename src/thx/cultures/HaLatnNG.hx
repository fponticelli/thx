package thx.cultures;

import thx.culture.Culture;

class HaLatnNG extends Culture {
	function new() {
		name = "ha-Latn-NG";
		english = "Hausa (Latin) (Nigeria)";
		native = "Hausa (Nigeria)";
		date = new thx.culture.core.DateTimeInfo(
			["Januwaru", "Febreru", "Maris", "Afrilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktocba", "Nuwamba", "Disamba", ""],
			["Jan", "Feb", "Mar", "Afr", "May", "Yun", "Yul", "Agu", "Sat", "Okt", "Nuw", "Dis", ""],
			["Lahadi", "Litinin", "Talata", "Laraba", "Alhamis", "Juma'a", "Asabar"],
			["Lah", "Lit", "Tal", "Lar", "Alh", "Jum", "Asa"],
			["L", "L", "T", "L", "A", "J", "A"],
			"Safe",
			"Yamma",
			"/",
			":",
			0,
			"%B, %Y",
			"%B %d",
			"%A, %B %d, %Y",
			"%e/%f/%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%A, %B %d, %Y %l:%M:%S %p",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%l:%M:%S %p",
			"%l:%M:%S %p");
		currency = new thx.culture.core.NumberInfo(2, ".", [3], ",", "$-n", "$ n");
		englishCurrency = "Nigerian Naira";
		nativeCurrency = "Naira";
		currencySymbol = "N";
		currencyIso = "NIO";
		englishRegion = "Nigeria";
		nativeRegion = "Nigeria";
		iso2 = "NG";
		iso3 = "NGA";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new HaLatnNG(); return culture; }
}