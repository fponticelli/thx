package thx.js;
import thx.color.Rgb;

/**
 * ...
 * @author Franco Ponticelli
 */

class TransitionAccess<TData>
{
	var transition : Transition<TData>;
	var tweens : Hash<Node<TData> -> Int -> (Float -> Void)>;
	public function new(transition : Transition<TData>, tweens : Hash<Node<TData> -> Int -> (Float -> Void)>)
	{
		this.transition = transition;
		this.tweens = tweens;
	}
	
	function transitionColorTween(value : Rgb)
	{
		return function(d : Node<TData>, i : Int, a : Rgb) return Rgb.interpolatef(a, value);
	}
	
	function transitionColorTweenf(f : Node<TData> -> Int -> Rgb)
	{
		return function(d : Node<TData>, i : Int, a : Rgb) return Rgb.interpolatef(a, f(d,i));
	}
	
	function transitionStringTween(value : String)
	{
		return function(d : Node<TData>, i : Int, a : String) return Strings.interpolatef(a, value);
	}
	
	function transitionStringTweenf(f : Node<TData> -> Int -> String)
	{
		return function(d : Node<TData>, i : Int, a : String) return Strings.interpolatef(a, f(d,i));
	}
	
	function transitionFloatTween(value : Float)
	{
		return function(d : Node<TData>, i : Int, a : Float) return Floats.interpolatef(a, value);
	}
	
	function transitionFloatTweenf(f : Node<TData> -> Int -> Float)
	{
		return function(d : Node<TData>, i : Int, a : Float) return Floats.interpolatef(a, f(d,i));
	}
}