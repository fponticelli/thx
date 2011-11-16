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

	public function floatNodef(f : HtmlDom -> Int -> Float, ?priority : String)
	{
		return floatTweenNodef(transitionFloatTweenf(f), priority);
	}

	public function float(value : Float, ?priority : String)
	{
		return floatTweenNodef(transitionFloatTween(value), priority);
	}
	
	public function floatTweenNodef(tween : HtmlDom -> Int -> Float -> (Float -> Float), ?priority : String)
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
	
	public function stringNodef(f : HtmlDom -> Int -> String, ?priority : String)
	{
		return stringTweenNodef(transitionStringTweenf(f), priority);
	}

	public function string(value : String, ?priority : String)
	{
		return stringTweenNodef(transitionStringTween(value), priority);
	}
	
	public function stringTweenNodef(tween : HtmlDom -> Int -> String -> (Float -> String), ?priority : String)
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
	
	public function colorNodef(f : HtmlDom -> Int -> Rgb, ?priority : String)
	{
		return colorTweenNodef(transitionColorTweenf(f), priority);
	}

	public function color(value : String, ?priority : String)
	{
		return colorTweenNodef(transitionColorTween(Colors.parse(value)), priority);
	}
	
	public function colorTweenNodef(tween : HtmlDom -> Int -> Rgb -> (Float -> Rgb), ?priority : String)
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
		return floatTweenNodef(transitionFloatTweenf(function(n,i) return f(Access.getData(n),i)), priority);
	}
	
	public function floatTweenf(tween : T -> Int -> Float -> (Float -> Float), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(d), i, Std.parseFloat(untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name)));
			return function(t)
			{
				untyped d.style.setProperty(name, "" + f(t), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
	
	public function stringf(f : T -> Int -> String, ?priority : String)
	{
		return stringTweenNodef(transitionStringTweenf(function(n,i) return f(Access.getData(n),i)), priority);
	}
	
	public function stringTweenf(tween : T -> Int -> String -> (Float -> String), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(d), i, untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name));
			return function(t)
			{
				untyped d.style.setProperty(name, f(t), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
	
	public function colorf(f : T -> Int -> Rgb, ?priority : String)
	{
		return colorTweenNodef(transitionColorTweenf(function(n,i) return f(Access.getData(n),i)), priority);
	}
	
	public function colorTweenf(tween : T -> Int -> Rgb -> (Float -> Rgb), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(d), i, Colors.parse(untyped js.Lib.window.getComputedStyle(d, null).getPropertyValue(name)));
			return function(t)
			{
				untyped d.style.setProperty(name, f(t).toRgbString(), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return _that();
	}
}