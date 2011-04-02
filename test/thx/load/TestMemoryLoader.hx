package thx.load;

import utest.Assert;

class TestMemoryLoader
{
	public function testLoad()
	{
		var loader = new MemoryLoader("my test");
		var f = Assert.createEvent(function(s) {
			Assert.stringContains("test", s);
		});
		loader.load(f);
	}
	
	public function testError()
	{
		var loader = new MemoryLoader(null);
		var e = Assert.createEvent(function(s) {
			Assert.isTrue(true);
		});
		var h = function(_) {
			trace("should never reach this point");
		};
		loader.load(h, e);
	}
	
	public function new() { }
	
}