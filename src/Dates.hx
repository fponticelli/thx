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
	/**
	* Format a date.
	* 
	* Output examples:
	* 	date.format("D");		Tuesday, October 16, 2012
	* 	date.format("DS");		10/16/2012
	* 	date.format("DST");		10/16/2012 12:31:05 PM
	* 	date.format("DSTS");	10/16/2012 12:31 PM
	* 	date.format("DTS");		Tuesday, October 16, 2012 12:31 PM
	* 	date.format("Y");		2012
	* 	date.format("YM");		October, 2012
	* 	date.format("M");		10
	* 	date.format("MN");		October
	* 	date.format("MS");		Oct
	* 	date.format("MD");		October 16
	* 	date.format("WD");		2
	* 	date.format("WDN");		Tuesday
	* 	date.format("WDS");		Tue
	* 	date.format("R");		Tue, 16 Oct 2012 12:31:05 GMT
	* 	date.format("DT");		Tuesday, October 16, 2012 12:31:05 PM
	* 	date.format("U");		2012-10-16 12:31:05Z
	* 	date.format("S");		2012-10-16T12:31:05
	* 	date.format("T");		12:31:05 PM
	* 	date.format("TS");		12:31 PM
	* 	date.format("C");		Tuesday, October 16, 2012
	* 	date.format(["C", "This happened on %A at %r"]);	This happened on Tuesday at 12:31:05 PM
	*
	* @param d The Date object to format
	* @param param A String with the parameter describing the desired output.  See the description above for a list of codes.
	* @param params An array containing a number of parameters.  Mostly useful if you use "C", and then need a second parameter to describe the format.
	* @param culture The culture to use.
	*/
	public static function formatOld(d : Date, ?param : String, ?params : Array<String>, ?culture : Culture)
	{
		return formatf(param, params, culture)(d);
	}

	/** 
	*	Return a function for formatting a date.  The function returned depends on the format code used here.
	*
	*	@see format()
	*/
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
					return function(d) return FormatDate.format(d, f, culture, (params[1] != null ? (params[1] == 'true') : true));
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

	/** 
	*	Snaps a time to the nearest second, minute, hour, day, week, month or year.
	*
	*	Note, I'm not sure if "week" is functioning correctly yet. It rounds up/down to the
	*	nearest 7 days, but the epoch didn't begin on a sunday or monday, so that's probably wrong
	*	
	*	@param time The unix time in milliseconds.  See date.getTime()
	*	@param period Either "second", "minute", "hour", "day", "week", "month" or "year"
	*	@param mode Defines whether to snap up (1), snap down (-1) or round (0)
	*	
	*	@return the unix time of the snapped date (In milliseconds).  Or 0 if "period" was invalid.
	*/
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
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0).getTime();
				case "week":
					return Math.floor(time / (7.0 * 24.0 * 3600000.0)) * (7.0 * 24.0 * 3600000.0);
				case "month":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0).getTime();
				case "year":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), 0, 1, 0, 0, 0).getTime();
				default:
					return 0;
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
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0).getTime();
				case "week":
					return Math.ceil(time / (7.0 * 24.0 * 3600000.0)) * (7.0 * 24.0 * 3600000.0);
				case "month":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0).getTime();
				case "year":
					var d = Date.fromTime(time);
					return new Date(d.getFullYear() + 1, 0, 1, 0, 0, 0).getTime();
				default:
					return 0;
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
					var d = Date.fromTime(time),
						mod = (d.getHours() >= 12) ? 1 : 0;
					return new Date(d.getFullYear(), d.getMonth(), d.getDate() + mod, 0, 0, 0).getTime();
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
				default:
					return 0;
			}
		}
	}

	/** 
	*	Snaps a time to a given weekday in the current week.  The time within the day will stay the same.
	*	
	*	@param time The unix time in milliseconds.  See date.getTime()
	*	@param day Day to snap to.  Either "sunday", "monday", "tuesday" etc. Case insensitive.
	* 	@param mondayStart If true, the current week will be defined as Monday-Sunday.  Default is false, meaning Sunday-Saturday.
	*	
	*	@throws String if invalid weekday was entered.
	*	
	*	@return The unix time of the day you have snapped to.
	*/
	public static function snapToWeekDay(time : Float, day : String, ?mondayStart = false)
	{
		var d = Date.fromTime(time).getDay();
		var s = 0;
		var s = switch(day.toLowerCase())
		{
			case "sunday": (mondayStart) ? 7 : 0;
			case "monday": 1;
			case "tuesday": 2;
			case "wednesday": 3;
			case "thursday": 4;
			case "friday": 5;
			case "saturday": 6;
			default:
				throw new Error("unknown week day '{0}'", day);
				-1;
		}

		return time - ((d - s) % 7) * 24 * 60 * 60 * 1000;
	}

	static var _reparse = ~/^\d{4}-\d\d-\d\d(( |T)\d\d:\d\d(:\d\d(\.\d{1,3})?)?)?Z?$/;
	
	/** 
	*	Let's you know if a string can be parsed into a valid date format
	*	
	*	String formats allowed include: "2010-10-01", "2010-10-01 05:05", 
	*   "2010-10-01T05:05Z", "2010-10-01 05:05:05", "2010-10-01T05:05:05Z", 
	*	"2010-10-01T05:05:05", "2010-10-01 05:05:05.005"]
	* 
	*	@param s String to check.  
	*
	*	@return True if the string can be parsed as a date. 
	*
	*	@see Dates.parse()
	*/
	public static function canParse(s : String)
	{
		return _reparse.match(s);
	}

	/**
	*	Parses a string into a Date object.
	*	
	*	Use Dates.canParse() to see if a string is in a parsable format.
	* 
	*	@param s String to parse.  See canParse() docs for valid string formats.
	*
	*	@return A Date object for the given time.
	*
	*	@see Dates.canParse()
	*/
	public static function parse(s : String) : Date
	{
		var parts = s.split(".");
		var date = Date.fromString(StringTools.replace(parts[0], "T", " "));
		if (parts.length > 1)
			date = Date.fromTime(date.getTime() + Std.parseInt(parts[1]));
		return date;
	}

	/**
	*	A comparison function for dates.
	*
	*	Can be used to sort an array of dates from earliest to latest:
	*
	*		arrayOfDates.sort(Dates.compare); 
	* 
	*	@param a First Date to compare.
	*	@param b Second Date to compare.
	*	@return 1 if A is before B, -1 if B is before A and 0 if they represent the same point in time.
	*/
	inline public static function compare(a : Date, b : Date)
	{
		return Floats.compare(a.getTime(), b.getTime());
	}
}

typedef FormatDate = thx.culture.FormatDate;