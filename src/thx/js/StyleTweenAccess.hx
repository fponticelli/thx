package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.color.Colors;
import thx.color.Rgb;

class StyleTweenAccess<TData> extends TransitionAccess<TData>
{
	var name : String;
	public function new(name : String, transition : Transition<TData>, tweens : Hash<Node<TData> -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
		this.name = name;
	}

	public function stringf(f : Node<TData> -> Int -> String, ?priority : String)
	{
		return stringTween(transitionStringTweenf(f), priority);
	}
	
	public function string(value : String, ?priority : String)
	{
		return stringTween(transitionStringTween(value), priority);
	}
	
	public function stringTween(tween : Node<TData> -> Int -> String -> (Float -> String), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, untyped js.Lib.window.getComputedStyle(d.dom, null).getPropertyValue(name));
			return function(t)
			{
				untyped d.dom.style.setProperty(name, f(t), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return transition;
	}
	
	public function colorf(f : Node<TData> -> Int -> Rgb, ?priority : String)
	{
		return colorTween(transitionColorTweenf(f), priority);
	}
	
	public function color(value : String, ?priority : String)
	{
		return colorTween(transitionColorTween(Colors.parse(value)), priority);
	}
	
	public function colorTween(tween : Node<TData> -> Int -> Rgb -> (Float -> Rgb), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
		var name = this.name;
		function styleTween(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, Colors.parse(untyped js.Lib.window.getComputedStyle(d.dom, null).getPropertyValue(name)));
			return function(t)
			{
				untyped d.dom.style.setProperty(name, f(t).toRgbString(), priority);
			}
		}
		tweens.set("style." + name, styleTween);
		return transition;
	}
}