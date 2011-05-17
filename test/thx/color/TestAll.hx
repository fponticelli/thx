/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

import thx.color.Cmyk;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestCmyk());
		runner.addCase(new TestColors());
		runner.addCase(new TestHsl());
    	runner.addCase(new TestRgb());
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