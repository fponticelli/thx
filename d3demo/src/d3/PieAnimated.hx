package d3;
import thx.geom.layout.Pie;
import thx.color.Categories;
import thx.svg.Arc;
import thx.math.Equations;

using Arrays;

/**
 * ...
 * @author Franco Ponticelli
 */

class PieAnimated extends Example
{
	var arc : Arc<{ startAngle : Float, endAngle : Float, innerRadius : Float, outerRadius : Float }>;
	var r : Float;
	override function runExample()
	{
		var w = this.stageWidth(),
			h = 400,
			data = Ints.range(10).map(function(_, _) return Math.random()),
			color = new thx.math.scale.Ordinal().range(Categories.category20),
			donut = new thx.geom.layout.Pie()
		;
		r = Math.min(w, h) / 2;
		arc = Arc.fromObject().outerRadius(r);

		var vis = container
			.append("svg:svg")
				.attr("width").float(w)
				.attr("height").float(h)
				.data([data.order(function(a, b) return Floats.compare(b, a))])
				.update();

		var arcs = vis.selectAll("g.arc")
			.dataf(donut.pie)
			.enter()
				.append("svg:g")
					.attr("class").string("arc")
					.attr("transform").string("translate(" + r + "," + r + ")");

		var path = arcs.append("svg:path")
			.attr("fill").stringf(function(d, i) return color.scale(i));

		path.transition()
			.ease(Equations.bounce)
			.duration(2000)
			.attr("d").stringTweenf(cast tweenPie);

		path.transition()
			.ease(Equations.elasticf())
			.delay(function(d, i) return 2000 + i * 50)
			.duration(750)
			.attr("d").stringTweenf(cast tweenDonut);
	}

	function tweenPie(b, _ : Int)
	{
		b.innerRadius = 0;
		var i = Dynamics.interpolatef( { startAngle: 0, endAngle: 0 }, b);
		var a = arc;
		return function(t) {
			return a.shape(i(t));
		};
	}

	function tweenDonut(b, _ : Int)
	{
		b.innerRadius = r * .6;
		var i = Dynamics.interpolatef( { innerRadius: 0 }, b);
		var a = arc;
		return function(t) {
			return a.shape(i(t));
		};
	}

	override function description() return "Animated Pie Chart from random data. Not interactive."
}