package thx.js;
import js.Lib;
import thx.math.Ease;
import thx.math.EaseMode;
import thx.math.Equations;

/**
 * ...
 * @author Franco Ponticelli
 * @todo text()
 */

using Arrays;

class Transition<TData>
{
	static var _id = 0;
	static var _inheritid = 0;
	
	var _transitionId : Int;
	var _tweens : Hash<Node<TData> -> Int -> (Float -> Void)>;
	var _interpolators : Array<Hash<Float -> Void>>;
	var _remove : Bool;
	var _stage : Array<Int>;
	var _delay : Array<Float>;
	var _duration : Array<Float>;
	var _durationMax : Float;
	var _ease : Float -> Float;
	var _step : Float -> Bool; // fix for $closure issue
	
	var _start : Node<TData> -> Int -> Void;
	var _end : Node<TData> -> Int -> Void;
	
	var selection : Selection<TData>;
	
	public function new(selection : Selection<TData>)
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
			n.transition.owner = tid;
		});
		
		delay(0).duration(250);
	}
	
	function step(elapsed : Float)
	{
		var clear = true,
			k = -1,
			me = this;
		selection.eachNode(function(n : Node<TData>, i : Int) {
			if (2 == me._stage[++k])
				return;
			var t = (elapsed - me._delay[k]) / me._duration[k],
				tx = n.transition,
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
						n.resetTransition();
						if (me._remove)
							n.dom.parentNode.removeChild(n.dom);
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
	
	public function start(f : TData -> Int -> Void)
	{
		return startNode(function(n,i) f(n.data, i));
	}
	
	public function end(f : TData -> Int -> Void)
	{
		return endNode(function(n,i) f(n.data, i));
	}
	
	public function startNode(f : Node<TData> -> Int -> Void)
	{
		_start = f;
		return this;
	}
	
	public function endNode(f : Node<TData> -> Int -> Void)
	{
		_end = f;
		return this;
	}
	
	public function stop()
	{
		var k = -1,
			me = this;
		selection.eachNode(function(n, i) {
			me._stage[++k] = 2;
			n.resetTransition();
		});
	}
	
	public function delay(?f : Node<TData> -> Int -> Float, ?v : Float = 0.0)
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
		return this;
	}
	
	public function duration(?f : Node<TData> -> Int -> Float, ?v : Float = 0.0)
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
		return this;
	}
	
	public function style(name : String)
	{
		return new StyleTweenAccess(name, this, _tweens);
	}
	
	public function attr(name : String)
	{
		return new AttributeTweenAccess(name, this, _tweens);
	}
	
	public function ease(?f : Float -> Float, ?easemode : EaseMode)
	{
		_ease = Ease.mode(easemode, f);
		return this;
	}
	
	public function remove()
	{
		_remove = true;
		return this;
	}
	
	public function select(selector : String)
	{
		var k, t = new Transition(selection.select(selector));
		t._ease = this._ease;
		var delay = this._delay;
		var duration = this._duration;
		k = -1; t.delay(function(d, i) return delay[++k]);
		k = -1; t.delay(function(d, i) return duration[++k]);
		return t;
	}
	
	public function selectAll(selector : String)
	{
		var k, t = new Transition(selection.selectAll(selector));
		t._ease = this._ease;
		var delay = this._delay;
		var duration = this._duration;
		k = -1; t.delay(function(d, i) return delay[i > 0 ? k : ++k]);
		k = -1; t.delay(function(d, i) return duration[i > 0 ? k : ++k]);
		return t;
	}
}