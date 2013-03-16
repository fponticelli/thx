package thx.util.type;

/**
 * ...
 * @author Franco Ponticelli
 */

class TestImplementation implements ITest
{
	public var counter : Int;
	public function new() 
	{
		counter = 0;
	}
	
	public function sayHello() return "hi";
}