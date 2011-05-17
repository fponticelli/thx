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
			h.startArray();
			h.endArray();
		});
		assertHandler(["a", 1, true], function(h) {
			h.startArray();
			h.startItem();
			h.string("a");
			h.endItem();
			h.startItem();
			h.int(1);
			h.endItem();
			h.startItem();
			h.bool(true);
			h.endItem();
			h.endArray();
		});
	}
	
	public function testObject()
	{
		assertHandler({}, function(h) {
			h.startObject();
			h.endObject();
		});
		assertHandler({name : "thx", coolness : 5}, function(h) {
			h.startObject();
			h.startField("name");
			h.string("thx");
			h.endField();
			h.startField("coolness");
			h.int(5);
			h.endField();
			h.endObject();
		});
	}
	
	public function testNested()
	{
		assertHandler({values : [{id : 0, value : 0.1}, {id : 1, value : 0.2, notes : [1,2,3]}]}, function(h) {
			h.startObject();
			h.startField("values");
				h.startArray();
				h.startItem();
				h.startObject();
				h.startField("id");
				h.int(0);
				h.endField();
				h.startField("value");
				h.float(0.1);
				h.endField();
				h.endObject();
				h.endItem();
				h.startItem();
				h.startObject();
				h.startField("id");
				h.int(1);
				h.endField();
				h.startField("value");
				h.float(0.2);
				h.endField();
				h.startField("notes");
				h.startArray();
				h.startItem();
				h.int(1);
				h.endItem();
				h.startItem();
				h.int(2);
				h.endItem();
				h.startItem();
				h.int(3);
				h.endItem();
				h.endArray();
				h.endField();
				h.endObject();
				h.endItem();
				h.endArray();
			h.endField();
			h.endObject();
		});
	}
	
	function assertHandler(expected : Dynamic, f : ValueHandler -> Void, ?pos : PosInfos)
	{
		var h = new ValueHandler();
		h.start();
		f(h);
		h.end();
		Assert.same(expected, h.value, "expected: " + Dynamics.toString(expected) + " but was " + Dynamics.toString(h.value), pos);
	}
		
	public function new(){}
}