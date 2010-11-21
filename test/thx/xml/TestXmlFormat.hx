/**
 * ...
 * @author Franco Ponticelli
 */

package thx.xml;

import utest.Runner; 
import utest.Assert; 
import utest.ui.Report;

class TestXmlFormat
{   
	public function new();
	
	public static function createCompleteDom()
	{
		var xml = Xml.createDocument();
		xml.addChild(Xml.createProlog("PROLOG"));
		xml.addChild(Xml.createDocType("DOCTYPE"));
		var body = Xml.createElement("body");
		xml.addChild(body);
		
		body.addChild(Xml.createComment("COMMENT"));
		var child = Xml.createElement("child");
		body.addChild(child);                  
		child.addChild(Xml.createElement("nested"));
		var child = Xml.createElement("child");
		body.addChild(child);                  
		child.addChild(Xml.createPCData(" "));
		body.addChild(Xml.createCData("CDATA"));
		body.addChild(Xml.createPCData("PCDATA"));
		return xml;
	}
	
	public function testBase()
	{
		var writer = new XmlFormat(false);
		Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><!--COMMENT--><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>", writer.format(createCompleteDom()));
	}
	
	public function testStripComments()
	{
		var writer = new XmlFormat(false);
		writer.stripComments = true;
		Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>", writer.format(createCompleteDom()));		
	}
	
	public function testAutoFormat()
	{
		var writer = new XmlFormat();
		Assert.equals("<?PROLOG?>\n<!DOCTYPE DOCTYPE>\n<body>\n  <!--COMMENT-->\n  <child>\n    <nested/>\n  </child>\n  <child>\n    \n  </child>\n  <![CDATA[CDATA]]>\n  PCDATA\n</body>", writer.format(createCompleteDom()));				
	}
   
	public function testAutoFormat2()
	{
		var writer = new XmlFormat();
		var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
		
		Assert.equals("<html>
  <head>
    <title>
      hello
    </title>
  </head>
  <body>
    <div>
      <ul>
        <li>
          one
        </li>
        <li>
          two
        </li>
        <li>
          three
        </li>
      </ul>
    </div>
  </body>
</html>", writer.format(Xml.parse(xml)));
	}

	public function testAutoWidth()
	{
		var writer = new XmlFormat();
		writer.wrapColumns = 36;
		var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
		Assert.equals(
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
</body>", writer.format(Xml.parse(xml)));
	} 
	
	public function testAutoWidthWithInlineElements()
	{
		var writer = new XmlFormat();
		writer.wrapColumns = 36;
		var xml = "<body><b>Lorem</b> ipsum <b>dolor sit</b> amet<p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
		Assert.equals(
"<body>
  <b>
    Lorem
  </b>
  ipsum
  <b>
    dolor sit
  </b>
  amet
  <p>
    consectetur
    <b>
      adipisicing
    </b>
    elit,
    <b>
      sed do
    </b>
    eiusmod tempor incididunt ut
    labore et dolore magna aliqua.
  </p>
  Ut enim ad minim veniam, quis
  nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea
  commodo consequat.
</body>", writer.format(Xml.parse(xml)));
	}

	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestXmlFormat());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}