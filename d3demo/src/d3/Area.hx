package d3;
import thx.math.scale.Linear;
/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class Area extends Example
{
	override function runExample()
	{
		var data = Ints.range(20).map(function(_,i) {
			return { x: i /19, y : (Math.sin(i / 3) + 1) / 2 };
		});
		
		var w = 450.0,
			h = 275.0,
			p = 20,
			x = new Linear().domain([0.0, 1]).range([0.0, w]),
			y = new Linear().domain([0.0, 1]).range([h, 0.0]);
		
		var vis = container
			.append("svg:svg")
				.attr("class").string("areaex")
				.data([data]).update()
					.attr("width").float(w + p * 2)
					.attr("height").float(h + p * 2)
					.append("svg:g")
						.attr("transform").string("translate(" + p + "," + p + ")");
					
		var rules = vis.selectAll("g.rule")
			.data(x.ticks())
			.enter()
				.append("svg:g")
					.attr("class").string("rule");
					
		rules.append("svg:line")
			.attr("x1").floatf(x.scale)
			.attr("x2").floatf(x.scale)
			.attr("y1").float(0)
			.attr("y2").float(h - 1);
			
		rules.append("svg:line")
			.attr("class").stringf(function(d,i) return d != 0 ? null : "axis")
			.attr("y1").floatf(y.scale)
			.attr("y2").floatf(y.scale)
			.attr("x1").float(0)
			.attr("x2").float(w + 1);
			
		rules.append("svg:text")
			.attr("x").floatf(x.scale)
			.attr("y").float(h + 3)
			.attr("dy").string(".71em")
			.attr("text-anchor").string("middle")
			.text().stringf(x.tickFormat);
			
		rules.append("svg:text")
			.attr("y").floatf(y.scale)
			.attr("x").float(-3)
			.attr("dy").string(".35em")
			.attr("text-anchor").string("end")
			.text().stringf(y.tickFormat);
			
		vis.append("svg:path")
			.attr("class").string("area")
			.attr("d").stringf(thx.svg.Area.pointObjectXY()
				.x (function(d,_) return x.scale(d.x))
				.y0(function(_,_) return h-1)
				.y1(function(d, _) return y.scale(d.y))
				.shape
		);
		
		vis.append("svg:path")
			.attr("class").string("line")
			.attr("d")
				.stringf(thx.svg.Line.pointObject()
				.x(function(d, _) return x.scale(d.x))
				.y(function(d, _) return y.scale(d.y))
				.shape
		);
		
		vis.selectAll("circle.area")
			.data(data)
			.enter()
				.append("svg:circle")
					.attr("class").string("area")
					.attr("cx").floatf(function(d,_) return x.scale(d.x))
					.attr("cy").floatf(function(d,_) return y.scale(d.y))
					.attr("r").float(3.5);
	}
	
	override function description() return "Area Chart from Math.sin() values. Not interactive."
}