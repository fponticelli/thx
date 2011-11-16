/**
 * ...
 * @author Franco Ponticelli
 */

package thx.date;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestDateParser());
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