package thx.doc.common;
import thx.error.NotImplemented;
import thx.doc.Document;

/**
 * ...
 * @author Franco Ponticelli
 */

class DocWriter
{
	var _notes : Array<Array<Fragment>>;
	public function write(doc : Array<Fragment>)
	{
		_notes = [];
		writeFragments(doc);
		writeFootNotes(_notes);
	}
	
	// methods that should be overwritten
	// BLOCKS
	function writeCode(code : String, isBlock: Bool, language : Null<String>);
	function writeQuote(a : Array<Fragment>);
	function writeDefinitionList(a : Array<{ terms : Array<Array<Fragment>>, data : Array<Array<Fragment>> }>);
	function writeHeading(a : Array<Fragment>, level : Null<Int>);
	function writeHorizontalRule();
	function writeOrderedList(a : Array<Item>, s : Null<Int>);
	function writeParagraph(a : Array<Fragment>);
	function writeTable(rows : Array<TableRow>);
	function writeUnorderedList(a : Array<Array<Fragment>>);
	// INLINES
	function writeAbbreviation(abbr : Array<Fragment>, expanded : String);
	function writeEmphasis(a : Array<Fragment>);
	function writeImage(href : String, alt : String, title : Null<String>);
	function writeInternalLink(reference : String, a : Null<Array<Fragment>>);
	function writeLineBreak();
	function writeLink(href : String, a : Null<Array<Fragment>>, title : Null<String>);
	function writeNote(note : Array<Fragment>);
	function writeReference(a : Array<Fragment>, name : String);
	function writeStrongEmphasis(a : Array<Fragment>);
	function writeText(s : String);
	
	// others
	function writeFootNotes(notes : Array<Array<Fragment>>);
	
	// methods that should be left untouched
	function countNotes()
	{
		return _notes.length;
	}
	
	function saveNote(note : Array<Fragment>)
	{
		_notes.push(note);
	}
	
	function writeFragment(b : Fragment)
	{
		switch(b)
		{
			case Code(c, b, l):			writeCode(c, b, l);
			case Quote(s):				writeQuote(s);
			case DefinitionList(a):		writeDefinitionList(a);
			case Heading(a, l):			writeHeading(a, l);
			case HorizontalRule:		writeHorizontalRule();
			case OrderedList(a, s):		writeOrderedList(a, s);
			case Paragraph(a):			writeParagraph(a);
			case Table(r):				writeTable(r);
			case UnorderedList(a):		writeUnorderedList(a);
			
			case Abbreviation(a, e):	writeAbbreviation(a, e);
			case Emphasis(a):			writeEmphasis(a);
			case Image(h, a, t):		writeImage(h, a, t);
			case InternalLink(r, a):	writeInternalLink(r, a);
			case LineBreak:				writeLineBreak();
			case Link(h, a, t):			writeLink(h, a, t);
			case Note(n):				writeNote(n);
			case Reference(a, n):		writeReference(a, n);
			case StrongEmphasis(a):		writeStrongEmphasis(a);
			case Text(s):				writeText(s);
		}
	}
	
	function writeFragments(a : Array<Fragment>)
	{
		for (b in a)
			writeFragment(b);
	}
}