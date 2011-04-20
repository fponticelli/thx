package thx.js;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.js.Dom;
import js.Dom;
import js.Lib;

class Svg
{
	static var _usepage = (~/WebKit/).match(Lib.window.navigator.userAgent);
	public static function mouse(dom : HtmlDom)
	{
		var point : {x : Float, y : Float} = untyped (null != dom.ownerSVGElement ? dom.ownerSVGElement : dom).createSVGPoint();
		if (_usepage && untyped (js.Lib.window.scrollX || js.Lib.window.scrollY))
		{
			var svg = Dom.selectNode(Lib.document.body)
				.append("svg:svg")
					.style("position").string("absolute")
					.style("top").float(0)
					.style("left").float(0);
			var ctm = untyped svg.node().dom.getScreenCTM();
			_usepage = !(ctm.f || ctm.e);
			svg.remove();
		}
		if (_usepage)
		{
			point.x = untyped Dom.event.pageX;
			point.y = untyped Dom.event.pageY;
		} else {
			point.x = Dom.event.clientX;
			point.y = Dom.event.clientY;
		}
		point = untyped point.matrixTransform(dom.getScreenCTM().inverse());
		return [point.x, point.y];
	}
	
}