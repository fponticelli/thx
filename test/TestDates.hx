import thx.cultures.EnUS;
import utest.Assert;

class TestDates
{
	public function testCanParse()
	{
		Assert.isTrue(Dates.canParse("2010-10-01"));
		Assert.isTrue(Dates.canParse("2010-10-01 05:05"));
		Assert.isTrue(Dates.canParse("2010-10-01T05:05Z"));
		Assert.isTrue(Dates.canParse("2010-10-01 05:05:05"));
		Assert.isTrue(Dates.canParse("2010-10-01T05:05:05Z"));
		Assert.isTrue(Dates.canParse("2010-10-01T05:05:05"));
		Assert.isTrue(Dates.canParse("2010-10-01 05:05:05.005"));
		
		Assert.isTrue(Dates.canParse("2011-05-23T17:45"));
	}

	public function new(){}
}