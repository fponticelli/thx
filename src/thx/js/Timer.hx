package thx.js;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class Timer
{
	static var timeout : Int = 0;
	static var queue : QueueHtmlDom = null;
	static var interval : Int = 0;
	public static function timer(f : Float -> Bool, ?delay : Float = 0.0)
	{
		var now = Date.now().getTime(),
			found = false,
			start = now + delay,
			t0,
			t1 = queue;
			
		if (!Math.isFinite(delay))
			return;
			
		while (null != t1)
		{
			if (Reflect.compareMethods(f, t1.f))
			{
				t1.then = now;
				t1.delay = delay;
				found = true;
			} else {
				var x = t1.then + t1.delay;
				if (x < start)
					start = x;
			}
			t0 = t1;
			t1 = t1.next;
		}
		
		if (!found)
		{
			queue = {
				f : f,
				then : now,
				delay : delay,
				next : queue,
				flush : false
			}
		}
		
		if (0 == interval)
		{
			untyped __js__("clearTimeout")(thx.js.Timer.timeout);
			thx.js.Timer.timeout = untyped __js__("setTimeout")(thx.js.Timer.start, Math.max(24, start - now));
		}
	}
	
	static var start = function()
	{
		interval = 1;
		timeout = 0;
		untyped js.Lib.window.requestAnimationFrame(_step);
	}
	
	static function step()
	{
		var elapsed,
			now = Date.now().getTime(),
			t0 = null,
			t1 = queue;
		while (null != t1)
		{
			elapsed = now - t1.then;
			if (elapsed > t1.delay)
				t1.flush = t1.f(elapsed);
			t1 = (t0 = t1).next;
		}
		flush();
		if (0 != interval)
			untyped js.Lib.window.requestAnimationFrame(_step);
	}
	
	static var _step = step;
	
	static function flush()
	{
		var t0 = null,
			t1 = queue;
		while (null != t1)
		{
			t1 = t1.flush
				? (null != t0 ? t0.next = t1.next : queue = t1.next)
				: (t0 = t1).next;
		}
		if (null == t0)
			interval = 0;
	}
	
	static function __init__()
	{
		untyped window.requestAnimationFrame = __js__("window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 1000 / 60); } ");
	}
}

typedef QueueHtmlDom = {
	f : Float -> Bool,
	then : Float,
	delay : Float,
	next : Null<QueueHtmlDom>,
	flush : Bool
}