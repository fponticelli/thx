package thx.util;

/**
 * ...
 * @author Franco Ponticelli
 */

class TypeFactory<TOut>
{
	var _binders : Hash<Void -> TOut>;
	public function new() 
	{
		_binders = new Hash();
	}
	
	public function instance<T>(cls : Class<T>, o : TOut)
	{
		return bind(cls, function() return o);
	}
	
	public function bind<T>(cls : Class<T>, f : Void -> TOut)
	{
		_binders.set(Type.getClassName(cls), f);
		return this;
	}
	
	public function memoize<T>(cls : Class<T>, f : Void -> TOut)
	{
		var r = null;
		return bind(cls, function() {
			if (null == r)
				r = f();
			return r;
		});
	}
	
	public dynamic function unbinded(cls : Class<Dynamic>) : Null<TOut>
	{
		return null;
	}
	
	public function get<T>(cls : Class<T>) : Null<TOut>
	{
		var f = _binders.get(Type.getClassName(cls));
		if (null == f)
			return unbinded(cls);
		else
			return f();
	}
}