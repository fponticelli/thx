/**
 * ...
 * @author Franco Ponticelli
 */

package udo.collections;

class UHash
{
	public static function createHash<T>(datas : Dynamic<T>) : Hash<T>
	{
		var hash = new Hash();
		for (field in Reflect.fields(datas))
			hash.set(field, Reflect.field(datas, field));
		return hash;
	}
	
	public static function copyTo<T>(from : Hash<T>, to : Hash<T>)
	{
		for (k in from.keys())
			to.set(k, from.get(k));
	}
	
	public static inline function arrayOfKeys(hash : Hash<Dynamic>)
	{
		return UIterator.array(hash.keys());
	}
	
	public static function count(hash : Hash<Dynamic>)
	{
		#if neko
		return untyped __dollar__hsize(hash.h);
		#elseif php
		return untyped __call__('count', hash.h);
		#else
		var i = 0;
		for (_ in hash)
			i++;
		return i;
		#end
	}
	
	public static function clear(hash : Hash<Dynamic>)
	{
		var _hash : FriendHash = hash;
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
		#elseif cpp
		_hash.h = {};
		#elseif php
		_hash.h = untyped __call__('array');
		#end
	}
}

typedef FriendHash = {
	private var h :
		#if flash9 flash.utils.Dictionary
		#elseif php ArrayAccess<Dynamic>
		#else Dynamic #end;
}