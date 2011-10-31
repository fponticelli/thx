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
		g.parentNode = untyped gs.parentNode = untyped Lib.document.documentElement;
		return gs;
	} )();
	
	public static var selectionEngine = new SizzleEngine();

	inline public static function select(selector : String) : Selection
	{
		return doc.select(selector);
	}
	
	inline public static function selectAll(selector : String) : Selection
	{
		return doc.selectAll(selector);
	}
	
	inline public static function selectNode(node : HtmlDom) : Selection
	{
		return Selection.create([new Group([node])]);
	}
	
	inline public static function selectNodeData<T>(node : HtmlDom) : ResumeSelection<T>
	{
		return ResumeSelection.create([new Group([node])]);
	}
	
	public static var event : Event;
}