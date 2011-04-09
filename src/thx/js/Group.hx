package thx.js;

import js.Dom;
import js.Lib;
import thx.xml.Namespace;
using Arrays;
/**
 * ...
 * @author Franco Ponticelli
 */

class Group<TData>
{
	public var parentNode : Node<TData>;
	public var parentData : TData;

	var nodes : Array<Node<TData>>;
	
	public function new(?node : Node<TData>, ?nodes : Array<Node<TData>>)
	{
		if (null != node)
			this.nodes = [node];
		else if (null != nodes)
			this.nodes = nodes;
		else
			this.nodes = [];
	}
	
	public function iterator()
	{
		return nodes.iterator();
	}
	
	public function getNode(i : Int)
	{
		return nodes[i];
	}
	
	public function getDom(i : Int)
	{
		return null != nodes[i] ? nodes[i].dom : null;
	}
	
	public function count()
	{
		return nodes.length;
	}
	
	public function push(node : Node<TData>)
	{
		nodes.push(node);
	}
	
	public function sort(comparator : Node<TData> -> Node<TData> -> Int)
	{
		nodes.sort(comparator);
	}
}