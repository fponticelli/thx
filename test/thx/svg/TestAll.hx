/**
 * ...
 * @author Franco Ponticelli
 */

package thx.svg;

import haxe.PosInfos;
import utest.Assert;
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
	
	function assertSamePath(expected : String, value : String, ?pos : PosInfos)
	{
		var e = splitValues(expected);
		var v = splitValues(value);
		if (e.length != v.length)
			Assert.fail("paths do not match:" + expected + " VS " + value, pos);
		else
		{
			for (i in 0...e.length)
			{
				var a = e[i];
				var b = v[i];
				if (a.isFloat != b.isFloat)
					Assert.fail("paths do not match:" + expected + " VS " + value, pos);
				else 
				{
					if (a.isFloat)
						Assert.floatEquals(a.value, b.value, pos);
					else
						Assert.equals(a.value, b.value, pos);
				}
			}
		}
	}
	
	static var _renumber = ~/([+-]?\d+(\.\d+)?(e-?\d+)?)/;
	function splitValues(s : String)
	{
		var result : Array<{ value : Dynamic, isFloat : Bool }> = [];
		while (s.length > 0)
		{
			if (!_renumber.match(s))
			{
				result.push( { value : s, isFloat : false } );
				break;
			}
			var before = _renumber.matchedLeft();
			if (null != before && "" != before)
			{
				result.push( { value : before, isFloat : false } );
			}
			s = _renumber.matchedRight();
			result.push( { value : Std.parseFloat(_renumber.matched(1)), isFloat : true } );
		}
		return result;
	}
/*	
	function split(s : String)
	{
		return (~/[, A-Z]/g).split(s).filter(function(s) return "" != s).map(function(v, _) return Floats.parse(v));
	}
*/
	public function new(){}
}