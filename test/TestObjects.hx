import utest.Assert;
import utest.Runner;
import utest.ui.Report;
using Objects;
using Arrays;

class TestObjects
{
	static var testObject = { a : 1, b : 2, c : 3 };
	public function testKeys()
	{
		Assert.same(["a", "b", "c"], testObject.keys().order());
	}
	
	public function testValues()
	{
		Assert.same([1, 2, 3], testObject.values().order());
	}
	
	public function testEntries()
	{
		Assert.same([{ key : "a", value : 1 },{ key : "b", value : 2 },{ key : "c", value : 3 }], testObject.entries().order(function(a, b) return Reflect.compare(a.key, b.key)));
	}
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestObjects());
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