/**
 * ...
 * @author Franco Ponticelli
 */

class Enums
{
	public static function string(e : Dynamic)
	{
		var cons = Type.enumConstructor(e);
		var params = [];
		for (param in Type.enumParameters(e))
			params.push(Dynamics.string(param));
		return cons + (params.length == 0 ? "" : "(" + params.join(", ") + ")");
	}
}