package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

using Arrays;

class TestLinearString extends TestAll
{
	public static var data = [4, 8, 16, 32, 64];
	public function testRange()
	{
		var scale = new LinearString()
			.domain(Arrays.min(data), Arrays.max(data))
			.range("0px", "120px");

		Assert.same(["0px", "8px", "24px", "56px", "120px"], data.map(scale.scaleMap));
	}
/*
	
	public function testTicks()
	{
		var scale = new Linear()
			.domain(Arrays.min(data), Arrays.max(data))
			.range(0, 120);
		
		Assert.same([10, 20, 30, 40, 50, 60], scale.ticks(5));
	}
	
	public function testTickFormat()
	{
		var scale = new Linear()
			.domain(Arrays.min(data), Arrays.max(data))
			.range(0, 120);
		
		Assert.same("0.1", scale.tickFormat(100)(0.15));
	}
*/
}