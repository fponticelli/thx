package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
import thx.js.Selection;
import js.Dom;

class AccessProperty<That> extends Access<That>
{
	var name : String;
	public function new(name : String, selection : BaseSelection<That>)
	{
		super(selection);
		this.name = name;
	}
	public function get()
	{
		var n = name;
		return selection.firstNode(function(node : HtmlDom) return Reflect.field(node, n));
	}

	public function remove()
	{
		var n = name;
		selection.eachNode(function(node, i) Reflect.deleteField(node, n));
		return _that();
	}
	public function string(v : String)
	{
		var n = name;
		selection.eachNode(function(node, i) Reflect.setField(node, n, v));
		return _that();
	}
	public function float(v : Float)
	{
		var s = "" + v;
		var n = name;
		selection.eachNode(function(node, i) Reflect.setField(node, n, s));
		return _that();
	}
}

class AccessDataProperty<T, That> extends AccessProperty<That>
{
	public function new(name : String, selection : BoundSelection<T, That>)
	{
		super(name, selection);
	}
	
	public function stringf(v : T -> Int -> String)
	{
		var n = name;
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (null == s)
				Reflect.deleteField(node, n);
			else
				Reflect.setField(node, n, s);
		});
		return selection;
	}
	public function floatf(v : T -> Int -> Float)
	{
		var n = name;
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (null == s)
				Reflect.deleteField(node, n);
			else
				Reflect.setField(node, n, "" + s);
		});
		return _that();
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}