package thx.js;
import js.Lib;
import js.Dom;
import thx.error.AbstractMethod;
import thx.math.Ease;
import thx.math.EaseMode;
import thx.math.Equations;
import thx.js.Selection;
import thx.js.Transition;
import thx.js.AccessTweenAttribute;
import thx.js.AccessTweenStyle;
import thx.js.AccessTweenText;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 * @todo text()
 */

using Arrays;

class BaseTransition<This : BaseTransition<Dynamic>>
{
	static var _id = 0;
	static var _inheritid = 0;
	
	var _transitionId : Int;
	var _tweens : Hash<HtmlDom -> Int -> (Float -> Void)>;
	var _interpolators : Array<Hash<Float -> Void>>;
	var _remove : Bool;
	var _stage : Array<Int>;
	var _delay : Array<Float>;
	var _duration : Array<Float>;
	var _durationMax : Float;
	var _ease : Float -> Float;
	var _step : Float -> Bool; // fix for $closure issue
	
	var _start : HtmlDom -> Int -> Void;
	var _end : HtmlDom -> Int -> Void;
	
	var selection : BaseSelection<Dynamic>;
	
	public function new(selection : BaseSelection<Dynamic>)
	{
		this.selection = selection;
		var tid = _transitionId = _inheritid > 0 ? _inheritid : ++_id;
		_tweens = new Hash();
		_interpolators = [];
		_remove = false;
		_stage = [];
		_delay = [];
		_duration = [];
		_ease = Ease.mode(EaseInEaseOut, Equations.cubic);
		_step = step;
		selection.eachNode(function(n, _) {
			Access.setTransition(n, tid);
		});
		
		delay(0);
		duration(250);
	}
	
	function step(elapsed : Float)
	{
		var clear = true,
			k = -1,
			me = this;
		selection.eachNode(function(n : HtmlDom, i : Int) {
			if (2 == me._stage[++k])
				return;
			var t = (elapsed - me._delay[k]) / me._duration[k],
				tx = Access.getTransition(n),
				te, // ease(t)
				tk, // tween key
				ik = me._interpolators[k];
			if (t < 1)
			{
				clear = false;
				if (t < 0) return;
			} else {
				t = 1;
			}
			
			// Determine the stage of this transition
			// null - Not yet started
			// 1 - In progress
			// 2 - Ended
			if (null != me._stage[k])
			{
				if (null == tx || tx.active != me._transitionId)
				{
					me._stage[k] = 2;
					return;
				}
			} else if (null == tx || tx.active > me._transitionId)
			{
				me._stage[k] = 2;
				return;
			} else {
				me._stage[k] = 1;
				if (null != me._start)
					me._start(n, i);
				ik = me._interpolators[k] = new Hash();
				tx.active = me._transitionId;
				for (tk in me._tweens.keys())
				{
					var f = me._tweens.get(tk);
					ik.set(tk, f(n, i));
				}
			}
			
			// apply interpolators
			te = me._ease(t);
			for (tk in me._tweens.keys())
				ik.get(tk)(te);
				
			// handle ending transitions
			if (1 == t)
			{
				me._stage[k] = 2;
				if (tx.active == me._transitionId)
				{
					var owner = tx.owner;
					if (owner == me._transitionId)
					{
						Access.resetTransition(n);
						if (me._remove)
							n.parentNode.removeChild(n);
					}
					_inheritid = me._transitionId;
					if (null != me._end)
					me._end(n, i);
					_inheritid = 0;
					tx.owner = owner;
				}
			}
		});
		return clear;
	}

	public function startNode(f : HtmlDom -> Int -> Void) : This
	{
		_start = f;
		return _this();
	}
	
	public function endNode(f : HtmlDom -> Int -> Void) : This
	{
		_end = f;
		return _this();
	}
	
	public function stop() : This
	{
		var k = -1,
			me = this;
		selection.eachNode(function(n, i) {
			me._stage[++k] = 2;
			Access.resetTransition(n);
		});
		return _this();
	}
	
