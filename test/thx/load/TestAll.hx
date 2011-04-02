/**
 * ...
 * @author Franco Ponticelli
 */

package thx.load;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
#if !js
		runner.addCase(new TestHttpLoader());
#end
		runner.addCase(new TestMemoryLoader());
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