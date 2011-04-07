package thx.js;
import thx.xml.Namespace;

/**
 * ...
 * @author Franco Ponticelli
 */

class AttributeTweenAccess<TData> extends TransitionAccess<TData>
{
	var name : String;
	var qname : NSQualifier;
	public function new(name : String, transition : Transition<TData>, tweens : Hash<Node<TData> -> Int -> (Float -> Void)>)
	{
		super(transition, tweens);
		this.name = name;
		this.qname = Namespace.qualify(name);
	}
	
	public function stringf(f : Node<TData> -> Int -> String)
	{
		return stringTween(transitionStringTweenf(f));
	}
	
	public function string(value : String)
	{
		return stringTween(transitionStringTween(value));
	}
	
	public function stringTween(tween : Node<TData> -> Int -> String -> (Float -> String))
	{
		var name = this.name;

		function attrTween(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, d.dom.getAttribute(name));
			return function(t) {
				d.dom.setAttribute(name, f(t));
			};
		}

		function attrTweenNS(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, untyped d.dom.getAttributeNS(name.space, name.local));
			return function(t) {
				untyped d.dom.setAttributeNS(name.space, name.local, f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return transition;
	}
	
	public function floatf(f : Node<TData> -> Int -> Float)
	{
		return floatTween(transitionFloatTweenf(f));
	}
	
	public function float(value : Float)
	{
		return floatTween(transitionFloatTween(value));
	}
	
	public function floatTween(tween : Node<TData> -> Int -> Float -> (Float -> Float))
	{
		var name = this.name;

		function attrTween(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, Std.parseFloat(d.dom.getAttribute(name)));
			return function(t) {
				d.dom.setAttribute(name, "" + f(t));
			};
		}

		function attrTweenNS(d : Node<TData>, i : Int) : Float -> Void
		{
			var f = tween(d, i, Std.parseFloat(untyped d.dom.getAttributeNS(name.space, name.local)));
			return function(t) {
				trace(t);
				untyped d.dom.setAttributeNS(name.space, name.local, ""  + f(t));
			};
		}
		
		tweens.set("attr." + name, null == qname ? attrTween : attrTweenNS);
		return transition;
	}
}