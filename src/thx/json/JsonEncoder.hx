package thx.json;

import thx.data.IDataHandler;
import thx.error.Error;

using Lambda;

class JsonEncoder implements IDataHandler
{
	public var encodedString(default, null) : String;
	
	var buf : StringBuf;
	var lvl : Int;
	var count : Array<Int>;
	
	public function new()
	{
	}
	
	public function start()
	{
		lvl = 0;
		buf = new StringBuf();
		encodedString = null;
		count = [];
	}
	public function end()
	{
		encodedString = buf.toString();
		buf = null;
	}
	
	public function startObject()
	{
		buf.add("{");
		count.push(0);
	}
	public function startField(name : String)
	{
		if (count[count.length - 1]++ > 0)
			buf.add(",");
		buf.add(quote(name) + ":");
	}
	public function endField(){}

	public function endObject()
	{
		buf.add("}");
		count.pop();
	}
	
	public function startArray()
	{
		buf.add("[");
		count.push(0);
	}
	public function startItem()
	{
		if (count[count.length - 1]++ > 0)
			buf.add(",");
	}
	public function endItem(){}
	public function endArray()
	{
		buf.add("]");
		count.pop();
	}
	
	public function date(d : Date)
	{
		buf.add(d.getTime());
	}
	public function string(s : String)
	{
		buf.add(quote(s));
	}
	public function int(i : Int)
	{
		buf.add(i);
	}
	public function float(f : Float)
	{
		buf.add(f);
	}
	public function null()
	{
		buf.add("null");
	}
	public function bool(b : Bool)
	{
		buf.add(b ? "true" : "false");
	}
	public function comment(s : String)
	{
		// Json does not support comments
	}
		
	function quote(s)
	{
		return '"' + ~/./.customReplace (~/(\n)/g.replace (~/("|\\)/g.replace (s, "\\$1"), "\\n"), function (r) {
			var c = r.matched (0).charCodeAt (0);
			return c >= 32 && c <= 127 ? String.fromCharCode (c) : "\\u" + StringTools.hex (c, 4);
		}) + '"';
	}
}