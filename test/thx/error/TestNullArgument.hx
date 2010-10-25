package thx.error;

import utest.Assert;

class TestNullArgument
{
	public function new();
	
	public static function throwMe(XXX : String)
	{
		NullArgument.throwIfNull(XXX, "XXX");
	}
	
	public function testNullArgument()
	{   
		try
		{
			throwMe(null);
		} catch(e : Error) {
			var s = e.toString(); 
			Assert.stringContains("XXX", s, "string '" + s +"' does not contain 'XXX'");
		}
	}
}