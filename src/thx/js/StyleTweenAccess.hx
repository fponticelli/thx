package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

class StyleTweenAccess<TData> extends TransitionAccess<TData>
{
	var name : String;
	public function new(name : String, transition : Transition<TData>, tweens : Hash<Node<TData> -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
		this.name = name;
	}

	override public function stringTween(tween : Node<TData> -> Int -> String -> (Float -> String), ?priority : String)
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
}