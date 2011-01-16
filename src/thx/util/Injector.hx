package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

class Injector 
{
	var _binders : Hash<Void -> Dynamic>;
	public function new() 
	{
		_binders = new Hash();
	}
	
	public function bind<T>(cls : Class<T>, f : Void -> T)
	{
		_binders.set(Type.getClassName(cls), f);
		return this;
	}
	
	public function memoize<T>(cls : Class<T>, f : Void -> T)
	{
		var r = null;
		return bind(cls, function() {
			if (null == r)
				r = f();
			return r;
		});
	}
	
	public function get<T>(cls : Class<T>) : Null<T>
	{
		var f = _binders.get(Type.getClassName(cls));
		if (null == f)
			return null;
		else
			return f();
	}
}