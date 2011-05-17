/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestIterators
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestIterators());
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