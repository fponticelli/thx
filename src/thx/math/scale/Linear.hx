package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.math.Const;

using Arrays;

class Linear
{
	var x0 : Float;
	var x1 : Float;
	var y0 : Float;
	var y1 : Float;
	var kx : Float;
	var ky : Float;
	var f : Float -> Float -> (Float -> Float) -> (Float -> Float);
	var i : Float -> Float;
	var m : Int;
	var _clamp : Bool;
	var _clampmin : Float;
	var _clampmax : Float;
	public function new()
	{
		x0 = 0; x1 = 1; y0 = 0; y1 = 1; kx = 1; ky = 1;
		f = Floats.interpolatef;
		i = f(y0, y1, null);
		m = 10;
		_clamp = false;
		_clampmin = 0.0;
		_clampmax = 1.0;
	}
	
	public function scale(x : Float, ?_) {
		x = (x - x0) * kx;
		return i(_clamp ? Floats.clamp(x, _clampmin, _clampmax) : x);
	}
	
	public function invert(y : Float, ?_) return (y - y0) * ky + x0

	public function getDomain() return [x0, x1]
	public function domain(x0 : Float, x1 : Float)
	{
		this.x0 = x0; this.x1 = x1;
		kx = 1 / (x1 - x0);
		ky = (x1 - x0) / (y1 - y0);
		return this;
	}

	public function getModulo() return m
	public function modulo(m : Int) : Linear
	{
		this.m = m;
		return this;
	}
	
	public function getRange() return [y0, y1]
	public function range(y0 : Float, y1 : Float) : Linear
	{
		this.y0 = y0; this.y1 = y1;
		ky = (x1 - x0) / (y1 - y0);
		i = f(y0, y1, null);
		return this;
	}

	public function rangeRound(x0 : Float, x1 : Float) : Linear
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
	
	public function getClamp() return _clamp
	public function clamp(v : Bool)
	{
		this._clamp = v;
		return this;
	}
	
	public function getClampMin() return _clampmin
	public function clampMin(v : Float)
	{
		this._clampmin = v;
		return this;
	}
	
	public function getClampMax() return _clampmax
	public function clampMax(v : Float)
	{
		this._clampmax = v;
		return this;
	}
	
	public function tickRange()
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
		else if (err <= .75)
			step *= 2;
		
		return {
			start : Math.ceil(start / step) * step,
			stop : Math.floor(stop / step) * step + step * .5,
			step : step
		};
	}
	
	public function ticks()
	{
		var range = tickRange();
		return Floats.range(range.start, range.stop, range.step);
	}

	public function tickFormat(v : Float, ?i : Int)
	{
		var n = Math.max(0, -Math.floor(Math.log(tickRange().step) / Const.LN10 + .01));
		return Floats.format(v, "D:"+n);
	}
	
	public function transform(scale : Float, t : Float, a : Float, b : Float)
	{
		var range = getRange().map(function(v, _) return (v - t) / scale);
		domain(a, b);
		var r = range.map(invert);
		domain(r[0], r[1]);
	}
}