package thx.math.scale;
import thx.math.Const;

/**
 * ...
 * @author Franco Ponticelli
 * @todo change implementation so that Linear, LinearTime, Log and Pow share a base class
 * @todo add clamp/clampMin/clampMax
 */

using Arrays;

class Pow
{
	var linear : Linear;
	var tick : Linear;
	var _exponent : Float;
	var powp : Float -> Float;
	var powb : Float -> Float;

	public function new()
	{
		linear = new Linear();
		tick = new Linear();
		_exponent = 1;
		powb = powp = function(v) return v;
	}
	
	public function scale(x : Float, ?i : Int)
	{
		return linear.scale(powp(x));
	}
	
	public function invert(x : Float)
	{
		return powb(linear.invert(x));
	}
	
	public function getDomain() {
		var me = this;
		return linear.getDomain().map(function(d, _) return me.powb(d));
	}
	
	public function domain(x0 : Float, x1 : Float)
	{
		var pow : Float -> (Float -> Float) = (Floats.min(x0, x1) < 0 ? _pown : _pow);
		powp = pow(_exponent);
		powb = pow(1.0 / _exponent);
		linear.domain(powp(x0), powp(x1));
		tick.domain(x0, x1);
		return this;
	}
	
	public function getRange()
	{
		return linear.getRange();
	}
	
	public function range(y0 : Float, y1 : Float)
	{
		linear.range(y0, y1);
		return this;
	}
	
	public function rangeRound(y0 : Float, y1 : Float)
	{
		linear.rangeRound(y0, y1);
		return this;
	}
	
	public function getInterpolate() return linear.getInterpolate()
	
	public function interpolatef(x : Float -> Float -> (Float -> Float) -> (Float -> Float))
	{
		linear.interpolatef(x);
		return this;
	}
	
	public function ticks()
	{
		return tick.ticks();
	}
	
	public function tickFormatf(m : Float)
	{
		return tick.tickFormat(m);
	}
	
	public function getExponent()
	{
		return _exponent;
	}
	
	public function exponent(x : Float)
	{
		var dom = getDomain();
		_exponent = x;
		domain(dom[0], dom[1]);
		return this;
	}
	
	public static function sqrt()
	{
		return new Pow().exponent(.5);
	}
	
	static function _pow(e : Float) : Float -> Float
	{
		return function(v : Float) return Math.pow(v, e);
	}
	
	static function _pown(e : Float) : Float -> Float
	{
		return function(v : Float) return -Math.pow(-v, e);
	}
}