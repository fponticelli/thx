package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
using thx.color.Rgb;

class TestHsl
{
	public function testBasics()
	{
		var tests = [
			{ rgb : Rgb.fromFloats(1.00,1.00,1.00), hsl : new Hsl(0,0,1) },
			{ rgb : Rgb.fromFloats(0.50,0.50,0.50), hsl : new Hsl(0,0,0.5) },
			{ rgb : Rgb.fromFloats(0.00,0.00,0.00), hsl : new Hsl(0,0,0) },
			{ rgb : Rgb.fromFloats(1.00,0.00,0.00), hsl : new Hsl(0,1,0.5) },
			{ rgb : Rgb.fromFloats(0.75,0.75,0.00), hsl : new Hsl(60,1,0.375) },
			{ rgb : Rgb.fromFloats(0.00,0.50,0.00), hsl : new Hsl(120,1,0.25) },
			{ rgb : Rgb.fromFloats(0.50,1.00,1.00), hsl : new Hsl(180,1,0.75) },
			{ rgb : Rgb.fromFloats(0.50,0.50,1.00), hsl : new Hsl(240,1,0.75) },
			{ rgb : Rgb.fromFloats(0.75,0.25,0.75), hsl : new Hsl(300,0.5,0.5) }
		];
		for (test in tests)
		{
			Assert.isTrue(test.rgb.equals(test.hsl), "expected " + test.rgb + " but was " + test.hsl + " for " + test.hsl.toHslString());
			var c = Hsl.toHsl(test.rgb);
			Assert.isTrue(c.equals(test.hsl), "expected " + c + " but was " + test.hsl + " for " + test.hsl.toHslString());
		}
	}
	
	public function new();
}