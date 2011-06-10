package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
import thx.color.Rgb;
import thx.js.Selection;

class AccessStyle<That> extends Access<That>
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
		return selection.firstNode(function(node) return untyped js.Lib.window.getComputedStyle(node, null).getPropertyValue(n));
	}
	
	static var refloat = ~/(\d+(?:\.\d+)?)/;
	public function getFloat()
	{
		var v = get();
		if (refloat.match(v))
			return Std.parseFloat(refloat.matched(1));
		else
			return Math.NaN;
	}

	public function remove()
	{
		var n = name;
		selection.eachNode(function(node, i) untyped node.style.removeProperty(n));
		return _that();
	}
	public function string(v : String, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) untyped node.style.setProperty(n, v, priority));
		return _that();
	}
	public function float(v : Float, ?priority : String)
	{
		var s = "" + v,
			n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) untyped node.style.setProperty(n, s, priority));
		return _that();
	}
	public function color(v : Rgb, ?priority : String)
	{
		var s = v.toRgbString(),
			n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) untyped node.style.setProperty(n, s, priority));
		return _that();
	}
}

class AccessDataStyle<T, That> extends AccessStyle<That>
{
	public function new(name : String, selection : BoundSelection<T, That>)
	{
		super(name, selection);
	}
	
	public function stringf(v : T -> Int -> String, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				untyped node.style.removeProperty(n);
			else
				untyped node.style.setProperty(n, s, priority);
		});
		return _that();
	}
	public function floatf(v : T -> Int -> Float, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				untyped node.style.removeProperty(n);
			else
				untyped node.style.setProperty(n, "" + s, priority);
		});
		return _that();
	}
	public function colorf(v : T -> Int -> Null<Rgb>, ?priority : String)
	{
		var n = name;
		if (null == priority)
			priority = "";
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				untyped node.style.removeProperty(n);
			else
				untyped node.style.setProperty(n, "" + s.toRgbString(), priority);
		});
		return _that();
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}