/**
 * ...
 * @author Franco Ponticelli
 */

package thx.html;

import haxe.PosInfos;
import utest.Runner;
import utest.Assert;
import utest.ui.Report;
import thx.html.HtmlParser;
using thx.html.TestHtmlParser;

class TestHtmlParser
{
	public function new();
	
	public function testMain()
	{
		var xml = Html.toXml('<?xml version="1.0"?><!doctype html><html><head><title></title></head><body></body></html>');
		xml.assertHasElement("html");
		xml.assertHasElement("html>head");
		xml.assertHasElement("html>head>title");
		xml.assertHasElement("html>body");
		var it = xml.iterator();
		Assert.equals(Xml.Prolog, it.next().nodeType);
		Assert.equals(Xml.DocType, it.next().nodeType);
	}
	
	static function assertHasElement(xml : Xml, element : String, ?pos : PosInfos)
	{
		var parts = element.split(">");
		var node = xml;
		while (null != node && parts.length > 0)
		{
			var it = node.elementsNamed(parts.shift());
			if (it.hasNext())
				node = it.next();
			else
				node = null;
		}
		Assert.isTrue(node != null, null, pos);
	}
}