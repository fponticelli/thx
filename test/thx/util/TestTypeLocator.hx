package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Runner;
import utest.Assert;
import utest.ui.Report;

import thx.util.type.ITest;
import thx.util.type.TestImplementation;

class TestTypeLocator
{
	public function testBind()
	{
		var locator = new TypeLocator().bind(ITest, function() return new TestImplementation() );
		var o = locator.get(ITest);
		Assert.is(o, ITest);
		Assert.is(o, TestImplementation);
		Assert.equals("hi", o.sayHello());
	}
	
	public function testUnbinded()
	{
		var locator = new TypeLocator();
		Assert.isNull(locator.get(ITest));
		locator.unbinded = function(cls : Class<Dynamic>)
		{
			if ('thx.util.type.ITest' == Type.getClassName(cls)) // prevent js from instantiating a interface ob
				return null;
			try
			{
				return Type.createInstance(cls, []);
			} catch (e : Dynamic) {
				return null;
			}
		}
		Assert.isNull(locator.get(ITest));
		Assert.notNull(locator.get(TestImplementation));
		Assert.is(locator.get(TestImplementation), TestImplementation);
	}
	
	public function testInstance()
	{
		var locator = new TypeLocator().instance(ITest, new TestImplementation());
		var o = locator.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = locator.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public function testMultipleInstances()
	{
		var locator = new TypeLocator().bind(ITest, function() return new TestImplementation() );
		var o = locator.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = locator.get(ITest);
		Assert.equals(0, o.counter);
	}
	
	public function testMemoize()
	{
		var locator = new TypeLocator().memoize(ITest, function() return new TestImplementation() );
		var o = locator.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = locator.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestTypeLocator());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new(){}
}