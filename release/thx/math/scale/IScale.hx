/**
 * ...
 * @author Franco Ponticelli
 */

package thx.math.scale;

interface IScale<TDomain, TRange>
{
	public function scale(x : TDomain, ?i : Int) : TRange;
	public function getDomain() : Array<TDomain>;
	public function getRange() : Array<TRange>;
}