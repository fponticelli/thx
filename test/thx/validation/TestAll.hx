package thx.validation;

import thx.util.Result;
using thx.util.Results;
import utest.Assert;
import utest.Runner;
import utest.ui.Report;
import haxe.PosInfos;

class TestAll
{
	public function assertValidation(result : Result, ok : Bool, ?message : String, ?pos : PosInfos)
	{
		if (null == message)
			message = "expected '" + (ok ? 'Ok' : 'Error') + "' but was '" + result.toString() + "'";
		switch(result)
		{
			case Ok: Assert.isTrue(ok, message, pos);
			case Failure(e): Assert.isFalse(ok, message, pos);
		}
	}
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestCustomValidator());
		runner.addCase(new TestDateRange());
		runner.addCase(new TestEmail());
		runner.addCase(new TestIncrement());
		runner.addCase(new TestOptionValidator());
		runner.addCase(new TestPatternValidator());
		runner.addCase(new TestRange());
		runner.addCase(new TestSingleLine());
		runner.addCase(new TestStringLength());
		runner.addCase(new TestUrl());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
}