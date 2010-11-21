/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		thx.collections.TestAll.addTests(runner);
		thx.error.TestAll.addTests(runner);
		thx.text.TestAll.addTests(runner);
		thx.html.TestAll.addTests(runner);
		thx.xml.TestAll.addTests(runner);
		thx.type.TestAll.addTests(runner);
		thx.util.TestAll.addTests(runner);
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}