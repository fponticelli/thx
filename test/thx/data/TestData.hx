package thx.data;

import utest.Assert;
import thx.data.DataExpr;

class TestData
{
	static var tests : Array<{ v : Dynamic, ce : DataExpr }> = cast [
		{ v : 1,		ce : CEInt(1) },
		{ v : "hello",	ce : CEString("hello") },
		{ v : null,		ce : CENull },
		{ v : true,		ce : CEBool(true) },
		{ v : false,	ce : CEBool(false) },
		{ v : 0.1,		ce : CEFloat(0.1) },
		{ v : Date.fromString("1972-05-07 00:00:00"),	ce : CEDate("1972-05-07T00:00:00") },
		{ v : [1, "a"],	ce :  CEArray([CEInt(1), CEString("a")])},
		{ v :
			{ a : "b", c : "d" },
						ce :  CEObject([
							{ k : "a", v : CEString("b") },
							{ k : "c", v : CEString("d") }
						])}
	];

	public function testDynamicToDataExpr()
	{
		for (test in tests)
			Assert.same(test.ce, Data.toConfigExpr(test.v));
	}
	
	public function testDataExprToDynamic()
	{
		for (test in tests)
			Assert.same(test.v, Data.toDynamic(test.ce));
	}
	
	public function testDate()
	{
		var date = Date.now();
		var s = Data.dateToString(date);
		Assert.same(date, Data.stringToDate(s));
	}
	
	public function new() { }
}