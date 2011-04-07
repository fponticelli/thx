package thx.js;

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
	
	function transitionStringTween(value : String)
	{
		return function(d : Node<TData>, i : Int, a : String) return Strings.interpolatef(a, value);
	}
	
	public function string(value : String, ?priority : String)
	{
		return stringTween(transitionStringTween(value), priority);
	}
	
	public function stringTween(tween : Node<TData> -> Int -> String -> (Float -> String), ?priority : String)
	{
		return transition;
	}
}