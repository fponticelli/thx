package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.culture.FormatDate;
import thx.error.Error;
using Arrays;

class LinearTime extends Linear
{
	public static function guessGranularity(a : Float, b : Float, disc = 3)
	{
		var delta = Math.abs(b - a);
		if (delta >= DateTools.days(365 * disc))
			return "year";
		else if (delta >= DateTools.days(30 * disc))
			return "month";
		else if (delta >= DateTools.days(7 * disc))
			return "week";
		else if (delta >= DateTools.days(disc))
			return "day";
		else if (delta >= DateTools.hours(disc))
			return "hour";
		else
			return "minute";
	}
	static var validPeriods = ["minute", "hour", "day", "week", "month", "year"];
	var _granularity : String;
	
	override public function domain(x0 : Float, x1 : Float) : Linear
	{
		super.domain(x0, x1);
		_granularity = guessGranularity(this.x0, this.x1);
		return this;
	}
	
	public function getGranularity() return _granularity
	public function granularity(v : String)
	{
		v = v.toLowerCase();
		if (!validPeriods.exists(v))
			throw new Error("invalid granularity '{0}'", v);
		_granularity = v;
		return this;
	}
	
	override public function tickFormat(v : Float, ?i : Int)
	{
		var d = Date.fromTime(v);
		switch(_granularity) {
			case "minute":
				return FormatDate.timeShort(d);
			case "hour":
				return FormatDate.monthDay(d) + " " + FormatDate.timeShort(d);
			case "day", "week":
				return FormatDate.monthDay(d);
			case "month":
				return FormatDate.yearMonth(d);
			case "year":
				return FormatDate.year(d);
		};
		return "invalid date granularity"; // should never happen
	}
}