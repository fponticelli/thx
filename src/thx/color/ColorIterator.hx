package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

class ColorIterator
{
	public var start(default, null) : Rgb;
	public var end(default, null) : Rgb;
	public var steps(default, null) : Int;
	public var equation(default, null) : Float -> Float;
	
	var step : Int;

	public function new(start : Rgb, end : Rgb, steps : Int, ?equation : Float -> Float)
	{
		this.start = start;
		this.end = end;
		this.steps = steps;
		this.equation = equation;
		step = 0;
	}
	
	public function hasNext()
	{
		return step < steps;
	}
	
	public function next()
	{
		Rgb.interpolate(start, end, step++ / steps, equation);
	}
}