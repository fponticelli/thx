/**
 * ...
 * @author Franco Ponticelli
 */

package thx.type;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using thx.type.UType;

class TestUType
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestUType());
	}
	
	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}
	
	public function new();
	
	public function testSameAs()
	{
		Assert.isTrue(1.sameAs(2));
		Assert.isTrue("a".sameAs("b"));
		Assert.isFalse(1.sameAs("a"));
		Assert.isFalse(1.sameAs("a"));
		Assert.isFalse(1.sameAs(null));
	}
	
	public function testAs()
	{
		Assert.isNull(1.as(String));
		Assert.equals(1, 1.as(Int));
	}
	
	public function testOf()
	{
		Assert.isNull(String.of(1));
		Assert.equals(1, Int.of(1));
	}
	
	public function testClassName()
	{
		Assert.equals("TestUType", UType.className(this));
	}
	
	public function testFullName()
	{
		Assert.equals("thx.type.TestUType", UType.fullName(this));
	}
	
	public function testTypeName()
	{
		Assert.equals("null", UType.typeName(null));
		Assert.equals("thx.type.TestUType", UType.typeName(this));
		Assert.equals("Int", UType.typeName(1));
		Assert.equals("Bool", UType.typeName(true));
	}
}