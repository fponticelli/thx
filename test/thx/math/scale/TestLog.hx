package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

using Arrays;

class TestLog extends TestAll
{
	public function testRange()
	{
		var scale = new Log().domain([1.0, 10.0]).range([0.0, 1.0]);
		var expected = [ Math.NaN, Math.NEGATIVE_INFINITY, -2.0, -1.0, 0, 0.69897, 1.0, 2.0 ];
		var values = [ -5.0, 0.0, 0.01, 0.1, 1, 5, 10, 100 ];
		
		assertScale(scale.scale, expected, values);
	}
	
	public function testInvert()
	{
		var scale = new Log().domain([1.0, 10.0]).range([0.0, 1.0]);
		var expected = [ 1.0, 1.023, 1.258, 3.162, 10 ];
		var values =   [ 0.0, 0.01,  0.1,   0.5,   1 ];
		
		assertScale(scale.invert, expected, values);
	}
	
	public function testRange12()
	{
		var scale = new Log().domain([1.0, 2.0]).range([0.0, 1.0]);
		var expected = [ -1, 0.0, 0.585, 1.0, 1.322 ];
		var values = [ 0.5,  1.0, 1.5,   2.0, 2.5 ];
		
		assertScale(scale.scale, expected, values);
	}
	
	public function testInvert12()
	{
		var scale = new Log().domain([1.0, 2.0]).range([0.0, 1.0]);
		var expected = [ 1.0, 1.007, 1.072, 1.414, 2 ];
		var values =   [ 0.0, 0.01,  0.1,   0.5,   1 ];
		
		assertScale(scale.invert, expected, values);
	}
}

/*

domain([01/01/1990, 01/01/1991]).range([0, 1]):
10/20/1989 -> −0.206
01/01/1990 -> 0.000
03/15/1990 -> 0.204
05/27/1990 -> 0.406
01/01/1991 -> 1.000
03/15/1991 -> 1.194

domain([.1, 10]).range(["red", "blue"]):
0.1 -> rgb(255,0,0)
1 -> rgb(128,0,128)
5 -> rgb(38,0,217)
10 -> rgb(0,0,255)

domain([.1, 10]).range(["red", "blue"]).interpolate(hsl):
0.1 -> #ff0000
1 -> #00ff00
5 -> #009aff
10 -> #0000ff
*/