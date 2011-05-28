package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

class TestPow extends TestAll
{
	public function testDomain()
	{
		var scale = new Pow().exponent(2);
		var expected = [ 0.25, 0.0, 0.25, 1.0, 2.25];
		var values =   [-0.5,  0.0, 0.5,  1.0, 1.5];
		
		assertScale(scale.scale, expected, values);
	}
	
	public function testDomain12()
	{
		var scale = new Pow().exponent(2).domain([1.0, 2.0]);
		var expected = [-0.25, 0.0, 0.417, 1.0, 1.75];
		var values =   [ 0.5,  1.0, 1.5,   2.0, 2.5];
		
		assertScale(scale.scale, expected, values);
	}
	
	public function testSqrtDomain()
	{
		var scale = Pow.sqrt();
		var expected = [Math.NaN, 0.0, 0.5,   0.707, 1.0, 2.0];
		var values =   [  -0.5,   0.0, 0.25,  0.5,   1.0, 4.0];
		
		assertScale(scale.scale, expected, values);
	}
	
	public function testSqrtDomain12()
	{
		var scale = Pow.sqrt().domain([1.0, 2.0]);
		var expected = [-0.707, 0.0, 0.543, 1.0, 1.403];
		var values =   [ 0.5,   1.0, 1.5,   2.0, 2.5];
		
		assertScale(scale.scale, expected, values);
	}
}

/*
domain([01/01/1990, 01/01/1991]).range([0, 1]):
   10/20/1989  ->  −0.194
   01/01/1990  ->   0.000
   03/15/1990  ->   0.196
   05/27/1990  ->   0.394
   01/01/1991  ->   1.000
   03/15/1991  ->   1.206

domain([0, 1]).range(["red", "blue"]):
         -0.5  ->  rgb(191,0,64)
          0.0  ->  rgb(255,0,0)
          0.5  ->  rgb(191,0,64)
          1.0  ->  rgb(0,0,255)
          1.5  ->  rgb(-319,0,574)

domain([0, 1]).range(["red", "blue"]).interpolate(hsl):
        -0.50  ->  #ffff00
         0.00  ->  #ff0000
         0.50  ->  #ffff00
        √0.50  ->  #00ff00
         1.00  ->  #0000ff
         2.00  ->  #0000ff

SQRT
domain([0, 1]).range(["red", "blue"]):
         0.00  ->  rgb(255,0,0)
         0.25  ->  rgb(128,0,128)
         1.00  ->  rgb(0,0,255)
         4.00  ->  rgb(-255,0,510)

domain([1, 0]).range(["red", "blue"]).interpolate(hsl):
         0.00  ->  #0000ff
         0.25  ->  #00ff00
         0.50  ->  #d3ff00
         1.00  ->  #ff0000
         4.00  ->  #00ff00
*/