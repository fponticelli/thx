package thx.xml;

import utest.Runner;
import utest.ui.Report;
import utest.Assert;

using StringTools;

class TestXmlWriter
{
	public var w(getWriter, null) : XmlWriter;
	public function testBasics()
	{
		Assert.equals("<doc/>", w.tag("doc").toString());
		
		Assert.equals('<doc a="b"/>', w.tag("doc").attr("a", "b").toString());
		
		Assert.equals("<doc></doc>", w.open("doc").close().toString());
		
		Assert.equals("<doc><node/></doc>", w.open("doc").tag("node").toString());
		
		Assert.equals('<doc att="value"/>', w.open("doc").attr("att", "value").toString());
		
		Assert.equals("<doc>c</doc>", w.open("doc").text("c").toString());
		
		// platforms are incongruent using trailing spaces in CDATA
		Assert.equals("<doc><![CDATA[]]&gt;]]></doc>", w.open("doc").cdata("]]>").toString().replace(" ", ""));
		
		Assert.equals("<doc>&amp;&lt;&amp;&gt;&amp;</doc>", w.open("doc").text("&<&>&").toString().replace(" ", ""));
		
		Assert.equals("<doc><!--c--></doc>", w.open("doc").comment("c").toString().replace(" ", ""));
		
		Assert.equals("<doc><node/><node/></doc>", w.open("doc").tag("node").tag("node").toString());
		
		Assert.equals("<node/><node/>", w.tag("node").tag("node").toString());
		
		Assert.equals("a<node/>b<node/>c", w.text("a").tag("node").text("b").tag("node").text("c").toString());
		
		Assert.is(w.xml(), Xml);
	}
	
	function getWriter()
	{
		return new XmlWriter();
	}
	
	public function new(){}
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestXmlWriter());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}