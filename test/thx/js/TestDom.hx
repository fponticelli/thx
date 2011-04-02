/**
 * ...
 * @author Franco Ponticelli
 */

package thx.js;

import thx.color.NamedColors;
import thx.color.Rgb;
import thx.js.Dom;
import js.Lib;
import js.Dom;
import utest.Assert;
import utest.Runner;
import utest.ui.Report;

import thx.js.Selection;
using Arrays;


class TestDom
{
/*
	public function testBody()
	{
		var data = Ints.range(20);
		var c = thx.color.Rgb.interpolatef(NamedColors.snow, NamedColors.black);
		var chart = Dom.select("body")
			.append("div")
				.attr("class", "chart");
		chart.selectAll("div")
			.data(data)
			.enter()
				.append("div")
					.style("width", function(n, _) return n.data * 10 + "px")
					.style("background-color", function(_, i) return c(i / data.length).toCss())
					.style("color", function(_, i) return Rgb.contrast(c(i / data.length)).toCss())
//					.style("color", function(_, i) return Rgb.contrastBW(c(i / data.length)).toCss())
					.on("click", function(n, i) Lib.alert(i + ": " + n.data))
					.text(function(n,_) return "" + n.data);
	}
*/
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestDom());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
}