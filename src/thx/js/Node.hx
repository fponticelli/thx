package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Dom;
using Arrays;

class Node<TData>
{
	public var data : TData;
	public var dom : HtmlDom;
	public function new(dom : HtmlDom)
	{
		this.dom = dom;
		this.data = null;
	}
	
	public static function many(els : Array<HtmlDom>)
	{
		return els.map(function(d, _) return new Node(d));
	}
}