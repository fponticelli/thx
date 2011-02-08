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
		Assert.equals(0, Colors.black.red);
		Assert.equals(0, Colors.black.green);
		Assert.equals(0, Colors.black.blue);
		
		Assert.equals(255, Colors.white.red);
		Assert.equals(255, Colors.white.green);
		Assert.equals(255, Colors.white.blue);
		
		Assert.equals(255, Colors.red.red);
		Assert.equals(0, Colors.red.green);
		Assert.equals(0, Colors.red.blue);
		
		var red = RGBColor.fromInt(0xFF0000);
		Assert.isTrue(RGBColor.equals(red, Colors.red));
	}
	
	public function new();
}