/**
 * ...
 * @author Franco Ponticelli
 */

import thx.cultures.ItIT;
import utest.Assert;
import utest.Runner;
import utest.ui.Report;
import thx.math.Equations;

using Strings;

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
	
	public function new(){}
	
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
		Assert.equals("CAB", Strings.format("{2}{0}{1}", ["A", "B", "C"]));
		Assert.equals("C.A.B", Strings.format("{2}.{0}.{1}", ["A", "B", "C"]));
		Assert.equals("X.", Strings.format("{0:T,1,.}", ["XYZ"]));
		Assert.equals("{0INVALIDMODIFIER}", Strings.format("{0INVALIDMODIFIER}", ["X"]));
		Assert.equals("$1,000.01", Strings.format("{0:C}", [1000.01]));
		Assert.equals("€ 1.000,01", Strings.format("{0:C}", [1000.01], ItIT.culture));
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
	
	public function testInterpolate()
	{
		var a = Floats.interpolatef(10, 100);
		var b = Floats.interpolatef(20, 200);

		var tests = [
			{ test : function(t) return "a" + a(t) + "b" + b(t), a : "a10b20", b : "a100b200" },
			{ test : function(t) return "a" + a(t) + "b" + b(t), a : "a10b20c10", b : "a100b200" },
			{ test : function(t) return "a" + a(t) + "b" + b(t) + "c10", a : "a10b20", b : "a100b200c10" },
			{ test : function(t) return "a" + a(t) + "b" + b(t) + "s", a : "a10b20s", b : "a100b200s" },
			{ test : function(t) return "a" + a(t) + "b" + b(t), a : "a10b20s", b : "a100b200" },
			{ test : function(t) return "a" + a(t) + "b" + b(t) + "s", a : "a10b20", b : "a100b200s" },
		];
		for (test in tests)
		{
			var f = Strings.interpolatef(test.a, test.b);
			var qt = 10;
			for (i in 0...qt+1)
			{
				var t = i / qt;
				Assert.equals(test.test(t), f(t));
			}
		}
		
		Assert.equals("rgb(100,200,50)", Strings.interpolate(0.5, "rgb(100,200,50)", "rgb(100,200,50)"));
		Assert.equals("rgb(150,125,100)", Strings.interpolate(0.5, "rgb(100,200,50)", "rgb(200,50,150)"));
		
	}
}