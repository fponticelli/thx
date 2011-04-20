/**
 * ...
 * @author Franco Ponticelli
 */

package thx.svg;

import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestArc());
		runner.addCase(new TestArea());
		runner.addCase(new TestChord());
		runner.addCase(new TestLine());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}