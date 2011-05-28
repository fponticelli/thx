package thx.math.scale;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import thx.error.AbstractMethod;
using Arrays;

class NumericScale<This>
{
	var _domain : Array<Float>;
	var _range : Array<Float>;
	
	var kx : Float;
	var ky : Float;
	var f : Float -> Float -> (Float -> Float) -> (Float -> Float);
	var i : Float -> Float;
	var _clamp : Bool;
	var _clampmin : Float;
	var _clampmax : Float;
	public function new()
	{
		_domain = [0.0, 1.0];
		_range = [0.0, 1.0];
		
		kx = 1; ky = 1;
		f = Floats.interpolatef;
		i = f(_range[0], _range[1], null);
		_clamp = false;
		_clampmin = 0.0;
		_clampmax = 1.0;
	}
	
	public function scale(x : Float, ?_) : Float
	{
		x = (x - _domain[0]) * kx;
		return i(_clamp ? Floats.clamp(x, _clampmin, _clampmax) : x);
	}
	
	public function invert(y : Float, ?_) : Float return (y - _range[0]) * ky + _domain[0]

	public function getDomain() : Array<Float> return _domain
	public function domain(d : Array<Float>) : This
	{
		_domain = d;
		kx = 1 / (d[1] - d[0]);
		ky = (d[1] - d[0]) / (_range[1] - _range[0]);
		return _this();
	}
	
	public function getRange() : Array<Float> return _range
	public function range(r : Array<Float>) : This
	{
		_range = r;
		ky = (_domain[1] - _domain[0]) / (r[1] - r[0]);
		i = f(r[0], r[1], null);
		return _this();
	}

	public function rangeRound(r : Array<Float>) : This
	{
		range(r);
		interpolatef(Ints.interpolatef);
		return _this();
	}

	public function getInterpolate() : Float -> Float -> (Float -> Float) -> (Float -> Float) return f
	public function interpolatef(x : Float -> Float -> (Float -> Float) -> (Float -> Float)) : This
	{
		i = (f = x)(_range[0], _range[1], null);
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
		domain([a, b]);
		var r = range.map(invert);
		domain(r);
		return _this();
	}
	
	inline function _this() : This return cast this
}