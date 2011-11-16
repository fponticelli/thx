/**
 * ...
 * @author Franco Ponticelli
 */

package thx.math;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		thx.math.scale.TestAll.addTests(runner);
		runner.addCase(new TestRandom());
    	runner.addCase(new TestEquations());
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