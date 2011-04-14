package thx.svg;

/**
 * ...
 * @author Franco Ponticelli
 */

class Shape
{
	function apply(o : { }, ?d : Dynamic)
	{
		if (null != d)
		{
			for (field in Reflect.fields(d))
			{
				var f : Float -> Arc = Reflect.field(this, field);
				if (null == f)
					continue;
				if(Reflect.isFunction(f))
					Reflect.callMethod(o, f, [Reflect.field(d, field)]);
				else
					Reflect.setField(o, field, Reflect.field(d, field));
			}
		}
	}
	
	public function shape(?d : Dynamic, ?i : Int)
	{
		apply(this, d);
		return "";
	}
}