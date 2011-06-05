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
	static var _outer : HtmlDom;
	var _dispatcher : HtmlDom -> Int -> Void;
	public function new()
	{
		if(null == _outer)
			_outer = Dom.select("body").append("div")
				.style("visibility").string("hidden")
				.style("position").string("absolute")
				.style("top").string("-3000px")
				.style("height").float(0)
				.style("overflow-y").string("scroll")
			.append("div")
				.style("height").string("2000px")
				.node().parentNode;
	}
	
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
		if (null == _zoom)
		{
			var p = Svg.mouse(cast untyped d.nearestViewportElement || d);
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
			var delta : Float = untyped (e.wheelDelta || -e.detail);
			if (cast delta)
			{
				try
				{
					_outer.scrollTop = 1000;
					untyped _outer.dispatchEvent(e);
					delta = 1000 - _outer.scrollTop;
				} catch (e : Dynamic) { }
				delta *= .005;
			}
			_z += delta;
		}
		
		var k = Math.pow(2, _z - _zoom.z0) - 1;
		_x = _zoom.x0 + _zoom.x1 * k;
		_y = _zoom.y0 + _zoom.y1 * k;
		
		dispatch(d, i);
		untyped e.preventDefault();
	}
	
	var oldscale : Linear;
	function dispatch(d, i)
	{
		if (null != _dispatcher)
		{
			var event = new ZoomEvent(Math.pow(2, _z), _x, _y);
			if (null != Zoom.event && event.scale == Zoom.event.scale && event.tx == Zoom.event.tx && event.ty == Zoom.event.ty)
				return;
			Zoom.event = event;
			try
			{
				_dispatcher(d, i);
			} catch (e : Dynamic) {
				trace(e);
			}
		}
	}
	
	function attach(dom : HtmlDom, ?i : Int)
	{
		var container = Dom.selectNode(dom);
		container
			.onNode("mousedown", mousedown)
			.onNode("mousewheel", mousewheel)
			.onNode("DOMMouseScroll", mousewheel)
			.onNode("dblclick", mousewheel);
		
		Dom.selectNode(cast Lib.window)
			.onNode("mousemove", mousemove)
			.onNode("mouseup", mouseup);
	}
	
	public function zoom(f : HtmlDom -> Int -> Void)
	{
		_dispatcher = f;
		return attach;
	}
	
	public static var event : ZoomEvent;
}