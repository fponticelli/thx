import thx.error.Error;
/**
 * ...
 * @author Franco Ponticelli
 */

class Ints
{
	public static function range(start : Int, ?stop : Int, step = 1) : Array<Int>
	{
		if (null == stop)
		{
			stop = start;
			start = 0;
		}
		if ((stop - start) / step == Math.POSITIVE_INFINITY) throw new Error("infinite range");
		var range = [], i = -1, j;
		if (step < 0)
			while ((j = start + step * ++i) > stop) range.push(j);
		else
			while ((j = start + step * ++i) < stop) range.push(j);
		return range;
	}
	
	inline public static function sign(v : Int)
	{
		return v < 0 ? -1 : 1;
	}
	
	inline public static function abs(a : Int)
	{
		return a < 0 ? -a : a;
	}
	
	inline public static function min(a : Int, b : Int)
	{
		return a < b ? a : b;
	}
	
	inline public static function max(a : Int, b : Int)
	{
		return a > b ? a : b;
	}
	
	public static function wrap(v : Int, min : Int, max : Int)
	{
		return Math.round(Floats.wrap(v, min, max));
	}
	
	public static function clamp(v : Int, min : Int, max : Int) : Int
	{
		if (v < min)
			return min;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	public static function clampSym(v : Int, max : Int) : Int
	{
		if (v < -max)
			return -max;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	inline public static function interpolate(f : Float, ?interpolator : Float -> Float, min = 0.0, max = 100.0) : Int
	{
		return Math.round(Floats.interpolate(f, interpolator, min, max));
	}
}