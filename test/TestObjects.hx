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
	
	public function testInterpolate()
	{
		var a : Dynamic = {
			a : 10,
			b : "x1y2",
			color : "hsl(30, 0.1, 0.5)",
			d : "extra"
		};
		
		var b : Dynamic = {
			a : 20,
			b : "x3y4",
			color : "hsl(330, 0.3, 0.7)",
			e : "other"
		};
		
		var f = Objects.interpolatef(a, b);
		Assert.same({
			d : "extra",
			e : "other",
			a : 15,
			b : "x2y3",
			color : "rgb(171,142,147)"
		}, f(0.5));
	}
	
	public function testFlatten()
	{
		// empty
		Assert.same([], Objects.flatten({ }) );
		
		// one level
		Assert.same(
			[{ fields : ['a'], value : 1 }, { fields : ['b'], value : 2 }],
			Objects.flatten({ a : 1, b : 2 })
		);
		
		// two levels
		Assert.same(
			[
				{ fields : ['a', 'b'], value : 1 },
				{ fields : ['a', 'c'], value : 2 },
				{ fields : ['d', 'e'], value : 3 },
				{ fields : ['d', 'f'], value : 4 },
			],
			Objects.flatten({ a : { b : 1, c : 2}, d : { e : 3, f : 4 } })
		);
		
		// multiple levels
		Assert.same(
			[
				{ fields : ['a', 'b'], value : 1 },
				{ fields : ['a', 'c', 'd'], value : 2 },
				{ fields : ['a', 'c', 'e'], value : 3 },
				{ fields : ['a', 'c', 'f', 'g'], value : 4 },
				{ fields : ['h'], value : 5 },
			],
			Objects.flatten({ a : { b : 1, c : { d : 2, e : 3, f : { g : 4 }}}, h : 5 })
		);
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
	
	public function new(){}
}