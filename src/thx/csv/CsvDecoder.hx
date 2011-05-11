package thx.csv;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.data.IDataHandler;
import thx.error.Error;
import thx.text.ERegs;

class CsvDecoder
{
	public var delimiter(default, null) : String;
	public var emptytonull(default, null) : Bool;
	
	public var line(default, null) : Int;
	public var column(default, null) : Int;
	
	var handler : IDataHandler;
	
	public function new(handler : IDataHandler, delimiter = ",", emptytonull = false)
	{
		this.handler = handler;
		this.delimiter = delimiter;
		this.emptytonull = emptytonull;
		_end = new EReg("(" + ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|$)", "");
	}
	
	var _s : String;
	var _end : EReg;
	var _typers : Array<String->Dynamic>;
	
	public function decode(s : String)
	{
		_s = s;
		_typers = [];
		line = 1;
		handler.start();
		handler.startArray();
		while (_s.length > 0)
			parseLine();
		handler.endArray();
		handler.end();
	}
	
	function parseLine()
	{
		handler.startItem();
		column = 1;
		handler.startArray();
		while (parseValue())
			column++;
		handler.endArray();
		line++;
		handler.endItem();
	}
	
	function parseValue()
	{
		if (_s.substr(0, 1) == '"') // QUOTED VALUE
		{
			var pos = _s.indexOf('"', 1);
			while (_s.substr(pos+1, 1) == '"') // DOUBLE DOUBLE QUOTE
				pos = _s.indexOf('"', pos + 2);
			var v = _s.substr(1, pos - 1);
			_s = _s.substr(pos + 1);
			typeString(StringTools.replace(v, '""', '"'));
			if (!_end.match(_s))
				error(_s);
			_s = _end.matchedRight();
			return _end.matched(0) == delimiter;
		}
		
		// UNQUOTED VALUE
		if (!_end.match(_s))
			error(_s);

		_s = _end.matchedRight();
		if(line == 1)
			typeToken(_end.matchedLeft());
		else {
			var v = _end.matchedLeft();
			getTyper(v)(v);
		}
		if (_end.matched(0) == delimiter)
		{
			return true;
		} else {
			_s = StringTools.ltrim(_s);
			return false;
		}
	}
	
	function error(e)
	{
		return throw new Error("invalid string value '{0}' at line {1}, column {2}", [Strings.ellipsis(e, 50), line, column]);
	}
	
	
	function getTyper(s : String)
	{
		var typer = _typers[column];
		if (null == typer)
		{
			if (s == '') // can't guess type ... delegate to next
				return typeToken;
			if (Ints.canParse(s))
				typer = _typers[column] = typeInt;
			else if (Floats.canParse(s))
				typer = _typers[column] = typeFloat;
			else if (Bools.canParse(s))
				typer = _typers[column] = typeBool;
			else if (Dates.canParse(s))
				typer = _typers[column] = typeDate;
			else
				typer = _typers[column] = typeString;
		}
		return typer;
	}
	
	function typeToken(s : String)
	{
		if (Ints.canParse(s))
			typeInt(s);
		else if (Floats.canParse(s))
			typeFloat(s);
		else if (Bools.canParse(s))
			typeBool(s);
		else if (Dates.canParse(s))
			typeDate(s);
		else
			typeString(s);
	}
	
	function typeInt(s : String)
	{
		handler.startItem();
		handler.int(Ints.parse(s));
		handler.endItem();
	}
	
	function typeFloat(s : String)
	{
		handler.startItem();
		handler.float(Floats.parse(s));
		handler.endItem();
	}
	
	function typeBool(s : String)
	{
		handler.startItem();
		handler.bool(Bools.parse(s));
		handler.endItem();
	}
	
	function typeDate(s : String)
	{
		handler.startItem();
		handler.date(Dates.parse(s));
		handler.endItem();
	}
	
	function typeString(s : String)
	{
		handler.startItem();
		if (s == "" && emptytonull)
			handler.null();
		else
			handler.string(s);
		handler.endItem();
	}
}