import d3.Example;
import haxe.Firebug;
import thx.js.Dom;
using Strings;

class D3Examples 
{
	static var example : Example;
	static function main()
	{
		Firebug.redirectTraces();
		
		var classes = [
			d3.Area,
			d3.Bar,
			d3.CalendarVix,
			d3.Chord,
			d3.Moire,
			d3.NestedKey,
			d3.Pie,
			d3.PieAnimated,
			d3.Sort,
			d3.Stack,
			d3.Stream,
			d3.TransitionEquations,
			d3.WebkitTransition,
			d3.ZoomPan,
		];
		
		Dom
			.select("#examples")
			.selectAll("li")
				.data(classes)
				.enter()
					.append("li")
					.append("a")
						.html().stringf(description)
						.attr("href").string("#")
						.on("click", click)
						.first(function(d) click(d,0));
	}
	
	static function description(d : Class<Dynamic>, i : Int)
	{
		return Type.getClassName(d).split(".").pop().humanize();
	}
	
	static function click(d, i)
	{
		if (null != example)
			example.destroy();
		example = Type.createInstance(d, ["#example"]);
		example.run();
	}
}