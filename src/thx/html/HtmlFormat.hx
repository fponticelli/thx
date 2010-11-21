package thx.html;
import thx.xml.NodeFormat;
import thx.xml.AttributeFormat;
import thx.xml.XmlFormat;

class HtmlFormat extends XHtmlFormat
{
	public var useCloseSelf : Bool;
	public var quotesRemoval : Bool;
	public function new()
	{
		super();
		useCloseSelf = false;
		quotesRemoval = false;
	}
	
	override function createAttributeFormat() : AttributeFormat
	{
		if(quotesRemoval)
		    return new UnquotedHtmlAttributeFormat();
		else
			return new HtmlAttributeFormat();
	}
	
	override function createNodeFormat() : NodeFormat
	{        
		if(useCloseSelf)
		    return new CloseSelfHtmlNodeFormat();
		else
			return new HtmlNodeFormat();
	}
}