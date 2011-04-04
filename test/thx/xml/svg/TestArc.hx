package thx.xml.svg;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestArc
{
	public function testDefault()
	{
		var arc = new Arc();
		Assert.equals("M6.123233995736766e-17,-1A1,1 0 1,1 6.123031769111886e-17,1L0,0Z", arc.shape());
	}
	
	public function new();
}