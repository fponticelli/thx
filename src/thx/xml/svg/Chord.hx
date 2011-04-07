package thx.xml.svg;

/**
 * ...
 * @author Franco Ponticelli
 */
/*
class Chord<TData>
{
	var _source : TData -> Int -> Float;
	var _target : TData -> Int -> Float;
	var _radius : TData -> Int -> Float;
	var _startAngle : TData -> Int -> Float;
	var _endAngle : TData -> Int -> Float;
	public function new(source : TData -> Int -> Float, target : TData -> Int -> Float, radius : TData -> Int -> Float, startAngle : TData -> Int -> Float, endAngle : TData -> Int -> Float)
	{
		this._source = source;
		this._target = target;
		this._radius = radius;
		this._startAngle = startAngle;
		this._endAngle = endAngle;
	}
	
	public function shape(d, i)
	{
		var s = subgroup(_source, d, i),
			t = subgroup(_target, d, i);
		return "M" + s.p0
			+ arc(s.r, s.p1) + (equals(s, t)
			? curve(s.r, s.p1, s.r, s.p0)
			: curve(s.r, s.p1, t.r, t.p0)
			+ arc(t.r, t.p1)
			+ curve(t.r, t.p1, s.r, s.p0))
			+ "Z";
	}
	
	function subgroup(f : TData -> Int -> Float, d, i)
	{
		var sub = f(d, i),
			r = _radius(sub, i),
			a0 = _startAngle(sub, i) + LineInternals.arcOffset,
			a1 = _endAngle(sub, i) + LineInternals.arcOffset;
		return {
			r : r,
			a0 : a0,
			a1 : a1,
			p0 : [r * Math.cos(a0), r * Math.sin(a0)],
			p1 : [r * Math.cos(a1), r * Math.sin(a1)]
		};
	}
	
	function equals(a, b)
	{
		return a.a0 == b.a0 && a.a1 == b.a1;
	}
	
	function arc(r, p)
	{
		return "A" + r + "," + r + " 0 0,1 " + p;
	}
	
	function curve(r0, p0, r1, p1)
	{
		return "Q 0,0 " + p1;
	}

	public function getSource() return _source
	public function source(v : TData -> Int -> Float)
	{
		_source = v;
		return this;
	}
	
	public function getTarget() return _target
	public function target(v : TData -> Int -> Float)
	{
		_target = v;
		return this;
	}
	
	public function getRadius() return _radius
	public function radius(v : TData -> Int -> Float)
	{
		_radius = v;
		return this;
	}
	
	public function getStartAngle() return _startAngle
	public function startAngle(v : TData -> Int -> Float)
	{
		_startAngle = v;
		return this;
	}
	
	public function getEndAngle() return _endAngle
	public function endAngle(v : TData -> Int -> Float)
	{
		_endAngle = v;
		return this;
	}
	
	public static function pathObject()
	{
		return new Chord<{source:Float,target:Float,radius:Float,startAngle:Float,endAngle:Float}>(
			function(d, _) return d.source,
			function(d, _) return d.target,
			function(d, _) return d.radius,
			function(d, _) return d.startAngle,
			function(d, _) return d.endAngle
		);
	}
}
*/