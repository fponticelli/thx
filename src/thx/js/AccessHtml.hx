package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.js.Selection;

class AccessHtml<TData> extends Access<TData>
{
	public function get()
	{
		return selection.firstNode(function(node) return node.innerHTML);
	}
	
	public function string(v : String)
	{
		selection.eachNode(function(node, i) node.innerHTML = v);
		return _that();
	}
	
	public function clear()
	{
		selection.eachNode(function(node, i) node.innerHTML = "");
		return _that();
	}
	
	public function float(v : Float)
	{
		selection.eachNode(function(node, i) node.innerHTML = "" + v);
		return _that();
	}
}

class AccessDataHtml<T, That> extends AccessHtml<That>
{
	public function new(selection : BoundSelection<T, That>)
	{
		super(selection);
	}
	
	public function stringf(v : T -> Int -> Null<String>)
	{
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (null == s)
				s = "";
			node.innerHTML = s;
		});
		return _that();
	}
	
	public function floatf(v : T -> Int -> Null<Float>)
	{
		selection.eachNode(function(node, i) {
			var f = v(Access.getData(node), i);
			if (null == f)
				node.innerHTML = "";
			else
				node.innerHTML = "" + f;
			
		});
		return _that();
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}