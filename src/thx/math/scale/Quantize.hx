package thx.math.scale;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class Quantize
{
	var x0 : Float;
	var x1 : Float;
	var kx : Float;
	var i : Float;
	var _range : Array<Float>;
	public function new()
	{
		x0 = 0;
		x1 = 1;
		kx = 2;
		i = 1;
		_range = [0.0, 1.0];
	}
	
	public function scaleMap(x : Float, i : Int) return scale(x)
	
	public function scale(x : Float)
	{
		return _range[Std.int(Math.max(0, Math.min(i, Math.floor(kx * (x - x0)))))];
	}
	
	public function getDomain() return [x0, x1]
	
	public function domain(x0 : Float, x1 : Float)
	{
		this.x0 = x0;
		this.x1 = x1;
		kx = _range.length / (x1 - x0);
		return this;
	}
	
	public function getRange() return _range.copy
	
	public function range(x : Array<Float>)
	{
		_range = x.copy();
		kx = _range.length / (x1 - x0);
		i = _range.length - 1;
		return this;
	}
}