package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Dom;
import thx.collections.Set;
using Arrays;

class Node<TData>
{
	public var data : TData;
	public var dom : HtmlDom;
	public var events : Hash<Event -> Void>;
	public var transition : { active : Null<Int>, owner : Null<Int> };
	
	function new(dom : HtmlDom)
	{
		this.dom = dom;
		if (null != dom)
			untyped dom.__thxnode__ = this;
		this.data = null;
		this.events = new Hash();
		resetTransition();
	}
	
	public function resetTransition()
	{
		transition = { active : null, owner : null };
	}
	
	public static function many(els : Array<HtmlDom>)
	{
		return els.map(function(d, _) return create(d));
	}
	
	public static function create<TData>(el : HtmlDom) : Node<TData>
	{
		if (null == el || null == untyped el.__thxnode__)
			return new Node(el);
		else
			return untyped el.__thxnode__;
	}
}