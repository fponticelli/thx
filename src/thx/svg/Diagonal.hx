package thx.svg;
//import thx.geom.layout.Tree.SourceTarget;
using Arrays;

class Diagonal<T> {
	var _source: T -> Int -> Array<Float>;
	var _target: T -> Int -> Array<Float>;
	var _projection: Array<Float> -> Int -> Array<Float>;

	public function new()
	{
		_projection = diagonalProjection;
	}

	public function diagonal(d:T, ?i:Int)
	{
		var p0 = _source(d, i),
			p3 = _target(d, i),
			m = (p0[1] + p3[1]) / 2,
			p:Array<Array<Float>> = [p0, [p0[0], m], [p3[0], m], p3];
		var p2 = p.map(_projection);
		return "M" + p2[0][0] + "," + p2[0][1] + "C" + p2[1][0] + "," + p2[1][1] + " " + p2[2][0] + "," + p2[2][1] + " " + p2[3][0] + "," + p2[3][1];
	}

	public function getSource() return _source
	public function sourcef(x : T->Int->Array<Float>)
	{
		_source = x;
		return this;
	}
	
	public function getTarget() return _target
	public function targetf(x : T->Int->Array<Float>)
	{
		_target = x;
		return this;
	}

	public function getProjection() return _projection
	public function projection(x)
	{
		_projection = x;
		return this;
	}
/*
	public static function diagonalSource<T>(x:SourceTarget<T>, ?i:Int)
	{
		return [x.source.x, ;
	}

	public static function diagonalTarget<T>(x:SourceTarget<T>, ?i:Int)
	{
		return x.target;
	}
*/
	public static function diagonalProjection(d:Array<Float>, ?_):Array<Float>
	{
		return d;
	}
}



