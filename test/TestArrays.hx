import utest.Assert;
import utest.Runner;
import utest.ui.Report;
using Arrays;

class TestArrays
{
	public function testCreate()
	{
		Assert.same(2, [4, 2, 6].min());
		Assert.same([1, 0], [[1, 2, 3], [1, 0], [1, 2, 3, 4]].min(function(d : Array<Int>) return d.min()));
	}
	
	public function testMap()
	{
		Assert.same(["a", "b", "c"], [1, 2, 3].map(function(v, _) return String.fromCharCode(v + 96)));
		Assert.same([0, 1, 2], [null, null, null].map(function(_, i) return i));
	}
	
	public function testFlattenSplit()
	{
		var split = [1, 2, 3, null, 4, 5, 6, null, 7, 8, 9].split();
		Assert.same([[1, 2, 3], [4, 5, 6], [7, 8, 9]], split);
		Assert.same([1, 2, 3, 4, 5, 6, 7, 8, 9], split.flatten());
	}
	
	public function testSplit()
	{
		Assert.same([[1, 2, 3], [4, 5, 6]], [1, 2, 3, 100, 4, 5, 6].split(function(v, _) return v == 100));
		Assert.same([[1], [3], [5]], [1, 2, 3, 4, 5, 6].split(function(_, i) return i % 2 != 0));
	}
	
	public function testFormat()
	{
		var values = [1, .01, 6];
		Assert.equals("1, 0.01, 6", values.format());
		Assert.equals("$1.00, $0.01, $6.00", values.format("J:C"));
		Assert.equals("[]", [].format("J"));
		Assert.equals("empty", [].format("J:C,empty"));
		Assert.equals("$1.00;$0.01;$6.00", values.format("J:C,'',';'"));
		Assert.equals("$1.00;$0.01 ...", values.format("J:C,'',';',2"));
		Assert.equals("$1.00;$0.01 ... more", values.format("J:C,'',';',2,' ... more'"));
		
		Assert.equals("0", [].format("C"));
		Assert.equals("3", values.format("C"));
	}
	
	public function testInterpolate()
	{
		Assert.same([1.0, 1.0, 1.0], Arrays.interpolate(0.5, [1.0, 2.0, 3.0], [1.0, 0.0, -1.0]));
		Assert.same([1.0, 3.0], Arrays.interpolate(0.5, [1.0, 2.0, 3.0], [1.0, 4.0]));
		Assert.same([5.0, 1.0, -1.0], Arrays.interpolate(0.5, [1.0, 2.0], [9.0, 0.0, -1.0]));
	}
	
	public function testInterpolateStrings()
	{
		Assert.same(["b20", "a10"], Arrays.interpolateStrings(0.5, ["b10", "a20"], ["b30", "a0"]));
	}
	
	public function testInterpolateInts()
	{
		Assert.same([20, 10], Arrays.interpolateInts(0.5, [10,20], [30,0]));
	}
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestArrays());
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