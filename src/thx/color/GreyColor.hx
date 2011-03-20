/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

import thx.math.Numbers;
using thx.math.Numbers;

class GreyColor extends RGBColor
{
	public var grey(default, null) : Float;

	public function new( value : Float )
	{
		var v = value.normalize();
		var c = v.linearInterpolation(0, 255);
		super(c, c, c);
		grey = v;
	}
	
	public static function equals(a : GreyColor, b : GreyColor)
	{
		return a.grey == b.grey;
	}
	
	public static function darker(color : GreyColor, t : Float, ?interpolator : Float -> Float -> Float -> Float) : GreyColor
	{
		var v = t * color.grey;
		return new GreyColor(null == interpolator ? v : interpolator(v, 0, 1));
	}
	
	public static function interpolate(a : GreyColor, b : GreyColor, t : Float, ?interpolator : Float -> Float -> Float -> Float)
	{
		if (null == interpolator)
			interpolator = Numbers.linearInterpolationFloat;
		return new GreyColor(interpolator(t, a.grey, b.grey));
	}
}