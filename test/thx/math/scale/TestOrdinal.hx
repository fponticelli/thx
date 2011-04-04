package thx.math.scale;

import utest.Assert;

using Arrays;

class TestOrdinal extends TestAll
{
	public static var data = [4, 8, 16, 32, 64];
	public function testRange()
	{
		var scale = new Ordinal()
			.domain(data)
			.range([0, 1, 2, 3, 4]);
		Assert.same([0, 1, 2, 3, 4], data.map(scale.scaleMap));
	}
	
	public function testRangeBands()
	{
		var scale = new Ordinal()
			.domain(data)
			.rangeBands(0, 100);
		Assert.same([0,20,40,60,80], data.map(scale.scaleMap));
	}
	
	public function testRangePoints()
	{
		var scale = new Ordinal()
			.domain(data)
			.rangePoints(0, 100);
		Assert.same([0,25,50,75,100], data.map(scale.scaleMap));
	}
}