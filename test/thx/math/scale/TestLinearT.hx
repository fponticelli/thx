package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
using Arrays;

class TestLinearT extends TestAll
{
	public static var data = [4.0, 8, 16, 32, 64];
	public function testRange()
	{
		var scale = Linears.forString()
			.domain([Arrays.min(data), Arrays.max(data)])
			.range(["0px", "120px"]);

		Assert.same(["0px", "8px", "24px", "56px", "120px"], data.map(scale.scale));
	}
	
	public function testColors()
	{
		var data = [0.0, 5, 10],
			scale = Linears.forRgbString()
				.domain([Arrays.min(data), Arrays.max(data)])
				.range(["#FF0000", "#0000FF"]);

		Assert.same(["rgb(255,0,0)", "rgb(128,0,128)", "rgb(0,0,255)"], data.map(scale.scale));
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