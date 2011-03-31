package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
using thx.color.Rgb;

class TestCmyk
{
	public function testBasics()
	{
		var tests = [
			{ rgb : new Rgb(255,0,0), cmyk : new Cmyk(0,1,1,0) },
			{ rgb : new Rgb(255,102,0), cmyk : new Cmyk(0,0.6,1,0) },
			{ rgb : new Rgb(0,255,0), cmyk : new Cmyk(1,0,1,0) },
			{ rgb : new Rgb(102,255,102), cmyk : new Cmyk(0.6,0,0.6,0) },
			{ rgb : new Rgb(0,102,255), cmyk : new Cmyk(1,0.6,0,0) },
		];
		for (test in tests)
		{
			Assert.isTrue(test.rgb.equals(test.cmyk), "expected " + test.rgb + " but was " + test.cmyk + " for " + test.cmyk.toCmykString());
			var c = Cmyk.toCmyk(test.rgb);
			Assert.isTrue(c.equals(test.cmyk), "expected " + c + " but was " + test.cmyk + " for " + test.cmyk.toCmykString());
		}
	}
	
	public function new();
}