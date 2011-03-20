/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

import thx.math.Numbers;
using thx.math.Numbers;

class CMYKColor extends RGBColor
{
	public var black(default, null): Float;
	public var cyan(default, null): Float;
	public var magenta(default, null): Float;
	public var yellow(default, null): Float;

	/**
	 * Construct a CMYK Color.
	 * @param cyan		Float bewteen 0 and 1
	 * @param magenta	Float bewteen 0 and 1
	 * @param yellow	Float bewteen 0 and 1
	 * @param black		Float bewteen 0 and 1
	 */
	public function new( cyan: Float, magenta: Float, yellow: Float, black: Float )
	{
		super(
			( 1 - cyan    - black ).normalize().linearInterpolation(0, 255),
			( 1 - magenta - black ).normalize().linearInterpolation(0, 255),
			( 1 - yellow  - black ).normalize().linearInterpolation(0, 255)
		);
		this.cyan    = cyan.normalize();
		this.magenta = magenta.normalize();
		this.yellow  = yellow.normalize();
		this.black   = black.normalize();
	}
	
	public static function equals(a : CMYKColor, b : CMYKColor)
	{
		return a.black == b.black && a.cyan == b.cyan && a.magenta == b.magenta && a.yellow == b.yellow;
	}
	
	public static function darker(color : CMYKColor, t : Float, ?interpolator : Float -> Float -> Float -> Float) : CMYKColor
	{
		var v = t * color.black;
		return new CMYKColor(
			color.cyan,
			color.magenta,
			color.yellow,
			null == interpolator ? v : interpolator(v, 0, 1)
		);
	}
	
	public static function interpolate(a : CMYKColor, b : CMYKColor, t : Float, ?interpolator : Float -> Float -> Float -> Float) : CMYKColor
	{
		if (null == interpolator)
			interpolator = Numbers.linearInterpolationFloat;
		return new CMYKColor(
			interpolator(t, a.cyan,    b.cyan),
			interpolator(t, a.magenta, b.magenta),
			interpolator(t, a.yellow,  b.yellow),
			interpolator(t, a.black,   b.black)
		);
	}
}