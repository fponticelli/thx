import thx.error.Error;
import thx.math.Equations;
import thx.culture.FormatNumber;
/**
 * ...
 * @author Franco Ponticelli
 */
import thx.culture.Culture;
import thx.culture.FormatParams;

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
	
	public static function interpolate(f : Float, min = 0.0, max = 1.0, ?interpolator : Float -> Float)
	{
		if (null == interpolator)
			interpolator = Equations.linear;
		return min + interpolator(f) * (max - min);
	}
	
	public static function interpolatef(min = 0.0, max = 1.0, ?interpolator : Float -> Float)
	{
		if (null == interpolator)
			interpolator = Equations.linear;
		var d = max - min;
		return function(f) return min + interpolator(f) * d;
	}
	
	public static function ascending(a : Float, b : Float) return a < b ? -1 : a > b ? 1 : 0
	public static function descending(a : Float, b : Float) return a > b ? -1 : a < b ? 1 : 0
	
	public static function format(v : Float, ?param : String, ?params : Array<String>, ?culture : Culture)
	{
		return formatf(param, params, culture)(v);
	}
	
	public static function formatf(?param : String, ?params : Array<String>, ?culture : Culture)
	{
		params = FormatParams.params(param, params, 'D');
		var format = params.shift();
		var decimals : Null<Int> = params.length > 0 ? Std.parseInt(params[0]) : null;
		switch(format)
		{
			case 'D':
				return function(v) return FormatNumber.decimal(v, decimals, culture);
			case 'I':
				return function(v) return FormatNumber.int(v, culture);
			case 'C':
				var s = params.length > 1 ? params[1] : null;
				return function(v) return FormatNumber.currency(v, s, decimals, culture);
			case 'P':
				return function(v) return FormatNumber.percent(v, decimals, culture);
			case 'M':
				return function(v) return FormatNumber.permille(v, decimals, culture);
			default:
				return throw new Error("Unsupported number format: {0}", format);
		}
	}
}