package thx.js;

import js.Dom;
import js.Lib;
import thx.xml.Namespace;
using Arrays;
/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

// TODO inline

class Group
{
	public static var current : HtmlDom;
	public var parentNode : HtmlDom;

	var nodes : Array<HtmlDom>;
	
	public function new(nodes : Array<HtmlDom>) this.nodes = nodes
	
	public function each(f : HtmlDom -> Int -> Void)
	{
		for (i in 0...nodes.length)
			if (null != nodes[i])
				f(current = nodes[i], i);
	}

	inline public function iterator() return nodes.iterator()

	inline public function get(i : Int) return nodes[i]

	inline public function count() return nodes.length
	
	inline public function push(node : HtmlDom) nodes.push(node)

	inline public function sort(comparator : HtmlDom -> HtmlDom -> Int) nodes.sort(comparator)
}