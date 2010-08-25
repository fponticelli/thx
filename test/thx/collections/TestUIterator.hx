/**
 * ...
 * @author Franco Ponticelli
 */

package thx.collections;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

class TestUIterator
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestUIterator());
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