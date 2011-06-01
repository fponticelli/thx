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
	
	public function testDateBydayOfTheWeek()
	{
		var d = Dates.byDayOfTheWeek(1972, 4, 0);
		Assert.same(Date.fromString("1972-05-07"), d);
		
		d = Dates.byDayOfTheWeek(1972, 4, 0, 2);
		Assert.same(Date.fromString("1972-05-21"), d);
		
		d = Dates.byDayOfTheWeek(1972, 4, 4, 2);
		Assert.same(Date.fromString("1972-05-18"), d);
	}
	
	public function new(){}
}