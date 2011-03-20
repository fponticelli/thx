package thx.doc;

import thx.doc.HtmlDoc;
import utest.Assert;
import thx.doc.Document;
import thx.html.HtmlVersion;

class TestHtmlDoc extends TestAll
{
	public function testOfDoc()
	{
		var tests = [
			{ text : "<h1>title</h1>", expr : Heading([t("title")]) },
			{ text : "<h6>title</h6>", expr : Heading([t("title")], 6) },
			{
				text : '<p>text<sub id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sub></p><div class="footnotes"><ol><li id="fn:1">note<a href="#fnref:1" rev="footnote">&amp;#8617;</a></li></ol></div>',
				expr : Paragraph([t("text"), Note([t("note")])])
			},
		];
		
		var converter = new HtmlDoc(true);
		for (test in tests)
		{
			Assert.equals(test.text, converter.ofDoc([test.expr]));
		}
	}
	
	public function testToDoc()
	{
		var tests = [
			
		];
		
		var converter = new HtmlDoc(true);
		for (test in tests)
		{
			Assert.equals([test.expr], converter.toDoc(test.text));
		}
	}
	
	public function testReversible()
	{
		var tests = [
			{ text : "<h1>title</h1>", expr : Heading([t("title")], 1) },
			{ text : "<p>text</p>", expr : p("text") },
			{ text : "<pre><code>code</code></pre>", expr : Code("code", true) },
			{ text : '<pre><code class="language-haxe">code</code></pre>', expr : Code("code", true, "haxe") },
			{ text : "<p><code>code</code></p>", expr : Paragraph([Code("code", false)]) },
			{ text : '<p><code class="language-haxe">code</code></p>', expr : Paragraph([Code("code", false, "haxe")]) },
			{ text : "<blockquote><p>text</p></blockquote>", expr : Quote([p("text")]) },
			
			//p, pre, div, blockquote, q, b, strong, i, em, h1, h2, h3, h4, h5, h6, br, hr, ul, ol, li, dl, dt, dd, span, code, a, img, abbr, acronym, sub, sup, table, td, tr, th, thead, tbody, tfoot, del, ins, kbd, tt, var
		];
		
		var converter = new HtmlDoc(true);
		for (test in tests)
		{
			var e = [test.expr];
			Assert.same(e, converter.toDoc(test.text));
			Assert.same(test.text, converter.ofDoc(e));
		}
	}
}