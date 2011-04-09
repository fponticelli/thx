package thx.js.behavior;

/**
 * ...
 * @author Franco Ponticelli
 */

import js.Lib;
import thx.js.Selection;
import thx.js.Node;
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
		data : Node<TData>,
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
	var _dispatch : Node<TData> -> Int -> Void;
	
	public function new()
	{
		webkit533 = (~/WebKit\/533/).match(Lib.window.navigator.userAgent) ? -1 : 0;
		_x = 0;
		_y = 0;
		_z = 0;
	}
	
	function mousedown(d : Node<TData>, i : Int)
	{
		_pan = {
			x0 : _x - Dom.event.clientX,
			y0 : _y - Dom.event.clientY,
			target : d.dom,
			data : d,
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
	
	function mousewheel(d : Node<TData>, i : Int)
	{
		var e = thx.js.Dom.event;
		untyped e.preventDefault();
		var dom = d.dom;
		if (null == _zoom)
		{
			var p = Svg.mouse((null != (cast untyped dom.nearestViewportElement) ? (cast untyped dom.nearestViewportElement) : dom));
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
		var k = Math.pow(2, _z);
		
		function transform(scale : Linear, o : Float)
		{
			var domain = untyped (scale.__domain || (scale.__domain = scale.getDomain()));
			var	range = scale.getRange().map(function(v,_) return (v - o) / k);

			scale.domain(domain[0], domain[1]);
			var r = range.map(scale.invert);
			scale.domain(r[0], r[1]);
		}
		
		var me = this;
		Zoom.event = {
			scale : k,
			translate : [me._x, me._y],
			transform : function(sx : Linear, sy : Linear) {
				if (null != sx)
					transform(sx, me._x);
				if (null != sy)
					transform(sy, me._y);
			}
		}
		
		if (null != _dispatch)
		{
			try
			{
				_dispatch(d, i);
			} catch (e : Dynamic) {
				trace(e);
			}
		}
	}
	
	public function zoom(f : Node<TData> -> Int -> Void, ?dom : HtmlDom, ?node : Node<TData>)
	{
		_dispatch = f;
		
		var container = (null != dom) ? Dom.selectDom(dom) : Dom.selectNode(node);
		container
			.on("mousedown", mousedown)
			.on("mousewheel", mousewheel)
			.on("DOMMouseScroll", mousewheel)
			.on("dblclick", mousewheel);
		
		Dom.selectDom(cast Lib.window)
			.on("mousemove", mousemove)
			.on("mouseup", mouseup);
		
		return this;
	}
	
	public static var event;
}