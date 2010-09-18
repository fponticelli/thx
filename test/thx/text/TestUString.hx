/**
 * ...
 * @author Franco Ponticelli
 */

package thx.text;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using thx.text.UString;

class TestUString
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestUString());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
	
	public function testUcwordsws()
	{
		var tests = [
			{ expected : "Test", test : "test" },
			{ expected : "Test Test", test : "test test" },
			{ expected : " Test Test  Test ", test : " test test  test " },
			{ expected : "Test\nTest", test : "test\ntest" },
			{ expected : "Test\tTest", test : "test\ttest" },
		];
		for (item in tests)
			Assert.equals(item.expected, item.test.ucwordsws());
	}
	
	public function testUcwords()
	{
		var tests = [
			{ expected : "Test", test : "test" },
			{ expected : "Test Test", test : "test test" },
			{ expected : " Test-Test:Test_Test : Test ", test : " test-test:test_test : test " },
			{ expected : "Test\nTest", test : "test\ntest" },
			{ expected : "Test\tTest", test : "test\ttest" },
		];
		for (item in tests)
			Assert.equals(item.expected, item.test.ucwords());
	}
	
	public function testAlphaNum()
	{
		var tests = [
			{ expected : true, test : "a" },
			{ expected : true, test : "1a" },
			{ expected : false, test : " a" },
			{ expected : false, test : " " },
			{ expected : false, test : "" },
		];
		for (item in tests)
			Assert.equals(item.expected, item.test.isAlphaNum());
	}
	
	public function testFormat()
	{
		Assert.equals("CAB", UString.plainFormat("{2}{0}{1}", ["A", "B", "C"]));
		Assert.equals("C.A.B", UString.plainFormat("{2}.{0}.{1}", ["A", "B", "C"]));
		Assert.equals("X", UString.plainFormat("{0:MODIFIER}", ["X"]));
		Assert.equals("{0INVALIDMODIFIER}", UString.plainFormat("{0INVALIDMODIFIER}", ["X"]));
#if hxculture
		Assert.equals("CAB", UString.format("{2}{0}{1}", ["A", "B", "C"]));
		Assert.equals("C.A.B", UString.format("{2}.{0}.{1}", ["A", "B", "C"]));
		Assert.equals("X.", UString.format("{0:T,1,.}", ["XYZ"]));
		Assert.equals("{0INVALIDMODIFIER}", UString.format("{0INVALIDMODIFIER}", ["X"]));
#end
	}  
	
	public function testHumanize()
	{
		Assert.equals("hello world", UString.humanize("helloWorld"));
		Assert.equals("my long string", UString.humanize("my_long_string"));
		Assert.equals("ignore many", UString.humanize("ignoreMANY"));
	}
}