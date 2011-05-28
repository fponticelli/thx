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
				break;
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
			thx.js.Timer.timeout = untyped __js__("clearTimeout")(thx.js.Timer.timeout);
			thx.js.Timer.interval = 1;
			untyped window.requestAnimationFrame(thx.js.Timer._step);
		}
	}
	
	static var _step = step;
	static function step()
	{
		var elapsed,
			now = Date.now().getTime(),
			t1 = queue;
		while (null != t1)
		{
			elapsed = now - t1.then;
			if (elapsed > t1.delay)
				t1.flush = t1.f(elapsed);
			t1 = t1.next;
		}
		
		var delay = _flush() - now;
		if (delay > 24)
		{
			if (Math.isFinite(delay))
			{
				untyped __js__("clearTimeout")(thx.js.Timer.timeout);
				thx.js.Timer.timeout = untyped __js__("setTimeout")(thx.js.Timer._step, delay);
			}
			interval = 0;
		} else {
			interval = 1;
			untyped window.requestAnimationFrame(thx.js.Timer._step);
		}
	}
	
	public static function flush()
	{
		var elapsed,
			now = Date.now().getTime(),
			t1 = queue;
		while (null != t1)
		{
			elapsed = now - t1.then;
			if (t1.delay == 0) t1.flush = t1.f(elapsed);
			t1 = t1.next;
		}
		
		_flush();
	}
	
	static function _flush()
	{
		var t0 = null,
			t1 = queue,
			then = Math.POSITIVE_INFINITY;
		while (null != t1)
		{
			if (t1.flush)
			{
				t1 = null != t0 ? t0.next = t1.next : queue = t1.next;
			} else {
				then = Math.min(then, t1.then + t1.delay);
				t1 = (t0 = t1).next;
			}
		}
		return then;
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