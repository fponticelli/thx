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
	var _usetimeticks : Bool;
	public function new()
	{
		super();
		_usetimeticks = false;
	}
	
	public static function guessGranularity(a : Float, b : Float, disc = 2)
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
				return FormatDate.timeShort(d);
			case "day", "week":
				return FormatDate.monthDay(d);
			case "month":
				return FormatDate.yearMonth(d);
			case "year":
				return FormatDate.year(d);
		};
		return "invalid date granularity"; // should never happen
	}

	public function getUseTimeTicks() return _usetimeticks
	public function useTimeTicks(v : Bool)
	{
		_usetimeticks = v;
		return this;
	}
	
	override public function ticks()
	{
		if (_usetimeticks)
			return timeTicks();
		else
			return linearTicks();
	}

	public function linearTicks()
	{
		return super.ticks();
	}
	
	public function timeTicks()
	{
		var start = x0;
		var stop = x1;
		var step = 0.0;
		switch(_granularity)
		{
			case "minute":
				step = 60000;
			case "hour":
				step = 60000 * 60;
			case "day":
				step = 60000 * 60 * 24;
			case "week":
				step = 60000 * 60 * 24 * 7;
			case "month":
				var range = [];
				var step1 = 60000 * 60 * 24 * DateTools.getMonthDays(Date.fromTime(start));
				var step2 = 60000 * 60 * 24 * DateTools.getMonthDays(Date.fromTime(stop));
				start = Math.ceil(start / step1) * step1;
				stop = Math.floor(stop / step2) * step2 + step2 * .5;
				while (start <= stop)
				{
					range.push(start);
					var d = Date.fromTime(start);
					start = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()).getTime();
				}
				return range;
			case "year":
				var range = [];
				step = 60000 * 60 * 24 * 365;
				start = Math.ceil(start / step) * step;
				stop = Math.floor(stop / step) * step + step * .5;
				while (start <= stop)
				{
					range.push(start);
					var d = Date.fromTime(start);
					start = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()).getTime();
				}
				return range;
		}
		start = Math.ceil(start / step) * step;
		stop = Math.floor(stop / step) * step + step * .5;
		return Floats.range(start, stop, step);
	}
}