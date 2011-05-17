package thx.util;
import thx.error.Error;
import utest.Assert;
import thx.util.Result;
using thx.util.Results;

class TestResults
{
	public function testToString()
	{
		Assert.equals("Ok", Results.toString(Result.Ok));
		Assert.equals("a A b B", Results.toString("a {1} b {0}".failure(['B', 'A'])));
		
		var error = new Error("b {0}", 'B').setInner(new Error("a {0}", 'A'));
		
		Assert.equals("b B", Results.toString(Result.Failure(cast [error])));
	}
	
	public function new(){}
}