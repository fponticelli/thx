package thx.math.scale;
import thx.math.Const;

/**
 * ...
 * @author Franco Ponticelli
 * @todo change implementation so that Linear, LinearTime, LinearString Log and Pow share a base class
 * @todo add clamp/clampMin/clampMax
 */

using Arrays;

class Log
{
	var linear : Linear;
	static function _log(x : Float)
	{
		return Math.log(x) / Const.LN10;
	}
	
	static function _logn(x : Float)
	{
		return -Math.log(-x) / Const.LN10;
	}
	
	static function _pow(x : Float)
	{
		return Math.pow(10, x);
	}
	
	static function _pown(x : Float)
	{
		return -Math.pow(10, -x);
	}
	
	
	var log : Float -> Float;
	var pow : Float -> Float;

	public function new()
	{
		linear = new Linear();
		log = _log;
		pow = _pow;
	}
	
	public function scaleMap(x : Float, i : Int) return scale(x)
	
	public function scale(x : Float)
	{
		return linear.scale(log(x));
	}
	
	public function invert(x : Float)
	{
		return pow(linear.invert(x));
	}
	
	public function getDomain() {
		var me = this;
		return linear.getDomain().map(function(d, _) return me.pow(d));
	}
	
	public function domain(x0 : Float, x1 : Float)
	{
		if (Floats.min(x0, x1) < 0) {
			log = _logn;
			pow = _pown;
		} else {
			log = _log;
			pow = _pow;
		}
		linear.domain(log(x0), log(x1));
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
		var d = linear.getDomain(),
			ticks = [];
		if (d.every(function(d,_) return Math.isFinite(d))) {
			var i = Math.floor(d[0]),
				j = Math.ceil(d[1]),
				u = pow(d[0]),
				v = pow(d[1]);
			if (Reflect.compareMethods(log, _logn))
			{
				ticks.push(pow(i));
				while (i++ < j)
				{
					var k = 9;
					do
					{
						ticks.push(pow(i) * k);
					} while (k-- > 0);
				}
			} else {
				do
				{
					for (k in 1...10)
						ticks.push(pow(i) * k);
				} while (i++ < j);
				ticks.push(pow(i));
			}

			i = 0;
			while (ticks[i] < u) i++; // strip small values
			j = ticks.length;
			while (ticks[j - 1] > v) j--; // strip big values
			ticks = ticks.slice(i, j);
		}
		return ticks;
	}
	
	public function tickFormatf()
	{
		return function(d : Float) return thx.culture.FormatNumber.decimal(d, 1);
	}
}