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
	
	override public function stringTween(tween : Node<TData> -> Int -> String -> (Float -> String), ?priority : String)
	{
		if (null == priority)
			priority = null; // FF fix
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
}