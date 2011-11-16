package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
using thx.color.Rgb;

class TestRgb
{
	public function testBasics()
	{
		Assert.isTrue(NamedColors.black.equals(new Rgb(0, 0, 0)));
		Assert.isTrue(NamedColors.white.equals(new Rgb(255, 255, 255)));
		Assert.isTrue(NamedColors.red.equals(new Rgb(255, 0, 0)));
		Assert.isTrue(NamedColors.red.equals(Rgb.fromInt(0xFF0000)));
	}
	
	public function new(){}
}