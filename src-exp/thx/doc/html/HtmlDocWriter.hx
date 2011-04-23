package thx.doc.html;
import thx.doc.Document;
import thx.doc.common.DocWriter;
import thx.xml.XmlWriter;

/**
 * ...
 * @author Franco Ponticelli
 */

class HtmlDocWriter extends DocWriter
{
	var writer : XmlWriter;
	var isOrdered : Bool;
	
	public var tagEm : String;
	public var tagStrong : String;
	public var referencePrefix : String;
	
	public function new(xml : Xml)
	{
		this.tagEm = "em";
		this.tagStrong = "strong";
		this.referencePrefix = "";
		this.writer = new XmlWriter(xml);
		
	}

	// BLOCKS
	override function writeCode(code : String, isBlock : Bool, language : Null<String>)
	{
		if (isBlock)
			writer.open("pre");
		writer
			.open("code")
			.attrIf(null != language, "class", "language-" + language)
			.text(code)
			.close();
		if (isBlock)
			writer.close();
	}
	override function writeQuote(s : Array<Fragment>)
	{
		writer.open("blockquote");
		writeFragments(s);
		writer.close();
	}
	override function writeDefinitionList(a : Array<{ terms : Array<Array<Fragment>>, data : Array<Array<Fragment>> }>)
	{
		var old = isOrdered;
		isOrdered = false;
		writer.open("dl");
		writeDefinitionTerms(a);
		writer.close();
		isOrdered = old;
	}
	override function writeHeading(a : Array<Fragment>, level : Null<Int>)
	{
		if (null == level || level < 1)
			level = 1;
		else if (level > 6)
			level = 6;
		writer.open("h" + level);
		writeFragments(a);
		writer.close();
	}
	override function writeHorizontalRule()
	{
		writer.tag("hr");
	}
	override function writeOrderedList(a : Array<Item>, start : Null<Int>)
	{
		var old = isOrdered;
		isOrdered = true;
		writer.open("ol");
		writeOrderedItems(a, start);
		writer.close();
		isOrdered = old;
	}
	override function writeParagraph(a : Array<Fragment>)
	{
		writer.open("p");
		writeFragments(a);
		writer.close();
	}
	override function writeTable(rows : Array<TableRow>)
	{
		writer.open("table");
		writeTableRows(rows);
		writer.close();
	}
	override function writeUnorderedList(a : Array<Array<Fragment>>)
	{
		var old = isOrdered;
		isOrdered = false;
		writer.open("ul");
		writeItems(a, "li");
		writer.close();
		isOrdered = old;
	}
	
	// INLINES
	override function writeAbbreviation(abbr : Array<Fragment>, expanded : String)
	{
		writer
			.open("abbr")
			.attr("title", expanded);
		writeFragments(abbr);
		writer.close();
	}

	override function writeEmphasis(a : Array<Fragment>)
	{
		writer.tag(tagEm);
		writeFragments(a);
		writer.close();
	}
	
	override function writeImage(href : String, alt : Null<String>, title : Null<String>)
	{
		writer.tag("image")
			.attr("src", href)
			.attrIf(null != alt, "alt", alt)
			.attrIf(null != title, "title", title);
	}
	
	override function writeInternalLink(reference : String, a : Null<Array<Fragment>>)
	{
		writer
			.open("a")
			.attr("href", "#" + ref(reference));
		if (null == a)
			writer.text(reference);
		else
			writeFragments(a);
		writer.close();
	}
	
	override function writeLineBreak()
	{
		writer.tag("br");
	}
	
	override function writeLink(href : String, a : Null<Array<Fragment>>, title : Null<String>)
	{
		writer
			.open("a")
			.attr("href", href)
			.attrIf(null != title, "title", title);
		if (null == a)
			writer.text(href);
		else
			writeFragments(a);
		writer.close();
	}
	
	override function writeNote(note : Array<Fragment>)
	{
		saveNote(note);
		var pos = "" + countNotes();
		writer
			.open("sub")
			.attr("id", "fnref:" + pos)
			.open("a")
			.attr("href", "#fn:" + pos)
			.attr("rel", "footnote")
			.text(pos)
			.close()
			.close();
	}
	
	override function writeReference(a : Array<Fragment>, name : String)
	{
		writer
			.open("span")
			.attr("id", ref(name));
		writeFragments(a);
		writer.close();
	}
	
	override function writeStrongEmphasis(a : Array<Fragment>)
	{
		writer.tag(tagStrong);
		writeFragments(a);
		writer.close();
	}
	
	override function writeText(s : String)
	{
		writer.text(s);
	}
	
	
	// OTHERS
	function writeDefinitionTerms(a : Array<{ terms : Array<Array<Fragment>>, data : Array<Array<Fragment>> }>)
	{
		for (t in a)
		{
			writeItems(t.terms, "dt");
			writeItems(t.data, "dd");
		}
	}
	
	function ref(v : String)
	{
		return referencePrefix + v;
	}
	
	function writeOrderedItems(a : Array<Item>, start : Null<Int>)
	{
		for (i in 0...a.length)
		{
			var item = a[i];
			var pos = (i == 0 && null != start && null == item.pos) ? start : item.pos;
			writer
				.open("li")
				.attrIf(null != pos, "value", "" + pos);
			writeFragments(item.content);
			writer.close();
		}
	}
	
	function writeItems(a : Array<Array<Fragment>>, tag : String)
	{
		for (i in a)
			writeItem(i, tag);
	}
	
	function writeItem(s : Array<Fragment>, tag : String)
	{
		writer.open(tag);
		writeFragments(s);
		writer.close();
	}

	function writeTableRows(a : Array<TableRow>)
	{
		for (r in a)
			writeTableRow(r);
	}
	
	function writeTableRow(r : TableRow)
	{
		writer.open("tr");
		switch(r)
		{
			case HeaderRow(cells):
				writeTableCells(cells, "th");
			case Row(cells):
				writeTableCells(cells, "td");
		}
		writer.close();
	}
	
	function writeTableCells(a : Array<TableCell>, tag : String)
	{
		for (c in a)
			writeTableCell(c, tag);
	}

	function writeTableCell(c : TableCell, tag : String)
	{
		writer
			.open(tag)
			.attrIf(null != c.colSpan && c.colSpan > 1, "colspan", "" + c.colSpan)
			.attrIf(null != c.rowSpan && c.rowSpan > 1, "rowspan", "" + c.rowSpan);
		writeFragments(c.content);
		writer.close();
	}
	
	override function writeFootNotes(notes : Array<Array<Fragment>>)
	{
		if (notes.length == 0)
			return;
		writer
			.open("div")
			.attr("class", "footnotes")
			.open("ol");
			
		for (i in 0...notes.length)
		{
			var pos = "" + (i + 1);
			writer
				.open("li")
				.attr("id", "fn:" + pos);
			writeFragments(notes[i]);
			
			writer
				.open("a")
				.attr("href", "#fnref:" + pos)
				.attr("rev", "footnote")
				.text("&#8617;")
				.close();
				
			writer.close();
		}
			
		writer
			.close()
			.close();
	}
}