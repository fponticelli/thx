package thx.math;

import utest.Assert;
using Arrays;

class TestEquations
{
	public function testLinear()
	{
		assertEquation([0.0, 0.25, 0.5, 0.75, 1.0], Equations.linear, "linear");
	}
	
	public function testQuad()
	{
		assertEquation([0.0, 0.0625, 0.25, 0.5625, 1.0], Equations.quadratic, "quadratic");
	}
	
	public function testCubic()
	{
		assertEquation([0.0, 0.015625, 0.125, 0.421875, 1.0], Equations.cubic, "cubic");
	}
	
	public function testSin()
	{
		assertEquation([0.0, 0.07612046748871326, 0.2928932188134524, 0.6173165676349102, 1.0], Equations.sin, "sin");
	}
	
	public function testExp()
	{
		assertEquation([0.0, 0.004524271728019903, 0.03025, 0.1757766952966369, 0.9999], Equations.exponential, "exp");
	}
	
	public function testCircle()
	{
		assertEquation([0.0, 0.031754163448145745, 0.1339745962155614, 0.3385621722338523, 1.0], Equations.circle, "circle");
	}
	
	public function testElastic()
	{
		assertEquation([0.0, 1.1661157560971687, 0.9760611111525319, 1.00276213586401, 1.0], Equations.elasticf(), "elastic");
	}
	
	public function testBack()
	{
		assertEquation([0.0, -0.06413656250000001, -0.08769750000000004, 0.1825903124999999, 1.0], Equations.backf(), "back");
	}
	
	public function testBounce()
	{
		assertEquation([0.0, 0.47265625, 0.765625, 0.97265625, 1.0], Equations.bounce, "bounce");
	}

	function assertEquation(expected : Array<Float>, f : Float -> Float, name : String)
	{
		for (i in 0...5)
		{
			var s = i * .25;
			var v = f(s);
			var e = expected[i];
			Assert.floatEquals(e, v, 1e-3, name + " expected " + e + " but is " + v + " for " + s);
		}
	}
/*
	public function testInterpolations()
	{
		var values = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
		var items = [
			{ f : Interpolations.linear, d : "linear" },
			{ f : Interpolations.createBack(), d : "back" },
			{ f : Interpolations.bounce, d : "bounce" },
			{ f : Interpolations.circle, d : "circle" },
			{ f : Interpolations.createElastic(), d : "elastic" },
			{ f : Interpolations.cubic, d : "cubic" },
			{ f : Interpolations.exponential, d : "exponential" },
			{ f : Interpolations.quadratic, d : "quadratic" },
			{ f : Interpolations.sin, d : "sin" }
		];
		for (item in items)
			trace(item.d + ": " + values.map(function(d, i) return Math.round(item.f(d)*100)/100));
	}
*/
	public function new(){}
}