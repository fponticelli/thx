package thx.js.behavior;
import thx.math.scale.Linear;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
using Arrays;

class ZoomEvent
{
	public var scale(default, null) : Float;
	public var tx(default, null) : Float;
	public var ty(default, null) : Float;
	public function new(scale : Float, tx : Float, ty : Float)
	{
		this.scale = scale;
		this.tx = tx;
		this.ty = ty;
	}

	public function toString() return "ZoomEvent {scale: " + scale + ", tx: " + tx + ", ty: " + ty + "}"
}