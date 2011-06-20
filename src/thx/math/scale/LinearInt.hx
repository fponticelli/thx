/**
 * ...
 * @author Franco Ponticelli
 */

package thx.math.scale;

class LinearInt extends Linear
{
	override public function ticks() : Array<Float>
	{
		var range = tickRange();
		return cast Ints.range(Math.round(range.start), Math.round(range.stop), Ints.max(1, Math.round(range.step)));
	}
	
	override public function tickFormat(v : Float, ?i : Int) : String
	{
//		var n = Math.max(0, -Math.floor(Math.log(tickRange().step) / Const.LN10 + .01));
		return Floats.format(v, "I");
	}
}