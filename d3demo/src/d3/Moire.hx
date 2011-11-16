package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

class Moire extends Example
{
	override function runExample()
	{
		var w = stageWidth(),
			h = 500;
		
		var svg = container.append("svg:svg")
			.attr("width").float(w)
			.attr("height").float(h)
			.attr("pointer-events").string("all");
			
		svg.append("svg:g")
			.selectAll("circle")
				.data(Ints.range(110))
			.enter().append("svg:circle")
				.attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")")
				.attr("r").floatf(function(d,i) return d * 5);
		
		var circle = svg.append("svg:g")
			.selectAll("circle")
				.data(Ints.range(60))
			.enter().append("svg:circle")
				.attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")")
				.attr("r").floatf(function(d, i) return d * 3);
		
		svg.onNode("mousemove", function(n, i) {
			var mouse = thx.js.Svg.mouse(n),
				r = (Math.sqrt(mouse[0]) + 10) / 10;
				
			circle
				.attr("transform").string("translate(" + mouse + ")")
				.attr("r").floatf(function(d,i) { return d * r; });
		});
	}
	
	override function description() return "Moire effect. Move the mouse over the circles."
}