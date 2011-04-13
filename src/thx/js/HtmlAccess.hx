package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

class HtmlAccess<TData> extends Access<TData>
{
	public function get()
	{
		return selection.firstNode(function(node : Node<TData>) return node.dom.innerHTML);
	}
	
	public function string(v : String)
	{
		selection.eachNode(function(node, i) node.dom.innerHTML = v);
		return selection;
	}
	
	public function clear()
	{
		selection.eachNode(function(node, i) node.dom.innerHTML = "");
		return selection;
	}
	
	public function float(v : Float)
	{
		selection.eachNode(function(node, i) node.dom.innerHTML = "" + v);
		return selection;
	}
	
	public function stringf(v : TData -> Int -> Null<String>)
	{
		selection.eachNode(function(node, i) {
			var s = v(node.data, i);
			if (null == s)
				s = "";
			node.dom.innerHTML = s;
		});
		return selection;
	}
	
	public function floatf(v : TData -> Int -> Null<Float>)
	{
		selection.eachNode(function(node, i) {
			var f = v(node.data, i);
			if (null == f)
				node.dom.innerHTML = "";
			else
				node.dom.innerHTML = "" + f;
			
		});
		return selection;
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}