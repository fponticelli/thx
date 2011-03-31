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
		} catch(e : NullArgument) {
			var s = e.toString();
			Assert.stringContains("XXX", s, "string '" + s +"' does not contain 'XXX'");
			return; // prevent bug 395
		} catch (e : Dynamic) {
			Assert.fail("wrong exception type: " + Std.string(e));
		}
	}
}