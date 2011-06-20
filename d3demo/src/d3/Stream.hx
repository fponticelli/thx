package d3;
import thx.color.Colors;
import thx.geom.layout.Stack;

/**
 * ...
 * @author Franco Ponticelli
 */

class Stream extends Example
{
	var data0 : Array<Array<Point0>>;
	var data1 : Array<Array<Point0>>;
	var area : thx.svg.Area<Point0>;
	override function runExample()
	{
		container.append("button")
			.text().string("switch data")
			.onNode("click", transition);
		container.append("br");
			
			

		var n = 20,
			m = 200,
			color = Colors.interpolatef("#aad", "#556");
			
		data0 = new Stack().offset(StackOffset.Wiggle).stack(Streams.layers(n, m));
		data1 = new Stack().offset(Wiggle).stack(Streams.layers(n, m));
		
		var w = stageWidth(),
			h = 500.0,
			mx = m -1,
			my = Arrays.floatMax(data0.concat(data1), function(d) {
				return Arrays.floatMax(d, function(d) {
					return d.y0 + d.y;
				});
			});
		
		area = new thx.svg.Area<Point0>()
			.x(function(d, i) return d.x * w / mx)
			.y0(function(d, i) return h - d.y0 * h / my)
			.y1(function(d, i) return h - (d.y + d.y0) * h / my);
		
		var vis = container
			.append("svg:svg")
				.attr("width").float(w)
				.attr("height").float(h);
				
		vis.selectAll("path")
			.data(data0)
			.enter().append("svg:path")
				.attr("fill").stringf(function(d, i) return color(Math.random()))
				.attr("d").stringf(area.shape);

	}
	
	function transition(_,_)
	{
		var me = this;
		container.selectAllData("path")
			.dataf(function(_, _) {
				var d = me.data1;
				me.data1 = me.data0;
				return me.data0 = d;
			})
			.update()
			.transition()
				.delay(500)
				.duration(2500)
				.attr("d").stringf(function(d,i) return me.area.shape(d));
	}
	
	override function description() return "Stream chart. Datasets are randomly generated. Press the button to switch dataset."
	
}

typedef Point0 = {
	x : Float,
	y : Float,
	y0 : Float
}