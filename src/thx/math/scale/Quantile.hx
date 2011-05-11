package thx.math.scale;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
using Arrays;

class Quantile
{
	var _domain : Array<Float>;
	var _range : Array<Float>;
	var _thresolds : Array<Float>;
	public function new()
	{
		_domain = [];
		_range = [];
		_thresolds = [];
	}
	
	function rescale()
	{
		var i = -1,
			n = _range.length,
			k = _domain.length / n;
		if (_thresolds.length > n)
			_thresolds = _thresolds.splice(0, n);
		while (++i < n)
			_thresolds[i] = _domain[Std.int((i * k))];
	}
	
	function _quantile(value : Float) : Int
	{
		if (Math.isNaN(value))
			return -1;
		
		var low = 0,
			high = _thresolds.length - 1;
		while (low <= high)
		{
			var mid = (low + high) >> 1,
				midValue = _thresolds[mid];
			if (midValue < value)
				low = mid + 1;
			else if (midValue > value)
				high = mid - 1;
			else
				return mid;
		}
		return high < 0 ? 0 : high;
	}
	
	public function scaleMap(x : Float, i : Int) return scale(x)
	
	public function scale(v : Float)
	{
		return _range[_quantile(v)];
	}
	
	public function getDomain() return _domain
	
	public function domain(x : Array<Float>)
	{
		_domain = x.filter(function(d) return !Math.isNaN(d));
		_domain.sort(Floats.ascending);
		rescale();
		return this;
	}
	
	public function getRange() return _range
	
	public function range(x : Array<Float>)
	{
		_range = x.copy();
		rescale();
		return this;
	}
	
	public function getQuantiles()
	{
		return _thresolds.copy;
	}
}