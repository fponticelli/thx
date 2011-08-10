package thx.js;
import thx.xml.Namespace;
import js.Dom;
import thx.js.Selection;
import thx.js.Transition;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class AccessTweenText<That : BaseTransition<Dynamic>> extends AccessTween<That>
{
	public function new(transition : BaseTransition<That>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
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
		function handler(d : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(d, i, untyped d.textContent);
			return function(t)
			{
				untyped d.textContent = f(t);
			}
		}
		
		tweens.set("text", handler);
		return _that();
	}
	
	public function charsNodef(f : HtmlDom -> Int -> String)
	{
		return stringTweenNodef(transitionCharsTweenf(f));
	}

	public function chars(value : String)
	{
		return stringTweenNodef(transitionCharsTween(value));
	}
}

class AccessDataTweenText<T, That : BaseTransition<Dynamic>> extends AccessTweenText<That>
{
	public function new(transition : BoundTransition<T>, tweens : Hash<HtmlDom -> Int -> (Float -> Void)>)
	{
		super(cast transition, tweens);
	}

	public function stringf(f : T -> Int -> String)
	{
		return stringTweenNodef(transitionStringTweenf(function(n,i) return f(Access.getData(n),i)));
	}
	
	public function charsf(f : T -> Int -> String)
	{
		return stringTweenNodef(transitionCharsTweenf(function(n,i) return f(Access.getData(n),i)));
	}
	
	public function stringTweenf(tween : T -> Int -> String -> (Float -> String))
	{
		function handler(n : HtmlDom, i : Int) : Float -> Void
		{
			var f = tween(Access.getData(n), i, untyped d.textContent);
			return function(t)
			{
				untyped d.textContent = f(t);
			}
		}
		
		tweens.set("text", handler);
		return _that();
	}
}