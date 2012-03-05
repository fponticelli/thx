var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.add(this.matchedLeft());
			buf.add(f(this));
			s = this.matchedRight();
		}
		buf.b[buf.b.length] = s == null?"null":s;
		return buf.b.join("");
	}
	,__class__: EReg
}
var Strings = $hxClasses["Strings"] = function() { }
Strings.__name__ = ["Strings"];
Strings.format = function(pattern,values,nullstring,culture) {
	if(nullstring == null) nullstring = "null";
	if(null == values || 0 == values.length) return pattern;
	return (Strings.formatf(pattern,nullstring,culture))(values);
}
Strings.formatf = function(pattern,nullstring,culture) {
	if(nullstring == null) nullstring = "null";
	var buf = [];
	while(true) {
		if(!Strings._reFormat.match(pattern)) {
			buf.push((function() {
				return function(_) {
					return pattern;
				};
			})());
			break;
		}
		var pos = Std.parseInt(Strings._reFormat.matched(1));
		var format = Strings._reFormat.matched(2);
		if(format == "") format = null;
		var p = null;
		var params = [];
		var _g = 3;
		while(_g < 20) {
			var i = _g++;
			p = Strings._reFormat.matched(i);
			if(p == null || p == "") break;
			params.push(thx.culture.FormatParams.cleanQuotes(p));
		}
		var left = [Strings._reFormat.matchedLeft()];
		buf.push((function(left) {
			return function(_) {
				return left[0];
			};
		})(left));
		var df = [Dynamics.formatf(format,params,nullstring,culture)];
		buf.push(((function() {
			return function(f,a1) {
				return (function() {
					return function(a2) {
						return f(a1,a2);
					};
				})();
			};
		})())((function(df) {
			return function(i,v) {
				return df[0](v[i]);
			};
		})(df),pos));
		pattern = Strings._reFormat.matchedRight();
	}
	return function(values) {
		if(null == values) values = [];
		return buf.map(function(df,_) {
			return df(values);
		}).join("");
	};
}
Strings.formatOne = function(v,param,params,culture) {
	return (Strings.formatOnef(param,params,culture))(v);
}
Strings.formatOnef = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"S");
	var format = params.shift();
	switch(format) {
	case "S":
		return function(v) {
			return v;
		};
	case "T":
		var len = params.length < 1?20:Std.parseInt(params[0]);
		var ellipsis = params.length < 2?"...":params[1];
		return Strings.ellipsisf(len,ellipsis);
	case "PR":
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var pad = params.length < 2?" ":params[1];
		return function(v) {
			return StringTools.rpad(v,pad,len);
		};
	case "PL":
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var pad = params.length < 2?" ":params[1];
		return function(v) {
			return StringTools.lpad(v,pad,len);
		};
	default:
		return (function($this) {
			var $r;
			throw "Unsupported string format: " + format;
			return $r;
		}(this));
	}
}
Strings.upTo = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substr(0,pos);
}
Strings.startFrom = function(value,searchFor) {
	var pos = value.indexOf(searchFor);
	if(pos < 0) return value; else return value.substr(pos + searchFor.length);
}
Strings.rtrim = function(value,charlist) {
	var len = value.length;
	while(len > 0) {
		var c = value.substr(len - 1,1);
		if(charlist.indexOf(c) < 0) break;
		len--;
	}
	return value.substr(0,len);
}
Strings.ltrim = function(value,charlist) {
	var start = 0;
	while(start < value.length) {
		var c = value.substr(start,1);
		if(charlist.indexOf(c) < 0) break;
		start++;
	}
	return value.substr(start);
}
Strings.trim = function(value,charlist) {
	return Strings.rtrim(Strings.ltrim(value,charlist),charlist);
}
Strings.collapse = function(value) {
	return Strings._reCollapse.replace(StringTools.trim(value)," ");
}
Strings.ucfirst = function(value) {
	return value == null?null:value.charAt(0).toUpperCase() + value.substr(1);
}
Strings.lcfirst = function(value) {
	return value == null?null:value.charAt(0).toLowerCase() + value.substr(1);
}
Strings.empty = function(value) {
	return value == null || value == "";
}
Strings.isAlphaNum = function(value) {
	return value == null?false:Strings.__alphaNumPattern.match(value);
}
Strings.digitsOnly = function(value) {
	return value == null?false:Strings.__digitsPattern.match(value);
}
Strings.ucwords = function(value) {
	return Strings.__ucwordsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),Strings.__upperMatch);
}
Strings.ucwordsws = function(value) {
	return Strings.__ucwordswsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),Strings.__upperMatch);
}
Strings.__upperMatch = function(re) {
	return re.matched(0).toUpperCase();
}
Strings.humanize = function(s) {
	return StringTools.replace(Strings.underscore(s),"_"," ");
}
Strings.capitalize = function(s) {
	return s.substr(0,1).toUpperCase() + s.substr(1);
}
Strings.succ = function(s) {
	return s.substr(0,-1) + String.fromCharCode(s.substr(-1).charCodeAt(0) + 1);
}
Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
}
Strings.dasherize = function(s) {
	return StringTools.replace(s,"_","-");
}
Strings.repeat = function(s,times) {
	var b = [];
	var _g = 0;
	while(_g < times) {
		var i = _g++;
		b.push(s);
	}
	return b.join("");
}
Strings.wrapColumns = function(s,columns,indent,newline) {
	if(newline == null) newline = "\n";
	if(indent == null) indent = "";
	if(columns == null) columns = 78;
	var parts = Strings._reSplitWC.split(s);
	var result = [];
	var _g = 0;
	while(_g < parts.length) {
		var part = parts[_g];
		++_g;
		result.push(Strings._wrapColumns(StringTools.trim(Strings._reReduceWS.replace(part," ")),columns,indent,newline));
	}
	return result.join(newline);
}
Strings._wrapColumns = function(s,columns,indent,newline) {
	var parts = [];
	var pos = 0;
	var len = s.length;
	var ilen = indent.length;
	columns -= ilen;
	while(true) {
		if(pos + columns >= len - ilen) {
			parts.push(s.substr(pos));
			break;
		}
		var i = 0;
		while(!StringTools.isSpace(s,pos + columns - i) && i < columns) i++;
		if(i == columns) {
			i = 0;
			while(!StringTools.isSpace(s,pos + columns + i) && pos + columns + i < len) i++;
			parts.push(s.substr(pos,columns + i));
			pos += columns + i + 1;
		} else {
			parts.push(s.substr(pos,columns - i));
			pos += columns - i + 1;
		}
	}
	return indent + parts.join(newline + indent);
}
Strings.stripTags = function(s) {
	return Strings._reStripTags.replace(s,"");
}
Strings.interpolate = function(v,a,b,equation) {
	return (Strings.interpolatef(a,b,equation))(v);
}
Strings.interpolatef = function(a,b,equation) {
	var extract = function(value,s,f) {
		while(Strings._reInterpolateNumber.match(value)) {
			var left = Strings._reInterpolateNumber.matchedLeft();
			if(!Strings.empty(left)) {
				s.push(left);
				f.push(null);
			}
			s.push(null);
			f.push(Std.parseFloat(Strings._reInterpolateNumber.matched(0)));
			value = Strings._reInterpolateNumber.matchedRight();
		}
		if(!Strings.empty(value)) {
			s.push(value);
			f.push(null);
		}
	};
	var sa = [], fa = [], sb = [], fb = [];
	extract(a,sa,fa);
	extract(b,sb,fb);
	var functions = [], i = 0;
	var min = Ints.min(sa.length,sb.length);
	while(i < min) {
		if(sa[i] != sb[i]) break;
		if(null == sa[i]) {
			if(fa[i] == fb[i]) {
				var s = ["" + fa[i]];
				functions.push((function(s) {
					return function(_) {
						return s[0];
					};
				})(s));
			} else {
				var f = [Floats.interpolatef(fa[i],fb[i],equation)];
				functions.push((function(f) {
					return function(t) {
						return "" + f[0](t);
					};
				})(f));
			}
		} else {
			var s = [sa[i]];
			functions.push((function(s) {
				return function(_) {
					return s[0];
				};
			})(s));
		}
		i++;
	}
	var rest = "";
	while(i < sb.length) {
		if(null != sb[i]) rest += sb[i]; else rest += fb[i];
		i++;
	}
	if("" != rest) functions.push(function(_) {
		return rest;
	});
	return function(t) {
		return functions.map(function(f,_) {
			return f(t);
		}).join("");
	};
}
Strings.interpolateChars = function(v,a,b,equation) {
	return (Strings.interpolateCharsf(a,b,equation))(v);
}
Strings.interpolateCharsf = function(a,b,equation) {
	var aa = a.split(""), ab = b.split("");
	while(aa.length > ab.length) ab.insert(0," ");
	while(ab.length > aa.length) aa.insert(0," ");
	var ai = [];
	var _g1 = 0, _g = aa.length;
	while(_g1 < _g) {
		var i = _g1++;
		ai[i] = Strings.interpolateCharf(aa[i],ab[i]);
	}
	return function(v) {
		var r = [];
		var _g1 = 0, _g = ai.length;
		while(_g1 < _g) {
			var i = _g1++;
			r[i] = ai[i](v);
		}
		return StringTools.trim(r.join(""));
	};
}
Strings.interpolateChar = function(v,a,b,equation) {
	return (Strings.interpolateCharf(a,b,equation))(v);
}
Strings.interpolateCharf = function(a,b,equation) {
	if(new EReg("^\\d","").match(b) && a == " ") a = "0";
	var r = new EReg("^[^a-zA-Z0-9]","");
	if(r.match(b) && a == " ") a = r.matched(0);
	var ca = a.charCodeAt(0), cb = b.charCodeAt(0), i = Ints.interpolatef(ca,cb,equation);
	return function(v) {
		return String.fromCharCode(i(v));
	};
}
Strings.ellipsis = function(s,maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	if(s.length > maxlen) return s.substr(0,Ints.max(symbol.length,maxlen - symbol.length)) + symbol; else return s;
}
Strings.ellipsisf = function(maxlen,symbol) {
	if(symbol == null) symbol = "...";
	if(maxlen == null) maxlen = 20;
	return function(s) {
		if(s.length > maxlen) return s.substr(0,Ints.max(symbol.length,maxlen - symbol.length)) + symbol; else return s;
	};
}
Strings.compare = function(a,b) {
	return a < b?-1:a > b?1:0;
}
Strings.prototype = {
	__class__: Strings
}
var thx = thx || {}
if(!thx.collection) thx.collection = {}
thx.collection.Set = $hxClasses["thx.collection.Set"] = function() {
	this._v = [];
	this.length = 0;
};
thx.collection.Set.__name__ = ["thx","collection","Set"];
thx.collection.Set.ofArray = function(arr) {
	var set = new thx.collection.Set();
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		set.add(item);
	}
	return set;
}
thx.collection.Set.prototype = {
	length: null
	,_v: null
	,add: function(v) {
		this._v.remove(v);
		this._v.push(v);
		this.length = this._v.length;
	}
	,remove: function(v) {
		var t = this._v.remove(v);
		this.length = this._v.length;
		return t;
	}
	,exists: function(v) {
		var _g = 0, _g1 = this._v;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			if(t == v) return true;
		}
		return false;
	}
	,iterator: function() {
		return this._v.iterator();
	}
	,array: function() {
		return this._v.copy();
	}
	,toString: function() {
		return "{" + this._v.join(", ") + "}";
	}
	,__class__: thx.collection.Set
}
if(!thx.html) thx.html = {}
thx.html.Attribute = $hxClasses["thx.html.Attribute"] = function() { }
thx.html.Attribute.__name__ = ["thx","html","Attribute"];
thx.html.Attribute.isFill = function(el) {
	return thx.html.Attribute._fill.exists(el);
}
thx.html.Attribute.prototype = {
	__class__: thx.html.Attribute
}
var utest = utest || {}
if(!utest.ui) utest.ui = {}
if(!utest.ui.common) utest.ui.common = {}
utest.ui.common.ResultAggregator = $hxClasses["utest.ui.common.ResultAggregator"] = function(runner,flattenPackage) {
	if(flattenPackage == null) flattenPackage = false;
	if(runner == null) throw "runner argument is null";
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add(this.start.$bind(this));
	runner.onProgress.add(this.progress.$bind(this));
	runner.onComplete.add(this.complete.$bind(this));
	this.onStart = new utest.Notifier();
	this.onComplete = new utest.Dispatcher();
	this.onProgress = new utest.Dispatcher();
};
utest.ui.common.ResultAggregator.__name__ = ["utest","ui","common","ResultAggregator"];
utest.ui.common.ResultAggregator.prototype = {
	runner: null
	,flattenPackage: null
	,root: null
	,onStart: null
	,onComplete: null
	,onProgress: null
	,start: function(runner) {
		this.root = new utest.ui.common.PackageResult(null);
		this.onStart.dispatch();
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(ref == null) ref = this.root;
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,createFixture: function(result) {
		var f = new utest.ui.common.FixtureResult(result.method);
		var $it0 = result.assertations.iterator();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			f.add(assertation);
		}
		return f;
	}
	,progress: function(e) {
		this.root.addResult(e.result,this.flattenPackage);
		this.onProgress.dispatch(e);
	}
	,complete: function(runner) {
		this.onComplete.dispatch(this.root);
	}
	,__class__: utest.ui.common.ResultAggregator
}
if(!thx.color) thx.color = {}
thx.color.Rgb = $hxClasses["thx.color.Rgb"] = function(r,g,b) {
	this.red = Ints.clamp(r,0,255);
	this.green = Ints.clamp(g,0,255);
	this.blue = Ints.clamp(b,0,255);
};
thx.color.Rgb.__name__ = ["thx","color","Rgb"];
thx.color.Rgb.fromFloats = function(r,g,b) {
	return new thx.color.Rgb(Ints.interpolate(r,0,255,null),Ints.interpolate(g,0,255,null),Ints.interpolate(b,0,255,null));
}
thx.color.Rgb.fromInt = function(v) {
	return new thx.color.Rgb(v >> 16 & 255,v >> 8 & 255,v & 255);
}
thx.color.Rgb.equals = function(a,b) {
	return a.red == b.red && a.green == b.green && a.blue == b.blue;
}
thx.color.Rgb.darker = function(color,t,equation) {
	return new thx.color.Rgb(Ints.interpolate(t,color.red,0,equation),Ints.interpolate(t,color.green,0,equation),Ints.interpolate(t,color.blue,0,equation));
}
thx.color.Rgb.lighter = function(color,t,equation) {
	return new thx.color.Rgb(Ints.interpolate(t,color.red,255,equation),Ints.interpolate(t,color.green,255,equation),Ints.interpolate(t,color.blue,255,equation));
}
thx.color.Rgb.interpolate = function(a,b,t,equation) {
	return new thx.color.Rgb(Ints.interpolate(t,a.red,b.red,equation),Ints.interpolate(t,a.green,b.green,equation),Ints.interpolate(t,a.blue,b.blue,equation));
}
thx.color.Rgb.interpolatef = function(a,b,equation) {
	var r = Ints.interpolatef(a.red,b.red,equation), g = Ints.interpolatef(a.green,b.green,equation), b1 = Ints.interpolatef(a.blue,b.blue,equation);
	return function(t) {
		return new thx.color.Rgb(r(t),g(t),b1(t));
	};
}
thx.color.Rgb.contrast = function(c) {
	var nc = thx.color.Hsl.toHsl(c);
	if(nc.lightness < .5) return new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness + 0.5); else return new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness - 0.5);
}
thx.color.Rgb.contrastBW = function(c) {
	var g = thx.color.Grey.toGrey(c);
	var nc = thx.color.Hsl.toHsl(c);
	if(g.grey < .5) return new thx.color.Hsl(nc.hue,nc.saturation,1.0); else return new thx.color.Hsl(nc.hue,nc.saturation,0);
}
thx.color.Rgb.interpolateBrightness = function(t,equation) {
	return (thx.color.Rgb.interpolateBrightnessf(equation))(t);
}
thx.color.Rgb.interpolateBrightnessf = function(equation) {
	var i = Ints.interpolatef(0,255,equation);
	return function(t) {
		var g = i(t);
		return new thx.color.Rgb(g,g,g);
	};
}
thx.color.Rgb.interpolateHeat = function(t,middle,equation) {
	return (thx.color.Rgb.interpolateHeatf(middle,equation))(t);
}
thx.color.Rgb.interpolateHeatf = function(middle,equation) {
	return thx.color.Rgb.interpolateStepsf([new thx.color.Rgb(0,0,0),null != middle?middle:new thx.color.Rgb(255,127,0),new thx.color.Rgb(255,255,255)],equation);
}
thx.color.Rgb.interpolateRainbow = function(t,equation) {
	return (thx.color.Rgb.interpolateRainbowf(equation))(t);
}
thx.color.Rgb.interpolateRainbowf = function(equation) {
	return thx.color.Rgb.interpolateStepsf([new thx.color.Rgb(0,0,255),new thx.color.Rgb(0,255,255),new thx.color.Rgb(0,255,0),new thx.color.Rgb(255,255,0),new thx.color.Rgb(255,0,0)],equation);
}
thx.color.Rgb.interpolateStepsf = function(steps,equation) {
	if(steps.length <= 0) return (function($this) {
		var $r;
		throw new thx.error.Error("invalid number of steps",null,null,{ fileName : "Rgb.hx", lineNumber : 164, className : "thx.color.Rgb", methodName : "interpolateStepsf"});
		return $r;
	}(this)); else if(steps.length == 1) return function(t) {
		return steps[0];
	}; else if(steps.length == 2) return thx.color.Rgb.interpolatef(steps[0],steps[1],equation);
	var len = steps.length - 1, step = 1 / len, f = [];
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		f[i] = thx.color.Rgb.interpolatef(steps[i],steps[i + 1]);
	}
	return function(t) {
		if(t < 0) t = 0; else if(t > 1) t = 1;
		var pos = t == 1?len - 1:Math.floor(t / step);
		return f[pos](len * (t - pos * step));
	};
}
thx.color.Rgb.prototype = {
	blue: null
	,green: null
	,red: null
	,'int': function() {
		return (this.red & 255) << 16 | (this.green & 255) << 8 | this.blue & 255;
	}
	,hex: function(prefix) {
		if(prefix == null) prefix = "";
		return prefix + StringTools.hex(this.red,2) + StringTools.hex(this.green,2) + StringTools.hex(this.blue,2);
	}
	,toCss: function() {
		return this.hex("#");
	}
	,toRgbString: function() {
		return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
	}
	,toString: function() {
		return this.toRgbString();
	}
	,__class__: thx.color.Rgb
}
thx.color.Cmyk = $hxClasses["thx.color.Cmyk"] = function(cyan,magenta,yellow,black) {
	thx.color.Rgb.call(this,Ints.interpolate(Floats.normalize(1 - cyan - black),0,255,null),Ints.interpolate(Floats.normalize(1 - magenta - black),0,255,null),Ints.interpolate(Floats.normalize(1 - yellow - black),0,255,null));
	this.cyan = Floats.normalize(cyan);
	this.magenta = Floats.normalize(magenta);
	this.yellow = Floats.normalize(yellow);
	this.black = Floats.normalize(black);
};
thx.color.Cmyk.__name__ = ["thx","color","Cmyk"];
thx.color.Cmyk.toCmyk = function(rgb) {
	var c = 0.0, y = 0.0, m = 0.0, k;
	if(rgb.red + rgb.blue + rgb.green == 0) k = 1.0; else {
		c = 1 - rgb.red / 255;
		m = 1 - rgb.green / 255;
		y = 1 - rgb.blue / 255;
		k = Floats.min(c < m?c:m,y);
		c = (c - k) / (1 - k);
		m = (m - k) / (1 - k);
		y = (y - k) / (1 - k);
	}
	return new thx.color.Cmyk(c,m,y,k);
}
thx.color.Cmyk.equals = function(a,b) {
	return a.black == b.black && a.cyan == b.cyan && a.magenta == b.magenta && a.yellow == b.yellow;
}
thx.color.Cmyk.darker = function(color,t,equation) {
	return new thx.color.Cmyk(color.cyan,color.magenta,color.yellow,Floats.interpolate(t,color.black,0,equation));
}
thx.color.Cmyk.lighter = function(color,t,equation) {
	return new thx.color.Cmyk(color.cyan,color.magenta,color.yellow,Floats.interpolate(t,color.black,1,equation));
}
thx.color.Cmyk.interpolate = function(a,b,t,equation) {
	return new thx.color.Cmyk(Floats.interpolate(t,a.cyan,b.cyan,equation),Floats.interpolate(t,a.magenta,b.magenta,equation),Floats.interpolate(t,a.yellow,b.yellow,equation),Floats.interpolate(t,a.black,b.black,equation));
}
thx.color.Cmyk.__super__ = thx.color.Rgb;
thx.color.Cmyk.prototype = $extend(thx.color.Rgb.prototype,{
	black: null
	,cyan: null
	,magenta: null
	,yellow: null
	,toCmykString: function() {
		return "cmyk(" + this.cyan + "," + this.magenta + "," + this.yellow + "," + this.black + ")";
	}
	,__class__: thx.color.Cmyk
});
var Dynamics = $hxClasses["Dynamics"] = function() { }
Dynamics.__name__ = ["Dynamics"];
Dynamics.format = function(v,param,params,nullstring,culture) {
	return (Dynamics.formatf(param,params,nullstring,culture))(v);
}
Dynamics.formatf = function(param,params,nullstring,culture) {
	if(nullstring == null) nullstring = "null";
	return function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			return nullstring;
		case 1:
			return Ints.format(v,param,params,culture);
		case 2:
			return Floats.format(v,param,params,culture);
		case 3:
			return Bools.format(v,param,params,culture);
		case 6:
			var c = $e[2];
			if(c == String) return Strings.formatOne(v,param,params,culture); else if(c == Array) return Arrays.format(v,param,params,culture); else if(c == Date) return Dates.format(v,param,params,culture); else return Objects.format(v,param,params,culture);
			break;
		case 4:
			return Objects.format(v,param,params,culture);
		case 5:
			return "function()";
		default:
			return (function($this) {
				var $r;
				throw new thx.error.Error("Unsupported type format: {0}",null,Type["typeof"](v),{ fileName : "Dynamics.hx", lineNumber : 44, className : "Dynamics", methodName : "formatf"});
				return $r;
			}(this));
		}
	};
}
Dynamics.interpolate = function(v,a,b,equation) {
	return (Dynamics.interpolatef(a,b,equation))(v);
}
Dynamics.interpolatef = function(a,b,equation) {
	var ta = Type["typeof"](a);
	var tb = Type["typeof"](b);
	if(!((Std["is"](a,Float) || Std["is"](a,Int)) && (Std["is"](b,Float) || Std["is"](b,Int))) && !Type.enumEq(ta,tb)) throw new thx.error.Error("arguments a ({0}) and b ({0}) have different types",[a,b],null,{ fileName : "Dynamics.hx", lineNumber : 59, className : "Dynamics", methodName : "interpolatef"});
	var $e = (ta);
	switch( $e[1] ) {
	case 0:
		return function(_) {
			return null;
		};
	case 1:
		if(Std["is"](b,Int)) return Ints.interpolatef(a,b,equation); else return Floats.interpolatef(a,b,equation);
		break;
	case 2:
		return Floats.interpolatef(a,b,equation);
	case 3:
		return Bools.interpolatef(a,b,equation);
	case 4:
		return Objects.interpolatef(a,b,equation);
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "String":
			return Strings.interpolatef(a,b,equation);
		case "Date":
			return Dates.interpolatef(a,b,equation);
		default:
			throw new thx.error.Error("cannot interpolate on instances of {0}",null,name,{ fileName : "Dynamics.hx", lineNumber : 77, className : "Dynamics", methodName : "interpolatef"});
		}
		break;
	default:
		throw new thx.error.Error("cannot interpolate on functions/enums/unknown",null,null,{ fileName : "Dynamics.hx", lineNumber : 79, className : "Dynamics", methodName : "interpolatef"});
	}
}
Dynamics.string = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		return "null";
	case 1:
		return Ints.format(v);
	case 2:
		return Floats.format(v);
	case 3:
		return Bools.format(v);
	case 4:
		var keys = Reflect.fields(v);
		var result = [];
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			result.push(key + " : " + Dynamics.string(Reflect.field(v,key)));
		}
		return "{" + result.join(", ") + "}";
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "Array":
			return Arrays.string(v);
		case "String":
			var s = v;
			if(s.indexOf("\"") < 0) return "\"" + s + "\""; else if(s.indexOf("'") < 0) return "'" + s + "'"; else return "\"" + StringTools.replace(s,"\"","\\\"") + "\"";
			break;
		case "Date":
			return Dates.format(v);
		default:
			return Std.string(v);
		}
		break;
	case 7:
		var e = $e[2];
		return Enums.string(v);
	case 8:
		return "<unknown>";
	case 5:
		return "<function>";
	}
}
Dynamics.compare = function(a,b) {
	if(!Types.sameType(a,b)) throw new thx.error.Error("cannot compare 2 different types",null,null,{ fileName : "Dynamics.hx", lineNumber : 131, className : "Dynamics", methodName : "compare"});
	if(null == a && null == b) return 0;
	if(null == a) return -1;
	if(null == b) return 1;
	var $e = (Type["typeof"](a));
	switch( $e[1] ) {
	case 1:
		return a - b;
	case 2:
		return a < b?-1:a > b?1:0;
	case 3:
		return a == b?0:a?-1:1;
	case 4:
		return Objects.compare(a,b);
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "Array":
			return Arrays.compare(a,b);
		case "String":
			return Strings.compare(a,b);
		case "Date":
			return Floats.compare(a.getTime(),b.getTime());
		default:
			return Strings.compare(Std.string(a),Std.string(b));
		}
		break;
	case 7:
		var e = $e[2];
		return Enums.compare(a,b);
	default:
		return 0;
	}
}
Dynamics.comparef = function(sample) {
	var $e = (Type["typeof"](sample));
	switch( $e[1] ) {
	case 1:
		return Ints.compare;
	case 2:
		return Floats.compare;
	case 3:
		return Bools.compare;
	case 4:
		return Objects.compare;
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "Array":
			return Arrays.compare;
		case "String":
			return Strings.compare;
		case "Date":
			return Dates.compare;
		default:
			return function(a,b) {
				return Strings.compare(Std.string(a),Std.string(b));
			};
		}
		break;
	case 7:
		var e = $e[2];
		return Enums.compare;
	default:
		return Dynamics.compare;
	}
}
Dynamics.clone = function(v,cloneInstances) {
	if(cloneInstances == null) cloneInstances = false;
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		return null;
	case 1:
	case 2:
	case 3:
	case 7:
	case 8:
	case 5:
		return v;
	case 4:
		var o = { };
		Objects.copyTo(v,o);
		return o;
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "Array":
			var src = v, a = [];
			var _g = 0;
			while(_g < src.length) {
				var i = src[_g];
				++_g;
				a.push(Dynamics.clone(i));
			}
			return a;
		case "String":case "Date":
			return v;
		default:
			if(cloneInstances) {
				var o = Type.createEmptyInstance(c);
				var _g = 0, _g1 = Reflect.fields(v);
				while(_g < _g1.length) {
					var field = _g1[_g];
					++_g;
					o[field] = Dynamics.clone(Reflect.field(v,field));
				}
				return o;
			} else return v;
		}
		break;
	}
}
Dynamics.same = function(a,b) {
	var ta = Types.typeName(a), tb = Types.typeName(b);
	if(ta != tb) return false;
	var $e = (Type["typeof"](a));
	switch( $e[1] ) {
	case 2:
		return Floats.equals(a,b);
	case 0:
	case 1:
	case 3:
		return a == b;
	case 5:
		return Reflect.compareMethods(a,b);
	case 6:
		var c = $e[2];
		var ca = Type.getClassName(c), cb = Type.getClassName(Type.getClass(b));
		if(ca != cb) return false;
		if(Std["is"](a,String) && a != b) return false;
		if(Std["is"](a,Array)) {
			var aa = a, ab = b;
			if(aa.length != ab.length) return false;
			var _g1 = 0, _g = aa.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Dynamics.same(aa[i],ab[i])) return false;
			}
			return true;
		}
		if(Std["is"](a,Date)) return a.getTime() == b.getTime();
		if(Std["is"](a,Hash) || Std["is"](a,IntHash)) {
			var ha = a, hb = b;
			var ka = Iterators.array(ha.keys()), kb = Iterators.array(hb.keys());
			if(ka.length != kb.length) return false;
			var _g = 0;
			while(_g < ka.length) {
				var key = ka[_g];
				++_g;
				if(!hb.exists(key) || !Dynamics.same(ha.get(key),hb.get(key))) return false;
			}
			return true;
		}
		var t = false;
		if((t = Iterators.isIterator(a)) || Iterables.isIterable(a)) {
			var va = t?Iterators.array(a):Iterators.array(a.iterator()), vb = t?Iterators.array(b):Iterators.array(b.iterator());
			if(va.length != vb.length) return false;
			var _g1 = 0, _g = va.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Dynamics.same(va[i],vb[i])) return false;
			}
			return true;
		}
		var fields = Type.getInstanceFields(Type.getClass(a));
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			var va = Reflect.field(a,field);
			if(Reflect.isFunction(va)) continue;
			var vb = Reflect.field(b,field);
			if(!Dynamics.same(va,vb)) return false;
		}
		return true;
	case 7:
		var e = $e[2];
		var ea = Type.getEnumName(e), eb = Type.getEnumName(Type.getEnum(b));
		if(ea != eb) return false;
		if(a[1] != b[1]) return false;
		var pa = a.slice(2), pb = b.slice(2);
		var _g1 = 0, _g = pa.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Dynamics.same(pa[i],pb[i])) return false;
		}
		return true;
	case 4:
		var fa = Reflect.fields(a), fb = Reflect.fields(b);
		var _g = 0;
		while(_g < fa.length) {
			var field = fa[_g];
			++_g;
			fb.remove(field);
			if(!Reflect.hasField(b,field)) return false;
			var va = Reflect.field(a,field);
			if(Reflect.isFunction(va)) continue;
			var vb = Reflect.field(b,field);
			if(!Dynamics.same(va,vb)) return false;
		}
		if(fb.length > 0) return false;
		var t = false;
		if((t = Iterators.isIterator(a)) || Iterables.isIterable(a)) {
			if(t && !Iterators.isIterator(b)) return false;
			if(!t && !Iterables.isIterable(b)) return false;
			var aa = t?Iterators.array(a):Iterators.array(a.iterator());
			var ab = t?Iterators.array(b):Iterators.array(b.iterator());
			if(aa.length != ab.length) return false;
			var _g1 = 0, _g = aa.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Dynamics.same(aa[i],ab[i])) return false;
			}
			return true;
		}
		return true;
	case 8:
		return (function($this) {
			var $r;
			throw "Unable to compare two unknown types";
			return $r;
		}(this));
	}
	return (function($this) {
		var $r;
		throw new thx.error.Error("Unable to compare values: {0} and {1}",[a,b],null,{ fileName : "Dynamics.hx", lineNumber : 371, className : "Dynamics", methodName : "same"});
		return $r;
	}(this));
}
Dynamics.number = function(v) {
	return Number(v);
}
Dynamics.prototype = {
	__class__: Dynamics
}
if(!thx.svg) thx.svg = {}
thx.svg.TestAll = $hxClasses["thx.svg.TestAll"] = function() {
};
thx.svg.TestAll.__name__ = ["thx","svg","TestAll"];
thx.svg.TestAll.addTests = function(runner) {
	runner.addCase(new thx.svg.TestArc());
	runner.addCase(new thx.svg.TestArea());
	runner.addCase(new thx.svg.TestChord());
	runner.addCase(new thx.svg.TestLine());
}
thx.svg.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.svg.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.svg.TestAll.prototype = {
	assertSamePath: function(expected,value,pos) {
		var e = this.splitValues(expected);
		var v = this.splitValues(value);
		if(e.length != v.length) utest.Assert.fail("paths do not match:" + expected + " VS " + value,pos); else {
			var _g1 = 0, _g = e.length;
			while(_g1 < _g) {
				var i = _g1++;
				var a = e[i];
				var b = v[i];
				if(a.isFloat != b.isFloat) utest.Assert.fail("paths do not match:" + expected + " VS " + value,pos); else if(a.isFloat) utest.Assert.floatEquals(a.value,b.value,null,null,pos); else utest.Assert.equals(a.value,b.value,null,pos);
			}
		}
	}
	,splitValues: function(s) {
		var result = [];
		while(s.length > 0) {
			if(!thx.svg.TestAll._renumber.match(s)) {
				result.push({ value : s, isFloat : false});
				break;
			}
			var before = thx.svg.TestAll._renumber.matchedLeft();
			if(null != before && "" != before) result.push({ value : before, isFloat : false});
			s = thx.svg.TestAll._renumber.matchedRight();
			result.push({ value : Std.parseFloat(thx.svg.TestAll._renumber.matched(1)), isFloat : true});
		}
		return result;
	}
	,__class__: thx.svg.TestAll
}
thx.svg.TestArc = $hxClasses["thx.svg.TestArc"] = function() {
	thx.svg.TestAll.call(this);
};
thx.svg.TestArc.__name__ = ["thx","svg","TestArc"];
thx.svg.TestArc.__super__ = thx.svg.TestAll;
thx.svg.TestArc.prototype = $extend(thx.svg.TestAll.prototype,{
	testDefault: function() {
		var arc = new thx.svg.Arc().innerRadius(0).outerRadius(1).startAngle(0).endAngle(Math.PI);
		var shape = arc.shape();
		var expected = "M6.123031769111886e-17,-1A1,1 0 1,1 6.123031769111886e-17,1L0,0Z";
		this.assertSamePath(expected,shape,{ fileName : "TestArc.hx", lineNumber : 19, className : "thx.svg.TestArc", methodName : "testDefault"});
	}
	,__class__: thx.svg.TestArc
});
if(!thx.validation) thx.validation = {}
thx.validation.TestAll = $hxClasses["thx.validation.TestAll"] = function() { }
thx.validation.TestAll.__name__ = ["thx","validation","TestAll"];
thx.validation.TestAll.addTests = function(runner) {
	runner.addCase(new thx.validation.TestCustomValidator());
	runner.addCase(new thx.validation.TestDateRange());
	runner.addCase(new thx.validation.TestEmail());
	runner.addCase(new thx.validation.TestIncrement());
	runner.addCase(new thx.validation.TestOptionValidator());
	runner.addCase(new thx.validation.TestPatternValidator());
	runner.addCase(new thx.validation.TestRange());
	runner.addCase(new thx.validation.TestSingleLine());
	runner.addCase(new thx.validation.TestStringLength());
	runner.addCase(new thx.validation.TestUrl());
}
thx.validation.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.validation.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.validation.TestAll.prototype = {
	assertValidation: function(result,ok,message,pos) {
		if(null == message) message = "expected '" + (ok?"Ok":"Error") + "' but was '" + thx.util.Results.toString(result) + "'";
		var $e = (result);
		switch( $e[1] ) {
		case 0:
			utest.Assert.isTrue(ok,message,pos);
			break;
		case 1:
			var e = $e[2];
			utest.Assert.isFalse(ok,message,pos);
			break;
		}
	}
	,__class__: thx.validation.TestAll
}
thx.validation.TestSingleLine = $hxClasses["thx.validation.TestSingleLine"] = function() {
};
thx.validation.TestSingleLine.__name__ = ["thx","validation","TestSingleLine"];
thx.validation.TestSingleLine.__super__ = thx.validation.TestAll;
thx.validation.TestSingleLine.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.SingleLineValidator();
		this.assertValidation(validator.validate("a b"),true,null,{ fileName : "TestSingleLine.hx", lineNumber : 15, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
		this.assertValidation(validator.validate("a\nb"),false,null,{ fileName : "TestSingleLine.hx", lineNumber : 16, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestSingleLine
});
thx.color.TestColors = $hxClasses["thx.color.TestColors"] = function() {
};
thx.color.TestColors.__name__ = ["thx","color","TestColors"];
thx.color.TestColors.prototype = {
	testParse: function() {
		var ab = thx.color.NamedColors.aliceblue;
		utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("aliceblue")),null,{ fileName : "TestColors.hx", lineNumber : 17, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("alice blue")),null,{ fileName : "TestColors.hx", lineNumber : 18, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("#F0F8FF")),null,{ fileName : "TestColors.hx", lineNumber : 19, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("rgb(240,248,255)")),null,{ fileName : "TestColors.hx", lineNumber : 20, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#ABC")),null,{ fileName : "TestColors.hx", lineNumber : 21, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#abc")),null,{ fileName : "TestColors.hx", lineNumber : 22, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,50%,75%)")),null,{ fileName : "TestColors.hx", lineNumber : 23, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,0.5,0.75)")),null,{ fileName : "TestColors.hx", lineNumber : 24, className : "thx.color.TestColors", methodName : "testParse"});
		utest.Assert.isNull(thx.color.Colors.parse("!alice blue"),null,{ fileName : "TestColors.hx", lineNumber : 26, className : "thx.color.TestColors", methodName : "testParse"});
	}
	,__class__: thx.color.TestColors
}
thx.html.HtmlHandler = $hxClasses["thx.html.HtmlHandler"] = function() { }
thx.html.HtmlHandler.__name__ = ["thx","html","HtmlHandler"];
thx.html.HtmlHandler.prototype = {
	start: null
	,end: null
	,chars: null
	,comment: null
	,doctype: null
	,declaration: null
	,__class__: thx.html.HtmlHandler
}
thx.html.DomHandler = $hxClasses["thx.html.DomHandler"] = function() {
	this.document = Xml.createDocument();
	this.current = this.document;
};
thx.html.DomHandler.__name__ = ["thx","html","DomHandler"];
thx.html.DomHandler.__interfaces__ = [thx.html.HtmlHandler];
thx.html.DomHandler.prototype = {
	document: null
	,current: null
	,start: function(tag,attrs,unary) {
		var node = Xml.createElement(tag);
		var _g = 0;
		while(_g < attrs.length) {
			var attr = attrs[_g];
			++_g;
			node.set(attr.name,attr.value);
		}
		this.current.addChild(node);
		if(!unary) this.current = node;
	}
	,end: function(tag) {
		this.current = this.current.getParent();
	}
	,chars: function(text) {
		this.current.addChild(Xml.createPCData(text));
	}
	,comment: function(text) {
		this.current.addChild(Xml.createComment(text));
	}
	,doctype: function(text) {
		this.current.addChild(Xml.createDocType(text));
	}
	,declaration: function(text) {
		this.current.addChild(Xml.createProlog(text));
	}
	,__class__: thx.html.DomHandler
}
if(!thx.math) thx.math = {}
if(!thx.math.scale) thx.math.scale = {}
thx.math.scale.TestAll = $hxClasses["thx.math.scale.TestAll"] = function() {
};
thx.math.scale.TestAll.__name__ = ["thx","math","scale","TestAll"];
thx.math.scale.TestAll.addTests = function(runner) {
	runner.addCase(new thx.math.scale.TestLinear());
	runner.addCase(new thx.math.scale.TestLinearT());
	runner.addCase(new thx.math.scale.TestLog());
	runner.addCase(new thx.math.scale.TestOrdinal());
	runner.addCase(new thx.math.scale.TestPow());
	runner.addCase(new thx.math.scale.TestQuantile());
	runner.addCase(new thx.math.scale.TestQuantize());
}
thx.math.scale.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.math.scale.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.math.scale.TestAll.prototype = {
	assertScale: function(scalef,expected,values,pos) {
		var _g1 = 0, _g = expected.length;
		while(_g1 < _g) {
			var i = _g1++;
			utest.Assert.floatEquals(expected[i],scalef(values[i],i),1e-3,null,pos);
		}
	}
	,__class__: thx.math.scale.TestAll
}
thx.math.scale.TestLinear = $hxClasses["thx.math.scale.TestLinear"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestLinear.__name__ = ["thx","math","scale","TestLinear"];
thx.math.scale.TestLinear.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestLinear.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testDomain: function() {
		var scale = new thx.math.scale.Linear();
		var expected = [-0.5,0.0,0.5,1.0,1.5];
		var values = [-0.5,0.0,0.5,1.0,1.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLinear.hx", lineNumber : 20, className : "thx.math.scale.TestLinear", methodName : "testDomain"});
	}
	,testDomain12: function() {
		var scale = new thx.math.scale.Linear().domain([1.0,2.0]);
		var expected = [-0.5,0.0,0.5,1.0,1.5];
		var values = [0.5,1.0,1.5,2.0,2.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLinear.hx", lineNumber : 29, className : "thx.math.scale.TestLinear", methodName : "testDomain12"});
	}
	,testPolylinear: function() {
		var scale = new thx.math.scale.Linear().domain([-1.0,0.0,1.0]).range([-100.0,0.0,10.0]), expected = [-150.0,-100.0,-50.0,0.0,5.0,10.0,15.0], values = [-1.5,-1.0,-0.5,0.0,0.5,1.0,1.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLinear.hx", lineNumber : 38, className : "thx.math.scale.TestLinear", methodName : "testPolylinear"});
		scale = new thx.math.scale.Linear().domain([0.0,0.5,1.0]).range([0.0,0.25,1.0]);
		expected = [0.0,0.125,0.25,0.625,1.0];
		values = [0.0,0.25,0.5,0.75,1.0];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLinear.hx", lineNumber : 44, className : "thx.math.scale.TestLinear", methodName : "testPolylinear"});
	}
	,testTicks: function() {
		var scale = new thx.math.scale.Linear();
		utest.Assert.equals("0, 1",scale.modulo(1).ticks().map(function(d,_) {
			return scale.tickFormat(d);
		}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 51, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
		utest.Assert.equals("0.0, 0.5, 1.0",scale.modulo(2).ticks().map(function(d,_) {
			return scale.tickFormat(d);
		}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 52, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
		utest.Assert.equals("0.0, 0.2, 0.4, 0.6, 0.8, 1.0",scale.modulo(5).ticks().map(function(d,_) {
			return scale.tickFormat(d);
		}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 53, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
		utest.Assert.equals("0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0",scale.modulo(10).ticks().map(function(d,_) {
			return scale.tickFormat(d);
		}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 54, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	}
	,__class__: thx.math.scale.TestLinear
});
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
if(!utest._Dispatcher) utest._Dispatcher = {}
utest._Dispatcher.EventException = $hxClasses["utest._Dispatcher.EventException"] = { __ename__ : ["utest","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] }
utest._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
utest._Dispatcher.EventException.StopPropagation.toString = $estr;
utest._Dispatcher.EventException.StopPropagation.__enum__ = utest._Dispatcher.EventException;
utest.Dispatcher = $hxClasses["utest.Dispatcher"] = function() {
	this.handlers = new Array();
};
utest.Dispatcher.__name__ = ["utest","Dispatcher"];
utest.Dispatcher.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Dispatcher.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,clear: function() {
		this.handlers = new Array();
	}
	,dispatch: function(e) {
		try {
			var list = this.handlers.copy();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l(e);
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest.Dispatcher
}
utest.Notifier = $hxClasses["utest.Notifier"] = function() {
	this.handlers = new Array();
};
utest.Notifier.__name__ = ["utest","Notifier"];
utest.Notifier.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Notifier.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
		return null;
	}
	,clear: function() {
		this.handlers = new Array();
	}
	,dispatch: function() {
		try {
			var list = this.handlers.copy();
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l();
			}
			return true;
		} catch( exc ) {
			if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
				return false;
			} else throw(exc);
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest.Notifier
}
thx.svg.Diagonal = $hxClasses["thx.svg.Diagonal"] = function() {
	this._projection = thx.svg.Diagonal.diagonalProjection;
};
thx.svg.Diagonal.__name__ = ["thx","svg","Diagonal"];
thx.svg.Diagonal.diagonalProjection = function(d,_) {
	return d;
}
thx.svg.Diagonal.forObject = function() {
	return new thx.svg.Diagonal().sourcef(function(d,_i) {
		return [d.x0,d.y0];
	}).targetf(function(d,_i) {
		return [d.x1,d.y1];
	});
}
thx.svg.Diagonal.forArray = function() {
	return new thx.svg.Diagonal().sourcef(function(d,_i) {
		return [d[0],d[1]];
	}).targetf(function(d,_i) {
		return [d[2],d[3]];
	});
}
thx.svg.Diagonal.prototype = {
	_source: null
	,_target: null
	,_projection: null
	,diagonal: function(d,i) {
		var p0 = this._source(d,i), p3 = this._target(d,i), m = (p0[1] + p3[1]) / 2, p = [p0,[p0[0],m],[p3[0],m],p3];
		var p2 = p.map(this._projection);
		return "M" + p2[0][0] + "," + p2[0][1] + "C" + p2[1][0] + "," + p2[1][1] + " " + p2[2][0] + "," + p2[2][1] + " " + p2[3][0] + "," + p2[3][1];
	}
	,getSource: function() {
		return this._source;
	}
	,sourcef: function(x) {
		this._source = x;
		return this;
	}
	,getTarget: function() {
		return this._target;
	}
	,targetf: function(x) {
		this._target = x;
		return this;
	}
	,getProjection: function() {
		return this._projection;
	}
	,projection: function(x) {
		this._projection = x;
		return this;
	}
	,__class__: thx.svg.Diagonal
}
var Bools = $hxClasses["Bools"] = function() { }
Bools.__name__ = ["Bools"];
Bools.format = function(v,param,params,culture) {
	return (Bools.formatf(param,params,culture))(v);
}
Bools.formatf = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"B");
	var format = params.shift();
	switch(format) {
	case "B":
		return function(v) {
			return v?"true":"false";
		};
	case "N":
		return function(v) {
			return v?"1":"0";
		};
	case "R":
		if(params.length != 2) throw "bool format R requires 2 parameters";
		return function(v) {
			return v?params[0]:params[1];
		};
	default:
		throw "Unsupported bool format: " + format;
	}
}
Bools.interpolate = function(v,a,b,equation) {
	return (Bools.interpolatef(a,b,equation))(v);
}
Bools.interpolatef = function(a,b,equation) {
	if(a == b) return function(_) {
		return a;
	}; else {
		var f = Floats.interpolatef(0,1,equation);
		return function(v) {
			return f(v) < 0.5?a:b;
		};
	}
}
Bools.canParse = function(s) {
	s = s.toLowerCase();
	return s == "true" || s == "false";
}
Bools.parse = function(s) {
	return s.toLowerCase() == "true";
}
Bools.compare = function(a,b) {
	return a == b?0:a?-1:1;
}
Bools.prototype = {
	__class__: Bools
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
if(!thx.text) thx.text = {}
thx.text.Inflections = $hxClasses["thx.text.Inflections"] = function() { }
thx.text.Inflections.__name__ = ["thx","text","Inflections"];
thx.text.Inflections.pluralize = function(singular) {
	return thx.text.Inflections.process(singular,thx.text.Inflections.plural_rules);
}
thx.text.Inflections.singularize = function(plural) {
	return thx.text.Inflections.process(plural,thx.text.Inflections.singular_rules);
}
thx.text.Inflections.process = function(word,rules) {
	if(Lambda.has(thx.text.Inflections.uncountable_words,word)) return word;
	var _g = 0;
	while(_g < rules.length) {
		var rule = rules[_g];
		++_g;
		if(rule.pattern.match(word)) return rule.pattern.replace(word,rule.replace);
	}
	return word;
}
thx.text.Inflections.prototype = {
	__class__: thx.text.Inflections
}
thx.html.Html = $hxClasses["thx.html.Html"] = function() { }
thx.html.Html.__name__ = ["thx","html","Html"];
thx.html.Html.getFormatter = function(version) {
	var format;
	switch( (version)[1] ) {
	case 0:
	case 1:
	case 2:
		var f = new thx.html.HtmlFormat();
		f.quotesRemoval = false;
		f.useCloseSelf = false;
		f.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsCommentedText;
		format = f;
		break;
	case 3:
		var f = new thx.html.HtmlFormat();
		f.quotesRemoval = true;
		f.useCloseSelf = true;
		f.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsPlainText;
		format = f;
		break;
	case 4:
	case 6:
	case 5:
	case 7:
		format = new thx.html.XHtmlFormat();
		break;
	}
	format.autoformat = true;
	format.normalizeNewlines = true;
	return format;
}
thx.html.Html.getHtml = function(dom) {
	if(dom.nodeType != Xml.Document) throw new thx.error.Error("invalid node type '{0}', should be Xml.Document",null,dom.nodeType,{ fileName : "Html.hx", lineNumber : 41, className : "thx.html.Html", methodName : "getHtml"});
	return dom.firstElement();
}
thx.html.Html.getHead = function(dom) {
	return thx.html.Html.getHtml(dom).firstElement();
}
thx.html.Html.getTitle = function(dom) {
	return thx.html.Html.getHead(dom).elementsNamed("title").next();
}
thx.html.Html.getBody = function(dom) {
	return thx.html.Html.getHtml(dom).elementsNamed("body").next();
}
thx.html.Html.createDocument = function(version) {
	var parser = thx.html.Html.getParser(version);
	return parser(thx.html.Html.getTemplate(version));
}
thx.html.Html.getParser = function(version) {
	switch( (version)[1] ) {
	case 0:
	case 1:
	case 2:
	case 3:
		return thx.html.Html.toXml;
	case 4:
	case 6:
	case 5:
	case 7:
		return Xml.parse;
	}
}
thx.html.Html.getTemplate = function(version) {
	switch( (version)[1] ) {
	case 0:
		return thx.html.Html.getTemplateHtml4Strict();
	case 1:
		return thx.html.Html.getTemplateHtml4Transitional();
	case 2:
		return thx.html.Html.getTemplateHtml4Frameset();
	case 3:
		return thx.html.Html.getTemplateHtml5();
	case 4:
		return thx.html.Html.getTemplateXHtml10Transitional();
	case 6:
		return thx.html.Html.getTemplateXHtml10Frameset();
	case 5:
		return thx.html.Html.getTemplateXHtml10Strict();
	case 7:
		return thx.html.Html.getTemplateXHtml11();
	}
}
thx.html.Html.getTemplateHtml4Strict = function() {
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\"><html><head><title></title></head><body></body></html>";
}
thx.html.Html.getTemplateHtml4Transitional = function() {
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><html><head><title></title></head><body></body></html>";
}
thx.html.Html.getTemplateHtml4Frameset = function() {
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head><title></title></head><frameset><noframes><body></body></noframes></frameset></html>";
}
thx.html.Html.getTemplateHtml5 = function() {
	return "<!doctype html><html><head><title></title></head><body></body></html>";
}
thx.html.Html.getTemplateXHtml10Transitional = function() {
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
}
thx.html.Html.getTemplateXHtml10Strict = function() {
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
}
thx.html.Html.getTemplateXHtml10Frameset = function() {
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><frameset><noframes><body></body></noframes></frameset></html>";
}
thx.html.Html.getTemplateXHtml11 = function() {
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
}
thx.html.Html.toXml = function(html) {
	var handler = new thx.html.DomHandler();
	var parser = new thx.html.HtmlParser(html);
	parser.process(handler);
	return handler.document;
}
thx.html.Html.toXmlString = function(html) {
	var handler = new thx.html.TextHandler();
	var parser = new thx.html.HtmlParser(html);
	parser.process(handler);
	return handler.results;
}
thx.html.Html.prototype = {
	__class__: thx.html.Html
}
thx.math.scale.IScale = $hxClasses["thx.math.scale.IScale"] = function() { }
thx.math.scale.IScale.__name__ = ["thx","math","scale","IScale"];
thx.math.scale.IScale.prototype = {
	scale: null
	,getDomain: null
	,getRange: null
	,__class__: thx.math.scale.IScale
}
thx.math.scale.NumericScale = $hxClasses["thx.math.scale.NumericScale"] = function() {
	this._domain = [0.0,1.0];
	this._range = [0.0,1.0];
	this.f = Floats.interpolatef;
	this._clamp = false;
	this.rescale();
};
thx.math.scale.NumericScale.__name__ = ["thx","math","scale","NumericScale"];
thx.math.scale.NumericScale.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.NumericScale.scaleBilinear = function(domain,range,uninterpolate,interpolate) {
	var u = uninterpolate(domain[0],domain[1]), i = interpolate(range[0],range[1],null);
	return function(x) {
		return i(u(x));
	};
}
thx.math.scale.NumericScale.scalePolylinear = function(domain,range,uninterpolate,interpolate) {
	var u = [], i = [];
	var _g1 = 1, _g = domain.length;
	while(_g1 < _g) {
		var j = _g1++;
		u.push(uninterpolate(domain[j - 1],domain[j]));
		i.push(interpolate(range[j - 1],range[j],null));
	}
	return function(x) {
		var j = Arrays.bisectRight(domain,x,1,domain.length - 1) - 1;
		return i[j](u[j](x));
	};
}
thx.math.scale.NumericScale.prototype = {
	_domain: null
	,_range: null
	,f: null
	,_clamp: null
	,_output: null
	,_input: null
	,rescale: function() {
		var linear = this._domain.length == 2?thx.math.scale.NumericScale.scaleBilinear:thx.math.scale.NumericScale.scalePolylinear, uninterpolate = this._clamp?Floats.uninterpolateClampf:Floats.uninterpolatef;
		this._output = linear(this._domain,this._range,uninterpolate,this.f);
		this._input = linear(this._range,this._domain,uninterpolate,Floats.interpolatef);
		return this;
	}
	,scale: function(x,_) {
		return this._output(x);
	}
	,invert: function(y,_) {
		return this._input(y);
	}
	,getDomain: function() {
		return this._domain;
	}
	,domain: function(d) {
		this._domain = d;
		return this.rescale();
	}
	,getRange: function() {
		return this._range;
	}
	,range: function(r) {
		this._range = r;
		return this.rescale();
	}
	,rangeRound: function(r) {
		this.range(r);
		this.interpolatef(Ints.interpolatef);
		return this;
	}
	,getInterpolate: function() {
		return this.f;
	}
	,interpolatef: function(x) {
		this.f = x;
		return this.rescale();
	}
	,getClamp: function() {
		return this._clamp;
	}
	,clamp: function(v) {
		this._clamp = v;
		return this.rescale();
	}
	,ticks: function() {
		return (function($this) {
			var $r;
			throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 86, className : "thx.math.scale.NumericScale", methodName : "ticks"});
			return $r;
		}(this));
	}
	,tickFormat: function(v,i) {
		return (function($this) {
			var $r;
			throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 91, className : "thx.math.scale.NumericScale", methodName : "tickFormat"});
			return $r;
		}(this));
	}
	,transform: function(scale,t,a,b) {
		var range = this.getRange().map(function(v,_) {
			return (v - t) / scale;
		});
		this.domain([a,b]);
		var r = range.map(this.invert.$bind(this));
		this.domain(r);
		return this;
	}
	,_this: function() {
		return this;
	}
	,__class__: thx.math.scale.NumericScale
}
thx.math.scale.Pow = $hxClasses["thx.math.scale.Pow"] = function() {
	thx.math.scale.NumericScale.call(this);
	this.tick = new thx.math.scale.Linear();
	this._exponent = 1;
	this.powb = this.powp = function(v) {
		return v;
	};
};
thx.math.scale.Pow.__name__ = ["thx","math","scale","Pow"];
thx.math.scale.Pow.sqrt = function() {
	return new thx.math.scale.Pow().exponent(.5);
}
thx.math.scale.Pow._pow = function(e) {
	return function(v) {
		return Math.pow(v,e);
	};
}
thx.math.scale.Pow._pown = function(e) {
	return function(v) {
		return -Math.pow(-v,e);
	};
}
thx.math.scale.Pow.__super__ = thx.math.scale.NumericScale;
thx.math.scale.Pow.prototype = $extend(thx.math.scale.NumericScale.prototype,{
	tick: null
	,_exponent: null
	,powp: null
	,powb: null
	,scale: function(x,i) {
		return thx.math.scale.NumericScale.prototype.scale.call(this,this.powp(x));
	}
	,invert: function(x,i) {
		return this.powb(thx.math.scale.NumericScale.prototype.invert.call(this,x));
	}
	,getDomain: function() {
		var me = this;
		return thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
			return me.powb(d);
		});
	}
	,domain: function(d) {
		var pow = Arrays.min(d) < 0?thx.math.scale.Pow._pown:thx.math.scale.Pow._pow;
		this.powp = pow(this._exponent);
		this.powb = pow(1.0 / this._exponent);
		thx.math.scale.NumericScale.prototype.domain.call(this,[this.powp(d[0]),this.powp(d[1])]);
		this.tick.domain(d);
		return this;
	}
	,ticks: function() {
		return this.tick.ticks();
	}
	,tickFormat: function(v,i) {
		return this.tick.tickFormat(v,i);
	}
	,getModulo: function() {
		return this.tick.getModulo();
	}
	,modulo: function(v) {
		this.tick.modulo(v);
		return this;
	}
	,getExponent: function() {
		return this._exponent;
	}
	,exponent: function(x) {
		var d = this.getDomain();
		this._exponent = x;
		this.domain(d);
		return this;
	}
	,__class__: thx.math.scale.Pow
});
var Hash = $hxClasses["Hash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		try {
			key = "$" + key;
			return this.hasOwnProperty.call(this.h,key);
		} catch( e ) {
			for(var i in this.h) if( i == key ) return true;
			return false;
		}
	}
	,remove: function(key) {
		if(!this.exists(key)) return false;
		delete(this.h["$" + key]);
		return true;
	}
	,keys: function() {
		var a = new Array();
		for(var i in this.h) a.push(i.substr(1));
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
thx.color.Hsl = $hxClasses["thx.color.Hsl"] = function(h,s,l) {
	this.hue = h = Floats.circularWrap(h,360);
	this.saturation = s = Floats.normalize(s);
	this.lightness = l = Floats.normalize(l);
	thx.color.Rgb.call(this,Ints.interpolate(thx.color.Hsl._c(h + 120,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h - 120,s,l),0,255,null));
};
thx.color.Hsl.__name__ = ["thx","color","Hsl"];
thx.color.Hsl._c = function(d,s,l) {
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = Floats.circularWrap(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
}
thx.color.Hsl.toHsl = function(c) {
	var r = c.red / 255.0;
	var g = c.green / 255.0, b = c.blue / 255.0, min = Floats.min(r < g?r:g,b), max = Floats.max(r > g?r:g,b), delta = max - min, h, s, l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		s = l < 0.5?delta / (max + min):delta / (2 - max - min);
		if(r == max) h = (g - b) / delta + (g < b?6:0); else if(g == max) h = (b - r) / delta + 2; else h = (r - g) / delta + 4;
		h *= 60;
	}
	return new thx.color.Hsl(h,s,l);
}
thx.color.Hsl.equals = function(a,b) {
	return a.hue == b.hue && a.saturation == b.saturation && a.lightness == b.lightness;
}
thx.color.Hsl.darker = function(color,t,equation) {
	return new thx.color.Hsl(color.hue,color.saturation,Floats.interpolate(t,color.lightness,0,equation));
}
thx.color.Hsl.lighter = function(color,t,equation) {
	return new thx.color.Hsl(color.hue,color.saturation,Floats.interpolate(t,color.lightness,1,equation));
}
thx.color.Hsl.interpolate = function(a,b,t,equation) {
	return new thx.color.Hsl(Floats.interpolate(t,a.hue,b.hue,equation),Floats.interpolate(t,a.saturation,b.saturation,equation),Floats.interpolate(t,a.lightness,b.lightness,equation));
}
thx.color.Hsl.interpolatef = function(a,b,equation) {
	return function(t) {
		return new thx.color.Hsl(Floats.interpolate(t,a.hue,b.hue,equation),Floats.interpolate(t,a.saturation,b.saturation,equation),Floats.interpolate(t,a.lightness,b.lightness,equation));
	};
}
thx.color.Hsl.__super__ = thx.color.Rgb;
thx.color.Hsl.prototype = $extend(thx.color.Rgb.prototype,{
	hue: null
	,saturation: null
	,lightness: null
	,toHslString: function() {
		return "hsl(" + this.hue + "," + this.saturation * 100 + "%," + this.lightness * 100 + "%)";
	}
	,__class__: thx.color.Hsl
});
thx.math.Const = $hxClasses["thx.math.Const"] = function() { }
thx.math.Const.__name__ = ["thx","math","Const"];
thx.math.Const.prototype = {
	__class__: thx.math.Const
}
var Floats = $hxClasses["Floats"] = function() { }
Floats.__name__ = ["Floats"];
Floats.normalize = function(v) {
	if(v < 0.0) return 0.0; else if(v > 1.0) return 1.0; else return v;
}
Floats.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
}
Floats.clampSym = function(v,max) {
	if(v < -max) return -max; else if(v > max) return max; else return v;
}
Floats.range = function(start,stop,step) {
	if(step == null) step = 1.0;
	if(null == stop) {
		stop = start;
		start = 0.0;
	}
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Floats.hx", lineNumber : 50, className : "Floats", methodName : "range"});
	var range = [], i = -1.0, j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
}
Floats.sign = function(v) {
	return v < 0?-1:1;
}
Floats.abs = function(a) {
	return a < 0?-a:a;
}
Floats.min = function(a,b) {
	return a < b?a:b;
}
Floats.max = function(a,b) {
	return a > b?a:b;
}
Floats.wrap = function(v,min,max) {
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	return min + (v - min) % range;
}
Floats.circularWrap = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
}
Floats.interpolate = function(f,a,b,equation) {
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == equation) equation = thx.math.Equations.linear;
	return a + equation(f) * (b - a);
}
Floats.interpolatef = function(a,b,equation) {
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == equation) equation = thx.math.Equations.linear;
	var d = b - a;
	return function(f) {
		return a + equation(f) * d;
	};
}
Floats.interpolateClampf = function(min,max,equation) {
	if(null == equation) equation = thx.math.Equations.linear;
	return function(a,b) {
		var d = b - a;
		return function(f) {
			return a + equation(Floats.clamp(f,min,max)) * d;
		};
	};
}
Floats.format = function(v,param,params,culture) {
	return (Floats.formatf(param,params,culture))(v);
}
Floats.formatf = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"D");
	var format = params.shift();
	var decimals = params.length > 0?Std.parseInt(params[0]):null;
	switch(format) {
	case "D":
		return function(v) {
			return thx.culture.FormatNumber.decimal(v,decimals,culture);
		};
	case "I":
		return function(v) {
			return thx.culture.FormatNumber["int"](v,culture);
		};
	case "C":
		var s = params.length > 1?params[1]:null;
		return function(v) {
			return thx.culture.FormatNumber.currency(v,s,decimals,culture);
		};
	case "P":
		return function(v) {
			return thx.culture.FormatNumber.percent(v,decimals,culture);
		};
	case "M":
		return function(v) {
			return thx.culture.FormatNumber.permille(v,decimals,culture);
		};
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("Unsupported number format: {0}",null,format,{ fileName : "Floats.hx", lineNumber : 145, className : "Floats", methodName : "formatf"});
			return $r;
		}(this));
	}
}
Floats.canParse = function(s) {
	return Floats._reparse.match(s);
}
Floats.parse = function(s) {
	if(s.substr(0,1) == "+") s = s.substr(1);
	return Std.parseFloat(s);
}
Floats.compare = function(a,b) {
	return a < b?-1:a > b?1:0;
}
Floats.isNumeric = function(v) {
	return Std["is"](v,Float) || Std["is"](v,Int);
}
Floats.equals = function(a,b,approx) {
	if(approx == null) approx = 1e-5;
	if(Math.isNaN(a)) return Math.isNaN(b); else if(Math.isNaN(b)) return false; else if(!Math.isFinite(a) && !Math.isFinite(b)) return a > 0 == b > 0;
	return Math.abs(b - a) < approx;
}
Floats.uninterpolatef = function(a,b) {
	b = 1 / (b - a);
	return function(x) {
		return (x - a) * b;
	};
}
Floats.uninterpolateClampf = function(a,b) {
	b = 1 / (b - a);
	return function(x) {
		return Floats.clamp((x - a) * b,0.0,1.0);
	};
}
Floats.round = function(number,precision) {
	if(precision == null) precision = 2;
	number *= Math.pow(10,precision);
	return Math.round(number) / Math.pow(10,precision);
}
Floats.prototype = {
	__class__: Floats
}
var Ints = $hxClasses["Ints"] = function() { }
Ints.__name__ = ["Ints"];
Ints.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Ints.hx", lineNumber : 19, className : "Ints", methodName : "range"});
	var range = [], i = -1, j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
}
Ints.sign = function(v) {
	return v < 0?-1:1;
}
Ints.abs = function(a) {
	return a < 0?-a:a;
}
Ints.min = function(a,b) {
	return a < b?a:b;
}
Ints.max = function(a,b) {
	return a > b?a:b;
}
Ints.wrap = function(v,min,max) {
	return Math.round(Floats.wrap(v,min,max));
}
Ints.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
}
Ints.clampSym = function(v,max) {
	if(v < -max) return -max; else if(v > max) return max; else return v;
}
Ints.interpolate = function(f,min,max,equation) {
	if(max == null) max = 100.0;
	if(min == null) min = 0.0;
	if(null == equation) equation = thx.math.Equations.linear;
	return Math.round(min + equation(f) * (max - min));
}
Ints.interpolatef = function(min,max,equation) {
	if(max == null) max = 1.0;
	if(min == null) min = 0.0;
	if(null == equation) equation = thx.math.Equations.linear;
	var d = max - min;
	return function(f) {
		return Math.round(min + equation(f) * d);
	};
}
Ints.format = function(v,param,params,culture) {
	return (Ints.formatf(param,params,culture))(v);
}
Ints.formatf = function(param,params,culture) {
	return Floats.formatf(null,thx.culture.FormatParams.params(param,params,"I"),culture);
}
Ints.canParse = function(s) {
	return Ints._reparse.match(s);
}
Ints.parse = function(s) {
	if(s.substr(0,1) == "+") s = s.substr(1);
	return Std.parseInt(s);
}
Ints.compare = function(a,b) {
	return a - b;
}
Ints.prototype = {
	__class__: Ints
}
thx.math.Equations = $hxClasses["thx.math.Equations"] = function() { }
thx.math.Equations.__name__ = ["thx","math","Equations"];
thx.math.Equations.linear = function(v) {
	return v;
}
thx.math.Equations.polynomial = function(t,e) {
	return Math.pow(t,e);
}
thx.math.Equations.quadratic = function(t) {
	return thx.math.Equations.polynomial(t,2);
}
thx.math.Equations.cubic = function(t) {
	return thx.math.Equations.polynomial(t,3);
}
thx.math.Equations.sin = function(t) {
	return 1 - Math.cos(t * Math.PI / 2);
}
thx.math.Equations.exponential = function(t) {
	return t != 0?Math.pow(2,10 * (t - 1)) - 1e-3:0;
}
thx.math.Equations.circle = function(t) {
	return 1 - Math.sqrt(1 - t * t);
}
thx.math.Equations.elastic = function(t,a,p) {
	var s;
	if(null == p) p = 0.45;
	if(null == a) {
		a = 1;
		s = p / 4;
	} else s = p / (2 * Math.PI) / Math.asin(1 / a);
	return 1 + a * Math.pow(2,10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
}
thx.math.Equations.elasticf = function(a,p) {
	var s;
	if(null == p) p = 0.45;
	if(null == a) {
		a = 1;
		s = p / 4;
	} else s = p / (2 * Math.PI) / Math.asin(1 / a);
	return function(t) {
		return 1 + a * Math.pow(2,10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
	};
}
thx.math.Equations.back = function(t,s) {
	if(null == s) s = 1.70158;
	return t * t * ((s + 1) * t - s);
}
thx.math.Equations.backf = function(s) {
	if(null == s) s = 1.70158;
	return function(t) {
		return t * t * ((s + 1) * t - s);
	};
}
thx.math.Equations.bounce = function(t) {
	return t < 1 / 2.75?7.5625 * t * t:t < 2 / 2.75?7.5625 * (t -= 1.5 / 2.75) * t + .75:t < 2.5 / 2.75?7.5625 * (t -= 2.25 / 2.75) * t + .9375:7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
thx.math.Equations.polynomialf = function(e) {
	return function(t) {
		thx.math.Equations.polynomial(t,e);
	};
}
thx.math.Equations.prototype = {
	__class__: thx.math.Equations
}
thx.math.scale.Linears = $hxClasses["thx.math.scale.Linears"] = function() { }
thx.math.scale.Linears.__name__ = ["thx","math","scale","Linears"];
thx.math.scale.Linears.forString = function() {
	return new thx.math.scale.LinearT().interpolatef(Strings.interpolatef);
}
thx.math.scale.Linears.forHsl = function() {
	return new thx.math.scale.LinearT().interpolatef(thx.color.Hsl.interpolatef);
}
thx.math.scale.Linears.forHslString = function() {
	return new thx.math.scale.LinearT().interpolatef(function(a,b,f) {
		if(Strings.empty(a) || Strings.empty(b)) return function(_) {
			return "";
		};
		var ca = thx.color.Hsl.toHsl(thx.color.Colors.parse(a)), cb = thx.color.Hsl.toHsl(thx.color.Colors.parse(b)), i = thx.color.Hsl.interpolatef(ca,cb,f);
		return function(t) {
			return i(t).toHslString();
		};
	});
}
thx.math.scale.Linears.forRgb = function() {
	return new thx.math.scale.LinearT().interpolatef(thx.color.Rgb.interpolatef);
}
thx.math.scale.Linears.forRgbString = function() {
	return new thx.math.scale.LinearT().interpolatef(function(a,b,f) {
		if(Strings.empty(a) || Strings.empty(b)) return function(_) {
			return "";
		};
		var ca = thx.color.Colors.parse(a), cb = thx.color.Colors.parse(b), i = thx.color.Rgb.interpolatef(ca,cb,f);
		return function(t) {
			return i(t).toRgbString();
		};
	});
}
thx.math.scale.Linears.prototype = {
	__class__: thx.math.scale.Linears
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h[key] != null;
	}
	,remove: function(key) {
		if(this.h[key] == null) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = new Array();
		for( x in this.h ) a.push(x);
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: IntHash
}
if(!thx.translation) thx.translation = {}
thx.translation.ITranslation = $hxClasses["thx.translation.ITranslation"] = function() { }
thx.translation.ITranslation.__name__ = ["thx","translation","ITranslation"];
thx.translation.ITranslation.prototype = {
	domain: null
	,_: null
	,__: null
	,__class__: thx.translation.ITranslation
	,__properties__: {set_domain:"setDomain",get_domain:"getDomain"}
}
if(!thx.csv) thx.csv = {}
thx.csv.Csv = $hxClasses["thx.csv.Csv"] = function() { }
thx.csv.Csv.__name__ = ["thx","csv","Csv"];
thx.csv.Csv.encode = function(value,delimiter,nulltoempty,newline) {
	var handler = new thx.csv.CsvEncoder(delimiter,nulltoempty,newline);
	new thx.data.ValueEncoder(handler).encode(value);
	return handler.encodedString;
}
thx.csv.Csv.decode = function(value,check_type,delimiter,emptytonull,newline,quote,doublequotations,skipwhitespace) {
	var handler = new thx.data.ValueHandler();
	new thx.csv.CsvDecoder(handler,check_type,delimiter,emptytonull,newline,quote,doublequotations,skipwhitespace).decode(value);
	return handler.value;
}
thx.csv.Csv.prototype = {
	__class__: thx.csv.Csv
}
thx.validation.IValidator = $hxClasses["thx.validation.IValidator"] = function() { }
thx.validation.IValidator.__name__ = ["thx","validation","IValidator"];
thx.validation.IValidator.prototype = {
	validate: null
	,isValid: null
	,__class__: thx.validation.IValidator
}
thx.validation.Validator = $hxClasses["thx.validation.Validator"] = function() { }
thx.validation.Validator.__name__ = ["thx","validation","Validator"];
thx.validation.Validator.__interfaces__ = [thx.validation.IValidator];
thx.validation.Validator.prototype = {
	validate: function(value) {
		return (function($this) {
			var $r;
			throw new thx.error.AbstractMethod({ fileName : "Validator.hx", lineNumber : 13, className : "thx.validation.Validator", methodName : "validate"});
			return $r;
		}(this));
	}
	,isValid: function(value) {
		return Type.enumEq(this.validate(value),thx.util.Result.Ok);
	}
	,__class__: thx.validation.Validator
}
thx.validation.EmailValidator = $hxClasses["thx.validation.EmailValidator"] = function(validatedomain) {
	if(validatedomain == null) validatedomain = true;
	this.validateDomain = validatedomain;
};
thx.validation.EmailValidator.__name__ = ["thx","validation","EmailValidator"];
thx.validation.EmailValidator.__super__ = thx.validation.Validator;
thx.validation.EmailValidator.prototype = $extend(thx.validation.Validator.prototype,{
	validateDomain: null
	,validate: function(value) {
		if(!thx.validation.EmailValidator._reEmail.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid email address '{0}'",[value],null)]);
		if(this.validateDomain && !thx.validation.EmailValidator._reEmailDomain.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid domain for '{0}'",[value],null)]);
		return thx.util.Result.Ok;
	}
	,__class__: thx.validation.EmailValidator
});
var TestArrays = $hxClasses["TestArrays"] = function() {
};
TestArrays.__name__ = ["TestArrays"];
TestArrays.addTests = function(runner) {
	runner.addCase(new TestArrays());
}
TestArrays.main = function() {
	var runner = new utest.Runner();
	TestArrays.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestArrays.prototype = {
	testCreate: function() {
		utest.Assert.same(2,Arrays.min([4,2,6]),null,null,{ fileName : "TestArrays.hx", lineNumber : 10, className : "TestArrays", methodName : "testCreate"});
		utest.Assert.same([1,0],Arrays.min([[1,2,3],[1,0],[1,2,3,4]],function(d) {
			return Arrays.min(d);
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 11, className : "TestArrays", methodName : "testCreate"});
	}
	,testMap: function() {
		utest.Assert.same(["a","b","c"],[1,2,3].map(function(v,_) {
			return String.fromCharCode(v + 96);
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 16, className : "TestArrays", methodName : "testMap"});
		utest.Assert.same([0,1,2],[null,null,null].map(function(_,i) {
			return i;
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 17, className : "TestArrays", methodName : "testMap"});
	}
	,testFlattenSplit: function() {
		var split = Arrays.split([1,2,3,null,4,5,6,null,7,8,9]);
		utest.Assert.same([[1,2,3],[4,5,6],[7,8,9]],split,null,null,{ fileName : "TestArrays.hx", lineNumber : 23, className : "TestArrays", methodName : "testFlattenSplit"});
		utest.Assert.same([1,2,3,4,5,6,7,8,9],Arrays.flatten(split),null,null,{ fileName : "TestArrays.hx", lineNumber : 24, className : "TestArrays", methodName : "testFlattenSplit"});
	}
	,testSplit: function() {
		utest.Assert.same([[1,2,3],[4,5,6]],Arrays.split([1,2,3,100,4,5,6],function(v,_) {
			return v == 100;
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 29, className : "TestArrays", methodName : "testSplit"});
		utest.Assert.same([[1],[3],[5]],Arrays.split([1,2,3,4,5,6],function(_,i) {
			return i % 2 != 0;
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 30, className : "TestArrays", methodName : "testSplit"});
	}
	,testFormat: function() {
		var values = [1,.01,6];
		utest.Assert.equals("1, 0.01, 6",Arrays.format(values),null,{ fileName : "TestArrays.hx", lineNumber : 36, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("$1.00, $0.01, $6.00",Arrays.format(values,"J:C"),null,{ fileName : "TestArrays.hx", lineNumber : 37, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("[]",Arrays.format([],"J"),null,{ fileName : "TestArrays.hx", lineNumber : 38, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("empty",Arrays.format([],"J:C,empty"),null,{ fileName : "TestArrays.hx", lineNumber : 39, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("$1.00;$0.01;$6.00",Arrays.format(values,"J:C,'',';'"),null,{ fileName : "TestArrays.hx", lineNumber : 40, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("$1.00;$0.01 ...",Arrays.format(values,"J:C,'',';',2"),null,{ fileName : "TestArrays.hx", lineNumber : 41, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("$1.00;$0.01 ... more",Arrays.format(values,"J:C,'',';',2,' ... more'"),null,{ fileName : "TestArrays.hx", lineNumber : 42, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("0",Arrays.format([],"C"),null,{ fileName : "TestArrays.hx", lineNumber : 44, className : "TestArrays", methodName : "testFormat"});
		utest.Assert.equals("3",Arrays.format(values,"C"),null,{ fileName : "TestArrays.hx", lineNumber : 45, className : "TestArrays", methodName : "testFormat"});
	}
	,testInterpolate: function() {
		utest.Assert.same([1.0,1.0,1.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 50, className : "TestArrays", methodName : "testInterpolate"});
		utest.Assert.same([1.0,3.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,4.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 51, className : "TestArrays", methodName : "testInterpolate"});
		utest.Assert.same([5.0,1.0,-1.0],Arrays.interpolate(0.5,[1.0,2.0],[9.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 52, className : "TestArrays", methodName : "testInterpolate"});
	}
	,testInterpolateStrings: function() {
		utest.Assert.same(["b20","a10"],Arrays.interpolateStrings(0.5,["b10","a20"],["b30","a0"]),null,null,{ fileName : "TestArrays.hx", lineNumber : 57, className : "TestArrays", methodName : "testInterpolateStrings"});
	}
	,testInterpolateInts: function() {
		utest.Assert.same([20,10],Arrays.interpolateInts(0.5,[10,20],[30,0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 62, className : "TestArrays", methodName : "testInterpolateInts"});
	}
	,testBounds: function() {
		utest.Assert.same([1,10],Arrays.bounds([1,9,3,4,10,2]),null,null,{ fileName : "TestArrays.hx", lineNumber : 67, className : "TestArrays", methodName : "testBounds"});
		var arr = [{ x : 1},{ x : 10},{ x : 4},{ x : 2}];
		utest.Assert.same([1,10],Arrays.boundsFloat(arr,function(x) {
			return x.x;
		}),null,null,{ fileName : "TestArrays.hx", lineNumber : 69, className : "TestArrays", methodName : "testBounds"});
	}
	,testBisect: function() {
		var a = [1.0,2.0,3.0,4.0], t = [-1,0,1,2,3,4,5,-0.1,0.1,1.1,2.1,3.1,4.1,5.1,Math.NaN,Math.POSITIVE_INFINITY,Math.NEGATIVE_INFINITY], el = [0,0,0,1,2,3,4,0,0,1,2,3,4,4,0,4,0], er = [0,0,1,2,3,4,4,0,0,1,2,3,4,4,4,4,0];
		var _g1 = 0, _g = t.length;
		while(_g1 < _g) {
			var i = _g1++;
			utest.Assert.equals(el[i],Arrays.bisectLeft(a,t[i]),"bisectLeft, failed to compare " + el[i] + " for " + t[i],{ fileName : "TestArrays.hx", lineNumber : 97, className : "TestArrays", methodName : "testBisect"});
			utest.Assert.equals(er[i],Arrays.bisectRight(a,t[i]),"bisectRight, failed to compare " + er[i] + " for " + t[i],{ fileName : "TestArrays.hx", lineNumber : 98, className : "TestArrays", methodName : "testBisect"});
		}
		var pairs = [{ lo : 2, hi : null, el : [2,2,2,2,2,3,4], er : [2,2,2,2,3,4,4]},{ lo : 0, hi : 2, el : [0,0,0,1,2,2,2], er : [0,0,1,2,2,2,2]},{ lo : 1, hi : 3, el : [1,1,1,1,2,3,3], er : [1,1,1,2,3,3,3]}];
		t = [-1.0,0,1,2,3,4,5];
		var _g = 0;
		while(_g < pairs.length) {
			var p = pairs[_g];
			++_g;
			var _g2 = 0, _g1 = p.el.length;
			while(_g2 < _g1) {
				var i = _g2++;
				utest.Assert.equals(p.el[i],Arrays.bisectLeft(a,t[i],p.lo,p.hi),null,{ fileName : "TestArrays.hx", lineNumber : 124, className : "TestArrays", methodName : "testBisect"});
				utest.Assert.equals(p.er[i],Arrays.bisectRight(a,t[i],p.lo,p.hi),null,{ fileName : "TestArrays.hx", lineNumber : 125, className : "TestArrays", methodName : "testBisect"});
			}
		}
	}
	,testOrderMulti: function() {
		var arr = [5,1,4,2,8];
		var test = ["d","a","c","b","e"];
		Arrays.orderMultiple(arr,Ints.compare,[test]);
		utest.Assert.same(["a","b","c","d","e"],test,null,null,{ fileName : "TestArrays.hx", lineNumber : 135, className : "TestArrays", methodName : "testOrderMulti"});
		utest.Assert.same([1,2,4,5,8],arr,null,null,{ fileName : "TestArrays.hx", lineNumber : 136, className : "TestArrays", methodName : "testOrderMulti"});
		arr = [5,1,4,2,8];
		var other = [5,1,4,2,8];
		test = ["d","a","c","b","e"];
		var t = [test,other];
		Arrays.orderMultiple(arr,Ints.compare,t);
		utest.Assert.same([["a","b","c","d","e"],[1,2,4,5,8]],t,null,null,{ fileName : "TestArrays.hx", lineNumber : 143, className : "TestArrays", methodName : "testOrderMulti"});
	}
	,__class__: TestArrays
}
thx.validation.TestRange = $hxClasses["thx.validation.TestRange"] = function() {
};
thx.validation.TestRange.__name__ = ["thx","validation","TestRange"];
thx.validation.TestRange.__super__ = thx.validation.TestAll;
thx.validation.TestRange.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.RangeValidator(-5.0,5.0);
		this.assertValidation(validator.validate(-6.0),false,null,{ fileName : "TestRange.hx", lineNumber : 10, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(-5.0),true,null,{ fileName : "TestRange.hx", lineNumber : 11, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(0.0),true,null,{ fileName : "TestRange.hx", lineNumber : 12, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(5.0),true,null,{ fileName : "TestRange.hx", lineNumber : 13, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(6.0),false,null,{ fileName : "TestRange.hx", lineNumber : 14, className : "thx.validation.TestRange", methodName : "testValidation"});
		var validator1 = new thx.validation.RangeValidator(-5.0,5.0,false,false);
		this.assertValidation(validator1.validate(-6.0),false,null,{ fileName : "TestRange.hx", lineNumber : 16, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(-5.0),false,null,{ fileName : "TestRange.hx", lineNumber : 17, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(0.0),true,null,{ fileName : "TestRange.hx", lineNumber : 18, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(5.0),false,null,{ fileName : "TestRange.hx", lineNumber : 19, className : "thx.validation.TestRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(6.0),false,null,{ fileName : "TestRange.hx", lineNumber : 20, className : "thx.validation.TestRange", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestRange
});
thx.svg.Line = $hxClasses["thx.svg.Line"] = function(x,y,interpolator) {
	this._x = x;
	this._y = y;
	this._interpolator = interpolator;
};
thx.svg.Line.__name__ = ["thx","svg","Line"];
thx.svg.Line.pointArray = function(interpolator) {
	return new thx.svg.Line(function(d,_) {
		return d[0];
	},function(d,_) {
		return d[1];
	},interpolator);
}
thx.svg.Line.pointObject = function(interpolator) {
	return new thx.svg.Line(function(d,_) {
		return d.x;
	},function(d,_) {
		return d.y;
	},interpolator);
}
thx.svg.Line.prototype = {
	_x: null
	,_y: null
	,_interpolator: null
	,shape: function(data,i) {
		return data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y),this._interpolator);
	}
	,getInterpolator: function() {
		return this._interpolator;
	}
	,interpolator: function(type) {
		this._interpolator = type;
		return this;
	}
	,getX: function() {
		return this._x;
	}
	,x: function(v) {
		this._x = v;
		return this;
	}
	,getY: function() {
		return this._y;
	}
	,y: function(v) {
		this._y = v;
		return this;
	}
	,__class__: thx.svg.Line
}
if(!thx.culture) thx.culture = {}
thx.culture.Info = $hxClasses["thx.culture.Info"] = function() { }
thx.culture.Info.__name__ = ["thx","culture","Info"];
thx.culture.Info.prototype = {
	name: null
	,'native': null
	,english: null
	,iso2: null
	,iso3: null
	,pluralRule: null
	,toString: function() {
		return this["native"] + " (" + this.english + ")";
	}
	,__class__: thx.culture.Info
}
thx.culture.Culture = $hxClasses["thx.culture.Culture"] = function() { }
thx.culture.Culture.__name__ = ["thx","culture","Culture"];
thx.culture.Culture.__properties__ = {set_defaultCulture:"setDefaultCulture",get_defaultCulture:"getDefaultCulture",get_cultures:"getCultures"}
thx.culture.Culture.cultures = null;
thx.culture.Culture.getCultures = function() {
	if(null == thx.culture.Culture.cultures) thx.culture.Culture.cultures = new Hash();
	return thx.culture.Culture.cultures;
}
thx.culture.Culture.get = function(name) {
	return thx.culture.Culture.getCultures().get(name.toLowerCase());
}
thx.culture.Culture.names = function() {
	return thx.culture.Culture.getCultures().keys();
}
thx.culture.Culture.exists = function(culture) {
	return thx.culture.Culture.getCultures().exists(culture.toLowerCase());
}
thx.culture.Culture._defaultCulture = null;
thx.culture.Culture.defaultCulture = null;
thx.culture.Culture.getDefaultCulture = function() {
	if(null == thx.culture.Culture._defaultCulture) return thx.cultures.EnUS.getCulture(); else return thx.culture.Culture._defaultCulture;
}
thx.culture.Culture.setDefaultCulture = function(culture) {
	return thx.culture.Culture._defaultCulture = culture;
}
thx.culture.Culture.add = function(culture) {
	if(null == thx.culture.Culture._defaultCulture) thx.culture.Culture._defaultCulture = culture;
	var name = culture.name.toLowerCase();
	if(!thx.culture.Culture.getCultures().exists(name)) thx.culture.Culture.getCultures().set(name,culture);
}
thx.culture.Culture.loadAll = function() {
}
thx.culture.Culture.__super__ = thx.culture.Info;
thx.culture.Culture.prototype = $extend(thx.culture.Info.prototype,{
	language: null
	,date: null
	,englishCurrency: null
	,nativeCurrency: null
	,currencySymbol: null
	,currencyIso: null
	,englishRegion: null
	,nativeRegion: null
	,isMetric: null
	,digits: null
	,signNeg: null
	,signPos: null
	,symbolNaN: null
	,symbolPercent: null
	,symbolPermille: null
	,symbolNegInf: null
	,symbolPosInf: null
	,number: null
	,currency: null
	,percent: null
	,__class__: thx.culture.Culture
});
thx.culture.Language = $hxClasses["thx.culture.Language"] = function() { }
thx.culture.Language.__name__ = ["thx","culture","Language"];
thx.culture.Language.__properties__ = {get_languages:"getLanguages"}
thx.culture.Language.languages = null;
thx.culture.Language.getLanguages = function() {
	if(null == thx.culture.Language.languages) thx.culture.Language.languages = new Hash();
	return thx.culture.Language.languages;
}
thx.culture.Language.get = function(name) {
	return thx.culture.Language.getLanguages().get(name.toLowerCase());
}
thx.culture.Language.names = function() {
	return thx.culture.Language.getLanguages().keys();
}
thx.culture.Language.add = function(language) {
	if(!thx.culture.Language.getLanguages().exists(language.iso2)) thx.culture.Language.getLanguages().set(language.iso2,language);
}
thx.culture.Language.__super__ = thx.culture.Info;
thx.culture.Language.prototype = $extend(thx.culture.Info.prototype,{
	__class__: thx.culture.Language
});
if(!thx.languages) thx.languages = {}
thx.languages.It = $hxClasses["thx.languages.It"] = function() {
	this.name = "it";
	this.english = "Italian";
	this["native"] = "italiano";
	this.iso2 = "it";
	this.iso3 = "ita";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
};
thx.languages.It.__name__ = ["thx","languages","It"];
thx.languages.It.__properties__ = {get_language:"getLanguage"}
thx.languages.It.language = null;
thx.languages.It.getLanguage = function() {
	if(null == thx.languages.It.language) thx.languages.It.language = new thx.languages.It();
	return thx.languages.It.language;
}
thx.languages.It.__super__ = thx.culture.Language;
thx.languages.It.prototype = $extend(thx.culture.Language.prototype,{
	__class__: thx.languages.It
});
if(!thx.culture.core) thx.culture.core = {}
thx.culture.core.DateTimeInfo = $hxClasses["thx.culture.core.DateTimeInfo"] = function(months,abbrMonths,days,abbrDays,shortDays,am,pm,separatorDate,separatorTime,firstWeekDay,patternYearMonth,patternMonthDay,patternDate,patternDateShort,patternDateRfc,patternDateTime,patternUniversal,patternSortable,patternTime,patternTimeShort) {
	this.months = months;
	this.abbrMonths = abbrMonths;
	this.days = days;
	this.abbrDays = abbrDays;
	this.shortDays = shortDays;
	this.am = am;
	this.pm = pm;
	this.separatorDate = separatorDate;
	this.separatorTime = separatorTime;
	this.firstWeekDay = firstWeekDay;
	this.patternYearMonth = patternYearMonth;
	this.patternMonthDay = patternMonthDay;
	this.patternDate = patternDate;
	this.patternDateShort = patternDateShort;
	this.patternDateRfc = patternDateRfc;
	this.patternDateTime = patternDateTime;
	this.patternUniversal = patternUniversal;
	this.patternSortable = patternSortable;
	this.patternTime = patternTime;
	this.patternTimeShort = patternTimeShort;
};
thx.culture.core.DateTimeInfo.__name__ = ["thx","culture","core","DateTimeInfo"];
thx.culture.core.DateTimeInfo.prototype = {
	months: null
	,abbrMonths: null
	,days: null
	,abbrDays: null
	,shortDays: null
	,am: null
	,pm: null
	,separatorDate: null
	,separatorTime: null
	,firstWeekDay: null
	,patternYearMonth: null
	,patternMonthDay: null
	,patternDate: null
	,patternDateShort: null
	,patternDateRfc: null
	,patternDateTime: null
	,patternUniversal: null
	,patternSortable: null
	,patternTime: null
	,patternTimeShort: null
	,__class__: thx.culture.core.DateTimeInfo
}
thx.culture.core.NumberInfo = $hxClasses["thx.culture.core.NumberInfo"] = function(decimals,decimalsSeparator,groups,groupsSeparator,patternNegative,patternPositive) {
	this.decimals = decimals;
	this.decimalsSeparator = decimalsSeparator;
	this.groups = groups;
	this.groupsSeparator = groupsSeparator;
	this.patternNegative = patternNegative;
	this.patternPositive = patternPositive;
};
thx.culture.core.NumberInfo.__name__ = ["thx","culture","core","NumberInfo"];
thx.culture.core.NumberInfo.prototype = {
	decimals: null
	,decimalsSeparator: null
	,groups: null
	,groupsSeparator: null
	,patternNegative: null
	,patternPositive: null
	,__class__: thx.culture.core.NumberInfo
}
if(!thx.cultures) thx.cultures = {}
thx.cultures.ItIT = $hxClasses["thx.cultures.ItIT"] = function() {
	this.language = thx.languages.It.getLanguage();
	this.name = "it-IT";
	this.english = "Italian (Italy)";
	this["native"] = "italiano (Italia)";
	this.date = new thx.culture.core.DateTimeInfo(["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""],["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],["dom","lun","mar","mer","gio","ven","sab"],["do","lu","ma","me","gi","ve","sa"],null,null,"/",".",1,"%B %Y","%d %B","%A %e %B %Y","%d/%m/%Y","%a, %d %b %Y %H:%M:%S GMT","%A %e %B %Y %k.%M.%S","%Y-%m-%d %H:%M:%SZ","%Y-%m-%dT%H:%M:%S","%k.%M.%S","%k.%M");
	this.symbolNaN = "Non un numero reale";
	this.symbolPercent = "%";
	this.symbolPermille = "‰";
	this.signNeg = "-";
	this.signPos = "+";
	this.symbolNegInf = "-Infinito";
	this.symbolPosInf = "+Infinito";
	this.number = new thx.culture.core.NumberInfo(2,",",[3],".","-n","n");
	this.currency = new thx.culture.core.NumberInfo(2,",",[3],".","-$ n","$ n");
	this.percent = new thx.culture.core.NumberInfo(2,",",[3],".","-n%","n%");
	this.pluralRule = 1;
	this.englishCurrency = "Euro";
	this.nativeCurrency = "euro";
	this.currencySymbol = "€";
	this.currencyIso = "EUR";
	this.englishRegion = "Italy";
	this.nativeRegion = "Italia";
	this.iso2 = "IT";
	this.iso3 = "ITA";
	this.isMetric = false;
	thx.culture.Culture.add(this);
};
thx.cultures.ItIT.__name__ = ["thx","cultures","ItIT"];
thx.cultures.ItIT.__properties__ = {get_culture:"getCulture"}
thx.cultures.ItIT.culture = null;
thx.cultures.ItIT.getCulture = function() {
	if(null == thx.cultures.ItIT.culture) thx.cultures.ItIT.culture = new thx.cultures.ItIT();
	return thx.cultures.ItIT.culture;
}
thx.cultures.ItIT.__super__ = thx.culture.Culture;
thx.cultures.ItIT.prototype = $extend(thx.culture.Culture.prototype,{
	__class__: thx.cultures.ItIT
});
var TestStrings = $hxClasses["TestStrings"] = function() {
};
TestStrings.__name__ = ["TestStrings"];
TestStrings.addTests = function(runner) {
	runner.addCase(new TestStrings());
}
TestStrings.main = function() {
	var runner = new utest.Runner();
	TestStrings.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestStrings.prototype = {
	testUcwordsws: function() {
		var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test Test  Test ", test : " test test  test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
		var _g = 0;
		while(_g < tests.length) {
			var item = tests[_g];
			++_g;
			utest.Assert.equals(item.expected,Strings.ucwordsws(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 41, className : "TestStrings", methodName : "testUcwordsws"});
		}
	}
	,testUcwords: function() {
		var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test-Test:Test_Test : Test ", test : " test-test:test_test : test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
		var _g = 0;
		while(_g < tests.length) {
			var item = tests[_g];
			++_g;
			utest.Assert.equals(item.expected,Strings.ucwords(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 54, className : "TestStrings", methodName : "testUcwords"});
		}
	}
	,testAlphaNum: function() {
		var tests = [{ expected : true, test : "a"},{ expected : true, test : "1a"},{ expected : false, test : " a"},{ expected : false, test : " "},{ expected : false, test : ""}];
		var _g = 0;
		while(_g < tests.length) {
			var item = tests[_g];
			++_g;
			utest.Assert.equals(item.expected,Strings.isAlphaNum(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 67, className : "TestStrings", methodName : "testAlphaNum"});
		}
	}
	,testFormat: function() {
		utest.Assert.equals("CAB",Strings.format("{2}{0}{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 72, className : "TestStrings", methodName : "testFormat"});
		utest.Assert.equals("C.A.B",Strings.format("{2}.{0}.{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 73, className : "TestStrings", methodName : "testFormat"});
		utest.Assert.equals("X.",Strings.format("{0:T,1,.}",["XYZ"]),null,{ fileName : "TestStrings.hx", lineNumber : 74, className : "TestStrings", methodName : "testFormat"});
		utest.Assert.equals("{0INVALIDMODIFIER}",Strings.format("{0INVALIDMODIFIER}",["X"]),null,{ fileName : "TestStrings.hx", lineNumber : 75, className : "TestStrings", methodName : "testFormat"});
		utest.Assert.equals("$1,000.01",Strings.format("{0:C}",[1000.01]),null,{ fileName : "TestStrings.hx", lineNumber : 76, className : "TestStrings", methodName : "testFormat"});
		utest.Assert.equals("€ 1.000,01",Strings.format("{0:C}",[1000.01],null,thx.cultures.ItIT.getCulture()),null,{ fileName : "TestStrings.hx", lineNumber : 77, className : "TestStrings", methodName : "testFormat"});
	}
	,testHumanize: function() {
		utest.Assert.equals("hello world",Strings.humanize("helloWorld"),null,{ fileName : "TestStrings.hx", lineNumber : 82, className : "TestStrings", methodName : "testHumanize"});
		utest.Assert.equals("my long string",Strings.humanize("my_long_string"),null,{ fileName : "TestStrings.hx", lineNumber : 83, className : "TestStrings", methodName : "testHumanize"});
		utest.Assert.equals("ignore many",Strings.humanize("ignoreMANY"),null,{ fileName : "TestStrings.hx", lineNumber : 84, className : "TestStrings", methodName : "testHumanize"});
	}
	,testWrapColumn: function() {
		var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
		utest.Assert.equals("Lorem ipsum dolor\nsit amet,\nconsectetur\nadipisicing elit,\nsed do eiusmod\ntempor incididunt ut\nlabore et dolore\nmagna aliqua. Ut\nenim ad minim\nveniam, quis nostrud\nexercitation ullamco\nlaboris nisi ut\naliquip ex ea\ncommodo consequat.",Strings.wrapColumns(text,20),null,{ fileName : "TestStrings.hx", lineNumber : 91, className : "TestStrings", methodName : "testWrapColumn"});
		utest.Assert.equals("    Lorem ipsum\n    dolor sit amet,\n    consectetur\n    adipisicing\n    elit, sed do\n    eiusmod tempor\n    incididunt ut\n    labore et dolore\n    magna aliqua. Ut\n    enim ad minim\n    veniam, quis\n    nostrud\n    exercitation\n    ullamco laboris\n    nisi ut aliquip\n    ex ea commodo\n    consequat.",Strings.wrapColumns(text,20,"    "),null,{ fileName : "TestStrings.hx", lineNumber : 108, className : "TestStrings", methodName : "testWrapColumn"});
	}
	,testWrapColumnPreserveNewLines: function() {
		var text = "Lorem ipsum dolor sit amet,\n\nconsectetur adipisicing elit";
		utest.Assert.equals("Lorem ipsum dolor\nsit amet,\n\nconsectetur\nadipisicing elit",Strings.wrapColumns(text,18),null,{ fileName : "TestStrings.hx", lineNumber : 133, className : "TestStrings", methodName : "testWrapColumnPreserveNewLines"});
	}
	,testWrapColumnLong: function() {
		var text = "aaaaaaaaaa aaaa aaa aa";
		utest.Assert.equals("aaaaaaaaaa\naaaa\naaa aa",Strings.wrapColumns(text,6),null,{ fileName : "TestStrings.hx", lineNumber : 145, className : "TestStrings", methodName : "testWrapColumnLong"});
	}
	,testInterpolate: function() {
		var a = Floats.interpolatef(10,100);
		var b = Floats.interpolatef(20,200);
		var tests = [{ test : function(t) {
			return "a" + a(t) + "b" + b(t);
		}, a : "a10b20", b : "a100b200"},{ test : function(t) {
			return "a" + a(t) + "b" + b(t);
		}, a : "a10b20c10", b : "a100b200"},{ test : function(t) {
			return "a" + a(t) + "b" + b(t) + "c10";
		}, a : "a10b20", b : "a100b200c10"},{ test : function(t) {
			return "a" + a(t) + "b" + b(t) + "s";
		}, a : "a10b20s", b : "a100b200s"},{ test : function(t) {
			return "a" + a(t) + "b" + b(t);
		}, a : "a10b20s", b : "a100b200"},{ test : function(t) {
			return "a" + a(t) + "b" + b(t) + "s";
		}, a : "a10b20", b : "a100b200s"}];
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			var f = Strings.interpolatef(test.a,test.b);
			var qt = 10;
			var _g2 = 0, _g1 = qt + 1;
			while(_g2 < _g1) {
				var i = _g2++;
				var t = i / qt;
				utest.Assert.equals(test.test(t),f(t),null,{ fileName : "TestStrings.hx", lineNumber : 171, className : "TestStrings", methodName : "testInterpolate"});
			}
		}
		utest.Assert.equals("rgb(100,200,50)",Strings.interpolate(0.5,"rgb(100,200,50)","rgb(100,200,50)"),null,{ fileName : "TestStrings.hx", lineNumber : 175, className : "TestStrings", methodName : "testInterpolate"});
		utest.Assert.equals("rgb(150,125,100)",Strings.interpolate(0.5,"rgb(100,200,50)","rgb(200,50,150)"),null,{ fileName : "TestStrings.hx", lineNumber : 176, className : "TestStrings", methodName : "testInterpolate"});
	}
	,testFormatWithObjectParameter: function() {
		utest.Assert.equals("{}",Strings.format("{0}",[{ }]),null,{ fileName : "TestStrings.hx", lineNumber : 182, className : "TestStrings", methodName : "testFormatWithObjectParameter"});
	}
	,testInterpolateChars: function() {
		var f = Strings.interpolateCharsf("abc","z");
		utest.Assert.equals("abc",f(0),null,{ fileName : "TestStrings.hx", lineNumber : 188, className : "TestStrings", methodName : "testInterpolateChars"});
		utest.Assert.equals("z",f(1),null,{ fileName : "TestStrings.hx", lineNumber : 189, className : "TestStrings", methodName : "testInterpolateChars"});
		utest.Assert.equals("AAo",f(0.5),null,{ fileName : "TestStrings.hx", lineNumber : 190, className : "TestStrings", methodName : "testInterpolateChars"});
	}
	,testInterpolateChar: function() {
		var f = Strings.interpolateCharf("a","e");
		utest.Assert.equals("a",f(0),null,{ fileName : "TestStrings.hx", lineNumber : 196, className : "TestStrings", methodName : "testInterpolateChar"});
		utest.Assert.equals("c",f(0.5),null,{ fileName : "TestStrings.hx", lineNumber : 197, className : "TestStrings", methodName : "testInterpolateChar"});
		utest.Assert.equals("e",f(1),null,{ fileName : "TestStrings.hx", lineNumber : 198, className : "TestStrings", methodName : "testInterpolateChar"});
	}
	,__class__: TestStrings
}
thx.math.scale.Quantize = $hxClasses["thx.math.scale.Quantize"] = function() {
	this.x0 = 0;
	this.x1 = 1;
	this.kx = 2;
	this.i = 1;
	this._range = [];
};
thx.math.scale.Quantize.__name__ = ["thx","math","scale","Quantize"];
thx.math.scale.Quantize.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.Quantize.prototype = {
	x0: null
	,x1: null
	,kx: null
	,i: null
	,_range: null
	,scale: function(x,_) {
		return this._range[Math.max(0,Math.min(this.i,Math.floor(this.kx * (x - this.x0)))) | 0];
	}
	,getDomain: function() {
		return [this.x0,this.x1];
	}
	,domain: function(x0,x1) {
		this.x0 = x0;
		this.x1 = x1;
		this.kx = this._range.length / (x1 - x0);
		return this;
	}
	,getRange: function() {
		return this._range.copy();
	}
	,range: function(x) {
		this._range = x.copy();
		this.kx = this._range.length / (this.x1 - this.x0);
		this.i = this._range.length - 1;
		return this;
	}
	,__class__: thx.math.scale.Quantize
}
var Iterators = $hxClasses["Iterators"] = function() { }
Iterators.__name__ = ["Iterators"];
Iterators.count = function(it) {
	var i = 0;
	while( it.hasNext() ) {
		var _ = it.next();
		i++;
	}
	return i;
}
Iterators.indexOf = function(it,v,f) {
	if(null == f) f = function(v2) {
		return v == v2;
	};
	var c = 0;
	while( it.hasNext() ) {
		var i = it.next();
		if(f(i)) return c; else c++;
	}
	return -1;
}
Iterators.contains = function(it,v,f) {
	if(null == f) f = function(v2) {
		return v == v2;
	};
	var c = 0;
	while( it.hasNext() ) {
		var i = it.next();
		if(f(i)) return true;
	}
	return false;
}
Iterators.array = function(it) {
	var result = [];
	while( it.hasNext() ) {
		var v = it.next();
		result.push(v);
	}
	return result;
}
Iterators.join = function(it,glue) {
	if(glue == null) glue = ", ";
	return Iterators.array(it).join(glue);
}
Iterators.map = function(it,f) {
	var result = [], i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		result.push(f(v,i++));
	}
	return result;
}
Iterators.each = function(it,f) {
	var i = 0;
	while( it.hasNext() ) {
		var o = it.next();
		f(o,i++);
	}
}
Iterators.filter = function(it,f) {
	var result = [];
	while( it.hasNext() ) {
		var i = it.next();
		if(f(i)) result.push(i);
	}
	return result;
}
Iterators.reduce = function(it,f,initialValue) {
	var accumulator = initialValue, i = 0;
	while( it.hasNext() ) {
		var o = it.next();
		accumulator = f(accumulator,o,i++);
	}
	return accumulator;
}
Iterators.random = function(it) {
	return Arrays.random(Iterators.array(it));
}
Iterators.any = function(it,f) {
	while( it.hasNext() ) {
		var v = it.next();
		if(f(v)) return true;
	}
	return false;
}
Iterators.all = function(it,f) {
	while( it.hasNext() ) {
		var v = it.next();
		if(!f(v)) return false;
	}
	return true;
}
Iterators.last = function(it) {
	var o = null;
	while(it.hasNext()) o = it.next();
	return o;
}
Iterators.lastf = function(it,f) {
	var rev = Iterators.array(it);
	rev.reverse();
	return Arrays.lastf(rev,f);
}
Iterators.first = function(it) {
	return it.next();
}
Iterators.firstf = function(it,f) {
	while( it.hasNext() ) {
		var v = it.next();
		if(f(v)) return v;
	}
	return null;
}
Iterators.order = function(it,f) {
	return Arrays.order(Iterators.array(it),f);
}
Iterators.isIterator = function(v) {
	var fields = Reflect.isObject(v) && null == Type.getClass(v)?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
}
Iterators.prototype = {
	__class__: Iterators
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
utest.ui.common.ReportTools = $hxClasses["utest.ui.common.ReportTools"] = function() { }
utest.ui.common.ReportTools.__name__ = ["utest","ui","common","ReportTools"];
utest.ui.common.ReportTools.hasHeader = function(report,stats) {
	switch( (report.displayHeader)[1] ) {
	case 1:
		return false;
	case 2:
		if(!stats.isOk) return true;
		switch( (report.displaySuccessResults)[1] ) {
		case 1:
			return false;
		case 0:
		case 2:
			return true;
		}
		break;
	case 0:
		return true;
	}
}
utest.ui.common.ReportTools.skipResult = function(report,stats,isOk) {
	if(!stats.isOk) return false;
	return (function($this) {
		var $r;
		switch( (report.displaySuccessResults)[1] ) {
		case 1:
			$r = true;
			break;
		case 0:
			$r = false;
			break;
		case 2:
			$r = !isOk;
			break;
		}
		return $r;
	}(this));
}
utest.ui.common.ReportTools.hasOutput = function(report,stats) {
	if(!stats.isOk) return true;
	return utest.ui.common.ReportTools.hasHeader(report,stats);
}
utest.ui.common.ReportTools.prototype = {
	__class__: utest.ui.common.ReportTools
}
var haxe = haxe || {}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(str.charCodeAt(i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
			s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
		}
		return s.b.join("");
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
}
if(!thx.data) thx.data = {}
thx.data.IDataHandler = $hxClasses["thx.data.IDataHandler"] = function() { }
thx.data.IDataHandler.__name__ = ["thx","data","IDataHandler"];
thx.data.IDataHandler.prototype = {
	start: null
	,end: null
	,startObject: null
	,startField: null
	,endField: null
	,endObject: null
	,startArray: null
	,startItem: null
	,endItem: null
	,endArray: null
	,date: null
	,string: null
	,'int': null
	,'float': null
	,'null': null
	,bool: null
	,comment: null
	,__class__: thx.data.IDataHandler
}
if(!thx.json) thx.json = {}
thx.json.JsonEncoder = $hxClasses["thx.json.JsonEncoder"] = function() {
};
thx.json.JsonEncoder.__name__ = ["thx","json","JsonEncoder"];
thx.json.JsonEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.json.JsonEncoder.prototype = {
	encodedString: null
	,buf: null
	,lvl: null
	,count: null
	,start: function() {
		this.lvl = 0;
		this.buf = new StringBuf();
		this.encodedString = null;
		this.count = [];
	}
	,end: function() {
		this.encodedString = this.buf.b.join("");
		this.buf = null;
	}
	,startObject: function() {
		this.buf.add("{");
		this.count.push(0);
	}
	,startField: function(name) {
		if(this.count[this.count.length - 1]++ > 0) this.buf.add(",");
		this.buf.add(this.quote(name) + ":");
	}
	,endField: function() {
	}
	,endObject: function() {
		this.buf.add("}");
		this.count.pop();
	}
	,startArray: function() {
		this.buf.add("[");
		this.count.push(0);
	}
	,startItem: function() {
		if(this.count[this.count.length - 1]++ > 0) this.buf.add(",");
	}
	,endItem: function() {
	}
	,endArray: function() {
		this.buf.add("]");
		this.count.pop();
	}
	,date: function(d) {
		this.buf.add(d.getTime());
	}
	,string: function(s) {
		this.buf.add(this.quote(s));
	}
	,'int': function(i) {
		this.buf.add(i);
	}
	,'float': function(f) {
		this.buf.add(f);
	}
	,'null': function() {
		this.buf.add("null");
	}
	,bool: function(b) {
		this.buf.add(b?"true":"false");
	}
	,comment: function(s) {
	}
	,quote: function(s) {
		return "\"" + new EReg(".","").customReplace(new EReg("(\n)","g").replace(new EReg("(\"|\\\\)","g").replace(s,"\\$1"),"\\n"),function(r) {
			var c = r.matched(0).charCodeAt(0);
			return c >= 32 && c <= 127?String.fromCharCode(c):"\\u" + StringTools.hex(c,4);
		}) + "\"";
	}
	,__class__: thx.json.JsonEncoder
}
if(!thx.util) thx.util = {}
thx.util.Message = $hxClasses["thx.util.Message"] = function(message,params,param) {
	this.message = message;
	if(null == params) this.params = []; else this.params = params;
	if(null != param) this.params.push(param);
};
thx.util.Message.__name__ = ["thx","util","Message"];
thx.util.Message.prototype = {
	message: null
	,params: null
	,toString: function() {
		return Strings.format(this.message,this.params);
	}
	,translatef: function(translator) {
		return Strings.format(translator(this.message),this.params);
	}
	,translate: function(translator,domain) {
		if(null == domain) domain = translator.getDomain();
		var culture = thx.culture.Culture.get(domain);
		if(this.params.length == 1 && Std["is"](this.params[0],Int)) return Strings.format(translator.__(null,this.message,this.params[0],domain),this.params,null,culture); else return Strings.format(translator._(this.message,domain),this.params,null,culture);
	}
	,__class__: thx.util.Message
}
thx.json.Json = $hxClasses["thx.json.Json"] = function() { }
thx.json.Json.__name__ = ["thx","json","Json"];
thx.json.Json.nativeEncoder = null;
thx.json.Json.nativeDecoder = null;
thx.json.Json.encode = function(value) {
	if(null != thx.json.Json.nativeEncoder) return thx.json.Json.nativeEncoder(value);
	var handler = new thx.json.JsonEncoder();
	new thx.data.ValueEncoder(handler).encode(value);
	return handler.encodedString;
}
thx.json.Json.decode = function(value) {
	if(null != thx.json.Json.nativeDecoder) return thx.json.Json.nativeDecoder(value);
	var handler = new thx.data.ValueHandler();
	var r = new thx.json.JsonDecoder(handler).decode(value);
	return handler.value;
}
thx.json.Json.prototype = {
	__class__: thx.json.Json
}
thx.util.TestAll = $hxClasses["thx.util.TestAll"] = function() { }
thx.util.TestAll.__name__ = ["thx","util","TestAll"];
thx.util.TestAll.addTests = function(runner) {
	thx.util.TestTypeLocator.addTests(runner);
	runner.addCase(new thx.util.TestResults());
}
thx.util.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.util.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.util.TestAll.prototype = {
	__class__: thx.util.TestAll
}
thx.math.scale.TestPow = $hxClasses["thx.math.scale.TestPow"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestPow.__name__ = ["thx","math","scale","TestPow"];
thx.math.scale.TestPow.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestPow.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testDomain: function() {
		var scale = new thx.math.scale.Pow().exponent(2);
		var expected = [0.25,0.0,0.25,1.0,2.25];
		var values = [-0.5,0.0,0.5,1.0,1.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestPow.hx", lineNumber : 16, className : "thx.math.scale.TestPow", methodName : "testDomain"});
	}
	,testDomain12: function() {
		var scale = new thx.math.scale.Pow().exponent(2).domain([1.0,2.0]);
		var expected = [-0.25,0.0,0.417,1.0,1.75];
		var values = [0.5,1.0,1.5,2.0,2.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestPow.hx", lineNumber : 25, className : "thx.math.scale.TestPow", methodName : "testDomain12"});
	}
	,testSqrtDomain: function() {
		var scale = thx.math.scale.Pow.sqrt();
		var expected = [Math.NaN,0.0,0.5,0.707,1.0,2.0];
		var values = [-0.5,0.0,0.25,0.5,1.0,4.0];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestPow.hx", lineNumber : 34, className : "thx.math.scale.TestPow", methodName : "testSqrtDomain"});
	}
	,testSqrtDomain12: function() {
		var scale = thx.math.scale.Pow.sqrt().domain([1.0,2.0]);
		var expected = [-0.707,0.0,0.543,1.0,1.403];
		var values = [0.5,1.0,1.5,2.0,2.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestPow.hx", lineNumber : 43, className : "thx.math.scale.TestPow", methodName : "testSqrtDomain12"});
	}
	,__class__: thx.math.scale.TestPow
});
thx.util.Imports = $hxClasses["thx.util.Imports"] = function() { }
thx.util.Imports.__name__ = ["thx","util","Imports"];
thx.util.Imports.prototype = {
	__class__: thx.util.Imports
}
thx.culture.FormatParams = $hxClasses["thx.culture.FormatParams"] = function() { }
thx.culture.FormatParams.__name__ = ["thx","culture","FormatParams"];
thx.culture.FormatParams.cleanQuotes = function(p) {
	if(p.length <= 1) return p;
	var f = p.substr(0,1);
	if(("\"" == f || "'" == f) && p.substr(-1) == f) return p.substr(1,p.length - 2); else return p;
}
thx.culture.FormatParams.params = function(p,ps,alt) {
	if(null != ps && null != p) return [p].concat(ps);
	if((null == ps || ps.length == 0) && null == p) return [alt];
	if(null == ps || ps.length == 0) {
		var parts = p.split(":");
		return [parts[0]].concat(parts.length == 1?[]:parts[1].split(",").map(function(s,i) {
			if(0 == i) return s; else return thx.culture.FormatParams.cleanQuotes(s);
		}));
	}
	return ps;
}
thx.culture.FormatParams.prototype = {
	__class__: thx.culture.FormatParams
}
thx.json.JsonDecoder = $hxClasses["thx.json.JsonDecoder"] = function(handler,tabsize) {
	if(tabsize == null) tabsize = 4;
	this.handler = handler;
	this.tabsize = tabsize;
};
thx.json.JsonDecoder.__name__ = ["thx","json","JsonDecoder"];
thx.json.JsonDecoder.prototype = {
	col: null
	,line: null
	,tabsize: null
	,src: null
	,'char': null
	,pos: null
	,handler: null
	,decode: function(s) {
		this.col = 0;
		this.line = 0;
		this.src = s;
		this["char"] = null;
		this.pos = 0;
		this.ignoreWhiteSpace();
		var p = null;
		this.handler.start();
		try {
			p = this.parse();
		} catch( e ) {
			if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
				this.error("unexpected end of stream");
			} else throw(e);
		}
		this.ignoreWhiteSpace();
		if(this.pos < this.src.length) this.error("the stream contains unrecognized characters at its end");
		this.handler.end();
	}
	,ignoreWhiteSpace: function() {
		while(this.pos < this.src.length) {
			var c = this.readChar();
			switch(c) {
			case " ":
				this.col++;
				break;
			case "\n":
				this.col = 0;
				this.line++;
				break;
			case "\r":
				break;
			case "\t":
				this.col += this.tabsize;
				break;
			default:
				this["char"] = c;
				return;
			}
		}
	}
	,parse: function() {
		var c = this.readChar();
		switch(c) {
		case "{":
			this.col++;
			this.ignoreWhiteSpace();
			return this.parseObject();
		case "[":
			this.col++;
			this.ignoreWhiteSpace();
			return this.parseArray();
		case "\"":
			this["char"] = c;
			return this.parseString();
		default:
			this["char"] = c;
			return this.parseValue();
		}
	}
	,readChar: function() {
		if(null == this["char"]) {
			if(this.pos == this.src.length) throw thx.json._JsonDecoder.StreamError.Eof;
			return this.src.charAt(this.pos++);
		} else {
			var c = this["char"];
			this["char"] = null;
			return c;
		}
	}
	,expect: function(word) {
		var test = null == this["char"]?this.src.substr(this.pos,word.length):this["char"] + this.src.substr(this.pos,word.length - 1);
		if(test == word) {
			if(null == this["char"]) this.pos += word.length; else {
				this.pos += word.length - 1;
				this["char"] = null;
			}
			return true;
		} else return false;
	}
	,parseObject: function() {
		var first = true;
		this.handler.startObject();
		while(true) {
			this.ignoreWhiteSpace();
			if(this.expect("}")) break; else if(first) first = false; else if(this.expect(",")) this.ignoreWhiteSpace(); else this.error("expected ','");
			var k = this._parseString();
			this.ignoreWhiteSpace();
			if(!this.expect(":")) this.error("expected ':'");
			this.ignoreWhiteSpace();
			this.handler.startField(k);
			this.parse();
			this.handler.endField();
		}
		this.handler.endObject();
	}
	,parseArray: function() {
		this.ignoreWhiteSpace();
		var first = true;
		this.handler.startArray();
		while(true) {
			this.ignoreWhiteSpace();
			if(this.expect("]")) break; else if(first) first = false; else if(this.expect(",")) this.ignoreWhiteSpace(); else this.error("expected ','");
			this.handler.startItem();
			this.parse();
			this.handler.endItem();
		}
		this.handler.endArray();
	}
	,parseValue: function() {
		if(this.expect("true")) this.handler.bool(true); else if(this.expect("false")) this.handler.bool(false); else if(this.expect("null")) this.handler["null"](); else this.parseFloat();
	}
	,parseString: function() {
		this.handler.string(this._parseString());
	}
	,_parseString: function() {
		if(!this.expect("\"")) this.error("expected double quote");
		var buf = "";
		var esc = false;
		try {
			while(true) {
				var c = this.readChar();
				this.col++;
				if(esc) {
					switch(c) {
					case "\"":
						buf += "\"";
						break;
					case "\\":
						buf += "\\";
						break;
					case "/":
						buf += "/";
						break;
					case "b":
						buf += String.fromCharCode(8);
						break;
					case "f":
						buf += String.fromCharCode(12);
						break;
					case "n":
						buf += "\n";
						break;
					case "r":
						buf += "\r";
						break;
					case "t":
						buf += "\t";
						break;
					case "u":
						buf += String.fromCharCode(this.parseHexa());
						break;
					default:
						this.error("unexpected char " + c);
					}
					esc = false;
				} else switch(c) {
				case "\\":
					esc = true;
					break;
				case "\"":
					throw "__break__";
					break;
				default:
					buf += c;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return buf;
	}
	,parseHexa: function() {
		var v = [];
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var c = this.readChar();
			var i1 = c.toLowerCase().charCodeAt(0);
			if(!(i1 >= 48 && i1 <= 57 || i1 >= 97 && i1 <= 102)) this.error("invalid hexadecimal value " + c);
			v.push(c);
		}
		this.handler["int"](Std.parseInt("0x" + v.join("")));
		return Std.parseInt("0x" + v.join(""));
	}
	,parseFloat: function() {
		var v = "";
		if(this.expect("-")) v = "-";
		if(this.expect("0")) v += "0"; else {
			var c = this.readChar();
			var i = c.charCodeAt(0);
			if(i < 49 || i > 57) this.error("expected digit between 1 and 9");
			v += c;
			this.col++;
		}
		try {
			v += this.parseDigits();
		} catch( e ) {
			if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
				this.handler["int"](Std.parseInt(v));
				return;
			} else throw(e);
		}
		try {
			if(this.expect(".")) v += "." + this.parseDigits(1); else {
				this.handler["int"](Std.parseInt(v));
				return;
			}
			if(this.expect("e") || this.expect("E")) {
				v += "e";
				if(this.expect("+")) {
				} else if(this.expect("-")) v += "-";
				v += this.parseDigits(1);
			}
		} catch( e ) {
			if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
				this.handler["float"](Std.parseFloat(v));
				return;
			} else throw(e);
		}
		this.handler["float"](Std.parseFloat(v));
	}
	,parseDigits: function(atleast) {
		if(atleast == null) atleast = 0;
		var buf = "";
		while(true) {
			var c = null;
			try {
				c = this.readChar();
			} catch( e ) {
				if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
					if(buf.length < atleast) this.error("expected digit");
					return buf;
				} else throw(e);
			}
			var i = c.charCodeAt(0);
			if(i < 48 || i > 57) {
				if(buf.length < atleast) this.error("expected digit");
				this.col += buf.length;
				this["char"] = c;
				return buf;
			} else buf += c;
		}
		return null;
	}
	,error: function(msg) {
		var context = this.pos == this.src.length?"":"\nrest: " + (null != this["char"]?this["char"]:"") + this.src.substr(this.pos) + "...";
		throw new thx.error.Error("error at L {0} C {1}: {2}{3}",[this.line,this.col,msg,context],null,{ fileName : "JsonDecoder.hx", lineNumber : 358, className : "thx.json.JsonDecoder", methodName : "error"});
	}
	,__class__: thx.json.JsonDecoder
}
if(!thx.json._JsonDecoder) thx.json._JsonDecoder = {}
thx.json._JsonDecoder.StreamError = $hxClasses["thx.json._JsonDecoder.StreamError"] = { __ename__ : ["thx","json","_JsonDecoder","StreamError"], __constructs__ : ["Eof"] }
thx.json._JsonDecoder.StreamError.Eof = ["Eof",0];
thx.json._JsonDecoder.StreamError.Eof.toString = $estr;
thx.json._JsonDecoder.StreamError.Eof.__enum__ = thx.json._JsonDecoder.StreamError;
utest.ui.common.IReport = $hxClasses["utest.ui.common.IReport"] = function() { }
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,setHandler: null
	,__class__: utest.ui.common.IReport
}
thx.color.TestHsl = $hxClasses["thx.color.TestHsl"] = function() {
};
thx.color.TestHsl.__name__ = ["thx","color","TestHsl"];
thx.color.TestHsl.prototype = {
	testBasics: function() {
		var tests = [{ rgb : thx.color.Rgb.fromFloats(1.00,1.00,1.00), hsl : new thx.color.Hsl(0,0,1)},{ rgb : thx.color.Rgb.fromFloats(0.50,0.50,0.50), hsl : new thx.color.Hsl(0,0,0.5)},{ rgb : thx.color.Rgb.fromFloats(0.00,0.00,0.00), hsl : new thx.color.Hsl(0,0,0)},{ rgb : thx.color.Rgb.fromFloats(1.00,0.00,0.00), hsl : new thx.color.Hsl(0,1,0.5)},{ rgb : thx.color.Rgb.fromFloats(0.75,0.75,0.00), hsl : new thx.color.Hsl(60,1,0.375)},{ rgb : thx.color.Rgb.fromFloats(0.00,0.50,0.00), hsl : new thx.color.Hsl(120,1,0.25)},{ rgb : thx.color.Rgb.fromFloats(0.50,1.00,1.00), hsl : new thx.color.Hsl(180,1,0.75)},{ rgb : thx.color.Rgb.fromFloats(0.50,0.50,1.00), hsl : new thx.color.Hsl(240,1,0.75)},{ rgb : thx.color.Rgb.fromFloats(0.75,0.25,0.75), hsl : new thx.color.Hsl(300,0.5,0.5)}];
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			utest.Assert.isTrue(thx.color.Rgb.equals(test.rgb,test.hsl),"expected " + test.rgb + " but was " + test.hsl + " for " + test.hsl.toHslString(),{ fileName : "TestHsl.hx", lineNumber : 28, className : "thx.color.TestHsl", methodName : "testBasics"});
			var c = thx.color.Hsl.toHsl(test.rgb);
			utest.Assert.isTrue(thx.color.Rgb.equals(c,test.hsl),"expected " + c + " but was " + test.hsl + " for " + test.hsl.toHslString(),{ fileName : "TestHsl.hx", lineNumber : 30, className : "thx.color.TestHsl", methodName : "testBasics"});
		}
	}
	,__class__: thx.color.TestHsl
}
var Iterables = $hxClasses["Iterables"] = function() { }
Iterables.__name__ = ["Iterables"];
Iterables.count = function(it) {
	return Iterators.count(it.iterator());
}
Iterables.indexOf = function(it,v,f) {
	return Iterators.indexOf(it.iterator(),v,f);
}
Iterables.contains = function(it,v,f) {
	return Iterators.contains(it.iterator(),v,f);
}
Iterables.array = function(it) {
	return Iterators.array(it.iterator());
}
Iterables.join = function(it,glue) {
	if(glue == null) glue = ", ";
	return Iterators.array(it.iterator()).join(glue);
}
Iterables.map = function(it,f) {
	return Iterators.map(it.iterator(),f);
}
Iterables.each = function(it,f) {
	return Iterators.each(it.iterator(),f);
}
Iterables.filter = function(it,f) {
	return Iterators.filter(it.iterator(),f);
}
Iterables.reduce = function(it,f,initialValue) {
	return Iterators.reduce(it.iterator(),f,initialValue);
}
Iterables.random = function(it) {
	return Arrays.random(Iterators.array(it.iterator()));
}
Iterables.any = function(it,f) {
	return Iterators.any(it.iterator(),f);
}
Iterables.all = function(it,f) {
	return Iterators.all(it.iterator(),f);
}
Iterables.last = function(it) {
	return Iterators.last(it.iterator());
}
Iterables.lastf = function(it,f) {
	return Iterators.lastf(it.iterator(),f);
}
Iterables.first = function(it) {
	return it.iterator().next();
}
Iterables.firstf = function(it,f) {
	return Iterators.firstf(it.iterator(),f);
}
Iterables.order = function(it,f) {
	return Arrays.order(Iterators.array(it.iterator()),f);
}
Iterables.isIterable = function(v) {
	var fields = Reflect.isObject(v) && null == Type.getClass(v)?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
}
Iterables.prototype = {
	__class__: Iterables
}
thx.validation.StringLengthValidator = $hxClasses["thx.validation.StringLengthValidator"] = function(minlength,maxlength) {
	if(minlength == null) minlength = 0;
	this.minLength = minlength;
	this.maxLength = maxlength;
};
thx.validation.StringLengthValidator.__name__ = ["thx","validation","StringLengthValidator"];
thx.validation.StringLengthValidator.__super__ = thx.validation.Validator;
thx.validation.StringLengthValidator.prototype = $extend(thx.validation.Validator.prototype,{
	minLength: null
	,maxLength: null
	,validate: function(value) {
		if(value.length < this.minLength) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0} character(s) long",[this.minLength],null)]); else if(null != this.maxLength && value.length > this.maxLength) return thx.util.Result.Failure([new thx.util.Message("value should be shorter than {0} character(s)",[this.maxLength],null)]); else return thx.util.Result.Ok;
	}
	,__class__: thx.validation.StringLengthValidator
});
utest.ui.Report = $hxClasses["utest.ui.Report"] = function() { }
utest.ui.Report.__name__ = ["utest","ui","Report"];
utest.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	report = new utest.ui.text.HtmlReport(runner,null,true);
	if(null == displaySuccessResults) report.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors; else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults; else report.displayHeader = headerDisplayMode;
	return report;
}
utest.ui.Report.prototype = {
	__class__: utest.ui.Report
}
thx.languages.En = $hxClasses["thx.languages.En"] = function() {
	this.name = "en";
	this.english = "English";
	this["native"] = "English";
	this.iso2 = "en";
	this.iso3 = "eng";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
};
thx.languages.En.__name__ = ["thx","languages","En"];
thx.languages.En.__properties__ = {get_language:"getLanguage"}
thx.languages.En.language = null;
thx.languages.En.getLanguage = function() {
	if(null == thx.languages.En.language) thx.languages.En.language = new thx.languages.En();
	return thx.languages.En.language;
}
thx.languages.En.__super__ = thx.culture.Language;
thx.languages.En.prototype = $extend(thx.culture.Language.prototype,{
	__class__: thx.languages.En
});
thx.cultures.EnUS = $hxClasses["thx.cultures.EnUS"] = function() {
	this.language = thx.languages.En.getLanguage();
	this.name = "en-US";
	this.english = "English (United States)";
	this["native"] = "English (United States)";
	this.date = new thx.culture.core.DateTimeInfo(["January","February","March","April","May","June","July","August","September","October","November","December",""],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Su","Mo","Tu","We","Th","Fr","Sa"],"AM","PM","/",":",0,"%B, %Y","%B %d","%A, %B %d, %Y","%f/%e/%Y","%a, %d %b %Y %H:%M:%S GMT","%A, %B %d, %Y %l:%M:%S %p","%Y-%m-%d %H:%M:%SZ","%Y-%m-%dT%H:%M:%S","%l:%M:%S %p","%l:%M %p");
	this.symbolNaN = "NaN";
	this.symbolPercent = "%";
	this.symbolPermille = "‰";
	this.signNeg = "-";
	this.signPos = "+";
	this.symbolNegInf = "-Infinity";
	this.symbolPosInf = "Infinity";
	this.number = new thx.culture.core.NumberInfo(2,".",[3],",","-n","n");
	this.currency = new thx.culture.core.NumberInfo(2,".",[3],",","($n)","$n");
	this.percent = new thx.culture.core.NumberInfo(2,".",[3],",","-n %","n %");
	this.pluralRule = 1;
	this.englishCurrency = "US Dollar";
	this.nativeCurrency = "US Dollar";
	this.currencySymbol = "$";
	this.currencyIso = "USD";
	this.englishRegion = "United States";
	this.nativeRegion = "United States";
	this.iso2 = "US";
	this.iso3 = "USA";
	this.isMetric = false;
	thx.culture.Culture.add(this);
};
thx.cultures.EnUS.__name__ = ["thx","cultures","EnUS"];
thx.cultures.EnUS.__properties__ = {get_culture:"getCulture"}
thx.cultures.EnUS.culture = null;
thx.cultures.EnUS.getCulture = function() {
	if(null == thx.cultures.EnUS.culture) thx.cultures.EnUS.culture = new thx.cultures.EnUS();
	return thx.cultures.EnUS.culture;
}
thx.cultures.EnUS.__super__ = thx.culture.Culture;
thx.cultures.EnUS.prototype = $extend(thx.culture.Culture.prototype,{
	__class__: thx.cultures.EnUS
});
if(!thx.xml) thx.xml = {}
thx.xml.DocumentFormat = $hxClasses["thx.xml.DocumentFormat"] = function() {
	this.stripComments = false;
};
thx.xml.DocumentFormat.__name__ = ["thx","xml","DocumentFormat"];
thx.xml.DocumentFormat.prototype = {
	nodeFormat: null
	,stripComments: null
	,format: function(node) {
		return this.formatNode(node);
	}
	,formatNode: function(node) {
		var t = node.nodeType;
		if(Xml.Element == t) return this.formatElement(node); else if(Xml.PCData == t) return this.formatPCData(node); else if(Xml.CData == t) return this.formatCData(node); else if(Xml.Document == t) return this.formatDocument(node); else if(Xml.DocType == t) return this.formatDocType(node); else if(Xml.Prolog == t) return this.formatProlog(node); else if(Xml.Comment == t) return this.formatComment(node); else return (function($this) {
			var $r;
			throw "invalid node type: " + Std.string(t);
			return $r;
		}(this));
	}
	,formatElement: function(node) {
		if(this.isEmpty(node)) return this.formatEmptyElement(node); else return this.formatOpenElement(node) + this.formatChildren(node) + this.formatCloseElement(node);
	}
	,formatEmptyElement: function(node) {
		return this.nodeFormat.formatEmptyElement(node);
	}
	,formatOpenElement: function(node) {
		return this.nodeFormat.formatOpenElement(node);
	}
	,formatCloseElement: function(node) {
		return this.nodeFormat.formatCloseElement(node);
	}
	,formatChildren: function(node) {
		var buf = new StringBuf();
		var $it0 = node.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			buf.add(this.formatNode(child));
		}
		return buf.b.join("");
	}
	,formatPCData: function(node) {
		return this.nodeFormat.formatPCData(node);
	}
	,formatCData: function(node) {
		return this.nodeFormat.formatCData(node);
	}
	,formatDocument: function(node) {
		return this.formatChildren(node);
	}
	,formatDocType: function(node) {
		return this.nodeFormat.formatDocType(node);
	}
	,formatProlog: function(node) {
		return this.nodeFormat.formatProlog(node);
	}
	,formatComment: function(node) {
		if(this.stripComments) return ""; else return this.nodeFormat.formatComment(node);
	}
	,isEmpty: function(node) {
		return !node.iterator().hasNext();
	}
	,__class__: thx.xml.DocumentFormat
}
thx.xml.AutoDocumentFormat = $hxClasses["thx.xml.AutoDocumentFormat"] = function() {
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this._level = 0;
	this._begin = true;
};
thx.xml.AutoDocumentFormat.__name__ = ["thx","xml","AutoDocumentFormat"];
thx.xml.AutoDocumentFormat.__super__ = thx.xml.DocumentFormat;
thx.xml.AutoDocumentFormat.prototype = $extend(thx.xml.DocumentFormat.prototype,{
	indent: null
	,newline: null
	,wrapColumns: null
	,_level: null
	,_begin: null
	,indentWrap: function(content) {
		return this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
	}
	,format: function(node) {
		return Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
	}
	,formatDocType: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
	}
	,formatProlog: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
	}
	,formatComment: function(node) {
		if(this.stripComments) return ""; else return this.indentWrap(this.nodeFormat.formatComment(node));
	}
	,formatEmptyElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
	}
	,formatOpenElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
	}
	,formatCloseElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
	}
	,formatChildren: function(node) {
		this._level++;
		var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
		this._level--;
		return content;
	}
	,formatDocument: function(node) {
		return thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	}
	,formatPCData: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
	}
	,formatCData: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
	}
	,__class__: thx.xml.AutoDocumentFormat
});
if(!thx.error) thx.error = {}
thx.error.Error = $hxClasses["thx.error.Error"] = function(message,params,param,pos) {
	thx.util.Message.call(this,message,params,param);
	this.pos = pos;
};
thx.error.Error.__name__ = ["thx","error","Error"];
thx.error.Error.__super__ = thx.util.Message;
thx.error.Error.prototype = $extend(thx.util.Message.prototype,{
	pos: null
	,inner: null
	,setInner: function(inner) {
		this.inner = inner;
		return this;
	}
	,toStringError: function(pattern) {
		var prefix = Strings.format(null == pattern?thx.error.Error.errorPositionPattern:pattern,[this.pos.className,this.pos.methodName,this.pos.lineNumber,this.pos.fileName,this.pos.customParams]);
		return prefix + this.toString();
	}
	,toString: function() {
		try {
			return Strings.format(this.message,this.params);
		} catch( e ) {
			var ps = this.pos.className + "." + this.pos.methodName + "(" + this.pos.lineNumber + ")";
			haxe.Log.trace("wrong parameters passed for pattern '" + this.message + "' at " + ps,{ fileName : "Error.hx", lineNumber : 42, className : "thx.error.Error", methodName : "toString"});
			return "";
		}
	}
	,__class__: thx.error.Error
});
thx.csv.CsvDecoder = $hxClasses["thx.csv.CsvDecoder"] = function(handler,check_type,delimiter,emptytonull,newline,quote,doublequotations,trim_whitespace) {
	if(trim_whitespace == null) trim_whitespace = true;
	if(doublequotations == null) doublequotations = true;
	if(quote == null) quote = "\"";
	if(newline == null) newline = "\r\n|\n|\r";
	if(emptytonull == null) emptytonull = false;
	if(delimiter == null) delimiter = ",";
	if(check_type == null) check_type = true;
	this.handler = handler;
	this.delimiter = delimiter;
	this.emptytonull = emptytonull;
	this.quote = quote;
	this.doublequotations = doublequotations;
	this.trim_whitespace = trim_whitespace;
	this.check_type = check_type;
	if(newline != "\r\n|\n|\r") newline = thx.text.ERegs.escapeERegChars(newline);
	this.newline = newline;
	this._end = new EReg("(" + thx.text.ERegs.escapeERegChars(delimiter) + "|" + newline + "|$)","");
};
thx.csv.CsvDecoder.__name__ = ["thx","csv","CsvDecoder"];
thx.csv.CsvDecoder.prototype = {
	delimiter: null
	,emptytonull: null
	,newline: null
	,quote: null
	,doublequotations: null
	,trim_whitespace: null
	,line: null
	,column: null
	,check_type: null
	,handler: null
	,_s: null
	,_end: null
	,_typers: null
	,decode: function(s) {
		this._s = s;
		this._typers = [];
		this.line = 1;
		this.handler.start();
		this.handler.startArray();
		while(this._s.length > 0) this.parseLine();
		this.handler.endArray();
		this.handler.end();
	}
	,parseLine: function() {
		this.handler.startItem();
		this.column = 1;
		this.handler.startArray();
		while(this.parseValue()) this.column++;
		this.handler.endArray();
		this.line++;
		this.handler.endItem();
	}
	,parseValue: function() {
		if(this._s.substr(0,1) == this.quote) {
			var pos = this._s.indexOf(this.quote,1);
			if(pos != -1) {
				if(this.doublequotations) while(this._s.substr(pos + 1,1) == this.quote) pos = this._s.indexOf(this.quote,pos + 2);
			} else pos = this._s.length;
			var v = this._s.substr(1,pos - 1);
			this._s = this._s.substr(pos + 1);
			this.typeString(StringTools.replace(v,this.quote + this.quote,this.quote));
			if(!this._end.match(this._s)) this.error(this._s);
			this._s = this._end.matchedRight();
			return this._end.matched(0) == this.delimiter;
		}
		if(!this._end.match(this._s)) this.error(this._s);
		this._s = this._end.matchedRight();
		if(this.line == 1) {
			var v = this._end.matchedLeft();
			if(this.trim_whitespace) v = StringTools.trim(v);
			this.typeToken(v);
		} else {
			var v = this._end.matchedLeft();
			if(this.trim_whitespace) v = StringTools.trim(v);
			(this.getTyper(v))(v);
		}
		if(this._end.matched(0) == this.delimiter) return true; else {
			this._s = StringTools.ltrim(this._s);
			return false;
		}
	}
	,error: function(e) {
		return (function($this) {
			var $r;
			throw new thx.error.Error("invalid string value '{0}' at line {1}, column {2}",[Strings.ellipsis(e,50),$this.line,$this.column],null,{ fileName : "CsvDecoder.hx", lineNumber : 123, className : "thx.csv.CsvDecoder", methodName : "error"});
			return $r;
		}(this));
	}
	,getTyper: function(s) {
		var typer = this._typers[this.column];
		if(null == typer) {
			if(s == "") return this.typeToken.$bind(this);
			if(!this.check_type) typer = this._typers[this.column] = this.typeString.$bind(this); else if(Ints.canParse(s)) typer = this._typers[this.column] = this.typeInt.$bind(this); else if(thx.number.NumberParser.canParse(s,thx.culture.Culture.getDefaultCulture())) typer = this._typers[this.column] = this.typeCultureFloat.$bind(this); else if(Floats.canParse(s)) typer = this._typers[this.column] = this.typeFloat.$bind(this); else if(Bools.canParse(s)) typer = this._typers[this.column] = this.typeBool.$bind(this); else if(Dates.canParse(s)) typer = this._typers[this.column] = this.typeDate.$bind(this); else typer = this._typers[this.column] = this.typeString.$bind(this);
		}
		return typer;
	}
	,typeToken: function(s) {
		if(!this.check_type) this.typeString(s); else if(Ints.canParse(s)) this.typeInt(s); else if(Floats.canParse(s)) this.typeFloat(s); else if(Bools.canParse(s)) this.typeBool(s); else if(Dates.canParse(s)) this.typeDate(s); else this.typeString(s);
	}
	,typeInt: function(s) {
		this.handler.startItem();
		this.handler["int"](Ints.parse(s));
		this.handler.endItem();
	}
	,typeCultureFloat: function(s) {
		this.handler.startItem();
		this.handler["float"](thx.number.NumberParser.parse(s,thx.culture.Culture.getDefaultCulture()));
		this.handler.endItem();
	}
	,typeFloat: function(s) {
		this.handler.startItem();
		this.handler["float"](Floats.parse(s));
		this.handler.endItem();
	}
	,typeBool: function(s) {
		this.handler.startItem();
		this.handler.bool(Bools.parse(s));
		this.handler.endItem();
	}
	,typeDate: function(s) {
		this.handler.startItem();
		this.handler.date(Dates.parse(s));
		this.handler.endItem();
	}
	,typeString: function(s) {
		this.handler.startItem();
		if(s == "" && this.emptytonull) this.handler["null"](); else this.handler.string(s);
		this.handler.endItem();
	}
	,__class__: thx.csv.CsvDecoder
}
var Arrays = $hxClasses["Arrays"] = function() { }
Arrays.__name__ = ["Arrays"];
Arrays.addIf = function(arr,condition,value) {
	if(null != condition) {
		if(condition) arr.push(value);
	} else if(null != value) arr.push(value);
	return arr;
}
Arrays.add = function(arr,value) {
	arr.push(value);
	return arr;
}
Arrays["delete"] = function(arr,value) {
	arr.remove(value);
	return arr;
}
Arrays.removef = function(arr,f) {
	var index = -1;
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(f(arr[i])) {
			index = i;
			break;
		}
	}
	if(index < 0) return false;
	arr.splice(index,1);
	return true;
}
Arrays.deletef = function(arr,f) {
	Arrays.removef(arr,f);
	return arr;
}
Arrays.filter = function(arr,f) {
	var result = [];
	var _g = 0;
	while(_g < arr.length) {
		var i = arr[_g];
		++_g;
		if(f(i)) result.push(i);
	}
	return result;
}
Arrays.min = function(arr,f) {
	if(arr.length == 0) return null;
	if(null == f) {
		var a = arr[0], p = 0;
		var comp = Dynamics.comparef(a);
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(comp(a,arr[i]) > 0) a = arr[p = i];
		}
		return arr[p];
	} else {
		var a = f(arr[0]), p = 0, b;
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(a > (b = f(arr[i]))) {
				a = b;
				p = i;
			}
		}
		return arr[p];
	}
}
Arrays.floatMin = function(arr,f) {
	if(arr.length == 0) return Math.NaN;
	var a = f(arr[0]), b;
	var _g1 = 1, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a > (b = f(arr[i]))) a = b;
	}
	return a;
}
Arrays.bounds = function(arr,f) {
	if(arr.length == 0) return null;
	if(null == f) {
		var a = arr[0], p = 0;
		var b = arr[0], q = 0;
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var comp = Dynamics.comparef(a);
			if(comp(a,arr[i]) > 0) a = arr[p = i];
			if(comp(b,arr[i]) < 0) b = arr[q = i];
		}
		return [arr[p],arr[q]];
	} else {
		var a = f(arr[0]), p = 0, b;
		var c = f(arr[0]), q = 0, d;
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(a > (b = f(arr[i]))) {
				a = b;
				p = i;
			}
		}
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(c < (d = f(arr[i]))) {
				c = d;
				q = i;
			}
		}
		return [arr[p],arr[q]];
	}
}
Arrays.boundsFloat = function(arr,f) {
	if(arr.length == 0) return null;
	var a = f(arr[0]), b;
	var c = f(arr[0]), d;
	var _g1 = 1, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a > (b = f(arr[i]))) a = b;
		if(c < (d = f(arr[i]))) c = d;
	}
	return [a,c];
}
Arrays.max = function(arr,f) {
	if(arr.length == 0) return null;
	if(null == f) {
		var a = arr[0], p = 0;
		var comp = Dynamics.comparef(a);
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(comp(a,arr[i]) < 0) a = arr[p = i];
		}
		return arr[p];
	} else {
		var a = f(arr[0]), p = 0, b;
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(a < (b = f(arr[i]))) {
				a = b;
				p = i;
			}
		}
		return arr[p];
	}
}
Arrays.floatMax = function(arr,f) {
	if(arr.length == 0) return Math.NaN;
	var a = f(arr[0]), b;
	var _g1 = 1, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a < (b = f(arr[i]))) a = b;
	}
	return a;
}
Arrays.flatten = function(arr) {
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var v = arr[_g];
		++_g;
		r = r.concat(v);
	}
	return r;
}
Arrays.map = function(arr,f) {
	return arr.map(f);
}
Arrays.reduce = function(arr,f,initialValue) {
	return arr.reduce(f,initialValue);
}
Arrays.order = function(arr,f) {
	arr.sort(null == f?Dynamics.compare:f);
	return arr;
}
Arrays.orderMultiple = function(arr,f,rest) {
	var swap = true, t;
	rest.remove(arr);
	while(swap) {
		swap = false;
		var _g1 = 0, _g = arr.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			if(f(arr[i],arr[i + 1]) > 0) {
				swap = true;
				t = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = t;
				var _g2 = 0;
				while(_g2 < rest.length) {
					var a = rest[_g2];
					++_g2;
					t = a[i];
					a[i] = a[i + 1];
					a[i + 1] = t;
				}
			}
		}
	}
}
Arrays.split = function(arr,f) {
	if(null == f) f = function(v,_) {
		return v == null;
	};
	var arrays = [], i = -1, values = [], value;
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(f(value = arr[i1],i1)) values = []; else {
			if(values.length == 0) arrays.push(values);
			values.push(value);
		}
	}
	return arrays;
}
Arrays.exists = function(arr,value,f) {
	if(null != f) {
		var _g = 0;
		while(_g < arr.length) {
			var v = arr[_g];
			++_g;
			if(f(v)) return true;
		}
	} else {
		var _g = 0;
		while(_g < arr.length) {
			var v = arr[_g];
			++_g;
			if(v == value) return true;
		}
	}
	return false;
}
Arrays.format = function(v,param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"J");
	var format = params.shift();
	switch(format) {
	case "J":
		if(v.length == 0) {
			var empty = null == params[1]?"[]":params[1];
			return empty;
		}
		var sep = null == params[2]?", ":params[2];
		var max = params[3] == null?null:"" == params[3]?null:Std.parseInt(params[3]);
		if(null != max && max < v.length) {
			var elipsis = null == params[4]?" ...":params[4];
			return v.copy().splice(0,max).map(function(d,i) {
				return Dynamics.format(d,params[0],null,null,culture);
			}).join(sep) + elipsis;
		} else return v.map(function(d,i) {
			return Dynamics.format(d,params[0],null,null,culture);
		}).join(sep);
		break;
	case "C":
		return Ints.format(v.length,"I",[],culture);
	default:
		throw "Unsupported array format: " + format;
	}
}
Arrays.formatf = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"J");
	var format = params.shift();
	switch(format) {
	case "J":
		return function(v) {
			if(v.length == 0) {
				var empty = null == params[1]?"[]":params[1];
				return empty;
			}
			var sep = null == params[2]?", ":params[2];
			var max = params[3] == null?null:"" == params[3]?null:Std.parseInt(params[3]);
			if(null != max && max < v.length) {
				var elipsis = null == params[4]?" ...":params[4];
				return v.copy().splice(0,max).map(function(d,i) {
					return Dynamics.format(d,params[0],null,null,culture);
				}).join(sep) + elipsis;
			} else return v.map(function(d,i) {
				return Dynamics.format(d,params[0],null,null,culture);
			}).join(sep);
		};
	case "C":
		var f = Ints.formatf("I",[],culture);
		return function(v) {
			return f(v.length);
		};
	default:
		throw "Unsupported array format: " + format;
	}
}
Arrays.interpolate = function(v,a,b,equation) {
	return (Arrays.interpolatef(a,b,equation))(v);
}
Arrays.interpolatef = function(a,b,equation) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Floats.interpolatef(a[i],b[i],equation));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			return function(_) {
				return v[0];
			};
		})(v));
		i++;
	}
	return function(t) {
		return functions.map(function(f,_) {
			return f(t);
		});
	};
}
Arrays.interpolateStrings = function(v,a,b,equation) {
	return (Arrays.interpolateStringsf(a,b,equation))(v);
}
Arrays.interpolateStringsf = function(a,b,equation) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Strings.interpolatef(a[i],b[i],equation));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			return function(_) {
				return v[0];
			};
		})(v));
		i++;
	}
	return function(t) {
		return functions.map(function(f,_) {
			return f(t);
		});
	};
}
Arrays.interpolateInts = function(v,a,b,equation) {
	return (Arrays.interpolateIntsf(a,b,equation))(v);
}
Arrays.interpolateIntsf = function(a,b,equation) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Ints.interpolatef(a[i],b[i],equation));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			return function(_) {
				return v[0];
			};
		})(v));
		i++;
	}
	return function(t) {
		return functions.map(function(f,_) {
			return f(t);
		});
	};
}
Arrays.indexOf = function(arr,el) {
	return arr.indexOf(el);
}
Arrays.every = function(arr,f) {
	return arr.every(f);
}
Arrays.each = function(arr,f) {
	arr.forEach(f);
}
Arrays.any = function(arr,f) {
	return Iterators.any(arr.iterator(),f);
}
Arrays.all = function(arr,f) {
	return Iterators.all(arr.iterator(),f);
}
Arrays.random = function(arr) {
	return arr[Std.random(arr.length)];
}
Arrays.string = function(arr) {
	return "[" + arr.map(function(v,_) {
		return Dynamics.string(v);
	}).join(", ") + "]";
}
Arrays.last = function(arr) {
	return arr[arr.length - 1];
}
Arrays.lastf = function(arr,f) {
	var i = arr.length;
	while(--i >= 0) if(f(arr[i])) return arr[i];
	return null;
}
Arrays.first = function(arr) {
	return arr[0];
}
Arrays.firstf = function(arr,f) {
	var _g = 0;
	while(_g < arr.length) {
		var v = arr[_g];
		++_g;
		if(f(v)) return v;
	}
	return null;
}
Arrays.bisect = function(a,x,lo,hi) {
	if(lo == null) lo = 0;
	return Arrays.bisectRight(a,x,lo,hi);
}
Arrays.bisectRight = function(a,x,lo,hi) {
	if(lo == null) lo = 0;
	if(null == hi) hi = a.length;
	while(lo < hi) {
		var mid = lo + hi >> 1;
		if(x < a[mid]) hi = mid; else lo = mid + 1;
	}
	return lo;
}
Arrays.bisectLeft = function(a,x,lo,hi) {
	if(lo == null) lo = 0;
	if(null == hi) hi = a.length;
	while(lo < hi) {
		var mid = lo + hi >> 1;
		if(a[mid] < x) lo = mid + 1; else hi = mid;
	}
	return lo;
}
Arrays.nearest = function(a,x,f) {
	var delta = [];
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		delta.push({ i : i, v : Math.abs(f(a[i]) - x)});
	}
	delta.sort(function(a1,b) {
		return Floats.compare(a1.v,b.v);
	});
	return a[delta[0].i];
}
Arrays.compare = function(a,b) {
	var v;
	if((v = a.length - b.length) != 0) return v;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if((v = Dynamics.compare(a[i],b[i])) != 0) return v;
	}
	return 0;
}
Arrays.product = function(a) {
	if(a.length == 0) return [];
	var arr = a.copy(), result = [], temp;
	var _g = 0, _g1 = arr[0];
	while(_g < _g1.length) {
		var value = _g1[_g];
		++_g;
		result.push([value]);
	}
	var _g1 = 1, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		temp = [];
		var _g2 = 0;
		while(_g2 < result.length) {
			var acc = result[_g2];
			++_g2;
			var _g3 = 0, _g4 = arr[i];
			while(_g3 < _g4.length) {
				var value = _g4[_g3];
				++_g3;
				temp.push(acc.copy().concat([value]));
			}
		}
		result = temp;
	}
	return result;
}
Arrays.rotate = function(a) {
	if(a.length == 0) return [];
	var result = [];
	var _g1 = 0, _g = a[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		result[i] = [];
	}
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var j = _g1++;
		var _g3 = 0, _g2 = a[0].length;
		while(_g3 < _g2) {
			var i = _g3++;
			result[i][j] = a[j][i];
		}
	}
	return result;
}
Arrays.shuffle = function(a) {
	var t = Ints.range(a.length), arr = [];
	while(t.length > 0) {
		var pos = Std.random(t.length), index = t[pos];
		t.splice(pos,1);
		arr.push(a[index]);
	}
	return arr;
}
Arrays.scanf = function(arr,weightf,incremental) {
	if(incremental == null) incremental = true;
	var tot = 0.0, weights = [];
	if(incremental) {
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			weights[i] = tot += weightf(arr[i],i);
		}
	} else {
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			weights[i] = weightf(arr[i],i);
		}
		tot = weights[weights.length - 1];
	}
	var scan = (function($this) {
		var $r;
		var scan = null;
		scan = function(v,start,end) {
			if(start == end) return arr[start];
			var mid = Math.floor((end - start) / 2) + start, value = weights[mid];
			if(v < value) return scan(v,start,mid); else return scan(v,mid + 1,end);
		};
		$r = scan;
		return $r;
	}(this));
	return function(v) {
		if(v < 0 || v > tot) return null;
		return scan(v,0,weights.length - 1);
	};
}
Arrays.prototype = {
	__class__: Arrays
}
thx.math.scale.LinearT = $hxClasses["thx.math.scale.LinearT"] = function() {
	this._domain = [0.0,1.0];
	this._range = null;
	this.f = thx.math.scale.LinearT._f;
	this._clamp = false;
	this.rescale();
};
thx.math.scale.LinearT.__name__ = ["thx","math","scale","LinearT"];
thx.math.scale.LinearT.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.LinearT._f = function(_,_1,_2) {
	return function(_3) {
		return null;
	};
}
thx.math.scale.LinearT.scaleBilinear = function(domain,range,uninterpolate,interpolate) {
	var u = uninterpolate(domain[0],domain[1]), i = interpolate(range[0],range[1],null);
	return function(x) {
		return i(u(x));
	};
}
thx.math.scale.LinearT.scalePolylinear = function(domain,range,uninterpolate,interpolate) {
	var u = [], i = [];
	var _g1 = 1, _g = domain.length;
	while(_g1 < _g) {
		var j = _g1++;
		u.push(uninterpolate(domain[j - 1],domain[j]));
		i.push(interpolate(range[j - 1],range[j],null));
	}
	return function(x) {
		var j = Arrays.bisectRight(domain,x,1,domain.length - 1) - 1;
		return i[j](u[j](x));
	};
}
thx.math.scale.LinearT.prototype = {
	_domain: null
	,_range: null
	,f: null
	,_clamp: null
	,_output: null
	,rescale: function() {
		if(null == this._range) return this;
		var linear = this._domain.length == 2?thx.math.scale.LinearT.scaleBilinear:thx.math.scale.LinearT.scalePolylinear, uninterpolate = this._clamp?Floats.uninterpolateClampf:Floats.uninterpolatef;
		this._output = linear(this._domain,this._range,uninterpolate,this.f);
		return this;
	}
	,scale: function(x,_) {
		return this._output(x);
	}
	,getDomain: function() {
		return this._domain;
	}
	,domain: function(d) {
		this._domain = d;
		return this.rescale();
	}
	,getRange: function() {
		return this._range;
	}
	,range: function(r) {
		this._range = r;
		return this.rescale();
	}
	,getInterpolate: function() {
		return this.f;
	}
	,interpolatef: function(x) {
		this.f = x;
		return this.rescale();
	}
	,getClamp: function() {
		return this._clamp;
	}
	,clamp: function(v) {
		this._clamp = v;
		return this.rescale();
	}
	,tickRange: function(m) {
		var start = Math.min(this._domain[0],this._domain[1]), stop = Math.max(this._domain[0],this._domain[1]), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / m) / 2.302585092994046)), err = m / (span / step);
		if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= -75) step *= 2;
		return { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
	}
	,ticks: function(m) {
		var range = this.tickRange(m);
		return Floats.range(range.start,range.stop,range.step);
	}
	,tickFormat: function(m) {
		var n = Math.max(0,-Math.floor(Math.log(this.tickRange(m).step) / 2.302585092994046 + .01));
		return Floats.formatf("D:" + n);
	}
	,__class__: thx.math.scale.LinearT
}
if(!utest.ui.text) utest.ui.text = {}
utest.ui.text.HtmlReport = $hxClasses["utest.ui.text.HtmlReport"] = function(runner,outputHandler,traceRedirected) {
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add(this.start.$bind(this));
	this.aggregator.onComplete.add(this.complete.$bind(this));
	if(null == outputHandler) this.setHandler(this._handler.$bind(this)); else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.HtmlReport.__name__ = ["utest","ui","text","HtmlReport"];
utest.ui.text.HtmlReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.HtmlReport.prototype = {
	traceRedirected: null
	,displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,oldTrace: null
	,_traces: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,redirectTrace: function() {
		if(this.traceRedirected) return;
		this._traces = [];
		this.oldTrace = haxe.Log.trace;
		haxe.Log.trace = this._trace.$bind(this);
	}
	,restoreTrace: function() {
		if(!this.traceRedirected) return;
		haxe.Log.trace = this.oldTrace;
	}
	,_traceTime: null
	,_trace: function(v,infos) {
		var time = haxe.Timer.stamp();
		var delta = this._traceTime == null?0:time - this._traceTime;
		this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.Stack.callStack()});
		this._traceTime = haxe.Timer.stamp();
	}
	,startTime: null
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,cls: function(stats) {
		if(stats.hasErrors) return "error"; else if(stats.hasFailures) return "failure"; else if(stats.hasWarnings) return "warn"; else return "ok";
	}
	,resultNumbers: function(buf,stats) {
		var numbers = [];
		if(stats.assertations == 1) numbers.push("<strong>1</strong> test"); else numbers.push("<strong>" + stats.assertations + "</strong> tests");
		if(stats.successes != stats.assertations) {
			if(stats.successes == 1) numbers.push("<strong>1</strong> pass"); else if(stats.successes > 0) numbers.push("<strong>" + stats.successes + "</strong> passes");
		}
		if(stats.errors == 1) numbers.push("<strong>1</strong> error"); else if(stats.errors > 0) numbers.push("<strong>" + stats.errors + "</strong> errors");
		if(stats.failures == 1) numbers.push("<strong>1</strong> failure"); else if(stats.failures > 0) numbers.push("<strong>" + stats.failures + "</strong> failures");
		if(stats.warnings == 1) numbers.push("<strong>1</strong> warning"); else if(stats.warnings > 0) numbers.push("<strong>" + stats.warnings + "</strong> warnings");
		buf.add(numbers.join(", "));
	}
	,blockNumbers: function(buf,stats) {
		buf.add("<div class=\"" + this.cls(stats) + "bg statnumbers\">");
		this.resultNumbers(buf,stats);
		buf.b[buf.b.length] = "</div>";
	}
	,formatStack: function(stack,addNL) {
		if(addNL == null) addNL = true;
		var parts = [];
		var nl = addNL?"\n":"";
		var last = null;
		var count = 1;
		var _g = 0, _g1 = haxe.Stack.toString(stack).split("\n");
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(StringTools.trim(part) == "") continue;
			if(-1 < part.indexOf("Called from utest.")) continue;
			if(part == last) parts[parts.length - 1] = part + " (#" + ++count + ")"; else {
				count = 1;
				parts.push(last = part);
			}
		}
		var s = "<ul><li>" + parts.join("</li>" + nl + "<li>") + "</li></ul>" + nl;
		return "<div>" + s + "</div>" + nl;
	}
	,addFixture: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b[buf.b.length] = "<li class=\"fixture\"><div class=\"li\">";
		buf.add("<span class=\"" + this.cls(result.stats) + "bg fixtureresult\">");
		if(result.stats.isOk) buf.b[buf.b.length] = "OK "; else if(result.stats.hasErrors) buf.b[buf.b.length] = "ERROR "; else if(result.stats.hasFailures) buf.b[buf.b.length] = "FAILURE "; else if(result.stats.hasWarnings) buf.b[buf.b.length] = "WARNING ";
		buf.b[buf.b.length] = "</span>";
		buf.b[buf.b.length] = "<div class=\"fixturedetails\">";
		buf.add("<strong>" + name + "</strong>");
		buf.b[buf.b.length] = ": ";
		this.resultNumbers(buf,result.stats);
		var messages = [];
		var $it0 = result.iterator();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			var $e = (assertation);
			switch( $e[1] ) {
			case 0:
				var pos = $e[2];
				break;
			case 1:
				var pos = $e[3], msg = $e[2];
				messages.push("<strong>line " + pos.lineNumber + "</strong>: <em>" + StringTools.htmlEscape(msg) + "</em>");
				break;
			case 2:
				var s = $e[3], e = $e[2];
				messages.push("<strong>error</strong>: <em>" + this.getErrorDescription(e) + "</em>\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 3:
				var s = $e[3], e = $e[2];
				messages.push("<strong>setup error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 4:
				var s = $e[3], e = $e[2];
				messages.push("<strong>tear-down error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 5:
				var s = $e[3], missedAsyncs = $e[2];
				messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
				break;
			case 6:
				var s = $e[3], e = $e[2];
				messages.push("<strong>async error</strong>: " + this.getErrorDescription(e) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(s,e));
				break;
			case 7:
				var msg = $e[2];
				messages.push(StringTools.htmlEscape(msg));
				break;
			}
		}
		if(messages.length > 0) {
			buf.b[buf.b.length] = "<div class=\"testoutput\">";
			buf.add(messages.join("<br/>"));
			buf.b[buf.b.length] = "</div>\n";
		}
		buf.b[buf.b.length] = "</div>\n";
		buf.b[buf.b.length] = "</div></li>\n";
	}
	,getErrorDescription: function(e) {
		return Std.string(e);
	}
	,getErrorStack: function(s,e) {
		return this.formatStack(s);
	}
	,addClass: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b[buf.b.length] = "<li>";
		buf.add("<h2 class=\"classname\">" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b[buf.b.length] = "<ul>\n";
		var _g = 0, _g1 = result.methodNames();
		while(_g < _g1.length) {
			var mname = _g1[_g];
			++_g;
			this.addFixture(buf,result.get(mname),mname,isOk);
		}
		buf.b[buf.b.length] = "</ul>\n";
		buf.b[buf.b.length] = "</li>\n";
	}
	,addPackages: function(buf,result,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		buf.b[buf.b.length] = "<ul id=\"utest-results-packages\">\n";
		var _g = 0, _g1 = result.packageNames(false);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			this.addPackage(buf,result.getPackage(name),name,isOk);
		}
		buf.b[buf.b.length] = "</ul>\n";
	}
	,addPackage: function(buf,result,name,isOk) {
		if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
		if(name == "" && result.classNames().length == 0) return;
		buf.b[buf.b.length] = "<li>";
		buf.add("<h2>" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b[buf.b.length] = "<ul>\n";
		var _g = 0, _g1 = result.classNames();
		while(_g < _g1.length) {
			var cname = _g1[_g];
			++_g;
			this.addClass(buf,result.getClass(cname),cname,isOk);
		}
		buf.b[buf.b.length] = "</ul>\n";
		buf.b[buf.b.length] = "</li>\n";
	}
	,getHeader: function() {
		var buf = new StringBuf();
		if(!utest.ui.common.ReportTools.hasHeader(this,this.result.stats)) return "";
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		var msg = "TEST OK";
		if(this.result.stats.hasErrors) msg = "TEST ERRORS"; else if(this.result.stats.hasFailures) msg = "TEST FAILED"; else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
		buf.add("<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n");
		buf.b[buf.b.length] = "<div class=\"headerinfo\">";
		this.resultNumbers(buf,this.result.stats);
		buf.add(" performed on <strong>" + utest.ui.text.HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ");
		return buf.b.join("");
	}
	,getTrace: function() {
		var buf = new StringBuf();
		if(this._traces == null || this._traces.length == 0) return "";
		buf.b[buf.b.length] = "<div class=\"trace\"><h2>traces</h2><ol>";
		var _g = 0, _g1 = this._traces;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			buf.b[buf.b.length] = "<li><div class=\"li\">";
			var stack = StringTools.replace(this.formatStack(t.stack,false),"'","\\'");
			var method = "<span class=\"tracepackage\">" + t.infos.className + "</span><br/>" + t.infos.methodName + "(" + t.infos.lineNumber + ")";
			buf.add("<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack + "')\" onmouseout=\"utestRemoveTooltip()\">");
			buf.b[buf.b.length] = method == null?"null":method;
			buf.b[buf.b.length] = "</span><span class=\"tracetime\">";
			buf.add("@ " + this.formatTime(t.time));
			if(Math.round(t.delta * 1000) > 0) buf.add(", ~" + this.formatTime(t.delta));
			buf.b[buf.b.length] = "</span><span class=\"tracemsg\">";
			buf.add(StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n"));
			buf.b[buf.b.length] = "</span><div class=\"clr\"></div></div></li>";
		}
		buf.b[buf.b.length] = "</ol></div>";
		return buf.b.join("");
	}
	,getResults: function() {
		var buf = new StringBuf();
		this.addPackages(buf,this.result,this.result.stats.isOk);
		return buf.b.join("");
	}
	,getAll: function() {
		if(!utest.ui.common.ReportTools.hasOutput(this,this.result.stats)) return ""; else return this.getHeader() + this.getTrace() + this.getResults();
	}
	,getHtml: function(title) {
		if(null == title) title = "utest: " + utest.ui.text.HtmlReport.platform;
		var s = this.getAll();
		if("" == s) return ""; else return this.wrapHtml(title,s);
	}
	,result: null
	,complete: function(result) {
		this.result = result;
		this.handler(this);
		this.restoreTrace();
	}
	,formatTime: function(t) {
		return Math.round(t * 1000) + " ms";
	}
	,cssStyle: function() {
		return "body, dd, dt {\r\n\tfont-family: Verdana, Arial, Sans-serif;\r\n\tfont-size: 12px;\r\n}\r\ndl {\r\n\twidth: 180px;\r\n}\r\ndd, dt {\r\n\tmargin : 0;\r\n\tpadding : 2px 5px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n}\r\ndd.value {\r\n\ttext-align: center;\r\n\tbackground-color: #eeeeee;\r\n}\r\ndt {\r\n\ttext-align: left;\r\n\tbackground-color: #e6e6e6;\r\n\tfloat: left;\r\n\twidth: 100px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nh1 {\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n\tpadding: 5px 0 4px 0;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 18px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 2px 0px 2px;\r\n}\r\n\r\nh2 {\r\n\tfont-weight: bold;\r\n\tpadding: 2px 0 2px 8px;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 13px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 0 0px 0;\r\n\tbackground-color: #FFFFFF;\r\n\tcolor: #777777;\r\n}\r\n\r\nh2.classname {\r\n\tcolor: #000000;\r\n}\r\n\r\n.okbg {\r\n\tbackground-color: #66FF55;\r\n}\r\n.errorbg {\r\n\tbackground-color: #CC1100;\r\n}\r\n.failurebg {\r\n\tbackground-color: #EE3322;\r\n}\r\n.warnbg {\r\n\tbackground-color: #FFCC99;\r\n}\r\n.headerinfo {\r\n\ttext-align: right;\r\n\tfont-size: 11px;\r\n\tfont - color: 0xCCCCCC;\r\n\tmargin: 0 2px 5px 2px;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tpadding: 2px;\r\n}\r\n\r\nli {\r\n\tpadding: 4px;\r\n\tmargin: 2px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tbackground-color: #e6e6e6;\r\n}\r\n\r\nli.fixture {\r\n\tbackground-color: #f6f6f6;\r\n\tpadding-bottom: 6px;\r\n}\r\n\r\ndiv.fixturedetails {\r\n\tpadding-left: 108px;\r\n}\r\n\r\nul {\r\n\tpadding: 0;\r\n\tmargin: 6px 0 0 0;\r\n\tlist-style-type: none;\r\n}\r\n\r\nol {\r\n\tpadding: 0 0 0 28px;\r\n\tmargin: 0px 0 0 0;\r\n}\r\n\r\n.statnumbers {\r\n\tpadding: 2px 8px;\r\n}\r\n\r\n.fixtureresult {\r\n\twidth: 100px;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tpadding: 1px;\r\n\tmargin: 0 0 0 0;\r\n}\r\n\r\n.testoutput {\r\n\tborder: 1px dashed #CCCCCC;\r\n\tmargin: 4px 0 0 0;\r\n\tpadding: 4px 8px;\r\n\tbackground-color: #eeeeee;\r\n}\r\n\r\nspan.tracepos, span.traceposempty {\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tfont-size: 9px;\r\n\twidth: 170px;\r\n\tmargin: 2px 0 0 2px;\r\n}\r\n\r\nspan.tracepos:hover {\r\n\tcursor : pointer;\r\n\tbackground-color: #ffff99;\r\n}\r\n\r\nspan.tracemsg {\r\n\tdisplay: block;\r\n\tmargin-left: 180px;\r\n\tbackground-color: #eeeeee;\r\n\tpadding: 7px;\r\n}\r\n\r\nspan.tracetime {\r\n\tdisplay: block;\r\n\tfloat: right;\r\n\tmargin: 2px;\r\n\tfont-size: 9px;\r\n\tcolor: #777777;\r\n}\r\n\r\n\r\ndiv.trace ol {\r\n\tpadding: 0 0 0 40px;\r\n\tcolor: #777777;\r\n}\r\n\r\ndiv.trace li {\r\n\tpadding: 0;\r\n}\r\n\r\ndiv.trace li div.li {\r\n\tcolor: #000000;\r\n}\r\n\r\ndiv.trace h2 {\r\n\tmargin: 0 2px 0px 2px;\r\n\tpadding-left: 4px;\r\n}\r\n\r\n.tracepackage {\r\n\tcolor: #777777;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.clr {\r\n\tclear: both;\r\n}\r\n\r\n#utesttip {\r\n\tmargin-top: -3px;\r\n\tmargin-left: 170px;\r\n\tfont-size: 9px;\r\n}\r\n\r\n#utesttip li {\r\n\tmargin: 0;\r\n\tbackground-color: #ffff99;\r\n\tpadding: 2px 4px;\r\n\tborder: 0;\r\n\tborder-bottom: 1px dashed #ffff33;\r\n}";
	}
	,jsScript: function() {
		return "function utestTooltip(ref, text) {\r\n\tvar el = document.getElementById(\"utesttip\");\r\n\tif(!el) {\r\n\t\tvar el = document.createElement(\"div\")\r\n\t\tel.id = \"utesttip\";\r\n\t\tel.style.position = \"absolute\";\r\n\t\tdocument.body.appendChild(el)\r\n\t}\r\n\tvar p = utestFindPos(ref);\r\n\tel.style.left = (4 + p[0]) + \"px\";\r\n\tel.style.top = (p[1] - 1) + \"px\";\r\n\tel.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n\tvar left = 0;\r\n\tvar top = 0;\r\n\tdo {\r\n\t\tleft += el.offsetLeft;\r\n\t\ttop += el.offsetTop;\r\n\t} while(el = el.offsetParent)\r\n\treturn [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n\tvar el = document.getElementById(\"utesttip\")\r\n\tif(el)\r\n\t\tdocument.body.removeChild(el)\r\n}";
	}
	,wrapHtml: function(title,s) {
		return "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\r\n\t\t\t<style type=\"text/css\">" + this.cssStyle() + "</style>\r\n\t\t\t<script type=\"text/javascript\">\n" + this.jsScript() + "\n</script>\n</head>\r\n\t\t\t<body>\n" + s + "\n</body>\n</html>";
	}
	,_handler: function(report) {
		var isDef = function(v) {
			return typeof v != 'undefined';
		};
		var head = js.Lib.document.getElementsByTagName("head")[0];
		var script = js.Lib.document.createElement("script");
		script.type = "text/javascript";
		var sjs = report.jsScript();
		if(isDef(script.text)) script.text = sjs; else script.innerHTML = sjs;
		head.appendChild(script);
		var style = js.Lib.document.createElement("style");
		style.type = "text/css";
		var scss = report.cssStyle();
		if(isDef(style.styleSheet)) style.styleSheet.cssText = scss; else if(isDef(style.cssText)) style.cssText = scss; else if(isDef(style.innerText)) style.innerText = scss; else style.innerHTML = scss;
		head.appendChild(style);
		var el = js.Lib.document.getElementById("utest-results");
		if(null == el) {
			el = js.Lib.document.createElement("div");
			el.id = "utest-results";
			js.Lib.document.body.appendChild(el);
		}
		el.innerHTML = report.getAll();
	}
	,__class__: utest.ui.text.HtmlReport
}
if(!thx.geo) thx.geo = {}
thx.geo.IProjection = $hxClasses["thx.geo.IProjection"] = function() { }
thx.geo.IProjection.__name__ = ["thx","geo","IProjection"];
thx.geo.IProjection.prototype = {
	project: null
	,invert: null
	,__class__: thx.geo.IProjection
}
thx.geo.AlbersUsa = $hxClasses["thx.geo.AlbersUsa"] = function() {
	this.lower48 = new thx.geo.Albers();
	this.alaska = new thx.geo.Albers();
	this.alaska.setOrigin([-160.0,60]);
	this.alaska.setParallels([55.0,65]);
	this.hawaii = new thx.geo.Albers();
	this.hawaii.setOrigin([-160.0,20]);
	this.hawaii.setParallels([8.0,18]);
	this.puertoRico = new thx.geo.Albers();
	this.puertoRico.setOrigin([-60.0,10]);
	this.puertoRico.setParallels([8.0,18]);
	this.setScale(this.lower48.getScale());
};
thx.geo.AlbersUsa.__name__ = ["thx","geo","AlbersUsa"];
thx.geo.AlbersUsa.__interfaces__ = [thx.geo.IProjection];
thx.geo.AlbersUsa.prototype = {
	translate: null
	,scale: null
	,lower48: null
	,alaska: null
	,hawaii: null
	,puertoRico: null
	,last: null
	,project: function(coords) {
		var lon = coords[0], lat = coords[1];
		return (lat > 50?this.alaska:lon < -140?this.hawaii:lat < 21?this.puertoRico:this.lower48).project(coords);
	}
	,invert: function(coords) {
		return (function($this) {
			var $r;
			throw new thx.error.NotImplemented({ fileName : "AlbersUsa.hx", lineNumber : 67, className : "thx.geo.AlbersUsa", methodName : "invert"});
			return $r;
		}(this));
	}
	,setScale: function(scale) {
		this.lower48.setScale(scale);
		this.alaska.setScale(scale * .6);
		this.hawaii.setScale(scale);
		this.puertoRico.setScale(scale * 1.5);
		this.setTranslate(this.lower48.getTranslate());
		return scale;
	}
	,getScale: function() {
		return this.lower48.getScale();
	}
	,setTranslate: function(translate) {
		var dz = this.lower48.getScale() / 1000, dx = translate[0], dy = translate[1];
		this.lower48.setTranslate(translate);
		this.alaska.setTranslate([dx - 400 * dz,dy + 170 * dz]);
		this.hawaii.setTranslate([dx - 190 * dz,dy + 200 * dz]);
		this.puertoRico.setTranslate([dx + 580 * dz,dy + 430 * dz]);
		return translate;
	}
	,getTranslate: function() {
		return this.lower48.getTranslate();
	}
	,__class__: thx.geo.AlbersUsa
	,__properties__: {set_scale:"setScale",get_scale:"getScale",set_translate:"setTranslate",get_translate:"getTranslate"}
}
var TestFloats = $hxClasses["TestFloats"] = function() {
};
TestFloats.__name__ = ["TestFloats"];
TestFloats.addTests = function(runner) {
	runner.addCase(new TestFloats());
}
TestFloats.main = function() {
	var runner = new utest.Runner();
	TestFloats.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestFloats.prototype = {
	testNormalize: function() {
		utest.Assert.floatEquals(0.0,Floats.normalize(0.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 11, className : "TestFloats", methodName : "testNormalize"});
		utest.Assert.floatEquals(1.0,Floats.normalize(1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 12, className : "TestFloats", methodName : "testNormalize"});
		utest.Assert.floatEquals(0.5,Floats.normalize(0.5),null,null,{ fileName : "TestFloats.hx", lineNumber : 13, className : "TestFloats", methodName : "testNormalize"});
		utest.Assert.floatEquals(0.0,Floats.normalize(-1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 14, className : "TestFloats", methodName : "testNormalize"});
		utest.Assert.floatEquals(1.0,Floats.normalize(10.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 15, className : "TestFloats", methodName : "testNormalize"});
	}
	,testAbs: function() {
		utest.Assert.floatEquals(0.1,0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 20, className : "TestFloats", methodName : "testAbs"});
		utest.Assert.floatEquals(0.1,0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 21, className : "TestFloats", methodName : "testAbs"});
	}
	,testClamp: function() {
		utest.Assert.floatEquals(10,Floats.clamp(0,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 27, className : "TestFloats", methodName : "testClamp"});
		utest.Assert.floatEquals(10,Floats.clamp(10,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 28, className : "TestFloats", methodName : "testClamp"});
		utest.Assert.floatEquals(50,Floats.clamp(50,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 29, className : "TestFloats", methodName : "testClamp"});
		utest.Assert.floatEquals(100,Floats.clamp(100,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 30, className : "TestFloats", methodName : "testClamp"});
		utest.Assert.floatEquals(100,Floats.clamp(110,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 31, className : "TestFloats", methodName : "testClamp"});
	}
	,testClampSym: function() {
		utest.Assert.floatEquals(-10,Floats.clampSym(-100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 36, className : "TestFloats", methodName : "testClampSym"});
		utest.Assert.floatEquals(10,Floats.clampSym(100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 37, className : "TestFloats", methodName : "testClampSym"});
		utest.Assert.floatEquals(0,Floats.clampSym(0,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 38, className : "TestFloats", methodName : "testClampSym"});
	}
	,testMax: function() {
		utest.Assert.floatEquals(10,10,null,null,{ fileName : "TestFloats.hx", lineNumber : 43, className : "TestFloats", methodName : "testMax"});
		utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 44, className : "TestFloats", methodName : "testMax"});
		utest.Assert.floatEquals(-5,-5,null,null,{ fileName : "TestFloats.hx", lineNumber : 45, className : "TestFloats", methodName : "testMax"});
	}
	,testMin: function() {
		utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 50, className : "TestFloats", methodName : "testMin"});
		utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 51, className : "TestFloats", methodName : "testMin"});
		utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 52, className : "TestFloats", methodName : "testMin"});
	}
	,testRange: function() {
		utest.Assert.same([0.1,0.2,0.3,0.4],Floats.range(0.1,0.5,0.1),null,null,{ fileName : "TestFloats.hx", lineNumber : 57, className : "TestFloats", methodName : "testRange"});
	}
	,testSign: function() {
		utest.Assert.isTrue(1 > 0,null,{ fileName : "TestFloats.hx", lineNumber : 62, className : "TestFloats", methodName : "testSign"});
		utest.Assert.isTrue(-1 < 0,null,{ fileName : "TestFloats.hx", lineNumber : 63, className : "TestFloats", methodName : "testSign"});
	}
	,testWrap: function() {
		utest.Assert.floatEquals(5,Floats.wrap(-1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 68, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(5,Floats.wrap(1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 69, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(5,Floats.wrap(5,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 70, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(6,Floats.wrap(6,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 71, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(10,Floats.wrap(10,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 72, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(5,Floats.wrap(11,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 73, className : "TestFloats", methodName : "testWrap"});
		utest.Assert.floatEquals(5,Floats.wrap(29,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 74, className : "TestFloats", methodName : "testWrap"});
	}
	,testCircularWrap: function() {
		utest.Assert.floatEquals(0,Floats.circularWrap(0,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 79, className : "TestFloats", methodName : "testCircularWrap"});
		utest.Assert.floatEquals(50,Floats.circularWrap(50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 80, className : "TestFloats", methodName : "testCircularWrap"});
		utest.Assert.floatEquals(0,Floats.circularWrap(100,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 81, className : "TestFloats", methodName : "testCircularWrap"});
		utest.Assert.floatEquals(50,Floats.circularWrap(150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 82, className : "TestFloats", methodName : "testCircularWrap"});
		utest.Assert.floatEquals(50,Floats.circularWrap(-50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 83, className : "TestFloats", methodName : "testCircularWrap"});
		utest.Assert.floatEquals(50,Floats.circularWrap(-150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 84, className : "TestFloats", methodName : "testCircularWrap"});
	}
	,testInterpolate: function() {
		utest.Assert.equals(100,Floats.interpolate(0.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 89, className : "TestFloats", methodName : "testInterpolate"});
		utest.Assert.equals(150,Floats.interpolate(0.5,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 90, className : "TestFloats", methodName : "testInterpolate"});
		utest.Assert.equals(200,Floats.interpolate(1.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 91, className : "TestFloats", methodName : "testInterpolate"});
	}
	,testFormat: function() {
		utest.Assert.equals("0.10",Floats.format(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 96, className : "TestFloats", methodName : "testFormat"});
		utest.Assert.equals("0",Floats.format(0.1,"I"),null,{ fileName : "TestFloats.hx", lineNumber : 97, className : "TestFloats", methodName : "testFormat"});
	}
	,testFormatF: function() {
		utest.Assert.equals("0.10",(Floats.formatf())(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 102, className : "TestFloats", methodName : "testFormatF"});
	}
	,__class__: TestFloats
}
thx.math.scale.Log = $hxClasses["thx.math.scale.Log"] = function() {
	thx.math.scale.NumericScale.call(this);
	this.log = thx.math.scale.Log._log;
	this.pow = thx.math.scale.Log._pow;
};
thx.math.scale.Log.__name__ = ["thx","math","scale","Log"];
thx.math.scale.Log._log = function(x) {
	return Math.log(x) / 2.302585092994046;
}
thx.math.scale.Log._logn = function(x) {
	return -Math.log(-x) / 2.302585092994046;
}
thx.math.scale.Log._pow = function(x) {
	return Math.pow(10,x);
}
thx.math.scale.Log._pown = function(x) {
	return -Math.pow(10,-x);
}
thx.math.scale.Log.__super__ = thx.math.scale.NumericScale;
thx.math.scale.Log.prototype = $extend(thx.math.scale.NumericScale.prototype,{
	log: null
	,pow: null
	,scale: function(x,i) {
		return thx.math.scale.NumericScale.prototype.scale.call(this,this.log(x));
	}
	,invert: function(x,i) {
		return this.pow(thx.math.scale.NumericScale.prototype.invert.call(this,x));
	}
	,getDomain: function() {
		var me = this;
		return thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
			return me.pow(d);
		});
	}
	,domain: function(d) {
		if(Arrays.min(d) < 0) {
			this.log = thx.math.scale.Log._logn;
			this.pow = thx.math.scale.Log._pown;
		} else {
			this.log = thx.math.scale.Log._log;
			this.pow = thx.math.scale.Log._pow;
		}
		return thx.math.scale.NumericScale.prototype.domain.call(this,[this.log(d[0]),this.log(d[1])]);
	}
	,ticks: function() {
		var d = thx.math.scale.NumericScale.prototype.getDomain.call(this), ticks = [];
		if(d.every(function(d1,_) {
			return Math.isFinite(d1);
		})) {
			var i = Math.floor(d[0]), j = Math.ceil(d[1]), u = this.pow(d[0]), v = this.pow(d[1]);
			if(Reflect.compareMethods(this.log,thx.math.scale.Log._logn)) {
				ticks.push(this.pow(i));
				while(i++ < j) {
					var k = 9;
					do ticks.push(this.pow(i) * k); while(k-- > 0);
				}
			} else {
				do {
					var _g = 1;
					while(_g < 10) {
						var k = _g++;
						ticks.push(this.pow(i) * k);
					}
				} while(i++ < j);
				ticks.push(this.pow(i));
			}
			i = 0;
			while(ticks[i] < u) i++;
			j = ticks.length;
			while(ticks[j - 1] > v) j--;
			ticks = ticks.slice(i,j);
		}
		return ticks;
	}
	,tickFormat: function(v,i) {
		return thx.culture.FormatNumber.decimal(v,1);
	}
	,__class__: thx.math.scale.Log
});
thx.validation.DateRangeValidator = $hxClasses["thx.validation.DateRangeValidator"] = function(min,max,mininclusive,maxinclusive) {
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
};
thx.validation.DateRangeValidator.__name__ = ["thx","validation","DateRangeValidator"];
thx.validation.DateRangeValidator.__super__ = thx.validation.Validator;
thx.validation.DateRangeValidator.prototype = $extend(thx.validation.Validator.prototype,{
	min: null
	,max: null
	,minInclusive: null
	,maxInclusive: null
	,validate: function(value) {
		if(null != this.min && (this.minInclusive && value.getTime() < this.min.getTime() || !this.minInclusive && value.getTime() <= this.min.getTime())) {
			if(this.minInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0:D}",[this.min],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be greater than {0:D}",[this.min],null)]);
		} else if(null != this.max && (this.maxInclusive && value.getTime() > this.max.getTime() || !this.maxInclusive && value.getTime() >= this.max.getTime())) {
			if(this.maxInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0:D}",[this.max],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be lower than {0:D}",[this.max],null)]);
		} else return thx.util.Result.Ok;
	}
	,__class__: thx.validation.DateRangeValidator
});
thx.error.TestNullArgument = $hxClasses["thx.error.TestNullArgument"] = function() {
};
thx.error.TestNullArgument.__name__ = ["thx","error","TestNullArgument"];
thx.error.TestNullArgument.throwMe = function(XXX) {
	if(null == XXX) throw new thx.error.NullArgument("XXX","invalid null argument '{0}' for method {1}.{2}()",{ fileName : "TestNullArgument.hx", lineNumber : 14, className : "thx.error.TestNullArgument", methodName : "throwMe"}); else null;
}
thx.error.TestNullArgument.prototype = {
	testNullArgument: function() {
		try {
			thx.error.TestNullArgument.throwMe(null);
		} catch( $e0 ) {
			if( js.Boot.__instanceof($e0,thx.error.NullArgument) ) {
				var e = $e0;
				var s = e.toString();
				utest.Assert.stringContains("XXX",s,"string '" + s + "' does not contain 'XXX'",{ fileName : "TestNullArgument.hx", lineNumber : 21, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
				return;
			} else {
			var e = $e0;
			utest.Assert.fail("wrong exception type: " + Std.string(e),{ fileName : "TestNullArgument.hx", lineNumber : 24, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
			}
		}
	}
	,__class__: thx.error.TestNullArgument
}
thx.html.TextHandler = $hxClasses["thx.html.TextHandler"] = function() {
	this.results = "";
};
thx.html.TextHandler.__name__ = ["thx","html","TextHandler"];
thx.html.TextHandler.__interfaces__ = [thx.html.HtmlHandler];
thx.html.TextHandler.prototype = {
	results: null
	,start: function(tag,attrs,unary) {
		this.results += "<" + tag;
		var _g1 = 0, _g = attrs.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.results += " " + attrs[i].name + "=\"" + attrs[i].escaped + "\"";
		}
		this.results += (unary?"/":"") + ">";
	}
	,end: function(tag) {
		this.results += "</" + tag + ">";
	}
	,chars: function(text) {
		this.results += text;
	}
	,comment: function(text) {
		this.results += "<!--" + text + "-->";
	}
	,doctype: function(text) {
		this.results += "<!DOCTYPE " + text + ">";
	}
	,declaration: function(text) {
		this.results += "<?xml " + text + ">";
	}
	,__class__: thx.html.TextHandler
}
if(!thx.type) thx.type = {}
thx.type.TestTypes = $hxClasses["thx.type.TestTypes"] = function() {
};
thx.type.TestTypes.__name__ = ["thx","type","TestTypes"];
thx.type.TestTypes.addTests = function(runner) {
	runner.addCase(new thx.type.TestTypes());
}
thx.type.TestTypes.main = function() {
	var runner = new utest.Runner();
	thx.type.TestTypes.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.type.TestTypes.prototype = {
	testSameAs: function() {
		utest.Assert.isTrue(Types.sameType(1,2),null,{ fileName : "TestTypes.hx", lineNumber : 33, className : "thx.type.TestTypes", methodName : "testSameAs"});
		utest.Assert.isTrue(Types.sameType("a","b"),null,{ fileName : "TestTypes.hx", lineNumber : 34, className : "thx.type.TestTypes", methodName : "testSameAs"});
		utest.Assert.isFalse(Types.sameType(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 35, className : "thx.type.TestTypes", methodName : "testSameAs"});
		utest.Assert.isFalse(Types.sameType(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 36, className : "thx.type.TestTypes", methodName : "testSameAs"});
		utest.Assert.isFalse(Types.sameType(1,null),null,{ fileName : "TestTypes.hx", lineNumber : 37, className : "thx.type.TestTypes", methodName : "testSameAs"});
	}
	,testAs: function() {
		utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 42, className : "thx.type.TestTypes", methodName : "testAs"});
		utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 43, className : "thx.type.TestTypes", methodName : "testAs"});
	}
	,testOf: function() {
		utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 48, className : "thx.type.TestTypes", methodName : "testOf"});
		utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 49, className : "thx.type.TestTypes", methodName : "testOf"});
	}
	,testClassName: function() {
		utest.Assert.equals("TestTypes",Type.getClassName(Type.getClass(this)).split(".").pop(),null,{ fileName : "TestTypes.hx", lineNumber : 54, className : "thx.type.TestTypes", methodName : "testClassName"});
	}
	,testFullName: function() {
		utest.Assert.equals("thx.type.TestTypes",Type.getClassName(Type.getClass(this)),null,{ fileName : "TestTypes.hx", lineNumber : 59, className : "thx.type.TestTypes", methodName : "testFullName"});
	}
	,testTypeName: function() {
		utest.Assert.equals("null",Types.typeName(null),null,{ fileName : "TestTypes.hx", lineNumber : 64, className : "thx.type.TestTypes", methodName : "testTypeName"});
		utest.Assert.equals("thx.type.TestTypes",Types.typeName(this),null,{ fileName : "TestTypes.hx", lineNumber : 65, className : "thx.type.TestTypes", methodName : "testTypeName"});
		utest.Assert.equals("Int",Types.typeName(1),null,{ fileName : "TestTypes.hx", lineNumber : 66, className : "thx.type.TestTypes", methodName : "testTypeName"});
		utest.Assert.equals("Bool",Types.typeName(true),null,{ fileName : "TestTypes.hx", lineNumber : 67, className : "thx.type.TestTypes", methodName : "testTypeName"});
	}
	,__class__: thx.type.TestTypes
}
thx.json.TestJson = $hxClasses["thx.json.TestJson"] = function() {
};
thx.json.TestJson.__name__ = ["thx","json","TestJson"];
thx.json.TestJson.prototype = {
	testEncode: function() {
		var _g = 0, _g1 = thx.json.TestJson.tests;
		while(_g < _g1.length) {
			var test = _g1[_g];
			++_g;
			utest.Assert.equals(test.s,thx.json.Json.encode(test.c),null,{ fileName : "TestJson.hx", lineNumber : 24, className : "thx.json.TestJson", methodName : "testEncode"});
		}
	}
	,testDecode: function() {
		var _g = 0, _g1 = thx.json.TestJson.tests;
		while(_g < _g1.length) {
			var test = _g1[_g];
			++_g;
			try {
				utest.Assert.same(test.c,thx.json.Json.decode(test.s),null,null,{ fileName : "TestJson.hx", lineNumber : 33, className : "thx.json.TestJson", methodName : "testDecode"});
			} catch( e ) {
				utest.Assert.fail("error decoding: " + test.s + "\n" + Std.string(e),{ fileName : "TestJson.hx", lineNumber : 35, className : "thx.json.TestJson", methodName : "testDecode"});
				break;
			}
		}
	}
	,__class__: thx.json.TestJson
}
thx.csv.CsvEncoder = $hxClasses["thx.csv.CsvEncoder"] = function(delimiter,nulltoempty,newline) {
	if(newline == null) newline = "\n";
	if(nulltoempty == null) nulltoempty = true;
	if(delimiter == null) delimiter = ",";
	this.delimiter = delimiter;
	this.nulltoempty = nulltoempty;
	this.newline = newline;
	this.re = new EReg("(" + thx.text.ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|\")","");
};
thx.csv.CsvEncoder.__name__ = ["thx","csv","CsvEncoder"];
thx.csv.CsvEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.csv.CsvEncoder.prototype = {
	delimiter: null
	,nulltoempty: null
	,newline: null
	,encodedString: null
	,re: null
	,buf: null
	,lineContext: null
	,valueContext: null
	,firstLine: null
	,firstValue: null
	,start: function() {
		this.buf = new StringBuf();
		this.firstLine = true;
		this.lineContext = true;
	}
	,end: function() {
		this.encodedString = this.buf.b.join("");
	}
	,startObject: function() {
		throw new thx.error.Error("objects cannot be encoded to CSV",null,null,{ fileName : "CsvEncoder.hx", lineNumber : 48, className : "thx.csv.CsvEncoder", methodName : "startObject"});
	}
	,startField: function(name) {
	}
	,endField: function() {
	}
	,endObject: function() {
	}
	,startArray: function() {
	}
	,startItem: function() {
		if(this.lineContext) {
			this.lineContext = false;
			this.firstValue = true;
			if(this.firstLine) this.firstLine = false; else this.buf.add(this.newline);
		} else if(this.firstValue) this.firstValue = false; else this.buf.add(this.delimiter);
	}
	,endItem: function() {
	}
	,endArray: function() {
		if(!this.lineContext) this.lineContext = true;
	}
	,date: function(d) {
		if(d.getSeconds() == 0 && d.getMinutes() == 0 && d.getHours() == 0) this.buf.add(Dates.format(d,"C",["%Y-%m-%d"])); else this.buf.add(Dates.format(d,"C",["%Y-%m-%d %H:%M:%S"]));
	}
	,string: function(s) {
		if(this.re.match(s)) this.buf.add("\"" + StringTools.replace(s,"\"","\"\"") + "\""); else this.buf.add(s);
	}
	,'int': function(i) {
		this.buf.add(i);
	}
	,'float': function(f) {
		this.buf.add(f);
	}
	,'null': function() {
		if(!this.nulltoempty) this.buf.add("null");
	}
	,bool: function(b) {
		this.buf.add(b?"true":"false");
	}
	,comment: function(s) {
	}
	,__class__: thx.csv.CsvEncoder
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
thx.validation.TestStringLength = $hxClasses["thx.validation.TestStringLength"] = function() {
};
thx.validation.TestStringLength.__name__ = ["thx","validation","TestStringLength"];
thx.validation.TestStringLength.__super__ = thx.validation.TestAll;
thx.validation.TestStringLength.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.StringLengthValidator(3,5);
		this.assertValidation(validator.validate(""),false,null,{ fileName : "TestStringLength.hx", lineNumber : 10, className : "thx.validation.TestStringLength", methodName : "testValidation"});
		this.assertValidation(validator.validate("abc"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 11, className : "thx.validation.TestStringLength", methodName : "testValidation"});
		this.assertValidation(validator.validate("abcde"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 12, className : "thx.validation.TestStringLength", methodName : "testValidation"});
		this.assertValidation(validator.validate("abcdef"),false,null,{ fileName : "TestStringLength.hx", lineNumber : 13, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestStringLength
});
if(!thx.ini) thx.ini = {}
thx.ini.Ini = $hxClasses["thx.ini.Ini"] = function() { }
thx.ini.Ini.__name__ = ["thx","ini","Ini"];
thx.ini.Ini.encode = function(value) {
	var handler = new thx.ini.IniEncoder();
	new thx.data.ValueEncoder(handler).encode(value);
	return handler.encodedString;
}
thx.ini.Ini.decode = function(value) {
	var handler = new thx.data.ValueHandler();
	var r = new thx.ini.IniDecoder(handler).decode(value);
	return handler.value;
}
thx.ini.Ini.prototype = {
	__class__: thx.ini.Ini
}
thx.data.ValueEncoder = $hxClasses["thx.data.ValueEncoder"] = function(handler) {
	this.handler = handler;
};
thx.data.ValueEncoder.__name__ = ["thx","data","ValueEncoder"];
thx.data.ValueEncoder.prototype = {
	handler: null
	,encode: function(o) {
		this.handler.start();
		this.encodeValue(o);
		this.handler.end();
	}
	,encodeValue: function(o) {
		var $e = (Type["typeof"](o));
		switch( $e[1] ) {
		case 0:
			this.handler["null"]();
			break;
		case 1:
			this.handler["int"](o);
			break;
		case 2:
			this.handler["float"](o);
			break;
		case 3:
			this.handler.bool(o);
			break;
		case 4:
			this.encodeObject(o);
			break;
		case 5:
			throw new thx.error.Error("unable to encode TFunction type",null,null,{ fileName : "ValueEncoder.hx", lineNumber : 39, className : "thx.data.ValueEncoder", methodName : "encodeValue"});
			break;
		case 6:
			var c = $e[2];
			if(Std["is"](o,String)) this.handler.string(o); else if(Std["is"](o,Array)) this.encodeArray(o); else if(Std["is"](o,Date)) this.handler.date(o); else if(Std["is"](o,Hash)) this.encodeHash(o); else if(Std["is"](o,List)) this.encodeList(o); else throw new thx.error.Error("unable to encode class '{0}'",null,Type.getClassName(c),{ fileName : "ValueEncoder.hx", lineNumber : 53, className : "thx.data.ValueEncoder", methodName : "encodeValue"});
			break;
		case 7:
			var e = $e[2];
			throw new thx.error.Error("unable to encode TEnum type '{0}'",null,Type.getEnumName(e),{ fileName : "ValueEncoder.hx", lineNumber : 55, className : "thx.data.ValueEncoder", methodName : "encodeValue"});
			break;
		case 8:
			throw new thx.error.Error("unable to encode TUnknown type",null,null,{ fileName : "ValueEncoder.hx", lineNumber : 57, className : "thx.data.ValueEncoder", methodName : "encodeValue"});
			break;
		}
	}
	,encodeObject: function(o) {
		this.handler.startObject();
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			this.handler.startField(key);
			this.encodeValue(Reflect.field(o,key));
			this.handler.endField();
		}
		this.handler.endObject();
	}
	,encodeHash: function(o) {
		this.handler.startObject();
		var $it0 = o.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.handler.startField(key);
			this.encodeValue(o.get(key));
			this.handler.endField();
		}
		this.handler.endObject();
	}
	,encodeList: function(list) {
		this.handler.startArray();
		var $it0 = list.iterator();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			this.handler.startItem();
			this.encodeValue(item);
			this.handler.endItem();
		}
		this.handler.endArray();
	}
	,encodeArray: function(a) {
		this.handler.startArray();
		var _g = 0;
		while(_g < a.length) {
			var item = a[_g];
			++_g;
			this.handler.startItem();
			this.encodeValue(item);
			this.handler.endItem();
		}
		this.handler.endArray();
	}
	,__class__: thx.data.ValueEncoder
}
utest.ui.common.ResultStats = $hxClasses["utest.ui.common.ResultStats"] = function() {
	this.assertations = 0;
	this.successes = 0;
	this.failures = 0;
	this.errors = 0;
	this.warnings = 0;
	this.isOk = true;
	this.hasFailures = false;
	this.hasErrors = false;
	this.hasWarnings = false;
	this.onAddSuccesses = new utest.Dispatcher();
	this.onAddFailures = new utest.Dispatcher();
	this.onAddErrors = new utest.Dispatcher();
	this.onAddWarnings = new utest.Dispatcher();
};
utest.ui.common.ResultStats.__name__ = ["utest","ui","common","ResultStats"];
utest.ui.common.ResultStats.prototype = {
	assertations: null
	,successes: null
	,failures: null
	,errors: null
	,warnings: null
	,onAddSuccesses: null
	,onAddFailures: null
	,onAddErrors: null
	,onAddWarnings: null
	,isOk: null
	,hasFailures: null
	,hasErrors: null
	,hasWarnings: null
	,addSuccesses: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.successes += v;
		this.onAddSuccesses.dispatch(v);
	}
	,addFailures: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.failures += v;
		this.hasFailures = this.failures > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddFailures.dispatch(v);
	}
	,addErrors: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.errors += v;
		this.hasErrors = this.errors > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddErrors.dispatch(v);
	}
	,addWarnings: function(v) {
		if(v == 0) return;
		this.assertations += v;
		this.warnings += v;
		this.hasWarnings = this.warnings > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddWarnings.dispatch(v);
	}
	,sum: function(other) {
		this.addSuccesses(other.successes);
		this.addFailures(other.failures);
		this.addErrors(other.errors);
		this.addWarnings(other.warnings);
	}
	,subtract: function(other) {
		this.addSuccesses(-other.successes);
		this.addFailures(-other.failures);
		this.addErrors(-other.errors);
		this.addWarnings(-other.warnings);
	}
	,wire: function(dependant) {
		dependant.onAddSuccesses.add(this.addSuccesses.$bind(this));
		dependant.onAddFailures.add(this.addFailures.$bind(this));
		dependant.onAddErrors.add(this.addErrors.$bind(this));
		dependant.onAddWarnings.add(this.addWarnings.$bind(this));
		this.sum(dependant);
	}
	,unwire: function(dependant) {
		dependant.onAddSuccesses.remove(this.addSuccesses.$bind(this));
		dependant.onAddFailures.remove(this.addFailures.$bind(this));
		dependant.onAddErrors.remove(this.addErrors.$bind(this));
		dependant.onAddWarnings.remove(this.addWarnings.$bind(this));
		this.subtract(dependant);
	}
	,__class__: utest.ui.common.ResultStats
}
thx.color.NamedColors = $hxClasses["thx.color.NamedColors"] = function() { }
thx.color.NamedColors.__name__ = ["thx","color","NamedColors"];
thx.color.NamedColors.aliceblue = null;
thx.color.NamedColors.antiquewhite = null;
thx.color.NamedColors.aqua = null;
thx.color.NamedColors.aquamarine = null;
thx.color.NamedColors.azure = null;
thx.color.NamedColors.beige = null;
thx.color.NamedColors.bisque = null;
thx.color.NamedColors.black = null;
thx.color.NamedColors.blanchedalmond = null;
thx.color.NamedColors.blue = null;
thx.color.NamedColors.blueviolet = null;
thx.color.NamedColors.brown = null;
thx.color.NamedColors.burlywood = null;
thx.color.NamedColors.cadetblue = null;
thx.color.NamedColors.chartreuse = null;
thx.color.NamedColors.chocolate = null;
thx.color.NamedColors.coral = null;
thx.color.NamedColors.cornflowerblue = null;
thx.color.NamedColors.cornsilk = null;
thx.color.NamedColors.crimson = null;
thx.color.NamedColors.cyan = null;
thx.color.NamedColors.darkblue = null;
thx.color.NamedColors.darkcyan = null;
thx.color.NamedColors.darkgoldenrod = null;
thx.color.NamedColors.darkgray = null;
thx.color.NamedColors.darkgreen = null;
thx.color.NamedColors.darkgrey = null;
thx.color.NamedColors.darkkhaki = null;
thx.color.NamedColors.darkmagenta = null;
thx.color.NamedColors.darkolivegreen = null;
thx.color.NamedColors.darkorange = null;
thx.color.NamedColors.darkorchid = null;
thx.color.NamedColors.darkred = null;
thx.color.NamedColors.darksalmon = null;
thx.color.NamedColors.darkseagreen = null;
thx.color.NamedColors.darkslateblue = null;
thx.color.NamedColors.darkslategray = null;
thx.color.NamedColors.darkslategrey = null;
thx.color.NamedColors.darkturquoise = null;
thx.color.NamedColors.darkviolet = null;
thx.color.NamedColors.deeppink = null;
thx.color.NamedColors.deepskyblue = null;
thx.color.NamedColors.dimgray = null;
thx.color.NamedColors.dimgrey = null;
thx.color.NamedColors.dodgerblue = null;
thx.color.NamedColors.firebrick = null;
thx.color.NamedColors.floralwhite = null;
thx.color.NamedColors.forestgreen = null;
thx.color.NamedColors.fuchsia = null;
thx.color.NamedColors.gainsboro = null;
thx.color.NamedColors.ghostwhite = null;
thx.color.NamedColors.gold = null;
thx.color.NamedColors.goldenrod = null;
thx.color.NamedColors.gray = null;
thx.color.NamedColors.green = null;
thx.color.NamedColors.greenyellow = null;
thx.color.NamedColors.grey = null;
thx.color.NamedColors.honeydew = null;
thx.color.NamedColors.hotpink = null;
thx.color.NamedColors.indianred = null;
thx.color.NamedColors.indigo = null;
thx.color.NamedColors.ivory = null;
thx.color.NamedColors.khaki = null;
thx.color.NamedColors.lavender = null;
thx.color.NamedColors.lavenderblush = null;
thx.color.NamedColors.lawngreen = null;
thx.color.NamedColors.lemonchiffon = null;
thx.color.NamedColors.lightblue = null;
thx.color.NamedColors.lightcoral = null;
thx.color.NamedColors.lightcyan = null;
thx.color.NamedColors.lightgoldenrodyellow = null;
thx.color.NamedColors.lightgray = null;
thx.color.NamedColors.lightgreen = null;
thx.color.NamedColors.lightgrey = null;
thx.color.NamedColors.lightpink = null;
thx.color.NamedColors.lightsalmon = null;
thx.color.NamedColors.lightseagreen = null;
thx.color.NamedColors.lightskyblue = null;
thx.color.NamedColors.lightslategray = null;
thx.color.NamedColors.lightslategrey = null;
thx.color.NamedColors.lightsteelblue = null;
thx.color.NamedColors.lightyellow = null;
thx.color.NamedColors.lime = null;
thx.color.NamedColors.limegreen = null;
thx.color.NamedColors.linen = null;
thx.color.NamedColors.magenta = null;
thx.color.NamedColors.maroon = null;
thx.color.NamedColors.mediumaquamarine = null;
thx.color.NamedColors.mediumblue = null;
thx.color.NamedColors.mediumorchid = null;
thx.color.NamedColors.mediumpurple = null;
thx.color.NamedColors.mediumseagreen = null;
thx.color.NamedColors.mediumslateblue = null;
thx.color.NamedColors.mediumspringgreen = null;
thx.color.NamedColors.mediumturquoise = null;
thx.color.NamedColors.mediumvioletred = null;
thx.color.NamedColors.midnightblue = null;
thx.color.NamedColors.mintcream = null;
thx.color.NamedColors.mistyrose = null;
thx.color.NamedColors.moccasin = null;
thx.color.NamedColors.navajowhite = null;
thx.color.NamedColors.navy = null;
thx.color.NamedColors.oldlace = null;
thx.color.NamedColors.olive = null;
thx.color.NamedColors.olivedrab = null;
thx.color.NamedColors.orange = null;
thx.color.NamedColors.orangered = null;
thx.color.NamedColors.orchid = null;
thx.color.NamedColors.palegoldenrod = null;
thx.color.NamedColors.palegreen = null;
thx.color.NamedColors.paleturquoise = null;
thx.color.NamedColors.palevioletred = null;
thx.color.NamedColors.papayawhip = null;
thx.color.NamedColors.peachpuff = null;
thx.color.NamedColors.peru = null;
thx.color.NamedColors.pink = null;
thx.color.NamedColors.plum = null;
thx.color.NamedColors.powderblue = null;
thx.color.NamedColors.purple = null;
thx.color.NamedColors.red = null;
thx.color.NamedColors.rosybrown = null;
thx.color.NamedColors.royalblue = null;
thx.color.NamedColors.saddlebrown = null;
thx.color.NamedColors.salmon = null;
thx.color.NamedColors.sandybrown = null;
thx.color.NamedColors.seagreen = null;
thx.color.NamedColors.seashell = null;
thx.color.NamedColors.sienna = null;
thx.color.NamedColors.silver = null;
thx.color.NamedColors.skyblue = null;
thx.color.NamedColors.slateblue = null;
thx.color.NamedColors.slategray = null;
thx.color.NamedColors.slategrey = null;
thx.color.NamedColors.snow = null;
thx.color.NamedColors.springgreen = null;
thx.color.NamedColors.steelblue = null;
thx.color.NamedColors.tan = null;
thx.color.NamedColors.teal = null;
thx.color.NamedColors.thistle = null;
thx.color.NamedColors.tomato = null;
thx.color.NamedColors.turquoise = null;
thx.color.NamedColors.violet = null;
thx.color.NamedColors.wheat = null;
thx.color.NamedColors.white = null;
thx.color.NamedColors.whitesmoke = null;
thx.color.NamedColors.yellow = null;
thx.color.NamedColors.yellowgreen = null;
thx.color.NamedColors.byName = null;
thx.color.NamedColors.prototype = {
	__class__: thx.color.NamedColors
}
thx.validation.SingleLineValidator = $hxClasses["thx.validation.SingleLineValidator"] = function() {
};
thx.validation.SingleLineValidator.__name__ = ["thx","validation","SingleLineValidator"];
thx.validation.SingleLineValidator.__super__ = thx.validation.Validator;
thx.validation.SingleLineValidator.prototype = $extend(thx.validation.Validator.prototype,{
	validate: function(value) {
		if(thx.validation.SingleLineValidator._re.match(value)) return thx.util.Result.Failure([new thx.util.Message("value contains one ore more line breaks",[],null)]); else return thx.util.Result.Ok;
	}
	,__class__: thx.validation.SingleLineValidator
});
thx.validation.RangeValidator = $hxClasses["thx.validation.RangeValidator"] = function(min,max,mininclusive,maxinclusive) {
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
};
thx.validation.RangeValidator.__name__ = ["thx","validation","RangeValidator"];
thx.validation.RangeValidator.__super__ = thx.validation.Validator;
thx.validation.RangeValidator.prototype = $extend(thx.validation.Validator.prototype,{
	min: null
	,max: null
	,minInclusive: null
	,maxInclusive: null
	,validate: function(value) {
		if(null != this.min && (this.minInclusive && value < this.min || !this.minInclusive && value <= this.min)) {
			if(this.minInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0}",[this.min],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be greater than {0}",[this.min],null)]);
		} else if(null != this.max && (this.maxInclusive && value > this.max || !this.maxInclusive && value >= this.max)) {
			if(this.maxInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0}",[this.max],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be lower than {0}",[this.max],null)]);
		} else return thx.util.Result.Ok;
	}
	,__class__: thx.validation.RangeValidator
});
thx.svg.LineInterpolator = $hxClasses["thx.svg.LineInterpolator"] = { __ename__ : ["thx","svg","LineInterpolator"], __constructs__ : ["Linear","Step","StepBefore","StepAfter","Basis","BasisOpen","BasisClosed","Cardinal","CardinalOpen","CardinalClosed","Monotone"] }
thx.svg.LineInterpolator.Linear = ["Linear",0];
thx.svg.LineInterpolator.Linear.toString = $estr;
thx.svg.LineInterpolator.Linear.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Step = ["Step",1];
thx.svg.LineInterpolator.Step.toString = $estr;
thx.svg.LineInterpolator.Step.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.StepBefore = ["StepBefore",2];
thx.svg.LineInterpolator.StepBefore.toString = $estr;
thx.svg.LineInterpolator.StepBefore.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.StepAfter = ["StepAfter",3];
thx.svg.LineInterpolator.StepAfter.toString = $estr;
thx.svg.LineInterpolator.StepAfter.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Basis = ["Basis",4];
thx.svg.LineInterpolator.Basis.toString = $estr;
thx.svg.LineInterpolator.Basis.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.BasisOpen = ["BasisOpen",5];
thx.svg.LineInterpolator.BasisOpen.toString = $estr;
thx.svg.LineInterpolator.BasisOpen.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.BasisClosed = ["BasisClosed",6];
thx.svg.LineInterpolator.BasisClosed.toString = $estr;
thx.svg.LineInterpolator.BasisClosed.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Cardinal = function(tension) { var $x = ["Cardinal",7,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.CardinalOpen = function(tension) { var $x = ["CardinalOpen",8,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.CardinalClosed = function(tension) { var $x = ["CardinalClosed",9,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.Monotone = ["Monotone",10];
thx.svg.LineInterpolator.Monotone.toString = $estr;
thx.svg.LineInterpolator.Monotone.__enum__ = thx.svg.LineInterpolator;
thx.validation.TestIncrement = $hxClasses["thx.validation.TestIncrement"] = function() {
};
thx.validation.TestIncrement.__name__ = ["thx","validation","TestIncrement"];
thx.validation.TestIncrement.__super__ = thx.validation.TestAll;
thx.validation.TestIncrement.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.IncrementValidator(1);
		this.assertValidation(validator.validate(0.5),false,null,{ fileName : "TestIncrement.hx", lineNumber : 15, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator.validate(1),true,null,{ fileName : "TestIncrement.hx", lineNumber : 16, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator.validate(2),true,null,{ fileName : "TestIncrement.hx", lineNumber : 17, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator.validate(-10),true,null,{ fileName : "TestIncrement.hx", lineNumber : 18, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		var validator1 = new thx.validation.IncrementValidator(0.3);
		this.assertValidation(validator1.validate(0.5),false,null,{ fileName : "TestIncrement.hx", lineNumber : 21, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator1.validate(1),false,null,{ fileName : "TestIncrement.hx", lineNumber : 22, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator1.validate(0.6),true,null,{ fileName : "TestIncrement.hx", lineNumber : 23, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator1.validate(-3),true,null,{ fileName : "TestIncrement.hx", lineNumber : 24, className : "thx.validation.TestIncrement", methodName : "testValidation"});
		this.assertValidation(validator1.validate(66.6),true,null,{ fileName : "TestIncrement.hx", lineNumber : 25, className : "thx.validation.TestIncrement", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestIncrement
});
utest.ui.common.ClassResult = $hxClasses["utest.ui.common.ClassResult"] = function(className,setupName,teardownName) {
	this.fixtures = new Hash();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.ClassResult.__name__ = ["utest","ui","common","ClassResult"];
utest.ui.common.ClassResult.prototype = {
	fixtures: null
	,className: null
	,setupName: null
	,teardownName: null
	,hasSetup: null
	,hasTeardown: null
	,methods: null
	,stats: null
	,add: function(result) {
		if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
		this.stats.wire(result.stats);
		this.methods++;
		this.fixtures.set(result.methodName,result);
	}
	,get: function(method) {
		return this.fixtures.get(method);
	}
	,exists: function(method) {
		return this.fixtures.exists(method);
	}
	,methodNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.fixtures.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.get(a).stats;
				var bs = me.get(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,__class__: utest.ui.common.ClassResult
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return haxe.Stack.makeStack("$s");
}
haxe.Stack.exceptionStack = function() {
	return haxe.Stack.makeStack("$e");
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		} catch( e ) {
			$r = [];
		}
		return $r;
	}(this));
	var m = new Array();
	var _g1 = 0, _g = a.length - (s == "$s"?2:0);
	while(_g1 < _g) {
		var i = _g1++;
		var d = a[i].split("::");
		m.unshift(haxe.StackItem.Method(d[0],d[1]));
	}
	return m;
}
haxe.Stack.prototype = {
	__class__: haxe.Stack
}
thx.xml.TestXmlFormat = $hxClasses["thx.xml.TestXmlFormat"] = function() {
};
thx.xml.TestXmlFormat.__name__ = ["thx","xml","TestXmlFormat"];
thx.xml.TestXmlFormat.createCompleteDom = function() {
	var xml = Xml.createDocument();
	xml.addChild(Xml.createProlog("PROLOG"));
	xml.addChild(Xml.createDocType("DOCTYPE"));
	var body = Xml.createElement("body");
	xml.addChild(body);
	body.addChild(Xml.createComment("COMMENT"));
	var child = Xml.createElement("child");
	body.addChild(child);
	child.addChild(Xml.createElement("nested"));
	var child1 = Xml.createElement("child");
	body.addChild(child1);
	child1.addChild(Xml.createPCData(" "));
	body.addChild(Xml.createCData("CDATA"));
	body.addChild(Xml.createPCData("PCDATA"));
	return xml;
}
thx.xml.TestXmlFormat.addTests = function(runner) {
	runner.addCase(new thx.xml.TestXmlFormat());
}
thx.xml.TestXmlFormat.main = function() {
	var runner = new utest.Runner();
	thx.xml.TestXmlFormat.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.xml.TestXmlFormat.prototype = {
	testBase: function() {
		var writer = new thx.xml.XmlFormat(false);
		utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><!--COMMENT--><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 39, className : "thx.xml.TestXmlFormat", methodName : "testBase"});
	}
	,testStripComments: function() {
		var writer = new thx.xml.XmlFormat(false);
		writer.stripComments = true;
		utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 46, className : "thx.xml.TestXmlFormat", methodName : "testStripComments"});
	}
	,testAutoFormat: function() {
		var writer = new thx.xml.XmlFormat();
		utest.Assert.equals("<?PROLOG?>\n<!DOCTYPE DOCTYPE>\n<body>\n  <!--COMMENT-->\n  <child>\n    <nested/>\n  </child>\n  <child>\n    \n  </child>\n  <![CDATA[CDATA]]>\n  PCDATA\n</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 52, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat"});
	}
	,testAutoFormat2: function() {
		var writer = new thx.xml.XmlFormat();
		var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
		utest.Assert.equals("<html>\n  <head>\n    <title>\n      hello\n    </title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>\n          one\n        </li>\n        <li>\n          two\n        </li>\n        <li>\n          three\n        </li>\n      </ul>\n    </div>\n  </body>\n</html>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 60, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat2"});
	}
	,testAutoWidth: function() {
		var writer = new thx.xml.XmlFormat();
		writer.wrapColumns = 36;
		var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
		utest.Assert.equals("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 89, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidth"});
	}
	,testAutoWidthWithInlineElements: function() {
		var writer = new thx.xml.XmlFormat();
		writer.wrapColumns = 36;
		var xml = "<body><b>Lorem</b> ipsum <b>dolor sit</b> amet<p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
		utest.Assert.equals("<body>\n  <b>\n    Lorem\n  </b>\n  ipsum\n  <b>\n    dolor sit\n  </b>\n  amet\n  <p>\n    consectetur\n    <b>\n      adipisicing\n    </b>\n    elit,\n    <b>\n      sed do\n    </b>\n    eiusmod tempor incididunt ut\n    labore et dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 121, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidthWithInlineElements"});
	}
	,__class__: thx.xml.TestXmlFormat
}
thx.math.scale.TestQuantize = $hxClasses["thx.math.scale.TestQuantize"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestQuantize.__name__ = ["thx","math","scale","TestQuantize"];
thx.math.scale.TestQuantize.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestQuantize.prototype = $extend(thx.math.scale.TestAll.prototype,{
	__class__: thx.math.scale.TestQuantize
});
if(!thx.number) thx.number = {}
thx.number.NumberParser = $hxClasses["thx.number.NumberParser"] = function() { }
thx.number.NumberParser.__name__ = ["thx","number","NumberParser"];
thx.number.NumberParser.parse = function(val,cul) {
	if(cul == null) cul = thx.culture.Culture.getDefaultCulture();
	var reg = thx.number.NumberParser.cultureNumberEReg(cul);
	var fval = val;
	var nval = Math.NaN;
	var ni = cul.number;
	var gsep = thx.text.ERegs.escapeERegChars(ni.groupsSeparator);
	var dsep = thx.text.ERegs.escapeERegChars(ni.decimalsSeparator);
	if(thx.number.NumberParser.canParse(val,cul)) {
		fval = new EReg(gsep,"gi").replace(fval,"");
		fval = new EReg(dsep,"gi").replace(fval,".");
		nval = Std.parseFloat(fval);
		if(new EReg(thx.text.ERegs.escapeERegChars(cul.signNeg),"").match(val)) {
			if(nval > 0) nval *= -1;
		}
	}
	return nval;
}
thx.number.NumberParser.cultureNumberEReg = function(cul) {
	var ni = cul.number;
	var groups = ni.groups.copy();
	var digits = "";
	var gsep = thx.text.ERegs.escapeERegChars(ni.groupsSeparator);
	var dsep = thx.text.ERegs.escapeERegChars(ni.decimalsSeparator);
	if(cul.digits != null) throw "unsupported digit characters"; else digits = "[0-9]";
	var regex = new StringBuf();
	regex.b[regex.b.length] = "(";
	var group_length = 0;
	if(groups.length > 2) throw "too many groups!";
	if(groups.length == 2) {
		if(groups[1] == 0) regex.add("(" + digits + "*" + gsep + ")"); else {
			regex.add("((" + digits + "{1," + groups[1] + "}" + gsep + ")");
			regex.add("(" + digits + "{" + groups[1] + "}" + gsep + ")*" + digits + "{" + groups[0] + "})|");
		}
		if(groups[0] == 0) regex.add("(" + digits + "*" + gsep + ")"); else regex.add("(" + digits + "+)");
	}
	if(groups.length == 1) {
		group_length = groups[0];
		regex.add("((" + digits + "{1," + groups[0] + "})");
		regex.add("(" + gsep + digits + "{" + groups[0] + "}" + ")+)|");
		regex.add("(" + digits + "+)");
	}
	regex.b[regex.b.length] = ")";
	var last_group = 0;
	regex.add("(" + dsep + digits + "*)?");
	regex.b[regex.b.length] = "([eE][+\\-]?\\d+)?";
	var reg_string = regex.b.join("");
	var negative = false;
	if(ni.patternNegative != "-n") {
		var neg_match = new EReg("([^n]+)","g").replace(thx.text.ERegs.escapeERegChars(ni.patternNegative),"($1)?");
		reg_string = new EReg("n","").replace(neg_match,reg_string);
	} else reg_string = "[+-]?" + reg_string;
	reg_string = "^" + reg_string + "$";
	var reg = new EReg(reg_string,"gi");
	return reg;
}
thx.number.NumberParser.canParse = function(val,cul) {
	if(cul == null) cul = thx.culture.Culture.getDefaultCulture();
	var reg = thx.number.NumberParser.cultureNumberEReg(cul);
	if(reg.match(val)) return true; else return false;
}
thx.number.NumberParser.prototype = {
	__class__: thx.number.NumberParser
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	a.remove("__class__");
	a.remove("__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__properties__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
Type.prototype = {
	__class__: Type
}
thx.math.scale.TestLog = $hxClasses["thx.math.scale.TestLog"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestLog.__name__ = ["thx","math","scale","TestLog"];
thx.math.scale.TestLog.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestLog.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testRange: function() {
		var scale = new thx.math.scale.Log().domain([1.0,10.0]).range([0.0,1.0]);
		var expected = [Math.NaN,Math.NEGATIVE_INFINITY,-2.0,-1.0,0,0.69897,1.0,2.0];
		var values = [-5.0,0.0,0.01,0.1,1,5,10,100];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLog.hx", lineNumber : 20, className : "thx.math.scale.TestLog", methodName : "testRange"});
	}
	,testInvert: function() {
		var scale = new thx.math.scale.Log().domain([1.0,10.0]).range([0.0,1.0]);
		var expected = [1.0,1.023,1.258,3.162,10];
		var values = [0.0,0.01,0.1,0.5,1];
		this.assertScale(scale.invert.$bind(scale),expected,values,{ fileName : "TestLog.hx", lineNumber : 29, className : "thx.math.scale.TestLog", methodName : "testInvert"});
	}
	,testRange12: function() {
		var scale = new thx.math.scale.Log().domain([1.0,2.0]).range([0.0,1.0]);
		var expected = [-1,0.0,0.585,1.0,1.322];
		var values = [0.5,1.0,1.5,2.0,2.5];
		this.assertScale(scale.scale.$bind(scale),expected,values,{ fileName : "TestLog.hx", lineNumber : 38, className : "thx.math.scale.TestLog", methodName : "testRange12"});
	}
	,testInvert12: function() {
		var scale = new thx.math.scale.Log().domain([1.0,2.0]).range([0.0,1.0]);
		var expected = [1.0,1.007,1.072,1.414,2];
		var values = [0.0,0.01,0.1,0.5,1];
		this.assertScale(scale.invert.$bind(scale),expected,values,{ fileName : "TestLog.hx", lineNumber : 47, className : "thx.math.scale.TestLog", methodName : "testInvert12"});
	}
	,__class__: thx.math.scale.TestLog
});
if(!thx.date) thx.date = {}
thx.date.TestDateParser = $hxClasses["thx.date.TestDateParser"] = function() {
};
thx.date.TestDateParser.__name__ = ["thx","date","TestDateParser"];
thx.date.TestDateParser.prototype = {
	testParseSpecificDates: function() {
		var tests = [{ expected : "2011-01-05", test : "January 5"},{ expected : "2011-12-25", test : "dec 25"},{ expected : "2011-05-27", test : "may 27th"},{ expected : "2006-10-01", test : "October 2006"},{ expected : "2011-10-06", test : "oct 06"},{ expected : "2010-01-03", test : "jan 3 2010"},{ expected : "2004-02-14", test : "february 14, 2004"},{ expected : "2000-01-03", test : "3 jan 2000"},{ expected : "1985-04-17", test : "17 april 85"},{ expected : "1979-05-27", test : "5/27/1979"},{ expected : "1979-05-27", test : "27/5/1979"},{ expected : "2011-05-06", test : "05/06"},{ expected : "1979-05-27", test : "1979-05-27"},{ expected : "2011-05-06", test : "6"},{ expected : "2011-05-31 04:00:00", test : "4:00"},{ expected : "2011-05-31 17:00:00", test : "17:00"},{ expected : "2011-05-31 08:00:00", test : "0800"}];
		var _g1 = 0, _g = tests.length;
		while(_g1 < _g) {
			var i = _g1++;
			var test = tests[i], e = Date.fromString(test.expected), r = thx.date.DateParser.parse(test.test,thx.date.TestDateParser.now);
			utest.Assert.same(e,r,null,i + 1 + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'",{ fileName : "TestDateParser.hx", lineNumber : 43, className : "thx.date.TestDateParser", methodName : "testParseSpecificDates"});
		}
	}
	,testParseSimpleDates: function() {
		var tests = [{ expected : "2011-06-02", test : "thursday"},{ expected : "2011-11-01", test : "november"},{ expected : "2011-06-03 13:00:00", test : "friday 13:00"},{ expected : "2011-06-03 13:00:00", test : "friday 1pm"},{ expected : "2011-06-06 02:35:00", test : "mon 2:35"},{ expected : "2011-05-31 16:00:00", test : "4pm"},{ expected : "2011-05-31 06:00:00", test : "6 in the morning"},{ expected : "2011-05-31 18:00:00", test : "6 in the afternoon"},{ expected : "2011-06-04 17:00:00", test : "sat in the evening"},{ expected : "2011-05-30", test : "yesterday"},{ expected : "2011-05-31", test : "today"},{ expected : "2011-05-31 16:20:00", test : "now"},{ expected : "2011-06-01", test : "tomorrow"},{ expected : "2011-05-30", test : "this monday"},{ expected : "2011-05-31", test : "this tuesday"},{ expected : "2011-06-01", test : "this wednesday"},{ expected : "2011-05-30", test : "last monday"},{ expected : "2011-05-24", test : "last tuesday"},{ expected : "2011-05-25", test : "last wednesday"},{ expected : "2011-06-06", test : "next monday"},{ expected : "2011-06-07", test : "next tuesday"},{ expected : "2011-06-01", test : "next wednesday"},{ expected : "2011-04-01", test : "this april"},{ expected : "2011-05-01", test : "this may"},{ expected : "2011-06-01", test : "this june"},{ expected : "2011-04-01", test : "last april"},{ expected : "2010-05-01", test : "last may"},{ expected : "2010-06-01", test : "last june"},{ expected : "2012-04-01", test : "next april"},{ expected : "2012-05-01", test : "next may"},{ expected : "2011-06-01", test : "next june"},{ expected : "2011-05-31 08:00:00", test : "this morning"},{ expected : "2011-05-31 16:20:00", test : "this second"},{ expected : "2011-05-30 04:00:00", test : "yesterday at 4:00"},{ expected : "2011-05-27 20:00:00", test : "last friday at 20:00"},{ expected : "2011-05-30", test : "last monday"},{ expected : "2011-06-03", test : "next friday"},{ expected : "2011-06-01 18:45:00", test : "tomorrow at 6:45pm"},{ expected : "2011-05-30 14:00:00", test : "afternoon yesterday"}];
		var _g1 = 0, _g = tests.length;
		while(_g1 < _g) {
			var i = _g1++;
			var test = tests[i], e = Date.fromString(test.expected), r = thx.date.DateParser.parse(test.test,thx.date.TestDateParser.now);
			utest.Assert.same(e,r,null,i + 1 + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'",{ fileName : "TestDateParser.hx", lineNumber : 104, className : "thx.date.TestDateParser", methodName : "testParseSimpleDates"});
		}
	}
	,testParseComplexDates: function() {
		var tests = [{ expected : "2008-05-31 16:20:00", test : "3 years ago"},{ expected : "2010-12-31 16:20:00", test : "5 months before now"},{ expected : "2010-12-31", test : "5 months before today"},{ expected : "2010-12-30", test : "5 months before yesterday"},{ expected : "2011-01-01", test : "5 months before tomorrow"},{ expected : "2011-05-31 09:20:00", test : "7 hours ago"},{ expected : "2011-06-07", test : "7 days from today"},{ expected : "2011-06-07 16:20:00", test : "7 days from now"},{ expected : "2011-06-07", test : "1 week hence"},{ expected : "2011-05-31 19:20:00", test : "in 3 hours"},{ expected : "2010-05-31", test : "1 year ago today"},{ expected : "2010-05-30", test : "1 year ago yesterday"},{ expected : "2010-06-01", test : "1 year ago tomorrow"},{ expected : "2012-05-31", test : "1 year from today"},{ expected : "2012-05-30", test : "1 year from yesterday"},{ expected : "2012-06-01", test : "1 year from tomorrow"},{ expected : "2011-06-01 05:00:00", test : "7 hours before tomorrow at noon"},{ expected : "2011-05-31 16:25:00", test : "in 5 minutes"},{ expected : "2011-05-31 16:25:00", test : "5 minutes from now"},{ expected : "2011-05-31 11:20:00", test : "5 hours before now"},{ expected : "2011-05-31 10:00:00", test : "2 hours before noon"},{ expected : "2011-06-03 00:00:00", test : "2 days from tomorrow"}];
		var _g1 = 0, _g = tests.length;
		while(_g1 < _g) {
			var i = _g1++;
			var test = tests[i], e = Date.fromString(test.expected), r = thx.date.DateParser.parse(test.test,thx.date.TestDateParser.now);
			utest.Assert.same(e,r,null,i + 1 + ". expected " + test.expected + " but was " + r + " for '" + test.test + "'",{ fileName : "TestDateParser.hx", lineNumber : 143, className : "thx.date.TestDateParser", methodName : "testParseComplexDates"});
		}
	}
	,testParseTime: function() {
		var tests = [{ expected : { hour : 23, minute : 59, second : 59, millis : 0.999, matched : "at midnight"}, test : "at midnight"},{ expected : { hour : 20, minute : 0, second : 0, millis : 0.0, matched : "8 in the evening"}, test : "8 in the evening"},{ expected : { hour : 17, minute : 0, second : 0, millis : 0.0, matched : "in the evening"}, test : "in the evening"},{ expected : { hour : 19, minute : 0, second : 0, millis : 0.0, matched : "at 7pm"}, test : "at 7pm"},{ expected : { hour : 19, minute : 0, second : 0, millis : 0.0, matched : "7 pm"}, test : "7 pm"},{ expected : { hour : 5, minute : 3, second : 0, millis : 0.0, matched : "05:03:00"}, test : "05:03:00"},{ expected : { hour : 5, minute : 0, second : 59, millis : 0.123, matched : "05:00:59.123"}, test : "05:00:59.123"},{ expected : { hour : 4, minute : 0, second : 0, millis : 0.0, matched : "4:00"}, test : "4:00"},{ expected : { hour : 4, minute : 0, second : 0, millis : 0.0, matched : "4:00am"}, test : "4:00am"},{ expected : { hour : 16, minute : 0, second : 0, millis : 0.0, matched : "4:00pm"}, test : "4:00pm"},{ expected : { hour : 17, minute : 0, second : 0, millis : 0.0, matched : "17:00"}, test : "17:00"},{ expected : { hour : 8, minute : 0, second : 0, millis : 0.0, matched : "0800"}, test : "0800"},{ expected : { hour : 20, minute : 0, second : 0, millis : 0.0, matched : "0800 pm"}, test : "0800 pm"},{ expected : { hour : 20, minute : 0, second : 0, millis : 0.0, matched : " 0800 pm"}, test : "123 0800 pm"},{ expected : { hour : 20, minute : 15, second : 0, millis : 0.0, matched : "0815 pm "}, test : "0815 pm 123"},{ expected : { hour : 20, minute : 0, second : 0, millis : 0.0, matched : " 0800 pm "}, test : "123 0800 pm 123"}];
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			utest.Assert.same(test.expected,thx.date.DateParser.parseTime(test.test),null,null,{ fileName : "TestDateParser.hx", lineNumber : 169, className : "thx.date.TestDateParser", methodName : "testParseTime"});
		}
	}
	,__class__: thx.date.TestDateParser
}
thx.type.TestAll = $hxClasses["thx.type.TestAll"] = function() {
};
thx.type.TestAll.__name__ = ["thx","type","TestAll"];
thx.type.TestAll.addTests = function(runner) {
	thx.type.TestTypes.addTests(runner);
}
thx.type.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.type.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.type.TestAll.prototype = {
	__class__: thx.type.TestAll
}
var Types = $hxClasses["Types"] = function() { }
Types.__name__ = ["Types"];
Types.className = function(o) {
	return Type.getClassName(Type.getClass(o)).split(".").pop();
}
Types.fullName = function(o) {
	return Type.getClassName(Type.getClass(o));
}
Types.typeName = function(o) {
	return (function($this) {
		var $r;
		var $e = (Type["typeof"](o));
		switch( $e[1] ) {
		case 0:
			$r = "null";
			break;
		case 1:
			$r = "Int";
			break;
		case 2:
			$r = "Float";
			break;
		case 3:
			$r = "Bool";
			break;
		case 5:
			$r = "function";
			break;
		case 6:
			var c = $e[2];
			$r = Type.getClassName(c);
			break;
		case 7:
			var e = $e[2];
			$r = Type.getEnumName(e);
			break;
		case 4:
			$r = "Object";
			break;
		case 8:
			$r = "Unknown";
			break;
		}
		return $r;
	}(this));
}
Types.hasSuperClass = function(type,sup) {
	while(null != type) {
		if(type == sup) return true;
		type = Type.getSuperClass(type);
	}
	return false;
}
Types.isAnonymous = function(v) {
	return Reflect.isObject(v) && null == Type.getClass(v);
}
Types["as"] = function(value,type) {
	return Std["is"](value,type)?value:null;
}
Types.ifIs = function(value,type,handler) {
	if(Std["is"](value,type)) handler(value);
	return value;
}
Types.of = function(type,value) {
	return Std["is"](value,type)?value:null;
}
Types.sameType = function(a,b) {
	if(null == a && b == null) return true;
	if(null == a || b == null) return false;
	var tb = Type["typeof"](b);
	var $e = (tb);
	switch( $e[1] ) {
	case 6:
		var c = $e[2];
		return Std["is"](a,c);
	case 7:
		var e = $e[2];
		return Std["is"](a,e);
	default:
		return Type["typeof"](a) == tb;
	}
}
Types.isPrimitive = function(v) {
	return (function($this) {
		var $r;
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
			$r = true;
			break;
		case 5:
		case 7:
		case 4:
		case 8:
			$r = false;
			break;
		case 6:
			var c = $e[2];
			$r = Type.getClassName(c) == "String";
			break;
		}
		return $r;
	}(this));
}
Types.prototype = {
	__class__: Types
}
utest.Runner = $hxClasses["utest.Runner"] = function() {
	this.fixtures = new Array();
	this.onProgress = new utest.Dispatcher();
	this.onStart = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.length = 0;
};
utest.Runner.__name__ = ["utest","Runner"];
utest.Runner.prototype = {
	fixtures: null
	,onProgress: null
	,onStart: null
	,onComplete: null
	,length: null
	,addCase: function(test,setup,teardown,prefix,pattern) {
		if(prefix == null) prefix = "test";
		if(teardown == null) teardown = "teardown";
		if(setup == null) setup = "setup";
		if(!Reflect.isObject(test)) throw "can't add a null object as a test case";
		if(!this.isMethod(test,setup)) setup = null;
		if(!this.isMethod(test,teardown)) teardown = null;
		var fields = Type.getInstanceFields(Type.getClass(test));
		if(pattern == null) {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				if(!StringTools.startsWith(field,prefix)) continue;
				if(!this.isMethod(test,field)) continue;
				this.addFixture(new utest.TestFixture(test,field,setup,teardown));
			}
		} else {
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				if(!pattern.match(field)) continue;
				if(!this.isMethod(test,field)) continue;
				this.addFixture(new utest.TestFixture(test,field,setup,teardown));
			}
		}
	}
	,addFixture: function(fixture) {
		this.fixtures.push(fixture);
		this.length++;
	}
	,getFixture: function(index) {
		return this.fixtures[index];
	}
	,isMethod: function(test,name) {
		try {
			return Reflect.isFunction(Reflect.field(test,name));
		} catch( e ) {
			return false;
		}
	}
	,pos: null
	,run: function() {
		this.pos = 0;
		this.onStart.dispatch(this);
		this.runNext();
	}
	,runNext: function() {
		if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]); else this.onComplete.dispatch(this);
	}
	,runFixture: function(fixture) {
		var handler = new utest.TestHandler(fixture);
		handler.onComplete.add(this.testComplete.$bind(this));
		handler.execute();
	}
	,testComplete: function(h) {
		this.onProgress.dispatch({ result : utest.TestResult.ofHandler(h), done : this.pos, totals : this.length});
		this.runNext();
	}
	,__class__: utest.Runner
}
thx.data.TestValueHandler = $hxClasses["thx.data.TestValueHandler"] = function() {
};
thx.data.TestValueHandler.__name__ = ["thx","data","TestValueHandler"];
thx.data.TestValueHandler.prototype = {
	testBasicValues: function() {
		var ed = Date.fromString("2001-01-02");
		var td = Date.fromString("2001-01-02");
		this.assertHandler(7,function(h) {
			h["int"](7);
		},{ fileName : "TestValueHandler.hx", lineNumber : 16, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler(0.007,function(h) {
			h["float"](0.007);
		},{ fileName : "TestValueHandler.hx", lineNumber : 17, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler(true,function(h) {
			h.bool(true);
		},{ fileName : "TestValueHandler.hx", lineNumber : 18, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler(false,function(h) {
			h.bool(false);
		},{ fileName : "TestValueHandler.hx", lineNumber : 19, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler("hello",function(h) {
			h.string("hello");
		},{ fileName : "TestValueHandler.hx", lineNumber : 20, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler(null,function(h) {
			h["null"]();
		},{ fileName : "TestValueHandler.hx", lineNumber : 21, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
		this.assertHandler(ed,function(h) {
			h.date(td);
		},{ fileName : "TestValueHandler.hx", lineNumber : 22, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	}
	,testArray: function() {
		this.assertHandler([],function(h) {
			h.startArray();
			h.endArray();
		},{ fileName : "TestValueHandler.hx", lineNumber : 27, className : "thx.data.TestValueHandler", methodName : "testArray"});
		this.assertHandler(["a",1,true],function(h) {
			h.startArray();
			h.startItem();
			h.string("a");
			h.endItem();
			h.startItem();
			h["int"](1);
			h.endItem();
			h.startItem();
			h.bool(true);
			h.endItem();
			h.endArray();
		},{ fileName : "TestValueHandler.hx", lineNumber : 31, className : "thx.data.TestValueHandler", methodName : "testArray"});
	}
	,testObject: function() {
		this.assertHandler({ },function(h) {
			h.startObject();
			h.endObject();
		},{ fileName : "TestValueHandler.hx", lineNumber : 48, className : "thx.data.TestValueHandler", methodName : "testObject"});
		this.assertHandler({ name : "thx", coolness : 5},function(h) {
			h.startObject();
			h.startField("name");
			h.string("thx");
			h.endField();
			h.startField("coolness");
			h["int"](5);
			h.endField();
			h.endObject();
		},{ fileName : "TestValueHandler.hx", lineNumber : 52, className : "thx.data.TestValueHandler", methodName : "testObject"});
	}
	,testNested: function() {
		this.assertHandler({ values : [{ id : 0, value : 0.1},{ id : 1, value : 0.2, notes : [1,2,3]}]},function(h) {
			h.startObject();
			h.startField("values");
			h.startArray();
			h.startItem();
			h.startObject();
			h.startField("id");
			h["int"](0);
			h.endField();
			h.startField("value");
			h["float"](0.1);
			h.endField();
			h.endObject();
			h.endItem();
			h.startItem();
			h.startObject();
			h.startField("id");
			h["int"](1);
			h.endField();
			h.startField("value");
			h["float"](0.2);
			h.endField();
			h.startField("notes");
			h.startArray();
			h.startItem();
			h["int"](1);
			h.endItem();
			h.startItem();
			h["int"](2);
			h.endItem();
			h.startItem();
			h["int"](3);
			h.endItem();
			h.endArray();
			h.endField();
			h.endObject();
			h.endItem();
			h.endArray();
			h.endField();
			h.endObject();
		},{ fileName : "TestValueHandler.hx", lineNumber : 66, className : "thx.data.TestValueHandler", methodName : "testNested"});
	}
	,assertHandler: function(expected,f,pos) {
		var h = new thx.data.ValueHandler();
		h.start();
		f(h);
		h.end();
		utest.Assert.same(expected,h.value,null,"expected: " + Dynamics.string(expected) + " but was " + Dynamics.string(h.value),pos);
	}
	,__class__: thx.data.TestValueHandler
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype = {
	__class__: Reflect
}
thx.languages.De = $hxClasses["thx.languages.De"] = function() {
	this.name = "de";
	this.english = "German";
	this["native"] = "Deutsch";
	this.iso2 = "de";
	this.iso3 = "deu";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
};
thx.languages.De.__name__ = ["thx","languages","De"];
thx.languages.De.__properties__ = {get_language:"getLanguage"}
thx.languages.De.language = null;
thx.languages.De.getLanguage = function() {
	if(null == thx.languages.De.language) thx.languages.De.language = new thx.languages.De();
	return thx.languages.De.language;
}
thx.languages.De.__super__ = thx.culture.Language;
thx.languages.De.prototype = $extend(thx.culture.Language.prototype,{
	__class__: thx.languages.De
});
thx.cultures.DeDE = $hxClasses["thx.cultures.DeDE"] = function() {
	this.language = thx.languages.De.getLanguage();
	this.name = "de-DE";
	this.english = "German (Germany)";
	this["native"] = "Deutsch (Deutschland)";
	this.date = new thx.culture.core.DateTimeInfo(["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""],["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],["So","Mo","Di","Mi","Do","Fr","Sa"],["So","Mo","Di","Mi","Do","Fr","Sa"],null,null,".",":",1,"%B %Y","%d %B","%A, %e. %B %Y","%d.%m.%Y","%a, %d %b %Y %H:%M:%S GMT","%A, %e. %B %Y %H:%M:%S","%Y-%m-%d %H:%M:%SZ","%Y-%m-%dT%H:%M:%S","%H:%M:%S","%H:%M");
	this.symbolNaN = "n. def.";
	this.symbolPercent = "%";
	this.symbolPermille = "‰";
	this.signNeg = "-";
	this.signPos = "+";
	this.symbolNegInf = "-unendlich";
	this.symbolPosInf = "+unendlich";
	this.number = new thx.culture.core.NumberInfo(2,",",[3],".","-n","n");
	this.currency = new thx.culture.core.NumberInfo(2,",",[3],".","-n $","n $");
	this.percent = new thx.culture.core.NumberInfo(2,",",[3],".","-n%","n%");
	this.pluralRule = 1;
	this.englishCurrency = "Euro";
	this.nativeCurrency = "Euro";
	this.currencySymbol = "€";
	this.currencyIso = "EUR";
	this.englishRegion = "Germany";
	this.nativeRegion = "Deutschland";
	this.iso2 = "DE";
	this.iso3 = "DEU";
	this.isMetric = false;
	thx.culture.Culture.add(this);
};
thx.cultures.DeDE.__name__ = ["thx","cultures","DeDE"];
thx.cultures.DeDE.__properties__ = {get_culture:"getCulture"}
thx.cultures.DeDE.culture = null;
thx.cultures.DeDE.getCulture = function() {
	if(null == thx.cultures.DeDE.culture) thx.cultures.DeDE.culture = new thx.cultures.DeDE();
	return thx.cultures.DeDE.culture;
}
thx.cultures.DeDE.__super__ = thx.culture.Culture;
thx.cultures.DeDE.prototype = $extend(thx.culture.Culture.prototype,{
	__class__: thx.cultures.DeDE
});
thx.date.DateParser = $hxClasses["thx.date.DateParser"] = function() { }
thx.date.DateParser.__name__ = ["thx","date","DateParser"];
thx.date.DateParser.parse = function(s,d) {
	var time = thx.date.DateParser.parseTime(s), v;
	if(null == d) d = Date.now();
	s = StringTools.replace(s,time.matched,"");
	var year = 0, month = 0, day = 0, found = null != time.matched;
	if(thx.date.DateParser.dateexp.match(s)) {
		found = true;
		s = StringTools.replace(s,thx.date.DateParser.dateexp.matched(0),"");
		if(null != (v = thx.date.DateParser.dateexp.matched(1))) {
			day = Std.parseInt(thx.date.DateParser.dateexp.matched(2));
			month = thx.date.DateParser.months.indexOf(v.toLowerCase());
			year = null != (v = thx.date.DateParser.dateexp.matched(3))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(4))) {
			day = Std.parseInt(thx.date.DateParser.dateexp.matched(5));
			month = thx.date.DateParser.shortmonths.indexOf(v.toLowerCase());
			year = null != (v = thx.date.DateParser.dateexp.matched(6))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(8))) {
			month = thx.date.DateParser.months.indexOf(v.toLowerCase());
			day = null != (v = thx.date.DateParser.dateexp.matched(7))?Std.parseInt(v):1;
			year = null != (v = thx.date.DateParser.dateexp.matched(9))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(11))) {
			month = thx.date.DateParser.shortmonths.indexOf(v.toLowerCase());
			day = null != (v = thx.date.DateParser.dateexp.matched(10))?Std.parseInt(v):1;
			year = null != (v = thx.date.DateParser.dateexp.matched(12))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(14))) {
			month = thx.date.DateParser.months.indexOf(v.toLowerCase());
			day = null != (v = thx.date.DateParser.dateexp.matched(13))?Std.parseInt(v):1;
			year = null != (v = thx.date.DateParser.dateexp.matched(15))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(17))) {
			month = thx.date.DateParser.shortmonths.indexOf(v.toLowerCase());
			day = null != (v = thx.date.DateParser.dateexp.matched(16))?Std.parseInt(v):1;
			year = null != (v = thx.date.DateParser.dateexp.matched(18))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(19))) {
			day = Std.parseInt(thx.date.DateParser.dateexp.matched(20));
			month = Std.parseInt(v) - 1;
			year = null != (v = thx.date.DateParser.dateexp.matched(21))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(23))) {
			day = Std.parseInt(thx.date.DateParser.dateexp.matched(22));
			month = Std.parseInt(v) - 1;
			year = null != (v = thx.date.DateParser.dateexp.matched(24))?thx.date.DateParser.fixyear(Std.parseInt(v)):d.getFullYear();
		} else if(null != (v = thx.date.DateParser.dateexp.matched(25))) {
			year = thx.date.DateParser.fixyear(Std.parseInt(v));
			day = Std.parseInt(thx.date.DateParser.dateexp.matched(27));
			month = Std.parseInt(thx.date.DateParser.dateexp.matched(26)) - 1;
		} else if(null != (v = thx.date.DateParser.dateexp.matched(28))) {
			year = d.getFullYear();
			day = Std.parseInt(v);
			month = d.getMonth();
		}
	} else if(thx.date.DateParser.absdateexp.match(s)) {
		found = true;
		s = StringTools.replace(s,thx.date.DateParser.absdateexp.matched(0),"");
		year = d.getFullYear();
		month = d.getMonth();
		day = d.getDate();
		if(null != (v = thx.date.DateParser.absdateexp.matched(1))) switch(v.toLowerCase()) {
		case "now":case "this second":
			if(null == time.matched) {
				time.hour = d.getHours();
				time.minute = d.getMinutes();
				time.second = d.getSeconds();
			}
			break;
		case "tomorrow":
			day += 1;
			break;
		case "yesterday":
			day -= 1;
			break;
		} else if(null != (v = thx.date.DateParser.absdateexp.matched(3))) {
			var t = thx.date.DateParser.absdateexp.matched(2), v1 = thx.date.DateParser.months.indexOf(v.toLowerCase());
			if(v1 == month) year += thx.date.DateParser.last(t)?-1:thx.date.DateParser.next(t)?1:0; else if(v1 > month) year += thx.date.DateParser.last(t)?-1:0; else year += thx.date.DateParser.next(t)?1:0;
			month = v1;
			day = 1;
		} else if(null != (v = thx.date.DateParser.absdateexp.matched(5))) {
			var t = thx.date.DateParser.absdateexp.matched(4), v1 = thx.date.DateParser.days.indexOf(v.toLowerCase());
			var wd = d.getDay();
			if(v1 == wd) day += thx.date.DateParser.last(t)?-7:thx.date.DateParser.next(t)?7:0; else if(v1 > wd) day += v1 - wd + (thx.date.DateParser.last(t)?-7:0); else day += v1 - wd + (thx.date.DateParser.next(t)?7:0);
		} else if(null != (v = thx.date.DateParser.absdateexp.matched(7))) {
			var t = thx.date.DateParser.absdateexp.matched(6), v1 = thx.date.DateParser.shortmonths.indexOf(v.toLowerCase());
			if(v1 == month) year += thx.date.DateParser.last(t)?-1:thx.date.DateParser.next(t)?1:0; else if(v1 > month) year += thx.date.DateParser.last(t)?-1:0; else year += thx.date.DateParser.next(t)?1:0;
			month = v1;
			day = 1;
		} else if(null != (v = thx.date.DateParser.absdateexp.matched(9))) {
			var t = thx.date.DateParser.absdateexp.matched(8), v1 = thx.date.DateParser.shortdays.indexOf(v.toLowerCase());
			var wd = d.getDay();
			if(v1 == wd) day += thx.date.DateParser.last(t)?-7:thx.date.DateParser.next(t)?7:0; else if(v1 > wd) day += v1 - wd + (thx.date.DateParser.last(t)?-7:0); else day += v1 - wd + (thx.date.DateParser.next(t)?7:0);
		}
		if(null == time.matched) time.matched = "x";
	} else {
		year = d.getFullYear();
		month = d.getMonth();
		day = d.getDate();
	}
	while(thx.date.DateParser.relexp.match(s)) {
		found = true;
		s = StringTools.replace(s,thx.date.DateParser.relexp.matched(0),"");
		var dir = thx.date.DateParser.relexp.matched(1), qt, period;
		if(null != dir) {
			qt = null != (v = thx.date.DateParser.relexp.matched(2))?Std.parseInt(v):1;
			period = thx.date.DateParser.relexp.matched(3);
		} else {
			period = thx.date.DateParser.relexp.matched(5);
			if(null == period) break;
			qt = null != (v = thx.date.DateParser.relexp.matched(4))?Std.parseInt(v):1;
			dir = null != (v = thx.date.DateParser.relexp.matched(6))?v:"after";
		}
		dir = dir.toLowerCase();
		switch(dir) {
		case "plus":case "+":case "from":case "hence":case "after":
			break;
		case "minus":case "-":case "before":case "ago":
			qt = -qt;
			break;
		}
		switch(dir) {
		case "ago":case "in":
			if(null == time.matched) {
				time.hour = d.getHours();
				time.minute = d.getMinutes();
				time.second = d.getSeconds();
				time.matched = "x";
			}
			break;
		}
		switch(period.toLowerCase()) {
		case "second":case "seconds":
			time.second += qt;
			break;
		case "minute":case "minutes":
			time.minute += qt;
			break;
		case "hour":case "hours":
			time.hour += qt;
			break;
		case "day":case "days":
			day += qt;
			break;
		case "week":case "weeks":
			day += qt * 7;
			break;
		case "month":case "months":
			month += qt;
			break;
		case "year":case "years":
			year += qt;
			break;
		}
	}
	if(!found) throw new thx.error.Error("no date information found in the string '{0}'",null,s,{ fileName : "DateParser.hx", lineNumber : 338, className : "thx.date.DateParser", methodName : "parse"});
	return Date.fromTime(new Date(year,month,day,time.hour,time.minute,time.second).getTime() + time.millis);
}
thx.date.DateParser.parseTime = function(s) {
	var result = { hour : 0, minute : 0, second : 0, millis : 0.0, matched : null};
	if(!thx.date.DateParser.timeexp.match(s)) return result;
	result.matched = thx.date.DateParser.timeexp.matched(0);
	var v;
	if(null != (v = thx.date.DateParser.timeexp.matched(1))) {
		result.hour = Std.parseInt(v) + thx.date.DateParser.plusPm(thx.date.DateParser.timeexp.matched(3));
		result.minute = Std.parseInt(thx.date.DateParser.timeexp.matched(2));
	} else if(null != (v = thx.date.DateParser.timeexp.matched(4))) {
		result.hour = Std.parseInt(v);
		result.minute = Std.parseInt(thx.date.DateParser.timeexp.matched(5));
		if(null != (v = thx.date.DateParser.timeexp.matched(6))) result.second = Std.parseInt(v);
		if(null != (v = thx.date.DateParser.timeexp.matched(7))) result.millis = Std.parseFloat(v) / 1000;
	} else if(null != (v = thx.date.DateParser.timeexp.matched(8))) {
		result.hour = Std.parseInt(v) + thx.date.DateParser.plusPm(thx.date.DateParser.timeexp.matched(10));
		result.minute = Std.parseInt(thx.date.DateParser.timeexp.matched(9));
	} else if(null != (v = thx.date.DateParser.timeexp.matched(11))) result.hour = Std.parseInt(v) + thx.date.DateParser.plusPm(thx.date.DateParser.timeexp.matched(12)); else if(null != (v = thx.date.DateParser.timeexp.matched(13))) switch(v.toLowerCase()) {
	case "evening":
		result.hour = 17;
		break;
	case "morning":
		result.hour = 8;
		break;
	case "afternoon":
		result.hour = 14;
		break;
	case "sunsrise":case "dawn":
		result.hour = 6;
		break;
	case "sunset":case "dusk":
		result.hour = 19;
		break;
	case "noon":case "midday":case "mid-day":
		result.hour = 12;
		break;
	case "mid-night":case "midnight":
		result.hour = 23;
		result.minute = 59;
		result.second = 59;
		result.millis = 0.999;
		break;
	} else throw new thx.error.Error("failed to parse time for '{0}'",null,s,{ fileName : "DateParser.hx", lineNumber : 405, className : "thx.date.DateParser", methodName : "parseTime"});
	return result;
}
thx.date.DateParser.fixyear = function(y) {
	if(y < 70) return 2000 + y; else if(y < 100) return 1900 + y; else return y;
}
thx.date.DateParser.last = function(s) {
	if(null == s) return false; else return "last" == s.toLowerCase();
}
thx.date.DateParser.next = function(s) {
	if(null == s) return true; else return "next" == s.toLowerCase();
}
thx.date.DateParser.plusPm = function(s) {
	if(null == s) return 0; else return (function($this) {
		var $r;
		switch(s.toLowerCase()) {
		case "pm":case "evening":case "afternoon":
			$r = 12;
			break;
		default:
			$r = 0;
		}
		return $r;
	}(this));
}
thx.date.DateParser.prototype = {
	__class__: thx.date.DateParser
}
var DynamicsT = $hxClasses["DynamicsT"] = function() { }
DynamicsT.__name__ = ["DynamicsT"];
DynamicsT.toHash = function(ob) {
	var hash = new Hash();
	return DynamicsT.copyToHash(ob,hash);
}
DynamicsT.copyToHash = function(ob,hash) {
	var _g = 0, _g1 = Reflect.fields(ob);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		hash.set(field,Reflect.field(ob,field));
	}
	return hash;
}
DynamicsT.prototype = {
	__class__: DynamicsT
}
var TestAll = $hxClasses["TestAll"] = function() { }
TestAll.__name__ = ["TestAll"];
TestAll.addTests = function(runner) {
	thx.culture.Culture.setDefaultCulture(thx.cultures.EnUS.getCulture());
	thx.collection.TestAll.addTests(runner);
	thx.color.TestAll.addTests(runner);
	runner.addCase(new thx.data.TestValueEncoder());
	runner.addCase(new thx.data.TestValueHandler());
	thx.date.TestAll.addTests(runner);
	runner.addCase(new thx.csv.TestCsv());
	runner.addCase(new thx.json.TestJson());
	runner.addCase(new thx.ini.TestIni());
	runner.addCase(new thx.number.TestParse());
	thx.error.TestAll.addTests(runner);
	thx.text.TestAll.addTests(runner);
	thx.html.TestAll.addTests(runner);
	thx.math.TestAll.addTests(runner);
	thx.svg.TestAll.addTests(runner);
	thx.xml.TestAll.addTests(runner);
	thx.type.TestAll.addTests(runner);
	thx.util.TestAll.addTests(runner);
	thx.validation.TestAll.addTests(runner);
	TestArrays.addTests(runner);
	TestFloats.addTests(runner);
	runner.addCase(new TestDates());
	TestInts.addTests(runner);
	TestIterators.addTests(runner);
	TestHashes.addTests(runner);
	TestObjects.addTests(runner);
	TestStrings.addTests(runner);
}
TestAll.main = function() {
	var runner = new utest.Runner();
	TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestAll.prototype = {
	__class__: TestAll
}
thx.validation.TestDateRange = $hxClasses["thx.validation.TestDateRange"] = function() {
};
thx.validation.TestDateRange.__name__ = ["thx","validation","TestDateRange"];
thx.validation.TestDateRange.__super__ = thx.validation.TestAll;
thx.validation.TestDateRange.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.DateRangeValidator(Date.fromString("2011-01-01"),Date.fromString("2011-01-31"));
		this.assertValidation(validator.validate(Date.fromString("2011-01-01")),true,null,{ fileName : "TestDateRange.hx", lineNumber : 15, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(Date.fromString("2011-01-10")),true,null,{ fileName : "TestDateRange.hx", lineNumber : 16, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(Date.fromString("2011-01-31")),true,null,{ fileName : "TestDateRange.hx", lineNumber : 17, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator.validate(Date.fromString("2011-02-10")),false,null,{ fileName : "TestDateRange.hx", lineNumber : 18, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		var validator1 = new thx.validation.DateRangeValidator(Date.fromString("2011-01-01"),Date.fromString("2011-01-31"),false,false);
		this.assertValidation(validator1.validate(Date.fromString("2011-01-01")),false,null,{ fileName : "TestDateRange.hx", lineNumber : 21, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(Date.fromString("2011-01-10")),true,null,{ fileName : "TestDateRange.hx", lineNumber : 22, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(Date.fromString("2011-01-31")),false,null,{ fileName : "TestDateRange.hx", lineNumber : 23, className : "thx.validation.TestDateRange", methodName : "testValidation"});
		this.assertValidation(validator1.validate(Date.fromString("2011-02-10")),false,null,{ fileName : "TestDateRange.hx", lineNumber : 24, className : "thx.validation.TestDateRange", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestDateRange
});
thx.xml.XmlFormat = $hxClasses["thx.xml.XmlFormat"] = function(autoformat,indent,newline) {
	if(autoformat == null) autoformat = true;
	this.autoformat = autoformat;
	this.indent = indent;
	this.newline = newline;
	this.normalizeNewlines = true;
};
thx.xml.XmlFormat.__name__ = ["thx","xml","XmlFormat"];
thx.xml.XmlFormat.prototype = {
	indent: null
	,newline: null
	,stripComments: null
	,autoformat: null
	,normalizeNewlines: null
	,wrapColumns: null
	,format: function(xml) {
		var valueFormat = this.createValueFormat();
		var attributeFormat = this.createAttributeFormat();
		var documentFormat = this.createDocumentFormat();
		var nodeFormat = this.createNodeFormat();
		documentFormat.nodeFormat = nodeFormat;
		nodeFormat.valueFormat = valueFormat;
		nodeFormat.attributeFormat = attributeFormat;
		return documentFormat.format(xml);
	}
	,createValueFormat: function() {
		if(this.autoformat) return new thx.xml.NormalizeWhitespaceValueFormat(); else if(this.normalizeNewlines) return new thx.xml.NormalizeNewlineValueFormat(this.newline); else return new thx.xml.ValueFormat();
	}
	,createAttributeFormat: function() {
		return new thx.xml.AttributeFormat();
	}
	,createDocumentFormat: function() {
		var document;
		if(this.autoformat) {
			var doc = new thx.xml.AutoDocumentFormat();
			if(null != this.indent) doc.indent = this.indent;
			if(null != this.newline) doc.newline = this.newline;
			if(null != this.wrapColumns) doc.wrapColumns = this.wrapColumns;
			document = doc;
		} else document = new thx.xml.DocumentFormat();
		if(null != this.stripComments) document.stripComments = this.stripComments;
		return document;
	}
	,createNodeFormat: function() {
		return new thx.xml.NodeFormat();
	}
	,__class__: thx.xml.XmlFormat
}
thx.html.HtmlVersion = $hxClasses["thx.html.HtmlVersion"] = { __ename__ : ["thx","html","HtmlVersion"], __constructs__ : ["Html401Strict","Html401Transitional","Html401Frameset","Html5","XHtml10Transitional","XHtml10Strict","XHtml10Frameset","XHtml11"] }
thx.html.HtmlVersion.Html401Strict = ["Html401Strict",0];
thx.html.HtmlVersion.Html401Strict.toString = $estr;
thx.html.HtmlVersion.Html401Strict.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.Html401Transitional = ["Html401Transitional",1];
thx.html.HtmlVersion.Html401Transitional.toString = $estr;
thx.html.HtmlVersion.Html401Transitional.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.Html401Frameset = ["Html401Frameset",2];
thx.html.HtmlVersion.Html401Frameset.toString = $estr;
thx.html.HtmlVersion.Html401Frameset.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.Html5 = ["Html5",3];
thx.html.HtmlVersion.Html5.toString = $estr;
thx.html.HtmlVersion.Html5.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.XHtml10Transitional = ["XHtml10Transitional",4];
thx.html.HtmlVersion.XHtml10Transitional.toString = $estr;
thx.html.HtmlVersion.XHtml10Transitional.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.XHtml10Strict = ["XHtml10Strict",5];
thx.html.HtmlVersion.XHtml10Strict.toString = $estr;
thx.html.HtmlVersion.XHtml10Strict.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.XHtml10Frameset = ["XHtml10Frameset",6];
thx.html.HtmlVersion.XHtml10Frameset.toString = $estr;
thx.html.HtmlVersion.XHtml10Frameset.__enum__ = thx.html.HtmlVersion;
thx.html.HtmlVersion.XHtml11 = ["XHtml11",7];
thx.html.HtmlVersion.XHtml11.toString = $estr;
thx.html.HtmlVersion.XHtml11.__enum__ = thx.html.HtmlVersion;
thx.cultures.EnIN = $hxClasses["thx.cultures.EnIN"] = function() {
	this.language = thx.languages.En.getLanguage();
	this.name = "en-IN";
	this.english = "English (India)";
	this["native"] = "English (India)";
	this.date = new thx.culture.core.DateTimeInfo(["January","February","March","April","May","June","July","August","September","October","November","December",""],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Su","Mo","Tu","We","Th","Fr","Sa"],"AM","PM","-",":",1,"%B, %Y","%B %d","%d %B %Y","%d-%m-%Y","%a, %d %b %Y %H:%M:%S GMT","%d %B %Y %H:%M:%S","%Y-%m-%d %H:%M:%SZ","%Y-%m-%dT%H:%M:%S","%H:%M:%S","%H:%M:%S");
	this.symbolNaN = "NaN";
	this.symbolPercent = "%";
	this.symbolPermille = "‰";
	this.signNeg = "-";
	this.signPos = "+";
	this.symbolNegInf = "-Infinity";
	this.symbolPosInf = "Infinity";
	this.number = new thx.culture.core.NumberInfo(2,".",[3,2],",","-n","n");
	this.currency = new thx.culture.core.NumberInfo(2,".",[3,2],",","$ -n","$ n");
	this.percent = new thx.culture.core.NumberInfo(2,".",[3,2],",","-n %","n %");
	this.pluralRule = 1;
	this.englishCurrency = "Indian Rupee;";
	this.nativeCurrency = "Rupee;";
	this.currencySymbol = "Rs.";
	this.currencyIso = "INR";
	this.englishRegion = "India";
	this.nativeRegion = "India";
	this.iso2 = "IN";
	this.iso3 = "IND";
	this.isMetric = false;
	thx.culture.Culture.add(this);
};
thx.cultures.EnIN.__name__ = ["thx","cultures","EnIN"];
thx.cultures.EnIN.__properties__ = {get_culture:"getCulture"}
thx.cultures.EnIN.culture = null;
thx.cultures.EnIN.getCulture = function() {
	if(null == thx.cultures.EnIN.culture) thx.cultures.EnIN.culture = new thx.cultures.EnIN();
	return thx.cultures.EnIN.culture;
}
thx.cultures.EnIN.__super__ = thx.culture.Culture;
thx.cultures.EnIN.prototype = $extend(thx.culture.Culture.prototype,{
	__class__: thx.cultures.EnIN
});
thx.text.ERegs = $hxClasses["thx.text.ERegs"] = function() { }
thx.text.ERegs.__name__ = ["thx","text","ERegs"];
thx.text.ERegs.escapeERegChars = function(s) {
	return thx.text.ERegs._escapePattern.customReplace(s,function(e) {
		return "\\" + e.matched(0);
	});
}
thx.text.ERegs.prototype = {
	__class__: thx.text.ERegs
}
thx.util.TestTypeLocator = $hxClasses["thx.util.TestTypeLocator"] = function() {
};
thx.util.TestTypeLocator.__name__ = ["thx","util","TestTypeLocator"];
thx.util.TestTypeLocator.addTests = function(runner) {
	runner.addCase(new thx.util.TestTypeLocator());
}
thx.util.TestTypeLocator.main = function() {
	var runner = new utest.Runner();
	thx.util.TestTypeLocator.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.util.TestTypeLocator.prototype = {
	testBind: function() {
		var locator = new thx.util.TypeLocator().bind(thx.util.type.ITest,function() {
			return new thx.util.type.TestImplementation();
		});
		var o = locator.get(thx.util.type.ITest);
		utest.Assert["is"](o,thx.util.type.ITest,null,{ fileName : "TestTypeLocator.hx", lineNumber : 21, className : "thx.util.TestTypeLocator", methodName : "testBind"});
		utest.Assert["is"](o,thx.util.type.TestImplementation,null,{ fileName : "TestTypeLocator.hx", lineNumber : 22, className : "thx.util.TestTypeLocator", methodName : "testBind"});
		utest.Assert.equals("hi",o.sayHello(),null,{ fileName : "TestTypeLocator.hx", lineNumber : 23, className : "thx.util.TestTypeLocator", methodName : "testBind"});
	}
	,testUnbinded: function() {
		var locator = new thx.util.TypeLocator();
		utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeLocator.hx", lineNumber : 29, className : "thx.util.TestTypeLocator", methodName : "testUnbinded"});
		locator.unbinded = function(cls) {
			if("thx.util.type.ITest" == Type.getClassName(cls)) return null;
			try {
				return Type.createInstance(cls,[]);
			} catch( e ) {
				return null;
			}
		};
		utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeLocator.hx", lineNumber : 41, className : "thx.util.TestTypeLocator", methodName : "testUnbinded"});
		utest.Assert.notNull(locator.get(thx.util.type.TestImplementation),null,{ fileName : "TestTypeLocator.hx", lineNumber : 42, className : "thx.util.TestTypeLocator", methodName : "testUnbinded"});
		utest.Assert["is"](locator.get(thx.util.type.TestImplementation),thx.util.type.TestImplementation,null,{ fileName : "TestTypeLocator.hx", lineNumber : 43, className : "thx.util.TestTypeLocator", methodName : "testUnbinded"});
	}
	,testInstance: function() {
		var locator = new thx.util.TypeLocator().instance(thx.util.type.ITest,new thx.util.type.TestImplementation());
		var o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 50, className : "thx.util.TestTypeLocator", methodName : "testInstance"});
		o.counter++;
		o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 53, className : "thx.util.TestTypeLocator", methodName : "testInstance"});
	}
	,testMultipleInstances: function() {
		var locator = new thx.util.TypeLocator().bind(thx.util.type.ITest,function() {
			return new thx.util.type.TestImplementation();
		});
		var o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 60, className : "thx.util.TestTypeLocator", methodName : "testMultipleInstances"});
		o.counter++;
		o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 63, className : "thx.util.TestTypeLocator", methodName : "testMultipleInstances"});
	}
	,testMemoize: function() {
		var locator = new thx.util.TypeLocator().memoize(thx.util.type.ITest,function() {
			return new thx.util.type.TestImplementation();
		});
		var o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 70, className : "thx.util.TestTypeLocator", methodName : "testMemoize"});
		o.counter++;
		o = locator.get(thx.util.type.ITest);
		utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeLocator.hx", lineNumber : 73, className : "thx.util.TestTypeLocator", methodName : "testMemoize"});
	}
	,__class__: thx.util.TestTypeLocator
}
thx.color.TestAll = $hxClasses["thx.color.TestAll"] = function() {
};
thx.color.TestAll.__name__ = ["thx","color","TestAll"];
thx.color.TestAll.addTests = function(runner) {
	runner.addCase(new thx.color.TestCmyk());
	runner.addCase(new thx.color.TestColors());
	runner.addCase(new thx.color.TestHsl());
	runner.addCase(new thx.color.TestRgb());
}
thx.color.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.color.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.color.TestAll.prototype = {
	__class__: thx.color.TestAll
}
utest.ui.text.PlainTextReport = $hxClasses["utest.ui.text.PlainTextReport"] = function(runner,outputHandler) {
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add(this.start.$bind(this));
	this.aggregator.onComplete.add(this.complete.$bind(this));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
};
utest.ui.text.PlainTextReport.__name__ = ["utest","ui","text","PlainTextReport"];
utest.ui.text.PlainTextReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.PlainTextReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,newline: null
	,indent: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,startTime: null
	,start: function(e) {
		this.startTime = haxe.Timer.stamp();
	}
	,indents: function(c) {
		var s = "";
		var _g = 0;
		while(_g < c) {
			var _ = _g++;
			s += this.indent;
		}
		return s;
	}
	,dumpStack: function(stack) {
		if(stack.length == 0) return "";
		var parts = haxe.Stack.toString(stack).split("\n");
		var r = [];
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			if(part.indexOf(" utest.") >= 0) continue;
			r.push(part);
		}
		return r.join(this.newline);
	}
	,addHeader: function(buf,result) {
		if(!utest.ui.common.ReportTools.hasHeader(this,result.stats)) return;
		var end = haxe.Timer.stamp();
		var time = ((end - this.startTime) * 1000 | 0) / 1000;
		buf.add("results: " + (result.stats.isOk?"ALL TESTS OK":"SOME TESTS FAILURES") + this.newline + " " + this.newline);
		buf.add("assertations: " + result.stats.assertations + this.newline);
		buf.add("successes: " + result.stats.successes + this.newline);
		buf.add("errors: " + result.stats.errors + this.newline);
		buf.add("failures: " + result.stats.failures + this.newline);
		buf.add("warnings: " + result.stats.warnings + this.newline);
		buf.add("execution time: " + time + this.newline);
		buf.add(this.newline);
	}
	,result: null
	,getResults: function() {
		var buf = new StringBuf();
		this.addHeader(buf,this.result);
		var _g = 0, _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(utest.ui.common.ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) continue;
			var _g2 = 0, _g3 = pack.classNames();
			while(_g2 < _g3.length) {
				var cname = _g3[_g2];
				++_g2;
				var cls = pack.getClass(cname);
				if(utest.ui.common.ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) continue;
				buf.add((pname == ""?"":pname + ".") + cname + this.newline);
				var _g4 = 0, _g5 = cls.methodNames();
				while(_g4 < _g5.length) {
					var mname = _g5[_g4];
					++_g4;
					var fix = cls.get(mname);
					if(utest.ui.common.ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) continue;
					buf.add(this.indents(1) + mname + ": ");
					if(fix.stats.isOk) buf.b[buf.b.length] = "OK "; else if(fix.stats.hasErrors) buf.b[buf.b.length] = "ERROR "; else if(fix.stats.hasFailures) buf.b[buf.b.length] = "FAILURE "; else if(fix.stats.hasWarnings) buf.b[buf.b.length] = "WARNING ";
					var messages = "";
					var $it0 = fix.iterator();
					while( $it0.hasNext() ) {
						var assertation = $it0.next();
						var $e = (assertation);
						switch( $e[1] ) {
						case 0:
							var pos = $e[2];
							buf.b[buf.b.length] = ".";
							break;
						case 1:
							var pos = $e[3], msg = $e[2];
							buf.b[buf.b.length] = "F";
							messages += this.indents(2) + "line: " + pos.lineNumber + ", " + msg + this.newline;
							break;
						case 2:
							var s = $e[3], e = $e[2];
							buf.b[buf.b.length] = "E";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 3:
							var s = $e[3], e = $e[2];
							buf.b[buf.b.length] = "S";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 4:
							var s = $e[3], e = $e[2];
							buf.b[buf.b.length] = "T";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 5:
							var s = $e[3], missedAsyncs = $e[2];
							buf.b[buf.b.length] = "O";
							messages += this.indents(2) + "missed async calls: " + missedAsyncs + this.dumpStack(s) + this.newline;
							break;
						case 6:
							var s = $e[3], e = $e[2];
							buf.b[buf.b.length] = "A";
							messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
							break;
						case 7:
							var msg = $e[2];
							buf.b[buf.b.length] = "W";
							messages += this.indents(2) + msg + this.newline;
							break;
						}
					}
					buf.add(this.newline);
					buf.b[buf.b.length] = messages == null?"null":messages;
				}
			}
		}
		return buf.b.join("");
	}
	,complete: function(result) {
		this.result = result;
		this.handler(this);
	}
	,__class__: utest.ui.text.PlainTextReport
}
utest.ui.text.PrintReport = $hxClasses["utest.ui.text.PrintReport"] = function(runner) {
	utest.ui.text.PlainTextReport.call(this,runner,this._handler.$bind(this));
	this.newline = "\n";
	this.indent = "  ";
};
utest.ui.text.PrintReport.__name__ = ["utest","ui","text","PrintReport"];
utest.ui.text.PrintReport.__super__ = utest.ui.text.PlainTextReport;
utest.ui.text.PrintReport.prototype = $extend(utest.ui.text.PlainTextReport.prototype,{
	useTrace: null
	,_handler: function(report) {
		this._trace(report.getResults());
	}
	,_trace: function(s) {
		s = StringTools.replace(s,"  ",this.indent);
		s = StringTools.replace(s,"\n",this.newline);
		haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 66, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	}
	,__class__: utest.ui.text.PrintReport
});
thx.math.Random = $hxClasses["thx.math.Random"] = function(seed) {
	if(seed == null) seed = 1;
	this.seed = seed;
};
thx.math.Random.__name__ = ["thx","math","Random"];
thx.math.Random.prototype = {
	seed: null
	,'int': function() {
		return (this.seed = this.seed * 16807 % 2147483647) & 1073741823;
	}
	,'float': function() {
		return ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) / 1073741823.0;
	}
	,__class__: thx.math.Random
}
thx.svg.LineInterpolators = $hxClasses["thx.svg.LineInterpolators"] = function() { }
thx.svg.LineInterpolators.__name__ = ["thx","svg","LineInterpolators"];
thx.svg.LineInterpolators.parse = function(s,sep) {
	if(sep == null) sep = "-";
	var interp = s.split(sep)[0].toLowerCase();
	return (function($this) {
		var $r;
		switch(interp) {
		case "basis":
			$r = thx.svg.LineInterpolator.Basis;
			break;
		case "basisopen":
			$r = thx.svg.LineInterpolator.BasisOpen;
			break;
		case "basisclosed":
			$r = thx.svg.LineInterpolator.BasisClosed;
			break;
		case "cardinal":
			$r = thx.svg.LineInterpolator.Cardinal(thx.svg.LineInterpolators.argument(s));
			break;
		case "cardinalopen":
			$r = thx.svg.LineInterpolator.CardinalOpen(thx.svg.LineInterpolators.argument(s));
			break;
		case "cardinalclosed":
			$r = thx.svg.LineInterpolator.CardinalClosed(thx.svg.LineInterpolators.argument(s));
			break;
		case "monotone":
			$r = thx.svg.LineInterpolator.Monotone;
			break;
		case "step":
			$r = thx.svg.LineInterpolator.Step;
			break;
		case "stepafter":
			$r = thx.svg.LineInterpolator.StepAfter;
			break;
		case "stepbefore":
			$r = thx.svg.LineInterpolator.StepBefore;
			break;
		default:
			$r = thx.svg.LineInterpolator.Linear;
		}
		return $r;
	}(this));
}
thx.svg.LineInterpolators.argument = function(s) {
	var v = s.split("-")[1];
	if(null == v) return null; else return Std.parseFloat(v);
}
thx.svg.LineInterpolators.prototype = {
	__class__: thx.svg.LineInterpolators
}
thx.text.TestPaths = $hxClasses["thx.text.TestPaths"] = function() {
};
thx.text.TestPaths.__name__ = ["thx","text","TestPaths"];
thx.text.TestPaths.addTests = function(runner) {
	runner.addCase(new thx.text.TestPaths());
}
thx.text.TestPaths.main = function() {
	var runner = new utest.Runner();
	thx.text.TestPaths.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.text.TestPaths.prototype = {
	__class__: thx.text.TestPaths
}
thx.math.scale.Linear = $hxClasses["thx.math.scale.Linear"] = function() {
	thx.math.scale.NumericScale.call(this);
	this.m = 10;
};
thx.math.scale.Linear.__name__ = ["thx","math","scale","Linear"];
thx.math.scale.Linear.__super__ = thx.math.scale.NumericScale;
thx.math.scale.Linear.prototype = $extend(thx.math.scale.NumericScale.prototype,{
	m: null
	,getModulo: function() {
		return this.m;
	}
	,modulo: function(m) {
		this.m = m;
		return this;
	}
	,tickRange: function() {
		var start = Arrays.min(this._domain), stop = Arrays.max(this._domain), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / this.m) / 2.302585092994046)), err = this.m / (span / step);
		if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= .75) step *= 2;
		return { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
	}
	,ticks: function() {
		var range = this.tickRange();
		return Floats.range(range.start,range.stop,range.step);
	}
	,tickFormat: function(v,i) {
		var n = Math.max(0,-Math.floor(Math.log(this.tickRange().step) / 2.302585092994046 + .01));
		return Floats.format(v,"D:" + n);
	}
	,__class__: thx.math.scale.Linear
});
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype = {
	__class__: Lambda
}
thx.svg.LineInternals = $hxClasses["thx.svg.LineInternals"] = function() { }
thx.svg.LineInternals.__name__ = ["thx","svg","LineInternals"];
thx.svg.LineInternals.linePoints = function(data,x,y) {
	var points = [], value;
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		points.push([x(value = data[i],i),y(value,i)]);
	}
	return points;
}
thx.svg.LineInternals.interpolatePoints = function(points,type) {
	if(null == type) type = thx.svg.LineInterpolator.Linear;
	var path = [], i = 0, n = points.length, p = points[0];
	var $e = (type);
	switch( $e[1] ) {
	case 0:
		path.push(p[0] + "," + p[1]);
		while(++i < n) {
			p = points[i];
			path.push("L" + p[0] + "," + p[1]);
		}
		break;
	case 1:
		var p1;
		path.push(p[0] + "," + p[1]);
		while(++i < n - 1) {
			p = points[i];
			p1 = points[i + 1];
			path.push("H" + (p[0] + p1[0]) / 2 + "V" + p[1]);
		}
		p = points[i];
		path.push("H" + p[0] + "V" + p[1]);
		break;
	case 2:
		path.push(p[0] + "," + p[1]);
		while(++i < n) {
			p = points[i];
			path.push("V" + p[1] + "H" + p[0]);
		}
		break;
	case 3:
		path.push(p[0] + "," + p[1]);
		while(++i < n) {
			p = points[i];
			path.push("H" + p[0] + "V" + p[1]);
		}
		break;
	case 4:
		if(points.length < 3) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
		i = 1;
		var x0 = p[0], y0 = p[1], px = [x0,x0,x0,(p = points[1])[0]], py = [y0,y0,y0,p[1]];
		path.push(x0 + "," + y0);
		thx.svg.LineInternals._lineBasisBezier(path,px,py);
		while(++i < n) {
			p = points[i];
			px.shift();
			px.push(p[0]);
			py.shift();
			py.push(p[1]);
			thx.svg.LineInternals._lineBasisBezier(path,px,py);
		}
		i = -1;
		while(++i < 2) {
			px.shift();
			px.push(p[0]);
			py.shift();
			py.push(p[1]);
			thx.svg.LineInternals._lineBasisBezier(path,px,py);
		}
		break;
	case 5:
		if(points.length < 4) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
		i = -1;
		var pi, px = [0.0], py = [0.0];
		while(++i < 3) {
			pi = points[i];
			px.push(pi[0]);
			py.push(pi[1]);
		}
		path.push(thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,px) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,py));
		--i;
		while(++i < n) {
			pi = points[i];
			px.shift();
			px.push(pi[0]);
			py.shift();
			py.push(pi[1]);
			thx.svg.LineInternals._lineBasisBezier(path,px,py);
		}
		break;
	case 6:
		i = -1;
		var m = n + 4, px = [], py = [];
		while(++i < 4) {
			p = points[i % n];
			px.push(p[0]);
			py.push(p[1]);
		}
		path.push(thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,px) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,py));
		--i;
		while(++i < m) {
			p = points[i % n];
			px.shift();
			px.push(p[0]);
			py.shift();
			py.push(p[1]);
			thx.svg.LineInternals._lineBasisBezier(path,px,py);
		}
		break;
	case 7:
		var tension = $e[2];
		if(null == tension) tension = .7;
		if(points.length < 3) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear); else return points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents(points,tension));
		break;
	case 8:
		var tension = $e[2];
		return points.length < 4?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[1][0] + "," + points[1][1] + thx.svg.LineInternals._lineCardinalTangents(points,tension);
	case 9:
		var tension = $e[2];
		if(null == tension) tension = .7;
		return points.length < 3?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents([points[points.length - 2]].concat(points).concat([points[1]]),tension));
	case 10:
		return points.length < 3?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[0] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineMonotoneTangents(points));
	}
	return path.join("");
}
thx.svg.LineInternals._lineDot4 = function(a,b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
thx.svg.LineInternals._lineBasisBezier = function(path,x,y) {
	path.push("C" + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,y));
}
thx.svg.LineInternals._lineSlope = function(p0,p1) {
	return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}
thx.svg.LineInternals._lineFiniteDifferences = function(points) {
	var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = thx.svg.LineInternals._lineSlope(p0,p1);
	while(++i < j) m[i] = d + (d = thx.svg.LineInternals._lineSlope(p0 = p1,p1 = points[i + 1]));
	m[i] = d;
	return m;
}
thx.svg.LineInternals._lineMonotoneTangents = function(points) {
	var tangents = [], d, a, b, s, m = thx.svg.LineInternals._lineFiniteDifferences(points), i = -1, j = points.length - 1;
	while(++i < j) {
		d = thx.svg.LineInternals._lineSlope(points[i],points[i + 1]);
		if(Math.abs(d) < 1e-6) m[i] = m[i + 1] = 0; else {
			a = m[i] / d;
			b = m[i + 1] / d;
			s = a * a + b * b;
			if(s > 9) {
				s = d * 3 / Math.sqrt(s);
				m[i] = s * a;
				m[i + 1] = s * b;
			}
		}
	}
	i = -1;
	while(++i <= j) {
		s = (points[Ints.min(j,i + 1)][0] - points[Ints.max(0,i - 1)][0]) / (6 * (1 + m[i] * m[i]));
		tangents.push([Math.isFinite(s)?s:0,Math.isFinite(s = m[i] * s)?s:0]);
	}
	return tangents;
}
thx.svg.LineInternals._lineHermite = function(points,tangents) {
	if(tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
	var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
	if(quad) {
		path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
		p0 = points[1];
		pi = 2;
	}
	if(tangents.length > 1) {
		t = tangents[1];
		p = points[pi];
		pi++;
		path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
		var _g1 = 2, _g = tangents.length;
		while(_g1 < _g) {
			var i = _g1++;
			p = points[pi];
			t = tangents[i];
			path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
			pi++;
		}
	}
	if(quad) {
		var lp = points[pi];
		path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
	}
	return path;
}
thx.svg.LineInternals._lineCardinalTangents = function(points,tension) {
	var tangents = [], a = (1 - tension) / 2, p0 = points[0], p1 = points[1], p2 = points[2], i = 2, n = points.length;
	while(++i < n) {
		tangents.push([a * (p2[0] - p0[0]),a * (p2[1] - p0[1])]);
		p0 = p1;
		p1 = p2;
		p2 = points[i];
	}
	tangents.push([a * (p2[0] - p0[0]),a * (p2[1] - p0[1])]);
	return tangents;
}
thx.svg.LineInternals.prototype = {
	__class__: thx.svg.LineInternals
}
thx.math.scale.Ordinal = $hxClasses["thx.math.scale.Ordinal"] = function() {
	this._domain = [];
	this._range = [];
	this.rangeBand = 0.0;
};
thx.math.scale.Ordinal.__name__ = ["thx","math","scale","Ordinal"];
thx.math.scale.Ordinal.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.Ordinal.prototype = {
	_domain: null
	,_range: null
	,rangeBand: null
	,scale: function(x,_) {
		var i = this._domain.indexOf(x);
		if(i < 0) {
			this._domain.push(x);
			i = this._domain.length - 1;
		}
		return this._range[i];
	}
	,getDomain: function() {
		return this._domain.copy();
	}
	,domain: function(x) {
		this._domain = x.copy();
		return this;
	}
	,getRange: function() {
		return this._range.copy();
	}
	,range: function(a) {
		this._range = a.copy();
		return this;
	}
	,rangePoints: function(start,stop,padding) {
		if(padding == null) padding = 0.0;
		var step = (stop - start) / (this._domain.length - 1 + padding);
		var range = this._domain.length == 1?[(start + stop) / 2]:Floats.range(start + step * padding / 2,stop + step / 2,step);
		var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
		ordinal.rangeBand = 0;
		return ordinal;
	}
	,rangeBands: function(start,stop,padding) {
		if(padding == null) padding = 0.0;
		var step = (stop - start) / (this._domain.length + padding);
		var range = Floats.range(start + step * padding,stop,step);
		var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
		ordinal.rangeBand = step * (1 - padding);
		return ordinal;
	}
	,rangeRoundBands: function(start,stop,padding) {
		if(padding == null) padding = 0.0;
		var diff = stop - start, step = Math.floor(diff / (this._domain.length + padding)), err = diff - (this._domain.length - padding) * step;
		var range = Ints.range(start + Math.round(err / 2),stop,step);
		var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
		ordinal.rangeBand = Math.round(step * (1 - padding));
		return ordinal;
	}
	,__class__: thx.math.scale.Ordinal
}
var Dates = $hxClasses["Dates"] = function() { }
Dates.__name__ = ["Dates"];
Dates.format = function(d,param,params,culture) {
	return (Dates.formatf(param,params,culture))(d);
}
Dates.formatf = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"D");
	var format = params.shift();
	switch(format) {
	case "D":
		return function(d) {
			return thx.culture.FormatDate.date(d,culture);
		};
	case "DS":
		return function(d) {
			return thx.culture.FormatDate.dateShort(d,culture);
		};
	case "DST":
		return function(d) {
			return thx.culture.FormatDate.dateShort(d,culture) + " " + thx.culture.FormatDate.time(d,culture);
		};
	case "DSTS":
		return function(d) {
			return thx.culture.FormatDate.dateShort(d,culture) + " " + thx.culture.FormatDate.timeShort(d,culture);
		};
	case "DTS":
		return function(d) {
			return thx.culture.FormatDate.date(d,culture) + " " + thx.culture.FormatDate.timeShort(d,culture);
		};
	case "Y":
		return function(d) {
			return thx.culture.FormatDate.year(d,culture);
		};
	case "YM":
		return function(d) {
			return thx.culture.FormatDate.yearMonth(d,culture);
		};
	case "M":
		return function(d) {
			return thx.culture.FormatDate.month(d,culture);
		};
	case "MN":
		return function(d) {
			return thx.culture.FormatDate.monthName(d,culture);
		};
	case "MS":
		return function(d) {
			return thx.culture.FormatDate.monthNameShort(d,culture);
		};
	case "MD":
		return function(d) {
			return thx.culture.FormatDate.monthDay(d,culture);
		};
	case "WD":
		return function(d) {
			return thx.culture.FormatDate.weekDay(d,culture);
		};
	case "WDN":
		return function(d) {
			return thx.culture.FormatDate.weekDayName(d,culture);
		};
	case "WDS":
		return function(d) {
			return thx.culture.FormatDate.weekDayNameShort(d,culture);
		};
	case "R":
		return function(d) {
			return thx.culture.FormatDate.dateRfc(d,culture);
		};
	case "DT":
		return function(d) {
			return thx.culture.FormatDate.dateTime(d,culture);
		};
	case "U":
		return function(d) {
			return thx.culture.FormatDate.universal(d,culture);
		};
	case "S":
		return function(d) {
			return thx.culture.FormatDate.sortable(d,culture);
		};
	case "T":
		return function(d) {
			return thx.culture.FormatDate.time(d,culture);
		};
	case "TS":
		return function(d) {
			return thx.culture.FormatDate.timeShort(d,culture);
		};
	case "C":
		var f = params[0];
		if(null == f) return function(d) {
			return thx.culture.FormatDate.date(d,culture);
		}; else return function(d) {
			return thx.culture.FormatDate.format(f,d,culture,params[1] != null?params[1] == "true":true);
		};
		break;
	default:
		throw new thx.error.Error("Unsupported date format: {0}",null,format,{ fileName : "Dates.hx", lineNumber : 71, className : "Dates", methodName : "formatf"});
	}
}
Dates.interpolate = function(f,a,b,equation) {
	return (Dates.interpolatef(a,b,equation))(f);
}
Dates.interpolatef = function(a,b,equation) {
	var f = Floats.interpolatef(a.getTime(),b.getTime(),equation);
	return function(v) {
		return Date.fromTime(f(v));
	};
}
Dates.snap = function(time,period,mode) {
	if(mode == null) mode = 0;
	if(mode < 0) switch(period) {
	case "second":
		return Math.floor(time / 1000.0) * 1000.0;
	case "minute":
		return Math.floor(time / 60000.0) * 60000.0;
	case "hour":
		return Math.floor(time / 3600000.0) * 3600000.0;
	case "day":
		return Math.floor(time / 86400000.) * 86400000.;
	case "week":
		return Math.floor(time / 604800000.) * 604800000.;
	case "month":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear(),d.getMonth(),1,0,0,0).getTime();
	case "year":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear(),0,1,0,0,0).getTime();
	case "eternity":
		return 0;
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 113, className : "Dates", methodName : "snap"});
			return $r;
		}(this));
	} else if(mode > 0) switch(period) {
	case "second":
		return Math.ceil(time / 1000.0) * 1000.0;
	case "minute":
		return Math.ceil(time / 60000.0) * 60000.0;
	case "hour":
		return Math.ceil(time / 3600000.0) * 3600000.0;
	case "day":
		return Math.ceil(time / 86400000.) * 86400000.;
	case "week":
		return Math.ceil(time / 604800000.) * 604800000.;
	case "month":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear(),d.getMonth() + 1,1,0,0,0).getTime();
	case "year":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear() + 1,0,1,0,0,0).getTime();
	case "eternity":
		return 0;
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 138, className : "Dates", methodName : "snap"});
			return $r;
		}(this));
	} else switch(period) {
	case "second":
		return Math.round(time / 1000.0) * 1000.0;
	case "minute":
		return Math.round(time / 60000.0) * 60000.0;
	case "hour":
		return Math.round(time / 3600000.0) * 3600000.0;
	case "day":
		return Math.round(time / 86400000.) * 86400000.;
	case "week":
		return Math.round(time / 604800000.) * 604800000.;
	case "month":
		var d = Date.fromTime(time), mod = d.getDate() > Math.round(DateTools.getMonthDays(d) / 2)?1:0;
		return new Date(d.getFullYear(),d.getMonth() + mod,1,0,0,0).getTime();
	case "year":
		var d = Date.fromTime(time), mod = time > new Date(d.getFullYear(),6,2,0,0,0).getTime()?1:0;
		return new Date(d.getFullYear() + mod,0,1,0,0,0).getTime();
	case "eternity":
		return 0;
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 164, className : "Dates", methodName : "snap"});
			return $r;
		}(this));
	}
}
Dates.snapToWeekDay = function(time,day) {
	var d = Date.fromTime(time).getDay();
	var s = 0;
	switch(day.toLowerCase()) {
	case "sunday":
		s = 0;
		break;
	case "monday":
		s = 1;
		break;
	case "tuesday":
		s = 2;
		break;
	case "wednesday":
		s = 3;
		break;
	case "thursday":
		s = 4;
		break;
	case "friday":
		s = 5;
		break;
	case "saturday":
		s = 6;
		break;
	default:
		throw new thx.error.Error("unknown week day '{0}'",null,day,{ fileName : "Dates.hx", lineNumber : 190, className : "Dates", methodName : "snapToWeekDay"});
	}
	return time - (d - s) % 7 * 24 * 60 * 60 * 1000;
}
Dates.canParse = function(s) {
	return Dates._reparse.match(s);
}
Dates.parse = function(s) {
	var parts = s.split(".");
	var date = Date.fromString(StringTools.replace(parts[0],"T"," "));
	if(parts.length > 1) date = Date.fromTime(date.getTime() + Std.parseInt(parts[1]));
	return date;
}
Dates.compare = function(a,b) {
	return Floats.compare(a.getTime(),b.getTime());
}
Dates.prototype = {
	__class__: Dates
}
thx.validation.TestCustomValidator = $hxClasses["thx.validation.TestCustomValidator"] = function() {
};
thx.validation.TestCustomValidator.__name__ = ["thx","validation","TestCustomValidator"];
thx.validation.TestCustomValidator.prototype = {
	testValidation: function() {
		var validator = new thx.validation.CustomValidator();
		utest.Assert.same(thx.util.Result.Ok,validator.validate("a"),null,null,{ fileName : "TestCustomValidator.hx", lineNumber : 19, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
		validator.add(function(v) {
			return v.toUpperCase() == v?null:new thx.util.Message("string '{0}' must be all uppercase",null,v);
		});
		utest.Assert.isTrue((function($this) {
			var $r;
			switch( (validator.validate("a"))[1] ) {
			case 0:
				$r = false;
				break;
			case 1:
				$r = true;
				break;
			}
			return $r;
		}(this)),null,{ fileName : "TestCustomValidator.hx", lineNumber : 25, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
		utest.Assert.same(thx.util.Result.Ok,validator.validate("A"),null,null,{ fileName : "TestCustomValidator.hx", lineNumber : 29, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
		validator.add(function(v) {
			return StringTools.replace(v," ","") == v?null:new thx.util.Message("string '{0}' must not contain spaces",null,v);
		});
		utest.Assert.isTrue((function($this) {
			var $r;
			switch( (validator.validate("A A"))[1] ) {
			case 0:
				$r = false;
				break;
			case 1:
				$r = true;
				break;
			}
			return $r;
		}(this)),null,{ fileName : "TestCustomValidator.hx", lineNumber : 36, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
		utest.Assert.same(thx.util.Result.Ok,validator.validate("AA"),null,null,{ fileName : "TestCustomValidator.hx", lineNumber : 40, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestCustomValidator
}
thx.math.scale.Quantile = $hxClasses["thx.math.scale.Quantile"] = function() {
	this._domain = [];
	this._range = [];
	this._thresolds = [];
};
thx.math.scale.Quantile.__name__ = ["thx","math","scale","Quantile"];
thx.math.scale.Quantile.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.Quantile.prototype = {
	_domain: null
	,_range: null
	,_thresolds: null
	,rescale: function() {
		var k = 0, n = this._domain.length, q = this._range.length, i, j;
		this._thresolds[Ints.max(0,q - 2)] = 0.0;
		while(++k < q) this._thresolds[k - 1] = 0 != (j = n * k / q) % 1?this._domain[~~j | 0]:(this._domain[i = ~~j | 0] + this._domain[i - 1]) / 2;
	}
	,scale: function(v,_) {
		return this._range[Arrays.bisectRight(this._thresolds,v,0,null)];
	}
	,getDomain: function() {
		return this._domain;
	}
	,domain: function(x) {
		this._domain = Arrays.filter(x,function(d) {
			return !Math.isNaN(d);
		});
		this._domain.sort(Floats.compare);
		this.rescale();
		return this;
	}
	,getRange: function() {
		return this._range;
	}
	,range: function(x) {
		this._range = x.copy();
		this.rescale();
		return this;
	}
	,getQuantiles: function() {
		var me = this;
		return function() {
			return me._thresolds.copy();
		};
	}
	,__class__: thx.math.scale.Quantile
}
thx.svg.Arc = $hxClasses["thx.svg.Arc"] = function() {
	this._r0 = function(_,_1) {
		return 0;
	};
	this._r1 = function(_,_1) {
		return 1;
	};
	this._a0 = function(_,_1) {
		return 0;
	};
	this._a1 = function(_,_1) {
		return Math.PI;
	};
};
thx.svg.Arc.__name__ = ["thx","svg","Arc"];
thx.svg.Arc.fromObject = function() {
	return new thx.svg.Arc().innerRadiusf(function(d,_) {
		return d.innerRadius;
	}).outerRadiusf(function(d,_) {
		return d.outerRadius;
	}).startAnglef(function(d,_) {
		return d.startAngle;
	}).endAnglef(function(d,_) {
		return d.endAngle;
	});
}
thx.svg.Arc.fromAngleObject = function() {
	return new thx.svg.Arc().startAnglef(function(d,_) {
		return d.startAngle;
	}).endAnglef(function(d,_) {
		return d.endAngle;
	});
}
thx.svg.Arc.prototype = {
	_r0: null
	,_r1: null
	,_a0: null
	,_a1: null
	,getInnerRadius: function() {
		return this._r0;
	}
	,innerRadius: function(v) {
		return this.innerRadiusf(function(_,_1) {
			return v;
		});
	}
	,innerRadiusf: function(v) {
		this._r0 = v;
		return this;
	}
	,getOuterRadius: function() {
		return this._r1;
	}
	,outerRadius: function(v) {
		return this.outerRadiusf(function(_,_1) {
			return v;
		});
	}
	,outerRadiusf: function(v) {
		this._r1 = v;
		return this;
	}
	,getStartAngle: function() {
		return this._a0;
	}
	,startAngle: function(v) {
		return this.startAnglef(function(_,_1) {
			return v;
		});
	}
	,startAnglef: function(v) {
		this._a0 = v;
		return this;
	}
	,getEndAngle: function() {
		return this._a1;
	}
	,endAngle: function(v) {
		return this.endAnglef(function(_,_1) {
			return v;
		});
	}
	,endAnglef: function(v) {
		this._a1 = v;
		return this;
	}
	,shape: function(d,i) {
		var a0 = this._a0(d,i) + thx.svg.LineInternals.arcOffset, a1 = this._a1(d,i) + thx.svg.LineInternals.arcOffset, da = a1 - a0, df = da < Math.PI?"0":"1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1), r0 = this._r0(d,i), r1 = this._r1(d,i);
		return da >= thx.svg.LineInternals.arcMax?r0 != 0?"M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,1 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,1 0," + r0 + "Z":"M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z":r0 != 0?"M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z":"M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
	}
	,centroid: function(d,i) {
		var r = (this._r0(d,i) + this._r1(d,i)) / 2, a = (this._a0(d,i) + this._a1(d,i)) / 2 + thx.svg.LineInternals.arcOffset;
		return [Math.cos(a) * r,Math.sin(a) * r];
	}
	,__class__: thx.svg.Arc
}
thx.html.Element = $hxClasses["thx.html.Element"] = function() { }
thx.html.Element.__name__ = ["thx","html","Element"];
thx.html.Element.shouldPreserve = function(el) {
	return thx.html.Element._preserve.exists(el);
}
thx.html.Element.isEmpty = function(el) {
	return thx.html.Element._empty.exists(el);
}
thx.html.Element.isBlock = function(el) {
	return thx.html.Element._block.exists(el);
}
thx.html.Element.isInline = function(el) {
	return thx.html.Element._inline.exists(el);
}
thx.html.Element.isBreakElement = function(el) {
	return thx.html.Element._break.exists(el);
}
thx.html.Element.isCloseSelf = function(el) {
	return thx.html.Element._closeSelf.exists(el);
}
thx.html.Element.isSpecial = function(el) {
	return thx.html.Element._special.exists(el);
}
thx.html.Element.prototype = {
	__class__: thx.html.Element
}
utest.TestResult = $hxClasses["utest.TestResult"] = function() {
};
utest.TestResult.__name__ = ["utest","TestResult"];
utest.TestResult.ofHandler = function(handler) {
	var r = new utest.TestResult();
	var path = Type.getClassName(Type.getClass(handler.fixture.target)).split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.method;
	r.setup = handler.fixture.setup;
	r.teardown = handler.fixture.teardown;
	r.assertations = handler.results;
	return r;
}
utest.TestResult.prototype = {
	pack: null
	,cls: null
	,method: null
	,setup: null
	,teardown: null
	,assertations: null
	,allOk: function() {
		try {
			var $it0 = this.assertations.iterator();
			while( $it0.hasNext() ) {
				var l = $it0.next();
				var $e = (l);
				switch( $e[1] ) {
				case 0:
					var pos = $e[2];
					throw "__break__";
					break;
				default:
					return false;
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		return true;
	}
	,__class__: utest.TestResult
}
thx.error.TestError = $hxClasses["thx.error.TestError"] = function() {
};
thx.error.TestError.__name__ = ["thx","error","TestError"];
thx.error.TestError.prototype = {
	__class__: thx.error.TestError
}
thx.xml.TestXmlWriter = $hxClasses["thx.xml.TestXmlWriter"] = function() {
};
thx.xml.TestXmlWriter.__name__ = ["thx","xml","TestXmlWriter"];
thx.xml.TestXmlWriter.addTests = function(runner) {
	runner.addCase(new thx.xml.TestXmlWriter());
}
thx.xml.TestXmlWriter.main = function() {
	var runner = new utest.Runner();
	thx.xml.TestXmlWriter.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.xml.TestXmlWriter.prototype = {
	w: null
	,testBasics: function() {
		utest.Assert.equals("<doc/>",this.getWriter().tag("doc").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 14, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc a=\"b\"/>",this.getWriter().tag("doc").attr("a","b").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 16, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc></doc>",this.getWriter().open("doc").close().toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 18, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc><node/></doc>",this.getWriter().open("doc").tag("node").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 20, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc att=\"value\"/>",this.getWriter().open("doc").attr("att","value").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 22, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc>c</doc>",this.getWriter().open("doc").text("c").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 24, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc><![CDATA[]]&gt;]]></doc>",StringTools.replace(this.getWriter().open("doc").cdata("]]>").toString()," ",""),null,{ fileName : "TestXmlWriter.hx", lineNumber : 27, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc>&amp;&lt;&amp;&gt;&amp;</doc>",StringTools.replace(this.getWriter().open("doc").text("&<&>&").toString()," ",""),null,{ fileName : "TestXmlWriter.hx", lineNumber : 29, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc><!--c--></doc>",StringTools.replace(this.getWriter().open("doc").comment("c").toString()," ",""),null,{ fileName : "TestXmlWriter.hx", lineNumber : 31, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<doc><node/><node/></doc>",this.getWriter().open("doc").tag("node").tag("node").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 33, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("<node/><node/>",this.getWriter().tag("node").tag("node").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 35, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert.equals("a<node/>b<node/>c",this.getWriter().text("a").tag("node").text("b").tag("node").text("c").toString(),null,{ fileName : "TestXmlWriter.hx", lineNumber : 37, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
		utest.Assert["is"](this.getWriter().xml(),Xml,null,{ fileName : "TestXmlWriter.hx", lineNumber : 39, className : "thx.xml.TestXmlWriter", methodName : "testBasics"});
	}
	,getWriter: function() {
		return new thx.xml.XmlWriter();
	}
	,__class__: thx.xml.TestXmlWriter
	,__properties__: {get_w:"getWriter"}
}
var TestDates = $hxClasses["TestDates"] = function() {
};
TestDates.__name__ = ["TestDates"];
TestDates.prototype = {
	testCanParse: function() {
		utest.Assert.isTrue(Dates.canParse("2010-10-01"),null,{ fileName : "TestDates.hx", lineNumber : 8, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01 05:05"),null,{ fileName : "TestDates.hx", lineNumber : 9, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01T05:05Z"),null,{ fileName : "TestDates.hx", lineNumber : 10, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01 05:05:05"),null,{ fileName : "TestDates.hx", lineNumber : 11, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01T05:05:05Z"),null,{ fileName : "TestDates.hx", lineNumber : 12, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01T05:05:05"),null,{ fileName : "TestDates.hx", lineNumber : 13, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2010-10-01 05:05:05.005"),null,{ fileName : "TestDates.hx", lineNumber : 14, className : "TestDates", methodName : "testCanParse"});
		utest.Assert.isTrue(Dates.canParse("2011-05-23T17:45"),null,{ fileName : "TestDates.hx", lineNumber : 16, className : "TestDates", methodName : "testCanParse"});
	}
	,__class__: TestDates
}
thx.util.Result = $hxClasses["thx.util.Result"] = { __ename__ : ["thx","util","Result"], __constructs__ : ["Ok","Failure"] }
thx.util.Result.Ok = ["Ok",0];
thx.util.Result.Ok.toString = $estr;
thx.util.Result.Ok.__enum__ = thx.util.Result;
thx.util.Result.Failure = function(messages) { var $x = ["Failure",1,messages]; $x.__enum__ = thx.util.Result; $x.toString = $estr; return $x; }
thx.validation.TestPatternValidator = $hxClasses["thx.validation.TestPatternValidator"] = function() {
};
thx.validation.TestPatternValidator.__name__ = ["thx","validation","TestPatternValidator"];
thx.validation.TestPatternValidator.__super__ = thx.validation.TestAll;
thx.validation.TestPatternValidator.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.PatternValidator(new EReg("^[aeiou]+$","i"));
		this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 15, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("b"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 16, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("aba"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 17, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("UiU"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 18, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestPatternValidator
});
thx.validation.TestOptionValidator = $hxClasses["thx.validation.TestOptionValidator"] = function() {
};
thx.validation.TestOptionValidator.__name__ = ["thx","validation","TestOptionValidator"];
thx.validation.TestOptionValidator.__super__ = thx.validation.TestAll;
thx.validation.TestOptionValidator.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidation: function() {
		var validator = new thx.validation.OptionValidator(null,["a","b","c"]);
		this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 15, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("b"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 16, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("c"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 17, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("A"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 18, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("d"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 19, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
		this.assertValidation(validator.validate("aa"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 20, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	}
	,__class__: thx.validation.TestOptionValidator
});
thx.math.scale.TestLinearT = $hxClasses["thx.math.scale.TestLinearT"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestLinearT.__name__ = ["thx","math","scale","TestLinearT"];
thx.math.scale.TestLinearT.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestLinearT.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testRange: function() {
		var scale = thx.math.scale.Linears.forString().domain([Arrays.min(thx.math.scale.TestLinearT.data),Arrays.max(thx.math.scale.TestLinearT.data)]).range(["0px","120px"]);
		utest.Assert.same(["0px","8px","24px","56px","120px"],thx.math.scale.TestLinearT.data.map(scale.scale.$bind(scale)),null,null,{ fileName : "TestLinearT.hx", lineNumber : 20, className : "thx.math.scale.TestLinearT", methodName : "testRange"});
	}
	,testColors: function() {
		var data = [0.0,5,10], scale = thx.math.scale.Linears.forRgbString().domain([Arrays.min(data),Arrays.max(data)]).range(["#FF0000","#0000FF"]);
		utest.Assert.same(["rgb(255,0,0)","rgb(128,0,128)","rgb(0,0,255)"],data.map(scale.scale.$bind(scale)),null,null,{ fileName : "TestLinearT.hx", lineNumber : 30, className : "thx.math.scale.TestLinearT", methodName : "testColors"});
	}
	,__class__: thx.math.scale.TestLinearT
});
var Enums = $hxClasses["Enums"] = function() { }
Enums.__name__ = ["Enums"];
Enums.string = function(e) {
	var cons = e[0];
	var params = [];
	var _g = 0, _g1 = e.slice(2);
	while(_g < _g1.length) {
		var param = _g1[_g];
		++_g;
		params.push(Dynamics.string(param));
	}
	return cons + (params.length == 0?"":"(" + params.join(", ") + ")");
}
Enums.compare = function(a,b) {
	var v;
	if((v = a[1] - b[1]) != 0) return v;
	return Arrays.compare(a.slice(2),b.slice(2));
}
Enums.prototype = {
	__class__: Enums
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
thx.color.TestRgb = $hxClasses["thx.color.TestRgb"] = function() {
};
thx.color.TestRgb.__name__ = ["thx","color","TestRgb"];
thx.color.TestRgb.prototype = {
	testBasics: function() {
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.black,new thx.color.Rgb(0,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 15, className : "thx.color.TestRgb", methodName : "testBasics"});
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.white,new thx.color.Rgb(255,255,255)),null,{ fileName : "TestRgb.hx", lineNumber : 16, className : "thx.color.TestRgb", methodName : "testBasics"});
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,new thx.color.Rgb(255,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 17, className : "thx.color.TestRgb", methodName : "testBasics"});
		utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,thx.color.Rgb.fromInt(16711680)),null,{ fileName : "TestRgb.hx", lineNumber : 18, className : "thx.color.TestRgb", methodName : "testBasics"});
	}
	,__class__: thx.color.TestRgb
}
var TestInts = $hxClasses["TestInts"] = function() {
};
TestInts.__name__ = ["TestInts"];
TestInts.addTests = function(runner) {
	runner.addCase(new TestInts());
}
TestInts.main = function() {
	var runner = new utest.Runner();
	TestInts.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestInts.prototype = {
	testRange: function() {
		utest.Assert.same([0,1,2],Ints.range(3),null,null,{ fileName : "TestInts.hx", lineNumber : 14, className : "TestInts", methodName : "testRange"});
		utest.Assert.same([3,4,5],Ints.range(3,6),null,null,{ fileName : "TestInts.hx", lineNumber : 15, className : "TestInts", methodName : "testRange"});
		utest.Assert.same([4,6,8],Ints.range(4,9,2),null,null,{ fileName : "TestInts.hx", lineNumber : 16, className : "TestInts", methodName : "testRange"});
		utest.Assert.same([8,6,4],Ints.range(8,3,-2),null,null,{ fileName : "TestInts.hx", lineNumber : 17, className : "TestInts", methodName : "testRange"});
	}
	,testInterpolate: function() {
		utest.Assert.equals(0,Ints.interpolate(0.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 22, className : "TestInts", methodName : "testInterpolate"});
		utest.Assert.equals(127,Ints.interpolate(0.499,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 23, className : "TestInts", methodName : "testInterpolate"});
		utest.Assert.equals(255,Ints.interpolate(1.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 24, className : "TestInts", methodName : "testInterpolate"});
	}
	,__class__: TestInts
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
thx.culture.FormatDate = $hxClasses["thx.culture.FormatDate"] = function() { }
thx.culture.FormatDate.__name__ = ["thx","culture","FormatDate"];
thx.culture.FormatDate.format = function(pattern,date,culture,leadingspace) {
	if(leadingspace == null) leadingspace = true;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var pos = 0;
	var len = pattern.length;
	var buf = new StringBuf();
	var info = culture.date;
	while(pos < len) {
		var c = pattern.charAt(pos);
		if(c != "%") {
			buf.b[buf.b.length] = c == null?"null":c;
			pos++;
			continue;
		}
		pos++;
		c = pattern.charAt(pos);
		switch(c) {
		case "a":
			buf.add(info.abbrDays[date.getDay()]);
			break;
		case "A":
			buf.add(info.days[date.getDay()]);
			break;
		case "b":case "h":
			buf.add(info.abbrMonths[date.getMonth()]);
			break;
		case "B":
			buf.add(info.months[date.getMonth()]);
			break;
		case "c":
			buf.add(thx.culture.FormatDate.dateTime(date,culture));
			break;
		case "C":
			buf.add(thx.culture.FormatNumber.digits("" + Math.floor(date.getFullYear() / 100),culture));
			break;
		case "d":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getDate(),"0",2),culture));
			break;
		case "D":
			buf.add(thx.culture.FormatDate.format("%m/%d/%y",date,culture));
			break;
		case "e":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getDate()," ",2):"" + date.getDate(),culture));
			break;
		case "f":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + (date.getMonth() + 1)," ",2):"" + (date.getMonth() + 1),culture));
			break;
		case "G":
			throw "Not Implemented Yet";
			break;
		case "g":
			throw "Not Implemented Yet";
			break;
		case "H":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getHours(),"0",2),culture));
			break;
		case "i":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getMinutes()," ",2):"" + date.getMinutes(),culture));
			break;
		case "I":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + thx.culture.FormatDate.getMHours(date),"0",2),culture));
			break;
		case "j":
			throw "Not Implemented Yet";
			break;
		case "k":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getHours()," ",2):"" + date.getHours(),culture));
			break;
		case "l":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + thx.culture.FormatDate.getMHours(date)," ",2):"" + thx.culture.FormatDate.getMHours(date),culture));
			break;
		case "m":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + (date.getMonth() + 1),"0",2),culture));
			break;
		case "M":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getMinutes(),"0",2),culture));
			break;
		case "n":
			buf.b[buf.b.length] = "\n";
			break;
		case "p":
			buf.add(date.getHours() > 11?info.pm:info.am);
			break;
		case "P":
			buf.add((date.getHours() > 11?info.pm:info.am).toLowerCase());
			break;
		case "q":
			buf.add(thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getSeconds()," ",2):"" + date.getSeconds(),culture));
			break;
		case "r":
			buf.add(thx.culture.FormatDate.format("%I:%M:%S %p",date,culture));
			break;
		case "R":
			buf.add(thx.culture.FormatDate.format("%H:%M",date,culture));
			break;
		case "s":
			buf.add("" + (date.getTime() / 1000 | 0));
			break;
		case "S":
			buf.add(thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getSeconds(),"0",2),culture));
			break;
		case "t":
			buf.b[buf.b.length] = "\t";
			break;
		case "T":
			buf.add(thx.culture.FormatDate.format("%H:%M:%S",date,culture));
			break;
		case "u":
			var d = date.getDay();
			buf.add(thx.culture.FormatNumber.digits(d == 0?"7":"" + d,culture));
			break;
		case "U":
			throw "Not Implemented Yet";
			break;
		case "V":
			throw "Not Implemented Yet";
			break;
		case "w":
			buf.add(thx.culture.FormatNumber.digits("" + date.getDay(),culture));
			break;
		case "W":
			throw "Not Implemented Yet";
			break;
		case "x":
			buf.add(thx.culture.FormatDate.date(date,culture));
			break;
		case "X":
			buf.add(thx.culture.FormatDate.time(date,culture));
			break;
		case "y":
			buf.add(thx.culture.FormatNumber.digits(("" + date.getFullYear()).substr(-2),culture));
			break;
		case "Y":
			buf.add(thx.culture.FormatNumber.digits("" + date.getFullYear(),culture));
			break;
		case "z":
			buf.b[buf.b.length] = "+0000";
			break;
		case "Z":
			buf.b[buf.b.length] = "GMT";
			break;
		case "%":
			buf.b[buf.b.length] = "%";
			break;
		default:
			buf.add("%" + c);
		}
		pos++;
	}
	return buf.b.join("");
}
thx.culture.FormatDate.getMHours = function(date) {
	var v = date.getHours();
	return v > 12?v - 12:v;
}
thx.culture.FormatDate.yearMonth = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternYearMonth,date,culture,false);
}
thx.culture.FormatDate.monthDay = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternMonthDay,date,culture,false);
}
thx.culture.FormatDate.date = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternDate,date,culture,false);
}
thx.culture.FormatDate.dateShort = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternDateShort,date,culture,false);
}
thx.culture.FormatDate.dateRfc = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternDateRfc,date,culture,false);
}
thx.culture.FormatDate.dateTime = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternDateTime,date,culture,false);
}
thx.culture.FormatDate.universal = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternUniversal,date,culture,false);
}
thx.culture.FormatDate.sortable = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternSortable,date,culture,false);
}
thx.culture.FormatDate.time = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternTime,date,culture,false);
}
thx.culture.FormatDate.timeShort = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatDate.format(culture.date.patternTimeShort,date,culture,false);
}
thx.culture.FormatDate.hourShort = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	if(null == culture.date.am) return thx.culture.FormatDate.format("%H",date,culture,false); else return thx.culture.FormatDate.format("%l %p",date,culture,false);
}
thx.culture.FormatDate.year = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.digits("" + date.getFullYear(),culture);
}
thx.culture.FormatDate.month = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.digits("" + (date.getMonth() + 1),culture);
}
thx.culture.FormatDate.monthName = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return culture.date.abbrMonths[date.getMonth()];
}
thx.culture.FormatDate.monthNameShort = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return culture.date.months[date.getMonth()];
}
thx.culture.FormatDate.weekDay = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.digits("" + (date.getDay() + culture.date.firstWeekDay),culture);
}
thx.culture.FormatDate.weekDayName = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return culture.date.abbrDays[date.getDay()];
}
thx.culture.FormatDate.weekDayNameShort = function(date,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return culture.date.days[date.getDay()];
}
thx.culture.FormatDate.prototype = {
	__class__: thx.culture.FormatDate
}
thx.svg.Symbol = $hxClasses["thx.svg.Symbol"] = function() { }
thx.svg.Symbol.__name__ = ["thx","svg","Symbol"];
thx.svg.Symbol.triangleDown = function(size) {
	var rx = Math.sqrt(size / thx.svg.Symbol.sqrt3), ry = rx * thx.svg.Symbol.sqrt3 / 2;
	return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
}
thx.svg.Symbol.triangleUp = function(size) {
	var rx = Math.sqrt(size / thx.svg.Symbol.sqrt3), ry = rx * thx.svg.Symbol.sqrt3 / 2;
	return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
}
thx.svg.Symbol.square = function(size) {
	var r = Math.sqrt(size) / 2;
	return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
}
thx.svg.Symbol.diamond = function(size) {
	var ry = Math.sqrt(size / (2 * thx.svg.Symbol.tan30)), rx = ry * thx.svg.Symbol.tan30;
	return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
}
thx.svg.Symbol.cross = function(size) {
	var r = Math.sqrt(size / 5) / 2;
	return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
}
thx.svg.Symbol.circle = function(size) {
	var r = Math.sqrt(size / Math.PI);
	return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
}
thx.svg.Symbol.arrowUp = function(size) {
	var r = Math.sqrt(size / 2);
	return "M" + -r + ",0" + "h" + r / 2 + "v" + r + "h" + r + "v" + -r + "h" + r / 2 + "l" + -r + "," + -r + "Z";
}
thx.svg.Symbol.arrowDown = function(size) {
	var r = Math.sqrt(size / 2);
	return "M" + -r + ",0" + "h" + r / 2 + "v" + -r + "h" + r + "v" + r + "h" + r / 2 + "l" + -r + "," + r + "Z";
}
thx.svg.Symbol.arrowDownWide = function(size) {
	var r = Math.sqrt(size / 2.5);
	return "M" + -r + ",0" + "h" + r / 4 + "v" + -r + "h" + r * 1.5 + "v" + r + "h" + r / 4 + "l" + -r + "," + r + "Z";
}
thx.svg.Symbol.arrowRight = function(size) {
	var r = Math.sqrt(size / 2);
	return "M" + "0," + -r + "v" + r / 2 + "h" + -r + "v" + r + "h" + r + "v" + r / 2 + "l" + r + "," + -r + "Z";
}
thx.svg.Symbol.arrowLeft = function(size) {
	var r = Math.sqrt(size / 2);
	return "M" + "0," + -r + "v" + r / 2 + "h" + r + "v" + r + "h" + -r + "v" + r / 2 + "l" + -r + "," + -r + "Z";
}
thx.svg.Symbol.star = function(size) {
	var r = Math.sqrt(size / 0.31027) / 2;
	return "M0," + -r + "L" + r * 0.236 + "," + r * -0.325 + " " + r * 0.951 + "," + r * -0.309 + " " + r * 0.382 + "," + r * 0.124 + " " + r * 0.588 + "," + r * 0.809 + " " + r * 0 + "," + r * 0.401 + " " + r * -0.588 + "," + r * 0.809 + " " + r * -0.382 + "," + r * 0.124 + " " + r * -0.951 + "," + r * -0.309 + " " + r * -0.236 + "," + r * -0.325 + " " + "Z";
}
thx.svg.Symbol.prototype = {
	__class__: thx.svg.Symbol
}
thx.validation.IncrementValidator = $hxClasses["thx.validation.IncrementValidator"] = function(increment) {
	if(0 == increment) throw new thx.error.Error("increment must be different from zero (0)",null,null,{ fileName : "IncrementValidator.hx", lineNumber : 17, className : "thx.validation.IncrementValidator", methodName : "new"});
	this.increment = increment;
};
thx.validation.IncrementValidator.__name__ = ["thx","validation","IncrementValidator"];
thx.validation.IncrementValidator.__super__ = thx.validation.Validator;
thx.validation.IncrementValidator.prototype = $extend(thx.validation.Validator.prototype,{
	increment: null
	,validate: function(value) {
		var test = value / this.increment;
		if(test == (test | 0)) return thx.util.Result.Ok; else return thx.util.Result.Failure([new thx.util.Message("value must be an increment of {0}",[this.increment],null)]);
	}
	,__class__: thx.validation.IncrementValidator
});
if(!thx.util.type) thx.util.type = {}
thx.util.type.ITest = $hxClasses["thx.util.type.ITest"] = function() { }
thx.util.type.ITest.__name__ = ["thx","util","type","ITest"];
thx.util.type.ITest.prototype = {
	sayHello: null
	,counter: null
	,__class__: thx.util.type.ITest
}
thx.util.type.TestImplementation = $hxClasses["thx.util.type.TestImplementation"] = function() {
	this.counter = 0;
};
thx.util.type.TestImplementation.__name__ = ["thx","util","type","TestImplementation"];
thx.util.type.TestImplementation.__interfaces__ = [thx.util.type.ITest];
thx.util.type.TestImplementation.prototype = {
	counter: null
	,sayHello: function() {
		return "hi";
	}
	,__class__: thx.util.type.TestImplementation
}
thx.util.Results = $hxClasses["thx.util.Results"] = function() { }
thx.util.Results.__name__ = ["thx","util","Results"];
thx.util.Results.toString = function(value,glue) {
	if(glue == null) glue = "\n";
	var $e = (value);
	switch( $e[1] ) {
	case 0:
		return "Ok";
	case 1:
		var messages = $e[2];
		var arr = [];
		var _g = 0;
		while(_g < messages.length) {
			var msg = messages[_g];
			++_g;
			arr.push(msg.toString());
		}
		return arr.join(glue);
	}
}
thx.util.Results.failure = function(msg,params,param,pos) {
	return thx.util.Result.Failure([new thx.util.Message(msg,params,param)]);
}
thx.util.Results.prototype = {
	__class__: thx.util.Results
}
thx.culture.FormatNumber = $hxClasses["thx.culture.FormatNumber"] = function() { }
thx.culture.FormatNumber.__name__ = ["thx","culture","FormatNumber"];
thx.culture.FormatNumber.decimal = function(v,decimals,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.number.patternNegative,culture.number.patternPositive,culture,null,null);
}
thx.culture.FormatNumber.percent = function(v,decimals,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.percent.patternNegative,culture.percent.patternPositive,culture,"%",culture.symbolPercent);
}
thx.culture.FormatNumber.permille = function(v,decimals,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.percent.patternNegative,culture.percent.patternPositive,culture,"%",culture.symbolPermille);
}
thx.culture.FormatNumber.currency = function(v,symbol,decimals,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.crunch(v,decimals,culture.currency,culture.currency.patternNegative,culture.currency.patternPositive,culture,"$",symbol == null?culture.currencySymbol:symbol);
}
thx.culture.FormatNumber["int"] = function(v,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.decimal(v,0,culture);
}
thx.culture.FormatNumber.digits = function(v,culture) {
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	return thx.culture.FormatNumber.processDigits(v,culture.digits);
}
thx.culture.FormatNumber.crunch = function(v,decimals,info,negative,positive,culture,symbol,replace) {
	if(Math.isNaN(v)) return culture.symbolNaN; else if(!Math.isFinite(v)) return v == Math.NEGATIVE_INFINITY?culture.symbolNegInf:culture.symbolPosInf;
	var fv = thx.culture.FormatNumber.value(v,info,decimals == null?info.decimals:decimals < 0?0:decimals,culture.digits);
	if(symbol != null) return StringTools.replace(StringTools.replace(v < 0?negative:positive,"n",fv),symbol,replace); else return StringTools.replace(v < 0?negative:positive,"n",fv);
}
thx.culture.FormatNumber.processDigits = function(s,digits) {
	if(digits == null) return s;
	var o = [];
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		o.push(digits[Std.parseInt(s.substr(i,1))]);
	}
	return o.join("");
}
thx.culture.FormatNumber.value = function(v,info,decimals,digits) {
	var fv = "" + Math.abs(v);
	var pos = fv.indexOf("E");
	if(pos > 0) {
		var e = Std.parseInt(fv.substr(pos + 1));
		var ispos = true;
		if(e < 0) {
			ispos = false;
			e = -e;
		}
		var s = StringTools.replace(fv.substr(0,pos),".","");
		if(ispos) fv = StringTools.rpad(s,"0",e + 1); else fv = "0" + StringTools.rpad(".","0",e) + s;
	}
	var parts = fv.split(".");
	var temp = parts[0];
	var intparts = [];
	var group = 0;
	while(true) {
		if(temp.length == 0) break;
		var len = info.groups[group];
		if(temp.length <= len) {
			intparts.unshift(thx.culture.FormatNumber.processDigits(temp,digits));
			break;
		}
		intparts.unshift(thx.culture.FormatNumber.processDigits(temp.substr(-len),digits));
		temp = temp.substr(0,-len);
		if(group < info.groups.length - 1) group++;
	}
	var intpart = intparts.join(info.groupsSeparator);
	if(decimals > 0) {
		var decpart = parts.length == 1?StringTools.lpad("","0",decimals):parts[1].length > decimals?parts[1].substr(0,decimals):StringTools.rpad(parts[1],"0",decimals);
		return intpart + info.decimalsSeparator + thx.culture.FormatNumber.processDigits(decpart,digits);
	} else return intpart;
}
thx.culture.FormatNumber.prototype = {
	__class__: thx.culture.FormatNumber
}
thx.xml.ValueFormat = $hxClasses["thx.xml.ValueFormat"] = function() {
};
thx.xml.ValueFormat.__name__ = ["thx","xml","ValueFormat"];
thx.xml.ValueFormat.prototype = {
	format: function(value) {
		return value;
	}
	,__class__: thx.xml.ValueFormat
}
thx.xml.NormalizeNewlineValueFormat = $hxClasses["thx.xml.NormalizeNewlineValueFormat"] = function(newline) {
	if(newline == null) newline = "\n";
	thx.xml.ValueFormat.call(this);
	this._newline = newline;
	this._newLineReplace = new EReg("(\r\n|\n\r|\n|\r)","m");
};
thx.xml.NormalizeNewlineValueFormat.__name__ = ["thx","xml","NormalizeNewlineValueFormat"];
thx.xml.NormalizeNewlineValueFormat.__super__ = thx.xml.ValueFormat;
thx.xml.NormalizeNewlineValueFormat.prototype = $extend(thx.xml.ValueFormat.prototype,{
	_newLineReplace: null
	,_newline: null
	,format: function(value) {
		return this._newLineReplace.replace(value,this._newline);
	}
	,__class__: thx.xml.NormalizeNewlineValueFormat
});
thx.csv.TestCsv = $hxClasses["thx.csv.TestCsv"] = function() {
};
thx.csv.TestCsv.__name__ = ["thx","csv","TestCsv"];
thx.csv.TestCsv.prototype = {
	testDecode: function() {
		this.assertSame([[1997,"Ford","E350"]],thx.csv.Csv.decode("1997,Ford,E350"),{ fileName : "TestCsv.hx", lineNumber : 39, className : "thx.csv.TestCsv", methodName : "testDecode"});
		this.assertSame([[1997," Ford "," E350"]],thx.csv.Csv.decode("1997, Ford , E350",null,null,null,null,null,null,false),{ fileName : "TestCsv.hx", lineNumber : 40, className : "thx.csv.TestCsv", methodName : "testDecode"});
		this.assertSame([[1997,"Ford","E350"]],thx.csv.Csv.decode("1997, Ford , E350",null,null,null,null,null,null,true),{ fileName : "TestCsv.hx", lineNumber : 41, className : "thx.csv.TestCsv", methodName : "testDecode"});
		this.assertSame([[1997,"Ford","E350","Super, \"luxurious\" truck"]],thx.csv.Csv.decode("1997,Ford,E350,\"Super, \"\"luxurious\"\" truck\""),{ fileName : "TestCsv.hx", lineNumber : 42, className : "thx.csv.TestCsv", methodName : "testDecode"});
		this.assertSame([[1997,"Ford","E350","Go get one now\nthey are going fast"]],thx.csv.Csv.decode("1997,Ford,E350,\"Go get one now\nthey are going fast\""),{ fileName : "TestCsv.hx", lineNumber : 43, className : "thx.csv.TestCsv", methodName : "testDecode"});
		this.assertSame(thx.csv.TestCsv.v,thx.csv.Csv.decode(thx.csv.TestCsv.s),{ fileName : "TestCsv.hx", lineNumber : 45, className : "thx.csv.TestCsv", methodName : "testDecode"});
		var old_default = thx.culture.Culture.getDefaultCulture();
		thx.culture.Culture.setDefaultCulture(thx.cultures.DeDE.getCulture());
		this.assertSame(thx.csv.TestCsv.v,thx.csv.Csv.decode(thx.csv.TestCsv.t,null,";"),{ fileName : "TestCsv.hx", lineNumber : 48, className : "thx.csv.TestCsv", methodName : "testDecode"});
		thx.culture.Culture.setDefaultCulture(old_default);
	}
	,testEncode: function() {
		this.assertSame(thx.csv.TestCsv.s,thx.csv.Csv.encode(thx.csv.TestCsv.v),{ fileName : "TestCsv.hx", lineNumber : 55, className : "thx.csv.TestCsv", methodName : "testEncode"});
	}
	,assertSame: function(expected,test,pos) {
		utest.Assert.same(expected,test,null,"expected " + Dynamics.string(expected) + " but was " + Dynamics.string(test),pos);
	}
	,__class__: thx.csv.TestCsv
}
thx.languages.Ar = $hxClasses["thx.languages.Ar"] = function() {
	this.name = "ar";
	this.english = "Arabic";
	this["native"] = "العربية";
	this.iso2 = "ar";
	this.iso3 = "ara";
	this.pluralRule = 12;
	thx.culture.Language.add(this);
};
thx.languages.Ar.__name__ = ["thx","languages","Ar"];
thx.languages.Ar.__properties__ = {get_language:"getLanguage"}
thx.languages.Ar.language = null;
thx.languages.Ar.getLanguage = function() {
	if(null == thx.languages.Ar.language) thx.languages.Ar.language = new thx.languages.Ar();
	return thx.languages.Ar.language;
}
thx.languages.Ar.__super__ = thx.culture.Language;
thx.languages.Ar.prototype = $extend(thx.culture.Language.prototype,{
	__class__: thx.languages.Ar
});
thx.cultures.ArMA = $hxClasses["thx.cultures.ArMA"] = function() {
	this.language = thx.languages.Ar.getLanguage();
	this.name = "ar-MA";
	this.english = "Arabic (Morocco)";
	this["native"] = "العربية (المملكة المغربية)";
	this.date = new thx.culture.core.DateTimeInfo(["يناير","فبراير","مارس","ابريل","ماي","يونيو","يوليوز","غشت","شتنبر","اكتوبر","نونبر","دجنبر",""],["يناير","فبراير","مارس","ابريل","ماي","يونيو","يوليوز","غشت","شتنبر","اكتوبر","نونبر","دجنبر",""],["الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة","السبت"],["الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة","السبت"],["أ","ا","ث","أ","خ","ج","س"],"ص","م","-",":",1,"%B, %Y","%d %B","%d %B, %Y","%d-%m-%Y","%a, %d %b %Y %H:%M:%S GMT","%d %B, %Y %k:%M:%S","%Y-%m-%d %H:%M:%SZ","%Y-%m-%dT%H:%M:%S","%k:%M:%S","%k:%M");
	this.symbolNaN = "ليس برقم";
	this.symbolPercent = "%";
	this.symbolPermille = "‰";
	this.signNeg = "-";
	this.signPos = "+";
	this.symbolNegInf = "-لا نهاية";
	this.symbolPosInf = "+لا نهاية";
	this.number = new thx.culture.core.NumberInfo(2,".",[3],",","n-","n");
	this.currency = new thx.culture.core.NumberInfo(2,".",[3],",","$n-","$ n");
	this.percent = new thx.culture.core.NumberInfo(2,".",[3],",","-n %","n %");
	this.pluralRule = 12;
	this.englishCurrency = "Moroccan Dirham";
	this.nativeCurrency = "درهم مغربي";
	this.currencySymbol = "د.م.‏";
	this.currencyIso = "MAD";
	this.englishRegion = "Morocco";
	this.nativeRegion = "المملكة المغربية";
	this.iso2 = "MA";
	this.iso3 = "MAR";
	this.isMetric = false;
	thx.culture.Culture.add(this);
};
thx.cultures.ArMA.__name__ = ["thx","cultures","ArMA"];
thx.cultures.ArMA.__properties__ = {get_culture:"getCulture"}
thx.cultures.ArMA.culture = null;
thx.cultures.ArMA.getCulture = function() {
	if(null == thx.cultures.ArMA.culture) thx.cultures.ArMA.culture = new thx.cultures.ArMA();
	return thx.cultures.ArMA.culture;
}
thx.cultures.ArMA.__super__ = thx.culture.Culture;
thx.cultures.ArMA.prototype = $extend(thx.culture.Culture.prototype,{
	__class__: thx.cultures.ArMA
});
thx.xml.XmlWriter = $hxClasses["thx.xml.XmlWriter"] = function(xml) {
	if(null == xml) xml = Xml.createDocument();
	this._stack = [xml];
	this._current = this._stack[0];
};
thx.xml.XmlWriter.__name__ = ["thx","xml","XmlWriter"];
thx.xml.XmlWriter.prototype = {
	_stack: null
	,_current: null
	,xml: function() {
		return this._stack[0];
	}
	,tag: function(name) {
		this._current = Xml.createElement(name);
		this._stack[this._stack.length - 1].addChild(this._current);
		return this;
	}
	,open: function(tag) {
		this._current = Xml.createElement(tag);
		this._stack[this._stack.length - 1].addChild(this._current);
		this._stack.push(this._current);
		return this;
	}
	,attr: function(name,value) {
		this._current.set(name,value);
		return this;
	}
	,appendTo: function(name,value) {
		if(this._current.exists(name)) this._current.set(name,this._current.get(name) + " " + value); else this.attr(name,value);
		return this;
	}
	,attrIf: function(cond,name,value) {
		if(null == cond && (null != value && "" != value) || cond) this.attr(name,value);
		return this;
	}
	,text: function(s) {
		this._stack[this._stack.length - 1].addChild(Xml.createPCData(StringTools.replace(StringTools.replace(StringTools.replace(s,"&","&amp;"),">","&gt;"),"<","&lt;")));
		return this;
	}
	,cdata: function(s) {
		this._stack[this._stack.length - 1].addChild(Xml.createCData(StringTools.replace(s,"]]>","]]&gt;")));
		return this;
	}
	,comment: function(s) {
		this._stack[this._stack.length - 1].addChild(Xml.createComment(s));
		return this;
	}
	,close: function() {
		if(this._stack.length == 1) throw "no open tags to close";
		this._current = this._stack.pop();
		if(!this._current.elements().hasNext()) this._current.addChild(Xml.createPCData(""));
		return this;
	}
	,toString: function() {
		return this.xml().toString();
	}
	,_t: function() {
		return this._stack[this._stack.length - 1];
	}
	,__class__: thx.xml.XmlWriter
}
thx.validation.TestUrl = $hxClasses["thx.validation.TestUrl"] = function() {
};
thx.validation.TestUrl.__name__ = ["thx","validation","TestUrl"];
thx.validation.TestUrl.__super__ = thx.validation.TestAll;
thx.validation.TestUrl.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidUrls: function() {
		var validator = new thx.validation.UrlValidator();
		var urls = ["http://example.com","http://www.example.com","http://example.com/url/x%20y?a=b&c"];
		var _g = 0;
		while(_g < urls.length) {
			var url = urls[_g];
			++_g;
			this.assertValidation(validator.validate(url),true,url + " should be valid",{ fileName : "TestUrl.hx", lineNumber : 17, className : "thx.validation.TestUrl", methodName : "testValidUrls"});
		}
	}
	,testInvalidUrls: function() {
		var validator = new thx.validation.UrlValidator();
		var urls = ["","htp://example.com","www.example.com"];
		var _g = 0;
		while(_g < urls.length) {
			var url = urls[_g];
			++_g;
			this.assertValidation(validator.validate(url),false,url + " should NOT be valid",{ fileName : "TestUrl.hx", lineNumber : 25, className : "thx.validation.TestUrl", methodName : "testInvalidUrls"});
		}
	}
	,__class__: thx.validation.TestUrl
});
thx.date.TestAll = $hxClasses["thx.date.TestAll"] = function() {
};
thx.date.TestAll.__name__ = ["thx","date","TestAll"];
thx.date.TestAll.addTests = function(runner) {
	runner.addCase(new thx.date.TestDateParser());
}
thx.date.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.date.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.date.TestAll.prototype = {
	__class__: thx.date.TestAll
}
utest.ui.common.HeaderDisplayMode = $hxClasses["utest.ui.common.HeaderDisplayMode"] = { __ename__ : ["utest","ui","common","HeaderDisplayMode"], __constructs__ : ["AlwaysShowHeader","NeverShowHeader","ShowHeaderWithResults"] }
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader = ["AlwaysShowHeader",0];
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.NeverShowHeader = ["NeverShowHeader",1];
utest.ui.common.HeaderDisplayMode.NeverShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.NeverShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults = ["ShowHeaderWithResults",2];
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.toString = $estr;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.SuccessResultsDisplayMode = $hxClasses["utest.ui.common.SuccessResultsDisplayMode"] = { __ename__ : ["utest","ui","common","SuccessResultsDisplayMode"], __constructs__ : ["AlwaysShowSuccessResults","NeverShowSuccessResults","ShowSuccessResultsWithNoErrors"] }
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults = ["AlwaysShowSuccessResults",0];
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults = ["NeverShowSuccessResults",1];
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors = ["ShowSuccessResultsWithNoErrors",2];
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
thx.svg.TestArea = $hxClasses["thx.svg.TestArea"] = function() {
	thx.svg.TestAll.call(this);
};
thx.svg.TestArea.__name__ = ["thx","svg","TestArea"];
thx.svg.TestArea.__super__ = thx.svg.TestAll;
thx.svg.TestArea.prototype = $extend(thx.svg.TestAll.prototype,{
	testArea: function() {
		var area = thx.svg.Area.pointArray2();
		this.assertSamePath("M0,0L0,0Z",area.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 17, className : "thx.svg.TestArea", methodName : "testArea"});
		this.assertSamePath("M0,0L1,1L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 18, className : "thx.svg.TestArea", methodName : "testArea"});
		this.assertSamePath("M0,0L1,1L2,0L2,0L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 19, className : "thx.svg.TestArea", methodName : "testArea"});
	}
	,testArean1: function() {
		var area = thx.svg.Area.pointArray2().y0(function(_,_1) {
			return -1;
		});
		this.assertSamePath("M0,0L0,-1Z",area.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 26, className : "thx.svg.TestArea", methodName : "testArean1"});
		this.assertSamePath("M0,0L1,1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 27, className : "thx.svg.TestArea", methodName : "testArean1"});
		this.assertSamePath("M0,0L1,1L2,0L2,-1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 28, className : "thx.svg.TestArea", methodName : "testArean1"});
	}
	,testXY: function() {
		var line = thx.svg.Area.pointObjectXY();
		this.assertSamePath("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 35, className : "thx.svg.TestArea", methodName : "testXY"});
		this.assertSamePath("M0,0L1,1L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestArea.hx", lineNumber : 36, className : "thx.svg.TestArea", methodName : "testXY"});
		this.assertSamePath("M0,0L1,1L2,0L2,0L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 37, className : "thx.svg.TestArea", methodName : "testXY"});
	}
	,testXYnY0: function() {
		var line = thx.svg.Area.pointObjectXY().y0(function(d,_) {
			return -d.y;
		});
		this.assertSamePath("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 44, className : "thx.svg.TestArea", methodName : "testXYnY0"});
		this.assertSamePath("M0,0L1,1L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestArea.hx", lineNumber : 45, className : "thx.svg.TestArea", methodName : "testXYnY0"});
		this.assertSamePath("M0,0L1,1L2,0L2,0L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 46, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	}
	,testStepBefore: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepBefore);
		this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 53, className : "thx.svg.TestArea", methodName : "testStepBefore"});
		this.assertSamePath("M0,0V1H1L1,0V0H0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 54, className : "thx.svg.TestArea", methodName : "testStepBefore"});
		this.assertSamePath("M0,0V1H1V0H2L2,0V0H1V0H0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 55, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	}
	,testStepAfter: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepAfter);
		this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 62, className : "thx.svg.TestArea", methodName : "testStepAfter"});
		this.assertSamePath("M0,0H1V1L1,0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 63, className : "thx.svg.TestArea", methodName : "testStepAfter"});
		this.assertSamePath("M0,0H1V1H2V0L2,0H1V0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 64, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	}
	,testBasis: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Basis);
		this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 71, className : "thx.svg.TestArea", methodName : "testBasis"});
		this.assertSamePath("M0,0L1,1L1,0L0,0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 72, className : "thx.svg.TestArea", methodName : "testBasis"});
		this.assertSamePath("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0L12,0C12,0,12,0,11,0C10,0,8,0,6,0C4,0,2,0,1,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 73, className : "thx.svg.TestArea", methodName : "testBasis"});
	}
	,testBasisClosed: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.BasisClosed);
		this.assertSamePath("M0,0C0,0,0,0,0,0L0,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 80, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
		this.assertSamePath("M2,2C2,2,4,4,4,4C4,4,2,2,2,2L4,0C4,0,2,0,2,0C2,0,4,0,4,0Z",line.shape([[0.0,0.0],[6.0,6.0]]),{ fileName : "TestArea.hx", lineNumber : 81, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
		this.assertSamePath("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1L3,0C4,0,8,0,9,0C10,0,8,0,6,0C4,0,2,0,3,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 82, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	}
	,testCardinal: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Cardinal());
		this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 89, className : "thx.svg.TestArea", methodName : "testCardinal"});
		this.assertSamePath("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestArea.hx", lineNumber : 90, className : "thx.svg.TestArea", methodName : "testCardinal"});
		this.assertSamePath("M0,0Q4,5,5,5Q6,5,10,0L10,0Q6,0,5,0Q4,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 91, className : "thx.svg.TestArea", methodName : "testCardinal"});
	}
	,testCardinalClosed: function() {
		var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.CardinalClosed());
		this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 98, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
		this.assertSamePath("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestArea.hx", lineNumber : 99, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
		this.assertSamePath("M0,0C0,0,3.5,5,5,5S10,0,10,0L10,0C10,0,6.5,0,5,0S0,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 100, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	}
	,__class__: thx.svg.TestArea
});
utest.ui.common.PackageResult = $hxClasses["utest.ui.common.PackageResult"] = function(packageName) {
	this.packageName = packageName;
	this.classes = new Hash();
	this.packages = new Hash();
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.PackageResult.__name__ = ["utest","ui","common","PackageResult"];
utest.ui.common.PackageResult.prototype = {
	packageName: null
	,classes: null
	,packages: null
	,stats: null
	,addResult: function(result,flattenPackage) {
		var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
		var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
		var fix = this.createFixture(result.method,result.assertations);
		cls.add(fix);
	}
	,addClass: function(result) {
		this.classes.set(result.className,result);
		this.stats.wire(result.stats);
	}
	,addPackage: function(result) {
		this.packages.set(result.packageName,result);
		this.stats.wire(result.stats);
	}
	,existsPackage: function(name) {
		return this.packages.exists(name);
	}
	,existsClass: function(name) {
		return this.classes.exists(name);
	}
	,getPackage: function(name) {
		if(this.packageName == null && name == "") return this;
		return this.packages.get(name);
	}
	,getClass: function(name) {
		return this.classes.get(name);
	}
	,classNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		var $it0 = this.classes.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getClass(a).stats;
				var bs = me.getClass(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,packageNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) errorsHavePriority = true;
		var names = [];
		if(this.packageName == null) names.push("");
		var $it0 = this.packages.keys();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			names.push(name);
		}
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var $as = me.getPackage(a).stats;
				var bs = me.getPackage(b).stats;
				if($as.hasErrors) return !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors); else if(bs.hasErrors) return 1; else if($as.hasFailures) return !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures); else if(bs.hasFailures) return 1; else if($as.hasWarnings) return !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings); else if(bs.hasWarnings) return 1; else return Reflect.compare(a,b);
			});
		} else names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return names;
	}
	,createFixture: function(method,assertations) {
		var f = new utest.ui.common.FixtureResult(method);
		var $it0 = assertations.iterator();
		while( $it0.hasNext() ) {
			var assertation = $it0.next();
			f.add(assertation);
		}
		return f;
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) return pack.getClass(cls);
		var c = new utest.ui.common.ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(pack == null || pack == "") return ref;
		if(flat) {
			if(ref.existsPackage(pack)) return ref.getPackage(pack);
			var p = new utest.ui.common.PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
			return ref;
		}
	}
	,__class__: utest.ui.common.PackageResult
}
thx.html.TestAll = $hxClasses["thx.html.TestAll"] = function() { }
thx.html.TestAll.__name__ = ["thx","html","TestAll"];
thx.html.TestAll.addTests = function(runner) {
	runner.addCase(new thx.html.TestHtmlParser());
	runner.addCase(new thx.html.TestHtmlFormat());
	runner.addCase(new thx.html.TestXHtmlFormat());
}
thx.html.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.html.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.html.TestAll.prototype = {
	__class__: thx.html.TestAll
}
thx.util.TypeLocator = $hxClasses["thx.util.TypeLocator"] = function() {
	this._binders = new Hash();
};
thx.util.TypeLocator.__name__ = ["thx","util","TypeLocator"];
thx.util.TypeLocator.prototype = {
	_binders: null
	,instance: function(cls,o) {
		return this.bind(cls,function() {
			return o;
		});
	}
	,bind: function(cls,f) {
		this._binders.set(Type.getClassName(cls),f);
		return this;
	}
	,memoize: function(cls,f) {
		var r = null;
		return this.bind(cls,function() {
			if(null == r) r = f();
			return r;
		});
	}
	,unbinded: function(cls) {
		return null;
	}
	,get: function(cls) {
		var f = this._binders.get(Type.getClassName(cls));
		if(null == f) return this.unbinded(cls); else return f();
	}
	,__class__: thx.util.TypeLocator
}
utest.TestHandler = $hxClasses["utest.TestHandler"] = function(fixture) {
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = new utest.Dispatcher();
	this.onTimeout = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
};
utest.TestHandler.__name__ = ["utest","TestHandler"];
utest.TestHandler.exceptionStack = function(pops) {
	if(pops == null) pops = 2;
	var stack = haxe.Stack.exceptionStack();
	while(pops-- > 0) stack.pop();
	return stack;
}
utest.TestHandler.prototype = {
	results: null
	,fixture: null
	,asyncStack: null
	,onTested: null
	,onTimeout: null
	,onComplete: null
	,execute: function() {
		try {
			this.executeMethod(this.fixture.setup);
			try {
				this.executeMethod(this.fixture.method);
			} catch( e ) {
				this.results.add(utest.Assertation.Error(e,utest.TestHandler.exceptionStack()));
			}
		} catch( e ) {
			this.results.add(utest.Assertation.SetupError(e,utest.TestHandler.exceptionStack()));
		}
		this.checkTested();
	}
	,checkTested: function() {
		if(this.expireson == null || this.asyncStack.length == 0) this.tested(); else if(haxe.Timer.stamp() > this.expireson) this.timeout(); else haxe.Timer.delay(this.checkTested.$bind(this),10);
	}
	,expireson: null
	,setTimeout: function(timeout) {
		var newexpire = haxe.Timer.stamp() + timeout / 1000;
		this.expireson = this.expireson == null?newexpire:newexpire > this.expireson?newexpire:this.expireson;
	}
	,bindHandler: function() {
		utest.Assert.results = this.results;
		utest.Assert.createAsync = this.addAsync.$bind(this);
		utest.Assert.createEvent = this.addEvent.$bind(this);
	}
	,unbindHandler: function() {
		utest.Assert.results = null;
		utest.Assert.createAsync = function(f,t) {
			return function() {
			};
		};
		utest.Assert.createEvent = function(f,t) {
			return function(e) {
			};
		};
	}
	,addAsync: function(f,timeout) {
		if(timeout == null) timeout = 250;
		if(null == f) f = function() {
		};
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function() {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("method already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f();
			} catch( e ) {
				handler.results.add(utest.Assertation.AsyncError(e,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,addEvent: function(f,timeout) {
		if(timeout == null) timeout = 250;
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function(e) {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest.Assertation.AsyncError("event already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f(e);
			} catch( e1 ) {
				handler.results.add(utest.Assertation.AsyncError(e1,utest.TestHandler.exceptionStack(0)));
			}
		};
	}
	,executeMethod: function(name) {
		if(name == null) return;
		this.bindHandler();
		Reflect.field(this.fixture.target,name).apply(this.fixture.target,[]);
	}
	,tested: function() {
		if(this.results.length == 0) this.results.add(utest.Assertation.Warning("no assertions"));
		this.onTested.dispatch(this);
		this.completed();
	}
	,timeout: function() {
		this.results.add(utest.Assertation.TimeoutError(this.asyncStack.length,[]));
		this.onTimeout.dispatch(this);
		this.completed();
	}
	,completed: function() {
		try {
			this.executeMethod(this.fixture.teardown);
		} catch( e ) {
			this.results.add(utest.Assertation.TeardownError(e,utest.TestHandler.exceptionStack(2)));
		}
		this.unbindHandler();
		this.onComplete.dispatch(this);
	}
	,__class__: utest.TestHandler
}
thx.xml.AttributeFormat = $hxClasses["thx.xml.AttributeFormat"] = function() {
};
thx.xml.AttributeFormat.__name__ = ["thx","xml","AttributeFormat"];
thx.xml.AttributeFormat.prototype = {
	formatAttributes: function(node) {
		var buf = new StringBuf();
		var $it0 = node.attributes();
		while( $it0.hasNext() ) {
			var name = $it0.next();
			buf.b[buf.b.length] = " ";
			buf.add(this.formatAttribute(name,node.get(name)));
		}
		return buf.b.join("");
	}
	,formatAttribute: function(name,value) {
		return name + "=\"" + value + "\"";
	}
	,__class__: thx.xml.AttributeFormat
}
thx.html.UnquotedHtmlAttributeFormat = $hxClasses["thx.html.UnquotedHtmlAttributeFormat"] = function() {
	thx.xml.AttributeFormat.call(this);
	this._containsWS = new EReg("\\s","m");
};
thx.html.UnquotedHtmlAttributeFormat.__name__ = ["thx","html","UnquotedHtmlAttributeFormat"];
thx.html.UnquotedHtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
thx.html.UnquotedHtmlAttributeFormat.prototype = $extend(thx.xml.AttributeFormat.prototype,{
	_containsWS: null
	,formatAttribute: function(name,value) {
		if(thx.html.Attribute._fill.exists(name)) return name; else return name + "=" + this.quote(value);
	}
	,quote: function(value) {
		if("" != value && !this._containsWS.match(value)) return value; else return "\"" + value + "\"";
	}
	,__class__: thx.html.UnquotedHtmlAttributeFormat
});
utest.TestFixture = $hxClasses["utest.TestFixture"] = function(target,method,setup,teardown) {
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
};
utest.TestFixture.__name__ = ["utest","TestFixture"];
utest.TestFixture.prototype = {
	target: null
	,method: null
	,setup: null
	,teardown: null
	,checkMethod: function(name,arg) {
		var field = Reflect.field(this.target,name);
		if(field == null) throw arg + " function " + name + " is not a field of target";
		if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
	}
	,__class__: utest.TestFixture
}
thx.number.TestParse = $hxClasses["thx.number.TestParse"] = function() {
};
thx.number.TestParse.__name__ = ["thx","number","TestParse"];
thx.number.TestParse.prototype = {
	testParse: function() {
		utest.Assert.equals(1,thx.number.NumberParser.parse("1",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 22, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(-10,thx.number.NumberParser.parse("-10",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 23, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(100,thx.number.NumberParser.parse("100",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 24, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.isTrue(Math.isNaN(thx.number.NumberParser.parse("1,00,0",thx.cultures.EnIN.getCulture())),null,{ fileName : "TestParse.hx", lineNumber : 25, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(1000,thx.number.NumberParser.parse("1,000",thx.cultures.EnUS.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 26, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(1000000,thx.number.NumberParser.parse("1,000,000",thx.cultures.EnUS.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 27, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.isTrue(Math.isNaN(thx.number.NumberParser.parse("1,00,000",thx.cultures.EnUS.getCulture())),null,{ fileName : "TestParse.hx", lineNumber : 28, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(100000,thx.number.NumberParser.parse("1,00,000",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 29, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(-10,thx.number.NumberParser.parse("10-",thx.cultures.ArMA.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 30, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(10000,thx.number.NumberParser.parse("10,000",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 31, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(100000.003,thx.number.NumberParser.parse("100.000,003",thx.cultures.DeDE.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 32, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(1000000,thx.number.NumberParser.parse("10,00,000",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 33, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(10000000,thx.number.NumberParser.parse("1,00,00,000",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 34, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(100000000,thx.number.NumberParser.parse("10,00,00,000",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 35, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(100000000.232523,thx.number.NumberParser.parse("10,00,00,000.232523",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 36, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(0,thx.number.NumberParser.parse("0",thx.cultures.EnIN.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 37, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.equals(3000.99,thx.number.NumberParser.parse("3000,99",thx.cultures.DeDE.getCulture()),null,{ fileName : "TestParse.hx", lineNumber : 38, className : "thx.number.TestParse", methodName : "testParse"});
		utest.Assert.isTrue(Math.isNaN(thx.number.NumberParser.parse("10,",thx.cultures.EnUS.getCulture())),null,{ fileName : "TestParse.hx", lineNumber : 39, className : "thx.number.TestParse", methodName : "testParse"});
	}
	,__class__: thx.number.TestParse
}
thx.ini.IniDecoder = $hxClasses["thx.ini.IniDecoder"] = function(handler,explodesections,emptytonull) {
	if(emptytonull == null) emptytonull = true;
	if(explodesections == null) explodesections = true;
	this.explodesections = explodesections;
	if(explodesections) {
		this.handler = this.value = new thx.data.ValueHandler();
		this.other = handler;
	} else this.handler = handler;
	this.emptytonull = emptytonull;
};
thx.ini.IniDecoder.__name__ = ["thx","ini","IniDecoder"];
thx.ini.IniDecoder.explodeSections = function(o) {
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var parts = field.split(".");
		if(parts.length == 1) continue;
		var ref = o;
		var _g3 = 0, _g2 = parts.length - 1;
		while(_g3 < _g2) {
			var i = _g3++;
			var name = parts[i];
			if(!Reflect.hasField(ref,name)) ref[name] = { };
			ref = Reflect.field(ref,name);
		}
		var last = parts[parts.length - 1];
		var v = Reflect.field(o,field);
		Reflect.deleteField(o,field);
		ref[last] = v;
	}
	return o;
}
thx.ini.IniDecoder.prototype = {
	emptytonull: null
	,explodesections: null
	,handler: null
	,other: null
	,value: null
	,insection: null
	,decode: function(s) {
		this.handler.start();
		this.handler.startObject();
		this.insection = false;
		this.decodeLines(s);
		if(this.insection) {
			this.handler.endObject();
			this.handler.endField();
		}
		this.handler.endObject();
		this.handler.end();
		if(this.explodesections) new thx.data.ValueEncoder(this.other).encode(thx.ini.IniDecoder.explodeSections(this.value.value));
	}
	,decodeLines: function(s) {
		var lines = new EReg("(\n\r|\n|\r)","g").split(s);
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			this.decodeLine(line);
		}
	}
	,decodeLine: function(line) {
		if(StringTools.trim(line) == "") return;
		line = StringTools.ltrim(line);
		var c = line.substr(0,1);
		switch(c) {
		case "[":
			if(this.insection) {
				this.handler.endObject();
				this.handler.endField();
			} else this.insection = true;
			this.handler.startField(line.substr(1,line.indexOf("]") - 1));
			this.handler.startObject();
			return;
		case "#":case ";":
			this.handler.comment(line.substr(1));
			return;
		}
		var pos = 0;
		do pos = line.indexOf("=",pos); while(pos > 0 && line.substr(pos - 1,1) == "\\");
		if(pos <= 0) throw new thx.error.Error("invalid key pair (missing '=' symbol?): {0}",null,line,{ fileName : "IniDecoder.hx", lineNumber : 118, className : "thx.ini.IniDecoder", methodName : "decodeLine"});
		var key = StringTools.trim(this.dec(line.substr(0,pos)));
		var value = line.substr(pos + 1);
		var parts = thx.ini.IniDecoder.linesplitter.split(value);
		this.handler.startField(key);
		this.decodeValue(parts[0]);
		if(parts.length > 1) this.handler.comment(parts[1]);
		this.handler.endField();
	}
	,dec: function(s) {
		var _g1 = 0, _g = thx.ini.IniEncoder.encoded.length;
		while(_g1 < _g) {
			var i = _g1++;
			s = StringTools.replace(s,thx.ini.IniEncoder.encoded[i],thx.ini.IniEncoder.decoded[i]);
		}
		return s;
	}
	,decodeValue: function(s) {
		s = StringTools.trim(s);
		var c = s.substr(0,1);
		if(c == "\"" || c == "'" && s.substr(-1) == c) {
			this.handler.string(this.dec(s.substr(1,s.length - 2)));
			return;
		}
		if(Ints.canParse(s)) this.handler["int"](Ints.parse(s)); else if(Floats.canParse(s)) this.handler["float"](Floats.parse(s)); else if(Dates.canParse(s)) this.handler.date(Dates.parse(s)); else if(this.emptytonull && "" == s) this.handler["null"](); else switch(s.toLowerCase()) {
		case "yes":case "true":case "on":
			this.handler.bool(true);
			break;
		case "no":case "false":case "off":
			this.handler.bool(false);
			break;
		default:
			var parts = s.split(", ");
			if(parts.length > 1) {
				this.handler.startArray();
				var _g = 0;
				while(_g < parts.length) {
					var part = parts[_g];
					++_g;
					this.handler.startItem();
					this.decodeValue(part);
					this.handler.endItem();
				}
				this.handler.endArray();
			} else {
				s = this.dec(s);
				this.handler.string(s);
			}
		}
	}
	,__class__: thx.ini.IniDecoder
}
thx.html.HtmlDocumentFormat = $hxClasses["thx.html.HtmlDocumentFormat"] = function() {
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsCommentedText;
	this._level = 0;
	this._begin = true;
};
thx.html.HtmlDocumentFormat.__name__ = ["thx","html","HtmlDocumentFormat"];
thx.html.HtmlDocumentFormat.__super__ = thx.xml.DocumentFormat;
thx.html.HtmlDocumentFormat.prototype = $extend(thx.xml.DocumentFormat.prototype,{
	indent: null
	,newline: null
	,wrapColumns: null
	,specialElementContentFormat: null
	,_level: null
	,_begin: null
	,indentWrap: function(content) {
		if("" == content) return ""; else return this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
	}
	,format: function(node) {
		return Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
	}
	,isEmpty: function(node) {
		return thx.html.Element._empty.exists(node.getNodeName());
	}
	,formatInlineNode: function(node) {
		var t = node.nodeType;
		if(Xml.Element == t) return this.formatInlineElement(node); else if(Xml.PCData == t) return this.formatInlinePCData(node); else if(Xml.CData == t) return this.formatInlineCData(node); else if(Xml.Comment == t) return this.formatInlineComment(node); else return (function($this) {
			var $r;
			throw "invalid node type: " + Std.string(t);
			return $r;
		}(this));
	}
	,formatInlineElement: function(node) {
		if(this.isEmpty(node)) return this.formatInlineEmptyElement(node); else return this.formatInlineOpenElement(node) + this.formatInlineChildren(node) + this.formatInlineCloseElement(node);
	}
	,contentIsEmpty: function(node) {
		var $it0 = node.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.nodeType != Xml.PCData || StringTools.trim(c.getNodeValue()) != "") return false;
		}
		return true;
	}
	,formatSpecialElement: function(node) {
		if(this.contentIsEmpty(node)) return this.indentWrap(this.formatInlineOpenElement(node) + this.formatInlineCloseElement(node)); else return this.formatOpenElement(node) + this.wrapSpecialElementContent(this.formatChildren(node)) + this.formatCloseElement(node);
	}
	,wrapSpecialElementContent: function(content) {
		switch( (this.specialElementContentFormat)[1] ) {
		case 0:
			return content;
		case 1:
			return "<![CDATA[" + this.newline + content + this.newline + "]]>";
		case 2:
			return "<!--" + this.newline + content + this.newline + "// -->";
		}
	}
	,formatElement: function(node) {
		if(thx.html.Element._special.exists(node.getNodeName())) return this.formatSpecialElement(node); else if(thx.html.Element._preserve.exists(node.getNodeName())) {
			var open = this.formatOpenElement(node);
			var content = "";
			var $it0 = node.iterator();
			while( $it0.hasNext() ) {
				var child = $it0.next();
				content += child.toString();
			}
			var close = this.formatInlineCloseElement(node);
			return open + content + close;
		} else if(this.isEmpty(node)) {
			if(thx.html.Element._inline.exists(node.getNodeName())) return this.formatInlineEmptyElement(node); else return this.formatEmptyElement(node);
		} else if(thx.html.Element._block.exists(node.getNodeName()) && this.inlineContent(node)) {
			var open = this.formatInlineOpenElement(node);
			var content = this.formatInlineChildren(node);
			var close = this.formatInlineCloseElement(node);
			if(this.indent.length * this._level + open.length + content.length + close.length <= this.wrapColumns) return this.indentWrap(open + content + close); else {
				this._level++;
				content = this.indentWrap(content);
				this._level--;
				return this.indentWrap(open) + content + this.indentWrap(close);
			}
		} else if(thx.html.Element._inline.exists(node.getNodeName())) return this.formatInlineOpenElement(node) + this.formatInlineChildren(node) + this.formatInlineCloseElement(node); else return this.formatOpenElement(node) + this.formatChildren(node) + this.formatCloseElement(node);
	}
	,inlineContent: function(node) {
		var $it0 = node.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			if(child.nodeType == Xml.PCData || child.nodeType == Xml.Element && thx.html.Element._inline.exists(child.getNodeName())) continue;
			return false;
		}
		return true;
	}
	,formatChildren: function(node) {
		this._level++;
		var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
		this._level--;
		return content;
	}
	,formatInlineChildren: function(node) {
		var buf = new StringBuf();
		var $it0 = node.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			buf.add(this.formatInlineNode(child));
		}
		return buf.b.join("");
	}
	,formatDocType: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
	}
	,formatProlog: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
	}
	,formatComment: function(node) {
		if(this.stripComments) return ""; else return this.indentWrap(this.nodeFormat.formatComment(node));
	}
	,formatInlineComment: function(node) {
		if(this.stripComments) return ""; else return this.nodeFormat.formatComment(node);
	}
	,formatEmptyElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
	}
	,formatOpenElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
	}
	,formatCloseElement: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
	}
	,formatInlineEmptyElement: function(node) {
		return thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node);
	}
	,formatInlineOpenElement: function(node) {
		return thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node);
	}
	,formatInlineCloseElement: function(node) {
		return thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node);
	}
	,formatDocument: function(node) {
		return thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	}
	,formatPCData: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
	}
	,formatCData: function(node) {
		return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
	}
	,formatInlinePCData: function(node) {
		return thx.xml.DocumentFormat.prototype.formatPCData.call(this,node);
	}
	,formatInlineCData: function(node) {
		return thx.xml.DocumentFormat.prototype.formatCData.call(this,node);
	}
	,__class__: thx.html.HtmlDocumentFormat
});
thx.html.SpecialElementContentFormat = $hxClasses["thx.html.SpecialElementContentFormat"] = { __ename__ : ["thx","html","SpecialElementContentFormat"], __constructs__ : ["AsPlainText","AsCData","AsCommentedText"] }
thx.html.SpecialElementContentFormat.AsPlainText = ["AsPlainText",0];
thx.html.SpecialElementContentFormat.AsPlainText.toString = $estr;
thx.html.SpecialElementContentFormat.AsPlainText.__enum__ = thx.html.SpecialElementContentFormat;
thx.html.SpecialElementContentFormat.AsCData = ["AsCData",1];
thx.html.SpecialElementContentFormat.AsCData.toString = $estr;
thx.html.SpecialElementContentFormat.AsCData.__enum__ = thx.html.SpecialElementContentFormat;
thx.html.SpecialElementContentFormat.AsCommentedText = ["AsCommentedText",2];
thx.html.SpecialElementContentFormat.AsCommentedText.toString = $estr;
thx.html.SpecialElementContentFormat.AsCommentedText.__enum__ = thx.html.SpecialElementContentFormat;
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
thx.html.HtmlAttributeFormat = $hxClasses["thx.html.HtmlAttributeFormat"] = function() {
	thx.xml.AttributeFormat.call(this);
};
thx.html.HtmlAttributeFormat.__name__ = ["thx","html","HtmlAttributeFormat"];
thx.html.HtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
thx.html.HtmlAttributeFormat.prototype = $extend(thx.xml.AttributeFormat.prototype,{
	formatAttribute: function(name,value) {
		if(thx.html.Attribute._fill.exists(name)) return name; else return name + "=\"" + value + "\"";
	}
	,__class__: thx.html.HtmlAttributeFormat
});
thx.util.TestResults = $hxClasses["thx.util.TestResults"] = function() {
};
thx.util.TestResults.__name__ = ["thx","util","TestResults"];
thx.util.TestResults.prototype = {
	testToString: function() {
		utest.Assert.equals("Ok",thx.util.Results.toString(thx.util.Result.Ok),null,{ fileName : "TestResults.hx", lineNumber : 11, className : "thx.util.TestResults", methodName : "testToString"});
		utest.Assert.equals("a A b B",thx.util.Results.toString(thx.util.Result.Failure([new thx.util.Message("a {1} b {0}",["B","A"],null)])),null,{ fileName : "TestResults.hx", lineNumber : 12, className : "thx.util.TestResults", methodName : "testToString"});
		var error = new thx.error.Error("b {0}",null,"B",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}).setInner(new thx.error.Error("a {0}",null,"A",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}));
		utest.Assert.equals("b B",thx.util.Results.toString(thx.util.Result.Failure([error])),null,{ fileName : "TestResults.hx", lineNumber : 16, className : "thx.util.TestResults", methodName : "testToString"});
	}
	,__class__: thx.util.TestResults
}
thx.math.TestAll = $hxClasses["thx.math.TestAll"] = function() {
};
thx.math.TestAll.__name__ = ["thx","math","TestAll"];
thx.math.TestAll.addTests = function(runner) {
	thx.math.scale.TestAll.addTests(runner);
	runner.addCase(new thx.math.TestRandom());
	runner.addCase(new thx.math.TestEquations());
}
thx.math.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.math.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.math.TestAll.prototype = {
	__class__: thx.math.TestAll
}
thx.math.scale.TestQuantile = $hxClasses["thx.math.scale.TestQuantile"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestQuantile.__name__ = ["thx","math","scale","TestQuantile"];
thx.math.scale.TestQuantile.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestQuantile.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testQuantile: function() {
		var x = ($_=new thx.math.scale.Quantile().domain([3.0,6,7,8,8,10,13,15,16,20]).range([0.0,1,2,3]),$_.scale.$bind($_));
		var e = [0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3];
		var t = [3.0,6,6.9,7,7.1,8,8.9,9,9.1,10,13,14.9,15,15.1,16,20];
		var _g1 = 0, _g = t.length;
		while(_g1 < _g) {
			var i = _g1++;
			utest.Assert.equals(e[i],x(t[i]),"expected " + e[i] + " but was " + x(t[i]) + " for " + t[i],{ fileName : "TestQuantile.hx", lineNumber : 22, className : "thx.math.scale.TestQuantile", methodName : "testQuantile"});
		}
		x = ($_=new thx.math.scale.Quantile().domain([3.0,6,7,8,8,9,10,13,15,16,20]).range([0.0,1,2,3]),$_.scale.$bind($_));
		var e1 = [0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3];
		var t1 = [3.0,6,6.9,7,7.1,8,8.9,9.0,9.1,10,13,14.9,15,15.1,16,20];
		var _g1 = 0, _g = t1.length;
		while(_g1 < _g) {
			var i = _g1++;
			utest.Assert.equals(e1[i],x(t1[i]),"expected " + e1[i] + " but was " + x(t1[i]) + " for " + t1[i],{ fileName : "TestQuantile.hx", lineNumber : 32, className : "thx.math.scale.TestQuantile", methodName : "testQuantile"});
		}
		x = ($_=new thx.math.scale.Quantile().domain([0.0,1]).range([0.0,1]),$_.scale.$bind($_));
		var e2 = [0,0,0,1,1,1];
		var t2 = [-0.5,0,0.49,0.51,1,1.5];
		var _g1 = 0, _g = t2.length;
		while(_g1 < _g) {
			var i = _g1++;
			utest.Assert.equals(e2[i],x(t2[i]),"expected " + e2[i] + " but was " + x(t2[i]) + " for " + t2[i],{ fileName : "TestQuantile.hx", lineNumber : 42, className : "thx.math.scale.TestQuantile", methodName : "testQuantile"});
		}
	}
	,__class__: thx.math.scale.TestQuantile
});
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype = {
	id: null
	,timerId: null
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.timerId);
		var arr = haxe_timers;
		arr[this.id] = null;
		if(this.id > 100 && this.id == arr.length - 1) {
			var p = this.id - 1;
			while(p >= 0 && arr[p] == null) p--;
			arr = arr.slice(0,p + 1);
		}
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
thx.xml.NodeFormat = $hxClasses["thx.xml.NodeFormat"] = function() {
};
thx.xml.NodeFormat.__name__ = ["thx","xml","NodeFormat"];
thx.xml.NodeFormat.prototype = {
	valueFormat: null
	,attributeFormat: null
	,formatEmptyElement: function(node) {
		return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + "/>";
	}
	,formatOpenElement: function(node) {
		return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
	}
	,formatCloseElement: function(node) {
		return "</" + node.getNodeName() + ">";
	}
	,formatPCData: function(node) {
		return this.valueFormat.format(node.getNodeValue());
	}
	,formatDocType: function(node) {
		return "<!DOCTYPE " + this.valueFormat.format(node.getNodeValue()) + ">";
	}
	,formatProlog: function(node) {
		return "<?" + this.valueFormat.format(node.getNodeValue()) + "?>";
	}
	,formatComment: function(node) {
		return "<!--" + this.valueFormat.format(node.getNodeValue()) + "-->";
	}
	,formatCData: function(node) {
		return "<![CDATA[" + this.valueFormat.format(node.getNodeValue()) + "]]>";
	}
	,__class__: thx.xml.NodeFormat
}
thx.html.HtmlNodeFormat = $hxClasses["thx.html.HtmlNodeFormat"] = function() {
	thx.xml.NodeFormat.call(this);
};
thx.html.HtmlNodeFormat.__name__ = ["thx","html","HtmlNodeFormat"];
thx.html.HtmlNodeFormat.__super__ = thx.xml.NodeFormat;
thx.html.HtmlNodeFormat.prototype = $extend(thx.xml.NodeFormat.prototype,{
	formatEmptyElement: function(node) {
		return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
	}
	,__class__: thx.html.HtmlNodeFormat
});
thx.html.CloseSelfHtmlNodeFormat = $hxClasses["thx.html.CloseSelfHtmlNodeFormat"] = function() {
	thx.html.HtmlNodeFormat.call(this);
};
thx.html.CloseSelfHtmlNodeFormat.__name__ = ["thx","html","CloseSelfHtmlNodeFormat"];
thx.html.CloseSelfHtmlNodeFormat.__super__ = thx.html.HtmlNodeFormat;
thx.html.CloseSelfHtmlNodeFormat.prototype = $extend(thx.html.HtmlNodeFormat.prototype,{
	formatCloseElement: function(node) {
		if(thx.html.Element._closeSelf.exists(node.getNodeName())) return ""; else return "</" + node.getNodeName() + ">";
	}
	,__class__: thx.html.CloseSelfHtmlNodeFormat
});
thx.html.TestXHtmlFormat = $hxClasses["thx.html.TestXHtmlFormat"] = function() {
};
thx.html.TestXHtmlFormat.__name__ = ["thx","html","TestXHtmlFormat"];
thx.html.TestXHtmlFormat.prototype = {
	format: null
	,setup: function() {
		this.format = new thx.html.XHtmlFormat();
	}
	,testBlockElement: function() {
		this.assertProcessed("<div></div>","<div/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestXHtmlFormat", methodName : "testBlockElement"});
	}
	,testEmptyElement: function() {
		this.assertProcessed("<br/>","<br>doomed to be lost</br>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 25, className : "thx.html.TestXHtmlFormat", methodName : "testEmptyElement"});
	}
	,testInlineElement: function() {
		this.assertProcessed("<div>hello <b>world</b></div>","<div>hello <b>world</b></div>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 30, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElement"});
	}
	,testFillAttribute: function() {
		this.assertProcessed("<input class=\"class\" disabled=\"disabled\"/>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 35, className : "thx.html.TestXHtmlFormat", methodName : "testFillAttribute"});
	}
	,testInlineElementInLongParagraph: function() {
		this.format.wrapColumns = 28;
		this.assertProcessed("<p>\n  Lorem ipsum dolor\n  <b>sit</b> amet,\n  consectetur <b>adipisicing\n  elit</b>, sed do eiusmod\n  tempor incididunt\n  <b>ut</b> labore et dolore\n  magna aliqua.\n</p>","<p>Lorem ipsum dolor <b>sit</b> amet, consectetur <b>adipisicing elit</b>, sed do eiusmod tempor incididunt <b>ut</b> labore et dolore magna aliqua.</p>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 41, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElementInLongParagraph"});
	}
	,testAutoFormat2: function() {
		var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
		this.assertProcessed("<html>\n  <head>\n    <title>hello</title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>one</li>\n        <li>two</li>\n        <li>three</li>\n      </ul>\n    </div>\n  </body>\n</html>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 56, className : "thx.html.TestXHtmlFormat", methodName : "testAutoFormat2"});
	}
	,testAutoWidth: function() {
		this.format.wrapColumns = 36;
		var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
		this.assertProcessed("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 76, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidth"});
	}
	,testAutoWidthWithInlineElements: function() {
		this.format.wrapColumns = 36;
		var xml = "<body><p><b>Lorem</b> ipsum <b>dolor sit</b> amet</p><p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
		this.assertProcessed("<body>\n  <p>\n    <b>Lorem</b> ipsum <b>dolor\n    sit</b> amet\n  </p>\n  <p>\n    consectetur <b>adipisicing</b>\n    elit, <b>sed do</b> eiusmod\n    tempor incididunt ut labore et\n    dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 107, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidthWithInlineElements"});
	}
	,assertProcessed: function(expected,input,pos) {
		utest.Assert.equals(expected,this.toHtml(input),null,pos);
	}
	,xmlToHtml: function(xml) {
		return this.format.format(xml);
	}
	,toHtml: function(s) {
		return this.xmlToHtml(Xml.parse(s));
	}
	,__class__: thx.html.TestXHtmlFormat
}
thx.geo.Azimuthal = $hxClasses["thx.geo.Azimuthal"] = function() {
	this.setMode(thx.geo.ProjectionMode.Orthographic);
	this.setScale(200);
	this.setTranslate([480.0,250]);
	this.setOrigin([0.0,0]);
};
thx.geo.Azimuthal.__name__ = ["thx","geo","Azimuthal"];
thx.geo.Azimuthal.__interfaces__ = [thx.geo.IProjection];
thx.geo.Azimuthal.prototype = {
	mode: null
	,origin: null
	,scale: null
	,translate: null
	,x0: null
	,y0: null
	,cy0: null
	,sy0: null
	,project: function(coords) {
		var x1 = coords[0] * 0.01745329251994329577 - this.x0, y1 = coords[1] * 0.01745329251994329577, cx1 = Math.cos(x1), sx1 = Math.sin(x1), cy1 = Math.cos(y1), sy1 = Math.sin(y1), k = (function($this) {
			var $r;
			switch( ($this.getMode())[1] ) {
			case 0:
				$r = 1;
				break;
			case 1:
				$r = 1 / (1 + $this.sy0 * sy1 + $this.cy0 * cy1 * cx1);
				break;
			}
			return $r;
		}(this)), x = k * cy1 * sx1, y = k * (this.sy0 * cy1 * cx1 - this.cy0 * sy1);
		return [this.getScale() * x + this.getTranslate()[0],this.getScale() * y + this.getTranslate()[1]];
	}
	,invert: function(coords) {
		var x = (coords[0] - this.getTranslate()[0]) / this.getScale(), y = (coords[1] - this.getTranslate()[1]) / this.getScale(), p = Math.sqrt(x * x + y * y), c = (function($this) {
			var $r;
			switch( ($this.getMode())[1] ) {
			case 0:
				$r = Math.asin(p);
				break;
			case 1:
				$r = Math.atan(p);
				break;
			}
			return $r;
		}(this)), sc = Math.sin(c), cc = Math.cos(c);
		return [(this.x0 + Math.atan2(x * sc,p * this.cy0 * cc + y * this.sy0 * sc)) / 0.01745329251994329577,Math.asin(cc * this.sy0 - y * sc * this.cy0 / p) / 0.01745329251994329577];
	}
	,getOrigin: function() {
		return this.origin.copy();
	}
	,setOrigin: function(origin) {
		this.origin = [origin[0],origin[1]];
		this.x0 = origin[0] * 0.01745329251994329577;
		this.y0 = origin[1] * 0.01745329251994329577;
		this.cy0 = Math.cos(this.y0);
		this.sy0 = Math.sin(this.y0);
		return origin;
	}
	,getTranslate: function() {
		return this.translate.copy();
	}
	,setTranslate: function(translate) {
		this.translate = [translate[0],translate[1]];
		return translate;
	}
	,setScale: function(scale) {
		return this.scale = scale;
	}
	,getScale: function() {
		return this.scale;
	}
	,setMode: function(mode) {
		return this.mode = mode;
	}
	,getMode: function() {
		return this.mode;
	}
	,__class__: thx.geo.Azimuthal
	,__properties__: {set_translate:"setTranslate",get_translate:"getTranslate",set_scale:"setScale",get_scale:"getScale",set_origin:"setOrigin",get_origin:"getOrigin",set_mode:"setMode",get_mode:"getMode"}
}
thx.geo.ProjectionMode = $hxClasses["thx.geo.ProjectionMode"] = { __ename__ : ["thx","geo","ProjectionMode"], __constructs__ : ["Orthographic","Stereographic"] }
thx.geo.ProjectionMode.Orthographic = ["Orthographic",0];
thx.geo.ProjectionMode.Orthographic.toString = $estr;
thx.geo.ProjectionMode.Orthographic.__enum__ = thx.geo.ProjectionMode;
thx.geo.ProjectionMode.Stereographic = ["Stereographic",1];
thx.geo.ProjectionMode.Stereographic.toString = $estr;
thx.geo.ProjectionMode.Stereographic.__enum__ = thx.geo.ProjectionMode;
thx.ini.IniEncoder = $hxClasses["thx.ini.IniEncoder"] = function(newline,ignorecomments) {
	if(ignorecomments == null) ignorecomments = true;
	if(newline == null) newline = "\n";
	this.newline = newline;
	this.ignorecomments = ignorecomments;
};
thx.ini.IniEncoder.__name__ = ["thx","ini","IniEncoder"];
thx.ini.IniEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.ini.IniEncoder.prototype = {
	ignorecomments: null
	,newline: null
	,buf: null
	,encodedString: null
	,inarray: null
	,cache: null
	,value: null
	,stack: null
	,start: function() {
		this.inarray = 0;
		this.stack = [];
		this.cache = new Hash();
	}
	,end: function() {
		var keys = Arrays.order(Iterators.array(this.cache.keys()),null);
		var lines = [];
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			if("" != key) {
				lines.push("");
				lines.push("[" + key + "]");
			}
			lines = lines.concat(this.cache.get(key));
		}
		this.encodedString = StringTools.trim(lines.join(this.newline));
	}
	,startObject: function() {
		if(this.inarray > 0) throw new thx.error.Error("arrays must contain only primitive values",null,null,{ fileName : "IniEncoder.hx", lineNumber : 58, className : "thx.ini.IniEncoder", methodName : "startObject"});
	}
	,startField: function(name) {
		this.stack.push(this.enc(name));
		this.value = "";
	}
	,endField: function() {
		if(null == this.value) return;
		var key = this.stack.pop();
		var name = this.stack.join(".");
		var section = this.getSection(name);
		section.push(key + "=" + this.value);
		this.value = null;
	}
	,getSection: function(name) {
		var section = this.cache.get(name);
		if(null == section) {
			section = [];
			this.cache.set(name,section);
		}
		return section;
	}
	,endObject: function() {
		this.stack.pop();
	}
	,startArray: function() {
		if(this.inarray > 0) throw new thx.error.Error("nested arrays are not supported in the .ini format",null,null,{ fileName : "IniEncoder.hx", lineNumber : 97, className : "thx.ini.IniEncoder", methodName : "startArray"});
		this.inarray = 1;
		this.value = "";
	}
	,startItem: function() {
		if(this.inarray == 1) this.inarray = 2; else this.value += ", ";
	}
	,endItem: function() {
	}
	,endArray: function() {
		this.inarray = 0;
	}
	,date: function(d) {
		if(d.getSeconds() == 0 && d.getMinutes() == 0 && d.getHours() == 0) this.value += Dates.format(d,"C",["%Y-%m-%d"]); else this.value += Dates.format(d,"C",["%Y-%m-%d %H:%M:%S"]);
	}
	,string: function(s) {
		if(StringTools.trim(s) == s) this.value += this.enc(s); else this.value += this.quote(s);
	}
	,enc: function(s) {
		var _g1 = 0, _g = thx.ini.IniEncoder.decoded.length;
		while(_g1 < _g) {
			var i = _g1++;
			s = StringTools.replace(s,thx.ini.IniEncoder.decoded[i],thx.ini.IniEncoder.encoded[i]);
		}
		return s;
	}
	,quote: function(s) {
		return "\"" + StringTools.replace(this.enc(s),"\"","\\\"") + "\"";
	}
	,'int': function(i) {
		this.value += i;
	}
	,'float': function(f) {
		this.value += f;
	}
	,'null': function() {
		this.value += "";
	}
	,comment: function(s) {
		if(!this.ignorecomments) this.value += "#" + s;
	}
	,bool: function(b) {
		this.value += b?"ON":"OFF";
	}
	,__class__: thx.ini.IniEncoder
}
thx.collection.TestAll = $hxClasses["thx.collection.TestAll"] = function() {
};
thx.collection.TestAll.__name__ = ["thx","collection","TestAll"];
thx.collection.TestAll.addTests = function(runner) {
}
thx.collection.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.collection.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.collection.TestAll.prototype = {
	__class__: thx.collection.TestAll
}
thx.svg.Chord = $hxClasses["thx.svg.Chord"] = function(source,target,radius,startAngle,endAngle) {
	this._source = source;
	this._target = target;
	this._radius = radius;
	this._startAngle = startAngle;
	this._endAngle = endAngle;
};
thx.svg.Chord.__name__ = ["thx","svg","Chord"];
thx.svg.Chord.pathObject = function() {
	return new thx.svg.Chord(function(d,_) {
		return d.source;
	},function(d,_) {
		return d.target;
	},function(d,_) {
		return d.radius;
	},function(d,_) {
		return d.startAngle;
	},function(d,_) {
		return d.endAngle;
	});
}
thx.svg.Chord.prototype = {
	_source: null
	,_target: null
	,_radius: null
	,_startAngle: null
	,_endAngle: null
	,shape: function(d,i) {
		var s = this.subgroup(this._source,d,i), t = this.subgroup(this._target,d,i);
		return "M" + s.p0 + this.arc(s.r,s.p1) + (this.equals(s,t)?this.curve(s.r,s.p1,s.r,s.p0):this.curve(s.r,s.p1,t.r,t.p0) + this.arc(t.r,t.p1) + this.curve(t.r,t.p1,s.r,s.p0)) + "Z";
	}
	,subgroup: function(f,d,i) {
		var sub = f(d,i), r = this._radius(sub,i), a0 = this._startAngle(sub,i) + thx.svg.LineInternals.arcOffset, a1 = this._endAngle(sub,i) + thx.svg.LineInternals.arcOffset;
		return { r : r, a0 : a0, a1 : a1, p0 : [r * Math.cos(a0),r * Math.sin(a0)], p1 : [r * Math.cos(a1),r * Math.sin(a1)]};
	}
	,equals: function(a,b) {
		return a.a0 == b.a0 && a.a1 == b.a1;
	}
	,arc: function(r,p) {
		return "A" + r + "," + r + " 0 0,1 " + p;
	}
	,curve: function(r0,p0,r1,p1) {
		return "Q 0,0 " + p1;
	}
	,getSource: function() {
		return this._source;
	}
	,source: function(v) {
		this._source = function(_,_1) {
			return v;
		};
		return this;
	}
	,sourcef: function(v) {
		this._source = v;
		return this;
	}
	,getTarget: function() {
		return this._target;
	}
	,target: function(v) {
		this._target = function(_,_1) {
			return v;
		};
		return this;
	}
	,targetf: function(v) {
		this._target = v;
		return this;
	}
	,getRadius: function() {
		return this._radius;
	}
	,radius: function(v) {
		this._radius = function(_,_1) {
			return v;
		};
		return this;
	}
	,radiusf: function(v) {
		this._radius = v;
		return this;
	}
	,getStartAngle: function() {
		return this._startAngle;
	}
	,startAngle: function(v) {
		this._startAngle = function(_,_1) {
			return v;
		};
		return this;
	}
	,startAnglef: function(v) {
		this._startAngle = v;
		return this;
	}
	,getEndAngle: function() {
		return this._endAngle;
	}
	,endAngle: function(v) {
		this._endAngle = function(_,_1) {
			return v;
		};
		return this;
	}
	,endAnglef: function(v) {
		this._endAngle = v;
		return this;
	}
	,__class__: thx.svg.Chord
}
thx.error.TestAll = $hxClasses["thx.error.TestAll"] = function() {
};
thx.error.TestAll.__name__ = ["thx","error","TestAll"];
thx.error.TestAll.addTests = function(runner) {
	runner.addCase(new thx.error.TestError());
	runner.addCase(new thx.error.TestNullArgument());
}
thx.error.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.error.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.error.TestAll.prototype = {
	__class__: thx.error.TestAll
}
utest.Assertation = $hxClasses["utest.Assertation"] = { __ename__ : ["utest","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
utest.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
thx.math.TestRandom = $hxClasses["thx.math.TestRandom"] = function() {
};
thx.math.TestRandom.__name__ = ["thx","math","TestRandom"];
thx.math.TestRandom.prototype = {
	testSequenceDefault: function() {
		var s = [16807,282475249,548908249,984943658,70367106,470211272,101027544,384109054,385036099,933495885];
		var r = new thx.math.Random();
		var _g = 0;
		while(_g < s.length) {
			var v = s[_g];
			++_g;
			utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 12, className : "thx.math.TestRandom", methodName : "testSequenceDefault"});
		}
	}
	,testSequence7: function() {
		var s = [117649,903584919,621132276,452154665,492569745,70253433,707192808,541279734,547769049,92020257];
		var r = new thx.math.Random(7);
		var _g = 0;
		while(_g < s.length) {
			var v = s[_g];
			++_g;
			utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 20, className : "thx.math.TestRandom", methodName : "testSequence7"});
		}
	}
	,__class__: thx.math.TestRandom
}
thx.html.TestHtmlFormat = $hxClasses["thx.html.TestHtmlFormat"] = function() {
};
thx.html.TestHtmlFormat.__name__ = ["thx","html","TestHtmlFormat"];
thx.html.TestHtmlFormat.prototype = {
	format: null
	,setup: function() {
		this.format = new thx.html.HtmlFormat();
	}
	,testEmptyElement: function() {
		this.assertProcessed("<br>","<br>doomed to be lost</br>",{ fileName : "TestHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestHtmlFormat", methodName : "testEmptyElement"});
	}
	,testUseCloseSelf: function() {
		this.format.useCloseSelf = true;
		this.assertProcessed("<ul>\n  <li>item\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 26, className : "thx.html.TestHtmlFormat", methodName : "testUseCloseSelf"});
	}
	,testDontUseCloseSelf: function() {
		this.assertProcessed("<ul>\n  <li>item</li>\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 31, className : "thx.html.TestHtmlFormat", methodName : "testDontUseCloseSelf"});
	}
	,testFillAttribute: function() {
		this.assertProcessed("<input class=\"class\" disabled>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 36, className : "thx.html.TestHtmlFormat", methodName : "testFillAttribute"});
	}
	,testAutoQuotesRemoval: function() {
		this.format.quotesRemoval = true;
		this.assertProcessed("<img class=\"a b\" id=c>","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 42, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemoval"});
	}
	,testAutoQuotesRemovalOff: function() {
		this.assertProcessed("<img class=\"a b\" id=\"c\">","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 47, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemovalOff"});
	}
	,assertProcessed: function(expected,input,pos) {
		utest.Assert.equals(expected,this.toHtml(input),null,pos);
	}
	,xmlToHtml: function(xml) {
		return this.format.format(xml);
	}
	,toHtml: function(s) {
		return this.xmlToHtml(Xml.parse(s));
	}
	,__class__: thx.html.TestHtmlFormat
}
thx.ini.TestIni = $hxClasses["thx.ini.TestIni"] = function() {
};
thx.ini.TestIni.__name__ = ["thx","ini","TestIni"];
thx.ini.TestIni.prototype = {
	testEncode: function() {
		utest.Assert.same(thx.ini.TestIni.v,thx.ini.Ini.decode(thx.ini.Ini.encode(thx.ini.TestIni.v)),null,null,{ fileName : "TestIni.hx", lineNumber : 64, className : "thx.ini.TestIni", methodName : "testEncode"});
	}
	,testDecode: function() {
		var t = thx.ini.Ini.decode(thx.ini.TestIni.s);
		utest.Assert.same(thx.ini.TestIni.v,t,null,null,{ fileName : "TestIni.hx", lineNumber : 70, className : "thx.ini.TestIni", methodName : "testDecode"});
	}
	,__class__: thx.ini.TestIni
}
var Objects = $hxClasses["Objects"] = function() { }
Objects.__name__ = ["Objects"];
Objects.field = function(o,fieldname,alt) {
	return Reflect.hasField(o,fieldname)?Reflect.field(o,fieldname):alt;
}
Objects.keys = function(o) {
	return Reflect.fields(o);
}
Objects.values = function(o) {
	var arr = [];
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		arr.push(Reflect.field(o,key));
	}
	return arr;
}
Objects.entries = function(o) {
	var arr = [];
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		arr.push({ key : key, value : Reflect.field(o,key)});
	}
	return arr;
}
Objects.each = function(o,handler) {
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		handler(key,Reflect.field(o,key));
	}
}
Objects.map = function(o,handler) {
	var results = [];
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		results.push(handler(key,Reflect.field(o,key)));
	}
	return results;
}
Objects["with"] = function(ob,f) {
	f(ob);
	return ob;
}
Objects.toHash = function(ob) {
	var hash = new Hash();
	return Objects.copyToHash(ob,hash);
}
Objects.copyToHash = function(ob,hash) {
	var _g = 0, _g1 = Reflect.fields(ob);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		hash.set(field,Reflect.field(ob,field));
	}
	return hash;
}
Objects.interpolate = function(v,a,b,equation) {
	return (Objects.interpolatef(a,b,equation))(v);
}
Objects.interpolatef = function(a,b,equation) {
	var i = { }, c = { }, keys = Reflect.fields(a);
	var _g = 0;
	while(_g < keys.length) {
		var key = keys[_g];
		++_g;
		if(Reflect.hasField(b,key)) {
			var va = Reflect.field(a,key);
			i[key] = Dynamics.interpolatef(va,Reflect.field(b,key));
		} else c[key] = Reflect.field(a,key);
	}
	keys = Reflect.fields(b);
	var _g = 0;
	while(_g < keys.length) {
		var key = keys[_g];
		++_g;
		if(!Reflect.hasField(a,key)) c[key] = Reflect.field(b,key);
	}
	return function(t) {
		var _g = 0, _g1 = Reflect.fields(i);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			c[k] = Reflect.field(i,k).apply(i,[t]);
		}
		return c;
	};
}
Objects.copyTo = function(src,dst) {
	var _g = 0, _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var sv = Dynamics.clone(Reflect.field(src,field));
		var dv = Reflect.field(dst,field);
		if(Reflect.isObject(sv) && null == Type.getClass(sv) && (Reflect.isObject(dv) && null == Type.getClass(dv))) Objects.copyTo(sv,dv); else dst[field] = sv;
	}
	return dst;
}
Objects.clone = function(src) {
	var dst = { };
	return Objects.copyTo(src,dst);
}
Objects.mergef = function(ob,new_ob,f) {
	var _g = 0, _g1 = Reflect.fields(new_ob);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var new_val = Reflect.field(new_ob,field);
		if(Reflect.hasField(ob,field)) {
			var old_val = Reflect.field(ob,field);
			ob[field] = f(field,old_val,new_val);
		} else ob[field] = new_val;
	}
}
Objects.merge = function(ob,new_ob) {
	Objects.mergef(ob,new_ob,function(key,old_v,new_v) {
		return new_v;
	});
}
Objects._flatten = function(src,cum,arr,levels,level) {
	var _g = 0, _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var clone = Objects.clone(cum);
		var v = Reflect.field(src,field);
		clone.fields.push(field);
		if(Reflect.isObject(v) && null == Type.getClass(v) && (levels == 0 || level + 1 < levels)) Objects._flatten(v,clone,arr,levels,level + 1); else {
			clone.value = v;
			arr.push(clone);
		}
	}
}
Objects.flatten = function(src,levels) {
	if(levels == null) levels = 0;
	var arr = [];
	var _g = 0, _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		var v = Reflect.field(src,field);
		if(Reflect.isObject(v) && null == Type.getClass(v) && levels != 1) {
			var item = { fields : [field], value : null};
			Objects._flatten(v,item,arr,levels,1);
		} else arr.push({ fields : [field], value : v});
	}
	return arr;
}
Objects.compare = function(a,b) {
	var v, fields;
	if((v = Arrays.compare(fields = Reflect.fields(a),Reflect.fields(b))) != 0) return v;
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		if((v = Dynamics.compare(Reflect.field(a,field),Reflect.field(b,field))) != 0) return v;
	}
	return 0;
}
Objects.addFields = function(o,fields,values) {
	var _g1 = 0, _g = fields.length;
	while(_g1 < _g) {
		var i = _g1++;
		Objects.addField(o,fields[i],values[i]);
	}
	return o;
}
Objects.addField = function(o,field,value) {
	o[field] = value;
	return o;
}
Objects.format = function(v,param,params,culture) {
	return (Objects.formatf(param,params,culture))(v);
}
Objects.formatf = function(param,params,culture) {
	params = thx.culture.FormatParams.params(param,params,"R");
	var format = params.shift();
	switch(format) {
	case "O":
		return function(v) {
			return Std.string(v);
		};
	case "R":
		return function(v) {
			var buf = [];
			var _g = 0, _g1 = Reflect.fields(v);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				buf.push(field + ":" + Dynamics.format(Reflect.field(v,field),null,null,null,culture));
			}
			return "{" + buf.join(",") + "}";
		};
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("Unsupported number format: {0}",null,format,{ fileName : "Objects.hx", lineNumber : 242, className : "Objects", methodName : "formatf"});
			return $r;
		}(this));
	}
}
Objects.prototype = {
	__class__: Objects
}
thx.xml.TestAll = $hxClasses["thx.xml.TestAll"] = function() { }
thx.xml.TestAll.__name__ = ["thx","xml","TestAll"];
thx.xml.TestAll.addTests = function(runner) {
	runner.addCase(new thx.xml.TestXmlFormat());
	runner.addCase(new thx.xml.TestXmlWriter());
}
thx.xml.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.xml.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.xml.TestAll.prototype = {
	__class__: thx.xml.TestAll
}
thx.svg.TestLine = $hxClasses["thx.svg.TestLine"] = function() {
	thx.svg.TestAll.call(this);
};
thx.svg.TestLine.__name__ = ["thx","svg","TestLine"];
thx.svg.TestLine.__super__ = thx.svg.TestAll;
thx.svg.TestLine.prototype = $extend(thx.svg.TestAll.prototype,{
	testDefault: function() {
		var line = thx.svg.Line.pointArray();
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 12, className : "thx.svg.TestLine", methodName : "testDefault"});
		this.assertSamePath("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 13, className : "thx.svg.TestLine", methodName : "testDefault"});
		this.assertSamePath("M0,0L1,1L2,0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 14, className : "thx.svg.TestLine", methodName : "testDefault"});
	}
	,testY: function() {
		var line = thx.svg.Line.pointArray().y(function(_,_1) {
			return -1;
		});
		this.assertSamePath("M0,-1",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 21, className : "thx.svg.TestLine", methodName : "testY"});
		this.assertSamePath("M0,-1L1,-1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 22, className : "thx.svg.TestLine", methodName : "testY"});
		this.assertSamePath("M0,-1L1,-1L2,-1",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 23, className : "thx.svg.TestLine", methodName : "testY"});
	}
	,testXY: function() {
		var line = thx.svg.Line.pointObject();
		this.assertSamePath("M0,0",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestLine.hx", lineNumber : 30, className : "thx.svg.TestLine", methodName : "testXY"});
		this.assertSamePath("M0,0L1,1",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestLine.hx", lineNumber : 31, className : "thx.svg.TestLine", methodName : "testXY"});
		this.assertSamePath("M0,0L1,1L2,0",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestLine.hx", lineNumber : 32, className : "thx.svg.TestLine", methodName : "testXY"});
	}
	,testStepBefore: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepBefore);
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 39, className : "thx.svg.TestLine", methodName : "testStepBefore"});
		this.assertSamePath("M0,0V1H1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 40, className : "thx.svg.TestLine", methodName : "testStepBefore"});
		this.assertSamePath("M0,0V1H1V0H2",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 41, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	}
	,testStepAfter: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepAfter);
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 48, className : "thx.svg.TestLine", methodName : "testStepAfter"});
		this.assertSamePath("M0,0H1V1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 49, className : "thx.svg.TestLine", methodName : "testStepAfter"});
		this.assertSamePath("M0,0H1V1H2V0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 50, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	}
	,testBasis: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Basis);
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 57, className : "thx.svg.TestLine", methodName : "testBasis"});
		this.assertSamePath("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 58, className : "thx.svg.TestLine", methodName : "testBasis"});
		this.assertSamePath("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 59, className : "thx.svg.TestLine", methodName : "testBasis"});
	}
	,testBasisClosed: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.BasisClosed);
		this.assertSamePath("M0,0C0,0,0,0,0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 66, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
		this.assertSamePath("M2,2C2,2,4,4,4,4C4,4,2,2,2,2",line.shape([[0.0,0.0],[6.0,6.0]]),{ fileName : "TestLine.hx", lineNumber : 67, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
		this.assertSamePath("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 68, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	}
	,testCardinal: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Cardinal());
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 75, className : "thx.svg.TestLine", methodName : "testCardinal"});
		this.assertSamePath("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestLine.hx", lineNumber : 76, className : "thx.svg.TestLine", methodName : "testCardinal"});
		this.assertSamePath("M0,0Q4,5,5,5Q6,5,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 77, className : "thx.svg.TestLine", methodName : "testCardinal"});
	}
	,testCardinalClosed: function() {
		var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.CardinalClosed());
		this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 84, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
		this.assertSamePath("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestLine.hx", lineNumber : 85, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
		this.assertSamePath("M0,0C0,0,3.5,5,5,5S10,0,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 86, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	}
	,__class__: thx.svg.TestLine
});
thx.math.scale.TestOrdinal = $hxClasses["thx.math.scale.TestOrdinal"] = function() {
	thx.math.scale.TestAll.call(this);
};
thx.math.scale.TestOrdinal.__name__ = ["thx","math","scale","TestOrdinal"];
thx.math.scale.TestOrdinal.__super__ = thx.math.scale.TestAll;
thx.math.scale.TestOrdinal.prototype = $extend(thx.math.scale.TestAll.prototype,{
	testRange: function() {
		var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).range([0,1,2,3,4]);
		utest.Assert.same([0,1,2,3,4],thx.math.scale.TestOrdinal.data.map(scale.scale.$bind(scale)),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 15, className : "thx.math.scale.TestOrdinal", methodName : "testRange"});
	}
	,testRangeBands: function() {
		var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangeBands(0,100);
		utest.Assert.same([0.0,20.0,40.0,60.0,80.0],thx.math.scale.TestOrdinal.data.map(scale.scale.$bind(scale)),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 23, className : "thx.math.scale.TestOrdinal", methodName : "testRangeBands"});
	}
	,testRangePoints: function() {
		var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangePoints(0,100);
		utest.Assert.same([0.0,25.0,50.0,75.0,100.0],thx.math.scale.TestOrdinal.data.map(scale.scale.$bind(scale)),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 31, className : "thx.math.scale.TestOrdinal", methodName : "testRangePoints"});
	}
	,__class__: thx.math.scale.TestOrdinal
});
if(!haxe.macro) haxe.macro = {}
haxe.macro.Constant = $hxClasses["haxe.macro.Constant"] = { __ename__ : ["haxe","macro","Constant"], __constructs__ : ["CInt","CFloat","CString","CIdent","CType","CRegexp"] }
haxe.macro.Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CType = function(s) { var $x = ["CType",4,s]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",5,r,opt]; $x.__enum__ = haxe.macro.Constant; $x.toString = $estr; return $x; }
haxe.macro.Binop = $hxClasses["haxe.macro.Binop"] = { __ename__ : ["haxe","macro","Binop"], __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval"] }
haxe.macro.Binop.OpAdd = ["OpAdd",0];
haxe.macro.Binop.OpAdd.toString = $estr;
haxe.macro.Binop.OpAdd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMult = ["OpMult",1];
haxe.macro.Binop.OpMult.toString = $estr;
haxe.macro.Binop.OpMult.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpDiv = ["OpDiv",2];
haxe.macro.Binop.OpDiv.toString = $estr;
haxe.macro.Binop.OpDiv.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpSub = ["OpSub",3];
haxe.macro.Binop.OpSub.toString = $estr;
haxe.macro.Binop.OpSub.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssign = ["OpAssign",4];
haxe.macro.Binop.OpAssign.toString = $estr;
haxe.macro.Binop.OpAssign.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpEq = ["OpEq",5];
haxe.macro.Binop.OpEq.toString = $estr;
haxe.macro.Binop.OpEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpNotEq = ["OpNotEq",6];
haxe.macro.Binop.OpNotEq.toString = $estr;
haxe.macro.Binop.OpNotEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGt = ["OpGt",7];
haxe.macro.Binop.OpGt.toString = $estr;
haxe.macro.Binop.OpGt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGte = ["OpGte",8];
haxe.macro.Binop.OpGte.toString = $estr;
haxe.macro.Binop.OpGte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLt = ["OpLt",9];
haxe.macro.Binop.OpLt.toString = $estr;
haxe.macro.Binop.OpLt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLte = ["OpLte",10];
haxe.macro.Binop.OpLte.toString = $estr;
haxe.macro.Binop.OpLte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAnd = ["OpAnd",11];
haxe.macro.Binop.OpAnd.toString = $estr;
haxe.macro.Binop.OpAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpOr = ["OpOr",12];
haxe.macro.Binop.OpOr.toString = $estr;
haxe.macro.Binop.OpOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpXor = ["OpXor",13];
haxe.macro.Binop.OpXor.toString = $estr;
haxe.macro.Binop.OpXor.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe.macro.Binop.OpBoolAnd.toString = $estr;
haxe.macro.Binop.OpBoolAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolOr = ["OpBoolOr",15];
haxe.macro.Binop.OpBoolOr.toString = $estr;
haxe.macro.Binop.OpBoolOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShl = ["OpShl",16];
haxe.macro.Binop.OpShl.toString = $estr;
haxe.macro.Binop.OpShl.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShr = ["OpShr",17];
haxe.macro.Binop.OpShr.toString = $estr;
haxe.macro.Binop.OpShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpUShr = ["OpUShr",18];
haxe.macro.Binop.OpUShr.toString = $estr;
haxe.macro.Binop.OpUShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMod = ["OpMod",19];
haxe.macro.Binop.OpMod.toString = $estr;
haxe.macro.Binop.OpMod.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe.macro.Binop; $x.toString = $estr; return $x; }
haxe.macro.Binop.OpInterval = ["OpInterval",21];
haxe.macro.Binop.OpInterval.toString = $estr;
haxe.macro.Binop.OpInterval.__enum__ = haxe.macro.Binop;
haxe.macro.Unop = $hxClasses["haxe.macro.Unop"] = { __ename__ : ["haxe","macro","Unop"], __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] }
haxe.macro.Unop.OpIncrement = ["OpIncrement",0];
haxe.macro.Unop.OpIncrement.toString = $estr;
haxe.macro.Unop.OpIncrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpDecrement = ["OpDecrement",1];
haxe.macro.Unop.OpDecrement.toString = $estr;
haxe.macro.Unop.OpDecrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNot = ["OpNot",2];
haxe.macro.Unop.OpNot.toString = $estr;
haxe.macro.Unop.OpNot.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNeg = ["OpNeg",3];
haxe.macro.Unop.OpNeg.toString = $estr;
haxe.macro.Unop.OpNeg.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNegBits = ["OpNegBits",4];
haxe.macro.Unop.OpNegBits.toString = $estr;
haxe.macro.Unop.OpNegBits.__enum__ = haxe.macro.Unop;
haxe.macro.ExprDef = $hxClasses["haxe.macro.ExprDef"] = { __ename__ : ["haxe","macro","ExprDef"], __constructs__ : ["EConst","EArray","EBinop","EField","EType","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType"] }
haxe.macro.ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EType = function(e,field) { var $x = ["EType",4,e,field]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",5,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",6,fields]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",7,values]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECall = function(e,params) { var $x = ["ECall",8,e,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ENew = function(t,params) { var $x = ["ENew",9,t,params]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",10,op,postFix,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EVars = function(vars) { var $x = ["EVars",11,vars]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFunction = function(name,f) { var $x = ["EFunction",12,name,f]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBlock = function(exprs) { var $x = ["EBlock",13,exprs]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EFor = function(it,expr) { var $x = ["EFor",14,it,expr]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EIn = function(e1,e2) { var $x = ["EIn",15,e1,e2]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",16,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",17,econd,e,normalWhile]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",18,e,cases,edef]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETry = function(e,catches) { var $x = ["ETry",19,e,catches]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EReturn = function(e) { var $x = ["EReturn",20,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EBreak = ["EBreak",21];
haxe.macro.ExprDef.EBreak.toString = $estr;
haxe.macro.ExprDef.EBreak.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EContinue = ["EContinue",22];
haxe.macro.ExprDef.EContinue.toString = $estr;
haxe.macro.ExprDef.EContinue.__enum__ = haxe.macro.ExprDef;
haxe.macro.ExprDef.EUntyped = function(e) { var $x = ["EUntyped",23,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EThrow = function(e) { var $x = ["EThrow",24,e]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECast = function(e,t) { var $x = ["ECast",25,e,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",26,e,isCall]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",27,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",28,econd,eif,eelse]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",29,e,t]; $x.__enum__ = haxe.macro.ExprDef; $x.toString = $estr; return $x; }
haxe.macro.ComplexType = $hxClasses["haxe.macro.ComplexType"] = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] }
haxe.macro.ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe.macro.ComplexType; $x.toString = $estr; return $x; }
haxe.macro.TypeParam = $hxClasses["haxe.macro.TypeParam"] = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPExpr"] }
haxe.macro.TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe.macro.TypeParam; $x.toString = $estr; return $x; }
haxe.macro.Access = $hxClasses["haxe.macro.Access"] = { __ename__ : ["haxe","macro","Access"], __constructs__ : ["APublic","APrivate","AStatic","AOverride","ADynamic","AInline"] }
haxe.macro.Access.APublic = ["APublic",0];
haxe.macro.Access.APublic.toString = $estr;
haxe.macro.Access.APublic.__enum__ = haxe.macro.Access;
haxe.macro.Access.APrivate = ["APrivate",1];
haxe.macro.Access.APrivate.toString = $estr;
haxe.macro.Access.APrivate.__enum__ = haxe.macro.Access;
haxe.macro.Access.AStatic = ["AStatic",2];
haxe.macro.Access.AStatic.toString = $estr;
haxe.macro.Access.AStatic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AOverride = ["AOverride",3];
haxe.macro.Access.AOverride.toString = $estr;
haxe.macro.Access.AOverride.__enum__ = haxe.macro.Access;
haxe.macro.Access.ADynamic = ["ADynamic",4];
haxe.macro.Access.ADynamic.toString = $estr;
haxe.macro.Access.ADynamic.__enum__ = haxe.macro.Access;
haxe.macro.Access.AInline = ["AInline",5];
haxe.macro.Access.AInline.toString = $estr;
haxe.macro.Access.AInline.__enum__ = haxe.macro.Access;
haxe.macro.FieldType = $hxClasses["haxe.macro.FieldType"] = { __ename__ : ["haxe","macro","FieldType"], __constructs__ : ["FVar","FFun","FProp"] }
haxe.macro.FieldType.FVar = function(t,e) { var $x = ["FVar",0,t,e]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FFun = function(f) { var $x = ["FFun",1,f]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.FieldType.FProp = function(get,set,t,e) { var $x = ["FProp",2,get,set,t,e]; $x.__enum__ = haxe.macro.FieldType; $x.toString = $estr; return $x; }
haxe.macro.TypeDefKind = $hxClasses["haxe.macro.TypeDefKind"] = { __ename__ : ["haxe","macro","TypeDefKind"], __constructs__ : ["TDEnum","TDStructure","TDClass"] }
haxe.macro.TypeDefKind.TDEnum = ["TDEnum",0];
haxe.macro.TypeDefKind.TDEnum.toString = $estr;
haxe.macro.TypeDefKind.TDEnum.__enum__ = haxe.macro.TypeDefKind;
haxe.macro.TypeDefKind.TDStructure = ["TDStructure",1];
haxe.macro.TypeDefKind.TDStructure.toString = $estr;
haxe.macro.TypeDefKind.TDStructure.__enum__ = haxe.macro.TypeDefKind;
haxe.macro.TypeDefKind.TDClass = function(extend,implement,isInterface) { var $x = ["TDClass",2,extend,implement,isInterface]; $x.__enum__ = haxe.macro.TypeDefKind; $x.toString = $estr; return $x; }
haxe.macro.Error = $hxClasses["haxe.macro.Error"] = function(m,p) {
	this.message = m;
	this.pos = p;
};
haxe.macro.Error.__name__ = ["haxe","macro","Error"];
haxe.macro.Error.prototype = {
	message: null
	,pos: null
	,__class__: haxe.macro.Error
}
thx.collection.IntHashList = $hxClasses["thx.collection.IntHashList"] = function() {
	this.length = 0;
	this.__keys = [];
	this.__hash = new IntHash();
};
thx.collection.IntHashList.__name__ = ["thx","collection","IntHashList"];
thx.collection.IntHashList.prototype = {
	length: null
	,set: function(key,value) {
		if(!this.__hash.exists(key)) {
			this.__keys.push(key);
			this.length++;
		}
		this.__hash.set(key,value);
	}
	,get: function(key) {
		return this.__hash.get(key);
	}
	,getAt: function(index) {
		return this.__hash.get(this.__keys[index]);
	}
	,exists: function(key) {
		return this.__hash.exists(key);
	}
	,remove: function(key) {
		var item = this.__hash.get(key);
		if(item == null) return null;
		this.__hash.remove(key);
		this.__keys.remove(key);
		this.length--;
		return item;
	}
	,removeAt: function(index) {
		if(index < 0 || index >= this.length) return null;
		var key = this.__keys[index];
		var item = this.__hash.get(key);
		this.__hash.remove(key);
		this.__keys.remove(key);
		this.length--;
		return item;
	}
	,keys: function() {
		return this.__keys.iterator();
	}
	,iterator: function() {
		return this.array().iterator();
	}
	,clear: function() {
		this.__hash = new IntHash();
		this.__keys = [];
		this.length = 0;
	}
	,array: function() {
		var values = [];
		var _g = 0, _g1 = this.__keys;
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			values.push(this.__hash.get(k));
		}
		return values;
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__keys: null
	,__hash: null
	,__class__: thx.collection.IntHashList
}
thx.data.ValueHandler = $hxClasses["thx.data.ValueHandler"] = function() {
};
thx.data.ValueHandler.__name__ = ["thx","data","ValueHandler"];
thx.data.ValueHandler.__interfaces__ = [thx.data.IDataHandler];
thx.data.ValueHandler.prototype = {
	value: null
	,_stack: null
	,_names: null
	,start: function() {
		this._stack = [];
		this._names = [];
	}
	,end: function() {
		this.value = this._stack.pop();
	}
	,startObject: function() {
		this._stack.push({ });
	}
	,endObject: function() {
	}
	,startField: function(name) {
		this._names.push(name);
	}
	,endField: function() {
		var value = this._stack.pop();
		var last = Arrays.last(this._stack);
		last[this._names.pop()] = value;
	}
	,startArray: function() {
		this._stack.push([]);
	}
	,endArray: function() {
	}
	,startItem: function() {
	}
	,endItem: function() {
		var value = this._stack.pop();
		var last = Arrays.last(this._stack);
		last.push(value);
	}
	,date: function(d) {
		this._stack.push(d);
	}
	,string: function(s) {
		this._stack.push(s);
	}
	,'int': function(i) {
		this._stack.push(i);
	}
	,'float': function(f) {
		this._stack.push(f);
	}
	,'null': function() {
		this._stack.push(null);
	}
	,bool: function(b) {
		this._stack.push(b);
	}
	,comment: function(s) {
	}
	,__class__: thx.data.ValueHandler
}
thx.svg.TestChord = $hxClasses["thx.svg.TestChord"] = function() {
};
thx.svg.TestChord.__name__ = ["thx","svg","TestChord"];
thx.svg.TestChord.prototype = {
	__class__: thx.svg.TestChord
}
thx.text.TestInflections = $hxClasses["thx.text.TestInflections"] = function() {
};
thx.text.TestInflections.__name__ = ["thx","text","TestInflections"];
thx.text.TestInflections.addTests = function(runner) {
	runner.addCase(new thx.text.TestInflections());
}
thx.text.TestInflections.main = function() {
	var runner = new utest.Runner();
	thx.text.TestInflections.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.text.TestInflections.prototype = {
	testUncountable: function() {
		utest.Assert.equals("information",thx.text.Inflections.pluralize("information"),null,{ fileName : "TestInflections.hx", lineNumber : 16, className : "thx.text.TestInflections", methodName : "testUncountable"});
		utest.Assert.equals("news",thx.text.Inflections.pluralize("news"),null,{ fileName : "TestInflections.hx", lineNumber : 17, className : "thx.text.TestInflections", methodName : "testUncountable"});
	}
	,testPluralize: function() {
		utest.Assert.equals("days",thx.text.Inflections.pluralize("day"),null,{ fileName : "TestInflections.hx", lineNumber : 22, className : "thx.text.TestInflections", methodName : "testPluralize"});
		utest.Assert.equals("women",thx.text.Inflections.pluralize("woman"),null,{ fileName : "TestInflections.hx", lineNumber : 23, className : "thx.text.TestInflections", methodName : "testPluralize"});
		utest.Assert.equals("autobuses",thx.text.Inflections.pluralize("autobus"),null,{ fileName : "TestInflections.hx", lineNumber : 24, className : "thx.text.TestInflections", methodName : "testPluralize"});
		utest.Assert.equals("quizzes",thx.text.Inflections.pluralize("quiz"),null,{ fileName : "TestInflections.hx", lineNumber : 25, className : "thx.text.TestInflections", methodName : "testPluralize"});
	}
	,testSingularize: function() {
		utest.Assert.equals("day",thx.text.Inflections.singularize("days"),null,{ fileName : "TestInflections.hx", lineNumber : 30, className : "thx.text.TestInflections", methodName : "testSingularize"});
		utest.Assert.equals("woman",thx.text.Inflections.singularize("women"),null,{ fileName : "TestInflections.hx", lineNumber : 31, className : "thx.text.TestInflections", methodName : "testSingularize"});
		utest.Assert.equals("autobus",thx.text.Inflections.singularize("autobuses"),null,{ fileName : "TestInflections.hx", lineNumber : 32, className : "thx.text.TestInflections", methodName : "testSingularize"});
		utest.Assert.equals("quiz",thx.text.Inflections.singularize("quizzes"),null,{ fileName : "TestInflections.hx", lineNumber : 33, className : "thx.text.TestInflections", methodName : "testSingularize"});
	}
	,__class__: thx.text.TestInflections
}
thx.text.TestAll = $hxClasses["thx.text.TestAll"] = function() {
};
thx.text.TestAll.__name__ = ["thx","text","TestAll"];
thx.text.TestAll.addTests = function(runner) {
	thx.text.TestPaths.addTests(runner);
	thx.text.TestInflections.addTests(runner);
}
thx.text.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.text.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.text.TestAll.prototype = {
	__class__: thx.text.TestAll
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
thx.error.NotImplemented = $hxClasses["thx.error.NotImplemented"] = function(posInfo) {
	thx.error.Error.call(this,"method {0}.{1}() needs to be implemented",[posInfo.className,posInfo.methodName],posInfo,{ fileName : "NotImplemented.hx", lineNumber : 13, className : "thx.error.NotImplemented", methodName : "new"});
};
thx.error.NotImplemented.__name__ = ["thx","error","NotImplemented"];
thx.error.NotImplemented.__super__ = thx.error.Error;
thx.error.NotImplemented.prototype = $extend(thx.error.Error.prototype,{
	__class__: thx.error.NotImplemented
});
thx.validation.UrlValidator = $hxClasses["thx.validation.UrlValidator"] = function() {
};
thx.validation.UrlValidator.__name__ = ["thx","validation","UrlValidator"];
thx.validation.UrlValidator.__super__ = thx.validation.Validator;
thx.validation.UrlValidator.prototype = $extend(thx.validation.Validator.prototype,{
	validate: function(value) {
		if(!thx.validation.UrlValidator._reUrl.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid url '{0}'",[value],null)]); else return thx.util.Result.Ok;
	}
	,__class__: thx.validation.UrlValidator
});
thx.validation.CustomValidator = $hxClasses["thx.validation.CustomValidator"] = function() {
	this.validators = [];
};
thx.validation.CustomValidator.__name__ = ["thx","validation","CustomValidator"];
thx.validation.CustomValidator.__super__ = thx.validation.Validator;
thx.validation.CustomValidator.prototype = $extend(thx.validation.Validator.prototype,{
	validators: null
	,validate: function(value) {
		var _g = 0, _g1 = this.validators;
		while(_g < _g1.length) {
			var validator = _g1[_g];
			++_g;
			var message = validator(value);
			if(null != message) return thx.util.Result.Failure([message]);
		}
		return thx.util.Result.Ok;
	}
	,add: function(handler) {
		this.validators.push(handler);
	}
	,clear: function() {
		this.validators = [];
	}
	,__class__: thx.validation.CustomValidator
});
thx.validation.TestEmail = $hxClasses["thx.validation.TestEmail"] = function() {
};
thx.validation.TestEmail.__name__ = ["thx","validation","TestEmail"];
thx.validation.TestEmail.__super__ = thx.validation.TestAll;
thx.validation.TestEmail.prototype = $extend(thx.validation.TestAll.prototype,{
	testValidEmails: function() {
		var validator = new thx.validation.EmailValidator(false);
		var emails = ["\"test\\\\blah\"@example.com","\"test\\\"blah\"@example.com","customer/department@example.com","$A12345@example.com","!def!xyz%abc@example.com","_Yosemite.Sam@example.com","~@example.com","\"Austin@Powers\"@example.com","Ima.Fool@example.com","\"Ima.Fool\"@example.com"];
		var _g = 0;
		while(_g < emails.length) {
			var email = emails[_g];
			++_g;
			this.assertValidation(validator.validate(email),true,email + " should be valid",{ fileName : "TestEmail.hx", lineNumber : 12, className : "thx.validation.TestEmail", methodName : "testValidEmails"});
		}
	}
	,testInvalidEmails: function() {
		var validator = new thx.validation.EmailValidator(false);
		var emails = ["NotAnEmail","@NotAnEmail","\"test\rblah\"@example.com","\"test\"blah\"@example.com",".wooly@example.com","wo..oly@example.com","pootietang.@example.com",".@example.com","Ima Fool@example.com"];
		var _g = 0;
		while(_g < emails.length) {
			var email = emails[_g];
			++_g;
			this.assertValidation(validator.validate(email),false,email + " should NOT be valid",{ fileName : "TestEmail.hx", lineNumber : 20, className : "thx.validation.TestEmail", methodName : "testInvalidEmails"});
		}
	}
	,testTopLevelDomain: function() {
		var validator = new thx.validation.EmailValidator(true);
		this.assertValidation(validator.validate("a@b.fake"),false,null,{ fileName : "TestEmail.hx", lineNumber : 26, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
		var validator1 = new thx.validation.EmailValidator(false);
		this.assertValidation(validator1.validate("a@b.fake"),true,null,{ fileName : "TestEmail.hx", lineNumber : 28, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
	}
	,__class__: thx.validation.TestEmail
});
thx.html.XHtmlFormat = $hxClasses["thx.html.XHtmlFormat"] = function(autoformat,indent,newline) {
	thx.xml.XmlFormat.call(this,autoformat,indent,newline);
};
thx.html.XHtmlFormat.__name__ = ["thx","html","XHtmlFormat"];
thx.html.XHtmlFormat.__super__ = thx.xml.XmlFormat;
thx.html.XHtmlFormat.prototype = $extend(thx.xml.XmlFormat.prototype,{
	createDocumentFormat: function() {
		var document;
		if(this.autoformat) {
			var doc = new thx.html.HtmlDocumentFormat();
			doc.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsCData;
			if(null != this.indent) doc.indent = this.indent;
			if(null != this.newline) doc.newline = this.newline;
			if(null != this.wrapColumns) doc.wrapColumns = this.wrapColumns;
			document = doc;
		} else document = new thx.xml.DocumentFormat();
		if(null != this.stripComments) document.stripComments = this.stripComments;
		return document;
	}
	,__class__: thx.html.XHtmlFormat
});
thx.html.HtmlFormat = $hxClasses["thx.html.HtmlFormat"] = function() {
	thx.html.XHtmlFormat.call(this);
	this.useCloseSelf = false;
	this.quotesRemoval = false;
};
thx.html.HtmlFormat.__name__ = ["thx","html","HtmlFormat"];
thx.html.HtmlFormat.__super__ = thx.html.XHtmlFormat;
thx.html.HtmlFormat.prototype = $extend(thx.html.XHtmlFormat.prototype,{
	useCloseSelf: null
	,quotesRemoval: null
	,specialElementContentFormat: null
	,createAttributeFormat: function() {
		if(this.quotesRemoval) return new thx.html.UnquotedHtmlAttributeFormat(); else return new thx.html.HtmlAttributeFormat();
	}
	,createNodeFormat: function() {
		if(this.useCloseSelf) return new thx.html.CloseSelfHtmlNodeFormat(); else return new thx.html.HtmlNodeFormat();
	}
	,createDocumentFormat: function() {
		var doc = thx.html.XHtmlFormat.prototype.createDocumentFormat.call(this);
		if(null == this.specialElementContentFormat) return doc;
		var html = Std["is"](doc,thx.html.HtmlDocumentFormat)?doc:null;
		if(null == html) return doc;
		html.specialElementContentFormat = this.specialElementContentFormat;
		return html;
	}
	,__class__: thx.html.HtmlFormat
});
thx.html.TestHtmlParser = $hxClasses["thx.html.TestHtmlParser"] = function() {
};
thx.html.TestHtmlParser.__name__ = ["thx","html","TestHtmlParser"];
thx.html.TestHtmlParser.assertHasElement = function(xml,element,pos) {
	var parts = element.split(">");
	var node = xml;
	while(null != node && parts.length > 0) {
		var it = node.elementsNamed(parts.shift());
		if(it.hasNext()) node = it.next(); else node = null;
	}
	utest.Assert.isTrue(node != null,null,pos);
}
thx.html.TestHtmlParser.prototype = {
	testMain: function() {
		var xml = thx.html.Html.toXml("<?xml version=\"1.0\"?><!doctype html><html><head><title></title></head><body></body></html>");
		thx.html.TestHtmlParser.assertHasElement(xml,"html",{ fileName : "TestHtmlParser.hx", lineNumber : 22, className : "thx.html.TestHtmlParser", methodName : "testMain"});
		thx.html.TestHtmlParser.assertHasElement(xml,"html>head",{ fileName : "TestHtmlParser.hx", lineNumber : 23, className : "thx.html.TestHtmlParser", methodName : "testMain"});
		thx.html.TestHtmlParser.assertHasElement(xml,"html>head>title",{ fileName : "TestHtmlParser.hx", lineNumber : 24, className : "thx.html.TestHtmlParser", methodName : "testMain"});
		thx.html.TestHtmlParser.assertHasElement(xml,"html>body",{ fileName : "TestHtmlParser.hx", lineNumber : 25, className : "thx.html.TestHtmlParser", methodName : "testMain"});
		var it = xml.iterator();
		utest.Assert.equals(Xml.Prolog,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 27, className : "thx.html.TestHtmlParser", methodName : "testMain"});
		utest.Assert.equals(Xml.DocType,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 28, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	}
	,__class__: thx.html.TestHtmlParser
}
thx.color.Grey = $hxClasses["thx.color.Grey"] = function(value) {
	this.grey = Floats.normalize(value);
	var c = Ints.interpolate(this.grey,0,255,null);
	thx.color.Rgb.call(this,c,c,c);
};
thx.color.Grey.__name__ = ["thx","color","Grey"];
thx.color.Grey.toGrey = function(rgb,luminance) {
	if(null == luminance) luminance = thx.color.PerceivedLuminance.Perceived;
	switch( (luminance)[1] ) {
	case 0:
		return new thx.color.Grey(rgb.red / 255 * .2126 + rgb.green / 255 * .7152 + rgb.blue / 255 * .0722);
	case 1:
		return new thx.color.Grey(rgb.red / 255 * .299 + rgb.green / 255 * .587 + rgb.blue / 255 * .114);
	case 2:
		return new thx.color.Grey(Math.sqrt(0.241 * Math.pow(rgb.red / 255,2) + 0.691 * Math.pow(rgb.green / 255,2) + 0.068 * Math.pow(rgb.blue / 255,2)));
	}
}
thx.color.Grey.equals = function(a,b) {
	return a.grey == b.grey;
}
thx.color.Grey.darker = function(color,t,equation) {
	return new thx.color.Grey(Floats.interpolate(t,color.grey,0,equation));
}
thx.color.Grey.lighter = function(color,t,equation) {
	return new thx.color.Grey(Floats.interpolate(t,color.grey,1,equation));
}
thx.color.Grey.interpolate = function(a,b,t,equation) {
	return new thx.color.Grey(Floats.interpolate(t,a.grey,b.grey,equation));
}
thx.color.Grey.__super__ = thx.color.Rgb;
thx.color.Grey.prototype = $extend(thx.color.Rgb.prototype,{
	grey: null
	,__class__: thx.color.Grey
});
thx.color.PerceivedLuminance = $hxClasses["thx.color.PerceivedLuminance"] = { __ename__ : ["thx","color","PerceivedLuminance"], __constructs__ : ["Standard","Perceived","PerceivedAccurate"] }
thx.color.PerceivedLuminance.Standard = ["Standard",0];
thx.color.PerceivedLuminance.Standard.toString = $estr;
thx.color.PerceivedLuminance.Standard.__enum__ = thx.color.PerceivedLuminance;
thx.color.PerceivedLuminance.Perceived = ["Perceived",1];
thx.color.PerceivedLuminance.Perceived.toString = $estr;
thx.color.PerceivedLuminance.Perceived.__enum__ = thx.color.PerceivedLuminance;
thx.color.PerceivedLuminance.PerceivedAccurate = ["PerceivedAccurate",2];
thx.color.PerceivedLuminance.PerceivedAccurate.toString = $estr;
thx.color.PerceivedLuminance.PerceivedAccurate.__enum__ = thx.color.PerceivedLuminance;
thx.data.TestValueEncoder = $hxClasses["thx.data.TestValueEncoder"] = function() {
};
thx.data.TestValueEncoder.__name__ = ["thx","data","TestValueEncoder"];
thx.data.TestValueEncoder.prototype = {
	testEncodeSequence: function() {
		var handler = new thx.data.CustomerEncoder();
		var encoder = new thx.data.ValueEncoder(handler);
		encoder.encode({ name : "thx", values : [Date.fromString("2010-01-01"),2,"a",{ a : 0, b : true}]});
		utest.Assert.same(["start","startObject","startField:name","string:thx","endField","startField:values","startArray","startItem","date:" + Date.fromString("2010-01-01").getTime(),"endItem","startItem","int:2","endItem","startItem","string:a","endItem","startItem","startObject","startField:a","int:0","endField","startField:b","bool:true","endField","endObject","endItem","endArray","endField","endObject","end"],handler.result,null,null,{ fileName : "TestValueEncoder.hx", lineNumber : 14, className : "thx.data.TestValueEncoder", methodName : "testEncodeSequence"});
	}
	,__class__: thx.data.TestValueEncoder
}
thx.data.CustomerEncoder = $hxClasses["thx.data.CustomerEncoder"] = function() {
};
thx.data.CustomerEncoder.__name__ = ["thx","data","CustomerEncoder"];
thx.data.CustomerEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.data.CustomerEncoder.prototype = {
	result: null
	,start: function() {
		this.result = ["start"];
	}
	,end: function() {
		this.result.push("end");
	}
	,startObject: function() {
		this.result.push("startObject");
	}
	,startField: function(name) {
		this.result.push("startField:" + name);
	}
	,endField: function() {
		this.result.push("endField");
	}
	,endObject: function() {
		this.result.push("endObject");
	}
	,startArray: function() {
		this.result.push("startArray");
	}
	,startItem: function() {
		this.result.push("startItem");
	}
	,endItem: function() {
		this.result.push("endItem");
	}
	,endArray: function() {
		this.result.push("endArray");
	}
	,date: function(d) {
		this.result.push("date:" + d.getTime());
	}
	,string: function(s) {
		this.result.push("string:" + s);
	}
	,'int': function(i) {
		this.result.push("int:" + i);
	}
	,'float': function(f) {
		this.result.push("float:" + f);
	}
	,'null': function() {
		this.result.push("null");
	}
	,bool: function(b) {
		this.result.push("bool:" + b);
	}
	,comment: function(s) {
		this.result.push("comment:" + s);
	}
	,__class__: thx.data.CustomerEncoder
}
thx.validation.OptionValidator = $hxClasses["thx.validation.OptionValidator"] = function(options,it,showOptionsInFailureMessage) {
	if(showOptionsInFailureMessage == null) showOptionsInFailureMessage = true;
	this.options = [];
	if(null != options) {
		var $it0 = options.iterator();
		while( $it0.hasNext() ) {
			var o = $it0.next();
			this.options.push(o);
		}
	}
	if(null != it) {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var v = $it1.next();
			this.options.push({ value : v, label : Std.string(v)});
		}
	}
	this.showOptionsInFailureMessage = showOptionsInFailureMessage;
};
thx.validation.OptionValidator.__name__ = ["thx","validation","OptionValidator"];
thx.validation.OptionValidator.__super__ = thx.validation.Validator;
thx.validation.OptionValidator.prototype = $extend(thx.validation.Validator.prototype,{
	options: null
	,showOptionsInFailureMessage: null
	,valueExists: function(v) {
		return Lambda.exists(this.options,function(a) {
			return a.value == v;
		});
	}
	,labels: function() {
		var arr = [];
		var _g = 0, _g1 = this.options;
		while(_g < _g1.length) {
			var option = _g1[_g];
			++_g;
			arr.push(option.label);
		}
		return arr;
	}
	,descriptions: function() {
		var arr = [];
		var _g = 0, _g1 = this.options;
		while(_g < _g1.length) {
			var option = _g1[_g];
			++_g;
			if(option.label != option.value) arr.push(option.label + " (" + option.value + ")"); else arr.push(option.label);
		}
		return arr;
	}
	,validate: function(value) {
		if(this.valueExists(value)) return thx.util.Result.Ok; else if(this.showOptionsInFailureMessage) return thx.util.Result.Failure([new thx.util.Message("value must be one of the following options: {0}",[this.descriptions()],null)]); else return thx.util.Result.Failure([new thx.util.Message("value is not a valid option",[],null)]);
	}
	,__class__: thx.validation.OptionValidator
});
thx.svg.PathGeoJson = $hxClasses["thx.svg.PathGeoJson"] = function() {
	this.setPointRadius(4.5);
	this.setProjection(new thx.geo.AlbersUsa());
	this.pathTypes = new thx.svg.PathTypes(this);
	this.centroidTypes = new thx.svg.CentroidTypes(this);
	this.areaTypes = new thx.svg.AreaTypes(this);
};
thx.svg.PathGeoJson.__name__ = ["thx","svg","PathGeoJson"];
thx.svg.PathGeoJson.circle = function(r) {
	return "m0," + r + "a" + r + "," + r + " 0 1,1 0," + -2 * r + "a" + r + "," + r + " 0 1,1 0," + 2 * r + "z";
}
thx.svg.PathGeoJson.bounds = function(d) {
	var left = Math.POSITIVE_INFINITY, bottom = Math.POSITIVE_INFINITY, right = Math.NEGATIVE_INFINITY, top = Math.NEGATIVE_INFINITY;
	thx.svg.PathGeoJson.applyBounds(d,function(x,y) {
		if(x < left) left = x;
		if(x > right) right = x;
		if(y < bottom) bottom = y;
		if(y > top) top = y;
	});
	return [[left,bottom],[right,top]];
}
thx.svg.PathGeoJson.applyBounds = function(d,f) {
	switch(d.type) {
	case "Feature":
		thx.svg.PathGeoJson.applyBounds(d.geometry,f);
		break;
	case "FeatureCollection":
		var _g = 0, _g1 = d.features;
		while(_g < _g1.length) {
			var feature = _g1[_g];
			++_g;
			thx.svg.PathGeoJson.applyBounds(feature.geometry,f);
		}
		break;
	case "LineString":case "MultiPoint":
		var coordinates = d.coordinates;
		var _g = 0;
		while(_g < coordinates.length) {
			var coords = coordinates[_g];
			++_g;
			f(coords[0],coords[1]);
		}
		break;
	case "MultiLineString":
		var coordinates = d.coordinates;
		var _g = 0;
		while(_g < coordinates.length) {
			var coords = coordinates[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < coords.length) {
				var scoords = coords[_g1];
				++_g1;
				f(scoords[0],scoords[1]);
			}
		}
		break;
	case "MultiPolygon":
		var coordinates = d.coordinates;
		var _g = 0;
		while(_g < coordinates.length) {
			var coords = coordinates[_g];
			++_g;
			var _g1 = 0, _g2 = coords[0];
			while(_g1 < _g2.length) {
				var scoords = _g2[_g1];
				++_g1;
				f(scoords[0],scoords[1]);
			}
		}
		break;
	case "Point":
		var coordinates = d.coordinates;
		f(coordinates[0],coordinates[1]);
		break;
	case "Polygon":
		var coordinates = d.coordinates;
		var _g = 0, _g1 = coordinates[0];
		while(_g < _g1.length) {
			var coords = _g1[_g];
			++_g;
			f(coords[0],coords[1]);
		}
		break;
	default:
		throw new thx.error.Error("invalid geomtry type '{0}'",null,d.type,{ fileName : "PathGeoJson.hx", lineNumber : 113, className : "thx.svg.PathGeoJson", methodName : "applyBounds"});
	}
}
thx.svg.PathGeoJson.prototype = {
	pointRadius: null
	,projection: null
	,pathCircle: null
	,pathTypes: null
	,centroidTypes: null
	,areaTypes: null
	,path: function(d,_) {
		return this.pathTypes.path(d);
	}
	,centroid: function(d,_) {
		return this.centroidTypes.centroid(d);
	}
	,area: function(d,_) {
		return this.areaTypes.area(d);
	}
	,setPointRadius: function(r) {
		this.pointRadius = r;
		this.pathCircle = thx.svg.PathGeoJson.circle(r);
		return r;
	}
	,setProjection: function(projection) {
		return this.projection = projection;
	}
	,__class__: thx.svg.PathGeoJson
	,__properties__: {set_projection:"setProjection",set_pointRadius:"setPointRadius"}
}
thx.svg.PathTypes = $hxClasses["thx.svg.PathTypes"] = function(geo) {
	this.geo = geo;
};
thx.svg.PathTypes.__name__ = ["thx","svg","PathTypes"];
thx.svg.PathTypes.prototype = {
	geo: null
	,path: function(geo) {
		var field = Reflect.field(this,Strings.lcfirst(geo.type));
		if(null == field) return "";
		return field.apply(this,[geo]);
	}
	,featureCollection: function(f) {
		var p = [], features = f.features;
		var _g1 = 0, _g = features.length;
		while(_g1 < _g) {
			var i = _g1++;
			p.push(this.path(features[i].geometry));
		}
		return p.join("");
	}
	,feature: function(f) {
		return this.path(f.geometry);
	}
	,point: function(o) {
		return "M" + this.project(o.coordinates) + this.geo.pathCircle;
	}
	,multiPoint: function(o) {
		var p = [], coordinates = o.coordinates;
		var _g1 = 0, _g = coordinates.length;
		while(_g1 < _g) {
			var i = _g1++;
			p.push("M" + this.project(coordinates[i]) + this.geo.pathCircle);
		}
		return p.join("");
	}
	,lineString: function(o) {
		var p = ["M"], coordinates = o.coordinates;
		var _g1 = 0, _g = coordinates.length;
		while(_g1 < _g) {
			var i = _g1++;
			p.push(this.project(coordinates[i]));
		}
		return p.join("L");
	}
	,multiLineString: function(o) {
		var p = [], coords = o.coordinates;
		var _g = 0;
		while(_g < coords.length) {
			var coordinates = coords[_g];
			++_g;
			p.push("M");
			var _g2 = 0, _g1 = coordinates.length;
			while(_g2 < _g1) {
				var i = _g2++;
				p.push(this.project(coordinates[i]));
				p.push("L");
			}
			p.pop();
		}
		return p.join("");
	}
	,polygon: function(o) {
		var p = [], coords = o.coordinates;
		var _g = 0;
		while(_g < coords.length) {
			var coordinates = coords[_g];
			++_g;
			p.push("M");
			var _g2 = 0, _g1 = coordinates.length;
			while(_g2 < _g1) {
				var j = _g2++;
				p.push(this.project(coordinates[j]));
				p.push("L");
			}
			p[p.length - 1] = "Z";
		}
		return p.join("");
	}
	,multiPolygon: function(o) {
		var p = [], coords = o.coordinates;
		var _g = 0;
		while(_g < coords.length) {
			var coordinates = coords[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < coordinates.length) {
				var subcoordinates = coordinates[_g1];
				++_g1;
				p.push("M");
				var _g2 = 0;
				while(_g2 < subcoordinates.length) {
					var scoords = subcoordinates[_g2];
					++_g2;
					p.push(this.project(scoords));
					p.push("L");
				}
				p[p.length - 1] = "Z";
			}
		}
		return p.join("");
	}
	,geometryCollection: function(o) {
		var p = [];
		var _g = 0, _g1 = o.geometries;
		while(_g < _g1.length) {
			var geometry = _g1[_g];
			++_g;
			p.push(this.path(geometry));
		}
		return p.join("");
	}
	,project: function(coords) {
		return this.geo.projection.project(coords).join(",");
	}
	,__class__: thx.svg.PathTypes
}
thx.svg.AreaTypes = $hxClasses["thx.svg.AreaTypes"] = function(geo) {
	this.geo = geo;
};
thx.svg.AreaTypes.__name__ = ["thx","svg","AreaTypes"];
thx.svg.AreaTypes.prototype = {
	geo: null
	,area: function(geo) {
		var field = Reflect.field(this,Strings.lcfirst(geo.type));
		if(null == field) return 0.0;
		return field.apply(this,[geo]);
	}
	,featureCollection: function(f) {
		var a = 0.0;
		var _g = 0, _g1 = f.features;
		while(_g < _g1.length) {
			var feat = _g1[_g];
			++_g;
			a += this.area(feat.geometry);
		}
		return a;
	}
	,feature: function(f) {
		return this.area(f.geometry);
	}
	,point: function(o) {
		return 0.0;
	}
	,multiPoint: function(o) {
		return 0.0;
	}
	,lineString: function(o) {
		return 0.0;
	}
	,multiLineString: function(o) {
		return 0.0;
	}
	,polygon: function(o) {
		return this.polygonArea(o.coordinates);
	}
	,multiPolygon: function(o) {
		var sum = 0.0, coords = o.coordinates;
		var _g = 0;
		while(_g < coords.length) {
			var coordinates = coords[_g];
			++_g;
			sum += this.polygonArea(coordinates);
		}
		return sum;
	}
	,geometryCollection: function(o) {
		var sum = 0.0;
		var _g = 0, _g1 = o.geometries;
		while(_g < _g1.length) {
			var geometry = _g1[_g];
			++_g;
			sum += this.area(geometry);
		}
		return sum;
	}
	,polygonArea: function(coords) {
		var sum = this.parea(coords[0]);
		var _g1 = 1, _g = coords.length;
		while(_g1 < _g) {
			var i = _g1++;
			sum -= this.parea(coords[i]);
		}
		return sum;
	}
	,parea: function(coords) {
		return Math.abs(new thx.geom.Polygon(coords.map(this.project.$bind(this))).area());
	}
	,project: function(d,_) {
		return this.geo.projection.project(d);
	}
	,__class__: thx.svg.AreaTypes
}
thx.svg.CentroidTypes = $hxClasses["thx.svg.CentroidTypes"] = function(geo) {
	this.geo = geo;
};
thx.svg.CentroidTypes.__name__ = ["thx","svg","CentroidTypes"];
thx.svg.CentroidTypes.prototype = {
	geo: null
	,centroid: function(geo) {
		var field = Reflect.field(this,Strings.lcfirst(geo.type));
		if(null == field) return [0.0,0.0];
		return field.apply(this,[geo]);
	}
	,point: function(o) {
		return this.project(o.coordinates);
	}
	,feature: function(f) {
		return this.centroid(f.geometry);
	}
	,polygon: function(o) {
		var centroid = this.polygonCentroid(o.coordinates);
		return [centroid[0] / centroid[2],centroid[1] / centroid[2]];
	}
	,multiPolygon: function(o) {
		var area = 0.0, x = 0.0, y = 0.0, z = 0.0, centroid, coords = o.coordinates;
		var _g = 0;
		while(_g < coords.length) {
			var coordinates = coords[_g];
			++_g;
			centroid = this.polygonCentroid(coordinates);
			x += centroid[0];
			y += centroid[1];
			z += centroid[2];
		}
		return [x / z,y / z];
	}
	,polygonCentroid: function(coordinates) {
		var polygon = new thx.geom.Polygon(coordinates[0].map(this.project.$bind(this))), centroid = polygon.centroid(1), x = centroid[0], y = centroid[1], z = Math.abs(polygon.area());
		var _g1 = 1, _g = coordinates.length;
		while(_g1 < _g) {
			var i = _g1++;
			polygon = new thx.geom.Polygon(coordinates[i].map(this.project.$bind(this)));
			centroid = polygon.centroid(1);
			x -= centroid[0];
			y -= centroid[1];
			z -= Math.abs(polygon.area());
		}
		return [x,y,6 * z];
	}
	,project: function(d,_) {
		return this.geo.projection.project(d);
	}
	,__class__: thx.svg.CentroidTypes
}
if(!thx.geom) thx.geom = {}
thx.geom.Polygon = $hxClasses["thx.geom.Polygon"] = function(coordinates) {
	this.coordinates = coordinates;
};
thx.geom.Polygon.__name__ = ["thx","geom","Polygon"];
thx.geom.Polygon.polygonInside = function(p,a,b) {
	return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}
thx.geom.Polygon.polygonIntersect = function(c,d,a,b) {
	var x1 = c[0], x2 = d[0], x3 = a[0], x4 = b[0], y1 = c[1], y2 = d[1], y3 = a[1], y4 = b[1], x13 = x1 - x3, x21 = x2 - x1, x43 = x4 - x3, y13 = y1 - y3, y21 = y2 - y1, y43 = y4 - y3, ua = (x43 * y13 - y43 * x13) / (y43 * x21 - x43 * y21);
	return [x1 + ua * x21,y1 + ua * y21];
}
thx.geom.Polygon.prototype = {
	coordinates: null
	,area: function() {
		var n = this.coordinates.length, a = this.coordinates[n - 1][0] * this.coordinates[0][1], b = this.coordinates[n - 1][1] * this.coordinates[0][0];
		var _g = 1;
		while(_g < n) {
			var i = _g++;
			a += this.coordinates[i - 1][0] * this.coordinates[i][1];
			b += this.coordinates[i - 1][1] * this.coordinates[i][0];
		}
		return (b - a) * .5;
	}
	,centroid: function(k) {
		var a, b, c, x = 0.0, y = 0.0;
		if(null == k) k = 1 / (6 * this.area());
		var _g1 = 0, _g = this.coordinates.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			a = this.coordinates[i];
			b = this.coordinates[i + 1];
			c = a[0] * b[1] - b[0] * a[1];
			x += (a[0] + b[0]) * c;
			y += (a[1] + b[1]) * c;
		}
		return [x * k,y * k];
	}
	,clip: function(subject) {
		var input, a = Arrays.last(this.coordinates), b, c, d, m;
		var _g1 = 0, _g = this.coordinates.length;
		while(_g1 < _g) {
			var i = _g1++;
			input = subject.copy();
			subject = [];
			b = this.coordinates[i];
			c = input[(m = input.length) - 1];
			var _g2 = 0;
			while(_g2 < m) {
				var j = _g2++;
				d = input[j];
				if(thx.geom.Polygon.polygonInside(d,a,b)) {
					if(!thx.geom.Polygon.polygonInside(c,a,b)) subject.push(thx.geom.Polygon.polygonIntersect(c,d,a,b));
					subject.push(d);
				} else if(thx.geom.Polygon.polygonInside(c,a,b)) subject.push(thx.geom.Polygon.polygonIntersect(c,d,a,b));
				c = d;
			}
			a = b;
		}
		return subject;
	}
	,__class__: thx.geom.Polygon
}
utest.Assert = $hxClasses["utest.Assert"] = function() { }
utest.Assert.__name__ = ["utest","Assert"];
utest.Assert.results = null;
utest.Assert.isTrue = function(cond,msg,pos) {
	if(utest.Assert.results == null) throw "Assert.results is not currently bound to any assert context";
	if(null == msg) msg = "expected true";
	if(cond) utest.Assert.results.add(utest.Assertation.Success(pos)); else utest.Assert.results.add(utest.Assertation.Failure(msg,pos));
}
utest.Assert.isFalse = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value == false,msg,pos);
}
utest.Assert.isNull = function(value,msg,pos) {
	if(msg == null) msg = "expected null but was " + utest.Assert.q(value);
	utest.Assert.isTrue(value == null,msg,pos);
}
utest.Assert.notNull = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value != null,msg,pos);
}
utest.Assert["is"] = function(value,type,msg,pos) {
	if(msg == null) msg = "expected type " + utest.Assert.typeToString(type) + " but was " + utest.Assert.typeToString(value);
	utest.Assert.isTrue(Std["is"](value,type),msg,pos);
}
utest.Assert.notEquals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " and testa value " + utest.Assert.q(value) + " should be different";
	utest.Assert.isFalse(expected == value,msg,pos);
}
utest.Assert.equals = function(expected,value,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	utest.Assert.isTrue(expected == value,msg,pos);
}
utest.Assert.match = function(pattern,value,msg,pos) {
	if(msg == null) msg = "the value " + utest.Assert.q(value) + "does not match the provided pattern";
	utest.Assert.isTrue(pattern.match(value),msg,pos);
}
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	return utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
}
utest.Assert._floatEquals = function(expected,value,approx) {
	if(Math.isNaN(expected)) return Math.isNaN(value); else if(Math.isNaN(value)) return false; else if(!Math.isFinite(expected) && !Math.isFinite(value)) return expected > 0 == value > 0;
	if(null == approx) approx = 1e-5;
	return Math.abs(value - expected) < approx;
}
utest.Assert.getTypeName = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		return "[null]";
	case 1:
		return "Int";
	case 2:
		return "Float";
	case 3:
		return "Bool";
	case 5:
		return "function";
	case 6:
		var c = $e[2];
		return Type.getClassName(c);
	case 7:
		var e = $e[2];
		return Type.getEnumName(e);
	case 4:
		return "Object";
	case 8:
		return "Unknown";
	}
}
utest.Assert.isIterable = function(v,isAnonym) {
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
}
utest.Assert.isIterator = function(v,isAnonym) {
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
}
utest.Assert.sameAs = function(expected,value,status) {
	var texpected = utest.Assert.getTypeName(expected);
	var tvalue = utest.Assert.getTypeName(value);
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		return false;
	}
	var $e = (Type["typeof"](expected));
	switch( $e[1] ) {
	case 2:
		if(!utest.Assert._floatEquals(expected,value)) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 0:
	case 1:
	case 3:
		if(expected != value) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 5:
		if(!Reflect.compareMethods(expected,value)) {
			status.error = "expected same function reference" + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	case 6:
		var c = $e[2];
		var cexpected = Type.getClassName(c);
		var cvalue = Type.getClassName(Type.getClass(value));
		if(cexpected != cvalue) {
			status.error = "expected instance of " + utest.Assert.q(cexpected) + " but it is " + utest.Assert.q(cvalue) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		if(Std["is"](expected,String) && expected != value) {
			status.error = "expected '" + expected + "' but it is '" + value + "'";
			return false;
		}
		if(Std["is"](expected,Array)) {
			if(status.recursive || status.path == "") {
				if(expected.length != value.length) {
					status.error = "expected " + expected.length + " elements but they were " + value.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0, _g = expected.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = path == ""?"array[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(expected[i],value[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(Std["is"](expected,Date)) {
			if(expected.getTime() != value.getTime()) {
				status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			return true;
		}
		if(Std["is"](expected,haxe.io.Bytes)) {
			if(status.recursive || status.path == "") {
				var ebytes = expected;
				var vbytes = value;
				if(ebytes.length != vbytes.length) return false;
				var _g1 = 0, _g = ebytes.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(ebytes.b[i] != vbytes.b[i]) {
						status.error = "expected byte " + ebytes.b[i] + " but wss " + ebytes.b[i] + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(Std["is"](expected,Hash) || Std["is"](expected,IntHash)) {
			if(status.recursive || status.path == "") {
				var keys = Lambda.array({ iterator : function() {
					return expected.keys();
				}});
				var vkeys = Lambda.array({ iterator : function() {
					return value.keys();
				}});
				if(keys.length != vkeys.length) {
					status.error = "expected " + keys.length + " keys but they were " + vkeys.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g = 0;
				while(_g < keys.length) {
					var key = keys[_g];
					++_g;
					status.path = path == ""?"hash[" + key + "]":path + "[" + key + "]";
					if(!utest.Assert.sameAs(expected.get(key),value.get(key),status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterator(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0, _g = evalues.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = path == ""?"iterator[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterable(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0, _g = evalues.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = path == ""?"iterable[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
				}
			}
			return true;
		}
		if(status.recursive || status.path == "") {
			var fields = Type.getInstanceFields(Type.getClass(expected));
			var path = status.path;
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				status.path = path == ""?field:path + "." + field;
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) return false;
			}
		}
		return true;
	case 7:
		var e = $e[2];
		var eexpected = Type.getEnumName(e);
		var evalue = Type.getEnumName(Type.getEnum(value));
		if(eexpected != evalue) {
			status.error = "expected enumeration of " + utest.Assert.q(eexpected) + " but it is " + utest.Assert.q(evalue) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		if(status.recursive || status.path == "") {
			if(expected[1] != value[1]) {
				status.error = "expected " + utest.Assert.q(expected[0]) + " but is " + utest.Assert.q(value[0]) + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			var eparams = expected.slice(2);
			var vparams = value.slice(2);
			var path = status.path;
			var _g1 = 0, _g = eparams.length;
			while(_g1 < _g) {
				var i = _g1++;
				status.path = path == ""?"enum[" + i + "]":path + "[" + i + "]";
				if(!utest.Assert.sameAs(eparams[i],vparams[i],status)) {
					status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
					return false;
				}
			}
		}
		return true;
	case 4:
		if(status.recursive || status.path == "") {
			var tfields = Reflect.fields(value);
			var fields = Reflect.fields(expected);
			var path = status.path;
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				tfields.remove(field);
				status.path = path == ""?field:path + "." + field;
				if(!Reflect.hasField(value,field)) {
					status.error = "expected field " + status.path + " does not exist in " + utest.Assert.q(value);
					return false;
				}
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) return false;
			}
			if(tfields.length > 0) {
				status.error = "the tested object has extra field(s) (" + tfields.join(", ") + ") not included in the expected ones";
				return false;
			}
		}
		if(utest.Assert.isIterator(expected,true)) {
			if(!utest.Assert.isIterator(value,true)) {
				status.error = "expected Iterable but it is not " + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0, _g = evalues.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = path == ""?"iterator[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
						status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest.Assert.isIterable(expected,true)) {
			if(!utest.Assert.isIterable(value,true)) {
				status.error = "expected Iterator but it is not " + (status.path == ""?"":" for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0, _g = evalues.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = path == ""?"iterable[" + i + "]":path + "[" + i + "]";
					if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
				}
			}
			return true;
		}
		return true;
	case 8:
		return (function($this) {
			var $r;
			throw "Unable to compare two unknown types";
			return $r;
		}(this));
	}
	return (function($this) {
		var $r;
		throw "Unable to compare values: " + utest.Assert.q(expected) + " and " + utest.Assert.q(value);
		return $r;
	}(this));
}
utest.Assert.q = function(v) {
	if(Std["is"](v,String)) return "\"" + StringTools.replace(v,"\"","\\\"") + "\""; else return Std.string(v);
}
utest.Assert.same = function(expected,value,recursive,msg,pos) {
	var status = { recursive : null == recursive?true:recursive, path : "", error : null};
	if(utest.Assert.sameAs(expected,value,status)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?status.error:msg,pos);
}
utest.Assert.raises = function(method,type,msgNotThrown,msgWrongType,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		if(null == msgNotThrown) msgNotThrown = "exception of type " + name + " not raised";
		utest.Assert.fail(msgNotThrown,pos);
	} catch( ex ) {
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		if(null == msgWrongType) msgWrongType = "expected throw of type " + name + " but was " + ex;
		utest.Assert.isTrue(Std["is"](ex,type),msgWrongType,pos);
	}
}
utest.Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " not found in the expected possibilities " + possibilities:msg,pos);
}
utest.Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do not contain " + match:msg,pos);
}
utest.Assert.notContains = function(match,values,msg,pos) {
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do contain " + match:msg,pos);
}
utest.Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " does not contain " + utest.Assert.q(match):msg,pos);
}
utest.Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		utest.Assert.fail(msg == null?"null argument value":msg,pos);
		return;
	}
	var p = 0;
	var _g = 0;
	while(_g < sequence.length) {
		var s = sequence[_g];
		++_g;
		var p2 = value.indexOf(s,p);
		if(p2 < 0) {
			if(msg == null) {
				msg = "expected '" + s + "' after ";
				if(p > 0) {
					var cut = value.substr(0,p);
					if(cut.length > 30) cut = "..." + cut.substr(-27);
					msg += " '" + cut + "'";
				} else msg += " begin";
			}
			utest.Assert.fail(msg,pos);
			return;
		}
		p = p2 + s.length;
	}
	utest.Assert.isTrue(true,msg,pos);
}
utest.Assert.fail = function(msg,pos) {
	if(msg == null) msg = "failure expected";
	utest.Assert.isTrue(false,msg,pos);
}
utest.Assert.warn = function(msg) {
	utest.Assert.results.add(utest.Assertation.Warning(msg));
}
utest.Assert.createAsync = function(f,timeout) {
	return function() {
	};
}
utest.Assert.createEvent = function(f,timeout) {
	return function(e) {
	};
}
utest.Assert.typeToString = function(t) {
	try {
		var _t = Type.getClass(t);
		if(_t != null) t = _t;
	} catch( e ) {
	}
	try {
		return Type.getClassName(t);
	} catch( e ) {
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) t = _t;
	} catch( e ) {
	}
	try {
		return Type.getEnumName(t);
	} catch( e ) {
	}
	try {
		return Std.string(Type["typeof"](t));
	} catch( e ) {
	}
	try {
		return Std.string(t);
	} catch( e ) {
	}
	return "<unable to retrieve type name>";
}
utest.Assert.prototype = {
	__class__: utest.Assert
}
thx.math.TestEquations = $hxClasses["thx.math.TestEquations"] = function() {
};
thx.math.TestEquations.__name__ = ["thx","math","TestEquations"];
thx.math.TestEquations.prototype = {
	testLinear: function() {
		this.assertEquation([0.0,0.25,0.5,0.75,1.0],thx.math.Equations.linear,"linear");
	}
	,testQuad: function() {
		this.assertEquation([0.0,0.0625,0.25,0.5625,1.0],thx.math.Equations.quadratic,"quadratic");
	}
	,testCubic: function() {
		this.assertEquation([0.0,0.015625,0.125,0.421875,1.0],thx.math.Equations.cubic,"cubic");
	}
	,testSin: function() {
		this.assertEquation([0.0,0.07612046748871326,0.2928932188134524,0.6173165676349102,1.0],thx.math.Equations.sin,"sin");
	}
	,testExp: function() {
		this.assertEquation([0.0,0.004524271728019903,0.03025,0.1757766952966369,0.9999],thx.math.Equations.exponential,"exp");
	}
	,testCircle: function() {
		this.assertEquation([0.0,0.031754163448145745,0.1339745962155614,0.3385621722338523,1.0],thx.math.Equations.circle,"circle");
	}
	,testElastic: function() {
		this.assertEquation([0.0,1.1661157560971687,0.9760611111525319,1.00276213586401,1.0],thx.math.Equations.elasticf(),"elastic");
	}
	,testBack: function() {
		this.assertEquation([0.0,-0.06413656250000001,-0.08769750000000004,0.1825903124999999,1.0],thx.math.Equations.backf(),"back");
	}
	,testBounce: function() {
		this.assertEquation([0.0,0.47265625,0.765625,0.97265625,1.0],thx.math.Equations.bounce,"bounce");
	}
	,assertEquation: function(expected,f,name) {
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			var s = i * .25;
			var v = f(s);
			var e = expected[i];
			utest.Assert.floatEquals(e,v,1e-3,name + " expected " + e + " but is " + v + " for " + s,{ fileName : "TestEquations.hx", lineNumber : 60, className : "thx.math.TestEquations", methodName : "assertEquation"});
		}
	}
	,__class__: thx.math.TestEquations
}
thx.color.TestCmyk = $hxClasses["thx.color.TestCmyk"] = function() {
};
thx.color.TestCmyk.__name__ = ["thx","color","TestCmyk"];
thx.color.TestCmyk.prototype = {
	testBasics: function() {
		var tests = [{ rgb : new thx.color.Rgb(255,0,0), cmyk : new thx.color.Cmyk(0,1,1,0)},{ rgb : new thx.color.Rgb(255,102,0), cmyk : new thx.color.Cmyk(0,0.6,1,0)},{ rgb : new thx.color.Rgb(0,255,0), cmyk : new thx.color.Cmyk(1,0,1,0)},{ rgb : new thx.color.Rgb(102,255,102), cmyk : new thx.color.Cmyk(0.6,0,0.6,0)},{ rgb : new thx.color.Rgb(0,102,255), cmyk : new thx.color.Cmyk(1,0.6,0,0)}];
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			utest.Assert.isTrue(thx.color.Rgb.equals(test.rgb,test.cmyk),"expected " + test.rgb + " but was " + test.cmyk + " for " + test.cmyk.toCmykString(),{ fileName : "TestCmyk.hx", lineNumber : 24, className : "thx.color.TestCmyk", methodName : "testBasics"});
			var c = thx.color.Cmyk.toCmyk(test.rgb);
			utest.Assert.isTrue(thx.color.Rgb.equals(c,test.cmyk),"expected " + c + " but was " + test.cmyk + " for " + test.cmyk.toCmykString(),{ fileName : "TestCmyk.hx", lineNumber : 26, className : "thx.color.TestCmyk", methodName : "testBasics"});
		}
	}
	,__class__: thx.color.TestCmyk
}
thx.error.NullArgument = $hxClasses["thx.error.NullArgument"] = function(argumentName,message,posInfo) {
	if(null == message) message = "invalid null or empty argument '{0}' for method {1}.{2}()";
	thx.error.Error.call(this,message,[argumentName,posInfo.className,posInfo.methodName],posInfo,{ fileName : "NullArgument.hx", lineNumber : 16, className : "thx.error.NullArgument", methodName : "new"});
};
thx.error.NullArgument.__name__ = ["thx","error","NullArgument"];
thx.error.NullArgument.__super__ = thx.error.Error;
thx.error.NullArgument.prototype = $extend(thx.error.Error.prototype,{
	__class__: thx.error.NullArgument
});
thx.html.HtmlParser = $hxClasses["thx.html.HtmlParser"] = function(html) {
	if(null == html) throw new thx.error.NullArgument("html","invalid null argument '{0}' for method {1}.{2}()",{ fileName : "HtmlParser.hx", lineNumber : 30, className : "thx.html.HtmlParser", methodName : "new"}); else null;
	this.html = html;
};
thx.html.HtmlParser.__name__ = ["thx","html","HtmlParser"];
thx.html.HtmlParser.prototype = {
	handler: null
	,html: null
	,stack: null
	,process: function(handler) {
		if(null == handler) throw new thx.error.NullArgument("handler","invalid null argument '{0}' for method {1}.{2}()",{ fileName : "HtmlParser.hx", lineNumber : 37, className : "thx.html.HtmlParser", methodName : "process"}); else null;
		this.handler = handler;
		var index;
		var chars;
		var last = this.html;
		this.stack = [];
		var me = this;
		while(this.html != "") {
			chars = true;
			if(this.stack[this.stack.length - 1] == null || !thx.html.Element._special.exists(this.stack[this.stack.length - 1])) {
				if(this.html.indexOf("<!--") == 0) {
					index = this.html.indexOf("-->");
					if(index >= 0) {
						handler.comment(this.html.substr(4,index));
						this.html = this.html.substr(index + 3);
						chars = false;
					}
				} else if(this.html.indexOf("</") == 0) {
					if(thx.html.HtmlParser.endTag.match(this.html)) {
						this.html = thx.html.HtmlParser.endTag.matchedRight();
						thx.html.HtmlParser.endTag.customReplace(thx.html.HtmlParser.endTag.matched(0),function(re) {
							me.parseEndTag(re.matched(1));
							return "";
						});
						chars = false;
					}
				} else if(this.html.indexOf("<") == 0) {
					if(thx.html.HtmlParser.startTag.match(this.html)) {
						this.html = thx.html.HtmlParser.startTag.matchedRight();
						thx.html.HtmlParser.startTag.customReplace(thx.html.HtmlParser.startTag.matched(0),function(re) {
							me.parseStartTag(re.matched(1),re.matched(2),re.matched(3) == "/");
							return "";
						});
						chars = false;
					} else if(thx.html.HtmlParser.declaration.match(this.html)) {
						this.html = thx.html.HtmlParser.declaration.matchedRight();
						handler.declaration(thx.html.HtmlParser.declaration.matched(1));
						chars = false;
					} else if(thx.html.HtmlParser.doctype.match(this.html)) {
						this.html = thx.html.HtmlParser.doctype.matchedRight();
						handler.doctype(thx.html.HtmlParser.doctype.matched(1));
						chars = false;
					}
				}
				if(chars) {
					index = this.html.indexOf("<");
					var text = index < 0?this.html:this.html.substr(0,index);
					this.html = index < 0?"":this.html.substr(index);
					handler.chars(text);
				}
			} else {
				var re = new EReg("(.*)</" + this.stack[this.stack.length - 1] + "[^>]*>","mi");
				re.match(this.html);
				var text = re.matchedLeft();
				text = thx.html.HtmlParser.comment.replace(text,"$1");
				text = thx.html.HtmlParser.cdata.replace(text,"$1");
				handler.chars(text);
				this.html = re.matchedRight();
				this.parseEndTag(this.stack[this.stack.length - 1]);
			}
			if(this.html == last) throw "Parse Error: " + this.html.substr(0,250);
			last = this.html;
		}
		this.parseEndTag(null);
	}
	,stacklast: function() {
		return this.stack[this.stack.length - 1];
	}
	,parseStartTag: function(tagName,rest,unary) {
		if(thx.html.Element._block.exists(tagName)) while(this.stack[this.stack.length - 1] != null && thx.html.Element._inline.exists(this.stack[this.stack.length - 1])) this.parseEndTag(this.stack[this.stack.length - 1]);
		if(thx.html.Element._closeSelf.exists(tagName) && this.stack[this.stack.length - 1] == tagName) this.parseEndTag(tagName);
		unary = thx.html.Element._empty.exists(tagName) || unary;
		if(!unary) this.stack.push(tagName);
		var attrs = [];
		thx.html.HtmlParser.attr.customReplace(rest,function(re) {
			var name = re.matched(1);
			var value = re.matched(2);
			if(value == null) {
				value = re.matched(3);
				if(value == null) {
					value = re.matched(4);
					if(value == null) value = thx.html.Attribute._fill.exists(name)?name:"";
				}
			}
			attrs.push({ name : name, value : value, escaped : new EReg("(^|[^\\\\])\"","g").replace(value,"$1\\\"")});
			return "";
		});
		this.handler.start(tagName,attrs,unary);
	}
	,parseEndTag: function(tagName) {
		var pos = -1;
		if(tagName == null || tagName == "") pos = 0; else {
			pos = this.stack.length - 1;
			while(pos >= 0) {
				if(this.stack[pos] == tagName) break;
				pos--;
			}
		}
		if(pos >= 0) {
			var i = this.stack.length - 1;
			while(i >= pos) {
				this.handler.end(this.stack[i]);
				this.stack.pop();
				i--;
			}
		}
	}
	,__class__: thx.html.HtmlParser
}
var TestIterators = $hxClasses["TestIterators"] = function() {
};
TestIterators.__name__ = ["TestIterators"];
TestIterators.addTests = function(runner) {
	runner.addCase(new TestIterators());
}
TestIterators.main = function() {
	var runner = new utest.Runner();
	TestIterators.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestIterators.prototype = {
	__class__: TestIterators
}
thx.color.Colors = $hxClasses["thx.color.Colors"] = function() { }
thx.color.Colors.__name__ = ["thx","color","Colors"];
thx.color.Colors.interpolatef = function(a,b,equation) {
	var ca = thx.color.Colors.parse(a);
	var cb = thx.color.Colors.parse(b);
	var f = thx.color.Rgb.interpolatef(ca,cb,equation);
	return function(v) {
		return f(v).toString();
	};
}
thx.color.Colors.interpolate = function(v,a,b,equation) {
	return (thx.color.Colors.interpolatef(a,b,equation))(v);
}
thx.color.Colors.parse = function(s) {
	if(!thx.color.Colors._reParse.match(s = StringTools.trim(s.toLowerCase()))) {
		var v = thx.color.NamedColors.byName.get(s);
		if(null == v) {
			if("transparent" == s) return thx.color.Rgb.fromInt(16777215); else return null;
		} else return v;
	}
	var type = thx.color.Colors._reParse.matched(1);
	if(!Strings.empty(type)) {
		var values = thx.color.Colors._reParse.matched(2).split(",");
		switch(type) {
		case "rgb":case "rgba":
			return new thx.color.Rgb(thx.color.Colors._c(values[0]),thx.color.Colors._c(values[1]),thx.color.Colors._c(values[2]));
		case "hsl":
			return new thx.color.Hsl(thx.color.Colors._d(values[0]),thx.color.Colors._p(values[1]),thx.color.Colors._p(values[2]));
		case "cmyk":
			return new thx.color.Cmyk(thx.color.Colors._p(values[0]),thx.color.Colors._p(values[1]),thx.color.Colors._p(values[2]),thx.color.Colors._p(values[3]));
		}
	}
	var color = thx.color.Colors._reParse.matched(3);
	if(color.length == 3) color = color.split("").map(function(d,_) {
		return d + d;
	}).join(""); else if(color.length != 6) return null;
	return thx.color.Rgb.fromInt(Std.parseInt("0x" + color));
}
thx.color.Colors._c = function(s) {
	return Std.parseInt(StringTools.trim(s));
}
thx.color.Colors._d = function(s) {
	var s1 = StringTools.trim(s);
	if(s1.substr(-3) == "deg") s1 = s1.substr(0,-3); else if(s1.substr(-1) == "º") s1 = s1.substr(0,-1);
	return Std.parseFloat(s1);
}
thx.color.Colors._p = function(s) {
	var s1 = StringTools.trim(s);
	if(s1.substr(-1) == "%") return Std.parseFloat(s1.substr(0,-1)) / 100; else return Std.parseFloat(s1);
}
thx.color.Colors.prototype = {
	__class__: thx.color.Colors
}
thx.validation.PatternValidator = $hxClasses["thx.validation.PatternValidator"] = function(pattern,failureMessage) {
	if(failureMessage == null) failureMessage = "value doesn't match the required pattern";
	this.pattern = pattern;
	this.failureMessage = failureMessage;
};
thx.validation.PatternValidator.__name__ = ["thx","validation","PatternValidator"];
thx.validation.PatternValidator.__super__ = thx.validation.Validator;
thx.validation.PatternValidator.prototype = $extend(thx.validation.Validator.prototype,{
	pattern: null
	,failureMessage: null
	,validate: function(value) {
		if(this.pattern.match(value)) return thx.util.Result.Ok; else return thx.util.Result.Failure([new thx.util.Message(this.failureMessage,[],null)]);
	}
	,__class__: thx.validation.PatternValidator
});
thx.error.AbstractMethod = $hxClasses["thx.error.AbstractMethod"] = function(posInfo) {
	thx.error.Error.call(this,"method {0}.{1}() is abstract",[posInfo.className,posInfo.methodName],posInfo,{ fileName : "AbstractMethod.hx", lineNumber : 14, className : "thx.error.AbstractMethod", methodName : "new"});
};
thx.error.AbstractMethod.__name__ = ["thx","error","AbstractMethod"];
thx.error.AbstractMethod.__super__ = thx.error.Error;
thx.error.AbstractMethod.prototype = $extend(thx.error.Error.prototype,{
	__class__: thx.error.AbstractMethod
});
var TestHashes = $hxClasses["TestHashes"] = function() {
};
TestHashes.__name__ = ["TestHashes"];
TestHashes.addTests = function(runner) {
	runner.addCase(new TestHashes());
}
TestHashes.main = function() {
	var runner = new utest.Runner();
	TestHashes.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestHashes.prototype = {
	testCreate: function() {
		var hash = DynamicsT.toHash({ name : "haxe", author : "nicolas"});
		utest.Assert.equals("haxe",hash.get("name"),null,{ fileName : "TestHashes.hx", lineNumber : 32, className : "TestHashes", methodName : "testCreate"});
		utest.Assert.equals("nicolas",hash.get("author"),null,{ fileName : "TestHashes.hx", lineNumber : 33, className : "TestHashes", methodName : "testCreate"});
	}
	,__class__: TestHashes
}
var DateTools = $hxClasses["DateTools"] = function() { }
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	return (function($this) {
		var $r;
		switch(e) {
		case "%":
			$r = "%";
			break;
		case "C":
			$r = StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
			break;
		case "d":
			$r = StringTools.lpad(Std.string(d.getDate()),"0",2);
			break;
		case "D":
			$r = DateTools.__format(d,"%m/%d/%y");
			break;
		case "e":
			$r = Std.string(d.getDate());
			break;
		case "H":case "k":
			$r = StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
			break;
		case "I":case "l":
			$r = (function($this) {
				var $r;
				var hour = d.getHours() % 12;
				$r = StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
				return $r;
			}($this));
			break;
		case "m":
			$r = StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
			break;
		case "M":
			$r = StringTools.lpad(Std.string(d.getMinutes()),"0",2);
			break;
		case "n":
			$r = "\n";
			break;
		case "p":
			$r = d.getHours() > 11?"PM":"AM";
			break;
		case "r":
			$r = DateTools.__format(d,"%I:%M:%S %p");
			break;
		case "R":
			$r = DateTools.__format(d,"%H:%M");
			break;
		case "s":
			$r = Std.string(d.getTime() / 1000 | 0);
			break;
		case "S":
			$r = StringTools.lpad(Std.string(d.getSeconds()),"0",2);
			break;
		case "t":
			$r = "\t";
			break;
		case "T":
			$r = DateTools.__format(d,"%H:%M:%S");
			break;
		case "u":
			$r = (function($this) {
				var $r;
				var t = d.getDay();
				$r = t == 0?"7":Std.string(t);
				return $r;
			}($this));
			break;
		case "w":
			$r = Std.string(d.getDay());
			break;
		case "y":
			$r = StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
			break;
		case "Y":
			$r = Std.string(d.getFullYear());
			break;
		default:
			$r = (function($this) {
				var $r;
				throw "Date.format %" + e + "- not implemented yet.";
				return $r;
			}($this));
		}
		return $r;
	}(this));
}
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.b[r.b.length] = f.substr(p,np - p);
		r.add(DateTools.__format_get(d,f.substr(np + 1,1)));
		p = np + 2;
	}
	r.b[r.b.length] = f.substr(p,f.length - p);
	return r.b.join("");
}
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
}
DateTools.delta = function(d,t) {
	return Date.fromTime(d.getTime() + t);
}
DateTools.getMonthDays = function(d) {
	var month = d.getMonth();
	var year = d.getFullYear();
	if(month != 1) return DateTools.DAYS_OF_MONTH[month];
	var isB = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	return isB?29:28;
}
DateTools.seconds = function(n) {
	return n * 1000.0;
}
DateTools.minutes = function(n) {
	return n * 60.0 * 1000.0;
}
DateTools.hours = function(n) {
	return n * 60.0 * 60.0 * 1000.0;
}
DateTools.days = function(n) {
	return n * 24.0 * 60.0 * 60.0 * 1000.0;
}
DateTools.parse = function(t) {
	var s = t / 1000;
	var m = s / 60;
	var h = m / 60;
	return { ms : t % 1000, seconds : s % 60 | 0, minutes : m % 60 | 0, hours : h % 24 | 0, days : h / 24 | 0};
}
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
}
DateTools.prototype = {
	__class__: DateTools
}
var TestObjects = $hxClasses["TestObjects"] = function() {
};
TestObjects.__name__ = ["TestObjects"];
TestObjects.addTests = function(runner) {
	runner.addCase(new TestObjects());
}
TestObjects.main = function() {
	var runner = new utest.Runner();
	TestObjects.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
TestObjects.prototype = {
	testKeys: function() {
		utest.Assert.same(["a","b","c"],Arrays.order(Reflect.fields(TestObjects.testObject),null),null,null,{ fileName : "TestObjects.hx", lineNumber : 12, className : "TestObjects", methodName : "testKeys"});
	}
	,testValues: function() {
		utest.Assert.same([1,2,3],Arrays.order(Objects.values(TestObjects.testObject),null),null,null,{ fileName : "TestObjects.hx", lineNumber : 17, className : "TestObjects", methodName : "testValues"});
	}
	,testEntries: function() {
		utest.Assert.same([{ key : "a", value : 1},{ key : "b", value : 2},{ key : "c", value : 3}],Arrays.order(Objects.entries(TestObjects.testObject),function(a,b) {
			return Reflect.compare(a.key,b.key);
		}),null,null,{ fileName : "TestObjects.hx", lineNumber : 22, className : "TestObjects", methodName : "testEntries"});
	}
	,testInterpolate: function() {
		var a = { a : 10, b : "x1y2", color : "hsl(30, 0.1, 0.5)", d : "extra"};
		var b = { a : 20, b : "x3y4", color : "hsl(330, 0.3, 0.7)", e : "other"};
		var f = Objects.interpolatef(a,b);
		utest.Assert.same({ d : "extra", e : "other", a : 15, b : "x2y3", color : "hsl(180, 0.2, 0.6)"},f(0.5),null,null,{ fileName : "TestObjects.hx", lineNumber : 42, className : "TestObjects", methodName : "testInterpolate"});
	}
	,testFlatten: function() {
		utest.Assert.same([],Objects.flatten({ }),null,null,{ fileName : "TestObjects.hx", lineNumber : 54, className : "TestObjects", methodName : "testFlatten"});
		utest.Assert.same([{ fields : ["a"], value : 1},{ fields : ["b"], value : 2}],Objects.flatten({ a : 1, b : 2}),null,null,{ fileName : "TestObjects.hx", lineNumber : 57, className : "TestObjects", methodName : "testFlatten"});
		utest.Assert.same([{ fields : ["a","b"], value : 1},{ fields : ["a","c"], value : 2},{ fields : ["d","e"], value : 3},{ fields : ["d","f"], value : 4}],Objects.flatten({ a : { b : 1, c : 2}, d : { e : 3, f : 4}}),null,null,{ fileName : "TestObjects.hx", lineNumber : 63, className : "TestObjects", methodName : "testFlatten"});
		utest.Assert.same([{ fields : ["a","b"], value : 1},{ fields : ["a","c","d"], value : 2},{ fields : ["a","c","e"], value : 3},{ fields : ["a","c","f","g"], value : 4},{ fields : ["h"], value : 5}],Objects.flatten({ a : { b : 1, c : { d : 2, e : 3, f : { g : 4}}}, h : 5}),null,null,{ fileName : "TestObjects.hx", lineNumber : 74, className : "TestObjects", methodName : "testFlatten"});
	}
	,__class__: TestObjects
}
thx.xml.NormalizeWhitespaceValueFormat = $hxClasses["thx.xml.NormalizeWhitespaceValueFormat"] = function() {
	thx.xml.ValueFormat.call(this);
	this._wsReplace = new EReg("(\\s|\n|\r)+","g");
};
thx.xml.NormalizeWhitespaceValueFormat.__name__ = ["thx","xml","NormalizeWhitespaceValueFormat"];
thx.xml.NormalizeWhitespaceValueFormat.__super__ = thx.xml.ValueFormat;
thx.xml.NormalizeWhitespaceValueFormat.prototype = $extend(thx.xml.ValueFormat.prototype,{
	_wsReplace: null
	,_wsTestStart: null
	,_wsTestEnd: null
	,format: function(value) {
		var v = this._wsReplace.replace(value," ");
		if(v == " ") return ""; else return v;
	}
	,__class__: thx.xml.NormalizeWhitespaceValueFormat
});
var Xml = $hxClasses["Xml"] = function() {
};
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,_nodeName: null
	,_nodeValue: null
	,_attributes: null
	,_children: null
	,_parent: null
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getParent: function() {
		return this._parent;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.push(x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = this._children.remove(x);
		if(b) x._parent = null;
		return b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.insert(pos,x);
	}
	,toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "<";
			s.add(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b[s.b.length] = " ";
				s.b[s.b.length] = k == null?"null":k;
				s.b[s.b.length] = "=\"";
				s.add(this._attributes.get(k));
				s.b[s.b.length] = "\"";
			}
			if(this._children.length == 0) {
				s.b[s.b.length] = "/>";
				return s.b.join("");
			}
			s.b[s.b.length] = ">";
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.add(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "</";
			s.add(this._nodeName);
			s.b[s.b.length] = ">";
		}
		return s.b.join("");
	}
	,__class__: Xml
	,__properties__: {get_parent:"getParent",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",set_nodeName:"setNodeName",get_nodeName:"getNodeName"}
}
thx.geo.Mercator = $hxClasses["thx.geo.Mercator"] = function() {
	this.setScale(500);
	this.setTranslate([480.0,250]);
};
thx.geo.Mercator.__name__ = ["thx","geo","Mercator"];
thx.geo.Mercator.__interfaces__ = [thx.geo.IProjection];
thx.geo.Mercator.prototype = {
	scale: null
	,translate: null
	,project: function(coords) {
		var x = coords[0] / 360, y = -(Math.log(Math.tan(Math.PI / 4 + coords[1] * 0.01745329251994329577 / 2)) / 0.01745329251994329577) / 360;
		return [this.getScale() * x + this.getTranslate()[0],this.getScale() * Math.max(-.5,Math.min(.5,y)) + this.getTranslate()[1]];
	}
	,invert: function(coords) {
		var x = (coords[0] - this.getTranslate()[0]) / this.getScale(), y = (coords[1] - this.getTranslate()[1]) / this.getScale();
		return [360 * x,2 * Math.atan(Math.exp(-360 * y * 0.01745329251994329577)) / 0.01745329251994329577 - 90];
	}
	,setScale: function(scale) {
		return this.scale = scale;
	}
	,getScale: function() {
		return this.scale;
	}
	,getTranslate: function() {
		return this.translate.copy();
	}
	,setTranslate: function(translate) {
		this.translate = [translate[0],translate[1]];
		return translate;
	}
	,__class__: thx.geo.Mercator
	,__properties__: {set_translate:"setTranslate",get_translate:"getTranslate",set_scale:"setScale",get_scale:"getScale"}
}
thx.geo.Albers = $hxClasses["thx.geo.Albers"] = function() {
	this._origin = [-98.0,38];
	this._parallels = [29.5,45.5];
	this._scale = 1000;
	this._translate = [480.0,250];
	this.reload();
};
thx.geo.Albers.__name__ = ["thx","geo","Albers"];
thx.geo.Albers.__interfaces__ = [thx.geo.IProjection];
thx.geo.Albers.prototype = {
	origin: null
	,parallels: null
	,translate: null
	,scale: null
	,lng0: null
	,n: null
	,C: null
	,p0: null
	,_origin: null
	,_parallels: null
	,_translate: null
	,_scale: null
	,project: function(coords) {
		var t = this.n * (0.01745329251994329577 * coords[0] - this.lng0), p = Math.sqrt(this.C - 2 * this.n * Math.sin(0.01745329251994329577 * coords[1])) / this.n;
		return [this.getScale() * p * Math.sin(t) + this.getTranslate()[0],this.getScale() * (p * Math.cos(t) - this.p0) + this.getTranslate()[1]];
	}
	,invert: function(coords) {
		var x = (coords[0] - this.getTranslate()[0]) / this.getScale(), y = (coords[1] - this.getTranslate()[1]) / this.getScale(), p0y = this.p0 + y, t = Math.atan2(x,p0y), p = Math.sqrt(x * x + p0y * p0y);
		return [(this.lng0 + t / this.n) / 0.01745329251994329577,Math.asin((this.C - p * p * this.n * this.n) / (2 * this.n)) / 0.01745329251994329577];
	}
	,getOrigin: function() {
		return this._origin.copy();
	}
	,setOrigin: function(origin) {
		this._origin = [origin[0],origin[1]];
		this.reload();
		return origin;
	}
	,getParallels: function() {
		return this._parallels.copy();
	}
	,setParallels: function(parallels) {
		this._parallels = [parallels[0],parallels[1]];
		this.reload();
		return parallels;
	}
	,getTranslate: function() {
		return this._translate.copy();
	}
	,setTranslate: function(translate) {
		this._translate = [translate[0],translate[1]];
		return translate;
	}
	,reload: function() {
		var phi1 = 0.01745329251994329577 * this.getParallels()[0], phi2 = 0.01745329251994329577 * this.getParallels()[1], lat0 = 0.01745329251994329577 * this.getOrigin()[1], s = Math.sin(phi1), c = Math.cos(phi1);
		this.lng0 = 0.01745329251994329577 * this.getOrigin()[0];
		this.n = .5 * (s + Math.sin(phi2));
		this.C = c * c + 2 * this.n * s;
		this.p0 = Math.sqrt(this.C - 2 * this.n * Math.sin(lat0)) / this.n;
		return this;
	}
	,setScale: function(scale) {
		return this._scale = scale;
	}
	,getScale: function() {
		return this._scale;
	}
	,__class__: thx.geo.Albers
	,__properties__: {set_scale:"setScale",get_scale:"getScale",set_translate:"setTranslate",get_translate:"getTranslate",set_parallels:"setParallels",get_parallels:"getParallels",set_origin:"setOrigin",get_origin:"getOrigin"}
}
thx.svg.Area = $hxClasses["thx.svg.Area"] = function(x,y0,y1,interpolator) {
	this._x = x;
	this._y0 = y0;
	this._y1 = y1;
	this._interpolator = interpolator;
};
thx.svg.Area.__name__ = ["thx","svg","Area"];
thx.svg.Area.pointArray = function(interpolator) {
	return new thx.svg.Area(function(d,_) {
		return d[0];
	},function(d,_) {
		return d[1];
	},function(d,_) {
		return d[2];
	},interpolator);
}
thx.svg.Area.pointObject = function(interpolator) {
	return new thx.svg.Area(function(d,_) {
		return d.x;
	},function(d,_) {
		return d.y0;
	},function(d,_) {
		return d.y1;
	},interpolator);
}
thx.svg.Area.pointArray2 = function(interpolator) {
	return new thx.svg.Area(function(d,_) {
		return d[0];
	},function(_,_1) {
		return 0.0;
	},function(d,_) {
		return d[1];
	},interpolator);
}
thx.svg.Area.pointObjectXY = function(interpolator) {
	return new thx.svg.Area(function(d,_) {
		return d.x;
	},function(_,_1) {
		return 0.0;
	},function(d,_) {
		return d.y;
	},interpolator);
}
thx.svg.Area.prototype = {
	_x: null
	,_y0: null
	,_y1: null
	,_interpolator: null
	,shape: function(data,i) {
		var second = thx.svg.LineInternals.linePoints(data,this._x,this._y0);
		second.reverse();
		return data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y1),this._interpolator) + "L" + thx.svg.LineInternals.interpolatePoints(second,this._interpolator) + "Z";
	}
	,getInterpolator: function() {
		return this._interpolator;
	}
	,interpolator: function(type) {
		this._interpolator = type;
		return this;
	}
	,getX: function() {
		return this._x;
	}
	,x: function(v) {
		this._x = v;
		return this;
	}
	,getY0: function() {
		return this._y0;
	}
	,y0: function(v) {
		this._y0 = v;
		return this;
	}
	,getY1: function() {
		return this._y1;
	}
	,y1: function(v) {
		this._y1 = v;
		return this;
	}
	,__class__: thx.svg.Area
}
haxe.macro.Context = $hxClasses["haxe.macro.Context"] = function() { }
haxe.macro.Context.__name__ = ["haxe","macro","Context"];
haxe.macro.Context.prototype = {
	__class__: haxe.macro.Context
}
utest.ui.common.FixtureResult = $hxClasses["utest.ui.common.FixtureResult"] = function(methodName) {
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest.ui.common.ResultStats();
};
utest.ui.common.FixtureResult.__name__ = ["utest","ui","common","FixtureResult"];
utest.ui.common.FixtureResult.prototype = {
	methodName: null
	,hasTestError: null
	,hasSetupError: null
	,hasTeardownError: null
	,hasTimeoutError: null
	,hasAsyncError: null
	,stats: null
	,list: null
	,iterator: function() {
		return this.list.iterator();
	}
	,add: function(assertation) {
		this.list.add(assertation);
		switch( (assertation)[1] ) {
		case 0:
			this.stats.addSuccesses(1);
			break;
		case 1:
			this.stats.addFailures(1);
			break;
		case 2:
			this.stats.addErrors(1);
			break;
		case 3:
			this.stats.addErrors(1);
			this.hasSetupError = true;
			break;
		case 4:
			this.stats.addErrors(1);
			this.hasTeardownError = true;
			break;
		case 5:
			this.stats.addErrors(1);
			this.hasTimeoutError = true;
			break;
		case 6:
			this.stats.addErrors(1);
			this.hasAsyncError = true;
			break;
		case 7:
			this.stats.addWarnings(1);
			break;
		}
	}
	,__class__: utest.ui.common.FixtureResult
}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
thx.languages.It.getLanguage();
thx.cultures.ItIT.getCulture();
{
	var JSON;
	if(null != (JSON = JSON)) {
		thx.json.Json.nativeDecoder = JSON.parse;
		thx.json.Json.nativeEncoder = JSON.stringify;
	}
}
thx.languages.En.getLanguage();
thx.cultures.EnUS.getCulture();
{
	thx.color.NamedColors.byName = new Hash();
	thx.color.NamedColors.byName.set("aliceblue",thx.color.NamedColors.aliceblue = thx.color.Rgb.fromInt(15792383));
	thx.color.NamedColors.byName.set("alice blue",thx.color.NamedColors.aliceblue);
	thx.color.NamedColors.byName.set("antiquewhite",thx.color.NamedColors.antiquewhite = thx.color.Rgb.fromInt(16444375));
	thx.color.NamedColors.byName.set("antique white",thx.color.NamedColors.antiquewhite);
	thx.color.NamedColors.byName.set("aqua",thx.color.NamedColors.aqua = thx.color.Rgb.fromInt(65535));
	thx.color.NamedColors.byName.set("aquamarine",thx.color.NamedColors.aquamarine = thx.color.Rgb.fromInt(8388564));
	thx.color.NamedColors.byName.set("azure",thx.color.NamedColors.azure = thx.color.Rgb.fromInt(15794175));
	thx.color.NamedColors.byName.set("beige",thx.color.NamedColors.beige = thx.color.Rgb.fromInt(16119260));
	thx.color.NamedColors.byName.set("bisque",thx.color.NamedColors.bisque = thx.color.Rgb.fromInt(16770244));
	thx.color.NamedColors.byName.set("black",thx.color.NamedColors.black = thx.color.Rgb.fromInt(0));
	thx.color.NamedColors.byName.set("blanchedalmond",thx.color.NamedColors.blanchedalmond = thx.color.Rgb.fromInt(16772045));
	thx.color.NamedColors.byName.set("blanched almond",thx.color.NamedColors.blanchedalmond);
	thx.color.NamedColors.byName.set("blue",thx.color.NamedColors.blue = thx.color.Rgb.fromInt(255));
	thx.color.NamedColors.byName.set("blueviolet",thx.color.NamedColors.blueviolet = thx.color.Rgb.fromInt(9055202));
	thx.color.NamedColors.byName.set("blue violet",thx.color.NamedColors.blueviolet);
	thx.color.NamedColors.byName.set("brown",thx.color.NamedColors.brown = thx.color.Rgb.fromInt(10824234));
	thx.color.NamedColors.byName.set("burlywood",thx.color.NamedColors.burlywood = thx.color.Rgb.fromInt(14596231));
	thx.color.NamedColors.byName.set("burly wood",thx.color.NamedColors.burlywood);
	thx.color.NamedColors.byName.set("cadetblue",thx.color.NamedColors.cadetblue = thx.color.Rgb.fromInt(6266528));
	thx.color.NamedColors.byName.set("cadet blue",thx.color.NamedColors.cadetblue);
	thx.color.NamedColors.byName.set("chartreuse",thx.color.NamedColors.chartreuse = thx.color.Rgb.fromInt(8388352));
	thx.color.NamedColors.byName.set("chart reuse",thx.color.NamedColors.chartreuse);
	thx.color.NamedColors.byName.set("chocolate",thx.color.NamedColors.chocolate = thx.color.Rgb.fromInt(13789470));
	thx.color.NamedColors.byName.set("coral",thx.color.NamedColors.coral = thx.color.Rgb.fromInt(16744272));
	thx.color.NamedColors.byName.set("cornflowerblue",thx.color.NamedColors.cornflowerblue = thx.color.Rgb.fromInt(6591981));
	thx.color.NamedColors.byName.set("corn flower blue",thx.color.NamedColors.cornflowerblue);
	thx.color.NamedColors.byName.set("cornsilk",thx.color.NamedColors.cornsilk = thx.color.Rgb.fromInt(16775388));
	thx.color.NamedColors.byName.set("corn silk",thx.color.NamedColors.cornsilk);
	thx.color.NamedColors.byName.set("crimson",thx.color.NamedColors.crimson = thx.color.Rgb.fromInt(14423100));
	thx.color.NamedColors.byName.set("cyan",thx.color.NamedColors.cyan = thx.color.Rgb.fromInt(65535));
	thx.color.NamedColors.byName.set("darkblue",thx.color.NamedColors.darkblue = thx.color.Rgb.fromInt(139));
	thx.color.NamedColors.byName.set("dark blue",thx.color.NamedColors.darkblue);
	thx.color.NamedColors.byName.set("darkcyan",thx.color.NamedColors.darkcyan = thx.color.Rgb.fromInt(35723));
	thx.color.NamedColors.byName.set("dark cyan",thx.color.NamedColors.darkcyan);
	thx.color.NamedColors.byName.set("darkgoldenrod",thx.color.NamedColors.darkgoldenrod = thx.color.Rgb.fromInt(12092939));
	thx.color.NamedColors.byName.set("dark golden rod",thx.color.NamedColors.darkgoldenrod);
	thx.color.NamedColors.byName.set("darkgray",thx.color.NamedColors.darkgray = thx.color.NamedColors.darkgrey = thx.color.Rgb.fromInt(11119017));
	thx.color.NamedColors.byName.set("dark gray",thx.color.NamedColors.darkgray);
	thx.color.NamedColors.byName.set("darkgrey",thx.color.NamedColors.darkgrey);
	thx.color.NamedColors.byName.set("dark grey",thx.color.NamedColors.darkgrey);
	thx.color.NamedColors.byName.set("darkgreen",thx.color.NamedColors.darkgreen = thx.color.Rgb.fromInt(25600));
	thx.color.NamedColors.byName.set("dark green",thx.color.NamedColors.darkgreen);
	thx.color.NamedColors.byName.set("darkkhaki",thx.color.NamedColors.darkkhaki = thx.color.Rgb.fromInt(12433259));
	thx.color.NamedColors.byName.set("dark khaki",thx.color.NamedColors.darkkhaki);
	thx.color.NamedColors.byName.set("darkmagenta",thx.color.NamedColors.darkmagenta = thx.color.Rgb.fromInt(9109643));
	thx.color.NamedColors.byName.set("dark magenta",thx.color.NamedColors.darkmagenta);
	thx.color.NamedColors.byName.set("darkolivegreen",thx.color.NamedColors.darkolivegreen = thx.color.Rgb.fromInt(5597999));
	thx.color.NamedColors.byName.set("dark olive green",thx.color.NamedColors.darkolivegreen);
	thx.color.NamedColors.byName.set("darkorange",thx.color.NamedColors.darkorange = thx.color.Rgb.fromInt(16747520));
	thx.color.NamedColors.byName.set("dark orange",thx.color.NamedColors.darkorange);
	thx.color.NamedColors.byName.set("darkorchid",thx.color.NamedColors.darkorchid = thx.color.Rgb.fromInt(10040012));
	thx.color.NamedColors.byName.set("dark orchid",thx.color.NamedColors.darkorchid);
	thx.color.NamedColors.byName.set("darkred",thx.color.NamedColors.darkred = thx.color.Rgb.fromInt(9109504));
	thx.color.NamedColors.byName.set("dark red",thx.color.NamedColors.darkred);
	thx.color.NamedColors.byName.set("darksalmon",thx.color.NamedColors.darksalmon = thx.color.Rgb.fromInt(15308410));
	thx.color.NamedColors.byName.set("dark salmon",thx.color.NamedColors.darksalmon);
	thx.color.NamedColors.byName.set("darkseagreen",thx.color.NamedColors.darkseagreen = thx.color.Rgb.fromInt(9419919));
	thx.color.NamedColors.byName.set("dark sea green",thx.color.NamedColors.darkseagreen);
	thx.color.NamedColors.byName.set("darkslateblue",thx.color.NamedColors.darkslateblue = thx.color.Rgb.fromInt(4734347));
	thx.color.NamedColors.byName.set("dark slate blue",thx.color.NamedColors.darkslateblue);
	thx.color.NamedColors.byName.set("darkslategray",thx.color.NamedColors.darkslategray = thx.color.NamedColors.darkslategrey = thx.color.Rgb.fromInt(3100495));
	thx.color.NamedColors.byName.set("dark slate gray",thx.color.NamedColors.darkslategray);
	thx.color.NamedColors.byName.set("darkslategrey",thx.color.NamedColors.darkslategrey);
	thx.color.NamedColors.byName.set("dark slate grey",thx.color.NamedColors.darkslategrey);
	thx.color.NamedColors.byName.set("darkturquoise",thx.color.NamedColors.darkturquoise = thx.color.Rgb.fromInt(52945));
	thx.color.NamedColors.byName.set("dark turquoise",thx.color.NamedColors.darkturquoise);
	thx.color.NamedColors.byName.set("darkviolet",thx.color.NamedColors.darkviolet = thx.color.Rgb.fromInt(9699539));
	thx.color.NamedColors.byName.set("dark violet",thx.color.NamedColors.darkviolet);
	thx.color.NamedColors.byName.set("deeppink",thx.color.NamedColors.deeppink = thx.color.Rgb.fromInt(16716947));
	thx.color.NamedColors.byName.set("deep pink",thx.color.NamedColors.deeppink);
	thx.color.NamedColors.byName.set("deepskyblue",thx.color.NamedColors.deepskyblue = thx.color.Rgb.fromInt(49151));
	thx.color.NamedColors.byName.set("deep sky blue",thx.color.NamedColors.deepskyblue);
	thx.color.NamedColors.byName.set("dimgray",thx.color.NamedColors.dimgray = thx.color.NamedColors.dimgrey = thx.color.Rgb.fromInt(6908265));
	thx.color.NamedColors.byName.set("dim grey",thx.color.NamedColors.dimgrey);
	thx.color.NamedColors.byName.set("dimgrey",thx.color.NamedColors.dimgrey);
	thx.color.NamedColors.byName.set("dim grey",thx.color.NamedColors.dimgrey);
	thx.color.NamedColors.byName.set("dodgerblue",thx.color.NamedColors.dodgerblue = thx.color.Rgb.fromInt(2003199));
	thx.color.NamedColors.byName.set("dodger blue",thx.color.NamedColors.dodgerblue);
	thx.color.NamedColors.byName.set("firebrick",thx.color.NamedColors.firebrick = thx.color.Rgb.fromInt(11674146));
	thx.color.NamedColors.byName.set("fire brick",thx.color.NamedColors.firebrick);
	thx.color.NamedColors.byName.set("floralwhite",thx.color.NamedColors.floralwhite = thx.color.Rgb.fromInt(16775920));
	thx.color.NamedColors.byName.set("floral white",thx.color.NamedColors.floralwhite);
	thx.color.NamedColors.byName.set("forestgreen",thx.color.NamedColors.forestgreen = thx.color.Rgb.fromInt(2263842));
	thx.color.NamedColors.byName.set("forest green",thx.color.NamedColors.forestgreen);
	thx.color.NamedColors.byName.set("fuchsia",thx.color.NamedColors.fuchsia = thx.color.Rgb.fromInt(16711935));
	thx.color.NamedColors.byName.set("gainsboro",thx.color.NamedColors.gainsboro = thx.color.Rgb.fromInt(14474460));
	thx.color.NamedColors.byName.set("ghostwhite",thx.color.NamedColors.ghostwhite = thx.color.Rgb.fromInt(16316671));
	thx.color.NamedColors.byName.set("ghost white",thx.color.NamedColors.ghostwhite);
	thx.color.NamedColors.byName.set("gold",thx.color.NamedColors.gold = thx.color.Rgb.fromInt(16766720));
	thx.color.NamedColors.byName.set("goldenrod",thx.color.NamedColors.goldenrod = thx.color.Rgb.fromInt(14329120));
	thx.color.NamedColors.byName.set("golden rod",thx.color.NamedColors.goldenrod);
	thx.color.NamedColors.byName.set("gray",thx.color.NamedColors.gray = thx.color.NamedColors.grey = thx.color.Rgb.fromInt(8421504));
	thx.color.NamedColors.byName.set("grey",thx.color.NamedColors.grey);
	thx.color.NamedColors.byName.set("green",thx.color.NamedColors.green = thx.color.Rgb.fromInt(32768));
	thx.color.NamedColors.byName.set("greenyellow",thx.color.NamedColors.greenyellow = thx.color.Rgb.fromInt(11403055));
	thx.color.NamedColors.byName.set("green yellow",thx.color.NamedColors.greenyellow);
	thx.color.NamedColors.byName.set("honeydew",thx.color.NamedColors.honeydew = thx.color.Rgb.fromInt(15794160));
	thx.color.NamedColors.byName.set("honey dew",thx.color.NamedColors.honeydew);
	thx.color.NamedColors.byName.set("hotpink",thx.color.NamedColors.hotpink = thx.color.Rgb.fromInt(16738740));
	thx.color.NamedColors.byName.set("hot pink",thx.color.NamedColors.hotpink);
	thx.color.NamedColors.byName.set("indianred",thx.color.NamedColors.indianred = thx.color.Rgb.fromInt(13458524));
	thx.color.NamedColors.byName.set("indian red",thx.color.NamedColors.indianred);
	thx.color.NamedColors.byName.set("indigo",thx.color.NamedColors.indigo = thx.color.Rgb.fromInt(4915330));
	thx.color.NamedColors.byName.set("ivory",thx.color.NamedColors.ivory = thx.color.Rgb.fromInt(16777200));
	thx.color.NamedColors.byName.set("khaki",thx.color.NamedColors.khaki = thx.color.Rgb.fromInt(15787660));
	thx.color.NamedColors.byName.set("lavender",thx.color.NamedColors.lavender = thx.color.Rgb.fromInt(15132410));
	thx.color.NamedColors.byName.set("lavenderblush",thx.color.NamedColors.lavenderblush = thx.color.Rgb.fromInt(16773365));
	thx.color.NamedColors.byName.set("lavender blush",thx.color.NamedColors.lavenderblush);
	thx.color.NamedColors.byName.set("lawngreen",thx.color.NamedColors.lawngreen = thx.color.Rgb.fromInt(8190976));
	thx.color.NamedColors.byName.set("lawn green",thx.color.NamedColors.lawngreen);
	thx.color.NamedColors.byName.set("lemonchiffon",thx.color.NamedColors.lemonchiffon = thx.color.Rgb.fromInt(16775885));
	thx.color.NamedColors.byName.set("lemon chiffon",thx.color.NamedColors.lemonchiffon);
	thx.color.NamedColors.byName.set("lightblue",thx.color.NamedColors.lightblue = thx.color.Rgb.fromInt(11393254));
	thx.color.NamedColors.byName.set("light blue",thx.color.NamedColors.lightblue);
	thx.color.NamedColors.byName.set("lightcoral",thx.color.NamedColors.lightcoral = thx.color.Rgb.fromInt(15761536));
	thx.color.NamedColors.byName.set("light coral",thx.color.NamedColors.lightcoral);
	thx.color.NamedColors.byName.set("lightcyan",thx.color.NamedColors.lightcyan = thx.color.Rgb.fromInt(14745599));
	thx.color.NamedColors.byName.set("light cyan",thx.color.NamedColors.lightcyan);
	thx.color.NamedColors.byName.set("lightgoldenrodyellow",thx.color.NamedColors.lightgoldenrodyellow = thx.color.Rgb.fromInt(16448210));
	thx.color.NamedColors.byName.set("light golden rod yellow",thx.color.NamedColors.lightgoldenrodyellow);
	thx.color.NamedColors.byName.set("lightgray",thx.color.NamedColors.lightgray = thx.color.NamedColors.lightgrey = thx.color.Rgb.fromInt(13882323));
	thx.color.NamedColors.byName.set("light gray",thx.color.NamedColors.lightgray);
	thx.color.NamedColors.byName.set("lightgrey",thx.color.NamedColors.lightgrey);
	thx.color.NamedColors.byName.set("light grey",thx.color.NamedColors.lightgrey);
	thx.color.NamedColors.byName.set("lightgreen",thx.color.NamedColors.lightgreen = thx.color.Rgb.fromInt(9498256));
	thx.color.NamedColors.byName.set("light green",thx.color.NamedColors.lightgreen);
	thx.color.NamedColors.byName.set("lightpink",thx.color.NamedColors.lightpink = thx.color.Rgb.fromInt(16758465));
	thx.color.NamedColors.byName.set("light pink",thx.color.NamedColors.lightpink);
	thx.color.NamedColors.byName.set("lightsalmon",thx.color.NamedColors.lightsalmon = thx.color.Rgb.fromInt(16752762));
	thx.color.NamedColors.byName.set("light salmon",thx.color.NamedColors.lightsalmon);
	thx.color.NamedColors.byName.set("lightseagreen",thx.color.NamedColors.lightseagreen = thx.color.Rgb.fromInt(2142890));
	thx.color.NamedColors.byName.set("light sea green",thx.color.NamedColors.lightseagreen);
	thx.color.NamedColors.byName.set("lightskyblue",thx.color.NamedColors.lightskyblue = thx.color.Rgb.fromInt(8900346));
	thx.color.NamedColors.byName.set("light sky blue",thx.color.NamedColors.lightskyblue);
	thx.color.NamedColors.byName.set("lightslategray",thx.color.NamedColors.lightslategray = thx.color.NamedColors.lightslategrey = thx.color.Rgb.fromInt(7833753));
	thx.color.NamedColors.byName.set("light slate gray",thx.color.NamedColors.lightslategray);
	thx.color.NamedColors.byName.set("lightslategrey",thx.color.NamedColors.lightslategrey);
	thx.color.NamedColors.byName.set("light slate grey",thx.color.NamedColors.lightslategrey);
	thx.color.NamedColors.byName.set("lightsteelblue",thx.color.NamedColors.lightsteelblue = thx.color.Rgb.fromInt(11584734));
	thx.color.NamedColors.byName.set("light steel blue",thx.color.NamedColors.lightsteelblue);
	thx.color.NamedColors.byName.set("lightyellow",thx.color.NamedColors.lightyellow = thx.color.Rgb.fromInt(16777184));
	thx.color.NamedColors.byName.set("light yellow",thx.color.NamedColors.lightyellow);
	thx.color.NamedColors.byName.set("lime",thx.color.NamedColors.lime = thx.color.Rgb.fromInt(65280));
	thx.color.NamedColors.byName.set("limegreen",thx.color.NamedColors.limegreen = thx.color.Rgb.fromInt(3329330));
	thx.color.NamedColors.byName.set("lime green",thx.color.NamedColors.limegreen);
	thx.color.NamedColors.byName.set("linen",thx.color.NamedColors.linen = thx.color.Rgb.fromInt(16445670));
	thx.color.NamedColors.byName.set("magenta",thx.color.NamedColors.magenta = thx.color.Rgb.fromInt(16711935));
	thx.color.NamedColors.byName.set("maroon",thx.color.NamedColors.maroon = thx.color.Rgb.fromInt(8388608));
	thx.color.NamedColors.byName.set("mediumaquamarine",thx.color.NamedColors.mediumaquamarine = thx.color.Rgb.fromInt(6737322));
	thx.color.NamedColors.byName.set("mediuma quamarine",thx.color.NamedColors.mediumaquamarine);
	thx.color.NamedColors.byName.set("mediumblue",thx.color.NamedColors.mediumblue = thx.color.Rgb.fromInt(205));
	thx.color.NamedColors.byName.set("medium blue",thx.color.NamedColors.mediumblue);
	thx.color.NamedColors.byName.set("mediumorchid",thx.color.NamedColors.mediumorchid = thx.color.Rgb.fromInt(12211667));
	thx.color.NamedColors.byName.set("medium orchid",thx.color.NamedColors.mediumorchid);
	thx.color.NamedColors.byName.set("mediumpurple",thx.color.NamedColors.mediumpurple = thx.color.Rgb.fromInt(9662683));
	thx.color.NamedColors.byName.set("medium purple",thx.color.NamedColors.mediumpurple);
	thx.color.NamedColors.byName.set("mediumseagreen",thx.color.NamedColors.mediumseagreen = thx.color.Rgb.fromInt(3978097));
	thx.color.NamedColors.byName.set("medium sea green",thx.color.NamedColors.mediumseagreen);
	thx.color.NamedColors.byName.set("mediumslateblue",thx.color.NamedColors.mediumslateblue = thx.color.Rgb.fromInt(8087790));
	thx.color.NamedColors.byName.set("medium slate blue",thx.color.NamedColors.mediumslateblue);
	thx.color.NamedColors.byName.set("mediumspringgreen",thx.color.NamedColors.mediumspringgreen = thx.color.Rgb.fromInt(64154));
	thx.color.NamedColors.byName.set("medium spring green",thx.color.NamedColors.mediumspringgreen);
	thx.color.NamedColors.byName.set("mediumturquoise",thx.color.NamedColors.mediumturquoise = thx.color.Rgb.fromInt(4772300));
	thx.color.NamedColors.byName.set("medium turquoise",thx.color.NamedColors.mediumturquoise);
	thx.color.NamedColors.byName.set("mediumvioletred",thx.color.NamedColors.mediumvioletred = thx.color.Rgb.fromInt(13047173));
	thx.color.NamedColors.byName.set("medium violet red",thx.color.NamedColors.mediumvioletred);
	thx.color.NamedColors.byName.set("midnightblue",thx.color.NamedColors.midnightblue = thx.color.Rgb.fromInt(1644912));
	thx.color.NamedColors.byName.set("midnight blue",thx.color.NamedColors.midnightblue);
	thx.color.NamedColors.byName.set("mintcream",thx.color.NamedColors.mintcream = thx.color.Rgb.fromInt(16121850));
	thx.color.NamedColors.byName.set("mint cream",thx.color.NamedColors.mintcream);
	thx.color.NamedColors.byName.set("mistyrose",thx.color.NamedColors.mistyrose = thx.color.Rgb.fromInt(16770273));
	thx.color.NamedColors.byName.set("misty rose",thx.color.NamedColors.mistyrose);
	thx.color.NamedColors.byName.set("moccasin",thx.color.NamedColors.moccasin = thx.color.Rgb.fromInt(16770229));
	thx.color.NamedColors.byName.set("navajowhite",thx.color.NamedColors.navajowhite = thx.color.Rgb.fromInt(16768685));
	thx.color.NamedColors.byName.set("navajo white",thx.color.NamedColors.navajowhite);
	thx.color.NamedColors.byName.set("navy",thx.color.NamedColors.navy = thx.color.Rgb.fromInt(128));
	thx.color.NamedColors.byName.set("oldlace",thx.color.NamedColors.oldlace = thx.color.Rgb.fromInt(16643558));
	thx.color.NamedColors.byName.set("old lace",thx.color.NamedColors.oldlace);
	thx.color.NamedColors.byName.set("olive",thx.color.NamedColors.olive = thx.color.Rgb.fromInt(8421376));
	thx.color.NamedColors.byName.set("olivedrab",thx.color.NamedColors.olivedrab = thx.color.Rgb.fromInt(7048739));
	thx.color.NamedColors.byName.set("olive drab",thx.color.NamedColors.olivedrab);
	thx.color.NamedColors.byName.set("orange",thx.color.NamedColors.orange = thx.color.Rgb.fromInt(16753920));
	thx.color.NamedColors.byName.set("orangered",thx.color.NamedColors.orangered = thx.color.Rgb.fromInt(16729344));
	thx.color.NamedColors.byName.set("orangered",thx.color.NamedColors.orangered);
	thx.color.NamedColors.byName.set("orchid",thx.color.NamedColors.orchid = thx.color.Rgb.fromInt(14315734));
	thx.color.NamedColors.byName.set("palegoldenrod",thx.color.NamedColors.palegoldenrod = thx.color.Rgb.fromInt(15657130));
	thx.color.NamedColors.byName.set("pale golden rod",thx.color.NamedColors.palegoldenrod);
	thx.color.NamedColors.byName.set("palegreen",thx.color.NamedColors.palegreen = thx.color.Rgb.fromInt(10025880));
	thx.color.NamedColors.byName.set("pale green",thx.color.NamedColors.palegreen);
	thx.color.NamedColors.byName.set("paleturquoise",thx.color.NamedColors.paleturquoise = thx.color.Rgb.fromInt(11529966));
	thx.color.NamedColors.byName.set("pale turquoise",thx.color.NamedColors.paleturquoise);
	thx.color.NamedColors.byName.set("palevioletred",thx.color.NamedColors.palevioletred = thx.color.Rgb.fromInt(14381203));
	thx.color.NamedColors.byName.set("pale violet red",thx.color.NamedColors.palevioletred);
	thx.color.NamedColors.byName.set("papayawhip",thx.color.NamedColors.papayawhip = thx.color.Rgb.fromInt(16773077));
	thx.color.NamedColors.byName.set("papaya whip",thx.color.NamedColors.papayawhip);
	thx.color.NamedColors.byName.set("peachpuff",thx.color.NamedColors.peachpuff = thx.color.Rgb.fromInt(16767673));
	thx.color.NamedColors.byName.set("peach puff",thx.color.NamedColors.peachpuff);
	thx.color.NamedColors.byName.set("peru",thx.color.NamedColors.peru = thx.color.Rgb.fromInt(13468991));
	thx.color.NamedColors.byName.set("pink",thx.color.NamedColors.pink = thx.color.Rgb.fromInt(16761035));
	thx.color.NamedColors.byName.set("plum",thx.color.NamedColors.plum = thx.color.Rgb.fromInt(14524637));
	thx.color.NamedColors.byName.set("powderblue",thx.color.NamedColors.powderblue = thx.color.Rgb.fromInt(11591910));
	thx.color.NamedColors.byName.set("powder blue",thx.color.NamedColors.powderblue);
	thx.color.NamedColors.byName.set("purple",thx.color.NamedColors.purple = thx.color.Rgb.fromInt(8388736));
	thx.color.NamedColors.byName.set("red",thx.color.NamedColors.red = thx.color.Rgb.fromInt(16711680));
	thx.color.NamedColors.byName.set("rosybrown",thx.color.NamedColors.rosybrown = thx.color.Rgb.fromInt(12357519));
	thx.color.NamedColors.byName.set("rosy brown",thx.color.NamedColors.rosybrown);
	thx.color.NamedColors.byName.set("royalblue",thx.color.NamedColors.royalblue = thx.color.Rgb.fromInt(4286945));
	thx.color.NamedColors.byName.set("royal blue",thx.color.NamedColors.royalblue);
	thx.color.NamedColors.byName.set("saddlebrown",thx.color.NamedColors.saddlebrown = thx.color.Rgb.fromInt(9127187));
	thx.color.NamedColors.byName.set("saddle brown",thx.color.NamedColors.saddlebrown);
	thx.color.NamedColors.byName.set("salmon",thx.color.NamedColors.salmon = thx.color.Rgb.fromInt(16416882));
	thx.color.NamedColors.byName.set("sandybrown",thx.color.NamedColors.sandybrown = thx.color.Rgb.fromInt(16032864));
	thx.color.NamedColors.byName.set("sandy brown",thx.color.NamedColors.sandybrown);
	thx.color.NamedColors.byName.set("seagreen",thx.color.NamedColors.seagreen = thx.color.Rgb.fromInt(3050327));
	thx.color.NamedColors.byName.set("sea green",thx.color.NamedColors.seagreen);
	thx.color.NamedColors.byName.set("seashell",thx.color.NamedColors.seashell = thx.color.Rgb.fromInt(16774638));
	thx.color.NamedColors.byName.set("sea shell",thx.color.NamedColors.seashell);
	thx.color.NamedColors.byName.set("sienna",thx.color.NamedColors.sienna = thx.color.Rgb.fromInt(10506797));
	thx.color.NamedColors.byName.set("silver",thx.color.NamedColors.silver = thx.color.Rgb.fromInt(12632256));
	thx.color.NamedColors.byName.set("skyblue",thx.color.NamedColors.skyblue = thx.color.Rgb.fromInt(8900331));
	thx.color.NamedColors.byName.set("sky blue",thx.color.NamedColors.skyblue);
	thx.color.NamedColors.byName.set("slateblue",thx.color.NamedColors.slateblue = thx.color.Rgb.fromInt(6970061));
	thx.color.NamedColors.byName.set("slate blue",thx.color.NamedColors.slateblue);
	thx.color.NamedColors.byName.set("slategray",thx.color.NamedColors.slategray = thx.color.NamedColors.slategrey = thx.color.Rgb.fromInt(7372944));
	thx.color.NamedColors.byName.set("slate gray",thx.color.NamedColors.slategray);
	thx.color.NamedColors.byName.set("slategrey",thx.color.NamedColors.slategrey);
	thx.color.NamedColors.byName.set("slate grey",thx.color.NamedColors.slategrey);
	thx.color.NamedColors.byName.set("snow",thx.color.NamedColors.snow = thx.color.Rgb.fromInt(16775930));
	thx.color.NamedColors.byName.set("springgreen",thx.color.NamedColors.springgreen = thx.color.Rgb.fromInt(65407));
	thx.color.NamedColors.byName.set("spring green",thx.color.NamedColors.springgreen);
	thx.color.NamedColors.byName.set("steelblue",thx.color.NamedColors.steelblue = thx.color.Rgb.fromInt(4620980));
	thx.color.NamedColors.byName.set("steel blue",thx.color.NamedColors.steelblue);
	thx.color.NamedColors.byName.set("tan",thx.color.NamedColors.tan = thx.color.Rgb.fromInt(13808780));
	thx.color.NamedColors.byName.set("teal",thx.color.NamedColors.teal = thx.color.Rgb.fromInt(32896));
	thx.color.NamedColors.byName.set("thistle",thx.color.NamedColors.thistle = thx.color.Rgb.fromInt(14204888));
	thx.color.NamedColors.byName.set("tomato",thx.color.NamedColors.tomato = thx.color.Rgb.fromInt(16737095));
	thx.color.NamedColors.byName.set("turquoise",thx.color.NamedColors.turquoise = thx.color.Rgb.fromInt(4251856));
	thx.color.NamedColors.byName.set("violet",thx.color.NamedColors.violet = thx.color.Rgb.fromInt(15631086));
	thx.color.NamedColors.byName.set("wheat",thx.color.NamedColors.wheat = thx.color.Rgb.fromInt(16113331));
	thx.color.NamedColors.byName.set("white",thx.color.NamedColors.white = thx.color.Rgb.fromInt(16777215));
	thx.color.NamedColors.byName.set("whitesmoke",thx.color.NamedColors.whitesmoke = thx.color.Rgb.fromInt(16119285));
	thx.color.NamedColors.byName.set("white smoke",thx.color.NamedColors.whitesmoke);
	thx.color.NamedColors.byName.set("yellow",thx.color.NamedColors.yellow = thx.color.Rgb.fromInt(16776960));
	thx.color.NamedColors.byName.set("yellowgreen",thx.color.NamedColors.yellowgreen = thx.color.Rgb.fromInt(10145074));
	thx.color.NamedColors.byName.set("yellow green",thx.color.NamedColors.yellowgreen);
}
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
thx.languages.De.getLanguage();
thx.cultures.DeDE.getCulture();
thx.cultures.EnIN.getCulture();
thx.languages.Ar.getLanguage();
thx.cultures.ArMA.getCulture();
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	Enum = { };
	Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
Strings._re = new EReg("[{](\\d+)(?::[^}]*)?[}]","m");
Strings._reSplitWC = new EReg("(\r\n|\n\r|\n|\r)","g");
Strings._reReduceWS = new EReg("\\s+","");
Strings._reStripTags = new EReg("(<[a-z]+[^>/]*/?>|</[a-z]+>)","i");
Strings._reFormat = new EReg("{(\\d+)(?::([a-zA-Z]+))?(?:,([^\"',}]+|'[^']+'|\"[^\"]+\"))?(?:,([^\"',}]+|'[^']+'|\"[^\"]+\"))?(?:,([^\"',}]+|'[^']+'|\"[^\"]+\"))?}","m");
Strings._reCollapse = new EReg("\\s+","g");
Strings.__ucwordsPattern = new EReg("[^a-zA-Z]([a-z])","");
Strings.__ucwordswsPattern = new EReg("\\s([a-z])","");
Strings.__alphaNumPattern = new EReg("^[a-z0-9]+$","i");
Strings.__digitsPattern = new EReg("^[0-9]+$","");
Strings._reInterpolateNumber = new EReg("[-+]?(?:\\d+\\.\\d+|\\d+\\.|\\.\\d+|\\d+)(?:[eE][-]?\\d+)?","");
thx.html.Attribute._fill = thx.collection.Set.ofArray("checked,compact,declare,defer,disabled,formnovalidate,novalidate,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,required,selected".split(","));
thx.svg.TestAll._renumber = new EReg("([+-]?\\d+(\\.\\d+)?(e-?\\d+)?)","");
thx.text.Inflections.uncountable_words = ["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"];
thx.text.Inflections.plural_rules = [{ pattern : new EReg("(m)an$","gi"), replace : "$1en"},{ pattern : new EReg("(pe)rson$","gi"), replace : "$1ople"},{ pattern : new EReg("(child)$","gi"), replace : "$1ren"},{ pattern : new EReg("(ax|test)is$","gi"), replace : "$1es"},{ pattern : new EReg("(octop|vir)us$","gi"), replace : "$1i"},{ pattern : new EReg("(alias|status)$","gi"), replace : "$1es"},{ pattern : new EReg("(bu)s$","gi"), replace : "$1ses"},{ pattern : new EReg("(buffal|tomat)o$","gi"), replace : "$1oes"},{ pattern : new EReg("([ti])um$","gi"), replace : "$1a"},{ pattern : new EReg("sis$","gi"), replace : "ses"},{ pattern : new EReg("(?:([^f])fe|([lr])f)$","gi"), replace : "$1$2ves"},{ pattern : new EReg("(hive)$","gi"), replace : "$1s"},{ pattern : new EReg("([^aeiouy]|qu)y$","gi"), replace : "$1ies"},{ pattern : new EReg("(x|ch|ss|sh)$","gi"), replace : "$1es"},{ pattern : new EReg("(matr|vert|ind)ix|ex$","gi"), replace : "$1ices"},{ pattern : new EReg("([m|l])ouse$","gi"), replace : "$1ice"},{ pattern : new EReg("^(ox)$","gi"), replace : "$1en"},{ pattern : new EReg("(quiz)$","gi"), replace : "$1zes"},{ pattern : new EReg("s$","gi"), replace : "s"},{ pattern : new EReg("$","gi"), replace : "s"}];
thx.text.Inflections.singular_rules = [{ pattern : new EReg("(m)en$","gi"), replace : "$1an"},{ pattern : new EReg("(pe)ople$","gi"), replace : "$1rson"},{ pattern : new EReg("(child)ren$","gi"), replace : "$1"},{ pattern : new EReg("([ti])a$","gi"), replace : "$1um"},{ pattern : new EReg("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"), replace : "$1$2sis"},{ pattern : new EReg("(hive)s$","gi"), replace : "$1"},{ pattern : new EReg("(tive)s$","gi"), replace : "$1"},{ pattern : new EReg("([lr])ves$","gi"), replace : "$1f"},{ pattern : new EReg("([^fo])ves$","gi"), replace : "$1fe"},{ pattern : new EReg("([^aeiouy]|qu)ies$","gi"), replace : "$1y"},{ pattern : new EReg("(s)eries$","gi"), replace : "$1eries"},{ pattern : new EReg("(m)ovies$","gi"), replace : "$1ovie"},{ pattern : new EReg("(x|ch|ss|sh)es$","gi"), replace : "$1"},{ pattern : new EReg("([m|l])ice$","gi"), replace : "$1ouse"},{ pattern : new EReg("(bus)es$","gi"), replace : "$1"},{ pattern : new EReg("(o)es$","gi"), replace : "$1"},{ pattern : new EReg("(shoe)s$","gi"), replace : "$1"},{ pattern : new EReg("(cris|ax|test)es$","gi"), replace : "$1is"},{ pattern : new EReg("(octop|vir)i$","gi"), replace : "$1us"},{ pattern : new EReg("(alias|status)es$","gi"), replace : "$1"},{ pattern : new EReg("^(ox)en","gi"), replace : "$1"},{ pattern : new EReg("(vert|ind)ices$","gi"), replace : "$1ex"},{ pattern : new EReg("(matr)ices$","gi"), replace : "$1ix"},{ pattern : new EReg("(quiz)zes$","gi"), replace : "$1"},{ pattern : new EReg("s$","gi"), replace : ""}];
thx.math.Const.TWO_PI = 6.283185307179586477;
thx.math.Const.PI = 3.141592653589793238;
thx.math.Const.HALF_PI = 1.570796326794896619;
thx.math.Const.TO_DEGREE = 57.29577951308232088;
thx.math.Const.TO_RADIAN = 0.01745329251994329577;
thx.math.Const.LN10 = 2.302585092994046;
thx.math.Const.E = 2.71828182845904523536;
Floats._reparse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
Ints._reparse = new EReg("^([+-])?\\d+$","");
thx.math.scale.Linears._default_color = new thx.color.Hsl(0,0,0);
thx.validation.EmailValidator._reEmail = new EReg("^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$","i");
thx.validation.EmailValidator._reEmailDomain = new EReg("\\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$","i");
thx.error.Error.errorPositionPattern = "{0}.{1}({2}): ";
utest.ui.text.HtmlReport.platform = "javascript";
thx.json.TestJson.tests = [{ c : null, s : "null"},{ c : "a\nb", s : "\"a\\nb\""},{ c : 1, s : "1"},{ c : -0.1, s : "-0.1"},{ c : -1.234e-100, s : "-1.234e-100"},{ c : true, s : "true"},{ c : false, s : "false"},{ c : [], s : "[]"},{ c : [null,true], s : "[null,true]"},{ c : { name : "haxe", stars : 5}, s : "{\"name\":\"haxe\",\"stars\":5}"}];
thx.validation.SingleLineValidator._re = new EReg("(\n|\r)","m");
js.Lib.onerror = null;
thx.date.TestDateParser.now = Date.fromString("2011-05-31 16:20:00");
thx.date.DateParser.daynumeric = "0?[1-9]|[1-2][0-9]|3[0-1]";
thx.date.DateParser.months = thx.cultures.EnUS.getCulture().date.months.slice(0,-1).map(function(d,i) {
	return d.toLowerCase();
});
thx.date.DateParser.shortmonths = thx.cultures.EnUS.getCulture().date.abbrMonths.slice(0,-1).map(function(d,i) {
	return d.toLowerCase();
});
thx.date.DateParser.days = thx.cultures.EnUS.getCulture().date.days.map(function(d,i) {
	return d.toLowerCase();
});
thx.date.DateParser.shortdays = thx.cultures.EnUS.getCulture().date.abbrDays.map(function(d,i) {
	return d.toLowerCase();
});
thx.date.DateParser.sfullmonths = thx.date.DateParser.months.join("|");
thx.date.DateParser.sshortmonths = thx.date.DateParser.shortmonths.join("|");
thx.date.DateParser.sfulldays = thx.date.DateParser.days.join("|");
thx.date.DateParser.sshortdays = thx.date.DateParser.shortdays.join("|");
thx.date.DateParser.day = "(0?[0-9]|[1-2][0-9]|3[0-1])(?:st|nd|rd|th)?";
thx.date.DateParser.month = "(?:0?[1-9]|1[0-2])";
thx.date.DateParser.hour = "(?:0?[0-9]|1[0-9]|2[0-3])";
thx.date.DateParser.hhour = "(?:0[0-9]|1[0-2])";
thx.date.DateParser.hohour = "(?:0?[0-9]|1[0-2])";
thx.date.DateParser.fminsec = "(?:0[0-9]|[1-5][0-9])";
thx.date.DateParser.minsec = "(?:0?[0-9]|[1-5][0-9])";
thx.date.DateParser.ampm = "(?:(?:in\\s+the\\s+)?(am|pm|evening|morning|afternoon))";
thx.date.DateParser.daypart = "(?:(?:in\\s+the\\s+)?(evening|morning|afternoon|sunsrise|sunset|dawn|dusk|noon|mid-day|midday|mid-night|midnight))";
thx.date.DateParser.period = "minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years|second|seconds";
thx.date.DateParser.dateexp = new EReg("(?:(?:" + "\\b(" + thx.date.DateParser.sfullmonths + ")\\s+" + thx.date.DateParser.day + "(?:\\s*,\\s*(\\d{2,4}))?\\b" + ")|(?:" + "\\b(" + thx.date.DateParser.sshortmonths + ")\\s+" + thx.date.DateParser.day + "(?:\\s*,?\\s*(\\d{2,4}))?\\b" + ")|(?:" + "\\b" + thx.date.DateParser.day + "\\s+(" + thx.date.DateParser.sfullmonths + ")(?:\\s+(\\d{2,4}))?\\b" + ")|(?:" + "\\b" + thx.date.DateParser.day + "\\s+(" + thx.date.DateParser.sshortmonths + ")(?:\\s+(\\d{2,4}))?\\b" + ")|(?:" + "\\b(?:" + thx.date.DateParser.day + "\\s+)?(" + thx.date.DateParser.sfullmonths + ")\\s+(\\d{2,4})\\b" + ")|(?:" + "\\b(?:" + thx.date.DateParser.day + "\\s+)?(" + thx.date.DateParser.sshortmonths + ")\\s+(\\d{2,4})\\b" + ")|(?:" + "\\b(" + thx.date.DateParser.month + ")/" + thx.date.DateParser.day + "(?:/(\\d{2,4}))?\\b" + ")|(?:" + "\\b" + thx.date.DateParser.day + "/(" + thx.date.DateParser.month + ")(?:/(\\d{2,4}))?\\b" + ")|(?:" + "\\b(\\d{2,4})-(" + thx.date.DateParser.month + ")-" + thx.date.DateParser.day + "\\b" + ")|(?:" + "^\\s*" + thx.date.DateParser.day + "\\s*$" + "))","i");
thx.date.DateParser.absdateexp = new EReg("(?:(?:" + "\\b(today|now|this\\s+second|tomorrow|yesterday)\\b" + ")|(?:" + "\\b(?:(next|last|this)\\s+)?(" + thx.date.DateParser.sfullmonths + ")\\b" + ")|(?:" + "\\b(?:(next|last|this)\\s+)?(" + thx.date.DateParser.sfulldays + ")\\b" + ")|(?:" + "\\b(?:(next|last|this)\\s+)?(" + thx.date.DateParser.sshortmonths + ")\\b" + ")|(?:" + "\\b(?:(next|last|this)\\s+)?(" + thx.date.DateParser.sshortdays + ")\\b" + "))","i");
thx.date.DateParser.relexp = new EReg("(?:(?:" + "\\b(plus\\s+|minus\\s|\\+|-|in)\\s*(\\d+)?\\s+(" + thx.date.DateParser.period + ")\\b" + ")|(?:" + "\\b(\\d+)?\\s+(" + thx.date.DateParser.period + ")\\s+(from|before|hence|after|ago)?\\b" + "))","i");
thx.date.DateParser.timeexp = new EReg("(?:\\bat\\s+)?" + "(?:(?:" + "\\b(" + thx.date.DateParser.hohour + "):(" + thx.date.DateParser.minsec + ")\\s*" + thx.date.DateParser.ampm + "\\b" + ")|(?:" + "\\b(" + thx.date.DateParser.hour + "):(" + thx.date.DateParser.minsec + ")(?:[:](" + thx.date.DateParser.minsec + ")(?:\\.(\\d+))?)?\\b" + ")|(?:" + "(?:^|\\s+)(" + thx.date.DateParser.hhour + ")(" + thx.date.DateParser.fminsec + ")\\s*" + thx.date.DateParser.ampm + "?(?:\\s+|$)" + ")|(?:" + "\\b(" + thx.date.DateParser.hohour + ")\\s*" + thx.date.DateParser.ampm + "\\b" + ")|(?:" + "\\b" + thx.date.DateParser.daypart + "\\b" + "))","i");
thx.text.ERegs._escapePattern = new EReg("[*+?|{[()^$.# \\\\]","");
thx.svg.LineInternals.arcOffset = -Math.PI / 2;
thx.svg.LineInternals.arcMax = 2 * Math.PI - 1e-6;
thx.svg.LineInternals._lineBasisBezier1 = [0,2 / 3,1 / 3,0];
thx.svg.LineInternals._lineBasisBezier2 = [0,1 / 3,2 / 3,0];
thx.svg.LineInternals._lineBasisBezier3 = [0,1 / 6,2 / 3,1 / 6];
Dates._reparse = new EReg("^\\d{4}-\\d\\d-\\d\\d(( |T)\\d\\d:\\d\\d(:\\d\\d(\\.\\d{1,3})?)?)?Z?$","");
thx.html.Element._preserve = thx.collection.Set.ofArray("pre,textarea".split(","));
thx.html.Element._empty = thx.collection.Set.ofArray("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(","));
thx.html.Element._block = thx.collection.Set.ofArray("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,textarea,tfoot,th,thead,title,tr,ul".split(","));
thx.html.Element._inline = thx.collection.Set.ofArray("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,tt,u,var".split(","));
thx.html.Element._break = thx.collection.Set.ofArray("br,hr".split(","));
thx.html.Element._closeSelf = thx.collection.Set.ofArray("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr".split(","));
thx.html.Element._special = thx.collection.Set.ofArray("script,style".split(","));
thx.math.scale.TestLinearT.data = [4.0,8,16,32,64];
thx.svg.Symbol.sqrt3 = Math.sqrt(3);
thx.svg.Symbol.tan30 = Math.tan(30 * Math.PI / 180);
thx.csv.TestCsv.s = "Year,Make,Model,Description,Price\n1997,Ford,E350,\"ac, abs, moon\",3000.99\n1999,Chevy,\"Venture \"\"Extended Edition\"\"\",,4900.99\n1999,Chevy,\"Venture \"\"Extended Edition, Very Large\"\"\",,5000.99\n1996,Jeep,Grand Cherokee,\"MUST SELL!\nair, moon roof, loaded\",4799.99";
thx.csv.TestCsv.t = "Year;Make;Model;Description;Price\n1997;Ford;E350;\"ac, abs, moon\";3000,99\n1999;Chevy;\"Venture \"\"Extended Edition\"\"\";;4900,99\n1999;Chevy;\"Venture \"\"Extended Edition, Very Large\"\"\";;5000,99\n1996;Jeep;Grand Cherokee;\"MUST SELL!\nair, moon roof, loaded\";4799,99";
thx.csv.TestCsv.v = [["Year","Make","Model","Description","Price"],[1997,"Ford","E350","ac, abs, moon",3000.99],[1999,"Chevy","Venture \"Extended Edition\"","",4900.99],[1999,"Chevy","Venture \"Extended Edition, Very Large\"","",5000.99],[1996,"Jeep","Grand Cherokee","MUST SELL!\nair, moon roof, loaded",4799.99]];
utest.TestHandler.POLLING_TIME = 10;
thx.ini.IniDecoder.linesplitter = new EReg("[^\\\\](#|;)","");
thx.ini.IniEncoder.decoded = ["\\",String.fromCharCode(0),String.fromCharCode(7),String.fromCharCode(8),"\t","\r","\n",";","#","=",":"];
thx.ini.IniEncoder.encoded = ["\\\\","\\0","\\a","\\b","\\t","\\r","\\n","\\;","\\#","\\=","\\:"];
thx.ini.TestIni.s = "\nroot=value\n\t\n[owner]\nname=John Doe\norganization=Acme Widgets Inc.\n\n[database]\nserver=192.0.2.62\nport=143\nfile = \"payroll.dat\"\n\n[database.more]\n\nsequence = 1, 2, 3\n\n";
thx.ini.TestIni.s2 = "root=value\n\n[database]\nserver=192.0.2.62\nport=143\nfile=payroll.dat\n\n[database.more]\nsequence=1, 2, 3\n\n[owner]\nname=John Doe\norganization=Acme Widgets Inc.";
thx.ini.TestIni.v = { root : "value", owner : { name : "John Doe", organization : "Acme Widgets Inc."}, database : { server : "192.0.2.62", port : 143, file : "payroll.dat", more : { sequence : [1,2,3]}}};
thx.math.scale.TestOrdinal.data = [4,8,16,32,64];
thx.validation.UrlValidator._reUrl = new EReg("^(http|ftp|https)://[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?$","");
thx.html.HtmlParser.startTag = new EReg("^<(\\w+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(/?)>","");
thx.html.HtmlParser.endTag = new EReg("^</(\\w+)[^>]*>","");
thx.html.HtmlParser.attr = new EReg("(\\w+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?","g");
thx.html.HtmlParser.comment = new EReg("<!--(.*?)-->","g");
thx.html.HtmlParser.cdata = new EReg("<!\\[CDATA\\[(.*?)]]>","g");
thx.html.HtmlParser.doctype = new EReg("<!DOCTYPE(.*?)>","gi");
thx.html.HtmlParser.declaration = new EReg("<?xml(.*?)>","g");
thx.color.Colors._reParse = new EReg("^(?:(hsl|rgb|rgba|cmyk)\\(([^)]+)\\))|(?:(?:0x|#)([a-f0-9]{3,6}))$","i");
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
TestObjects.testObject = { a : 1, b : 2, c : 3};
Xml.enode = new EReg("^<([a-zA-Z0-9:._-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:._-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
TestAll.main()