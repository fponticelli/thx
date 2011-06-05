package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */
import utest.Assert;
import thx.math.scale.Quantile;

class TestQuantile extends TestAll
{
	public function testQuantile()
	{
		var x = new Quantile()
			.domain([3.0, 6, 7, 8, 8, 10, 13, 15, 16, 20])
			.range([0.0, 1, 2, 3])
			.scale;
		
		var e = [0,   0, 0,   1, 1,   1, 1,   2, 2,    2,  2,    2,  3,    3,  3,  3];
		var t = [3.0, 6, 6.9, 7, 7.1, 8, 8.9, 9, 9.1, 10, 13, 14.9, 15, 15.1, 16, 20];
		for (i in 0...t.length)
			Assert.equals(e[i], x(t[i]), "expected " + e[i] + " but was " + x(t[i]) + " for " + t[i]);
			
		x = new Quantile()
			.domain([3.0, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20])
			.range([0.0, 1, 2, 3])
			.scale;
		
		var e = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3];
		var t = [3.0, 6, 6.9, 7, 7.1, 8, 8.9, 9.0, 9.1, 10, 13, 14.9, 15, 15.1, 16, 20];
		for (i in 0...t.length)
			Assert.equals(e[i], x(t[i]), "expected " + e[i] + " but was " + x(t[i]) + " for " + t[i]);
			
		x = new Quantile()
			.domain([0.0, 1])
			.range([0.0, 1])
			.scale;
		
		var e = [0, 0, 0, 1, 1, 1];
		var t = [-0.5, 0, 0.49, 0.51, 1, 1.5];
		for (i in 0...t.length)
			Assert.equals(e[i], x(t[i]), "expected " + e[i] + " but was " + x(t[i]) + " for " + t[i]);
	}
}