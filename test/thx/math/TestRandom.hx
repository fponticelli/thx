package thx.math;

import utest.Assert;

class TestRandom
{
	public function testSequenceDefault()
	{
		var s = [16807,282475249,548908249,984943658,70367106,470211272,101027544,384109054,385036099,933495885];
		var r = new Random();
		for (v in s)
			Assert.equals(v, r.int());
	}
	
	public function testSequence7()
	{
		var s = [117649,903584919,621132276,452154665,492569745,70253433,707192808,541279734,547769049,92020257];
		var r = new Random(7);
		for (v in s)
			Assert.equals(v, r.int());
	}
	
	public function new(){}	
}