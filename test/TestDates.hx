import utest.Assert;

class TestDates
{
	public function testCanParse()
	{
		Assert.isTrue(Dates.canParse("2010-10-01"));
		Assert.isTrue(Dates.canParse("2010-10-01 05:05:05"));
		Assert.isTrue(Dates.canParse("2010-10-01T05:05:05"));
		Assert.isTrue(Dates.canParse("2010-10-01 05:05:05.005"));
	}
	
	public function new();
}