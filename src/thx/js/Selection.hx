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
			return new Node(Dom.selectionEngine.select(selector, el.dom));
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
			return new Node(n);
		}
		
		function appendNS(node : Node<TData>)
		{
			var n : HtmlDom = untyped Lib.document.createElementNS(qname.space, qname.local);
			node.dom.appendChild(n);
			return new Node(n);
		}
		
		return _select(null == qname ? append : appendNS);
	}
	
	public function insert(name : String, ?node : Node<TData>, ?dom : HtmlDom)
	{
		var qname = Namespace.qualify(name);
		if (null == dom)
			dom = node.dom;
		function insertDom(node : Node<TData>) {
			var n : HtmlDom = Lib.document.createElement(name);
			node.dom.insertBefore(n, dom);
			return new Node(n);
		}
		
		function insertNsDom(node : Node<TData>) {
			var n : HtmlDom = untyped Lib.document.createElementNs(qname.space, qname.local);
			node.dom.insertBefore(n, dom);
			return new Node(n);
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
				if (null != node && null != node)
				{
					if (null != prev && null != prev)
						prev.insertBefore(node, prev.nextSibling);
					prev = node;
				}
			}
		}
		return this;
	}
	
	public function filter(f : Node<TData> -> Int -> Bool)
	{
		var subgroups = [];
		for (group in groups)
		{
			var subgroup = [];
			var sg = new Group(subgroup);
			sg.parentData = group.parentData;
			sg.parentNode = group.parentNode;
			subgroups.push(sg);
			var i = 0;
			for (node in group)
			{
				if (null != node && f(node, i++)) // TODO: should this be null != node.dom ???
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
				if (null != node) // TODO: should this be null != node.dom ???
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
	
	public function getHtml() : String
	{
		return first(function(n : Node<TData>, _) return n.dom.innerHTML);
	}
	
	public function getText() : String
	{
		return first(function(n : Node<TData>, _) return untyped n.dom.textContent);
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
	
	public function getAttr(name : String) : String
	{
		var qname = Namespace.qualify(name);
		return first(function(n : Node<TData>, _) return qname == null ? n.dom.getAttribute(name) : untyped n.dom.getAttributeNS(qname.space, qname.local));
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
	
	public function getProperty(name : String)
	{
		return first(function(n, i) return Reflect.field(n.dom, name));
	}
	
	public function property(name : String, ?v : String, ?f : Node<TData> -> Int -> String) : Selection<TData>
	{
		function propertyNull(n : Node<TData>, _ : Int) Reflect.deleteField(n.dom, name);
		function propertyConstant(n : Node<TData>, _ : Int) Reflect.setField(n.dom, name, v);
		function propertyFunction(n : Node<TData>, i : Int) {
			var x = f(n,i);
			if (x == null)
				Reflect.deleteField(n.dom, name);
			else
				Reflect.setField(n.dom, name, x);
		}

		return each(f != null
			? propertyFunction : (null != v
			? propertyConstant
			: propertyNull));
	}
	
	public function getStyle(name : String)
	{
		return first(function(n, i) return untyped Lib.window.getComputedStyle(n.dom, null).getPropertyValue(name));
	}
	
	public function style(name : String, ?v : String, ?f : Node<TData> -> Int -> String, ?priority : String) : Selection<TData>
	{
		if (null == priority)
			priority = null; // fixes bug with Firefox
		function styleNull(n : Node<TData>, _ : Int) untyped n.dom.style.removeProperty(name);
		function styleConstant(n : Node<TData>, _ : Int) untyped n.dom.style.setProperty(name, v, priority);
		function styleFunction(n : Node<TData>, i : Int) {
			var x = f(n,i);
			if (x == null)
				untyped n.dom.style.removeProperty(name);
			else {
				untyped n.dom.style.setProperty(name, x, priority);
			}
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