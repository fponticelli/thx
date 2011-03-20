/**
 * ...
 * @author Franco Ponticelli
 */

package thx.text;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		TestPaths.addTests(runner);
		TestStrings.addTests(runner);
		TestInflections.addTests(runner);
		
		runner.addCase(new thx.text.json.TestJson());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
}