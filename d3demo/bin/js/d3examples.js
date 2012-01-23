var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
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
if(!thx.color) thx.color = {}
thx.color.Rgb = $hxClasses["thx.color.Rgb"] = function(r,g,b) {
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
}
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
		default:
			return (function($this) {
				var $r;
				throw new thx.error.Error("Unsupported type format: {0}",null,Type["typeof"](v),{ fileName : "Dynamics.hx", lineNumber : 42, className : "Dynamics", methodName : "formatf"});
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
	if(!((Std["is"](a,Float) || Std["is"](a,Int)) && (Std["is"](b,Float) || Std["is"](b,Int))) && !Type.enumEq(ta,tb)) throw new thx.error.Error("arguments a ({0}) and b ({0}) have different types",[a,b],null,{ fileName : "Dynamics.hx", lineNumber : 57, className : "Dynamics", methodName : "interpolatef"});
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
			throw new thx.error.Error("cannot interpolate on instances of {0}",null,name,{ fileName : "Dynamics.hx", lineNumber : 75, className : "Dynamics", methodName : "interpolatef"});
		}
		break;
	default:
		throw new thx.error.Error("cannot interpolate on functions/enums/unknown",null,null,{ fileName : "Dynamics.hx", lineNumber : 77, className : "Dynamics", methodName : "interpolatef"});
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
	if(!Types.sameType(a,b)) throw new thx.error.Error("cannot compare 2 different types",null,null,{ fileName : "Dynamics.hx", lineNumber : 129, className : "Dynamics", methodName : "compare"});
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
Dynamics.clone = function(v) {
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
			var o = Type.createEmptyInstance(c);
			var _g = 0, _g1 = Reflect.fields(v);
			while(_g < _g1.length) {
				var field = _g1[_g];
				++_g;
				o[field] = Dynamics.clone(Reflect.field(v,field));
			}
			return o;
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
		throw new thx.error.Error("Unable to compare values: {0} and {1}",[a,b],null,{ fileName : "Dynamics.hx", lineNumber : 364, className : "Dynamics", methodName : "same"});
		return $r;
	}(this));
}
Dynamics.number = function(v) {
	return Number(v);
}
Dynamics.prototype = {
	__class__: Dynamics
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
}
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
if(!thx.js) thx.js = {}
thx.js.Access = $hxClasses["thx.js.Access"] = function(selection) {
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
thx.js.Access.prototype = {
	selection: null
	,_that: function() {
		return this.selection;
	}
	,__class__: thx.js.Access
}
thx.js.AccessAttribute = $hxClasses["thx.js.AccessAttribute"] = function(name,selection) {
	thx.js.Access.call(this,selection);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
}
thx.js.AccessAttribute.__name__ = ["thx","js","AccessAttribute"];
thx.js.AccessAttribute.__super__ = thx.js.Access;
thx.js.AccessAttribute.prototype = $extend(thx.js.Access.prototype,{
	name: null
	,qname: null
	,get: function() {
		var n = this.name, q = this.qname;
		return this.selection.firstNode(function(node) {
			return q == null?node.getAttribute(n):node.getAttributeNS(q.space,q.local);
		});
	}
	,getFloat: function() {
		var v = this.get();
		if(thx.js.AccessAttribute.refloat.match(v)) return Std.parseFloat(thx.js.AccessAttribute.refloat.matched(1)); else return Math.NaN;
	}
	,remove: function() {
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
	,string: function(v) {
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
	,'float': function(v) {
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
	,__class__: thx.js.AccessAttribute
});
thx.js.AccessDataAttribute = $hxClasses["thx.js.AccessDataAttribute"] = function(name,selection) {
	thx.js.AccessAttribute.call(this,name,selection);
}
thx.js.AccessDataAttribute.__name__ = ["thx","js","AccessDataAttribute"];
thx.js.AccessDataAttribute.__super__ = thx.js.AccessAttribute;
thx.js.AccessDataAttribute.prototype = $extend(thx.js.AccessAttribute.prototype,{
	stringf: function(v) {
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
	,floatf: function(v) {
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
	,data: function() {
		return this.stringf(function(d,_) {
			return "" + d;
		});
	}
	,__class__: thx.js.AccessDataAttribute
});
thx.js.AccessHtml = $hxClasses["thx.js.AccessHtml"] = function(selection) {
	thx.js.Access.call(this,selection);
}
thx.js.AccessHtml.__name__ = ["thx","js","AccessHtml"];
thx.js.AccessHtml.__super__ = thx.js.Access;
thx.js.AccessHtml.prototype = $extend(thx.js.Access.prototype,{
	get: function() {
		return this.selection.firstNode(function(node) {
			return node.innerHTML;
		});
	}
	,string: function(v) {
		this.selection.eachNode(function(node,i) {
			node.innerHTML = v;
		});
		return this.selection;
	}
	,clear: function() {
		this.selection.eachNode(function(node,i) {
			node.innerHTML = "";
		});
		return this.selection;
	}
	,'float': function(v) {
		this.selection.eachNode(function(node,i) {
			node.innerHTML = "" + v;
		});
		return this.selection;
	}
	,__class__: thx.js.AccessHtml
});
thx.js.AccessDataHtml = $hxClasses["thx.js.AccessDataHtml"] = function(selection) {
	thx.js.AccessHtml.call(this,selection);
}
thx.js.AccessDataHtml.__name__ = ["thx","js","AccessDataHtml"];
thx.js.AccessDataHtml.__super__ = thx.js.AccessHtml;
thx.js.AccessDataHtml.prototype = $extend(thx.js.AccessHtml.prototype,{
	stringf: function(v) {
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) s = "";
			node.innerHTML = s;
		});
		return this.selection;
	}
	,floatf: function(v) {
		this.selection.eachNode(function(node,i) {
			var f = v(Reflect.field(node,"__data__"),i);
			if(null == f) node.innerHTML = ""; else node.innerHTML = "" + f;
		});
		return this.selection;
	}
	,data: function() {
		return this.stringf(function(d,_) {
			return "" + d;
		});
	}
	,__class__: thx.js.AccessDataHtml
});
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
var js = js || {}
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
thx.js.Group = $hxClasses["thx.js.Group"] = function(nodes) {
	this.nodes = nodes;
}
thx.js.Group.__name__ = ["thx","js","Group"];
thx.js.Group.current = null;
thx.js.Group.merge = function(source,target) {
	if(target.length != source.length) throw "Group length not equal";
	var _g1 = 0, _g = target.length;
	while(_g1 < _g) {
		var i = _g1++;
		var s = source[i];
		var t = target[i];
		if(s.parentNode != t.parentNode) throw "parentNodes not the same!"; else if(s.nodes.length != t.nodes.length) throw "node length mismatch!"; else {
			var _g3 = 0, _g2 = t.nodes.length;
			while(_g3 < _g2) {
				var i1 = _g3++;
				if(null == t.nodes[i1]) t.nodes[i1] = s.nodes[i1];
			}
		}
	}
	return target;
}
thx.js.Group.prototype = {
	parentNode: null
	,nodes: null
	,each: function(f) {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(null != this.nodes[i]) f(thx.js.Group.current = this.nodes[i],i);
		}
	}
	,iterator: function() {
		return this.nodes.iterator();
	}
	,get: function(i) {
		return this.nodes[i];
	}
	,count: function() {
		return this.nodes.length;
	}
	,push: function(node) {
		this.nodes.push(node);
	}
	,sort: function(comparator) {
		this.nodes.sort(comparator);
	}
	,__class__: thx.js.Group
}
thx.js.BaseSelection = $hxClasses["thx.js.BaseSelection"] = function(groups) {
	this.groups = groups;
}
thx.js.BaseSelection.__name__ = ["thx","js","BaseSelection"];
thx.js.BaseSelection.listenerEnterLeave = function(f,dom,i) {
	var e = thx.js.Dom.event, target = e.relatedTarget;
	if(null == target || thx.js.BaseSelection.isChild(dom,target)) return;
	f(dom,i);
}
thx.js.BaseSelection.isChild = function(parent,child) {
	if(child == parent) return false;
	while(child != null) {
		child = child.parentNode;
		if(child == parent) return true;
	}
	return false;
}
thx.js.BaseSelection.addEvent = function(node,typo,handler,capture) {
	node.addEventListener(typo,handler,capture);
}
thx.js.BaseSelection.removeEvent = function(node,typo,type,capture) {
	node.removeEventListener(typo,Reflect.field(node,"__on" + type),capture);
}
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
			enterHtmlDoms[i] = { __data__ : nodeData};
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
thx.js.BaseSelection.prototype = {
	parentNode: null
	,groups: null
	,select: function(selector) {
		return this._select(function(el) {
			return thx.js.Dom.selectionEngine.select(selector,el);
		});
	}
	,selectAll: function(selector) {
		return this._selectAll(function(el) {
			return thx.js.Dom.selectionEngine.selectAll(selector,el);
		});
	}
	,_this: function() {
		return this;
	}
	,append: function(name) {
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
	,remove: function() {
		return this.eachNode(function(node,i) {
			var parent = node.parentNode;
			if(null != parent) parent.removeChild(node);
		});
	}
	,eachNode: function(f) {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			group.each(f);
		}
		return this;
	}
	,insert: function(name,before,beforeSelector) {
		var qname = thx.xml.Namespace.qualify(name);
		var insertDom = function(node) {
			var n = js.Lib.document.createElement(name);
			node.insertBefore(n,null != before?before:thx.js.Dom.select(beforeSelector).node());
			return n;
		};
		var insertNsDom = function(node) {
			var n = js.Lib.document.createElementNS(qname.space,qname.local);
			node.insertBefore(n,null != before?before:thx.js.Dom.select(beforeSelector).node());
			return n;
		};
		return this._select(null == qname?insertDom:insertNsDom);
	}
	,sortNode: function(comparator) {
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
	,firstNode: function(f) {
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
	,node: function() {
		return this.firstNode(function(n) {
			return n;
		});
	}
	,empty: function() {
		return null == this.firstNode(function(n) {
			return n;
		});
	}
	,filterNode: function(f) {
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
	,onNode: function(type,listener,capture) {
		if(capture == null) capture = false;
		var i = type.indexOf("."), typo = i < 0?type:type.substr(0,i);
		if((typo == "mouseenter" || typo == "mouseleave") && !thx.js.ClientHost.isIE()) {
			listener = (function(f,a1) {
				return function(a2,a3) {
					return f(a1,a2,a3);
				};
			})(thx.js.BaseSelection.listenerEnterLeave,listener);
			if(typo == "mouseenter") typo = "mouseover"; else typo = "mouseout";
		}
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
				n.removeEventListener(typo,Reflect.field(n,"__on" + type),capture);
				Reflect.deleteField(n,"__on" + type);
			}
			if(null != listener) {
				n["__on" + type] = l;
				n.addEventListener(typo,l,capture);
			}
		});
	}
	,createSelection: function(groups) {
		return (function($this) {
			var $r;
			throw new thx.error.AbstractMethod({ fileName : "Selection.hx", lineNumber : 634, className : "thx.js.BaseSelection", methodName : "createSelection"});
			return $r;
		}(this));
	}
	,_select: function(selectf) {
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
					subgroup.parentNode = node1;
					subgroup.nodes.push(subnode = selectf(node1));
					if(null != subnode) subnode["__data__"] = Reflect.field(node1,"__data__");
				} else subgroup.nodes.push(null);
			}
		}
		return this.createSelection(subgroups);
	}
	,_selectAll: function(selectallf) {
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
	,__class__: thx.js.BaseSelection
}
thx.js.UnboundSelection = $hxClasses["thx.js.UnboundSelection"] = function(groups) {
	thx.js.BaseSelection.call(this,groups);
}
thx.js.UnboundSelection.__name__ = ["thx","js","UnboundSelection"];
thx.js.UnboundSelection.__super__ = thx.js.BaseSelection;
thx.js.UnboundSelection.prototype = $extend(thx.js.BaseSelection.prototype,{
	html: function() {
		return new thx.js.AccessHtml(this);
	}
	,text: function() {
		return new thx.js.AccessText(this);
	}
	,attr: function(name) {
		return new thx.js.AccessAttribute(name,this);
	}
	,classed: function() {
		return new thx.js.AccessClassed(this);
	}
	,property: function(name) {
		return new thx.js.AccessProperty(name,this);
	}
	,style: function(name) {
		return new thx.js.AccessStyle(name,this);
	}
	,transition: function() {
		return new thx.js.UnboundTransition(this);
	}
	,data: function(d,join) {
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
	,selectAllData: function(selector) {
		var selection = this.selectAll(selector);
		return new thx.js.ResumeSelection(selection.groups);
	}
	,__class__: thx.js.UnboundSelection
});
thx.js.Selection = $hxClasses["thx.js.Selection"] = function(groups) {
	thx.js.UnboundSelection.call(this,groups);
}
thx.js.Selection.__name__ = ["thx","js","Selection"];
thx.js.Selection.__properties__ = {get_currentNode:"getCurrentNode",get_current:"getCurrent"}
thx.js.Selection.current = null;
thx.js.Selection.currentNode = null;
thx.js.Selection.create = function(groups) {
	return new thx.js.Selection(groups);
}
thx.js.Selection.getCurrent = function() {
	return thx.js.Dom.selectNode(thx.js.Group.current);
}
thx.js.Selection.getCurrentNode = function() {
	return thx.js.Group.current;
}
thx.js.Selection.__super__ = thx.js.UnboundSelection;
thx.js.Selection.prototype = $extend(thx.js.UnboundSelection.prototype,{
	createSelection: function(groups) {
		return new thx.js.Selection(groups);
	}
	,__class__: thx.js.Selection
});
thx.js.ISelectorEngine = $hxClasses["thx.js.ISelectorEngine"] = function() { }
thx.js.ISelectorEngine.__name__ = ["thx","js","ISelectorEngine"];
thx.js.ISelectorEngine.prototype = {
	select: null
	,selectAll: null
	,__class__: thx.js.ISelectorEngine
}
thx.js.SizzleEngine = $hxClasses["thx.js.SizzleEngine"] = function() {
}
thx.js.SizzleEngine.__name__ = ["thx","js","SizzleEngine"];
thx.js.SizzleEngine.__interfaces__ = [thx.js.ISelectorEngine];
thx.js.SizzleEngine.prototype = {
	select: function(selector,node) {
		return thx.js.Sizzle.select(selector,node)[0];
	}
	,selectNode: function(n,p) {
		return thx.js.Sizzle.select(n,p)[0];
	}
	,selectAll: function(selector,node) {
		return thx.js.Sizzle.uniqueSort(thx.js.Sizzle.select(selector,node));
	}
	,__class__: thx.js.SizzleEngine
}
thx.js.Dom = $hxClasses["thx.js.Dom"] = function() { }
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
thx.js.Dom.selectNodes = function(nodes) {
	return thx.js.Selection.create([new thx.js.Group(nodes)]);
}
thx.js.Dom.selectNodeData = function(node) {
	return thx.js.ResumeSelection.create([new thx.js.Group([node])]);
}
thx.js.Dom.event = null;
thx.js.Dom.prototype = {
	__class__: thx.js.Dom
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
}
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
var Hash = $hxClasses["Hash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
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
}
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
if(!thx.math) thx.math = {}
thx.math.Const = $hxClasses["thx.math.Const"] = function() { }
thx.math.Const.__name__ = ["thx","math","Const"];
thx.math.Const.prototype = {
	__class__: thx.math.Const
}
var d3 = d3 || {}
d3.Example = $hxClasses["d3.Example"] = function(cid) {
	this.cid = cid;
}
d3.Example.__name__ = ["d3","Example"];
d3.Example.prototype = {
	cid: null
	,container: null
	,run: function() {
		var des = this.description();
		thx.js.Dom.select("#description").html().string(null != des?des:"");
		this.container = thx.js.Dom.select(this.cid).attr("class").string(Type.getClassName(Type.getClass(this)).split(".").pop());
		this.runExample();
	}
	,runExample: function() {
		haxe.Log.trace("abstract method: " + Type.getClassName(Type.getClass(this)) + ".runExample",{ fileName : "Example.hx", lineNumber : 29, className : "d3.Example", methodName : "runExample"});
	}
	,destroy: function() {
		this.destroyExample();
		this.container.attr("class").remove().selectAll("*").remove();
		thx.js.Dom.select("#haxe\\:trace").html().string("");
	}
	,description: function() {
		return null;
	}
	,destroyExample: function() {
	}
	,stageWidth: function() {
		return 678;
	}
	,__class__: d3.Example
}
d3.Moire = $hxClasses["d3.Moire"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Moire.__name__ = ["d3","Moire"];
d3.Moire.__super__ = d3.Example;
d3.Moire.prototype = $extend(d3.Example.prototype,{
	runExample: function() {
		var w = this.stageWidth(), h = 500;
		var svg = this.container.append("svg:svg").attr("width")["float"](w).attr("height")["float"](h).attr("pointer-events").string("all");
		svg.append("svg:g").selectAll("circle").data(Ints.range(110)).enter().append("svg:circle").attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")").attr("r").floatf(function(d,i) {
			return d * 5;
		});
		var circle = svg.append("svg:g").selectAll("circle").data(Ints.range(60)).enter().append("svg:circle").attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")").attr("r").floatf(function(d,i) {
			return d * 3;
		});
		svg.onNode("mousemove",function(n,i) {
			var mouse = thx.js.Svg.mouse(n), r = (Math.sqrt(mouse[0]) + 10) / 10;
			circle.attr("transform").string("translate(" + mouse + ")").attr("r").floatf(function(d,i1) {
				return d * r;
			});
		});
	}
	,description: function() {
		return "Moire effect. Move the mouse over the circles.";
	}
	,__class__: d3.Moire
});
d3.Stream = $hxClasses["d3.Stream"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Stream.__name__ = ["d3","Stream"];
d3.Stream.__super__ = d3.Example;
d3.Stream.prototype = $extend(d3.Example.prototype,{
	data0: null
	,data1: null
	,area: null
	,runExample: function() {
		this.container.append("button").text().string("switch data").onNode("click",this.transition.$bind(this));
		this.container.append("br");
		var n = 20, m = 200, color = thx.color.Colors.interpolatef("#aad","#556");
		this.data0 = new thx.geom.layout.Stack().offset(thx.geom.layout.StackOffset.Wiggle).stack(d3.Streams.layers(n,m));
		this.data1 = new thx.geom.layout.Stack().offset(thx.geom.layout.StackOffset.Wiggle).stack(d3.Streams.layers(n,m));
		var w = this.stageWidth(), h = 500.0, mx = m - 1, my = Arrays.floatMax(this.data0.concat(this.data1),function(d) {
			return Arrays.floatMax(d,function(d1) {
				return d1.y0 + d1.y;
			});
		});
		this.area = new thx.svg.Area().x(function(d,i) {
			return d.x * w / mx;
		}).y0(function(d,i) {
			return h - d.y0 * h / my;
		}).y1(function(d,i) {
			return h - (d.y + d.y0) * h / my;
		});
		var vis = this.container.append("svg:svg").attr("width")["float"](w).attr("height")["float"](h);
		vis.selectAll("path").data(this.data0).enter().append("svg:path").attr("fill").stringf(function(d,i) {
			return color(Math.random());
		}).attr("d").stringf(($_=this.area,$_.shape.$bind($_)));
	}
	,transition: function(_,_1) {
		var me = this;
		this.container.selectAllData("path").dataf(function(_2,_3) {
			var d = me.data1;
			me.data1 = me.data0;
			return me.data0 = d;
		}).update().transition().delay(null,500).duration(null,2500).attr("d").stringf(function(d,i) {
			return me.area.shape(d);
		});
	}
	,description: function() {
		return "Stream chart. Datasets are randomly generated. Press the button to switch dataset.";
	}
	,__class__: d3.Stream
});
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
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
if(!thx.svg) thx.svg = {}
thx.svg.Line = $hxClasses["thx.svg.Line"] = function(x,y,interpolator) {
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
if(!thx.math.scale) thx.math.scale = {}
thx.math.scale.IScale = $hxClasses["thx.math.scale.IScale"] = function() { }
thx.math.scale.IScale.__name__ = ["thx","math","scale","IScale"];
thx.math.scale.IScale.prototype = {
	scale: null
	,getDomain: null
	,getRange: null
	,__class__: thx.math.scale.IScale
}
thx.math.scale.Quantize = $hxClasses["thx.math.scale.Quantize"] = function() {
	this.x0 = 0;
	this.x1 = 1;
	this.kx = 2;
	this.i = 1;
	this._range = [];
}
thx.math.scale.Quantize.__name__ = ["thx","math","scale","Quantize"];
thx.math.scale.Quantize.__interfaces__ = [thx.math.scale.IScale];
thx.math.scale.Quantize.prototype = {
	x0: null
	,x1: null
	,kx: null
	,i: null
	,_range: null
	,scale: function(x,_) {
		return this._range[Std["int"](Math.max(0,Math.min(this.i,Math.floor(this.kx * (x - this.x0)))))];
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
if(!thx.geom) thx.geom = {}
if(!thx.geom.layout) thx.geom.layout = {}
thx.geom.layout.Stack = $hxClasses["thx.geom.layout.Stack"] = function() {
	this._order = thx.geom.layout.StackOrder.DefaultOrder;
	this._offset = thx.geom.layout.StackOffset.ZeroOffset;
}
thx.geom.layout.Stack.__name__ = ["thx","geom","layout","Stack"];
thx.geom.layout.Stack.getStackOrder = function(order,data) {
	switch( (order)[1] ) {
	case 0:
		return Ints.range(data.length);
	case 1:
		var n = data.length, max = data.map(thx.geom.layout.Stack.stackMaxIndex), sums = data.map(thx.geom.layout.Stack.stackReduceSum), index = Ints.range(n), top = 0.0, bottom = 0.0, tops = [], bottoms = [];
		index.sort(function(a,b) {
			return max[a] - max[b];
		});
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			var j = index[i];
			if(top < bottom) {
				top += sums[j];
				tops.push(j);
			} else {
				bottom += sums[j];
				bottoms.push(j);
			}
		}
		bottoms.reverse();
		return bottoms.concat(tops);
	case 2:
		var index = Ints.range(data.length);
		index.reverse();
		return index;
	}
}
thx.geom.layout.Stack.getStackOffset = function(offset,index,data) {
	switch( (offset)[1] ) {
	case 0:
		var n = data.length, m = data[0].length, sums = [], max = 0.0, o;
		var _g = 0;
		while(_g < m) {
			var j = _g++;
			o = 0.0;
			var _g1 = 0;
			while(_g1 < n) {
				var i = _g1++;
				o += data[i][j].y;
			}
			if(o > max) max = o;
			sums.push(o);
		}
		var i = index[0];
		var _g = 0;
		while(_g < m) {
			var j = _g++;
			data[i][j].y0 = (max - sums[j]) / 2;
		}
		break;
	case 1:
		var n = data.length, x = data[0], m = x.length, max = 0.0, k, ii, ik, i0 = index[0], s1, s2, s3, dx, o, o0;
		data[i0][0].y0 = o = o0 = 0.0;
		var _g = 1;
		while(_g < m) {
			var j = _g++;
			s1 = 0.0;
			var _g1 = 0;
			while(_g1 < n) {
				var i = _g1++;
				s1 += data[i][j].y;
			}
			s2 = 0.0;
			dx = x[j].x - x[j - 1].x;
			var _g1 = 0;
			while(_g1 < n) {
				var i = _g1++;
				ii = index[i];
				s3 = (data[ii][j].y - data[ii][j - 1].y) / (2 * dx);
				var _g2 = 0;
				while(_g2 < i) {
					var k1 = _g2++;
					s3 += (data[ik = index[k1]][j].y - data[ik][j - 1].y) / dx;
				}
				s2 += s3 * data[ii][j].y;
			}
			data[i0][j].y0 = o -= s1 != 0?s2 / s1 * dx:0;
			if(o < o0) o0 = o;
		}
		var _g = 0;
		while(_g < m) {
			var j = _g++;
			data[i0][j].y0 -= o0;
		}
		break;
	case 2:
		var m = data[0].length, i0 = index[0];
		var _g = 0;
		while(_g < m) {
			var j = _g++;
			data[i0][j].y0 = 0.0;
		}
		break;
	}
}
thx.geom.layout.Stack.stackMaxIndex = function(data,_) {
	var j = 0, v = data[0].y, k, n = data.length;
	var _g = 1;
	while(_g < n) {
		var i = _g++;
		if((k = data[i].y) > v) {
			j = i;
			v = k;
		}
	}
	return j;
}
thx.geom.layout.Stack.stackReduceSum = function(data,_) {
	return data.reduce(thx.geom.layout.Stack.stackSum,0.0);
}
thx.geom.layout.Stack.stackSum = function(p,c,i) {
	return p + c.y;
}
thx.geom.layout.Stack.prototype = {
	_order: null
	,_offset: null
	,stack: function(data) {
		var n = data.length, m = data[0].length, i, j, y0, result = [];
		var _g = 0;
		while(_g < n) {
			var i1 = _g++;
			var r = [];
			result.push(r);
			var _g1 = 0;
			while(_g1 < m) {
				var j1 = _g1++;
				var s = data[i1][j1];
				r[j1] = { x : s.x, y : s.y, y0 : 0.0};
			}
		}
		var index = thx.geom.layout.Stack.getStackOrder(this._order,result);
		thx.geom.layout.Stack.getStackOffset(this._offset,index,result);
		var _g = 0;
		while(_g < m) {
			var j1 = _g++;
			y0 = result[index[0]][j1].y0;
			var _g1 = 1;
			while(_g1 < n) {
				var i1 = _g1++;
				result[index[i1]][j1].y0 = y0 += result[index[i1 - 1]][j1].y;
			}
		}
		return result;
	}
	,getOrder: function() {
		return this._order;
	}
	,order: function(x) {
		this._order = x;
		return this;
	}
	,getOffset: function() {
		return this._offset;
	}
	,offset: function(x) {
		this._offset = x;
		return this;
	}
	,__class__: thx.geom.layout.Stack
}
thx.geom.layout.StackOrder = $hxClasses["thx.geom.layout.StackOrder"] = { __ename__ : ["thx","geom","layout","StackOrder"], __constructs__ : ["DefaultOrder","InsideOut","ReverseOrder"] }
thx.geom.layout.StackOrder.DefaultOrder = ["DefaultOrder",0];
thx.geom.layout.StackOrder.DefaultOrder.toString = $estr;
thx.geom.layout.StackOrder.DefaultOrder.__enum__ = thx.geom.layout.StackOrder;
thx.geom.layout.StackOrder.InsideOut = ["InsideOut",1];
thx.geom.layout.StackOrder.InsideOut.toString = $estr;
thx.geom.layout.StackOrder.InsideOut.__enum__ = thx.geom.layout.StackOrder;
thx.geom.layout.StackOrder.ReverseOrder = ["ReverseOrder",2];
thx.geom.layout.StackOrder.ReverseOrder.toString = $estr;
thx.geom.layout.StackOrder.ReverseOrder.__enum__ = thx.geom.layout.StackOrder;
thx.geom.layout.StackOffset = $hxClasses["thx.geom.layout.StackOffset"] = { __ename__ : ["thx","geom","layout","StackOffset"], __constructs__ : ["Silhouette","Wiggle","ZeroOffset"] }
thx.geom.layout.StackOffset.Silhouette = ["Silhouette",0];
thx.geom.layout.StackOffset.Silhouette.toString = $estr;
thx.geom.layout.StackOffset.Silhouette.__enum__ = thx.geom.layout.StackOffset;
thx.geom.layout.StackOffset.Wiggle = ["Wiggle",1];
thx.geom.layout.StackOffset.Wiggle.toString = $estr;
thx.geom.layout.StackOffset.Wiggle.__enum__ = thx.geom.layout.StackOffset;
thx.geom.layout.StackOffset.ZeroOffset = ["ZeroOffset",2];
thx.geom.layout.StackOffset.ZeroOffset.toString = $estr;
thx.geom.layout.StackOffset.ZeroOffset.__enum__ = thx.geom.layout.StackOffset;
d3.Bar = $hxClasses["d3.Bar"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Bar.__name__ = ["d3","Bar"];
d3.Bar.__super__ = d3.Example;
d3.Bar.prototype = $extend(d3.Example.prototype,{
	runExample: function() {
		var data = Ints.range(10).map(function(d,_) {
			return Math.random();
		});
		var w = 430, h = 230, x = new thx.math.scale.Linear().range([0.0,w]).modulo(10), y = new thx.math.scale.Ordinal().domain(Ints.range(data.length)).rangeBands(0,h,.2);
		var vis = this.container.append("svg:svg").attr("class").string("barex").attr("width")["float"](w + 40).attr("height")["float"](h + 40).append("svg:g").attr("transform").string("translate(20,0)");
		var bars = vis.selectAll("g.bar").data(data).enter().append("svg:g").attr("class").string("bar").attr("transform").stringf(function(d,i) {
			return "translate(0," + y.scale(i) + ")";
		});
		bars.append("svg:rect").attr("fill").string("steelblue").attr("width").floatf(x.scale.$bind(x)).attr("height")["float"](y.rangeBand);
		bars.append("svg:text").attr("x").floatf(x.scale.$bind(x)).attr("y")["float"](y.rangeBand / 2).attr("dx")["float"](-6).attr("dy").string(".35em").attr("fill").string("white").attr("text-anchor").string("end").text().stringf(($_=x.modulo(100),$_.tickFormat.$bind($_)));
		x.modulo(10);
		bars.append("svg:text").attr("x")["float"](0).attr("y")["float"](y.rangeBand / 2).attr("dx")["float"](-6).attr("dy").string(".35em").attr("text-anchor").string("end").text().stringf(function(d,i) {
			return String.fromCharCode(65 + i);
		});
		var rules = vis.selectAll("g.rule").data(x.ticks()).enter().append("svg:g").attr("class").string("rule").attr("transform").stringf(function(d,i) {
			return "translate(" + x.scale(d) + ",0)";
		});
		rules.append("svg:line").attr("y1")["float"](h).attr("y2")["float"](h + 6).attr("stroke").string("black").attr("stroke-opacity")["float"](1);
		rules.append("svg:line").attr("y1")["float"](0).attr("y2")["float"](h).attr("stroke").string("#333").attr("stroke-opacity")["float"](.3);
		rules.append("svg:text").attr("y")["float"](h + 9).attr("dy").string(".71em").attr("text-anchor").string("middle").text().stringf(x.tickFormat.$bind(x));
		vis.append("svg:line").attr("y1")["float"](0).attr("y2")["float"](h).attr("stroke").string("black");
	}
	,description: function() {
		return "Bar Chart from random data. Not interactive.";
	}
	,__class__: d3.Bar
});
if(!thx.xml) thx.xml = {}
thx.xml.Namespace = $hxClasses["thx.xml.Namespace"] = function() { }
thx.xml.Namespace.__name__ = ["thx","xml","Namespace"];
thx.xml.Namespace.qualify = function(name) {
	var i = name.indexOf(":");
	if(i < 0) return null; else {
		var space = thx.xml.Namespace.prefix.get(name.substr(0,i));
		if(null == space) throw new thx.error.Error("unable to find a namespace for {0}",[space],null,{ fileName : "Namespace.hx", lineNumber : 29, className : "thx.xml.Namespace", methodName : "qualify"});
		return new thx.xml.NSQualifier(space,name.substr(i + 1));
	}
}
thx.xml.Namespace.prototype = {
	__class__: thx.xml.Namespace
}
thx.xml.NSQualifier = $hxClasses["thx.xml.NSQualifier"] = function(space,local) {
	this.space = space;
	this.local = local;
}
thx.xml.NSQualifier.__name__ = ["thx","xml","NSQualifier"];
thx.xml.NSQualifier.prototype = {
	space: null
	,local: null
	,__class__: thx.xml.NSQualifier
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
var haxe = haxe || {}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.setErrorHandler(haxe.Firebug.onError);
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype = {
	__class__: haxe.Firebug
}
if(!thx.util) thx.util = {}
thx.util.Message = $hxClasses["thx.util.Message"] = function(message,params,param) {
	this.message = message;
	if(null == params) this.params = []; else this.params = params;
	if(null != param) this.params.push(param);
}
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
thx.js.AccessTween = $hxClasses["thx.js.AccessTween"] = function(transition,tweens) {
	this.transition = transition;
	this.tweens = tweens;
}
thx.js.AccessTween.__name__ = ["thx","js","AccessTween"];
thx.js.AccessTween.prototype = {
	transition: null
	,tweens: null
	,transitionColorTween: function(value) {
		return function(d,i,a) {
			return thx.color.Rgb.interpolatef(a,value);
		};
	}
	,transitionColorTweenf: function(f) {
		return function(d,i,a) {
			return thx.color.Rgb.interpolatef(a,f(d,i));
		};
	}
	,transitionStringTween: function(value) {
		return function(d,i,a) {
			return Strings.interpolatef(a,value);
		};
	}
	,transitionStringTweenf: function(f) {
		return function(d,i,a) {
			return Strings.interpolatef(a,f(d,i));
		};
	}
	,transitionCharsTween: function(value) {
		return function(d,i,a) {
			return Strings.interpolateCharsf(a,value);
		};
	}
	,transitionCharsTweenf: function(f) {
		return function(d,i,a) {
			return Strings.interpolateCharsf(a,f(d,i));
		};
	}
	,transitionFloatTween: function(value) {
		return function(d,i,a) {
			return Floats.interpolatef(a,value);
		};
	}
	,transitionFloatTweenf: function(f) {
		return function(d,i,a) {
			return Floats.interpolatef(a,f(d,i));
		};
	}
	,_that: function() {
		return this.transition;
	}
	,__class__: thx.js.AccessTween
}
thx.js.AccessTweenText = $hxClasses["thx.js.AccessTweenText"] = function(transition,tweens) {
	thx.js.AccessTween.call(this,transition,tweens);
}
thx.js.AccessTweenText.__name__ = ["thx","js","AccessTweenText"];
thx.js.AccessTweenText.__super__ = thx.js.AccessTween;
thx.js.AccessTweenText.prototype = $extend(thx.js.AccessTween.prototype,{
	stringNodef: function(f) {
		return this.stringTweenNodef(this.transitionStringTweenf(f));
	}
	,string: function(value) {
		return this.stringTweenNodef(this.transitionStringTween(value));
	}
	,stringTweenNodef: function(tween) {
		var handler = function(d,i) {
			var f = tween(d,i,d.textContent);
			return function(t) {
				d.textContent = f(t);
			};
		};
		this.tweens.set("text",handler);
		return this.transition;
	}
	,charsNodef: function(f) {
		return this.stringTweenNodef(this.transitionCharsTweenf(f));
	}
	,chars: function(value) {
		return this.stringTweenNodef(this.transitionCharsTween(value));
	}
	,__class__: thx.js.AccessTweenText
});
thx.js.AccessDataTweenText = $hxClasses["thx.js.AccessDataTweenText"] = function(transition,tweens) {
	thx.js.AccessTweenText.call(this,transition,tweens);
}
thx.js.AccessDataTweenText.__name__ = ["thx","js","AccessDataTweenText"];
thx.js.AccessDataTweenText.__super__ = thx.js.AccessTweenText;
thx.js.AccessDataTweenText.prototype = $extend(thx.js.AccessTweenText.prototype,{
	stringf: function(f) {
		return this.stringTweenNodef(this.transitionStringTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}));
	}
	,charsf: function(f) {
		return this.stringTweenNodef(this.transitionCharsTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}));
	}
	,stringTweenf: function(tween) {
		var handler = function(n,i) {
			var f = tween(Reflect.field(n,"__data__"),i,d.textContent);
			return function(t) {
				d.textContent = f(t);
			};
		};
		this.tweens.set("text",handler);
		return this.transition;
	}
	,__class__: thx.js.AccessDataTweenText
});
d3.Calendar = $hxClasses["d3.Calendar"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Calendar.__name__ = ["d3","Calendar"];
d3.Calendar.dates = function(year,_) {
	var dates = [], date = new Date(year,0,1,0,0,0), week = 0, day;
	do {
		dates.push({ day : day = date.getDay(), week : week, month : date.getMonth(), date : thx.culture.FormatDate.date(date)});
		date = DateTools.delta(date,DateTools.days(1));
		if(day == 6) week++;
	} while(date.getFullYear() == year);
	return dates;
}
d3.Calendar.months = function(year,_) {
	var months = [], date = new Date(year,0,1,0,0,0), month, firstDay, firstWeek, day, week = 0;
	do {
		firstDay = date.getDay();
		firstWeek = week;
		month = date.getMonth();
		do {
			day = date.getDay();
			if(day == 6) week++;
			date = DateTools.delta(date,DateTools.days(1));
		} while(date.getMonth() == month);
		months.push({ firstDay : firstDay, firstWeek : firstWeek, lastDay : day, lastWeek : day == 6?week - 1:week});
	} while(date.getFullYear() == year);
	return months;
}
d3.Calendar.__super__ = d3.Example;
d3.Calendar.prototype = $extend(d3.Example.prototype,{
	startYear: null
	,endYear: null
	,csvPath: null
	,runExample: function() {
		this.addCss();
		var w = this.stageWidth(), pw = 14, z = ~~((w - pw * 2) / 53), ph = Std["int"](z) >> 1, h = z * 7;
		var vis = this.container.selectAll("svg").data(Ints.range(this.startYear,this.endYear + 1)).enter().append("svg:svg").attr("width")["float"](w).attr("height")["float"](h + ph * 2).attr("class").string("RdGy").append("svg:g").attr("transform").string("translate(" + pw + "," + ph + ")");
		vis.append("svg:text").attr("transform").string("translate(-6," + h / 2 + ")rotate(-90)").attr("text-anchor").string("middle").text().data();
		var day = vis.selectAll("rect.day").dataf(d3.Calendar.dates).enter().append("svg:rect").attr("x").floatf(function(d,i) {
			return d.week * z;
		}).attr("y").floatf(function(d,i) {
			return d.day * z;
		}).attr("class").string("day").attr("fill").string("#fff").attr("width")["float"](z).attr("height")["float"](z);
		vis.selectAll("path.month").dataf(d3.Calendar.months).enter().append("svg:path").attr("class").string("month").attr("d").stringf(function(d,_) {
			return "M" + (d.firstWeek + 1) * z + "," + d.firstDay * z + "H" + d.firstWeek * z + "V" + 7 * z + "H" + d.lastWeek * z + "V" + (d.lastDay + 1) * z + "H" + (d.lastWeek + 1) * z + "V" + 0 + "H" + (d.firstWeek + 1) * z + "Z";
		});
		var http = new haxe.Http(this.csvPath);
		http.async = true;
		http.onData = function(d) {
			var csv = thx.csv.Csv.decode(d);
			var color = new thx.math.scale.Quantize().domain(-.05,.05).range(Floats.range(9));
			var data = new Hash();
			csv.forEach(function(d1,i) {
				if(i == 0) return;
				var key = thx.culture.FormatDate.date(d1[0]);
				var value = (d1[4] - d1[1]) / d1[1];
				data.set(key,value);
			});
			day.attr("class").stringf(function(d1,i) {
				return "day q" + color.scale(data.get(d1.date)) + "-9";
			}).append("svg:title").text().stringf(function(d1,i) {
				return d1.date + ": " + thx.culture.FormatNumber.percent(data.get(d1.date));
			});
		};
		http.request(false);
	}
	,addCss: function() {
		this.container.append("style").attr("type").string("text/css").text().string("\n.day {\n  fill: none;\n  stroke: #ccc;\n  shape-rendering: crispEdges;\n}\n\n.month {\n  fill: none;\n  stroke: #000;\n  stroke-width: 2px;\n  shape-rendering: crispEdges;\n}\n\n/*\n * This product includes color specifications and designs developed by Cynthia\n * Brewer (http://colorbrewer.org/).\n */\n.YlGn .q0-3{fill:rgb(247,252,185)}\n.YlGn .q1-3{fill:rgb(173,221,142)}\n.YlGn .q2-3{fill:rgb(49,163,84)}\n.YlGn .q0-4{fill:rgb(255,255,204)}\n.YlGn .q1-4{fill:rgb(194,230,153)}\n.YlGn .q2-4{fill:rgb(120,198,121)}\n.YlGn .q3-4{fill:rgb(35,132,67)}\n.YlGn .q0-5{fill:rgb(255,255,204)}\n.YlGn .q1-5{fill:rgb(194,230,153)}\n.YlGn .q2-5{fill:rgb(120,198,121)}\n.YlGn .q3-5{fill:rgb(49,163,84)}\n.YlGn .q4-5{fill:rgb(0,104,55)}\n.YlGn .q0-6{fill:rgb(255,255,204)}\n.YlGn .q1-6{fill:rgb(217,240,163)}\n.YlGn .q2-6{fill:rgb(173,221,142)}\n.YlGn .q3-6{fill:rgb(120,198,121)}\n.YlGn .q4-6{fill:rgb(49,163,84)}\n.YlGn .q5-6{fill:rgb(0,104,55)}\n.YlGn .q0-7{fill:rgb(255,255,204)}\n.YlGn .q1-7{fill:rgb(217,240,163)}\n.YlGn .q2-7{fill:rgb(173,221,142)}\n.YlGn .q3-7{fill:rgb(120,198,121)}\n.YlGn .q4-7{fill:rgb(65,171,93)}\n.YlGn .q5-7{fill:rgb(35,132,67)}\n.YlGn .q6-7{fill:rgb(0,90,50)}\n.YlGn .q0-8{fill:rgb(255,255,229)}\n.YlGn .q1-8{fill:rgb(247,252,185)}\n.YlGn .q2-8{fill:rgb(217,240,163)}\n.YlGn .q3-8{fill:rgb(173,221,142)}\n.YlGn .q4-8{fill:rgb(120,198,121)}\n.YlGn .q5-8{fill:rgb(65,171,93)}\n.YlGn .q6-8{fill:rgb(35,132,67)}\n.YlGn .q7-8{fill:rgb(0,90,50)}\n.YlGn .q0-9{fill:rgb(255,255,229)}\n.YlGn .q1-9{fill:rgb(247,252,185)}\n.YlGn .q2-9{fill:rgb(217,240,163)}\n.YlGn .q3-9{fill:rgb(173,221,142)}\n.YlGn .q4-9{fill:rgb(120,198,121)}\n.YlGn .q5-9{fill:rgb(65,171,93)}\n.YlGn .q6-9{fill:rgb(35,132,67)}\n.YlGn .q7-9{fill:rgb(0,104,55)}\n.YlGn .q8-9{fill:rgb(0,69,41)}\n.YlGnBu .q0-3{fill:rgb(237,248,177)}\n.YlGnBu .q1-3{fill:rgb(127,205,187)}\n.YlGnBu .q2-3{fill:rgb(44,127,184)}\n.YlGnBu .q0-4{fill:rgb(255,255,204)}\n.YlGnBu .q1-4{fill:rgb(161,218,180)}\n.YlGnBu .q2-4{fill:rgb(65,182,196)}\n.YlGnBu .q3-4{fill:rgb(34,94,168)}\n.YlGnBu .q0-5{fill:rgb(255,255,204)}\n.YlGnBu .q1-5{fill:rgb(161,218,180)}\n.YlGnBu .q2-5{fill:rgb(65,182,196)}\n.YlGnBu .q3-5{fill:rgb(44,127,184)}\n.YlGnBu .q4-5{fill:rgb(37,52,148)}\n.YlGnBu .q0-6{fill:rgb(255,255,204)}\n.YlGnBu .q1-6{fill:rgb(199,233,180)}\n.YlGnBu .q2-6{fill:rgb(127,205,187)}\n.YlGnBu .q3-6{fill:rgb(65,182,196)}\n.YlGnBu .q4-6{fill:rgb(44,127,184)}\n.YlGnBu .q5-6{fill:rgb(37,52,148)}\n.YlGnBu .q0-7{fill:rgb(255,255,204)}\n.YlGnBu .q1-7{fill:rgb(199,233,180)}\n.YlGnBu .q2-7{fill:rgb(127,205,187)}\n.YlGnBu .q3-7{fill:rgb(65,182,196)}\n.YlGnBu .q4-7{fill:rgb(29,145,192)}\n.YlGnBu .q5-7{fill:rgb(34,94,168)}\n.YlGnBu .q6-7{fill:rgb(12,44,132)}\n.YlGnBu .q0-8{fill:rgb(255,255,217)}\n.YlGnBu .q1-8{fill:rgb(237,248,177)}\n.YlGnBu .q2-8{fill:rgb(199,233,180)}\n.YlGnBu .q3-8{fill:rgb(127,205,187)}\n.YlGnBu .q4-8{fill:rgb(65,182,196)}\n.YlGnBu .q5-8{fill:rgb(29,145,192)}\n.YlGnBu .q6-8{fill:rgb(34,94,168)}\n.YlGnBu .q7-8{fill:rgb(12,44,132)}\n.YlGnBu .q0-9{fill:rgb(255,255,217)}\n.YlGnBu .q1-9{fill:rgb(237,248,177)}\n.YlGnBu .q2-9{fill:rgb(199,233,180)}\n.YlGnBu .q3-9{fill:rgb(127,205,187)}\n.YlGnBu .q4-9{fill:rgb(65,182,196)}\n.YlGnBu .q5-9{fill:rgb(29,145,192)}\n.YlGnBu .q6-9{fill:rgb(34,94,168)}\n.YlGnBu .q7-9{fill:rgb(37,52,148)}\n.YlGnBu .q8-9{fill:rgb(8,29,88)}\n.GnBu .q0-3{fill:rgb(224,243,219)}\n.GnBu .q1-3{fill:rgb(168,221,181)}\n.GnBu .q2-3{fill:rgb(67,162,202)}\n.GnBu .q0-4{fill:rgb(240,249,232)}\n.GnBu .q1-4{fill:rgb(186,228,188)}\n.GnBu .q2-4{fill:rgb(123,204,196)}\n.GnBu .q3-4{fill:rgb(43,140,190)}\n.GnBu .q0-5{fill:rgb(240,249,232)}\n.GnBu .q1-5{fill:rgb(186,228,188)}\n.GnBu .q2-5{fill:rgb(123,204,196)}\n.GnBu .q3-5{fill:rgb(67,162,202)}\n.GnBu .q4-5{fill:rgb(8,104,172)}\n.GnBu .q0-6{fill:rgb(240,249,232)}\n.GnBu .q1-6{fill:rgb(204,235,197)}\n.GnBu .q2-6{fill:rgb(168,221,181)}\n.GnBu .q3-6{fill:rgb(123,204,196)}\n.GnBu .q4-6{fill:rgb(67,162,202)}\n.GnBu .q5-6{fill:rgb(8,104,172)}\n.GnBu .q0-7{fill:rgb(240,249,232)}\n.GnBu .q1-7{fill:rgb(204,235,197)}\n.GnBu .q2-7{fill:rgb(168,221,181)}\n.GnBu .q3-7{fill:rgb(123,204,196)}\n.GnBu .q4-7{fill:rgb(78,179,211)}\n.GnBu .q5-7{fill:rgb(43,140,190)}\n.GnBu .q6-7{fill:rgb(8,88,158)}\n.GnBu .q0-8{fill:rgb(247,252,240)}\n.GnBu .q1-8{fill:rgb(224,243,219)}\n.GnBu .q2-8{fill:rgb(204,235,197)}\n.GnBu .q3-8{fill:rgb(168,221,181)}\n.GnBu .q4-8{fill:rgb(123,204,196)}\n.GnBu .q5-8{fill:rgb(78,179,211)}\n.GnBu .q6-8{fill:rgb(43,140,190)}\n.GnBu .q7-8{fill:rgb(8,88,158)}\n.GnBu .q0-9{fill:rgb(247,252,240)}\n.GnBu .q1-9{fill:rgb(224,243,219)}\n.GnBu .q2-9{fill:rgb(204,235,197)}\n.GnBu .q3-9{fill:rgb(168,221,181)}\n.GnBu .q4-9{fill:rgb(123,204,196)}\n.GnBu .q5-9{fill:rgb(78,179,211)}\n.GnBu .q6-9{fill:rgb(43,140,190)}\n.GnBu .q7-9{fill:rgb(8,104,172)}\n.GnBu .q8-9{fill:rgb(8,64,129)}\n.BuGn .q0-3{fill:rgb(229,245,249)}\n.BuGn .q1-3{fill:rgb(153,216,201)}\n.BuGn .q2-3{fill:rgb(44,162,95)}\n.BuGn .q0-4{fill:rgb(237,248,251)}\n.BuGn .q1-4{fill:rgb(178,226,226)}\n.BuGn .q2-4{fill:rgb(102,194,164)}\n.BuGn .q3-4{fill:rgb(35,139,69)}\n.BuGn .q0-5{fill:rgb(237,248,251)}\n.BuGn .q1-5{fill:rgb(178,226,226)}\n.BuGn .q2-5{fill:rgb(102,194,164)}\n.BuGn .q3-5{fill:rgb(44,162,95)}\n.BuGn .q4-5{fill:rgb(0,109,44)}\n.BuGn .q0-6{fill:rgb(237,248,251)}\n.BuGn .q1-6{fill:rgb(204,236,230)}\n.BuGn .q2-6{fill:rgb(153,216,201)}\n.BuGn .q3-6{fill:rgb(102,194,164)}\n.BuGn .q4-6{fill:rgb(44,162,95)}\n.BuGn .q5-6{fill:rgb(0,109,44)}\n.BuGn .q0-7{fill:rgb(237,248,251)}\n.BuGn .q1-7{fill:rgb(204,236,230)}\n.BuGn .q2-7{fill:rgb(153,216,201)}\n.BuGn .q3-7{fill:rgb(102,194,164)}\n.BuGn .q4-7{fill:rgb(65,174,118)}\n.BuGn .q5-7{fill:rgb(35,139,69)}\n.BuGn .q6-7{fill:rgb(0,88,36)}\n.BuGn .q0-8{fill:rgb(247,252,253)}\n.BuGn .q1-8{fill:rgb(229,245,249)}\n.BuGn .q2-8{fill:rgb(204,236,230)}\n.BuGn .q3-8{fill:rgb(153,216,201)}\n.BuGn .q4-8{fill:rgb(102,194,164)}\n.BuGn .q5-8{fill:rgb(65,174,118)}\n.BuGn .q6-8{fill:rgb(35,139,69)}\n.BuGn .q7-8{fill:rgb(0,88,36)}\n.BuGn .q0-9{fill:rgb(247,252,253)}\n.BuGn .q1-9{fill:rgb(229,245,249)}\n.BuGn .q2-9{fill:rgb(204,236,230)}\n.BuGn .q3-9{fill:rgb(153,216,201)}\n.BuGn .q4-9{fill:rgb(102,194,164)}\n.BuGn .q5-9{fill:rgb(65,174,118)}\n.BuGn .q6-9{fill:rgb(35,139,69)}\n.BuGn .q7-9{fill:rgb(0,109,44)}\n.BuGn .q8-9{fill:rgb(0,68,27)}\n.PuBuGn .q0-3{fill:rgb(236,226,240)}\n.PuBuGn .q1-3{fill:rgb(166,189,219)}\n.PuBuGn .q2-3{fill:rgb(28,144,153)}\n.PuBuGn .q0-4{fill:rgb(246,239,247)}\n.PuBuGn .q1-4{fill:rgb(189,201,225)}\n.PuBuGn .q2-4{fill:rgb(103,169,207)}\n.PuBuGn .q3-4{fill:rgb(2,129,138)}\n.PuBuGn .q0-5{fill:rgb(246,239,247)}\n.PuBuGn .q1-5{fill:rgb(189,201,225)}\n.PuBuGn .q2-5{fill:rgb(103,169,207)}\n.PuBuGn .q3-5{fill:rgb(28,144,153)}\n.PuBuGn .q4-5{fill:rgb(1,108,89)}\n.PuBuGn .q0-6{fill:rgb(246,239,247)}\n.PuBuGn .q1-6{fill:rgb(208,209,230)}\n.PuBuGn .q2-6{fill:rgb(166,189,219)}\n.PuBuGn .q3-6{fill:rgb(103,169,207)}\n.PuBuGn .q4-6{fill:rgb(28,144,153)}\n.PuBuGn .q5-6{fill:rgb(1,108,89)}\n.PuBuGn .q0-7{fill:rgb(246,239,247)}\n.PuBuGn .q1-7{fill:rgb(208,209,230)}\n.PuBuGn .q2-7{fill:rgb(166,189,219)}\n.PuBuGn .q3-7{fill:rgb(103,169,207)}\n.PuBuGn .q4-7{fill:rgb(54,144,192)}\n.PuBuGn .q5-7{fill:rgb(2,129,138)}\n.PuBuGn .q6-7{fill:rgb(1,100,80)}\n.PuBuGn .q0-8{fill:rgb(255,247,251)}\n.PuBuGn .q1-8{fill:rgb(236,226,240)}\n.PuBuGn .q2-8{fill:rgb(208,209,230)}\n.PuBuGn .q3-8{fill:rgb(166,189,219)}\n.PuBuGn .q4-8{fill:rgb(103,169,207)}\n.PuBuGn .q5-8{fill:rgb(54,144,192)}\n.PuBuGn .q6-8{fill:rgb(2,129,138)}\n.PuBuGn .q7-8{fill:rgb(1,100,80)}\n.PuBuGn .q0-9{fill:rgb(255,247,251)}\n.PuBuGn .q1-9{fill:rgb(236,226,240)}\n.PuBuGn .q2-9{fill:rgb(208,209,230)}\n.PuBuGn .q3-9{fill:rgb(166,189,219)}\n.PuBuGn .q4-9{fill:rgb(103,169,207)}\n.PuBuGn .q5-9{fill:rgb(54,144,192)}\n.PuBuGn .q6-9{fill:rgb(2,129,138)}\n.PuBuGn .q7-9{fill:rgb(1,108,89)}\n.PuBuGn .q8-9{fill:rgb(1,70,54)}\n.PuBu .q0-3{fill:rgb(236,231,242)}\n.PuBu .q1-3{fill:rgb(166,189,219)}\n.PuBu .q2-3{fill:rgb(43,140,190)}\n.PuBu .q0-4{fill:rgb(241,238,246)}\n.PuBu .q1-4{fill:rgb(189,201,225)}\n.PuBu .q2-4{fill:rgb(116,169,207)}\n.PuBu .q3-4{fill:rgb(5,112,176)}\n.PuBu .q0-5{fill:rgb(241,238,246)}\n.PuBu .q1-5{fill:rgb(189,201,225)}\n.PuBu .q2-5{fill:rgb(116,169,207)}\n.PuBu .q3-5{fill:rgb(43,140,190)}\n.PuBu .q4-5{fill:rgb(4,90,141)}\n.PuBu .q0-6{fill:rgb(241,238,246)}\n.PuBu .q1-6{fill:rgb(208,209,230)}\n.PuBu .q2-6{fill:rgb(166,189,219)}\n.PuBu .q3-6{fill:rgb(116,169,207)}\n.PuBu .q4-6{fill:rgb(43,140,190)}\n.PuBu .q5-6{fill:rgb(4,90,141)}\n.PuBu .q0-7{fill:rgb(241,238,246)}\n.PuBu .q1-7{fill:rgb(208,209,230)}\n.PuBu .q2-7{fill:rgb(166,189,219)}\n.PuBu .q3-7{fill:rgb(116,169,207)}\n.PuBu .q4-7{fill:rgb(54,144,192)}\n.PuBu .q5-7{fill:rgb(5,112,176)}\n.PuBu .q6-7{fill:rgb(3,78,123)}\n.PuBu .q0-8{fill:rgb(255,247,251)}\n.PuBu .q1-8{fill:rgb(236,231,242)}\n.PuBu .q2-8{fill:rgb(208,209,230)}\n.PuBu .q3-8{fill:rgb(166,189,219)}\n.PuBu .q4-8{fill:rgb(116,169,207)}\n.PuBu .q5-8{fill:rgb(54,144,192)}\n.PuBu .q6-8{fill:rgb(5,112,176)}\n.PuBu .q7-8{fill:rgb(3,78,123)}\n.PuBu .q0-9{fill:rgb(255,247,251)}\n.PuBu .q1-9{fill:rgb(236,231,242)}\n.PuBu .q2-9{fill:rgb(208,209,230)}\n.PuBu .q3-9{fill:rgb(166,189,219)}\n.PuBu .q4-9{fill:rgb(116,169,207)}\n.PuBu .q5-9{fill:rgb(54,144,192)}\n.PuBu .q6-9{fill:rgb(5,112,176)}\n.PuBu .q7-9{fill:rgb(4,90,141)}\n.PuBu .q8-9{fill:rgb(2,56,88)}\n.BuPu .q0-3{fill:rgb(224,236,244)}\n.BuPu .q1-3{fill:rgb(158,188,218)}\n.BuPu .q2-3{fill:rgb(136,86,167)}\n.BuPu .q0-4{fill:rgb(237,248,251)}\n.BuPu .q1-4{fill:rgb(179,205,227)}\n.BuPu .q2-4{fill:rgb(140,150,198)}\n.BuPu .q3-4{fill:rgb(136,65,157)}\n.BuPu .q0-5{fill:rgb(237,248,251)}\n.BuPu .q1-5{fill:rgb(179,205,227)}\n.BuPu .q2-5{fill:rgb(140,150,198)}\n.BuPu .q3-5{fill:rgb(136,86,167)}\n.BuPu .q4-5{fill:rgb(129,15,124)}\n.BuPu .q0-6{fill:rgb(237,248,251)}\n.BuPu .q1-6{fill:rgb(191,211,230)}\n.BuPu .q2-6{fill:rgb(158,188,218)}\n.BuPu .q3-6{fill:rgb(140,150,198)}\n.BuPu .q4-6{fill:rgb(136,86,167)}\n.BuPu .q5-6{fill:rgb(129,15,124)}\n.BuPu .q0-7{fill:rgb(237,248,251)}\n.BuPu .q1-7{fill:rgb(191,211,230)}\n.BuPu .q2-7{fill:rgb(158,188,218)}\n.BuPu .q3-7{fill:rgb(140,150,198)}\n.BuPu .q4-7{fill:rgb(140,107,177)}\n.BuPu .q5-7{fill:rgb(136,65,157)}\n.BuPu .q6-7{fill:rgb(110,1,107)}\n.BuPu .q0-8{fill:rgb(247,252,253)}\n.BuPu .q1-8{fill:rgb(224,236,244)}\n.BuPu .q2-8{fill:rgb(191,211,230)}\n.BuPu .q3-8{fill:rgb(158,188,218)}\n.BuPu .q4-8{fill:rgb(140,150,198)}\n.BuPu .q5-8{fill:rgb(140,107,177)}\n.BuPu .q6-8{fill:rgb(136,65,157)}\n.BuPu .q7-8{fill:rgb(110,1,107)}\n.BuPu .q0-9{fill:rgb(247,252,253)}\n.BuPu .q1-9{fill:rgb(224,236,244)}\n.BuPu .q2-9{fill:rgb(191,211,230)}\n.BuPu .q3-9{fill:rgb(158,188,218)}\n.BuPu .q4-9{fill:rgb(140,150,198)}\n.BuPu .q5-9{fill:rgb(140,107,177)}\n.BuPu .q6-9{fill:rgb(136,65,157)}\n.BuPu .q7-9{fill:rgb(129,15,124)}\n.BuPu .q8-9{fill:rgb(77,0,75)}\n.RdPu .q0-3{fill:rgb(253,224,221)}\n.RdPu .q1-3{fill:rgb(250,159,181)}\n.RdPu .q2-3{fill:rgb(197,27,138)}\n.RdPu .q0-4{fill:rgb(254,235,226)}\n.RdPu .q1-4{fill:rgb(251,180,185)}\n.RdPu .q2-4{fill:rgb(247,104,161)}\n.RdPu .q3-4{fill:rgb(174,1,126)}\n.RdPu .q0-5{fill:rgb(254,235,226)}\n.RdPu .q1-5{fill:rgb(251,180,185)}\n.RdPu .q2-5{fill:rgb(247,104,161)}\n.RdPu .q3-5{fill:rgb(197,27,138)}\n.RdPu .q4-5{fill:rgb(122,1,119)}\n.RdPu .q0-6{fill:rgb(254,235,226)}\n.RdPu .q1-6{fill:rgb(252,197,192)}\n.RdPu .q2-6{fill:rgb(250,159,181)}\n.RdPu .q3-6{fill:rgb(247,104,161)}\n.RdPu .q4-6{fill:rgb(197,27,138)}\n.RdPu .q5-6{fill:rgb(122,1,119)}\n.RdPu .q0-7{fill:rgb(254,235,226)}\n.RdPu .q1-7{fill:rgb(252,197,192)}\n.RdPu .q2-7{fill:rgb(250,159,181)}\n.RdPu .q3-7{fill:rgb(247,104,161)}\n.RdPu .q4-7{fill:rgb(221,52,151)}\n.RdPu .q5-7{fill:rgb(174,1,126)}\n.RdPu .q6-7{fill:rgb(122,1,119)}\n.RdPu .q0-8{fill:rgb(255,247,243)}\n.RdPu .q1-8{fill:rgb(253,224,221)}\n.RdPu .q2-8{fill:rgb(252,197,192)}\n.RdPu .q3-8{fill:rgb(250,159,181)}\n.RdPu .q4-8{fill:rgb(247,104,161)}\n.RdPu .q5-8{fill:rgb(221,52,151)}\n.RdPu .q6-8{fill:rgb(174,1,126)}\n.RdPu .q7-8{fill:rgb(122,1,119)}\n.RdPu .q0-9{fill:rgb(255,247,243)}\n.RdPu .q1-9{fill:rgb(253,224,221)}\n.RdPu .q2-9{fill:rgb(252,197,192)}\n.RdPu .q3-9{fill:rgb(250,159,181)}\n.RdPu .q4-9{fill:rgb(247,104,161)}\n.RdPu .q5-9{fill:rgb(221,52,151)}\n.RdPu .q6-9{fill:rgb(174,1,126)}\n.RdPu .q7-9{fill:rgb(122,1,119)}\n.RdPu .q8-9{fill:rgb(73,0,106)}\n.PuRd .q0-3{fill:rgb(231,225,239)}\n.PuRd .q1-3{fill:rgb(201,148,199)}\n.PuRd .q2-3{fill:rgb(221,28,119)}\n.PuRd .q0-4{fill:rgb(241,238,246)}\n.PuRd .q1-4{fill:rgb(215,181,216)}\n.PuRd .q2-4{fill:rgb(223,101,176)}\n.PuRd .q3-4{fill:rgb(206,18,86)}\n.PuRd .q0-5{fill:rgb(241,238,246)}\n.PuRd .q1-5{fill:rgb(215,181,216)}\n.PuRd .q2-5{fill:rgb(223,101,176)}\n.PuRd .q3-5{fill:rgb(221,28,119)}\n.PuRd .q4-5{fill:rgb(152,0,67)}\n.PuRd .q0-6{fill:rgb(241,238,246)}\n.PuRd .q1-6{fill:rgb(212,185,218)}\n.PuRd .q2-6{fill:rgb(201,148,199)}\n.PuRd .q3-6{fill:rgb(223,101,176)}\n.PuRd .q4-6{fill:rgb(221,28,119)}\n.PuRd .q5-6{fill:rgb(152,0,67)}\n.PuRd .q0-7{fill:rgb(241,238,246)}\n.PuRd .q1-7{fill:rgb(212,185,218)}\n.PuRd .q2-7{fill:rgb(201,148,199)}\n.PuRd .q3-7{fill:rgb(223,101,176)}\n.PuRd .q4-7{fill:rgb(231,41,138)}\n.PuRd .q5-7{fill:rgb(206,18,86)}\n.PuRd .q6-7{fill:rgb(145,0,63)}\n.PuRd .q0-8{fill:rgb(247,244,249)}\n.PuRd .q1-8{fill:rgb(231,225,239)}\n.PuRd .q2-8{fill:rgb(212,185,218)}\n.PuRd .q3-8{fill:rgb(201,148,199)}\n.PuRd .q4-8{fill:rgb(223,101,176)}\n.PuRd .q5-8{fill:rgb(231,41,138)}\n.PuRd .q6-8{fill:rgb(206,18,86)}\n.PuRd .q7-8{fill:rgb(145,0,63)}\n.PuRd .q0-9{fill:rgb(247,244,249)}\n.PuRd .q1-9{fill:rgb(231,225,239)}\n.PuRd .q2-9{fill:rgb(212,185,218)}\n.PuRd .q3-9{fill:rgb(201,148,199)}\n.PuRd .q4-9{fill:rgb(223,101,176)}\n.PuRd .q5-9{fill:rgb(231,41,138)}\n.PuRd .q6-9{fill:rgb(206,18,86)}\n.PuRd .q7-9{fill:rgb(152,0,67)}\n.PuRd .q8-9{fill:rgb(103,0,31)}\n.OrRd .q0-3{fill:rgb(254,232,200)}\n.OrRd .q1-3{fill:rgb(253,187,132)}\n.OrRd .q2-3{fill:rgb(227,74,51)}\n.OrRd .q0-4{fill:rgb(254,240,217)}\n.OrRd .q1-4{fill:rgb(253,204,138)}\n.OrRd .q2-4{fill:rgb(252,141,89)}\n.OrRd .q3-4{fill:rgb(215,48,31)}\n.OrRd .q0-5{fill:rgb(254,240,217)}\n.OrRd .q1-5{fill:rgb(253,204,138)}\n.OrRd .q2-5{fill:rgb(252,141,89)}\n.OrRd .q3-5{fill:rgb(227,74,51)}\n.OrRd .q4-5{fill:rgb(179,0,0)}\n.OrRd .q0-6{fill:rgb(254,240,217)}\n.OrRd .q1-6{fill:rgb(253,212,158)}\n.OrRd .q2-6{fill:rgb(253,187,132)}\n.OrRd .q3-6{fill:rgb(252,141,89)}\n.OrRd .q4-6{fill:rgb(227,74,51)}\n.OrRd .q5-6{fill:rgb(179,0,0)}\n.OrRd .q0-7{fill:rgb(254,240,217)}\n.OrRd .q1-7{fill:rgb(253,212,158)}\n.OrRd .q2-7{fill:rgb(253,187,132)}\n.OrRd .q3-7{fill:rgb(252,141,89)}\n.OrRd .q4-7{fill:rgb(239,101,72)}\n.OrRd .q5-7{fill:rgb(215,48,31)}\n.OrRd .q6-7{fill:rgb(153,0,0)}\n.OrRd .q0-8{fill:rgb(255,247,236)}\n.OrRd .q1-8{fill:rgb(254,232,200)}\n.OrRd .q2-8{fill:rgb(253,212,158)}\n.OrRd .q3-8{fill:rgb(253,187,132)}\n.OrRd .q4-8{fill:rgb(252,141,89)}\n.OrRd .q5-8{fill:rgb(239,101,72)}\n.OrRd .q6-8{fill:rgb(215,48,31)}\n.OrRd .q7-8{fill:rgb(153,0,0)}\n.OrRd .q0-9{fill:rgb(255,247,236)}\n.OrRd .q1-9{fill:rgb(254,232,200)}\n.OrRd .q2-9{fill:rgb(253,212,158)}\n.OrRd .q3-9{fill:rgb(253,187,132)}\n.OrRd .q4-9{fill:rgb(252,141,89)}\n.OrRd .q5-9{fill:rgb(239,101,72)}\n.OrRd .q6-9{fill:rgb(215,48,31)}\n.OrRd .q7-9{fill:rgb(179,0,0)}\n.OrRd .q8-9{fill:rgb(127,0,0)}\n.YlOrRd .q0-3{fill:rgb(255,237,160)}\n.YlOrRd .q1-3{fill:rgb(254,178,76)}\n.YlOrRd .q2-3{fill:rgb(240,59,32)}\n.YlOrRd .q0-4{fill:rgb(255,255,178)}\n.YlOrRd .q1-4{fill:rgb(254,204,92)}\n.YlOrRd .q2-4{fill:rgb(253,141,60)}\n.YlOrRd .q3-4{fill:rgb(227,26,28)}\n.YlOrRd .q0-5{fill:rgb(255,255,178)}\n.YlOrRd .q1-5{fill:rgb(254,204,92)}\n.YlOrRd .q2-5{fill:rgb(253,141,60)}\n.YlOrRd .q3-5{fill:rgb(240,59,32)}\n.YlOrRd .q4-5{fill:rgb(189,0,38)}\n.YlOrRd .q0-6{fill:rgb(255,255,178)}\n.YlOrRd .q1-6{fill:rgb(254,217,118)}\n.YlOrRd .q2-6{fill:rgb(254,178,76)}\n.YlOrRd .q3-6{fill:rgb(253,141,60)}\n.YlOrRd .q4-6{fill:rgb(240,59,32)}\n.YlOrRd .q5-6{fill:rgb(189,0,38)}\n.YlOrRd .q0-7{fill:rgb(255,255,178)}\n.YlOrRd .q1-7{fill:rgb(254,217,118)}\n.YlOrRd .q2-7{fill:rgb(254,178,76)}\n.YlOrRd .q3-7{fill:rgb(253,141,60)}\n.YlOrRd .q4-7{fill:rgb(252,78,42)}\n.YlOrRd .q5-7{fill:rgb(227,26,28)}\n.YlOrRd .q6-7{fill:rgb(177,0,38)}\n.YlOrRd .q0-8{fill:rgb(255,255,204)}\n.YlOrRd .q1-8{fill:rgb(255,237,160)}\n.YlOrRd .q2-8{fill:rgb(254,217,118)}\n.YlOrRd .q3-8{fill:rgb(254,178,76)}\n.YlOrRd .q4-8{fill:rgb(253,141,60)}\n.YlOrRd .q5-8{fill:rgb(252,78,42)}\n.YlOrRd .q6-8{fill:rgb(227,26,28)}\n.YlOrRd .q7-8{fill:rgb(177,0,38)}\n.YlOrRd .q0-9{fill:rgb(255,255,204)}\n.YlOrRd .q1-9{fill:rgb(255,237,160)}\n.YlOrRd .q2-9{fill:rgb(254,217,118)}\n.YlOrRd .q3-9{fill:rgb(254,178,76)}\n.YlOrRd .q4-9{fill:rgb(253,141,60)}\n.YlOrRd .q5-9{fill:rgb(252,78,42)}\n.YlOrRd .q6-9{fill:rgb(227,26,28)}\n.YlOrRd .q7-9{fill:rgb(189,0,38)}\n.YlOrRd .q8-9{fill:rgb(128,0,38)}\n.YlOrBr .q0-3{fill:rgb(255,247,188)}\n.YlOrBr .q1-3{fill:rgb(254,196,79)}\n.YlOrBr .q2-3{fill:rgb(217,95,14)}\n.YlOrBr .q0-4{fill:rgb(255,255,212)}\n.YlOrBr .q1-4{fill:rgb(254,217,142)}\n.YlOrBr .q2-4{fill:rgb(254,153,41)}\n.YlOrBr .q3-4{fill:rgb(204,76,2)}\n.YlOrBr .q0-5{fill:rgb(255,255,212)}\n.YlOrBr .q1-5{fill:rgb(254,217,142)}\n.YlOrBr .q2-5{fill:rgb(254,153,41)}\n.YlOrBr .q3-5{fill:rgb(217,95,14)}\n.YlOrBr .q4-5{fill:rgb(153,52,4)}\n.YlOrBr .q0-6{fill:rgb(255,255,212)}\n.YlOrBr .q1-6{fill:rgb(254,227,145)}\n.YlOrBr .q2-6{fill:rgb(254,196,79)}\n.YlOrBr .q3-6{fill:rgb(254,153,41)}\n.YlOrBr .q4-6{fill:rgb(217,95,14)}\n.YlOrBr .q5-6{fill:rgb(153,52,4)}\n.YlOrBr .q0-7{fill:rgb(255,255,212)}\n.YlOrBr .q1-7{fill:rgb(254,227,145)}\n.YlOrBr .q2-7{fill:rgb(254,196,79)}\n.YlOrBr .q3-7{fill:rgb(254,153,41)}\n.YlOrBr .q4-7{fill:rgb(236,112,20)}\n.YlOrBr .q5-7{fill:rgb(204,76,2)}\n.YlOrBr .q6-7{fill:rgb(140,45,4)}\n.YlOrBr .q0-8{fill:rgb(255,255,229)}\n.YlOrBr .q1-8{fill:rgb(255,247,188)}\n.YlOrBr .q2-8{fill:rgb(254,227,145)}\n.YlOrBr .q3-8{fill:rgb(254,196,79)}\n.YlOrBr .q4-8{fill:rgb(254,153,41)}\n.YlOrBr .q5-8{fill:rgb(236,112,20)}\n.YlOrBr .q6-8{fill:rgb(204,76,2)}\n.YlOrBr .q7-8{fill:rgb(140,45,4)}\n.YlOrBr .q0-9{fill:rgb(255,255,229)}\n.YlOrBr .q1-9{fill:rgb(255,247,188)}\n.YlOrBr .q2-9{fill:rgb(254,227,145)}\n.YlOrBr .q3-9{fill:rgb(254,196,79)}\n.YlOrBr .q4-9{fill:rgb(254,153,41)}\n.YlOrBr .q5-9{fill:rgb(236,112,20)}\n.YlOrBr .q6-9{fill:rgb(204,76,2)}\n.YlOrBr .q7-9{fill:rgb(153,52,4)}\n.YlOrBr .q8-9{fill:rgb(102,37,6)}\n.Purples .q0-3{fill:rgb(239,237,245)}\n.Purples .q1-3{fill:rgb(188,189,220)}\n.Purples .q2-3{fill:rgb(117,107,177)}\n.Purples .q0-4{fill:rgb(242,240,247)}\n.Purples .q1-4{fill:rgb(203,201,226)}\n.Purples .q2-4{fill:rgb(158,154,200)}\n.Purples .q3-4{fill:rgb(106,81,163)}\n.Purples .q0-5{fill:rgb(242,240,247)}\n.Purples .q1-5{fill:rgb(203,201,226)}\n.Purples .q2-5{fill:rgb(158,154,200)}\n.Purples .q3-5{fill:rgb(117,107,177)}\n.Purples .q4-5{fill:rgb(84,39,143)}\n.Purples .q0-6{fill:rgb(242,240,247)}\n.Purples .q1-6{fill:rgb(218,218,235)}\n.Purples .q2-6{fill:rgb(188,189,220)}\n.Purples .q3-6{fill:rgb(158,154,200)}\n.Purples .q4-6{fill:rgb(117,107,177)}\n.Purples .q5-6{fill:rgb(84,39,143)}\n.Purples .q0-7{fill:rgb(242,240,247)}\n.Purples .q1-7{fill:rgb(218,218,235)}\n.Purples .q2-7{fill:rgb(188,189,220)}\n.Purples .q3-7{fill:rgb(158,154,200)}\n.Purples .q4-7{fill:rgb(128,125,186)}\n.Purples .q5-7{fill:rgb(106,81,163)}\n.Purples .q6-7{fill:rgb(74,20,134)}\n.Purples .q0-8{fill:rgb(252,251,253)}\n.Purples .q1-8{fill:rgb(239,237,245)}\n.Purples .q2-8{fill:rgb(218,218,235)}\n.Purples .q3-8{fill:rgb(188,189,220)}\n.Purples .q4-8{fill:rgb(158,154,200)}\n.Purples .q5-8{fill:rgb(128,125,186)}\n.Purples .q6-8{fill:rgb(106,81,163)}\n.Purples .q7-8{fill:rgb(74,20,134)}\n.Purples .q0-9{fill:rgb(252,251,253)}\n.Purples .q1-9{fill:rgb(239,237,245)}\n.Purples .q2-9{fill:rgb(218,218,235)}\n.Purples .q3-9{fill:rgb(188,189,220)}\n.Purples .q4-9{fill:rgb(158,154,200)}\n.Purples .q5-9{fill:rgb(128,125,186)}\n.Purples .q6-9{fill:rgb(106,81,163)}\n.Purples .q7-9{fill:rgb(84,39,143)}\n.Purples .q8-9{fill:rgb(63,0,125)}\n.Blues .q0-3{fill:rgb(222,235,247)}\n.Blues .q1-3{fill:rgb(158,202,225)}\n.Blues .q2-3{fill:rgb(49,130,189)}\n.Blues .q0-4{fill:rgb(239,243,255)}\n.Blues .q1-4{fill:rgb(189,215,231)}\n.Blues .q2-4{fill:rgb(107,174,214)}\n.Blues .q3-4{fill:rgb(33,113,181)}\n.Blues .q0-5{fill:rgb(239,243,255)}\n.Blues .q1-5{fill:rgb(189,215,231)}\n.Blues .q2-5{fill:rgb(107,174,214)}\n.Blues .q3-5{fill:rgb(49,130,189)}\n.Blues .q4-5{fill:rgb(8,81,156)}\n.Blues .q0-6{fill:rgb(239,243,255)}\n.Blues .q1-6{fill:rgb(198,219,239)}\n.Blues .q2-6{fill:rgb(158,202,225)}\n.Blues .q3-6{fill:rgb(107,174,214)}\n.Blues .q4-6{fill:rgb(49,130,189)}\n.Blues .q5-6{fill:rgb(8,81,156)}\n.Blues .q0-7{fill:rgb(239,243,255)}\n.Blues .q1-7{fill:rgb(198,219,239)}\n.Blues .q2-7{fill:rgb(158,202,225)}\n.Blues .q3-7{fill:rgb(107,174,214)}\n.Blues .q4-7{fill:rgb(66,146,198)}\n.Blues .q5-7{fill:rgb(33,113,181)}\n.Blues .q6-7{fill:rgb(8,69,148)}\n.Blues .q0-8{fill:rgb(247,251,255)}\n.Blues .q1-8{fill:rgb(222,235,247)}\n.Blues .q2-8{fill:rgb(198,219,239)}\n.Blues .q3-8{fill:rgb(158,202,225)}\n.Blues .q4-8{fill:rgb(107,174,214)}\n.Blues .q5-8{fill:rgb(66,146,198)}\n.Blues .q6-8{fill:rgb(33,113,181)}\n.Blues .q7-8{fill:rgb(8,69,148)}\n.Blues .q0-9{fill:rgb(247,251,255)}\n.Blues .q1-9{fill:rgb(222,235,247)}\n.Blues .q2-9{fill:rgb(198,219,239)}\n.Blues .q3-9{fill:rgb(158,202,225)}\n.Blues .q4-9{fill:rgb(107,174,214)}\n.Blues .q5-9{fill:rgb(66,146,198)}\n.Blues .q6-9{fill:rgb(33,113,181)}\n.Blues .q7-9{fill:rgb(8,81,156)}\n.Blues .q8-9{fill:rgb(8,48,107)}\n.Greens .q0-3{fill:rgb(229,245,224)}\n.Greens .q1-3{fill:rgb(161,217,155)}\n.Greens .q2-3{fill:rgb(49,163,84)}\n.Greens .q0-4{fill:rgb(237,248,233)}\n.Greens .q1-4{fill:rgb(186,228,179)}\n.Greens .q2-4{fill:rgb(116,196,118)}\n.Greens .q3-4{fill:rgb(35,139,69)}\n.Greens .q0-5{fill:rgb(237,248,233)}\n.Greens .q1-5{fill:rgb(186,228,179)}\n.Greens .q2-5{fill:rgb(116,196,118)}\n.Greens .q3-5{fill:rgb(49,163,84)}\n.Greens .q4-5{fill:rgb(0,109,44)}\n.Greens .q0-6{fill:rgb(237,248,233)}\n.Greens .q1-6{fill:rgb(199,233,192)}\n.Greens .q2-6{fill:rgb(161,217,155)}\n.Greens .q3-6{fill:rgb(116,196,118)}\n.Greens .q4-6{fill:rgb(49,163,84)}\n.Greens .q5-6{fill:rgb(0,109,44)}\n.Greens .q0-7{fill:rgb(237,248,233)}\n.Greens .q1-7{fill:rgb(199,233,192)}\n.Greens .q2-7{fill:rgb(161,217,155)}\n.Greens .q3-7{fill:rgb(116,196,118)}\n.Greens .q4-7{fill:rgb(65,171,93)}\n.Greens .q5-7{fill:rgb(35,139,69)}\n.Greens .q6-7{fill:rgb(0,90,50)}\n.Greens .q0-8{fill:rgb(247,252,245)}\n.Greens .q1-8{fill:rgb(229,245,224)}\n.Greens .q2-8{fill:rgb(199,233,192)}\n.Greens .q3-8{fill:rgb(161,217,155)}\n.Greens .q4-8{fill:rgb(116,196,118)}\n.Greens .q5-8{fill:rgb(65,171,93)}\n.Greens .q6-8{fill:rgb(35,139,69)}\n.Greens .q7-8{fill:rgb(0,90,50)}\n.Greens .q0-9{fill:rgb(247,252,245)}\n.Greens .q1-9{fill:rgb(229,245,224)}\n.Greens .q2-9{fill:rgb(199,233,192)}\n.Greens .q3-9{fill:rgb(161,217,155)}\n.Greens .q4-9{fill:rgb(116,196,118)}\n.Greens .q5-9{fill:rgb(65,171,93)}\n.Greens .q6-9{fill:rgb(35,139,69)}\n.Greens .q7-9{fill:rgb(0,109,44)}\n.Greens .q8-9{fill:rgb(0,68,27)}\n.Oranges .q0-3{fill:rgb(254,230,206)}\n.Oranges .q1-3{fill:rgb(253,174,107)}\n.Oranges .q2-3{fill:rgb(230,85,13)}\n.Oranges .q0-4{fill:rgb(254,237,222)}\n.Oranges .q1-4{fill:rgb(253,190,133)}\n.Oranges .q2-4{fill:rgb(253,141,60)}\n.Oranges .q3-4{fill:rgb(217,71,1)}\n.Oranges .q0-5{fill:rgb(254,237,222)}\n.Oranges .q1-5{fill:rgb(253,190,133)}\n.Oranges .q2-5{fill:rgb(253,141,60)}\n.Oranges .q3-5{fill:rgb(230,85,13)}\n.Oranges .q4-5{fill:rgb(166,54,3)}\n.Oranges .q0-6{fill:rgb(254,237,222)}\n.Oranges .q1-6{fill:rgb(253,208,162)}\n.Oranges .q2-6{fill:rgb(253,174,107)}\n.Oranges .q3-6{fill:rgb(253,141,60)}\n.Oranges .q4-6{fill:rgb(230,85,13)}\n.Oranges .q5-6{fill:rgb(166,54,3)}\n.Oranges .q0-7{fill:rgb(254,237,222)}\n.Oranges .q1-7{fill:rgb(253,208,162)}\n.Oranges .q2-7{fill:rgb(253,174,107)}\n.Oranges .q3-7{fill:rgb(253,141,60)}\n.Oranges .q4-7{fill:rgb(241,105,19)}\n.Oranges .q5-7{fill:rgb(217,72,1)}\n.Oranges .q6-7{fill:rgb(140,45,4)}\n.Oranges .q0-8{fill:rgb(255,245,235)}\n.Oranges .q1-8{fill:rgb(254,230,206)}\n.Oranges .q2-8{fill:rgb(253,208,162)}\n.Oranges .q3-8{fill:rgb(253,174,107)}\n.Oranges .q4-8{fill:rgb(253,141,60)}\n.Oranges .q5-8{fill:rgb(241,105,19)}\n.Oranges .q6-8{fill:rgb(217,72,1)}\n.Oranges .q7-8{fill:rgb(140,45,4)}\n.Oranges .q0-9{fill:rgb(255,245,235)}\n.Oranges .q1-9{fill:rgb(254,230,206)}\n.Oranges .q2-9{fill:rgb(253,208,162)}\n.Oranges .q3-9{fill:rgb(253,174,107)}\n.Oranges .q4-9{fill:rgb(253,141,60)}\n.Oranges .q5-9{fill:rgb(241,105,19)}\n.Oranges .q6-9{fill:rgb(217,72,1)}\n.Oranges .q7-9{fill:rgb(166,54,3)}\n.Oranges .q8-9{fill:rgb(127,39,4)}\n.Reds .q0-3{fill:rgb(254,224,210)}\n.Reds .q1-3{fill:rgb(252,146,114)}\n.Reds .q2-3{fill:rgb(222,45,38)}\n.Reds .q0-4{fill:rgb(254,229,217)}\n.Reds .q1-4{fill:rgb(252,174,145)}\n.Reds .q2-4{fill:rgb(251,106,74)}\n.Reds .q3-4{fill:rgb(203,24,29)}\n.Reds .q0-5{fill:rgb(254,229,217)}\n.Reds .q1-5{fill:rgb(252,174,145)}\n.Reds .q2-5{fill:rgb(251,106,74)}\n.Reds .q3-5{fill:rgb(222,45,38)}\n.Reds .q4-5{fill:rgb(165,15,21)}\n.Reds .q0-6{fill:rgb(254,229,217)}\n.Reds .q1-6{fill:rgb(252,187,161)}\n.Reds .q2-6{fill:rgb(252,146,114)}\n.Reds .q3-6{fill:rgb(251,106,74)}\n.Reds .q4-6{fill:rgb(222,45,38)}\n.Reds .q5-6{fill:rgb(165,15,21)}\n.Reds .q0-7{fill:rgb(254,229,217)}\n.Reds .q1-7{fill:rgb(252,187,161)}\n.Reds .q2-7{fill:rgb(252,146,114)}\n.Reds .q3-7{fill:rgb(251,106,74)}\n.Reds .q4-7{fill:rgb(239,59,44)}\n.Reds .q5-7{fill:rgb(203,24,29)}\n.Reds .q6-7{fill:rgb(153,0,13)}\n.Reds .q0-8{fill:rgb(255,245,240)}\n.Reds .q1-8{fill:rgb(254,224,210)}\n.Reds .q2-8{fill:rgb(252,187,161)}\n.Reds .q3-8{fill:rgb(252,146,114)}\n.Reds .q4-8{fill:rgb(251,106,74)}\n.Reds .q5-8{fill:rgb(239,59,44)}\n.Reds .q6-8{fill:rgb(203,24,29)}\n.Reds .q7-8{fill:rgb(153,0,13)}\n.Reds .q0-9{fill:rgb(255,245,240)}\n.Reds .q1-9{fill:rgb(254,224,210)}\n.Reds .q2-9{fill:rgb(252,187,161)}\n.Reds .q3-9{fill:rgb(252,146,114)}\n.Reds .q4-9{fill:rgb(251,106,74)}\n.Reds .q5-9{fill:rgb(239,59,44)}\n.Reds .q6-9{fill:rgb(203,24,29)}\n.Reds .q7-9{fill:rgb(165,15,21)}\n.Reds .q8-9{fill:rgb(103,0,13)}\n.Greys .q0-3{fill:rgb(240,240,240)}\n.Greys .q1-3{fill:rgb(189,189,189)}\n.Greys .q2-3{fill:rgb(99,99,99)}\n.Greys .q0-4{fill:rgb(247,247,247)}\n.Greys .q1-4{fill:rgb(204,204,204)}\n.Greys .q2-4{fill:rgb(150,150,150)}\n.Greys .q3-4{fill:rgb(82,82,82)}\n.Greys .q0-5{fill:rgb(247,247,247)}\n.Greys .q1-5{fill:rgb(204,204,204)}\n.Greys .q2-5{fill:rgb(150,150,150)}\n.Greys .q3-5{fill:rgb(99,99,99)}\n.Greys .q4-5{fill:rgb(37,37,37)}\n.Greys .q0-6{fill:rgb(247,247,247)}\n.Greys .q1-6{fill:rgb(217,217,217)}\n.Greys .q2-6{fill:rgb(189,189,189)}\n.Greys .q3-6{fill:rgb(150,150,150)}\n.Greys .q4-6{fill:rgb(99,99,99)}\n.Greys .q5-6{fill:rgb(37,37,37)}\n.Greys .q0-7{fill:rgb(247,247,247)}\n.Greys .q1-7{fill:rgb(217,217,217)}\n.Greys .q2-7{fill:rgb(189,189,189)}\n.Greys .q3-7{fill:rgb(150,150,150)}\n.Greys .q4-7{fill:rgb(115,115,115)}\n.Greys .q5-7{fill:rgb(82,82,82)}\n.Greys .q6-7{fill:rgb(37,37,37)}\n.Greys .q0-8{fill:rgb(255,255,255)}\n.Greys .q1-8{fill:rgb(240,240,240)}\n.Greys .q2-8{fill:rgb(217,217,217)}\n.Greys .q3-8{fill:rgb(189,189,189)}\n.Greys .q4-8{fill:rgb(150,150,150)}\n.Greys .q5-8{fill:rgb(115,115,115)}\n.Greys .q6-8{fill:rgb(82,82,82)}\n.Greys .q7-8{fill:rgb(37,37,37)}\n.Greys .q0-9{fill:rgb(255,255,255)}\n.Greys .q1-9{fill:rgb(240,240,240)}\n.Greys .q2-9{fill:rgb(217,217,217)}\n.Greys .q3-9{fill:rgb(189,189,189)}\n.Greys .q4-9{fill:rgb(150,150,150)}\n.Greys .q5-9{fill:rgb(115,115,115)}\n.Greys .q6-9{fill:rgb(82,82,82)}\n.Greys .q7-9{fill:rgb(37,37,37)}\n.Greys .q8-9{fill:rgb(0,0,0)}\n.PuOr .q0-3{fill:rgb(241,163,64)}\n.PuOr .q1-3{fill:rgb(247,247,247)}\n.PuOr .q2-3{fill:rgb(153,142,195)}\n.PuOr .q0-4{fill:rgb(230,97,1)}\n.PuOr .q1-4{fill:rgb(253,184,99)}\n.PuOr .q2-4{fill:rgb(178,171,210)}\n.PuOr .q3-4{fill:rgb(94,60,153)}\n.PuOr .q0-5{fill:rgb(230,97,1)}\n.PuOr .q1-5{fill:rgb(253,184,99)}\n.PuOr .q2-5{fill:rgb(247,247,247)}\n.PuOr .q3-5{fill:rgb(178,171,210)}\n.PuOr .q4-5{fill:rgb(94,60,153)}\n.PuOr .q0-6{fill:rgb(179,88,6)}\n.PuOr .q1-6{fill:rgb(241,163,64)}\n.PuOr .q2-6{fill:rgb(254,224,182)}\n.PuOr .q3-6{fill:rgb(216,218,235)}\n.PuOr .q4-6{fill:rgb(153,142,195)}\n.PuOr .q5-6{fill:rgb(84,39,136)}\n.PuOr .q0-7{fill:rgb(179,88,6)}\n.PuOr .q1-7{fill:rgb(241,163,64)}\n.PuOr .q2-7{fill:rgb(254,224,182)}\n.PuOr .q3-7{fill:rgb(247,247,247)}\n.PuOr .q4-7{fill:rgb(216,218,235)}\n.PuOr .q5-7{fill:rgb(153,142,195)}\n.PuOr .q6-7{fill:rgb(84,39,136)}\n.PuOr .q0-8{fill:rgb(179,88,6)}\n.PuOr .q1-8{fill:rgb(224,130,20)}\n.PuOr .q2-8{fill:rgb(253,184,99)}\n.PuOr .q3-8{fill:rgb(254,224,182)}\n.PuOr .q4-8{fill:rgb(216,218,235)}\n.PuOr .q5-8{fill:rgb(178,171,210)}\n.PuOr .q6-8{fill:rgb(128,115,172)}\n.PuOr .q7-8{fill:rgb(84,39,136)}\n.PuOr .q0-9{fill:rgb(179,88,6)}\n.PuOr .q1-9{fill:rgb(224,130,20)}\n.PuOr .q2-9{fill:rgb(253,184,99)}\n.PuOr .q3-9{fill:rgb(254,224,182)}\n.PuOr .q4-9{fill:rgb(247,247,247)}\n.PuOr .q5-9{fill:rgb(216,218,235)}\n.PuOr .q6-9{fill:rgb(178,171,210)}\n.PuOr .q7-9{fill:rgb(128,115,172)}\n.PuOr .q8-9{fill:rgb(84,39,136)}\n.PuOr .q0-10{fill:rgb(127,59,8)}\n.PuOr .q1-10{fill:rgb(179,88,6)}\n.PuOr .q2-10{fill:rgb(224,130,20)}\n.PuOr .q3-10{fill:rgb(253,184,99)}\n.PuOr .q4-10{fill:rgb(254,224,182)}\n.PuOr .q5-10{fill:rgb(216,218,235)}\n.PuOr .q6-10{fill:rgb(178,171,210)}\n.PuOr .q7-10{fill:rgb(128,115,172)}\n.PuOr .q8-10{fill:rgb(84,39,136)}\n.PuOr .q9-10{fill:rgb(45,0,75)}\n.PuOr .q0-11{fill:rgb(127,59,8)}\n.PuOr .q1-11{fill:rgb(179,88,6)}\n.PuOr .q2-11{fill:rgb(224,130,20)}\n.PuOr .q3-11{fill:rgb(253,184,99)}\n.PuOr .q4-11{fill:rgb(254,224,182)}\n.PuOr .q5-11{fill:rgb(247,247,247)}\n.PuOr .q6-11{fill:rgb(216,218,235)}\n.PuOr .q7-11{fill:rgb(178,171,210)}\n.PuOr .q8-11{fill:rgb(128,115,172)}\n.PuOr .q9-11{fill:rgb(84,39,136)}\n.PuOr .q10-11{fill:rgb(45,0,75)}\n.BrBG .q0-3{fill:rgb(216,179,101)}\n.BrBG .q1-3{fill:rgb(245,245,245)}\n.BrBG .q2-3{fill:rgb(90,180,172)}\n.BrBG .q0-4{fill:rgb(166,97,26)}\n.BrBG .q1-4{fill:rgb(223,194,125)}\n.BrBG .q2-4{fill:rgb(128,205,193)}\n.BrBG .q3-4{fill:rgb(1,133,113)}\n.BrBG .q0-5{fill:rgb(166,97,26)}\n.BrBG .q1-5{fill:rgb(223,194,125)}\n.BrBG .q2-5{fill:rgb(245,245,245)}\n.BrBG .q3-5{fill:rgb(128,205,193)}\n.BrBG .q4-5{fill:rgb(1,133,113)}\n.BrBG .q0-6{fill:rgb(140,81,10)}\n.BrBG .q1-6{fill:rgb(216,179,101)}\n.BrBG .q2-6{fill:rgb(246,232,195)}\n.BrBG .q3-6{fill:rgb(199,234,229)}\n.BrBG .q4-6{fill:rgb(90,180,172)}\n.BrBG .q5-6{fill:rgb(1,102,94)}\n.BrBG .q0-7{fill:rgb(140,81,10)}\n.BrBG .q1-7{fill:rgb(216,179,101)}\n.BrBG .q2-7{fill:rgb(246,232,195)}\n.BrBG .q3-7{fill:rgb(245,245,245)}\n.BrBG .q4-7{fill:rgb(199,234,229)}\n.BrBG .q5-7{fill:rgb(90,180,172)}\n.BrBG .q6-7{fill:rgb(1,102,94)}\n.BrBG .q0-8{fill:rgb(140,81,10)}\n.BrBG .q1-8{fill:rgb(191,129,45)}\n.BrBG .q2-8{fill:rgb(223,194,125)}\n.BrBG .q3-8{fill:rgb(246,232,195)}\n.BrBG .q4-8{fill:rgb(199,234,229)}\n.BrBG .q5-8{fill:rgb(128,205,193)}\n.BrBG .q6-8{fill:rgb(53,151,143)}\n.BrBG .q7-8{fill:rgb(1,102,94)}\n.BrBG .q0-9{fill:rgb(140,81,10)}\n.BrBG .q1-9{fill:rgb(191,129,45)}\n.BrBG .q2-9{fill:rgb(223,194,125)}\n.BrBG .q3-9{fill:rgb(246,232,195)}\n.BrBG .q4-9{fill:rgb(245,245,245)}\n.BrBG .q5-9{fill:rgb(199,234,229)}\n.BrBG .q6-9{fill:rgb(128,205,193)}\n.BrBG .q7-9{fill:rgb(53,151,143)}\n.BrBG .q8-9{fill:rgb(1,102,94)}\n.BrBG .q0-10{fill:rgb(84,48,5)}\n.BrBG .q1-10{fill:rgb(140,81,10)}\n.BrBG .q2-10{fill:rgb(191,129,45)}\n.BrBG .q3-10{fill:rgb(223,194,125)}\n.BrBG .q4-10{fill:rgb(246,232,195)}\n.BrBG .q5-10{fill:rgb(199,234,229)}\n.BrBG .q6-10{fill:rgb(128,205,193)}\n.BrBG .q7-10{fill:rgb(53,151,143)}\n.BrBG .q8-10{fill:rgb(1,102,94)}\n.BrBG .q9-10{fill:rgb(0,60,48)}\n.BrBG .q0-11{fill:rgb(84,48,5)}\n.BrBG .q1-11{fill:rgb(140,81,10)}\n.BrBG .q2-11{fill:rgb(191,129,45)}\n.BrBG .q3-11{fill:rgb(223,194,125)}\n.BrBG .q4-11{fill:rgb(246,232,195)}\n.BrBG .q5-11{fill:rgb(245,245,245)}\n.BrBG .q6-11{fill:rgb(199,234,229)}\n.BrBG .q7-11{fill:rgb(128,205,193)}\n.BrBG .q8-11{fill:rgb(53,151,143)}\n.BrBG .q9-11{fill:rgb(1,102,94)}\n.BrBG .q10-11{fill:rgb(0,60,48)}\n.PRGn .q0-3{fill:rgb(175,141,195)}\n.PRGn .q1-3{fill:rgb(247,247,247)}\n.PRGn .q2-3{fill:rgb(127,191,123)}\n.PRGn .q0-4{fill:rgb(123,50,148)}\n.PRGn .q1-4{fill:rgb(194,165,207)}\n.PRGn .q2-4{fill:rgb(166,219,160)}\n.PRGn .q3-4{fill:rgb(0,136,55)}\n.PRGn .q0-5{fill:rgb(123,50,148)}\n.PRGn .q1-5{fill:rgb(194,165,207)}\n.PRGn .q2-5{fill:rgb(247,247,247)}\n.PRGn .q3-5{fill:rgb(166,219,160)}\n.PRGn .q4-5{fill:rgb(0,136,55)}\n.PRGn .q0-6{fill:rgb(118,42,131)}\n.PRGn .q1-6{fill:rgb(175,141,195)}\n.PRGn .q2-6{fill:rgb(231,212,232)}\n.PRGn .q3-6{fill:rgb(217,240,211)}\n.PRGn .q4-6{fill:rgb(127,191,123)}\n.PRGn .q5-6{fill:rgb(27,120,55)}\n.PRGn .q0-7{fill:rgb(118,42,131)}\n.PRGn .q1-7{fill:rgb(175,141,195)}\n.PRGn .q2-7{fill:rgb(231,212,232)}\n.PRGn .q3-7{fill:rgb(247,247,247)}\n.PRGn .q4-7{fill:rgb(217,240,211)}\n.PRGn .q5-7{fill:rgb(127,191,123)}\n.PRGn .q6-7{fill:rgb(27,120,55)}\n.PRGn .q0-8{fill:rgb(118,42,131)}\n.PRGn .q1-8{fill:rgb(153,112,171)}\n.PRGn .q2-8{fill:rgb(194,165,207)}\n.PRGn .q3-8{fill:rgb(231,212,232)}\n.PRGn .q4-8{fill:rgb(217,240,211)}\n.PRGn .q5-8{fill:rgb(166,219,160)}\n.PRGn .q6-8{fill:rgb(90,174,97)}\n.PRGn .q7-8{fill:rgb(27,120,55)}\n.PRGn .q0-9{fill:rgb(118,42,131)}\n.PRGn .q1-9{fill:rgb(153,112,171)}\n.PRGn .q2-9{fill:rgb(194,165,207)}\n.PRGn .q3-9{fill:rgb(231,212,232)}\n.PRGn .q4-9{fill:rgb(247,247,247)}\n.PRGn .q5-9{fill:rgb(217,240,211)}\n.PRGn .q6-9{fill:rgb(166,219,160)}\n.PRGn .q7-9{fill:rgb(90,174,97)}\n.PRGn .q8-9{fill:rgb(27,120,55)}\n.PRGn .q0-10{fill:rgb(64,0,75)}\n.PRGn .q1-10{fill:rgb(118,42,131)}\n.PRGn .q2-10{fill:rgb(153,112,171)}\n.PRGn .q3-10{fill:rgb(194,165,207)}\n.PRGn .q4-10{fill:rgb(231,212,232)}\n.PRGn .q5-10{fill:rgb(217,240,211)}\n.PRGn .q6-10{fill:rgb(166,219,160)}\n.PRGn .q7-10{fill:rgb(90,174,97)}\n.PRGn .q8-10{fill:rgb(27,120,55)}\n.PRGn .q9-10{fill:rgb(0,68,27)}\n.PRGn .q0-11{fill:rgb(64,0,75)}\n.PRGn .q1-11{fill:rgb(118,42,131)}\n.PRGn .q2-11{fill:rgb(153,112,171)}\n.PRGn .q3-11{fill:rgb(194,165,207)}\n.PRGn .q4-11{fill:rgb(231,212,232)}\n.PRGn .q5-11{fill:rgb(247,247,247)}\n.PRGn .q6-11{fill:rgb(217,240,211)}\n.PRGn .q7-11{fill:rgb(166,219,160)}\n.PRGn .q8-11{fill:rgb(90,174,97)}\n.PRGn .q9-11{fill:rgb(27,120,55)}\n.PRGn .q10-11{fill:rgb(0,68,27)}\n.PiYG .q0-3{fill:rgb(233,163,201)}\n.PiYG .q1-3{fill:rgb(247,247,247)}\n.PiYG .q2-3{fill:rgb(161,215,106)}\n.PiYG .q0-4{fill:rgb(208,28,139)}\n.PiYG .q1-4{fill:rgb(241,182,218)}\n.PiYG .q2-4{fill:rgb(184,225,134)}\n.PiYG .q3-4{fill:rgb(77,172,38)}\n.PiYG .q0-5{fill:rgb(208,28,139)}\n.PiYG .q1-5{fill:rgb(241,182,218)}\n.PiYG .q2-5{fill:rgb(247,247,247)}\n.PiYG .q3-5{fill:rgb(184,225,134)}\n.PiYG .q4-5{fill:rgb(77,172,38)}\n.PiYG .q0-6{fill:rgb(197,27,125)}\n.PiYG .q1-6{fill:rgb(233,163,201)}\n.PiYG .q2-6{fill:rgb(253,224,239)}\n.PiYG .q3-6{fill:rgb(230,245,208)}\n.PiYG .q4-6{fill:rgb(161,215,106)}\n.PiYG .q5-6{fill:rgb(77,146,33)}\n.PiYG .q0-7{fill:rgb(197,27,125)}\n.PiYG .q1-7{fill:rgb(233,163,201)}\n.PiYG .q2-7{fill:rgb(253,224,239)}\n.PiYG .q3-7{fill:rgb(247,247,247)}\n.PiYG .q4-7{fill:rgb(230,245,208)}\n.PiYG .q5-7{fill:rgb(161,215,106)}\n.PiYG .q6-7{fill:rgb(77,146,33)}\n.PiYG .q0-8{fill:rgb(197,27,125)}\n.PiYG .q1-8{fill:rgb(222,119,174)}\n.PiYG .q2-8{fill:rgb(241,182,218)}\n.PiYG .q3-8{fill:rgb(253,224,239)}\n.PiYG .q4-8{fill:rgb(230,245,208)}\n.PiYG .q5-8{fill:rgb(184,225,134)}\n.PiYG .q6-8{fill:rgb(127,188,65)}\n.PiYG .q7-8{fill:rgb(77,146,33)}\n.PiYG .q0-9{fill:rgb(197,27,125)}\n.PiYG .q1-9{fill:rgb(222,119,174)}\n.PiYG .q2-9{fill:rgb(241,182,218)}\n.PiYG .q3-9{fill:rgb(253,224,239)}\n.PiYG .q4-9{fill:rgb(247,247,247)}\n.PiYG .q5-9{fill:rgb(230,245,208)}\n.PiYG .q6-9{fill:rgb(184,225,134)}\n.PiYG .q7-9{fill:rgb(127,188,65)}\n.PiYG .q8-9{fill:rgb(77,146,33)}\n.PiYG .q0-10{fill:rgb(142,1,82)}\n.PiYG .q1-10{fill:rgb(197,27,125)}\n.PiYG .q2-10{fill:rgb(222,119,174)}\n.PiYG .q3-10{fill:rgb(241,182,218)}\n.PiYG .q4-10{fill:rgb(253,224,239)}\n.PiYG .q5-10{fill:rgb(230,245,208)}\n.PiYG .q6-10{fill:rgb(184,225,134)}\n.PiYG .q7-10{fill:rgb(127,188,65)}\n.PiYG .q8-10{fill:rgb(77,146,33)}\n.PiYG .q9-10{fill:rgb(39,100,25)}\n.PiYG .q0-11{fill:rgb(142,1,82)}\n.PiYG .q1-11{fill:rgb(197,27,125)}\n.PiYG .q2-11{fill:rgb(222,119,174)}\n.PiYG .q3-11{fill:rgb(241,182,218)}\n.PiYG .q4-11{fill:rgb(253,224,239)}\n.PiYG .q5-11{fill:rgb(247,247,247)}\n.PiYG .q6-11{fill:rgb(230,245,208)}\n.PiYG .q7-11{fill:rgb(184,225,134)}\n.PiYG .q8-11{fill:rgb(127,188,65)}\n.PiYG .q9-11{fill:rgb(77,146,33)}\n.PiYG .q10-11{fill:rgb(39,100,25)}\n.RdBu .q0-3{fill:rgb(239,138,98)}\n.RdBu .q1-3{fill:rgb(247,247,247)}\n.RdBu .q2-3{fill:rgb(103,169,207)}\n.RdBu .q0-4{fill:rgb(202,0,32)}\n.RdBu .q1-4{fill:rgb(244,165,130)}\n.RdBu .q2-4{fill:rgb(146,197,222)}\n.RdBu .q3-4{fill:rgb(5,113,176)}\n.RdBu .q0-5{fill:rgb(202,0,32)}\n.RdBu .q1-5{fill:rgb(244,165,130)}\n.RdBu .q2-5{fill:rgb(247,247,247)}\n.RdBu .q3-5{fill:rgb(146,197,222)}\n.RdBu .q4-5{fill:rgb(5,113,176)}\n.RdBu .q0-6{fill:rgb(178,24,43)}\n.RdBu .q1-6{fill:rgb(239,138,98)}\n.RdBu .q2-6{fill:rgb(253,219,199)}\n.RdBu .q3-6{fill:rgb(209,229,240)}\n.RdBu .q4-6{fill:rgb(103,169,207)}\n.RdBu .q5-6{fill:rgb(33,102,172)}\n.RdBu .q0-7{fill:rgb(178,24,43)}\n.RdBu .q1-7{fill:rgb(239,138,98)}\n.RdBu .q2-7{fill:rgb(253,219,199)}\n.RdBu .q3-7{fill:rgb(247,247,247)}\n.RdBu .q4-7{fill:rgb(209,229,240)}\n.RdBu .q5-7{fill:rgb(103,169,207)}\n.RdBu .q6-7{fill:rgb(33,102,172)}\n.RdBu .q0-8{fill:rgb(178,24,43)}\n.RdBu .q1-8{fill:rgb(214,96,77)}\n.RdBu .q2-8{fill:rgb(244,165,130)}\n.RdBu .q3-8{fill:rgb(253,219,199)}\n.RdBu .q4-8{fill:rgb(209,229,240)}\n.RdBu .q5-8{fill:rgb(146,197,222)}\n.RdBu .q6-8{fill:rgb(67,147,195)}\n.RdBu .q7-8{fill:rgb(33,102,172)}\n.RdBu .q0-9{fill:rgb(178,24,43)}\n.RdBu .q1-9{fill:rgb(214,96,77)}\n.RdBu .q2-9{fill:rgb(244,165,130)}\n.RdBu .q3-9{fill:rgb(253,219,199)}\n.RdBu .q4-9{fill:rgb(247,247,247)}\n.RdBu .q5-9{fill:rgb(209,229,240)}\n.RdBu .q6-9{fill:rgb(146,197,222)}\n.RdBu .q7-9{fill:rgb(67,147,195)}\n.RdBu .q8-9{fill:rgb(33,102,172)}\n.RdBu .q0-10{fill:rgb(103,0,31)}\n.RdBu .q1-10{fill:rgb(178,24,43)}\n.RdBu .q2-10{fill:rgb(214,96,77)}\n.RdBu .q3-10{fill:rgb(244,165,130)}\n.RdBu .q4-10{fill:rgb(253,219,199)}\n.RdBu .q5-10{fill:rgb(209,229,240)}\n.RdBu .q6-10{fill:rgb(146,197,222)}\n.RdBu .q7-10{fill:rgb(67,147,195)}\n.RdBu .q8-10{fill:rgb(33,102,172)}\n.RdBu .q9-10{fill:rgb(5,48,97)}\n.RdBu .q0-11{fill:rgb(103,0,31)}\n.RdBu .q1-11{fill:rgb(178,24,43)}\n.RdBu .q2-11{fill:rgb(214,96,77)}\n.RdBu .q3-11{fill:rgb(244,165,130)}\n.RdBu .q4-11{fill:rgb(253,219,199)}\n.RdBu .q5-11{fill:rgb(247,247,247)}\n.RdBu .q6-11{fill:rgb(209,229,240)}\n.RdBu .q7-11{fill:rgb(146,197,222)}\n.RdBu .q8-11{fill:rgb(67,147,195)}\n.RdBu .q9-11{fill:rgb(33,102,172)}\n.RdBu .q10-11{fill:rgb(5,48,97)}\n.RdGy .q0-3{fill:rgb(239,138,98)}\n.RdGy .q1-3{fill:rgb(255,255,255)}\n.RdGy .q2-3{fill:rgb(153,153,153)}\n.RdGy .q0-4{fill:rgb(202,0,32)}\n.RdGy .q1-4{fill:rgb(244,165,130)}\n.RdGy .q2-4{fill:rgb(186,186,186)}\n.RdGy .q3-4{fill:rgb(64,64,64)}\n.RdGy .q0-5{fill:rgb(202,0,32)}\n.RdGy .q1-5{fill:rgb(244,165,130)}\n.RdGy .q2-5{fill:rgb(255,255,255)}\n.RdGy .q3-5{fill:rgb(186,186,186)}\n.RdGy .q4-5{fill:rgb(64,64,64)}\n.RdGy .q0-6{fill:rgb(178,24,43)}\n.RdGy .q1-6{fill:rgb(239,138,98)}\n.RdGy .q2-6{fill:rgb(253,219,199)}\n.RdGy .q3-6{fill:rgb(224,224,224)}\n.RdGy .q4-6{fill:rgb(153,153,153)}\n.RdGy .q5-6{fill:rgb(77,77,77)}\n.RdGy .q0-7{fill:rgb(178,24,43)}\n.RdGy .q1-7{fill:rgb(239,138,98)}\n.RdGy .q2-7{fill:rgb(253,219,199)}\n.RdGy .q3-7{fill:rgb(255,255,255)}\n.RdGy .q4-7{fill:rgb(224,224,224)}\n.RdGy .q5-7{fill:rgb(153,153,153)}\n.RdGy .q6-7{fill:rgb(77,77,77)}\n.RdGy .q0-8{fill:rgb(178,24,43)}\n.RdGy .q1-8{fill:rgb(214,96,77)}\n.RdGy .q2-8{fill:rgb(244,165,130)}\n.RdGy .q3-8{fill:rgb(253,219,199)}\n.RdGy .q4-8{fill:rgb(224,224,224)}\n.RdGy .q5-8{fill:rgb(186,186,186)}\n.RdGy .q6-8{fill:rgb(135,135,135)}\n.RdGy .q7-8{fill:rgb(77,77,77)}\n.RdGy .q0-9{fill:rgb(178,24,43)}\n.RdGy .q1-9{fill:rgb(214,96,77)}\n.RdGy .q2-9{fill:rgb(244,165,130)}\n.RdGy .q3-9{fill:rgb(253,219,199)}\n.RdGy .q4-9{fill:rgb(255,255,255)}\n.RdGy .q5-9{fill:rgb(224,224,224)}\n.RdGy .q6-9{fill:rgb(186,186,186)}\n.RdGy .q7-9{fill:rgb(135,135,135)}\n.RdGy .q8-9{fill:rgb(77,77,77)}\n.RdGy .q0-10{fill:rgb(103,0,31)}\n.RdGy .q1-10{fill:rgb(178,24,43)}\n.RdGy .q2-10{fill:rgb(214,96,77)}\n.RdGy .q3-10{fill:rgb(244,165,130)}\n.RdGy .q4-10{fill:rgb(253,219,199)}\n.RdGy .q5-10{fill:rgb(224,224,224)}\n.RdGy .q6-10{fill:rgb(186,186,186)}\n.RdGy .q7-10{fill:rgb(135,135,135)}\n.RdGy .q8-10{fill:rgb(77,77,77)}\n.RdGy .q9-10{fill:rgb(26,26,26)}\n.RdGy .q0-11{fill:rgb(103,0,31)}\n.RdGy .q1-11{fill:rgb(178,24,43)}\n.RdGy .q2-11{fill:rgb(214,96,77)}\n.RdGy .q3-11{fill:rgb(244,165,130)}\n.RdGy .q4-11{fill:rgb(253,219,199)}\n.RdGy .q5-11{fill:rgb(255,255,255)}\n.RdGy .q6-11{fill:rgb(224,224,224)}\n.RdGy .q7-11{fill:rgb(186,186,186)}\n.RdGy .q8-11{fill:rgb(135,135,135)}\n.RdGy .q9-11{fill:rgb(77,77,77)}\n.RdGy .q10-11{fill:rgb(26,26,26)}\n.RdYlBu .q0-3{fill:rgb(252,141,89)}\n.RdYlBu .q1-3{fill:rgb(255,255,191)}\n.RdYlBu .q2-3{fill:rgb(145,191,219)}\n.RdYlBu .q0-4{fill:rgb(215,25,28)}\n.RdYlBu .q1-4{fill:rgb(253,174,97)}\n.RdYlBu .q2-4{fill:rgb(171,217,233)}\n.RdYlBu .q3-4{fill:rgb(44,123,182)}\n.RdYlBu .q0-5{fill:rgb(215,25,28)}\n.RdYlBu .q1-5{fill:rgb(253,174,97)}\n.RdYlBu .q2-5{fill:rgb(255,255,191)}\n.RdYlBu .q3-5{fill:rgb(171,217,233)}\n.RdYlBu .q4-5{fill:rgb(44,123,182)}\n.RdYlBu .q0-6{fill:rgb(215,48,39)}\n.RdYlBu .q1-6{fill:rgb(252,141,89)}\n.RdYlBu .q2-6{fill:rgb(254,224,144)}\n.RdYlBu .q3-6{fill:rgb(224,243,248)}\n.RdYlBu .q4-6{fill:rgb(145,191,219)}\n.RdYlBu .q5-6{fill:rgb(69,117,180)}\n.RdYlBu .q0-7{fill:rgb(215,48,39)}\n.RdYlBu .q1-7{fill:rgb(252,141,89)}\n.RdYlBu .q2-7{fill:rgb(254,224,144)}\n.RdYlBu .q3-7{fill:rgb(255,255,191)}\n.RdYlBu .q4-7{fill:rgb(224,243,248)}\n.RdYlBu .q5-7{fill:rgb(145,191,219)}\n.RdYlBu .q6-7{fill:rgb(69,117,180)}\n.RdYlBu .q0-8{fill:rgb(215,48,39)}\n.RdYlBu .q1-8{fill:rgb(244,109,67)}\n.RdYlBu .q2-8{fill:rgb(253,174,97)}\n.RdYlBu .q3-8{fill:rgb(254,224,144)}\n.RdYlBu .q4-8{fill:rgb(224,243,248)}\n.RdYlBu .q5-8{fill:rgb(171,217,233)}\n.RdYlBu .q6-8{fill:rgb(116,173,209)}\n.RdYlBu .q7-8{fill:rgb(69,117,180)}\n.RdYlBu .q0-9{fill:rgb(215,48,39)}\n.RdYlBu .q1-9{fill:rgb(244,109,67)}\n.RdYlBu .q2-9{fill:rgb(253,174,97)}\n.RdYlBu .q3-9{fill:rgb(254,224,144)}\n.RdYlBu .q4-9{fill:rgb(255,255,191)}\n.RdYlBu .q5-9{fill:rgb(224,243,248)}\n.RdYlBu .q6-9{fill:rgb(171,217,233)}\n.RdYlBu .q7-9{fill:rgb(116,173,209)}\n.RdYlBu .q8-9{fill:rgb(69,117,180)}\n.RdYlBu .q0-10{fill:rgb(165,0,38)}\n.RdYlBu .q1-10{fill:rgb(215,48,39)}\n.RdYlBu .q2-10{fill:rgb(244,109,67)}\n.RdYlBu .q3-10{fill:rgb(253,174,97)}\n.RdYlBu .q4-10{fill:rgb(254,224,144)}\n.RdYlBu .q5-10{fill:rgb(224,243,248)}\n.RdYlBu .q6-10{fill:rgb(171,217,233)}\n.RdYlBu .q7-10{fill:rgb(116,173,209)}\n.RdYlBu .q8-10{fill:rgb(69,117,180)}\n.RdYlBu .q9-10{fill:rgb(49,54,149)}\n.RdYlBu .q0-11{fill:rgb(165,0,38)}\n.RdYlBu .q1-11{fill:rgb(215,48,39)}\n.RdYlBu .q2-11{fill:rgb(244,109,67)}\n.RdYlBu .q3-11{fill:rgb(253,174,97)}\n.RdYlBu .q4-11{fill:rgb(254,224,144)}\n.RdYlBu .q5-11{fill:rgb(255,255,191)}\n.RdYlBu .q6-11{fill:rgb(224,243,248)}\n.RdYlBu .q7-11{fill:rgb(171,217,233)}\n.RdYlBu .q8-11{fill:rgb(116,173,209)}\n.RdYlBu .q9-11{fill:rgb(69,117,180)}\n.RdYlBu .q10-11{fill:rgb(49,54,149)}\n.Spectral .q0-3{fill:rgb(252,141,89)}\n.Spectral .q1-3{fill:rgb(255,255,191)}\n.Spectral .q2-3{fill:rgb(153,213,148)}\n.Spectral .q0-4{fill:rgb(215,25,28)}\n.Spectral .q1-4{fill:rgb(253,174,97)}\n.Spectral .q2-4{fill:rgb(171,221,164)}\n.Spectral .q3-4{fill:rgb(43,131,186)}\n.Spectral .q0-5{fill:rgb(215,25,28)}\n.Spectral .q1-5{fill:rgb(253,174,97)}\n.Spectral .q2-5{fill:rgb(255,255,191)}\n.Spectral .q3-5{fill:rgb(171,221,164)}\n.Spectral .q4-5{fill:rgb(43,131,186)}\n.Spectral .q0-6{fill:rgb(213,62,79)}\n.Spectral .q1-6{fill:rgb(252,141,89)}\n.Spectral .q2-6{fill:rgb(254,224,139)}\n.Spectral .q3-6{fill:rgb(230,245,152)}\n.Spectral .q4-6{fill:rgb(153,213,148)}\n.Spectral .q5-6{fill:rgb(50,136,189)}\n.Spectral .q0-7{fill:rgb(213,62,79)}\n.Spectral .q1-7{fill:rgb(252,141,89)}\n.Spectral .q2-7{fill:rgb(254,224,139)}\n.Spectral .q3-7{fill:rgb(255,255,191)}\n.Spectral .q4-7{fill:rgb(230,245,152)}\n.Spectral .q5-7{fill:rgb(153,213,148)}\n.Spectral .q6-7{fill:rgb(50,136,189)}\n.Spectral .q0-8{fill:rgb(213,62,79)}\n.Spectral .q1-8{fill:rgb(244,109,67)}\n.Spectral .q2-8{fill:rgb(253,174,97)}\n.Spectral .q3-8{fill:rgb(254,224,139)}\n.Spectral .q4-8{fill:rgb(230,245,152)}\n.Spectral .q5-8{fill:rgb(171,221,164)}\n.Spectral .q6-8{fill:rgb(102,194,165)}\n.Spectral .q7-8{fill:rgb(50,136,189)}\n.Spectral .q0-9{fill:rgb(213,62,79)}\n.Spectral .q1-9{fill:rgb(244,109,67)}\n.Spectral .q2-9{fill:rgb(253,174,97)}\n.Spectral .q3-9{fill:rgb(254,224,139)}\n.Spectral .q4-9{fill:rgb(255,255,191)}\n.Spectral .q5-9{fill:rgb(230,245,152)}\n.Spectral .q6-9{fill:rgb(171,221,164)}\n.Spectral .q7-9{fill:rgb(102,194,165)}\n.Spectral .q8-9{fill:rgb(50,136,189)}\n.Spectral .q0-10{fill:rgb(158,1,66)}\n.Spectral .q1-10{fill:rgb(213,62,79)}\n.Spectral .q2-10{fill:rgb(244,109,67)}\n.Spectral .q3-10{fill:rgb(253,174,97)}\n.Spectral .q4-10{fill:rgb(254,224,139)}\n.Spectral .q5-10{fill:rgb(230,245,152)}\n.Spectral .q6-10{fill:rgb(171,221,164)}\n.Spectral .q7-10{fill:rgb(102,194,165)}\n.Spectral .q8-10{fill:rgb(50,136,189)}\n.Spectral .q9-10{fill:rgb(94,79,162)}\n.Spectral .q0-11{fill:rgb(158,1,66)}\n.Spectral .q1-11{fill:rgb(213,62,79)}\n.Spectral .q2-11{fill:rgb(244,109,67)}\n.Spectral .q3-11{fill:rgb(253,174,97)}\n.Spectral .q4-11{fill:rgb(254,224,139)}\n.Spectral .q5-11{fill:rgb(255,255,191)}\n.Spectral .q6-11{fill:rgb(230,245,152)}\n.Spectral .q7-11{fill:rgb(171,221,164)}\n.Spectral .q8-11{fill:rgb(102,194,165)}\n.Spectral .q9-11{fill:rgb(50,136,189)}\n.Spectral .q10-11{fill:rgb(94,79,162)}\n.RdYlGn .q0-3{fill:rgb(252,141,89)}\n.RdYlGn .q1-3{fill:rgb(255,255,191)}\n.RdYlGn .q2-3{fill:rgb(145,207,96)}\n.RdYlGn .q0-4{fill:rgb(215,25,28)}\n.RdYlGn .q1-4{fill:rgb(253,174,97)}\n.RdYlGn .q2-4{fill:rgb(166,217,106)}\n.RdYlGn .q3-4{fill:rgb(26,150,65)}\n.RdYlGn .q0-5{fill:rgb(215,25,28)}\n.RdYlGn .q1-5{fill:rgb(253,174,97)}\n.RdYlGn .q2-5{fill:rgb(255,255,191)}\n.RdYlGn .q3-5{fill:rgb(166,217,106)}\n.RdYlGn .q4-5{fill:rgb(26,150,65)}\n.RdYlGn .q0-6{fill:rgb(215,48,39)}\n.RdYlGn .q1-6{fill:rgb(252,141,89)}\n.RdYlGn .q2-6{fill:rgb(254,224,139)}\n.RdYlGn .q3-6{fill:rgb(217,239,139)}\n.RdYlGn .q4-6{fill:rgb(145,207,96)}\n.RdYlGn .q5-6{fill:rgb(26,152,80)}\n.RdYlGn .q0-7{fill:rgb(215,48,39)}\n.RdYlGn .q1-7{fill:rgb(252,141,89)}\n.RdYlGn .q2-7{fill:rgb(254,224,139)}\n.RdYlGn .q3-7{fill:rgb(255,255,191)}\n.RdYlGn .q4-7{fill:rgb(217,239,139)}\n.RdYlGn .q5-7{fill:rgb(145,207,96)}\n.RdYlGn .q6-7{fill:rgb(26,152,80)}\n.RdYlGn .q0-8{fill:rgb(215,48,39)}\n.RdYlGn .q1-8{fill:rgb(244,109,67)}\n.RdYlGn .q2-8{fill:rgb(253,174,97)}\n.RdYlGn .q3-8{fill:rgb(254,224,139)}\n.RdYlGn .q4-8{fill:rgb(217,239,139)}\n.RdYlGn .q5-8{fill:rgb(166,217,106)}\n.RdYlGn .q6-8{fill:rgb(102,189,99)}\n.RdYlGn .q7-8{fill:rgb(26,152,80)}\n.RdYlGn .q0-9{fill:rgb(215,48,39)}\n.RdYlGn .q1-9{fill:rgb(244,109,67)}\n.RdYlGn .q2-9{fill:rgb(253,174,97)}\n.RdYlGn .q3-9{fill:rgb(254,224,139)}\n.RdYlGn .q4-9{fill:rgb(255,255,191)}\n.RdYlGn .q5-9{fill:rgb(217,239,139)}\n.RdYlGn .q6-9{fill:rgb(166,217,106)}\n.RdYlGn .q7-9{fill:rgb(102,189,99)}\n.RdYlGn .q8-9{fill:rgb(26,152,80)}\n.RdYlGn .q0-10{fill:rgb(165,0,38)}\n.RdYlGn .q1-10{fill:rgb(215,48,39)}\n.RdYlGn .q2-10{fill:rgb(244,109,67)}\n.RdYlGn .q3-10{fill:rgb(253,174,97)}\n.RdYlGn .q4-10{fill:rgb(254,224,139)}\n.RdYlGn .q5-10{fill:rgb(217,239,139)}\n.RdYlGn .q6-10{fill:rgb(166,217,106)}\n.RdYlGn .q7-10{fill:rgb(102,189,99)}\n.RdYlGn .q8-10{fill:rgb(26,152,80)}\n.RdYlGn .q9-10{fill:rgb(0,104,55)}\n.RdYlGn .q0-11{fill:rgb(165,0,38)}\n.RdYlGn .q1-11{fill:rgb(215,48,39)}\n.RdYlGn .q2-11{fill:rgb(244,109,67)}\n.RdYlGn .q3-11{fill:rgb(253,174,97)}\n.RdYlGn .q4-11{fill:rgb(254,224,139)}\n.RdYlGn .q5-11{fill:rgb(255,255,191)}\n.RdYlGn .q6-11{fill:rgb(217,239,139)}\n.RdYlGn .q7-11{fill:rgb(166,217,106)}\n.RdYlGn .q8-11{fill:rgb(102,189,99)}\n.RdYlGn .q9-11{fill:rgb(26,152,80)}\n.RdYlGn .q10-11{fill:rgb(0,104,55)}\n");
	}
	,__class__: d3.Calendar
});
if(!thx.culture) thx.culture = {}
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
d3.Sort = $hxClasses["d3.Sort"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Sort.__name__ = ["d3","Sort"];
d3.Sort.__super__ = d3.Example;
d3.Sort.prototype = $extend(d3.Example.prototype,{
	height: null
	,width: null
	,runExample: function() {
		this.height = 480;
		this.width = this.stageWidth();
		this.container.html().string("<div><input id='sort' type='checkbox' checked><label for='sort'>Ascending</label></div>");
		this.container.append("svg:svg").attr("viewBox").string("0 0 " + this.width + " " + this.height);
		this.container.select("#sort").onNode("change",this.sort.$bind(this));
		this.transform();
	}
	,transform: function() {
		var circle = this.container.select("svg").style("width").string(this.width + "px").style("height").string(this.height + "px").selectAll("circle").data(Ints.range(400).map(function(d,i) {
			return Math.random();
		}));
		var r = 50, w = this.width - r * 2, h = this.height - r * 2;
		circle.enter().append("svg:circle").attr("cx").floatf(function(d,i) {
			return r + Math.random() * w;
		}).attr("cy").floatf(function(d,i) {
			return r + Math.random() * h;
		}).attr("r")["float"](0);
		this.container.selectAllData("circle").transition().duration(null,750).attr("r").floatf(function(d,i) {
			return r * d;
		});
		this.sort();
	}
	,sort: function(_,_1) {
		this.container.selectAllData("circle").sort(this.container.select("#sort").property("checked").get()?Floats.compare:function(a,b) {
			return b < a?-1:b > a?1:0;
		});
	}
	,destroyExample: function() {
		this.container.select("#sort").onNode("change",null);
	}
	,description: function() {
		return "Random sized circles with transition. The checkbox forces the circles to be sorted on the z-index according to their size.";
	}
	,__class__: d3.Sort
});
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
d3.Pie = $hxClasses["d3.Pie"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Pie.__name__ = ["d3","Pie"];
d3.Pie.__super__ = d3.Example;
d3.Pie.prototype = $extend(d3.Example.prototype,{
	runExample: function() {
		var w = this.stageWidth(), h = 400, r = Math.min(w,h) / 2, data = Ints.range(10).map(function(_,_1) {
			return Math.random();
		}), color = new thx.math.scale.Ordinal().range(thx.color.Categories.category20), donut = new thx.geom.layout.Pie().sort(function(a,b) {
			return b < a?-1:b > a?1:0;
		}), arc = thx.svg.Arc.fromAngleObject().innerRadius(r * .6).outerRadius(r);
		var vis = this.container.append("svg:svg").attr("width")["float"](w).attr("height")["float"](h).data([data]).update();
		var arcs = vis.selectAll("g.arc").dataf(donut.pie.$bind(donut)).enter().append("svg:g").attr("class").string("arc").attr("transform").string("translate(" + r + "," + r + ")");
		arcs.append("svg:path").attr("fill").stringf(function(d,i) {
			return color.scale(i);
		}).attr("d").stringf(arc.shape.$bind(arc));
		arcs.append("svg:text").attr("transform").stringf(function(d,i) {
			var c = arc.centroid(d);
			return "translate(" + c[0] + "," + c[1] + ")";
		}).attr("dy").string(".35em").attr("text-anchor").string("middle").attr("display").stringf(function(d,i) {
			return d.value > .15?null:"none";
		}).text().stringf(function(d,i) {
			return Floats.format(d.value);
		});
	}
	,description: function() {
		return "Pie Chart from random data. Not interactive.";
	}
	,__class__: d3.Pie
});
thx.js.BoundSelection = $hxClasses["thx.js.BoundSelection"] = function(groups) {
	thx.js.BaseSelection.call(this,groups);
}
thx.js.BoundSelection.__name__ = ["thx","js","BoundSelection"];
thx.js.BoundSelection.__super__ = thx.js.BaseSelection;
thx.js.BoundSelection.prototype = $extend(thx.js.BaseSelection.prototype,{
	html: function() {
		return new thx.js.AccessDataHtml(this);
	}
	,text: function() {
		return new thx.js.AccessDataText(this);
	}
	,attr: function(name) {
		return new thx.js.AccessDataAttribute(name,this);
	}
	,classed: function() {
		return new thx.js.AccessDataClassed(this);
	}
	,property: function(name) {
		return new thx.js.AccessDataProperty(name,this);
	}
	,style: function(name) {
		return new thx.js.AccessDataStyle(name,this);
	}
	,transition: function() {
		return new thx.js.BoundTransition(this);
	}
	,data: function(d,join) {
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
	,dataf: function(fd,join) {
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
	,selfData: function() {
		return this.dataf(function(d,_) {
			return d;
		});
	}
	,each: function(f) {
		return this.eachNode(function(n,i) {
			f(Reflect.field(n,"__data__"),i);
		});
	}
	,sort: function(comparator) {
		return this.sortNode(function(a,b) {
			return comparator(Reflect.field(a,"__data__"),Reflect.field(b,"__data__"));
		});
	}
	,filter: function(f) {
		return this.filterNode(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		});
	}
	,map: function(f) {
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
	,first: function(f) {
		return this.firstNode(function(n) {
			return f(Reflect.field(n,"__data__"));
		});
	}
	,on: function(type,listener,capture) {
		if(capture == null) capture = false;
		return this.onNode(type,null == listener?null:function(n,i) {
			listener(Reflect.field(n,"__data__"),i);
		},capture);
	}
	,__class__: thx.js.BoundSelection
});
thx.js.UpdateSelection = $hxClasses["thx.js.UpdateSelection"] = function(update,choice) {
	thx.js.BoundSelection.call(this,update);
	this._choice = choice;
}
thx.js.UpdateSelection.__name__ = ["thx","js","UpdateSelection"];
thx.js.UpdateSelection.__super__ = thx.js.BoundSelection;
thx.js.UpdateSelection.prototype = $extend(thx.js.BoundSelection.prototype,{
	_choice: null
	,createSelection: function(groups) {
		return new thx.js.UpdateSelection(groups,this._choice);
	}
	,update: function() {
		return this;
	}
	,enter: function() {
		return this._choice.enter();
	}
	,exit: function() {
		return this._choice.exit();
	}
	,__class__: thx.js.UpdateSelection
});
thx.js.DataChoice = $hxClasses["thx.js.DataChoice"] = function(update,enter,exit) {
	this._update = update;
	this._enter = enter;
	this._exit = exit;
	thx.js.UpdateSelection.call(this,this._update,this);
}
thx.js.DataChoice.__name__ = ["thx","js","DataChoice"];
thx.js.DataChoice.merge = function(groups,dc) {
	thx.js.Group.merge(groups,dc._update);
}
thx.js.DataChoice.__super__ = thx.js.UpdateSelection;
thx.js.DataChoice.prototype = $extend(thx.js.UpdateSelection.prototype,{
	_update: null
	,_enter: null
	,_exit: null
	,enter: function() {
		return new thx.js.PreEnterSelection(this._enter,this);
	}
	,exit: function() {
		return new thx.js.ExitSelection(this._exit,this);
	}
	,__class__: thx.js.DataChoice
});
thx.js.ResumeSelection = $hxClasses["thx.js.ResumeSelection"] = function(groups) {
	thx.js.BoundSelection.call(this,groups);
}
thx.js.ResumeSelection.__name__ = ["thx","js","ResumeSelection"];
thx.js.ResumeSelection.create = function(groups) {
	return new thx.js.ResumeSelection(groups);
}
thx.js.ResumeSelection.__super__ = thx.js.BoundSelection;
thx.js.ResumeSelection.prototype = $extend(thx.js.BoundSelection.prototype,{
	createSelection: function(groups) {
		return new thx.js.ResumeSelection(groups);
	}
	,__class__: thx.js.ResumeSelection
});
thx.js.PreEnterSelection = $hxClasses["thx.js.PreEnterSelection"] = function(enter,choice) {
	this.groups = enter;
	this._choice = choice;
}
thx.js.PreEnterSelection.__name__ = ["thx","js","PreEnterSelection"];
thx.js.PreEnterSelection.prototype = {
	groups: null
	,_choice: null
	,append: function(name) {
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
	,insert: function(name,before,beforeSelector) {
		var qname = thx.xml.Namespace.qualify(name);
		var insertDom = function(node) {
			var n = js.Lib.document.createElement(name), bf = null != before?before:thx.js.Dom.selectNode(node).select(beforeSelector).node();
			node.insertBefore(n,bf);
			return n;
		};
		var insertNsDom = function(node) {
			var n = js.Lib.document.createElementNS(qname.space,qname.local), bf = null != before?before:thx.js.Dom.selectNode(node).select(beforeSelector).node();
			node.insertBefore(n,bf);
			return n;
		};
		return this._select(null == qname?insertDom:insertNsDom);
	}
	,createSelection: function(groups) {
		return new thx.js.EnterSelection(groups,this._choice);
	}
	,_select: function(selectf) {
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
		thx.js.DataChoice.merge(subgroups,this._choice);
		return this.createSelection(subgroups);
	}
	,__class__: thx.js.PreEnterSelection
}
thx.js.EnterSelection = $hxClasses["thx.js.EnterSelection"] = function(enter,choice) {
	thx.js.BoundSelection.call(this,enter);
	this._choice = choice;
}
thx.js.EnterSelection.__name__ = ["thx","js","EnterSelection"];
thx.js.EnterSelection.__super__ = thx.js.BoundSelection;
thx.js.EnterSelection.prototype = $extend(thx.js.BoundSelection.prototype,{
	_choice: null
	,createSelection: function(groups) {
		return new thx.js.EnterSelection(groups,this._choice);
	}
	,exit: function() {
		return this._choice.exit();
	}
	,update: function() {
		return this._choice;
	}
	,__class__: thx.js.EnterSelection
});
thx.js.ExitSelection = $hxClasses["thx.js.ExitSelection"] = function(exit,choice) {
	thx.js.UnboundSelection.call(this,exit);
	this._choice = choice;
}
thx.js.ExitSelection.__name__ = ["thx","js","ExitSelection"];
thx.js.ExitSelection.__super__ = thx.js.UnboundSelection;
thx.js.ExitSelection.prototype = $extend(thx.js.UnboundSelection.prototype,{
	_choice: null
	,createSelection: function(groups) {
		return new thx.js.ExitSelection(groups,this._choice);
	}
	,enter: function() {
		return this._choice.enter();
	}
	,update: function() {
		return this._choice;
	}
	,__class__: thx.js.ExitSelection
});
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
if(!thx.cultures) thx.cultures = {}
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
}
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
thx.geom.layout.Chord = $hxClasses["thx.geom.layout.Chord"] = function() {
	this._padding = 0;
}
thx.geom.layout.Chord.__name__ = ["thx","geom","layout","Chord"];
thx.geom.layout.Chord.prototype = {
	_chords: null
	,_groups: null
	,_matrix: null
	,_n: null
	,_padding: null
	,_sortGroups: null
	,_sortSubgroups: null
	,_sortChords: null
	,relayout: function() {
		var subgroups = new Hash(), groupSums = [], groupIndex = Ints.range(this._n), subgroupIndex = [], k, x, x0, i, j;
		this._chords = [];
		this._groups = [];
		k = 0;
		i = -1;
		while(++i < this._n) {
			x = 0;
			j = -1;
			while(++j < this._n) x += this._matrix[i][j];
			groupSums.push(x);
			subgroupIndex.push(Ints.range(this._n));
			k += x;
		}
		if(null != this._sortGroups) {
			var sg = this._sortGroups;
			groupIndex.sort(function(a,b) {
				return sg(groupSums[a],groupSums[b]);
			});
		}
		if(null != this._sortSubgroups) {
			var ss = this._sortSubgroups, m = this._matrix;
			subgroupIndex.forEach(function(d,i1) {
				d.sort(function(a,b) {
					return ss(m[i1][a],m[i1][b]);
				});
			});
		}
		k = (2 * Math.PI - this._padding * this._n) / k;
		x = 0;
		i = -1;
		while(++i < this._n) {
			x0 = x;
			j = -1;
			var di = null;
			while(++j < this._n) {
				di = groupIndex[i];
				var dj = subgroupIndex[i][j], v = this._matrix[di][dj];
				subgroups.set(di + "-" + dj,{ index : di, subindex : dj, startAngle : x, endAngle : x += v * k, value : 0.0 + v});
			}
			this._groups.push({ index : di, subindex : null, startAngle : x0, endAngle : x, value : (x - x0) / k});
			x += this._padding;
		}
		i = -1;
		while(++i < this._n) {
			j = i - 1;
			while(++j < this._n) {
				var source = subgroups.get(i + "-" + j), target = subgroups.get(j + "-" + i);
				if(null != source.value || null != target.value) this._chords.push({ source : source, target : target});
			}
		}
		if(null != this._sortChords) this.resort();
	}
	,resort: function() {
		var sc = this._sortChords;
		this._chords.sort(function(a,b) {
			var aa = Math.min(a.source.value,a.target.value);
			var bb = Math.min(b.source.value,b.target.value);
			return sc(aa,bb);
		});
	}
	,getMatrix: function() {
		return this._matrix;
	}
	,matrix: function(x) {
		this._matrix = x;
		this._n = this._matrix.length;
		this._chords = null;
		this._groups = null;
		return this;
	}
	,getPadding: function() {
		return this._padding;
	}
	,padding: function(v) {
		this._padding = v;
		this._chords = null;
		this._groups = null;
		return this;
	}
	,getSortGroups: function() {
		return this._sortGroups;
	}
	,sortGroups: function(v) {
		this._sortGroups = v;
		this._chords = null;
		this._groups = null;
		return this;
	}
	,getSortSubgroups: function() {
		return this._sortSubgroups;
	}
	,sortSubgroups: function(v) {
		this._sortSubgroups = v;
		this._chords = null;
		return this;
	}
	,getSortChords: function() {
		return this._sortChords;
	}
	,sortChords: function(v) {
		this._sortChords = v;
		if(null != this._chords) this.resort();
		return this;
	}
	,chords: function() {
		if(null == this._chords) this.relayout();
		return this._chords;
	}
	,groups: function() {
		if(null == this._groups) this.relayout();
		return this._groups;
	}
	,__class__: thx.geom.layout.Chord
}
if(!thx.error) thx.error = {}
thx.error.Error = $hxClasses["thx.error.Error"] = function(message,params,param,pos) {
	thx.util.Message.call(this,message,params,param);
	this.pos = pos;
}
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
Arrays.prototype = {
	__class__: Arrays
}
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
}
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
thx.math.scale.NumericScale = $hxClasses["thx.math.scale.NumericScale"] = function() {
	this._domain = [0.0,1.0];
	this._range = [0.0,1.0];
	this.f = Floats.interpolatef;
	this._clamp = false;
	this.rescale();
}
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
if(!thx.js.behavior) thx.js.behavior = {}
thx.js.behavior.Zoom = $hxClasses["thx.js.behavior.Zoom"] = function() {
	if(null == thx.js.behavior.Zoom._outer) thx.js.behavior.Zoom._outer = thx.js.Dom.select("body").append("div").style("visibility").string("hidden").style("position").string("absolute").style("top").string("-3000px").style("height")["float"](0).style("overflow-y").string("scroll").append("div").style("height").string("2000px").node().parentNode;
}
thx.js.behavior.Zoom.__name__ = ["thx","js","behavior","Zoom"];
thx.js.behavior.Zoom._outer = null;
thx.js.behavior.Zoom.event = null;
thx.js.behavior.Zoom.prototype = {
	_dispatcher: null
	,webkit533: null
	,_pan: null
	,_zoom: null
	,_x: null
	,_y: null
	,_z: null
	,mousedown: function(d,i) {
		this._pan = { x0 : this._x - thx.js.Dom.event.clientX, y0 : this._y - thx.js.Dom.event.clientY, target : d, data : Reflect.field(d,"__data__"), index : i};
		thx.js.Dom.event.preventDefault();
		js.Lib.window.focus();
	}
	,mousemove: function(_,_1) {
		this._zoom = null;
		if(null != this._pan) {
			this._x = thx.js.Dom.event.clientX + this._pan.x0;
			this._y = thx.js.Dom.event.clientY + this._pan.y0;
			this.dispatch(this._pan.data,this._pan.index);
		}
	}
	,mouseup: function(_,_1) {
		if(null != this._pan) {
			this.mousemove();
			this._pan = null;
		}
	}
	,mousewheel: function(d,i) {
		var e = thx.js.Dom.event;
		if(null == this._zoom) {
			var p = thx.js.Svg.mouse(d.nearestViewportElement || d);
			this._zoom = { x0 : this._x, y0 : this._y, z0 : this._z, x1 : this._x - p[0], y1 : this._y - p[1]};
		}
		if("dblclick" == e.type) this._z = e.shiftKey?Math.ceil(this._z - 1):Math.floor(this._z + 1); else {
			var delta = e.wheelDelta || -e.detail;
			if(delta) {
				try {
					thx.js.behavior.Zoom._outer.scrollTop = 1000;
					thx.js.behavior.Zoom._outer.dispatchEvent(e);
					delta = 1000 - thx.js.behavior.Zoom._outer.scrollTop;
				} catch( e1 ) {
				}
				delta *= .005;
			}
			this._z += delta;
		}
		var k = Math.pow(2,this._z - this._zoom.z0) - 1;
		this._x = this._zoom.x0 + this._zoom.x1 * k;
		this._y = this._zoom.y0 + this._zoom.y1 * k;
		this.dispatch(d,i);
		e.preventDefault();
	}
	,oldscale: null
	,dispatch: function(d,i) {
		if(null != this._dispatcher) {
			var event = new thx.js.behavior.ZoomEvent(Math.pow(2,this._z),this._x,this._y);
			if(null != thx.js.behavior.Zoom.event && event.scale == thx.js.behavior.Zoom.event.scale && event.tx == thx.js.behavior.Zoom.event.tx && event.ty == thx.js.behavior.Zoom.event.ty) return;
			thx.js.behavior.Zoom.event = event;
			try {
				this._dispatcher(d,i);
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "Zoom.hx", lineNumber : 141, className : "thx.js.behavior.Zoom", methodName : "dispatch"});
			}
		}
	}
	,attach: function(dom,i) {
		var container = thx.js.Dom.selectNode(dom);
		container.onNode("mousedown",this.mousedown.$bind(this)).onNode("mousewheel",this.mousewheel.$bind(this)).onNode("DOMMouseScroll",this.mousewheel.$bind(this)).onNode("dblclick",this.mousewheel.$bind(this));
		thx.js.Dom.selectNode(js.Lib.window).onNode("mousemove",this.mousemove.$bind(this)).onNode("mouseup",this.mouseup.$bind(this));
	}
	,zoom: function(f) {
		this._dispatcher = f;
		return this.attach.$bind(this);
	}
	,__class__: thx.js.behavior.Zoom
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
d3.Stack = $hxClasses["d3.Stack"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Stack.__name__ = ["d3","Stack"];
d3.Stack.m = null;
d3.Stack.n = null;
d3.Stack.mx = null;
d3.Stack.my = null;
d3.Stack.mz = null;
d3.Stack.p = null;
d3.Stack.w = null;
d3.Stack.h = null;
d3.Stack.x = function(d,i) {
	return d.x * d3.Stack.w / d3.Stack.mx;
}
d3.Stack.y0 = function(d,i) {
	return d3.Stack.h - d.y0 * d3.Stack.h / d3.Stack.my;
}
d3.Stack.y1 = function(d,i) {
	return d3.Stack.h - (d.y + d.y0) * d3.Stack.h / d3.Stack.my;
}
d3.Stack.y2 = function(d,i) {
	return d.y * d3.Stack.h / d3.Stack.mz;
}
d3.Stack.__super__ = d3.Example;
d3.Stack.prototype = $extend(d3.Example.prototype,{
	data: null
	,runExample: function() {
		this.container.append("button").text().string("click to switch type").onNode("click",this.click.$bind(this));
		this.container.append("br");
		d3.Stack.n = 4;
		d3.Stack.m = 36;
		this.data = new thx.geom.layout.Stack().stack(d3.Streams.layers(d3.Stack.n,d3.Stack.m,.1));
		var color = thx.color.Colors.interpolatef("#aad","#556");
		d3.Stack.p = 20.0;
		d3.Stack.w = this.stageWidth();
		d3.Stack.h = 499.5 - d3.Stack.p;
		d3.Stack.mx = d3.Stack.m;
		d3.Stack.my = Arrays.floatMax(this.data,function(a) {
			return Arrays.floatMax(a,function(d) {
				return d.y0 + d.y;
			});
		});
		d3.Stack.mz = Arrays.floatMax(this.data,function(a) {
			return Arrays.floatMax(a,function(d) {
				return d.y;
			});
		});
		var vis = this.container.append("svg:svg").attr("width")["float"](d3.Stack.w).attr("height")["float"](d3.Stack.h + d3.Stack.p);
		var layers = vis.selectAll("g.layer").data(this.data).enter().append("svg:g").attr("fill").stringf(function(d,i) {
			return color(i / (d3.Stack.n - 1));
		}).attr("class").string("layer");
		var bars = layers.selectAll("g.bar").dataf(function(d,i) {
			return d;
		}).enter().append("svg:g").attr("class").string("bar").attr("transform").stringf(function(d,i) {
			return "translate(" + d3.Stack.x(d) + ",0)";
		});
		var t = bars.append("svg:rect").attr("width")["float"](d3.Stack.x({ x : .9, y : 0.0, y0 : 0.0})).attr("x")["float"](0).attr("y")["float"](d3.Stack.h).attr("height")["float"](0).transition().delay(function(n,i) {
			return i * 10;
		});
		t.attr("y").floatf(function(d,i) {
			return d3.Stack.y1(d);
		});
		t.attr("height").floatf(function(d,i) {
			return d3.Stack.y0(d) - d3.Stack.y1(d);
		});
		var labels = vis.selectAll("text.label").data(this.data[0]).enter().append("svg:text").attr("class").string("label").attr("x").floatf(d3.Stack.x).attr("y")["float"](d3.Stack.h + 6).attr("dx")["float"](d3.Stack.x({ x : .45, y : 0.0, y0 : 0.0})).attr("dy").string(".71em").attr("text-anchor").string("middle").text().floatf(function(d,i) {
			return i;
		});
		vis.append("svg:line").attr("x1")["float"](0).attr("x2")["float"](d3.Stack.w - d3.Stack.x({ x : .1, y : 0.0, y0 : 0.0})).attr("y1")["float"](d3.Stack.h).attr("y2")["float"](d3.Stack.h);
	}
	,current: null
	,click: function(d,i) {
		if(null == this.current || Reflect.compareMethods(this.current,this.transitionStack.$bind(this))) this.current = this.transitionGroup.$bind(this); else this.current = this.transitionStack.$bind(this);
		this.current.apply(this,[]);
	}
	,transitionGroup: function() {
		var t = this.container.selectAllData("g.layer rect").transition().duration(null,500).delay(function(d,i) {
			return i % d3.Stack.m * 10;
		});
		t.attr("x").floatf(function(d,i) {
			return d3.Stack.x({ x : .9 * ~~(i / d3.Stack.m) / d3.Stack.n, y : 0.0, y0 : 0.0});
		});
		t.attr("width")["float"](d3.Stack.x({ x : .9 / d3.Stack.n, y : 0.0, y0 : 0.0}));
		t.endNode(this.transitionGroupEnd.$bind(this));
	}
	,transitionStack: function() {
		var t = this.container.selectAllData("g.layer rect").transition().duration(null,500).delay(function(d,i) {
			return i % d3.Stack.m * 10;
		});
		t.attr("y").floatf(function(d,i) {
			return d3.Stack.y1(d);
		});
		t.attr("height").floatf(function(d,i) {
			return d3.Stack.y0(d) - d3.Stack.y1(d);
		});
		t.endNode(this.transitionStackEnd.$bind(this));
	}
	,transitionGroupEnd: function(d,i) {
		var t = thx.js.Dom.selectNodeData(d).transition().duration(null,500);
		t.attr("y").floatf(function(d1,i1) {
			return d3.Stack.h - d3.Stack.y2(d1);
		});
		t.attr("height").floatf(function(d1,i1) {
			return d3.Stack.y2(d1);
		});
	}
	,transitionStackEnd: function(d,i) {
		thx.js.Dom.selectNode(d).transition().duration(null,500).attr("x")["float"](0).attr("width")["float"](d3.Stack.x({ x : .9, y : 0.0, y0 : 0.0}));
	}
	,description: function() {
		return "Stacked bars";
	}
	,__class__: d3.Stack
});
thx.csv.CsvEncoder = $hxClasses["thx.csv.CsvEncoder"] = function(delimiter,nulltoempty,newline) {
	if(newline == null) newline = "\n";
	if(nulltoempty == null) nulltoempty = true;
	if(delimiter == null) delimiter = ",";
	this.delimiter = delimiter;
	this.nulltoempty = nulltoempty;
	this.newline = newline;
	this.re = new EReg("(" + thx.text.ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|\")","");
}
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
thx.data.ValueEncoder = $hxClasses["thx.data.ValueEncoder"] = function(handler) {
	this.handler = handler;
}
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
thx.svg.LineInterpolator = $hxClasses["thx.svg.LineInterpolator"] = { __ename__ : ["thx","svg","LineInterpolator"], __constructs__ : ["Linear","StepBefore","StepAfter","Basis","BasisOpen","BasisClosed","Cardinal","CardinalOpen","CardinalClosed","Monotone"] }
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
thx.svg.LineInterpolator.BasisOpen = ["BasisOpen",4];
thx.svg.LineInterpolator.BasisOpen.toString = $estr;
thx.svg.LineInterpolator.BasisOpen.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.BasisClosed = ["BasisClosed",5];
thx.svg.LineInterpolator.BasisClosed.toString = $estr;
thx.svg.LineInterpolator.BasisClosed.__enum__ = thx.svg.LineInterpolator;
thx.svg.LineInterpolator.Cardinal = function(tension) { var $x = ["Cardinal",6,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.CardinalOpen = function(tension) { var $x = ["CardinalOpen",7,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.CardinalClosed = function(tension) { var $x = ["CardinalClosed",8,tension]; $x.__enum__ = thx.svg.LineInterpolator; $x.toString = $estr; return $x; }
thx.svg.LineInterpolator.Monotone = ["Monotone",9];
thx.svg.LineInterpolator.Monotone.toString = $estr;
thx.svg.LineInterpolator.Monotone.__enum__ = thx.svg.LineInterpolator;
d3.Streams = $hxClasses["d3.Streams"] = function() { }
d3.Streams.__name__ = ["d3","Streams"];
d3.Streams.bump = function(a,m) {
	var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
	var _g = 0;
	while(_g < m) {
		var i = _g++;
		var w = (i / m - y) * z;
		a[i] += x * Math.exp(-w * w);
	}
}
d3.Streams.layers = function(n,m,o) {
	if(o == null) o = 0.0;
	return Ints.range(n).map(function(_,_1) {
		var a = [];
		var _g = 0;
		while(_g < m) {
			var i = _g++;
			a[i] = o + o * Math.random();
		}
		var _g = 0;
		while(_g < 5) {
			var i = _g++;
			d3.Streams.bump(a,m);
		}
		return a.map(d3.Streams.streamIndex);
	});
}
d3.Streams.waves = function(n,m) {
	return Ints.range(n).map(function(i,_) {
		return Ints.range(m).map(function(j,_1) {
			var x = 20 * j / m - i / 3;
			return 2 * x * Math.exp(-0.5 * x);
		}).map(d3.Streams.streamIndex);
	});
}
d3.Streams.streamIndex = function(d,i) {
	return { x : .0 + i, y : Math.max(0.0,d)};
}
d3.Streams.prototype = {
	__class__: d3.Streams
}
thx.js.AccessStyle = $hxClasses["thx.js.AccessStyle"] = function(name,selection) {
	thx.js.Access.call(this,selection);
	this.name = name;
}
thx.js.AccessStyle.__name__ = ["thx","js","AccessStyle"];
thx.js.AccessStyle.getComputedStyleValue = function(node,key) {
	return window.getComputedStyle(node,null).getPropertyValue(key);
}
thx.js.AccessStyle.setStyleProperty = function(node,key,value,priority) {
	node.style.setProperty(key,value,null == priority?"":priority);
}
thx.js.AccessStyle.removeStyleProperty = function(node,key) {
	node.style.removeProperty(key);
}
thx.js.AccessStyle.__super__ = thx.js.Access;
thx.js.AccessStyle.prototype = $extend(thx.js.Access.prototype,{
	name: null
	,get: function() {
		var me = this;
		return this.selection.firstNode(function(node) {
			return window.getComputedStyle(node,null).getPropertyValue(me.name);
		});
	}
	,getFloat: function() {
		var v = this.get();
		if(thx.js.AccessStyle.refloat.match(v)) return Std.parseFloat(thx.js.AccessStyle.refloat.matched(1)); else return Math.NaN;
	}
	,remove: function() {
		var me = this;
		this.selection.eachNode(function(node,i) {
			node.style.removeProperty(me.name);
		});
		return this.selection;
	}
	,string: function(v,priority) {
		var me = this;
		this.selection.eachNode(function(node,i) {
			node.style.setProperty(me.name,v,null == priority?"":priority);
		});
		return this.selection;
	}
	,'float': function(v,priority) {
		var me = this;
		this.selection.eachNode(function(node,i) {
			node.style.setProperty(me.name,v,null == priority?"":priority);
		});
		return this.selection;
	}
	,color: function(v,priority) {
		var me = this;
		var s = v.toRgbString();
		this.selection.eachNode(function(node,i) {
			node.style.setProperty(me.name,s,null == priority?"":priority);
		});
		return this.selection;
	}
	,__class__: thx.js.AccessStyle
});
thx.js.AccessDataStyle = $hxClasses["thx.js.AccessDataStyle"] = function(name,selection) {
	thx.js.AccessStyle.call(this,name,selection);
}
thx.js.AccessDataStyle.__name__ = ["thx","js","AccessDataStyle"];
thx.js.AccessDataStyle.__super__ = thx.js.AccessStyle;
thx.js.AccessDataStyle.prototype = $extend(thx.js.AccessStyle.prototype,{
	stringf: function(v,priority) {
		var me = this;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(s == null) node.style.removeProperty(me.name); else node.style.setProperty(me.name,s,null == priority?"":priority);
		});
		return this.selection;
	}
	,floatf: function(v,priority) {
		var me = this;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(s == null) node.style.removeProperty(me.name); else node.style.setProperty(me.name,"" + s,null == priority?"":priority);
		});
		return this.selection;
	}
	,colorf: function(v,priority) {
		var me = this;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(s == null) node.style.removeProperty(me.name); else node.style.setProperty(me.name,"" + s.toRgbString(),null == priority?"":priority);
		});
		return this.selection;
	}
	,data: function() {
		return this.stringf(function(d,_) {
			return "" + d;
		});
	}
	,__class__: thx.js.AccessDataStyle
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
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
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
thx.math.EaseMode = $hxClasses["thx.math.EaseMode"] = { __ename__ : ["thx","math","EaseMode"], __constructs__ : ["EaseIn","EaseOut","EaseInEaseOut","EaseOutEaseIn"] }
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
thx.js.AccessClassed = $hxClasses["thx.js.AccessClassed"] = function(selection) {
	thx.js.Access.call(this,selection);
}
thx.js.AccessClassed.__name__ = ["thx","js","AccessClassed"];
thx.js.AccessClassed.getRe = function(name) {
	return new EReg("(^|\\s+)" + thx.text.ERegs.escapeERegChars(name) + "(\\s+|$)","g");
}
thx.js.AccessClassed.__super__ = thx.js.Access;
thx.js.AccessClassed.prototype = $extend(thx.js.Access.prototype,{
	toggle: function(name) {
		if(this.exists(name)) this.remove(name); else this.add(name);
		return this.selection;
	}
	,exists: function(name) {
		return this.selection.firstNode(function(node) {
			var list = node.classList;
			if(null != list) return list.contains(name);
			var cls = node.className;
			var re = new EReg("(^|\\s+)" + thx.text.ERegs.escapeERegChars(name) + "(\\s+|$)","g");
			var bv = cls.baseVal;
			return re.match(null != bv?bv:cls);
		});
	}
	,remove: function(name) {
		this.selection.eachNode((function(f,a1) {
			return function(a2,a3) {
				return f(a1,a2,a3);
			};
		})(this._remove.$bind(this),name));
		return this.selection;
	}
	,_remove: function(name,node,i) {
		var list = node.classList;
		if(null != list) {
			list.remove(name);
			return;
		}
		var cls = node.className, clsb = null != cls.baseVal, clsv = clsb?cls.baseVal:cls;
		var re = new EReg("(^|\\s+)" + thx.text.ERegs.escapeERegChars(name) + "(\\s+|$)","g");
		clsv = Strings.collapse(re.replace(clsv," "));
		if(clsb) cls.baseVal = clsv; else node.className = clsv;
	}
	,add: function(name) {
		this.selection.eachNode((function(f,a1) {
			return function(a2,a3) {
				return f(a1,a2,a3);
			};
		})(this._add.$bind(this),name));
		return this.selection;
	}
	,_add: function(name,node,i) {
		var list = node.classList;
		if(null != list) {
			list.add(name);
			return;
		}
		var cls = node.className, clsb = null != cls.baseVal, clsv = clsb?cls.baseVal:cls;
		var re = new EReg("(^|\\s+)" + thx.text.ERegs.escapeERegChars(name) + "(\\s+|$)","g");
		if(!re.match(clsv)) {
			clsv = Strings.collapse(clsv + " " + name);
			if(clsb) cls.baseVal = clsv; else node.className = clsv;
		}
	}
	,get: function() {
		var node = this.selection.node(), list = node.classList;
		if(null != list) return Ints.range(list.length).map(function(_,i) {
			return list.item(i);
		}).join(" ");
		var cls = node.className, clsb = null != cls.baseVal;
		if(clsb) return cls.baseVal; else return cls;
	}
	,__class__: thx.js.AccessClassed
});
thx.js.AccessDataClassed = $hxClasses["thx.js.AccessDataClassed"] = function(selection) {
	thx.js.AccessClassed.call(this,selection);
}
thx.js.AccessDataClassed.__name__ = ["thx","js","AccessDataClassed"];
thx.js.AccessDataClassed.__super__ = thx.js.AccessClassed;
thx.js.AccessDataClassed.prototype = $extend(thx.js.AccessClassed.prototype,{
	removef: function(v) {
		var f = this._remove.$bind(this);
		this.selection.eachNode(function(node,i) {
			var c = v(Reflect.field(node,"__data__"),i);
			if(null != c) f(c,node,i);
		});
		return this.selection;
	}
	,addf: function(v) {
		var f = this._add.$bind(this);
		this.selection.eachNode(function(node,i) {
			var c = v(Reflect.field(node,"__data__"),i);
			if(null != c) f(c,node,i);
		});
		return this.selection;
	}
	,__class__: thx.js.AccessDataClassed
});
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
}
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
d3.Area = $hxClasses["d3.Area"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Area.__name__ = ["d3","Area"];
d3.Area.__super__ = d3.Example;
d3.Area.prototype = $extend(d3.Example.prototype,{
	runExample: function() {
		var data = Ints.range(20).map(function(_,i) {
			return { x : i / 19, y : (Math.sin(i / 3) + 1) / 2};
		});
		var w = 450.0, h = 275.0, p = 20, x = new thx.math.scale.Linear().domain([0.0,1]).range([0.0,w]), y = new thx.math.scale.Linear().domain([0.0,1]).range([h,0.0]);
		var vis = this.container.append("svg:svg").attr("class").string("areaex").data([data]).update().attr("width")["float"](w + p * 2).attr("height")["float"](h + p * 2).append("svg:g").attr("transform").string("translate(" + p + "," + p + ")");
		var rules = vis.selectAll("g.rule").data(x.ticks()).enter().append("svg:g").attr("class").string("rule");
		rules.append("svg:line").attr("x1").floatf(x.scale.$bind(x)).attr("x2").floatf(x.scale.$bind(x)).attr("y1")["float"](0).attr("y2")["float"](h - 1);
		rules.append("svg:line").attr("class").stringf(function(d,i) {
			return d != 0?null:"axis";
		}).attr("y1").floatf(y.scale.$bind(y)).attr("y2").floatf(y.scale.$bind(y)).attr("x1")["float"](0).attr("x2")["float"](w + 1);
		rules.append("svg:text").attr("x").floatf(x.scale.$bind(x)).attr("y")["float"](h + 3).attr("dy").string(".71em").attr("text-anchor").string("middle").text().stringf(x.tickFormat.$bind(x));
		rules.append("svg:text").attr("y").floatf(y.scale.$bind(y)).attr("x")["float"](-3).attr("dy").string(".35em").attr("text-anchor").string("end").text().stringf(y.tickFormat.$bind(y));
		vis.append("svg:path").attr("class").string("area").attr("d").stringf(($_=thx.svg.Area.pointObjectXY().x(function(d,_) {
			return x.scale(d.x);
		}).y0(function(_,_1) {
			return h - 1;
		}).y1(function(d,_) {
			return y.scale(d.y);
		}),$_.shape.$bind($_)));
		vis.append("svg:path").attr("class").string("line").attr("d").stringf(($_=thx.svg.Line.pointObject().x(function(d,_) {
			return x.scale(d.x);
		}).y(function(d,_) {
			return y.scale(d.y);
		}),$_.shape.$bind($_)));
		vis.selectAll("circle.area").data(data).enter().append("svg:circle").attr("class").string("area").attr("cx").floatf(function(d,_) {
			return x.scale(d.x);
		}).attr("cy").floatf(function(d,_) {
			return y.scale(d.y);
		}).attr("r")["float"](3.5);
	}
	,description: function() {
		return "Area Chart from Math.sin() values. Not interactive.";
	}
	,__class__: d3.Area
});
thx.color.Categories = $hxClasses["thx.color.Categories"] = function() { }
thx.color.Categories.__name__ = ["thx","color","Categories"];
thx.color.Categories.prototype = {
	__class__: thx.color.Categories
}
if(!thx.text) thx.text = {}
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
thx.languages.En = $hxClasses["thx.languages.En"] = function() {
	this.name = "en";
	this.english = "English";
	this["native"] = "English";
	this.iso2 = "en";
	this.iso3 = "eng";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
}
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
d3.Chord = $hxClasses["d3.Chord"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.Chord.__name__ = ["d3","Chord"];
d3.Chord.__super__ = d3.Example;
d3.Chord.prototype = $extend(d3.Example.prototype,{
	update: null
	,fade: function(opacity) {
		var me = this;
		return function(d,i) {
			me.update.filter(function(d1,_) {
				return d1.source.index != i && d1.target.index != i;
			}).transition().attr("opacity")["float"](opacity);
		};
	}
	,groupTicks: function(d,i) {
		var k = (d.endAngle - d.startAngle) / d.value;
		return Floats.range(0,d.value,1000).map(function(v,i1) {
			return { angle : v * k + d.startAngle, label : 0 != i1 % 5?null:v / 1000 + "k"};
		});
	}
	,runExample: function() {
		var chord = new thx.geom.layout.Chord().padding(0.05).sortSubgroups(Floats.compare).matrix([[11975,5871,8916,2868],[1951,10048,2060,6171],[8010,16145,8090,8045],[1013,990,940,6907]]);
		var w = 600, h = 600, r0 = Math.min(w,h) * .41, r1 = r0 * 1.1;
		var fill = new thx.math.scale.Ordinal().domain(Ints.range(4)).range(["#000000","#FFDD89","#957244","#F26223"]);
		var data = chord.groups();
		var svg = this.container.append("svg:svg").attr("width")["float"](w).attr("height")["float"](h).append("svg:g").attr("transform").string("translate(" + w / 2 + "," + h / 2 + ")");
		var choice = svg.append("svg:g").selectAll("path").data(data);
		choice.enter().append("svg:path").attr("fill").stringf(function(d,i) {
			return thx.color.Colors.parse(fill.scale(d.index)).toRgbString();
		}).attr("stroke").stringf(function(d,i) {
			return thx.color.Colors.parse(fill.scale(d.index)).toRgbString();
		}).attr("d").stringf(($_=thx.svg.Arc.fromAngleObject().innerRadius(r0).outerRadius(r1),$_.shape.$bind($_))).on("mouseover",this.fade(.1)).on("mouseout",this.fade(1));
		var ticks = svg.append("svg:g").selectAll("g").data(chord.groups()).enter().append("svg:g").selectAll("g").dataf(this.groupTicks.$bind(this)).enter().append("svg:g").attr("transform").stringf(function(d,i) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + r1 + ",0)";
		});
		ticks.append("svg:line").attr("x1")["float"](1).attr("y1")["float"](0).attr("x2")["float"](5).attr("y2")["float"](0).attr("stroke").string("#000");
		ticks.append("svg:text").attr("x")["float"](8).attr("dy").string(".35em").attr("text-anchor").stringf(function(d,i) {
			return d.angle > Math.PI?"end":null;
		}).attr("transform").stringf(function(d,i) {
			return d.angle > Math.PI?"rotate(180)translate(-16)":null;
		}).text().stringf(function(d,i) {
			return d.label;
		});
		var chords = chord.chords();
		svg.append("svg:g").attr("class").string("chord").selectAll("path").data(chords).enter().append("svg:path").attr("fill").stringf(function(d,i) {
			return fill.scale(d.target.index);
		}).attr("d").stringf(($_=thx.svg.Chord.pathObject().radius(r0),$_.shape.$bind($_))).attr("opacity")["float"](1);
		this.update = svg.selectAll("g.chord path").data(chords).update();
	}
	,description: function() {
		return "Chord Diagram from fixed values. Move the mouse over the circle permiter.";
	}
	,__class__: d3.Chord
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
	case 5:
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
	case 6:
		var tension = $e[2];
		if(null == tension) tension = .7;
		if(points.length < 3) return thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear); else return points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents(points,tension));
		break;
	case 7:
		var tension = $e[2];
		return points.length < 4?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[1][0] + "," + points[1][1] + thx.svg.LineInternals._lineCardinalTangents(points,tension);
	case 8:
		var tension = $e[2];
		if(null == tension) tension = .7;
		return points.length < 3?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents([points[points.length - 2]].concat(points).concat([points[1]]),tension));
	case 9:
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
thx.math.scale.Linear = $hxClasses["thx.math.scale.Linear"] = function() {
	thx.math.scale.NumericScale.call(this);
	this.m = 10;
}
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
thx.math.scale.Ordinal = $hxClasses["thx.math.scale.Ordinal"] = function() {
	this._domain = [];
	this._range = [];
	this.rangeBand = 0.0;
}
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
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 111, className : "Dates", methodName : "snap"});
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
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 136, className : "Dates", methodName : "snap"});
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
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 162, className : "Dates", methodName : "snap"});
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
		throw new thx.error.Error("unknown week day '{0}'",null,day,{ fileName : "Dates.hx", lineNumber : 188, className : "Dates", methodName : "snapToWeekDay"});
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
}
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
thx.js.behavior.ZoomEvent = $hxClasses["thx.js.behavior.ZoomEvent"] = function(scale,tx,ty) {
	this.scale = scale;
	this.tx = tx;
	this.ty = ty;
}
thx.js.behavior.ZoomEvent.__name__ = ["thx","js","behavior","ZoomEvent"];
thx.js.behavior.ZoomEvent.prototype = {
	scale: null
	,tx: null
	,ty: null
	,toString: function() {
		return "ZoomEvent {scale: " + this.scale + ", tx: " + this.tx + ", ty: " + this.ty + "}";
	}
	,__class__: thx.js.behavior.ZoomEvent
}
d3.WebkitTransition = $hxClasses["d3.WebkitTransition"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.WebkitTransition.__name__ = ["d3","WebkitTransition"];
d3.WebkitTransition.__super__ = d3.Example;
d3.WebkitTransition.prototype = $extend(d3.Example.prototype,{
	transform: null
	,runExample: function() {
		var container = this.container;
		container.append("div").attr("id").string("cells");
		var n = 10;
		container.select("#cells").selectAll("div").data(Ints.range(n)).enter().append("div").attr("class").string("cell").style("left").stringf(function(d,i) {
			return i * 30 + "px";
		});
		this.transform = function() {
			container.selectAll(".cell").data(Ints.range(n).map(function(d,i) {
				return Math.random();
			})).update().style("top").stringf(function(d,i) {
				return (1 - d) * 300 + "px";
			}).style("background-color").stringf(function(d,i) {
				return "rgb(" + Std["int"](d * 255) + ",50,100)";
			}).text().floatf(function(d,i) {
				return Std["int"](d * 100);
			});
		};
		this.transform();
		js.Lib.window.addEventListener("keypress",this.transform,false);
	}
	,destroyExample: function() {
		js.Lib.window.removeEventListener("keypress",this.transform,false);
	}
	,description: function() {
		return "Bar charts from random data. On Webkit browsers the bars are animated using CSS animation. Press a key to create a new set of random data.";
	}
	,__class__: d3.WebkitTransition
});
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
}
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
d3.ZoomPan = $hxClasses["d3.ZoomPan"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.ZoomPan.__name__ = ["d3","ZoomPan"];
d3.ZoomPan.__super__ = d3.Example;
d3.ZoomPan.prototype = $extend(d3.Example.prototype,{
	size: null
	,padding: null
	,x: null
	,y: null
	,svg: null
	,srcx: null
	,srcy: null
	,tx: function(d,_) {
		return "translate(" + this.x.scale(d) + ",0)";
	}
	,ty: function(d,_) {
		return "translate(0," + this.y.scale(d) + ")";
	}
	,stroke: function(d,_) {
		return d != 0.0 && d != null?"#ccc":"#666";
	}
	,runExample: function() {
		this.size = [0.0 + this.stageWidth(),500];
		this.padding = [4.0,4.0,20.0,40.0];
		this.x = new thx.math.scale.Linear().domain([-1.42,1.42]).range([0.0,this.size[0]]);
		this.srcx = this.x.getDomain();
		this.y = new thx.math.scale.Linear().domain([1.0,-1.0]).range([0,this.size[1]]);
		this.srcy = this.y.getDomain();
		var me = this;
		this.svg = this.container.append("svg:svg").attr("width")["float"](this.size[0] + this.padding[3] + this.padding[1]).attr("height")["float"](this.size[1] + this.padding[0] + this.padding[2]).attr("pointer-events").string("all").eachNode(function(n,i) {
			(new thx.js.behavior.Zoom().zoom(me.redraw.$bind(me)))(n);
		}).onNode("zoom",this.redraw.$bind(this)).append("svg:g").attr("transform").string("translate(" + this.padding[3] + "," + this.padding[0] + ")");
		this.svg.append("svg:rect").attr("width")["float"](this.size[0]).attr("height")["float"](this.size[1]).attr("stroke").string("#ccc").attr("fill").string("none");
		this.redraw();
	}
	,redraw: function(_,_1) {
		if(null != thx.js.behavior.Zoom.event) {
			var e = thx.js.behavior.Zoom.event;
			this.x.transform(e.scale,e.tx,this.srcx[0],this.srcx[1]);
			this.y.transform(e.scale,e.ty,this.srcy[0],this.srcy[1]);
		}
		var fx = ($_=this.x,$_.tickFormat.$bind($_)), fy = ($_=this.y,$_.tickFormat.$bind($_));
		var gx = this.svg.selectAll("g.x").data(this.x.ticks(),fx).update().attr("transform").stringf(this.tx.$bind(this));
		gx.select("text").text().stringf(fx);
		var gxe = gx.enter().insert("svg:g",null,"rect").attr("class").string("x").attr("transform").stringf(this.tx.$bind(this));
		gxe.append("svg:line").attr("stroke").stringf(this.stroke.$bind(this)).attr("y1")["float"](0).attr("y2")["float"](this.size[1]);
		gxe.append("svg:text").attr("y")["float"](this.size[1]).attr("dy").string("1em").attr("text-anchor").string("middle").text().stringf(fx);
		gx.exit().remove();
		var gy = this.svg.selectAll("g.y").data(this.y.ticks(),fy).update().attr("transform").stringf(this.ty.$bind(this));
		gy.select("text").text().stringf(fy);
		var gye = gy.enter().insert("svg:g",null,"rect").attr("class").string("y").attr("transform").stringf(this.ty.$bind(this));
		gye.append("svg:line").attr("stroke").stringf(this.stroke.$bind(this)).attr("x1")["float"](0).attr("x2")["float"](this.size[0]);
		gye.append("svg:text").attr("x")["float"](-3).attr("dy").string(".35em").attr("text-anchor").string("end").text().stringf(fy);
		gy.exit().remove();
	}
	,description: function() {
		return "Drag and zoom with your mouse";
	}
	,__class__: d3.ZoomPan
});
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
thx.js.BaseTransition = $hxClasses["thx.js.BaseTransition"] = function(selection) {
	this.selection = selection;
	var tid = this._transitionId = thx.js.BaseTransition._inheritid > 0?thx.js.BaseTransition._inheritid:++thx.js.BaseTransition._id;
	this._tweens = new Hash();
	this._interpolators = [];
	this._remove = false;
	this._stage = [];
	this._delay = [];
	this._duration = [];
	this._ease = thx.math.Ease.mode(thx.math.EaseMode.EaseInEaseOut,thx.math.Equations.cubic);
	this._step = this.step.$bind(this);
	selection.eachNode(function(n,_) {
		if(Reflect.hasField(n,"__transition__")) Reflect.field(n,"__transition__").owner = tid; else n["__transition__"] = { owner : tid};
	});
	this.delay(null,0);
	this.duration(null,250);
}
thx.js.BaseTransition.__name__ = ["thx","js","BaseTransition"];
thx.js.BaseTransition.prototype = {
	_transitionId: null
	,_tweens: null
	,_interpolators: null
	,_remove: null
	,_stage: null
	,_delay: null
	,_duration: null
	,_durationMax: null
	,_ease: null
	,_step: null
	,_start: null
	,_end: null
	,selection: null
	,step: function(elapsed) {
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
	,startNode: function(f) {
		this._start = f;
		return this._this();
	}
	,endNode: function(f) {
		this._end = f;
		return this._this();
	}
	,stop: function() {
		var k = -1, me = this;
		this.selection.eachNode(function(n,i) {
			me._stage[++k] = 2;
			Reflect.deleteField(n,"__transition__");
		});
		return this._this();
	}
	,delay: function(f,v) {
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
	,duration: function(f,v) {
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
	,ease: function(f,easemode) {
		this._ease = thx.math.Ease.mode(easemode,f);
		return this._this();
	}
	,remove: function(v) {
		if(v == null) v = true;
		this._remove = v;
		return this._this();
	}
	,select: function(selector) {
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
	,selectAll: function(selector) {
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
	,createTransition: function(selection) {
		return (function($this) {
			var $r;
			throw new thx.error.AbstractMethod({ fileName : "Transition.hx", lineNumber : 243, className : "thx.js.BaseTransition", methodName : "createTransition"});
			return $r;
		}(this));
	}
	,_this: function() {
		return this;
	}
	,__class__: thx.js.BaseTransition
}
thx.js.UnboundTransition = $hxClasses["thx.js.UnboundTransition"] = function(selection) {
	thx.js.BaseTransition.call(this,selection);
}
thx.js.UnboundTransition.__name__ = ["thx","js","UnboundTransition"];
thx.js.UnboundTransition.__super__ = thx.js.BaseTransition;
thx.js.UnboundTransition.prototype = $extend(thx.js.BaseTransition.prototype,{
	text: function() {
		return new thx.js.AccessTweenText(this,this._tweens);
	}
	,style: function(name) {
		return new thx.js.AccessTweenStyle(name,this,this._tweens);
	}
	,attr: function(name) {
		return new thx.js.AccessTweenAttribute(name,this,this._tweens);
	}
	,createTransition: function(selection) {
		return new thx.js.UnboundTransition(selection);
	}
	,__class__: thx.js.UnboundTransition
});
thx.js.BoundTransition = $hxClasses["thx.js.BoundTransition"] = function(selection) {
	thx.js.BaseTransition.call(this,selection);
}
thx.js.BoundTransition.__name__ = ["thx","js","BoundTransition"];
thx.js.BoundTransition.__super__ = thx.js.BaseTransition;
thx.js.BoundTransition.prototype = $extend(thx.js.BaseTransition.prototype,{
	text: function() {
		return new thx.js.AccessDataTweenText(this,this._tweens);
	}
	,style: function(name) {
		return new thx.js.AccessDataTweenStyle(name,this,this._tweens);
	}
	,attr: function(name) {
		return new thx.js.AccessDataTweenAttribute(name,this,this._tweens);
	}
	,start: function(f) {
		return this.startNode(function(n,i) {
			f(Reflect.field(n,"__data__"),i);
		});
	}
	,end: function(f) {
		return this.endNode(function(n,i) {
			f(Reflect.field(n,"__data__"),i);
		});
	}
	,createTransition: function(selection) {
		return new thx.js.BoundTransition(selection);
	}
	,__class__: thx.js.BoundTransition
});
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
			buf.add("" + Std["int"](date.getTime() / 1000));
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
thx.geom.layout.Pie = $hxClasses["thx.geom.layout.Pie"] = function() {
	this._startAngle = function(_,_1) {
		return 0.0;
	};
	this._endAngle = function(_,_1) {
		return 6.283185307179586477;
	};
	this._sort = null;
	this._value = function(d,_) {
		return Number(d);
	};
}
thx.geom.layout.Pie.__name__ = ["thx","geom","layout","Pie"];
thx.geom.layout.Pie.prototype = {
	_startAngle: null
	,_endAngle: null
	,_sort: null
	,_value: null
	,pie: function(data,i) {
		var a = this._startAngle(data,i), k = this._endAngle(data,i) - a;
		var index = Ints.range(data.length);
		if(this._sort != null) {
			var s = this._sort;
			index.sort(function(i1,j) {
				return s(data[i1],data[j]);
			});
		}
		var values = data.map(this._value);
		k /= values.reduce(function(p,d,_) {
			return p + d;
		},0.0);
		if(!Math.isFinite(k)) k = 0;
		var d;
		var arcs = index.map(function(_,i1) {
			d = values[i1];
			return { value : d, startAngle : a, endAngle : a += d * k};
		});
		return data.map(function(d1,i1) {
			return arcs[index[i1]];
		});
	}
	,getStartAngle: function() {
		return this._startAngle;
	}
	,startAngle: function(v) {
		return this.startAnglef(function(_,_1) {
			return v;
		});
	}
	,startAnglef: function(v) {
		this._startAngle = v;
		return this;
	}
	,getEndAngle: function() {
		return this._endAngle;
	}
	,endAngle: function(v) {
		return this.endAnglef(function(_,_1) {
			return v;
		});
	}
	,endAnglef: function(v) {
		this._endAngle = v;
		return this;
	}
	,getSort: function() {
		return this._sort;
	}
	,sort: function(v) {
		this._sort = v;
		return this;
	}
	,getValue: function() {
		return this._value;
	}
	,valuef: function(v) {
		this._value = v;
		return this;
	}
	,__class__: thx.geom.layout.Pie
}
d3.NestedKey = $hxClasses["d3.NestedKey"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.NestedKey.__name__ = ["d3","NestedKey"];
d3.NestedKey.__super__ = d3.Example;
d3.NestedKey.prototype = $extend(d3.Example.prototype,{
	_refresh: null
	,runExample: function() {
		var data = Ints.range(10).map(function(_,_1) {
			return Ints.range(10).map(function(_2,_3) {
				return Std.random(360);
			});
		}), container = this.container;
		var table = container.append("table").attr("class").string("nestedkey");
		var transform = function() {
			var t = table.selectAll("tr").data(data);
			t.enter().append("tr").selectAll("td").selfData().enter().append("td");
			t.update().selectAll("td").selfData().update().style("background-color").stringf(function(d,i) {
				return new thx.color.Hsl(d,1,.5).toHslString();
			}).text().data();
		};
		this._refresh = function(_) {
			var _g = 0;
			while(_g < 10) {
				var i = _g++;
				var _g1 = 0;
				while(_g1 < 10) {
					var j = _g1++;
					data[i][j] = (data[i][j] + 1) % 360;
				}
			}
			transform();
		};
		transform();
		js.Lib.window.addEventListener("keypress",this._refresh,false);
	}
	,destroyExample: function() {
		js.Lib.window.removeEventListener("keypress",this._refresh,false);
	}
	,description: function() {
		return "Html table filled with data from a 2 dimensional array. Press any key to increment the values.";
	}
	,__class__: d3.NestedKey
});
thx.js.AccessTweenStyle = $hxClasses["thx.js.AccessTweenStyle"] = function(name,transition,tweens) {
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
}
thx.js.AccessTweenStyle.__name__ = ["thx","js","AccessTweenStyle"];
thx.js.AccessTweenStyle.__super__ = thx.js.AccessTween;
thx.js.AccessTweenStyle.prototype = $extend(thx.js.AccessTween.prototype,{
	name: null
	,floatNodef: function(f,priority) {
		return this.floatTweenNodef(this.transitionFloatTweenf(f),priority);
	}
	,'float': function(value,priority) {
		return this.floatTweenNodef(this.transitionFloatTween(value),priority);
	}
	,floatTweenNodef: function(tween,priority) {
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(d,i,Std.parseFloat(window.getComputedStyle(d,null).getPropertyValue(name)));
			return function(t) {
				d.style.setProperty(name,"" + f(t),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,stringNodef: function(f,priority) {
		return this.stringTweenNodef(this.transitionStringTweenf(f),priority);
	}
	,string: function(value,priority) {
		return this.stringTweenNodef(this.transitionStringTween(value),priority);
	}
	,stringTweenNodef: function(tween,priority) {
		if(null == priority) priority = null;
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(d,i,window.getComputedStyle(d,null).getPropertyValue(name));
			return function(t) {
				d.style.setProperty(name,f(t),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,colorNodef: function(f,priority) {
		return this.colorTweenNodef(this.transitionColorTweenf(f),priority);
	}
	,color: function(value,priority) {
		return this.colorTweenNodef(this.transitionColorTween(thx.color.Colors.parse(value)),priority);
	}
	,colorTweenNodef: function(tween,priority) {
		if(null == priority) priority = null;
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(d,i,thx.color.Colors.parse(window.getComputedStyle(d,null).getPropertyValue(name)));
			return function(t) {
				d.style.setProperty(name,f(t).toRgbString(),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,__class__: thx.js.AccessTweenStyle
});
thx.js.AccessDataTweenStyle = $hxClasses["thx.js.AccessDataTweenStyle"] = function(name,transition,tweens) {
	thx.js.AccessTweenStyle.call(this,name,transition,tweens);
}
thx.js.AccessDataTweenStyle.__name__ = ["thx","js","AccessDataTweenStyle"];
thx.js.AccessDataTweenStyle.__super__ = thx.js.AccessTweenStyle;
thx.js.AccessDataTweenStyle.prototype = $extend(thx.js.AccessTweenStyle.prototype,{
	floatf: function(f,priority) {
		return this.floatTweenNodef(this.transitionFloatTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}),priority);
	}
	,floatTweenf: function(tween,priority) {
		if(null == priority) priority = null;
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(Reflect.field(d,"__data__"),i,Std.parseFloat(window.getComputedStyle(d,null).getPropertyValue(name)));
			return function(t) {
				d.style.setProperty(name,"" + f(t),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,stringf: function(f,priority) {
		return this.stringTweenNodef(this.transitionStringTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}),priority);
	}
	,stringTweenf: function(tween,priority) {
		if(null == priority) priority = null;
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(Reflect.field(d,"__data__"),i,window.getComputedStyle(d,null).getPropertyValue(name));
			return function(t) {
				d.style.setProperty(name,f(t),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,colorf: function(f,priority) {
		return this.colorTweenNodef(this.transitionColorTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}),priority);
	}
	,colorTweenf: function(tween,priority) {
		if(null == priority) priority = null;
		var name = this.name;
		var styleTween = function(d,i) {
			var f = tween(Reflect.field(d,"__data__"),i,thx.color.Colors.parse(window.getComputedStyle(d,null).getPropertyValue(name)));
			return function(t) {
				d.style.setProperty(name,f(t).toRgbString(),null == priority?"":priority);
			};
		};
		this.tweens.set("style." + name,styleTween);
		return this.transition;
	}
	,__class__: thx.js.AccessDataTweenStyle
});
thx.js.HostType = $hxClasses["thx.js.HostType"] = { __ename__ : ["thx","js","HostType"], __constructs__ : ["UnknownServer","NodeJs","IE","Firefox","Safari","Chrome","Opera","Unknown"] }
thx.js.HostType.UnknownServer = ["UnknownServer",0];
thx.js.HostType.UnknownServer.toString = $estr;
thx.js.HostType.UnknownServer.__enum__ = thx.js.HostType;
thx.js.HostType.NodeJs = ["NodeJs",1];
thx.js.HostType.NodeJs.toString = $estr;
thx.js.HostType.NodeJs.__enum__ = thx.js.HostType;
thx.js.HostType.IE = function(version) { var $x = ["IE",2,version]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.HostType.Firefox = function(version) { var $x = ["Firefox",3,version]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.HostType.Safari = function(version) { var $x = ["Safari",4,version]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.HostType.Chrome = function(version) { var $x = ["Chrome",5,version]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.HostType.Opera = function(version) { var $x = ["Opera",6,version]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.HostType.Unknown = function(what) { var $x = ["Unknown",7,what]; $x.__enum__ = thx.js.HostType; $x.toString = $estr; return $x; }
thx.js.EnvironmentType = $hxClasses["thx.js.EnvironmentType"] = { __ename__ : ["thx","js","EnvironmentType"], __constructs__ : ["Mobile","Desktop","Server","UnknownEnvironment"] }
thx.js.EnvironmentType.Mobile = ["Mobile",0];
thx.js.EnvironmentType.Mobile.toString = $estr;
thx.js.EnvironmentType.Mobile.__enum__ = thx.js.EnvironmentType;
thx.js.EnvironmentType.Desktop = ["Desktop",1];
thx.js.EnvironmentType.Desktop.toString = $estr;
thx.js.EnvironmentType.Desktop.__enum__ = thx.js.EnvironmentType;
thx.js.EnvironmentType.Server = ["Server",2];
thx.js.EnvironmentType.Server.toString = $estr;
thx.js.EnvironmentType.Server.__enum__ = thx.js.EnvironmentType;
thx.js.EnvironmentType.UnknownEnvironment = ["UnknownEnvironment",3];
thx.js.EnvironmentType.UnknownEnvironment.toString = $estr;
thx.js.EnvironmentType.UnknownEnvironment.__enum__ = thx.js.EnvironmentType;
thx.js.OSType = $hxClasses["thx.js.OSType"] = { __ename__ : ["thx","js","OSType"], __constructs__ : ["Windows","IOs","Android","Mac","Linux","UnknownOs"] }
thx.js.OSType.Windows = function(version) { var $x = ["Windows",0,version]; $x.__enum__ = thx.js.OSType; $x.toString = $estr; return $x; }
thx.js.OSType.IOs = ["IOs",1];
thx.js.OSType.IOs.toString = $estr;
thx.js.OSType.IOs.__enum__ = thx.js.OSType;
thx.js.OSType.Android = ["Android",2];
thx.js.OSType.Android.toString = $estr;
thx.js.OSType.Android.__enum__ = thx.js.OSType;
thx.js.OSType.Mac = ["Mac",3];
thx.js.OSType.Mac.toString = $estr;
thx.js.OSType.Mac.__enum__ = thx.js.OSType;
thx.js.OSType.Linux = ["Linux",4];
thx.js.OSType.Linux.toString = $estr;
thx.js.OSType.Linux.__enum__ = thx.js.OSType;
thx.js.OSType.UnknownOs = ["UnknownOs",5];
thx.js.OSType.UnknownOs.toString = $estr;
thx.js.OSType.UnknownOs.__enum__ = thx.js.OSType;
thx.js.ClientHost = $hxClasses["thx.js.ClientHost"] = function() { }
thx.js.ClientHost.__name__ = ["thx","js","ClientHost"];
thx.js.ClientHost.host = null;
thx.js.ClientHost.environment = null;
thx.js.ClientHost.os = null;
thx.js.ClientHost.isIE = function() {
	return (function($this) {
		var $r;
		switch( (thx.js.ClientHost.host)[1] ) {
		case 2:
			$r = true;
			break;
		default:
			$r = false;
		}
		return $r;
	}(this));
}
thx.js.ClientHost.hostVersion = function() {
	return (function($this) {
		var $r;
		var $e = (thx.js.ClientHost.host);
		switch( $e[1] ) {
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			var v = $e[2];
			$r = v;
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
thx.js.ClientHost.hostString = function() {
	return (function($this) {
		var $r;
		switch( (thx.js.ClientHost.host)[1] ) {
		case 0:
			$r = "unknown_server";
			break;
		case 7:
			$r = "unknown";
			break;
		case 1:
			$r = "nodejs";
			break;
		default:
			$r = thx.js.ClientHost.host[0];
		}
		return $r;
	}(this));
}
thx.js.ClientHost.osString = function() {
	return thx.js.ClientHost.os[0];
}
thx.js.ClientHost.osVersion = function() {
	return (function($this) {
		var $r;
		var $e = (thx.js.ClientHost.os);
		switch( $e[1] ) {
		case 0:
			var v = $e[2];
			$r = v;
			break;
		default:
			$r = null;
		}
		return $r;
	}(this));
}
thx.js.ClientHost.environmentString = function() {
	return thx.js.ClientHost.environment[0];
}
thx.js.ClientHost.userAgent = function() {
	return "" + navigator.userAgent;
}
thx.js.ClientHost.hasNavigator = function() {
	return typeof navigator !== 'undefined';
}
thx.js.ClientHost.prototype = {
	__class__: thx.js.ClientHost
}
thx.js.Svg = $hxClasses["thx.js.Svg"] = function() { }
thx.js.Svg.__name__ = ["thx","js","Svg"];
thx.js.Svg.mouse = function(dom) {
	var point = (null != dom.ownerSVGElement?dom.ownerSVGElement:dom).createSVGPoint();
	if(thx.js.Svg._usepage && (js.Lib.window.scrollX || js.Lib.window.scrollY)) {
		var svg = thx.js.Dom.selectNode(js.Lib.document.body).append("svg:svg").style("position").string("absolute").style("top")["float"](0).style("left")["float"](0);
		var ctm = svg.node().getScreenCTM();
		thx.js.Svg._usepage = !(ctm.f || ctm.e);
		svg.remove();
	}
	if(thx.js.Svg._usepage) {
		point.x = thx.js.Dom.event.pageX;
		point.y = thx.js.Dom.event.pageY;
	} else {
		point.x = thx.js.Dom.event.clientX;
		point.y = thx.js.Dom.event.clientY;
	}
	point = point.matrixTransform(dom.getScreenCTM().inverse());
	return [point.x,point.y];
}
thx.js.Svg.prototype = {
	__class__: thx.js.Svg
}
var Std = $hxClasses["Std"] = function() { }
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
Std.prototype = {
	__class__: Std
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
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
thx.js.AccessText = $hxClasses["thx.js.AccessText"] = function(selection) {
	thx.js.Access.call(this,selection);
}
thx.js.AccessText.__name__ = ["thx","js","AccessText"];
thx.js.AccessText.__super__ = thx.js.Access;
thx.js.AccessText.prototype = $extend(thx.js.Access.prototype,{
	get: function() {
		return this.selection.firstNode(function(node) {
			return node.textContent;
		});
	}
	,string: function(v) {
		this.clear();
		this.selection.eachNode(function(node,_) {
			node.textContent = v;
		});
		return this.selection;
	}
	,clear: function() {
		this.selection.eachNode(function(node,i) {
			node.textContent = "";
		});
		return this.selection;
	}
	,'float': function(v) {
		this.clear();
		this.selection.eachNode(function(node,_) {
			node.textContent = "" + v;
		});
		return this.selection;
	}
	,stringNodef: function(v) {
		this.clear();
		this.selection.eachNode(function(node,i) {
			var x = v(node,i);
			if(null != x) node.textContent = x;
		});
		return this.selection;
	}
	,floatNodef: function(v) {
		this.clear();
		this.selection.eachNode(function(node,i) {
			var x = v(node,i);
			if(null != x) node.textContent = "" + x;
		});
		return this.selection;
	}
	,__class__: thx.js.AccessText
});
thx.js.AccessDataText = $hxClasses["thx.js.AccessDataText"] = function(selection) {
	thx.js.AccessText.call(this,selection);
}
thx.js.AccessDataText.__name__ = ["thx","js","AccessDataText"];
thx.js.AccessDataText.__super__ = thx.js.AccessText;
thx.js.AccessDataText.prototype = $extend(thx.js.AccessText.prototype,{
	stringf: function(v) {
		this.clear();
		this.selection.eachNode(function(node,i) {
			var x = v(Reflect.field(node,"__data__"),i);
			if(null != x) node.textContent = x;
		});
		return this.selection;
	}
	,floatf: function(v) {
		this.clear();
		this.selection.eachNode(function(node,i) {
			var x = v(Reflect.field(node,"__data__"),i);
			if(null != x) node.textContent = "" + x;
		});
		return this.selection;
	}
	,data: function() {
		return this.stringf(function(d,_) {
			return "" + d;
		});
	}
	,__class__: thx.js.AccessDataText
});
thx.svg.Chord = $hxClasses["thx.svg.Chord"] = function(source,target,radius,startAngle,endAngle) {
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
var D3Examples = $hxClasses["D3Examples"] = function() { }
D3Examples.__name__ = ["D3Examples"];
D3Examples.example = null;
D3Examples.main = function() {
	haxe.Firebug.redirectTraces();
	var classes = [d3.Area,d3.Bar,d3.CalendarVix,d3.Chord,d3.Moire,d3.NestedKey,d3.Pie,d3.PieAnimated,d3.Sort,d3.Stack,d3.Stream,d3.TransitionEquations,d3.WebkitTransition,d3.ZoomPan];
	thx.js.Dom.select("#examples").selectAll("li").data(classes).enter().append("li").append("a").html().stringf(D3Examples.description).attr("href").string("#").on("click",D3Examples.click).first(function(d) {
		D3Examples.click(d,0);
	});
}
D3Examples.description = function(d,i) {
	return Strings.humanize(Type.getClassName(d).split(".").pop());
}
D3Examples.click = function(d,i) {
	if(null != D3Examples.example) D3Examples.example.destroy();
	D3Examples.example = Type.createInstance(d,["#example"]);
	D3Examples.example.run();
}
D3Examples.prototype = {
	__class__: D3Examples
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
	return Std["is"](v,String) && Objects._reCheckKeyIsColor.match(k)?thx.color.Colors.interpolatef:Dynamics.interpolatef;
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
			throw new thx.error.Error("Unsupported number format: {0}",null,format,{ fileName : "Objects.hx", lineNumber : 245, className : "Objects", methodName : "formatf"});
			return $r;
		}(this));
	}
}
Objects.prototype = {
	__class__: Objects
}
thx.js.AccessProperty = $hxClasses["thx.js.AccessProperty"] = function(name,selection) {
	thx.js.Access.call(this,selection);
	this.name = name;
}
thx.js.AccessProperty.__name__ = ["thx","js","AccessProperty"];
thx.js.AccessProperty.__super__ = thx.js.Access;
thx.js.AccessProperty.prototype = $extend(thx.js.Access.prototype,{
	name: null
	,get: function() {
		var n = this.name;
		return this.selection.firstNode(function(node) {
			return Reflect.field(node,n);
		});
	}
	,remove: function() {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			Reflect.deleteField(node,n);
		});
		return this.selection;
	}
	,string: function(v) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			node[n] = v;
		});
		return this.selection;
	}
	,'float': function(v) {
		var s = "" + v;
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			node[n] = s;
		});
		return this.selection;
	}
	,__class__: thx.js.AccessProperty
});
thx.js.AccessDataProperty = $hxClasses["thx.js.AccessDataProperty"] = function(name,selection) {
	thx.js.AccessProperty.call(this,name,selection);
}
thx.js.AccessDataProperty.__name__ = ["thx","js","AccessDataProperty"];
thx.js.AccessDataProperty.__super__ = thx.js.AccessProperty;
thx.js.AccessDataProperty.prototype = $extend(thx.js.AccessProperty.prototype,{
	stringf: function(v) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) Reflect.deleteField(node,n); else node[n] = s;
		});
		return this.selection;
	}
	,floatf: function(v) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) Reflect.deleteField(node,n); else node[n] = "" + s;
		});
		return this.selection;
	}
	,data: function() {
		return this.stringf(function(d,_) {
			return "" + d;
		});
	}
	,__class__: thx.js.AccessDataProperty
});
thx.math.Ease = $hxClasses["thx.math.Ease"] = function() { }
thx.math.Ease.__name__ = ["thx","math","Ease"];
thx.math.Ease.mode = function(easemode,f) {
	if(null == f) f = thx.math.Equations.cubic;
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
thx.math.Ease.prototype = {
	__class__: thx.math.Ease
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
thx.data.ValueHandler = $hxClasses["thx.data.ValueHandler"] = function() {
}
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
if(!thx.collection) thx.collection = {}
thx.collection.IntHashList = $hxClasses["thx.collection.IntHashList"] = function() {
	this.length = 0;
	this.__keys = [];
	this.__hash = new IntHash();
}
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
thx.color.Grey = $hxClasses["thx.color.Grey"] = function(value) {
	this.grey = Floats.normalize(value);
	var c = Ints.interpolate(this.grey,0,255,null);
	thx.color.Rgb.call(this,c,c,c);
}
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
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	url: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
}
d3.PieAnimated = $hxClasses["d3.PieAnimated"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.PieAnimated.__name__ = ["d3","PieAnimated"];
d3.PieAnimated.__super__ = d3.Example;
d3.PieAnimated.prototype = $extend(d3.Example.prototype,{
	arc: null
	,r: null
	,runExample: function() {
		var w = this.stageWidth(), h = 400, data = Ints.range(10).map(function(_,_1) {
			return Math.random();
		}), color = new thx.math.scale.Ordinal().range(thx.color.Categories.category20), donut = new thx.geom.layout.Pie();
		this.r = Math.min(w,h) / 2;
		this.arc = thx.svg.Arc.fromObject().outerRadius(this.r);
		var vis = this.container.append("svg:svg").attr("width")["float"](w).attr("height")["float"](h).data([(function($this) {
			var $r;
			data.sort(null == function(a,b) {
				return b < a?-1:b > a?1:0;
			}?Dynamics.compare:function(a,b) {
				return b < a?-1:b > a?1:0;
			});
			$r = data;
			return $r;
		}(this))]).update();
		var arcs = vis.selectAll("g.arc").dataf(donut.pie.$bind(donut)).enter().append("svg:g").attr("class").string("arc").attr("transform").string("translate(" + this.r + "," + this.r + ")");
		var path = arcs.append("svg:path").attr("fill").stringf(function(d,i) {
			return color.scale(i);
		});
		path.transition().ease(thx.math.Equations.bounce).duration(null,2000).attr("d").stringTweenf(this.tweenPie.$bind(this));
		path.transition().ease(thx.math.Equations.elasticf()).delay(function(d,i) {
			return 2000 + i * 50;
		}).duration(null,750).attr("d").stringTweenf(this.tweenDonut.$bind(this));
	}
	,tweenPie: function(b,_) {
		b.innerRadius = 0;
		var i = Dynamics.interpolatef({ startAngle : 0, endAngle : 0},b);
		var a = this.arc;
		return function(t) {
			return a.shape(i(t));
		};
	}
	,tweenDonut: function(b,_) {
		b.innerRadius = this.r * .6;
		var i = Dynamics.interpolatef({ innerRadius : 0},b);
		var a = this.arc;
		return function(t) {
			return a.shape(i(t));
		};
	}
	,description: function() {
		return "Animated Pie Chart from random data. Not interactive.";
	}
	,__class__: d3.PieAnimated
});
thx.js.Timer = $hxClasses["thx.js.Timer"] = function() { }
thx.js.Timer.__name__ = ["thx","js","Timer"];
thx.js.Timer.timer = function(f,delay) {
	if(delay == null) delay = 0.0;
	var now = Date.now().getTime(), found = false, t0, t1 = thx.js.Timer.queue;
	if(!Math.isFinite(delay)) return;
	while(null != t1) {
		if(Reflect.compareMethods(f,t1.f)) {
			t1.then = now;
			t1.delay = delay;
			found = true;
			break;
		}
		t0 = t1;
		t1 = t1.next;
	}
	if(!found) thx.js.Timer.queue = { f : f, then : now, delay : delay, next : thx.js.Timer.queue, flush : false};
	if(0 == thx.js.Timer.interval) {
		thx.js.Timer.timeout = clearTimeout(thx.js.Timer.timeout);
		thx.js.Timer.interval = 1;
		window.requestAnimationFrame(thx.js.Timer._step);
	}
}
thx.js.Timer.step = function() {
	var elapsed, now = Date.now().getTime(), t1 = thx.js.Timer.queue;
	while(null != t1) {
		elapsed = now - t1.then;
		if(elapsed > t1.delay) t1.flush = t1.f(elapsed);
		t1 = t1.next;
	}
	var delay = thx.js.Timer._flush() - now;
	if(delay > 24) {
		if(Math.isFinite(delay)) {
			clearTimeout(thx.js.Timer.timeout);
			thx.js.Timer.timeout = setTimeout(thx.js.Timer._step,delay);
		}
		thx.js.Timer.interval = 0;
	} else {
		thx.js.Timer.interval = 1;
		window.requestAnimationFrame(thx.js.Timer._step);
	}
}
thx.js.Timer.flush = function() {
	var elapsed, now = Date.now().getTime(), t1 = thx.js.Timer.queue;
	while(null != t1) {
		elapsed = now - t1.then;
		if(t1.delay == 0) t1.flush = t1.f(elapsed);
		t1 = t1.next;
	}
	thx.js.Timer._flush();
}
thx.js.Timer._flush = function() {
	var t0 = null, t1 = thx.js.Timer.queue, then = Math.POSITIVE_INFINITY;
	while(null != t1) if(t1.flush) t1 = null != t0?t0.next = t1.next:thx.js.Timer.queue = t1.next; else {
		then = Math.min(then,t1.then + t1.delay);
		t1 = (t0 = t1).next;
	}
	return then;
}
thx.js.Timer.prototype = {
	__class__: thx.js.Timer
}
thx.js.AccessTweenAttribute = $hxClasses["thx.js.AccessTweenAttribute"] = function(name,transition,tweens) {
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
}
thx.js.AccessTweenAttribute.__name__ = ["thx","js","AccessTweenAttribute"];
thx.js.AccessTweenAttribute.__super__ = thx.js.AccessTween;
thx.js.AccessTweenAttribute.prototype = $extend(thx.js.AccessTween.prototype,{
	name: null
	,qname: null
	,stringNodef: function(f) {
		return this.stringTweenNodef(this.transitionStringTweenf(f));
	}
	,string: function(value) {
		return this.stringTweenNodef(this.transitionStringTween(value));
	}
	,stringTweenNodef: function(tween) {
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
	,floatNodef: function(f) {
		return this.floatTweenNodef(this.transitionFloatTweenf(f));
	}
	,'float': function(value) {
		return this.floatTweenNodef(this.transitionFloatTween(value));
	}
	,floatTweenNodef: function(tween) {
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
				d.setAttributeNS(name.space,name.local,"" + f(t));
			};
		};
		this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
		return this.transition;
	}
	,__class__: thx.js.AccessTweenAttribute
});
thx.js.AccessDataTweenAttribute = $hxClasses["thx.js.AccessDataTweenAttribute"] = function(name,transition,tweens) {
	thx.js.AccessTweenAttribute.call(this,name,transition,tweens);
}
thx.js.AccessDataTweenAttribute.__name__ = ["thx","js","AccessDataTweenAttribute"];
thx.js.AccessDataTweenAttribute.__super__ = thx.js.AccessTweenAttribute;
thx.js.AccessDataTweenAttribute.prototype = $extend(thx.js.AccessTweenAttribute.prototype,{
	stringf: function(f) {
		return this.stringTweenNodef(this.transitionStringTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}));
	}
	,floatf: function(f) {
		return this.floatTweenNodef(this.transitionFloatTweenf(function(n,i) {
			return f(Reflect.field(n,"__data__"),i);
		}));
	}
	,stringTweenf: function(tween) {
		var name = this.name;
		var attrTween = function(n,i) {
			var f = tween(Reflect.field(n,"__data__"),i,n.getAttribute(name));
			return function(t) {
				n.setAttribute(name,f(t));
			};
		};
		var attrTweenNS = function(n,i) {
			var f = tween(Reflect.field(n,"__data__"),i,n.getAttributeNS(name.space,name.local));
			return function(t) {
				n.setAttributeNS(name.space,name.local,f(t));
			};
		};
		this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
		return this.transition;
	}
	,floatTweenf: function(tween) {
		var name = this.name;
		var attrTween = function(n,i) {
			var f = tween(Reflect.field(n,"__data__"),i,Std.parseFloat(n.getAttribute(name)));
			return function(t) {
				n.setAttribute(name,"" + f(t));
			};
		};
		var attrTweenNS = function(n,i) {
			var f = tween(Reflect.field(n,"__data__"),i,Std.parseFloat(n.getAttributeNS(name.space,name.local)));
			return function(t) {
				n.setAttributeNS(name.space,name.local,"" + f(t));
			};
		};
		this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
		return this.transition;
	}
	,__class__: thx.js.AccessDataTweenAttribute
});
thx.culture.core.NumberInfo = $hxClasses["thx.culture.core.NumberInfo"] = function(decimals,decimalsSeparator,groups,groupsSeparator,patternNegative,patternPositive) {
	this.decimals = decimals;
	this.decimalsSeparator = decimalsSeparator;
	this.groups = groups;
	this.groupsSeparator = groupsSeparator;
	this.patternNegative = patternNegative;
	this.patternPositive = patternPositive;
}
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
d3.CalendarVix = $hxClasses["d3.CalendarVix"] = function(cid) {
	d3.Calendar.call(this,cid);
	this.startYear = 2003;
	this.endYear = 2010;
	this.csvPath = "/demo/data/vix.csv";
}
d3.CalendarVix.__name__ = ["d3","CalendarVix"];
d3.CalendarVix.__super__ = d3.Calendar;
d3.CalendarVix.prototype = $extend(d3.Calendar.prototype,{
	description: function() {
		return "Chicago Board Options Exchange Volatility Index historical data copyright Yahoo! Finance or independent data provider; fair use for educational purposes.";
	}
	,__class__: d3.CalendarVix
});
thx.error.AbstractMethod = $hxClasses["thx.error.AbstractMethod"] = function(posInfo) {
	thx.error.Error.call(this,"method {0}.{1}() is abstract",[posInfo.className,posInfo.methodName],posInfo,{ fileName : "AbstractMethod.hx", lineNumber : 14, className : "thx.error.AbstractMethod", methodName : "new"});
}
thx.error.AbstractMethod.__name__ = ["thx","error","AbstractMethod"];
thx.error.AbstractMethod.__super__ = thx.error.Error;
thx.error.AbstractMethod.prototype = $extend(thx.error.Error.prototype,{
	__class__: thx.error.AbstractMethod
});
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
	return { ms : t % 1000, seconds : Std["int"](s % 60), minutes : Std["int"](m % 60), hours : Std["int"](h % 24), days : Std["int"](h / 24)};
}
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
}
DateTools.prototype = {
	__class__: DateTools
}
thx.svg.Area = $hxClasses["thx.svg.Area"] = function(x,y0,y1,interpolator) {
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
d3.TransitionEquations = $hxClasses["d3.TransitionEquations"] = function(cid) {
	d3.Example.call(this,cid);
}
d3.TransitionEquations.__name__ = ["d3","TransitionEquations"];
d3.TransitionEquations.next = function() {
	d3.TransitionEquations.current++;
	if(d3.TransitionEquations.current == d3.TransitionEquations.transitions.length) d3.TransitionEquations.current = 0;
	return d3.TransitionEquations.transitions[d3.TransitionEquations.current];
}
d3.TransitionEquations.__super__ = d3.Example;
d3.TransitionEquations.prototype = $extend(d3.Example.prototype,{
	activeTransitions: null
	,end: function() {
		if(this.container.select(".label").empty()) return;
		this.runTransition();
	}
	,runTransition: function() {
		var width = this.stageWidth() - 70 + "px";
		var end = this.end.$bind(this);
		var ease = d3.TransitionEquations.next();
		var activeTransitions = this.activeTransitions = [];
		this.container.select(".label").text().string(Strings.humanize(Std.string(ease)));
		this.container.selectAll("div.flying").eachNode(function(n,i) {
			var f = Reflect.field(n,"__data__").f;
			var t = thx.js.Dom.selectNode(n).transition().delay(null,0).duration(null,2500).ease(f,ease).style("left").string(d3.TransitionEquations.current % 2 == 0?width:"5px");
			activeTransitions.push(t);
			if(i == 0) t.endNode(function(_,_1) {
				haxe.Timer.delay(end,500);
			});
		});
	}
	,runExample: function() {
		var equations = [{ n : "back", f : thx.math.Equations.backf()},{ n : "bounce", f : thx.math.Equations.bounce},{ n : "circle", f : thx.math.Equations.circle},{ n : "elastic", f : thx.math.Equations.elasticf()},{ n : "exponential", f : thx.math.Equations.exponential},{ n : "linear", f : thx.math.Equations.linear},{ n : "quadratic", f : thx.math.Equations.quadratic},{ n : "cubic", f : thx.math.Equations.cubic}];
		var color = thx.color.Colors.interpolatef("aquamarine","beige");
		this.container.append("div").attr("class").string("transitions").append("div").attr("class").string("label");
		this.container.selectAll("div.flying").data(equations).enter().append("div").attr("class").string("flying").text().stringf(function(d,i) {
			return d.n;
		}).style("position").string("absolute").style("left").string("5px").style("top").stringf(function(d,i) {
			return i * 40 + 30 + "px";
		}).style("background-color").stringf(function(d,i) {
			return color(i / equations.length);
		});
		this.runTransition();
	}
	,destroyExample: function() {
		this.activeTransitions.forEach(function(t,_) {
			t.stop();
		});
	}
	,description: function() {
		return "Transition equations. Displays the effects of several equation over the transition from 2 points. Not interactive.";
	}
	,__class__: d3.TransitionEquations
});
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
	var s = (window.Sizzle || (jQuery && jQuery.find) || ($ && $.find));
	thx.js.Sizzle = s;
	thx.js.Sizzle.select = s;
}
thx.languages.En.getLanguage();
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
{
	var useragent = thx.js.ClientHost.userAgent(), hasnavigator = thx.js.ClientHost.hasNavigator(), pattern;
	thx.js.ClientHost.host = !hasnavigator?thx.js.HostType.UnknownServer:typeof module !== 'undefined' && module.exports?thx.js.HostType.NodeJs:(pattern = new EReg("MSIE(?:/| )(\\S*);","")).match(useragent)?thx.js.HostType.IE(pattern.matched(1)):(pattern = new EReg("Firefox(?:/| )(\\S*)","")).match(useragent)?thx.js.HostType.Firefox(pattern.matched(1)):(pattern = new EReg("Chrome(?:/| )(\\S*)","")).match(useragent)?thx.js.HostType.Chrome(pattern.matched(1)):(pattern = new EReg("Version(?:/| )(\\S*) Safari(?:/| )(\\S*)","")).match(useragent)?thx.js.HostType.Safari(pattern.matched(1)):(pattern = new EReg("Opera(?:/| )(\\S*)","")).match(useragent)?thx.js.HostType.Opera(pattern.matched(1)):thx.js.HostType.Unknown(useragent);
	thx.js.ClientHost.os = !hasnavigator?thx.js.OSType.UnknownOs:(pattern = new EReg("Windows NT\\s+(\\d+\\.\\d+)","")).match(useragent)?(function($this) {
		var $r;
		var version = (function($this) {
			var $r;
			switch(pattern.matched(1)) {
			case "5.1":
				$r = "XP";
				break;
			case "5.2":
				$r = "2003/XP x64";
				break;
			case "6.0":
				$r = "Vista";
				break;
			case "6.1":
				$r = "7";
				break;
			case "6.2":
				$r = "8";
				break;
			default:
				$r = "unknown";
			}
			return $r;
		}($this));
		$r = thx.js.OSType.Windows(version);
		return $r;
	}(this)):new EReg("Mac OS X","").match(useragent)?thx.js.OSType.Mac:new EReg("(iPhone|iPad|iPod)","").match(useragent)?thx.js.OSType.IOs:new EReg("Linux","").match(useragent)?thx.js.OSType.Linux:new EReg("Android","").match(useragent)?thx.js.OSType.Android:thx.js.OSType.UnknownOs;
	thx.js.ClientHost.environment = (function($this) {
		var $r;
		switch( (thx.js.ClientHost.host)[1] ) {
		case 0:
			$r = thx.js.EnvironmentType.Server;
			break;
		case 1:
			$r = thx.js.EnvironmentType.Server;
			break;
		case 2:
		case 6:
		case 3:
			$r = thx.js.EnvironmentType.Desktop;
			break;
		case 4:
			$r = (function($this) {
				var $r;
				switch( (thx.js.ClientHost.os)[1] ) {
				case 1:
					$r = thx.js.EnvironmentType.Mobile;
					break;
				default:
					$r = thx.js.EnvironmentType.Desktop;
				}
				return $r;
			}($this));
			break;
		case 5:
			$r = (function($this) {
				var $r;
				switch( (thx.js.ClientHost.os)[1] ) {
				case 2:
					$r = thx.js.EnvironmentType.Mobile;
					break;
				default:
					$r = thx.js.EnvironmentType.Desktop;
				}
				return $r;
			}($this));
			break;
		case 7:
			$r = (function($this) {
				var $r;
				switch( (thx.js.ClientHost.os)[1] ) {
				case 5:
					$r = thx.js.EnvironmentType.UnknownEnvironment;
					break;
				default:
					$r = thx.js.EnvironmentType.Desktop;
				}
				return $r;
			}($this));
			break;
		}
		return $r;
	}(this));
}
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	Bool = $hxClasses["Bool"] = { __ename__ : ["Bool"]};
	Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	Enum = { };
	Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 1000 / 60); } ;
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
thx.js.AccessAttribute.refloat = new EReg("(\\d+(?:\\.\\d+)?)","");
js.Lib.onerror = null;
thx.js.Dom.doc = (function() {
	var g = new thx.js.Group([js.Lib.document]), gs = thx.js.Selection.create([g]);
	g.parentNode = gs.parentNode = js.Lib.document.documentElement;
	return gs;
})();
thx.js.Dom.selectionEngine = new thx.js.SizzleEngine();
thx.math.Const.TWO_PI = 6.283185307179586477;
thx.math.Const.PI = 3.141592653589793238;
thx.math.Const.HALF_PI = 1.570796326794896619;
thx.math.Const.TO_DEGREE = 57.29577951308232088;
thx.math.Const.TO_RADIAN = 0.01745329251994329577;
thx.math.Const.LN10 = 2.302585092994046;
thx.xml.Namespace.prefix = (function() {
	var h = new Hash();
	h.set("svg","http://www.w3.org/2000/svg");
	h.set("xhtml","http://www.w3.org/1999/xhtml");
	h.set("xlink","http://www.w3.org/1999/xlink");
	h.set("xml","http://www.w3.org/XML/1998/namespace");
	h.set("xmlns","http://www.w3.org/2000/xmlns/");
	return h;
})();
thx.error.Error.errorPositionPattern = "{0}.{1}({2}): ";
thx.js.behavior.Zoom.last = 0.0;
Ints._reparse = new EReg("^([+-])?\\d+$","");
thx.js.AccessStyle.refloat = new EReg("(\\d+(?:\\.\\d+)?)","");
Floats._reparse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.color.Categories.category10 = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];
thx.color.Categories.category20 = ["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"];
thx.color.Categories.category20b = ["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"];
thx.color.Categories.category20c = ["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];
thx.text.ERegs._escapePattern = new EReg("[*+?|{[()^$.# \\\\]","");
thx.svg.LineInternals.arcOffset = -Math.PI / 2;
thx.svg.LineInternals.arcMax = 2 * Math.PI - 1e-6;
thx.svg.LineInternals._lineBasisBezier1 = [0,2 / 3,1 / 3,0];
thx.svg.LineInternals._lineBasisBezier2 = [0,1 / 3,2 / 3,0];
thx.svg.LineInternals._lineBasisBezier3 = [0,1 / 6,2 / 3,1 / 6];
Dates._reparse = new EReg("^\\d{4}-\\d\\d-\\d\\d(( |T)\\d\\d:\\d\\d(:\\d\\d(\\.\\d{1,3})?)?)?Z?$","");
thx.js.BaseTransition._id = 0;
thx.js.BaseTransition._inheritid = 0;
thx.js.Svg._usepage = new EReg("WebKit","").match(js.Lib.window.navigator.userAgent);
Objects._reCheckKeyIsColor = new EReg("color\\b|\\bbackground\\b|\\bstroke\\b|\\bfill\\b","");
thx.js.Timer.timeout = 0;
thx.js.Timer.queue = null;
thx.js.Timer.interval = 0;
thx.js.Timer._step = thx.js.Timer.step;
thx.color.Colors._reParse = new EReg("^(?:(hsl|rgb|rgba|cmyk)\\(([^)]+)\\))|(?:(?:0x|#)([a-f0-9]{3,6}))$","i");
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
d3.TransitionEquations.transitions = [thx.math.EaseMode.EaseInEaseOut,thx.math.EaseMode.EaseOutEaseIn,thx.math.EaseMode.EaseIn,thx.math.EaseMode.EaseOut];
d3.TransitionEquations.current = -1;
D3Examples.main()