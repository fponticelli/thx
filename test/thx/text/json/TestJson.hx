package thx.text.json;

import utest.Assert;
import thx.config.ConfigExpr;

class TestJson
{
	static var tests = [
		{ c : CENull,			s : "null" },
		{ c : CEString('a\nb'),	s : '"a\\nb"' },
		{ c : CEInt(1),			s : "1" },
		{ c : CEFloat( -0.1),	s : "-0.1" },
		{ c : CEFloat(-1.234e-100),	s : "-1.234e-100" },
		{ c : CEBool(true),		s : "true" },
		{ c : CEBool(false),	s : "false" },
		{ c : CEArray([]),		s : "[]" },
		{ c : CEArray([
			CENull,
			CEBool(true)]),		s : "[null, true]" },
		{ c : CEObject([
			{ k : "name",	v :	CEString("haxe") },
			{ k : "stars",	v :	CEInt(5) },
		]),						s : '{"name":"haxe","stars":5}' },
	];

	public function testEncode()
	{
		for (test in tests)
			Assert.equals(test.s, Json.encode(test.c));
	}
	
	public function testDecode()
	{
		for (test in tests)
		{
			try
			{
				Assert.same(test.c, Json.decode(test.s));
			} catch (e : Dynamic) {
				Assert.fail("error decoding: " + test.s + "\n" + Std.string(e));
				break;
			}
		}
	}
	
	public function new() { }
}