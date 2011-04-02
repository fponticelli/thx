package thx.cultures;

import thx.culture.Culture;

class UkUA extends Culture {
	function new() {
		language = thx.languages.Uk.language;
		name = "uk-UA";
		english = "Ukrainian (Ukraine)";
		native = "україньска (Україна)";
		date = new thx.culture.core.DateTimeInfo(
			["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень", ""],
			["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру", ""],
			["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"],
			["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			null,
			null,
			".",
			":",
			1,
			"%B %Y р.",
			"%e %B",
			"%e %B %Y р.",
			"%d.%m.%Y",
			"%a, %d %b %Y %H:%M:%S GMT",
			"%e %B %Y р. %k:%M:%S",
			"%Y-%m-%d %H:%M:%SZ",
			"%Y-%m-%dT%H:%M:%S",
			"%k:%M:%S",
			"%k:%M");
		symbolNaN = "NaN";
		symbolPercent = "%";
		symbolPermille = "‰";
		signNeg = "-";
		signPos = "+";
		symbolNegInf = "-безмежність";
		symbolPosInf = "безмежність";
		number = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n", "n");
		currency = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n $", "n $");
		percent = new thx.culture.core.NumberInfo(2, ",", [3], " ", "-n%", "n%");
		pluralRule = 7;
		englishCurrency = "Ukrainian Grivna";
		nativeCurrency = "гривня";
		currencySymbol = "грн.";
		currencyIso = "UAH";
		englishRegion = "Ukraine";
		nativeRegion = "Україна";
		iso2 = "UA";
		iso3 = "UKR";
		isMetric = false;
		Culture.add(this);
	}
	public static var culture(getCulture, null) : Culture; static function getCulture() { if(null == culture) culture = new UkUA(); return culture; }
	static function __init__() { getCulture(); }
}