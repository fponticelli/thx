package thx.doc;

import thx.doc.Document;
import thx.doc.markdown.MarkdownDocWriter;
using StringTools;

/**
 * ...
 * @author Franco Ponticelli
 */

class MarkdownDoc
{
	public function new(){}
	
	public function ofDoc(doc : Document) : String
	{
		var buf = new StringBuf();
		var writer = new MarkdownDocWriter(buf);
		writer.write(doc);
		return buf.toString().rtrim();
	}
	
	public function toDoc(markdown : String) : Document
	{
		return {
			content : Blocks([])
		};
	}
}