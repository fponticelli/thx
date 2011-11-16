package thx.js;
import thx.color.Rgb;
import js.Dom;
import thx.js.Transition;
/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class AccessTween<That : BaseTransition<Dynamic>>
{
	var transition : BaseTransition<That>;
	var tweens : Hash<HtmlDom -> Int -> (Float -> Void)>;
	public function new(transition : BaseTransition<That>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		this.transition = transition;
		this.tweens = tweens;
	}
	
	function transitionColorTween(value : Rgb)
	{
		return function(d : HtmlDom, i : Int, a : Rgb) return Rgb.interpolatef(a, value);
	}
	
	function transitionColorTweenf(f : HtmlDom -> Int -> Rgb)
	{
		return function(d : HtmlDom, i : Int, a : Rgb) return Rgb.interpolatef(a, f(d,i));
	}
	
	function transitionStringTween(value : String)
	{
		return function(d : HtmlDom, i : Int, a : String) return Strings.interpolatef(a, value);
	}
	
	function transitionStringTweenf(f : HtmlDom -> Int -> String)
	{
		return function(d : HtmlDom, i : Int, a : String) return Strings.interpolatef(a, f(d,i));
	}
	
	function transitionCharsTween(value : String)
	{
		return function(d : HtmlDom, i : Int, a : String) return Strings.interpolateCharsf(a, value);
	}
	
	function transitionCharsTweenf(f : HtmlDom -> Int -> String)
	{
		return function(d : HtmlDom, i : Int, a : String) return Strings.interpolateCharsf(a, f(d,i));
	}
	
	function transitionFloatTween(value : Float)
	{
		return function(d : HtmlDom, i : Int, a : Float) return Floats.interpolatef(a, value);
	}
	
	function transitionFloatTweenf(f : HtmlDom -> Int -> Float)
	{
		return function(d : HtmlDom, i : Int, a : Float) return Floats.interpolatef(a, f(d,i));
	}
	
	inline function _that() : That return cast transition
}