import thx.error.Error;
import thx.math.Equations;
/**
 * ...
 * @author Franco Ponticelli
 */

class Floats
{
	public static function normalize(v : Float) : Float
	{
		if (v < 0.0)
			return 0.0;
		else if (v > 1.0)
			return 1.0;
		else
			return v;
	}
	
	public static function clamp(v : Float, min : Float, max : Float) : Float
	{
		if (v < min)
			return min;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	public static function clampSym(v : Float, max : Float) : Float
	{
		if (v < -max)
			return -max;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	public static function range(start : Float, ?stop : Float, step = 1.0) : Array<Float>
	{
		if (null == stop)
		{
			stop = start;
			start = 0.0;
		}
		if ((stop - start) / step == Math.POSITIVE_INFINITY) throw new Error("infinite range");
		var range = [], i = -1.0, j;
		if (step < 0)
			while ((j = start + step * ++i) > stop) range.push(j);
		else
			while ((j = start + step * ++i) < stop) range.push(j);
		return range;
	}
	
	inline public static function sign(v : Float)
	{
		return v < 0 ? -1 : 1;
	}
	
	inline public static function abs(a : Float)
	{
		return a < 0 ? -a : a;
	}
	
	inline public static function min(a : Float, b : Float)
	{
		return a < b ? a : b;
	}
	
	inline public static function max(a : Float, b : Float)
	{
		return a > b ? a : b;
	}
	
	public static function wrap(v : Float, min : Float, max : Float) : Float
	{
		var range = max - min + 1;
		if (v < min) v += range * ((min - v) / range + 1);
		return min + (v - min) % range;
	}
	
	public static function circularWrap(v : Float, max : Float) : Float
	{
		v = v % max;
		if (v < 0)
			v += max;
		return v;
	}
	
	public static function interpolate(f : Float, ?interpolator : Float -> Float, min = 0.0, max = 1.0)
	{
		if (null == interpolator)
			interpolator = Equations.linear;
		return min + interpolator(f) * (max - min);
	}
}