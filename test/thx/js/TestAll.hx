/**
 * ...
 * @author Franco Ponticelli
 */

package thx.js;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;
// for inclusion purpose only
import thx.js.behavior.Zoom;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestAccessClassed());
		runner.addCase(new TestDom());
		runner.addCase(new TestSizzle());
		runner.addCase(new TestSelection());
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