package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class Sort extends Example
{
	var height : Int;
	var width : Int;
	
	override function runExample()
	{
		height = 480;
		width = stageWidth();
		container.html().string("<div><input id='sort' type='checkbox' checked><label for='sort'>Ascending</label></div>");
		
		container
			.append("svg:svg")
			.attr("viewBox").string("0 0 " + width + " " + height);
		
		container.select("#sort")
			.onNode("change", sort);
			
		transform();
	}
	
	function transform()
	{
		var circle = container.select("svg")
			.style("width").string(width + "px")
			.style("height").string(height + "px")
			.selectAll("circle")
				.data(Ints.range(400).map(function(d, i) return Math.random()));

		var r = 50,
			w = width - r * 2,
			h = height - r * 2;
		circle.enter().append("svg:circle")
			.attr("cx").floatf(function(d, i) return r + Math.random() * w)
			.attr("cy").floatf(function(d, i) return r + Math.random() * h)
			.attr("r").float(0);
		
		container.selectAllData("circle")
			.transition()
				.duration(750)
				.attr("r").floatf(function(d : Float , i) return r * d);
				
		sort();
	}
	
	function sort(?_,?_)
	{
		container.selectAllData("circle")
			.sort(
				container.select("#sort").property("checked").get()
				? Floats.descending
				: Floats.ascending
			);
	}
	
	override function destroyExample()
	{
		container.select("#sort").onNode("change", null);
	}
	
	override function description() return "Random sized circles with transition. The checkbox forces the circles to be sorted on the z-index according to their size."
}