/**
 * ...
 * @author Franco Ponticelli
 */

package thx.util;

using thx.text.UString;
import haxe.PosInfos;

class Message
{
	public var message(default, null) : String;
	public var params(default, null) : Array<Dynamic>;
	public function new(message : String, ?params : Array<Dynamic>, ?param : Dynamic)
	{
		this.message = message;
		if (null == params)
			this.params = [];
		else
			this.params = params;
		if (null != param)
			this.params.push(param);
	}
	
	public function toString()
	{
		return message.format(params);
	}
}