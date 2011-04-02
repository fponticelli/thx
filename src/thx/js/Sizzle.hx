package thx.js;

import js.Dom;

extern class Sizzle
{
	public static function select(selector : String, ?doc : HtmlDom, ?result : Array<HtmlDom>) : Array<HtmlDom>;
	public static function matches(selector : String, ?set : Array<HtmlDom>) : Array<HtmlDom>;
	public static function find(selector : String, context : HtmlDom, isXml : Bool) : { set : Array<HtmlDom>, expr : String };
	public static function filter(selector : String, set : Array<HtmlDom>, inplace : Bool, not : Bool) : Array<HtmlDom>;
	public static function uniqueSort(list : Array<HtmlDom>) : Array<HtmlDom>;
	
	public static var selectors : {
		match		: Dynamic<String>,
		find		: Dynamic<Array<HtmlDom> -> HtmlDom -> Bool -> Void>,
		order		: Array<String>,
		relative	: Dynamic<Array<HtmlDom> -> String -> Bool -> Void>,
		preFilter	: Dynamic<HtmlDom -> Array<HtmlDom>>,
		filter		: Dynamic<HtmlDom -> String -> Bool>,
		attrMap		: Dynamic<String>,
		attrHandle	: Dynamic<HtmlDom -> String>,
		filters		: Dynamic<HtmlDom -> Int -> String -> Bool>,
		setFilters	: Dynamic<HtmlDom -> Int -> String -> Array<HtmlDom> -> Void>
	};
	
	private static function __init__() : Void untyped {
		#if !noEmbedJS
		haxe.macro.Tools.includeFile("thx/js/sizzle.js");
		#end
		var s : Dynamic = window.Sizzle;
		thx.js.Sizzle = s;
		thx.js.Sizzle.select = s;
	}
}