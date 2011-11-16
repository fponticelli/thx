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
import thx.js.Access;
import thx.js.Transition;

class TransitionEquations extends Example
{
	static var transitions = [EaseInEaseOut, EaseOutEaseIn, EaseIn, EaseOut];
	static var current = -1;
	static function next()
	{
		current++;
		if (current == transitions.length)
			current = 0;
		return transitions[current];
	}
		
	var activeTransitions : Array<BaseTransition<Dynamic>>;
	function end()
	{
		if (container.select(".label").empty())
			return;
		runTransition();
	}
	function runTransition()
	{
		var width = (stageWidth() - 70) + "px";
		var end = this.end;
		var ease = next();
		var activeTransitions = this.activeTransitions = [];
		container
			.select(".label")
			.text().string(Strings.humanize(Std.string(ease)));
		container
			.selectAll("div.flying")
			.eachNode(function(n, i) {
				var f = Access.getData(n).f; // TODO find away to avoid Access.getData
				var t = Dom.selectNode(n)
					.transition()
					.delay(0)
					.duration(2500)
					.ease(f, ease)
					.style("left").string(current % 2 == 0 ? width : "5px");
				activeTransitions.push(t);
				if (i == 0)
					t.endNode(function(_,_) Timer.delay(end, 500));
			})
		;
	}
	
	override function runExample()
	{
		var equations = [
			{ n : "back", f : Equations.backf() },
			{ n : "bounce", f : Equations.bounce },
			{ n : "circle", f : Equations.circle },
			{ n : "elastic", f : Equations.elasticf() },
			{ n : "exponential", f : Equations.exponential },
			{ n : "linear", f : Equations.linear },
			{ n : "quadratic", f : Equations.quadratic },
			{ n : "cubic", f : Equations.cubic },
		];
		
		var color = Colors.interpolatef("aquamarine", "beige");
		
		container
			.append("div")
			.attr("class").string("transitions")
			.append("div")
			.attr("class").string("label");
		
		container
			.selectAll("div.flying")
			.data(equations)
				.enter()
				.append("div")
				.attr("class").string("flying")
				.text().stringf(function(d,i) return d.n)
				.style("position").string("absolute")
				.style("left").string("5px")
				.style("top").stringf(function(d,i) return (i*40 + 30) + "px")
				.style("background-color").stringf(function(d,i) return color(i/equations.length))
		;

		runTransition();
		
// TODO
// change transition.style to styleaccess
	}
	
	override function destroyExample()
	{
		Arrays.each(activeTransitions, function(t, _) {
			t.stop();
		});
	}
	
	override function description() return "Transition equations. Displays the effects of several equation over the transition from 2 points. Not interactive."
}