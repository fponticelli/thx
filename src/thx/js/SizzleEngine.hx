package thx.js;
import thx.js.ISelectorEngine;
import js.Dom;

/**
 * ...
 * @author Franco Ponticelli
 */

class SizzleEngine implements ISelectorEngine
{

	public function new(){}
	
	public function select(selector : String, node : HtmlDom) : Null<HtmlDom>
	{
		return Sizzle.select(selector, node)[0];
	}
	
	public function selectNode(n : HtmlDom, p : HtmlDom) : Null<HtmlDom>
	{
		return Sizzle.select(cast n, p)[0];
	}
	
	public function selectAll(selector : String, node : HtmlDom) : Array<HtmlDom>
	{
		return Sizzle.uniqueSort(Sizzle.select(selector, node));
	}
}