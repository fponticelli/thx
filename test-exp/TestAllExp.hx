/**
 * ...
 * @author Franco Ponticelli
 */

import thx.culture.Culture;
import utest.Runner;
import utest.ui.Report;

class TestAllExp
{
	public static function addTests(runner : Runner)
	{
		Culture.defaultCulture = thx.cultures.EnUS.culture;
		thx.doc.TestAll.addTests(runner);
		thx.load.TestAll.addTests(runner);
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}