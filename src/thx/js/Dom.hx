package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Dom;
import js.Lib;

class Dom
{

	public static var doc = (function() {
	var gs = new Selection<Dynamic>([new Group(new Node(Lib.document))]);
		gs.parentNode = new Node(untyped Lib.document.documentElement);
		return gs;
	} )();
	
	public static var selectionEngine = new SizzleEngine();

	public static function select(selector : String)
	{
		return doc.select(selector);
	}
	
	public static function selectNode<TData>(node : Node<TData>)
	{
		return new Selection<TData>([new Group(node)]);
	}
	
	public static function selectDom(dom : HtmlDom)
	{
		return new Selection([new Group(new Node(dom))]);
	}
	
	public static var event : Event;
}