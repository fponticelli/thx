package d3;

import js.Lib;
import thx.error.AbstractMethod;
import thx.js.Dom;
import js.Dom;

class Example
{
	var cid : String;
	var container : thx.js.Selection;
	public function new(cid : String)
	{
		this.cid = cid;
	}

	public function run()
	{
		var des = description();
		Dom.select("#description").html().string((null != des) ? des : "");

		container = Dom.select(cid)
			.attr("class").string(Type.getClassName(Type.getClass(this)).split(".").pop());
		runExample();
	}
	
	function runExample()
	{
		trace("abstract method: " + Type.getClassName(Type.getClass(this)) + ".runExample");
	}
	
	public function destroy()
	{
		destroyExample();
		container
			.attr("class").remove()
			.selectAll("*").remove();
			
		Dom.select("#haxe\\:trace").html().string("");
	}
	
	public function description() return null
	
	function destroyExample()
	{
		
	}
	
	function stageWidth()
	{
		return 678;
	}
}