/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestInts
{
	public function testRange()
	{
		Assert.same([0, 1, 2], Ints.range(3));
		Assert.same([3, 4, 5], Ints.range(3, 6));
		Assert.same([4, 6, 8], Ints.range(4, 9, 2));
		Assert.same([8, 6, 4], Ints.range(8, 3, -2));
	}
	
	public function testInterpolate()
	{
		Assert.equals(  0, Ints.interpolate(0.000, 0, 255));
		Assert.equals(127, Ints.interpolate(0.499, 0, 255));
		Assert.equals(255, Ints.interpolate(1.000, 0, 255));
	}
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestInts());
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