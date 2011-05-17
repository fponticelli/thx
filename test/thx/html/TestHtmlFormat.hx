package thx.html;

import haxe.PosInfos;
import thx.html.HtmlParser;
import utest.Assert;

class TestHtmlFormat
{
	public function new(){}
	
	var format : HtmlFormat;
	
	public function setup()
	{
		format = new HtmlFormat();
	}

	public function testEmptyElement()
	{
		assertProcessed("<br>", "<br>doomed to be lost</br>");
	}
	
	public function testUseCloseSelf()
	{
		format.useCloseSelf = true;
		assertProcessed("<ul>\n  <li>item\n</ul>", "<ul><li>item</li></ul>");
	}
	
	public function testDontUseCloseSelf()
	{
		assertProcessed("<ul>\n  <li>item</li>\n</ul>", "<ul><li>item</li></ul>");
	}
	
	public function testFillAttribute()
	{
		assertProcessed('<input class="class" disabled>', '<input class="class" disabled="disabled"/>');
	}
	
	public function testAutoQuotesRemoval()
	{
		format.quotesRemoval = true;
		assertProcessed('<img class="a b" id=c>', '<img class="a b" id="c"/>');
	}
	
	public function testAutoQuotesRemovalOff()
	{
		assertProcessed('<img class="a b" id="c">', '<img class="a b" id="c"/>');
	}
	
	function assertProcessed(expected : String, input : String, ?pos : PosInfos)
	{
		Assert.equals(expected, toHtml(input), null, pos);
	}
	
	public function xmlToHtml(xml : Xml)
	{
		return format.format(xml);
	}
	
	public function toHtml(s : String)
	{
		return xmlToHtml(Xml.parse(s));
	}
}