package thx.js;

import js.Dom;
import js.Lib;
import thx.xml.Namespace;
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
	
	public function count()
	{
		return nodes.length;
	}
	
	public function push(node : Node<TData>)
	{
		nodes.push(node);
	}
/*
	function getParentNode()
	{
		return null;
	}
	
	function setParentNode(v)
	{
		return v;
	}
	
	function getParentData()
	{
		return null;
	}
	
	function setParentData(v)
	{
		return v;
	}
*/
//	public function filter(filterf)
//	public function map(mapf)
	
}