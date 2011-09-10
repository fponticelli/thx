/**
 * ...
 * @author Franco Ponticelli
 */

import DynamicsT;
import thx.collection.Set;

class Hashes
{
	public static function toDynamic<T>(hash : Hash<T>) : Dynamic<T>
	{
		var o : Dynamic<T> = { };
		for (key in hash.keys())
			Reflect.setField(o, key, hash.get(key));
		return o;
	}
	
	public static function importObject<T>(hash : Hash<T>, ob : Dynamic<T>) : Hash<T>
	{
		return DynamicsT.copyToHash(ob, hash);
	}
	
	public static function copyTo<T>(from : Hash<T>, to : Hash<T>)
	{
		for (k in from.keys())
			to.set(k, from.get(k));
		return to;
	}
	
	public static function clone<T>(src : Hash<T>)
	{
		var h = new Hash();
		Hashes.copyTo(src, h);
		return h;
	}
	
	public static inline function arrayOfKeys(hash : Hash<Dynamic>)
	{
		return Iterators.array(hash.keys());
	}
	
	public static function setOfKeys(hash : Hash<Dynamic>) : Set<String>
	{
		var set = new Set();
		for(k in hash.keys())
			set.add(k);
		return set;
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
	
	public static function mergef<T>(hash : Hash<T> , new_hash : Hash<T> , f:String->T->T->T)
	{
		for (k in new_hash.keys()){
			var new_val = new_hash.get(k);
			if (hash.exists(k)){
				var old_val = hash.get(k);
				hash.set(k, f(k, old_val, new_val));
			} else{
				hash.set(k,new_val);
			}
		} 
	}
	
	public static function merge<T>(hash : Hash<T> , new_hash : Hash<T>)
	{
		mergef(hash,new_hash, function(key, old_v,new_v) return new_v);
	}
	
	public static function clear(hash : Hash<Dynamic>)
	{
		#if cpp
		var _hash : { private var __Internal : Dynamic; } = hash;
		_hash.__Internal = {};
		#else
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
		#elseif php
		_hash.h = untyped __call__('array');
		#end
		#end
	}
}

typedef FriendHash = {
	private var h :
		#if flash9 flash.utils.Dictionary
		#elseif php ArrayAccess<Dynamic>
		#else Dynamic #end;
}