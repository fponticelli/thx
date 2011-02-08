/**
 * ...
 * @author Franco Ponticelli
 */

package thx.color;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

import thx.color.CMYKColor;

class TestAll
{
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestRGBColor());
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