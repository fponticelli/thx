package thx.html;

import haxe.PosInfos;
import thx.html.HtmlParser;
import utest.Assert;

class TestXHtmlFormat
{
	public function new();
	
	var format : XHtmlFormat;
	
	public function setup()
	{
		format = new XHtmlFormat();
	}
	
	public function testBlockElement()
	{
		assertProcessed("<div></div>", "<div/>");
	}
	
	public function testEmptyElement()
	{
		assertProcessed("<br/>", "<br>doomed to be lost</br>");
	}
	
	public function testInlineElement()
	{
		assertProcessed("<div>hello <b>world</b></div>", "<div>hello <b>world</b></div>");
	}
	
	public function testFillAttribute()
	{
		assertProcessed('<input class="class" disabled="disabled"/>', '<input class="class" disabled="disabled"/>');
	}
	
	public function testInlineElementInLongParagraph()
	{
		format.wrapColumns = 28;
		assertProcessed(
"<p>
  Lorem ipsum dolor
  <b>sit</b> amet,
  consectetur <b>adipisicing
  elit</b>, sed do eiusmod
  tempor incididunt
  <b>ut</b> labore et dolore
  magna aliqua.
</p>", "<p>Lorem ipsum dolor <b>sit</b> amet, consectetur <b>adipisicing elit</b>, sed do eiusmod tempor incididunt <b>ut</b> labore et dolore magna aliqua.</p>");
	}
	
	public function testAutoFormat2()
	{
		var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
		assertProcessed("<html>
  <head>
    <title>hello</title>
  </head>
  <body>
    <div>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    </div>
  </body>
</html>", xml);
	}

	public function testAutoWidth()
	{
		format.wrapColumns = 36;
		var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
		assertProcessed(
"<body>
  <p>
    Lorem ipsum dolor sit amet,
    consectetur adipisicing elit,
    sed do eiusmod tempor incididunt
    ut labore et dolore magna
    aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation
    ullamco laboris nisi ut aliquip
    ex ea commodo consequat.
  </p>
  <ul>
    <li>
      Duis aute irure dolor in
      reprehenderit in voluptate
      velit esse cillum dolore eu
      fugiat nulla pariatur.
      Excepteur sint occaecat
      cupidatat non proident, sunt
      in culpa qui officia deserunt
      mollit anim id est laborum.
    </li>
  </ul>
</body>", xml);
	} 

	public function testAutoWidthWithInlineElements()
	{
		format.wrapColumns = 36;
		var xml = "<body><p><b>Lorem</b> ipsum <b>dolor sit</b> amet</p><p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
		assertProcessed(
"<body>
  <p>
    <b>Lorem</b> ipsum <b>dolor
    sit</b> amet
  </p>
  <p>
    consectetur <b>adipisicing</b>
    elit, <b>sed do</b> eiusmod
    tempor incididunt ut labore et
    dolore magna aliqua.
  </p>
  Ut enim ad minim veniam, quis
  nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea
  commodo consequat.
</body>", xml);
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