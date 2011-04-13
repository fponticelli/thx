package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

class PropertyAccess<TData> extends Access<TData>
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
		return selection.firstNode(function(node : Node<TData>) return Reflect.field(node.dom, n));
	}

	public function remove()
	{
		var n = name;
		selection.eachNode(function(node, i) Reflect.deleteField(node.dom, n));
		return selection;
	}
	public function string(v : String)
	{
		var n = name;
		selection.eachNode(function(node, i) Reflect.setField(node.dom, n, v));
		return selection;
	}
	public function float(v : Float)
	{
		var s = "" + v;
		var n = name;
		selection.eachNode(function(node, i) Reflect.setField(node.dom, n, s));
		return selection;
	}
	public function stringf(v : TData -> Int -> String)
	{
		var n = name;
		selection.eachNode(function(node, i) {
			var s = v(node.data, i);
			if (null == s)
				untyped Reflect.deleteField(node.dom, n);
			else
				untyped Reflect.setField(node.dom, n, s);
		});
		return selection;
	}
	public function floatf(v : TData -> Int -> Float)
	{
		var n = name;
		selection.eachNode(function(node, i) {
			var s = v(node.data, i);
			if (null == s)
				untyped Reflect.deleteField(node.dom, n);
			else
				untyped Reflect.setField(node.dom, n, "" + s);
		});
		return selection;
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}