/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

import thx.math.Numbers;

class RGBColor
{
	public var blue(getBlue, null) : Int;
	public var green(getGreen, null) : Int;
	public var red(getRed, null) : Int;
	public var bluef(getBlueF, null) : Float;
	public var greenf(getGreenF, null) : Float;
	public var redf(getRedF, null) : Float;
	public var rgb(getRgb, null) : Int;
	
	var _value : Int;

	/**
	 *
	 * @param red	an Int value between 0 and 255
	 * @param green	an Int value between 0 and 255
	 * @param blue	an Int value between 0 and 255
	 * @param alpha	an Int value between 0 and 255
	 */
	public function new(red : Int, green : Int, blue : Int)
	{
		red   = normalize(red);
		green = normalize(green);
		blue  = normalize(blue);
		_value = ( ( red & 0xFF ) << 16 ) | ( ( green & 0xFF ) << 8 ) | ( ( blue & 0xFF ) << 0 );
	}
	
	public function toHex(?prefix = "")
	{
		return prefix + StringTools.hex(red, 2) + StringTools.hex(green, 2) + StringTools.hex(blue, 2);
	}
	
	inline function getBlue(): Int
	{
		return ( _value >> 0 ) & 0xFF;
	}

	inline function getGreen(): Int
	{
		return ( _value >> 8 ) & 0xFF;
	}

	inline function getRed(): Int
	{
		return ( _value >> 16 ) & 0xFF;
	}
	
	inline function getBlueF(): Float
	{
		return getBlue() / 255.0;
	}

	inline function getGreenF(): Float
	{
		return getGreen() / 255.0;
	}

	inline function getRedF(): Float
	{
		return getRed() / 255.0;
	}

	inline function getRgb(): Int
	{
		return _value;
	}
	
	static function normalize( color: Int )
	{
		if (color < 0)
			return 0;
		else if (color > 255)
			return 255;
		else
			return color;
	}

	public static function fromInt( value: Int ): RGBColor
	{
		var c = new RGBColor(0,0,0);
		c._value = value;
		return c;
	}
	
	public static function fromAInt(value : Int) : RGBColor
	{
		var c = fromInt(value);
		return new RGBColor(c.red, c.green, c.blue);
	}
	
	public static function equals(a : RGBColor, b : RGBColor)
	{
		return a._value == b._value;
	}
	
	public static function darker(color : RGBColor, t : Float, ?interpolator : Float -> Int -> Int -> Int) : RGBColor
	{
		if (null == interpolator)
			interpolator = Numbers.linearInterpolation;
		return new RGBColor(
			interpolator(t * color.red,   0, 255),
			interpolator(t * color.green, 0, 255),
			interpolator(t * color.blue,  0, 255)
		);
	}
	
	public static function interpolate(a : RGBColor, b : RGBColor, t : Float, ?interpolator : Float -> Int -> Int -> Int)
	{
		if (null == interpolator)
			interpolator = Numbers.linearInterpolation;
		return new RGBColor(
			interpolator(t, a.red, b.red),
			interpolator(t, a.green, b.green),
			interpolator(t, a.blue, b.blue)
		);
	}
}