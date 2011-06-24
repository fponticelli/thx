/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

using Ints;
import Floats;
using thx.math.Equations;
using StringTools;

class Rgb
{
	public var blue(default, null) : Int;
	public var green(default, null) : Int;
	public var red(default, null) : Int;

	/**
	 *
	 * @param r	an Int value between 0 and 255 for the red channel
	 * @param g	an Int value between 0 and 255 for the green channel
	 * @param b	an Int value between 0 and 255 for the blue channel
	 */
	public function new(r : Int, g : Int, b : Int)
	{
		red   = r.clamp(0, 255);
		green = g.clamp(0, 255);
		blue  = b.clamp(0, 255);
	}
	
	public function int()
	{
		return ( ( red & 0xFF ) << 16 ) | ( ( green & 0xFF ) << 8 ) | ( ( blue & 0xFF ) << 0 );
	}
	
	public function hex(?prefix = "")
	{
		return prefix + red.hex(2) + green.hex(2) + blue.hex(2);
	}
	
	inline public function toCss() return hex('#')
		
	public function toRgbString()
	{
		return "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	public function toString()
	{
		return toRgbString();
	}
	
	public static function fromFloats(r : Float, g : Float, b : Float)
	{
		return new Rgb(
			r.interpolate(0, 255),
			g.interpolate(0, 255),
			b.interpolate(0, 255));
	}
	
	public static function fromInt( v: Int ): Rgb
	{
		return new Rgb((v >> 16) & 0xFF, (v >> 8) & 0xFF, (v >> 0 ) & 0xFF);
	}
	
	public static function equals(a : Rgb, b : Rgb)
	{
		return a.red == b.red && a.green == b.green && a.blue == b.blue;
	}
	
	public static function darker(color : Rgb, t : Float, ?equation : Float -> Float) : Rgb
	{
		var interpolator = Ints.interpolatef(0, 255, equation);
		t /= 255;
		return new Rgb(
			interpolator(t * color.red),
			interpolator(t * color.green),
			interpolator(t * color.blue)
		);
	}
	
	public static function interpolate(a : Rgb, b : Rgb, t : Float, ?equation : Float -> Float)
	{
		return new Rgb(
			t.interpolate(a.red, b.red, equation),
			t.interpolate(a.green, b.green, equation),
			t.interpolate(a.blue, b.blue, equation)
		);
	}
	
	public static function interpolatef(a : Rgb, b : Rgb, ?equation : Float -> Float)
	{
		var r = Ints.interpolatef(a.red, b.red, equation),
			g = Ints.interpolatef(a.green, b.green, equation),
			b = Ints.interpolatef(a.blue, b.blue, equation);
		return function(t) return new Rgb(r(t), g(t), b(t));
	}
	
	public static function contrast(c : Rgb)
	{
		var nc = Hsl.toHsl(c);
		if (nc.lightness < .5)
			return new Hsl(nc.hue, nc.saturation, nc.lightness + 0.5);
		else
			return new Hsl(nc.hue, nc.saturation, nc.lightness - 0.5);
	}
	
	public static function contrastBW(c : Rgb)
	{
		var g = Grey.toGrey(c);
		var nc = Hsl.toHsl(c);
		if (g.grey < .5)
			return new Hsl(nc.hue, nc.saturation, 1.0);
		else
			return new Hsl(nc.hue, nc.saturation, 0);
	}
}