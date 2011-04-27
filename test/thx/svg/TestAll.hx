/**
 * ...
 * @author Franco Ponticelli
 */

package thx.svg;

import utest.Runner;
import utest.ui.Report;
using Arrays;

class TestAll
{
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestArc());
		runner.addCase(new TestArea());
		runner.addCase(new TestChord());
		runner.addCase(new TestLine());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	function split(s : String)
	{
		return (~/[, A-Z]/g).split(s).filter(function(s) return "" != s).map(function(v, _) return Floats.parse(v));
	}
	
	public function new();
}