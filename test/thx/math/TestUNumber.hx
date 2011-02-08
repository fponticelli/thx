package thx.math;

import utest.Assert;

class TestUNumber 
{
	public function testNormalize()
	{
		Assert.floatEquals(0.0, UNumber.normalize( 0.0));
		Assert.floatEquals(1.0, UNumber.normalize( 1.0));
		Assert.floatEquals(0.5, UNumber.normalize( 0.5));
		Assert.floatEquals(0.0, UNumber.normalize(-1.0));
		Assert.floatEquals(1.0, UNumber.normalize(10.0));
	}
	
	public function testBetween()
	{
		Assert.equals(  0, UNumber.linearInterpolation(0.000, 0, 255));
		Assert.equals(127, UNumber.linearInterpolation(0.499, 0, 255));
		Assert.equals(255, UNumber.linearInterpolation(1.000, 0, 255));
		
		Assert.equals(100, UNumber.linearInterpolation(0.0, 100, 200));
		Assert.equals(150, UNumber.linearInterpolation(0.5, 100, 200));
		Assert.equals(200, UNumber.linearInterpolation(1.0, 100, 200));
	}
	
	public function new();	
}