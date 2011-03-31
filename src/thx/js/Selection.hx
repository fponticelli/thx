package thx.js;

import thx.error.Error;
import thx.xml.Namespace;
import thx.js.Dom;
import js.Dom;
import js.Lib;
import thx.js.DataSelection;

class Selection<TData>
{
	public var parentNode : Node<TData>;
	public var parentData : TData;
	
	var groups : Array<Group<TData>>;

	public function new(groups : Array<Group<TData>>)
	{
		this.groups = groups;
	}
	
	public function select(selector : String) : Selection<TData>
	{
		return _select(function(el) {
			return new Node(Dom.selectionEngine.select(selector, el));
		});
	}
	
	public function selectAll(selector : String) : Selection<TData>
	{
		return _selectAll(function(el) {
			return Node.many(Dom.selectionEngine.selectAll(selector, el));
		});
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
	
	public function data(?d : Array<TData>, ?fd : Group<TData> -> Int -> Array<TData>) : DataSelection<TData>// TODO Join
	{
		var update = [], enter = [], exit = [];
		
		function bind(group : Group<TData>, groupData : Array<TData>)
		{
			var n = group.count(),
				m = groupData.length,
				n0 = Ints.min(n, m),
				n1 = Ints.max(n, m),
				updateNodes = [],
				exitNodes = [],
				enterNodes = [],
				node,
				nodeData
			;
			
			for (i in 0...n0)
			{
				node = group.getNode(i);
				nodeData = groupData[i];
				if (null != node)
				{
					node.data = nodeData;
					updateNodes[i] = node;
					enterNodes[i] = exitNodes[i] = null;
				} else {
					var node = new Node(null);
					node.data = nodeData;
					enterNodes[i] = node;
					updateNodes[i] = exitNodes[i] = null;
				}
			}
			for (i in n0...m)
			{
				var node = new Node(null);
				node.data = groupData[i];
				enterNodes[i] = node;
				updateNodes[i] = exitNodes[i] = null;
			}
			
			for (i in m...n1)
			{
				exitNodes[i] = group.getNode(i);
				enterNodes[i] = updateNodes[i] = null;
			}
			var enterGroup = new Group(enterNodes);
			enterGroup.parentNode = group.parentNode;
			enterGroup.parentData = group.parentData;
			enter.push(enterGroup);
			var updateGroup = new Group(updateNodes);
			updateGroup.parentNode = group.parentNode;
			updateGroup.parentData = group.parentData;
			update.push(updateGroup);
			var exitGroup = new Group(exitNodes);
			exitGroup.parentNode = group.parentNode;
			exitGroup.parentData = group.parentData;
			exit.push(exitGroup);
		}
		
		if (null != d)
		{
			for (group in groups)
				bind(group, d);
		} else if (null != fd) {
			var i = 0;
			for (group in groups)
				bind(group, fd(group, i));
		} else
			throw new Error("either data or datafunction must be passed to data()");
		return new DataSelection(update, enter, exit);
	}
	
	public function iterator()
	{
		return groups.iterator();
	}
	
	public function html(?v : String, ?f : Node<TData> -> Int -> String) : Selection<TData>
	{
		function htmlConstant(n : Node<TData>, _ : Int) {
			n.dom.innerHTML = v;
		}
		
		function htmlFunction(n : Node<TData>, i : Int) {
			n.dom.innerHTML = f(n, i);
		}
		return each(null == f ? htmlConstant : htmlFunction);
	}
	
	public function text(?v : String, ?f : Node<TData> -> Int -> String) : Selection<TData>
	{
		function textNull(n : Node<TData>, _ : Int) {
			while (null != n.dom.lastChild) n.dom.removeChild(n.dom.lastChild);
		}
		
		function textConstant(n : Node<TData>, _ : Int) {
			n.dom.appendChild(Lib.document.createTextNode(v));
		}
		
		function textFunction(n : Node<TData>, i : Int) {
			var x = f(n, i);
			if(null != x) n.dom.appendChild(Lib.document.createTextNode(x));
		}
		return each(null != f
			? textFunction : (v != null
			? textConstant : textNull));
	}
	
	public function attr(name : String, ?v : String, ?f : Node<TData> -> Int -> String) : Selection<TData>
	{
		var qname = Namespace.qualify(name);


		function attrNull(n : Node<TData>, _ : Int) untyped n.dom.removeAttribute(name);
		function attrNullNS(n : Node<TData>, _ : Int)  untyped n.dom.removeAttributeNS(qname.space, qname.local);
		function attrConstant(n : Node<TData>, _ : Int) untyped n.dom.setAttribute(name, v);
		function attrConstantNS(n : Node<TData>, _ : Int) untyped n.dom.setAttributeNS(qname.space, qname.local, v);
		function attrFunction(n : Node<TData>, i : Int) {
			var x = f(n,i);
			if (x == null)
				untyped n.dom.removeAttribute(name);
			else
				untyped n.dom.setAttribute(name, x);
		}

		function attrFunctionNS(n : Node<TData>, i : Int) {
			var x = f(n, i);
			if (x == null)
				untyped n.dom.removeAttributeNS(qname.space, qname.local);
			else
				untyped n.dom.setAttributeNS(qname.space, qname.local, x);
		}

		return each(f != null
			? (null != qname ? attrFunctionNS : attrFunction) : (null != v
			? (null != qname ? attrConstantNS : attrConstant)
			: (null != qname ? attrNullNS : attrNull)));
	}
	
	public function style(name : String, ?v : String, ?f : Node<TData> -> Int -> String, ?priority : String) : Selection<TData>
	{
		function styleNull(n : Node<TData>, _ : Int) untyped n.dom.style.removeProperty(name);
		function styleConstant(n : Node<TData>, _ : Int) untyped n.dom.style.setProperty(name, v, priority);
		function styleFunction(n : Node<TData>, i : Int) {
			var x = f(n,i);
			if (x == null)
				untyped n.dom.style.removeProperty(name);
			else
				untyped n.dom.style.setProperty(name, x, priority);
		}
		
		return each(null != f
			? styleFunction : ( null != v
			? styleConstant : styleNull
			));
	}
	
	public function each(f : Node<TData> -> Int -> Void) : Selection<TData>
	{
		for (group in groups)
		{
			var i = 0;
			for (node in group)
				if (null != node)
					f(node, i++);
		}
		return this;
	}
	
	public function enter() : InDataSelection<TData>
	{
		return throw new Error("enter can only be invoked after data() has been called");
	}
	
	public function exit() : Selection<TData>
	{
		return throw new Error("exit can only be invoked after enter() has been called");
	}

	function createSelection(groups : Array<Group<TData>>) : Selection<TData>
	{
		return new Selection<TData>(groups);
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
					subgroup.push(subnode = selectf(node.dom));
					if (null != subnode && null != node.data)
						subnode.data = node.data;
				} else {
					subgroup.push(null);
				}
			}
		}
		return createSelection(subgroups);
	}
	
	function _selectAll(selectallf : HtmlDom -> Array<Node<TData>>) : Selection<TData>
	{
		var subgroups = [],
			subgroup;
		for (group in groups)
		{
			for (node in group)
			{
				if (null != node)
				{
					subgroups.push(subgroup = new Group(selectallf(node.dom)));
					subgroup.parentNode = node;
					subgroup.parentData = node.data;
				}
			}
		}
		return createSelection(subgroups);
	}
}