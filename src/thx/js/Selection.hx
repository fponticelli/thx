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
			var dom = Dom.selectionEngine.select(selector, el.dom);
			return Node.create(dom);
		});
	}
	
	public function selectAll(selector : String) : Selection<TData>
	{
		return _selectAll(function(el) {
			return Node.many(Dom.selectionEngine.selectAll(selector, el.dom));
		});
	}
	
	public function append(name : String) : Selection<TData>
	{
		var qname = Namespace.qualify(name);
		function append(node : Node<TData>)
		{
			var n : HtmlDom = Lib.document.createElement(name);
			node.dom.appendChild(n);
			return Node.create(n);
		}
		
		function appendNS(node : Node<TData>)
		{
			var n : HtmlDom = untyped Lib.document.createElementNS(qname.space, qname.local);
			node.dom.appendChild(n);
			return Node.create(n);
		}
		
		return _select(null == qname ? append : appendNS);
	}
	
	public function insert(name : String, ?beforeNode : Node<TData>, ?before : HtmlDom, ?beforeSelector : String)
	{
		var qname = Namespace.qualify(name);
		if (null != beforeNode)
			before = beforeNode.dom;
		function insertDom(node : Node<TData>) {
			var n : HtmlDom = Lib.document.createElement(name);
			node.dom.insertBefore(n, untyped __js__("Sizzle")(null != before ? before : beforeSelector, node, node)[0]);
			return Node.create(n);
		}
		
		function insertNsDom(node : Node<TData>) {
			var n : HtmlDom = untyped js.Lib.document.createElementNS(qname.space, qname.local);
			node.dom.insertBefore(n, untyped __js__("Sizzle")(null != before ? before : beforeSelector, node, node)[0]);
			return Node.create(n);
		}
		
		return _select(null == qname ? insertDom : insertNsDom);
	}
	
	public function remove() : Selection<TData>
	{
		return _select(function(node : Node<TData>)  {
			var parent = node.dom.parentNode;
			parent.removeChild(node.dom);
			return untyped (null != parent.__thxnode__) ? parent.__thxnode__ : new Node(parent);
		});
	}
	
	public function sort(comparator : Node<TData> -> Node<TData> -> Int)
	{
		var m = groups.length;
		for (i in 0...m)
		{
			var group = groups[i];
			group.sort(comparator);
			var n = group.count();
			var prev = group.getDom(0);
			for (j in 1...n)
			{
				var node = group.getDom(j);
				if (null != node)
				{
					if (null != prev)
						prev.parentNode.insertBefore(node, prev.nextSibling);
					prev = node;
				}
			}
		}
		return this;
	}
	
	public function filter(f : Node<TData> -> Int -> Bool)
	{
		var subgroups = [],
			subgroup;
		for (group in groups)
		{
			var sg = new Group(subgroup = []);
			sg.parentData = group.parentData;
			sg.parentNode = group.parentNode;
			subgroups.push(sg);
			var i = -1;
			for (node in group)
			{
				if (null != node && f(node, ++i)) // TODO: should this be null != node.dom ???
				{
					subgroup.push(node);
				}
			}
			
		}
		return new Selection(subgroups);
	}
	
	public function map<TOut>(f : Node<TData> -> Int -> TOut) : Selection<TOut>
	{
		for (group in groups)
		{
			var i = 0;
			for (node in group)
			{
				if (null != node)
					untyped node.data = f(node, i++); // TODO: this may not work with AS3, consider creating a copy of the selection
			}
		}
		return cast this;
	}
	
	public function first<T>(f : Node<TData> -> Int -> T) : T
	{
		for (group in groups)
		{
			var i = 0;
			for (node in group)
			{
				if (null != node && null != node.dom) // TODO: should this be null != node.dom ???
					return f(node, i++);
			}
		}
		return null;
	}
	
	public function empty()
	{
		return !first(function(_,_) return true);
	}
	
	public function node()
	{
		return first(function(n,_) return n);
	}
	
	public function on(type : String, ?listener : Node<TData> -> Int -> Void)
	{
		var i = type.indexOf("."),
			typo = i < 0 ? type : type.substr(0, i);
		return each(function(n, i) {
			function l(e) {
				var o = Dom.event;
				Dom.event = e;
				try
				{
					listener(n, i);
				} catch (e : Dynamic) { }
				Dom.event = o;
			}
			if (n.events.exists(type))
			{
				untyped n.dom.removeEventListener(typo, n.events.get(type), false);
				n.events.remove(type);
			}
			if (null != listener)
			{
				n.events.set(type, l);
				untyped n.dom.addEventListener(typo, l, false);
			}
		});
	}
	
	public function data(?d : Array<TData>, ?fd : TData -> Int -> Array<TData>, ?join : TData -> Int -> String) : DataSelection<TData>// TODO Join
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
			if (null != join)
			{
				var nodeByKey = new Hash(),
					keys = [],
					key,
					j = groupData.length;
				for (i in 0...n)
				{
					var node = group.getNode(i);
					key = join(node.data, i);
					if (nodeByKey.exists(key))
					{
						exitNodes[j++] = node;
					} else {
						nodeByKey.set(key, node);
						keys.push(key);
					}
				}
				
				for (i in 0...m)
				{
					node = nodeByKey.get(key = join(nodeData = groupData[i], i));
					if (null != node)
					{
						node.data = nodeData;
						updateNodes[i] = node;
						enterNodes[i] = exitNodes[i] = null;
					} else {
						node = Node.create(null);
						node.data = nodeData;
						enterNodes[i] = node;
						updateNodes[i] = exitNodes[i] = null;
					}
					nodeByKey.remove(key);
				}
				
				for (i in 0...n)
				{
					if (nodeByKey.exists(keys[i]))
						exitNodes[i] = group.getNode(i);
				}
			} else {
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
						var node = Node.create(null);
						node.data = nodeData;
						enterNodes[i] = node;
						updateNodes[i] = exitNodes[i] = null;
					}
				}
				for (i in n0...m)
				{
					var node = Node.create(null);
					node.data = groupData[i];
					enterNodes[i] = node;
					updateNodes[i] = exitNodes[i] = null;
				}
				for (i in m...n1)
				{
					exitNodes[i] = group.getNode(i);
					enterNodes[i] = updateNodes[i] = null;
				}
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
				bind(group, fd(group.parentData, i));
		} else
			throw new Error("either data or datafunction must be passed to data()");
		return new DataSelection(update, enter, exit);
	}
	
	public function iterator()
	{
		return groups.iterator();
	}
	
	public function transition()
	{
		return new Transition(this);
	}
	
	public function html() return new HtmlAccess(this)
	public function text() return new TextAccess(this)
	public function attr(name : String) return new AttributeAccess(name, this)
	public function property(name : String) return new PropertyAccess(name, this)
	public function style(name : String) return new StyleAccess(name, this)
	
	public function each(f : Node<TData> -> Int -> Void) : Selection<TData>
	{
		for (group in groups)
		{
			var i = 0;
			for (node in group)
				if (null != node && null != node.dom)
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
	
	function _select(selectf : Node<TData> -> Node<TData>) : Selection<TData>
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
					subgroup.push(subnode = selectf(node));
					if (null != subnode && null != node.data)
						subnode.data = node.data;
				} else {
					subgroup.push(null);
				}
			}
		}
		return createSelection(subgroups);
	}
	
	function _selectAll(selectallf : Node<TData> -> Array<Node<TData>>) : Selection<TData>
	{
		var subgroups = [],
			subgroup;
		for (group in groups)
		{
			for (node in group)
			{
				if (null != node)
				{
					subgroups.push(subgroup = new Group(selectallf(node)));
					subgroup.parentNode = node;
					subgroup.parentData = node.data;
				}
			}
		}
		return createSelection(subgroups);
	}
}