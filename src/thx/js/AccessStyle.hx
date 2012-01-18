package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */
import thx.color.Rgb;
import thx.js.Selection;
import js.Dom;

class AccessStyle<That> extends Access<That>
{
	var name : String;
	public function new(name : String, selection : BaseSelection<That>)
	{
		super(selection);
		this.name = name;
	}
#if (js && js_shims)
	static function _getPropertyName(key : String)
	{
		if (key == 'float' || key == 'cssFloat' || key == 'styleFloat') {
			return untyped js.Lib.document.body.cssFloat == null ? 'styleFloat' : 'cssFloat';
		}
		if (key.indexOf('-') >= 0) {
			key = Strings.ucwords(key);
		}
		return key;
	}
	dynamic public static function getComputedStyleValue(node : HtmlDom, key : String) : Dynamic
	{
		if (untyped __js__("'getComputedStyle' in window"))
		{
			getComputedStyleValue = function(node, key)
			{
				return untyped js.Lib.window.getComputedStyle(node, null).getPropertyValue(key);
			}
		} else {
			getComputedStyleValue = function(node, key)
			{
				var style : Style = untyped node.currentStyle;
				if(null == Reflect.field(style, key))
					key = _getPropertyName(key);
				if(null == Reflect.field(style, key))
					return '';
				else
					return Reflect.field(style, key);
			}
		}
		return getComputedStyleValue(node, key);
	}

	dynamic public static function setStyleProperty(node : HtmlDom, key : String, value : Dynamic, priority : String) : Void
	{
		if (untyped __js__("'setProperty' in node.style"))
		{
			setStyleProperty = function(node, key, value, priority)
			{
				untyped node.style.setProperty(key, value, priority == null ? '' : priority);
			}
		} else {
			setStyleProperty = function(node, key, value, priority)
			{
				var style = node.style;
				if (null == Reflect.field(style, key))
					key = _getPropertyName(key);
				if (null != priority && "" != priority) {
					style.cssText += ';'+Strings.dasherize(key)+':'+value+'!important;';
				} else {
					Reflect.setField(style, key, value);
				}
			}
		}
	}

	dynamic public static function removeStyleProperty(node : HtmlDom, key : String) : Void
	{
		if (untyped __js__("'removeProperty' in node.style"))
		{
			removeStyleProperty = function(node, key)
			{
				untyped node.style.removeProperty(key, value);
			}
		} else {
			removeStyleProperty = function(node, key)
			{
				var style = node.style;
				if (null == Reflect.field(style, key))
					key = _getPropertyName(key);
				Reflect.deleteField(style, key);
			}
		}
	}
#else
	inline public static function getComputedStyleValue(node : HtmlDom, key : String) : Dynamic
	{
		return untyped window.getComputedStyle(node, null).getPropertyValue(key);
	}

	inline public static function setStyleProperty(node : HtmlDom, key : String, value : Dynamic, priority : String) : Void
	{
		untyped node.style.setProperty(key, value, null == priority ? '' : priority);
	}
	inline public static function removeStyleProperty(node : HtmlDom, key : String) : Void
	{
		untyped node.style.removeProperty(key);
	}
#end
	public function get()
	{
		return selection.firstNode(function(node) return getComputedStyleValue(node, name));
	}
	static var refloat = ~/(\d+(?:\.\d+)?)/;
	public function getFloat()
	{
		var v = get();
		if (refloat.match(v))
			return Std.parseFloat(refloat.matched(1));
		else
			return Math.NaN;
	}

	public function remove()
	{
		selection.eachNode(function(node, i) removeStyleProperty(node, name));
		return _that();
	}
	public function string(v : String, ?priority : String)
	{
		selection.eachNode(function(node, i) setStyleProperty(node, name, v, priority));
		return _that();
	}
	public function float(v : Float, ?priority : String)
	{
		selection.eachNode(function(node, i) setStyleProperty(node, name, v, priority));
		return _that();
	}
	public function color(v : Rgb, ?priority : String)
	{
		var s = v.toRgbString();
		selection.eachNode(function(node, i) setStyleProperty(node, name, s, priority));
		return _that();
	}
}

class AccessDataStyle<T, That> extends AccessStyle<That>
{
	public function new(name : String, selection : BoundSelection<T, That>)
	{
		super(name, selection);
	}

	public function stringf(v : T -> Int -> String, ?priority : String)
	{
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				AccessStyle.removeStyleProperty(node, name);
			else
				AccessStyle.setStyleProperty(node, name, s, priority);
		});
		return _that();
	}
	public function floatf(v : T -> Int -> Float, ?priority : String)
	{
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				AccessStyle.removeStyleProperty(node, name);
			else
				AccessStyle.setStyleProperty(node, name, "" + s, priority);
		});
		return _that();
	}
	public function colorf(v : T -> Int -> Null<Rgb>, ?priority : String)
	{
		selection.eachNode(function(node, i) {
			var s = v(Access.getData(node), i);
			if (s == null)
				AccessStyle.removeStyleProperty(node, name);
			else
				AccessStyle.setStyleProperty(node, name, "" + s.toRgbString(), priority);
		});
		return _that();
	}

	public function data()
	{
		return stringf(function(d, _) return "" + d);
	}
}