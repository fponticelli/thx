package thx.data;

import haxe.PosInfos;
import utest.Assert;
/**
 * ...
 * @author Franco Ponticelli
 */

class TestValueHandler
{
	public function testBasicValues()
	{
		var ed = Date.fromString("2001-01-02");
		var td = Date.fromString("2001-01-02");
		assertHandler(7,		function(h) h.int(7));
		assertHandler(0.007,	function(h) h.float(0.007));
		assertHandler(true,		function(h) h.bool(true));
		assertHandler(false,	function(h) h.bool(false));
		assertHandler("hello",	function(h) h.string("hello"));
		assertHandler(null,		function(h) h.null());
		assertHandler(ed,		function(h) h.date(td));
	}

	public function testArray()
	{
		assertHandler([], function(h) {
			h.arrayStart();
			h.arrayEnd();
		});
		assertHandler(["a", 1, true], function(h) {
			h.arrayStart();
			h.arrayItemStart();
			h.string("a");
			h.arrayItemEnd();
			h.arrayItemStart();
			h.int(1);
			h.arrayItemEnd();
			h.arrayItemStart();
			h.bool(true);
			h.arrayItemEnd();
			h.arrayEnd();
		});
	}

	public function testObject()
	{
		assertHandler({}, function(h) {
			h.objectStart();
			h.objectEnd();
		});
		assertHandler({name : "thx", coolness : 5}, function(h) {
			h.objectStart();
			h.objectFieldStart("name");
			h.string("thx");
			h.objectFieldEnd();
			h.objectFieldStart("coolness");
			h.int(5);
			h.objectFieldEnd();
			h.objectEnd();
		});
	}

	public function testNested()
	{
		assertHandler({values : [{id : 0, value : 0.1}, {id : 1, value : 0.2, notes : [1,2,3]}]}, function(h) {
			h.objectStart();
			h.objectFieldStart("values");
				h.arrayStart();
				h.arrayItemStart();
				h.objectStart();
				h.objectFieldStart("id");
				h.int(0);
				h.objectFieldEnd();
				h.objectFieldStart("value");
				h.float(0.1);
				h.objectFieldEnd();
				h.objectEnd();
				h.arrayItemEnd();
				h.arrayItemStart();
				h.objectStart();
				h.objectFieldStart("id");
				h.int(1);
				h.objectFieldEnd();
				h.objectFieldStart("value");
				h.float(0.2);
				h.objectFieldEnd();
				h.objectFieldStart("notes");
				h.arrayStart();
				h.arrayItemStart();
				h.int(1);
				h.arrayItemEnd();
				h.arrayItemStart();
				h.int(2);
				h.arrayItemEnd();
				h.arrayItemStart();
				h.int(3);
				h.arrayItemEnd();
				h.arrayEnd();
				h.objectFieldEnd();
				h.objectEnd();
				h.arrayItemEnd();
				h.arrayEnd();
			h.objectFieldEnd();
			h.objectEnd();
		});
	}

	function assertHandler(expected : Dynamic, f : ValueHandler -> Void, ?pos : PosInfos)
	{
		var h = new ValueHandler();
		h.start();
		f(h);
		h.end();
		Assert.same(expected, h.value, "expected: " + Dynamics.string(expected) + " but was " + Dynamics.string(h.value), pos);
	}

	public function new(){}
}