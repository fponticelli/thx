package thx.data;

import utest.Assert;

class TestValueEncoder
{
	public function testEncodeSequence()
	{
		var handler = new CustomerEncoder();
		var encoder = new ValueEncoder(handler);
		
		encoder.encode( { name : "thx", values : [Date.fromString("2010-01-01"),2,"a",{a:0,b:true}] } );
		
		Assert.same([
			"start",
			"startObject",
			"startField:name",
			"string:thx",
			"endField",
			"startField:values",
			"startArray",
			"startItem",
			"date:"+Date.fromString("2010-01-01").getTime(),
			"endItem",
			"startItem",
			"int:2",
			"endItem",
			"startItem",
			"string:a",
			"endItem",
			"startItem",
			"startObject",
			"startField:a",
			"int:0",
			"endField",
			"startField:b",
			"bool:true",
			"endField",
			"endObject",
			"endItem",
			"endArray",
			"endField",
			"endObject",
			"end"
		], handler.result);
	}
	
	public function new();
}

class CustomerEncoder implements IDataHandler
{
	public function new();
	public var result : Array<String>;
	
	public function start() result = ["start"]
	public function end() result.push("end")
	
	public function startObject() result.push("startObject")
	public function startField(name : String) result.push("startField:" + name)
	public function endField() result.push("endField")
	public function endObject() result.push("endObject")
	
	public function startArray() result.push("startArray")
	public function startItem() result.push("startItem")
	public function endItem() result.push("endItem")
	public function endArray() result.push("endArray")
	
	public function date(d : Date) result.push("date:"+d.getTime())
	public function string(s : String) result.push("string:"+s)
	public function int(i : Int) result.push("int:"+i)
	public function float(f : Float) result.push("float:"+f)
	public function null() result.push("null")
	public function bool(b : Bool) result.push("bool:" + b)
	public function comment(s : String) result.push("comment:" + s)
}