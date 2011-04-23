package thx.doc.html;
import thx.doc.Document;
import thx.html.Html;
import thx.html.Element;
/**
 * ...
 * @author Franco Ponticelli
 */

class HtmlDocReader
{
	public function new();
	
	public function readString(html : String) : Array<Fragment>
	{
		var dom = Html.toXml(html);
		return readXml(dom);
	}
	
	public function readXml(dom : Xml) : Array<Fragment>
	{
		var xml = dom;
		var body = Html.getBody(dom);
		if (null != body)
			xml = body;
		return parseChildren(xml);
	}
	
	function parseNode(xml : Xml)
	{
		switch(xml.nodeType)
		{
			case Xml.CData, Xml.PCData:
				return [Text(xml.nodeValue)] ;
			case Xml.Element:
				return parseElement(xml);
//			case Xml.Comment:
//			case Xml.DocType:
//			case Xml.Document:
//			case Xml.Prolog:
		}
	}
	
	function parseElement(el : Xml)
	{
		var name = el.nodeName.toLowerCase();
		switch(name)
		{
			case "a":
				var href = el.get("href");
				if (href.substr(0, 1) == "#")
					return [InternalLink(href.substr(1), parseChildren(el))];
				else
					return [Link(href, parseChildren(el), el.get("title"))];
			case "abbr":
				// TODO
			case "acronym":
				// TODO
			case "address":
				// TODO
			case "article":
				// TODO
			case "aside":
				// TODO
			case "audio":
				// TODO: show inner children
			case "b":		return [StrongEmphasis(parseChildren(el))];
			case "blockquote":
				// TODO: attr:cite
			case "br":		return [LineBreak];
			case "caption":
				// TODO inside table
			case "cite":
				// TODO
			case "code":
				// TODO
			case "del":
				// TODO
			case "details":
				// TODO attr:open
			case "dfn":
				// TODO
			case "dd":
				// TODO
			case "dl":
				// TODO
			case "dt":
				// TODO
			case "div":
				// TODO
			case "em":		return [Emphasis(parseChildren(el))];
			case "figure":
				// TODO
			case "figcaption":
				// TODO inside figure
			case "footer":
				// TODO
			case "h1", "h2", "h3", "h4", "h5", "h6":
				return [Heading(parseChildren(el), Std.parseInt(name.substr(1)))];
			case "header":
				// TODO
			case "hr":		return [HorizontalRule];
			case "i":		return [Emphasis(parseChildren(el))];
			case "img":		return [Image(el.get("src"), el.get("alt"), el.get("title"))];
			case "ins":
				// TODO
			case "kbd":
				// TODO
			case "legend":
				// TODO
			case "li":
				// TODO
			case "mark":
				// TODO
			case "ol":
				// TODO
			case "p":		return [Paragraph(parseChildren(el))];
			case "q":
				// TODO attr:cite
			case "pre":
				// TODO
			case "progress":
				// TODO
			case "s":
				// TODO
			case "samp":
				// TODO
			case "section":
				// TODO
			case "small":
				// TODO
			case "span":	return parseChildren(el);
			case "strong":	return [StrongEmphasis(parseChildren(el))];
			case "sub":
				// TODO
			case "summary":
				// TODO inside details
			case "sup":
				// TODO
			case "table":
				// TODO
			case "tbody":
				// TODO
			case "td":
				// TODO
			case "tfoot":
				// TODO
			case "th":
				// TODO
			case "thead":
				// TODO
			case "time":
				// TODO attrs: datetime, pubdate
			case "tr":
				// TODO
			case "ul":
				// TODO
			case "var":
				// TODO
			case "wbr":
				// TODO
			default:		return parseChildren(el);
		}
		return [];
	}
	
	function parseChildren(el : Xml)
	{
		var a = [];
		for (child in el)
		{
			var af = parseNode(child);
			for(f in af)
				a.push(f);
		}
		return a;
	}
}