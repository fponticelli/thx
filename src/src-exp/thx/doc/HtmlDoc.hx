package thx.doc;
import thx.doc.html.HtmlDocReader;
import thx.doc.html.HtmlDocWriter;
import thx.html.Html;
import thx.html.HtmlFormat;
import thx.html.HtmlVersion;
import thx.doc.Document;
import thx.xml.XmlWriter;

/**
 * ...
 * @author Franco Ponticelli
 */

class HtmlDoc
{
	var version : HtmlVersion;
	var fragment : Bool;

	public function new(?version : HtmlVersion, fragment = false)
	{
		this.version = version;
		this.fragment = fragment;
	}
	
	public function xmlOfDoc(doc : Array<Fragment>) : Xml
	{
		var writer = null;
		var xml = null;
		if (fragment)
		{
			xml = Xml.createDocument();
			writer = new HtmlDocWriter(xml);
		} else {
			xml = Html.createDocument(null == version ? Html401Transitional : version);
			writer = new HtmlDocWriter(Html.getBody(xml));
		}
		writer.write(doc);
		return xml;
	}
	
	public function ofDoc(doc : Array<Fragment>) : String
	{
		var xml = xmlOfDoc(doc);
		if (null != version)
		{
			var format = Html.getFormatter(version);
			return format.format(xml);
		} else {
			return xml.toString();
		}
	}
	
	public function toDoc(html : String) : Array<Fragment>
	{
		var reader = new HtmlDocReader();
		return reader.readString(html);
	}
}