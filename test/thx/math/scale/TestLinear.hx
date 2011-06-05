package thx.math.scale;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

using Arrays;

class TestLinear extends TestAll
{
	public function testDomain()
	{
		var scale = new Linear();
		var expected = [-0.5,0.0,0.5,1.0,1.5];
		var values =   [-0.5,0.0,0.5,1.0,1.5];

		assertScale(scale.scale, expected, values);
	}
	
	public function testDomain12()
	{
		var scale = new Linear().domain([1.0, 2.0]);
		var expected = [-0.5, 0.0, 0.5, 1.0, 1.5];
		var values =   [ 0.5, 1.0, 1.5, 2.0, 2.5];

		assertScale(scale.scale, expected, values);
	}
	
	public function testPolylinear()
	{
		var scale = new Linear().domain([-1.0, 0.0, 1.0]).range([-100.0, 0.0, 10.0]),
			expected = [ -150.0, -100.0, -50.0, 0.0, 5.0, 10.0, 15.0],
			values =   [   -1.5,   -1.0,  -0.5, 0.0, 0.5,  1.0,  1.5];

		assertScale(scale.scale, expected, values);
		
		scale = new Linear().domain([0.0, 0.5, 1.0]).range([0.0, 0.25, 1.0]);
		expected = [ 0.0, 0.125, 0.25, 0.625, 1.0];
		values =   [ 0.0, 0.25,  0.5,  0.75,  1.0];

		assertScale(scale.scale, expected, values);
	}
	
	public function testTicks()
	{
		var scale = new Linear();
		
		Assert.equals("0, 1", scale.modulo(1).ticks().map(function(d, _)  return scale.tickFormat(d)).join(", "));
		Assert.equals("0.0, 0.5, 1.0", scale.modulo(2).ticks().map(function(d, _)  return scale.tickFormat(d)).join(", "));
		Assert.equals("0.0, 0.2, 0.4, 0.6, 0.8, 1.0", scale.modulo(5).ticks().map(function(d, _)  return scale.tickFormat(d)).join(", "));
		Assert.equals("0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0", scale.modulo(10).ticks().map(function(d, _) return scale.tickFormat(d)).join(", "));
	}
}

/*
var x = d3.scale.linear().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
console.log("domain([01/01/1990, 01/01/1991]).range([0, 1]):");
console.log("   10/20/1989  -> ", f(x(new Date(1989, 09, 20))));
console.log("   01/01/1990  -> ", f(x(new Date(1990, 00, 01))));
console.log("   03/15/1990  -> ", f(x(new Date(1990, 02, 15))));
console.log("   05/27/1990  -> ", f(x(new Date(1990, 04, 27))));
console.log("   01/01/1991  -> ", f(x(new Date(1991, 00, 01))));
console.log("   03/15/1991  -> ", f(x(new Date(1991, 02, 15))));
console.log("");

var x = d3.scale.linear().range(["red", "blue"]);
console.log("domain([0, 1]).range([\"red\", \"blue\"]):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.scale.linear().range(["red", "blue"]).interpolate(d3.interpolateHsl);
console.log("domain([0, 1]).range([\"red\", \"blue\"]).interpolate(hsl):");
console.log("         -0.5  -> ", x(-0.5));
console.log("          0.0  -> ", x(0.0));
console.log("          0.5  -> ", x(0.5));
console.log("          1.0  -> ", x(1.0));
console.log("          1.5  -> ", x(1.5));
console.log("");

var x = d3.scale.linear();
console.log("domain coercion:");
console.log("       String  -> ", x.domain(["1", "2"]).domain());
console.log("         Date  -> ", x.domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).domain());
console.log("       Number  -> ", x.domain([new Number(41), new Number(42)]).domain());
console.log("");

var x = d3.scale.linear();
console.log("domain coercion, invert:");
console.log("       String  -> ", x.domain(["0", "2"]).invert(.5));
console.log("         Date  -> ", x.domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(.5));
console.log("       Number  -> ", x.domain([new Number(0), new Number(42)]).invert(.5));
console.log("");

var x = d3.scale.linear();
console.log("range coercion, invert:");
console.log("       String  -> ", x.range(["0", "2"]).invert("1"));
console.log("         Date  -> ", x.range([new Date(1990, 0, 1), new Date(1991, 0, 1)]).invert(new Date(1990, 6, 2, 13)));
console.log("       Number  -> ", x.range([new Number(0), new Number(42)]).invert(new Number(21)));
console.log("          ???  -> ", x.range(["#000", "#fff"]).invert("#999")); // can't be coerced
console.log("");
*/