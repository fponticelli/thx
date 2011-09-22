package thx.benchmark;

#if (flash || js)
import haxe.Timer;
#end

class SpeedTest
{
	public function new(repetitions = 10000, testDelay = 0, averages = 5)
	{
		this.testDelay = testDelay;
		this.averages = averages;
		this.repetitions = repetitions;
		this.tests = [];
		this.descriptions = [];
		this.reference = -1;
	}
	
	public function add(description : String, f : Int -> Void, isReference = false)
	{
		descriptions.push(description);
		var id = tests.length;
		tests.push( { id : id, f : f } );
		if (isReference)
			reference = id;
		return this;
	}
	
	
	public function execute(?handler : String -> Void)
	{
		this.handler = handler;
		if (null == this.handler)
			this.handler = function(s) trace("\n" + s);
		results = [];
		for (i in 0...tests.length)
			results[i] = 0;
		toPerform = averages;
		handleRound();
	}
	
	static inline var MAXDECIMALS = 4;
	
	var reference : Int;
	var testDelay : Int;
	var averages : Int;
	var repetitions : Int;
	var tests : Array <{ id : Int, f : Int -> Void }> ;
	var descriptions : Array<String>;
	var results : Array<Float>;
	var toPerform : Int;
	var handler : String -> Void;
	
	function test(f : Int -> Void)
	{
		var start = getTimer();
		f(repetitions);
		return getTimer() - start;
	}
	
	static inline function getTimer() : Float
	{
#if flash
		return flash.Lib.getTimer();
#elseif php
		return php.Sys.cpuTime() * 1000;
#elseif neko
		return neko.Sys.cpuTime() * 1000;
#elseif cpp
		return cpp.Sys.cpuTime() * 1000;
#else
		return Date.now().getTime();
#end
	}
	
	function takeRound()
	{
		var arr = tests.copy();
		while (arr.length > 0)
		{
			var t = arr.splice(Std.random(arr.length), 1)[0];
			results[t.id] += test(t.f);
		}
		handleRound();
	}
	
	function handleRound()
	{
		toPerform--;
		if (toPerform >= 0)
#if (flash || js)
			Timer.delay(takeRound, testDelay);
#else
			takeRound();
#end
		else
			handler(getOutput());
	}
	
	function getOutput()
	{
		var sl = 0;
		var slowest = -1.0;
		var bd = 0;
		var ad = 0;
		var r = [];
		for (i in 0...descriptions.length)
		{
			var d = descriptions[i];
			if (d.length > sl)
				sl = d.length;
			if (slowest < 0 || slowest < results[i])
				slowest = results[i];
			var n = ("" + (results[i] / averages)).split('.');
			if (bd < n[0].length)
				bd = n[0].length;
			if (n.length == 1)  {
				n[1] = "";
			} else if(n[1].length > MAXDECIMALS) {
				n[1] = n[1].substr(0, MAXDECIMALS);
			}
			if (n[1].length > ad)
				ad = n[1].length;
			r.push(n);
		}
		sl += 3;
		var s = new StringBuf();
		s.add("test repeated " + repetitions + " time(s), average on " + averages + " cycle(s)\n\n");
		
		if (reference >= 0)
			slowest = results[reference];
		
		for (i in 0...descriptions.length)
		{
			var d = descriptions[i];
			s.add(StringTools.rpad(d, ".", sl));
			s.add(": ");
			
			s.add(StringTools.lpad(r[i][0], " ", bd));
			s.add(".");
			s.add(StringTools.rpad(r[i][1], "0", ad));
			
			s.add(" ms. ");
			if (reference < 0)
			{
				var v = Math.round(100 * slowest / results[i]);
				s.add(v + " %");
			} else if (reference == i) {
				s.add("       reference");
			} else {
				var v = Math.round(100 * slowest / results[i]);
				if (v < 100)
					s.add("(" + StringTools.lpad("" + (100-v), " ", 3) + "%) slower");
				else if(v == 100)
					s.add("       same");
				else
					s.add(" " + StringTools.lpad("" + (v-100), " ", 3) + "%  faster");
			}
			s.add("\n");
		}
		return s.toString();
	}
}