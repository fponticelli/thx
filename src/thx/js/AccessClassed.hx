package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.js.Selection;
using Arrays;

class AccessClassed<That> extends Access<That>
{
	public function new(selection : BaseSelection<That>)
	{
		super(selection);
	}

	public function remove(v : String)
	{
		selection.eachNode(function(node, i) {
			node.className = node.className.split(v).map(function(d, i) return StringTools.trim(d)).join(" ");
		});
		return _that();
	}
	
	public function add(v : String)
	{
		selection.eachNode(function(node, i) {
			var cls = node.className;
			if (cls.indexOf(v) >= 0)
				return;
			node.className += (node.className.length > 0 ? " " : "") + v;
		});

		return _that();
	}
}

class AccessDataClassed<T, That> extends AccessClassed<That>
{
	public function new(selection : BoundSelection<T, That>)
	{
		super(selection);
	}
}