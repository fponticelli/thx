package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import js.Lib;
import js.Dom;
import thx.js.Selection;

class AccessText<That> extends Access<That>
{
	public function get()
	{
		return selection.firstNode(function(node : HtmlDom) return untyped node.textContent);
	}

	public function string(v : String)
	{
		clear();
		selection.eachNode(function(node, _) untyped node.textContent = v);
		return _that();
	}
	
	public function clear()
	{
		selection.eachNode(function(node, i) untyped node.textContent = "");
		return _that();
	}
	
	public function float(v : Float)
	{
		clear();
		selection.eachNode(function(node, _) untyped node.textContent = "" + v);
		return _that();
	}
	
	public function stringNodef(v : HtmlDom -> Int -> Null<String>)
	{
		clear();
		selection.eachNode(function(node, i) {
			var x = v(node, i);
			if (null != x) untyped node.textContent = x;
		});
		return _that();
	}
	
	public function floatNodef(v : HtmlDom -> Int -> Null<Float>)
	{
		clear();
		selection.eachNode(function(node, i) {
			var x = v(node, i);
			if(null != x) untyped node.textContent = "" + x;
		});
		return _that();
	}
}

class AccessDataText<T, That> extends AccessText<That>
{
	public function new(selection : BoundSelection<T, That>)
	{
		super(selection);
	}
	
	public function stringf(v : T -> Int -> Null<String>)
	{
		clear();
		selection.eachNode(function(node, i) {
			var x = v(Access.getData(node), i);
			if (null != x) untyped node.textContent = x;
		});
		return _that();
	}
	
	public function floatf(v : T -> Int -> Null<Float>)
	{
		clear();
		selection.eachNode(function(node, i) {
			var x = v(Access.getData(node), i);
			if(null != x) untyped node.textContent = "" + x;
		});
		return _that();
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}