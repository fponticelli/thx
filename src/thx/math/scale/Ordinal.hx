package thx.math.scale;

import thx.collections.IntHashList;
using Arrays;

class Ordinal<TData>
{
	var _domain : Array<TData>;
	var _range : Array<Float>;
	public var rangeBand(default, null) : Float;
	
	public function new()
	{
		_domain = [];
		_range = [];
		rangeBand = 0.0;
	}
	
	public function scalef()
	{
		return this.scale;
	}
	
	public function scaleMap(x : TData, i : Int) return scale(x)
	
	public function scale(x : TData)
	{
		var i = _domain.indexOf(x);
		if (i < 0)
		{
			_domain.push(x);
			i = _domain.length -1;
		}
		return _range[i];
	}
	
	public function getDomain()
	{
		return _domain.copy();
	}
	
	public function domain(x : Array<TData>)
	{
		_domain = x.copy();
		return this;
	}
	
	public function getRange()
	{
		return _range.copy();
	}
	
	public function range(?i : Array<Int>, ?x : Array<Float>)
	{
		if (null != i)
			_range = cast i.copy();
		else
			_range = x.copy();
		return this;
	}
	
	public function rangePoints(start : Float, stop : Float, padding = 0.0)
	{
		var step = (stop - start) / (_domain.length - 1 + padding);
		_range = _domain.length == 1
			? [(start + stop) / 2]
			: Floats.range(start + step * padding / 2, stop + step / 2, step);
		rangeBand = 0;
		return this;
	}
	
	public function rangeBands(start : Float, stop : Float, padding = 0.0)
	{
		var step = (stop - start) / (_domain.length + padding);
		_range = Floats.range(start + step * padding, stop, step);
		rangeBand = step * (1 - padding);
		return this;
	}
	
	public function rangeRoundBands(start : Float, stop : Float, padding = 0.0)
	{
		var diff = stop - start,
			step = Math.floor(diff / (_domain.length + padding)),
			err = diff - (_domain.length - padding) * step;
		_range = Floats.range(start + Math.round(err / 2), stop, step);
		rangeBand = Math.round(step * (1 - padding));
		return this;
	}
}