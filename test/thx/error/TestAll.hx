/**
 * ...
 * @author Franco Ponticelli
 */

package thx.error;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestError());
		runner.addCase(new TestNullArgument());
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