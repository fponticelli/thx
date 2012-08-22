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
			"objectStart",
			"objectFieldStart:name",
			"string:thx",
			"objectFieldEnd",
			"objectFieldStart:values",
			"arrayStart",
			"arrayItemStart",
			"date:"+Date.fromString("2010-01-01").getTime(),
			"arrayItemEnd",
			"arrayItemStart",
			"int:2",
			"arrayItemEnd",
			"arrayItemStart",
			"string:a",
			"arrayItemEnd",
			"arrayItemStart",
			"objectStart",
			"objectFieldStart:a",
			"int:0",
			"objectFieldEnd",
			"objectFieldStart:b",
			"bool:true",
			"objectFieldEnd",
			"objectEnd",
			"arrayItemEnd",
			"arrayEnd",
			"objectFieldEnd",
			"objectEnd",
			"end"
		], handler.result);
	}

	public function new(){}
}

class CustomerEncoder implements IDataHandler
{
	public function new(){}
	public var result : Array<String>;

	public function start() result = ["start"]
	public function end() result.push("end")

	public function objectStart() result.push("objectStart")
	public function objectFieldStart(name : String) result.push("objectFieldStart:" + name)
	public function objectFieldEnd() result.push("objectFieldEnd")
	public function objectEnd() result.push("objectEnd")

	public function arrayStart() result.push("arrayStart")
	public function arrayItemStart() result.push("arrayItemStart")
	public function arrayItemEnd() result.push("arrayItemEnd")
	public function arrayEnd() result.push("arrayEnd")

	public function valueDate(d : Date) result.push("date:"+d.getTime())
	public function valueString(s : String) result.push("string:"+s)
	public function valueInt(i : Int) result.push("int:"+i)
	public function valueFloat(f : Float) result.push("float:"+f)
	public function valueNull() result.push("null")
	public function valueBool(b : Bool) result.push("bool:" + b)
	public function comment(s : String) result.push("comment:" + s)
}