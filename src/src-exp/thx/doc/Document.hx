package thx.doc;

/**
 * ...
 * @author Franco Ponticelli
 */

enum Fragment
{
	Abbreviation(abbr : Array<Fragment>, expanded : String);
	Code(code : String, isBlock : Bool, ?lang : String);
	DefinitionList(a : Array<{ terms : Array<Array<Fragment>>, data : Array<Array<Fragment>> }>);
	Emphasis(a : Array<Fragment>);
	Heading(a : Array<Fragment>, ?level : Null<Int>);
	HorizontalRule;
	Image(href : String, ?alt : String, ?title : String);
	InternalLink(reference : String, ?a : Array<Fragment>);
	LineBreak;
	Link(href : String, ?a : Array<Fragment>, ?title : String);
	Note(note : Array<Fragment>);
	OrderedList(a : Array<Item>, ?start : Int);
	Paragraph(a : Array<Fragment>);
	Quote(a : Array<Fragment>);
	Reference(a : Array<Fragment>, name : String);
	StrongEmphasis(a : Array<Fragment>);
	Table(rows : Array<TableRow>);
	Text(s : String);
	UnorderedList(a : Array<Array<Fragment>>);
}

typedef Item =
{
	content : Array<Fragment>,
	pos : Null<Int>
}

enum TableRow
{
	HeaderRow(cells : Array<TableCell>);
	Row(cells : Array<TableCell>);
}

typedef TableCell =
{
	content : Array<Fragment>,
	rowSpan : Null<Int>,
	colSpan : Null<Int>
}