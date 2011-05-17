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

class TestTypeFactory
{
	public function testBind()
	{
		var factory = new TypeFactory().bind(ITest, function() return new TestImplementation() );
		var o = factory.get(ITest);
		Assert.is(o, ITest);
		Assert.is(o, TestImplementation);
		Assert.equals("hi", o.sayHello());
	}
	
	public function testUnbinded()
	{
		var factory = new TypeFactory();
		Assert.isNull(factory.get(ITest));
		factory.unbinded = function(cls : Class<Dynamic>)
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
		Assert.isNull(factory.get(ITest));
		Assert.notNull(factory.get(TestImplementation));
		Assert.is(factory.get(TestImplementation), TestImplementation);
	}
	
	public function testInstance()
	{
		var factory = new TypeFactory().instance(ITest, new TestImplementation());
		var o = factory.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = factory.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public function testMultipleInstances()
	{
		var factory = new TypeFactory().bind(ITest, function() return new TestImplementation() );
		var o = factory.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = factory.get(ITest);
		Assert.equals(0, o.counter);
	}
	
	public function testMemoize()
	{
		var factory = new TypeFactory().memoize(ITest, function() return new TestImplementation() );
		var o = factory.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = factory.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestTypeFactory());
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