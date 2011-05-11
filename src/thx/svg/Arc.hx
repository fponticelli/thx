package thx.svg;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class Arc extends Shape
{
	var r0 : Float;
	var r1 : Float;
	var a0 : Float;
	var a1 : Float;
	public function new()
	{
		r0 = 0;
		r1 = 1;
		a0 = 0;
		a1 = Math.PI;
	}
	
	public function getInnerRadius() return r0
	public function innerRadius(v : Float)
	{
		r0 = v;
		return this;
	}
	
	public function getOuterRadius() return r0
	public function outerRadius(v : Float)
	{
		r1 = v;
		return this;
	}
	
	public function getStartAngle() return r0
	public function startAngle(v : Float)
	{
		a0 = v;
		return this;
	}
	
	public function getEndAngle() return r0
	public function endAngle(v : Float)
	{
		a1 = v;
		return this;
	}
	
	override public function shape(?d : Dynamic, ?i : Int)
	{
		super.shape(d, i);
		
        var a0 = this.a0 + LineInternals.arcOffset,
			a1 = this.a1 + LineInternals.arcOffset,
			da = a1 - a0,
			df = da < Math.PI ? "0" : "1",
			c0 = Math.cos(a0),
			s0 = Math.sin(a0),
			c1 = Math.cos(a1),
			s1 = Math.sin(a1);
		return da >= LineInternals.arcMax
			? (r0 != 0
			? "M0," + r1
			+ "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
			+ "A" + r1 + "," + r1 + " 0 1,1 0," + r1
			+ "M0," + r0
			+ "A" + r0 + "," + r0 + " 0 1,1 0," + (-r0)
			+ "A" + r0 + "," + r0 + " 0 1,1 0," + r0
			+ "Z"
			: "M0," + r1
			+ "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
			+ "A" + r1 + "," + r1 + " 0 1,1 0," + r1
			+ "Z")
			: (r0 != 0
			? "M" + r1 * c0 + "," + r1 * s0
			+ "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
			+ "L" + r0 * c1 + "," + r0 * s1
			+ "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
			+ "Z"
			: "M" + r1 * c0 + "," + r1 * s0
			+ "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
			+ "L0,0"
			+ "Z");
	}
	
	public function centroid()
	{
		var r = (r0 + r1) / 2,
			a = (a0 + a1) / 2 + LineInternals.arcOffset;
		return [Math.cos(a) * r, Math.sin(a) * r];
	}
}