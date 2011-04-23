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
	public var trimvalues(default, null) : Bool;
	public var emptytonull(default, null) : Bool;
	var handler : IDataHandler;
	
	public function new(handler : IDataHandler, delimiter = ",", trimvalues = false, emptytonull = false)
	{
		this.handler = handler;
		this.delimiter = delimiter;
		this.trimvalues = trimvalues;
		this.emptytonull = emptytonull;
		_end = new EReg("(" + ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|$)", "");
	}
	
	var _s : String;
	var _end : EReg;
	public function decode(s : String)
	{
		_s = s;
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
		handler.startArray();
		while (parseValue()) { }
		handler.endArray();
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
			typeToken(StringTools.replace(v, '""', '"'), false);
			if (!_end.match(_s))
				throw new Error("invalid string value '{0}'", _s);
			_s = _end.matchedRight();
			return _end.matched(0) == delimiter;
		}
		
		// UNQUOTED VALUE
		if (!_end.match(_s))
			throw new Error("invalid string value '{0}'", _s);

		_s = _end.matchedRight();
		typeToken(_end.matchedLeft(), trimvalues);
		if (_end.matched(0) == delimiter)
		{
			return true;
		} else {
			_s = StringTools.ltrim(_s);
			return false;
		}
	}
	
	function typeToken(s : String, trim : Bool)
	{
		if (trim)
			s = StringTools.trim(s);

		handler.startItem();
		if (Ints.canParse(s))
			handler.int(Ints.parse(s));
		else if (Floats.canParse(s))
			handler.float(Floats.parse(s));
		else if (Bools.canParse(s))
			handler.bool(Bools.parse(s));
		else if (Dates.canParse(s))
			handler.date(Dates.parse(s));
		else if (emptytonull && "" == s)
			handler.null();
		else
			handler.string(s);
		handler.endItem();
	}
}