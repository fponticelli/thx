import utest.Assert;
import utest.Runner;
import utest.ui.Report;

using Floats;

class TestFloats
{
	public function testNormalize()
	{
		Assert.floatEquals(0.0, Floats.normalize( 0.0));
		Assert.floatEquals(1.0, Floats.normalize( 1.0));
		Assert.floatEquals(0.5, Floats.normalize( 0.5));
		Assert.floatEquals(0.0, Floats.normalize(-1.0));
		Assert.floatEquals(1.0, Floats.normalize(10.0));
	}
	
	public function testAbs()
	{
		Assert.floatEquals(0.1, Floats.abs(0.1));
		Assert.floatEquals(0.1, Floats.abs(-0.1));
	}
	
	public function testClamp()
	{
		
		Assert.floatEquals(10, Floats.clamp(0, 10, 100));
		Assert.floatEquals(10, Floats.clamp(10, 10, 100));
		Assert.floatEquals(50, Floats.clamp(50, 10, 100));
		Assert.floatEquals(100, Floats.clamp(100, 10, 100));
		Assert.floatEquals(100, Floats.clamp(110, 10, 100));
	}
	
	public function testClampSym()
	{
		Assert.floatEquals( -10, Floats.clampSym( -100, 10));
		Assert.floatEquals( 10, Floats.clampSym( 100, 10));
		Assert.floatEquals( 0, Floats.clampSym( 0, 10));
	}
	
	public function testMax()
	{
		Assert.floatEquals(10, Floats.max(5, 10));
		Assert.floatEquals(5, Floats.max(5, -10));
		Assert.floatEquals(-5, Floats.max(-5, -10));
	}
	
	public function testMin()
	{
		Assert.floatEquals(5, Floats.min(5, 10));
		Assert.floatEquals(-10, Floats.min(5, -10));
		Assert.floatEquals(-10, Floats.min(-5, -10));
	}
	
	public function testRange()
	{
		Assert.same([0.1,0.2,0.3,0.4], Floats.range(0.1, 0.5, 0.1));
	}
	
	public function testSign()
	{
		Assert.isTrue(Floats.sign(0.1) > 0);
		Assert.isTrue(Floats.sign(-0.1) < 0);
	}
	
	public function testWrap()
	{
		Assert.floatEquals(5, Floats.wrap(-1, 5, 10));
		Assert.floatEquals(5, Floats.wrap( 1, 5, 10));
		Assert.floatEquals(5, Floats.wrap( 5, 5, 10));
		Assert.floatEquals(6, Floats.wrap( 6, 5, 10));
		Assert.floatEquals(10, Floats.wrap( 10, 5, 10));
		Assert.floatEquals(5, Floats.wrap( 11, 5, 10));
		Assert.floatEquals(5, Floats.wrap( 29, 5, 10));
	}
	
	public function testCircularWrap()
	{
		Assert.floatEquals(0, Floats.circularWrap(0, 100));
		Assert.floatEquals(50, Floats.circularWrap(50, 100));
		Assert.floatEquals(0, Floats.circularWrap(100, 100));
		Assert.floatEquals(50, Floats.circularWrap(150, 100));
		Assert.floatEquals(50, Floats.circularWrap(-50, 100));
		Assert.floatEquals(50, Floats.circularWrap(-150, 100));
	}
	
	public function testInterpolate()
	{
		Assert.equals(100, Floats.interpolate(0.0, 100, 200));
		Assert.equals(150, Floats.interpolate(0.5, 100, 200));
		Assert.equals(200, Floats.interpolate(1.0, 100, 200));
	}
	
	public function testFormat()
	{
		Assert.equals("0.10",	(0.1).format());
		Assert.equals("0",		(0.1).format("I"));
	}
	
	public function testFormatF()
	{
		Assert.equals("0.10", Floats.formatf()(0.1));
	}

	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestFloats());
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