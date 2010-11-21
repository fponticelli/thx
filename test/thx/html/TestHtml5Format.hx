package thx.html;

import haxe.PosInfos;
import thx.html.HtmlParser;
import utest.Assert;

class TestHtml5Format
{
	public function new();
	
	var format : Html5Format;
	
	public function setup()
	{
		format = new Html5Format();
	}
	
	public function testUseCloseSelf()
	{
		assertProcessed("<ul>\n  <li>item\n</ul>", "<ul><li>item</li></ul>");
	}
	
	public function testDontUseCloseSelf()
	{
		format.useCloseSelf = false;
		assertProcessed("<ul>\n  <li>item</li>\n</ul>", "<ul><li>item</li></ul>");
	}
	
	public function testAutoQuotesRemoval()
	{
		assertProcessed('<img class="a b" id=c>', '<img class="a b" id="c"/>');
	}
	
	public function testAutoQuotesRemovalOff()
	{
		format.quotesRemoval = false;
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