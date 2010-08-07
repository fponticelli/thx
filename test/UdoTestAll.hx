/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Runner;
import utest.ui.Report;

class UdoTestAll
{
	public static function addTests(runner : Runner)
	{
		udo.collections.TestAll.addTests(runner);
		udo.error.TestAll.addTests(runner);
		udo.text.TestAll.addTests(runner);
		udo.type.TestAll.addTests(runner);
		udo.util.TestAll.addTests(runner);
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}