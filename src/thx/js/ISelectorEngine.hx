package thx.js;

import js.Dom;

interface ISelectorEngine
{
	public function select(selector : String, node : HtmlDom) : Null<HtmlDom>;
	public function selectAll(selector : String, node : HtmlDom) : Array<HtmlDom>;
}