	public function delay(?f : HtmlDom -> Int -> Float, ?v : Float = 0.0) : This
	{
		var delayMin = Math.POSITIVE_INFINITY,
			k = -1,
			me = this;
		if (null != f)
		{
			selection.eachNode(function(n, i) {
				var x = me._delay[++k] = f(n, i);
				if (x < delayMin)
					delayMin = x;
			});
		} else {
			delayMin = v;
			selection.eachNode(function(n, i) {
				me._delay[++k] = delayMin;
			});
		}
		Timer.timer(_step, delayMin);
		return _this();
	}
	
	public function duration(?f : HtmlDom -> Int -> Float, ?v : Float = 0.0) : This
	{
		var k = -1,
			me = this;
		if (null != f)
		{
			_durationMax = 0;
			selection.eachNode(function(n, i) {
				var x = me._duration[++k] = f(n, i);
				if (x > me._durationMax)
					me._durationMax = x;
			});
		} else {
			_durationMax = v;
			selection.eachNode(function(n, i) {
				me._duration[++k] = me._durationMax;
			});
		}
		return _this();
	}
	
	public function ease(?f : Float -> Float, ?easemode : EaseMode) : This
	{
		_ease = Ease.mode(easemode, f);
		return _this();
	}
	
	public function remove(v : Bool = true) : This
	{
		_remove = v;
		return _this();
	}
	
	public function select(selector : String) : This
	{
		var k, t = createTransition(selection.select(selector));
		untyped t._ease = this._ease;
		var delay = this._delay;
		var duration = this._duration;
		k = -1; t.delay(function(d, i) return delay[++k]);
		k = -1; t.delay(function(d, i) return duration[++k]);
		return t;
	}
	
	public function selectAll(selector : String) : This
	{
		var k, t = createTransition(selection.selectAll(selector));
		untyped t._ease = this._ease;
		var delay = this._delay;
		var duration = this._duration;
		k = -1; t.delay(function(d, i) return delay[i > 0 ? k : ++k]);
		k = -1; t.delay(function(d, i) return duration[i > 0 ? k : ++k]);
		return t;
	}
	
	function createTransition(selection : BaseSelection<Dynamic>) : This
	{
		return throw new AbstractMethod();
	}
	
	function _this() : This return cast this
}

class UnboundTransition extends BaseTransition<UnboundTransition>
{
	public function text() : AccessTweenText<UnboundTransition> return new AccessTweenText(this, _tweens)
	public function style(name : String) : AccessTweenStyle<UnboundTransition> return new AccessTweenStyle(name, this, _tweens)
	public function attr(name : String) : AccessTweenAttribute<UnboundTransition> return new AccessTweenAttribute(name, this, _tweens)
	
	override function createTransition(selection : BaseSelection<Dynamic>)
	{
		return new UnboundTransition(selection);
	}
}

class BoundTransition<T> extends BaseTransition<BoundTransition<T>>
{
	public function new(selection : BoundSelection<T, Dynamic>)
	{
		super(selection);
	}
	
	public function text() : AccessDataTweenText<T, BoundTransition<T>> return new AccessDataTweenText(this, _tweens)
	public function style(name : String) : AccessDataTweenStyle<T, BoundTransition<T>> return new AccessDataTweenStyle(name, this, _tweens)
	public function attr(name : String) : AccessDataTweenAttribute<T, BoundTransition<T>> return new AccessDataTweenAttribute(name, this, _tweens)
	
	public function start(f : T -> Int -> Void)
	{
		return startNode(function(n,i) f(Access.getData(n), i));
	}
	
	public function end(f : T -> Int -> Void)
	{
		return endNode(function(n,i) f(Access.getData(n), i));
	}
	
	override function createTransition(selection : BaseSelection<Dynamic>)
	{
		return new BoundTransition(cast selection);
	}
}