/**
 * ...
 * @author Franco Ponticelli
 */

package thx.collections;
import thx.error.Error;
import thx.error.NullArgument;

class CascadeHash<T> extends HashDecorator<T>
{
	public static function create<T>(arr : Array<Hash<T>>)
	{
		if (2 > arr.length)
			throw new Error("to create a cascading hash sequence you need at least 2 hash objects");
		var inner = arr.pop();
		var current = arr.pop();
		var hash = new CascadeHash(current, inner);
		while (arr.length > 0)
		{
			hash = new CascadeHash(arr.pop(), hash);
		}
		return hash;
	}
	
	var _ih : Hash<T>;
	public function new(current : Hash<T>, inner : Hash<T>)
	{
		super(current);
		NullArgument.throwIfNull(inner, "innerHash");
		_ih = inner;
	}
	
	override function get(key : String)
	{
		if (super.exists(key))
			return super.get(key);
		else
			return _ih.get(key);
	}
	
	override function exists(key : String)
	{
		if (super.exists(key))
			return super.exists(key);
		else
			return _ih.exists(key);
	}
	
	override function iterator():Iterator<T>
	{
		var list = new List();
		for (k in keys())
			list.push(get(k));
		return list.iterator();
	}
	
	override function keys():Iterator<String>
	{
		var s = new Set();
		for (k in super.keys())
			s.add(k);
		for (k in _ih.keys())
			s.add(k);
		return s.iterator();
	}
	
	override function toString()
	{
		var arr = [];
		for (k in keys())
			arr.push(k + ": " + get(k));
		return "{" + arr.join(", ") + "}";
	}
}