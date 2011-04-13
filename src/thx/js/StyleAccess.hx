package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

class StyleAccess<TData> extends Access<TData>
{
	var name : String;
	public function new(name : String, selection : Selection<TData>)
	{
		super(selection);
		this.name = name;
	}
	public function get()
	{
		var n = name;
		return selection.firstNode(function(node) return untyped js.Lib.window.getComputedStyle(node.dom, null).getPropertyValue(n));
	}

	public function remove()
	{
		var n = name;
		selection.eachNode(function(node, i) untyped node.dom.style.removeProperty(n));
		return selection;
	}
	public function string(v : String, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = null;
		selection.eachNode(function(node, i) untyped node.dom.style.setProperty(n, v, priority));
		return selection;
	}
	public function float(v : Float, ?priority : String)
	{
		var s = "" + v,
			n = name;
		if (null == priority)
			priority = null;
		selection.eachNode(function(node, i) untyped node.dom.style.setProperty(n, s, priority));
		return selection;
	}
	public function stringf(v : TData -> Int -> String, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = null;
		selection.eachNode(function(node, i) {
			var s = v(node.data, i);
			if (s == null)
				untyped node.dom.style.removeProperty(n);
			else
				untyped node.dom.style.setProperty(n, s, priority);
		});
		return selection;
	}
	public function floatf(v : TData -> Int -> Float, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = null;
		selection.eachNode(function(node, i) {
			var s = v(node.data, i);
			if (s == null)
				untyped node.dom.style.removeProperty(n);
			else
				untyped node.dom.style.setProperty(n, "" + s, priority);
		});
		return selection;
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}