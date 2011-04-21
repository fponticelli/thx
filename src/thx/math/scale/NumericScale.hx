package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.error.AbstractMethod;
using Arrays;

class NumericScale<This>
{
	var x0 : Float;
	var x1 : Float;
	var y0 : Float;
	var y1 : Float;
	var kx : Float;
	var ky : Float;
	var f : Float -> Float -> (Float -> Float) -> (Float -> Float);
	var i : Float -> Float;
	var _clamp : Bool;
	var _clampmin : Float;
	var _clampmax : Float;
	public function new()
	{
		x0 = 0; x1 = 1; y0 = 0; y1 = 1; kx = 1; ky = 1;
		f = Floats.interpolatef;
		i = f(y0, y1, null);
		_clamp = false;
		_clampmin = 0.0;
		_clampmax = 1.0;
	}
	
	public function scale(x : Float, ?_) : Float
	{
		x = (x - x0) * kx;
		return i(_clamp ? Floats.clamp(x, _clampmin, _clampmax) : x);
	}
	
	public function invert(y : Float, ?_) : Float return (y - y0) * ky + x0

	public function getDomain() : Array<Float> return [x0, x1]
	public function domain(x0 : Float, x1 : Float) : This
	{
		this.x0 = x0; this.x1 = x1;
		kx = 1 / (x1 - x0);
		ky = (x1 - x0) / (y1 - y0);
		return _this();
	}
	
	public function getRange() : Array<Float> return [y0, y1]
	public function range(y0 : Float, y1 : Float) : This
	{
		this.y0 = y0; this.y1 = y1;
		ky = (x1 - x0) / (y1 - y0);
		i = f(y0, y1, null);
		return _this();
	}

	public function rangeRound(x0 : Float, x1 : Float) : This
	{
		this.x0 = x0; this.x1 = x1;
		range(x0, x1);
		interpolatef(Ints.interpolatef);
		return _this();
	}

	public function getInterpolate() : Float -> Float -> (Float -> Float) -> (Float -> Float) return f
	public function interpolatef(x : Float -> Float -> (Float -> Float) -> (Float -> Float)) : This
	{
		i = (f = x)(y0, y1, null);
		return _this();
	}
	
	public function getClamp() : Bool return _clamp
	public function clamp(v : Bool) : This
	{
		this._clamp = v;
		return _this();
	}
	
	public function getClampMin() : Float return _clampmin
	public function clampMin(v : Float) : This
	{
		this._clampmin = v;
		return _this();
	}
	
	public function getClampMax() : Float return _clampmax
	public function clampMax(v : Float) : This
	{
		this._clampmax = v;
		return _this();
	}
	
	public function ticks() : Array<Float>
	{
		return throw new AbstractMethod();
	}

	public function tickFormat(v : Float, ?i : Int) : String
	{
		return throw new AbstractMethod();
	}
	
	public function transform(scale : Float, t : Float, a : Float, b : Float) : This
	{
		var range = getRange().map(function(v, _) return (v - t) / scale);
		domain(a, b);
		var r = range.map(invert);
		domain(r[0], r[1]);
		return _this();
	}
	
	inline function _this() : This return cast this
}