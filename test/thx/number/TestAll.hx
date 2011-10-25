/**
 * ...
 * @author Franco Ponticelli
 */

package thx.number;


import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		thx.number.TestAll.addTests(runner);
		runner.addCase(new TestParse());

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