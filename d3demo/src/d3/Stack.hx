package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

// TODO inferring type is not working properly in transition when passin to AccessTransitionData objects; needs to be fixed

import thx.color.Colors;
import thx.js.Dom;
import d3.Stream;
import thx.js.Selection;

class Stack extends Example
{
	static var m : Int;
	static var n : Int;
	static var mx : Float;
	static var my : Float;
	static var mz : Float;
	var data : Array<Array<Point0>>;
	static var p : Float;
	static var w : Float;
	static var h : Float;
	
	static function x(d : Point0, ?i : Int) return d.x * w / mx
	static function y0(d : Point0, ?i : Int) return h - d.y0 * h / my
	static function y1(d : Point0, ?i : Int) return h - (d.y + d.y0) * h / my
	static function y2(d : Point0, ?i : Int) return d.y * h / mz
			
	override function runExample()
	{
		container
			.append("button")
			.text().string("click to switch type")
			.onNode("click", click);
		container.append("br");
			
			
		n = 4;
		m = 36;
		data = new thx.geom.layout.Stack().stack(Streams.layers(n, m, .1));
		var color = Colors.interpolatef("#aad", "#556");

		p = 20.0;
		w = stageWidth();
		h = 500.0 - .5 - p;
		mx = m;
		my = Arrays.floatMax(data, function(a) {
			return Arrays.floatMax(a, function(d) {
				return d.y0 + d.y;
			});
		});
		mz = Arrays.floatMax(data, function(a) {
			return Arrays.floatMax(a, function(d) {
				return d.y;
			});
		});
		
		var vis = container
			.append("svg:svg")
				.attr("width").float(w)
				.attr("height").float(h + p);

		var layers = vis.selectAll("g.layer")
			.data(data)
			.enter().append("svg:g")
				.attr("fill").stringf(function(d, i) return color(i / (n - 1)))
				.attr("class").string("layer");
				
		var bars = layers.selectAll("g.bar")
			.dataf(function(d, i) return d)
			.enter().append("svg:g")
				.attr("class").string("bar")
				.attr("transform").stringf(function(d, i) return "translate(" + x(d) + ",0)");
				
		var t = bars.append("svg:rect")
			.attr("width").float(x( { x : .9, y : 0.0, y0 : 0.0 } ))
			.attr("x").float(0)
			.attr("y").float(h)
			.attr("height").float(0)
			.transition()
				.delay(function(n, i) return i * 10);
				
		t.attr("y").floatf(function(d, i) return y1(d));
		t.attr("height").floatf(function(d, i) return y0(d) - y1(d));

		var labels = vis.selectAll("text.label")
			.data(data[0])
			.enter().append("svg:text")
				.attr("class").string("label")
				.attr("x").floatf(x)
				.attr("y").float(h + 6)
				.attr("dx").float(x( { x : .45, y : 0.0, y0 : 0.0 } ))
				.attr("dy").string(".71em")
				.attr("text-anchor").string("middle")
				.text().floatf(function(d, i) return i);
				
		vis.append("svg:line")
			.attr("x1").float(0)
			.attr("x2").float(w - x( { x : .1, y : 0.0, y0 : 0.0 } ))
			.attr("y1").float(h)
			.attr("y2").float(h);
	}
	
	var current : Void -> Void;
	
	function click(d, i) {
		if (null == current || Reflect.compareMethods(current, transitionStack))
			current = transitionGroup;
		else
			current = transitionStack;
		Reflect.callMethod(this, current, []);
	}
	
	function transitionGroup()
	{
		var t = container.selectAllData("g.layer rect").transition()
			.duration(500)
			.delay(function(d, i) return (i % m) * 10);
			
		t.attr("x").floatf(function(d, i) return x( { x : .9 * ~~(i / m) / n, y : 0.0, y0 : 0.0 } ));
		t.attr("width").float(x( { x : .9 / n, y : 0.0, y0 : 0.0 } ));
		t.endNode(transitionGroupEnd);
	}
	
	function transitionStack()
	{
		var t = container.selectAllData("g.layer rect")
			.transition()
				.duration(500)
				.delay(function(d, i) return (i % m) * 10);
		t.attr("y").floatf(function(d, i) return y1(d));
		t.attr("height").floatf(function(d, i) return y0(d) - y1(d));
		t.endNode(transitionStackEnd);
	}
	
	function transitionGroupEnd(d, i : Int)
	{
		var t = Dom.selectNodeData(d)
			.transition()
				.duration(500);
		t.attr("y").floatf(function(d, i) return h - y2(d));
		t.attr("height").floatf(function(d,i) return y2(d));
	}
	
	function transitionStackEnd(d, i : Int)
	{
		Dom.selectNode(d)
			.transition()
				.duration(500)
				.attr("x").float(0)
				.attr("width").float(x( { x : .9, y : 0.0, y0 : 0.0 } ));
	}
	
	override function description() return "Stacked bars"
	
	
}