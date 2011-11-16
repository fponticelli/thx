package d3;

/**
 * ...
 * @author Franco Ponticelli
 */

class CalendarVix extends Calendar
{
	public function new(cid : String)
	{
		super(cid);
		startYear = 2003;
		endYear = 2010;
		csvPath = "/demo/data/vix.csv";
	}
	
	override function description() return "Chicago Board Options Exchange Volatility Index historical data copyright Yahoo! Finance or independent data provider; fair use for educational purposes."
}