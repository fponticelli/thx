package thx.config;

import utest.Assert;
import thx.config.ConfigExpr;

class TestConfigs
{
	static var tests : Array<{ v : Dynamic, ce : ConfigExpr }> = cast [
		{ v : 1,		ce : CEInt(1) },
		{ v : "hello",	ce : CEString("hello") },
		{ v : null,		ce : CENull },
		{ v : true,		ce : CEBool(true) },
		{ v : false,	ce : CEBool(false) },
		{ v : 0.1,		ce : CEFloat(0.1) },
		{ v : Date.fromString("2001-01-01"),	ce : CEDate("2001-01-01T00:00:00") },
		{ v : Date.fromTime(123456000.0),		ce : CEDate("1970-01-02T10:17:36") },
		{ v : [1, "a"],	ce :  CEArray([CEInt(1), CEString("a")])},
		{ v :
			{ a : "b", c : "d" },
						ce :  CEObject([
							{ k : "a", v : CEString("b") },
							{ k : "c", v : CEString("d") }
						])}
	];

	public function testDynamicToConfigExpr()
	{
		for (test in tests)
			Assert.same(test.ce, Configs.toConfigExpr(test.v));
	}
	
	public function testConfigExprToDynamic()
	{
		for (test in tests)
			Assert.same(test.v, Configs.toDynamic(test.ce));
	}
	
	
	public function new() { }
}