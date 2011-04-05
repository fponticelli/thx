package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Lib;

class TextAccess<TData> extends Access<TData>
{
	public function get()
	{
		return selection.first(function(node : Node<TData>, _) return untyped node.dom.textContent);
	}

	public function string(v : String)
	{
		clear();
		selection.each(function(node, _) node.dom.appendChild(Lib.document.createTextNode(v)));
		return selection;
	}
	
	public function clear()
	{
		selection.each(function(node, i) while (null != node.dom.lastChild) node.dom.removeChild(node.dom.lastChild));
		return selection;
	}
	
	public function float(v : Float)
	{
		clear();
		selection.each(function(node, _) node.dom.appendChild(Lib.document.createTextNode("" + v)));
		return selection;
	}
	
	public function stringf(v : TData -> Int -> Null<String>)
	{
		clear();
		selection.each(function(node, i) {
			var x = v(node.data, i);
			if(null != x) node.dom.appendChild(Lib.document.createTextNode(x));
		});
		return selection;
	}
	
	public function floatf(v : TData -> Int -> Null<Float>)
	{
		clear();
		selection.each(function(node, i) {
			var x = v(node.data, i);
			if(null != x) node.dom.appendChild(Lib.document.createTextNode("" + x));
		});
		return selection;
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}