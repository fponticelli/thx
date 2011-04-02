/**
 * ...
 * @author Franco Ponticelli
 */

package thx.error;

using Strings;
import haxe.PosInfos;
import thx.util.Message;

class Error extends Message
{
	public var pos(default,  null) : PosInfos;
	public var inner(default, null) : Error;
	public function new(message : String, ?params : Array<Dynamic>, ?param : Dynamic, ?pos : PosInfos)
	{
		super(message, params, param);
		this.pos = pos;
	}
	
	public function setInner(inner : Error)
	{
		this.inner = inner;
		return this;
	}
	
	override public function toString()
	{
		try {
			return message.format(params);
		} catch(e : Dynamic) {
			var ps = pos.className + "." + pos.methodName + "(" + pos.lineNumber + ")";
			var pa;
			if(0 == params.length)
				pa = "no parameters passed";
			else
				pa = "wrong parameters passed ({0})";
			trace("wrong parameters passed (" + params.join(", ") + ") for pattern '" + message + "' at " +  ps);
			return "";
//			throw new Error(pa + " for pattern '{1}' at {2}", [params.join(", "), message, ps]);
		}
	}
}