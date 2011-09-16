/**
 * ...
 * @author Franco Ponticelli
 */

import thx.culture.Culture;
import thx.util.Imports;
import utest.Runner;
import utest.ui.Report;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		Imports.pack("thx.json", true);
		Imports.pack("thx.svg", true);
		Imports.pack("thx.geo", true);
		
		
		Culture.defaultCulture = thx.cultures.EnUS.culture;
#if js
		thx.js.TestAll.addTests(runner);
#end
		thx.collection.TestAll.addTests(runner);
		thx.color.TestAll.addTests(runner);
		runner.addCase(new thx.data.TestValueEncoder());
		runner.addCase(new thx.data.TestValueHandler());
		thx.date.TestAll.addTests(runner);
		runner.addCase(new thx.csv.TestCsv());
		runner.addCase(new thx.json.TestJson());
		runner.addCase(new thx.ini.TestIni());
		thx.error.TestAll.addTests(runner);
		thx.text.TestAll.addTests(runner);
		thx.html.TestAll.addTests(runner);
		thx.math.TestAll.addTests(runner);
		thx.svg.TestAll.addTests(runner);
		thx.xml.TestAll.addTests(runner);
		thx.type.TestAll.addTests(runner);
		thx.util.TestAll.addTests(runner);
		thx.validation.TestAll.addTests(runner);
		
		TestArrays.addTests(runner);
		TestFloats.addTests(runner);
		runner.addCase(new TestDates());
		TestInts.addTests(runner);
		TestIterators.addTests(runner);
		TestHashes.addTests(runner);
		TestObjects.addTests(runner);
		TestStrings.addTests(runner);
		
//		TestAllExp.addTests(runner);
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}