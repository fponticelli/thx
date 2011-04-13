package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */
import thx.error.Error;
import thx.culture.FormatDate;
using Arrays;

class TimeScale
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
	
	var x0 : Float;
	var x1 : Float;
	var y0 : Float;
	var y1 : Float;
	var kx : Float;
	var ky : Float;
	var f : Float -> Float -> (Float -> Float) -> (Float -> Float);
	var i : Float -> Float;
	var _granularity : String;
	public function new()
	{
		var now = Date.now().getTime();
		x0 = now - 60000 * 60 * 24; x1 = now; y0 = 0; y1 = 1; kx = 1; ky = 1;
		_granularity = "hour";
		f = Floats.interpolatef;
		i = f(y0, y1, null);
	}
	
	public function scale(x : Float, ?_) return i((x - x0) * kx)
	public function scaleDate(x : Date, ?_) return scale(x.getTime())
	
	public function invert(y : Float, ?_) return (y - y0) * ky + x0

	public function getDomain() return [x0, x1]
	public function getDateDomain() return [Date.fromTime(x0), Date.fromTime(x1)]
	
	public function domain(x0 : Float, x1 : Float)
	{
		this.x0 = x0; this.x1 = x1;
		kx = 1 / (this.x1 - this.x0);
		ky = (this.x1 - this.x0) / (y1 - y0);
		_granularity = guessGranularity(this.x0, this.x1);
		return this;
	}
	
	public function dateDomain(x0 : Date, x1 : Date)
	{
		return domain(x0.getTime(), x1.getTime());
	}

	public function getRange() return [y0, y1]
	
	public function range(y0 : Float, y1 : Float)
	{
		this.y0 = y0; this.y1 = y1;
		ky = (x1 - x0) / (y1 - y0);
		i = f(y0, y1, null);
		return this;
	}

	public function rangeRound(x0 : Float, x1 : Float)
	{
		this.x0 = x0; this.x1 = x1;
		return range(x0, x1).interpolatef(Ints.interpolatef);
	}

	public function getInterpolate() return f
	
	public function interpolatef(x : Float -> Float -> (Float -> Float) -> (Float -> Float))
	{
		i = (f = x)(y0, y1, null);
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

	public function ticks()
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
				while (start <= stop)
				{
					range.push(start);
					var d = Date.fromTime(start);
					start = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()).getTime();
				}
				return range;
			case "year":
				var range = [];
				while (start <= stop)
				{
					range.push(start);
					var d = Date.fromTime(start);
					start = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()).getTime();
				}
				return range;
		}
		return Floats.range(start, stop + step, step);
	}

	public function tickFormat(v : Float, ?i : Int)
	{
		var d = Date.fromTime(v);
		switch(_granularity) {
			case "minute", "hour":
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
	
	public function transform(scale : Float, t : Float, a : Float, b : Float)
	{
		var range = getRange().map(function(v, _) return (v - t) / scale);
		domain(a, b);
		var r = range.map(invert);
		domain(r[0], r[1]);
	}
}