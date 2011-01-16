package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Runner; 
import utest.Assert; 
import utest.ui.Report;

import thx.util.injector.ITest;
import thx.util.injector.TestImplementation;

class TestInjector
{   
	public function testBind()
	{
		var i = new Injector().bind(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.is(o, ITest);
		Assert.is(o, TestImplementation);
		Assert.equals("hi", o.sayHello());
	}
	
	public function testMultipleInstances()
	{
		var i = new Injector().bind(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = i.get(ITest);
		Assert.equals(0, o.counter);
	}
	
	public function testMemoize()
	{
		var i = new Injector().memoize(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = i.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestInjector());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
}