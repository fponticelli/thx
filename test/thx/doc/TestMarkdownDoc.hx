package thx.doc;

import thx.doc.Document;
import utest.Assert;

class TestMarkdownDoc extends TestAll
{
	public function testSyntax()
	{
		var tests = [
			{ text : "title\n=====", expr : Heading([t("title")]) },
			{ text : "title\n=====", expr : Heading([t("title")], 1) },
			{ text : "title\n-----", expr : Heading([t("title")], 2) },
			{ text : "###### title ######", expr : Heading([t("title")], 6) },
			{ text : "text", expr : p("text") },
			{ text : "    code", expr : Blockcode("code") },
			{ text : "`code`", expr : Paragraph([Code("code")]) },
			{ text : "> text", expr : Blockquote([p("text")]) },
		];
		
		var doc = [];
		var converter = new MarkdownDoc();
		for (test in tests)
		{
			var s = converter.ofDoc(toDoc(test.expr));
			Assert.equals(test.text, s);
			Assert.same(toDoc(test.expr), converter.toDoc(test.text));
			
		}
	}
}