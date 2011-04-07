package thx.json;

import thx.data.DataExpr;
import thx.error.Error;

using Lambda;

class JsonEncoder
{
	public var formatted : Bool;
	public var indent : String;
	public var newline : String;
	var lvl : Int;
	
	public function new(formatted = false, indent = "\t", newline = "\n")
	{
		this.formatted = formatted;
		this.indent = indent;
		this.newline = newline;
	}
	
	public function encode(value : DataExpr)
	{
		lvl = 0;
		return _encode(value);
	}
	
	function _encode(value : DataExpr)
	{
		switch(value)
		{
			case CEObject(a):
				if (formatted)
				{
					lvl++;
					var r = _encodeObject(a);
					lvl--;
					return r;
				} else {
					return _encodeInlineObject(a);
				}
			case CEArray(arr):
				return "[" + arr.map(encode).join(", ") + "]";
			case CEString(s):
				return quote(s);
			case CEFloat(f):
				return "" + f;
			case CEInt(i):
				return "" + i;
			case CEBool(b):
				return b ? "true" : "false";
			case CENull:
				return "null";
			default:
				return throw new Error("unsupported type {0}", Std.string(value));
		}
	}
	
	function quote(s)
	{
		return '"' + ~/./.customReplace (~/(\n)/g.replace (~/("|\\)/g.replace (s, "\\$1"), "\\n"), function (r) {
			var c = r.matched (0).charCodeAt (0);
			return c >= 32 && c <= 127 ? String.fromCharCode (c) : "\\u" + StringTools.hex (c, 4);
		}) + '"';
	}
	
	function _indent()
	{
		var arr = [];
		for (i in 0...lvl)
			arr.push(indent);
		return arr.join("");
	}
	
	function _encodeObject(a : Array<CEPair>)
	{
		var me = this;
		return "{"
			+ a.map(function(p) {
				return me.newline + me._indent() + me.quote(p.k) + "\t: " + me._encode(p.v);
			}).join(",")
			+ newline
			+ "}";
	}
	
	function _encodeInlineObject(a : Array<CEPair>)
	{
		var me = this;
		return "{"
			+ a.map(function(p) {
				return me.quote(p.k) + ":" + me._encode(p.v);
			}).join(",")
			+ "}";
	}
}