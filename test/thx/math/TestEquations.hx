package thx.math;

import utest.Assert;
using Arrays;

class TestEquations
{
	public function testLinear()
	{
		Assert.floatEquals(0.25, Equations.linear(0.25));
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
	public function new();
}