package thx.data;

/**
 * ...
 * @author Franco Ponticelli
 */

interface IDataHandler
{
	public function start() : Void;
	public function end() : Void;
	
	public function startObject() : Void;
	public function startField(name : String) : Void;
	public function endField() : Void;
	public function endObject() : Void;
	
	public function startArray() : Void;
	public function startItem() : Void;
	public function endItem() : Void;
	public function endArray() : Void;
	
	public function date(d : Date) : Void;
	public function string(s : String) : Void;
	public function int(i : Int) : Void;
	public function float(f : Float) : Void;
	public function null() : Void;
	public function bool(b : Bool) : Void;
	public function comment(s : String) : Void;
}