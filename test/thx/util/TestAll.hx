/**
 * ...
 * @author Franco Ponticelli
 */

package thx.util;

import thx.util.TestResults;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		TestTypeLocator.addTests(runner);
		runner.addCase(new TestResults());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}