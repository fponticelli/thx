package thx.date;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.cultures.EnUS;
import utest.Assert;
using Arrays;

class TestDateParser
{
	static var now = Date.fromString("2011-05-31 16:20:00");
	
	public function testParseSpecificDates()
	{
		var tests = [
			/*  1 */ { expected : "2011-01-05", test : "January 5" },
			/*  2 */ { expected : "2011-12-25", test : "dec 25" },
			/*  3 */ { expected : "2011-05-27", test : "may 27th" },
			/*  4 */ { expected : "2006-10-01", test : "October 2006" },
			/*  5 */ { expected : "2011-10-06", test : "oct 06" },
			/*  6 */ { expected : "2010-01-03", test : "jan 3 2010" },
			/*  7 */ { expected : "2004-02-14", test : "february 14, 2004" },
			/*  8 */ { expected : "2000-01-03", test : "3 jan 2000" },
			/*  9 */ { expected : "1985-04-17", test : "17 april 85" },
			/* 10 */ { expected : "1979-05-27", test : "5/27/1979" },
			/* 11 */ { expected : "1979-05-27", test : "27/5/1979" },
			/* 12 */ { expected : "2011-05-06", test : "05/06" },
			/* 13 */ { expected : "1979-05-27", test : "1979-05-27" },
			/* 14 */ { expected : "2011-05-06", test : "6" },
			/* 15 */ { expected : "2011-05-31 04:00:00", test : "4:00" },
			/* 16 */ { expected : "2011-05-31 17:00:00", test : "17:00" },
			/* 17 */ { expected : "2011-05-31 08:00:00", test : "0800" },
		];

		for (i in 0...tests.length)
		{
			var test = tests[i],
				e = Date.fromString(test.expected),
				r = DateParser.parse(test.test, now);
			Assert.same(e, r, (i+1) + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'");
		}
	}
	
	public function testParseSimpleDates()
	{
		var tests = [
			{ expected : "2011-06-02", test : "thursday" },
			{ expected : "2011-11-01", test : "november" },
			{ expected : "2011-06-03 13:00:00", test : "friday 13:00" },
			{ expected : "2011-06-03 13:00:00", test : "friday 1pm" },
			{ expected : "2011-06-06 02:35:00", test : "mon 2:35" },
			{ expected : "2011-05-31 16:00:00", test : "4pm" },
			{ expected : "2011-05-31 06:00:00", test : "6 in the morning" },
			{ expected : "2011-05-31 18:00:00", test : "6 in the afternoon" },
			{ expected : "2011-06-04 17:00:00", test : "sat in the evening" },
			{ expected : "2011-05-30", test : "yesterday" },
			{ expected : "2011-05-31", test : "today" },
			{ expected : "2011-05-31 16:20:00", test : "now" },
			{ expected : "2011-06-01", test : "tomorrow" },
			
			{ expected : "2011-05-30", test : "this monday" },
			{ expected : "2011-05-31", test : "this tuesday" },
			{ expected : "2011-06-01", test : "this wednesday" },
			{ expected : "2011-05-30", test : "last monday" },
			{ expected : "2011-05-24", test : "last tuesday" },
			{ expected : "2011-05-25", test : "last wednesday" },
			{ expected : "2011-06-06", test : "next monday" },
			{ expected : "2011-06-07", test : "next tuesday" },
			{ expected : "2011-06-01", test : "next wednesday" },
			
			{ expected : "2011-04-01", test : "this april" },
			{ expected : "2011-05-01", test : "this may" },
			{ expected : "2011-06-01", test : "this june" },
			{ expected : "2011-04-01", test : "last april" },
			{ expected : "2010-05-01", test : "last may" },
			{ expected : "2010-06-01", test : "last june" },
			{ expected : "2012-04-01", test : "next april" },
			{ expected : "2012-05-01", test : "next may" },
			{ expected : "2011-06-01", test : "next june" },
			
//			{ expected : "2011-06-01", test : "next month" },
			{ expected : "2011-05-31 08:00:00", test : "this morning" },
//			{ expected : "2011-05-30 21:00:00", test : "last night" },
			{ expected : "2011-05-31 16:20:00", test : "this second" },
			{ expected : "2011-05-30 04:00:00", test : "yesterday at 4:00" },
			{ expected : "2011-05-27 20:00:00", test : "last friday at 20:00" },
			{ expected : "2011-05-30", test : "last monday" },
//			{ expected : "2011-05-23", test : "last week monday" },
			{ expected : "2011-06-03", test : "next friday" },
//			{ expected : "2011-06-10", test : "next week friday" },
			{ expected : "2011-06-01 18:45:00", test : "tomorrow at 6:45pm" },
			{ expected : "2011-05-30 14:00:00", test : "afternoon yesterday" },
//			{ expected : "2011-05-23", test : "monday last week" },
		];

		for (i in 0...tests.length)
		{
			var test = tests[i],
				e = Date.fromString(test.expected),
				r = DateParser.parse(test.test, now);
			Assert.same(e, r, (i+1) + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'");
		}
	}
	public function testParseComplexDates()
	{
		var tests = [
			{ expected : "2008-05-31 16:20:00", test : "3 years ago" },
			{ expected : "2010-12-31 16:20:00", test : "5 months before now" },
			{ expected : "2010-12-31", test : "5 months before today" },
			{ expected : "2010-12-30", test : "5 months before yesterday" },
			{ expected : "2011-01-01", test : "5 months before tomorrow" },
			{ expected : "2011-05-31 09:20:00", test : "7 hours ago" },
			{ expected : "2011-06-07", test : "7 days from today" },
			{ expected : "2011-06-07 16:20:00", test : "7 days from now" },
			{ expected : "2011-06-07", test : "1 week hence" },
			{ expected : "2011-05-31 19:20:00", test : "in 3 hours" },
			{ expected : "2010-05-31", test : "1 year ago today" },
			{ expected : "2010-05-30", test : "1 year ago yesterday" },
			{ expected : "2010-06-01", test : "1 year ago tomorrow" },
			{ expected : "2012-05-31", test : "1 year from today" },
			{ expected : "2012-05-30", test : "1 year from yesterday" },
			{ expected : "2012-06-01", test : "1 year from tomorrow" },
			{ expected : "2011-06-01 05:00:00", test : "7 hours before tomorrow at noon" },
//			{ expected : "2011-11-16", test : "3rd wednesday in november" },
//			{ expected : "2012-03-01", test : "3rd month next year" },
//			{ expected : "2011-09-15", test : "3rd thursday this september" },
//			{ expected : "2011-05-25", test : "4th day last week" },
			{ expected : "2011-05-31 16:25:00", test : "in 5 minutes" },
			{ expected : "2011-05-31 16:25:00", test : "5 minutes from now" },
			{ expected : "2011-05-31 11:20:00", test : "5 hours before now" },
			{ expected : "2011-05-31 10:00:00", test : "2 hours before noon" },
			{ expected : "2011-06-03 00:00:00", test : "2 days from tomorrow" },
		];

		for (i in 0...tests.length)
		{
			var test = tests[i],
				e = Date.fromString(test.expected),
				r = DateParser.parse(test.test, now);
			Assert.same(e, r, (i+1) + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'");
		}
	}
	
	public function testParseTime()
	{
		var tests = [
			{ expected : { hour : 23, minute : 59,  second : 59,  millis : 0.999,   matched : "at midnight" }, test : "at midnight" },
			{ expected : { hour : 20, minute : 0,  second : 0,  millis : 0.0,   matched : "8 in the evening" }, test : "8 in the evening" },
			{ expected : { hour : 17, minute : 0,  second : 0,  millis : 0.0,   matched : "in the evening" }, test : "in the evening" },
			{ expected : { hour : 19, minute : 0,  second : 0,  millis : 0.0,   matched : "at 7pm" }, test : "at 7pm" },
			{ expected : { hour : 19, minute : 0,  second : 0,  millis : 0.0,   matched : "7 pm" }, test : "7 pm" },
			{ expected : { hour : 5,  minute : 3,  second : 0,  millis : 0.0,   matched : "05:03:00" }, test : "05:03:00" },
			{ expected : { hour : 5,  minute : 0,  second : 59, millis : 0.123, matched : "05:00:59.123" }, test : "05:00:59.123" },
			{ expected : { hour : 4,  minute : 0,  second : 0,  millis : 0.0,   matched : "4:00" }, test : "4:00" },
			{ expected : { hour : 4,  minute : 0,  second : 0,  millis : 0.0,   matched : "4:00am" }, test : "4:00am" },
			{ expected : { hour : 16, minute : 0,  second : 0,  millis : 0.0,   matched : "4:00pm" }, test : "4:00pm" },
			{ expected : { hour : 17, minute : 0,  second : 0,  millis : 0.0,   matched : "17:00" }, test : "17:00" },
			{ expected : { hour : 8,  minute : 0,  second : 0,  millis : 0.0,   matched : "0800" }, test : "0800" },
			{ expected : { hour : 20, minute : 0,  second : 0,  millis : 0.0,   matched : "0800 pm" }, test : "0800 pm" },
			{ expected : { hour : 20, minute : 0,  second : 0,  millis : 0.0,   matched : " 0800 pm" }, test : "123 0800 pm" },
			{ expected : { hour : 20, minute : 15, second : 0,  millis : 0.0,   matched : "0815 pm " }, test : "0815 pm 123" },
			{ expected : { hour : 20, minute : 0,  second : 0,  millis : 0.0,   matched : " 0800 pm " }, test : "123 0800 pm 123" },
		];

		for (test in tests)
			Assert.same(test.expected, DateParser.parseTime(test.test));
	}
	
	
	public function new() {}
}