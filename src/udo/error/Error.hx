/**
 * ...
 * @author Franco Ponticelli
 */

package udo.error;

using udo.text.UString;
import haxe.PosInfos;
import udo.util.Message;

class Error extends Message
{
	public var pos(default,  null) : PosInfos;
	public var inner(default, null) : Error;
	public function new(message : String, ?params : Array<Dynamic>, ?param : Dynamic, ?inner : Error, ?pos : PosInfos)
	{
		super(message, params, param);
		this.inner = inner;
		this.pos = pos;
	}
	
	public function setInner(inner : Error)
	{
		this.inner = inner;
		return this;
	}
	
	override public function toString()
	{
		return (null != inner ? inner.toString() + " " : "" ) + message.format(params);
	}
}