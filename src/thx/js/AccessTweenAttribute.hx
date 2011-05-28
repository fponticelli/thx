package thx.js;
import thx.xml.Namespace;
import js.Dom;
import thx.js.Selection;
import thx.js.Transition;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class AccessTweenAttribute<That : BaseTransition<Dynamic>> extends AccessTween<That>
{
	var name : String;
	var qname : NSQualifier;
	public function new(name : String, transition : BaseTransition<That>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
		this.name = name;
		this.qname = Namespace.qualify(name);
	}
	
	public function stringNodef(f : HtmlDom -> Int -> String)
	{
		return stringTweenNodef(transitionStringTweenf(f));
	}

	public function string(value : String)
	{
		return stringTweenNodef(transitionStringTween(value));
	}
	
	public function stringTweenNodef(tween : HtmlDom -> Int -> String -> (Float -> String))
	{
		var name = this.name;

		function attrTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, d.getAttribute(name));
			return function(t) {
				d.setAttribute(name, f(t));
			};
		}

		function attrTweenNS(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, untyped d.getAttributeNS(name.space, name.local));
			return function(t) {
				untyped d.setAttributeNS(name.space, name.local, f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return _that();
	}
	
	public function floatNodef(f : HtmlDom -> Int -> Float)
	{
		return floatTweenNodef(transitionFloatTweenf(f));
	}

	public function float(value : Float)
	{
		return floatTweenNodef(transitionFloatTween(value));
	}
	
	public function floatTweenNodef(tween : HtmlDom -> Int -> Float -> (Float -> Float))
	{
		var name = this.name;

		function attrTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, Std.parseFloat(d.getAttribute(name)));
			return function(t) {
				d.setAttribute(name, "" + f(t));
			};
		}

		function attrTweenNS(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, Std.parseFloat(untyped d.getAttributeNS(name.space, name.local)));
			return function(t) {
				untyped d.setAttributeNS(name.space, name.local, ""  + f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return _that();
	}
}

class AccessDataTweenAttribute<T, That : BaseTransition<Dynamic>> extends AccessTweenAttribute<That>
{
	public function new(name : String, transition : BoundTransition<T>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(name, cast transition, tweens);
	}

	public function stringf(f : T -> Int -> String)
	{
		return stringTweenNodef(transitionStringTweenf(function(n,i) return f(Access.getData(n),i)));
	}
	
	public function floatf(f : T -> Int -> Float)
	{
		return floatTweenNodef(transitionFloatTweenf(function(n,i) return f(Access.getData(n),i)));
	}
	
	public function stringTweenf(tween : T -> Int -> String -> (Float -> String))
	{
		var name = this.name;

		function attrTween(n : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(n), i, n.getAttribute(name));
			return function(t) {
				n.setAttribute(name, f(t));
			};
		}

		function attrTweenNS(n : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(n), i, untyped n.getAttributeNS(name.space, name.local));
			return function(t) {
				untyped n.setAttributeNS(name.space, name.local, f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return _that();
	}
	
	public function floatTweenf(tween : T -> Int -> Float -> (Float -> Float))
	{
		var name = this.name;

		function attrTween(n : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(n), i, Std.parseFloat(n.getAttribute(name)));
			return function(t) {
				n.setAttribute(name, "" + f(t));
			};
		}

		function attrTweenNS(n : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(n), i, Std.parseFloat(untyped n.getAttributeNS(name.space, name.local)));
			return function(t) {
				untyped n.setAttributeNS(name.space, name.local, ""  + f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return _that();
	}
}