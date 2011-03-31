/**
 * ...
 * @author Franco Ponticelli
 */

package thx.js;

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
	public function testBody()
	{
		var data = Ints.range(10).map(function(_,_) return Std.random(60));
		var chart = Dom.select("body")
			.append("div")
				.attr("class", "chart");
		chart.selectAll("div")
			.data(data)
			.enter()
				.append("div")
					.style("width", function(n,_) return n.data * 10 + "px")
					.text(function(n,_) return "" + n.data);
		
	}
	
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