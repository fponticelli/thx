package thx.svg;
import thx.geom.layout.Tree.PosType;
import thx.geom.layout.Tree.SourceTarget;

using Arrays;




class Diagonal<T> {
	  
	  var _source: T->Int->PosType;
	  var _target: T->Int->PosType;
	  var _projection: PosType->Int->Array<Float>;

		public function new(){

		}

	  public function diagonal(d:T, ?i:Int) {
	    var p0 = _source(d, i),
	        p3 = _target(d, i),
	        m = (p0.y + p3.y) / 2,
	        p:Array<PosType> = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
	    var p2 = p.map(_projection);
	    return "M" + p2[0] + "C" + p2[1] + " " + p2[2] + " " + p2[3];
	  }

	  public function sourcef(x:T->Int->PosType) {
	    _source = x;
	    return this;
	  }
	
		public function getSource(x){
			return _source;
		}

	  public function targetf(x:T->Int->PosType) {
	    _target = x;
	    return this;
	  }
	
		public function getTarget(){
			return _target;
		}

	  public function projection(x) {
	    _projection = x;
	    return this;
	  }
		public function getProjection(){
			return _projection;
		}
		
	public static function diagonalSource<T>(x:SourceTarget<T>, ?i:Int){
		return x.source;
	}
	
	public static function diagonalTarget<T>(x:SourceTarget<T>, ?i:Int){
		return x.target;
	}
	
	
	public static function diagonalProjection(d:PosType):Array<Float> {
	  return [d.x, d.y];
	}
}



