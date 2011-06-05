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
		Assert.same([0, 1, 2, 3, 4], data.map(scale.scale));
	}
	
	public function testRangeBands()
	{
		var scale = new Ordinal()
			.domain(data)
			.rangeBands(0, 100);
		Assert.same([0.0,20.0,40.0,60.0,80.0], data.map(scale.scale));
	}
	
	public function testRangePoints()
	{
		var scale = new Ordinal()
			.domain(data)
			.rangePoints(0, 100);
		Assert.same([0.0,25.0,50.0,75.0,100.0], data.map(scale.scale));
	}
}