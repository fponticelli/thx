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
	var gs = new Selection<Dynamic>([new Group(Node.create(Lib.document))]);
		gs.parentNode = Node.create(untyped Lib.document.documentElement);
		return gs;
	} )();
	
	public static var selectionEngine = new SizzleEngine();

	public static function select(selector : String)
	{
		return doc.select(selector);
	}
	
	public static function selectAll(selector : String)
	{
		return doc.selectAll(selector);
	}
	
	public static function selectNode<TData>(node : Node<TData>)
	{
		return new Selection<TData>([new Group(node)]);
	}
	
	public static function selectDom(dom : HtmlDom)
	{
		return new Selection([new Group(Node.create(dom))]);
	}
	
	public static var event : Event;
}