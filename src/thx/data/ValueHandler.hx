package thx.data;

/**
 * ...
 * @author Franco Ponticelli
 */

using Arrays;

class ValueHandler implements IDataHandler
{
	public var value : Dynamic;
	var _stack : Array<Dynamic>;
	var _names : Array<String>;
	public function new(){}
	
	public function start()
	{
		_stack = [];
		_names = [];
	}
	public function end()
	{
		value = _stack.pop();
	}
	
	public function startObject()
	{
		_stack.push({ });
	}
	
	public function endObject(){}
	public function startField(name : String)
	{
		_names.push(name);
	}
	
	public function endField()
	{
		var value = _stack.pop();
		var last = _stack.last();
		Reflect.setField(last, _names.pop(), value);
	}
	
	public function startArray()
	{
		_stack.push([]);
	}
	
	public function endArray(){}
	public function startItem(){}
	public function endItem()
	{
		var value = _stack.pop();
		var last = _stack.last();
		last.push(value);
	}
	
	public function date(d : Date) _stack.push(d)
	public function string(s : String) _stack.push(s)
	public function int(i : Int) _stack.push(i)
	public function float(f : Float) _stack.push(f)
	public function null() _stack.push(null)
	public function bool(b : Bool) _stack.push(b)
	public function comment(s : String){}
}