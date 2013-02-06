import haxe.ds.IntMap;

class IntHashes
{
	public static inline function empty(Map  : IntMap<Dynamic>) return count(Map ) == 0

	public static function count(Map  : IntMap<Dynamic>)
	{
		#if neko
		return untyped __dollar__hsize(Map .h);
		#elseif php
		return untyped __call__('count', Map .h);
		#else
		var i = 0;
		for (_ in Map )
			i++;
		return i;
		#end
	}

	public static function clear(Map  : IntMap<Dynamic>)
	{
		#if cpp
		untyped Map .h = __global__.__int_hash_create();
		#else
		var _hash : FriendIntMap = Map ;
		#if flash9
		_hash.h = new flash.utils.Dictionary();
		#elseif flash
		_hash.h = untyped __new__(_global["Object"]);
		#elseif neko
		_hash.h = untyped __dollar__hnew(0);
		#elseif js
		untyped {
			_hash.h = __js__("{}");
			if( _hash.h.__proto__ != null ) {
				_hash.h.__proto__ = null;
				__js__("delete")(_hash.h.__proto__);
			}
		}
		#elseif php
		_hash.h = untyped __call__('array');
		#end
		#end
	}
}

typedef FriendIntMap = {
	private var h :
		#if flash9 flash.utils.Dictionary
		#elseif php ArrayAccess<Dynamic>
		#else Dynamic #end;
}