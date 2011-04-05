package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

class Access<TData>
{
	var selection : Selection<TData>;
	public function new(selection : Selection<TData>)
	{
		this.selection = selection;
	}
}