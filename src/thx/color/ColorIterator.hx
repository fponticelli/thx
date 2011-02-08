package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.math.UNumber;
 
class ColorIterator
{
	public var start(default, null) : RGBColor;
	public var end(default, null) : RGBColor;
	public var steps(default, null) : Int;
	public var interpolator(default, null) : Float -> Int -> Int -> Int;
	
	var step = 0;

	public function new(start : RGBColor, end : RGBColor, steps : Int, ?interpolator : Float -> Int -> Int -> Int) 
	{
		this.start = start;
		this.end = end;
		this.steps = steps;
		this.interpolator = null == interpolator ? UNumber.linearInterpolation : interpolator;
		step = 0;
	}
	
	public function hasNext()
	{
		return step < steps;
	}
	
	public function next()
	{
		RGBColor.interpolate(start, end, step++ / steps, interpolator);
	}
}