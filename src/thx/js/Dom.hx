package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import js.Dom;
import js.Lib;
import thx.js.Selection;

class Dom
{

	public static var doc : Selection = (function() {
		var g = new Group([cast Lib.document]),
			gs = Selection.create([g]);
		g.parentNode = gs.parentNode = untyped Lib.document.documentElement;
		return gs;
	} )();
	
	public static var selectionEngine = new SizzleEngine();

	public static function select(selector : String) : Selection
	{
		return doc.select(selector);
	}
	
	public static function selectAll(selector : String) : Selection
	{
		return doc.selectAll(selector);
	}
	
	public static function selectNode(node : HtmlDom) : Selection
	{
		return Selection.create([new Group([node])]);
	}
	
	public static function selectNodes(nodes : Array<HtmlDom>) : Selection
	{
		return Selection.create([new Group(nodes)]);
	}
	
	public static function selectNodeData<T>(node : HtmlDom) : ResumeSelection<T>
	{
		return ResumeSelection.create([new Group([node])]);
	}
	
	public static var event : Event;
}