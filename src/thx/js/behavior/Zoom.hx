package thx.js.behavior;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

import js.Lib;
import thx.js.Selection;
import thx.js.Dom;
import js.Dom;
import thx.js.Svg;
import thx.math.scale.Linear;
using Arrays;

class Zoom<TData>
{
	var webkit533 : Int;
	static var last = 0.0;
	var _pan : {
		x0 : Float,
		y0 : Float,
		target : HtmlDom,
		data : HtmlDom,
		index : Int
	};
	var _zoom : {
		x0 : Float,
		y0 : Float,
		z0 : Float,
		x1 : Float,
		y1 : Float
	};
	var _x : Float;
	var _y : Float;
	var _z : Float;
	var _dispatch : HtmlDom -> Int -> Void;
	
	public function new()
	{
		webkit533 = (~/WebKit\/533/).match(Lib.window.navigator.userAgent) ? -1 : 0;
		_x = 0;
		_y = 0;
		_z = 0;
	}
	
	function mousedown(d : HtmlDom, i : Int)
	{
		_pan = {
			x0 : _x - Dom.event.clientX,
			y0 : _y - Dom.event.clientY,
			target : d,
			data : Access.getData(d),
			index : i
		};
		untyped thx.js.Dom.event.preventDefault();
		Lib.window.focus();
	}
	
	function mousemove(?_,?_)
	{
		_zoom = null;
		if (null != _pan)
		{
			_x = Dom.event.clientX + _pan.x0;
			_y = Dom.event.clientY + _pan.y0;
			dispatch(_pan.data, _pan.index);
		}
	}
	
	function mouseup(_, _)
	{
		if (null != _pan)
		{
			mousemove();
			_pan = null;
		}
	}
	
	function mousewheel(d : HtmlDom, i : Int)
	{
		var e = thx.js.Dom.event;
		untyped e.preventDefault();
		if (null == _zoom)
		{
			var p = Svg.mouse((null != (cast untyped d.nearestViewportElement) ? (cast untyped d.nearestViewportElement) : d));
			_zoom = {
				x0 : _x,
				y0 : _y,
				z0 : _z,
				x1 : _x - p[0],
				y1 : _y - p[1]
			};
		}
		
		if ("dblclick" == e.type)
		{
			_z = e.shiftKey ? Math.ceil(_z - 1) : Math.floor(_z + 1);
		} else {
			var delta : Float = (untyped (e.wheelDelta / 120 || -e.detail)) * .1;
			if (webkit533 < 0)
			{
				var now = Date.now().getTime(),
					since = now - last;
				if ((since > 9) && (Math.abs(untyped e.wheelDelta) / since >= 50))
					webkit533 = 1;
				last = now;
			}
			if (webkit533 == 1)
				delta *= .03;
			_z += delta;
		}
		
		var k = Math.pow(2, _z - _zoom.z0) - 1;
		_x = _zoom.x0 + _zoom.x1 * k;
		_y = _zoom.y0 + _zoom.y1 * k;
		
		dispatch(d, i);
	}
	
	var oldscale : Linear;
	function dispatch(d, i)
	{
		if (null != _dispatch)
		{
			var event = new ZoomEvent(Math.pow(2, _z), _x, _y);
			if (null != Zoom.event && event.scale == Zoom.event.scale && event.tx == Zoom.event.tx && event.ty == Zoom.event.ty)
				return;
			Zoom.event = event;
			try
			{
				_dispatch(d, i);
			} catch (e : Dynamic) {
				trace(e);
			}
		}
	}
	
	public function zoom(f : HtmlDom -> Int -> Void, dom : HtmlDom)
	{
		_dispatch = f;
		
		var container = Dom.selectNode(dom);
		container
			.onNode("mousedown", mousedown)
			.onNode("mousewheel", mousewheel)
			.onNode("DOMMouseScroll", mousewheel)
			.onNode("dblclick", mousewheel);
		
		Dom.selectNode(cast Lib.window)
			.onNode("mousemove", mousemove)
			.onNode("mouseup", mouseup);
		
		return this;
	}
	
	public static var event : ZoomEvent;
}