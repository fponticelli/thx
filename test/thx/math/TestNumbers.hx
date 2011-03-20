package thx.math;

import utest.Assert;

class TestNumbers
{
	public function testNormalize()
	{
		Assert.floatEquals(0.0, Numbers.normalize( 0.0));
		Assert.floatEquals(1.0, Numbers.normalize( 1.0));
		Assert.floatEquals(0.5, Numbers.normalize( 0.5));
		Assert.floatEquals(0.0, Numbers.normalize(-1.0));
		Assert.floatEquals(1.0, Numbers.normalize(10.0));
	}
	
	public function testBetween()
	{
		Assert.equals(  0, Numbers.linearInterpolation(0.000, 0, 255));
		Assert.equals(127, Numbers.linearInterpolation(0.499, 0, 255));
		Assert.equals(255, Numbers.linearInterpolation(1.000, 0, 255));
		
		Assert.equals(100, Numbers.linearInterpolation(0.0, 100, 200));
		Assert.equals(150, Numbers.linearInterpolation(0.5, 100, 200));
		Assert.equals(200, Numbers.linearInterpolation(1.0, 100, 200));
	}
	
	public function new();
}