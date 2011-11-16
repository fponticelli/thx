package d3;
import js.Lib;
import thx.color.Hsl;

/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class NestedKey extends Example
{
	var _refresh : Dynamic -> Void;
	override function runExample()
	{
		var data = Ints.range(10).map(function(_,_) return Ints.range(10).map(function(_,_) return Std.random(360))),
			container = this.container;
		
		var table = container.append("table").attr("class").string("nestedkey");
		
		function transform()
		{
			var t = table
				.selectAll("tr")
					.data(data);

			t.enter().append("tr")
				.selectAll("td")
					.selfData()
				.enter().append("td")
					.style("background-color").stringf(function(d, i) return new Hsl(d, 1, .5).toHslString())
					.text().data();
					
			t.update().selectAll("td")
				.selfData()
				.update()
				.style("background-color").stringf(function(d, i) return new Hsl(d, 1, .5).toHslString())
				.text().data();
		}
		
		_refresh = function(_)
		{
			for (i in 0...10)
			{
				for (j in 0...10)
				{
					data[i][j] = (data[i][j] + 1) % 360;
				}
			}
			transform();
		}
		
		transform();

		untyped Lib.window.addEventListener("keypress", _refresh, false);
	}

	override function destroyExample()
	{
		untyped Lib.window.removeEventListener("keypress", _refresh, false);
	}
	
	override function description() return "Html table filled with data from a 2 dimensional array. Press any key to increment the values."
}