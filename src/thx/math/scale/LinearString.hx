package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.math.Const;

class LinearString
{
	var x0 : Float;
	var x1 : Float;
	var y0 : String;
	var y1 : String;
	var kx : Float;
	var f : String -> String -> (Float -> Float) -> (Float -> String);
	var i : Float -> String;
	public function new()
	{
		x0 = 0; x1 = 1; y0 = ""; y1 = ""; kx = 1;
		f = Strings.interpolatef;
		i = f(y0, y1, null);
	}
	
	public function scale(x : Float, ?i : Int) return i((x - x0) * kx)

	public function getDomain() return [x0, x1]
	
	public function domain(x0 : Float, x1 : Float)
	{
		this.x0 = x0; this.x1 = x1;
		kx = 1 / (x1 - x0);
		return this;
	}

	public function getRange() return [y0, y1]
	
	public function range(y0 : String, y1 : String) : LinearString
	{
		this.y0 = y0; this.y1 = y1;
		i = f(y0, y1, null);
		return this;
	}

	public function getInterpolate() return f
	
	public function interpolatef(x : String -> String -> (Float -> Float) -> (Float -> String))
	{
		i = (f = x)(y0, y1, null);
		return this;
	}
	
	function tickRange(m : Float)
	{
		var start = Math.min(x0, x1),
			stop = Math.max(x0, x1),
			span = stop - start,
			step = Math.pow(10, Math.floor(Math.log(span / m) / Const.LN10)),
			err = m / (span / step);
		if (err <= .15)
			step *= 10;
		else if (err <= .35)
			step *= 5;
		else if (err <= -75)
			step *= 2;
		
		return {
			start : Math.ceil(start / step) * step,
			stop : Math.floor(stop / step) * step + step * .5,
			step : step
		};
	}
	
	public function ticks(m : Float)
	{
		var range = tickRange(m);
		return Floats.range(range.start, range.stop, range.step);
	}

	public function tickFormat(m : Float)
	{
		var n = Math.max(0, -Math.floor(Math.log(tickRange(m).step) / Const.LN10 + .01));
		return Floats.formatf("D:"+n);
	}
}