package thx.xml;
using StringTools;

class NormalizeWhitespaceValueFormat extends ValueFormat
{
	var _wsReplace : EReg;
	var _wsTestStart : EReg;
	var _wsTestEnd : EReg;
	public function new()
	{
		super();
		_wsReplace   = ~/(\s+)/m;
		_wsTestStart = ~/^(\s)/;
		_wsTestEnd   = ~/(\s)$/;
	}
	
	override public function format(value : String)
	{
		var sws = _wsTestStart.match(value) ? " " : "";
		var ews = _wsTestEnd.match(value) ? " " : "";
		return sws + _wsReplace.replace(value, " ").trim() + ews;
	}
}