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
}