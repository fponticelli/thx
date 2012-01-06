package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import thx.js.Selection;
import thx.text.ERegs;
import js.Dom;
using Arrays;

class AccessClassed<That> extends Access<That>
{
	public function new(selection : BaseSelection<That>)
	{
		super(selection);
	}

	public function toggle(name : String)
	{
		if (exists(name))
			remove(name);
		else
			add(name);
		return _that();
	}

	public function exists(name : String) : Bool
	{
		return selection.firstNode(function(node) {
			var list = untyped node.classList;
			if (null != list)
				return list.contains(name);
			var cls : String = node.className;
			var re = getRe(name);
			var bv : String = untyped cls.baseVal;
			return re.match(null != bv ? bv : cls);
		});
	}

	public function remove(name : String)
	{
		selection.eachNode(callback(_remove, name));
		return _that();
	}

	function _remove(name : String, node : HtmlDom, i : Int) {
		var list = untyped node.classList;
		if (null != list)
		{
			list.remove(name);
			return;
		}

		var cls : String = node.className,
			clsb : Bool = untyped null != cls.baseVal,
			clsv : String = clsb ? untyped cls.baseVal : cls;

		var re = getRe(name);
		clsv = Strings.collapse(re.replace(clsv, " "));
		if (clsb)
		{
			untyped cls.baseVal = clsv;
		} else {
			node.className = clsv;
		}
	}

	// @todo add tests for this
	public function add(name : String)
	{
		selection.eachNode(callback(_add, name));
		return _that();
	}

	function _add(name : String, node : HtmlDom, i : Int)
	{
		var list = untyped node.classList;
		if (null != list)
		{
			list.add(name);
			return;
		}

		var cls : String = node.className,
			clsb : Bool = untyped null != cls.baseVal,
			clsv : String = clsb ? untyped cls.baseVal : cls;

		var re = getRe(name);
		if (!re.match(clsv))
		{
			clsv = Strings.collapse(clsv + " " + name);
			if (clsb)
				untyped cls.baseVal = clsv;
			else
				node.className = clsv;
		}
	}

	public function get() : String
	{
		var node = selection.node(),
			list = untyped node.classList;
		if (null != list)
		{
			return Ints.range(list.length).map(function(_, i) return list.item(i)).join(" ");
		}

		var cls : String = node.className,
			clsb : Bool = untyped null != cls.baseVal;

		if (clsb)
			return untyped cls.baseVal;
		else
			return cls;
	}

	inline static function getRe(name : String)
	{
		return new EReg("(^|\\s+)" + ERegs.escapeERegChars(name) + "(\\s+|$)", "g");
	}
}

class AccessDataClassed<T, That> extends AccessClassed<That>
{
	public function new(selection : BoundSelection<T, That>)
	{
		super(selection);
	}

	public function removef(v : T -> Int -> Null<String>)
	{
		var f = _remove;
		selection.eachNode(function(node, i) {
			var c = v(Access.getData(node), i);
			if (null != c)
				f(c, node, i);
		});
		return _that();
	}

	public function addf(v : T -> Int -> Null<String>)
	{
		var f = _add;
		selection.eachNode(function(node, i) {
			var c = v(Access.getData(node), i);
			if (null != c)
				f(c, node, i);
		});
		return _that();
	}
}