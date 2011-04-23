package thx.csv;
import thx.data.IDataHandler;
import thx.error.Error;
import thx.text.ERegs;
import thx.culture.FormatDate;

/**
 * ...
 * @author Franco Ponticelli
 */

class CsvEncoder implements IDataHandler
{
	public var delimiter(default, null) : String;
	public var nulltoempty(default, null) : Bool;
	public var newline(default, null) : String;
	public var encodedString(default, null) : String;
	
	var re : EReg;
	var buf : StringBuf;
	
	var lineContext : Bool;
	var valueContext : Bool;
	var firstLine : Bool;
	var firstValue : Bool;
	
	public function new(delimiter = ",", nulltoempty = true, newline = "\n")
	{
		this.delimiter = delimiter;
		this.nulltoempty = nulltoempty;
		this.newline = newline;
		re = new EReg('(' + ERegs.escapeERegChars(delimiter) + '|\n\r|\n|\r|")', "");
	}
	
	public function start()
	{
		buf = new StringBuf();
		firstLine = true;
		lineContext = true;
	}
	public function end()
	{
		encodedString = buf.toString();
	}
	
	public function startObject()
	{
		throw new Error("objects cannot be encoded to CSV");
	}
	public function startField(name : String) : Void;
	public function endField() : Void;
	public function endObject() : Void;
	
	public function startArray()
	{

	}
	public function startItem()
	{
		if (lineContext)
		{
			lineContext = false;
			firstValue = true;
			if (firstLine)
				firstLine = false;
			else
				buf.add(newline);
		} else {
			if (firstValue)
				firstValue = false;
			else
				buf.add(delimiter);
		}
	}
	public function endItem()
	{
		
	}
	public function endArray()
	{
		if (!lineContext)
			lineContext = true;
	}
	
	public function date(d : Date)
	{
		if (d.getSeconds() == 0 && d.getMinutes() == 0 && d.getHours() == 0)
			buf.add(Dates.format(d, "C", ["%Y-%m-%d"]));
		else
			buf.add(Dates.format(d, "C", ["%Y-%m-%d %H:%M:%S"]));
	}
	public function string(s : String)
	{
		if (re.match(s))
		{
			buf.add('"' + StringTools.replace(s, '"', '""') + '"');
		} else {
			buf.add(s);
		}
	}
	public function int(i : Int)
	{
		buf.add(i);
	}
	public function float(f : Float)
	{
		buf.add(f);
	}
	public function null()
	{
		if (!nulltoempty)
			buf.add("null");
	}
	
	public function bool(b : Bool)
	{
		buf.add(b ? "true" : "false");
	}
	
	public function comment(s : String)
	{
		// CSV does not support comments
	}
}