package d3;
import thx.js.Selection;
import thx.math.scale.Linear;
import thx.math.scale.Ordinal;
/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class Bar extends Example
{
	override function runExample()
	{
		var data = Ints.range(10).map(function(d, _) return Math.random());
		
		var w = 430,
			h = 230,
			x = new Linear().range([0.0, w]).modulo(10),
			y = new Ordinal().domain(Ints.range(data.length)).rangeBands(0, h, .2);
			
		var vis = container
			.append("svg:svg")
				.attr("class").string("barex")
				.attr("width").float(w + 40)
				.attr("height").float(h + 40)
			.append("svg:g")
				.attr("transform").string("translate(20,0)");
		
		var bars = vis.selectAll("g.bar")
			.data(data)
			.enter()
				.append("svg:g")
					.attr("class").string("bar")
					.attr("transform").stringf(function(d, i) return "translate(0," + y.scale(i) + ")");
		
		bars.append("svg:rect")
			.attr("fill").string("steelblue")
			.attr("width").floatf(x.scale)
			.attr("height").float(y.rangeBand);
			
		bars.append("svg:text")
			.attr("x").floatf(x.scale)
			.attr("y").float(y.rangeBand / 2)
			.attr("dx").float( -6)
			.attr("dy").string(".35em")
			.attr("fill").string("white")
			.attr("text-anchor").string("end")
			.text().stringf(x.modulo(100).tickFormat);
			
		x.modulo(10);
			
		bars.append("svg:text")
			.attr("x").float(0)
			.attr("y").float(y.rangeBand / 2)
			.attr("dx").float( -6)
			.attr("dy").string(".35em")
			.attr("text-anchor").string("end")
			.text().stringf(function(d, i) return String.fromCharCode(65 + i));
			
		var rules = vis.selectAll("g.rule")
			.data(x.ticks())
			.enter()
				.append("svg:g")
					.attr("class").string("rule")
					.attr("transform").stringf(function(d, i) return "translate(" + x.scale(d) + ",0)");
					
		rules.append("svg:line")
			.attr("y1").float(h)
			.attr("y2").float(h + 6)
			.attr("stroke").string("black")
			.attr("stroke-opacity").float(1);
			
		rules.append("svg:line")
			.attr("y1").float(0)
			.attr("y2").float(h)
			.attr("stroke").string("#333")
			.attr("stroke-opacity").float(.3);
		
		rules.append("svg:text")
			.attr("y").float(h + 9)
			.attr("dy").string(".71em")
			.attr("text-anchor").string("middle")
			.text().stringf(x.tickFormat);
			
		vis.append("svg:line")
			.attr("y1").float(0)
			.attr("y2").float(h)
			.attr("stroke").string("black");
	}
	
	override function description() return "Bar Chart from random data. Not interactive."
}