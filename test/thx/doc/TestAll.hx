/**
 * ...
 * @author Franco Ponticelli
 */

package thx.doc;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;
import thx.doc.Document;

class TestAll
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestHtmlDoc());
//		runner.addCase(new TestMarkdownDoc());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
	
	function p(s : String)
	{
		return Paragraph([t(s)]);
	}
	
	function t(s : String)
	{
		return Text(s);
	}
}