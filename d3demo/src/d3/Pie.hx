package d3;
import thx.geom.layout.Pie;
import thx.math.scale.Categories;
import thx.svg.Arc;

using Arrays;

/**
 * ...
 * @author Franco Ponticelli
 */

class Pie extends Example
{
	override function runExample()
	{
		var w = this.stageWidth(),
			h = 400,
			r = Math.min(w, h) / 2,
			data = Ints.range(10).map(function(_, _) return Math.random()),
			color = Categories.cat20(),
			donut = new thx.geom.layout.Pie().sort(Floats.descending),
			arc = Arc.fromAngleObject().innerRadius(r * .6).outerRadius(r);
			
		var vis = container
			.append("svg:svg")
				.attr("width").float(w)
				.attr("height").float(h)
				.data([data])
				.update();

		var arcs = vis.selectAll("g.arc")
			.dataf(donut.pie)
			.enter()
				.append("svg:g")
					.attr("class").string("arc")
					.attr("transform").string("translate(" + r + "," + r + ")");

		arcs.append("svg:path")
			.attr("fill").stringf(function(d, i) return color.scale(i))
			.attr("d").stringf(arc.shape);

		arcs.append("svg:text")
			.attr("transform").stringf(function(d, i) {
				var c = arc.centroid(d);
				return "translate(" + c[0] + "," + c[1] + ")";
			})
			.attr("dy").string(".35em")
			.attr("text-anchor").string("middle")
			.attr("display").stringf(function(d, i) return d.value > .15 ? null : "none")
			.text().stringf(function(d, i) return Floats.format(d.value));
	}
	
	override function description() return "Pie Chart from random data. Not interactive."
}