/**
 * ...
 * @author Franco Ponticelli
 */

package thx.text;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using thx.text.Strings;

class TestStrings
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestStrings());
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
		Assert.equals("CAB", Strings.plainFormat("{2}{0}{1}", ["A", "B", "C"]));
		Assert.equals("C.A.B", Strings.plainFormat("{2}.{0}.{1}", ["A", "B", "C"]));
		Assert.equals("X", Strings.plainFormat("{0:MODIFIER}", ["X"]));
		Assert.equals("{0INVALIDMODIFIER}", Strings.plainFormat("{0INVALIDMODIFIER}", ["X"]));
#if hxculture
		Assert.equals("CAB", Strings.format("{2}{0}{1}", ["A", "B", "C"]));
		Assert.equals("C.A.B", Strings.format("{2}.{0}.{1}", ["A", "B", "C"]));
		Assert.equals("X.", Strings.format("{0:T,1,.}", ["XYZ"]));
		Assert.equals("{0INVALIDMODIFIER}", Strings.format("{0INVALIDMODIFIER}", ["X"]));
#end
	}
	
	public function testHumanize()
	{
		Assert.equals("hello world", Strings.humanize("helloWorld"));
		Assert.equals("my long string", Strings.humanize("my_long_string"));
		Assert.equals("ignore many", Strings.humanize("ignoreMANY"));
	}
	
	public function testWrapColumn()
	{
		var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
		
		Assert.equals(
"Lorem ipsum dolor
sit amet,
consectetur
adipisicing elit,
sed do eiusmod
tempor incididunt ut
labore et dolore
magna aliqua. Ut
enim ad minim
veniam, quis nostrud
exercitation ullamco
laboris nisi ut
aliquip ex ea
commodo consequat.",
text.wrapColumns(20));

		Assert.equals(
"    Lorem ipsum
    dolor sit amet,
    consectetur
    adipisicing
    elit, sed do
    eiusmod tempor
    incididunt ut
    labore et dolore
    magna aliqua. Ut
    enim ad minim
    veniam, quis
    nostrud
    exercitation
    ullamco laboris
    nisi ut aliquip
    ex ea commodo
    consequat.",
text.wrapColumns(20, "    "));

	}

	public function testWrapColumnPreserveNewLines()
	{
		var text = "Lorem ipsum dolor sit amet,\n\nconsectetur adipisicing elit";
		Assert.equals(
"Lorem ipsum dolor
sit amet,

consectetur
adipisicing elit",
text.wrapColumns(18));
	}
	
	public function testWrapColumnLong()
	{
		var text = "aaaaaaaaaa aaaa aaa aa";
		Assert.equals(
"aaaaaaaaaa
aaaa
aaa aa", text.wrapColumns(6));
	}
}