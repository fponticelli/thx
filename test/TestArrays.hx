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
	
	public function testSplitBy()
	{
		Assert.same([[1, 2, 3], [4, 5, 6]], [1, 2, 3, 100, 4, 5, 6].split(function(v, _) return v == 100));
		Assert.same([[1], [3], [5]], [1, 2, 3, 4, 5, 6].split(function(_, i) return i % 2 != 0));
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