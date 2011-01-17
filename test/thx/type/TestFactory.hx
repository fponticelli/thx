package thx.type;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Runner; 
import utest.Assert; 
import utest.ui.Report;

import thx.type.factory.ITest;
import thx.type.factory.TestImplementation;

class TestFactory
{   
	public function testBind()
	{
		var i = new Factory().bind(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.is(o, ITest);
		Assert.is(o, TestImplementation);
		Assert.equals("hi", o.sayHello());
	}
	
	public function testUnbinded()
	{
		var i = new Factory();
		Assert.isNull(i.get(ITest));
		i.unbinded = function(cls : Class<Dynamic>)
		{
			try
			{
				return Type.createInstance(cls, []);
			} catch (e : Dynamic) {
				return null;
			}
		}
		Assert.isNull(i.get(ITest));
		Assert.notNull(i.get(TestImplementation));
		Assert.is(i.get(TestImplementation), TestImplementation);
	}
	
	public function testInstance()
	{
		var i = new Factory().instance(ITest, new TestImplementation());
		var o = i.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = i.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public function testMultipleInstances()
	{
		var i = new Factory().bind(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = i.get(ITest);
		Assert.equals(0, o.counter);
	}
	
	public function testMemoize()
	{
		var i = new Factory().memoize(ITest, function() return new TestImplementation() );
		var o = i.get(ITest);
		Assert.equals(0, o.counter);
		o.counter++;
		o = i.get(ITest);
		Assert.equals(1, o.counter);
	}
	
	public static function addTests(runner : Runner)
	{
    	runner.addCase(new TestFactory());
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