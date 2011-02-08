package thx.math;

/**
 * ...
 * @author Franco Ponticelli
 */

class UNumber 
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
	
	public static function wrap(v : Int, min : Int, max : Int)
	{
		return Math.round(wrapFloat(v, min, max));
	}
	
	public static function clampFloat(v : Float, min : Float, max : Float) : Float 
	{
		if (v < min)
			return min;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	public static function clampSymFloat(v : Float, max : Float) : Float 
	{
		if (v < -max)
			return -max;
		else if (v > max)
			return max;
		else
			return v;
	}
	
	public static function wrapFloat(v : Float, min : Float, max : Float) : Float
	{
		var range = max - min + 1;
		if (v < min) v += range * ((min - v) / range + 1);
		return min + (v - min) % range;
	}
	
	
	public static function min(a : Int, b : Int)
	{
		return a < b ? a : b;
	}
	
	public static function max(a : Int, b : Int)
	{
		return a > b ? a : b;
	}
	
	public static function abs(a : Int)
	{
		return a < 0 ? -a : a;
	}
	
	public static function sign(v : Int)
	{
		return v < 0 ? -1 : 1;
	}
	
	public static function signFloat(v : Float)
	{
		if (v < 0.0)
			return -1;
		else if (v > 0.0)
			return 1;
		else
			return 0;
	}
	
	public static inline function linearInterpolation(v : Float, min : Int, max : Int) : Int 
	{
		return Math.round(linearInterpolationFloat(v, min, max));
	}
	
	public static inline function linearInterpolationFloat(v : Float, min : Float, max : Float) : Float 
	{
		return min + (max - min) * v;
	}
}