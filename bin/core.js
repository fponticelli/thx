$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof thx=='undefined') thx = {}
if(!thx.util) thx.util = {}
thx.util.TestTypeServiceLocator = function(p) {
}
thx.util.TestTypeServiceLocator.__name__ = ["thx","util","TestTypeServiceLocator"];
thx.util.TestTypeServiceLocator.addTests = function(runner) {
	runner.addCase(new thx.util.TestTypeServiceLocator());
}
thx.util.TestTypeServiceLocator.main = function() {
	var runner = new utest.Runner();
	thx.util.TestTypeServiceLocator.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.util.TestTypeServiceLocator.prototype.testBind = function() {
	var locator = new thx.util.TypeServiceLocator().bind(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert["is"](o,thx.util.type.ITest,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 21, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
	utest.Assert["is"](o,thx.util.type.TestImplementation,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 22, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
	utest.Assert.equals("hi",o.sayHello(),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 23, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
}
thx.util.TestTypeServiceLocator.prototype.testUnbinded = function() {
	var locator = new thx.util.TypeServiceLocator();
	utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 29, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	locator.unbinded = function(cls) {
		if("thx.util.type.ITest" == Type.getClassName(cls)) return null;
		try {
			return Type.createInstance(cls,[]);
		} catch( e ) {
			return null;
		}
	};
	utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 41, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	utest.Assert.notNull(locator.get(thx.util.type.TestImplementation),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 42, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	utest.Assert["is"](locator.get(thx.util.type.TestImplementation),thx.util.type.TestImplementation,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 43, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
}
thx.util.TestTypeServiceLocator.prototype.testInstance = function() {
	var locator = new thx.util.TypeServiceLocator().instance(thx.util.type.ITest,new thx.util.type.TestImplementation());
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 50, className : "thx.util.TestTypeServiceLocator", methodName : "testInstance"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 53, className : "thx.util.TestTypeServiceLocator", methodName : "testInstance"});
}
thx.util.TestTypeServiceLocator.prototype.testMultipleInstances = function() {
	var locator = new thx.util.TypeServiceLocator().bind(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 60, className : "thx.util.TestTypeServiceLocator", methodName : "testMultipleInstances"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 63, className : "thx.util.TestTypeServiceLocator", methodName : "testMultipleInstances"});
}
thx.util.TestTypeServiceLocator.prototype.testMemoize = function() {
	var locator = new thx.util.TypeServiceLocator().memoize(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 70, className : "thx.util.TestTypeServiceLocator", methodName : "testMemoize"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 73, className : "thx.util.TestTypeServiceLocator", methodName : "testMemoize"});
}
thx.util.TestTypeServiceLocator.prototype.__class__ = thx.util.TestTypeServiceLocator;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Strings = function() { }
Strings.__name__ = ["Strings"];
Strings.format = function(pattern,values,nullstring,culture) {
	if(nullstring == null) nullstring = "null";
	return (Strings.formatf(pattern,nullstring,culture))(values);
	if(null == values) values = [];
	var buf = new StringBuf();
	while(true) {
		if(!Strings._reFormat.match(pattern)) {
			buf.b[buf.b.length] = pattern;
			break;
		}
		var pos = Std.parseInt(Strings._reFormat.matched(1));
		var f = Strings._reFormat.matched(2);
		if(f == "") f = null;
		var p = null;
		var params = [];
		var _g = 3;
		while(_g < 20) {
			var i = _g++;
			p = Strings._reFormat.matched(i);
			if(p == null || p == "") break;
			params.push(thx.culture.FormatParams.cleanQuotes(p));
		}
		pattern = Strings._reFormat.matchedRight();
		buf.b[buf.b.length] = Strings._reFormat.matchedLeft();
		buf.b[buf.b.length] = Dynamics.format(values[pos],f,params,nullstring,culture);
	}
	return buf.b.join("");
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
		var f = [Strings._reFormat.matched(2)];
		if(f[0] == "") f[0] = null;
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
		var df = [Dynamics.formatf(f[0],params,nullstring,culture)];
		buf.push(((function() {
			return function($t1,a1) {
				var f = [$t1];
				return (function(f) {
					return function(a2) {
						return f[0](a1,a2);
					};
				})(f);
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
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var elipsis = params.length < 2?"...":params[1];
		return function(v) {
			if(v.length > len) return v.substr(0,len) + elipsis; else return v;
		};
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
	return Strings.__ucwordsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),$closure(Strings,"__upperMatch"));
}
Strings.ucwordsws = function(value) {
	return Strings.__ucwordswsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),$closure(Strings,"__upperMatch"));
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
Strings.ascending = function(a,b) {
	return a < b?-1:a > b?1:0;
}
Strings.descending = function(a,b) {
	return a > b?-1:a < b?1:0;
}
Strings.interpolate = function(v,a,b,interpolator) {
	return (Strings.interpolatef(a,b,interpolator))(v);
}
Strings.interpolatef = function(a,b,interpolator) {
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
				var f = [Floats.interpolatef(fa[i],fb[i],interpolator)];
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
Strings.prototype.__class__ = Strings;
if(!thx.collections) thx.collections = {}
thx.collections.Set = function(p) {
	if( p === $_ ) return;
	this._v = [];
}
thx.collections.Set.__name__ = ["thx","collections","Set"];
thx.collections.Set.ofArray = function(arr) {
	var set = new thx.collections.Set();
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		set.add(item);
	}
	return set;
}
thx.collections.Set.prototype._v = null;
thx.collections.Set.prototype.add = function(v) {
	this._v.remove(v);
	this._v.push(v);
}
thx.collections.Set.prototype.remove = function(v) {
	return this._v.remove(v);
}
thx.collections.Set.prototype.exists = function(v) {
	var _g = 0, _g1 = this._v;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		if(t == v) return true;
	}
	return false;
}
thx.collections.Set.prototype.iterator = function() {
	return this._v.iterator();
}
thx.collections.Set.prototype.array = function() {
	return this._v.copy();
}
thx.collections.Set.prototype.toString = function() {
	return "{" + this._v.join(", ") + "}";
}
thx.collections.Set.prototype.__class__ = thx.collections.Set;
if(!thx.html) thx.html = {}
thx.html.Attribute = function() { }
thx.html.Attribute.__name__ = ["thx","html","Attribute"];
thx.html.Attribute.isFill = function(el) {
	return thx.html.Attribute._fill.exists(el);
}
thx.html.Attribute.prototype.__class__ = thx.html.Attribute;
if(typeof utest=='undefined') utest = {}
if(!utest.ui) utest.ui = {}
if(!utest.ui.common) utest.ui.common = {}
utest.ui.common.ResultAggregator = function(runner,flattenPackage) {
	if( runner === $_ ) return;
	if(flattenPackage == null) flattenPackage = false;
	if(runner == null) throw "runner argument is null";
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add($closure(this,"start"));
	runner.onProgress.add($closure(this,"progress"));
	runner.onComplete.add($closure(this,"complete"));
	this.onStart = new utest.Notifier();
	this.onComplete = new utest.Dispatcher();
	this.onProgress = new utest.Dispatcher();
}
utest.ui.common.ResultAggregator.__name__ = ["utest","ui","common","ResultAggregator"];
utest.ui.common.ResultAggregator.prototype.runner = null;
utest.ui.common.ResultAggregator.prototype.flattenPackage = null;
utest.ui.common.ResultAggregator.prototype.root = null;
utest.ui.common.ResultAggregator.prototype.onStart = null;
utest.ui.common.ResultAggregator.prototype.onComplete = null;
utest.ui.common.ResultAggregator.prototype.onProgress = null;
utest.ui.common.ResultAggregator.prototype.start = function(runner) {
	this.root = new utest.ui.common.PackageResult(null);
	this.onStart.dispatch();
}
utest.ui.common.ResultAggregator.prototype.getOrCreatePackage = function(pack,flat,ref) {
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
utest.ui.common.ResultAggregator.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	if(pack.existsClass(cls)) return pack.getClass(cls);
	var c = new utest.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	return c;
}
utest.ui.common.ResultAggregator.prototype.createFixture = function(result) {
	var f = new utest.ui.common.FixtureResult(result.method);
	var $it0 = result.assertations.iterator();
	while( $it0.hasNext() ) {
		var assertation = $it0.next();
		f.add(assertation);
	}
	return f;
}
utest.ui.common.ResultAggregator.prototype.progress = function(e) {
	this.root.addResult(e.result,this.flattenPackage);
	this.onProgress.dispatch(e);
}
utest.ui.common.ResultAggregator.prototype.complete = function(runner) {
	this.onComplete.dispatch(this.root);
}
utest.ui.common.ResultAggregator.prototype.__class__ = utest.ui.common.ResultAggregator;
if(!thx.color) thx.color = {}
thx.color.Rgb = function(r,g,b) {
	if( r === $_ ) return;
	this.red = Ints.clamp(r,0,255);
	this.green = Ints.clamp(g,0,255);
	this.blue = Ints.clamp(b,0,255);
}
thx.color.Rgb.__name__ = ["thx","color","Rgb"];
thx.color.Rgb.fromFloats = function(r,g,b) {
	return new thx.color.Rgb(Ints.interpolate(r,0,255),Ints.interpolate(g,0,255),Ints.interpolate(b,0,255));
}
thx.color.Rgb.fromInt = function(v) {
	return new thx.color.Rgb(v >> 16 & 255,v >> 8 & 255,v & 255);
}
thx.color.Rgb.equals = function(a,b) {
	return a.red == b.red && a.green == b.green && a.blue == b.blue;
}
thx.color.Rgb.darker = function(color,t,interpolator) {
	return new thx.color.Rgb(Ints.interpolate(t * color.red,0,255,interpolator),Ints.interpolate(t * color.green,0,255,interpolator),Ints.interpolate(t * color.blue,0,255,interpolator));
}
thx.color.Rgb.interpolate = function(a,b,t,interpolator) {
	return new thx.color.Rgb(Ints.interpolate(t,a.red,b.red,interpolator),Ints.interpolate(t,a.green,b.green,interpolator),Ints.interpolate(t,a.blue,b.blue,interpolator));
}
thx.color.Rgb.interpolatef = function(a,b,interpolator) {
	var r = Ints.interpolatef(a.red,b.red), g = Ints.interpolatef(a.green,b.green), b1 = Ints.interpolatef(a.blue,b.blue);
	return function(t) {
		return new thx.color.Rgb(r(t),g(t),b1(t));
	};
}
thx.color.Rgb.contrast = function(c) {
	var nc = thx.color.Hsl.toHsl(c);
	if(nc.lightness < .5) return new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness + 0.5); else return new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness - 0.5);
}
thx.color.Rgb.contrastBW = function(c) {
	var nc = thx.color.Hsl.toHsl(c);
	if(nc.lightness < .5) return new thx.color.Hsl(nc.hue,nc.saturation,1.0); else return new thx.color.Hsl(nc.hue,nc.saturation,0);
}
thx.color.Rgb.prototype.blue = null;
thx.color.Rgb.prototype.green = null;
thx.color.Rgb.prototype.red = null;
thx.color.Rgb.prototype["int"] = function() {
	return (this.red & 255) << 16 | (this.green & 255) << 8 | this.blue & 255;
}
thx.color.Rgb.prototype.hex = function(prefix) {
	if(prefix == null) prefix = "";
	return prefix + StringTools.hex(this.red,2) + StringTools.hex(this.green,2) + StringTools.hex(this.blue,2);
}
thx.color.Rgb.prototype.toCss = function() {
	return this.hex("#");
}
thx.color.Rgb.prototype.toRgbString = function() {
	return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
}
thx.color.Rgb.prototype.toString = function() {
	return this.toRgbString();
}
thx.color.Rgb.prototype.__class__ = thx.color.Rgb;
thx.color.Cmyk = function(cyan,magenta,yellow,black) {
	if( cyan === $_ ) return;
	thx.color.Rgb.call(this,Ints.interpolate(Floats.normalize(1 - cyan - black),0,255,null),Ints.interpolate(Floats.normalize(1 - magenta - black),0,255,null),Ints.interpolate(Floats.normalize(1 - yellow - black),0,255,null));
	this.cyan = Floats.normalize(cyan);
	this.magenta = Floats.normalize(magenta);
	this.yellow = Floats.normalize(yellow);
	this.black = Floats.normalize(black);
}
thx.color.Cmyk.__name__ = ["thx","color","Cmyk"];
thx.color.Cmyk.__super__ = thx.color.Rgb;
for(var k in thx.color.Rgb.prototype ) thx.color.Cmyk.prototype[k] = thx.color.Rgb.prototype[k];
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
thx.color.Cmyk.darker = function(color,t,interpolator) {
	var v = t * color.black;
	return new thx.color.Cmyk(color.cyan,color.magenta,color.yellow,null == interpolator?v:interpolator(v,0,1));
}
thx.color.Cmyk.interpolate = function(a,b,t,interpolator) {
	return new thx.color.Cmyk(Floats.interpolate(t,a.cyan,b.cyan,interpolator),Floats.interpolate(t,a.magenta,b.magenta,interpolator),Floats.interpolate(t,a.yellow,b.yellow,interpolator),Floats.interpolate(t,a.black,b.black,interpolator));
}
thx.color.Cmyk.prototype.black = null;
thx.color.Cmyk.prototype.cyan = null;
thx.color.Cmyk.prototype.magenta = null;
thx.color.Cmyk.prototype.yellow = null;
thx.color.Cmyk.prototype.toCmykString = function() {
	return "cmyk(" + this.cyan + "," + this.magenta + "," + this.yellow + "," + this.black + ")";
}
thx.color.Cmyk.prototype.__class__ = thx.color.Cmyk;
Dynamics = function() { }
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
			if(c == String) return Strings.formatOne(v,param,params,culture); else if(c == Array) return Arrays.format(v,param,params,culture); else if(c == Date) return Dates.format(v,param,params,culture); else return Std.string(v);
			break;
		default:
			return (function($this) {
				var $r;
				throw new thx.error.Error("Unsupported type format: {0}",null,Type["typeof"](v),{ fileName : "Dynamics.hx", lineNumber : 40, className : "Dynamics", methodName : "formatf"});
				return $r;
			}(this));
		}
	};
}
Dynamics.interpolate = function(v,a,b,interpolator) {
	return (Dynamics.interpolatef(a,b,interpolator))(v);
}
Dynamics.interpolatef = function(a,b,interpolator) {
	var ta = Type["typeof"](a);
	if(!Type.enumEq(ta,Type["typeof"](b))) throw new thx.error.Error("arguments a {0} and b {0} differ in types",[ta,Type["typeof"](b)],null,{ fileName : "Dynamics.hx", lineNumber : 54, className : "Dynamics", methodName : "interpolatef"});
	var $e = (ta);
	switch( $e[1] ) {
	case 0:
		return function(_) {
			return null;
		};
	case 1:
		return Ints.interpolatef(a,b,interpolator);
	case 2:
		return Floats.interpolatef(a,b,interpolator);
	case 3:
		return Bools.interpolatef(a,b,interpolator);
	case 4:
		return Dynamics.interpolatef(a,b,interpolator);
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "String":
			return Strings.interpolatef(a,b,interpolator);
		case "Date":
			return Dates.interpolatef(a,b,interpolator);
		default:
			throw new thx.error.Error("cannot interpolate on instances of {0}",null,name,{ fileName : "Dynamics.hx", lineNumber : 68, className : "Dynamics", methodName : "interpolatef"});
		}
		break;
	default:
		throw new thx.error.Error("cannot interpolate on functions/enums/unknown",null,null,{ fileName : "Dynamics.hx", lineNumber : 70, className : "Dynamics", methodName : "interpolatef"});
	}
}
Dynamics.prototype.__class__ = Dynamics;
if(!thx.svg) thx.svg = {}
thx.svg.TestArc = function(p) {
}
thx.svg.TestArc.__name__ = ["thx","svg","TestArc"];
thx.svg.TestArc.prototype.testDefault = function() {
	var arc = new thx.svg.Arc().innerRadius(0).outerRadius(1).startAngle(0).endAngle(Math.PI);
	utest.Assert.equals("M6.123031769111886e-17,-1A1,1 0 1,1 6.123031769111886e-17,1L0,0Z",arc.shape(),null,{ fileName : "TestArc.hx", lineNumber : 15, className : "thx.svg.TestArc", methodName : "testDefault"});
}
thx.svg.TestArc.prototype.__class__ = thx.svg.TestArc;
if(!thx.validation) thx.validation = {}
thx.validation.TestAll = function() { }
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
thx.validation.TestAll.prototype.assertValidation = function(result,ok,message,pos) {
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
thx.validation.TestAll.prototype.__class__ = thx.validation.TestAll;
thx.validation.TestSingleLine = function(p) {
}
thx.validation.TestSingleLine.__name__ = ["thx","validation","TestSingleLine"];
thx.validation.TestSingleLine.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestSingleLine.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestSingleLine.prototype.testValidation = function() {
	var validator = new thx.validation.SingleLineValidator();
	this.assertValidation(validator.validate("a b"),true,null,{ fileName : "TestSingleLine.hx", lineNumber : 15, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
	this.assertValidation(validator.validate("a\nb"),false,null,{ fileName : "TestSingleLine.hx", lineNumber : 16, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
}
thx.validation.TestSingleLine.prototype.__class__ = thx.validation.TestSingleLine;
if(!thx.load) thx.load = {}
thx.load.ILoader = function() { }
thx.load.ILoader.__name__ = ["thx","load","ILoader"];
thx.load.ILoader.prototype.load = function(completeHandler,errorHandler) {
}
thx.load.ILoader.prototype.__class__ = thx.load.ILoader;
thx.color.TestColors = function(p) {
}
thx.color.TestColors.__name__ = ["thx","color","TestColors"];
thx.color.TestColors.prototype.testParse = function() {
	var ab = thx.color.NamedColors.aliceblue;
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("aliceblue")),null,{ fileName : "TestColors.hx", lineNumber : 17, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("#F0F8FF")),null,{ fileName : "TestColors.hx", lineNumber : 18, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("rgb(240,248,255)")),null,{ fileName : "TestColors.hx", lineNumber : 19, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#ABC")),null,{ fileName : "TestColors.hx", lineNumber : 20, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#abc")),null,{ fileName : "TestColors.hx", lineNumber : 21, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,50%,75%)")),null,{ fileName : "TestColors.hx", lineNumber : 22, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,0.5,0.75)")),null,{ fileName : "TestColors.hx", lineNumber : 23, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.raises(function() {
		thx.color.Colors.parse("alice blue");
	},Dynamic,null,{ fileName : "TestColors.hx", lineNumber : 25, className : "thx.color.TestColors", methodName : "testParse"});
}
thx.color.TestColors.prototype.__class__ = thx.color.TestColors;
thx.html.HtmlHandler = function() { }
thx.html.HtmlHandler.__name__ = ["thx","html","HtmlHandler"];
thx.html.HtmlHandler.prototype.start = null;
thx.html.HtmlHandler.prototype.end = null;
thx.html.HtmlHandler.prototype.chars = null;
thx.html.HtmlHandler.prototype.comment = null;
thx.html.HtmlHandler.prototype.doctype = null;
thx.html.HtmlHandler.prototype.declaration = null;
thx.html.HtmlHandler.prototype.__class__ = thx.html.HtmlHandler;
thx.html.DomHandler = function(p) {
	if( p === $_ ) return;
	this.document = Xml.createDocument();
	this.current = this.document;
}
thx.html.DomHandler.__name__ = ["thx","html","DomHandler"];
thx.html.DomHandler.prototype.document = null;
thx.html.DomHandler.prototype.current = null;
thx.html.DomHandler.prototype.start = function(tag,attrs,unary) {
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
thx.html.DomHandler.prototype.end = function(tag) {
	this.current = this.current.getParent();
}
thx.html.DomHandler.prototype.chars = function(text) {
	this.current.addChild(Xml.createPCData(text));
}
thx.html.DomHandler.prototype.comment = function(text) {
	this.current.addChild(Xml.createComment(text));
}
thx.html.DomHandler.prototype.doctype = function(text) {
	this.current.addChild(Xml.createDocType(text));
}
thx.html.DomHandler.prototype.declaration = function(text) {
	this.current.addChild(Xml.createProlog(text));
}
thx.html.DomHandler.prototype.__class__ = thx.html.DomHandler;
thx.html.DomHandler.__interfaces__ = [thx.html.HtmlHandler];
if(!thx.math) thx.math = {}
if(!thx.math.scale) thx.math.scale = {}
thx.math.scale.TestAll = function(p) {
}
thx.math.scale.TestAll.__name__ = ["thx","math","scale","TestAll"];
thx.math.scale.TestAll.addTests = function(runner) {
	runner.addCase(new thx.math.scale.TestLinear());
	runner.addCase(new thx.math.scale.TestLinearString());
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
thx.math.scale.TestAll.prototype.assertScale = function(scalef,expected,values) {
	var _g1 = 0, _g = expected.length;
	while(_g1 < _g) {
		var i = _g1++;
		utest.Assert.floatEquals(expected[i],scalef(values[i],i),1e-3,null,{ fileName : "TestAll.hx", lineNumber : 36, className : "thx.math.scale.TestAll", methodName : "assertScale"});
	}
}
thx.math.scale.TestAll.prototype.__class__ = thx.math.scale.TestAll;
thx.math.scale.TestLinear = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestLinear.__name__ = ["thx","math","scale","TestLinear"];
thx.math.scale.TestLinear.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLinear.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLinear.prototype.testDomain = function() {
	var scale = new thx.math.scale.Linear();
	var expected = [-0.5,0.0,0.5,1.0,1.5];
	var values = [-0.5,0.0,0.5,1.0,1.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestLinear.prototype.testDomain12 = function() {
	var scale = new thx.math.scale.Linear().domain(1,2);
	var expected = [-0.5,0.0,0.5,1.0,1.5];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestLinear.prototype.testTicks = function() {
	var scale = new thx.math.scale.Linear();
	utest.Assert.equals("0, 1",scale.modulo(1).ticks().map(function(d,_) {
		return scale.tickFormat(d);
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 36, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.5, 1.0",scale.modulo(2).ticks().map(function(d,_) {
		return scale.tickFormat(d);
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 37, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.2, 0.4, 0.6, 0.8, 1.0",scale.modulo(5).ticks().map(function(d,_) {
		return scale.tickFormat(d);
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 38, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0",scale.modulo(10).ticks().map(function(d,_) {
		return scale.tickFormat(d);
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 39, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
}
thx.math.scale.TestLinear.prototype.__class__ = thx.math.scale.TestLinear;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
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
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
if(!utest._Dispatcher) utest._Dispatcher = {}
utest._Dispatcher.EventException = { __ename__ : ["utest","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] }
utest._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
utest._Dispatcher.EventException.StopPropagation.toString = $estr;
utest._Dispatcher.EventException.StopPropagation.__enum__ = utest._Dispatcher.EventException;
utest.Dispatcher = function(p) {
	if( p === $_ ) return;
	this.handlers = new Array();
}
utest.Dispatcher.__name__ = ["utest","Dispatcher"];
utest.Dispatcher.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Dispatcher.prototype.handlers = null;
utest.Dispatcher.prototype.add = function(h) {
	this.handlers.push(h);
	return h;
}
utest.Dispatcher.prototype.remove = function(h) {
	var _g1 = 0, _g = this.handlers.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
	}
	return null;
}
utest.Dispatcher.prototype.clear = function() {
	this.handlers = new Array();
}
utest.Dispatcher.prototype.dispatch = function(e) {
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
		} else ;
		throw(exc);
	}
}
utest.Dispatcher.prototype.has = function() {
	return this.handlers.length > 0;
}
utest.Dispatcher.prototype.__class__ = utest.Dispatcher;
utest.Notifier = function(p) {
	if( p === $_ ) return;
	this.handlers = new Array();
}
utest.Notifier.__name__ = ["utest","Notifier"];
utest.Notifier.stop = function() {
	throw utest._Dispatcher.EventException.StopPropagation;
}
utest.Notifier.prototype.handlers = null;
utest.Notifier.prototype.add = function(h) {
	this.handlers.push(h);
	return h;
}
utest.Notifier.prototype.remove = function(h) {
	var _g1 = 0, _g = this.handlers.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
	}
	return null;
}
utest.Notifier.prototype.clear = function() {
	this.handlers = new Array();
}
utest.Notifier.prototype.dispatch = function() {
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
		} else ;
		throw(exc);
	}
}
utest.Notifier.prototype.has = function() {
	return this.handlers.length > 0;
}
utest.Notifier.prototype.__class__ = utest.Notifier;
if(!thx.js) thx.js = {}
thx.js.Access = function(selection) {
	if( selection === $_ ) return;
	this.selection = selection;
}
thx.js.Access.__name__ = ["thx","js","Access"];
thx.js.Access.getData = function(d) {
	return Reflect.field(d,"__data__");
}
thx.js.Access.setData = function(d,v) {
	d["__data__"] = v;
}
thx.js.Access.emptyHtmlDom = function(v) {
	return { __data__ : v};
}
thx.js.Access.eventName = function(event) {
	return "__on" + event;
}
thx.js.Access.getEvent = function(d,event) {
	return Reflect.field(d,"__on" + event);
}
thx.js.Access.hasEvent = function(d,event) {
	return null != Reflect.field(d,"__on" + event);
}
thx.js.Access.addEvent = function(d,event,listener) {
	d["__on" + event] = listener;
}
thx.js.Access.removeEvent = function(d,event) {
	Reflect.deleteField(d,"__on" + event);
}
thx.js.Access.setTransition = function(d,id) {
	if(Reflect.hasField(d,"__transition__")) Reflect.field(d,"__transition__").owner = id; else d["__transition__"] = { owner : id};
}
thx.js.Access.getTransition = function(d) {
	return Reflect.field(d,"__transition__");
}
thx.js.Access.resetTransition = function(d) {
	Reflect.deleteField(d,"__transition__");
}
thx.js.Access.prototype.selection = null;
thx.js.Access.prototype._that = function() {
	return this.selection;
}
thx.js.Access.prototype.__class__ = thx.js.Access;
thx.js.AccessAttribute = function(name,selection) {
	if( name === $_ ) return;
	thx.js.Access.call(this,selection);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
}
thx.js.AccessAttribute.__name__ = ["thx","js","AccessAttribute"];
thx.js.AccessAttribute.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessAttribute.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessAttribute.prototype.name = null;
thx.js.AccessAttribute.prototype.qname = null;
thx.js.AccessAttribute.prototype.get = function() {
	var n = this.name, q = this.qname;
	return this.selection.firstNode(function(node) {
		return q == null?node.getAttribute(n):node.getAttributeNS(q.space,q.local);
	});
}
thx.js.AccessAttribute.prototype.remove = function() {
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			node.removeAttribute(n);
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			node.removeAttributeNS(q.space,q.local);
		});
	}
	return this.selection;
}
thx.js.AccessAttribute.prototype.string = function(v) {
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			node.setAttribute(n,v);
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			node.setAttributeNS(q.space,q.local,v);
		});
	}
	return this.selection;
}
thx.js.AccessAttribute.prototype["float"] = function(v) {
	var s = "" + v;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			node.setAttribute(n,s);
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			node.setAttributeNS(q.space,q.local,s);
		});
	}
	return this.selection;
}
thx.js.AccessAttribute.prototype.__class__ = thx.js.AccessAttribute;
thx.js.AccessDataAttribute = function(name,selection) {
	if( name === $_ ) return;
	thx.js.AccessAttribute.call(this,name,selection);
}
thx.js.AccessDataAttribute.__name__ = ["thx","js","AccessDataAttribute"];
thx.js.AccessDataAttribute.__super__ = thx.js.AccessAttribute;
for(var k in thx.js.AccessAttribute.prototype ) thx.js.AccessDataAttribute.prototype[k] = thx.js.AccessAttribute.prototype[k];
thx.js.AccessDataAttribute.prototype.stringf = function(v) {
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttribute(n); else node.setAttribute(n,s);
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttributeNS(n); else node.setAttributeNS(q.space,q.local,s);
		});
	}
	return this.selection;
}
thx.js.AccessDataAttribute.prototype.floatf = function(v) {
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttribute(n); else node.setAttribute(n,"" + s);
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttributeNS(n); else node.setAttributeNS(q.space,q.local,"" + s);
		});
	}
	return this.selection;
}
thx.js.AccessDataAttribute.prototype.data = function() {
	return this.stringf(function(d,_) {
		return "" + d;
	});
}
thx.js.AccessDataAttribute.prototype.__class__ = thx.js.AccessDataAttribute;
Bools = function() { }
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
Bools.interpolate = function(v,a,b,interpolator) {
	return (Bools.interpolatef(a,b,interpolator))(v);
}
Bools.interpolatef = function(a,b,interpolator) {
	if(a == b) return function(_) {
		return a;
	}; else {
		var f = Floats.interpolatef(0,1,interpolator);
		return function(v) {
			return f(v) < 0.5?a:b;
		};
	}
}
Bools.prototype.__class__ = Bools;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
thx.js.AccessHtml = function(selection) {
	if( selection === $_ ) return;
	thx.js.Access.call(this,selection);
}
thx.js.AccessHtml.__name__ = ["thx","js","AccessHtml"];
thx.js.AccessHtml.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessHtml.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessHtml.prototype.get = function() {
	return this.selection.firstNode(function(node) {
		return node.innerHTML;
	});
}
thx.js.AccessHtml.prototype.string = function(v) {
	this.selection.eachNode(function(node,i) {
		node.innerHTML = v;
	});
	return this.selection;
}
thx.js.AccessHtml.prototype.clear = function() {
	this.selection.eachNode(function(node,i) {
		node.innerHTML = "";
	});
	return this.selection;
}
thx.js.AccessHtml.prototype["float"] = function(v) {
	this.selection.eachNode(function(node,i) {
		node.innerHTML = "" + v;
	});
	return this.selection;
}
thx.js.AccessHtml.prototype.__class__ = thx.js.AccessHtml;
thx.js.AccessDataHtml = function(selection) {
	if( selection === $_ ) return;
	thx.js.AccessHtml.call(this,selection);
}
thx.js.AccessDataHtml.__name__ = ["thx","js","AccessDataHtml"];
thx.js.AccessDataHtml.__super__ = thx.js.AccessHtml;
for(var k in thx.js.AccessHtml.prototype ) thx.js.AccessDataHtml.prototype[k] = thx.js.AccessHtml.prototype[k];
thx.js.AccessDataHtml.prototype.stringf = function(v) {
	this.selection.eachNode(function(node,i) {
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) s = "";
		node.innerHTML = s;
	});
	return this.selection;
}
thx.js.AccessDataHtml.prototype.floatf = function(v) {
	this.selection.eachNode(function(node,i) {
		var f = v(Reflect.field(node,"__data__"),i);
		if(null == f) node.innerHTML = ""; else node.innerHTML = "" + f;
	});
	return this.selection;
}
thx.js.AccessDataHtml.prototype.data = function() {
	return this.stringf(function(d,_) {
		return "" + d;
	});
}
thx.js.AccessDataHtml.prototype.__class__ = thx.js.AccessDataHtml;
if(!thx.text) thx.text = {}
thx.text.Inflections = function() { }
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
thx.text.Inflections.prototype.__class__ = thx.text.Inflections;
thx.js.BaseSelection = function(groups) {
	if( groups === $_ ) return;
	this.groups = groups;
}
thx.js.BaseSelection.__name__ = ["thx","js","BaseSelection"];
thx.js.BaseSelection.bindJoin = function(join,group,groupData,update,enter,exit) {
	var n = group.nodes.length, m = groupData.length, updateHtmlDoms = [], exitHtmlDoms = [], enterHtmlDoms = [], node, nodeData;
	var nodeByKey = new Hash(), keys = [], key, j = groupData.length;
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		node = group.nodes[i];
		key = join(Reflect.field(node,"__data__"),i);
		if(nodeByKey.exists(key)) exitHtmlDoms[j++] = node; else nodeByKey.set(key,node);
		keys.push(key);
	}
	var _g = 0;
	while(_g < m) {
		var i = _g++;
		node = nodeByKey.get(key = join(nodeData = groupData[i],i));
		if(null != node) {
			node["__data__"] = nodeData;
			updateHtmlDoms[i] = node;
			enterHtmlDoms[i] = exitHtmlDoms[i] = null;
		} else {
			node = { __data__ : nodeData};
			enterHtmlDoms[i] = node;
			updateHtmlDoms[i] = exitHtmlDoms[i] = null;
		}
		nodeByKey.remove(key);
	}
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		if(nodeByKey.exists(keys[i])) exitHtmlDoms[i] = group.nodes[i];
	}
	var enterGroup = new thx.js.Group(enterHtmlDoms);
	enterGroup.parentNode = group.parentNode;
	enter.push(enterGroup);
	var updateGroup = new thx.js.Group(updateHtmlDoms);
	updateGroup.parentNode = group.parentNode;
	update.push(updateGroup);
	var exitGroup = new thx.js.Group(exitHtmlDoms);
	exitGroup.parentNode = group.parentNode;
	exit.push(exitGroup);
}
thx.js.BaseSelection.bind = function(group,groupData,update,enter,exit) {
	var n0 = Ints.min(group.nodes.length,groupData.length), n1 = Ints.max(group.nodes.length,groupData.length), updateHtmlDoms = [], exitHtmlDoms = [], enterHtmlDoms = [], node, nodeData;
	var _g = 0;
	while(_g < n0) {
		var i = _g++;
		node = group.nodes[i];
		nodeData = groupData[i];
		if(null != node) {
			node["__data__"] = nodeData;
			updateHtmlDoms[i] = node;
			enterHtmlDoms[i] = exitHtmlDoms[i] = null;
		} else {
			node = { __data__ : nodeData};
			enterHtmlDoms[i] = node;
			updateHtmlDoms[i] = exitHtmlDoms[i] = null;
		}
	}
	var _g1 = n0, _g = groupData.length;
	while(_g1 < _g) {
		var i = _g1++;
		node = { __data__ : groupData[i]};
		enterHtmlDoms[i] = node;
		updateHtmlDoms[i] = exitHtmlDoms[i] = null;
	}
	var _g = groupData.length;
	while(_g < n1) {
		var i = _g++;
		exitHtmlDoms[i] = group.nodes[i];
		enterHtmlDoms[i] = updateHtmlDoms[i] = null;
	}
	var enterGroup = new thx.js.Group(enterHtmlDoms);
	enterGroup.parentNode = group.parentNode;
	enter.push(enterGroup);
	var updateGroup = new thx.js.Group(updateHtmlDoms);
	updateGroup.parentNode = group.parentNode;
	update.push(updateGroup);
	var exitGroup = new thx.js.Group(exitHtmlDoms);
	exitGroup.parentNode = group.parentNode;
	exit.push(exitGroup);
}
thx.js.BaseSelection.prototype.parentNode = null;
thx.js.BaseSelection.prototype.groups = null;
thx.js.BaseSelection.prototype.select = function(selector) {
	return this._select(function(el) {
		return thx.js.Dom.selectionEngine.select(selector,el);
	});
}
thx.js.BaseSelection.prototype.selectAll = function(selector) {
	return this._selectAll(function(el) {
		return thx.js.Dom.selectionEngine.selectAll(selector,el);
	});
}
thx.js.BaseSelection.prototype._this = function() {
	return this;
}
thx.js.BaseSelection.prototype.append = function(name) {
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		return n;
	};
	var appendNS = function(node) {
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		return n;
	};
	return this._select(null == qname?append:appendNS);
}
thx.js.BaseSelection.prototype.remove = function() {
	return this.eachNode(function(node,i) {
		var parent = node.parentNode;
		if(null != parent) parent.removeChild(node);
	});
}
thx.js.BaseSelection.prototype.eachNode = function(f) {
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		group.each(f);
	}
	return this;
}
thx.js.BaseSelection.prototype.insert = function(name,before,beforeSelector) {
	var qname = thx.xml.Namespace.qualify(name);
	var insertDom = function(node) {
		var n = js.Lib.document.createElement(name);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node,node)[0]);
		return n;
	};
	var insertNsDom = function(node) {
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node,node)[0]);
		return n;
	};
	return this._select(null == qname?insertDom:insertNsDom);
}
thx.js.BaseSelection.prototype.sortNode = function(comparator) {
	var m = this.groups.length;
	var _g = 0;
	while(_g < m) {
		var i = _g++;
		var group = this.groups[i];
		group.nodes.sort(comparator);
		var n = group.nodes.length;
		var prev = group.nodes[0];
		var _g1 = 1;
		while(_g1 < n) {
			var j = _g1++;
			var node = group.nodes[j];
			if(null != node) {
				if(null != prev) prev.parentNode.insertBefore(node,prev.nextSibling);
				prev = node;
			}
		}
	}
	return this;
}
thx.js.BaseSelection.prototype.firstNode = function(f) {
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) return f(node);
		}
	}
	return null;
}
thx.js.BaseSelection.prototype.node = function() {
	return this.firstNode(function(n) {
		return n;
	});
}
thx.js.BaseSelection.prototype.empty = function() {
	return null == this.firstNode(function(n) {
		return n;
	});
}
thx.js.BaseSelection.prototype.filterNode = function(f) {
	var subgroups = [], subgroup;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var sg = new thx.js.Group(subgroup = []);
		sg.parentNode = group.parentNode;
		subgroups.push(sg);
		var i = -1;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node && f(node,++i)) subgroup.push(node);
		}
	}
	return this.createSelection(subgroups);
}
thx.js.BaseSelection.prototype.onNode = function(type,listener) {
	var i = type.indexOf("."), typo = i < 0?type:type.substr(0,i);
	return this.eachNode(function(n,i1) {
		var l = function(e) {
			var o = thx.js.Dom.event;
			thx.js.Dom.event = e;
			try {
				listener(n,i1);
			} catch( e1 ) {
			}
			thx.js.Dom.event = o;
		};
		if(null != Reflect.field(n,"__on" + type)) {
			n.removeEventListener(typo,Reflect.field(n,"__on" + type),false);
			Reflect.deleteField(n,"__on" + type);
		}
		if(null != listener) {
			n["__on" + type] = l;
			n.addEventListener(typo,l,false);
		}
	});
}
thx.js.BaseSelection.prototype.createSelection = function(groups) {
	return (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Selection.hx", lineNumber : 522, className : "thx.js.BaseSelection", methodName : "createSelection"});
		return $r;
	}(this));
}
thx.js.BaseSelection.prototype._select = function(selectf) {
	var subgroups = [], subgroup, subnode, node;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		subgroups.push(subgroup = new thx.js.Group([]));
		subgroup.parentNode = group.parentNode;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node1 = $it0.next();
			if(null != node1) {
				subgroup.nodes.push(subnode = selectf(node1));
				if(null != subnode) subnode["__data__"] = Reflect.field(node1,"__data__");
			} else subgroup.nodes.push(null);
		}
	}
	return this.createSelection(subgroups);
}
thx.js.BaseSelection.prototype._selectAll = function(selectallf) {
	var subgroups = [], subgroup;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) {
				subgroups.push(subgroup = new thx.js.Group(selectallf(node)));
				subgroup.parentNode = node;
			}
		}
	}
	return this.createSelection(subgroups);
}
thx.js.BaseSelection.prototype.__class__ = thx.js.BaseSelection;
thx.js.UnboundSelection = function(groups) {
	if( groups === $_ ) return;
	thx.js.BaseSelection.call(this,groups);
}
thx.js.UnboundSelection.__name__ = ["thx","js","UnboundSelection"];
thx.js.UnboundSelection.__super__ = thx.js.BaseSelection;
for(var k in thx.js.BaseSelection.prototype ) thx.js.UnboundSelection.prototype[k] = thx.js.BaseSelection.prototype[k];
thx.js.UnboundSelection.prototype.html = function() {
	return new thx.js.AccessHtml(this);
}
thx.js.UnboundSelection.prototype.text = function() {
	return new thx.js.AccessText(this);
}
thx.js.UnboundSelection.prototype.attr = function(name) {
	return new thx.js.AccessAttribute(name,this);
}
thx.js.UnboundSelection.prototype.classed = function() {
	return new thx.js.AccessClassed(this);
}
thx.js.UnboundSelection.prototype.property = function(name) {
	return new thx.js.AccessProperty(name,this);
}
thx.js.UnboundSelection.prototype.style = function(name) {
	return new thx.js.AccessStyle(name,this);
}
thx.js.UnboundSelection.prototype.transition = function() {
	return new thx.js.UnboundTransition(this);
}
thx.js.UnboundSelection.prototype.data = function(d,join) {
	var update = [], enter = [], exit = [];
	if(null == join) {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bind(group,d,update,enter,exit);
		}
	} else {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bindJoin(join,group,d,update,enter,exit);
		}
	}
	return new thx.js.DataChoice(update,enter,exit);
}
thx.js.UnboundSelection.prototype.selectAllData = function(selector) {
	var selection = this.selectAll(selector);
	return new thx.js.ResumeSelection(selection.groups);
}
thx.js.UnboundSelection.prototype.__class__ = thx.js.UnboundSelection;
thx.js.Selection = function(groups) {
	if( groups === $_ ) return;
	thx.js.UnboundSelection.call(this,groups);
}
thx.js.Selection.__name__ = ["thx","js","Selection"];
thx.js.Selection.__super__ = thx.js.UnboundSelection;
for(var k in thx.js.UnboundSelection.prototype ) thx.js.Selection.prototype[k] = thx.js.UnboundSelection.prototype[k];
thx.js.Selection.create = function(groups) {
	return new thx.js.Selection(groups);
}
thx.js.Selection.prototype.createSelection = function(groups) {
	return new thx.js.Selection(groups);
}
thx.js.Selection.prototype.__class__ = thx.js.Selection;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
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
js.Lib.prototype.__class__ = js.Lib;
thx.js.Group = function(nodes) {
	if( nodes === $_ ) return;
	this.nodes = nodes;
}
thx.js.Group.__name__ = ["thx","js","Group"];
thx.js.Group.prototype.parentNode = null;
thx.js.Group.prototype.nodes = null;
thx.js.Group.prototype.each = function(f) {
	var _g1 = 0, _g = this.nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(null != this.nodes[i]) f(this.nodes[i],i);
	}
}
thx.js.Group.prototype.iterator = function() {
	return this.nodes.iterator();
}
thx.js.Group.prototype.get = function(i) {
	return this.nodes[i];
}
thx.js.Group.prototype.count = function() {
	return this.nodes.length;
}
thx.js.Group.prototype.push = function(node) {
	this.nodes.push(node);
}
thx.js.Group.prototype.sort = function(comparator) {
	this.nodes.sort(comparator);
}
thx.js.Group.prototype.__class__ = thx.js.Group;
thx.js.ISelectorEngine = function() { }
thx.js.ISelectorEngine.__name__ = ["thx","js","ISelectorEngine"];
thx.js.ISelectorEngine.prototype.select = null;
thx.js.ISelectorEngine.prototype.selectAll = null;
thx.js.ISelectorEngine.prototype.__class__ = thx.js.ISelectorEngine;
thx.js.SizzleEngine = function(p) {
}
thx.js.SizzleEngine.__name__ = ["thx","js","SizzleEngine"];
thx.js.SizzleEngine.prototype.select = function(selector,node) {
	return thx.js.Sizzle.select(selector,node)[0];
}
thx.js.SizzleEngine.prototype.selectNode = function(n,p) {
	return thx.js.Sizzle.select(n,p)[0];
}
thx.js.SizzleEngine.prototype.selectAll = function(selector,node) {
	return thx.js.Sizzle.uniqueSort(thx.js.Sizzle.select(selector,node));
}
thx.js.SizzleEngine.prototype.__class__ = thx.js.SizzleEngine;
thx.js.SizzleEngine.__interfaces__ = [thx.js.ISelectorEngine];
thx.js.Dom = function() { }
thx.js.Dom.__name__ = ["thx","js","Dom"];
thx.js.Dom.select = function(selector) {
	return thx.js.Dom.doc.select(selector);
}
thx.js.Dom.selectAll = function(selector) {
	return thx.js.Dom.doc.selectAll(selector);
}
thx.js.Dom.selectNode = function(node) {
	return thx.js.Selection.create([new thx.js.Group([node])]);
}
thx.js.Dom.selectNodeData = function(node) {
	return thx.js.ResumeSelection.create([new thx.js.Group([node])]);
}
thx.js.Dom.event = null;
thx.js.Dom.prototype.__class__ = thx.js.Dom;
thx.html.Html = function() { }
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
		return $closure(thx.html.Html,"toXml");
	case 4:
	case 6:
	case 5:
	case 7:
		return $closure(Xml,"parse");
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
thx.html.Html.prototype.__class__ = thx.html.Html;
thx.math.scale.NumericScale = function(p) {
	if( p === $_ ) return;
	this.x0 = 0;
	this.x1 = 1;
	this.y0 = 0;
	this.y1 = 1;
	this.kx = 1;
	this.ky = 1;
	this.f = $closure(Floats,"interpolatef");
	this.i = this.f(this.y0,this.y1,null);
	this._clamp = false;
	this._clampmin = 0.0;
	this._clampmax = 1.0;
}
thx.math.scale.NumericScale.__name__ = ["thx","math","scale","NumericScale"];
thx.math.scale.NumericScale.prototype.x0 = null;
thx.math.scale.NumericScale.prototype.x1 = null;
thx.math.scale.NumericScale.prototype.y0 = null;
thx.math.scale.NumericScale.prototype.y1 = null;
thx.math.scale.NumericScale.prototype.kx = null;
thx.math.scale.NumericScale.prototype.ky = null;
thx.math.scale.NumericScale.prototype.f = null;
thx.math.scale.NumericScale.prototype.i = null;
thx.math.scale.NumericScale.prototype._clamp = null;
thx.math.scale.NumericScale.prototype._clampmin = null;
thx.math.scale.NumericScale.prototype._clampmax = null;
thx.math.scale.NumericScale.prototype.scale = function(x,_) {
	x = (x - this.x0) * this.kx;
	return this.i(this._clamp?Floats.clamp(x,this._clampmin,this._clampmax):x);
}
thx.math.scale.NumericScale.prototype.invert = function(y,_) {
	return (y - this.y0) * this.ky + this.x0;
}
thx.math.scale.NumericScale.prototype.getDomain = function() {
	return [this.x0,this.x1];
}
thx.math.scale.NumericScale.prototype.domain = function(x0,x1) {
	this.x0 = x0;
	this.x1 = x1;
	this.kx = 1 / (x1 - x0);
	this.ky = (x1 - x0) / (this.y1 - this.y0);
	return this;
}
thx.math.scale.NumericScale.prototype.getRange = function() {
	return [this.y0,this.y1];
}
thx.math.scale.NumericScale.prototype.range = function(y0,y1) {
	this.y0 = y0;
	this.y1 = y1;
	this.ky = (this.x1 - this.x0) / (y1 - y0);
	this.i = this.f(y0,y1,null);
	return this;
}
thx.math.scale.NumericScale.prototype.rangeRound = function(x0,x1) {
	this.x0 = x0;
	this.x1 = x1;
	this.range(x0,x1);
	this.interpolatef($closure(Ints,"interpolatef"));
	return this;
}
thx.math.scale.NumericScale.prototype.getInterpolate = function() {
	return this.f;
}
thx.math.scale.NumericScale.prototype.interpolatef = function(x) {
	this.i = (this.f = x)(this.y0,this.y1,null);
	return this;
}
thx.math.scale.NumericScale.prototype.getClamp = function() {
	return this._clamp;
}
thx.math.scale.NumericScale.prototype.clamp = function(v) {
	this._clamp = v;
	return this;
}
thx.math.scale.NumericScale.prototype.getClampMin = function() {
	return this._clampmin;
}
thx.math.scale.NumericScale.prototype.clampMin = function(v) {
	this._clampmin = v;
	return this;
}
thx.math.scale.NumericScale.prototype.getClampMax = function() {
	return this._clampmax;
}
thx.math.scale.NumericScale.prototype.clampMax = function(v) {
	this._clampmax = v;
	return this;
}
thx.math.scale.NumericScale.prototype.ticks = function() {
	return (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 98, className : "thx.math.scale.NumericScale", methodName : "ticks"});
		return $r;
	}(this));
}
thx.math.scale.NumericScale.prototype.tickFormat = function(v,i) {
	return (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 103, className : "thx.math.scale.NumericScale", methodName : "tickFormat"});
		return $r;
	}(this));
}
thx.math.scale.NumericScale.prototype.transform = function(scale,t,a,b) {
	var range = this.getRange().map(function(v,_) {
		return (v - t) / scale;
	});
	this.domain(a,b);
	var r = range.map($closure(this,"invert"));
	this.domain(r[0],r[1]);
	return this;
}
thx.math.scale.NumericScale.prototype._this = function() {
	return this;
}
thx.math.scale.NumericScale.prototype.__class__ = thx.math.scale.NumericScale;
thx.math.scale.Pow = function(p) {
	if( p === $_ ) return;
	thx.math.scale.NumericScale.call(this);
	this.tick = new thx.math.scale.Linear();
	this._exponent = 1;
	this.powb = this.powp = function(v) {
		return v;
	};
}
thx.math.scale.Pow.__name__ = ["thx","math","scale","Pow"];
thx.math.scale.Pow.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Pow.prototype[k] = thx.math.scale.NumericScale.prototype[k];
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
thx.math.scale.Pow.prototype.tick = null;
thx.math.scale.Pow.prototype._exponent = null;
thx.math.scale.Pow.prototype.powp = null;
thx.math.scale.Pow.prototype.powb = null;
thx.math.scale.Pow.prototype.scale = function(x,i) {
	return thx.math.scale.NumericScale.prototype.scale.call(this,this.powp(x));
}
thx.math.scale.Pow.prototype.invert = function(x,i) {
	return this.powb(thx.math.scale.NumericScale.prototype.invert.call(this,x));
}
thx.math.scale.Pow.prototype.getDomain = function() {
	var me = this;
	return thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
		return me.powb(d);
	});
}
thx.math.scale.Pow.prototype.domain = function(x0,x1) {
	var pow = (x0 < x1?x0:x1) < 0?$closure(thx.math.scale.Pow,"_pown"):$closure(thx.math.scale.Pow,"_pow");
	this.powp = pow(this._exponent);
	this.powb = pow(1.0 / this._exponent);
	thx.math.scale.NumericScale.prototype.domain.call(this,this.powp(x0),this.powp(x1));
	this.tick.domain(x0,x1);
	return this;
}
thx.math.scale.Pow.prototype.ticks = function() {
	return this.tick.ticks();
}
thx.math.scale.Pow.prototype.tickFormat = function(v,i) {
	return this.tick.tickFormat(v,i);
}
thx.math.scale.Pow.prototype.getModulo = function() {
	return this.tick.getModulo();
}
thx.math.scale.Pow.prototype.modulo = function(v) {
	this.tick.modulo(v);
	return this;
}
thx.math.scale.Pow.prototype.getExponent = function() {
	return this._exponent;
}
thx.math.scale.Pow.prototype.exponent = function(x) {
	var dom = this.getDomain();
	this._exponent = x;
	this.domain(dom[0],dom[1]);
	return this;
}
thx.math.scale.Pow.prototype.__class__ = thx.math.scale.Pow;
thx.util.TestTypeFactory = function(p) {
}
thx.util.TestTypeFactory.__name__ = ["thx","util","TestTypeFactory"];
thx.util.TestTypeFactory.addTests = function(runner) {
	runner.addCase(new thx.util.TestTypeFactory());
}
thx.util.TestTypeFactory.main = function() {
	var runner = new utest.Runner();
	thx.util.TestTypeFactory.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.util.TestTypeFactory.prototype.testBind = function() {
	var factory = new thx.util.TypeFactory().bind(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert["is"](o,thx.util.type.ITest,null,{ fileName : "TestTypeFactory.hx", lineNumber : 21, className : "thx.util.TestTypeFactory", methodName : "testBind"});
	utest.Assert["is"](o,thx.util.type.TestImplementation,null,{ fileName : "TestTypeFactory.hx", lineNumber : 22, className : "thx.util.TestTypeFactory", methodName : "testBind"});
	utest.Assert.equals("hi",o.sayHello(),null,{ fileName : "TestTypeFactory.hx", lineNumber : 23, className : "thx.util.TestTypeFactory", methodName : "testBind"});
}
thx.util.TestTypeFactory.prototype.testUnbinded = function() {
	var factory = new thx.util.TypeFactory();
	utest.Assert.isNull(factory.get(thx.util.type.ITest),null,{ fileName : "TestTypeFactory.hx", lineNumber : 29, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	factory.unbinded = function(cls) {
		if("thx.util.type.ITest" == Type.getClassName(cls)) return null;
		try {
			return Type.createInstance(cls,[]);
		} catch( e ) {
			return null;
		}
	};
	utest.Assert.isNull(factory.get(thx.util.type.ITest),null,{ fileName : "TestTypeFactory.hx", lineNumber : 41, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	utest.Assert.notNull(factory.get(thx.util.type.TestImplementation),null,{ fileName : "TestTypeFactory.hx", lineNumber : 42, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	utest.Assert["is"](factory.get(thx.util.type.TestImplementation),thx.util.type.TestImplementation,null,{ fileName : "TestTypeFactory.hx", lineNumber : 43, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
}
thx.util.TestTypeFactory.prototype.testInstance = function() {
	var factory = new thx.util.TypeFactory().instance(thx.util.type.ITest,new thx.util.type.TestImplementation());
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 50, className : "thx.util.TestTypeFactory", methodName : "testInstance"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 53, className : "thx.util.TestTypeFactory", methodName : "testInstance"});
}
thx.util.TestTypeFactory.prototype.testMultipleInstances = function() {
	var factory = new thx.util.TypeFactory().bind(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 60, className : "thx.util.TestTypeFactory", methodName : "testMultipleInstances"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 63, className : "thx.util.TestTypeFactory", methodName : "testMultipleInstances"});
}
thx.util.TestTypeFactory.prototype.testMemoize = function() {
	var factory = new thx.util.TypeFactory().memoize(thx.util.type.ITest,function() {
		return new thx.util.type.TestImplementation();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 70, className : "thx.util.TestTypeFactory", methodName : "testMemoize"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 73, className : "thx.util.TestTypeFactory", methodName : "testMemoize"});
}
thx.util.TestTypeFactory.prototype.__class__ = thx.util.TestTypeFactory;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
thx.color.Hsl = function(h,s,l) {
	if( h === $_ ) return;
	this.hue = h = Floats.circularWrap(h,360);
	this.saturation = s = Floats.normalize(s);
	this.lightness = l = Floats.normalize(l);
	thx.color.Rgb.call(this,Ints.interpolate(thx.color.Hsl._c(h + 120,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h - 120,s,l),0,255,null));
}
thx.color.Hsl.__name__ = ["thx","color","Hsl"];
thx.color.Hsl.__super__ = thx.color.Rgb;
for(var k in thx.color.Rgb.prototype ) thx.color.Hsl.prototype[k] = thx.color.Rgb.prototype[k];
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
thx.color.Hsl.darker = function(color,t,interpolator) {
	var v = color.lightness / t;
	return new thx.color.Hsl(color.hue,color.saturation,null == interpolator?v:interpolator(v,0,1));
}
thx.color.Hsl.interpolate = function(a,b,t,interpolator) {
	return new thx.color.Hsl(Floats.interpolate(t,a.hue,b.hue,interpolator),Floats.interpolate(t,a.saturation,b.saturation,interpolator),Floats.interpolate(t,a.lightness,b.lightness,interpolator));
}
thx.color.Hsl.prototype.hue = null;
thx.color.Hsl.prototype.saturation = null;
thx.color.Hsl.prototype.lightness = null;
thx.color.Hsl.prototype.toHslString = function() {
	return "hsl(" + this.hue + "," + this.saturation * 100 + "%," + this.lightness * 100 + "%)";
}
thx.color.Hsl.prototype.__class__ = thx.color.Hsl;
thx.math.Const = function() { }
thx.math.Const.__name__ = ["thx","math","Const"];
thx.math.Const.prototype.__class__ = thx.math.Const;
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
thx.svg.Line = function(x,y,interpolator) {
	if( x === $_ ) return;
	this._x = x;
	this._y = y;
	this._interpolator = interpolator;
}
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
thx.svg.Line.prototype._x = null;
thx.svg.Line.prototype._y = null;
thx.svg.Line.prototype._interpolator = null;
thx.svg.Line.prototype.shape = function(data,i) {
	return data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y),this._interpolator);
}
thx.svg.Line.prototype.getInterpolator = function() {
	return this._interpolator;
}
thx.svg.Line.prototype.interpolator = function(type) {
	this._interpolator = type;
	return this;
}
thx.svg.Line.prototype.getX = function() {
	return this._x;
}
thx.svg.Line.prototype.x = function(v) {
	this._x = v;
	return this;
}
thx.svg.Line.prototype.getY = function() {
	return this._y;
}
thx.svg.Line.prototype.y = function(v) {
	this._y = v;
	return this;
}
thx.svg.Line.prototype.__class__ = thx.svg.Line;
thx.validation.IValidator = function() { }
thx.validation.IValidator.__name__ = ["thx","validation","IValidator"];
thx.validation.IValidator.prototype.validate = null;
thx.validation.IValidator.prototype.isValid = null;
thx.validation.IValidator.prototype.__class__ = thx.validation.IValidator;
thx.validation.Validator = function() { }
thx.validation.Validator.__name__ = ["thx","validation","Validator"];
thx.validation.Validator.prototype.validate = function(value) {
	return (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Validator.hx", lineNumber : 13, className : "thx.validation.Validator", methodName : "validate"});
		return $r;
	}(this));
}
thx.validation.Validator.prototype.isValid = function(value) {
	return Type.enumEq(this.validate(value),thx.util.Result.Ok);
}
thx.validation.Validator.prototype.__class__ = thx.validation.Validator;
thx.validation.Validator.__interfaces__ = [thx.validation.IValidator];
thx.validation.EmailValidator = function(validatedomain) {
	if( validatedomain === $_ ) return;
	if(validatedomain == null) validatedomain = true;
	this.validateDomain = validatedomain;
}
thx.validation.EmailValidator.__name__ = ["thx","validation","EmailValidator"];
thx.validation.EmailValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.EmailValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.EmailValidator.prototype.validateDomain = null;
thx.validation.EmailValidator.prototype.validate = function(value) {
	if(!thx.validation.EmailValidator._reEmail.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid email address '{0}'",[value],null)]);
	if(this.validateDomain && !thx.validation.EmailValidator._reEmailDomain.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid domain for '{0}'",[value],null)]);
	return thx.util.Result.Ok;
}
thx.validation.EmailValidator.prototype.__class__ = thx.validation.EmailValidator;
TestArrays = function(p) {
}
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
TestArrays.prototype.testCreate = function() {
	utest.Assert.same(2,Arrays.min([4,2,6]),null,null,{ fileName : "TestArrays.hx", lineNumber : 10, className : "TestArrays", methodName : "testCreate"});
	utest.Assert.same([1,0],Arrays.min([[1,2,3],[1,0],[1,2,3,4]],function(d) {
		return Arrays.min(d);
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 11, className : "TestArrays", methodName : "testCreate"});
}
TestArrays.prototype.testMap = function() {
	utest.Assert.same(["a","b","c"],[1,2,3].map(function(v,_) {
		return String.fromCharCode(v + 96);
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 16, className : "TestArrays", methodName : "testMap"});
	utest.Assert.same([0,1,2],[null,null,null].map(function(_,i) {
		return i;
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 17, className : "TestArrays", methodName : "testMap"});
}
TestArrays.prototype.testFlattenSplit = function() {
	var split = Arrays.split([1,2,3,null,4,5,6,null,7,8,9]);
	utest.Assert.same([[1,2,3],[4,5,6],[7,8,9]],split,null,null,{ fileName : "TestArrays.hx", lineNumber : 23, className : "TestArrays", methodName : "testFlattenSplit"});
	utest.Assert.same([1,2,3,4,5,6,7,8,9],Arrays.flatten(split),null,null,{ fileName : "TestArrays.hx", lineNumber : 24, className : "TestArrays", methodName : "testFlattenSplit"});
}
TestArrays.prototype.testSplit = function() {
	utest.Assert.same([[1,2,3],[4,5,6]],Arrays.split([1,2,3,100,4,5,6],function(v,_) {
		return v == 100;
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 29, className : "TestArrays", methodName : "testSplit"});
	utest.Assert.same([[1],[3],[5]],Arrays.split([1,2,3,4,5,6],function(_,i) {
		return i % 2 != 0;
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 30, className : "TestArrays", methodName : "testSplit"});
}
TestArrays.prototype.testFormat = function() {
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
TestArrays.prototype.testInterpolate = function() {
	utest.Assert.same([1.0,1.0,1.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 50, className : "TestArrays", methodName : "testInterpolate"});
	utest.Assert.same([1.0,3.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,4.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 51, className : "TestArrays", methodName : "testInterpolate"});
	utest.Assert.same([5.0,1.0,-1.0],Arrays.interpolate(0.5,[1.0,2.0],[9.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 52, className : "TestArrays", methodName : "testInterpolate"});
}
TestArrays.prototype.testInterpolateStrings = function() {
	utest.Assert.same(["b20","a10"],Arrays.interpolateStrings(0.5,["b10","a20"],["b30","a0"]),null,null,{ fileName : "TestArrays.hx", lineNumber : 57, className : "TestArrays", methodName : "testInterpolateStrings"});
}
TestArrays.prototype.testInterpolateInts = function() {
	utest.Assert.same([20,10],Arrays.interpolateInts(0.5,[10,20],[30,0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 62, className : "TestArrays", methodName : "testInterpolateInts"});
}
TestArrays.prototype.__class__ = TestArrays;
thx.validation.TestRange = function(p) {
}
thx.validation.TestRange.__name__ = ["thx","validation","TestRange"];
thx.validation.TestRange.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestRange.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestRange.prototype.testValidation = function() {
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
thx.validation.TestRange.prototype.__class__ = thx.validation.TestRange;
if(!thx.culture) thx.culture = {}
thx.culture.Info = function() { }
thx.culture.Info.__name__ = ["thx","culture","Info"];
thx.culture.Info.prototype.name = null;
thx.culture.Info.prototype["native"] = null;
thx.culture.Info.prototype.english = null;
thx.culture.Info.prototype.iso2 = null;
thx.culture.Info.prototype.iso3 = null;
thx.culture.Info.prototype.pluralRule = null;
thx.culture.Info.prototype.toString = function() {
	return this["native"] + " (" + this.english + ")";
}
thx.culture.Info.prototype.__class__ = thx.culture.Info;
thx.culture.Culture = function() { }
thx.culture.Culture.__name__ = ["thx","culture","Culture"];
thx.culture.Culture.__super__ = thx.culture.Info;
for(var k in thx.culture.Info.prototype ) thx.culture.Culture.prototype[k] = thx.culture.Info.prototype[k];
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
	var name = (culture.iso2 + culture.language.iso2).toLowerCase();
	if(!thx.culture.Culture.getCultures().exists(name)) thx.culture.Culture.getCultures().set(name,culture);
}
thx.culture.Culture.prototype.language = null;
thx.culture.Culture.prototype.date = null;
thx.culture.Culture.prototype.englishCurrency = null;
thx.culture.Culture.prototype.nativeCurrency = null;
thx.culture.Culture.prototype.currencySymbol = null;
thx.culture.Culture.prototype.currencyIso = null;
thx.culture.Culture.prototype.englishRegion = null;
thx.culture.Culture.prototype.nativeRegion = null;
thx.culture.Culture.prototype.isMetric = null;
thx.culture.Culture.prototype.digits = null;
thx.culture.Culture.prototype.signNeg = null;
thx.culture.Culture.prototype.signPos = null;
thx.culture.Culture.prototype.symbolNaN = null;
thx.culture.Culture.prototype.symbolPercent = null;
thx.culture.Culture.prototype.symbolPermille = null;
thx.culture.Culture.prototype.symbolNegInf = null;
thx.culture.Culture.prototype.symbolPosInf = null;
thx.culture.Culture.prototype.number = null;
thx.culture.Culture.prototype.currency = null;
thx.culture.Culture.prototype.percent = null;
thx.culture.Culture.prototype.__class__ = thx.culture.Culture;
if(!thx.cultures) thx.cultures = {}
thx.cultures.ItIT = function(p) {
	if( p === $_ ) return;
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
}
thx.cultures.ItIT.__name__ = ["thx","cultures","ItIT"];
thx.cultures.ItIT.__super__ = thx.culture.Culture;
for(var k in thx.culture.Culture.prototype ) thx.cultures.ItIT.prototype[k] = thx.culture.Culture.prototype[k];
thx.cultures.ItIT.culture = null;
thx.cultures.ItIT.getCulture = function() {
	if(null == thx.cultures.ItIT.culture) thx.cultures.ItIT.culture = new thx.cultures.ItIT();
	return thx.cultures.ItIT.culture;
}
thx.cultures.ItIT.prototype.__class__ = thx.cultures.ItIT;
TestStrings = function(p) {
}
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
TestStrings.prototype.testUcwordsws = function() {
	var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test Test  Test ", test : " test test  test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.ucwordsws(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 41, className : "TestStrings", methodName : "testUcwordsws"});
	}
}
TestStrings.prototype.testUcwords = function() {
	var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test-Test:Test_Test : Test ", test : " test-test:test_test : test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.ucwords(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 54, className : "TestStrings", methodName : "testUcwords"});
	}
}
TestStrings.prototype.testAlphaNum = function() {
	var tests = [{ expected : true, test : "a"},{ expected : true, test : "1a"},{ expected : false, test : " a"},{ expected : false, test : " "},{ expected : false, test : ""}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.isAlphaNum(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 67, className : "TestStrings", methodName : "testAlphaNum"});
	}
}
TestStrings.prototype.testFormat = function() {
	utest.Assert.equals("CAB",Strings.format("{2}{0}{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 72, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("C.A.B",Strings.format("{2}.{0}.{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 73, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("X.",Strings.format("{0:T,1,.}",["XYZ"]),null,{ fileName : "TestStrings.hx", lineNumber : 74, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("{0INVALIDMODIFIER}",Strings.format("{0INVALIDMODIFIER}",["X"]),null,{ fileName : "TestStrings.hx", lineNumber : 75, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("$1,000.01",Strings.format("{0:C}",[1000.01]),null,{ fileName : "TestStrings.hx", lineNumber : 76, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("€ 1.000,01",Strings.format("{0:C}",[1000.01],null,thx.cultures.ItIT.getCulture()),null,{ fileName : "TestStrings.hx", lineNumber : 77, className : "TestStrings", methodName : "testFormat"});
}
TestStrings.prototype.testHumanize = function() {
	utest.Assert.equals("hello world",Strings.humanize("helloWorld"),null,{ fileName : "TestStrings.hx", lineNumber : 82, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("my long string",Strings.humanize("my_long_string"),null,{ fileName : "TestStrings.hx", lineNumber : 83, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("ignore many",Strings.humanize("ignoreMANY"),null,{ fileName : "TestStrings.hx", lineNumber : 84, className : "TestStrings", methodName : "testHumanize"});
}
TestStrings.prototype.testWrapColumn = function() {
	var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\nconsectetur\nadipisicing elit,\nsed do eiusmod\ntempor incididunt ut\nlabore et dolore\nmagna aliqua. Ut\nenim ad minim\nveniam, quis nostrud\nexercitation ullamco\nlaboris nisi ut\naliquip ex ea\ncommodo consequat.",Strings.wrapColumns(text,20),null,{ fileName : "TestStrings.hx", lineNumber : 91, className : "TestStrings", methodName : "testWrapColumn"});
	utest.Assert.equals("    Lorem ipsum\n    dolor sit amet,\n    consectetur\n    adipisicing\n    elit, sed do\n    eiusmod tempor\n    incididunt ut\n    labore et dolore\n    magna aliqua. Ut\n    enim ad minim\n    veniam, quis\n    nostrud\n    exercitation\n    ullamco laboris\n    nisi ut aliquip\n    ex ea commodo\n    consequat.",Strings.wrapColumns(text,20,"    "),null,{ fileName : "TestStrings.hx", lineNumber : 108, className : "TestStrings", methodName : "testWrapColumn"});
}
TestStrings.prototype.testWrapColumnPreserveNewLines = function() {
	var text = "Lorem ipsum dolor sit amet,\n\nconsectetur adipisicing elit";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\n\nconsectetur\nadipisicing elit",Strings.wrapColumns(text,18),null,{ fileName : "TestStrings.hx", lineNumber : 133, className : "TestStrings", methodName : "testWrapColumnPreserveNewLines"});
}
TestStrings.prototype.testWrapColumnLong = function() {
	var text = "aaaaaaaaaa aaaa aaa aa";
	utest.Assert.equals("aaaaaaaaaa\naaaa\naaa aa",Strings.wrapColumns(text,6),null,{ fileName : "TestStrings.hx", lineNumber : 145, className : "TestStrings", methodName : "testWrapColumnLong"});
}
TestStrings.prototype.testInterpolate = function() {
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
TestStrings.prototype.__class__ = TestStrings;
thx.math.scale.Quantize = function(p) {
	if( p === $_ ) return;
	this.x0 = 0;
	this.x1 = 1;
	this.kx = 2;
	this.i = 1;
	this._range = [0.0,1.0];
}
thx.math.scale.Quantize.__name__ = ["thx","math","scale","Quantize"];
thx.math.scale.Quantize.prototype.x0 = null;
thx.math.scale.Quantize.prototype.x1 = null;
thx.math.scale.Quantize.prototype.kx = null;
thx.math.scale.Quantize.prototype.i = null;
thx.math.scale.Quantize.prototype._range = null;
thx.math.scale.Quantize.prototype.scaleMap = function(x,i) {
	return this.scale(x);
}
thx.math.scale.Quantize.prototype.scale = function(x) {
	return this._range[Std["int"](Math.max(0,Math.min(this.i,Math.floor(this.kx * (x - this.x0)))))];
}
thx.math.scale.Quantize.prototype.getDomain = function() {
	return [this.x0,this.x1];
}
thx.math.scale.Quantize.prototype.domain = function(x0,x1) {
	this.x0 = x0;
	this.x1 = x1;
	this.kx = this._range.length / (x1 - x0);
	return this;
}
thx.math.scale.Quantize.prototype.getRange = function() {
	return $closure(this._range,"copy");
}
thx.math.scale.Quantize.prototype.range = function(x) {
	this._range = x.copy();
	this.kx = this._range.length / (this.x1 - this.x0);
	this.i = this._range.length - 1;
	return this;
}
thx.math.scale.Quantize.prototype.__class__ = thx.math.scale.Quantize;
Iterators = function() { }
Iterators.__name__ = ["Iterators"];
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
Iterators.prototype.__class__ = Iterators;
thx.collections.IntHashList = function(p) {
	if( p === $_ ) return;
	this.length = 0;
	this.__keys = [];
	this.__hash = new IntHash();
}
thx.collections.IntHashList.__name__ = ["thx","collections","IntHashList"];
thx.collections.IntHashList.prototype.length = null;
thx.collections.IntHashList.prototype.set = function(key,value) {
	if(!this.__hash.exists(key)) {
		this.__keys.push(key);
		this.length++;
	}
	this.__hash.set(key,value);
}
thx.collections.IntHashList.prototype.get = function(key) {
	return this.__hash.get(key);
}
thx.collections.IntHashList.prototype.getAt = function(index) {
	return this.__hash.get(this.__keys[index]);
}
thx.collections.IntHashList.prototype.exists = function(key) {
	return this.__hash.exists(key);
}
thx.collections.IntHashList.prototype.remove = function(key) {
	var item = this.__hash.get(key);
	if(item == null) return null;
	this.__hash.remove(key);
	this.__keys.remove(key);
	this.length--;
	return item;
}
thx.collections.IntHashList.prototype.removeAt = function(index) {
	if(index < 0 || index >= this.length) return null;
	var key = this.__keys[index];
	var item = this.__hash.get(key);
	this.__hash.remove(key);
	this.__keys.remove(key);
	this.length--;
	return item;
}
thx.collections.IntHashList.prototype.keys = function() {
	return this.__keys.iterator();
}
thx.collections.IntHashList.prototype.iterator = function() {
	return this.array().iterator();
}
thx.collections.IntHashList.prototype.clear = function() {
	this.__hash = new IntHash();
	this.__keys = [];
	this.length = 0;
}
thx.collections.IntHashList.prototype.array = function() {
	var values = [];
	var _g = 0, _g1 = this.__keys;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		values.push(this.__hash.get(k));
	}
	return values;
}
thx.collections.IntHashList.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
thx.collections.IntHashList.prototype.__keys = null;
thx.collections.IntHashList.prototype.__hash = null;
thx.collections.IntHashList.prototype.__class__ = thx.collections.IntHashList;
if(!thx.xml) thx.xml = {}
thx.xml.Namespace = function() { }
thx.xml.Namespace.__name__ = ["thx","xml","Namespace"];
thx.xml.Namespace.qualify = function(name) {
	var i = name.indexOf(":");
	if(i < 0) return null; else {
		var space = thx.xml.Namespace.prefix.get(name.substr(0,i));
		if(null == space) throw new thx.error.Error("unable to find a namespace for {0}",[space],null,{ fileName : "Namespace.hx", lineNumber : 29, className : "thx.xml.Namespace", methodName : "qualify"});
		return new thx.xml.NSQualifier(space,name.substr(i + 1));
	}
}
thx.xml.Namespace.prototype.__class__ = thx.xml.Namespace;
thx.xml.NSQualifier = function(space,local) {
	if( space === $_ ) return;
	this.space = space;
	this.local = local;
}
thx.xml.NSQualifier.__name__ = ["thx","xml","NSQualifier"];
thx.xml.NSQualifier.prototype.space = null;
thx.xml.NSQualifier.prototype.local = null;
thx.xml.NSQualifier.prototype.__class__ = thx.xml.NSQualifier;
StringTools = function() { }
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
StringTools.prototype.__class__ = StringTools;
utest.ui.common.ReportTools = function() { }
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
utest.ui.common.ReportTools.prototype.__class__ = utest.ui.common.ReportTools;
if(!thx.json) thx.json = {}
thx.json.JsonEncoder = function(formatted,indent,newline) {
	if( formatted === $_ ) return;
	if(newline == null) newline = "\n";
	if(indent == null) indent = "\t";
	if(formatted == null) formatted = false;
	this.formatted = formatted;
	this.indent = indent;
	this.newline = newline;
}
thx.json.JsonEncoder.__name__ = ["thx","json","JsonEncoder"];
thx.json.JsonEncoder.prototype.formatted = null;
thx.json.JsonEncoder.prototype.indent = null;
thx.json.JsonEncoder.prototype.newline = null;
thx.json.JsonEncoder.prototype.lvl = null;
thx.json.JsonEncoder.prototype.encode = function(value) {
	this.lvl = 0;
	return this._encode(value);
}
thx.json.JsonEncoder.prototype._encode = function(value) {
	var $e = (value);
	switch( $e[1] ) {
	case 0:
		var a = $e[2];
		if(this.formatted) {
			this.lvl++;
			var r = this._encodeObject(a);
			this.lvl--;
			return r;
		} else return this._encodeInlineObject(a);
		break;
	case 1:
		var arr = $e[2];
		return "[" + Lambda.map(arr,$closure(this,"encode")).join(", ") + "]";
	case 2:
		var s = $e[2];
		return this.quote(s);
	case 3:
		var f = $e[2];
		return "" + f;
	case 4:
		var i = $e[2];
		return "" + i;
	case 6:
		var b = $e[2];
		return b?"true":"false";
	case 7:
		return "null";
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unsupported type {0}",null,Std.string(value),{ fileName : "JsonEncoder.hx", lineNumber : 55, className : "thx.json.JsonEncoder", methodName : "_encode"});
			return $r;
		}(this));
	}
}
thx.json.JsonEncoder.prototype.quote = function(s) {
	return "\"" + new EReg(".","").customReplace(new EReg("(\n)","g").replace(new EReg("(\"|\\\\)","g").replace(s,"\\$1"),"\\n"),function(r) {
		var c = r.matched(0).charCodeAt(0);
		return c >= 32 && c <= 127?String.fromCharCode(c):"\\u" + StringTools.hex(c,4);
	}) + "\"";
}
thx.json.JsonEncoder.prototype._indent = function() {
	var arr = [];
	var _g1 = 0, _g = this.lvl;
	while(_g1 < _g) {
		var i = _g1++;
		arr.push(this.indent);
	}
	return arr.join("");
}
thx.json.JsonEncoder.prototype._encodeObject = function(a) {
	var me = this;
	return "{" + Lambda.map(a,function(p) {
		return me.newline + me._indent() + me.quote(p.k) + "\t: " + me._encode(p.v);
	}).join(",") + this.newline + "}";
}
thx.json.JsonEncoder.prototype._encodeInlineObject = function(a) {
	var me = this;
	return "{" + Lambda.map(a,function(p) {
		return me.quote(p.k) + ":" + me._encode(p.v);
	}).join(",") + "}";
}
thx.json.JsonEncoder.prototype.__class__ = thx.json.JsonEncoder;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
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
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
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
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
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
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
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
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
thx.util.Message = function(message,params,param) {
	if( message === $_ ) return;
	this.message = message;
	if(null == params) this.params = []; else this.params = params;
	if(null != param) this.params.push(param);
}
thx.util.Message.__name__ = ["thx","util","Message"];
thx.util.Message.prototype.message = null;
thx.util.Message.prototype.params = null;
thx.util.Message.prototype.toString = function() {
	return Strings.format(this.message,this.params);
}
thx.util.Message.prototype.translate = function(translator) {
	return Strings.format(translator(this.message),this.params);
}
thx.util.Message.prototype.__class__ = thx.util.Message;
thx.json.Json = function() { }
thx.json.Json.__name__ = ["thx","json","Json"];
thx.json.Json.encode = function(value) {
	return new thx.json.JsonEncoder().encode(value);
}
thx.json.Json.decode = function(value) {
	return new thx.json.JsonDecoder().decode(value);
}
thx.json.Json.encodeObject = function(o) {
	return thx.json.Json.encode(thx.data.Data.toConfigExpr(o));
}
thx.json.Json.decodeObject = function(s) {
	return thx.data.Data.toDynamic(thx.json.Json.decode(s));
}
thx.json.Json.prototype.__class__ = thx.json.Json;
thx.svg.Shape = function() { }
thx.svg.Shape.__name__ = ["thx","svg","Shape"];
thx.svg.Shape.prototype.apply = function(o,d) {
	if(null != d) {
		var _g = 0, _g1 = Reflect.fields(d);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var f = Reflect.field(this,field);
			if(null == f) continue;
			if(Reflect.isFunction(f)) f.apply(o,[Reflect.field(d,field)]); else o[field] = Reflect.field(d,field);
		}
	}
}
thx.svg.Shape.prototype.shape = function(d,i) {
	this.apply(this,d);
	return "";
}
thx.svg.Shape.prototype.__class__ = thx.svg.Shape;
thx.util.TestAll = function() { }
thx.util.TestAll.__name__ = ["thx","util","TestAll"];
thx.util.TestAll.addTests = function(runner) {
	thx.util.TestTypeFactory.addTests(runner);
	thx.util.TestTypeServiceLocator.addTests(runner);
	runner.addCase(new thx.util.TestResults());
}
thx.util.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.util.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.util.TestAll.prototype.__class__ = thx.util.TestAll;
thx.json.JsonDecoder = function(tabsize) {
	if( tabsize === $_ ) return;
	if(tabsize == null) tabsize = 4;
	this.tabsize = tabsize;
}
thx.json.JsonDecoder.__name__ = ["thx","json","JsonDecoder"];
thx.json.JsonDecoder.prototype.col = null;
thx.json.JsonDecoder.prototype.line = null;
thx.json.JsonDecoder.prototype.tabsize = null;
thx.json.JsonDecoder.prototype.rest = null;
thx.json.JsonDecoder.prototype["char"] = null;
thx.json.JsonDecoder.prototype.decode = function(s) {
	this.col = 0;
	this.line = 0;
	this.rest = s;
	this["char"] = null;
	this.ignoreWhiteSpace();
	var p = null;
	try {
		p = this.parse();
	} catch( e ) {
		if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
			this.error("unexpected end of stream");
		} else ;
		throw(e);
	}
	this.ignoreWhiteSpace();
	if(this.rest.length > 0) this.error("the stream contains unrecognized characters at its end");
	return p;
}
thx.json.JsonDecoder.prototype.ignoreWhiteSpace = function() {
	while(this.rest.length > 0) {
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
thx.json.JsonDecoder.prototype.parse = function() {
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
thx.json.JsonDecoder.prototype.readChar = function() {
	if(null == this["char"]) {
		if(this.rest.length == 0) throw thx.json._JsonDecoder.StreamError.Eof;
		var c = this.rest.substr(0,1);
		this.rest = this.rest.substr(1);
		return c;
	} else {
		var c = this["char"];
		this["char"] = null;
		return c;
	}
}
thx.json.JsonDecoder.prototype.expect = function(word) {
	var test = null == this["char"]?this.rest.substr(0,word.length):this["char"] + this.rest.substr(0,word.length - 1);
	if(test == word) {
		if(null == this["char"]) this.rest = this.rest.substr(word.length); else {
			this.rest = this.rest.substr(word.length - 1);
			this["char"] = null;
		}
		return true;
	} else return false;
}
thx.json.JsonDecoder.prototype.parseObject = function() {
	var pairs = [];
	var first = true;
	while(true) {
		this.ignoreWhiteSpace();
		if(this.expect("}")) break; else if(first) first = false; else if(this.expect(",")) this.ignoreWhiteSpace(); else this.error("expected ','");
		var k = this._parseString();
		this.ignoreWhiteSpace();
		if(!this.expect(":")) this.error("expected ':'");
		this.ignoreWhiteSpace();
		var v = this.parse();
		pairs.push({ k : k, v : v});
	}
	return thx.data.DataExpr.CEObject(pairs);
}
thx.json.JsonDecoder.prototype.parseArray = function() {
	this.ignoreWhiteSpace();
	var arr = [];
	var first = true;
	while(true) {
		this.ignoreWhiteSpace();
		if(this.expect("]")) break; else if(first) first = false; else if(this.expect(",")) this.ignoreWhiteSpace(); else this.error("expected ','");
		arr.push(this.parse());
	}
	return thx.data.DataExpr.CEArray(arr);
}
thx.json.JsonDecoder.prototype.parseValue = function() {
	if(this.expect("true")) return thx.data.DataExpr.CEBool(true); else if(this.expect("false")) return thx.data.DataExpr.CEBool(false); else if(this.expect("null")) return thx.data.DataExpr.CENull; else return this.parseFloat();
}
thx.json.JsonDecoder.prototype.parseString = function() {
	return thx.data.DataExpr.CEString(this._parseString());
}
thx.json.JsonDecoder.prototype._parseString = function() {
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
thx.json.JsonDecoder.prototype.parseHexa = function() {
	var v = [];
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var c = this.readChar();
		var i1 = c.toLowerCase().charCodeAt(0);
		if(!(i1 >= 48 && i1 <= 57 || i1 >= 97 && i1 <= 102)) this.error("invalid hexadecimal value " + c);
		v.push(c);
	}
	return Std.parseInt("0x" + v.join(""));
}
thx.json.JsonDecoder.prototype.parseFloat = function() {
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
			return thx.data.DataExpr.CEInt(Std.parseInt(v));
		} else ;
		throw(e);
	}
	try {
		if(this.expect(".")) v += "." + this.parseDigits(1); else return thx.data.DataExpr.CEInt(Std.parseInt(v));
		if(this.expect("e") || this.expect("E")) {
			v += "e";
			if(this.expect("+")) {
			} else if(this.expect("-")) v += "-";
			v += this.parseDigits(1);
		}
	} catch( e ) {
		if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
			return thx.data.DataExpr.CEFloat(Std.parseFloat(v));
		} else ;
		throw(e);
	}
	return thx.data.DataExpr.CEFloat(Std.parseFloat(v));
}
thx.json.JsonDecoder.prototype.parseDigits = function(atleast) {
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
			} else ;
			throw(e);
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
thx.json.JsonDecoder.prototype.error = function(msg) {
	var context = this.rest.length == 0?"":"\nrest: " + (null != this["char"]?this["char"]:"") + this.rest + "...";
	throw new thx.error.Error("error at L {0} C {1}: {2}{3}",[this.line,this.col,msg,context],null,{ fileName : "JsonDecoder.hx", lineNumber : 348, className : "thx.json.JsonDecoder", methodName : "error"});
}
thx.json.JsonDecoder.prototype.__class__ = thx.json.JsonDecoder;
if(!thx.json._JsonDecoder) thx.json._JsonDecoder = {}
thx.json._JsonDecoder.StreamError = { __ename__ : ["thx","json","_JsonDecoder","StreamError"], __constructs__ : ["Eof"] }
thx.json._JsonDecoder.StreamError.Eof = ["Eof",0];
thx.json._JsonDecoder.StreamError.Eof.toString = $estr;
thx.json._JsonDecoder.StreamError.Eof.__enum__ = thx.json._JsonDecoder.StreamError;
thx.math.scale.TestPow = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestPow.__name__ = ["thx","math","scale","TestPow"];
thx.math.scale.TestPow.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestPow.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestPow.prototype.testDomain = function() {
	var scale = new thx.math.scale.Pow().exponent(2);
	var expected = [0.25,0.0,0.25,1.0,2.25];
	var values = [-0.5,0.0,0.5,1.0,1.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestPow.prototype.testDomain12 = function() {
	var scale = new thx.math.scale.Pow().exponent(2).domain(1,2);
	var expected = [-0.25,0.0,0.417,1.0,1.75];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestPow.prototype.testSqrtDomain = function() {
	var scale = thx.math.scale.Pow.sqrt();
	var expected = [Math.NaN,0.0,0.5,0.707,1.0,2.0];
	var values = [-0.5,0.0,0.25,0.5,1.0,4.0];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestPow.prototype.testSqrtDomain12 = function() {
	var scale = thx.math.scale.Pow.sqrt().domain(1,2);
	var expected = [-0.707,0.0,0.543,1.0,1.403];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestPow.prototype.testSqrtDomain0n1 = function() {
	var scale = thx.math.scale.Pow.sqrt().domain(0,-1);
	var expected = [Math.NaN,0.0,0.5,0.707,1.0,2.0];
	var values = [0.5,0.0,-0.25,-0.5,-1.0,-4.0];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestPow.prototype.__class__ = thx.math.scale.TestPow;
if(!thx.doc) thx.doc = {}
thx.doc.TestAll = function(p) {
}
thx.doc.TestAll.__name__ = ["thx","doc","TestAll"];
thx.doc.TestAll.addTests = function(runner) {
}
thx.doc.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.doc.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.doc.TestAll.prototype.p = function(s) {
	return thx.doc.Fragment.Paragraph([this.t(s)]);
}
thx.doc.TestAll.prototype.t = function(s) {
	return thx.doc.Fragment.Text(s);
}
thx.doc.TestAll.prototype.__class__ = thx.doc.TestAll;
thx.culture.FormatParams = function() { }
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
thx.culture.FormatParams.prototype.__class__ = thx.culture.FormatParams;
utest.ui.common.IReport = function() { }
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype.displaySuccessResults = null;
utest.ui.common.IReport.prototype.displayHeader = null;
utest.ui.common.IReport.prototype.setHandler = null;
utest.ui.common.IReport.prototype.__class__ = utest.ui.common.IReport;
thx.color.TestHsl = function(p) {
}
thx.color.TestHsl.__name__ = ["thx","color","TestHsl"];
thx.color.TestHsl.prototype.testBasics = function() {
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
thx.color.TestHsl.prototype.__class__ = thx.color.TestHsl;
thx.math.scale.LinearString = function(p) {
	if( p === $_ ) return;
	this.x0 = 0;
	this.x1 = 1;
	this.y0 = "";
	this.y1 = "";
	this.kx = 1;
	this.f = $closure(Strings,"interpolatef");
	this.i = this.f(this.y0,this.y1,null);
}
thx.math.scale.LinearString.__name__ = ["thx","math","scale","LinearString"];
thx.math.scale.LinearString.prototype.x0 = null;
thx.math.scale.LinearString.prototype.x1 = null;
thx.math.scale.LinearString.prototype.y0 = null;
thx.math.scale.LinearString.prototype.y1 = null;
thx.math.scale.LinearString.prototype.kx = null;
thx.math.scale.LinearString.prototype.f = null;
thx.math.scale.LinearString.prototype.i = null;
thx.math.scale.LinearString.prototype.scale = function(x,_) {
	return this.i((x - this.x0) * this.kx);
}
thx.math.scale.LinearString.prototype.getDomain = function() {
	return [this.x0,this.x1];
}
thx.math.scale.LinearString.prototype.domain = function(x0,x1) {
	this.x0 = x0;
	this.x1 = x1;
	this.kx = 1 / (x1 - x0);
	return this;
}
thx.math.scale.LinearString.prototype.getRange = function() {
	return [this.y0,this.y1];
}
thx.math.scale.LinearString.prototype.range = function(y0,y1) {
	this.y0 = y0;
	this.y1 = y1;
	this.i = this.f(y0,y1,null);
	return this;
}
thx.math.scale.LinearString.prototype.getInterpolate = function() {
	return this.f;
}
thx.math.scale.LinearString.prototype.interpolatef = function(x) {
	this.i = (this.f = x)(this.y0,this.y1,null);
	return this;
}
thx.math.scale.LinearString.prototype.tickRange = function(m) {
	var start = Math.min(this.x0,this.x1), stop = Math.max(this.x0,this.x1), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / m) / 2.302585092994046)), err = m / (span / step);
	if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= -75) step *= 2;
	return { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
}
thx.math.scale.LinearString.prototype.ticks = function(m) {
	var range = this.tickRange(m);
	return Floats.range(range.start,range.stop,range.step);
}
thx.math.scale.LinearString.prototype.tickFormat = function(m) {
	var n = Math.max(0,-Math.floor(Math.log(this.tickRange(m).step) / 2.302585092994046 + .01));
	return Floats.formatf("D:" + n);
}
thx.math.scale.LinearString.prototype.__class__ = thx.math.scale.LinearString;
thx.validation.StringLengthValidator = function(minlength,maxlength) {
	if( minlength === $_ ) return;
	if(minlength == null) minlength = 0;
	this.minLength = minlength;
	this.maxLength = maxlength;
}
thx.validation.StringLengthValidator.__name__ = ["thx","validation","StringLengthValidator"];
thx.validation.StringLengthValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.StringLengthValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.StringLengthValidator.prototype.minLength = null;
thx.validation.StringLengthValidator.prototype.maxLength = null;
thx.validation.StringLengthValidator.prototype.validate = function(value) {
	if(value.length < this.minLength) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0} character(s) long",[this.minLength],null)]); else if(null != this.maxLength && value.length > this.maxLength) return thx.util.Result.Failure([new thx.util.Message("value should be shorter than {0} character(s)",[this.maxLength],null)]); else return thx.util.Result.Ok;
}
thx.validation.StringLengthValidator.prototype.__class__ = thx.validation.StringLengthValidator;
utest.ui.Report = function() { }
utest.ui.Report.__name__ = ["utest","ui","Report"];
utest.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	report = new utest.ui.text.HtmlReport(runner,null,true);
	if(null == displaySuccessResults) report.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors; else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults; else report.displayHeader = headerDisplayMode;
	return report;
}
utest.ui.Report.prototype.__class__ = utest.ui.Report;
thx.js.DataChoice = function(update,enter,exit) {
	if( update === $_ ) return;
	this._update = update;
	this._enter = enter;
	this._exit = exit;
}
thx.js.DataChoice.__name__ = ["thx","js","DataChoice"];
thx.js.DataChoice.prototype._update = null;
thx.js.DataChoice.prototype._enter = null;
thx.js.DataChoice.prototype._exit = null;
thx.js.DataChoice.prototype.enter = function() {
	return new thx.js.PreEnterSelection(this._enter,this);
}
thx.js.DataChoice.prototype.exit = function() {
	return new thx.js.ExitSelection(this._exit,this);
}
thx.js.DataChoice.prototype.update = function() {
	return new thx.js.UpdateSelection(this._update,this);
}
thx.js.DataChoice.prototype.__class__ = thx.js.DataChoice;
thx.js.BoundSelection = function(groups) {
	if( groups === $_ ) return;
	thx.js.BaseSelection.call(this,groups);
}
thx.js.BoundSelection.__name__ = ["thx","js","BoundSelection"];
thx.js.BoundSelection.__super__ = thx.js.BaseSelection;
for(var k in thx.js.BaseSelection.prototype ) thx.js.BoundSelection.prototype[k] = thx.js.BaseSelection.prototype[k];
thx.js.BoundSelection.prototype.html = function() {
	return new thx.js.AccessDataHtml(this);
}
thx.js.BoundSelection.prototype.text = function() {
	return new thx.js.AccessDataText(this);
}
thx.js.BoundSelection.prototype.attr = function(name) {
	return new thx.js.AccessDataAttribute(name,this);
}
thx.js.BoundSelection.prototype.classed = function() {
	return new thx.js.AccessDataClassed(this);
}
thx.js.BoundSelection.prototype.property = function(name) {
	return new thx.js.AccessDataProperty(name,this);
}
thx.js.BoundSelection.prototype.style = function(name) {
	return new thx.js.AccessDataStyle(name,this);
}
thx.js.BoundSelection.prototype.transition = function() {
	return new thx.js.BoundTransition(this);
}
thx.js.BoundSelection.prototype.data = function(d,join) {
	var update = [], enter = [], exit = [];
	if(null == join) {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bind(group,d,update,enter,exit);
		}
	} else {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bindJoin(join,group,d,update,enter,exit);
		}
	}
	return new thx.js.DataChoice(update,enter,exit);
}
thx.js.BoundSelection.prototype.dataf = function(fd,join) {
	if(null == join) {
		var update = [], enter = [], exit = [], i = 0;
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bind(group,fd(Reflect.field(group.parentNode,"__data__"),i++),update,enter,exit);
		}
		return new thx.js.DataChoice(update,enter,exit);
	} else {
		var update = [], enter = [], exit = [], i = 0;
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bindJoin(join,group,fd(Reflect.field(group.parentNode,"__data__"),i++),update,enter,exit);
		}
		return new thx.js.DataChoice(update,enter,exit);
	}
}
thx.js.BoundSelection.prototype.selfData = function() {
	return this.dataf(function(d,i) {
		return d;
	});
}
thx.js.BoundSelection.prototype.each = function(f) {
	return this.eachNode(function(n,i) {
		f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.BoundSelection.prototype.sort = function(comparator) {
	return this.sortNode(function(a,b) {
		return comparator(Reflect.field(a,"__data__"),Reflect.field(b,"__data__"));
	});
}
thx.js.BoundSelection.prototype.filter = function(f) {
	return this.filterNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.BoundSelection.prototype.map = function(f) {
	var ngroups = [];
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var ngroup = new thx.js.Group([]);
		var i = 0;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) node["__data__"] = f(Reflect.field(node,"__data__"),i++);
			ngroup.nodes.push(node);
		}
		ngroups.push(ngroup);
	}
	return this.createSelection(ngroups);
}
thx.js.BoundSelection.prototype.first = function(f) {
	return this.firstNode(function(n) {
		return f(Reflect.field(n,"__data__"));
	});
}
thx.js.BoundSelection.prototype.on = function(type,listener) {
	return this.onNode(type,null == listener?null:function(n,i) {
		listener(Reflect.field(n,"__data__"),i);
	});
}
thx.js.BoundSelection.prototype.__class__ = thx.js.BoundSelection;
thx.js.ResumeSelection = function(groups) {
	if( groups === $_ ) return;
	thx.js.BoundSelection.call(this,groups);
}
thx.js.ResumeSelection.__name__ = ["thx","js","ResumeSelection"];
thx.js.ResumeSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.ResumeSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.ResumeSelection.create = function(groups) {
	return new thx.js.ResumeSelection(groups);
}
thx.js.ResumeSelection.prototype.createSelection = function(groups) {
	return new thx.js.ResumeSelection(groups);
}
thx.js.ResumeSelection.prototype.__class__ = thx.js.ResumeSelection;
thx.js.PreEnterSelection = function(enter,choice) {
	if( enter === $_ ) return;
	this.groups = enter;
	this._choice = choice;
}
thx.js.PreEnterSelection.__name__ = ["thx","js","PreEnterSelection"];
thx.js.PreEnterSelection.prototype.groups = null;
thx.js.PreEnterSelection.prototype._choice = null;
thx.js.PreEnterSelection.prototype.append = function(name) {
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		return n;
	};
	var appendNS = function(node) {
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		return n;
	};
	return this._select(null == qname?append:appendNS);
}
thx.js.PreEnterSelection.prototype.insert = function(name,before,beforeSelector) {
	var qname = thx.xml.Namespace.qualify(name);
	var insertDom = function(node) {
		var n = js.Lib.document.createElement(name);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node)[0]);
		return n;
	};
	var insertNsDom = function(node) {
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node)[0]);
		return n;
	};
	return this._select(null == qname?insertDom:insertNsDom);
}
thx.js.PreEnterSelection.prototype.createSelection = function(groups) {
	return new thx.js.EnterSelection(groups,this._choice);
}
thx.js.PreEnterSelection.prototype._select = function(selectf) {
	var subgroups = [], subgroup, subnode, node;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		subgroups.push(subgroup = new thx.js.Group([]));
		subgroup.parentNode = group.parentNode;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node1 = $it0.next();
			if(null != node1) {
				subgroup.nodes.push(subnode = selectf(group.parentNode));
				subnode["__data__"] = Reflect.field(node1,"__data__");
			} else subgroup.nodes.push(null);
		}
	}
	return this.createSelection(subgroups);
}
thx.js.PreEnterSelection.prototype.__class__ = thx.js.PreEnterSelection;
thx.js.EnterSelection = function(enter,choice) {
	if( enter === $_ ) return;
	thx.js.BoundSelection.call(this,enter);
	this._choice = choice;
}
thx.js.EnterSelection.__name__ = ["thx","js","EnterSelection"];
thx.js.EnterSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.EnterSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.EnterSelection.prototype._choice = null;
thx.js.EnterSelection.prototype.createSelection = function(groups) {
	return new thx.js.EnterSelection(groups,this._choice);
}
thx.js.EnterSelection.prototype.exit = function() {
	return this._choice.exit();
}
thx.js.EnterSelection.prototype.update = function() {
	return this._choice.update();
}
thx.js.EnterSelection.prototype.__class__ = thx.js.EnterSelection;
thx.js.ExitSelection = function(exit,choice) {
	if( exit === $_ ) return;
	thx.js.UnboundSelection.call(this,exit);
	this._choice = choice;
}
thx.js.ExitSelection.__name__ = ["thx","js","ExitSelection"];
thx.js.ExitSelection.__super__ = thx.js.UnboundSelection;
for(var k in thx.js.UnboundSelection.prototype ) thx.js.ExitSelection.prototype[k] = thx.js.UnboundSelection.prototype[k];
thx.js.ExitSelection.prototype._choice = null;
thx.js.ExitSelection.prototype.createSelection = function(groups) {
	return new thx.js.ExitSelection(groups,this._choice);
}
thx.js.ExitSelection.prototype.enter = function() {
	return this._choice.enter();
}
thx.js.ExitSelection.prototype.update = function() {
	return this._choice.update();
}
thx.js.ExitSelection.prototype.__class__ = thx.js.ExitSelection;
thx.js.UpdateSelection = function(update,choice) {
	if( update === $_ ) return;
	thx.js.BoundSelection.call(this,update);
	this._choice = choice;
}
thx.js.UpdateSelection.__name__ = ["thx","js","UpdateSelection"];
thx.js.UpdateSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.UpdateSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.UpdateSelection.prototype._choice = null;
thx.js.UpdateSelection.prototype.createSelection = function(groups) {
	return new thx.js.UpdateSelection(groups,this._choice);
}
thx.js.UpdateSelection.prototype.enter = function() {
	return this._choice.enter();
}
thx.js.UpdateSelection.prototype.exit = function() {
	return this._choice.exit();
}
thx.js.UpdateSelection.prototype.__class__ = thx.js.UpdateSelection;
thx.cultures.EnUS = function(p) {
	if( p === $_ ) return;
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
}
thx.cultures.EnUS.__name__ = ["thx","cultures","EnUS"];
thx.cultures.EnUS.__super__ = thx.culture.Culture;
for(var k in thx.culture.Culture.prototype ) thx.cultures.EnUS.prototype[k] = thx.culture.Culture.prototype[k];
thx.cultures.EnUS.culture = null;
thx.cultures.EnUS.getCulture = function() {
	if(null == thx.cultures.EnUS.culture) thx.cultures.EnUS.culture = new thx.cultures.EnUS();
	return thx.cultures.EnUS.culture;
}
thx.cultures.EnUS.prototype.__class__ = thx.cultures.EnUS;
thx.xml.DocumentFormat = function(p) {
	if( p === $_ ) return;
	this.stripComments = false;
}
thx.xml.DocumentFormat.__name__ = ["thx","xml","DocumentFormat"];
thx.xml.DocumentFormat.prototype.nodeFormat = null;
thx.xml.DocumentFormat.prototype.stripComments = null;
thx.xml.DocumentFormat.prototype.format = function(node) {
	return this.formatNode(node);
}
thx.xml.DocumentFormat.prototype.formatNode = function(node) {
	var t = node.nodeType;
	if(Xml.Element == t) return this.formatElement(node); else if(Xml.PCData == t) return this.formatPCData(node); else if(Xml.CData == t) return this.formatCData(node); else if(Xml.Document == t) return this.formatDocument(node); else if(Xml.DocType == t) return this.formatDocType(node); else if(Xml.Prolog == t) return this.formatProlog(node); else if(Xml.Comment == t) return this.formatComment(node); else return (function($this) {
		var $r;
		throw "invalid node type: " + Std.string(t);
		return $r;
	}(this));
}
thx.xml.DocumentFormat.prototype.formatElement = function(node) {
	if(this.isEmpty(node)) return this.formatEmptyElement(node); else return this.formatOpenElement(node) + this.formatChildren(node) + this.formatCloseElement(node);
}
thx.xml.DocumentFormat.prototype.formatEmptyElement = function(node) {
	return this.nodeFormat.formatEmptyElement(node);
}
thx.xml.DocumentFormat.prototype.formatOpenElement = function(node) {
	return this.nodeFormat.formatOpenElement(node);
}
thx.xml.DocumentFormat.prototype.formatCloseElement = function(node) {
	return this.nodeFormat.formatCloseElement(node);
}
thx.xml.DocumentFormat.prototype.formatChildren = function(node) {
	var buf = new StringBuf();
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		buf.b[buf.b.length] = this.formatNode(child);
	}
	return buf.b.join("");
}
thx.xml.DocumentFormat.prototype.formatPCData = function(node) {
	return this.nodeFormat.formatPCData(node);
}
thx.xml.DocumentFormat.prototype.formatCData = function(node) {
	return this.nodeFormat.formatCData(node);
}
thx.xml.DocumentFormat.prototype.formatDocument = function(node) {
	return this.formatChildren(node);
}
thx.xml.DocumentFormat.prototype.formatDocType = function(node) {
	return this.nodeFormat.formatDocType(node);
}
thx.xml.DocumentFormat.prototype.formatProlog = function(node) {
	return this.nodeFormat.formatProlog(node);
}
thx.xml.DocumentFormat.prototype.formatComment = function(node) {
	if(this.stripComments) return ""; else return this.nodeFormat.formatComment(node);
}
thx.xml.DocumentFormat.prototype.isEmpty = function(node) {
	return !node.iterator().hasNext();
}
thx.xml.DocumentFormat.prototype.__class__ = thx.xml.DocumentFormat;
thx.xml.AutoDocumentFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this._level = 0;
	this._begin = true;
}
thx.xml.AutoDocumentFormat.__name__ = ["thx","xml","AutoDocumentFormat"];
thx.xml.AutoDocumentFormat.__super__ = thx.xml.DocumentFormat;
for(var k in thx.xml.DocumentFormat.prototype ) thx.xml.AutoDocumentFormat.prototype[k] = thx.xml.DocumentFormat.prototype[k];
thx.xml.AutoDocumentFormat.prototype.indent = null;
thx.xml.AutoDocumentFormat.prototype.newline = null;
thx.xml.AutoDocumentFormat.prototype.wrapColumns = null;
thx.xml.AutoDocumentFormat.prototype._level = null;
thx.xml.AutoDocumentFormat.prototype._begin = null;
thx.xml.AutoDocumentFormat.prototype.indentWrap = function(content) {
	return this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
}
thx.xml.AutoDocumentFormat.prototype.format = function(node) {
	return Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
}
thx.xml.AutoDocumentFormat.prototype.formatDocType = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatProlog = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatComment = function(node) {
	if(this.stripComments) return ""; else return this.indentWrap(this.nodeFormat.formatComment(node));
}
thx.xml.AutoDocumentFormat.prototype.formatEmptyElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatOpenElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatCloseElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatChildren = function(node) {
	this._level++;
	var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	this._level--;
	return content;
}
thx.xml.AutoDocumentFormat.prototype.formatDocument = function(node) {
	return thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
}
thx.xml.AutoDocumentFormat.prototype.formatPCData = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.formatCData = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
}
thx.xml.AutoDocumentFormat.prototype.__class__ = thx.xml.AutoDocumentFormat;
if(!thx.error) thx.error = {}
thx.error.Error = function(message,params,param,pos) {
	if( message === $_ ) return;
	thx.util.Message.call(this,message,params,param);
	this.pos = pos;
}
thx.error.Error.__name__ = ["thx","error","Error"];
thx.error.Error.__super__ = thx.util.Message;
for(var k in thx.util.Message.prototype ) thx.error.Error.prototype[k] = thx.util.Message.prototype[k];
thx.error.Error.prototype.pos = null;
thx.error.Error.prototype.inner = null;
thx.error.Error.prototype.setInner = function(inner) {
	this.inner = inner;
	return this;
}
thx.error.Error.prototype.toString = function() {
	try {
		return Strings.format(this.message,this.params);
	} catch( e ) {
		var ps = this.pos.className + "." + this.pos.methodName + "(" + this.pos.lineNumber + ")";
		var pa;
		if(0 == this.params.length) pa = "no parameters passed"; else pa = "wrong parameters passed ({0})";
		haxe.Log.trace("wrong parameters passed (" + this.params.join(", ") + ") for pattern '" + this.message + "' at " + ps,{ fileName : "Error.hx", lineNumber : 39, className : "thx.error.Error", methodName : "toString"});
		return "";
	}
}
thx.error.Error.prototype.__class__ = thx.error.Error;
Arrays = function() { }
Arrays.__name__ = ["Arrays"];
Arrays.pushIf = function(arr,condition,value) {
	if(null != condition) {
		if(condition) arr.push(value);
	} else if(null != value) arr.push(value);
	return arr;
}
Arrays.pushR = function(arr,value) {
	arr.push(value);
	return arr;
}
Arrays.removeR = function(arr,value) {
	arr.remove(value);
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
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compare(a,arr[i]) > 0) a = arr[p = i];
		}
		return arr[p];
	} else {
		var a = f(arr[0]), p = 0, b;
		var _g1 = 0, _g = arr.length;
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
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a > (b = f(arr[i]))) a = b;
	}
	return a;
}
Arrays.max = function(arr,f) {
	if(arr.length == 0) return null;
	if(null == f) {
		var a = arr[0], p = 0;
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compare(a,arr[i]) < 0) a = arr[p = i];
		}
		return arr[p];
	} else {
		var a = f(arr[0]), p = 0, b;
		var _g1 = 0, _g = arr.length;
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
	var _g1 = 0, _g = arr.length;
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
	return Iterators.reduce(arr.iterator(),f,initialValue);
}
Arrays.order = function(arr,f) {
	arr.sort(null == f?$closure(Reflect,"compare"):f);
	return arr;
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
Arrays.interpolate = function(v,a,b,interpolator) {
	return (Arrays.interpolatef(a,b,interpolator))(v);
}
Arrays.interpolatef = function(a,b,interpolator) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Floats.interpolatef(a[i],b[i],interpolator));
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
Arrays.interpolateStrings = function(v,a,b,interpolator) {
	return (Arrays.interpolateStringsf(a,b,interpolator))(v);
}
Arrays.interpolateStringsf = function(a,b,interpolator) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Strings.interpolatef(a[i],b[i],interpolator));
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
Arrays.interpolateInts = function(v,a,b,interpolator) {
	return (Arrays.interpolateIntsf(a,b,interpolator))(v);
}
Arrays.interpolateIntsf = function(a,b,interpolator) {
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				return function(_) {
					return v[0];
				};
			})(v));
		} else functions.push(Ints.interpolatef(a[i],b[i],interpolator));
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
Arrays.prototype.__class__ = Arrays;
thx.math.scale.TestLinearString = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestLinearString.__name__ = ["thx","math","scale","TestLinearString"];
thx.math.scale.TestLinearString.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLinearString.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLinearString.prototype.testRange = function() {
	var scale = new thx.math.scale.LinearString().domain(Arrays.min(thx.math.scale.TestLinearString.data),Arrays.max(thx.math.scale.TestLinearString.data)).range("0px","120px");
	utest.Assert.same(["0px","8px","24px","56px","120px"],thx.math.scale.TestLinearString.data.map($closure(scale,"scale")),null,null,{ fileName : "TestLinearString.hx", lineNumber : 21, className : "thx.math.scale.TestLinearString", methodName : "testRange"});
}
thx.math.scale.TestLinearString.prototype.__class__ = thx.math.scale.TestLinearString;
if(!utest.ui.text) utest.ui.text = {}
utest.ui.text.HtmlReport = function(runner,outputHandler,traceRedirected) {
	if( runner === $_ ) return;
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null == outputHandler) this.setHandler($closure(this,"_handler")); else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
}
utest.ui.text.HtmlReport.__name__ = ["utest","ui","text","HtmlReport"];
utest.ui.text.HtmlReport.prototype.traceRedirected = null;
utest.ui.text.HtmlReport.prototype.displaySuccessResults = null;
utest.ui.text.HtmlReport.prototype.displayHeader = null;
utest.ui.text.HtmlReport.prototype.handler = null;
utest.ui.text.HtmlReport.prototype.aggregator = null;
utest.ui.text.HtmlReport.prototype.oldTrace = null;
utest.ui.text.HtmlReport.prototype._traces = null;
utest.ui.text.HtmlReport.prototype.setHandler = function(handler) {
	this.handler = handler;
}
utest.ui.text.HtmlReport.prototype.redirectTrace = function() {
	if(this.traceRedirected) return;
	this._traces = [];
	this.oldTrace = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(this,"_trace");
}
utest.ui.text.HtmlReport.prototype.restoreTrace = function() {
	if(!this.traceRedirected) return;
	haxe.Log.trace = this.oldTrace;
}
utest.ui.text.HtmlReport.prototype._traceTime = null;
utest.ui.text.HtmlReport.prototype._trace = function(v,infos) {
	var time = haxe.Timer.stamp();
	var delta = this._traceTime == null?0:time - this._traceTime;
	this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.Stack.callStack()});
	this._traceTime = haxe.Timer.stamp();
}
utest.ui.text.HtmlReport.prototype.startTime = null;
utest.ui.text.HtmlReport.prototype.start = function(e) {
	this.startTime = haxe.Timer.stamp();
}
utest.ui.text.HtmlReport.prototype.cls = function(stats) {
	if(stats.hasErrors) return "error"; else if(stats.hasFailures) return "failure"; else if(stats.hasWarnings) return "warn"; else return "ok";
}
utest.ui.text.HtmlReport.prototype.resultNumbers = function(buf,stats) {
	var numbers = [];
	if(stats.assertations == 1) numbers.push("<strong>1</strong> test"); else numbers.push("<strong>" + stats.assertations + "</strong> tests");
	if(stats.successes != stats.assertations) {
		if(stats.successes == 1) numbers.push("<strong>1</strong> pass"); else if(stats.successes > 0) numbers.push("<strong>" + stats.successes + "</strong> passes");
	}
	if(stats.errors == 1) numbers.push("<strong>1</strong> error"); else if(stats.errors > 0) numbers.push("<strong>" + stats.errors + "</strong> errors");
	if(stats.failures == 1) numbers.push("<strong>1</strong> failure"); else if(stats.failures > 0) numbers.push("<strong>" + stats.failures + "</strong> failures");
	if(stats.warnings == 1) numbers.push("<strong>1</strong> warning"); else if(stats.warnings > 0) numbers.push("<strong>" + stats.warnings + "</strong> warnings");
	buf.b[buf.b.length] = numbers.join(", ");
}
utest.ui.text.HtmlReport.prototype.blockNumbers = function(buf,stats) {
	buf.b[buf.b.length] = "<div class=\"" + this.cls(stats) + "bg statnumbers\">";
	this.resultNumbers(buf,stats);
	buf.b[buf.b.length] = "</div>";
}
utest.ui.text.HtmlReport.prototype.formatStack = function(stack,addNL) {
	if(addNL == null) addNL = true;
	var parts = [];
	var nl = addNL?"\n":"";
	var _g = 0, _g1 = haxe.Stack.toString(stack).split("\n");
	while(_g < _g1.length) {
		var part = _g1[_g];
		++_g;
		if(StringTools.trim(part) == "") continue;
		if(-1 < part.indexOf("Called from utest.")) continue;
		parts.push(part);
	}
	var s = "<ul><li>" + parts.join("</li>" + nl + "<li>") + "</li></ul>" + nl;
	return "<div>" + s + "</div>" + nl;
}
utest.ui.text.HtmlReport.prototype.addFixture = function(buf,result,name,isOk) {
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	buf.b[buf.b.length] = "<li class=\"fixture\"><div class=\"li\">";
	buf.b[buf.b.length] = "<span class=\"" + this.cls(result.stats) + "bg fixtureresult\">";
	if(result.stats.isOk) buf.b[buf.b.length] = "OK "; else if(result.stats.hasErrors) buf.b[buf.b.length] = "ERROR "; else if(result.stats.hasFailures) buf.b[buf.b.length] = "FAILURE "; else if(result.stats.hasWarnings) buf.b[buf.b.length] = "WARNING ";
	buf.b[buf.b.length] = "</span>";
	buf.b[buf.b.length] = "<div class=\"fixturedetails\">";
	buf.b[buf.b.length] = "<strong>" + name + "</strong>";
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
			messages.push("<strong>error</strong>: <em>" + StringTools.htmlEscape(Std.string(e)) + "</em>\n" + this.formatStack(s));
			break;
		case 3:
			var s = $e[3], e = $e[2];
			messages.push("<strong>setup error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 4:
			var s = $e[3], e = $e[2];
			messages.push("<strong>tear-down error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 5:
			var s = $e[3], missedAsyncs = $e[2];
			messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
			break;
		case 6:
			var s = $e[3], e = $e[2];
			messages.push("<strong>async error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 7:
			var msg = $e[2];
			messages.push(StringTools.htmlEscape(msg));
			break;
		}
	}
	if(messages.length > 0) {
		buf.b[buf.b.length] = "<div class=\"testoutput\">";
		buf.b[buf.b.length] = messages.join("<br/>");
		buf.b[buf.b.length] = "</div>\n";
	}
	buf.b[buf.b.length] = "</div>\n";
	buf.b[buf.b.length] = "</div></li>\n";
}
utest.ui.text.HtmlReport.prototype.addClass = function(buf,result,name,isOk) {
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	buf.b[buf.b.length] = "<li>";
	buf.b[buf.b.length] = "<h2 class=\"classname\">" + name + "</h2>";
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
utest.ui.text.HtmlReport.prototype.addPackages = function(buf,result,isOk) {
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
utest.ui.text.HtmlReport.prototype.addPackage = function(buf,result,name,isOk) {
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	if(name == "" && result.classNames().length == 0) return;
	buf.b[buf.b.length] = "<li>";
	buf.b[buf.b.length] = "<h2>" + name + "</h2>";
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
utest.ui.text.HtmlReport.prototype.getHeader = function() {
	var buf = new StringBuf();
	if(!utest.ui.common.ReportTools.hasHeader(this,this.result.stats)) return "";
	var end = haxe.Timer.stamp();
	var time = Std["int"]((end - this.startTime) * 1000) / 1000;
	var msg = "TEST OK";
	if(this.result.stats.hasErrors) msg = "TEST ERRORS"; else if(this.result.stats.hasFailures) msg = "TEST FAILED"; else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
	buf.b[buf.b.length] = "<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n";
	buf.b[buf.b.length] = "<div class=\"headerinfo\">";
	this.resultNumbers(buf,this.result.stats);
	buf.b[buf.b.length] = " performed on <strong>" + utest.ui.text.HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ";
	return buf.b.join("");
}
utest.ui.text.HtmlReport.prototype.getTrace = function() {
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
		buf.b[buf.b.length] = "<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack + "')\" onmouseout=\"utestRemoveTooltip()\">";
		buf.b[buf.b.length] = method;
		buf.b[buf.b.length] = "</span><span class=\"tracetime\">";
		buf.b[buf.b.length] = "@ " + this.formatTime(t.time);
		if(Math.round(t.delta * 1000) > 0) buf.b[buf.b.length] = ", ~" + this.formatTime(t.delta);
		buf.b[buf.b.length] = "</span><span class=\"tracemsg\">";
		buf.b[buf.b.length] = StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n");
		buf.b[buf.b.length] = "</span><div class=\"clr\"></div></div></li>";
	}
	buf.b[buf.b.length] = "</ol></div>";
	return buf.b.join("");
}
utest.ui.text.HtmlReport.prototype.getResults = function() {
	var buf = new StringBuf();
	this.addPackages(buf,this.result,this.result.stats.isOk);
	return buf.b.join("");
}
utest.ui.text.HtmlReport.prototype.getAll = function() {
	if(!utest.ui.common.ReportTools.hasOutput(this,this.result.stats)) return ""; else return this.getHeader() + this.getTrace() + this.getResults();
}
utest.ui.text.HtmlReport.prototype.getHtml = function(title) {
	if(null == title) title = "utest: " + utest.ui.text.HtmlReport.platform;
	var s = this.getAll();
	if("" == s) return ""; else return this.wrapHtml(title,s);
}
utest.ui.text.HtmlReport.prototype.result = null;
utest.ui.text.HtmlReport.prototype.complete = function(result) {
	this.result = result;
	this.handler(this);
	this.restoreTrace();
}
utest.ui.text.HtmlReport.prototype.formatTime = function(t) {
	return Math.round(t * 1000) + " ms";
}
utest.ui.text.HtmlReport.prototype.cssStyle = function() {
	return "body, dd, dt {\r\n\tfont-family: Verdana, Arial, Sans-serif;\r\n\tfont-size: 12px;\r\n}\r\ndl {\r\n\twidth: 180px;\r\n}\r\ndd, dt {\r\n\tmargin : 0;\r\n\tpadding : 2px 5px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n}\r\ndd.value {\r\n\ttext-align: center;\r\n\tbackground-color: #eeeeee;\r\n}\r\ndt {\r\n\ttext-align: left;\r\n\tbackground-color: #e6e6e6;\r\n\tfloat: left;\r\n\twidth: 100px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nh1 {\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n\tpadding: 5px 0 4px 0;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 18px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 2px 0px 2px;\r\n}\r\n\r\nh2 {\r\n\tfont-weight: bold;\r\n\tpadding: 2px 0 2px 8px;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 13px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 0 0px 0;\r\n\tbackground-color: #FFFFFF;\r\n\tcolor: #777777;\r\n}\r\n\r\nh2.classname {\r\n\tcolor: #000000;\r\n}\r\n\r\n.okbg {\r\n\tbackground-color: #66FF55;\r\n}\r\n.errorbg {\r\n\tbackground-color: #CC1100;\r\n}\r\n.failurebg {\r\n\tbackground-color: #EE3322;\r\n}\r\n.warnbg {\r\n\tbackground-color: #FFCC99;\r\n}\r\n.headerinfo {\r\n\ttext-align: right;\r\n\tfont-size: 11px;\r\n\tfont - color: 0xCCCCCC;\r\n\tmargin: 0 2px 5px 2px;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tpadding: 2px;\r\n}\r\n\r\nli {\r\n\tpadding: 4px;\r\n\tmargin: 2px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tbackground-color: #e6e6e6;\r\n}\r\n\r\nli.fixture {\r\n\tbackground-color: #f6f6f6;\r\n\tpadding-bottom: 6px;\r\n}\r\n\r\ndiv.fixturedetails {\r\n\tpadding-left: 108px;\r\n}\r\n\r\nul {\r\n\tpadding: 0;\r\n\tmargin: 6px 0 0 0;\r\n\tlist-style-type: none;\r\n}\r\n\r\nol {\r\n\tpadding: 0 0 0 28px;\r\n\tmargin: 0px 0 0 0;\r\n}\r\n\r\n.statnumbers {\r\n\tpadding: 2px 8px;\r\n}\r\n\r\n.fixtureresult {\r\n\twidth: 100px;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tpadding: 1px;\r\n\tmargin: 0 0 0 0;\r\n}\r\n\r\n.testoutput {\r\n\tborder: 1px dashed #CCCCCC;\r\n\tmargin: 4px 0 0 0;\r\n\tpadding: 4px 8px;\r\n\tbackground-color: #eeeeee;\r\n}\r\n\r\nspan.tracepos, span.traceposempty {\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tfont-size: 9px;\r\n\twidth: 170px;\r\n\tmargin: 2px 0 0 2px;\r\n}\r\n\r\nspan.tracepos:hover {\r\n\tcursor : pointer;\r\n\tbackground-color: #ffff99;\r\n}\r\n\r\nspan.tracemsg {\r\n\tdisplay: block;\r\n\tmargin-left: 180px;\r\n\tbackground-color: #eeeeee;\r\n\tpadding: 7px;\r\n}\r\n\r\nspan.tracetime {\r\n\tdisplay: block;\r\n\tfloat: right;\r\n\tmargin: 2px;\r\n\tfont-size: 9px;\r\n\tcolor: #777777;\r\n}\r\n\r\n\r\ndiv.trace ol {\r\n\tpadding: 0 0 0 40px;\r\n\tcolor: #777777;\r\n}\r\n\r\ndiv.trace li {\r\n\tpadding: 0;\r\n}\r\n\r\ndiv.trace li div.li {\r\n\tcolor: #000000;\r\n}\r\n\r\ndiv.trace h2 {\r\n\tmargin: 0 2px 0px 2px;\r\n\tpadding-left: 4px;\r\n}\r\n\r\n.tracepackage {\r\n\tcolor: #777777;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.clr {\r\n\tclear: both;\r\n}\r\n\r\n#utesttip {\r\n\tmargin-top: -3px;\r\n\tmargin-left: 170px;\r\n\tfont-size: 9px;\r\n}\r\n\r\n#utesttip li {\r\n\tmargin: 0;\r\n\tbackground-color: #ffff99;\r\n\tpadding: 2px 4px;\r\n\tborder: 0;\r\n\tborder-bottom: 1px dashed #ffff33;\r\n}";
}
utest.ui.text.HtmlReport.prototype.jsScript = function() {
	return "function utestTooltip(ref, text) {\r\n\tvar el = document.getElementById(\"utesttip\");\r\n\tif(!el) {\r\n\t\tvar el = document.createElement(\"div\")\r\n\t\tel.id = \"utesttip\";\r\n\t\tel.style.position = \"absolute\";\r\n\t\tdocument.body.appendChild(el)\r\n\t}\r\n\tvar p = utestFindPos(ref);\r\n\tel.style.left = p[0];\r\n\tel.style.top = p[1];\r\n\tel.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n\tvar left = 0;\r\n\tvar top = 0;\r\n\tdo {\r\n\t\tleft += el.offsetLeft;\r\n\t\ttop += el.offsetTop;\r\n\t} while(el = el.offsetParent)\r\n\treturn [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n\tvar el = document.getElementById(\"utesttip\")\r\n\tif(el)\r\n\t\tdocument.body.removeChild(el)\r\n}";
}
utest.ui.text.HtmlReport.prototype.wrapHtml = function(title,s) {
	return "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\r\n\t\t\t<style type=\"text/css\">" + this.cssStyle() + "</style>\r\n\t\t\t<script type=\"text/javascript\">\n" + this.jsScript() + "\n</script>\n</head>\r\n\t\t\t<body>\n" + s + "\n</body>\n</html>";
}
utest.ui.text.HtmlReport.prototype._handler = function(report) {
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
utest.ui.text.HtmlReport.prototype.__class__ = utest.ui.text.HtmlReport;
utest.ui.text.HtmlReport.__interfaces__ = [utest.ui.common.IReport];
TestFloats = function(p) {
}
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
TestFloats.prototype.testNormalize = function() {
	utest.Assert.floatEquals(0.0,Floats.normalize(0.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 11, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 12, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.5,Floats.normalize(0.5),null,null,{ fileName : "TestFloats.hx", lineNumber : 13, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.0,Floats.normalize(-1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 14, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(10.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 15, className : "TestFloats", methodName : "testNormalize"});
}
TestFloats.prototype.testAbs = function() {
	utest.Assert.floatEquals(0.1,0.1 < 0?-0.1:0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 20, className : "TestFloats", methodName : "testAbs"});
	utest.Assert.floatEquals(0.1,-0.1 < 0?0.1:-0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 21, className : "TestFloats", methodName : "testAbs"});
}
TestFloats.prototype.testClamp = function() {
	utest.Assert.floatEquals(10,Floats.clamp(0,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 27, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(10,Floats.clamp(10,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 28, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(50,Floats.clamp(50,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 29, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(100,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 30, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(110,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 31, className : "TestFloats", methodName : "testClamp"});
}
TestFloats.prototype.testClampSym = function() {
	utest.Assert.floatEquals(-10,Floats.clampSym(-100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 36, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(10,Floats.clampSym(100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 37, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(0,Floats.clampSym(0,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 38, className : "TestFloats", methodName : "testClampSym"});
}
TestFloats.prototype.testMax = function() {
	utest.Assert.floatEquals(10,10,null,null,{ fileName : "TestFloats.hx", lineNumber : 43, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 44, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(-5,-5,null,null,{ fileName : "TestFloats.hx", lineNumber : 45, className : "TestFloats", methodName : "testMax"});
}
TestFloats.prototype.testMin = function() {
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 50, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 51, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 52, className : "TestFloats", methodName : "testMin"});
}
TestFloats.prototype.testRange = function() {
	utest.Assert.same([0.1,0.2,0.3,0.4],Floats.range(0.1,0.5,0.1),null,null,{ fileName : "TestFloats.hx", lineNumber : 57, className : "TestFloats", methodName : "testRange"});
}
TestFloats.prototype.testSign = function() {
	utest.Assert.isTrue((0.1 < 0?-1:1) > 0,null,{ fileName : "TestFloats.hx", lineNumber : 62, className : "TestFloats", methodName : "testSign"});
	utest.Assert.isTrue((-0.1 < 0?-1:1) < 0,null,{ fileName : "TestFloats.hx", lineNumber : 63, className : "TestFloats", methodName : "testSign"});
}
TestFloats.prototype.testWrap = function() {
	utest.Assert.floatEquals(5,Floats.wrap(-1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 68, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 69, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(5,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 70, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(6,Floats.wrap(6,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 71, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(10,Floats.wrap(10,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 72, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(11,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 73, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(29,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 74, className : "TestFloats", methodName : "testWrap"});
}
TestFloats.prototype.testCircularWrap = function() {
	utest.Assert.floatEquals(0,Floats.circularWrap(0,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 79, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 80, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(0,Floats.circularWrap(100,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 81, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 82, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 83, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 84, className : "TestFloats", methodName : "testCircularWrap"});
}
TestFloats.prototype.testInterpolate = function() {
	utest.Assert.equals(100,Floats.interpolate(0.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 89, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(150,Floats.interpolate(0.5,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 90, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(200,Floats.interpolate(1.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 91, className : "TestFloats", methodName : "testInterpolate"});
}
TestFloats.prototype.testFormat = function() {
	utest.Assert.equals("0.10",Floats.format(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 96, className : "TestFloats", methodName : "testFormat"});
	utest.Assert.equals("0",Floats.format(0.1,"I"),null,{ fileName : "TestFloats.hx", lineNumber : 97, className : "TestFloats", methodName : "testFormat"});
}
TestFloats.prototype.testFormatF = function() {
	utest.Assert.equals("0.10",(Floats.formatf())(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 102, className : "TestFloats", methodName : "testFormatF"});
}
TestFloats.prototype.__class__ = TestFloats;
Ints = function() { }
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
Ints.interpolate = function(f,min,max,interpolator) {
	if(max == null) max = 100.0;
	if(min == null) min = 0.0;
	if(null == interpolator) interpolator = $closure(thx.math.Equations,"linear");
	return Math.round(min + interpolator(f) * (max - min));
}
Ints.interpolatef = function(min,max,interpolator) {
	if(max == null) max = 1.0;
	if(min == null) min = 0.0;
	if(null == interpolator) interpolator = $closure(thx.math.Equations,"linear");
	var d = max - min;
	return function(f) {
		return Math.round(min + interpolator(f) * d);
	};
}
Ints.ascending = function(a,b) {
	return a < b?-1:a > b?1:0;
}
Ints.descending = function(a,b) {
	return a > b?-1:a < b?1:0;
}
Ints.format = function(v,param,params,culture) {
	return (Ints.formatf(param,params,culture))(v);
}
Ints.formatf = function(param,params,culture) {
	return Floats.formatf(null,thx.culture.FormatParams.params(param,params,"I"),culture);
}
Ints.prototype.__class__ = Ints;
thx.math.scale.Log = function(p) {
	if( p === $_ ) return;
	thx.math.scale.NumericScale.call(this);
	this.log = $closure(thx.math.scale.Log,"_log");
	this.pow = $closure(thx.math.scale.Log,"_pow");
}
thx.math.scale.Log.__name__ = ["thx","math","scale","Log"];
thx.math.scale.Log.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Log.prototype[k] = thx.math.scale.NumericScale.prototype[k];
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
thx.math.scale.Log.prototype.log = null;
thx.math.scale.Log.prototype.pow = null;
thx.math.scale.Log.prototype.scale = function(x,i) {
	return thx.math.scale.NumericScale.prototype.scale.call(this,this.log(x));
}
thx.math.scale.Log.prototype.invert = function(x,i) {
	return this.pow(thx.math.scale.NumericScale.prototype.invert.call(this,x));
}
thx.math.scale.Log.prototype.getDomain = function() {
	var me = this;
	return thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
		return me.pow(d);
	});
}
thx.math.scale.Log.prototype.domain = function(x0,x1) {
	if((x0 < x1?x0:x1) < 0) {
		this.log = $closure(thx.math.scale.Log,"_logn");
		this.pow = $closure(thx.math.scale.Log,"_pown");
	} else {
		this.log = $closure(thx.math.scale.Log,"_log");
		this.pow = $closure(thx.math.scale.Log,"_pow");
	}
	return thx.math.scale.NumericScale.prototype.domain.call(this,this.log(x0),this.log(x1));
}
thx.math.scale.Log.prototype.ticks = function() {
	var d = thx.math.scale.NumericScale.prototype.getDomain.call(this), ticks = [];
	if(d.every(function(d1,_) {
		return Math.isFinite(d1);
	})) {
		var i = Math.floor(d[0]), j = Math.ceil(d[1]), u = this.pow(d[0]), v = this.pow(d[1]);
		if(Reflect.compareMethods(this.log,$closure(thx.math.scale.Log,"_logn"))) {
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
thx.math.scale.Log.prototype.tickFormatf = function() {
	return function(d) {
		return thx.culture.FormatNumber.decimal(d,1);
	};
}
thx.math.scale.Log.prototype.__class__ = thx.math.scale.Log;
thx.validation.DateRangeValidator = function(min,max,mininclusive,maxinclusive) {
	if( min === $_ ) return;
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
}
thx.validation.DateRangeValidator.__name__ = ["thx","validation","DateRangeValidator"];
thx.validation.DateRangeValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.DateRangeValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.DateRangeValidator.prototype.min = null;
thx.validation.DateRangeValidator.prototype.max = null;
thx.validation.DateRangeValidator.prototype.minInclusive = null;
thx.validation.DateRangeValidator.prototype.maxInclusive = null;
thx.validation.DateRangeValidator.prototype.validate = function(value) {
	if(null != this.min && (this.minInclusive && value.getTime() < this.min.getTime() || !this.minInclusive && value.getTime() <= this.min.getTime())) {
		if(this.minInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0:D}",[this.min],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be greater than {0:D}",[this.min],null)]);
	} else if(null != this.max && (this.maxInclusive && value.getTime() > this.max.getTime() || !this.maxInclusive && value.getTime() >= this.max.getTime())) {
		if(this.maxInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0:D}",[this.max],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be lower than {0:D}",[this.max],null)]);
	} else return thx.util.Result.Ok;
}
thx.validation.DateRangeValidator.prototype.__class__ = thx.validation.DateRangeValidator;
thx.error.TestNullArgument = function(p) {
}
thx.error.TestNullArgument.__name__ = ["thx","error","TestNullArgument"];
thx.error.TestNullArgument.throwMe = function(XXX) {
	if(null == XXX) throw new thx.error.NullArgument("XXX",{ fileName : "TestNullArgument.hx", lineNumber : 11, className : "thx.error.TestNullArgument", methodName : "throwMe"});
}
thx.error.TestNullArgument.prototype.testNullArgument = function() {
	try {
		thx.error.TestNullArgument.throwMe(null);
	} catch( $e0 ) {
		if( js.Boot.__instanceof($e0,thx.error.NullArgument) ) {
			var e = $e0;
			var s = e.toString();
			utest.Assert.stringContains("XXX",s,"string '" + s + "' does not contain 'XXX'",{ fileName : "TestNullArgument.hx", lineNumber : 21, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
			return;
		} else ;
		var e = $e0;
		utest.Assert.fail("wrong exception type: " + Std.string(e),{ fileName : "TestNullArgument.hx", lineNumber : 24, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
	}
}
thx.error.TestNullArgument.prototype.__class__ = thx.error.TestNullArgument;
thx.html.TextHandler = function(p) {
	if( p === $_ ) return;
	this.results = "";
}
thx.html.TextHandler.__name__ = ["thx","html","TextHandler"];
thx.html.TextHandler.prototype.results = null;
thx.html.TextHandler.prototype.start = function(tag,attrs,unary) {
	this.results += "<" + tag;
	var _g1 = 0, _g = attrs.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.results += " " + attrs[i].name + "=\"" + attrs[i].escaped + "\"";
	}
	this.results += (unary?"/":"") + ">";
}
thx.html.TextHandler.prototype.end = function(tag) {
	this.results += "</" + tag + ">";
}
thx.html.TextHandler.prototype.chars = function(text) {
	this.results += text;
}
thx.html.TextHandler.prototype.comment = function(text) {
	this.results += "<!--" + text + "-->";
}
thx.html.TextHandler.prototype.doctype = function(text) {
	this.results += "<!DOCTYPE " + text + ">";
}
thx.html.TextHandler.prototype.declaration = function(text) {
	this.results += "<?xml " + text + ">";
}
thx.html.TextHandler.prototype.__class__ = thx.html.TextHandler;
thx.html.TextHandler.__interfaces__ = [thx.html.HtmlHandler];
if(!thx.type) thx.type = {}
thx.type.TestTypes = function(p) {
}
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
thx.type.TestTypes.prototype.testSameAs = function() {
	utest.Assert.isTrue(thx.type.Types.sameAs(1,2),null,{ fileName : "TestTypes.hx", lineNumber : 33, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isTrue(thx.type.Types.sameAs("a","b"),null,{ fileName : "TestTypes.hx", lineNumber : 34, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 35, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 36, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,null),null,{ fileName : "TestTypes.hx", lineNumber : 37, className : "thx.type.TestTypes", methodName : "testSameAs"});
}
thx.type.TestTypes.prototype.testAs = function() {
	utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 42, className : "thx.type.TestTypes", methodName : "testAs"});
	utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 43, className : "thx.type.TestTypes", methodName : "testAs"});
}
thx.type.TestTypes.prototype.testOf = function() {
	utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 48, className : "thx.type.TestTypes", methodName : "testOf"});
	utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 49, className : "thx.type.TestTypes", methodName : "testOf"});
}
thx.type.TestTypes.prototype.testClassName = function() {
	utest.Assert.equals("TestTypes",Type.getClassName(Type.getClass(this)).split(".").pop(),null,{ fileName : "TestTypes.hx", lineNumber : 54, className : "thx.type.TestTypes", methodName : "testClassName"});
}
thx.type.TestTypes.prototype.testFullName = function() {
	utest.Assert.equals("thx.type.TestTypes",Type.getClassName(Type.getClass(this)),null,{ fileName : "TestTypes.hx", lineNumber : 59, className : "thx.type.TestTypes", methodName : "testFullName"});
}
thx.type.TestTypes.prototype.testTypeName = function() {
	utest.Assert.equals("null",thx.type.Types.typeName(null),null,{ fileName : "TestTypes.hx", lineNumber : 64, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("thx.type.TestTypes",thx.type.Types.typeName(this),null,{ fileName : "TestTypes.hx", lineNumber : 65, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Int",thx.type.Types.typeName(1),null,{ fileName : "TestTypes.hx", lineNumber : 66, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Bool",thx.type.Types.typeName(true),null,{ fileName : "TestTypes.hx", lineNumber : 67, className : "thx.type.TestTypes", methodName : "testTypeName"});
}
thx.type.TestTypes.prototype.__class__ = thx.type.TestTypes;
if(!thx.data) thx.data = {}
thx.data.DataExpr = { __ename__ : ["thx","data","DataExpr"], __constructs__ : ["CEObject","CEArray","CEString","CEFloat","CEInt","CEDate","CEBool","CENull"] }
thx.data.DataExpr.CEObject = function(o) { var $x = ["CEObject",0,o]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEArray = function(a) { var $x = ["CEArray",1,a]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEString = function(s) { var $x = ["CEString",2,s]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEFloat = function(f) { var $x = ["CEFloat",3,f]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEInt = function(i) { var $x = ["CEInt",4,i]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEDate = function(s) { var $x = ["CEDate",5,s]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CEBool = function(b) { var $x = ["CEBool",6,b]; $x.__enum__ = thx.data.DataExpr; $x.toString = $estr; return $x; }
thx.data.DataExpr.CENull = ["CENull",7];
thx.data.DataExpr.CENull.toString = $estr;
thx.data.DataExpr.CENull.__enum__ = thx.data.DataExpr;
thx.json.TestJson = function(p) {
}
thx.json.TestJson.__name__ = ["thx","json","TestJson"];
thx.json.TestJson.prototype.testEncode = function() {
	var _g = 0, _g1 = thx.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.equals(test.s,thx.json.Json.encode(test.c),null,{ fileName : "TestJson.hx", lineNumber : 29, className : "thx.json.TestJson", methodName : "testEncode"});
	}
}
thx.json.TestJson.prototype.testDecode = function() {
	var _g = 0, _g1 = thx.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		try {
			utest.Assert.same(test.c,thx.json.Json.decode(test.s),null,null,{ fileName : "TestJson.hx", lineNumber : 38, className : "thx.json.TestJson", methodName : "testDecode"});
		} catch( e ) {
			utest.Assert.fail("error decoding: " + test.s + "\n" + Std.string(e),{ fileName : "TestJson.hx", lineNumber : 40, className : "thx.json.TestJson", methodName : "testDecode"});
			break;
		}
	}
}
thx.json.TestJson.prototype.__class__ = thx.json.TestJson;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
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
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
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
		if(x != x) return null;
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
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
thx.validation.TestStringLength = function(p) {
}
thx.validation.TestStringLength.__name__ = ["thx","validation","TestStringLength"];
thx.validation.TestStringLength.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestStringLength.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestStringLength.prototype.testValidation = function() {
	var validator = new thx.validation.StringLengthValidator(3,5);
	this.assertValidation(validator.validate(""),false,null,{ fileName : "TestStringLength.hx", lineNumber : 10, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abc"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 11, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abcde"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 12, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abcdef"),false,null,{ fileName : "TestStringLength.hx", lineNumber : 13, className : "thx.validation.TestStringLength", methodName : "testValidation"});
}
thx.validation.TestStringLength.prototype.__class__ = thx.validation.TestStringLength;
utest.ui.common.ResultStats = function(p) {
	if( p === $_ ) return;
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
}
utest.ui.common.ResultStats.__name__ = ["utest","ui","common","ResultStats"];
utest.ui.common.ResultStats.prototype.assertations = null;
utest.ui.common.ResultStats.prototype.successes = null;
utest.ui.common.ResultStats.prototype.failures = null;
utest.ui.common.ResultStats.prototype.errors = null;
utest.ui.common.ResultStats.prototype.warnings = null;
utest.ui.common.ResultStats.prototype.onAddSuccesses = null;
utest.ui.common.ResultStats.prototype.onAddFailures = null;
utest.ui.common.ResultStats.prototype.onAddErrors = null;
utest.ui.common.ResultStats.prototype.onAddWarnings = null;
utest.ui.common.ResultStats.prototype.isOk = null;
utest.ui.common.ResultStats.prototype.hasFailures = null;
utest.ui.common.ResultStats.prototype.hasErrors = null;
utest.ui.common.ResultStats.prototype.hasWarnings = null;
utest.ui.common.ResultStats.prototype.addSuccesses = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.successes += v;
	this.onAddSuccesses.dispatch(v);
}
utest.ui.common.ResultStats.prototype.addFailures = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.failures += v;
	this.hasFailures = this.failures > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddFailures.dispatch(v);
}
utest.ui.common.ResultStats.prototype.addErrors = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.errors += v;
	this.hasErrors = this.errors > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddErrors.dispatch(v);
}
utest.ui.common.ResultStats.prototype.addWarnings = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.warnings += v;
	this.hasWarnings = this.warnings > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddWarnings.dispatch(v);
}
utest.ui.common.ResultStats.prototype.sum = function(other) {
	this.addSuccesses(other.successes);
	this.addFailures(other.failures);
	this.addErrors(other.errors);
	this.addWarnings(other.warnings);
}
utest.ui.common.ResultStats.prototype.subtract = function(other) {
	this.addSuccesses(-other.successes);
	this.addFailures(-other.failures);
	this.addErrors(-other.errors);
	this.addWarnings(-other.warnings);
}
utest.ui.common.ResultStats.prototype.wire = function(dependant) {
	dependant.onAddSuccesses.add($closure(this,"addSuccesses"));
	dependant.onAddFailures.add($closure(this,"addFailures"));
	dependant.onAddErrors.add($closure(this,"addErrors"));
	dependant.onAddWarnings.add($closure(this,"addWarnings"));
	this.sum(dependant);
}
utest.ui.common.ResultStats.prototype.unwire = function(dependant) {
	dependant.onAddSuccesses.remove($closure(this,"addSuccesses"));
	dependant.onAddFailures.remove($closure(this,"addFailures"));
	dependant.onAddErrors.remove($closure(this,"addErrors"));
	dependant.onAddWarnings.remove($closure(this,"addWarnings"));
	this.subtract(dependant);
}
utest.ui.common.ResultStats.prototype.__class__ = utest.ui.common.ResultStats;
thx.validation.SingleLineValidator = function(p) {
}
thx.validation.SingleLineValidator.__name__ = ["thx","validation","SingleLineValidator"];
thx.validation.SingleLineValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.SingleLineValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.SingleLineValidator.prototype.validate = function(value) {
	if(thx.validation.SingleLineValidator._re.match(value)) return thx.util.Result.Failure([new thx.util.Message("value contains one ore more line breaks",[],null)]); else return thx.util.Result.Ok;
}
thx.validation.SingleLineValidator.prototype.__class__ = thx.validation.SingleLineValidator;
thx.color.NamedColors = function() { }
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
thx.color.NamedColors.prototype.__class__ = thx.color.NamedColors;
thx.validation.RangeValidator = function(min,max,mininclusive,maxinclusive) {
	if( min === $_ ) return;
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
}
thx.validation.RangeValidator.__name__ = ["thx","validation","RangeValidator"];
thx.validation.RangeValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.RangeValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.RangeValidator.prototype.min = null;
thx.validation.RangeValidator.prototype.max = null;
thx.validation.RangeValidator.prototype.minInclusive = null;
thx.validation.RangeValidator.prototype.maxInclusive = null;
thx.validation.RangeValidator.prototype.validate = function(value) {
	if(null != this.min && (this.minInclusive && value < this.min || !this.minInclusive && value <= this.min)) {
		if(this.minInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at least {0}",[this.min],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be greater than {0}",[this.min],null)]);
	} else if(null != this.max && (this.maxInclusive && value > this.max || !this.maxInclusive && value >= this.max)) {
		if(this.maxInclusive) return thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0}",[this.max],null)]); else return thx.util.Result.Failure([new thx.util.Message("value must be lower than {0}",[this.max],null)]);
	} else return thx.util.Result.Ok;
}
thx.validation.RangeValidator.prototype.__class__ = thx.validation.RangeValidator;
thx.svg.LineInterpolator = { __ename__ : ["thx","svg","LineInterpolator"], __constructs__ : ["Linear","StepBefore","StepAfter","Basis","BasisClosed","Cardinal","CardinalClosed"] }
thx.svg.LineInterpolator.Linear = ["Linear",0];
thx.svg.LineInterpolator.Linear.toString = $estr;
thx.svg.LineInterpolator.Linear.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.StepBefore = ["StepBefore",1];
thx.svg.LineInterpolator.StepBefore.toString = $estr;
thx.svg.LineInterpolator.StepBefore.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.StepAfter = ["StepAfter",2];
thx.svg.LineInterpolator.StepAfter.toString = $estr;
thx.svg.LineInterpolator.StepAfter.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Basis = ["Basis",3];
thx.svg.LineInterpolator.Basis.toString = $estr;
thx.svg.LineInterpolator.Basis.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.BasisClosed = ["BasisClosed",4];
thx.svg.LineInterpolator.BasisClosed.toString = $estr;
thx.svg.LineInterpolator.BasisClosed.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Cardinal = function(tension) { var $x = ["Cardinal",5,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.CardinalClosed = function(tension) { var $x = ["CardinalClosed",6,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.js.TestSelection = function(p) {
}
thx.js.TestSelection.__name__ = ["thx","js","TestSelection"];
thx.js.TestSelection.prototype.sel = null;
thx.js.TestSelection.prototype.testAppendRemove = function() {
	utest.Assert.isTrue(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 12, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
	this.sel.append("div");
	utest.Assert.isFalse(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 14, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
	this.sel.select("div").remove();
	utest.Assert.isTrue(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 16, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
}
thx.js.TestSelection.prototype.testSelectAll = function() {
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var counter = 0;
	this.sel.selectAll("div").eachNode(function(n,i) {
		utest.Assert.equals(counter,i,null,{ fileName : "TestSelection.hx", lineNumber : 26, className : "thx.js.TestSelection", methodName : "testSelectAll"});
		utest.Assert.equals("" + counter,n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 27, className : "thx.js.TestSelection", methodName : "testSelectAll"});
		counter++;
	});
}
thx.js.TestSelection.prototype.testUpdate = function() {
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c","e"];
	var update = this.sel.selectAll("div").data(data).update().text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		utest.Assert.equals(data[i],Reflect.field(n,"__data__"),null,{ fileName : "TestSelection.hx", lineNumber : 43, className : "thx.js.TestSelection", methodName : "testUpdate"});
		utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 44, className : "thx.js.TestSelection", methodName : "testUpdate"});
	});
	update.each(function(d,i) {
		utest.Assert.equals(data[i],d,null,{ fileName : "TestSelection.hx", lineNumber : 47, className : "thx.js.TestSelection", methodName : "testUpdate"});
	});
	update.text().stringf(function(d,i) {
		return d.toUpperCase();
	});
	update.eachNode(function(n,i) {
		utest.Assert.equals(data[i].toUpperCase(),n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 50, className : "thx.js.TestSelection", methodName : "testUpdate"});
	});
}
thx.js.TestSelection.prototype.testExit = function() {
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).exit().text().string("X");
	this.sel.selectAll("div").eachNode(function(n,i) {
		if(i < data.length) utest.Assert.equals("" + i,n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 65, className : "thx.js.TestSelection", methodName : "testExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 67, className : "thx.js.TestSelection", methodName : "testExit"});
	});
}
thx.js.TestSelection.prototype.testUpdateExit = function() {
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).update().text().data().exit().text().string("X");
	this.sel.selectAll("div").eachNode(function(n,i) {
		if(i < data.length) utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 85, className : "thx.js.TestSelection", methodName : "testUpdateExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 87, className : "thx.js.TestSelection", methodName : "testUpdateExit"});
	});
}
thx.js.TestSelection.prototype.testEnter = function() {
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c","d","e"];
	this.sel.selectAll("div").data(data).update().text().stringf(function(d,i) {
		return d.toUpperCase();
	}).enter().append("div").text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		if(i < 3) utest.Assert.equals(data[i].toUpperCase(),n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 105, className : "thx.js.TestSelection", methodName : "testEnter"}); else utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 107, className : "thx.js.TestSelection", methodName : "testEnter"});
	});
}
thx.js.TestSelection.prototype.testEnterUpdateExit = function() {
	this.sel.append("div").text().string("X");
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).enter().append("div").text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		if(i > 0) utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 122, className : "thx.js.TestSelection", methodName : "testEnterUpdateExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 124, className : "thx.js.TestSelection", methodName : "testEnterUpdateExit"});
	});
}
thx.js.TestSelection.prototype.testDataAttributeAccess = function() {
	var classes = ["first","second"];
	this.sel.selectAll("div").data(classes).enter().append("div").attr("class").stringf(function(d,i) {
		return d;
	});
	utest.Assert.equals("first",this.sel.select("div").attr("class").get(),null,{ fileName : "TestSelection.hx", lineNumber : 136, className : "thx.js.TestSelection", methodName : "testDataAttributeAccess"});
}
thx.js.TestSelection.prototype.setup = function() {
	this.sel = thx.js.Dom.doc.select("body").append("div");
}
thx.js.TestSelection.prototype.teardown = function() {
	this.sel.remove();
}
thx.js.TestSelection.prototype.__class__ = thx.js.TestSelection;
thx.validation.TestIncrement = function(p) {
}
thx.validation.TestIncrement.__name__ = ["thx","validation","TestIncrement"];
thx.validation.TestIncrement.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestIncrement.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestIncrement.prototype.testValidation = function() {
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
thx.validation.TestIncrement.prototype.__class__ = thx.validation.TestIncrement;
thx.util.TypeFactory = function(p) {
	if( p === $_ ) return;
	this._binders = new Hash();
}
thx.util.TypeFactory.__name__ = ["thx","util","TypeFactory"];
thx.util.TypeFactory.prototype._binders = null;
thx.util.TypeFactory.prototype.instance = function(cls,o) {
	return this.bind(cls,function() {
		return o;
	});
}
thx.util.TypeFactory.prototype.bind = function(cls,f) {
	this._binders.set(Type.getClassName(cls),f);
	return this;
}
thx.util.TypeFactory.prototype.memoize = function(cls,f) {
	var r = null;
	return this.bind(cls,function() {
		if(null == r) r = f();
		return r;
	});
}
thx.util.TypeFactory.prototype.unbinded = function(cls) {
	return null;
}
thx.util.TypeFactory.prototype.get = function(cls) {
	var f = this._binders.get(Type.getClassName(cls));
	if(null == f) return this.unbinded(cls); else return f();
}
thx.util.TypeFactory.prototype.__class__ = thx.util.TypeFactory;
utest.ui.common.ClassResult = function(className,setupName,teardownName) {
	if( className === $_ ) return;
	this.fixtures = new Hash();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest.ui.common.ResultStats();
}
utest.ui.common.ClassResult.__name__ = ["utest","ui","common","ClassResult"];
utest.ui.common.ClassResult.prototype.fixtures = null;
utest.ui.common.ClassResult.prototype.className = null;
utest.ui.common.ClassResult.prototype.setupName = null;
utest.ui.common.ClassResult.prototype.teardownName = null;
utest.ui.common.ClassResult.prototype.hasSetup = null;
utest.ui.common.ClassResult.prototype.hasTeardown = null;
utest.ui.common.ClassResult.prototype.methods = null;
utest.ui.common.ClassResult.prototype.stats = null;
utest.ui.common.ClassResult.prototype.add = function(result) {
	if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
	this.stats.wire(result.stats);
	this.methods++;
	this.fixtures.set(result.methodName,result);
}
utest.ui.common.ClassResult.prototype.get = function(method) {
	return this.fixtures.get(method);
}
utest.ui.common.ClassResult.prototype.exists = function(method) {
	return this.fixtures.exists(method);
}
utest.ui.common.ClassResult.prototype.methodNames = function(errorsHavePriority) {
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
utest.ui.common.ClassResult.prototype.__class__ = utest.ui.common.ClassResult;
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
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
		b.b[b.b.length] = m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line;
		if(s1 != null) b.b[b.b.length] = ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n;
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
haxe.Stack.prototype.__class__ = haxe.Stack;
thx.js.AccessStyle = function(name,selection) {
	if( name === $_ ) return;
	thx.js.Access.call(this,selection);
	this.name = name;
}
thx.js.AccessStyle.__name__ = ["thx","js","AccessStyle"];
thx.js.AccessStyle.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessStyle.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessStyle.prototype.name = null;
thx.js.AccessStyle.prototype.get = function() {
	var n = this.name;
	return this.selection.firstNode(function(node) {
		return js.Lib.window.getComputedStyle(node,null).getPropertyValue(n);
	});
}
thx.js.AccessStyle.prototype.remove = function() {
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		node.style.removeProperty(n);
	});
	return this.selection;
}
thx.js.AccessStyle.prototype.string = function(v,priority) {
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		node.style.setProperty(n,v,priority);
	});
	return this.selection;
}
thx.js.AccessStyle.prototype["float"] = function(v,priority) {
	var s = "" + v, n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		node.style.setProperty(n,s,priority);
	});
	return this.selection;
}
thx.js.AccessStyle.prototype.__class__ = thx.js.AccessStyle;
thx.js.AccessDataStyle = function(name,selection) {
	if( name === $_ ) return;
	thx.js.AccessStyle.call(this,name,selection);
}
thx.js.AccessDataStyle.__name__ = ["thx","js","AccessDataStyle"];
thx.js.AccessDataStyle.__super__ = thx.js.AccessStyle;
for(var k in thx.js.AccessStyle.prototype ) thx.js.AccessDataStyle.prototype[k] = thx.js.AccessStyle.prototype[k];
thx.js.AccessDataStyle.prototype.stringf = function(v,priority) {
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		var s = v(Reflect.field(node,"__data__"),i);
		if(s == null) node.style.removeProperty(n); else node.style.setProperty(n,s,priority);
	});
	return this.selection;
}
thx.js.AccessDataStyle.prototype.floatf = function(v,priority) {
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		var s = v(Reflect.field(node,"__data__"),i);
		if(s == null) node.style.removeProperty(n); else node.style.setProperty(n,"" + s,priority);
	});
	return this.selection;
}
thx.js.AccessDataStyle.prototype.data = function() {
	return this.stringf(function(d,_) {
		return "" + d;
	});
}
thx.js.AccessDataStyle.prototype.__class__ = thx.js.AccessDataStyle;
thx.load.TestMemoryLoader = function(p) {
}
thx.load.TestMemoryLoader.__name__ = ["thx","load","TestMemoryLoader"];
thx.load.TestMemoryLoader.prototype.testLoad = function() {
	var loader = new thx.load.MemoryLoader("my test");
	var f = utest.Assert.createEvent(function(s) {
		utest.Assert.stringContains("test",s,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 11, className : "thx.load.TestMemoryLoader", methodName : "testLoad"});
	});
	loader.load(f);
}
thx.load.TestMemoryLoader.prototype.testError = function() {
	var loader = new thx.load.MemoryLoader(null);
	var e = utest.Assert.createEvent(function(s) {
		utest.Assert.isTrue(true,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 20, className : "thx.load.TestMemoryLoader", methodName : "testError"});
	});
	var h = function(_) {
		haxe.Log.trace("should never reach this point",{ fileName : "TestMemoryLoader.hx", lineNumber : 23, className : "thx.load.TestMemoryLoader", methodName : "testError"});
	};
	loader.load(h,e);
}
thx.load.TestMemoryLoader.prototype.__class__ = thx.load.TestMemoryLoader;
thx.xml.TestXmlFormat = function(p) {
}
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
thx.xml.TestXmlFormat.prototype.testBase = function() {
	var writer = new thx.xml.XmlFormat(false);
	utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><!--COMMENT--><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 39, className : "thx.xml.TestXmlFormat", methodName : "testBase"});
}
thx.xml.TestXmlFormat.prototype.testStripComments = function() {
	var writer = new thx.xml.XmlFormat(false);
	writer.stripComments = true;
	utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 46, className : "thx.xml.TestXmlFormat", methodName : "testStripComments"});
}
thx.xml.TestXmlFormat.prototype.testAutoFormat = function() {
	var writer = new thx.xml.XmlFormat();
	utest.Assert.equals("<?PROLOG?>\n<!DOCTYPE DOCTYPE>\n<body>\n  <!--COMMENT-->\n  <child>\n    <nested/>\n  </child>\n  <child>\n    \n  </child>\n  <![CDATA[CDATA]]>\n  PCDATA\n</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 52, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat"});
}
thx.xml.TestXmlFormat.prototype.testAutoFormat2 = function() {
	var writer = new thx.xml.XmlFormat();
	var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
	utest.Assert.equals("<html>\n  <head>\n    <title>\n      hello\n    </title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>\n          one\n        </li>\n        <li>\n          two\n        </li>\n        <li>\n          three\n        </li>\n      </ul>\n    </div>\n  </body>\n</html>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 60, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat2"});
}
thx.xml.TestXmlFormat.prototype.testAutoWidth = function() {
	var writer = new thx.xml.XmlFormat();
	writer.wrapColumns = 36;
	var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
	utest.Assert.equals("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 89, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidth"});
}
thx.xml.TestXmlFormat.prototype.testAutoWidthWithInlineElements = function() {
	var writer = new thx.xml.XmlFormat();
	writer.wrapColumns = 36;
	var xml = "<body><b>Lorem</b> ipsum <b>dolor sit</b> amet<p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
	utest.Assert.equals("<body>\n  <b>\n    Lorem\n  </b>\n  ipsum\n  <b>\n    dolor sit\n  </b>\n  amet\n  <p>\n    consectetur\n    <b>\n      adipisicing\n    </b>\n    elit,\n    <b>\n      sed do\n    </b>\n    eiusmod tempor incididunt ut\n    labore et dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 121, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidthWithInlineElements"});
}
thx.xml.TestXmlFormat.prototype.__class__ = thx.xml.TestXmlFormat;
thx.math.scale.TestQuantize = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestQuantize.__name__ = ["thx","math","scale","TestQuantize"];
thx.math.scale.TestQuantize.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestQuantize.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestQuantize.prototype.__class__ = thx.math.scale.TestQuantize;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
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
Type = function() { }
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
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
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
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
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
Type.prototype.__class__ = Type;
thx.type.Types = function() { }
thx.type.Types.__name__ = ["thx","type","Types"];
thx.type.Types.isAnonymousObject = function(o) {
	return Reflect.isObject(o) && null == Type.getClass(o);
}
thx.type.Types.className = function(o) {
	return Type.getClassName(Type.getClass(o)).split(".").pop();
}
thx.type.Types.fullName = function(o) {
	return Type.getClassName(Type.getClass(o));
}
thx.type.Types.typeName = function(o) {
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
thx.type.Types.hasSuperClass = function(type,sup) {
	while(null != type) {
		if(type == sup) return true;
		type = Type.getSuperClass(type);
	}
	return false;
}
thx.type.Types.isAnonymous = function(v) {
	return Reflect.isObject(v) && null == Type.getClass(v);
}
thx.type.Types["as"] = function(value,type) {
	return Std["is"](value,type)?value:null;
}
thx.type.Types.ifIs = function(value,type,handler) {
	if(Std["is"](value,type)) handler(value);
	return value;
}
thx.type.Types.of = function(type,value) {
	return Std["is"](value,type)?value:null;
}
thx.type.Types.sameAs = function(a,b) {
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
thx.type.Types.prototype.__class__ = thx.type.Types;
thx.math.scale.TestLog = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestLog.__name__ = ["thx","math","scale","TestLog"];
thx.math.scale.TestLog.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLog.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLog.prototype.testRange = function() {
	var scale = new thx.math.scale.Log().domain(1,10).range(0,1);
	var expected = [Math.NaN,Math.NEGATIVE_INFINITY,-2.0,-1.0,0,0.69897,1.0,2.0];
	var values = [-5.0,0.0,0.01,0.1,1,5,10,100];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestLog.prototype.testInvert = function() {
	var scale = new thx.math.scale.Log().domain(1,10).range(0,1);
	var expected = [1.0,1.023,1.258,3.162,10];
	var values = [0.0,0.01,0.1,0.5,1];
	this.assertScale($closure(scale,"invert"),expected,values);
}
thx.math.scale.TestLog.prototype.testRange12 = function() {
	var scale = new thx.math.scale.Log().domain(1,2).range(0,1);
	var expected = [-1,0.0,0.585,1.0,1.322];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values);
}
thx.math.scale.TestLog.prototype.testInvert12 = function() {
	var scale = new thx.math.scale.Log().domain(1,2).range(0,1);
	var expected = [1.0,1.007,1.072,1.414,2];
	var values = [0.0,0.01,0.1,0.5,1];
	this.assertScale($closure(scale,"invert"),expected,values);
}
thx.math.scale.TestLog.prototype.__class__ = thx.math.scale.TestLog;
Floats = function() { }
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
Floats.interpolate = function(f,a,b,interpolator) {
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == interpolator) interpolator = $closure(thx.math.Equations,"linear");
	return a + interpolator(f) * (b - a);
}
Floats.interpolatef = function(a,b,interpolator) {
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == interpolator) interpolator = $closure(thx.math.Equations,"linear");
	var d = b - a;
	return function(f) {
		return a + interpolator(f) * d;
	};
}
Floats.ascending = function(a,b) {
	return a < b?-1:a > b?1:0;
}
Floats.descending = function(a,b) {
	return a > b?-1:a < b?1:0;
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
			throw new thx.error.Error("Unsupported number format: {0}",null,format,{ fileName : "Floats.hx", lineNumber : 136, className : "Floats", methodName : "formatf"});
			return $r;
		}(this));
	}
}
Floats.prototype.__class__ = Floats;
thx.math.EaseMode = { __ename__ : ["thx","math","EaseMode"], __constructs__ : ["EaseIn","EaseOut","EaseInEaseOut","EaseOutEaseIn"] }
thx.math.EaseMode.EaseIn = ["EaseIn",0];
thx.math.EaseMode.EaseIn.toString = $estr;
thx.math.EaseMode.EaseIn.__enum__ = thx.math.EaseMode;
thx.math.EaseMode.EaseOut = ["EaseOut",1];
thx.math.EaseMode.EaseOut.toString = $estr;
thx.math.EaseMode.EaseOut.__enum__ = thx.math.EaseMode;
thx.math.EaseMode.EaseInEaseOut = ["EaseInEaseOut",2];
thx.math.EaseMode.EaseInEaseOut.toString = $estr;
thx.math.EaseMode.EaseInEaseOut.__enum__ = thx.math.EaseMode;
thx.math.EaseMode.EaseOutEaseIn = ["EaseOutEaseIn",3];
thx.math.EaseMode.EaseOutEaseIn.toString = $estr;
thx.math.EaseMode.EaseOutEaseIn.__enum__ = thx.math.EaseMode;
thx.type.TestAll = function(p) {
}
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
thx.type.TestAll.prototype.__class__ = thx.type.TestAll;
thx.js.AccessClassed = function(selection) {
	if( selection === $_ ) return;
	thx.js.Access.call(this,selection);
}
thx.js.AccessClassed.__name__ = ["thx","js","AccessClassed"];
thx.js.AccessClassed.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessClassed.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessClassed.prototype.remove = function(v) {
	this.selection.eachNode(function(node,i) {
		node.className = node.className.split(v).map(function(d,i1) {
			return StringTools.trim(d);
		}).join(" ");
	});
	return this.selection;
}
thx.js.AccessClassed.prototype.add = function(v) {
	this.selection.eachNode(function(node,i) {
		var cls = node.className;
		if(cls.indexOf(v) >= 0) return;
		node.className += (node.className.length > 0?" ":"") + v;
	});
	return this.selection;
}
thx.js.AccessClassed.prototype.__class__ = thx.js.AccessClassed;
thx.js.AccessDataClassed = function(selection) {
	if( selection === $_ ) return;
	thx.js.AccessClassed.call(this,selection);
}
thx.js.AccessDataClassed.__name__ = ["thx","js","AccessDataClassed"];
thx.js.AccessDataClassed.__super__ = thx.js.AccessClassed;
for(var k in thx.js.AccessClassed.prototype ) thx.js.AccessDataClassed.prototype[k] = thx.js.AccessClassed.prototype[k];
thx.js.AccessDataClassed.prototype.__class__ = thx.js.AccessDataClassed;
utest.Runner = function(p) {
	if( p === $_ ) return;
	this.fixtures = new Array();
	this.onProgress = new utest.Dispatcher();
	this.onStart = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.length = 0;
}
utest.Runner.__name__ = ["utest","Runner"];
utest.Runner.prototype.fixtures = null;
utest.Runner.prototype.onProgress = null;
utest.Runner.prototype.onStart = null;
utest.Runner.prototype.onComplete = null;
utest.Runner.prototype.length = null;
utest.Runner.prototype.addCase = function(test,setup,teardown,prefix,pattern) {
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
utest.Runner.prototype.addFixture = function(fixture) {
	this.fixtures.push(fixture);
	this.length++;
}
utest.Runner.prototype.getFixture = function(index) {
	return this.fixtures[index];
}
utest.Runner.prototype.isMethod = function(test,name) {
	try {
		return Reflect.isFunction(Reflect.field(test,name));
	} catch( e ) {
		return false;
	}
}
utest.Runner.prototype.pos = null;
utest.Runner.prototype.run = function() {
	this.pos = 0;
	this.onStart.dispatch(this);
	this.runNext();
}
utest.Runner.prototype.runNext = function() {
	if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]); else this.onComplete.dispatch(this);
}
utest.Runner.prototype.runFixture = function(fixture) {
	var handler = new utest.TestHandler(fixture);
	handler.onComplete.add($closure(this,"testComplete"));
	handler.execute();
}
utest.Runner.prototype.testComplete = function(h) {
	this.onProgress.dispatch({ result : utest.TestResult.ofHandler(h), done : this.pos, totals : this.length});
	this.runNext();
}
utest.Runner.prototype.__class__ = utest.Runner;
Reflect = function() { }
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
Reflect.prototype.__class__ = Reflect;
if(!thx.culture.core) thx.culture.core = {}
thx.culture.core.DateTimeInfo = function(months,abbrMonths,days,abbrDays,shortDays,am,pm,separatorDate,separatorTime,firstWeekDay,patternYearMonth,patternMonthDay,patternDate,patternDateShort,patternDateRfc,patternDateTime,patternUniversal,patternSortable,patternTime,patternTimeShort) {
	if( months === $_ ) return;
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
}
thx.culture.core.DateTimeInfo.__name__ = ["thx","culture","core","DateTimeInfo"];
thx.culture.core.DateTimeInfo.prototype.months = null;
thx.culture.core.DateTimeInfo.prototype.abbrMonths = null;
thx.culture.core.DateTimeInfo.prototype.days = null;
thx.culture.core.DateTimeInfo.prototype.abbrDays = null;
thx.culture.core.DateTimeInfo.prototype.shortDays = null;
thx.culture.core.DateTimeInfo.prototype.am = null;
thx.culture.core.DateTimeInfo.prototype.pm = null;
thx.culture.core.DateTimeInfo.prototype.separatorDate = null;
thx.culture.core.DateTimeInfo.prototype.separatorTime = null;
thx.culture.core.DateTimeInfo.prototype.firstWeekDay = null;
thx.culture.core.DateTimeInfo.prototype.patternYearMonth = null;
thx.culture.core.DateTimeInfo.prototype.patternMonthDay = null;
thx.culture.core.DateTimeInfo.prototype.patternDate = null;
thx.culture.core.DateTimeInfo.prototype.patternDateShort = null;
thx.culture.core.DateTimeInfo.prototype.patternDateRfc = null;
thx.culture.core.DateTimeInfo.prototype.patternDateTime = null;
thx.culture.core.DateTimeInfo.prototype.patternUniversal = null;
thx.culture.core.DateTimeInfo.prototype.patternSortable = null;
thx.culture.core.DateTimeInfo.prototype.patternTime = null;
thx.culture.core.DateTimeInfo.prototype.patternTimeShort = null;
thx.culture.core.DateTimeInfo.prototype.__class__ = thx.culture.core.DateTimeInfo;
DynamicsT = function() { }
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
DynamicsT.prototype.__class__ = DynamicsT;
TestAll = function() { }
TestAll.__name__ = ["TestAll"];
TestAll.addTests = function(runner) {
	thx.culture.Culture.setDefaultCulture(thx.cultures.EnUS.getCulture());
	thx.js.TestAll.addTests(runner);
	thx.collections.TestAll.addTests(runner);
	thx.color.TestAll.addTests(runner);
	thx.doc.TestAll.addTests(runner);
	runner.addCase(new thx.data.TestData());
	runner.addCase(new thx.json.TestJson());
	thx.load.TestAll.addTests(runner);
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
TestAll.prototype.__class__ = TestAll;
thx.validation.TestDateRange = function(p) {
}
thx.validation.TestDateRange.__name__ = ["thx","validation","TestDateRange"];
thx.validation.TestDateRange.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestDateRange.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestDateRange.prototype.testValidation = function() {
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
thx.validation.TestDateRange.prototype.__class__ = thx.validation.TestDateRange;
thx.xml.XmlFormat = function(autoformat,indent,newline) {
	if( autoformat === $_ ) return;
	if(autoformat == null) autoformat = true;
	this.autoformat = autoformat;
	this.indent = indent;
	this.newline = newline;
	this.normalizeNewlines = true;
}
thx.xml.XmlFormat.__name__ = ["thx","xml","XmlFormat"];
thx.xml.XmlFormat.prototype.indent = null;
thx.xml.XmlFormat.prototype.newline = null;
thx.xml.XmlFormat.prototype.stripComments = null;
thx.xml.XmlFormat.prototype.autoformat = null;
thx.xml.XmlFormat.prototype.normalizeNewlines = null;
thx.xml.XmlFormat.prototype.wrapColumns = null;
thx.xml.XmlFormat.prototype.format = function(xml) {
	var valueFormat = this.createValueFormat();
	var attributeFormat = this.createAttributeFormat();
	var documentFormat = this.createDocumentFormat();
	var nodeFormat = this.createNodeFormat();
	documentFormat.nodeFormat = nodeFormat;
	nodeFormat.valueFormat = valueFormat;
	nodeFormat.attributeFormat = attributeFormat;
	return documentFormat.format(xml);
}
thx.xml.XmlFormat.prototype.createValueFormat = function() {
	if(this.autoformat) return new thx.xml.NormalizeWhitespaceValueFormat(); else if(this.normalizeNewlines) return new thx.xml.NormalizeNewlineValueFormat(this.newline); else return new thx.xml.ValueFormat();
}
thx.xml.XmlFormat.prototype.createAttributeFormat = function() {
	return new thx.xml.AttributeFormat();
}
thx.xml.XmlFormat.prototype.createDocumentFormat = function() {
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
thx.xml.XmlFormat.prototype.createNodeFormat = function() {
	return new thx.xml.NodeFormat();
}
thx.xml.XmlFormat.prototype.__class__ = thx.xml.XmlFormat;
thx.html.HtmlVersion = { __ename__ : ["thx","html","HtmlVersion"], __constructs__ : ["Html401Strict","Html401Transitional","Html401Frameset","Html5","XHtml10Transitional","XHtml10Strict","XHtml10Frameset","XHtml11"] }
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
thx.culture.Language = function() { }
thx.culture.Language.__name__ = ["thx","culture","Language"];
thx.culture.Language.__super__ = thx.culture.Info;
for(var k in thx.culture.Info.prototype ) thx.culture.Language.prototype[k] = thx.culture.Info.prototype[k];
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
thx.culture.Language.prototype.__class__ = thx.culture.Language;
if(!thx.languages) thx.languages = {}
thx.languages.En = function(p) {
	if( p === $_ ) return;
	this.name = "en";
	this.english = "English";
	this["native"] = "English";
	this.iso2 = "en";
	this.iso3 = "eng";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
}
thx.languages.En.__name__ = ["thx","languages","En"];
thx.languages.En.__super__ = thx.culture.Language;
for(var k in thx.culture.Language.prototype ) thx.languages.En.prototype[k] = thx.culture.Language.prototype[k];
thx.languages.En.language = null;
thx.languages.En.getLanguage = function() {
	if(null == thx.languages.En.language) thx.languages.En.language = new thx.languages.En();
	return thx.languages.En.language;
}
thx.languages.En.prototype.__class__ = thx.languages.En;
thx.color.TestAll = function(p) {
}
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
thx.color.TestAll.prototype.__class__ = thx.color.TestAll;
utest.ui.text.PlainTextReport = function(runner,outputHandler) {
	if( runner === $_ ) return;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
}
utest.ui.text.PlainTextReport.__name__ = ["utest","ui","text","PlainTextReport"];
utest.ui.text.PlainTextReport.prototype.displaySuccessResults = null;
utest.ui.text.PlainTextReport.prototype.displayHeader = null;
utest.ui.text.PlainTextReport.prototype.handler = null;
utest.ui.text.PlainTextReport.prototype.aggregator = null;
utest.ui.text.PlainTextReport.prototype.newline = null;
utest.ui.text.PlainTextReport.prototype.indent = null;
utest.ui.text.PlainTextReport.prototype.setHandler = function(handler) {
	this.handler = handler;
}
utest.ui.text.PlainTextReport.prototype.startTime = null;
utest.ui.text.PlainTextReport.prototype.start = function(e) {
	this.startTime = haxe.Timer.stamp();
}
utest.ui.text.PlainTextReport.prototype.indents = function(c) {
	var s = "";
	var _g = 0;
	while(_g < c) {
		var _ = _g++;
		s += this.indent;
	}
	return s;
}
utest.ui.text.PlainTextReport.prototype.dumpStack = function(stack) {
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
utest.ui.text.PlainTextReport.prototype.addHeader = function(buf,result) {
	if(!utest.ui.common.ReportTools.hasHeader(this,result.stats)) return;
	var end = haxe.Timer.stamp();
	var time = Std["int"]((end - this.startTime) * 1000) / 1000;
	buf.b[buf.b.length] = "results: " + (result.stats.isOk?"ALL TESTS OK":"SOME TESTS FAILURES") + this.newline + " " + this.newline;
	buf.b[buf.b.length] = "assertations: " + result.stats.assertations + this.newline;
	buf.b[buf.b.length] = "successes: " + result.stats.successes + this.newline;
	buf.b[buf.b.length] = "errors: " + result.stats.errors + this.newline;
	buf.b[buf.b.length] = "failures: " + result.stats.failures + this.newline;
	buf.b[buf.b.length] = "warnings: " + result.stats.warnings + this.newline;
	buf.b[buf.b.length] = "execution time: " + time + this.newline;
	buf.b[buf.b.length] = this.newline;
}
utest.ui.text.PlainTextReport.prototype.result = null;
utest.ui.text.PlainTextReport.prototype.getResults = function() {
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
			buf.b[buf.b.length] = (pname == ""?"":pname + ".") + cname + this.newline;
			var _g4 = 0, _g5 = cls.methodNames();
			while(_g4 < _g5.length) {
				var mname = _g5[_g4];
				++_g4;
				var fix = cls.get(mname);
				if(utest.ui.common.ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) continue;
				buf.b[buf.b.length] = this.indents(1) + mname + ": ";
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
				buf.b[buf.b.length] = this.newline;
				buf.b[buf.b.length] = messages;
			}
		}
	}
	return buf.b.join("");
}
utest.ui.text.PlainTextReport.prototype.complete = function(result) {
	this.result = result;
	this.handler(this);
}
utest.ui.text.PlainTextReport.prototype.__class__ = utest.ui.text.PlainTextReport;
utest.ui.text.PlainTextReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.PrintReport = function(runner) {
	if( runner === $_ ) return;
	utest.ui.text.PlainTextReport.call(this,runner,$closure(this,"_handler"));
	this.newline = "\n";
	this.indent = "  ";
}
utest.ui.text.PrintReport.__name__ = ["utest","ui","text","PrintReport"];
utest.ui.text.PrintReport.__super__ = utest.ui.text.PlainTextReport;
for(var k in utest.ui.text.PlainTextReport.prototype ) utest.ui.text.PrintReport.prototype[k] = utest.ui.text.PlainTextReport.prototype[k];
utest.ui.text.PrintReport.prototype.useTrace = null;
utest.ui.text.PrintReport.prototype._handler = function(report) {
	this._trace(report.getResults());
}
utest.ui.text.PrintReport.prototype._trace = function(s) {
	s = StringTools.replace(s,"  ",this.indent);
	s = StringTools.replace(s,"\n",this.newline);
	haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 68, className : "utest.ui.text.PrintReport", methodName : "_trace"});
}
utest.ui.text.PrintReport.prototype.__class__ = utest.ui.text.PrintReport;
thx.math.Random = function(seed) {
	if( seed === $_ ) return;
	if(seed == null) seed = 1;
	this.seed = seed;
}
thx.math.Random.__name__ = ["thx","math","Random"];
thx.math.Random.prototype.seed = null;
thx.math.Random.prototype["int"] = function() {
	return (this.seed = this.seed * 16807 % 2147483647) & 1073741823;
}
thx.math.Random.prototype["float"] = function() {
	return ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) / 1073741823.0;
}
thx.math.Random.prototype.__class__ = thx.math.Random;
thx.text.TestPaths = function(p) {
}
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
thx.text.TestPaths.prototype.__class__ = thx.text.TestPaths;
thx.math.scale.Linear = function(p) {
	if( p === $_ ) return;
	thx.math.scale.NumericScale.call(this);
	this.m = 10;
}
thx.math.scale.Linear.__name__ = ["thx","math","scale","Linear"];
thx.math.scale.Linear.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Linear.prototype[k] = thx.math.scale.NumericScale.prototype[k];
thx.math.scale.Linear.prototype.m = null;
thx.math.scale.Linear.prototype.getModulo = function() {
	return this.m;
}
thx.math.scale.Linear.prototype.modulo = function(m) {
	this.m = m;
	return this;
}
thx.math.scale.Linear.prototype.tickRange = function() {
	var start = Math.min(this.x0,this.x1), stop = Math.max(this.x0,this.x1), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / this.m) / 2.302585092994046)), err = this.m / (span / step);
	if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= .75) step *= 2;
	return { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
}
thx.math.scale.Linear.prototype.ticks = function() {
	var range = this.tickRange();
	return Floats.range(range.start,range.stop,range.step);
}
thx.math.scale.Linear.prototype.tickFormat = function(v,i) {
	var n = Math.max(0,-Math.floor(Math.log(this.tickRange().step) / 2.302585092994046 + .01));
	return Floats.format(v,"D:" + n);
}
thx.math.scale.Linear.prototype.__class__ = thx.math.scale.Linear;
thx.svg.LineInternals = function() { }
thx.svg.LineInternals.__name__ = ["thx","svg","LineInternals"];
thx.svg.LineInternals.linePoints = function(data,x,y) {
	var points = [], i = -1, n = data.length, fx = null != x, fy = null != y, value;
	while(++i < n) points.push([x(value = data[i],i),y(value,i)]);
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
		path.push(p[0] + "," + p[1]);
		while(++i < n) {
			p = points[i];
			path.push("V" + p[1] + "H" + p[0]);
		}
		break;
	case 2:
		path.push(p[0] + "," + p[1]);
		while(++i < n) {
			p = points[i];
			path.push("H" + p[0] + "V" + p[1]);
		}
		break;
	case 3:
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
	case 4:
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
	case 5:
		var tension = $e[2];
		if(null == tension) tension = .7;
		if(points.length < 3) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear); else return points[0] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents(points,tension));
		break;
	case 6:
		var tension = $e[2];
		if(null == tension) tension = .7;
		return points.length < 3?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[0] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents([points[points.length - 2]].concat(points).concat([points[1]]),tension));
	}
	return path.join("");
}
thx.svg.LineInternals._lineDot4 = function(a,b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
thx.svg.LineInternals._lineBasisBezier = function(path,x,y) {
	path.push("C" + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,y));
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
thx.svg.LineInternals.prototype.__class__ = thx.svg.LineInternals;
Lambda = function() { }
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
Lambda.prototype.__class__ = Lambda;
thx.math.scale.Ordinal = function(p) {
	if( p === $_ ) return;
	this._domain = [];
	this._range = [];
	this.rangeBand = 0.0;
}
thx.math.scale.Ordinal.__name__ = ["thx","math","scale","Ordinal"];
thx.math.scale.Ordinal.prototype._domain = null;
thx.math.scale.Ordinal.prototype._range = null;
thx.math.scale.Ordinal.prototype.rangeBand = null;
thx.math.scale.Ordinal.prototype.scalef = function() {
	return $closure(this,"scale");
}
thx.math.scale.Ordinal.prototype.scaleMap = function(x,i) {
	return this.scale(x);
}
thx.math.scale.Ordinal.prototype.scale = function(x) {
	var i = this._domain.indexOf(x);
	if(i < 0) {
		this._domain.push(x);
		i = this._domain.length - 1;
	}
	return this._range[i];
}
thx.math.scale.Ordinal.prototype.getDomain = function() {
	return this._domain.copy();
}
thx.math.scale.Ordinal.prototype.domain = function(x) {
	this._domain = x.copy();
	return this;
}
thx.math.scale.Ordinal.prototype.getRange = function() {
	return this._range.copy();
}
thx.math.scale.Ordinal.prototype.range = function(a) {
	this._range = a.copy();
	return this;
}
thx.math.scale.Ordinal.prototype.rangePoints = function(start,stop,padding) {
	if(padding == null) padding = 0.0;
	var step = (stop - start) / (this._domain.length - 1 + padding);
	var range = this._domain.length == 1?[(start + stop) / 2]:Floats.range(start + step * padding / 2,stop + step / 2,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = 0;
	return ordinal;
}
thx.math.scale.Ordinal.prototype.rangeBands = function(start,stop,padding) {
	if(padding == null) padding = 0.0;
	var step = (stop - start) / (this._domain.length + padding);
	var range = Floats.range(start + step * padding,stop,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = step * (1 - padding);
	return ordinal;
}
thx.math.scale.Ordinal.prototype.rangeRoundBands = function(start,stop,padding) {
	if(padding == null) padding = 0.0;
	var diff = stop - start, step = Math.floor(diff / (this._domain.length + padding)), err = diff - (this._domain.length - padding) * step;
	var range = Ints.range(start + Math.round(err / 2),stop,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = Math.round(step * (1 - padding));
	return ordinal;
}
thx.math.scale.Ordinal.prototype.__class__ = thx.math.scale.Ordinal;
Dates = function() { }
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
	case "WN":
		return function(d) {
			return thx.culture.FormatDate.weekDayName(d,culture);
		};
	case "WS":
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
Dates.interpolate = function(f,a,b,interpolator) {
	return (Dates.interpolatef(a,b,interpolator))(f);
}
Dates.interpolatef = function(a,b,interpolator) {
	var f = Floats.interpolatef(a.getTime(),b.getTime(),interpolator);
	return function(v) {
		return Date.fromTime(f(v));
	};
}
Dates.snap = function(time,period) {
	switch(period) {
	case "second":
		return Math.round(time / 1000) * 1000;
	case "minute":
		return Math.round(time / 60000) * 60000;
	case "hour":
		return Math.round(time / 3600000) * 3600000;
	case "day":
		return Math.round(time / 86400000) * 86400000;
	case "week":
		return Math.round(time / 604800000) * 604800000;
	case "month":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear(),d.getMonth(),1,0,0,0).getTime();
	case "year":
		var d = Date.fromTime(time);
		return new Date(d.getFullYear(),0,1,0,0,0).getTime();
	default:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 107, className : "Dates", methodName : "snap"});
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
		throw new thx.error.Error("unknown week day '{0}'",null,day,{ fileName : "Dates.hx", lineNumber : 132, className : "Dates", methodName : "snapToWeekDay"});
	}
	return time - (d - s) % 7 * 24 * 60 * 60 * 1000;
}
Dates.prototype.__class__ = Dates;
thx.validation.TestCustomValidator = function(p) {
}
thx.validation.TestCustomValidator.__name__ = ["thx","validation","TestCustomValidator"];
thx.validation.TestCustomValidator.prototype.testValidation = function() {
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
thx.validation.TestCustomValidator.prototype.__class__ = thx.validation.TestCustomValidator;
thx.math.scale.Quantile = function(p) {
	if( p === $_ ) return;
	this._domain = [];
	this._range = [];
	this._thresolds = [];
}
thx.math.scale.Quantile.__name__ = ["thx","math","scale","Quantile"];
thx.math.scale.Quantile.prototype._domain = null;
thx.math.scale.Quantile.prototype._range = null;
thx.math.scale.Quantile.prototype._thresolds = null;
thx.math.scale.Quantile.prototype.rescale = function() {
	var i = -1, n = this._range.length, k = this._domain.length / n;
	if(this._thresolds.length > n) this._thresolds = this._thresolds.splice(0,n);
	while(++i < n) this._thresolds[i] = this._domain[Std["int"](i * k)];
}
thx.math.scale.Quantile.prototype._quantile = function(value) {
	if(Math.isNaN(value)) return -1;
	var low = 0, high = this._thresolds.length - 1;
	while(low <= high) {
		var mid = low + high >> 1, midValue = this._thresolds[mid];
		if(midValue < value) low = mid + 1; else if(midValue > value) high = mid - 1; else return mid;
	}
	return high < 0?0:high;
}
thx.math.scale.Quantile.prototype.scaleMap = function(x,i) {
	return this.scale(x);
}
thx.math.scale.Quantile.prototype.scale = function(v) {
	return this._range[this._quantile(v)];
}
thx.math.scale.Quantile.prototype.getDomain = function() {
	return this._domain;
}
thx.math.scale.Quantile.prototype.domain = function(x) {
	this._domain = Arrays.filter(x,function(d) {
		return !Math.isNaN(d);
	});
	this._domain.sort($closure(Floats,"ascending"));
	this.rescale();
	return this;
}
thx.math.scale.Quantile.prototype.getRange = function() {
	return this._range;
}
thx.math.scale.Quantile.prototype.range = function(x) {
	this._range = x.copy();
	this.rescale();
	return this;
}
thx.math.scale.Quantile.prototype.getQuantiles = function() {
	return $closure(this._thresolds,"copy");
}
thx.math.scale.Quantile.prototype.__class__ = thx.math.scale.Quantile;
thx.svg.Arc = function(p) {
	if( p === $_ ) return;
	this.r0 = 0;
	this.r1 = 1;
	this.a0 = 0;
	this.a1 = Math.PI;
}
thx.svg.Arc.__name__ = ["thx","svg","Arc"];
thx.svg.Arc.__super__ = thx.svg.Shape;
for(var k in thx.svg.Shape.prototype ) thx.svg.Arc.prototype[k] = thx.svg.Shape.prototype[k];
thx.svg.Arc.prototype.r0 = null;
thx.svg.Arc.prototype.r1 = null;
thx.svg.Arc.prototype.a0 = null;
thx.svg.Arc.prototype.a1 = null;
thx.svg.Arc.prototype.getInnerRadius = function() {
	return this.r0;
}
thx.svg.Arc.prototype.innerRadius = function(v) {
	this.r0 = v;
	return this;
}
thx.svg.Arc.prototype.getOuterRadius = function() {
	return this.r0;
}
thx.svg.Arc.prototype.outerRadius = function(v) {
	this.r1 = v;
	return this;
}
thx.svg.Arc.prototype.getStartAngle = function() {
	return this.r0;
}
thx.svg.Arc.prototype.startAngle = function(v) {
	this.a0 = v;
	return this;
}
thx.svg.Arc.prototype.getEndAngle = function() {
	return this.r0;
}
thx.svg.Arc.prototype.endAngle = function(v) {
	this.a1 = v;
	return this;
}
thx.svg.Arc.prototype.shape = function(d,i) {
	thx.svg.Shape.prototype.shape.call(this,d,i);
	var a0 = this.a0 + thx.svg.LineInternals.arcOffset, a1 = this.a1 + thx.svg.LineInternals.arcOffset, da = a1 - a0, df = da < Math.PI?"0":"1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
	return da >= thx.svg.LineInternals.arcMax?this.r0 != 0?"M0," + this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + -this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + this.r1 + "M0," + this.r0 + "A" + this.r0 + "," + this.r0 + " 0 1,1 0," + -this.r0 + "A" + this.r0 + "," + this.r0 + " 0 1,1 0," + this.r0 + "Z":"M0," + this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + -this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + this.r1 + "Z":this.r0 != 0?"M" + this.r1 * c0 + "," + this.r1 * s0 + "A" + this.r1 + "," + this.r1 + " 0 " + df + ",1 " + this.r1 * c1 + "," + this.r1 * s1 + "L" + this.r0 * c1 + "," + this.r0 * s1 + "A" + this.r0 + "," + this.r0 + " 0 " + df + ",0 " + this.r0 * c0 + "," + this.r0 * s0 + "Z":"M" + this.r1 * c0 + "," + this.r1 * s0 + "A" + this.r1 + "," + this.r1 + " 0 " + df + ",1 " + this.r1 * c1 + "," + this.r1 * s1 + "L0,0" + "Z";
}
thx.svg.Arc.prototype.centroid = function() {
	var r = (this.r0 + this.r1) / 2, a = (this.a0 + this.a1) / 2 + thx.svg.LineInternals.arcOffset;
	return [Math.cos(a) * r,Math.sin(a) * r];
}
thx.svg.Arc.prototype.__class__ = thx.svg.Arc;
thx.data.Data = function() { }
thx.data.Data.__name__ = ["thx","data","Data"];
thx.data.Data.toConfigExpr = function(o) {
	var $e = (Type["typeof"](o));
	switch( $e[1] ) {
	case 8:
	case 7:
	case 5:
		return (function($this) {
			var $r;
			throw new thx.error.Error("unsupported type '{0}'",null,Std.string(o),{ fileName : "Data.hx", lineNumber : 14, className : "thx.data.Data", methodName : "toConfigExpr"});
			return $r;
		}(this));
	case 6:
		var c = $e[2];
		if(Std["is"](o,Array)) {
			var a = o;
			var arr = [];
			var _g = 0;
			while(_g < a.length) {
				var v = a[_g];
				++_g;
				arr.push(thx.data.Data.toConfigExpr(v));
			}
			return thx.data.DataExpr.CEArray(arr);
		} else if(Std["is"](o,Hash)) {
			var h = o;
			var arr = [];
			var $it0 = h.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				arr.push({ k : k, v : thx.data.Data.toConfigExpr(h.get(k))});
			}
			return thx.data.DataExpr.CEObject(arr);
		}
		switch(Type.getClassName(c)) {
		case "String":
			return thx.data.DataExpr.CEString(o);
		case "Date":
			return thx.data.DataExpr.CEDate(thx.data.Data.dateToString(o));
		default:
			return (function($this) {
				var $r;
				throw new thx.error.Error("unsupported class '{0}'",null,c,{ fileName : "Data.hx", lineNumber : 37, className : "thx.data.Data", methodName : "toConfigExpr"});
				return $r;
			}(this));
		}
		break;
	case 0:
		return thx.data.DataExpr.CENull;
	case 3:
		return thx.data.DataExpr.CEBool(o);
	case 1:
		return thx.data.DataExpr.CEInt(o);
	case 2:
		return thx.data.DataExpr.CEFloat(o);
	case 4:
		var arr = [];
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			arr.push({ k : k, v : thx.data.Data.toConfigExpr(Reflect.field(o,k))});
		}
		return thx.data.DataExpr.CEObject(arr);
	}
}
thx.data.Data.toDynamic = function(ce) {
	var $e = (ce);
	switch( $e[1] ) {
	case 0:
		var o = $e[2];
		var obj = { };
		var _g = 0;
		while(_g < o.length) {
			var pair = o[_g];
			++_g;
			obj[pair.k] = thx.data.Data.toDynamic(pair.v);
		}
		return obj;
	case 1:
		var a = $e[2];
		var arr = [];
		var _g = 0;
		while(_g < a.length) {
			var v = a[_g];
			++_g;
			arr.push(thx.data.Data.toDynamic(v));
		}
		return arr;
	case 2:
		var s = $e[2];
		return s;
	case 3:
		var f = $e[2];
		return f;
	case 4:
		var i = $e[2];
		return i;
	case 5:
		var d = $e[2];
		return thx.data.Data.stringToDate(d);
	case 6:
		var b = $e[2];
		return b;
	case 7:
		return null;
	}
	return null;
}
thx.data.Data.stringToDate = function(s) {
	var parts = s.split(".");
	var date = Date.fromString(StringTools.replace(parts[0],"T"," "));
	if(parts.length > 1) date = Date.fromTime(date.getTime() + Std.parseInt(parts[1]));
	return date;
}
thx.data.Data.dateToString = function(d) {
	var v = d.getTime() % 1000;
	var m = "";
	if(v > 0) m = "." + StringTools.lpad("" + v,"0",3);
	return DateTools.format(d,"%Y-%m-%dT%H:%M:%S") + m;
}
thx.data.Data.prototype.__class__ = thx.data.Data;
thx.html.Element = function() { }
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
thx.html.Element.prototype.__class__ = thx.html.Element;
thx.js.TestSizzle = function(p) {
}
thx.js.TestSizzle.__name__ = ["thx","js","TestSizzle"];
thx.js.TestSizzle.prototype.node = null;
thx.js.TestSizzle.prototype.setup = function() {
	this.node = js.Lib.document.createElement("div");
	this.node.id = "testsizzle";
	js.Lib.document.body.appendChild(this.node);
}
thx.js.TestSizzle.prototype.teardown = function() {
	js.Lib.document.body.removeChild(this.node);
}
thx.js.TestSizzle.prototype.testSizzle = function() {
	var selection = thx.js.Sizzle.select("#testsizzle");
	utest.Assert.equals(1,selection.length,null,{ fileName : "TestSizzle.hx", lineNumber : 32, className : "thx.js.TestSizzle", methodName : "testSizzle"});
	utest.Assert.equals(this.node,selection[0],null,{ fileName : "TestSizzle.hx", lineNumber : 33, className : "thx.js.TestSizzle", methodName : "testSizzle"});
}
thx.js.TestSizzle.prototype.__class__ = thx.js.TestSizzle;
utest.TestResult = function(p) {
}
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
utest.TestResult.prototype.pack = null;
utest.TestResult.prototype.cls = null;
utest.TestResult.prototype.method = null;
utest.TestResult.prototype.setup = null;
utest.TestResult.prototype.teardown = null;
utest.TestResult.prototype.assertations = null;
utest.TestResult.prototype.__class__ = utest.TestResult;
thx.xml.TestXmlWriter = function(p) {
}
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
thx.xml.TestXmlWriter.prototype.w = null;
thx.xml.TestXmlWriter.prototype.testBasics = function() {
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
thx.xml.TestXmlWriter.prototype.getWriter = function() {
	return new thx.xml.XmlWriter();
}
thx.xml.TestXmlWriter.prototype.__class__ = thx.xml.TestXmlWriter;
thx.js.TestAll = function(p) {
}
thx.js.TestAll.__name__ = ["thx","js","TestAll"];
thx.js.TestAll.addTests = function(runner) {
	runner.addCase(new thx.js.TestDom());
	runner.addCase(new thx.js.TestSizzle());
	runner.addCase(new thx.js.TestSelection());
}
thx.js.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.js.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.js.TestAll.prototype.__class__ = thx.js.TestAll;
thx.util.Result = { __ename__ : ["thx","util","Result"], __constructs__ : ["Ok","Failure"] }
thx.util.Result.Ok = ["Ok",0];
thx.util.Result.Ok.toString = $estr;
thx.util.Result.Ok.__enum__ = thx.util.Result;
thx.util.Result.Failure = function(messages) { var $x = ["Failure",1,messages]; $x.__enum__ = thx.util.Result; $x.toString = $estr; return $x; }
thx.validation.TestPatternValidator = function(p) {
}
thx.validation.TestPatternValidator.__name__ = ["thx","validation","TestPatternValidator"];
thx.validation.TestPatternValidator.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestPatternValidator.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestPatternValidator.prototype.testValidation = function() {
	var validator = new thx.validation.PatternValidator(new EReg("^[aeiou]+$","i"));
	this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 15, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("b"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 16, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("aba"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 17, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("UiU"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 18, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
}
thx.validation.TestPatternValidator.prototype.__class__ = thx.validation.TestPatternValidator;
thx.validation.TestOptionValidator = function(p) {
}
thx.validation.TestOptionValidator.__name__ = ["thx","validation","TestOptionValidator"];
thx.validation.TestOptionValidator.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestOptionValidator.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestOptionValidator.prototype.testValidation = function() {
	var validator = new thx.validation.OptionValidator(null,["a","b","c"]);
	this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 15, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("b"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 16, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("c"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 17, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("A"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 18, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("d"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 19, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("aa"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 20, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
}
thx.validation.TestOptionValidator.prototype.__class__ = thx.validation.TestOptionValidator;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
thx.color.TestRgb = function(p) {
}
thx.color.TestRgb.__name__ = ["thx","color","TestRgb"];
thx.color.TestRgb.prototype.testBasics = function() {
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.black,new thx.color.Rgb(0,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 15, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.white,new thx.color.Rgb(255,255,255)),null,{ fileName : "TestRgb.hx", lineNumber : 16, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,new thx.color.Rgb(255,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 17, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,thx.color.Rgb.fromInt(16711680)),null,{ fileName : "TestRgb.hx", lineNumber : 18, className : "thx.color.TestRgb", methodName : "testBasics"});
}
thx.color.TestRgb.prototype.__class__ = thx.color.TestRgb;
TestInts = function(p) {
}
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
TestInts.prototype.testRange = function() {
	utest.Assert.same([0,1,2],Ints.range(3),null,null,{ fileName : "TestInts.hx", lineNumber : 14, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([3,4,5],Ints.range(3,6),null,null,{ fileName : "TestInts.hx", lineNumber : 15, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([4,6,8],Ints.range(4,9,2),null,null,{ fileName : "TestInts.hx", lineNumber : 16, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([8,6,4],Ints.range(8,3,-2),null,null,{ fileName : "TestInts.hx", lineNumber : 17, className : "TestInts", methodName : "testRange"});
}
TestInts.prototype.testInterpolate = function() {
	utest.Assert.equals(0,Ints.interpolate(0.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 22, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(127,Ints.interpolate(0.499,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 23, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(255,Ints.interpolate(1.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 24, className : "TestInts", methodName : "testInterpolate"});
}
TestInts.prototype.__class__ = TestInts;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
thx.culture.FormatDate = function() { }
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
			buf.b[buf.b.length] = c;
			pos++;
			continue;
		}
		pos++;
		c = pattern.charAt(pos);
		switch(c) {
		case "a":
			buf.b[buf.b.length] = info.abbrDays[date.getDay()];
			break;
		case "A":
			buf.b[buf.b.length] = info.days[date.getDay()];
			break;
		case "b":case "h":
			buf.b[buf.b.length] = info.abbrMonths[date.getMonth()];
			break;
		case "B":
			buf.b[buf.b.length] = info.months[date.getMonth()];
			break;
		case "c":
			buf.b[buf.b.length] = thx.culture.FormatDate.dateTime(date,culture);
			break;
		case "C":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits("" + Math.floor(date.getFullYear() / 100),culture);
			break;
		case "d":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getDate(),"0",2),culture);
			break;
		case "D":
			buf.b[buf.b.length] = thx.culture.FormatDate.format("%m/%d/%y",date,culture);
			break;
		case "e":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getDate()," ",2):"" + date.getDate(),culture);
			break;
		case "f":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + (date.getMonth() + 1)," ",2):"" + (date.getMonth() + 1),culture);
			break;
		case "G":
			throw "Not Implemented Yet";
			break;
		case "g":
			throw "Not Implemented Yet";
			break;
		case "H":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getHours(),"0",2),culture);
			break;
		case "i":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getMinutes()," ",2):"" + date.getMinutes(),culture);
			break;
		case "I":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getHours() % 12,"0",2),culture);
			break;
		case "j":
			throw "Not Implemented Yet";
			break;
		case "k":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getHours()," ",2):"" + date.getHours(),culture);
			break;
		case "l":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getHours() % 12," ",2):"" + date.getHours() % 12,culture);
			break;
		case "m":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + (date.getMonth() + 1),"0",2),culture);
			break;
		case "M":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getMinutes(),"0",2),culture);
			break;
		case "n":
			buf.b[buf.b.length] = "\n";
			break;
		case "p":
			buf.b[buf.b.length] = date.getHours() > 11?info.pm:info.am;
			break;
		case "P":
			buf.b[buf.b.length] = (date.getHours() > 11?info.pm:info.am).toLowerCase();
			break;
		case "q":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(leadingspace?StringTools.lpad("" + date.getSeconds()," ",2):"" + date.getSeconds(),culture);
			break;
		case "r":
			buf.b[buf.b.length] = thx.culture.FormatDate.format("%I:%M:%S %p",date,culture);
			break;
		case "R":
			buf.b[buf.b.length] = thx.culture.FormatDate.format("%H:%M",date,culture);
			break;
		case "s":
			buf.b[buf.b.length] = "" + Std["int"](date.getTime() / 1000);
			break;
		case "S":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(StringTools.lpad("" + date.getSeconds(),"0",2),culture);
			break;
		case "t":
			buf.b[buf.b.length] = "\t";
			break;
		case "T":
			buf.b[buf.b.length] = thx.culture.FormatDate.format("%H:%M:%S",date,culture);
			break;
		case "u":
			var d = date.getDay();
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(d == 0?"7":"" + d,culture);
			break;
		case "U":
			throw "Not Implemented Yet";
			break;
		case "V":
			throw "Not Implemented Yet";
			break;
		case "w":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits("" + date.getDay(),culture);
			break;
		case "W":
			throw "Not Implemented Yet";
			break;
		case "x":
			buf.b[buf.b.length] = thx.culture.FormatDate.date(date,culture);
			break;
		case "X":
			buf.b[buf.b.length] = thx.culture.FormatDate.time(date,culture);
			break;
		case "y":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits(("" + date.getFullYear()).substr(-2),culture);
			break;
		case "Y":
			buf.b[buf.b.length] = thx.culture.FormatNumber.digits("" + date.getFullYear(),culture);
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
			buf.b[buf.b.length] = "%" + c;
		}
		pos++;
	}
	return buf.b.join("");
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
thx.culture.FormatDate.prototype.__class__ = thx.culture.FormatDate;
thx.js.BaseTransition = function(selection) {
	if( selection === $_ ) return;
	this.selection = selection;
	var tid = this._transitionId = thx.js.BaseTransition._inheritid > 0?thx.js.BaseTransition._inheritid:++thx.js.BaseTransition._id;
	this._tweens = new Hash();
	this._interpolators = [];
	this._remove = false;
	this._stage = [];
	this._delay = [];
	this._duration = [];
	this._ease = thx.math.Ease.mode(thx.math.EaseMode.EaseInEaseOut,$closure(thx.math.Equations,"cubic"));
	this._step = $closure(this,"step");
	selection.eachNode(function(n,_) {
		if(Reflect.hasField(n,"__transition__")) Reflect.field(n,"__transition__").owner = tid; else n["__transition__"] = { owner : tid};
	});
	this.delay(null,0);
	this.duration(null,250);
}
thx.js.BaseTransition.__name__ = ["thx","js","BaseTransition"];
thx.js.BaseTransition.prototype._transitionId = null;
thx.js.BaseTransition.prototype._tweens = null;
thx.js.BaseTransition.prototype._interpolators = null;
thx.js.BaseTransition.prototype._remove = null;
thx.js.BaseTransition.prototype._stage = null;
thx.js.BaseTransition.prototype._delay = null;
thx.js.BaseTransition.prototype._duration = null;
thx.js.BaseTransition.prototype._durationMax = null;
thx.js.BaseTransition.prototype._ease = null;
thx.js.BaseTransition.prototype._step = null;
thx.js.BaseTransition.prototype._start = null;
thx.js.BaseTransition.prototype._end = null;
thx.js.BaseTransition.prototype.selection = null;
thx.js.BaseTransition.prototype.step = function(elapsed) {
	var clear = true, k = -1, me = this;
	this.selection.eachNode(function(n,i) {
		if(2 == me._stage[++k]) return;
		var t = (elapsed - me._delay[k]) / me._duration[k], tx = Reflect.field(n,"__transition__"), te, tk, ik = me._interpolators[k];
		if(t < 1) {
			clear = false;
			if(t < 0) return;
		} else t = 1;
		if(null != me._stage[k]) {
			if(null == tx || tx.active != me._transitionId) {
				me._stage[k] = 2;
				return;
			}
		} else if(null == tx || tx.active > me._transitionId) {
			me._stage[k] = 2;
			return;
		} else {
			me._stage[k] = 1;
			if(null != me._start) me._start(n,i);
			ik = me._interpolators[k] = new Hash();
			tx.active = me._transitionId;
			var $it0 = me._tweens.keys();
			while( $it0.hasNext() ) {
				var tk1 = $it0.next();
				var f = me._tweens.get(tk1);
				ik.set(tk1,f(n,i));
			}
		}
		te = me._ease(t);
		var $it1 = me._tweens.keys();
		while( $it1.hasNext() ) {
			var tk1 = $it1.next();
			(ik.get(tk1))(te);
		}
		if(1 == t) {
			me._stage[k] = 2;
			if(tx.active == me._transitionId) {
				var owner = tx.owner;
				if(owner == me._transitionId) {
					Reflect.deleteField(n,"__transition__");
					if(me._remove) n.parentNode.removeChild(n);
				}
				thx.js.BaseTransition._inheritid = me._transitionId;
				if(null != me._end) me._end(n,i);
				thx.js.BaseTransition._inheritid = 0;
				tx.owner = owner;
			}
		}
	});
	return clear;
}
thx.js.BaseTransition.prototype.startNode = function(f) {
	this._start = f;
	return this._this();
}
thx.js.BaseTransition.prototype.endNode = function(f) {
	this._end = f;
	return this._this();
}
thx.js.BaseTransition.prototype.stop = function() {
	var k = -1, me = this;
	this.selection.eachNode(function(n,i) {
		me._stage[++k] = 2;
		Reflect.deleteField(n,"__transition__");
	});
	return this._this();
}
thx.js.BaseTransition.prototype.delay = function(f,v) {
	if(v == null) v = 0.0;
	var delayMin = Math.POSITIVE_INFINITY, k = -1, me = this;
	if(null != f) this.selection.eachNode(function(n,i) {
		var x = me._delay[++k] = f(n,i);
		if(x < delayMin) delayMin = x;
	}); else {
		delayMin = v;
		this.selection.eachNode(function(n,i) {
			me._delay[++k] = delayMin;
		});
	}
	thx.js.Timer.timer(this._step,delayMin);
	return this._this();
}
thx.js.BaseTransition.prototype.duration = function(f,v) {
	if(v == null) v = 0.0;
	var k = -1, me = this;
	if(null != f) {
		this._durationMax = 0;
		this.selection.eachNode(function(n,i) {
			var x = me._duration[++k] = f(n,i);
			if(x > me._durationMax) me._durationMax = x;
		});
	} else {
		this._durationMax = v;
		this.selection.eachNode(function(n,i) {
			me._duration[++k] = me._durationMax;
		});
	}
	return this._this();
}
thx.js.BaseTransition.prototype.ease = function(f,easemode) {
	this._ease = thx.math.Ease.mode(easemode,f);
	return this._this();
}
thx.js.BaseTransition.prototype.remove = function(v) {
	if(v == null) v = true;
	this._remove = v;
	return this._this();
}
thx.js.BaseTransition.prototype.select = function(selector) {
	var k, t = this.createTransition(this.selection.select(selector));
	t._ease = this._ease;
	var delay = this._delay;
	var duration = this._duration;
	k = -1;
	t.delay(function(d,i) {
		return delay[++k];
	});
	k = -1;
	t.delay(function(d,i) {
		return duration[++k];
	});
	return t;
}
thx.js.BaseTransition.prototype.selectAll = function(selector) {
	var k, t = this.createTransition(this.selection.selectAll(selector));
	t._ease = this._ease;
	var delay = this._delay;
	var duration = this._duration;
	k = -1;
	t.delay(function(d,i) {
		return delay[i > 0?k:++k];
	});
	k = -1;
	t.delay(function(d,i) {
		return duration[i > 0?k:++k];
	});
	return t;
}
thx.js.BaseTransition.prototype.createTransition = function(selection) {
	return (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Transition.hx", lineNumber : 242, className : "thx.js.BaseTransition", methodName : "createTransition"});
		return $r;
	}(this));
}
thx.js.BaseTransition.prototype._this = function() {
	return this;
}
thx.js.BaseTransition.prototype.__class__ = thx.js.BaseTransition;
thx.js.UnboundTransition = function(selection) {
	if( selection === $_ ) return;
	thx.js.BaseTransition.call(this,selection);
}
thx.js.UnboundTransition.__name__ = ["thx","js","UnboundTransition"];
thx.js.UnboundTransition.__super__ = thx.js.BaseTransition;
for(var k in thx.js.BaseTransition.prototype ) thx.js.UnboundTransition.prototype[k] = thx.js.BaseTransition.prototype[k];
thx.js.UnboundTransition.prototype.style = function(name) {
	return new thx.js.AccessTweenStyle(name,this,this._tweens);
}
thx.js.UnboundTransition.prototype.attr = function(name) {
	return new thx.js.AccessTweenAttribute(name,this,this._tweens);
}
thx.js.UnboundTransition.prototype.createTransition = function(selection) {
	return new thx.js.UnboundTransition(selection);
}
thx.js.UnboundTransition.prototype.__class__ = thx.js.UnboundTransition;
thx.js.BoundTransition = function(selection) {
	if( selection === $_ ) return;
	thx.js.BaseTransition.call(this,selection);
}
thx.js.BoundTransition.__name__ = ["thx","js","BoundTransition"];
thx.js.BoundTransition.__super__ = thx.js.BaseTransition;
for(var k in thx.js.BaseTransition.prototype ) thx.js.BoundTransition.prototype[k] = thx.js.BaseTransition.prototype[k];
thx.js.BoundTransition.prototype.style = function(name) {
	return new thx.js.AccessDataTweenStyle(name,this,this._tweens);
}
thx.js.BoundTransition.prototype.attr = function(name) {
	return new thx.js.AccessDataTweenAttribute(name,this,this._tweens);
}
thx.js.BoundTransition.prototype.start = function(f) {
	return this.startNode(function(n,i) {
		f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.BoundTransition.prototype.end = function(f) {
	return this.endNode(function(n,i) {
		f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.BoundTransition.prototype.createTransition = function(selection) {
	return new thx.js.BoundTransition(selection);
}
thx.js.BoundTransition.prototype.__class__ = thx.js.BoundTransition;
thx.validation.IncrementValidator = function(increment) {
	if( increment === $_ ) return;
	if(0 == increment) throw new thx.error.Error("increment must be different from zero (0)",null,null,{ fileName : "IncrementValidator.hx", lineNumber : 17, className : "thx.validation.IncrementValidator", methodName : "new"});
	this.increment = increment;
}
thx.validation.IncrementValidator.__name__ = ["thx","validation","IncrementValidator"];
thx.validation.IncrementValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.IncrementValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.IncrementValidator.prototype.increment = null;
thx.validation.IncrementValidator.prototype.validate = function(value) {
	var test = value / this.increment;
	if(test == Std["int"](test)) return thx.util.Result.Ok; else return thx.util.Result.Failure([new thx.util.Message("value must be an increment of {0}",[this.increment],null)]);
}
thx.validation.IncrementValidator.prototype.__class__ = thx.validation.IncrementValidator;
if(!thx.util.type) thx.util.type = {}
thx.util.type.ITest = function() { }
thx.util.type.ITest.__name__ = ["thx","util","type","ITest"];
thx.util.type.ITest.prototype.sayHello = null;
thx.util.type.ITest.prototype.counter = null;
thx.util.type.ITest.prototype.__class__ = thx.util.type.ITest;
thx.util.type.TestImplementation = function(p) {
	if( p === $_ ) return;
	this.counter = 0;
}
thx.util.type.TestImplementation.__name__ = ["thx","util","type","TestImplementation"];
thx.util.type.TestImplementation.prototype.counter = null;
thx.util.type.TestImplementation.prototype.sayHello = function() {
	return "hi";
}
thx.util.type.TestImplementation.prototype.__class__ = thx.util.type.TestImplementation;
thx.util.type.TestImplementation.__interfaces__ = [thx.util.type.ITest];
thx.util.Results = function() { }
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
thx.util.Results.prototype.__class__ = thx.util.Results;
thx.culture.FormatNumber = function() { }
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
thx.culture.FormatNumber.prototype.__class__ = thx.culture.FormatNumber;
thx.xml.ValueFormat = function(p) {
}
thx.xml.ValueFormat.__name__ = ["thx","xml","ValueFormat"];
thx.xml.ValueFormat.prototype.format = function(value) {
	return value;
}
thx.xml.ValueFormat.prototype.__class__ = thx.xml.ValueFormat;
thx.xml.NormalizeNewlineValueFormat = function(newline) {
	if( newline === $_ ) return;
	if(newline == null) newline = "\n";
	thx.xml.ValueFormat.call(this);
	this._newline = newline;
	this._newLineReplace = new EReg("(\r\n|\n\r|\n|\r)","m");
}
thx.xml.NormalizeNewlineValueFormat.__name__ = ["thx","xml","NormalizeNewlineValueFormat"];
thx.xml.NormalizeNewlineValueFormat.__super__ = thx.xml.ValueFormat;
for(var k in thx.xml.ValueFormat.prototype ) thx.xml.NormalizeNewlineValueFormat.prototype[k] = thx.xml.ValueFormat.prototype[k];
thx.xml.NormalizeNewlineValueFormat.prototype._newLineReplace = null;
thx.xml.NormalizeNewlineValueFormat.prototype._newline = null;
thx.xml.NormalizeNewlineValueFormat.prototype.format = function(value) {
	return this._newLineReplace.replace(value,this._newline);
}
thx.xml.NormalizeNewlineValueFormat.prototype.__class__ = thx.xml.NormalizeNewlineValueFormat;
thx.xml.XmlWriter = function(xml) {
	if( xml === $_ ) return;
	if(null == xml) xml = Xml.createDocument();
	this._stack = [xml];
	this._current = this._stack[0];
}
thx.xml.XmlWriter.__name__ = ["thx","xml","XmlWriter"];
thx.xml.XmlWriter.prototype._stack = null;
thx.xml.XmlWriter.prototype._current = null;
thx.xml.XmlWriter.prototype.xml = function() {
	return this._stack[0];
}
thx.xml.XmlWriter.prototype.tag = function(name) {
	this._current = Xml.createElement(name);
	this._stack[this._stack.length - 1].addChild(this._current);
	return this;
}
thx.xml.XmlWriter.prototype.open = function(tag) {
	this._current = Xml.createElement(tag);
	this._stack[this._stack.length - 1].addChild(this._current);
	this._stack.push(this._current);
	return this;
}
thx.xml.XmlWriter.prototype.attr = function(name,value) {
	this._current.set(name,value);
	return this;
}
thx.xml.XmlWriter.prototype.appendTo = function(name,value) {
	if(this._current.exists(name)) this._current.set(name,this._current.get(name) + " " + value); else this.attr(name,value);
	return this;
}
thx.xml.XmlWriter.prototype.attrIf = function(cond,name,value) {
	if(null == cond && (null != value && "" != value) || cond) this.attr(name,value);
	return this;
}
thx.xml.XmlWriter.prototype.text = function(s) {
	this._stack[this._stack.length - 1].addChild(Xml.createPCData(StringTools.replace(StringTools.replace(StringTools.replace(s,"&","&amp;"),">","&gt;"),"<","&lt;")));
	return this;
}
thx.xml.XmlWriter.prototype.cdata = function(s) {
	this._stack[this._stack.length - 1].addChild(Xml.createCData(StringTools.replace(s,"]]>","]]&gt;")));
	return this;
}
thx.xml.XmlWriter.prototype.comment = function(s) {
	this._stack[this._stack.length - 1].addChild(Xml.createComment(s));
	return this;
}
thx.xml.XmlWriter.prototype.close = function() {
	if(this._stack.length == 1) throw "no open tags to close";
	this._current = this._stack.pop();
	if(!this._current.elements().hasNext()) this._current.addChild(Xml.createPCData(""));
	return this;
}
thx.xml.XmlWriter.prototype.toString = function() {
	return this.xml().toString();
}
thx.xml.XmlWriter.prototype._t = function() {
	return this._stack[this._stack.length - 1];
}
thx.xml.XmlWriter.prototype.__class__ = thx.xml.XmlWriter;
thx.data.TestData = function(p) {
}
thx.data.TestData.__name__ = ["thx","data","TestData"];
thx.data.TestData.prototype.testDynamicToDataExpr = function() {
	var _g = 0, _g1 = thx.data.TestData.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.same(test.ce,thx.data.Data.toConfigExpr(test.v),null,null,{ fileName : "TestData.hx", lineNumber : 28, className : "thx.data.TestData", methodName : "testDynamicToDataExpr"});
	}
}
thx.data.TestData.prototype.testDataExprToDynamic = function() {
	var _g = 0, _g1 = thx.data.TestData.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.same(test.v,thx.data.Data.toDynamic(test.ce),null,null,{ fileName : "TestData.hx", lineNumber : 34, className : "thx.data.TestData", methodName : "testDataExprToDynamic"});
	}
}
thx.data.TestData.prototype.testDate = function() {
	var date = Date.now();
	var s = thx.data.Data.dateToString(date);
	utest.Assert.same(date,thx.data.Data.stringToDate(s),null,null,{ fileName : "TestData.hx", lineNumber : 41, className : "thx.data.TestData", methodName : "testDate"});
}
thx.data.TestData.prototype.__class__ = thx.data.TestData;
thx.load.TestAll = function(p) {
}
thx.load.TestAll.__name__ = ["thx","load","TestAll"];
thx.load.TestAll.addTests = function(runner) {
	runner.addCase(new thx.load.TestMemoryLoader());
}
thx.load.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.load.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.load.TestAll.prototype.__class__ = thx.load.TestAll;
thx.validation.TestUrl = function(p) {
}
thx.validation.TestUrl.__name__ = ["thx","validation","TestUrl"];
thx.validation.TestUrl.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestUrl.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestUrl.prototype.testValidUrls = function() {
	var validator = new thx.validation.UrlValidator();
	var urls = ["http://example.com","http://www.example.com","http://example.com/url/x%20y?a=b&c"];
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.assertValidation(validator.validate(url),true,url + " should be valid",{ fileName : "TestUrl.hx", lineNumber : 17, className : "thx.validation.TestUrl", methodName : "testValidUrls"});
	}
}
thx.validation.TestUrl.prototype.testInvalidUrls = function() {
	var validator = new thx.validation.UrlValidator();
	var urls = ["","htp://example.com","www.example.com"];
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.assertValidation(validator.validate(url),false,url + " should NOT be valid",{ fileName : "TestUrl.hx", lineNumber : 25, className : "thx.validation.TestUrl", methodName : "testInvalidUrls"});
	}
}
thx.validation.TestUrl.prototype.__class__ = thx.validation.TestUrl;
thx.js.AccessTween = function(transition,tweens) {
	if( transition === $_ ) return;
	this.transition = transition;
	this.tweens = tweens;
}
thx.js.AccessTween.__name__ = ["thx","js","AccessTween"];
thx.js.AccessTween.prototype.transition = null;
thx.js.AccessTween.prototype.tweens = null;
thx.js.AccessTween.prototype.transitionColorTween = function(value) {
	return function(d,i,a) {
		return thx.color.Rgb.interpolatef(a,value);
	};
}
thx.js.AccessTween.prototype.transitionColorTweenf = function(f) {
	return function(d,i,a) {
		return thx.color.Rgb.interpolatef(a,f(d,i));
	};
}
thx.js.AccessTween.prototype.transitionStringTween = function(value) {
	return function(d,i,a) {
		return Strings.interpolatef(a,value);
	};
}
thx.js.AccessTween.prototype.transitionStringTweenf = function(f) {
	return function(d,i,a) {
		return Strings.interpolatef(a,f(d,i));
	};
}
thx.js.AccessTween.prototype.transitionFloatTween = function(value) {
	return function(d,i,a) {
		return Floats.interpolatef(a,value);
	};
}
thx.js.AccessTween.prototype.transitionFloatTweenf = function(f) {
	return function(d,i,a) {
		return Floats.interpolatef(a,f(d,i));
	};
}
thx.js.AccessTween.prototype._that = function() {
	return this.transition;
}
thx.js.AccessTween.prototype.__class__ = thx.js.AccessTween;
thx.js.AccessTweenStyle = function(name,transition,tweens) {
	if( name === $_ ) return;
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
}
thx.js.AccessTweenStyle.__name__ = ["thx","js","AccessTweenStyle"];
thx.js.AccessTweenStyle.__super__ = thx.js.AccessTween;
for(var k in thx.js.AccessTween.prototype ) thx.js.AccessTweenStyle.prototype[k] = thx.js.AccessTween.prototype[k];
thx.js.AccessTweenStyle.prototype.name = null;
thx.js.AccessTweenStyle.prototype.floatfNode = function(f,priority) {
	return this.floatTween(this.transitionFloatTweenf(f),priority);
}
thx.js.AccessTweenStyle.prototype["float"] = function(value,priority) {
	return this.floatTween(this.transitionFloatTween(value),priority);
}
thx.js.AccessTweenStyle.prototype.floatTween = function(tween,priority) {
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		var f = tween(d,i,Std.parseFloat(js.Lib.window.getComputedStyle(d,null).getPropertyValue(name)));
		return function(t) {
			d.style.setProperty(name,"" + f(t),priority);
		};
	};
	this.tweens.set("style." + name,styleTween);
	return this.transition;
}
thx.js.AccessTweenStyle.prototype.stringfNode = function(f,priority) {
	return this.stringTween(this.transitionStringTweenf(f),priority);
}
thx.js.AccessTweenStyle.prototype.string = function(value,priority) {
	return this.stringTween(this.transitionStringTween(value),priority);
}
thx.js.AccessTweenStyle.prototype.stringTween = function(tween,priority) {
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		var f = tween(d,i,js.Lib.window.getComputedStyle(d,null).getPropertyValue(name));
		return function(t) {
			d.style.setProperty(name,f(t),priority);
		};
	};
	this.tweens.set("style." + name,styleTween);
	return this.transition;
}
thx.js.AccessTweenStyle.prototype.colorfNode = function(f,priority) {
	return this.colorTween(this.transitionColorTweenf(f),priority);
}
thx.js.AccessTweenStyle.prototype.color = function(value,priority) {
	return this.colorTween(this.transitionColorTween(thx.color.Colors.parse(value)),priority);
}
thx.js.AccessTweenStyle.prototype.colorTween = function(tween,priority) {
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		var f = tween(d,i,thx.color.Colors.parse(js.Lib.window.getComputedStyle(d,null).getPropertyValue(name)));
		return function(t) {
			d.style.setProperty(name,f(t).toRgbString(),priority);
		};
	};
	this.tweens.set("style." + name,styleTween);
	return this.transition;
}
thx.js.AccessTweenStyle.prototype.__class__ = thx.js.AccessTweenStyle;
thx.js.AccessDataTweenStyle = function(name,transition,tweens) {
	if( name === $_ ) return;
	thx.js.AccessTweenStyle.call(this,name,transition,tweens);
}
thx.js.AccessDataTweenStyle.__name__ = ["thx","js","AccessDataTweenStyle"];
thx.js.AccessDataTweenStyle.__super__ = thx.js.AccessTweenStyle;
for(var k in thx.js.AccessTweenStyle.prototype ) thx.js.AccessDataTweenStyle.prototype[k] = thx.js.AccessTweenStyle.prototype[k];
thx.js.AccessDataTweenStyle.prototype.floatf = function(f,priority) {
	return this.floatfNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	},priority);
}
thx.js.AccessDataTweenStyle.prototype.stringf = function(f,priority) {
	return this.stringfNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	},priority);
}
thx.js.AccessDataTweenStyle.prototype.colorf = function(f,priority) {
	return this.colorfNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	},priority);
}
thx.js.AccessDataTweenStyle.prototype.__class__ = thx.js.AccessDataTweenStyle;
utest.ui.common.HeaderDisplayMode = { __ename__ : ["utest","ui","common","HeaderDisplayMode"], __constructs__ : ["AlwaysShowHeader","NeverShowHeader","ShowHeaderWithResults"] }
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader = ["AlwaysShowHeader",0];
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.AlwaysShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.NeverShowHeader = ["NeverShowHeader",1];
utest.ui.common.HeaderDisplayMode.NeverShowHeader.toString = $estr;
utest.ui.common.HeaderDisplayMode.NeverShowHeader.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults = ["ShowHeaderWithResults",2];
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.toString = $estr;
utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults.__enum__ = utest.ui.common.HeaderDisplayMode;
utest.ui.common.SuccessResultsDisplayMode = { __ename__ : ["utest","ui","common","SuccessResultsDisplayMode"], __constructs__ : ["AlwaysShowSuccessResults","NeverShowSuccessResults","ShowSuccessResultsWithNoErrors"] }
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults = ["AlwaysShowSuccessResults",0];
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults = ["NeverShowSuccessResults",1];
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors = ["ShowSuccessResultsWithNoErrors",2];
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.toString = $estr;
utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.__enum__ = utest.ui.common.SuccessResultsDisplayMode;
thx.svg.TestArea = function(p) {
}
thx.svg.TestArea.__name__ = ["thx","svg","TestArea"];
thx.svg.TestArea.prototype.testArea = function() {
	var area = thx.svg.Area.pointArray2();
	utest.Assert.equals("M0,0L0,0Z",area.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 17, className : "thx.svg.TestArea", methodName : "testArea"});
	utest.Assert.equals("M0,0L1,1L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestArea.hx", lineNumber : 18, className : "thx.svg.TestArea", methodName : "testArea"});
	utest.Assert.equals("M0,0L1,1L2,0L2,0L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 19, className : "thx.svg.TestArea", methodName : "testArea"});
}
thx.svg.TestArea.prototype.testArean1 = function() {
	var area = thx.svg.Area.pointArray2().y0(function(_,_1) {
		return -1;
	});
	utest.Assert.equals("M0,0L0,-1Z",area.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 26, className : "thx.svg.TestArea", methodName : "testArean1"});
	utest.Assert.equals("M0,0L1,1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestArea.hx", lineNumber : 27, className : "thx.svg.TestArea", methodName : "testArean1"});
	utest.Assert.equals("M0,0L1,1L2,0L2,-1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 28, className : "thx.svg.TestArea", methodName : "testArean1"});
}
thx.svg.TestArea.prototype.testXY = function() {
	var line = thx.svg.Area.pointObjectXY();
	utest.Assert.equals("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),null,{ fileName : "TestArea.hx", lineNumber : 35, className : "thx.svg.TestArea", methodName : "testXY"});
	utest.Assert.equals("M0,0L1,1L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),null,{ fileName : "TestArea.hx", lineNumber : 36, className : "thx.svg.TestArea", methodName : "testXY"});
	utest.Assert.equals("M0,0L1,1L2,0L2,0L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),null,{ fileName : "TestArea.hx", lineNumber : 37, className : "thx.svg.TestArea", methodName : "testXY"});
}
thx.svg.TestArea.prototype.testXYnY0 = function() {
	var line = thx.svg.Area.pointObjectXY().y0(function(d,_) {
		return -d.y;
	});
	utest.Assert.equals("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),null,{ fileName : "TestArea.hx", lineNumber : 44, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	utest.Assert.equals("M0,0L1,1L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),null,{ fileName : "TestArea.hx", lineNumber : 45, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	utest.Assert.equals("M0,0L1,1L2,0L2,0L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),null,{ fileName : "TestArea.hx", lineNumber : 46, className : "thx.svg.TestArea", methodName : "testXYnY0"});
}
thx.svg.TestArea.prototype.testStepBefore = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepBefore);
	utest.Assert.equals("M0,0L0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 53, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	utest.Assert.equals("M0,0V1H1L1,0V0H0Z",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestArea.hx", lineNumber : 54, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	utest.Assert.equals("M0,0V1H1V0H2L2,0V0H1V0H0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 55, className : "thx.svg.TestArea", methodName : "testStepBefore"});
}
thx.svg.TestArea.prototype.testStepAfter = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepAfter);
	utest.Assert.equals("M0,0L0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 62, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	utest.Assert.equals("M0,0H1V1L1,0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestArea.hx", lineNumber : 63, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	utest.Assert.equals("M0,0H1V1H2V0L2,0H1V0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 64, className : "thx.svg.TestArea", methodName : "testStepAfter"});
}
thx.svg.TestArea.prototype.testBasis = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Basis);
	utest.Assert.equals("M0,0L0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 71, className : "thx.svg.TestArea", methodName : "testBasis"});
	utest.Assert.equals("M0,0L1,1L1,0L0,0Z",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestArea.hx", lineNumber : 72, className : "thx.svg.TestArea", methodName : "testBasis"});
	utest.Assert.equals("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0L12,0C12,0,12,0,11,0C10,0,8,0,6,0C4,0,2,0,1,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 73, className : "thx.svg.TestArea", methodName : "testBasis"});
}
thx.svg.TestArea.prototype.testBasisClosed = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.BasisClosed);
	utest.Assert.equals("M0,0C0,0,0,0,0,0L0,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 80, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	utest.Assert.equals("M2,2C2,2,4,4,4,4C4,4,2,2,2,2L4,0C4,0,2,0,2,0C2,0,4,0,4,0Z",line.shape([[0.0,0.0],[6.0,6.0]]),null,{ fileName : "TestArea.hx", lineNumber : 81, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	utest.Assert.equals("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1L3,0C4,0,8,0,9,0C10,0,8,0,6,0C4,0,2,0,3,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 82, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
}
thx.svg.TestArea.prototype.testCardinal = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Cardinal());
	utest.Assert.equals("M0,0L0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 89, className : "thx.svg.TestArea", methodName : "testCardinal"});
	utest.Assert.equals("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),null,{ fileName : "TestArea.hx", lineNumber : 90, className : "thx.svg.TestArea", methodName : "testCardinal"});
	utest.Assert.equals("M0,0Q4,5,5,5Q6,5,10,0L10,0Q6,0,5,0Q4,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 91, className : "thx.svg.TestArea", methodName : "testCardinal"});
}
thx.svg.TestArea.prototype.testCardinalClosed = function() {
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.CardinalClosed());
	utest.Assert.equals("M0,0L0,0Z",line.shape([[0.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 98, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	utest.Assert.equals("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),null,{ fileName : "TestArea.hx", lineNumber : 99, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	utest.Assert.equals("M0,0C0,0,3.5,5,5,5S10,0,10,0L10,0C10,0,6.5,0,5,0S0,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),null,{ fileName : "TestArea.hx", lineNumber : 100, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
}
thx.svg.TestArea.prototype.__class__ = thx.svg.TestArea;
utest.ui.common.PackageResult = function(packageName) {
	if( packageName === $_ ) return;
	this.packageName = packageName;
	this.classes = new Hash();
	this.packages = new Hash();
	this.stats = new utest.ui.common.ResultStats();
}
utest.ui.common.PackageResult.__name__ = ["utest","ui","common","PackageResult"];
utest.ui.common.PackageResult.prototype.packageName = null;
utest.ui.common.PackageResult.prototype.classes = null;
utest.ui.common.PackageResult.prototype.packages = null;
utest.ui.common.PackageResult.prototype.stats = null;
utest.ui.common.PackageResult.prototype.addResult = function(result,flattenPackage) {
	var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
	var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
	var fix = this.createFixture(result.method,result.assertations);
	cls.add(fix);
}
utest.ui.common.PackageResult.prototype.addClass = function(result) {
	this.classes.set(result.className,result);
	this.stats.wire(result.stats);
}
utest.ui.common.PackageResult.prototype.addPackage = function(result) {
	this.packages.set(result.packageName,result);
	this.stats.wire(result.stats);
}
utest.ui.common.PackageResult.prototype.existsPackage = function(name) {
	return this.packages.exists(name);
}
utest.ui.common.PackageResult.prototype.existsClass = function(name) {
	return this.classes.exists(name);
}
utest.ui.common.PackageResult.prototype.getPackage = function(name) {
	if(this.packageName == null && name == "") return this;
	return this.packages.get(name);
}
utest.ui.common.PackageResult.prototype.getClass = function(name) {
	return this.classes.get(name);
}
utest.ui.common.PackageResult.prototype.classNames = function(errorsHavePriority) {
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
utest.ui.common.PackageResult.prototype.packageNames = function(errorsHavePriority) {
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
utest.ui.common.PackageResult.prototype.createFixture = function(method,assertations) {
	var f = new utest.ui.common.FixtureResult(method);
	var $it0 = assertations.iterator();
	while( $it0.hasNext() ) {
		var assertation = $it0.next();
		f.add(assertation);
	}
	return f;
}
utest.ui.common.PackageResult.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	if(pack.existsClass(cls)) return pack.getClass(cls);
	var c = new utest.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	return c;
}
utest.ui.common.PackageResult.prototype.getOrCreatePackage = function(pack,flat,ref) {
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
utest.ui.common.PackageResult.prototype.__class__ = utest.ui.common.PackageResult;
thx.doc.Fragment = { __ename__ : ["thx","doc","Fragment"], __constructs__ : ["Abbreviation","Code","DefinitionList","Emphasis","Heading","HorizontalRule","Image","InternalLink","LineBreak","Link","Note","OrderedList","Paragraph","Quote","Reference","StrongEmphasis","Table","Text","UnorderedList"] }
thx.doc.Fragment.Abbreviation = function(abbr,expanded) { var $x = ["Abbreviation",0,abbr,expanded]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Code = function(code,isBlock,lang) { var $x = ["Code",1,code,isBlock,lang]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.DefinitionList = function(a) { var $x = ["DefinitionList",2,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Emphasis = function(a) { var $x = ["Emphasis",3,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Heading = function(a,level) { var $x = ["Heading",4,a,level]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.HorizontalRule = ["HorizontalRule",5];
thx.doc.Fragment.HorizontalRule.toString = $estr;
thx.doc.Fragment.HorizontalRule.__enum__ = thx.doc.Fragment;
thx.doc.Fragment.Image = function(href,alt,title) { var $x = ["Image",6,href,alt,title]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.InternalLink = function(reference,a) { var $x = ["InternalLink",7,reference,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.LineBreak = ["LineBreak",8];
thx.doc.Fragment.LineBreak.toString = $estr;
thx.doc.Fragment.LineBreak.__enum__ = thx.doc.Fragment;
thx.doc.Fragment.Link = function(href,a,title) { var $x = ["Link",9,href,a,title]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Note = function(note) { var $x = ["Note",10,note]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.OrderedList = function(a,start) { var $x = ["OrderedList",11,a,start]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Paragraph = function(a) { var $x = ["Paragraph",12,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Quote = function(a) { var $x = ["Quote",13,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Reference = function(a,name) { var $x = ["Reference",14,a,name]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.StrongEmphasis = function(a) { var $x = ["StrongEmphasis",15,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Table = function(rows) { var $x = ["Table",16,rows]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.Text = function(s) { var $x = ["Text",17,s]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.Fragment.UnorderedList = function(a) { var $x = ["UnorderedList",18,a]; $x.__enum__ = thx.doc.Fragment; $x.toString = $estr; return $x; }
thx.doc.TableRow = { __ename__ : ["thx","doc","TableRow"], __constructs__ : ["HeaderRow","Row"] }
thx.doc.TableRow.HeaderRow = function(cells) { var $x = ["HeaderRow",0,cells]; $x.__enum__ = thx.doc.TableRow; $x.toString = $estr; return $x; }
thx.doc.TableRow.Row = function(cells) { var $x = ["Row",1,cells]; $x.__enum__ = thx.doc.TableRow; $x.toString = $estr; return $x; }
thx.html.TestAll = function() { }
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
thx.html.TestAll.prototype.__class__ = thx.html.TestAll;
thx.collections.TestAll = function(p) {
}
thx.collections.TestAll.__name__ = ["thx","collections","TestAll"];
thx.collections.TestAll.addTests = function(runner) {
}
thx.collections.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.collections.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.collections.TestAll.prototype.__class__ = thx.collections.TestAll;
utest.TestHandler = function(fixture) {
	if( fixture === $_ ) return;
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = new utest.Dispatcher();
	this.onTimeout = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
}
utest.TestHandler.__name__ = ["utest","TestHandler"];
utest.TestHandler.exceptionStack = function(pops) {
	if(pops == null) pops = 2;
	var stack = haxe.Stack.exceptionStack();
	while(pops-- > 0) stack.pop();
	return stack;
}
utest.TestHandler.prototype.results = null;
utest.TestHandler.prototype.fixture = null;
utest.TestHandler.prototype.asyncStack = null;
utest.TestHandler.prototype.onTested = null;
utest.TestHandler.prototype.onTimeout = null;
utest.TestHandler.prototype.onComplete = null;
utest.TestHandler.prototype.execute = function() {
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
utest.TestHandler.prototype.checkTested = function() {
	if(this.expireson == null || this.asyncStack.length == 0) this.tested(); else if(haxe.Timer.stamp() > this.expireson) this.timeout(); else haxe.Timer.delay($closure(this,"checkTested"),10);
}
utest.TestHandler.prototype.expireson = null;
utest.TestHandler.prototype.setTimeout = function(timeout) {
	var newexpire = haxe.Timer.stamp() + timeout / 1000;
	this.expireson = this.expireson == null?newexpire:newexpire > this.expireson?newexpire:this.expireson;
}
utest.TestHandler.prototype.bindHandler = function() {
	utest.Assert.results = this.results;
	utest.Assert.createAsync = $closure(this,"addAsync");
	utest.Assert.createEvent = $closure(this,"addEvent");
}
utest.TestHandler.prototype.unbindHandler = function() {
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
utest.TestHandler.prototype.addAsync = function(f,timeout) {
	if(timeout == null) timeout = 250;
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
utest.TestHandler.prototype.addEvent = function(f,timeout) {
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
utest.TestHandler.prototype.executeMethod = function(name) {
	if(name == null) return;
	this.bindHandler();
	Reflect.field(this.fixture.target,name).apply(this.fixture.target,[]);
}
utest.TestHandler.prototype.tested = function() {
	if(this.results.length == 0) this.results.add(utest.Assertation.Warning("no assertions"));
	this.onTested.dispatch(this);
	this.completed();
}
utest.TestHandler.prototype.timeout = function() {
	this.results.add(utest.Assertation.TimeoutError(this.asyncStack.length,[]));
	this.onTimeout.dispatch(this);
	this.completed();
}
utest.TestHandler.prototype.completed = function() {
	try {
		this.executeMethod(this.fixture.teardown);
	} catch( e ) {
		this.results.add(utest.Assertation.TeardownError(e,utest.TestHandler.exceptionStack(2)));
	}
	this.unbindHandler();
	this.onComplete.dispatch(this);
}
utest.TestHandler.prototype.__class__ = utest.TestHandler;
thx.xml.AttributeFormat = function(p) {
}
thx.xml.AttributeFormat.__name__ = ["thx","xml","AttributeFormat"];
thx.xml.AttributeFormat.prototype.formatAttributes = function(node) {
	var buf = new StringBuf();
	var $it0 = node.attributes();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		buf.b[buf.b.length] = " ";
		buf.b[buf.b.length] = this.formatAttribute(name,node.get(name));
	}
	return buf.b.join("");
}
thx.xml.AttributeFormat.prototype.formatAttribute = function(name,value) {
	return name + "=\"" + value + "\"";
}
thx.xml.AttributeFormat.prototype.__class__ = thx.xml.AttributeFormat;
thx.html.UnquotedHtmlAttributeFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.AttributeFormat.call(this);
	this._containsWS = new EReg("\\s","m");
}
thx.html.UnquotedHtmlAttributeFormat.__name__ = ["thx","html","UnquotedHtmlAttributeFormat"];
thx.html.UnquotedHtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
for(var k in thx.xml.AttributeFormat.prototype ) thx.html.UnquotedHtmlAttributeFormat.prototype[k] = thx.xml.AttributeFormat.prototype[k];
thx.html.UnquotedHtmlAttributeFormat.prototype._containsWS = null;
thx.html.UnquotedHtmlAttributeFormat.prototype.formatAttribute = function(name,value) {
	if(thx.html.Attribute._fill.exists(name)) return name; else return name + "=" + this.quote(value);
}
thx.html.UnquotedHtmlAttributeFormat.prototype.quote = function(value) {
	if("" != value && !this._containsWS.match(value)) return value; else return "\"" + value + "\"";
}
thx.html.UnquotedHtmlAttributeFormat.prototype.__class__ = thx.html.UnquotedHtmlAttributeFormat;
utest.TestFixture = function(target,method,setup,teardown) {
	if( target === $_ ) return;
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
}
utest.TestFixture.__name__ = ["utest","TestFixture"];
utest.TestFixture.prototype.target = null;
utest.TestFixture.prototype.method = null;
utest.TestFixture.prototype.setup = null;
utest.TestFixture.prototype.teardown = null;
utest.TestFixture.prototype.checkMethod = function(name,arg) {
	var field = Reflect.field(this.target,name);
	if(field == null) throw arg + " function " + name + " is not a field of target";
	if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
}
utest.TestFixture.prototype.__class__ = utest.TestFixture;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
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
Std.prototype.__class__ = Std;
thx.html.HtmlDocumentFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsCommentedText;
	this._level = 0;
	this._begin = true;
}
thx.html.HtmlDocumentFormat.__name__ = ["thx","html","HtmlDocumentFormat"];
thx.html.HtmlDocumentFormat.__super__ = thx.xml.DocumentFormat;
for(var k in thx.xml.DocumentFormat.prototype ) thx.html.HtmlDocumentFormat.prototype[k] = thx.xml.DocumentFormat.prototype[k];
thx.html.HtmlDocumentFormat.prototype.indent = null;
thx.html.HtmlDocumentFormat.prototype.newline = null;
thx.html.HtmlDocumentFormat.prototype.wrapColumns = null;
thx.html.HtmlDocumentFormat.prototype.specialElementContentFormat = null;
thx.html.HtmlDocumentFormat.prototype._level = null;
thx.html.HtmlDocumentFormat.prototype._begin = null;
thx.html.HtmlDocumentFormat.prototype.indentWrap = function(content) {
	if("" == content) return ""; else return this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
}
thx.html.HtmlDocumentFormat.prototype.format = function(node) {
	return Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
}
thx.html.HtmlDocumentFormat.prototype.isEmpty = function(node) {
	return thx.html.Element._empty.exists(node.getNodeName());
}
thx.html.HtmlDocumentFormat.prototype.formatInlineNode = function(node) {
	var t = node.nodeType;
	if(Xml.Element == t) return this.formatInlineElement(node); else if(Xml.PCData == t) return this.formatInlinePCData(node); else if(Xml.CData == t) return this.formatInlineCData(node); else if(Xml.Comment == t) return this.formatInlineComment(node); else return (function($this) {
		var $r;
		throw "invalid node type: " + Std.string(t);
		return $r;
	}(this));
}
thx.html.HtmlDocumentFormat.prototype.formatInlineElement = function(node) {
	if(this.isEmpty(node)) return this.formatInlineEmptyElement(node); else return this.formatInlineOpenElement(node) + this.formatInlineChildren(node) + this.formatInlineCloseElement(node);
}
thx.html.HtmlDocumentFormat.prototype.contentIsEmpty = function(node) {
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.nodeType != Xml.PCData || StringTools.trim(c.getNodeValue()) != "") return false;
	}
	return true;
}
thx.html.HtmlDocumentFormat.prototype.formatSpecialElement = function(node) {
	if(this.contentIsEmpty(node)) return this.indentWrap(this.formatInlineOpenElement(node) + this.formatInlineCloseElement(node)); else return this.formatOpenElement(node) + this.wrapSpecialElementContent(this.formatChildren(node)) + this.formatCloseElement(node);
}
thx.html.HtmlDocumentFormat.prototype.wrapSpecialElementContent = function(content) {
	switch( (this.specialElementContentFormat)[1] ) {
	case 0:
		return content;
	case 1:
		return "<![CDATA[" + this.newline + content + this.newline + "]]>";
	case 2:
		return "<!--" + this.newline + content + this.newline + "// -->";
	}
}
thx.html.HtmlDocumentFormat.prototype.formatElement = function(node) {
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
thx.html.HtmlDocumentFormat.prototype.inlineContent = function(node) {
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		if(child.nodeType == Xml.PCData || child.nodeType == Xml.Element && thx.html.Element._inline.exists(child.getNodeName())) continue;
		return false;
	}
	return true;
}
thx.html.HtmlDocumentFormat.prototype.formatChildren = function(node) {
	this._level++;
	var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	this._level--;
	return content;
}
thx.html.HtmlDocumentFormat.prototype.formatInlineChildren = function(node) {
	var buf = new StringBuf();
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		buf.b[buf.b.length] = this.formatInlineNode(child);
	}
	return buf.b.join("");
}
thx.html.HtmlDocumentFormat.prototype.formatDocType = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatProlog = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatComment = function(node) {
	if(this.stripComments) return ""; else return this.indentWrap(this.nodeFormat.formatComment(node));
}
thx.html.HtmlDocumentFormat.prototype.formatInlineComment = function(node) {
	if(this.stripComments) return ""; else return this.nodeFormat.formatComment(node);
}
thx.html.HtmlDocumentFormat.prototype.formatEmptyElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatOpenElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatCloseElement = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatInlineEmptyElement = function(node) {
	return thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.formatInlineOpenElement = function(node) {
	return thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.formatInlineCloseElement = function(node) {
	return thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.formatDocument = function(node) {
	return thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.formatPCData = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatCData = function(node) {
	return this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
}
thx.html.HtmlDocumentFormat.prototype.formatInlinePCData = function(node) {
	return thx.xml.DocumentFormat.prototype.formatPCData.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.formatInlineCData = function(node) {
	return thx.xml.DocumentFormat.prototype.formatCData.call(this,node);
}
thx.html.HtmlDocumentFormat.prototype.__class__ = thx.html.HtmlDocumentFormat;
thx.html.SpecialElementContentFormat = { __ename__ : ["thx","html","SpecialElementContentFormat"], __constructs__ : ["AsPlainText","AsCData","AsCommentedText"] }
thx.html.SpecialElementContentFormat.AsPlainText = ["AsPlainText",0];
thx.html.SpecialElementContentFormat.AsPlainText.toString = $estr;
thx.html.SpecialElementContentFormat.AsPlainText.__enum__ = thx.html.SpecialElementContentFormat;
thx.html.SpecialElementContentFormat.AsCData = ["AsCData",1];
thx.html.SpecialElementContentFormat.AsCData.toString = $estr;
thx.html.SpecialElementContentFormat.AsCData.__enum__ = thx.html.SpecialElementContentFormat;
thx.html.SpecialElementContentFormat.AsCommentedText = ["AsCommentedText",2];
thx.html.SpecialElementContentFormat.AsCommentedText.toString = $estr;
thx.html.SpecialElementContentFormat.AsCommentedText.__enum__ = thx.html.SpecialElementContentFormat;
thx.html.HtmlAttributeFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.AttributeFormat.call(this);
}
thx.html.HtmlAttributeFormat.__name__ = ["thx","html","HtmlAttributeFormat"];
thx.html.HtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
for(var k in thx.xml.AttributeFormat.prototype ) thx.html.HtmlAttributeFormat.prototype[k] = thx.xml.AttributeFormat.prototype[k];
thx.html.HtmlAttributeFormat.prototype.formatAttribute = function(name,value) {
	if(thx.html.Attribute._fill.exists(name)) return name; else return name + "=\"" + value + "\"";
}
thx.html.HtmlAttributeFormat.prototype.__class__ = thx.html.HtmlAttributeFormat;
thx.util.TestResults = function(p) {
}
thx.util.TestResults.__name__ = ["thx","util","TestResults"];
thx.util.TestResults.prototype.testToString = function() {
	utest.Assert.equals("Ok",thx.util.Results.toString(thx.util.Result.Ok),null,{ fileName : "TestResults.hx", lineNumber : 11, className : "thx.util.TestResults", methodName : "testToString"});
	utest.Assert.equals("a A b B",thx.util.Results.toString(thx.util.Result.Failure([new thx.util.Message("a {1} b {0}",["B","A"],null)])),null,{ fileName : "TestResults.hx", lineNumber : 12, className : "thx.util.TestResults", methodName : "testToString"});
	var error = new thx.error.Error("b {0}",null,"B",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}).setInner(new thx.error.Error("a {0}",null,"A",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}));
	utest.Assert.equals("b B",thx.util.Results.toString(thx.util.Result.Failure([error])),null,{ fileName : "TestResults.hx", lineNumber : 16, className : "thx.util.TestResults", methodName : "testToString"});
}
thx.util.TestResults.prototype.__class__ = thx.util.TestResults;
thx.math.TestAll = function(p) {
}
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
thx.math.TestAll.prototype.__class__ = thx.math.TestAll;
thx.load.MemoryLoader = function(data) {
	if( data === $_ ) return;
	this.data = data;
}
thx.load.MemoryLoader.__name__ = ["thx","load","MemoryLoader"];
thx.load.MemoryLoader.prototype.data = null;
thx.load.MemoryLoader.prototype.load = function(completeHandler,errorHandler) {
	if(null != this.data) {
		completeHandler(this.data);
		return;
	}
	var error = "data is null";
	if(null != errorHandler) errorHandler(error); else throw error;
}
thx.load.MemoryLoader.prototype.__class__ = thx.load.MemoryLoader;
thx.load.MemoryLoader.__interfaces__ = [thx.load.ILoader];
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}
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
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
thx.math.scale.TestQuantile = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestQuantile.__name__ = ["thx","math","scale","TestQuantile"];
thx.math.scale.TestQuantile.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestQuantile.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestQuantile.prototype.__class__ = thx.math.scale.TestQuantile;
thx.xml.NodeFormat = function(p) {
}
thx.xml.NodeFormat.__name__ = ["thx","xml","NodeFormat"];
thx.xml.NodeFormat.prototype.valueFormat = null;
thx.xml.NodeFormat.prototype.attributeFormat = null;
thx.xml.NodeFormat.prototype.formatEmptyElement = function(node) {
	return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + "/>";
}
thx.xml.NodeFormat.prototype.formatOpenElement = function(node) {
	return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
}
thx.xml.NodeFormat.prototype.formatCloseElement = function(node) {
	return "</" + node.getNodeName() + ">";
}
thx.xml.NodeFormat.prototype.formatPCData = function(node) {
	return this.valueFormat.format(node.getNodeValue());
}
thx.xml.NodeFormat.prototype.formatDocType = function(node) {
	return "<!DOCTYPE " + this.valueFormat.format(node.getNodeValue()) + ">";
}
thx.xml.NodeFormat.prototype.formatProlog = function(node) {
	return "<?" + this.valueFormat.format(node.getNodeValue()) + "?>";
}
thx.xml.NodeFormat.prototype.formatComment = function(node) {
	return "<!--" + this.valueFormat.format(node.getNodeValue()) + "-->";
}
thx.xml.NodeFormat.prototype.formatCData = function(node) {
	return "<![CDATA[" + this.valueFormat.format(node.getNodeValue()) + "]]>";
}
thx.xml.NodeFormat.prototype.__class__ = thx.xml.NodeFormat;
thx.html.HtmlNodeFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.NodeFormat.call(this);
}
thx.html.HtmlNodeFormat.__name__ = ["thx","html","HtmlNodeFormat"];
thx.html.HtmlNodeFormat.__super__ = thx.xml.NodeFormat;
for(var k in thx.xml.NodeFormat.prototype ) thx.html.HtmlNodeFormat.prototype[k] = thx.xml.NodeFormat.prototype[k];
thx.html.HtmlNodeFormat.prototype.formatEmptyElement = function(node) {
	return "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
}
thx.html.HtmlNodeFormat.prototype.__class__ = thx.html.HtmlNodeFormat;
thx.html.CloseSelfHtmlNodeFormat = function(p) {
	if( p === $_ ) return;
	thx.html.HtmlNodeFormat.call(this);
}
thx.html.CloseSelfHtmlNodeFormat.__name__ = ["thx","html","CloseSelfHtmlNodeFormat"];
thx.html.CloseSelfHtmlNodeFormat.__super__ = thx.html.HtmlNodeFormat;
for(var k in thx.html.HtmlNodeFormat.prototype ) thx.html.CloseSelfHtmlNodeFormat.prototype[k] = thx.html.HtmlNodeFormat.prototype[k];
thx.html.CloseSelfHtmlNodeFormat.prototype.formatCloseElement = function(node) {
	if(thx.html.Element._closeSelf.exists(node.getNodeName())) return ""; else return "</" + node.getNodeName() + ">";
}
thx.html.CloseSelfHtmlNodeFormat.prototype.__class__ = thx.html.CloseSelfHtmlNodeFormat;
thx.html.TestXHtmlFormat = function(p) {
}
thx.html.TestXHtmlFormat.__name__ = ["thx","html","TestXHtmlFormat"];
thx.html.TestXHtmlFormat.prototype.format = null;
thx.html.TestXHtmlFormat.prototype.setup = function() {
	this.format = new thx.html.XHtmlFormat();
}
thx.html.TestXHtmlFormat.prototype.testBlockElement = function() {
	this.assertProcessed("<div></div>","<div/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestXHtmlFormat", methodName : "testBlockElement"});
}
thx.html.TestXHtmlFormat.prototype.testEmptyElement = function() {
	this.assertProcessed("<br/>","<br>doomed to be lost</br>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 25, className : "thx.html.TestXHtmlFormat", methodName : "testEmptyElement"});
}
thx.html.TestXHtmlFormat.prototype.testInlineElement = function() {
	this.assertProcessed("<div>hello <b>world</b></div>","<div>hello <b>world</b></div>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 30, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElement"});
}
thx.html.TestXHtmlFormat.prototype.testFillAttribute = function() {
	this.assertProcessed("<input class=\"class\" disabled=\"disabled\"/>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 35, className : "thx.html.TestXHtmlFormat", methodName : "testFillAttribute"});
}
thx.html.TestXHtmlFormat.prototype.testInlineElementInLongParagraph = function() {
	this.format.wrapColumns = 28;
	this.assertProcessed("<p>\n  Lorem ipsum dolor\n  <b>sit</b> amet,\n  consectetur <b>adipisicing\n  elit</b>, sed do eiusmod\n  tempor incididunt\n  <b>ut</b> labore et dolore\n  magna aliqua.\n</p>","<p>Lorem ipsum dolor <b>sit</b> amet, consectetur <b>adipisicing elit</b>, sed do eiusmod tempor incididunt <b>ut</b> labore et dolore magna aliqua.</p>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 41, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElementInLongParagraph"});
}
thx.html.TestXHtmlFormat.prototype.testAutoFormat2 = function() {
	var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
	this.assertProcessed("<html>\n  <head>\n    <title>hello</title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>one</li>\n        <li>two</li>\n        <li>three</li>\n      </ul>\n    </div>\n  </body>\n</html>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 56, className : "thx.html.TestXHtmlFormat", methodName : "testAutoFormat2"});
}
thx.html.TestXHtmlFormat.prototype.testAutoWidth = function() {
	this.format.wrapColumns = 36;
	var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
	this.assertProcessed("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 76, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidth"});
}
thx.html.TestXHtmlFormat.prototype.testAutoWidthWithInlineElements = function() {
	this.format.wrapColumns = 36;
	var xml = "<body><p><b>Lorem</b> ipsum <b>dolor sit</b> amet</p><p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
	this.assertProcessed("<body>\n  <p>\n    <b>Lorem</b> ipsum <b>dolor\n    sit</b> amet\n  </p>\n  <p>\n    consectetur <b>adipisicing</b>\n    elit, <b>sed do</b> eiusmod\n    tempor incididunt ut labore et\n    dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 107, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidthWithInlineElements"});
}
thx.html.TestXHtmlFormat.prototype.assertProcessed = function(expected,input,pos) {
	utest.Assert.equals(expected,this.toHtml(input),null,pos);
}
thx.html.TestXHtmlFormat.prototype.xmlToHtml = function(xml) {
	return this.format.format(xml);
}
thx.html.TestXHtmlFormat.prototype.toHtml = function(s) {
	return this.xmlToHtml(Xml.parse(s));
}
thx.html.TestXHtmlFormat.prototype.__class__ = thx.html.TestXHtmlFormat;
thx.svg.Chord = function(source,target,radius,startAngle,endAngle) {
	if( source === $_ ) return;
	this._source = source;
	this._target = target;
	this._radius = radius;
	this._startAngle = startAngle;
	this._endAngle = endAngle;
}
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
thx.svg.Chord.prototype._source = null;
thx.svg.Chord.prototype._target = null;
thx.svg.Chord.prototype._radius = null;
thx.svg.Chord.prototype._startAngle = null;
thx.svg.Chord.prototype._endAngle = null;
thx.svg.Chord.prototype.shape = function(d,i) {
	var s = this.subgroup(this._source,d,i), t = this.subgroup(this._target,d,i);
	return "M" + s.p0 + this.arc(s.r,s.p1) + (this.equals(s,t)?this.curve(s.r,s.p1,s.r,s.p0):this.curve(s.r,s.p1,t.r,t.p0) + this.arc(t.r,t.p1) + this.curve(t.r,t.p1,s.r,s.p0)) + "Z";
}
thx.svg.Chord.prototype.subgroup = function(f,d,i) {
	var sub = f(d,i), r = this._radius(sub,i), a0 = this._startAngle(sub,i) + thx.svg.LineInternals.arcOffset, a1 = this._endAngle(sub,i) + thx.svg.LineInternals.arcOffset;
	return { r : r, a0 : a0, a1 : a1, p0 : [r * Math.cos(a0),r * Math.sin(a0)], p1 : [r * Math.cos(a1),r * Math.sin(a1)]};
}
thx.svg.Chord.prototype.equals = function(a,b) {
	return a.a0 == b.a0 && a.a1 == b.a1;
}
thx.svg.Chord.prototype.arc = function(r,p) {
	return "A" + r + "," + r + " 0 0,1 " + p;
}
thx.svg.Chord.prototype.curve = function(r0,p0,r1,p1) {
	return "Q 0,0 " + p1;
}
thx.svg.Chord.prototype.getSource = function() {
	return this._source;
}
thx.svg.Chord.prototype.source = function(v) {
	this._source = function(_,_1) {
		return v;
	};
	return this;
}
thx.svg.Chord.prototype.sourcef = function(v) {
	this._source = v;
	return this;
}
thx.svg.Chord.prototype.getTarget = function() {
	return this._target;
}
thx.svg.Chord.prototype.target = function(v) {
	this._target = function(_,_1) {
		return v;
	};
	return this;
}
thx.svg.Chord.prototype.targetf = function(v) {
	this._target = v;
	return this;
}
thx.svg.Chord.prototype.getRadius = function() {
	return this._radius;
}
thx.svg.Chord.prototype.radius = function(v) {
	this._radius = function(_,_1) {
		return v;
	};
	return this;
}
thx.svg.Chord.prototype.radiusf = function(v) {
	this._radius = v;
	return this;
}
thx.svg.Chord.prototype.getStartAngle = function() {
	return this._startAngle;
}
thx.svg.Chord.prototype.startAngle = function(v) {
	this._startAngle = function(_,_1) {
		return v;
	};
	return this;
}
thx.svg.Chord.prototype.startAnglef = function(v) {
	this._startAngle = v;
	return this;
}
thx.svg.Chord.prototype.getEndAngle = function() {
	return this._endAngle;
}
thx.svg.Chord.prototype.endAngle = function(v) {
	this._endAngle = function(_,_1) {
		return v;
	};
	return this;
}
thx.svg.Chord.prototype.endAnglef = function(v) {
	this._endAngle = v;
	return this;
}
thx.svg.Chord.prototype.__class__ = thx.svg.Chord;
thx.js.AccessText = function(selection) {
	if( selection === $_ ) return;
	thx.js.Access.call(this,selection);
}
thx.js.AccessText.__name__ = ["thx","js","AccessText"];
thx.js.AccessText.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessText.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessText.prototype.get = function() {
	return this.selection.firstNode(function(node) {
		return node.textContent;
	});
}
thx.js.AccessText.prototype.string = function(v) {
	this.clear();
	this.selection.eachNode(function(node,_) {
		node.textContent = v;
	});
	return this.selection;
}
thx.js.AccessText.prototype.clear = function() {
	this.selection.eachNode(function(node,i) {
		node.textContent = "";
	});
	return this.selection;
}
thx.js.AccessText.prototype["float"] = function(v) {
	this.clear();
	this.selection.eachNode(function(node,_) {
		node.textContent = "" + v;
	});
	return this.selection;
}
thx.js.AccessText.prototype.stringfNode = function(v) {
	this.clear();
	this.selection.eachNode(function(node,i) {
		var x = v(node,i);
		if(null != x) node.textContent = x;
	});
	return this.selection;
}
thx.js.AccessText.prototype.floatNode = function(v) {
	this.clear();
	this.selection.eachNode(function(node,i) {
		var x = v(node,i);
		if(null != x) node.textContent = "" + x;
	});
	return this.selection;
}
thx.js.AccessText.prototype.__class__ = thx.js.AccessText;
thx.js.AccessDataText = function(selection) {
	if( selection === $_ ) return;
	thx.js.AccessText.call(this,selection);
}
thx.js.AccessDataText.__name__ = ["thx","js","AccessDataText"];
thx.js.AccessDataText.__super__ = thx.js.AccessText;
for(var k in thx.js.AccessText.prototype ) thx.js.AccessDataText.prototype[k] = thx.js.AccessText.prototype[k];
thx.js.AccessDataText.prototype.stringf = function(v) {
	this.clear();
	this.selection.eachNode(function(node,i) {
		var x = v(Reflect.field(node,"__data__"),i);
		if(null != x) node.textContent = x;
	});
	return this.selection;
}
thx.js.AccessDataText.prototype.floatf = function(v) {
	this.clear();
	this.selection.eachNode(function(node,i) {
		var x = v(Reflect.field(node,"__data__"),i);
		if(null != x) node.textContent = "" + x;
	});
	return this.selection;
}
thx.js.AccessDataText.prototype.data = function() {
	return this.stringf(function(d,_) {
		return "" + d;
	});
}
thx.js.AccessDataText.prototype.__class__ = thx.js.AccessDataText;
thx.error.TestAll = function(p) {
}
thx.error.TestAll.__name__ = ["thx","error","TestAll"];
thx.error.TestAll.addTests = function(runner) {
	runner.addCase(new thx.error.TestNullArgument());
}
thx.error.TestAll.main = function() {
	var runner = new utest.Runner();
	thx.error.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
}
thx.error.TestAll.prototype.__class__ = thx.error.TestAll;
utest.Assertation = { __ename__ : ["utest","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
utest.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
thx.math.TestRandom = function(p) {
}
thx.math.TestRandom.__name__ = ["thx","math","TestRandom"];
thx.math.TestRandom.prototype.testSequenceDefault = function() {
	var s = [16807,282475249,548908249,984943658,70367106,470211272,101027544,384109054,385036099,933495885];
	var r = new thx.math.Random();
	var _g = 0;
	while(_g < s.length) {
		var v = s[_g];
		++_g;
		utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 12, className : "thx.math.TestRandom", methodName : "testSequenceDefault"});
	}
}
thx.math.TestRandom.prototype.testSequence7 = function() {
	var s = [117649,903584919,621132276,452154665,492569745,70253433,707192808,541279734,547769049,92020257];
	var r = new thx.math.Random(7);
	var _g = 0;
	while(_g < s.length) {
		var v = s[_g];
		++_g;
		utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 20, className : "thx.math.TestRandom", methodName : "testSequence7"});
	}
}
thx.math.TestRandom.prototype.__class__ = thx.math.TestRandom;
thx.html.TestHtmlFormat = function(p) {
}
thx.html.TestHtmlFormat.__name__ = ["thx","html","TestHtmlFormat"];
thx.html.TestHtmlFormat.prototype.format = null;
thx.html.TestHtmlFormat.prototype.setup = function() {
	this.format = new thx.html.HtmlFormat();
}
thx.html.TestHtmlFormat.prototype.testEmptyElement = function() {
	this.assertProcessed("<br>","<br>doomed to be lost</br>",{ fileName : "TestHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestHtmlFormat", methodName : "testEmptyElement"});
}
thx.html.TestHtmlFormat.prototype.testUseCloseSelf = function() {
	this.format.useCloseSelf = true;
	this.assertProcessed("<ul>\n  <li>item\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 26, className : "thx.html.TestHtmlFormat", methodName : "testUseCloseSelf"});
}
thx.html.TestHtmlFormat.prototype.testDontUseCloseSelf = function() {
	this.assertProcessed("<ul>\n  <li>item</li>\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 31, className : "thx.html.TestHtmlFormat", methodName : "testDontUseCloseSelf"});
}
thx.html.TestHtmlFormat.prototype.testFillAttribute = function() {
	this.assertProcessed("<input class=\"class\" disabled>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 36, className : "thx.html.TestHtmlFormat", methodName : "testFillAttribute"});
}
thx.html.TestHtmlFormat.prototype.testAutoQuotesRemoval = function() {
	this.format.quotesRemoval = true;
	this.assertProcessed("<img class=\"a b\" id=c>","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 42, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemoval"});
}
thx.html.TestHtmlFormat.prototype.testAutoQuotesRemovalOff = function() {
	this.assertProcessed("<img class=\"a b\" id=\"c\">","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 47, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemovalOff"});
}
thx.html.TestHtmlFormat.prototype.assertProcessed = function(expected,input,pos) {
	utest.Assert.equals(expected,this.toHtml(input),null,pos);
}
thx.html.TestHtmlFormat.prototype.xmlToHtml = function(xml) {
	return this.format.format(xml);
}
thx.html.TestHtmlFormat.prototype.toHtml = function(s) {
	return this.xmlToHtml(Xml.parse(s));
}
thx.html.TestHtmlFormat.prototype.__class__ = thx.html.TestHtmlFormat;
Objects = function() { }
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
Objects.interpolate = function(v,a,b,interpolator) {
	return (Objects.interpolatef(a,b,interpolator))(v);
}
Objects.interpolatef = function(a,b,interpolator) {
	var i = { }, c = { }, keys = Reflect.fields(a);
	var _g = 0;
	while(_g < keys.length) {
		var key = keys[_g];
		++_g;
		if(Reflect.hasField(b,key)) {
			var va = Reflect.field(a,key);
			i[key] = (Objects.interpolateByName(key,va))(va,Reflect.field(b,key));
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
Objects.interpolateByName = function(k,v) {
	return Std["is"](v,String) && Objects._reCheckKeyIsColor.match(k)?$closure(thx.color.Colors,"interpolatef"):$closure(Dynamics,"interpolatef");
}
Objects.prototype.__class__ = Objects;
thx.js.AccessProperty = function(name,selection) {
	if( name === $_ ) return;
	thx.js.Access.call(this,selection);
	this.name = name;
}
thx.js.AccessProperty.__name__ = ["thx","js","AccessProperty"];
thx.js.AccessProperty.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessProperty.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessProperty.prototype.name = null;
thx.js.AccessProperty.prototype.get = function() {
	var n = this.name;
	return this.selection.firstNode(function(node) {
		return Reflect.field(node,n);
	});
}
thx.js.AccessProperty.prototype.remove = function() {
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		Reflect.deleteField(node,n);
	});
	return this.selection;
}
thx.js.AccessProperty.prototype.string = function(v) {
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		node[n] = v;
	});
	return this.selection;
}
thx.js.AccessProperty.prototype["float"] = function(v) {
	var s = "" + v;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		node[n] = s;
	});
	return this.selection;
}
thx.js.AccessProperty.prototype.__class__ = thx.js.AccessProperty;
thx.js.AccessDataProperty = function(name,selection) {
	if( name === $_ ) return;
	thx.js.AccessProperty.call(this,name,selection);
}
thx.js.AccessDataProperty.__name__ = ["thx","js","AccessDataProperty"];
thx.js.AccessDataProperty.__super__ = thx.js.AccessProperty;
for(var k in thx.js.AccessProperty.prototype ) thx.js.AccessDataProperty.prototype[k] = thx.js.AccessProperty.prototype[k];
thx.js.AccessDataProperty.prototype.stringf = function(v) {
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) Reflect.deleteField(node,n); else node[n] = s;
	});
	return this.selection;
}
thx.js.AccessDataProperty.prototype.floatf = function(v) {
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) Reflect.deleteField(node,n); else node[n] = "" + s;
	});
	return this.selection;
}
thx.js.AccessDataProperty.prototype.data = function() {
	return this.stringf(function(d,_) {
		return "" + d;
	});
}
thx.js.AccessDataProperty.prototype.__class__ = thx.js.AccessDataProperty;
thx.js.TestDom = function(p) {
}
thx.js.TestDom.__name__ = ["thx","js","TestDom"];
thx.js.TestDom.prototype.testDocument = function() {
	utest.Assert.isFalse(thx.js.Dom.doc.empty(),null,{ fileName : "TestDom.hx", lineNumber : 25, className : "thx.js.TestDom", methodName : "testDocument"});
	utest.Assert.equals(js.Lib.document,thx.js.Dom.doc.node(),null,{ fileName : "TestDom.hx", lineNumber : 26, className : "thx.js.TestDom", methodName : "testDocument"});
}
thx.js.TestDom.prototype.__class__ = thx.js.TestDom;
thx.xml.TestAll = function() { }
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
thx.xml.TestAll.prototype.__class__ = thx.xml.TestAll;
thx.svg.TestLine = function(p) {
}
thx.svg.TestLine.__name__ = ["thx","svg","TestLine"];
thx.svg.TestLine.prototype.testDefault = function() {
	var line = thx.svg.Line.pointArray();
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 12, className : "thx.svg.TestLine", methodName : "testDefault"});
	utest.Assert.equals("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestLine.hx", lineNumber : 13, className : "thx.svg.TestLine", methodName : "testDefault"});
	utest.Assert.equals("M0,0L1,1L2,0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 14, className : "thx.svg.TestLine", methodName : "testDefault"});
}
thx.svg.TestLine.prototype.testY = function() {
	var line = thx.svg.Line.pointArray().y(function(_,_1) {
		return -1;
	});
	utest.Assert.equals("M0,-1",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 21, className : "thx.svg.TestLine", methodName : "testY"});
	utest.Assert.equals("M0,-1L1,-1",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestLine.hx", lineNumber : 22, className : "thx.svg.TestLine", methodName : "testY"});
	utest.Assert.equals("M0,-1L1,-1L2,-1",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 23, className : "thx.svg.TestLine", methodName : "testY"});
}
thx.svg.TestLine.prototype.testXY = function() {
	var line = thx.svg.Line.pointObject();
	utest.Assert.equals("M0,0",line.shape([{ x : 0.0, y : 0.0}]),null,{ fileName : "TestLine.hx", lineNumber : 30, className : "thx.svg.TestLine", methodName : "testXY"});
	utest.Assert.equals("M0,0L1,1",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),null,{ fileName : "TestLine.hx", lineNumber : 31, className : "thx.svg.TestLine", methodName : "testXY"});
	utest.Assert.equals("M0,0L1,1L2,0",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),null,{ fileName : "TestLine.hx", lineNumber : 32, className : "thx.svg.TestLine", methodName : "testXY"});
}
thx.svg.TestLine.prototype.testStepBefore = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepBefore);
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 39, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	utest.Assert.equals("M0,0V1H1",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestLine.hx", lineNumber : 40, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	utest.Assert.equals("M0,0V1H1V0H2",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 41, className : "thx.svg.TestLine", methodName : "testStepBefore"});
}
thx.svg.TestLine.prototype.testStepAfter = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepAfter);
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 48, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	utest.Assert.equals("M0,0H1V1",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestLine.hx", lineNumber : 49, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	utest.Assert.equals("M0,0H1V1H2V0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 50, className : "thx.svg.TestLine", methodName : "testStepAfter"});
}
thx.svg.TestLine.prototype.testBasis = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Basis);
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 57, className : "thx.svg.TestLine", methodName : "testBasis"});
	utest.Assert.equals("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),null,{ fileName : "TestLine.hx", lineNumber : 58, className : "thx.svg.TestLine", methodName : "testBasis"});
	utest.Assert.equals("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 59, className : "thx.svg.TestLine", methodName : "testBasis"});
}
thx.svg.TestLine.prototype.testBasisClosed = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.BasisClosed);
	utest.Assert.equals("M0,0C0,0,0,0,0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 66, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	utest.Assert.equals("M2,2C2,2,4,4,4,4C4,4,2,2,2,2",line.shape([[0.0,0.0],[6.0,6.0]]),null,{ fileName : "TestLine.hx", lineNumber : 67, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	utest.Assert.equals("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 68, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
}
thx.svg.TestLine.prototype.testCardinal = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Cardinal());
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 75, className : "thx.svg.TestLine", methodName : "testCardinal"});
	utest.Assert.equals("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),null,{ fileName : "TestLine.hx", lineNumber : 76, className : "thx.svg.TestLine", methodName : "testCardinal"});
	utest.Assert.equals("M0,0Q4,5,5,5Q6,5,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 77, className : "thx.svg.TestLine", methodName : "testCardinal"});
}
thx.svg.TestLine.prototype.testCardinalClosed = function() {
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.CardinalClosed());
	utest.Assert.equals("M0,0",line.shape([[0.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 84, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	utest.Assert.equals("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),null,{ fileName : "TestLine.hx", lineNumber : 85, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	utest.Assert.equals("M0,0C0,0,3.5,5,5,5S10,0,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),null,{ fileName : "TestLine.hx", lineNumber : 86, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
}
thx.svg.TestLine.prototype.__class__ = thx.svg.TestLine;
thx.math.Ease = function() { }
thx.math.Ease.__name__ = ["thx","math","Ease"];
thx.math.Ease.mode = function(easemode,f) {
	if(null == f) f = $closure(thx.math.Equations,"cubic");
	if(null == easemode) easemode = thx.math.EaseMode.EaseIn;
	switch( (easemode)[1] ) {
	case 0:
		return f;
	case 1:
		return function(t) {
			return 1 - f(1 - t);
		};
	case 2:
		return function(t) {
			return .5 * (t < .5?f(2 * t):2 - f(2 - 2 * t));
		};
	case 3:
		return thx.math.Ease.mode(thx.math.EaseMode.EaseInEaseOut,thx.math.Ease.mode(thx.math.EaseMode.EaseOut,f));
	}
}
thx.math.Ease.prototype.__class__ = thx.math.Ease;
thx.math.Equations = function() { }
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
thx.math.Equations.prototype.__class__ = thx.math.Equations;
thx.math.scale.TestOrdinal = function(p) {
	if( p === $_ ) return;
	thx.math.scale.TestAll.call(this);
}
thx.math.scale.TestOrdinal.__name__ = ["thx","math","scale","TestOrdinal"];
thx.math.scale.TestOrdinal.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestOrdinal.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestOrdinal.prototype.testRange = function() {
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).range([0,1,2,3,4]);
	utest.Assert.same([0,1,2,3,4],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 15, className : "thx.math.scale.TestOrdinal", methodName : "testRange"});
}
thx.math.scale.TestOrdinal.prototype.testRangeBands = function() {
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangeBands(0,100);
	utest.Assert.same([0,20,40,60,80],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 23, className : "thx.math.scale.TestOrdinal", methodName : "testRangeBands"});
}
thx.math.scale.TestOrdinal.prototype.testRangePoints = function() {
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangePoints(0,100);
	utest.Assert.same([0,25,50,75,100],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 31, className : "thx.math.scale.TestOrdinal", methodName : "testRangePoints"});
}
thx.math.scale.TestOrdinal.prototype.__class__ = thx.math.scale.TestOrdinal;
thx.svg.TestChord = function(p) {
}
thx.svg.TestChord.__name__ = ["thx","svg","TestChord"];
thx.svg.TestChord.prototype.__class__ = thx.svg.TestChord;
thx.text.TestInflections = function(p) {
}
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
thx.text.TestInflections.prototype.testUncountable = function() {
	utest.Assert.equals("information",thx.text.Inflections.pluralize("information"),null,{ fileName : "TestInflections.hx", lineNumber : 16, className : "thx.text.TestInflections", methodName : "testUncountable"});
	utest.Assert.equals("news",thx.text.Inflections.pluralize("news"),null,{ fileName : "TestInflections.hx", lineNumber : 17, className : "thx.text.TestInflections", methodName : "testUncountable"});
}
thx.text.TestInflections.prototype.testPluralize = function() {
	utest.Assert.equals("days",thx.text.Inflections.pluralize("day"),null,{ fileName : "TestInflections.hx", lineNumber : 22, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("women",thx.text.Inflections.pluralize("woman"),null,{ fileName : "TestInflections.hx", lineNumber : 23, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("autobuses",thx.text.Inflections.pluralize("autobus"),null,{ fileName : "TestInflections.hx", lineNumber : 24, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("quizzes",thx.text.Inflections.pluralize("quiz"),null,{ fileName : "TestInflections.hx", lineNumber : 25, className : "thx.text.TestInflections", methodName : "testPluralize"});
}
thx.text.TestInflections.prototype.testSingularize = function() {
	utest.Assert.equals("day",thx.text.Inflections.singularize("days"),null,{ fileName : "TestInflections.hx", lineNumber : 30, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("woman",thx.text.Inflections.singularize("women"),null,{ fileName : "TestInflections.hx", lineNumber : 31, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("autobus",thx.text.Inflections.singularize("autobuses"),null,{ fileName : "TestInflections.hx", lineNumber : 32, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("quiz",thx.text.Inflections.singularize("quizzes"),null,{ fileName : "TestInflections.hx", lineNumber : 33, className : "thx.text.TestInflections", methodName : "testSingularize"});
}
thx.text.TestInflections.prototype.__class__ = thx.text.TestInflections;
thx.text.TestAll = function(p) {
}
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
thx.text.TestAll.prototype.__class__ = thx.text.TestAll;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
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
thx.validation.UrlValidator = function(p) {
}
thx.validation.UrlValidator.__name__ = ["thx","validation","UrlValidator"];
thx.validation.UrlValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.UrlValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.UrlValidator.prototype.validate = function(value) {
	if(!thx.validation.UrlValidator._reUrl.match(value)) return thx.util.Result.Failure([new thx.util.Message("invalid url '{0}'",[value],null)]); else return thx.util.Result.Ok;
}
thx.validation.UrlValidator.prototype.__class__ = thx.validation.UrlValidator;
thx.validation.CustomValidator = function(p) {
	if( p === $_ ) return;
	this.validators = [];
}
thx.validation.CustomValidator.__name__ = ["thx","validation","CustomValidator"];
thx.validation.CustomValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.CustomValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.CustomValidator.prototype.validators = null;
thx.validation.CustomValidator.prototype.validate = function(value) {
	var _g = 0, _g1 = this.validators;
	while(_g < _g1.length) {
		var validator = _g1[_g];
		++_g;
		var message = validator(value);
		if(null != message) return thx.util.Result.Failure([message]);
	}
	return thx.util.Result.Ok;
}
thx.validation.CustomValidator.prototype.add = function(handler) {
	this.validators.push(handler);
}
thx.validation.CustomValidator.prototype.clear = function() {
	this.validators = [];
}
thx.validation.CustomValidator.prototype.__class__ = thx.validation.CustomValidator;
thx.validation.TestEmail = function(p) {
}
thx.validation.TestEmail.__name__ = ["thx","validation","TestEmail"];
thx.validation.TestEmail.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestEmail.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestEmail.prototype.testValidEmails = function() {
	var validator = new thx.validation.EmailValidator(false);
	var emails = ["\"test\\\\blah\"@example.com","\"test\\\"blah\"@example.com","customer/department@example.com","$A12345@example.com","!def!xyz%abc@example.com","_Yosemite.Sam@example.com","~@example.com","\"Austin@Powers\"@example.com","Ima.Fool@example.com","\"Ima.Fool\"@example.com"];
	var _g = 0;
	while(_g < emails.length) {
		var email = emails[_g];
		++_g;
		this.assertValidation(validator.validate(email),true,email + " should be valid",{ fileName : "TestEmail.hx", lineNumber : 12, className : "thx.validation.TestEmail", methodName : "testValidEmails"});
	}
}
thx.validation.TestEmail.prototype.testInvalidEmails = function() {
	var validator = new thx.validation.EmailValidator(false);
	var emails = ["NotAnEmail","@NotAnEmail","\"test\rblah\"@example.com","\"test\"blah\"@example.com",".wooly@example.com","wo..oly@example.com","pootietang.@example.com",".@example.com","Ima Fool@example.com"];
	var _g = 0;
	while(_g < emails.length) {
		var email = emails[_g];
		++_g;
		this.assertValidation(validator.validate(email),false,email + " should NOT be valid",{ fileName : "TestEmail.hx", lineNumber : 20, className : "thx.validation.TestEmail", methodName : "testInvalidEmails"});
	}
}
thx.validation.TestEmail.prototype.testTopLevelDomain = function() {
	var validator = new thx.validation.EmailValidator(true);
	this.assertValidation(validator.validate("a@b.fake"),false,null,{ fileName : "TestEmail.hx", lineNumber : 26, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
	var validator1 = new thx.validation.EmailValidator(false);
	this.assertValidation(validator1.validate("a@b.fake"),true,null,{ fileName : "TestEmail.hx", lineNumber : 28, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
}
thx.validation.TestEmail.prototype.__class__ = thx.validation.TestEmail;
thx.html.TestHtmlParser = function(p) {
}
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
thx.html.TestHtmlParser.prototype.testMain = function() {
	var xml = thx.html.Html.toXml("<?xml version=\"1.0\"?><!doctype html><html><head><title></title></head><body></body></html>");
	thx.html.TestHtmlParser.assertHasElement(xml,"html",{ fileName : "TestHtmlParser.hx", lineNumber : 22, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>head",{ fileName : "TestHtmlParser.hx", lineNumber : 23, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>head>title",{ fileName : "TestHtmlParser.hx", lineNumber : 24, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>body",{ fileName : "TestHtmlParser.hx", lineNumber : 25, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	var it = xml.iterator();
	utest.Assert.equals(Xml.Prolog,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 27, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	utest.Assert.equals(Xml.DocType,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 28, className : "thx.html.TestHtmlParser", methodName : "testMain"});
}
thx.html.TestHtmlParser.prototype.__class__ = thx.html.TestHtmlParser;
thx.html.XHtmlFormat = function(autoformat,indent,newline) {
	if( autoformat === $_ ) return;
	if(autoformat == null) autoformat = true;
	thx.xml.XmlFormat.call(this,autoformat,indent,newline);
}
thx.html.XHtmlFormat.__name__ = ["thx","html","XHtmlFormat"];
thx.html.XHtmlFormat.__super__ = thx.xml.XmlFormat;
for(var k in thx.xml.XmlFormat.prototype ) thx.html.XHtmlFormat.prototype[k] = thx.xml.XmlFormat.prototype[k];
thx.html.XHtmlFormat.prototype.createDocumentFormat = function() {
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
thx.html.XHtmlFormat.prototype.__class__ = thx.html.XHtmlFormat;
thx.html.HtmlFormat = function(p) {
	if( p === $_ ) return;
	thx.html.XHtmlFormat.call(this);
	this.useCloseSelf = false;
	this.quotesRemoval = false;
}
thx.html.HtmlFormat.__name__ = ["thx","html","HtmlFormat"];
thx.html.HtmlFormat.__super__ = thx.html.XHtmlFormat;
for(var k in thx.html.XHtmlFormat.prototype ) thx.html.HtmlFormat.prototype[k] = thx.html.XHtmlFormat.prototype[k];
thx.html.HtmlFormat.prototype.useCloseSelf = null;
thx.html.HtmlFormat.prototype.quotesRemoval = null;
thx.html.HtmlFormat.prototype.specialElementContentFormat = null;
thx.html.HtmlFormat.prototype.createAttributeFormat = function() {
	if(this.quotesRemoval) return new thx.html.UnquotedHtmlAttributeFormat(); else return new thx.html.HtmlAttributeFormat();
}
thx.html.HtmlFormat.prototype.createNodeFormat = function() {
	if(this.useCloseSelf) return new thx.html.CloseSelfHtmlNodeFormat(); else return new thx.html.HtmlNodeFormat();
}
thx.html.HtmlFormat.prototype.createDocumentFormat = function() {
	var doc = thx.html.XHtmlFormat.prototype.createDocumentFormat.call(this);
	if(null == this.specialElementContentFormat) return doc;
	var html = Std["is"](doc,thx.html.HtmlDocumentFormat)?doc:null;
	if(null == html) return doc;
	html.specialElementContentFormat = this.specialElementContentFormat;
	return html;
}
thx.html.HtmlFormat.prototype.__class__ = thx.html.HtmlFormat;
thx.validation.OptionValidator = function(options,it,showOptionsInFailureMessage) {
	if( options === $_ ) return;
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
}
thx.validation.OptionValidator.__name__ = ["thx","validation","OptionValidator"];
thx.validation.OptionValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.OptionValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.OptionValidator.prototype.options = null;
thx.validation.OptionValidator.prototype.showOptionsInFailureMessage = null;
thx.validation.OptionValidator.prototype.valueExists = function(v) {
	return Lambda.exists(this.options,function(a) {
		return a.value == v;
	});
}
thx.validation.OptionValidator.prototype.labels = function() {
	var arr = [];
	var _g = 0, _g1 = this.options;
	while(_g < _g1.length) {
		var option = _g1[_g];
		++_g;
		arr.push(option.label);
	}
	return arr;
}
thx.validation.OptionValidator.prototype.descriptions = function() {
	var arr = [];
	var _g = 0, _g1 = this.options;
	while(_g < _g1.length) {
		var option = _g1[_g];
		++_g;
		if(option.label != option.value) arr.push(option.label + " (" + option.value + ")"); else arr.push(option.label);
	}
	return arr;
}
thx.validation.OptionValidator.prototype.validate = function(value) {
	if(this.valueExists(value)) return thx.util.Result.Ok; else if(this.showOptionsInFailureMessage) return thx.util.Result.Failure([new thx.util.Message("value must be one of the following options: {0}",[this.descriptions()],null)]); else return thx.util.Result.Failure([new thx.util.Message("value is not a valid option",[],null)]);
}
thx.validation.OptionValidator.prototype.__class__ = thx.validation.OptionValidator;
thx.svg.TestAll = function() { }
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
thx.svg.TestAll.prototype.__class__ = thx.svg.TestAll;
utest.Assert = function() { }
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
utest.Assert._floatEquals = function(expected,value,approx) {
	if(Math.isNaN(expected)) {
		if(Math.isNaN(value)) return true; else return false;
	} else if(Math.isNaN(value)) return false;
	if(!Math.isFinite(expected)) {
		if(Math.isFinite(value)) return false;
		return expected < 0 == value < 0;
	} else if(!Math.isFinite(value)) return false;
	if(null == approx) approx = 1e-5;
	return Math.abs(Math.abs(value) - Math.abs(expected)) <= approx;
}
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	if(msg == null) msg = "expected " + expected + " but was " + value;
	return utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
}
utest.Assert.getTypeName = function(v) {
	if(v == null) return null;
	if(Std["is"](v,Bool)) return "Bool";
	if(Std["is"](v,Int)) return "Int";
	if(Std["is"](v,Float)) return "Float";
	if(Std["is"](v,String)) return "String";
	var s = null;
	try {
		s = Type.getClassName(Type.getClass(v));
	} catch( e ) {
	}
	if(s != null) return s;
	if(Reflect.isObject(v)) return "{}";
	try {
		s = Type.getEnumName(Type.getEnum(v));
	} catch( e ) {
	}
	if(s != null) return s;
	try {
		s = Std.string(Type["typeof"](v));
	} catch( e ) {
	}
	return s;
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
	var isanonym = texpected == "{}";
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		return false;
	}
	if(expected == null) {
		if(value != null) {
			status.error = "expected null but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	}
	if(Std["is"](expected,Float)) return utest.Assert._floatEquals(expected,value); else if(Std["is"](expected,Bool) || Std["is"](expected,Int) || Std["is"](expected,String)) {
		if(expected != value) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	}
	if(Std["is"](expected,Date)) {
		if(expected.getTime() != value.getTime()) {
			status.error = "expected " + utest.Assert.q(expected) + " (" + expected.getTime() + ") but it is " + utest.Assert.q(value) + " (" + value.getTime() + ")" + (status.path == ""?"":" for field " + status.path);
			return false;
		}
		return true;
	}
	if(Type.getEnum(expected) != null) {
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
	if(utest.Assert.isIterator(expected,isanonym)) {
		if(isanonym && !utest.Assert.isIterator(value,true)) {
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
	if(utest.Assert.isIterable(expected,isanonym)) {
		if(isanonym && !utest.Assert.isIterable(value,true)) {
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
	if(Reflect.isObject(expected)) {
		if(status.recursive || status.path == "") {
			var fields = texpected == "{}"?Reflect.fields(expected):Type.getInstanceFields(Type.getClass(expected));
			var path = status.path;
			var _g = 0;
			while(_g < fields.length) {
				var field = fields[_g];
				++_g;
				status.path = path == ""?field:path + "." + field;
				if(texpected == "{}" && !Reflect.hasField(value,field)) {
					status.error = "expected field " + status.path + " does not exist in " + value;
					return false;
				}
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) return false;
			}
		}
		return true;
	}
	return (function($this) {
		var $r;
		throw "Unable to compare values: " + utest.Assert.q(expected) + " and " + utest.Assert.q(value);
		return $r;
	}(this));
}
utest.Assert.q = function(v) {
	if(Std["is"](v,String)) return "\"" + StringTools.replace(v,"\"","\\\"") + "\""; else if(v == null) return "null"; else return "" + v;
}
utest.Assert.same = function(expected,value,recursive,msg,pos) {
	if(null == recursive) recursive = true;
	var status = { recursive : recursive, path : "", error : null};
	if(utest.Assert.sameAs(expected,value,status)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?status.error:msg,pos);
}
utest.Assert.raises = function(method,type,msg,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		utest.Assert.fail("exception of type " + name + " not raised",pos);
	} catch( ex ) {
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		utest.Assert.isTrue(Std["is"](ex,type),"expected throw of type " + name + " but was " + ex,pos);
	}
}
utest.Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " not found in the expected possibilities " + possibilities:msg,pos);
}
utest.Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + values + " do not contain " + match:msg,pos);
}
utest.Assert.notContains = function(match,values,msg,pos) {
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + values + " do contain " + match:msg,pos);
}
utest.Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " does not contain " + utest.Assert.q(match):msg,pos);
}
utest.Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		utest.Assert.fail(msg == null?"null argument value":msg,{ fileName : "Assert.hx", lineNumber : 527, className : "utest.Assert", methodName : "stringSequence"});
		return;
	}
	var p = 0;
	var _g = 0;
	while(_g < sequence.length) {
		var s = sequence[_g];
		++_g;
		var pos1 = value.indexOf(s,p);
		if(pos1 < 0) {
			if(msg == null) {
				msg = "expected '" + s + "' after ";
				var cut = value.substr(Std["int"](Math.max(0,value.length - 20)));
				if(p > 0) msg += " '" + (cut.length != value.length?"...":"") + cut + "'"; else msg += " begin";
			}
			utest.Assert.fail(msg,{ fileName : "Assert.hx", lineNumber : 545, className : "utest.Assert", methodName : "stringSequence"});
			return;
		}
		p = pos1 + s.length;
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
utest.Assert.prototype.__class__ = utest.Assert;
thx.js.Timer = function() { }
thx.js.Timer.__name__ = ["thx","js","Timer"];
thx.js.Timer.timer = function(f,delay) {
	if(delay == null) delay = 0.0;
	var now = Date.now().getTime(), found = false, start = now + delay, t0, t1 = thx.js.Timer.queue;
	if(!Math.isFinite(delay)) return;
	while(null != t1) {
		if(Reflect.compareMethods(f,t1.f)) {
			t1.then = now;
			t1.delay = delay;
			found = true;
		} else {
			var x = t1.then + t1.delay;
			if(x < start) start = x;
		}
		t0 = t1;
		t1 = t1.next;
	}
	if(!found) thx.js.Timer.queue = { f : f, then : now, delay : delay, next : thx.js.Timer.queue, flush : false};
	if(0 == thx.js.Timer.interval) {
		clearTimeout(thx.js.Timer.timeout);
		thx.js.Timer.timeout = setTimeout(thx.js.Timer.start,Math.max(24,start - now));
	}
}
thx.js.Timer.start = function() {
	thx.js.Timer.interval = 1;
	thx.js.Timer.timeout = 0;
	js.Lib.window.requestAnimationFrame(thx.js.Timer._step);
}
thx.js.Timer.step = function() {
	var elapsed, now = Date.now().getTime(), t0 = null, t1 = thx.js.Timer.queue;
	while(null != t1) {
		elapsed = now - t1.then;
		if(elapsed > t1.delay) t1.flush = t1.f(elapsed);
		t1 = (t0 = t1).next;
	}
	thx.js.Timer.flush();
	if(0 != thx.js.Timer.interval) js.Lib.window.requestAnimationFrame(thx.js.Timer._step);
}
thx.js.Timer.flush = function() {
	var t0 = null, t1 = thx.js.Timer.queue;
	while(null != t1) t1 = t1.flush?null != t0?t0.next = t1.next:thx.js.Timer.queue = t1.next:(t0 = t1).next;
	if(null == t0) thx.js.Timer.interval = 0;
}
thx.js.Timer.prototype.__class__ = thx.js.Timer;
thx.math.TestEquations = function(p) {
}
thx.math.TestEquations.__name__ = ["thx","math","TestEquations"];
thx.math.TestEquations.prototype.testLinear = function() {
	this.assertEquation([0.0,0.25,0.5,0.75,1.0],$closure(thx.math.Equations,"linear"),"linear");
}
thx.math.TestEquations.prototype.testQuad = function() {
	this.assertEquation([0.0,0.0625,0.25,0.5625,1.0],$closure(thx.math.Equations,"quadratic"),"quadratic");
}
thx.math.TestEquations.prototype.testCubic = function() {
	this.assertEquation([0.0,0.015625,0.125,0.421875,1.0],$closure(thx.math.Equations,"cubic"),"cubic");
}
thx.math.TestEquations.prototype.testSin = function() {
	this.assertEquation([0.0,0.07612046748871326,0.2928932188134524,0.6173165676349102,1.0],$closure(thx.math.Equations,"sin"),"sin");
}
thx.math.TestEquations.prototype.testExp = function() {
	this.assertEquation([0.0,0.004524271728019903,0.03025,0.1757766952966369,0.9999],$closure(thx.math.Equations,"exponential"),"exp");
}
thx.math.TestEquations.prototype.testCircle = function() {
	this.assertEquation([0.0,0.031754163448145745,0.1339745962155614,0.3385621722338523,1.0],$closure(thx.math.Equations,"circle"),"circle");
}
thx.math.TestEquations.prototype.testElastic = function() {
	this.assertEquation([0.0,1.1661157560971687,0.9760611111525319,1.00276213586401,1.0],thx.math.Equations.elasticf(),"elastic");
}
thx.math.TestEquations.prototype.testBack = function() {
	this.assertEquation([0.0,-0.06413656250000001,-0.08769750000000004,0.1825903124999999,1.0],thx.math.Equations.backf(),"back");
}
thx.math.TestEquations.prototype.testBounce = function() {
	this.assertEquation([0.0,0.47265625,0.765625,0.97265625,1.0],$closure(thx.math.Equations,"bounce"),"bounce");
}
thx.math.TestEquations.prototype.assertEquation = function(expected,f,name) {
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		var s = i * .25;
		var v = f(s);
		var e = expected[i];
		utest.Assert.floatEquals(e,v,1e-3,name + " expected " + e + " but is " + v + " for " + s,{ fileName : "TestEquations.hx", lineNumber : 60, className : "thx.math.TestEquations", methodName : "assertEquation"});
	}
}
thx.math.TestEquations.prototype.__class__ = thx.math.TestEquations;
thx.color.TestCmyk = function(p) {
}
thx.color.TestCmyk.__name__ = ["thx","color","TestCmyk"];
thx.color.TestCmyk.prototype.testBasics = function() {
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
thx.color.TestCmyk.prototype.__class__ = thx.color.TestCmyk;
thx.js.AccessTweenAttribute = function(name,transition,tweens) {
	if( name === $_ ) return;
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
}
thx.js.AccessTweenAttribute.__name__ = ["thx","js","AccessTweenAttribute"];
thx.js.AccessTweenAttribute.__super__ = thx.js.AccessTween;
for(var k in thx.js.AccessTween.prototype ) thx.js.AccessTweenAttribute.prototype[k] = thx.js.AccessTween.prototype[k];
thx.js.AccessTweenAttribute.prototype.name = null;
thx.js.AccessTweenAttribute.prototype.qname = null;
thx.js.AccessTweenAttribute.prototype.stringfNode = function(f) {
	return this.stringTween(this.transitionStringTweenf(f));
}
thx.js.AccessTweenAttribute.prototype.string = function(value) {
	return this.stringTween(this.transitionStringTween(value));
}
thx.js.AccessTweenAttribute.prototype.stringTween = function(tween) {
	var name = this.name;
	var attrTween = function(d,i) {
		var f = tween(d,i,d.getAttribute(name));
		return function(t) {
			d.setAttribute(name,f(t));
		};
	};
	var attrTweenNS = function(d,i) {
		var f = tween(d,i,d.getAttributeNS(name.space,name.local));
		return function(t) {
			d.setAttributeNS(name.space,name.local,f(t));
		};
	};
	this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
	return this.transition;
}
thx.js.AccessTweenAttribute.prototype.floatNode = function(f) {
	return this.floatTween(this.transitionFloatTweenf(f));
}
thx.js.AccessTweenAttribute.prototype["float"] = function(value) {
	return this.floatTween(this.transitionFloatTween(value));
}
thx.js.AccessTweenAttribute.prototype.floatTween = function(tween) {
	var name = this.name;
	var attrTween = function(d,i) {
		var f = tween(d,i,Std.parseFloat(d.getAttribute(name)));
		return function(t) {
			d.setAttribute(name,"" + f(t));
		};
	};
	var attrTweenNS = function(d,i) {
		var f = tween(d,i,Std.parseFloat(d.getAttributeNS(name.space,name.local)));
		return function(t) {
			haxe.Log.trace(t,{ fileName : "AccessTweenAttribute.hx", lineNumber : 83, className : "thx.js.AccessTweenAttribute", methodName : "floatTween"});
			d.setAttributeNS(name.space,name.local,"" + f(t));
		};
	};
	this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
	return this.transition;
}
thx.js.AccessTweenAttribute.prototype.__class__ = thx.js.AccessTweenAttribute;
thx.js.AccessDataTweenAttribute = function(name,transition,tweens) {
	if( name === $_ ) return;
	thx.js.AccessTweenAttribute.call(this,name,transition,tweens);
}
thx.js.AccessDataTweenAttribute.__name__ = ["thx","js","AccessDataTweenAttribute"];
thx.js.AccessDataTweenAttribute.__super__ = thx.js.AccessTweenAttribute;
for(var k in thx.js.AccessTweenAttribute.prototype ) thx.js.AccessDataTweenAttribute.prototype[k] = thx.js.AccessTweenAttribute.prototype[k];
thx.js.AccessDataTweenAttribute.prototype.stringf = function(f) {
	return this.stringfNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.AccessDataTweenAttribute.prototype.floatf = function(f) {
	return this.floatNode(function(n,i) {
		return f(Reflect.field(n,"__data__"),i);
	});
}
thx.js.AccessDataTweenAttribute.prototype.__class__ = thx.js.AccessDataTweenAttribute;
thx.error.NullArgument = function(argumentName,posInfo) {
	if( argumentName === $_ ) return;
	thx.error.Error.call(this,"invalid null argument '{0}'",null,argumentName,posInfo);
}
thx.error.NullArgument.__name__ = ["thx","error","NullArgument"];
thx.error.NullArgument.__super__ = thx.error.Error;
for(var k in thx.error.Error.prototype ) thx.error.NullArgument.prototype[k] = thx.error.Error.prototype[k];
thx.error.NullArgument.throwIfNull = function(value,name,posInfo) {
	if(null == value) throw new thx.error.NullArgument(name,posInfo);
}
thx.error.NullArgument.prototype.__class__ = thx.error.NullArgument;
thx.html.HtmlParser = function(html) {
	if( html === $_ ) return;
	if(null == html) throw new thx.error.NullArgument("html",{ fileName : "HtmlParser.hx", lineNumber : 29, className : "thx.html.HtmlParser", methodName : "new"});
	this.html = html;
}
thx.html.HtmlParser.__name__ = ["thx","html","HtmlParser"];
thx.html.HtmlParser.prototype.handler = null;
thx.html.HtmlParser.prototype.html = null;
thx.html.HtmlParser.prototype.stack = null;
thx.html.HtmlParser.prototype.process = function(handler) {
	if(null == handler) throw new thx.error.NullArgument("handler",{ fileName : "HtmlParser.hx", lineNumber : 36, className : "thx.html.HtmlParser", methodName : "process"});
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
thx.html.HtmlParser.prototype.stacklast = function() {
	return this.stack[this.stack.length - 1];
}
thx.html.HtmlParser.prototype.parseStartTag = function(tagName,rest,unary) {
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
thx.html.HtmlParser.prototype.parseEndTag = function(tagName) {
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
thx.html.HtmlParser.prototype.__class__ = thx.html.HtmlParser;
TestIterators = function(p) {
}
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
TestIterators.prototype.__class__ = TestIterators;
thx.culture.core.NumberInfo = function(decimals,decimalsSeparator,groups,groupsSeparator,patternNegative,patternPositive) {
	if( decimals === $_ ) return;
	this.decimals = decimals;
	this.decimalsSeparator = decimalsSeparator;
	this.groups = groups;
	this.groupsSeparator = groupsSeparator;
	this.patternNegative = patternNegative;
	this.patternPositive = patternPositive;
}
thx.culture.core.NumberInfo.__name__ = ["thx","culture","core","NumberInfo"];
thx.culture.core.NumberInfo.prototype.decimals = null;
thx.culture.core.NumberInfo.prototype.decimalsSeparator = null;
thx.culture.core.NumberInfo.prototype.groups = null;
thx.culture.core.NumberInfo.prototype.groupsSeparator = null;
thx.culture.core.NumberInfo.prototype.patternNegative = null;
thx.culture.core.NumberInfo.prototype.patternPositive = null;
thx.culture.core.NumberInfo.prototype.__class__ = thx.culture.core.NumberInfo;
thx.validation.PatternValidator = function(pattern,failureMessage) {
	if( pattern === $_ ) return;
	if(failureMessage == null) failureMessage = "value doesn't match the required pattern";
	this.pattern = pattern;
	this.failureMessage = failureMessage;
}
thx.validation.PatternValidator.__name__ = ["thx","validation","PatternValidator"];
thx.validation.PatternValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.PatternValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.PatternValidator.prototype.pattern = null;
thx.validation.PatternValidator.prototype.failureMessage = null;
thx.validation.PatternValidator.prototype.validate = function(value) {
	if(this.pattern.match(value)) return thx.util.Result.Ok; else return thx.util.Result.Failure([new thx.util.Message(this.failureMessage,[],null)]);
}
thx.validation.PatternValidator.prototype.__class__ = thx.validation.PatternValidator;
TestHashes = function(p) {
}
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
TestHashes.prototype.testCreate = function() {
	var hash = DynamicsT.toHash({ name : "haxe", author : "nicolas"});
	utest.Assert.equals("haxe",hash.get("name"),null,{ fileName : "TestHashes.hx", lineNumber : 32, className : "TestHashes", methodName : "testCreate"});
	utest.Assert.equals("nicolas",hash.get("author"),null,{ fileName : "TestHashes.hx", lineNumber : 33, className : "TestHashes", methodName : "testCreate"});
}
TestHashes.prototype.__class__ = TestHashes;
thx.error.AbstractMethod = function(posInfo) {
	if( posInfo === $_ ) return;
	thx.error.Error.call(this,"method {0}.{1}() is abstract",[posInfo.className,posInfo.methodName],posInfo,{ fileName : "AbstractMethod.hx", lineNumber : 14, className : "thx.error.AbstractMethod", methodName : "new"});
}
thx.error.AbstractMethod.__name__ = ["thx","error","AbstractMethod"];
thx.error.AbstractMethod.__super__ = thx.error.Error;
for(var k in thx.error.Error.prototype ) thx.error.AbstractMethod.prototype[k] = thx.error.Error.prototype[k];
thx.error.AbstractMethod.prototype.__class__ = thx.error.AbstractMethod;
thx.color.Colors = function() { }
thx.color.Colors.__name__ = ["thx","color","Colors"];
thx.color.Colors.interpolatef = function(a,b,interpolator) {
	var ca = thx.color.Colors.parse(a);
	var cb = thx.color.Colors.parse(b);
	var f = thx.color.Rgb.interpolatef(ca,cb,interpolator);
	return function(v) {
		return f(v).toString();
	};
}
thx.color.Colors.interpolate = function(v,a,b,interpolator) {
	return (thx.color.Colors.interpolatef(a,b,interpolator))(v);
}
thx.color.Colors.parse = function(s) {
	if(!thx.color.Colors._reParse.match(s)) {
		var v = thx.color.NamedColors.byName.get(s);
		if(null == v) {
			if("transparent" == s) return thx.color.Rgb.fromInt(16777215); else return (function($this) {
				var $r;
				throw new thx.error.Error("invalid color: '{0}'",null,s,{ fileName : "Colors.hx", lineNumber : 39, className : "thx.color.Colors", methodName : "parse"});
				return $r;
			}(this));
		} else return v;
	}
	var type = thx.color.Colors._reParse.matched(1);
	if(!Strings.empty(type)) {
		var values = thx.color.Colors._reParse.matched(2).split(",");
		switch(type.toLowerCase()) {
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
	}).join(""); else if(color.length != 6) return (function($this) {
		var $r;
		throw new thx.error.Error("invalid color: '{0}'",null,s,{ fileName : "Colors.hx", lineNumber : 58, className : "thx.color.Colors", methodName : "parse"});
		return $r;
	}(this));
	return thx.color.Rgb.fromInt(Std.parseInt("0x" + color));
}
thx.color.Colors._c = function(s) {
	return Std.parseInt(s);
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
thx.color.Colors.prototype.__class__ = thx.color.Colors;
DateTools = function() { }
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	return (function($this) {
		var $r;
		switch(e) {
		case "%":
			$r = "%";
			break;
		case "C":
			$r = StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
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
			$r = Std.string(Std["int"](d.getTime() / 1000));
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
		r.b[r.b.length] = DateTools.__format_get(d,f.substr(np + 1,1));
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
	return { ms : t % 1000, seconds : Std["int"](s % 60), minutes : Std["int"](m % 60), hours : Std["int"](h % 24), days : Std["int"](h / 24)};
}
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
}
DateTools.prototype.__class__ = DateTools;
TestObjects = function(p) {
}
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
TestObjects.prototype.testKeys = function() {
	utest.Assert.same(["a","b","c"],Arrays.order(Reflect.fields(TestObjects.testObject)),null,null,{ fileName : "TestObjects.hx", lineNumber : 12, className : "TestObjects", methodName : "testKeys"});
}
TestObjects.prototype.testValues = function() {
	utest.Assert.same([1,2,3],Arrays.order(Objects.values(TestObjects.testObject)),null,null,{ fileName : "TestObjects.hx", lineNumber : 17, className : "TestObjects", methodName : "testValues"});
}
TestObjects.prototype.testEntries = function() {
	utest.Assert.same([{ key : "a", value : 1},{ key : "b", value : 2},{ key : "c", value : 3}],Arrays.order(Objects.entries(TestObjects.testObject),function(a,b) {
		return Reflect.compare(a.key,b.key);
	}),null,null,{ fileName : "TestObjects.hx", lineNumber : 22, className : "TestObjects", methodName : "testEntries"});
}
TestObjects.prototype.testInterpolate = function() {
	var a = { a : 10, b : "x1y2", color : "hsl(30, 0.1, 0.5)", d : "extra"};
	var b = { a : 20, b : "x3y4", color : "hsl(330, 0.3, 0.7)", e : "other"};
	var f = Objects.interpolatef(a,b);
	utest.Assert.same({ d : "extra", e : "other", a : 15, b : "x2y3", color : "rgb(171,142,147)"},f(0.5),null,null,{ fileName : "TestObjects.hx", lineNumber : 42, className : "TestObjects", methodName : "testInterpolate"});
}
TestObjects.prototype.__class__ = TestObjects;
thx.util.TypeServiceLocator = function(p) {
	if( p === $_ ) return;
	this._binders = new Hash();
}
thx.util.TypeServiceLocator.__name__ = ["thx","util","TypeServiceLocator"];
thx.util.TypeServiceLocator.prototype._binders = null;
thx.util.TypeServiceLocator.prototype.instance = function(cls,o) {
	return this.bind(cls,function() {
		return o;
	});
}
thx.util.TypeServiceLocator.prototype.bind = function(cls,f) {
	this._binders.set(Type.getClassName(cls),f);
	return this;
}
thx.util.TypeServiceLocator.prototype.memoize = function(cls,f) {
	var r = null;
	return this.bind(cls,function() {
		if(null == r) r = f();
		return r;
	});
}
thx.util.TypeServiceLocator.prototype.unbinded = function(cls) {
	return null;
}
thx.util.TypeServiceLocator.prototype.get = function(cls) {
	var f = this._binders.get(Type.getClassName(cls));
	if(null == f) return this.unbinded(cls); else return f();
}
thx.util.TypeServiceLocator.prototype.__class__ = thx.util.TypeServiceLocator;
thx.xml.NormalizeWhitespaceValueFormat = function(p) {
	if( p === $_ ) return;
	thx.xml.ValueFormat.call(this);
	this._wsReplace = new EReg("(\\s|\n|\r)+","g");
}
thx.xml.NormalizeWhitespaceValueFormat.__name__ = ["thx","xml","NormalizeWhitespaceValueFormat"];
thx.xml.NormalizeWhitespaceValueFormat.__super__ = thx.xml.ValueFormat;
for(var k in thx.xml.ValueFormat.prototype ) thx.xml.NormalizeWhitespaceValueFormat.prototype[k] = thx.xml.ValueFormat.prototype[k];
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsReplace = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsTestStart = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsTestEnd = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype.format = function(value) {
	var v = this._wsReplace.replace(value," ");
	if(v == " ") return ""; else return v;
}
thx.xml.NormalizeWhitespaceValueFormat.prototype.__class__ = thx.xml.NormalizeWhitespaceValueFormat;
thx.svg.Area = function(x,y0,y1,interpolator) {
	if( x === $_ ) return;
	this._x = x;
	this._y0 = y0;
	this._y1 = y1;
	this._interpolator = interpolator;
}
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
thx.svg.Area.prototype._x = null;
thx.svg.Area.prototype._y0 = null;
thx.svg.Area.prototype._y1 = null;
thx.svg.Area.prototype._interpolator = null;
thx.svg.Area.prototype.shape = function(data,i) {
	var second = thx.svg.LineInternals.linePoints(data,this._x,this._y0);
	second.reverse();
	return data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y1),this._interpolator) + "L" + thx.svg.LineInternals.interpolatePoints(second,this._interpolator) + "Z";
}
thx.svg.Area.prototype.getInterpolator = function() {
	return this._interpolator;
}
thx.svg.Area.prototype.interpolator = function(type) {
	this._interpolator = type;
	return this;
}
thx.svg.Area.prototype.getX = function() {
	return this._x;
}
thx.svg.Area.prototype.x = function(v) {
	this._x = v;
	return this;
}
thx.svg.Area.prototype.getY0 = function() {
	return this._y0;
}
thx.svg.Area.prototype.y0 = function(v) {
	this._y0 = v;
	return this;
}
thx.svg.Area.prototype.getY1 = function() {
	return this._y1;
}
thx.svg.Area.prototype.y1 = function(v) {
	this._y1 = v;
	return this;
}
thx.svg.Area.prototype.__class__ = thx.svg.Area;
thx.languages.It = function(p) {
	if( p === $_ ) return;
	this.name = "it";
	this.english = "Italian";
	this["native"] = "italiano";
	this.iso2 = "it";
	this.iso3 = "ita";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
}
thx.languages.It.__name__ = ["thx","languages","It"];
thx.languages.It.__super__ = thx.culture.Language;
for(var k in thx.culture.Language.prototype ) thx.languages.It.prototype[k] = thx.culture.Language.prototype[k];
thx.languages.It.language = null;
thx.languages.It.getLanguage = function() {
	if(null == thx.languages.It.language) thx.languages.It.language = new thx.languages.It();
	return thx.languages.It.language;
}
thx.languages.It.prototype.__class__ = thx.languages.It;
Xml = function(p) {
}
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
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
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
Xml.prototype.elementsNamed = function(name) {
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
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
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
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName;
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " ";
			s.b[s.b.length] = k;
			s.b[s.b.length] = "=\"";
			s.b[s.b.length] = this._attributes.get(k);
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
		s.b[s.b.length] = x.toString();
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
utest.ui.common.FixtureResult = function(methodName) {
	if( methodName === $_ ) return;
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest.ui.common.ResultStats();
}
utest.ui.common.FixtureResult.__name__ = ["utest","ui","common","FixtureResult"];
utest.ui.common.FixtureResult.prototype.methodName = null;
utest.ui.common.FixtureResult.prototype.hasTestError = null;
utest.ui.common.FixtureResult.prototype.hasSetupError = null;
utest.ui.common.FixtureResult.prototype.hasTeardownError = null;
utest.ui.common.FixtureResult.prototype.hasTimeoutError = null;
utest.ui.common.FixtureResult.prototype.hasAsyncError = null;
utest.ui.common.FixtureResult.prototype.stats = null;
utest.ui.common.FixtureResult.prototype.list = null;
utest.ui.common.FixtureResult.prototype.iterator = function() {
	return this.list.iterator();
}
utest.ui.common.FixtureResult.prototype.add = function(assertation) {
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
utest.ui.common.FixtureResult.prototype.__class__ = utest.ui.common.FixtureResult;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
thx.cultures.ItIT.getCulture();
thx.cultures.EnUS.getCulture();
{
	thx.color.NamedColors.byName = new Hash();
	thx.color.NamedColors.byName.set("aliceblue",thx.color.NamedColors.aliceblue = thx.color.Rgb.fromInt(15792383));
	thx.color.NamedColors.byName.set("antiquewhite",thx.color.NamedColors.antiquewhite = thx.color.Rgb.fromInt(16444375));
	thx.color.NamedColors.byName.set("aqua",thx.color.NamedColors.aqua = thx.color.Rgb.fromInt(65535));
	thx.color.NamedColors.byName.set("aquamarine",thx.color.NamedColors.aquamarine = thx.color.Rgb.fromInt(8388564));
	thx.color.NamedColors.byName.set("azure",thx.color.NamedColors.azure = thx.color.Rgb.fromInt(15794175));
	thx.color.NamedColors.byName.set("beige",thx.color.NamedColors.beige = thx.color.Rgb.fromInt(16119260));
	thx.color.NamedColors.byName.set("bisque",thx.color.NamedColors.bisque = thx.color.Rgb.fromInt(16770244));
	thx.color.NamedColors.byName.set("black",thx.color.NamedColors.black = thx.color.Rgb.fromInt(0));
	thx.color.NamedColors.byName.set("blanchedalmond",thx.color.NamedColors.blanchedalmond = thx.color.Rgb.fromInt(16772045));
	thx.color.NamedColors.byName.set("blue",thx.color.NamedColors.blue = thx.color.Rgb.fromInt(255));
	thx.color.NamedColors.byName.set("blueviolet",thx.color.NamedColors.blueviolet = thx.color.Rgb.fromInt(9055202));
	thx.color.NamedColors.byName.set("brown",thx.color.NamedColors.brown = thx.color.Rgb.fromInt(10824234));
	thx.color.NamedColors.byName.set("burlywood",thx.color.NamedColors.burlywood = thx.color.Rgb.fromInt(14596231));
	thx.color.NamedColors.byName.set("cadetblue",thx.color.NamedColors.cadetblue = thx.color.Rgb.fromInt(6266528));
	thx.color.NamedColors.byName.set("chartreuse",thx.color.NamedColors.chartreuse = thx.color.Rgb.fromInt(8388352));
	thx.color.NamedColors.byName.set("chocolate",thx.color.NamedColors.chocolate = thx.color.Rgb.fromInt(13789470));
	thx.color.NamedColors.byName.set("coral",thx.color.NamedColors.coral = thx.color.Rgb.fromInt(16744272));
	thx.color.NamedColors.byName.set("cornflowerblue",thx.color.NamedColors.cornflowerblue = thx.color.Rgb.fromInt(6591981));
	thx.color.NamedColors.byName.set("cornsilk",thx.color.NamedColors.cornsilk = thx.color.Rgb.fromInt(16775388));
	thx.color.NamedColors.byName.set("crimson",thx.color.NamedColors.crimson = thx.color.Rgb.fromInt(14423100));
	thx.color.NamedColors.byName.set("cyan",thx.color.NamedColors.cyan = thx.color.Rgb.fromInt(65535));
	thx.color.NamedColors.byName.set("darkblue",thx.color.NamedColors.darkblue = thx.color.Rgb.fromInt(139));
	thx.color.NamedColors.byName.set("darkcyan",thx.color.NamedColors.darkcyan = thx.color.Rgb.fromInt(35723));
	thx.color.NamedColors.byName.set("darkgoldenrod",thx.color.NamedColors.darkgoldenrod = thx.color.Rgb.fromInt(12092939));
	thx.color.NamedColors.byName.set("darkgray",thx.color.NamedColors.darkgray = thx.color.NamedColors.darkgrey = thx.color.Rgb.fromInt(11119017));
	thx.color.NamedColors.byName.set("darkgrey",thx.color.NamedColors.darkgrey);
	thx.color.NamedColors.byName.set("darkgreen",thx.color.NamedColors.darkgreen = thx.color.Rgb.fromInt(25600));
	thx.color.NamedColors.byName.set("darkkhaki",thx.color.NamedColors.darkkhaki = thx.color.Rgb.fromInt(12433259));
	thx.color.NamedColors.byName.set("darkmagenta",thx.color.NamedColors.darkmagenta = thx.color.Rgb.fromInt(9109643));
	thx.color.NamedColors.byName.set("darkolivegreen",thx.color.NamedColors.darkolivegreen = thx.color.Rgb.fromInt(5597999));
	thx.color.NamedColors.byName.set("darkorange",thx.color.NamedColors.darkorange = thx.color.Rgb.fromInt(16747520));
	thx.color.NamedColors.byName.set("darkorchid",thx.color.NamedColors.darkorchid = thx.color.Rgb.fromInt(10040012));
	thx.color.NamedColors.byName.set("darkred",thx.color.NamedColors.darkred = thx.color.Rgb.fromInt(9109504));
	thx.color.NamedColors.byName.set("darksalmon",thx.color.NamedColors.darksalmon = thx.color.Rgb.fromInt(15308410));
	thx.color.NamedColors.byName.set("darkseagreen",thx.color.NamedColors.darkseagreen = thx.color.Rgb.fromInt(9419919));
	thx.color.NamedColors.byName.set("darkslateblue",thx.color.NamedColors.darkslateblue = thx.color.Rgb.fromInt(4734347));
	thx.color.NamedColors.byName.set("darkslategray",thx.color.NamedColors.darkslategray = thx.color.NamedColors.darkslategrey = thx.color.Rgb.fromInt(3100495));
	thx.color.NamedColors.byName.set("darkslategrey",thx.color.NamedColors.darkslategrey);
	thx.color.NamedColors.byName.set("darkturquoise",thx.color.NamedColors.darkturquoise = thx.color.Rgb.fromInt(52945));
	thx.color.NamedColors.byName.set("darkviolet",thx.color.NamedColors.darkviolet = thx.color.Rgb.fromInt(9699539));
	thx.color.NamedColors.byName.set("deeppink",thx.color.NamedColors.deeppink = thx.color.Rgb.fromInt(16716947));
	thx.color.NamedColors.byName.set("deepskyblue",thx.color.NamedColors.deepskyblue = thx.color.Rgb.fromInt(49151));
	thx.color.NamedColors.byName.set("dimgray",thx.color.NamedColors.dimgray = thx.color.NamedColors.dimgrey = thx.color.Rgb.fromInt(6908265));
	thx.color.NamedColors.byName.set("dimgrey",thx.color.NamedColors.dimgrey);
	thx.color.NamedColors.byName.set("dodgerblue",thx.color.NamedColors.dodgerblue = thx.color.Rgb.fromInt(2003199));
	thx.color.NamedColors.byName.set("firebrick",thx.color.NamedColors.firebrick = thx.color.Rgb.fromInt(11674146));
	thx.color.NamedColors.byName.set("floralwhite",thx.color.NamedColors.floralwhite = thx.color.Rgb.fromInt(16775920));
	thx.color.NamedColors.byName.set("forestgreen",thx.color.NamedColors.forestgreen = thx.color.Rgb.fromInt(2263842));
	thx.color.NamedColors.byName.set("fuchsia",thx.color.NamedColors.fuchsia = thx.color.Rgb.fromInt(16711935));
	thx.color.NamedColors.byName.set("gainsboro",thx.color.NamedColors.gainsboro = thx.color.Rgb.fromInt(14474460));
	thx.color.NamedColors.byName.set("ghostwhite",thx.color.NamedColors.ghostwhite = thx.color.Rgb.fromInt(16316671));
	thx.color.NamedColors.byName.set("gold",thx.color.NamedColors.gold = thx.color.Rgb.fromInt(16766720));
	thx.color.NamedColors.byName.set("goldenrod",thx.color.NamedColors.goldenrod = thx.color.Rgb.fromInt(14329120));
	thx.color.NamedColors.byName.set("gray",thx.color.NamedColors.gray = thx.color.NamedColors.grey = thx.color.Rgb.fromInt(8421504));
	thx.color.NamedColors.byName.set("grey",thx.color.NamedColors.grey);
	thx.color.NamedColors.byName.set("green",thx.color.NamedColors.green = thx.color.Rgb.fromInt(32768));
	thx.color.NamedColors.byName.set("greenyellow",thx.color.NamedColors.greenyellow = thx.color.Rgb.fromInt(11403055));
	thx.color.NamedColors.byName.set("honeydew",thx.color.NamedColors.honeydew = thx.color.Rgb.fromInt(15794160));
	thx.color.NamedColors.byName.set("hotpink",thx.color.NamedColors.hotpink = thx.color.Rgb.fromInt(16738740));
	thx.color.NamedColors.byName.set("indianred",thx.color.NamedColors.indianred = thx.color.Rgb.fromInt(13458524));
	thx.color.NamedColors.byName.set("indigo",thx.color.NamedColors.indigo = thx.color.Rgb.fromInt(4915330));
	thx.color.NamedColors.byName.set("ivory",thx.color.NamedColors.ivory = thx.color.Rgb.fromInt(16777200));
	thx.color.NamedColors.byName.set("khaki",thx.color.NamedColors.khaki = thx.color.Rgb.fromInt(15787660));
	thx.color.NamedColors.byName.set("lavender",thx.color.NamedColors.lavender = thx.color.Rgb.fromInt(15132410));
	thx.color.NamedColors.byName.set("lavenderblush",thx.color.NamedColors.lavenderblush = thx.color.Rgb.fromInt(16773365));
	thx.color.NamedColors.byName.set("lawngreen",thx.color.NamedColors.lawngreen = thx.color.Rgb.fromInt(8190976));
	thx.color.NamedColors.byName.set("lemonchiffon",thx.color.NamedColors.lemonchiffon = thx.color.Rgb.fromInt(16775885));
	thx.color.NamedColors.byName.set("lightblue",thx.color.NamedColors.lightblue = thx.color.Rgb.fromInt(11393254));
	thx.color.NamedColors.byName.set("lightcoral",thx.color.NamedColors.lightcoral = thx.color.Rgb.fromInt(15761536));
	thx.color.NamedColors.byName.set("lightcyan",thx.color.NamedColors.lightcyan = thx.color.Rgb.fromInt(14745599));
	thx.color.NamedColors.byName.set("lightgoldenrodyellow",thx.color.NamedColors.lightgoldenrodyellow = thx.color.Rgb.fromInt(16448210));
	thx.color.NamedColors.byName.set("lightgray",thx.color.NamedColors.lightgray = thx.color.NamedColors.lightgrey = thx.color.Rgb.fromInt(13882323));
	thx.color.NamedColors.byName.set("lightgrey",thx.color.NamedColors.lightgrey);
	thx.color.NamedColors.byName.set("lightgreen",thx.color.NamedColors.lightgreen = thx.color.Rgb.fromInt(9498256));
	thx.color.NamedColors.byName.set("lightpink",thx.color.NamedColors.lightpink = thx.color.Rgb.fromInt(16758465));
	thx.color.NamedColors.byName.set("lightsalmon",thx.color.NamedColors.lightsalmon = thx.color.Rgb.fromInt(16752762));
	thx.color.NamedColors.byName.set("lightseagreen",thx.color.NamedColors.lightseagreen = thx.color.Rgb.fromInt(2142890));
	thx.color.NamedColors.byName.set("lightskyblue",thx.color.NamedColors.lightskyblue = thx.color.Rgb.fromInt(8900346));
	thx.color.NamedColors.byName.set("lightslategray",thx.color.NamedColors.lightslategray = thx.color.NamedColors.lightslategrey = thx.color.Rgb.fromInt(7833753));
	thx.color.NamedColors.byName.set("lightslategrey",thx.color.NamedColors.lightslategrey);
	thx.color.NamedColors.byName.set("lightsteelblue",thx.color.NamedColors.lightsteelblue = thx.color.Rgb.fromInt(11584734));
	thx.color.NamedColors.byName.set("lightyellow",thx.color.NamedColors.lightyellow = thx.color.Rgb.fromInt(16777184));
	thx.color.NamedColors.byName.set("lime",thx.color.NamedColors.lime = thx.color.Rgb.fromInt(65280));
	thx.color.NamedColors.byName.set("limegreen",thx.color.NamedColors.limegreen = thx.color.Rgb.fromInt(3329330));
	thx.color.NamedColors.byName.set("linen",thx.color.NamedColors.linen = thx.color.Rgb.fromInt(16445670));
	thx.color.NamedColors.byName.set("magenta",thx.color.NamedColors.magenta = thx.color.Rgb.fromInt(16711935));
	thx.color.NamedColors.byName.set("maroon",thx.color.NamedColors.maroon = thx.color.Rgb.fromInt(8388608));
	thx.color.NamedColors.byName.set("mediumaquamarine",thx.color.NamedColors.mediumaquamarine = thx.color.Rgb.fromInt(6737322));
	thx.color.NamedColors.byName.set("mediumblue",thx.color.NamedColors.mediumblue = thx.color.Rgb.fromInt(205));
	thx.color.NamedColors.byName.set("mediumorchid",thx.color.NamedColors.mediumorchid = thx.color.Rgb.fromInt(12211667));
	thx.color.NamedColors.byName.set("mediumpurple",thx.color.NamedColors.mediumpurple = thx.color.Rgb.fromInt(9662683));
	thx.color.NamedColors.byName.set("mediumseagreen",thx.color.NamedColors.mediumseagreen = thx.color.Rgb.fromInt(3978097));
	thx.color.NamedColors.byName.set("mediumslateblue",thx.color.NamedColors.mediumslateblue = thx.color.Rgb.fromInt(8087790));
	thx.color.NamedColors.byName.set("mediumspringgreen",thx.color.NamedColors.mediumspringgreen = thx.color.Rgb.fromInt(64154));
	thx.color.NamedColors.byName.set("mediumturquoise",thx.color.NamedColors.mediumturquoise = thx.color.Rgb.fromInt(4772300));
	thx.color.NamedColors.byName.set("mediumvioletred",thx.color.NamedColors.mediumvioletred = thx.color.Rgb.fromInt(13047173));
	thx.color.NamedColors.byName.set("midnightblue",thx.color.NamedColors.midnightblue = thx.color.Rgb.fromInt(1644912));
	thx.color.NamedColors.byName.set("mintcream",thx.color.NamedColors.mintcream = thx.color.Rgb.fromInt(16121850));
	thx.color.NamedColors.byName.set("mistyrose",thx.color.NamedColors.mistyrose = thx.color.Rgb.fromInt(16770273));
	thx.color.NamedColors.byName.set("moccasin",thx.color.NamedColors.moccasin = thx.color.Rgb.fromInt(16770229));
	thx.color.NamedColors.byName.set("navajowhite",thx.color.NamedColors.navajowhite = thx.color.Rgb.fromInt(16768685));
	thx.color.NamedColors.byName.set("navy",thx.color.NamedColors.navy = thx.color.Rgb.fromInt(128));
	thx.color.NamedColors.byName.set("oldlace",thx.color.NamedColors.oldlace = thx.color.Rgb.fromInt(16643558));
	thx.color.NamedColors.byName.set("olive",thx.color.NamedColors.olive = thx.color.Rgb.fromInt(8421376));
	thx.color.NamedColors.byName.set("olivedrab",thx.color.NamedColors.olivedrab = thx.color.Rgb.fromInt(7048739));
	thx.color.NamedColors.byName.set("orange",thx.color.NamedColors.orange = thx.color.Rgb.fromInt(16753920));
	thx.color.NamedColors.byName.set("orangered",thx.color.NamedColors.orangered = thx.color.Rgb.fromInt(16729344));
	thx.color.NamedColors.byName.set("orchid",thx.color.NamedColors.orchid = thx.color.Rgb.fromInt(14315734));
	thx.color.NamedColors.byName.set("palegoldenrod",thx.color.NamedColors.palegoldenrod = thx.color.Rgb.fromInt(15657130));
	thx.color.NamedColors.byName.set("palegreen",thx.color.NamedColors.palegreen = thx.color.Rgb.fromInt(10025880));
	thx.color.NamedColors.byName.set("paleturquoise",thx.color.NamedColors.paleturquoise = thx.color.Rgb.fromInt(11529966));
	thx.color.NamedColors.byName.set("palevioletred",thx.color.NamedColors.palevioletred = thx.color.Rgb.fromInt(14381203));
	thx.color.NamedColors.byName.set("papayawhip",thx.color.NamedColors.papayawhip = thx.color.Rgb.fromInt(16773077));
	thx.color.NamedColors.byName.set("peachpuff",thx.color.NamedColors.peachpuff = thx.color.Rgb.fromInt(16767673));
	thx.color.NamedColors.byName.set("peru",thx.color.NamedColors.peru = thx.color.Rgb.fromInt(13468991));
	thx.color.NamedColors.byName.set("pink",thx.color.NamedColors.pink = thx.color.Rgb.fromInt(16761035));
	thx.color.NamedColors.byName.set("plum",thx.color.NamedColors.plum = thx.color.Rgb.fromInt(14524637));
	thx.color.NamedColors.byName.set("powderblue",thx.color.NamedColors.powderblue = thx.color.Rgb.fromInt(11591910));
	thx.color.NamedColors.byName.set("purple",thx.color.NamedColors.purple = thx.color.Rgb.fromInt(8388736));
	thx.color.NamedColors.byName.set("red",thx.color.NamedColors.red = thx.color.Rgb.fromInt(16711680));
	thx.color.NamedColors.byName.set("rosybrown",thx.color.NamedColors.rosybrown = thx.color.Rgb.fromInt(12357519));
	thx.color.NamedColors.byName.set("royalblue",thx.color.NamedColors.royalblue = thx.color.Rgb.fromInt(4286945));
	thx.color.NamedColors.byName.set("saddlebrown",thx.color.NamedColors.saddlebrown = thx.color.Rgb.fromInt(9127187));
	thx.color.NamedColors.byName.set("salmon",thx.color.NamedColors.salmon = thx.color.Rgb.fromInt(16416882));
	thx.color.NamedColors.byName.set("sandybrown",thx.color.NamedColors.sandybrown = thx.color.Rgb.fromInt(16032864));
	thx.color.NamedColors.byName.set("seagreen",thx.color.NamedColors.seagreen = thx.color.Rgb.fromInt(3050327));
	thx.color.NamedColors.byName.set("seashell",thx.color.NamedColors.seashell = thx.color.Rgb.fromInt(16774638));
	thx.color.NamedColors.byName.set("sienna",thx.color.NamedColors.sienna = thx.color.Rgb.fromInt(10506797));
	thx.color.NamedColors.byName.set("silver",thx.color.NamedColors.silver = thx.color.Rgb.fromInt(12632256));
	thx.color.NamedColors.byName.set("skyblue",thx.color.NamedColors.skyblue = thx.color.Rgb.fromInt(8900331));
	thx.color.NamedColors.byName.set("slateblue",thx.color.NamedColors.slateblue = thx.color.Rgb.fromInt(6970061));
	thx.color.NamedColors.byName.set("slategray",thx.color.NamedColors.slategray = thx.color.NamedColors.slategrey = thx.color.Rgb.fromInt(7372944));
	thx.color.NamedColors.byName.set("slategrey",thx.color.NamedColors.slategrey);
	thx.color.NamedColors.byName.set("snow",thx.color.NamedColors.snow = thx.color.Rgb.fromInt(16775930));
	thx.color.NamedColors.byName.set("springgreen",thx.color.NamedColors.springgreen = thx.color.Rgb.fromInt(65407));
	thx.color.NamedColors.byName.set("steelblue",thx.color.NamedColors.steelblue = thx.color.Rgb.fromInt(4620980));
	thx.color.NamedColors.byName.set("tan",thx.color.NamedColors.tan = thx.color.Rgb.fromInt(13808780));
	thx.color.NamedColors.byName.set("teal",thx.color.NamedColors.teal = thx.color.Rgb.fromInt(32896));
	thx.color.NamedColors.byName.set("thistle",thx.color.NamedColors.thistle = thx.color.Rgb.fromInt(14204888));
	thx.color.NamedColors.byName.set("tomato",thx.color.NamedColors.tomato = thx.color.Rgb.fromInt(16737095));
	thx.color.NamedColors.byName.set("turquoise",thx.color.NamedColors.turquoise = thx.color.Rgb.fromInt(4251856));
	thx.color.NamedColors.byName.set("violet",thx.color.NamedColors.violet = thx.color.Rgb.fromInt(15631086));
	thx.color.NamedColors.byName.set("wheat",thx.color.NamedColors.wheat = thx.color.Rgb.fromInt(16113331));
	thx.color.NamedColors.byName.set("white",thx.color.NamedColors.white = thx.color.Rgb.fromInt(16777215));
	thx.color.NamedColors.byName.set("whitesmoke",thx.color.NamedColors.whitesmoke = thx.color.Rgb.fromInt(16119285));
	thx.color.NamedColors.byName.set("yellow",thx.color.NamedColors.yellow = thx.color.Rgb.fromInt(16776960));
	thx.color.NamedColors.byName.set("yellowgreen",thx.color.NamedColors.yellowgreen = thx.color.Rgb.fromInt(10145074));
}
{
	/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					if ( type === "first" ) {
						return true;
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) {
							return false;
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						}

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try {
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();;
	var s = window.Sizzle;
	thx.js.Sizzle = s;
	thx.js.Sizzle.select = s;
}
thx.languages.En.getLanguage();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
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
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 1000 / 60); } ;
thx.languages.It.getLanguage();
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
Strings.__ucwordsPattern = new EReg("[^a-zA-Z]([a-z])","");
Strings.__ucwordswsPattern = new EReg("\\s([a-z])","");
Strings.__alphaNumPattern = new EReg("^[a-z0-9]+$","i");
Strings.__digitsPattern = new EReg("^[0-9]+$","");
Strings._reInterpolateNumber = new EReg("[-+]?(?:\\d+\\.\\d+|\\d+\\.|\\.\\d+|\\d+)(?:[eE][-]?\\d+)?","");
thx.html.Attribute._fill = thx.collections.Set.ofArray("checked,compact,declare,defer,disabled,formnovalidate,novalidate,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,required,selected".split(","));
thx.text.Inflections.uncountable_words = ["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"];
thx.text.Inflections.plural_rules = [{ pattern : new EReg("(m)an$","gi"), replace : "$1en"},{ pattern : new EReg("(pe)rson$","gi"), replace : "$1ople"},{ pattern : new EReg("(child)$","gi"), replace : "$1ren"},{ pattern : new EReg("(ax|test)is$","gi"), replace : "$1es"},{ pattern : new EReg("(octop|vir)us$","gi"), replace : "$1i"},{ pattern : new EReg("(alias|status)$","gi"), replace : "$1es"},{ pattern : new EReg("(bu)s$","gi"), replace : "$1ses"},{ pattern : new EReg("(buffal|tomat)o$","gi"), replace : "$1oes"},{ pattern : new EReg("([ti])um$","gi"), replace : "$1a"},{ pattern : new EReg("sis$","gi"), replace : "ses"},{ pattern : new EReg("(?:([^f])fe|([lr])f)$","gi"), replace : "$1$2ves"},{ pattern : new EReg("(hive)$","gi"), replace : "$1s"},{ pattern : new EReg("([^aeiouy]|qu)y$","gi"), replace : "$1ies"},{ pattern : new EReg("(x|ch|ss|sh)$","gi"), replace : "$1es"},{ pattern : new EReg("(matr|vert|ind)ix|ex$","gi"), replace : "$1ices"},{ pattern : new EReg("([m|l])ouse$","gi"), replace : "$1ice"},{ pattern : new EReg("^(ox)$","gi"), replace : "$1en"},{ pattern : new EReg("(quiz)$","gi"), replace : "$1zes"},{ pattern : new EReg("s$","gi"), replace : "s"},{ pattern : new EReg("$","gi"), replace : "s"}];
thx.text.Inflections.singular_rules = [{ pattern : new EReg("(m)en$","gi"), replace : "$1an"},{ pattern : new EReg("(pe)ople$","gi"), replace : "$1rson"},{ pattern : new EReg("(child)ren$","gi"), replace : "$1"},{ pattern : new EReg("([ti])a$","gi"), replace : "$1um"},{ pattern : new EReg("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"), replace : "$1$2sis"},{ pattern : new EReg("(hive)s$","gi"), replace : "$1"},{ pattern : new EReg("(tive)s$","gi"), replace : "$1"},{ pattern : new EReg("([lr])ves$","gi"), replace : "$1f"},{ pattern : new EReg("([^fo])ves$","gi"), replace : "$1fe"},{ pattern : new EReg("([^aeiouy]|qu)ies$","gi"), replace : "$1y"},{ pattern : new EReg("(s)eries$","gi"), replace : "$1eries"},{ pattern : new EReg("(m)ovies$","gi"), replace : "$1ovie"},{ pattern : new EReg("(x|ch|ss|sh)es$","gi"), replace : "$1"},{ pattern : new EReg("([m|l])ice$","gi"), replace : "$1ouse"},{ pattern : new EReg("(bus)es$","gi"), replace : "$1"},{ pattern : new EReg("(o)es$","gi"), replace : "$1"},{ pattern : new EReg("(shoe)s$","gi"), replace : "$1"},{ pattern : new EReg("(cris|ax|test)es$","gi"), replace : "$1is"},{ pattern : new EReg("(octop|vir)i$","gi"), replace : "$1us"},{ pattern : new EReg("(alias|status)es$","gi"), replace : "$1"},{ pattern : new EReg("^(ox)en","gi"), replace : "$1"},{ pattern : new EReg("(vert|ind)ices$","gi"), replace : "$1ex"},{ pattern : new EReg("(matr)ices$","gi"), replace : "$1ix"},{ pattern : new EReg("(quiz)zes$","gi"), replace : "$1"},{ pattern : new EReg("s$","gi"), replace : ""}];
js.Lib.onerror = null;
thx.js.Dom.doc = (function() {
	var gs = thx.js.Selection.create([new thx.js.Group([js.Lib.document])]);
	gs.parentNode = js.Lib.document.documentElement;
	return gs;
})();
thx.js.Dom.selectionEngine = new thx.js.SizzleEngine();
thx.math.Const.TWO_PI = 6.283185307179586477;
thx.math.Const.PI = 3.141592653589793238;
thx.math.Const.HALF_PI = 1.570796326794896619;
thx.math.Const.TO_DEGREE = 57.29577951308232088;
thx.math.Const.TO_RADIAN = 0.01745329251994329577;
thx.math.Const.LN10 = 2.302585092994046;
thx.validation.EmailValidator._reEmail = new EReg("^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$","i");
thx.validation.EmailValidator._reEmailDomain = new EReg("\\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$","i");
thx.xml.Namespace.prefix = (function() {
	var h = new Hash();
	h.set("svg","http://www.w3.org/2000/svg");
	h.set("xhtml","http://www.w3.org/1999/xhtml");
	h.set("xlink","http://www.w3.org/1999/xlink");
	h.set("xml","http://www.w3.org/XML/1998/namespace");
	h.set("xmlns","http://www.w3.org/2000/xmlns/");
	return h;
})();
thx.math.scale.TestLinearString.data = [4,8,16,32,64];
utest.ui.text.HtmlReport.platform = "javascript";
thx.json.TestJson.tests = [{ c : thx.data.DataExpr.CENull, s : "null"},{ c : thx.data.DataExpr.CEString("a\nb"), s : "\"a\\nb\""},{ c : thx.data.DataExpr.CEInt(1), s : "1"},{ c : thx.data.DataExpr.CEFloat(-0.1), s : "-0.1"},{ c : thx.data.DataExpr.CEFloat(-1.234e-100), s : "-1.234e-100"},{ c : thx.data.DataExpr.CEBool(true), s : "true"},{ c : thx.data.DataExpr.CEBool(false), s : "false"},{ c : thx.data.DataExpr.CEArray([]), s : "[]"},{ c : thx.data.DataExpr.CEArray([thx.data.DataExpr.CENull,thx.data.DataExpr.CEBool(true)]), s : "[null, true]"},{ c : thx.data.DataExpr.CEObject([{ k : "name", v : thx.data.DataExpr.CEString("haxe")},{ k : "stars", v : thx.data.DataExpr.CEInt(5)}]), s : "{\"name\":\"haxe\",\"stars\":5}"}];
thx.validation.SingleLineValidator._re = new EReg("(\n|\r)","m");
thx.svg.LineInternals.arcOffset = -Math.PI / 2;
thx.svg.LineInternals.arcMax = 2 * Math.PI - 1e-6;
thx.svg.LineInternals._lineBasisBezier1 = [0,2 / 3,1 / 3,0];
thx.svg.LineInternals._lineBasisBezier2 = [0,1 / 3,2 / 3,0];
thx.svg.LineInternals._lineBasisBezier3 = [0,1 / 6,2 / 3,1 / 6];
thx.html.Element._preserve = thx.collections.Set.ofArray("pre,textarea".split(","));
thx.html.Element._empty = thx.collections.Set.ofArray("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(","));
thx.html.Element._block = thx.collections.Set.ofArray("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,textarea,tfoot,th,thead,title,tr,ul".split(","));
thx.html.Element._inline = thx.collections.Set.ofArray("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,tt,u,var".split(","));
thx.html.Element._break = thx.collections.Set.ofArray("br,hr".split(","));
thx.html.Element._closeSelf = thx.collections.Set.ofArray("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr".split(","));
thx.html.Element._special = thx.collections.Set.ofArray("script,style".split(","));
thx.js.BaseTransition._id = 0;
thx.js.BaseTransition._inheritid = 0;
thx.data.TestData.tests = [{ v : 1, ce : thx.data.DataExpr.CEInt(1)},{ v : "hello", ce : thx.data.DataExpr.CEString("hello")},{ v : null, ce : thx.data.DataExpr.CENull},{ v : true, ce : thx.data.DataExpr.CEBool(true)},{ v : false, ce : thx.data.DataExpr.CEBool(false)},{ v : 0.1, ce : thx.data.DataExpr.CEFloat(0.1)},{ v : Date.fromString("1972-05-07 00:00:00"), ce : thx.data.DataExpr.CEDate("1972-05-07T00:00:00")},{ v : [1,"a"], ce : thx.data.DataExpr.CEArray([thx.data.DataExpr.CEInt(1),thx.data.DataExpr.CEString("a")])},{ v : { a : "b", c : "d"}, ce : thx.data.DataExpr.CEObject([{ k : "a", v : thx.data.DataExpr.CEString("b")},{ k : "c", v : thx.data.DataExpr.CEString("d")}])}];
utest.TestHandler.POLLING_TIME = 10;
haxe.Timer.arr = new Array();
Objects._reCheckKeyIsColor = new EReg("color\\b|\\bbackground\\b|\\bstroke\\b|\\bfill\\b","");
thx.math.scale.TestOrdinal.data = [4,8,16,32,64];
thx.validation.UrlValidator._reUrl = new EReg("^(http|ftp|https)://[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?$","");
thx.js.Timer.timeout = 0;
thx.js.Timer.queue = null;
thx.js.Timer.interval = 0;
thx.js.Timer._step = $closure(thx.js.Timer,"step");
thx.html.HtmlParser.startTag = new EReg("^<(\\w+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(/?)>","");
thx.html.HtmlParser.endTag = new EReg("^</(\\w+)[^>]*>","");
thx.html.HtmlParser.attr = new EReg("(\\w+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?","g");
thx.html.HtmlParser.comment = new EReg("<!--(.*?)-->","g");
thx.html.HtmlParser.cdata = new EReg("<!\\[CDATA\\[(.*?)]]>","g");
thx.html.HtmlParser.doctype = new EReg("<!DOCTYPE(.*?)>","gi");
thx.html.HtmlParser.declaration = new EReg("<?xml(.*?)>","g");
thx.color.Colors._reParse = new EReg("^\\s*(?:(hsl|rgb|rgba|cmyk)\\(([^)]+)\\))|(?:(?:0x|#)([a-f0-9]{3,6}))\\s*$","i");
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
TestObjects.testObject = { a : 1, b : 2, c : 3};
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
TestAll.main()