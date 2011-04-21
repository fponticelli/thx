package thx.math.scale;
import thx.math.Const;

/**
 * ...
 * @author Franco Ponticelli
 * @todo change implementation so that Linear, LinearTime, Log and Pow share a base class
 * @todo add clamp/clampMin/clampMax
 */

using Arrays;

class Pow extends NumericScale<Pow>
{
	var tick : Linear;
	var _exponent : Float;
	var powp : Float -> Float;
	var powb : Float -> Float;

	public function new()
	{
		super();
		tick = new Linear();
		_exponent = 1;
		powb = powp = function(v) return v;
	}
	
	override public function scale(x : Float, ?i : Int)
	{
		return super.scale(powp(x));
	}
	
	override public function invert(x : Float, ?i : Int)
	{
		return powb(super.invert(x));
	}
	
	override public function getDomain() {
		var me = this;
		return super.getDomain().map(function(d, _) return me.powb(d));
	}
	
	override public function domain(x0 : Float, x1 : Float)
	{
		var pow : Float -> (Float -> Float) = (Floats.min(x0, x1) < 0 ? _pown : _pow);
		powp = pow(_exponent);
		powb = pow(1.0 / _exponent);
		super.domain(powp(x0), powp(x1));
		tick.domain(x0, x1);
		return this;
	}

	override public function ticks()
	{
		return tick.ticks();
	}
	
	override public function tickFormat(v : Float, ?i : Int)
	{
		return tick.tickFormat(v, i);
	}
	
	public function getModulo() return tick.getModulo()
	public function modulo(v : Int)
	{
		tick.modulo(v);
		return this;
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