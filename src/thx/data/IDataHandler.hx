/**
 * ...
 * @author Franco Ponticelli
 */

package thx.data;

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

	public function valueDate(d : Date) : Void;
	public function valueString(s : String) : Void;
	public function valueInt(i : Int) : Void;
	public function valueFloat(f : Float) : Void;
	public function valueNull() : Void;
	public function valueBool(b : Bool) : Void;

	public function comment(s : String) : Void;
}