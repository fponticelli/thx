package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestRGBColor
{
	public function testBasics()
	{
		Assert.equals(0, NamedColors.black.red);
		Assert.equals(0, NamedColors.black.green);
		Assert.equals(0, NamedColors.black.blue);
		
		Assert.equals(255, NamedColors.white.red);
		Assert.equals(255, NamedColors.white.green);
		Assert.equals(255, NamedColors.white.blue);
		
		Assert.equals(255, NamedColors.red.red);
		Assert.equals(0, NamedColors.red.green);
		Assert.equals(0, NamedColors.red.blue);
		
		var red = RGBColor.fromInt(0xFF0000);
		Assert.isTrue(RGBColor.equals(red, NamedColors.red));
	}
	
	public function new();
}