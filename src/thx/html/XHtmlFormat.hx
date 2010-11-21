package thx.html;
import thx.xml.DocumentFormat;
import thx.xml.XmlFormat;

class XHtmlFormat extends XmlFormat
{
   	override function createDocumentFormat() : DocumentFormat
	{
		var document : DocumentFormat;
		if(autoformat)
		{
			var doc = new HtmlDocumentFormat();
		    if(null != indent)
		    	doc.indent = indent;
	  		if(null != newline)
				doc.newline = newline;
			if(null != wrapColumns)
				doc.wrapColumns = wrapColumns;
			document = doc;
		} else
			document = new DocumentFormat();
		if(null != stripComments)
			document.stripComments = stripComments;
		return document;
	}
}