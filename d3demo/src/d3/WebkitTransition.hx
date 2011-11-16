package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

import haxe.Timer;
import js.Lib;
import thx.color.Colors;
import thx.js.Dom;
import thx.math.EaseMode;
import thx.math.Equations;

using Arrays;

class WebkitTransition extends Example
{
	var transform : Void -> Void;
	override function runExample()
	{
		var container = this.container;
		container.append("div").attr("id").string("cells");
		
		var n = 10;

		container
			.select("#cells")
			.selectAll("div")
			.data(Ints.range(n))
			.enter().append("div")
				.attr("class").string("cell")
				.style("left").stringf(function(d, i) return (i * 30) + "px");
		
		transform = function()
		{
			container.selectAll(".cell")
				.data(Ints.range(n).map(function(d, i) return Math.random())).update()
					.style("top").stringf(function(d, i) {
						return ((1 - d) * 300) + "px";
					})
					.style("background-color").stringf(function(d, i) {
						return "rgb(" + Std.int(d * 255) + ",50,100)";
					})
					.text().floatf(function(d, i) {
						return Std.int(d * 100);
					})
			;
		}
		
		transform();
		untyped Lib.window.addEventListener("keypress", transform, false);
	}
	
	override function destroyExample()
	{
		untyped Lib.window.removeEventListener("keypress", transform, false);
	}
	
	override function description() return "Bar charts from random data. On Webkit browsers the bars are animated using CSS animation. Press a key to create a new set of random data."
}