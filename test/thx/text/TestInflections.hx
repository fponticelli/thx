package thx.text;

/**
 * ...
 * @author Franco Ponticelli
 */
import utest.Assert;
import utest.Runner;
import utest.ui.Report;
using thx.text.Inflections;

class TestInflections
{
	public function testUncountable()
	{
		Assert.equals("information", "information".pluralize());
		Assert.equals("news", "news".pluralize());
	}
	
	public function testPluralize()
	{
		Assert.equals("days", "day".pluralize());
		Assert.equals("women", "woman".pluralize());
		Assert.equals("autobuses", "autobus".pluralize());
		Assert.equals("quizzes", "quiz".pluralize());
	}
	
	public function testSingularize()
	{
		Assert.equals("day", "days".singularize());
		Assert.equals("woman", "women".singularize());
		Assert.equals("autobus", "autobuses".singularize());
		Assert.equals("quiz", "quizzes".singularize());
	}
	
	
	public static function addTests(runner : Runner)
	{
		runner.addCase(new TestInflections());
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