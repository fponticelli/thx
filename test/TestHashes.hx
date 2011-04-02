/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using DynamicsT;

class TestHashes
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestHashes());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
	
	public function testCreate()
	{
		var hash = { name : "haxe", author : "nicolas" }.toHash();
		Assert.equals("haxe", hash.get("name"));
		Assert.equals("nicolas", hash.get("author"));
	}
}