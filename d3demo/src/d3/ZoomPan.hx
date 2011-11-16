package d3;
import thx.js.Dom;
import thx.js.Selection;
import thx.math.scale.Linear;
import thx.js.behavior.Zoom;
using Arrays;

/**
 * ...
 * @author Franco Ponticelli
 */

class ZoomPan extends Example
{
	var size : Array<Float>;
	var padding : Array<Float>;
	var x : Linear;
	var y : Linear;
	var svg : Selection;
	var srcx : Array<Float>;
	var srcy : Array<Float>;
	
	function tx(d, _) return "translate(" + x.scale(d) + ",0)"
	function ty(d, _) return "translate(0," + y.scale(d) + ")"
	function stroke(d, _) {
		return d != 0.0 && d != null ? "#ccc" : "#666";
	}
	
	override function runExample()
	{
		size = [0.0+stageWidth(), 500];
		padding = [4.0, 4.0, 20.0, 40.0];
		x = new Linear()
			.domain([-1.42, 1.42])
			.range([0.0, size[0]]);
		
		srcx = x.getDomain();
		
		y = new Linear()
			.domain([1.0, -1.0])
			.range([0, size[1]]);
			
		srcy = y.getDomain();
		
		var me = this;
		svg = container
			.append("svg:svg")
				.attr("width").float(size[0] + padding[3] + padding[1])
				.attr("height").float(size[1] + padding[0] + padding[2])
				.attr("pointer-events").string("all")
				.eachNode(function(n,i) new Zoom().zoom(me.redraw)(n))
				.onNode("zoom", redraw)
			.append("svg:g")
				.attr("transform").string("translate(" + padding[3] + "," + padding[0] + ")");
		
		svg.append("svg:rect")
			.attr("width").float(size[0])
			.attr("height").float(size[1])
			.attr("stroke").string("#ccc")
			.attr("fill").string("none");
			
		redraw();
	}
	
	function redraw(?_,?_)
	{
		if (null != Zoom.event)
		{
//			Zoom.event.transform(x, y);
			var e = Zoom.event;
			x.transform(e.scale, e.tx, srcx[0], srcx[1]);
			y.transform(e.scale, e.ty, srcy[0], srcy[1]);
		}

		var fx = x.tickFormat,
			fy = y.tickFormat;
		
//		trace(x.ticks(10));

		var gx = svg.selectAll("g.x")
			.data(x.ticks(), fx)
			.update()
				.attr("transform").stringf(tx);
			
		gx.select("text")
			.text().stringf(fx);

		var gxe = gx.enter()
			.insert("svg:g", "rect")
//			.append("svg:g")
			.attr("class").string("x")
			.attr("transform").stringf(tx);

		gxe.append("svg:line")
			.attr("stroke").stringf(stroke)
			.attr("y1").float(0)
			.attr("y2").float(size[1]);
			
		gxe.append("svg:text")
			.attr("y").float(size[1])
			.attr("dy").string("1em")
			.attr("text-anchor").string("middle")
			.text().stringf(fx);
		
		gx.exit().remove();

		var gy = svg.selectAll("g.y")
			.data(y.ticks(), fy)
			.update()
			.attr("transform").stringf(ty);
			
		gy.select("text")
			.text().stringf(fy);

		var gye = gy.enter()
			.insert("svg:g", "rect")
			.attr("class").string("y")
			.attr("transform").stringf(ty);
			
		gye.append("svg:line")
			.attr("stroke").stringf(stroke)
			.attr("x1").float(0)
			.attr("x2").float(size[0]);
			
		gye.append("svg:text")
			.attr("x").float( -3)
			.attr("dy").string(".35em")
			.attr("text-anchor").string("end")
			.text().stringf(fy);
			
		gy.exit().remove();
	}
	
	override function description() return "Drag and zoom with your mouse"
}