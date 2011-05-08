package thx.js;

import js.Dom;
import thx.xml.Namespace;
import thx.js.Selection;
/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class AccessAttribute<That> extends Access<That>
{
	var name : String;
	var qname : NSQualifier;
	public function new(name : String, selection : BaseSelection<That>)
	{
		super(selection);
		this.name = name;
		this.qname = Namespace.qualify(name);
	}
	public function get()
	{
		var n = name,
			q = qname;
		return selection.firstNode(function(node : HtmlDom) return q == null ? node.getAttribute(n) : untyped node.getAttributeNS(q.space, q.local));
	}
	public function remove()
	{
		if (null == qname)
		{
			var n = name;
			selection.eachNode(function(node, i) untyped node.removeAttribute(n));
		} else {
			var q = qname;
			selection.eachNode(function(node, i) untyped node.removeAttributeNS(q.space, q.local));
		}
		return _that();
	}
	public function string(v : String)
	{
		if (null == qname)
		{
			var n = name;
			selection.eachNode(function(node, i) untyped node.setAttribute(n, v));
		} else {
			var q = qname;
			selection.eachNode(function(node, i) untyped node.setAttributeNS(q.space, q.local, v));
		}
		return _that();
	}
	public function float(v : Float)
	{
		var s = "" + v;
		if (null == qname)
		{
			var n = name;
			selection.eachNode(function(node, i) untyped node.setAttribute(n, s));
		} else {
			var q = qname;
			selection.eachNode(function(node, i) untyped node.setAttributeNS(q.space, q.local, s));
		}
		return _that();
	}
}

class AccessDataAttribute<T, That> extends AccessAttribute<That>
{
	public function new(name : String, selection : BoundSelection<T, That>)
	{
		super(name, selection);
	}
	
	public function stringf(v : T -> Int -> String)
	{
		if (null == qname)
		{
			var n = name;
			selection.eachNode(function(node, i) {
				var s = v(Access.getData(node), i);
				if (null == s)
					untyped node.removeAttribute(n);
				else
					untyped node.setAttribute(n, s);
			});
		} else {
			var q = qname;
			selection.eachNode(function(node, i) {
				var s = v(Access.getData(node), i);
				if (null == s)
					untyped node.removeAttributeNS(n);
				else
					untyped node.setAttributeNS(q.space, q.local, s);
			});
		}
		return _that();
	}
	public function floatf(v : T -> Int -> Float)
	{
		if (null == qname)
		{
			var n = name;
			selection.eachNode(function(node, i) {
				var s = v(Access.getData(node), i);
				if (null == s)
					untyped node.removeAttribute(n);
				else
					untyped node.setAttribute(n, "" + s);
			});
		} else {
			var q = qname;
			selection.eachNode(function(node, i) {
				var s = v(Access.getData(node), i);
				if (null == s)
					untyped node.removeAttributeNS(n);
				else
					untyped node.setAttributeNS(q.space, q.local, "" + s);
			});
		}
		return _that();
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}