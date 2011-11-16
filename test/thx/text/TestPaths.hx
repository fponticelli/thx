/**
 * ...
 * @author Franco Ponticelli
 */

package thx.text;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestPaths
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestPaths());
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