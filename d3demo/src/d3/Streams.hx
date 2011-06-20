package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class Streams
{
	static function bump(a : Array<Float>, m : Int)
	{
		var x = 1 / (.1 + Math.random()),
			y = 2 * Math.random() - .5,
			z = 10 / (.1 + Math.random());
		for (i in 0...m)
		{
			var w = (i / m - y) * z;
			a[i] += x * Math.exp( -w * w);
		}
	}
	
	public static function layers(n : Int, m : Int, o : Float = 0.0)
	{
		return Ints.range(n).map(function(_, _) {
			var a = [];
			for (i in 0...m)
				a[i] = o + o * Math.random();
			for (i in 0...5)
				bump(a, m);
			return a.map(streamIndex);
		});
	}
	
	public static function waves(n : Int, m : Int)
	{
		return Ints.range(n).map(function(i, _) {
			return Ints.range(m).map(function(j, _) {
				var x = 20 * j / m - i / 3;
				return 2 * x * Math.exp( -.5 * x);
			}).map(streamIndex);
		});
	}
	
	static function streamIndex(d : Float, i : Int)
	{
		return { x : .0 + i, y : Math.max(0.0, d) };
	}
}