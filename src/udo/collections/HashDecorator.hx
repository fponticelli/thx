/**
 * ...
 * @author Franco Ponticelli
 */

package udo.collections;
import udo.error.NullArgument;

#if (flash9 || php)
class HashDecorator<T> extends Hash<T>
{
	var _d : Hash<T>;
	public function new(decorated : Hash<T>)
	{
		super();
		NullArgument.throwIfNull(decorated, "decorated");
		_d = decorated;
	}
	
	override public function set( key : String, value : T ) : Void {
		_d.set(key, value);
	}

	override public function get( key : String ) : Null<T> {
		return _d.get(key);
	}

	override public function exists( key : String ) : Bool {
		return _d.exists(key);
	}

	override public function remove( key : String ) : Bool {
		return _d.remove(key);
	}

	override public function keys() : Iterator<String> {
		return _d.keys();
	}

	override public function iterator() : Iterator<T> {
		return _d.iterator();
	}

	override public function toString() {
		return _d.toString();
	}
}
#else
class HashDecorator<T> implements Hash<T>
{
	private var h : Dynamic;
	var _d : Hash<T>;
	public function new(decorated : Hash<T>)
	{

		NullArgument.throwIfNull(decorated, "decorated");
		_d = decorated;
	}
	
	public function set( key : String, value : T ) : Void {
		_d.set(key, value);
	}

	public function get( key : String ) : Null<T> {
		return _d.get(key);
	}

	public function exists( key : String ) : Bool {
		return _d.exists(key);
	}

	public function remove( key : String ) : Bool {
		return _d.remove(key);
	}

	public function keys() : Iterator<String> {
		return _d.keys();
	}

	public function iterator() : Iterator<T> {
		return _d.iterator();
	}
#if php
	public function getIterator() : Iterator<T> {
		return _d.iterator();
	}
#end
	public function toString() {
		return _d.toString();
	}
}
#end