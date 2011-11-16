package thx.doc.markdown;
import thx.collection.HashList;
import thx.doc.common.DocWriter;
import thx.doc.Document;
import thx.doc.HtmlDoc;
import thx.html.HtmlVersion;

class MarkdownDocWriter extends DocWriter
{
	var buf : StringBuf;
	var prefixStack : Array<String>;
	var emSymbol : String;
	var strongSymbol : String;
	var links : HashList<String>;
	var linkIdPrefix : String;
	
	var htmldoc : HtmlDoc;
	
	
	public function new(buf : StringBuf)
	{
		this.buf = buf;
		this.prefixStack = [];
		this.emSymbol = "*";
		this.strongSymbol = "**";
		this.linkIdPrefix = "ln";
		this.links = new HashList();
	}
	
	// BLOCKS
	override function writeBlockcode(code : String, language : Null<String>)
	{
		buf.add(prefix() + "    " + code.split("\n").join("\n    ") + "\n");
	}
	override function writeBlockquote(a : Array<Fragment>)
	{
		prefixAdd("> ");
		writeBlocks(a);
		prefixPop();
	}
	override function writeBlockReference(a : Array<Fragment>, name : String)
	{
		buf.add(prefix());
		addHtml(Blocks([BlockReference(a, name)]));
		buf.add("\n");
	}
	override function writeDefinitionList(a : Array<{ terms : Array<Array<Fragment>>, data : Array<Array<Fragment>> }>)
	{
		buf.add(prefix());
		addHtml(Blocks([DefinitionList(a)]));
		buf.add("\n");
	}
	override function writeHeading(a : Array<Fragment>, level : Null<Int>)
	{
		if (null == level)
			level = 1;
		else if (level > 6)
			level = 6;
		switch(level)
		{
			case 1, 2:
				buf.add(prefix());
				var before = buf.toString().length;
				writeInlines(a);
				var len = buf.toString().length - before;
				if (len < 3)
					len = 3;
				buf.add("\n");
				buf.add(prefix());
				var s = level == 1 ? "=" : "-";
				buf.add(StringTools.lpad("", s, len));
				buf.add("\n");
			default:
				buf.add(prefix());
				var sym = StringTools.lpad("", "#", level);
				buf.add(sym + " ");
				writeInlines(a);
				buf.add(" " + sym + "\n");
		}
	}
	override function writeHorizontalRule()
	{
		buf.add(prefix());
		buf.add("- - -\n");
	}
	override function writeOrderedList(a : Array<Item>, s : Null<Int>)
	{
		if (null == s || s < 1)
			s = 1;
		for (e in a)
		{
			if (null != e.pos)
				s = e.pos;
			switch(e.content)
			{
				case Inlines(i):
					buf.add(s + "   ");
					writeInlines(i);
					buf.add("\n");
				case Blocks(b):
					b = b.copy();
					prefixAdd(s + "   ");
					writeBlock(b.shift());
					prefixPop();
					prefixAdd("    ");
					writeBlocks(b);
					prefixPop();
			}
			s++;
		}
	}
	override function writeParagraph(a : Array<Fragment>)
	{
		buf.add(prefix());
		writeInlines(a);
		buf.add("\n\n");
	}
	override function writeTable(rows : Array<TableRow>)
	{
		buf.add(prefix());
		addHtml(Blocks([Table(rows)]));
		buf.add("\n");
	}
	override function writeUnorderedList(a : Array<Array<Fragment>>)
	{
		for (e in a)
		{
			switch(e)
			{
				case Inlines(i):
					buf.add("*   ");
					writeInlines(i);
					buf.add("\n");
				case Blocks(b):
					b = b.copy();
					prefixAdd("*   ");
					writeBlock(b.shift());
					prefixPop();
					prefixAdd("    ");
					writeBlocks(b);
					prefixPop();
			}
		}
	}
	// INLINES
	override function writeAbbreviation(abbr : Array<Fragment>, expanded : String)
	{
		addHtml(Inlines([Abbreviation(abbr, expanded)]));
	}
	override function writeCode(code : String, lang : Null<String>)
	{
		buf.add(quoteCode(code));
	}
	override function writeEmphasis(a : Array<Fragment>)
	{
		buf.add(strongSymbol);
		writeInlines(a);
		buf.add(strongSymbol);
	}
	override function writeImage(href : String, alt : Null<String>, title : Null<String>)
	{
		buf.add("![");
		if (null != alt)
			buf.add(alt);
		buf.add("][");
		buf.add(addToLinks(href, title));
		buf.add("]");
	}
	override function writeInternalLink(reference : String, a : Null<Array<Fragment>>)
	{
		// not supported
		if(null != a)
			writeInlines(a);
	}
	override function writeLineBreak()
	{
		buf.add("  \n");
	}
	override function writeLink(href : String, a : Null<Array<Fragment>>, title : Null<String>)
	{
		buf.add("[");
		if (null == a)
			buf.add(href);
		else
			writeInlines(a);
		buf.add("][");
		buf.add(addToLinks(href, title));
		buf.add("]");
	}
	
	
	override function writeNote(note : Array<Fragment>);
	override function writeReference(a : Array<Fragment>, name : String)
	{
		addHtml(Inlines([Reference(a, name)]));
	}
	override function writeStrongEmphasis(a : Array<Fragment>)
	{
		buf.add(strongSymbol);
		writeInlines(a);
		buf.add(strongSymbol);
	}
	override function writeText(s : String)
	{
		buf.add(s);
	}
	
	override function writeFootNotes(notes : Array<Array<Fragment>>)
	{
		writeFootLinks();
		writeNotes(notes);
	}
	
	function writeFootLinks()
	{
		if (links.length == 0)
			return;
		buf.add("\n");
		
		for (i in 0...links.length)
		{
			var id = linkIdPrefix + (i + 1);
			buf.add("[" + id + "]: " + links.keyAt(i));
			var title = links.getAt(i);
			if (null != title)
				buf.add(' "' + title + '"');
		}
	}
	
	function writeNotes(notes : Array<Array<Fragment>>)
	{
		
	}
	
	static var re = ~/(`+)/;
	static function quoteCode(code : String)
	{
		var test = code;
		var len = 1;
		var pre = "";
		var first = true;
		while (re.match(test))
		{
			var n = re.matched(1).length;
			if (n > len)
				len = n;
			if (first)
			{
				first = false;
				if (re.matchedLeft() == "")
					pre = " ";
			}
		}
		var post = !first && re.matchedRight() == "" ? " " : "";
		var del = StringTools.lpad("", "`", len);
		return del + pre + code + pre + del;
	}
	
	function addToLinks(href : String, title : String)
	{
		var index = links.indexOf(href);
		if (index < 0)
		{
			links.set(href, title);
			return linkIdPrefix + links.length;
		} else {
			if (null == links.get(href))
				links.set(href, title);
			return linkIdPrefix + (index+1);
		}
	}
	
	function prefix()
	{
		return prefixStack.join("");
	}
	
	function prefixAdd(s : String)
	{
		prefixStack.push(s);
	}
	
	function prefixPop()
	{
		prefixStack.pop();
	}
	
	function addHtml(s : Array<Fragment>)
	{
		if (null == htmldoc)
			htmldoc = new HtmlDoc();
		buf.add(htmldoc.ofDoc({ content : s }));
	}
}