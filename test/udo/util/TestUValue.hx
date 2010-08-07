/**
 * ...
 * @author Franco Ponticelli
 */

package udo.util;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using udo.util.UValue;

class TestUValue
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestUValue());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
	
	public function testAlt()
	{
		Assert.equals("a", "a".alt("b"));
		var v : String = null;
		Assert.equals("b", v.alt("b"));
	}
}