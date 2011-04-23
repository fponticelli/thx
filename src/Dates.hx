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
			case 'WN':
				return function(d) return FormatDate.weekDayName(d, culture);
			case 'WS':
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
	
	inline public static function interpolate(f : Float, a : Date, b : Date, ?interpolator : Float -> Float) : Date
	{
		return interpolatef(a, b, interpolator)(f);
	}

	public static function interpolatef(a : Date, b : Date, ?interpolator : Float -> Float)
	{
		var f = Floats.interpolatef(a.getTime(), b.getTime(), interpolator);
		return function(v) return Date.fromTime(f(v));
	}
	
	public static function snap(time : Float, period : String) : Float
	{
		switch(period)
		{
			case "second":
				return Math.round(time / 1000) * 1000;
			case "minute":
				return Math.round(time / 60000) * 60000;
			case "hour":
				return Math.round(time / 3600000) * 3600000;
			case "day":
				return Math.round(time / (24 * 3600000)) * (24 * 3600000);
			case "week":
				return Math.round(time / (7 * 24 * 3600000)) * (7 * 24 * 3600000);
			case "month":
				var d = Date.fromTime(time);
				return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0).getTime();
			case "year":
				var d = Date.fromTime(time);
				return new Date(d.getFullYear(), 0, 1, 0, 0, 0).getTime();
			default:
				return throw new Error("unknown period '{0}'", period);
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
	
	static var _reparse = ~/^\d{4}-\d\d-\d-\d(( |T)\d\d:\d\d:\d\d(.\d{1,3})?)?$/;
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
}