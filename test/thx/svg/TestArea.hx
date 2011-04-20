package thx.svg;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
import thx.svg.LineInterpolator;

class TestArea
{
	public function testArea()
	{
		var area = Area.pointArray2();
		
		Assert.equals("M0,0L0,0Z", area.shape([[0.0, 0.0]]));
		Assert.equals("M0,0L1,1L1,0L0,0Z", area.shape([[0.0, 0.0], [1.0, 1.0]]));
		Assert.equals("M0,0L1,1L2,0L2,0L1,0L0,0Z", area.shape([[0.0, 0.0], [1.0, 1.0], [2.0, 0.0]]));
	}
	
	public function testArean1()
	{
		var area = Area.pointArray2().y0(function(_,_) return -1);
		
		Assert.equals("M0,0L0,-1Z", area.shape([[0.0, 0.0]]));
		Assert.equals("M0,0L1,1L1,-1L0,-1Z", area.shape([[0.0, 0.0], [1.0, 1.0]]));
		Assert.equals("M0,0L1,1L2,0L2,-1L1,-1L0,-1Z", area.shape([[0.0, 0.0], [1.0, 1.0], [2.0, 0.0]]));
	}
	
	public function testXY()
	{
		var line = Area.pointObjectXY();
		
		Assert.equals("M0,0L0,0Z", line.shape([{x:0.0, y:0.0}]));
		Assert.equals("M0,0L1,1L1,0L0,0Z", line.shape([{x:0.0, y:0.0}, {x:1.0, y:1.0}]));
		Assert.equals("M0,0L1,1L2,0L2,0L1,0L0,0Z", line.shape([{x:0.0, y:0.0}, {x:1.0, y:1.0}, {x:2.0, y:0.0}]));
	}
	
	public function testXYnY0()
	{
		var line = Area.pointObjectXY().y0(function(d,_) return -d.y);
		
		Assert.equals("M0,0L0,0Z", line.shape([{x:0.0, y:0.0}]));
		Assert.equals("M0,0L1,1L1,-1L0,0Z", line.shape([{x:0.0, y:0.0}, {x:1.0, y:1.0}]));
		Assert.equals("M0,0L1,1L2,0L2,0L1,-1L0,0Z", line.shape([{x:0.0, y:0.0}, {x:1.0, y:1.0}, {x:2.0, y:0.0}]));
	}
	
	public function testStepBefore()
	{
		var line = Area.pointArray2().interpolator(StepBefore);
		
		Assert.equals("M0,0L0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M0,0V1H1L1,0V0H0Z", line.shape([[0.0, 0.0], [1.0, 1.0]]));
		Assert.equals("M0,0V1H1V0H2L2,0V0H1V0H0Z", line.shape([[0.0, 0.0], [1.0, 1.0], [2.0, 0.0]]));
	}
	
	public function testStepAfter()
	{
		var line = Area.pointArray2().interpolator(StepAfter);
		
		Assert.equals("M0,0L0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M0,0H1V1L1,0H0V0Z", line.shape([[0.0, 0.0], [1.0, 1.0]]));
		Assert.equals("M0,0H1V1H2V0L2,0H1V0H0V0Z", line.shape([[0.0, 0.0], [1.0, 1.0], [2.0, 0.0]]));
	}
	
	public function testBasis()
	{
		var line = Area.pointArray2().interpolator(Basis);
		
		Assert.equals("M0,0L0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M0,0L1,1L1,0L0,0Z", line.shape([[0.0, 0.0], [1.0, 1.0]]));
		Assert.equals("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0L12,0C12,0,12,0,11,0C10,0,8,0,6,0C4,0,2,0,1,0C0,0,0,0,0,0Z", line.shape([[0.0, 0.0], [6.0, 6.0], [12.0, 0.0]]));
	}
	
	public function testBasisClosed()
	{
		var line = Area.pointArray2().interpolator(BasisClosed);
		
		Assert.equals("M0,0C0,0,0,0,0,0L0,0C0,0,0,0,0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M2,2C2,2,4,4,4,4C4,4,2,2,2,2L4,0C4,0,2,0,2,0C2,0,4,0,4,0Z", line.shape([[0.0, 0.0], [6.0, 6.0]]));
		Assert.equals("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1L3,0C4,0,8,0,9,0C10,0,8,0,6,0C4,0,2,0,3,0Z", line.shape([[0.0, 0.0], [6.0, 6.0], [12.0, 0.0]]));
	}
	
	public function testCardinal()
	{
		var line = Area.pointArray2().interpolator(Cardinal());
		
		Assert.equals("M0,0L0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M0,0L5,5L5,0L0,0Z", line.shape([[0.0, 0.0], [5.0, 5.0]]));
		Assert.equals("M0,0Q4,5,5,5Q6,5,10,0L10,0Q6,0,5,0Q4,0,0,0Z", line.shape([[0.0, 0.0], [5.0, 5.0], [10.0, 0.0]]));
	}
	
	public function testCardinalClosed()
	{
		var line = Area.pointArray2().interpolator(CardinalClosed());
		
		Assert.equals("M0,0L0,0Z", line.shape([[0.0, 0.0]]));
		Assert.equals("M0,0L5,5L5,0L0,0Z", line.shape([[0.0, 0.0], [5.0, 5.0]]));
		Assert.equals("M0,0C0,0,3.5,5,5,5S10,0,10,0L10,0C10,0,6.5,0,5,0S0,0,0,0Z", line.shape([[0.0, 0.0], [5.0, 5.0], [10.0, 0.0]]));
	}
	
	public function new();
}