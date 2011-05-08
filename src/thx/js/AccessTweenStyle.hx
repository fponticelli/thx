package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import thx.color.Colors;
import thx.color.Rgb;
import js.Dom;
import thx.js.Selection;
import thx.js.Transition;

class AccessTweenStyle<That : BaseTransition<Dynamic>> extends AccessTween<That>
{
	var name : String;
	public function new(name : String, transition : BaseTransition<That>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
		this.name = name;
	}

	public function floatfNode(f : HtmlDom -> Int -> Float, ?priority : String)
	{
		return floatTween(transitionFloatTweenf(f), priority);
	}

	public function float(value : Float, ?priority : String)
	{
		return floatTween(transitionFloatTween(value), priority);
	}
	
	public function floatTween(tween : HtmlDom -> Int -> Float -> (Float -> Float), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, Std.parseFloat(untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name)));
			return function(t)
			{
				untyped d.style.setProperty(name, "" + f(t), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
	
	public function stringfNode(f : HtmlDom -> Int -> String, ?priority : String)
	{
		return stringTween(transitionStringTweenf(f), priority);
	}

	public function string(value : String, ?priority : String)
	{
		return stringTween(transitionStringTween(value), priority);
	}
	
	public function stringTween(tween : HtmlDom -> Int -> String -> (Float -> String), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name));
			return function(t)
			{
				untyped d.style.setProperty(name, f(t), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
	
	public function colorfNode(f : HtmlDom -> Int -> Rgb, ?priority : String)
	{
		return colorTween(transitionColorTweenf(f), priority);
	}

	public function color(value : String, ?priority : String)
	{
		return colorTween(transitionColorTween(Colors.parse(value)), priority);
	}
	
	public function colorTween(tween : HtmlDom -> Int -> Rgb -> (Float -> Rgb), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, Colors.parse(untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name)));
			return function(t)
			{
				untyped d.style.setProperty(name, f(t).toRgbString(), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
}

class AccessDataTweenStyle<T, That : BaseTransition<Dynamic>> extends AccessTweenStyle<That>
{
	public function new(name : String, transition : BoundTransition<T>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(name, cast transition, tweens);
	}
	
	public function floatf(f : T -> Int -> Float, ?priority : String)
	{
		return floatfNode(function(n,i) return f(Access.getData(n),i), priority);
	}
	
	public function stringf(f : T -> Int -> String, ?priority : String)
	{
		return stringfNode(function(n,i) return f(Access.getData(n),i), priority);
	}
	
	public function colorf(f : T -> Int -> Rgb, ?priority : String)
	{
		return colorfNode(function(n,i) return f(Access.getData(n),i), priority);
	}
}