/**
 * ...
 * @author Franco Ponticelli
 */

import thx.culture.Culture;
import thx.culture.FormatDate;
import thx.culture.FormatParams;
import thx.error.Error;

class Dates
{
	public static function format(d : Date, ?param : String, ?params : Array<String>, ?culture : Culture)
	{
		return formatf(param, params, culture)(d);
	}
	
	public static function formatf(?param : String, ?params : Array<String>, ?culture : Culture)
	{
		params = FormatParams.params(param, params, 'D');
		var format = params.shift();
		switch(format)
		{
			case 'D':
				return function(d) return FormatDate.date(d, culture);
			case 'DS':
				return function(d) return FormatDate.dateShort(d, culture);
			case 'DST':
				return function(d) return FormatDate.dateShort(d, culture)+' '+FormatDate.time(d, culture);
			case 'DSTS':
				return function(d) return FormatDate.dateShort(d, culture)+' '+FormatDate.timeShort(d, culture);
			case 'DTS':
				return function(d) return FormatDate.date(d, culture)+' '+FormatDate.timeShort(d, culture);
			case 'Y':
				return function(d) return FormatDate.year(d, culture);
			case 'YM':
				return function(d) return FormatDate.yearMonth(d, culture);
			case 'M':
				return function(d) return FormatDate.month(d, culture);
			case 'MN':
				return function(d) return FormatDate.monthName(d, culture);
			case 'MS':
				return function(d) return FormatDate.monthNameShort(d, culture);
			case 'MD':
				return function(d) return FormatDate.monthDay(d, culture);
			case 'WD':
				return function(d) return FormatDate.weekDay(d, culture);
			case 'WDN':
				return function(d) return FormatDate.weekDayName(d, culture);
			case 'WDS':
				return function(d) return FormatDate.weekDayNameShort(d, culture);
			case 'R':
				return function(d) return FormatDate.dateRfc(d, culture);
			case 'DT':
				return function(d) return FormatDate.dateTime(d, culture);
			case 'U':
				return function(d) return FormatDate.universal(d, culture);
			case 'S':
				return function(d) return FormatDate.sortable(d, culture);
			case 'T':
				return function(d) return FormatDate.time(d, culture);
			case 'TS':
				return function(d) return FormatDate.timeShort(d, culture);
			case 'C':
				var f = params[0];
				if (null == f)
					return function(d) return FormatDate.date(d, culture);
				else
					return function(d) return FormatDate.format(f, d, culture, (params[1] != null ? (params[1] == 'true') : true));
			default:
				throw new Error("Unsupported date format: {0}", format);
		}
	}
	
	inline public static function interpolate(f : Float, a : Date, b : Date, ?equation : Float -> Float) : Date
	{
		return interpolatef(a, b, equation)(f);
	}

	public static function interpolatef(a : Date, b : Date, ?equation : Float -> Float)
	{
		var f = Floats.interpolatef(a.getTime(), b.getTime(), equation);
		return function(v) return Date.fromTime(f(v));
	}
	
	public static function snap(time : Float, period : String, mode = 0) : Float
	{
		if (mode < 0)
		{
			switch(period)
			{
				case "second":
					return Math.floor(time / 1000.0) * 1000.0;
				case "minute":
					return Math.floor(time / 60000.0) * 60000.0;
				case "hour":
					return Math.floor(time / 3600000.0) * 3600000.0;
				case "day":
					return Math.floor(time / (24.0 * 3600000.0)) * (24.0 * 3600000.0);
				case "week":
					return Math.floor(time / (7.0 * 24.0 * 3600000.0)) * (7.0 * 24.0 * 3600000.0);
				case "month":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0).getTime();
				case "year":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), 0, 1, 0, 0, 0).getTime();
				case "eternity":
					return 0;
				default:
					return throw new Error("unknown period '{0}'", period);
			}
		} else if (mode > 0)
		{
			switch(period)
			{
				case "second":
					return Math.ceil(time / 1000.0) * 1000.0;
				case "minute":
					return Math.ceil(time / 60000.0) * 60000.0;
				case "hour":
					return Math.ceil(time / 3600000.0) * 3600000.0;
				case "day":
					return Math.ceil(time / (24.0 * 3600000.0)) * (24.0 * 3600000.0);
				case "week":
					return Math.ceil(time / (7.0 * 24.0 * 3600000.0)) * (7.0 * 24.0 * 3600000.0);
				case "month":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0).getTime();
				case "year":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear() + 1, 0, 1, 0, 0, 0).getTime();
				case "eternity":
					return 0;
				default:
					return throw new Error("unknown period '{0}'", period);
			}
		} else {
			switch(period)
			{
				case "second":
					return Math.round(time / 1000.0) * 1000.0;
				case "minute":
					return Math.round(time / 60000.0) * 60000.0;
				case "hour":
					return Math.round(time / 3600000.0) * 3600000.0;
				case "day":
					return Math.round(time / (24.0 * 3600000.0)) * (24.0 * 3600000.0);
				case "week":
					return Math.round(time / (7.0 * 24.0 * 3600000.0)) * (7.0 * 24.0 * 3600000.0);
				case "month":
					var d = Date.fromTime(time),
						mod = d.getDate() > Math.round(DateTools.getMonthDays(d) / 2) ? 1 : 0;
					return new Date(d.getFullYear(), d.getMonth() + mod, 1, 0, 0, 0).getTime();
				case "year":
					var d = Date.fromTime(time),
						mod = time > new Date(d.getFullYear(), 6, 2, 0, 0, 0).getTime() ? 1 : 0;
					return new Date(d.getFullYear() + mod, 0, 1, 0, 0, 0).getTime();
				case "eternity":
					return 0;
				default:
					return throw new Error("unknown period '{0}'", period);
			}
		}
	}
	
	public static function snapToWeekDay(time : Float, day : String)
	{
		var d = Date.fromTime(time).getDay();
		var s = 0;
		switch(day.toLowerCase())
		{
			case "sunday":
				s = 0;
			case "monday":
				s = 1;
			case "tuesday":
				s = 2;
			case "wednesday":
				s = 3;
			case "thursday":
				s = 4;
			case "friday":
				s = 5;
			case "saturday":
				s = 6;
			default:
				throw new Error("unknown week day '{0}'", day);
		}
		
		return time - ((d - s) % 7) * 24 * 60 * 60 * 1000;
	}
	
	static var _reparse = ~/^\d{4}-\d\d-\d\d(( |T)\d\d:\d\d(:\d\d(\.\d{1,3})?)?)?Z?$/;
	public static function canParse(s : String)
	{
		return _reparse.match(s);
	}
	
	public static function parse(s : String) : Date
	{
		var parts = s.split(".");
		var date = Date.fromString(StringTools.replace(parts[0], "T", " "));
		if (parts.length > 1)
			date = Date.fromTime(date.getTime() + Std.parseInt(parts[1]));
		return date;
	}
	
	inline public static function compare(a : Date, b : Date)
	{
		return Floats.compare(a.getTime(), b.getTime());
	}
}