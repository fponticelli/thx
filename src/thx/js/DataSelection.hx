package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Dom;
import thx.xml.Namespace;
import js.Lib;

class DataSelection<TData> extends Selection<TData>
{
	var _enter : Array<Group<TData>>;
	var _exit : Array<Group<TData>>;
	public function new(update : Array<Group<TData>>, enter : Array<Group<TData>>, exit : Array<Group<TData>>)
	{
		super(update);
		_enter = enter;
		_exit = exit;
	}
	
	override function createSelection(groups : Array<Group<TData>>) : Selection<TData>
	{
		return new DataSelection(groups, _enter, _exit);
	}
	
	override public function enter() : InDataSelection<TData>
	{
		return new InDataSelection(_enter, _exit);
	}
	
	override public function exit() : Selection<TData>
	{
		return new Selection(_exit);
	}
}

class InDataSelection<TData>
{
	var _exit : Array<Group<TData>>;
	var groups : Array<Group<TData>>;
	public function new(groups : Array<Group<TData>>, exit : Array<Group<TData>>)
	{
		this.groups = groups;
		_exit = exit;
	}
	
	public function append(name : String) : Selection<TData>
	{
		var qname = Namespace.qualify(name);
		function append(node : HtmlDom)
		{
			var n : HtmlDom = Lib.document.createElement(name);
			node.appendChild(n);
			return new Node(n);
		}
		
		function appendNS(node : HtmlDom)
		{
			var n : HtmlDom = untyped Lib.document.createElementNS(qname.space, qname.local);
			node.appendChild(n);
			return new Node(n);
		}
		
		return _select(null == qname ? append : appendNS);
	}
	
	function createSelection(groups : Array<Group<TData>>) : Selection<TData>
	{
		return new ExitDataSelection(groups, _exit);
	}
	
	function _select(selectf : HtmlDom -> Node<TData>) : Selection<TData>
	{
		var subgroups = [],
			subgroup,
			subnode,
			node;
		for (group in groups)
		{
			subgroups.push(subgroup = new Group<TData>());
			subgroup.parentNode = group.parentNode;
			subgroup.parentData = group.parentData;
			for (node in group)
			{
				if (null != node)
				{
					subgroup.push(subnode = selectf(group.parentNode.dom));
					subnode.data = node.data;
				} else {
					subgroup.push(null);
				}
			}
		}
		return createSelection(subgroups);
	}
}

class ExitDataSelection<TData> extends Selection<TData>
{
	var _exit : Array<Group<TData>>;
	public function new(groups : Array<Group<TData>>, exit : Array<Group<TData>>)
	{
		super(groups);
		_exit = exit;
	}
	
	override public function exit() : Selection<TData>
	{
		return new Selection(_exit);
	}
}