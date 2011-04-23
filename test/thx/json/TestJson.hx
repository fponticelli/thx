package thx.json;

import utest.Assert;

class TestJson
{
	static var tests = [
		{ c : null,			s : "null" },
		{ c : 'a\nb',		s : '"a\\nb"' },
		{ c : 1,			s : "1" },
		{ c : -0.1,			s : "-0.1" },
		{ c : -1.234e-100,	s : "-1.234e-100" },
		{ c : true,			s : "true" },
		{ c : false,		s : "false" },
		{ c : [],			s : "[]" },
		{ c : [null,true],	s : "[null,true]" },
		{ c : {name:"haxe",
			   stars : 5 },	s : '{"name":"haxe","stars":5}' },
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