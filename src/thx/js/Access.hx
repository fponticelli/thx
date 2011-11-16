package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
import js.Dom;
import thx.js.Selection;

class Access<That>
{
	var selection : BaseSelection<That>;
	public function new(selection : BaseSelection<That>)
	{
		this.selection = selection;
	}
	
	inline function _that() : That return cast selection
	
	inline public static function getData(d : HtmlDom) : Dynamic return Reflect.field(d, "__data__")
	inline public static function setData(d : HtmlDom, v : Dynamic) Reflect.setField(d, "__data__", v)
	inline public static function emptyHtmlDom(v : Dynamic) : HtmlDom return cast { __data__ : v }
	
	inline public static function eventName(event : String) return "__on" + event
	inline public static function getEvent(d : HtmlDom, event : String) return Reflect.field(d, eventName(event))
	inline public static function hasEvent(d : HtmlDom, event : String) return null != Reflect.field(d, eventName(event))
	inline public static function addEvent(d : HtmlDom, event : String, listener : Event -> Void) Reflect.setField(d, thx.js.Access.eventName(event), listener)
	inline public static function removeEvent(d : HtmlDom, event : String) Reflect.deleteField(d, eventName(event))
	
	inline public static function setTransition(d : HtmlDom, id : Int)
	{
		if (Reflect.hasField(d, "__transition__"))
			Reflect.field(d, "__transition__").owner = id;
		else
			Reflect.setField(d, "__transition__", { owner : id } );
	}
	inline public static function getTransition(d : HtmlDom) : { owner : Int, active : Int } return Reflect.field(d, "__transition__")
	inline public static function resetTransition(d : HtmlDom) Reflect.deleteField(d, "__transition__")
}