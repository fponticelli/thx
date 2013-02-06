/**
 * ...
 * @author Franco Ponticelli
 */

package thx.type;

import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using Types;

class TestTypes
{
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestTypes());
	}

	public static function main()
	{
		var runner = new Runner();
		addTests(runner);
		Report.create(runner);
		runner.run();
	}

	public function new(){}

	public function testSameAs()
	{
		Assert.isTrue(1.sameType(2));
		Assert.isTrue("a".sameType("b"));
		Assert.isFalse(1.sameType("a"));
		Assert.isFalse(1.sameType("a"));
		Assert.isFalse(1.sameType(null));
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
		Assert.equals("TestTypes", Types.className(this));
	}

	public function testFullName()
	{
		Assert.equals("thx.type.TestTypes", Types.fullName(this));
	}

	public function testTypeName()
	{
		Assert.equals("null", Types.typeName(null));
		Assert.equals("thx.type.TestTypes", Types.typeName(this));
		Assert.equals("Int", Types.typeName(1));
		Assert.equals("Bool", Types.typeName(true));
	}
}