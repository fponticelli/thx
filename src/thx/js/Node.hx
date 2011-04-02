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
	
	
	public function new(dom : HtmlDom)
	{
		this.dom = dom;
		if (null != dom)
			untyped dom.__thxnode__ = this;
		this.data = null;
		this.events = new Hash();
	}
	
	public static function many(els : Array<HtmlDom>)
	{
		return els.map(function(d, _) return new Node(d));
	}
}