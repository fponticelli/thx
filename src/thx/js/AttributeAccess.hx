package thx.js;

import thx.xml.Namespace;
/**
 * ...
 * @author Franco Ponticelli
 */

class AttributeAccess<TData> extends Access<TData>
{
	var name : String;
	var qname : NSQualifier;
	public function new(name : String, selection : Selection<TData>)
	{
		super(selection);
		this.name = name;
		this.qname = Namespace.qualify(name);
	}
	public function get()
	{
		var n = name,
			q = qname;
		return selection.first(function(node : Node<TData>, _) return q == null ? node.dom.getAttribute(n) : untyped node.dom.getAttributeNS(q.space, q.local));
	}
	public function remove()
	{
		if (null == qname)
		{
			var n = name;
			selection.each(function(node, i) untyped node.dom.removeAttribute(n));
		} else {
			var q = qname;
			selection.each(function(node, i) untyped node.dom.removeAttributeNS(q.space, q.local));
		}
		return selection;
	}
	public function string(v : String)
	{
		if (null == qname)
		{
			var n = name;
			selection.each(function(node, i) untyped node.dom.setAttribute(n, v));
		} else {
			var q = qname;
			selection.each(function(node, i) untyped node.dom.setAttributeNS(q.space, q.local, v));
		}
		return selection;
	}
	public function float(v : Float)
	{
		var s = "" + v;
		if (null == qname)
		{
			var n = name;
			selection.each(function(node, i) untyped node.dom.setAttribute(n, s));
		} else {
			var q = qname;
			selection.each(function(node, i) untyped node.dom.setAttributeNS(q.space, q.local, s));
		}
		return selection;
	}
	public function stringf(v : TData -> Int -> String)
	{
		if (null == qname)
		{
			var n = name;
			selection.each(function(node, i) {
				var s = v(node.data, i);
				if (null == s)
					untyped node.dom.removeAttribute(n);
				else
					untyped node.dom.setAttribute(n, s);
			});
		} else {
			var q = qname;
			selection.each(function(node, i) {
				var s = v(node.data, i);
				if (null == s)
					untyped node.dom.removeAttributeNS(n);
				else
					untyped node.dom.setAttributeNS(q.space, q.local, s);
			});
		}
		return selection;
	}
	public function floatf(v : TData -> Int -> Float)
	{
		if (null == qname)
		{
			var n = name;
			selection.each(function(node, i) {
				var s = v(node.data, i);
				if (null == s)
					untyped node.dom.removeAttribute(n);
				else
					untyped node.dom.setAttribute(n, "" + s);
			});
		} else {
			var q = qname;
			selection.each(function(node, i) {
				var s = v(node.data, i);
				if (null == s)
					untyped node.dom.removeAttributeNS(n);
				else
					untyped node.dom.setAttributeNS(q.space, q.local, "" + s);
			});
		}
		return selection;
	}
	
	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}