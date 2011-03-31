$estr = function() { return js.Boot.__string_rec(this,''); }
EReg = function(r,opt) {
	if( r === $_ ) return;
	$s.push("EReg::new");
	var $spos = $s.length;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
	$s.pop();
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	$s.push("EReg::match");
	var $spos = $s.length;
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	var $tmp = this.r.m != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matched = function(n) {
	$s.push("EReg::matched");
	var $spos = $s.length;
	var $tmp = this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedLeft = function() {
	$s.push("EReg::matchedLeft");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) {
		var $tmp = this.r.s.substr(0,this.r.m.index);
		$s.pop();
		return $tmp;
	}
	var $tmp = this.r.l;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedRight = function() {
	$s.push("EReg::matchedRight");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		var $tmp = this.r.s.substr(sz,this.r.s.length - sz);
		$s.pop();
		return $tmp;
	}
	var $tmp = this.r.r;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedPos = function() {
	$s.push("EReg::matchedPos");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	var $tmp = { pos : this.r.m.index, len : this.r.m[0].length};
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.split = function(s) {
	$s.push("EReg::split");
	var $spos = $s.length;
	var d = "#__delim__#";
	var $tmp = s.replace(this.r,d).split(d);
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.replace = function(s,by) {
	$s.push("EReg::replace");
	var $spos = $s.length;
	var $tmp = s.replace(this.r,by);
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.customReplace = function(s,f) {
	$s.push("EReg::customReplace");
	var $spos = $s.length;
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.__class__ = EReg;
Strings = function() { }
Strings.__name__ = ["Strings"];
Strings.format = function(pattern,params) {
	$s.push("Strings::format");
	var $spos = $s.length;
	var $tmp = Strings.plainFormat(pattern,params);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.plainFormat = function(pattern,params) {
	$s.push("Strings::plainFormat");
	var $spos = $s.length;
	var $tmp = Strings._re.customReplace(pattern,function(ereg) {
		$s.push("Strings::plainFormat@28");
		var $spos = $s.length;
		var index = Std.parseInt(ereg.matched(1));
		if(index >= params.length || index < 0) throw new thx.error.Error("format index {0} out of range",null,index,{ fileName : "Strings.hx", lineNumber : 31, className : "Strings", methodName : "plainFormat"});
		var $tmp = "" + params[index];
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.upTo = function(value,searchFor) {
	$s.push("Strings::upTo");
	var $spos = $s.length;
	var pos = value.indexOf(searchFor);
	if(pos < 0) {
		$s.pop();
		return value;
	} else {
		var $tmp = value.substr(0,pos);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Strings.startFrom = function(value,searchFor) {
	$s.push("Strings::startFrom");
	var $spos = $s.length;
	var pos = value.indexOf(searchFor);
	if(pos < 0) {
		$s.pop();
		return value;
	} else {
		var $tmp = value.substr(pos + searchFor.length);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Strings.rtrim = function(value,charlist) {
	$s.push("Strings::rtrim");
	var $spos = $s.length;
	var len = value.length;
	while(len > 0) {
		var c = value.substr(len - 1,1);
		if(charlist.indexOf(c) < 0) break;
		len--;
	}
	var $tmp = value.substr(0,len);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.ltrim = function(value,charlist) {
	$s.push("Strings::ltrim");
	var $spos = $s.length;
	var start = 0;
	while(start < value.length) {
		var c = value.substr(start,1);
		if(charlist.indexOf(c) < 0) break;
		start++;
	}
	var $tmp = value.substr(start);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.trim = function(value,charlist) {
	$s.push("Strings::trim");
	var $spos = $s.length;
	var $tmp = Strings.rtrim(Strings.ltrim(value,charlist),charlist);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.ucfirst = function(value) {
	$s.push("Strings::ucfirst");
	var $spos = $s.length;
	var $tmp = value == null?null:value.charAt(0).toUpperCase() + value.substr(1);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.lcfirst = function(value) {
	$s.push("Strings::lcfirst");
	var $spos = $s.length;
	var $tmp = value == null?null:value.charAt(0).toLowerCase() + value.substr(1);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.empty = function(value) {
	$s.push("Strings::empty");
	var $spos = $s.length;
	if(value == null || value == "") {
		$s.pop();
		return true;
	} else if(StringTools.trim(value) == "") {
		$s.pop();
		return true;
	} else {
		$s.pop();
		return false;
	}
	$s.pop();
}
Strings.isAlphaNum = function(value) {
	$s.push("Strings::isAlphaNum");
	var $spos = $s.length;
	var $tmp = value == null?false:Strings.__alphaNumPattern.match(value);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.digitsOnly = function(value) {
	$s.push("Strings::digitsOnly");
	var $spos = $s.length;
	var $tmp = value == null?false:Strings.__digitsPattern.match(value);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.ucwords = function(value) {
	$s.push("Strings::ucwords");
	var $spos = $s.length;
	var $tmp = Strings.__ucwordsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),$closure(Strings,"__upperMatch"));
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.ucwordsws = function(value) {
	$s.push("Strings::ucwordsws");
	var $spos = $s.length;
	var $tmp = Strings.__ucwordswsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),$closure(Strings,"__upperMatch"));
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.__upperMatch = function(re) {
	$s.push("Strings::__upperMatch");
	var $spos = $s.length;
	var $tmp = re.matched(0).toUpperCase();
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.humanize = function(s) {
	$s.push("Strings::humanize");
	var $spos = $s.length;
	var $tmp = StringTools.replace(Strings.underscore(s),"_"," ");
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.capitalize = function(s) {
	$s.push("Strings::capitalize");
	var $spos = $s.length;
	var $tmp = s.substr(0,1).toUpperCase() + s.substr(1);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.succ = function(s) {
	$s.push("Strings::succ");
	var $spos = $s.length;
	var $tmp = s.substr(0,-1) + String.fromCharCode(s.substr(-1).charCodeAt(0) + 1);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.underscore = function(s) {
	$s.push("Strings::underscore");
	var $spos = $s.length;
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	var $tmp = s.toLowerCase();
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.dasherize = function(s) {
	$s.push("Strings::dasherize");
	var $spos = $s.length;
	var $tmp = StringTools.replace(s,"_","-");
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.repeat = function(s,times) {
	$s.push("Strings::repeat");
	var $spos = $s.length;
	var b = [];
	var _g = 0;
	while(_g < times) {
		var i = _g++;
		b.push(s);
	}
	var $tmp = b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.wrapColumns = function(s,columns,indent,newline) {
	$s.push("Strings::wrapColumns");
	var $spos = $s.length;
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
	var $tmp = result.join(newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings._wrapColumns = function(s,columns,indent,newline) {
	$s.push("Strings::_wrapColumns");
	var $spos = $s.length;
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
	var $tmp = indent + parts.join(newline + indent);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.stripTags = function(s) {
	$s.push("Strings::stripTags");
	var $spos = $s.length;
	var $tmp = Strings._reStripTags.replace(s,"");
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.prototype.__class__ = Strings;
if(typeof thx=='undefined') thx = {}
if(!thx.util) thx.util = {}
thx.util.TestTypeServiceLocator = function(p) {
	$s.push("thx.util.TestTypeServiceLocator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.util.TestTypeServiceLocator.__name__ = ["thx","util","TestTypeServiceLocator"];
thx.util.TestTypeServiceLocator.addTests = function(runner) {
	$s.push("thx.util.TestTypeServiceLocator::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.util.TestTypeServiceLocator());
	$s.pop();
}
thx.util.TestTypeServiceLocator.main = function() {
	$s.push("thx.util.TestTypeServiceLocator::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.util.TestTypeServiceLocator.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.testBind = function() {
	$s.push("thx.util.TestTypeServiceLocator::testBind");
	var $spos = $s.length;
	var locator = new thx.util.TypeServiceLocator().bind(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeServiceLocator::testBind@19");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert["is"](o,thx.util.type.ITest,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 21, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
	utest.Assert["is"](o,thx.util.type.TestImplementation,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 22, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
	utest.Assert.equals("hi",o.sayHello(),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 23, className : "thx.util.TestTypeServiceLocator", methodName : "testBind"});
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.testUnbinded = function() {
	$s.push("thx.util.TestTypeServiceLocator::testUnbinded");
	var $spos = $s.length;
	var locator = new thx.util.TypeServiceLocator();
	utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 29, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	locator.unbinded = function(cls) {
		$s.push("thx.util.TestTypeServiceLocator::testUnbinded@30");
		var $spos = $s.length;
		if("thx.util.type.ITest" == Type.getClassName(cls)) {
			$s.pop();
			return null;
		}
		try {
			var $tmp = Type.createInstance(cls,[]);
			$s.pop();
			return $tmp;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return null;
		}
		$s.pop();
	};
	utest.Assert.isNull(locator.get(thx.util.type.ITest),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 41, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	utest.Assert.notNull(locator.get(thx.util.type.TestImplementation),null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 42, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	utest.Assert["is"](locator.get(thx.util.type.TestImplementation),thx.util.type.TestImplementation,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 43, className : "thx.util.TestTypeServiceLocator", methodName : "testUnbinded"});
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.testInstance = function() {
	$s.push("thx.util.TestTypeServiceLocator::testInstance");
	var $spos = $s.length;
	var locator = new thx.util.TypeServiceLocator().instance(thx.util.type.ITest,new thx.util.type.TestImplementation());
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 50, className : "thx.util.TestTypeServiceLocator", methodName : "testInstance"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 53, className : "thx.util.TestTypeServiceLocator", methodName : "testInstance"});
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.testMultipleInstances = function() {
	$s.push("thx.util.TestTypeServiceLocator::testMultipleInstances");
	var $spos = $s.length;
	var locator = new thx.util.TypeServiceLocator().bind(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeServiceLocator::testMultipleInstances@58");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 60, className : "thx.util.TestTypeServiceLocator", methodName : "testMultipleInstances"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 63, className : "thx.util.TestTypeServiceLocator", methodName : "testMultipleInstances"});
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.testMemoize = function() {
	$s.push("thx.util.TestTypeServiceLocator::testMemoize");
	var $spos = $s.length;
	var locator = new thx.util.TypeServiceLocator().memoize(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeServiceLocator::testMemoize@68");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 70, className : "thx.util.TestTypeServiceLocator", methodName : "testMemoize"});
	o.counter++;
	o = locator.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeServiceLocator.hx", lineNumber : 73, className : "thx.util.TestTypeServiceLocator", methodName : "testMemoize"});
	$s.pop();
}
thx.util.TestTypeServiceLocator.prototype.__class__ = thx.util.TestTypeServiceLocator;
if(!thx.collections) thx.collections = {}
thx.collections.Set = function(p) {
	if( p === $_ ) return;
	$s.push("thx.collections.Set::new");
	var $spos = $s.length;
	this._v = [];
	$s.pop();
}
thx.collections.Set.__name__ = ["thx","collections","Set"];
thx.collections.Set.ofArray = function(arr) {
	$s.push("thx.collections.Set::ofArray");
	var $spos = $s.length;
	var set = new thx.collections.Set();
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		set.add(item);
	}
	$s.pop();
	return set;
	$s.pop();
}
thx.collections.Set.prototype._v = null;
thx.collections.Set.prototype.add = function(v) {
	$s.push("thx.collections.Set::add");
	var $spos = $s.length;
	this._v.remove(v);
	this._v.push(v);
	$s.pop();
}
thx.collections.Set.prototype.remove = function(v) {
	$s.push("thx.collections.Set::remove");
	var $spos = $s.length;
	var $tmp = this._v.remove(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.Set.prototype.exists = function(v) {
	$s.push("thx.collections.Set::exists");
	var $spos = $s.length;
	var _g = 0, _g1 = this._v;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		if(t == v) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
thx.collections.Set.prototype.iterator = function() {
	$s.push("thx.collections.Set::iterator");
	var $spos = $s.length;
	var $tmp = this._v.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.Set.prototype.array = function() {
	$s.push("thx.collections.Set::array");
	var $spos = $s.length;
	var $tmp = this._v.copy();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.Set.prototype.toString = function() {
	$s.push("thx.collections.Set::toString");
	var $spos = $s.length;
	var $tmp = "{" + this._v.join(", ") + "}";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.Set.prototype.__class__ = thx.collections.Set;
if(!thx.html) thx.html = {}
thx.html.Attribute = function() { }
thx.html.Attribute.__name__ = ["thx","html","Attribute"];
thx.html.Attribute.isFill = function(el) {
	$s.push("thx.html.Attribute::isFill");
	var $spos = $s.length;
	var $tmp = thx.html.Attribute._fill.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Attribute.prototype.__class__ = thx.html.Attribute;
if(typeof utest=='undefined') utest = {}
if(!utest.ui) utest.ui = {}
if(!utest.ui.common) utest.ui.common = {}
utest.ui.common.ResultAggregator = function(runner,flattenPackage) {
	if( runner === $_ ) return;
	$s.push("utest.ui.common.ResultAggregator::new");
	var $spos = $s.length;
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
	$s.pop();
}
utest.ui.common.ResultAggregator.__name__ = ["utest","ui","common","ResultAggregator"];
utest.ui.common.ResultAggregator.prototype.runner = null;
utest.ui.common.ResultAggregator.prototype.flattenPackage = null;
utest.ui.common.ResultAggregator.prototype.root = null;
utest.ui.common.ResultAggregator.prototype.onStart = null;
utest.ui.common.ResultAggregator.prototype.onComplete = null;
utest.ui.common.ResultAggregator.prototype.onProgress = null;
utest.ui.common.ResultAggregator.prototype.start = function(runner) {
	$s.push("utest.ui.common.ResultAggregator::start");
	var $spos = $s.length;
	this.root = new utest.ui.common.PackageResult(null);
	this.onStart.dispatch();
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.getOrCreatePackage = function(pack,flat,ref) {
	$s.push("utest.ui.common.ResultAggregator::getOrCreatePackage");
	var $spos = $s.length;
	if(ref == null) ref = this.root;
	if(pack == null || pack == "") {
		$s.pop();
		return ref;
	}
	if(flat) {
		if(ref.existsPackage(pack)) {
			var $tmp = ref.getPackage(pack);
			$s.pop();
			return $tmp;
		}
		var p = new utest.ui.common.PackageResult(pack);
		ref.addPackage(p);
		$s.pop();
		return p;
	} else {
		var parts = pack.split(".");
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			ref = this.getOrCreatePackage(part,true,ref);
		}
		$s.pop();
		return ref;
	}
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	$s.push("utest.ui.common.ResultAggregator::getOrCreateClass");
	var $spos = $s.length;
	if(pack.existsClass(cls)) {
		var $tmp = pack.getClass(cls);
		$s.pop();
		return $tmp;
	}
	var c = new utest.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	$s.pop();
	return c;
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.createFixture = function(result) {
	$s.push("utest.ui.common.ResultAggregator::createFixture");
	var $spos = $s.length;
	var f = new utest.ui.common.FixtureResult(result.method);
	var $it0 = result.assertations.iterator();
	while( $it0.hasNext() ) {
		var assertation = $it0.next();
		f.add(assertation);
	}
	$s.pop();
	return f;
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.progress = function(e) {
	$s.push("utest.ui.common.ResultAggregator::progress");
	var $spos = $s.length;
	this.root.addResult(e.result,this.flattenPackage);
	this.onProgress.dispatch(e);
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.complete = function(runner) {
	$s.push("utest.ui.common.ResultAggregator::complete");
	var $spos = $s.length;
	this.onComplete.dispatch(this.root);
	$s.pop();
}
utest.ui.common.ResultAggregator.prototype.__class__ = utest.ui.common.ResultAggregator;
if(!thx.color) thx.color = {}
thx.color.Rgb = function(r,g,b) {
	if( r === $_ ) return;
	$s.push("thx.color.Rgb::new");
	var $spos = $s.length;
	this.red = Ints.clamp(r,0,255);
	this.green = Ints.clamp(g,0,255);
	this.blue = Ints.clamp(b,0,255);
	$s.pop();
}
thx.color.Rgb.__name__ = ["thx","color","Rgb"];
thx.color.Rgb.fromFloats = function(r,g,b) {
	$s.push("thx.color.Rgb::fromFloats");
	var $spos = $s.length;
	var $tmp = new thx.color.Rgb(Math.round(Floats.interpolate(r,null,0,255)),Math.round(Floats.interpolate(g,null,0,255)),Math.round(Floats.interpolate(b,null,0,255)));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.fromInt = function(v) {
	$s.push("thx.color.Rgb::fromInt");
	var $spos = $s.length;
	var $tmp = new thx.color.Rgb(v >> 16 & 255,v >> 8 & 255,v & 255);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.equals = function(a,b) {
	$s.push("thx.color.Rgb::equals");
	var $spos = $s.length;
	var $tmp = a.red == b.red && a.green == b.green && a.blue == b.blue;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.darker = function(color,t,interpolator) {
	$s.push("thx.color.Rgb::darker");
	var $spos = $s.length;
	var $tmp = new thx.color.Rgb(Math.round(Floats.interpolate(t * color.red,interpolator,0,255)),Math.round(Floats.interpolate(t * color.green,interpolator,0,255)),Math.round(Floats.interpolate(t * color.blue,interpolator,0,255)));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.interpolate = function(a,b,t,interpolator) {
	$s.push("thx.color.Rgb::interpolate");
	var $spos = $s.length;
	var $tmp = new thx.color.Rgb(Math.round(Floats.interpolate(t,interpolator,a.red,b.red)),Math.round(Floats.interpolate(t,interpolator,a.green,b.green)),Math.round(Floats.interpolate(t,interpolator,a.blue,b.blue)));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.prototype.blue = null;
thx.color.Rgb.prototype.green = null;
thx.color.Rgb.prototype.red = null;
thx.color.Rgb.prototype["int"] = function() {
	$s.push("thx.color.Rgb::int");
	var $spos = $s.length;
	var $tmp = (this.red & 255) << 16 | (this.green & 255) << 8 | this.blue & 255;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.prototype.hex = function(prefix) {
	$s.push("thx.color.Rgb::hex");
	var $spos = $s.length;
	if(prefix == null) prefix = "";
	var $tmp = prefix + StringTools.hex(this.red,2) + StringTools.hex(this.green,2) + StringTools.hex(this.blue,2);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.prototype.toRgbString = function() {
	$s.push("thx.color.Rgb::toRgbString");
	var $spos = $s.length;
	var $tmp = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.prototype.toString = function() {
	$s.push("thx.color.Rgb::toString");
	var $spos = $s.length;
	var $tmp = this.toRgbString();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.prototype.__class__ = thx.color.Rgb;
thx.color.Cmyk = function(cyan,magenta,yellow,black) {
	if( cyan === $_ ) return;
	$s.push("thx.color.Cmyk::new");
	var $spos = $s.length;
	thx.color.Rgb.call(this,Math.round(Floats.interpolate(Floats.normalize(1 - cyan - black),null,0,255)),Math.round(Floats.interpolate(Floats.normalize(1 - magenta - black),null,0,255)),Math.round(Floats.interpolate(Floats.normalize(1 - yellow - black),null,0,255)));
	this.cyan = Floats.normalize(cyan);
	this.magenta = Floats.normalize(magenta);
	this.yellow = Floats.normalize(yellow);
	this.black = Floats.normalize(black);
	$s.pop();
}
thx.color.Cmyk.__name__ = ["thx","color","Cmyk"];
thx.color.Cmyk.__super__ = thx.color.Rgb;
for(var k in thx.color.Rgb.prototype ) thx.color.Cmyk.prototype[k] = thx.color.Rgb.prototype[k];
thx.color.Cmyk.toCmyk = function(rgb) {
	$s.push("thx.color.Cmyk::toCmyk");
	var $spos = $s.length;
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
	var $tmp = new thx.color.Cmyk(c,m,y,k);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Cmyk.equals = function(a,b) {
	$s.push("thx.color.Cmyk::equals");
	var $spos = $s.length;
	var $tmp = a.black == b.black && a.cyan == b.cyan && a.magenta == b.magenta && a.yellow == b.yellow;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Cmyk.darker = function(color,t,interpolator) {
	$s.push("thx.color.Cmyk::darker");
	var $spos = $s.length;
	var v = t * color.black;
	var $tmp = new thx.color.Cmyk(color.cyan,color.magenta,color.yellow,null == interpolator?v:interpolator(v,0,1));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Cmyk.interpolate = function(a,b,t,interpolator) {
	$s.push("thx.color.Cmyk::interpolate");
	var $spos = $s.length;
	var $tmp = new thx.color.Cmyk(Floats.interpolate(t,interpolator,a.cyan,b.cyan),Floats.interpolate(t,interpolator,a.magenta,b.magenta),Floats.interpolate(t,interpolator,a.yellow,b.yellow),Floats.interpolate(t,interpolator,a.black,b.black));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Cmyk.prototype.black = null;
thx.color.Cmyk.prototype.cyan = null;
thx.color.Cmyk.prototype.magenta = null;
thx.color.Cmyk.prototype.yellow = null;
thx.color.Cmyk.prototype.toCmykString = function() {
	$s.push("thx.color.Cmyk::toCmykString");
	var $spos = $s.length;
	var $tmp = "cmyk(" + this.cyan + "," + this.magenta + "," + this.yellow + "," + this.black + ")";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Cmyk.prototype.__class__ = thx.color.Cmyk;
if(!thx.data) thx.data = {}
thx.data.ILoader = function() { }
thx.data.ILoader.__name__ = ["thx","data","ILoader"];
thx.data.ILoader.prototype.load = function(completeHandler,errorHandler) {
	$s.push("thx.data.ILoader::load");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ILoader.prototype.__class__ = thx.data.ILoader;
if(!thx.validation) thx.validation = {}
thx.validation.TestAll = function() { }
thx.validation.TestAll.__name__ = ["thx","validation","TestAll"];
thx.validation.TestAll.addTests = function(runner) {
	$s.push("thx.validation.TestAll::addTests");
	var $spos = $s.length;
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
	$s.pop();
}
thx.validation.TestAll.main = function() {
	$s.push("thx.validation.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.validation.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.validation.TestAll.prototype.assertValidation = function(result,ok,message,pos) {
	$s.push("thx.validation.TestAll::assertValidation");
	var $spos = $s.length;
	if(null == message) message = "expected '" + (ok?"Ok":"Error") + "' but was '" + thx.util.Results.toString(result) + "'";
	switch( result[1] ) {
	case 0:
		utest.Assert.isTrue(ok,message,pos);
		break;
	case 1:
		var e = result[2];
		utest.Assert.isFalse(ok,message,pos);
		break;
	}
	$s.pop();
}
thx.validation.TestAll.prototype.__class__ = thx.validation.TestAll;
thx.validation.TestSingleLine = function(p) {
	$s.push("thx.validation.TestSingleLine::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestSingleLine.__name__ = ["thx","validation","TestSingleLine"];
thx.validation.TestSingleLine.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestSingleLine.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestSingleLine.prototype.testValidation = function() {
	$s.push("thx.validation.TestSingleLine::testValidation");
	var $spos = $s.length;
	var validator = new thx.validation.SingleLineValidator();
	this.assertValidation(validator.validate("a b"),true,null,{ fileName : "TestSingleLine.hx", lineNumber : 15, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
	this.assertValidation(validator.validate("a\nb"),false,null,{ fileName : "TestSingleLine.hx", lineNumber : 16, className : "thx.validation.TestSingleLine", methodName : "testValidation"});
	$s.pop();
}
thx.validation.TestSingleLine.prototype.__class__ = thx.validation.TestSingleLine;
if(!thx.js) thx.js = {}
thx.js.Node = function(dom) {
	if( dom === $_ ) return;
	$s.push("thx.js.Node::new");
	var $spos = $s.length;
	this.dom = dom;
	this.data = null;
	$s.pop();
}
thx.js.Node.__name__ = ["thx","js","Node"];
thx.js.Node.many = function(els) {
	$s.push("thx.js.Node::many");
	var $spos = $s.length;
	var $tmp = Arrays.map(els,function(d,_) {
		$s.push("thx.js.Node::many@23");
		var $spos = $s.length;
		var $tmp = new thx.js.Node(d);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Node.prototype.data = null;
thx.js.Node.prototype.dom = null;
thx.js.Node.prototype.__class__ = thx.js.Node;
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
	$s.push("thx.html.DomHandler::new");
	var $spos = $s.length;
	this.document = Xml.createDocument();
	this.current = this.document;
	$s.pop();
}
thx.html.DomHandler.__name__ = ["thx","html","DomHandler"];
thx.html.DomHandler.prototype.document = null;
thx.html.DomHandler.prototype.current = null;
thx.html.DomHandler.prototype.start = function(tag,attrs,unary) {
	$s.push("thx.html.DomHandler::start");
	var $spos = $s.length;
	var node = Xml.createElement(tag);
	var _g = 0;
	while(_g < attrs.length) {
		var attr = attrs[_g];
		++_g;
		node.set(attr.name,attr.value);
	}
	this.current.addChild(node);
	if(!unary) this.current = node;
	$s.pop();
}
thx.html.DomHandler.prototype.end = function(tag) {
	$s.push("thx.html.DomHandler::end");
	var $spos = $s.length;
	this.current = this.current.getParent();
	$s.pop();
}
thx.html.DomHandler.prototype.chars = function(text) {
	$s.push("thx.html.DomHandler::chars");
	var $spos = $s.length;
	this.current.addChild(Xml.createPCData(text));
	$s.pop();
}
thx.html.DomHandler.prototype.comment = function(text) {
	$s.push("thx.html.DomHandler::comment");
	var $spos = $s.length;
	this.current.addChild(Xml.createComment(text));
	$s.pop();
}
thx.html.DomHandler.prototype.doctype = function(text) {
	$s.push("thx.html.DomHandler::doctype");
	var $spos = $s.length;
	this.current.addChild(Xml.createDocType(text));
	$s.pop();
}
thx.html.DomHandler.prototype.declaration = function(text) {
	$s.push("thx.html.DomHandler::declaration");
	var $spos = $s.length;
	this.current.addChild(Xml.createProlog(text));
	$s.pop();
}
thx.html.DomHandler.prototype.__class__ = thx.html.DomHandler;
thx.html.DomHandler.__interfaces__ = [thx.html.HtmlHandler];
List = function(p) {
	if( p === $_ ) return;
	$s.push("List::new");
	var $spos = $s.length;
	this.length = 0;
	$s.pop();
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	$s.push("List::add");
	var $spos = $s.length;
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.push = function(item) {
	$s.push("List::push");
	var $spos = $s.length;
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.first = function() {
	$s.push("List::first");
	var $spos = $s.length;
	var $tmp = this.h == null?null:this.h[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.last = function() {
	$s.push("List::last");
	var $spos = $s.length;
	var $tmp = this.q == null?null:this.q[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.pop = function() {
	$s.push("List::pop");
	var $spos = $s.length;
	if(this.h == null) {
		$s.pop();
		return null;
	}
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	$s.pop();
	return x;
	$s.pop();
}
List.prototype.isEmpty = function() {
	$s.push("List::isEmpty");
	var $spos = $s.length;
	var $tmp = this.h == null;
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.clear = function() {
	$s.push("List::clear");
	var $spos = $s.length;
	this.h = null;
	this.q = null;
	this.length = 0;
	$s.pop();
}
List.prototype.remove = function(v) {
	$s.push("List::remove");
	var $spos = $s.length;
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			$s.pop();
			return true;
		}
		prev = l;
		l = l[1];
	}
	$s.pop();
	return false;
	$s.pop();
}
List.prototype.iterator = function() {
	$s.push("List::iterator");
	var $spos = $s.length;
	var $tmp = { h : this.h, hasNext : function() {
		$s.push("List::iterator@155");
		var $spos = $s.length;
		var $tmp = this.h != null;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("List::iterator@158");
		var $spos = $s.length;
		if(this.h == null) {
			$s.pop();
			return null;
		}
		var x = this.h[0];
		this.h = this.h[1];
		$s.pop();
		return x;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.toString = function() {
	$s.push("List::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.join = function(sep) {
	$s.push("List::join");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.filter = function(f) {
	$s.push("List::filter");
	var $spos = $s.length;
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	$s.pop();
	return l2;
	$s.pop();
}
List.prototype.map = function(f) {
	$s.push("List::map");
	var $spos = $s.length;
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	$s.pop();
	return b;
	$s.pop();
}
List.prototype.__class__ = List;
if(!utest._Dispatcher) utest._Dispatcher = {}
utest._Dispatcher.EventException = { __ename__ : ["utest","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] }
utest._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
utest._Dispatcher.EventException.StopPropagation.toString = $estr;
utest._Dispatcher.EventException.StopPropagation.__enum__ = utest._Dispatcher.EventException;
utest.Dispatcher = function(p) {
	if( p === $_ ) return;
	$s.push("utest.Dispatcher::new");
	var $spos = $s.length;
	this.handlers = new Array();
	$s.pop();
}
utest.Dispatcher.__name__ = ["utest","Dispatcher"];
utest.Dispatcher.stop = function() {
	$s.push("utest.Dispatcher::stop");
	var $spos = $s.length;
	throw utest._Dispatcher.EventException.StopPropagation;
	$s.pop();
}
utest.Dispatcher.prototype.handlers = null;
utest.Dispatcher.prototype.add = function(h) {
	$s.push("utest.Dispatcher::add");
	var $spos = $s.length;
	this.handlers.push(h);
	$s.pop();
	return h;
	$s.pop();
}
utest.Dispatcher.prototype.remove = function(h) {
	$s.push("utest.Dispatcher::remove");
	var $spos = $s.length;
	var _g1 = 0, _g = this.handlers.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.handlers[i],h)) {
			var $tmp = this.handlers.splice(i,1)[0];
			$s.pop();
			return $tmp;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
utest.Dispatcher.prototype.clear = function() {
	$s.push("utest.Dispatcher::clear");
	var $spos = $s.length;
	this.handlers = new Array();
	$s.pop();
}
utest.Dispatcher.prototype.dispatch = function(e) {
	$s.push("utest.Dispatcher::dispatch");
	var $spos = $s.length;
	try {
		var list = this.handlers.copy();
		var _g = 0;
		while(_g < list.length) {
			var l = list[_g];
			++_g;
			l(e);
		}
		$s.pop();
		return true;
	} catch( exc ) {
		if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return false;
		} else ;
		throw(exc);
	}
	$s.pop();
}
utest.Dispatcher.prototype.has = function() {
	$s.push("utest.Dispatcher::has");
	var $spos = $s.length;
	var $tmp = this.handlers.length > 0;
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Dispatcher.prototype.__class__ = utest.Dispatcher;
utest.Notifier = function(p) {
	if( p === $_ ) return;
	$s.push("utest.Notifier::new");
	var $spos = $s.length;
	this.handlers = new Array();
	$s.pop();
}
utest.Notifier.__name__ = ["utest","Notifier"];
utest.Notifier.stop = function() {
	$s.push("utest.Notifier::stop");
	var $spos = $s.length;
	throw utest._Dispatcher.EventException.StopPropagation;
	$s.pop();
}
utest.Notifier.prototype.handlers = null;
utest.Notifier.prototype.add = function(h) {
	$s.push("utest.Notifier::add");
	var $spos = $s.length;
	this.handlers.push(h);
	$s.pop();
	return h;
	$s.pop();
}
utest.Notifier.prototype.remove = function(h) {
	$s.push("utest.Notifier::remove");
	var $spos = $s.length;
	var _g1 = 0, _g = this.handlers.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.handlers[i],h)) {
			var $tmp = this.handlers.splice(i,1)[0];
			$s.pop();
			return $tmp;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
utest.Notifier.prototype.clear = function() {
	$s.push("utest.Notifier::clear");
	var $spos = $s.length;
	this.handlers = new Array();
	$s.pop();
}
utest.Notifier.prototype.dispatch = function() {
	$s.push("utest.Notifier::dispatch");
	var $spos = $s.length;
	try {
		var list = this.handlers.copy();
		var _g = 0;
		while(_g < list.length) {
			var l = list[_g];
			++_g;
			l();
		}
		$s.pop();
		return true;
	} catch( exc ) {
		if( js.Boot.__instanceof(exc,utest._Dispatcher.EventException) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return false;
		} else ;
		throw(exc);
	}
	$s.pop();
}
utest.Notifier.prototype.has = function() {
	$s.push("utest.Notifier::has");
	var $spos = $s.length;
	var $tmp = this.handlers.length > 0;
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Notifier.prototype.__class__ = utest.Notifier;
IntIter = function(min,max) {
	if( min === $_ ) return;
	$s.push("IntIter::new");
	var $spos = $s.length;
	this.min = min;
	this.max = max;
	$s.pop();
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	$s.push("IntIter::hasNext");
	var $spos = $s.length;
	var $tmp = this.min < this.max;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntIter.prototype.next = function() {
	$s.push("IntIter::next");
	var $spos = $s.length;
	var $tmp = this.min++;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntIter.prototype.__class__ = IntIter;
if(!thx.text) thx.text = {}
thx.text.Inflections = function() { }
thx.text.Inflections.__name__ = ["thx","text","Inflections"];
thx.text.Inflections.pluralize = function(singular) {
	$s.push("thx.text.Inflections::pluralize");
	var $spos = $s.length;
	var $tmp = thx.text.Inflections.process(singular,thx.text.Inflections.plural_rules);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.Inflections.singularize = function(plural) {
	$s.push("thx.text.Inflections::singularize");
	var $spos = $s.length;
	var $tmp = thx.text.Inflections.process(plural,thx.text.Inflections.singular_rules);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.Inflections.process = function(word,rules) {
	$s.push("thx.text.Inflections::process");
	var $spos = $s.length;
	if(Lambda.has(thx.text.Inflections.uncountable_words,word)) {
		$s.pop();
		return word;
	}
	var _g = 0;
	while(_g < rules.length) {
		var rule = rules[_g];
		++_g;
		if(rule.pattern.match(word)) {
			var $tmp = rule.pattern.replace(word,rule.replace);
			$s.pop();
			return $tmp;
		}
	}
	$s.pop();
	return word;
	$s.pop();
}
thx.text.Inflections.prototype.__class__ = thx.text.Inflections;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	$s.push("js.Lib::alert");
	var $spos = $s.length;
	alert(js.Boot.__string_rec(v,""));
	$s.pop();
}
js.Lib.eval = function(code) {
	$s.push("js.Lib::eval");
	var $spos = $s.length;
	var $tmp = eval(code);
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Lib.setErrorHandler = function(f) {
	$s.push("js.Lib::setErrorHandler");
	var $spos = $s.length;
	js.Lib.onerror = f;
	$s.pop();
}
js.Lib.prototype.__class__ = js.Lib;
thx.js.Group = function(node,nodes) {
	if( node === $_ ) return;
	$s.push("thx.js.Group::new");
	var $spos = $s.length;
	if(null != node) this.nodes = [node]; else if(null != nodes) this.nodes = nodes; else this.nodes = [];
	$s.pop();
}
thx.js.Group.__name__ = ["thx","js","Group"];
thx.js.Group.prototype.parentNode = null;
thx.js.Group.prototype.parentData = null;
thx.js.Group.prototype.nodes = null;
thx.js.Group.prototype.iterator = function() {
	$s.push("thx.js.Group::iterator");
	var $spos = $s.length;
	var $tmp = this.nodes.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Group.prototype.getNode = function(i) {
	$s.push("thx.js.Group::getNode");
	var $spos = $s.length;
	var $tmp = this.nodes[i];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Group.prototype.count = function() {
	$s.push("thx.js.Group::count");
	var $spos = $s.length;
	var $tmp = this.nodes.length;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Group.prototype.push = function(node) {
	$s.push("thx.js.Group::push");
	var $spos = $s.length;
	this.nodes.push(node);
	$s.pop();
}
thx.js.Group.prototype.__class__ = thx.js.Group;
thx.js.Selection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.Selection::new");
	var $spos = $s.length;
	this.groups = groups;
	$s.pop();
}
thx.js.Selection.__name__ = ["thx","js","Selection"];
thx.js.Selection.prototype.parentNode = null;
thx.js.Selection.prototype.parentData = null;
thx.js.Selection.prototype.groups = null;
thx.js.Selection.prototype.select = function(selector) {
	$s.push("thx.js.Selection::select");
	var $spos = $s.length;
	var $tmp = this._select(function(el) {
		$s.push("thx.js.Selection::select@24");
		var $spos = $s.length;
		var $tmp = new thx.js.Node(thx.js.Dom.selectionEngine.select(selector,el));
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.selectAll = function(selector) {
	$s.push("thx.js.Selection::selectAll");
	var $spos = $s.length;
	var $tmp = this._selectAll(function(el) {
		$s.push("thx.js.Selection::selectAll@31");
		var $spos = $s.length;
		var $tmp = thx.js.Node.many(thx.js.Dom.selectionEngine.selectAll(selector,el));
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.append = function(name) {
	$s.push("thx.js.Selection::append");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		$s.push("thx.js.Selection::append@39");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		var $tmp = new thx.js.Node(n);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var appendNS = function(node) {
		$s.push("thx.js.Selection::append@46");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		var $tmp = new thx.js.Node(n);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var $tmp = this._select(null == qname?append:appendNS);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.data = function(d,fd) {
	$s.push("thx.js.Selection::data");
	var $spos = $s.length;
	var update = [], enter = [], exit = [];
	var bind = function(group,groupData) {
		$s.push("thx.js.Selection::data@60");
		var $spos = $s.length;
		var n = group.count(), m = groupData.length, n0 = n < m?n:m, n1 = n > m?n:m, updateNodes = [], exitNodes = [], enterNodes = [], node, nodeData;
		var _g = 0;
		while(_g < n0) {
			var i = _g++;
			node = group.getNode(i);
			nodeData = groupData[i];
			if(null != node) {
				node.data = nodeData;
				updateNodes[i] = node;
				enterNodes[i] = exitNodes[i] = null;
			} else {
				var node1 = new thx.js.Node(null);
				node1.data = nodeData;
				enterNodes[i] = node1;
				updateNodes[i] = exitNodes[i] = null;
			}
		}
		var _g = n0;
		while(_g < m) {
			var i = _g++;
			var node1 = new thx.js.Node(null);
			node1.data = groupData[i];
			enterNodes[i] = node1;
			updateNodes[i] = exitNodes[i] = null;
		}
		var _g = m;
		while(_g < n1) {
			var i = _g++;
			exitNodes[i] = group.getNode(i);
			enterNodes[i] = updateNodes[i] = null;
		}
		var enterGroup = new thx.js.Group(null,enterNodes);
		enterGroup.parentNode = group.parentNode;
		enterGroup.parentData = group.parentData;
		enter.push(enterGroup);
		var updateGroup = new thx.js.Group(null,updateNodes);
		updateGroup.parentNode = group.parentNode;
		updateGroup.parentData = group.parentData;
		update.push(updateGroup);
		var exitGroup = new thx.js.Group(null,exitNodes);
		exitGroup.parentNode = group.parentNode;
		exitGroup.parentData = group.parentData;
		exit.push(exitGroup);
		$s.pop();
	};
	if(null != d) {
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			bind(group,d);
		}
	} else if(null != fd) {
		var i = 0;
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			bind(group,fd(group,i));
		}
	} else throw new thx.error.Error("either data or datafunction must be passed to data()",null,null,{ fileName : "Selection.hx", lineNumber : 125, className : "thx.js.Selection", methodName : "data"});
	var $tmp = new thx.js.DataSelection(update,enter,exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.iterator = function() {
	$s.push("thx.js.Selection::iterator");
	var $spos = $s.length;
	var $tmp = this.groups.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.html = function(v,f) {
	$s.push("thx.js.Selection::html");
	var $spos = $s.length;
	var htmlConstant = function(n,_) {
		$s.push("thx.js.Selection::html@136");
		var $spos = $s.length;
		n.dom.innerHTML = v;
		$s.pop();
	};
	var htmlFunction = function(n,i) {
		$s.push("thx.js.Selection::html@140");
		var $spos = $s.length;
		n.dom.innerHTML = f(n,i);
		$s.pop();
	};
	var $tmp = this.each(null == f?htmlConstant:htmlFunction);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.text = function(v,f) {
	$s.push("thx.js.Selection::text");
	var $spos = $s.length;
	var textNull = function(n,_) {
		$s.push("thx.js.Selection::text@148");
		var $spos = $s.length;
		while(null != n.dom.lastChild) n.dom.removeChild(n.dom.lastChild);
		$s.pop();
	};
	var textConstant = function(n,_) {
		$s.push("thx.js.Selection::text@152");
		var $spos = $s.length;
		n.dom.appendChild(js.Lib.document.createTextNode(v));
		$s.pop();
	};
	var textFunction = function(n,i) {
		$s.push("thx.js.Selection::text@156");
		var $spos = $s.length;
		var x = f(n,i);
		if(null != x) n.dom.appendChild(js.Lib.document.createTextNode(x));
		$s.pop();
	};
	var $tmp = this.each(null != f?textFunction:v != null?textConstant:textNull);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.attr = function(name,v,f) {
	$s.push("thx.js.Selection::attr");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var attrNull = function(n,_) {
		$s.push("thx.js.Selection::attr@170");
		var $spos = $s.length;
		n.dom.removeAttribute(name);
		$s.pop();
	};
	var attrNullNS = function(n,_) {
		$s.push("thx.js.Selection::attr@171");
		var $spos = $s.length;
		n.dom.removeAttributeNS(qname.space,qname.local);
		$s.pop();
	};
	var attrConstant = function(n,_) {
		$s.push("thx.js.Selection::attr@172");
		var $spos = $s.length;
		n.dom.setAttribute(name,v);
		$s.pop();
	};
	var attrConstantNS = function(n,_) {
		$s.push("thx.js.Selection::attr@173");
		var $spos = $s.length;
		n.dom.setAttributeNS(qname.space,qname.local,v);
		$s.pop();
	};
	var attrFunction = function(n,i) {
		$s.push("thx.js.Selection::attr@174");
		var $spos = $s.length;
		var x = f(n,i);
		if(x == null) n.dom.removeAttribute(name); else n.dom.setAttribute(name,x);
		$s.pop();
	};
	var attrFunctionNS = function(n,i) {
		$s.push("thx.js.Selection::attr@182");
		var $spos = $s.length;
		var x = f(n,i);
		if(x == null) n.dom.removeAttributeNS(qname.space,qname.local); else n.dom.setAttributeNS(qname.space,qname.local,x);
		$s.pop();
	};
	var $tmp = this.each(f != null?null != qname?attrFunctionNS:attrFunction:null != v?null != qname?attrConstantNS:attrConstant:null != qname?attrNullNS:attrNull);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.style = function(name,v,f,priority) {
	$s.push("thx.js.Selection::style");
	var $spos = $s.length;
	var styleNull = function(n,_) {
		$s.push("thx.js.Selection::style@198");
		var $spos = $s.length;
		n.dom.style.removeProperty(name);
		$s.pop();
	};
	var styleConstant = function(n,_) {
		$s.push("thx.js.Selection::style@199");
		var $spos = $s.length;
		n.dom.style.setProperty(name,v,priority);
		$s.pop();
	};
	var styleFunction = function(n,i) {
		$s.push("thx.js.Selection::style@200");
		var $spos = $s.length;
		var x = f(n,i);
		if(x == null) n.dom.style.removeProperty(name); else n.dom.style.setProperty(name,x,priority);
		$s.pop();
	};
	var $tmp = this.each(null != f?styleFunction:null != v?styleConstant:styleNull);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.each = function(f) {
	$s.push("thx.js.Selection::each");
	var $spos = $s.length;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var i = 0;
		var $it0 = group.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) f(node,i++);
		}
	}
	$s.pop();
	return this;
	$s.pop();
}
thx.js.Selection.prototype.enter = function() {
	$s.push("thx.js.Selection::enter");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.Error("enter can only be invoked after data() has been called",null,null,{ fileName : "Selection.hx", lineNumber : 228, className : "thx.js.Selection", methodName : "enter"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.exit = function() {
	$s.push("thx.js.Selection::exit");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.Error("exit can only be invoked after enter() has been called",null,null,{ fileName : "Selection.hx", lineNumber : 233, className : "thx.js.Selection", methodName : "exit"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.createSelection = function(groups) {
	$s.push("thx.js.Selection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.Selection(groups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype._select = function(selectf) {
	$s.push("thx.js.Selection::_select");
	var $spos = $s.length;
	var subgroups = [], subgroup, subnode, node;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		subgroups.push(subgroup = new thx.js.Group());
		subgroup.parentNode = group.parentNode;
		subgroup.parentData = group.parentData;
		var $it0 = group.iterator();
		while( $it0.hasNext() ) {
			var node1 = $it0.next();
			if(null != node1) {
				subgroup.push(subnode = selectf(node1.dom));
				if(null != subnode && null != node1.data) subnode.data = node1.data;
			} else subgroup.push(null);
		}
	}
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype._selectAll = function(selectallf) {
	$s.push("thx.js.Selection::_selectAll");
	var $spos = $s.length;
	var subgroups = [], subgroup;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var $it0 = group.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) {
				subgroups.push(subgroup = new thx.js.Group(null,selectallf(node.dom)));
				subgroup.parentNode = node;
				subgroup.parentData = node.data;
			}
		}
	}
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Selection.prototype.__class__ = thx.js.Selection;
thx.js.ISelectorEngine = function() { }
thx.js.ISelectorEngine.__name__ = ["thx","js","ISelectorEngine"];
thx.js.ISelectorEngine.prototype.select = null;
thx.js.ISelectorEngine.prototype.selectAll = null;
thx.js.ISelectorEngine.prototype.__class__ = thx.js.ISelectorEngine;
thx.js.SizzleEngine = function(p) {
	$s.push("thx.js.SizzleEngine::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.SizzleEngine.__name__ = ["thx","js","SizzleEngine"];
thx.js.SizzleEngine.prototype.select = function(selector,node) {
	$s.push("thx.js.SizzleEngine::select");
	var $spos = $s.length;
	var $tmp = thx.js.Sizzle.select(selector,node)[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.SizzleEngine.prototype.selectAll = function(selector,node) {
	$s.push("thx.js.SizzleEngine::selectAll");
	var $spos = $s.length;
	var $tmp = thx.js.Sizzle.select(selector,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.SizzleEngine.prototype.__class__ = thx.js.SizzleEngine;
thx.js.SizzleEngine.__interfaces__ = [thx.js.ISelectorEngine];
thx.js.Dom = function() { }
thx.js.Dom.__name__ = ["thx","js","Dom"];
thx.js.Dom.select = function(selector) {
	$s.push("thx.js.Dom::select");
	var $spos = $s.length;
	var $tmp = thx.js.Dom.doc.select(selector);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Dom.prototype.__class__ = thx.js.Dom;
thx.html.Html = function() { }
thx.html.Html.__name__ = ["thx","html","Html"];
thx.html.Html.getFormatter = function(version) {
	$s.push("thx.html.Html::getFormatter");
	var $spos = $s.length;
	var format;
	switch( version[1] ) {
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
	$s.pop();
	return format;
	$s.pop();
}
thx.html.Html.getHtml = function(dom) {
	$s.push("thx.html.Html::getHtml");
	var $spos = $s.length;
	if(dom.nodeType != Xml.Document) throw new thx.error.Error("invalid node type '{0}', should be Xml.Document",null,dom.nodeType,{ fileName : "Html.hx", lineNumber : 41, className : "thx.html.Html", methodName : "getHtml"});
	var $tmp = dom.firstElement();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.getHead = function(dom) {
	$s.push("thx.html.Html::getHead");
	var $spos = $s.length;
	var $tmp = thx.html.Html.getHtml(dom).firstElement();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.getTitle = function(dom) {
	$s.push("thx.html.Html::getTitle");
	var $spos = $s.length;
	var $tmp = thx.html.Html.getHead(dom).elementsNamed("title").next();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.getBody = function(dom) {
	$s.push("thx.html.Html::getBody");
	var $spos = $s.length;
	var $tmp = thx.html.Html.getHtml(dom).elementsNamed("body").next();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.createDocument = function(version) {
	$s.push("thx.html.Html::createDocument");
	var $spos = $s.length;
	var parser = thx.html.Html.getParser(version);
	var $tmp = parser(thx.html.Html.getTemplate(version));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.getParser = function(version) {
	$s.push("thx.html.Html::getParser");
	var $spos = $s.length;
	switch( version[1] ) {
	case 0:
	case 1:
	case 2:
	case 3:
		var $tmp = $closure(thx.html.Html,"toXml");
		$s.pop();
		return $tmp;
	case 4:
	case 6:
	case 5:
	case 7:
		var $tmp = $closure(Xml,"parse");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.Html.getTemplate = function(version) {
	$s.push("thx.html.Html::getTemplate");
	var $spos = $s.length;
	switch( version[1] ) {
	case 0:
		var $tmp = thx.html.Html.getTemplateHtml4Strict();
		$s.pop();
		return $tmp;
	case 1:
		var $tmp = thx.html.Html.getTemplateHtml4Transitional();
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = thx.html.Html.getTemplateHtml4Frameset();
		$s.pop();
		return $tmp;
	case 3:
		var $tmp = thx.html.Html.getTemplateHtml5();
		$s.pop();
		return $tmp;
	case 4:
		var $tmp = thx.html.Html.getTemplateXHtml10Transitional();
		$s.pop();
		return $tmp;
	case 6:
		var $tmp = thx.html.Html.getTemplateXHtml10Frameset();
		$s.pop();
		return $tmp;
	case 5:
		var $tmp = thx.html.Html.getTemplateXHtml10Strict();
		$s.pop();
		return $tmp;
	case 7:
		var $tmp = thx.html.Html.getTemplateXHtml11();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.Html.getTemplateHtml4Strict = function() {
	$s.push("thx.html.Html::getTemplateHtml4Strict");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\"><html><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.getTemplateHtml4Transitional = function() {
	$s.push("thx.html.Html::getTemplateHtml4Transitional");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\"><html><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.getTemplateHtml4Frameset = function() {
	$s.push("thx.html.Html::getTemplateHtml4Frameset");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\"><html><head><title></title></head><frameset><noframes><body></body></noframes></frameset></html>";
	$s.pop();
}
thx.html.Html.getTemplateHtml5 = function() {
	$s.push("thx.html.Html::getTemplateHtml5");
	var $spos = $s.length;
	$s.pop();
	return "<!doctype html><html><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.getTemplateXHtml10Transitional = function() {
	$s.push("thx.html.Html::getTemplateXHtml10Transitional");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.getTemplateXHtml10Strict = function() {
	$s.push("thx.html.Html::getTemplateXHtml10Strict");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.getTemplateXHtml10Frameset = function() {
	$s.push("thx.html.Html::getTemplateXHtml10Frameset");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Frameset//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><frameset><noframes><body></body></noframes></frameset></html>";
	$s.pop();
}
thx.html.Html.getTemplateXHtml11 = function() {
	$s.push("thx.html.Html::getTemplateXHtml11");
	var $spos = $s.length;
	$s.pop();
	return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title></title></head><body></body></html>";
	$s.pop();
}
thx.html.Html.toXml = function(html) {
	$s.push("thx.html.Html::toXml");
	var $spos = $s.length;
	var handler = new thx.html.DomHandler();
	var parser = new thx.html.HtmlParser(html);
	parser.process(handler);
	var $tmp = handler.document;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.toXmlString = function(html) {
	$s.push("thx.html.Html::toXmlString");
	var $spos = $s.length;
	var handler = new thx.html.TextHandler();
	var parser = new thx.html.HtmlParser(html);
	parser.process(handler);
	var $tmp = handler.results;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Html.prototype.__class__ = thx.html.Html;
thx.color.Hsl = function(h,s,l) {
	if( h === $_ ) return;
	$s.push("thx.color.Hsl::new");
	var $spos = $s.length;
	this.hue = h = Floats.circularWrap(h,360);
	this.saturation = s = Floats.normalize(s);
	this.lightness = l = Floats.normalize(l);
	thx.color.Rgb.call(this,Math.round(Floats.interpolate(thx.color.Hsl._c(h + 120,s,l),null,0,255)),Math.round(Floats.interpolate(thx.color.Hsl._c(h,s,l),null,0,255)),Math.round(Floats.interpolate(thx.color.Hsl._c(h - 120,s,l),null,0,255)));
	$s.pop();
}
thx.color.Hsl.__name__ = ["thx","color","Hsl"];
thx.color.Hsl.__super__ = thx.color.Rgb;
for(var k in thx.color.Rgb.prototype ) thx.color.Hsl.prototype[k] = thx.color.Rgb.prototype[k];
thx.color.Hsl._c = function(d,s,l) {
	$s.push("thx.color.Hsl::_c");
	var $spos = $s.length;
	var m2 = l <= 0.5?l * (1 + s):l + s - l * s;
	var m1 = 2 * l - m2;
	d = Floats.circularWrap(d,360);
	if(d < 60) {
		var $tmp = m1 + (m2 - m1) * d / 60;
		$s.pop();
		return $tmp;
	} else if(d < 180) {
		$s.pop();
		return m2;
	} else if(d < 240) {
		var $tmp = m1 + (m2 - m1) * (240 - d) / 60;
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return m1;
	}
	$s.pop();
}
thx.color.Hsl.toHsl = function(c) {
	$s.push("thx.color.Hsl::toHsl");
	var $spos = $s.length;
	var r = c.red / 255.0;
	var g = c.green / 255.0, b = c.blue / 255.0, min = Floats.min(r < g?r:g,b), max = Floats.max(r > g?r:g,b), delta = max - min, h, s, l = (max + min) / 2;
	if(delta == 0.0) s = h = 0.0; else {
		s = l < 0.5?delta / (max + min):delta / (2 - max - min);
		if(r == max) h = (g - b) / delta + (g < b?6:0); else if(g == max) h = (b - r) / delta + 2; else h = (r - g) / delta + 4;
		h *= 60;
	}
	var $tmp = new thx.color.Hsl(h,s,l);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Hsl.equals = function(a,b) {
	$s.push("thx.color.Hsl::equals");
	var $spos = $s.length;
	var $tmp = a.hue == b.hue && a.saturation == b.saturation && a.lightness == b.lightness;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Hsl.darker = function(color,t,interpolator) {
	$s.push("thx.color.Hsl::darker");
	var $spos = $s.length;
	var v = color.lightness / t;
	var $tmp = new thx.color.Hsl(color.hue,color.saturation,null == interpolator?v:interpolator(v,0,1));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Hsl.interpolate = function(a,b,t,interpolator) {
	$s.push("thx.color.Hsl::interpolate");
	var $spos = $s.length;
	var $tmp = new thx.color.Hsl(Floats.interpolate(t,interpolator,a.hue,b.hue),Floats.interpolate(t,interpolator,a.saturation,b.saturation),Floats.interpolate(t,interpolator,a.lightness,b.lightness));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Hsl.prototype.hue = null;
thx.color.Hsl.prototype.saturation = null;
thx.color.Hsl.prototype.lightness = null;
thx.color.Hsl.prototype.toHslString = function() {
	$s.push("thx.color.Hsl::toHslString");
	var $spos = $s.length;
	var $tmp = "hsl(" + this.hue + "," + this.saturation * 100 + "%," + this.lightness * 100 + "%)";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Hsl.prototype.__class__ = thx.color.Hsl;
Hash = function(p) {
	if( p === $_ ) return;
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	} else null;
	$s.pop();
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	$s.push("Hash::set");
	var $spos = $s.length;
	this.h["$" + key] = value;
	$s.pop();
}
Hash.prototype.get = function(key) {
	$s.push("Hash::get");
	var $spos = $s.length;
	var $tmp = this.h["$" + key];
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.exists = function(key) {
	$s.push("Hash::exists");
	var $spos = $s.length;
	try {
		key = "$" + key;
		var $tmp = this.hasOwnProperty.call(this.h,key);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		for(var i in this.h) if( i == key ) return true;
		$s.pop();
		return false;
	}
	$s.pop();
}
Hash.prototype.remove = function(key) {
	$s.push("Hash::remove");
	var $spos = $s.length;
	if(!this.exists(key)) {
		$s.pop();
		return false;
	}
	delete(this.h["$" + key]);
	$s.pop();
	return true;
	$s.pop();
}
Hash.prototype.keys = function() {
	$s.push("Hash::keys");
	var $spos = $s.length;
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	var $tmp = a.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.iterator = function() {
	$s.push("Hash::iterator");
	var $spos = $s.length;
	var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
		$s.push("Hash::iterator@75");
		var $spos = $s.length;
		var $tmp = this.it.hasNext();
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Hash::iterator@76");
		var $spos = $s.length;
		var i = this.it.next();
		var $tmp = this.ref["$" + i];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.toString = function() {
	$s.push("Hash::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.__class__ = Hash;
thx.util.TestTypeFactory = function(p) {
	$s.push("thx.util.TestTypeFactory::new");
	var $spos = $s.length;
	$s.pop();
}
thx.util.TestTypeFactory.__name__ = ["thx","util","TestTypeFactory"];
thx.util.TestTypeFactory.addTests = function(runner) {
	$s.push("thx.util.TestTypeFactory::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.util.TestTypeFactory());
	$s.pop();
}
thx.util.TestTypeFactory.main = function() {
	$s.push("thx.util.TestTypeFactory::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.util.TestTypeFactory.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.util.TestTypeFactory.prototype.testBind = function() {
	$s.push("thx.util.TestTypeFactory::testBind");
	var $spos = $s.length;
	var factory = new thx.util.TypeFactory().bind(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeFactory::testBind@19");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert["is"](o,thx.util.type.ITest,null,{ fileName : "TestTypeFactory.hx", lineNumber : 21, className : "thx.util.TestTypeFactory", methodName : "testBind"});
	utest.Assert["is"](o,thx.util.type.TestImplementation,null,{ fileName : "TestTypeFactory.hx", lineNumber : 22, className : "thx.util.TestTypeFactory", methodName : "testBind"});
	utest.Assert.equals("hi",o.sayHello(),null,{ fileName : "TestTypeFactory.hx", lineNumber : 23, className : "thx.util.TestTypeFactory", methodName : "testBind"});
	$s.pop();
}
thx.util.TestTypeFactory.prototype.testUnbinded = function() {
	$s.push("thx.util.TestTypeFactory::testUnbinded");
	var $spos = $s.length;
	var factory = new thx.util.TypeFactory();
	utest.Assert.isNull(factory.get(thx.util.type.ITest),null,{ fileName : "TestTypeFactory.hx", lineNumber : 29, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	factory.unbinded = function(cls) {
		$s.push("thx.util.TestTypeFactory::testUnbinded@30");
		var $spos = $s.length;
		if("thx.util.type.ITest" == Type.getClassName(cls)) {
			$s.pop();
			return null;
		}
		try {
			var $tmp = Type.createInstance(cls,[]);
			$s.pop();
			return $tmp;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return null;
		}
		$s.pop();
	};
	utest.Assert.isNull(factory.get(thx.util.type.ITest),null,{ fileName : "TestTypeFactory.hx", lineNumber : 41, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	utest.Assert.notNull(factory.get(thx.util.type.TestImplementation),null,{ fileName : "TestTypeFactory.hx", lineNumber : 42, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	utest.Assert["is"](factory.get(thx.util.type.TestImplementation),thx.util.type.TestImplementation,null,{ fileName : "TestTypeFactory.hx", lineNumber : 43, className : "thx.util.TestTypeFactory", methodName : "testUnbinded"});
	$s.pop();
}
thx.util.TestTypeFactory.prototype.testInstance = function() {
	$s.push("thx.util.TestTypeFactory::testInstance");
	var $spos = $s.length;
	var factory = new thx.util.TypeFactory().instance(thx.util.type.ITest,new thx.util.type.TestImplementation());
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 50, className : "thx.util.TestTypeFactory", methodName : "testInstance"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 53, className : "thx.util.TestTypeFactory", methodName : "testInstance"});
	$s.pop();
}
thx.util.TestTypeFactory.prototype.testMultipleInstances = function() {
	$s.push("thx.util.TestTypeFactory::testMultipleInstances");
	var $spos = $s.length;
	var factory = new thx.util.TypeFactory().bind(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeFactory::testMultipleInstances@58");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 60, className : "thx.util.TestTypeFactory", methodName : "testMultipleInstances"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 63, className : "thx.util.TestTypeFactory", methodName : "testMultipleInstances"});
	$s.pop();
}
thx.util.TestTypeFactory.prototype.testMemoize = function() {
	$s.push("thx.util.TestTypeFactory::testMemoize");
	var $spos = $s.length;
	var factory = new thx.util.TypeFactory().memoize(thx.util.type.ITest,function() {
		$s.push("thx.util.TestTypeFactory::testMemoize@68");
		var $spos = $s.length;
		var $tmp = new thx.util.type.TestImplementation();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(0,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 70, className : "thx.util.TestTypeFactory", methodName : "testMemoize"});
	o.counter++;
	o = factory.get(thx.util.type.ITest);
	utest.Assert.equals(1,o.counter,null,{ fileName : "TestTypeFactory.hx", lineNumber : 73, className : "thx.util.TestTypeFactory", methodName : "testMemoize"});
	$s.pop();
}
thx.util.TestTypeFactory.prototype.__class__ = thx.util.TestTypeFactory;
IntHash = function(p) {
	if( p === $_ ) return;
	$s.push("IntHash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	} else null;
	$s.pop();
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	$s.push("IntHash::set");
	var $spos = $s.length;
	this.h[key] = value;
	$s.pop();
}
IntHash.prototype.get = function(key) {
	$s.push("IntHash::get");
	var $spos = $s.length;
	var $tmp = this.h[key];
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.exists = function(key) {
	$s.push("IntHash::exists");
	var $spos = $s.length;
	var $tmp = this.h[key] != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.remove = function(key) {
	$s.push("IntHash::remove");
	var $spos = $s.length;
	if(this.h[key] == null) {
		$s.pop();
		return false;
	}
	delete(this.h[key]);
	$s.pop();
	return true;
	$s.pop();
}
IntHash.prototype.keys = function() {
	$s.push("IntHash::keys");
	var $spos = $s.length;
	var a = new Array();
	for( x in this.h ) a.push(x);
	var $tmp = a.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.iterator = function() {
	$s.push("IntHash::iterator");
	var $spos = $s.length;
	var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
		$s.push("IntHash::iterator@66");
		var $spos = $s.length;
		var $tmp = this.it.hasNext();
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("IntHash::iterator@67");
		var $spos = $s.length;
		var i = this.it.next();
		var $tmp = this.ref[i];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.toString = function() {
	$s.push("IntHash::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.__class__ = IntHash;
thx.validation.IValidator = function() { }
thx.validation.IValidator.__name__ = ["thx","validation","IValidator"];
thx.validation.IValidator.prototype.validate = null;
thx.validation.IValidator.prototype.isValid = null;
thx.validation.IValidator.prototype.__class__ = thx.validation.IValidator;
thx.validation.Validator = function() { }
thx.validation.Validator.__name__ = ["thx","validation","Validator"];
thx.validation.Validator.prototype.validate = function(value) {
	$s.push("thx.validation.Validator::validate");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Validator.hx", lineNumber : 13, className : "thx.validation.Validator", methodName : "validate"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.validation.Validator.prototype.isValid = function(value) {
	$s.push("thx.validation.Validator::isValid");
	var $spos = $s.length;
	var $tmp = Type.enumEq(this.validate(value),thx.util.Result.Ok);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.validation.Validator.prototype.__class__ = thx.validation.Validator;
thx.validation.Validator.__interfaces__ = [thx.validation.IValidator];
thx.validation.EmailValidator = function(validatedomain) {
	if( validatedomain === $_ ) return;
	$s.push("thx.validation.EmailValidator::new");
	var $spos = $s.length;
	if(validatedomain == null) validatedomain = true;
	this.validateDomain = validatedomain;
	$s.pop();
}
thx.validation.EmailValidator.__name__ = ["thx","validation","EmailValidator"];
thx.validation.EmailValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.EmailValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.EmailValidator.prototype.validateDomain = null;
thx.validation.EmailValidator.prototype.validate = function(value) {
	$s.push("thx.validation.EmailValidator::validate");
	var $spos = $s.length;
	if(!thx.validation.EmailValidator._reEmail.match(value)) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("invalid email address '{0}'",[value],null)]);
		$s.pop();
		return $tmp;
	}
	if(this.validateDomain && !thx.validation.EmailValidator._reEmailDomain.match(value)) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("invalid domain for '{0}'",[value],null)]);
		$s.pop();
		return $tmp;
	}
	var $tmp = thx.util.Result.Ok;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.validation.EmailValidator.prototype.__class__ = thx.validation.EmailValidator;
thx.validation.TestRange = function(p) {
	$s.push("thx.validation.TestRange::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestRange.__name__ = ["thx","validation","TestRange"];
thx.validation.TestRange.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestRange.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestRange.prototype.testValidation = function() {
	$s.push("thx.validation.TestRange::testValidation");
	var $spos = $s.length;
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
	$s.pop();
}
thx.validation.TestRange.prototype.__class__ = thx.validation.TestRange;
TestArrays = function(p) {
	$s.push("TestArrays::new");
	var $spos = $s.length;
	$s.pop();
}
TestArrays.__name__ = ["TestArrays"];
TestArrays.addTests = function(runner) {
	$s.push("TestArrays::addTests");
	var $spos = $s.length;
	runner.addCase(new TestArrays());
	$s.pop();
}
TestArrays.main = function() {
	$s.push("TestArrays::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestArrays.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestArrays.prototype.testCreate = function() {
	$s.push("TestArrays::testCreate");
	var $spos = $s.length;
	utest.Assert.same(2,Arrays.min([4,2,6]),null,null,{ fileName : "TestArrays.hx", lineNumber : 10, className : "TestArrays", methodName : "testCreate"});
	utest.Assert.same([1,0],Arrays.min([[1,2,3],[1,0],[1,2,3,4]],function(d) {
		$s.push("TestArrays::testCreate@11");
		var $spos = $s.length;
		var $tmp = Arrays.min(d);
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 11, className : "TestArrays", methodName : "testCreate"});
	$s.pop();
}
TestArrays.prototype.testMap = function() {
	$s.push("TestArrays::testMap");
	var $spos = $s.length;
	utest.Assert.same(["a","b","c"],Arrays.map([1,2,3],function(v,_) {
		$s.push("TestArrays::testMap@16");
		var $spos = $s.length;
		var $tmp = String.fromCharCode(v + 96);
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 16, className : "TestArrays", methodName : "testMap"});
	utest.Assert.same([0,1,2],Arrays.map([null,null,null],function(_,i) {
		$s.push("TestArrays::testMap@17");
		var $spos = $s.length;
		$s.pop();
		return i;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 17, className : "TestArrays", methodName : "testMap"});
	$s.pop();
}
TestArrays.prototype.testFlattenSplit = function() {
	$s.push("TestArrays::testFlattenSplit");
	var $spos = $s.length;
	var split = Arrays.split([1,2,3,null,4,5,6,null,7,8,9]);
	utest.Assert.same([[1,2,3],[4,5,6],[7,8,9]],split,null,null,{ fileName : "TestArrays.hx", lineNumber : 23, className : "TestArrays", methodName : "testFlattenSplit"});
	utest.Assert.same([1,2,3,4,5,6,7,8,9],Arrays.flatten(split),null,null,{ fileName : "TestArrays.hx", lineNumber : 24, className : "TestArrays", methodName : "testFlattenSplit"});
	$s.pop();
}
TestArrays.prototype.testSplitBy = function() {
	$s.push("TestArrays::testSplitBy");
	var $spos = $s.length;
	utest.Assert.same([[1,2,3],[4,5,6]],Arrays.split([1,2,3,100,4,5,6],function(v,_) {
		$s.push("TestArrays::testSplitBy@29");
		var $spos = $s.length;
		var $tmp = v == 100;
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 29, className : "TestArrays", methodName : "testSplitBy"});
	utest.Assert.same([[1],[3],[5]],Arrays.split([1,2,3,4,5,6],function(_,i) {
		$s.push("TestArrays::testSplitBy@30");
		var $spos = $s.length;
		var $tmp = i % 2 != 0;
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 30, className : "TestArrays", methodName : "testSplitBy"});
	$s.pop();
}
TestArrays.prototype.__class__ = TestArrays;
TestStrings = function(p) {
	$s.push("TestStrings::new");
	var $spos = $s.length;
	$s.pop();
}
TestStrings.__name__ = ["TestStrings"];
TestStrings.addTests = function(runner) {
	$s.push("TestStrings::addTests");
	var $spos = $s.length;
	runner.addCase(new TestStrings());
	$s.pop();
}
TestStrings.main = function() {
	$s.push("TestStrings::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestStrings.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestStrings.prototype.testUcwordsws = function() {
	$s.push("TestStrings::testUcwordsws");
	var $spos = $s.length;
	var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test Test  Test ", test : " test test  test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.ucwordsws(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 39, className : "TestStrings", methodName : "testUcwordsws"});
	}
	$s.pop();
}
TestStrings.prototype.testUcwords = function() {
	$s.push("TestStrings::testUcwords");
	var $spos = $s.length;
	var tests = [{ expected : "Test", test : "test"},{ expected : "Test Test", test : "test test"},{ expected : " Test-Test:Test_Test : Test ", test : " test-test:test_test : test "},{ expected : "Test\nTest", test : "test\ntest"},{ expected : "Test\tTest", test : "test\ttest"}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.ucwords(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 52, className : "TestStrings", methodName : "testUcwords"});
	}
	$s.pop();
}
TestStrings.prototype.testAlphaNum = function() {
	$s.push("TestStrings::testAlphaNum");
	var $spos = $s.length;
	var tests = [{ expected : true, test : "a"},{ expected : true, test : "1a"},{ expected : false, test : " a"},{ expected : false, test : " "},{ expected : false, test : ""}];
	var _g = 0;
	while(_g < tests.length) {
		var item = tests[_g];
		++_g;
		utest.Assert.equals(item.expected,Strings.isAlphaNum(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 65, className : "TestStrings", methodName : "testAlphaNum"});
	}
	$s.pop();
}
TestStrings.prototype.testFormat = function() {
	$s.push("TestStrings::testFormat");
	var $spos = $s.length;
	utest.Assert.equals("CAB",Strings.plainFormat("{2}{0}{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 70, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("C.A.B",Strings.plainFormat("{2}.{0}.{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 71, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("X",Strings.plainFormat("{0:MODIFIER}",["X"]),null,{ fileName : "TestStrings.hx", lineNumber : 72, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("{0INVALIDMODIFIER}",Strings.plainFormat("{0INVALIDMODIFIER}",["X"]),null,{ fileName : "TestStrings.hx", lineNumber : 73, className : "TestStrings", methodName : "testFormat"});
	$s.pop();
}
TestStrings.prototype.testHumanize = function() {
	$s.push("TestStrings::testHumanize");
	var $spos = $s.length;
	utest.Assert.equals("hello world",Strings.humanize("helloWorld"),null,{ fileName : "TestStrings.hx", lineNumber : 84, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("my long string",Strings.humanize("my_long_string"),null,{ fileName : "TestStrings.hx", lineNumber : 85, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("ignore many",Strings.humanize("ignoreMANY"),null,{ fileName : "TestStrings.hx", lineNumber : 86, className : "TestStrings", methodName : "testHumanize"});
	$s.pop();
}
TestStrings.prototype.testWrapColumn = function() {
	$s.push("TestStrings::testWrapColumn");
	var $spos = $s.length;
	var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\nconsectetur\nadipisicing elit,\nsed do eiusmod\ntempor incididunt ut\nlabore et dolore\nmagna aliqua. Ut\nenim ad minim\nveniam, quis nostrud\nexercitation ullamco\nlaboris nisi ut\naliquip ex ea\ncommodo consequat.",Strings.wrapColumns(text,20),null,{ fileName : "TestStrings.hx", lineNumber : 93, className : "TestStrings", methodName : "testWrapColumn"});
	utest.Assert.equals("    Lorem ipsum\n    dolor sit amet,\n    consectetur\n    adipisicing\n    elit, sed do\n    eiusmod tempor\n    incididunt ut\n    labore et dolore\n    magna aliqua. Ut\n    enim ad minim\n    veniam, quis\n    nostrud\n    exercitation\n    ullamco laboris\n    nisi ut aliquip\n    ex ea commodo\n    consequat.",Strings.wrapColumns(text,20,"    "),null,{ fileName : "TestStrings.hx", lineNumber : 110, className : "TestStrings", methodName : "testWrapColumn"});
	$s.pop();
}
TestStrings.prototype.testWrapColumnPreserveNewLines = function() {
	$s.push("TestStrings::testWrapColumnPreserveNewLines");
	var $spos = $s.length;
	var text = "Lorem ipsum dolor sit amet,\n\nconsectetur adipisicing elit";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\n\nconsectetur\nadipisicing elit",Strings.wrapColumns(text,18),null,{ fileName : "TestStrings.hx", lineNumber : 135, className : "TestStrings", methodName : "testWrapColumnPreserveNewLines"});
	$s.pop();
}
TestStrings.prototype.testWrapColumnLong = function() {
	$s.push("TestStrings::testWrapColumnLong");
	var $spos = $s.length;
	var text = "aaaaaaaaaa aaaa aaa aa";
	utest.Assert.equals("aaaaaaaaaa\naaaa\naaa aa",Strings.wrapColumns(text,6),null,{ fileName : "TestStrings.hx", lineNumber : 147, className : "TestStrings", methodName : "testWrapColumnLong"});
	$s.pop();
}
TestStrings.prototype.__class__ = TestStrings;
if(!thx.xml) thx.xml = {}
thx.xml.Namespace = function() { }
thx.xml.Namespace.__name__ = ["thx","xml","Namespace"];
thx.xml.Namespace.qualify = function(name) {
	$s.push("thx.xml.Namespace::qualify");
	var $spos = $s.length;
	var i = name.indexOf(":");
	if(i < 0) {
		$s.pop();
		return null;
	} else {
		var space = thx.xml.Namespace.prefix.get(name.substr(0,i));
		if(null == space) throw new thx.error.Error("unable to find a namespace for {0}",[space],null,{ fileName : "Namespace.hx", lineNumber : 29, className : "thx.xml.Namespace", methodName : "qualify"});
		var $tmp = new thx.xml.NSQualifier(space,name.substr(i + 1));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.Namespace.prototype.__class__ = thx.xml.Namespace;
thx.xml.NSQualifier = function(space,local) {
	if( space === $_ ) return;
	$s.push("thx.xml.NSQualifier::new");
	var $spos = $s.length;
	this.space = space;
	this.local = local;
	$s.pop();
}
thx.xml.NSQualifier.__name__ = ["thx","xml","NSQualifier"];
thx.xml.NSQualifier.prototype.space = null;
thx.xml.NSQualifier.prototype.local = null;
thx.xml.NSQualifier.prototype.__class__ = thx.xml.NSQualifier;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	$s.push("StringTools::urlEncode");
	var $spos = $s.length;
	var $tmp = encodeURIComponent(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.urlDecode = function(s) {
	$s.push("StringTools::urlDecode");
	var $spos = $s.length;
	var $tmp = decodeURIComponent(s.split("+").join(" "));
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.htmlEscape = function(s) {
	$s.push("StringTools::htmlEscape");
	var $spos = $s.length;
	var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.htmlUnescape = function(s) {
	$s.push("StringTools::htmlUnescape");
	var $spos = $s.length;
	var $tmp = s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.startsWith = function(s,start) {
	$s.push("StringTools::startsWith");
	var $spos = $s.length;
	var $tmp = s.length >= start.length && s.substr(0,start.length) == start;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.endsWith = function(s,end) {
	$s.push("StringTools::endsWith");
	var $spos = $s.length;
	var elen = end.length;
	var slen = s.length;
	var $tmp = slen >= elen && s.substr(slen - elen,elen) == end;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.isSpace = function(s,pos) {
	$s.push("StringTools::isSpace");
	var $spos = $s.length;
	var c = s.charCodeAt(pos);
	var $tmp = c >= 9 && c <= 13 || c == 32;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.ltrim = function(s) {
	$s.push("StringTools::ltrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) {
		var $tmp = s.substr(r,l - r);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.rtrim = function(s) {
	$s.push("StringTools::rtrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) {
		var $tmp = s.substr(0,l - r);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.trim = function(s) {
	$s.push("StringTools::trim");
	var $spos = $s.length;
	var $tmp = StringTools.ltrim(StringTools.rtrim(s));
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.rpad = function(s,c,l) {
	$s.push("StringTools::rpad");
	var $spos = $s.length;
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	$s.pop();
	return s;
	$s.pop();
}
StringTools.lpad = function(s,c,l) {
	$s.push("StringTools::lpad");
	var $spos = $s.length;
	var ns = "";
	var sl = s.length;
	if(sl >= l) {
		$s.pop();
		return s;
	}
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	var $tmp = ns + s;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.replace = function(s,sub,by) {
	$s.push("StringTools::replace");
	var $spos = $s.length;
	var $tmp = s.split(sub).join(by);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.hex = function(n,digits) {
	$s.push("StringTools::hex");
	var $spos = $s.length;
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	$s.pop();
	return s;
	$s.pop();
}
StringTools.fastCodeAt = function(s,index) {
	$s.push("StringTools::fastCodeAt");
	var $spos = $s.length;
	var $tmp = s.cca(index);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.isEOF = function(c) {
	$s.push("StringTools::isEOF");
	var $spos = $s.length;
	var $tmp = c != c;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.prototype.__class__ = StringTools;
utest.ui.common.ReportTools = function() { }
utest.ui.common.ReportTools.__name__ = ["utest","ui","common","ReportTools"];
utest.ui.common.ReportTools.hasHeader = function(report,stats) {
	$s.push("utest.ui.common.ReportTools::hasHeader");
	var $spos = $s.length;
	switch( report.displayHeader[1] ) {
	case 1:
		$s.pop();
		return false;
	case 2:
		if(!stats.isOk) {
			$s.pop();
			return true;
		}
		switch( report.displaySuccessResults[1] ) {
		case 1:
			$s.pop();
			return false;
		case 0:
		case 2:
			$s.pop();
			return true;
		}
		break;
	case 0:
		$s.pop();
		return true;
	}
	$s.pop();
}
utest.ui.common.ReportTools.skipResult = function(report,stats,isOk) {
	$s.push("utest.ui.common.ReportTools::skipResult");
	var $spos = $s.length;
	if(!stats.isOk) {
		$s.pop();
		return false;
	}
	var $tmp = (function($this) {
		var $r;
		switch( report.displaySuccessResults[1] ) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.ReportTools.hasOutput = function(report,stats) {
	$s.push("utest.ui.common.ReportTools::hasOutput");
	var $spos = $s.length;
	if(!stats.isOk) {
		$s.pop();
		return true;
	}
	var $tmp = utest.ui.common.ReportTools.hasHeader(report,stats);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.ReportTools.prototype.__class__ = utest.ui.common.ReportTools;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	$s.push("haxe.io.Bytes::new");
	var $spos = $s.length;
	this.length = length;
	this.b = b;
	$s.pop();
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	$s.push("haxe.io.Bytes::alloc");
	var $spos = $s.length;
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	var $tmp = new haxe.io.Bytes(length,a);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.ofString = function(s) {
	$s.push("haxe.io.Bytes::ofString");
	var $spos = $s.length;
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
	var $tmp = new haxe.io.Bytes(a.length,a);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.ofData = function(b) {
	$s.push("haxe.io.Bytes::ofData");
	var $spos = $s.length;
	var $tmp = new haxe.io.Bytes(b.length,b);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	$s.push("haxe.io.Bytes::get");
	var $spos = $s.length;
	var $tmp = this.b[pos];
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	$s.push("haxe.io.Bytes::set");
	var $spos = $s.length;
	this.b[pos] = v & 255;
	$s.pop();
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	$s.push("haxe.io.Bytes::blit");
	var $spos = $s.length;
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		$s.pop();
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
	$s.pop();
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	$s.push("haxe.io.Bytes::sub");
	var $spos = $s.length;
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var $tmp = new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.compare = function(other) {
	$s.push("haxe.io.Bytes::compare");
	var $spos = $s.length;
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) {
			var $tmp = b1[i] - b2[i];
			$s.pop();
			return $tmp;
		}
	}
	var $tmp = this.length - other.length;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	$s.push("haxe.io.Bytes::readString");
	var $spos = $s.length;
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
	$s.pop();
	return s;
	$s.pop();
}
haxe.io.Bytes.prototype.toString = function() {
	$s.push("haxe.io.Bytes::toString");
	var $spos = $s.length;
	var $tmp = this.readString(0,this.length);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.getData = function() {
	$s.push("haxe.io.Bytes::getData");
	var $spos = $s.length;
	var $tmp = this.b;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
thx.util.Message = function(message,params,param) {
	if( message === $_ ) return;
	$s.push("thx.util.Message::new");
	var $spos = $s.length;
	this.message = message;
	if(null == params) this.params = []; else this.params = params;
	if(null != param) this.params.push(param);
	$s.pop();
}
thx.util.Message.__name__ = ["thx","util","Message"];
thx.util.Message.prototype.message = null;
thx.util.Message.prototype.params = null;
thx.util.Message.prototype.toString = function() {
	$s.push("thx.util.Message::toString");
	var $spos = $s.length;
	var $tmp = Strings.plainFormat(this.message,this.params);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.Message.prototype.translate = function(translator) {
	$s.push("thx.util.Message::translate");
	var $spos = $s.length;
	var $tmp = Strings.plainFormat(translator(this.message),this.params);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.Message.prototype.__class__ = thx.util.Message;
thx.util.TestAll = function() { }
thx.util.TestAll.__name__ = ["thx","util","TestAll"];
thx.util.TestAll.addTests = function(runner) {
	$s.push("thx.util.TestAll::addTests");
	var $spos = $s.length;
	thx.util.TestTypeFactory.addTests(runner);
	thx.util.TestTypeServiceLocator.addTests(runner);
	runner.addCase(new thx.util.TestResults());
	$s.pop();
}
thx.util.TestAll.main = function() {
	$s.push("thx.util.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.util.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.util.TestAll.prototype.__class__ = thx.util.TestAll;
if(!thx.doc) thx.doc = {}
thx.doc.TestAll = function(p) {
	$s.push("thx.doc.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.doc.TestAll.__name__ = ["thx","doc","TestAll"];
thx.doc.TestAll.addTests = function(runner) {
	$s.push("thx.doc.TestAll::addTests");
	var $spos = $s.length;
	$s.pop();
}
thx.doc.TestAll.main = function() {
	$s.push("thx.doc.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.doc.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.doc.TestAll.prototype.p = function(s) {
	$s.push("thx.doc.TestAll::p");
	var $spos = $s.length;
	var $tmp = thx.doc.Fragment.Paragraph([this.t(s)]);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.doc.TestAll.prototype.t = function(s) {
	$s.push("thx.doc.TestAll::t");
	var $spos = $s.length;
	var $tmp = thx.doc.Fragment.Text(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.doc.TestAll.prototype.__class__ = thx.doc.TestAll;
utest.ui.common.IReport = function() { }
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype.displaySuccessResults = null;
utest.ui.common.IReport.prototype.displayHeader = null;
utest.ui.common.IReport.prototype.setHandler = null;
utest.ui.common.IReport.prototype.__class__ = utest.ui.common.IReport;
thx.color.TestHsl = function(p) {
	$s.push("thx.color.TestHsl::new");
	var $spos = $s.length;
	$s.pop();
}
thx.color.TestHsl.__name__ = ["thx","color","TestHsl"];
thx.color.TestHsl.prototype.testBasics = function() {
	$s.push("thx.color.TestHsl::testBasics");
	var $spos = $s.length;
	var tests = [{ rgb : thx.color.Rgb.fromFloats(1.00,1.00,1.00), hsl : new thx.color.Hsl(0,0,1)},{ rgb : thx.color.Rgb.fromFloats(0.50,0.50,0.50), hsl : new thx.color.Hsl(0,0,0.5)},{ rgb : thx.color.Rgb.fromFloats(0.00,0.00,0.00), hsl : new thx.color.Hsl(0,0,0)},{ rgb : thx.color.Rgb.fromFloats(1.00,0.00,0.00), hsl : new thx.color.Hsl(0,1,0.5)},{ rgb : thx.color.Rgb.fromFloats(0.75,0.75,0.00), hsl : new thx.color.Hsl(60,1,0.375)},{ rgb : thx.color.Rgb.fromFloats(0.00,0.50,0.00), hsl : new thx.color.Hsl(120,1,0.25)},{ rgb : thx.color.Rgb.fromFloats(0.50,1.00,1.00), hsl : new thx.color.Hsl(180,1,0.75)},{ rgb : thx.color.Rgb.fromFloats(0.50,0.50,1.00), hsl : new thx.color.Hsl(240,1,0.75)},{ rgb : thx.color.Rgb.fromFloats(0.75,0.25,0.75), hsl : new thx.color.Hsl(300,0.5,0.5)}];
	var _g = 0;
	while(_g < tests.length) {
		var test = tests[_g];
		++_g;
		utest.Assert.isTrue(thx.color.Rgb.equals(test.rgb,test.hsl),"expected " + test.rgb + " but was " + test.hsl + " for " + test.hsl.toHslString(),{ fileName : "TestHsl.hx", lineNumber : 28, className : "thx.color.TestHsl", methodName : "testBasics"});
		var c = thx.color.Hsl.toHsl(test.rgb);
		utest.Assert.isTrue(thx.color.Rgb.equals(c,test.hsl),"expected " + c + " but was " + test.hsl + " for " + test.hsl.toHslString(),{ fileName : "TestHsl.hx", lineNumber : 30, className : "thx.color.TestHsl", methodName : "testBasics"});
	}
	$s.pop();
}
thx.color.TestHsl.prototype.__class__ = thx.color.TestHsl;
thx.validation.StringLengthValidator = function(minlength,maxlength) {
	if( minlength === $_ ) return;
	$s.push("thx.validation.StringLengthValidator::new");
	var $spos = $s.length;
	if(minlength == null) minlength = 0;
	this.minLength = minlength;
	this.maxLength = maxlength;
	$s.pop();
}
thx.validation.StringLengthValidator.__name__ = ["thx","validation","StringLengthValidator"];
thx.validation.StringLengthValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.StringLengthValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.StringLengthValidator.prototype.minLength = null;
thx.validation.StringLengthValidator.prototype.maxLength = null;
thx.validation.StringLengthValidator.prototype.validate = function(value) {
	$s.push("thx.validation.StringLengthValidator::validate");
	var $spos = $s.length;
	if(value.length < this.minLength) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at least {0} character(s) long",[this.minLength],null)]);
		$s.pop();
		return $tmp;
	} else if(null != this.maxLength && value.length > this.maxLength) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value should be shorter than {0} character(s)",[this.maxLength],null)]);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.StringLengthValidator.prototype.__class__ = thx.validation.StringLengthValidator;
utest.ui.Report = function() { }
utest.ui.Report.__name__ = ["utest","ui","Report"];
utest.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	$s.push("utest.ui.Report::create");
	var $spos = $s.length;
	var report;
	report = new utest.ui.text.HtmlReport(runner,null,true);
	if(null == displaySuccessResults) report.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors; else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = utest.ui.common.HeaderDisplayMode.ShowHeaderWithResults; else report.displayHeader = headerDisplayMode;
	$s.pop();
	return report;
	$s.pop();
}
utest.ui.Report.prototype.__class__ = utest.ui.Report;
thx.xml.DocumentFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.xml.DocumentFormat::new");
	var $spos = $s.length;
	this.stripComments = false;
	$s.pop();
}
thx.xml.DocumentFormat.__name__ = ["thx","xml","DocumentFormat"];
thx.xml.DocumentFormat.prototype.nodeFormat = null;
thx.xml.DocumentFormat.prototype.stripComments = null;
thx.xml.DocumentFormat.prototype.format = function(node) {
	$s.push("thx.xml.DocumentFormat::format");
	var $spos = $s.length;
	var $tmp = this.formatNode(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatNode = function(node) {
	$s.push("thx.xml.DocumentFormat::formatNode");
	var $spos = $s.length;
	var t = node.nodeType;
	if(Xml.Element == t) {
		var $tmp = this.formatElement(node);
		$s.pop();
		return $tmp;
	} else if(Xml.PCData == t) {
		var $tmp = this.formatPCData(node);
		$s.pop();
		return $tmp;
	} else if(Xml.CData == t) {
		var $tmp = this.formatCData(node);
		$s.pop();
		return $tmp;
	} else if(Xml.Document == t) {
		var $tmp = this.formatDocument(node);
		$s.pop();
		return $tmp;
	} else if(Xml.DocType == t) {
		var $tmp = this.formatDocType(node);
		$s.pop();
		return $tmp;
	} else if(Xml.Prolog == t) {
		var $tmp = this.formatProlog(node);
		$s.pop();
		return $tmp;
	} else if(Xml.Comment == t) {
		var $tmp = this.formatComment(node);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = (function($this) {
			var $r;
			throw "invalid node type: " + Std.string(t);
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatElement = function(node) {
	$s.push("thx.xml.DocumentFormat::formatElement");
	var $spos = $s.length;
	if(this.isEmpty(node)) {
		var $tmp = this.formatEmptyElement(node);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = this.formatOpenElement(node) + this.formatChildren(node) + this.formatCloseElement(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatEmptyElement = function(node) {
	$s.push("thx.xml.DocumentFormat::formatEmptyElement");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatEmptyElement(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatOpenElement = function(node) {
	$s.push("thx.xml.DocumentFormat::formatOpenElement");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatOpenElement(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatCloseElement = function(node) {
	$s.push("thx.xml.DocumentFormat::formatCloseElement");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatCloseElement(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatChildren = function(node) {
	$s.push("thx.xml.DocumentFormat::formatChildren");
	var $spos = $s.length;
	var buf = new StringBuf();
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		buf.b[buf.b.length] = this.formatNode(child);
	}
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatPCData = function(node) {
	$s.push("thx.xml.DocumentFormat::formatPCData");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatPCData(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatCData = function(node) {
	$s.push("thx.xml.DocumentFormat::formatCData");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatCData(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatDocument = function(node) {
	$s.push("thx.xml.DocumentFormat::formatDocument");
	var $spos = $s.length;
	var $tmp = this.formatChildren(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatDocType = function(node) {
	$s.push("thx.xml.DocumentFormat::formatDocType");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatDocType(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatProlog = function(node) {
	$s.push("thx.xml.DocumentFormat::formatProlog");
	var $spos = $s.length;
	var $tmp = this.nodeFormat.formatProlog(node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.formatComment = function(node) {
	$s.push("thx.xml.DocumentFormat::formatComment");
	var $spos = $s.length;
	if(this.stripComments) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.nodeFormat.formatComment(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.DocumentFormat.prototype.isEmpty = function(node) {
	$s.push("thx.xml.DocumentFormat::isEmpty");
	var $spos = $s.length;
	var $tmp = !node.iterator().hasNext();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.DocumentFormat.prototype.__class__ = thx.xml.DocumentFormat;
thx.xml.AutoDocumentFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.xml.AutoDocumentFormat::new");
	var $spos = $s.length;
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this._level = 0;
	this._begin = true;
	$s.pop();
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
	$s.push("thx.xml.AutoDocumentFormat::indentWrap");
	var $spos = $s.length;
	var $tmp = this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.format = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::format");
	var $spos = $s.length;
	var $tmp = Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatDocType = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatDocType");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatProlog = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatProlog");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatComment = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatComment");
	var $spos = $s.length;
	if(this.stripComments) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.indentWrap(this.nodeFormat.formatComment(node));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatEmptyElement = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatEmptyElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatOpenElement = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatOpenElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatCloseElement = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatCloseElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatChildren = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatChildren");
	var $spos = $s.length;
	this._level++;
	var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	this._level--;
	$s.pop();
	return content;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatDocument = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatDocument");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatPCData = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatPCData");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.formatCData = function(node) {
	$s.push("thx.xml.AutoDocumentFormat::formatCData");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AutoDocumentFormat.prototype.__class__ = thx.xml.AutoDocumentFormat;
if(!thx.error) thx.error = {}
thx.error.Error = function(message,params,param,pos) {
	if( message === $_ ) return;
	$s.push("thx.error.Error::new");
	var $spos = $s.length;
	thx.util.Message.call(this,message,params,param);
	this.pos = pos;
	$s.pop();
}
thx.error.Error.__name__ = ["thx","error","Error"];
thx.error.Error.__super__ = thx.util.Message;
for(var k in thx.util.Message.prototype ) thx.error.Error.prototype[k] = thx.util.Message.prototype[k];
thx.error.Error.prototype.pos = null;
thx.error.Error.prototype.inner = null;
thx.error.Error.prototype.setInner = function(inner) {
	$s.push("thx.error.Error::setInner");
	var $spos = $s.length;
	this.inner = inner;
	$s.pop();
	return this;
	$s.pop();
}
thx.error.Error.prototype.toString = function() {
	$s.push("thx.error.Error::toString");
	var $spos = $s.length;
	try {
		var $tmp = Strings.plainFormat(this.message,this.params);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		var ps = this.pos.className + "." + this.pos.methodName + "(" + this.pos.lineNumber + ")";
		var pa;
		if(0 == this.params.length) pa = "no parameters passed"; else pa = "wrong parameters passed ({0})";
		throw new thx.error.Error(pa + " for pattern '{1}' at {2}",[this.params.join(", "),this.message,ps],null,{ fileName : "Error.hx", lineNumber : 39, className : "thx.error.Error", methodName : "toString"});
	}
	$s.pop();
}
thx.error.Error.prototype.__class__ = thx.error.Error;
Arrays = function() { }
Arrays.__name__ = ["Arrays"];
Arrays.pushIf = function(arr,condition,value) {
	$s.push("Arrays::pushIf");
	var $spos = $s.length;
	if(null != condition) {
		if(condition) arr.push(value);
	} else if(null != value) arr.push(value);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.pushR = function(arr,value) {
	$s.push("Arrays::pushR");
	var $spos = $s.length;
	arr.push(value);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.removeR = function(arr,value) {
	$s.push("Arrays::removeR");
	var $spos = $s.length;
	arr.remove(value);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.filter = function(arr,f) {
	$s.push("Arrays::filter");
	var $spos = $s.length;
	var result = [];
	var _g = 0;
	while(_g < arr.length) {
		var i = arr[_g];
		++_g;
		if(f(i)) result.push(i);
	}
	$s.pop();
	return result;
	$s.pop();
}
Arrays.min = function(arr,f) {
	$s.push("Arrays::min");
	var $spos = $s.length;
	if(arr.length == 0) {
		$s.pop();
		return null;
	}
	if(null == f) {
		var a = arr[0], p = 0;
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compare(a,arr[i]) > 0) a = arr[p = i];
		}
		var $tmp = arr[p];
		$s.pop();
		return $tmp;
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
		var $tmp = arr[p];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Arrays.max = function(arr,f) {
	$s.push("Arrays::max");
	var $spos = $s.length;
	if(arr.length == 0) {
		$s.pop();
		return null;
	}
	if(null == f) {
		var a = arr[0], p = 0;
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compare(a,arr[i]) < 0) a = arr[p = i];
		}
		var $tmp = arr[p];
		$s.pop();
		return $tmp;
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
		var $tmp = arr[p];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Arrays.flatten = function(arr) {
	$s.push("Arrays::flatten");
	var $spos = $s.length;
	var r = [];
	var _g = 0;
	while(_g < arr.length) {
		var v = arr[_g];
		++_g;
		r = r.concat(v);
	}
	$s.pop();
	return r;
	$s.pop();
}
Arrays.map = function(arr,f) {
	$s.push("Arrays::map");
	var $spos = $s.length;
	var $tmp = arr.map(f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.order = function(arr,f) {
	$s.push("Arrays::order");
	var $spos = $s.length;
	arr.sort(null == f?$closure(Reflect,"compare"):f);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.split = function(arr,f) {
	$s.push("Arrays::split");
	var $spos = $s.length;
	if(null == f) f = function(v,_) {
		$s.push("Arrays::split@95");
		var $spos = $s.length;
		var $tmp = v == null;
		$s.pop();
		return $tmp;
		$s.pop();
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
	$s.pop();
	return arrays;
	$s.pop();
}
Arrays.exists = function(arr,value,f) {
	$s.push("Arrays::exists");
	var $spos = $s.length;
	if(null != f) {
		var _g = 0;
		while(_g < arr.length) {
			var v = arr[_g];
			++_g;
			if(f(v)) {
				$s.pop();
				return true;
			}
		}
	} else {
		var _g = 0;
		while(_g < arr.length) {
			var v = arr[_g];
			++_g;
			if(v == value) {
				$s.pop();
				return true;
			}
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Arrays.prototype.__class__ = Arrays;
if(!utest.ui.text) utest.ui.text = {}
utest.ui.text.HtmlReport = function(runner,outputHandler,traceRedirected) {
	if( runner === $_ ) return;
	$s.push("utest.ui.text.HtmlReport::new");
	var $spos = $s.length;
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null == outputHandler) this.setHandler($closure(this,"_handler")); else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
	$s.pop();
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
	$s.push("utest.ui.text.HtmlReport::setHandler");
	var $spos = $s.length;
	this.handler = handler;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.redirectTrace = function() {
	$s.push("utest.ui.text.HtmlReport::redirectTrace");
	var $spos = $s.length;
	if(this.traceRedirected) {
		$s.pop();
		return;
	}
	this._traces = [];
	this.oldTrace = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(this,"_trace");
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.restoreTrace = function() {
	$s.push("utest.ui.text.HtmlReport::restoreTrace");
	var $spos = $s.length;
	if(!this.traceRedirected) {
		$s.pop();
		return;
	}
	haxe.Log.trace = this.oldTrace;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype._traceTime = null;
utest.ui.text.HtmlReport.prototype._trace = function(v,infos) {
	$s.push("utest.ui.text.HtmlReport::_trace");
	var $spos = $s.length;
	var time = haxe.Timer.stamp();
	var delta = this._traceTime == null?0:time - this._traceTime;
	this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.Stack.callStack()});
	this._traceTime = haxe.Timer.stamp();
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.startTime = null;
utest.ui.text.HtmlReport.prototype.start = function(e) {
	$s.push("utest.ui.text.HtmlReport::start");
	var $spos = $s.length;
	this.startTime = haxe.Timer.stamp();
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.cls = function(stats) {
	$s.push("utest.ui.text.HtmlReport::cls");
	var $spos = $s.length;
	if(stats.hasErrors) {
		$s.pop();
		return "error";
	} else if(stats.hasFailures) {
		$s.pop();
		return "failure";
	} else if(stats.hasWarnings) {
		$s.pop();
		return "warn";
	} else {
		$s.pop();
		return "ok";
	}
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.resultNumbers = function(buf,stats) {
	$s.push("utest.ui.text.HtmlReport::resultNumbers");
	var $spos = $s.length;
	var numbers = [];
	if(stats.assertations == 1) numbers.push("<strong>1</strong> test"); else numbers.push("<strong>" + stats.assertations + "</strong> tests");
	if(stats.successes != stats.assertations) {
		if(stats.successes == 1) numbers.push("<strong>1</strong> pass"); else if(stats.successes > 0) numbers.push("<strong>" + stats.successes + "</strong> passes");
	}
	if(stats.errors == 1) numbers.push("<strong>1</strong> error"); else if(stats.errors > 0) numbers.push("<strong>" + stats.errors + "</strong> errors");
	if(stats.failures == 1) numbers.push("<strong>1</strong> failure"); else if(stats.failures > 0) numbers.push("<strong>" + stats.failures + "</strong> failures");
	if(stats.warnings == 1) numbers.push("<strong>1</strong> warning"); else if(stats.warnings > 0) numbers.push("<strong>" + stats.warnings + "</strong> warnings");
	buf.b[buf.b.length] = numbers.join(", ");
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.blockNumbers = function(buf,stats) {
	$s.push("utest.ui.text.HtmlReport::blockNumbers");
	var $spos = $s.length;
	buf.b[buf.b.length] = "<div class=\"" + this.cls(stats) + "bg statnumbers\">";
	this.resultNumbers(buf,stats);
	buf.b[buf.b.length] = "</div>";
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.formatStack = function(stack,addNL) {
	$s.push("utest.ui.text.HtmlReport::formatStack");
	var $spos = $s.length;
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
	var $tmp = "<div>" + s + "</div>" + nl;
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.addFixture = function(buf,result,name,isOk) {
	$s.push("utest.ui.text.HtmlReport::addFixture");
	var $spos = $s.length;
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) {
		$s.pop();
		return;
	}
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
		switch( assertation[1] ) {
		case 0:
			var pos = assertation[2];
			break;
		case 1:
			var pos = assertation[3], msg = assertation[2];
			messages.push("<strong>line " + pos.lineNumber + "</strong>: <em>" + StringTools.htmlEscape(msg) + "</em>");
			break;
		case 2:
			var s = assertation[3], e = assertation[2];
			messages.push("<strong>error</strong>: <em>" + StringTools.htmlEscape(Std.string(e)) + "</em>\n" + this.formatStack(s));
			break;
		case 3:
			var s = assertation[3], e = assertation[2];
			messages.push("<strong>setup error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 4:
			var s = assertation[3], e = assertation[2];
			messages.push("<strong>tear-down error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 5:
			var s = assertation[3], missedAsyncs = assertation[2];
			messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
			break;
		case 6:
			var s = assertation[3], e = assertation[2];
			messages.push("<strong>async error</strong>: " + StringTools.htmlEscape(Std.string(e)) + "\n" + this.formatStack(s));
			break;
		case 7:
			var msg = assertation[2];
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
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.addClass = function(buf,result,name,isOk) {
	$s.push("utest.ui.text.HtmlReport::addClass");
	var $spos = $s.length;
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.addPackages = function(buf,result,isOk) {
	$s.push("utest.ui.text.HtmlReport::addPackages");
	var $spos = $s.length;
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) {
		$s.pop();
		return;
	}
	buf.b[buf.b.length] = "<ul id=\"utest-results-packages\">\n";
	var _g = 0, _g1 = result.packageNames(false);
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		this.addPackage(buf,result.getPackage(name),name,isOk);
	}
	buf.b[buf.b.length] = "</ul>\n";
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.addPackage = function(buf,result,name,isOk) {
	$s.push("utest.ui.text.HtmlReport::addPackage");
	var $spos = $s.length;
	if(utest.ui.common.ReportTools.skipResult(this,result.stats,isOk)) {
		$s.pop();
		return;
	}
	if(name == "" && result.classNames().length == 0) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getHeader = function() {
	$s.push("utest.ui.text.HtmlReport::getHeader");
	var $spos = $s.length;
	var buf = new StringBuf();
	if(!utest.ui.common.ReportTools.hasHeader(this,this.result.stats)) {
		$s.pop();
		return "";
	}
	var end = haxe.Timer.stamp();
	var time = Std["int"]((end - this.startTime) * 1000) / 1000;
	var msg = "TEST OK";
	if(this.result.stats.hasErrors) msg = "TEST ERRORS"; else if(this.result.stats.hasFailures) msg = "TEST FAILED"; else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
	buf.b[buf.b.length] = "<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n";
	buf.b[buf.b.length] = "<div class=\"headerinfo\">";
	this.resultNumbers(buf,this.result.stats);
	buf.b[buf.b.length] = " performed on <strong>" + utest.ui.text.HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ";
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getTrace = function() {
	$s.push("utest.ui.text.HtmlReport::getTrace");
	var $spos = $s.length;
	var buf = new StringBuf();
	if(this._traces == null || this._traces.length == 0) {
		$s.pop();
		return "";
	}
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
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getResults = function() {
	$s.push("utest.ui.text.HtmlReport::getResults");
	var $spos = $s.length;
	var buf = new StringBuf();
	this.addPackages(buf,this.result,this.result.stats.isOk);
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getAll = function() {
	$s.push("utest.ui.text.HtmlReport::getAll");
	var $spos = $s.length;
	if(!utest.ui.common.ReportTools.hasOutput(this,this.result.stats)) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.getHeader() + this.getTrace() + this.getResults();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getHtml = function(title) {
	$s.push("utest.ui.text.HtmlReport::getHtml");
	var $spos = $s.length;
	if(null == title) title = "utest: " + utest.ui.text.HtmlReport.platform;
	var s = this.getAll();
	if("" == s) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.wrapHtml(title,s);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.result = null;
utest.ui.text.HtmlReport.prototype.complete = function(result) {
	$s.push("utest.ui.text.HtmlReport::complete");
	var $spos = $s.length;
	this.result = result;
	this.handler(this);
	this.restoreTrace();
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.formatTime = function(t) {
	$s.push("utest.ui.text.HtmlReport::formatTime");
	var $spos = $s.length;
	var $tmp = Math.round(t * 1000) + " ms";
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.cssStyle = function() {
	$s.push("utest.ui.text.HtmlReport::cssStyle");
	var $spos = $s.length;
	$s.pop();
	return "body, dd, dt {\r\n\tfont-family: Verdana, Arial, Sans-serif;\r\n\tfont-size: 12px;\r\n}\r\ndl {\r\n\twidth: 180px;\r\n}\r\ndd, dt {\r\n\tmargin : 0;\r\n\tpadding : 2px 5px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n}\r\ndd.value {\r\n\ttext-align: center;\r\n\tbackground-color: #eeeeee;\r\n}\r\ndt {\r\n\ttext-align: left;\r\n\tbackground-color: #e6e6e6;\r\n\tfloat: left;\r\n\twidth: 100px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nh1 {\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n\tpadding: 5px 0 4px 0;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 18px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 2px 0px 2px;\r\n}\r\n\r\nh2 {\r\n\tfont-weight: bold;\r\n\tpadding: 2px 0 2px 8px;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 13px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 0 0px 0;\r\n\tbackground-color: #FFFFFF;\r\n\tcolor: #777777;\r\n}\r\n\r\nh2.classname {\r\n\tcolor: #000000;\r\n}\r\n\r\n.okbg {\r\n\tbackground-color: #66FF55;\r\n}\r\n.errorbg {\r\n\tbackground-color: #CC1100;\r\n}\r\n.failurebg {\r\n\tbackground-color: #EE3322;\r\n}\r\n.warnbg {\r\n\tbackground-color: #FFCC99;\r\n}\r\n.headerinfo {\r\n\ttext-align: right;\r\n\tfont-size: 11px;\r\n\tfont - color: 0xCCCCCC;\r\n\tmargin: 0 2px 5px 2px;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tpadding: 2px;\r\n}\r\n\r\nli {\r\n\tpadding: 4px;\r\n\tmargin: 2px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tbackground-color: #e6e6e6;\r\n}\r\n\r\nli.fixture {\r\n\tbackground-color: #f6f6f6;\r\n\tpadding-bottom: 6px;\r\n}\r\n\r\ndiv.fixturedetails {\r\n\tpadding-left: 108px;\r\n}\r\n\r\nul {\r\n\tpadding: 0;\r\n\tmargin: 6px 0 0 0;\r\n\tlist-style-type: none;\r\n}\r\n\r\nol {\r\n\tpadding: 0 0 0 28px;\r\n\tmargin: 0px 0 0 0;\r\n}\r\n\r\n.statnumbers {\r\n\tpadding: 2px 8px;\r\n}\r\n\r\n.fixtureresult {\r\n\twidth: 100px;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tpadding: 1px;\r\n\tmargin: 0 0 0 0;\r\n}\r\n\r\n.testoutput {\r\n\tborder: 1px dashed #CCCCCC;\r\n\tmargin: 4px 0 0 0;\r\n\tpadding: 4px 8px;\r\n\tbackground-color: #eeeeee;\r\n}\r\n\r\nspan.tracepos, span.traceposempty {\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tfont-size: 9px;\r\n\twidth: 170px;\r\n\tmargin: 2px 0 0 2px;\r\n}\r\n\r\nspan.tracepos:hover {\r\n\tcursor : pointer;\r\n\tbackground-color: #ffff99;\r\n}\r\n\r\nspan.tracemsg {\r\n\tdisplay: block;\r\n\tmargin-left: 180px;\r\n\tbackground-color: #eeeeee;\r\n\tpadding: 7px;\r\n}\r\n\r\nspan.tracetime {\r\n\tdisplay: block;\r\n\tfloat: right;\r\n\tmargin: 2px;\r\n\tfont-size: 9px;\r\n\tcolor: #777777;\r\n}\r\n\r\n\r\ndiv.trace ol {\r\n\tpadding: 0 0 0 40px;\r\n\tcolor: #777777;\r\n}\r\n\r\ndiv.trace li {\r\n\tpadding: 0;\r\n}\r\n\r\ndiv.trace li div.li {\r\n\tcolor: #000000;\r\n}\r\n\r\ndiv.trace h2 {\r\n\tmargin: 0 2px 0px 2px;\r\n\tpadding-left: 4px;\r\n}\r\n\r\n.tracepackage {\r\n\tcolor: #777777;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.clr {\r\n\tclear: both;\r\n}\r\n\r\n#utesttip {\r\n\tmargin-top: -3px;\r\n\tmargin-left: 170px;\r\n\tfont-size: 9px;\r\n}\r\n\r\n#utesttip li {\r\n\tmargin: 0;\r\n\tbackground-color: #ffff99;\r\n\tpadding: 2px 4px;\r\n\tborder: 0;\r\n\tborder-bottom: 1px dashed #ffff33;\r\n}";
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.jsScript = function() {
	$s.push("utest.ui.text.HtmlReport::jsScript");
	var $spos = $s.length;
	$s.pop();
	return "function utestTooltip(ref, text) {\r\n\tvar el = document.getElementById(\"utesttip\");\r\n\tif(!el) {\r\n\t\tvar el = document.createElement(\"div\")\r\n\t\tel.id = \"utesttip\";\r\n\t\tel.style.position = \"absolute\";\r\n\t\tdocument.body.appendChild(el)\r\n\t}\r\n\tvar p = utestFindPos(ref);\r\n\tel.style.left = p[0];\r\n\tel.style.top = p[1];\r\n\tel.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n\tvar left = 0;\r\n\tvar top = 0;\r\n\tdo {\r\n\t\tleft += el.offsetLeft;\r\n\t\ttop += el.offsetTop;\r\n\t} while(el = el.offsetParent)\r\n\treturn [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n\tvar el = document.getElementById(\"utesttip\")\r\n\tif(el)\r\n\t\tdocument.body.removeChild(el)\r\n}";
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.wrapHtml = function(title,s) {
	$s.push("utest.ui.text.HtmlReport::wrapHtml");
	var $spos = $s.length;
	var $tmp = "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\r\n\t\t\t<style type=\"text/css\">" + this.cssStyle() + "</style>\r\n\t\t\t<script type=\"text/javascript\">\n" + this.jsScript() + "\n</script>\n</head>\r\n\t\t\t<body>\n" + s + "\n</body>\n</html>";
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype._handler = function(report) {
	$s.push("utest.ui.text.HtmlReport::_handler");
	var $spos = $s.length;
	var isDef = function(v) {
		$s.push("utest.ui.text.HtmlReport::_handler@611");
		var $spos = $s.length;
		var $tmp = typeof v != 'undefined';
		$s.pop();
		return $tmp;
		$s.pop();
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
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.__class__ = utest.ui.text.HtmlReport;
utest.ui.text.HtmlReport.__interfaces__ = [utest.ui.common.IReport];
TestFloats = function(p) {
	$s.push("TestFloats::new");
	var $spos = $s.length;
	$s.pop();
}
TestFloats.__name__ = ["TestFloats"];
TestFloats.addTests = function(runner) {
	$s.push("TestFloats::addTests");
	var $spos = $s.length;
	runner.addCase(new TestFloats());
	$s.pop();
}
TestFloats.main = function() {
	$s.push("TestFloats::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestFloats.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestFloats.prototype.testNormalize = function() {
	$s.push("TestFloats::testNormalize");
	var $spos = $s.length;
	utest.Assert.floatEquals(0.0,Floats.normalize(0.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 9, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 10, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.5,Floats.normalize(0.5),null,null,{ fileName : "TestFloats.hx", lineNumber : 11, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.0,Floats.normalize(-1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 12, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(10.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 13, className : "TestFloats", methodName : "testNormalize"});
	$s.pop();
}
TestFloats.prototype.testAbs = function() {
	$s.push("TestFloats::testAbs");
	var $spos = $s.length;
	utest.Assert.floatEquals(0.1,0.1 < 0?-0.1:0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 18, className : "TestFloats", methodName : "testAbs"});
	utest.Assert.floatEquals(0.1,-0.1 < 0?0.1:-0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 19, className : "TestFloats", methodName : "testAbs"});
	$s.pop();
}
TestFloats.prototype.testClamp = function() {
	$s.push("TestFloats::testClamp");
	var $spos = $s.length;
	utest.Assert.floatEquals(10,Floats.clamp(0,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 25, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(10,Floats.clamp(10,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 26, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(50,Floats.clamp(50,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 27, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(100,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 28, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(110,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 29, className : "TestFloats", methodName : "testClamp"});
	$s.pop();
}
TestFloats.prototype.testClampSym = function() {
	$s.push("TestFloats::testClampSym");
	var $spos = $s.length;
	utest.Assert.floatEquals(-10,Floats.clampSym(-100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 34, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(10,Floats.clampSym(100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 35, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(0,Floats.clampSym(0,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 36, className : "TestFloats", methodName : "testClampSym"});
	$s.pop();
}
TestFloats.prototype.testMax = function() {
	$s.push("TestFloats::testMax");
	var $spos = $s.length;
	utest.Assert.floatEquals(10,10,null,null,{ fileName : "TestFloats.hx", lineNumber : 41, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 42, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(-5,-5,null,null,{ fileName : "TestFloats.hx", lineNumber : 43, className : "TestFloats", methodName : "testMax"});
	$s.pop();
}
TestFloats.prototype.testMin = function() {
	$s.push("TestFloats::testMin");
	var $spos = $s.length;
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 48, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 49, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 50, className : "TestFloats", methodName : "testMin"});
	$s.pop();
}
TestFloats.prototype.testRange = function() {
	$s.push("TestFloats::testRange");
	var $spos = $s.length;
	utest.Assert.same([0.1,0.2,0.3,0.4],Floats.range(0.1,0.5,0.1),null,null,{ fileName : "TestFloats.hx", lineNumber : 55, className : "TestFloats", methodName : "testRange"});
	$s.pop();
}
TestFloats.prototype.testSign = function() {
	$s.push("TestFloats::testSign");
	var $spos = $s.length;
	utest.Assert.isTrue((0.1 < 0?-1:1) > 0,null,{ fileName : "TestFloats.hx", lineNumber : 60, className : "TestFloats", methodName : "testSign"});
	utest.Assert.isTrue((-0.1 < 0?-1:1) < 0,null,{ fileName : "TestFloats.hx", lineNumber : 61, className : "TestFloats", methodName : "testSign"});
	$s.pop();
}
TestFloats.prototype.testWrap = function() {
	$s.push("TestFloats::testWrap");
	var $spos = $s.length;
	utest.Assert.floatEquals(5,Floats.wrap(-1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 66, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 67, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(5,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 68, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(6,Floats.wrap(6,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 69, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(10,Floats.wrap(10,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 70, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(11,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 71, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(29,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 72, className : "TestFloats", methodName : "testWrap"});
	$s.pop();
}
TestFloats.prototype.testCircularWrap = function() {
	$s.push("TestFloats::testCircularWrap");
	var $spos = $s.length;
	utest.Assert.floatEquals(0,Floats.circularWrap(0,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 77, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 78, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(0,Floats.circularWrap(100,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 79, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 80, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 81, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 82, className : "TestFloats", methodName : "testCircularWrap"});
	$s.pop();
}
TestFloats.prototype.testInterpolate = function() {
	$s.push("TestFloats::testInterpolate");
	var $spos = $s.length;
	utest.Assert.equals(100,Floats.interpolate(0.0,null,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 87, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(150,Floats.interpolate(0.5,null,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 88, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(200,Floats.interpolate(1.0,null,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 89, className : "TestFloats", methodName : "testInterpolate"});
	$s.pop();
}
TestFloats.prototype.__class__ = TestFloats;
Ints = function() { }
Ints.__name__ = ["Ints"];
Ints.range = function(start,stop,step) {
	$s.push("Ints::range");
	var $spos = $s.length;
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Ints.hx", lineNumber : 16, className : "Ints", methodName : "range"});
	var range = [], i = -1, j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	$s.pop();
	return range;
	$s.pop();
}
Ints.sign = function(v) {
	$s.push("Ints::sign");
	var $spos = $s.length;
	var $tmp = v < 0?-1:1;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.abs = function(a) {
	$s.push("Ints::abs");
	var $spos = $s.length;
	var $tmp = a < 0?-a:a;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.min = function(a,b) {
	$s.push("Ints::min");
	var $spos = $s.length;
	var $tmp = a < b?a:b;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.max = function(a,b) {
	$s.push("Ints::max");
	var $spos = $s.length;
	var $tmp = a > b?a:b;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.wrap = function(v,min,max) {
	$s.push("Ints::wrap");
	var $spos = $s.length;
	var $tmp = Math.round(Floats.wrap(v,min,max));
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.clamp = function(v,min,max) {
	$s.push("Ints::clamp");
	var $spos = $s.length;
	if(v < min) {
		$s.pop();
		return min;
	} else if(v > max) {
		$s.pop();
		return max;
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
Ints.clampSym = function(v,max) {
	$s.push("Ints::clampSym");
	var $spos = $s.length;
	if(v < -max) {
		var $tmp = -max;
		$s.pop();
		return $tmp;
	} else if(v > max) {
		$s.pop();
		return max;
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
Ints.interpolate = function(f,interpolator,min,max) {
	$s.push("Ints::interpolate");
	var $spos = $s.length;
	if(max == null) max = 100.0;
	if(min == null) min = 0.0;
	var $tmp = Math.round(Floats.interpolate(f,interpolator,min,max));
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.prototype.__class__ = Ints;
thx.validation.DateRangeValidator = function(min,max,mininclusive,maxinclusive) {
	if( min === $_ ) return;
	$s.push("thx.validation.DateRangeValidator::new");
	var $spos = $s.length;
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
	$s.pop();
}
thx.validation.DateRangeValidator.__name__ = ["thx","validation","DateRangeValidator"];
thx.validation.DateRangeValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.DateRangeValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.DateRangeValidator.prototype.min = null;
thx.validation.DateRangeValidator.prototype.max = null;
thx.validation.DateRangeValidator.prototype.minInclusive = null;
thx.validation.DateRangeValidator.prototype.maxInclusive = null;
thx.validation.DateRangeValidator.prototype.validate = function(value) {
	$s.push("thx.validation.DateRangeValidator::validate");
	var $spos = $s.length;
	if(null != this.min && (this.minInclusive && value.getTime() < this.min.getTime() || !this.minInclusive && value.getTime() <= this.min.getTime())) {
		if(this.minInclusive) {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at least {0:C}",[this.min],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be greater than {0:C}",[this.min],null)]);
			$s.pop();
			return $tmp;
		}
	} else if(null != this.max && (this.maxInclusive && value.getTime() > this.max.getTime() || !this.maxInclusive && value.getTime() >= this.max.getTime())) {
		if(this.maxInclusive) {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0:C}",[this.max],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be lower than {0:C}",[this.max],null)]);
			$s.pop();
			return $tmp;
		}
	} else {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.DateRangeValidator.prototype.__class__ = thx.validation.DateRangeValidator;
thx.error.TestNullArgument = function(p) {
	$s.push("thx.error.TestNullArgument::new");
	var $spos = $s.length;
	$s.pop();
}
thx.error.TestNullArgument.__name__ = ["thx","error","TestNullArgument"];
thx.error.TestNullArgument.throwMe = function(XXX) {
	$s.push("thx.error.TestNullArgument::throwMe");
	var $spos = $s.length;
	if(null == XXX) throw new thx.error.NullArgument("XXX",{ fileName : "TestNullArgument.hx", lineNumber : 11, className : "thx.error.TestNullArgument", methodName : "throwMe"});
	$s.pop();
}
thx.error.TestNullArgument.prototype.testNullArgument = function() {
	$s.push("thx.error.TestNullArgument::testNullArgument");
	var $spos = $s.length;
	try {
		thx.error.TestNullArgument.throwMe(null);
	} catch( $e0 ) {
		if( js.Boot.__instanceof($e0,thx.error.NullArgument) ) {
			var e = $e0;
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			var s = e.toString();
			utest.Assert.stringContains("XXX",s,"string '" + s + "' does not contain 'XXX'",{ fileName : "TestNullArgument.hx", lineNumber : 21, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
			$s.pop();
			return;
		} else ;
		var e = $e0;
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		utest.Assert.fail("wrong exception type: " + Std.string(e),{ fileName : "TestNullArgument.hx", lineNumber : 24, className : "thx.error.TestNullArgument", methodName : "testNullArgument"});
	}
	$s.pop();
}
thx.error.TestNullArgument.prototype.__class__ = thx.error.TestNullArgument;
thx.html.TextHandler = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.TextHandler::new");
	var $spos = $s.length;
	this.results = "";
	$s.pop();
}
thx.html.TextHandler.__name__ = ["thx","html","TextHandler"];
thx.html.TextHandler.prototype.results = null;
thx.html.TextHandler.prototype.start = function(tag,attrs,unary) {
	$s.push("thx.html.TextHandler::start");
	var $spos = $s.length;
	this.results += "<" + tag;
	var _g1 = 0, _g = attrs.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.results += " " + attrs[i].name + "=\"" + attrs[i].escaped + "\"";
	}
	this.results += (unary?"/":"") + ">";
	$s.pop();
}
thx.html.TextHandler.prototype.end = function(tag) {
	$s.push("thx.html.TextHandler::end");
	var $spos = $s.length;
	this.results += "</" + tag + ">";
	$s.pop();
}
thx.html.TextHandler.prototype.chars = function(text) {
	$s.push("thx.html.TextHandler::chars");
	var $spos = $s.length;
	this.results += text;
	$s.pop();
}
thx.html.TextHandler.prototype.comment = function(text) {
	$s.push("thx.html.TextHandler::comment");
	var $spos = $s.length;
	this.results += "<!--" + text + "-->";
	$s.pop();
}
thx.html.TextHandler.prototype.doctype = function(text) {
	$s.push("thx.html.TextHandler::doctype");
	var $spos = $s.length;
	this.results += "<!DOCTYPE " + text + ">";
	$s.pop();
}
thx.html.TextHandler.prototype.declaration = function(text) {
	$s.push("thx.html.TextHandler::declaration");
	var $spos = $s.length;
	this.results += "<?xml " + text + ">";
	$s.pop();
}
thx.html.TextHandler.prototype.__class__ = thx.html.TextHandler;
thx.html.TextHandler.__interfaces__ = [thx.html.HtmlHandler];
if(!thx.type) thx.type = {}
thx.type.TestTypes = function(p) {
	$s.push("thx.type.TestTypes::new");
	var $spos = $s.length;
	$s.pop();
}
thx.type.TestTypes.__name__ = ["thx","type","TestTypes"];
thx.type.TestTypes.addTests = function(runner) {
	$s.push("thx.type.TestTypes::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.type.TestTypes());
	$s.pop();
}
thx.type.TestTypes.main = function() {
	$s.push("thx.type.TestTypes::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.type.TestTypes.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.type.TestTypes.prototype.testSameAs = function() {
	$s.push("thx.type.TestTypes::testSameAs");
	var $spos = $s.length;
	utest.Assert.isTrue(thx.type.Types.sameAs(1,2),null,{ fileName : "TestTypes.hx", lineNumber : 33, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isTrue(thx.type.Types.sameAs("a","b"),null,{ fileName : "TestTypes.hx", lineNumber : 34, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 35, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 36, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(thx.type.Types.sameAs(1,null),null,{ fileName : "TestTypes.hx", lineNumber : 37, className : "thx.type.TestTypes", methodName : "testSameAs"});
	$s.pop();
}
thx.type.TestTypes.prototype.testAs = function() {
	$s.push("thx.type.TestTypes::testAs");
	var $spos = $s.length;
	utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 42, className : "thx.type.TestTypes", methodName : "testAs"});
	utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 43, className : "thx.type.TestTypes", methodName : "testAs"});
	$s.pop();
}
thx.type.TestTypes.prototype.testOf = function() {
	$s.push("thx.type.TestTypes::testOf");
	var $spos = $s.length;
	utest.Assert.isNull(Std["is"](1,String)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 48, className : "thx.type.TestTypes", methodName : "testOf"});
	utest.Assert.equals(1,Std["is"](1,Int)?1:null,null,{ fileName : "TestTypes.hx", lineNumber : 49, className : "thx.type.TestTypes", methodName : "testOf"});
	$s.pop();
}
thx.type.TestTypes.prototype.testClassName = function() {
	$s.push("thx.type.TestTypes::testClassName");
	var $spos = $s.length;
	utest.Assert.equals("TestTypes",Type.getClassName(Type.getClass(this)).split(".").pop(),null,{ fileName : "TestTypes.hx", lineNumber : 54, className : "thx.type.TestTypes", methodName : "testClassName"});
	$s.pop();
}
thx.type.TestTypes.prototype.testFullName = function() {
	$s.push("thx.type.TestTypes::testFullName");
	var $spos = $s.length;
	utest.Assert.equals("thx.type.TestTypes",Type.getClassName(Type.getClass(this)),null,{ fileName : "TestTypes.hx", lineNumber : 59, className : "thx.type.TestTypes", methodName : "testFullName"});
	$s.pop();
}
thx.type.TestTypes.prototype.testTypeName = function() {
	$s.push("thx.type.TestTypes::testTypeName");
	var $spos = $s.length;
	utest.Assert.equals("null",thx.type.Types.typeName(null),null,{ fileName : "TestTypes.hx", lineNumber : 64, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("thx.type.TestTypes",thx.type.Types.typeName(this),null,{ fileName : "TestTypes.hx", lineNumber : 65, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Int",thx.type.Types.typeName(1),null,{ fileName : "TestTypes.hx", lineNumber : 66, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Bool",thx.type.Types.typeName(true),null,{ fileName : "TestTypes.hx", lineNumber : 67, className : "thx.type.TestTypes", methodName : "testTypeName"});
	$s.pop();
}
thx.type.TestTypes.prototype.__class__ = thx.type.TestTypes;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	$s.push("js.Boot::__unhtml");
	var $spos = $s.length;
	var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Boot.__trace = function(v,i) {
	$s.push("js.Boot::__trace");
	var $spos = $s.length;
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
	$s.pop();
}
js.Boot.__clear_trace = function() {
	$s.push("js.Boot::__clear_trace");
	var $spos = $s.length;
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = ""; else null;
	$s.pop();
}
js.Boot.__closure = function(o,f) {
	$s.push("js.Boot::__closure");
	var $spos = $s.length;
	var m = o[f];
	if(m == null) {
		$s.pop();
		return null;
	}
	var f1 = function() {
		$s.push("js.Boot::__closure@67");
		var $spos = $s.length;
		var $tmp = m.apply(o,arguments);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	f1.scope = o;
	f1.method = m;
	$s.pop();
	return f1;
	$s.pop();
}
js.Boot.__string_rec = function(o,s) {
	$s.push("js.Boot::__string_rec");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return "null";
	}
	if(s.length >= 5) {
		$s.pop();
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) {
					var $tmp = o[0];
					$s.pop();
					return $tmp;
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				var $tmp = str + ")";
				$s.pop();
				return $tmp;
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
			$s.pop();
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				$s.pop();
				return s2;
			}
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
		$s.pop();
		return str;
	case "function":
		$s.pop();
		return "<function>";
	case "string":
		$s.pop();
		return o;
	default:
		var $tmp = String(o);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__interfLoop = function(cc,cl) {
	$s.push("js.Boot::__interfLoop");
	var $spos = $s.length;
	if(cc == null) {
		$s.pop();
		return false;
	}
	if(cc == cl) {
		$s.pop();
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) {
				$s.pop();
				return true;
			}
		}
	}
	var $tmp = js.Boot.__interfLoop(cc.__super__,cl);
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Boot.__instanceof = function(o,cl) {
	$s.push("js.Boot::__instanceof");
	var $spos = $s.length;
	try {
		if(o instanceof cl) {
			if(cl == Array) {
				var $tmp = o.__enum__ == null;
				$s.pop();
				return $tmp;
			}
			$s.pop();
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) {
			$s.pop();
			return true;
		}
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		if(cl == null) {
			$s.pop();
			return false;
		}
	}
	switch(cl) {
	case Int:
		var $tmp = Math.ceil(o%2147483648.0) === o;
		$s.pop();
		return $tmp;
	case Float:
		var $tmp = typeof(o) == "number";
		$s.pop();
		return $tmp;
	case Bool:
		var $tmp = o === true || o === false;
		$s.pop();
		return $tmp;
	case String:
		var $tmp = typeof(o) == "string";
		$s.pop();
		return $tmp;
	case Dynamic:
		$s.pop();
		return true;
	default:
		if(o == null) {
			$s.pop();
			return false;
		}
		var $tmp = o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__init = function() {
	$s.push("js.Boot::__init");
	var $spos = $s.length;
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		$s.push("js.Boot::__init@205");
		var $spos = $s.length;
		this.splice(i,0,x);
		$s.pop();
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		$s.push("js.Boot::__init@208");
		var $spos = $s.length;
		var idx = this.indexOf(obj);
		if(idx == -1) {
			$s.pop();
			return false;
		}
		this.splice(idx,1);
		$s.pop();
		return true;
		$s.pop();
	}:function(obj) {
		$s.push("js.Boot::__init@213");
		var $spos = $s.length;
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				$s.pop();
				return true;
			}
			i++;
		}
		$s.pop();
		return false;
		$s.pop();
	};
	Array.prototype.iterator = function() {
		$s.push("js.Boot::__init@225");
		var $spos = $s.length;
		var $tmp = { cur : 0, arr : this, hasNext : function() {
			$s.push("js.Boot::__init@225@229");
			var $spos = $s.length;
			var $tmp = this.cur < this.arr.length;
			$s.pop();
			return $tmp;
			$s.pop();
		}, next : function() {
			$s.push("js.Boot::__init@225@232");
			var $spos = $s.length;
			var $tmp = this.arr[this.cur++];
			$s.pop();
			return $tmp;
			$s.pop();
		}};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		$s.push("js.Boot::__init@239");
		var $spos = $s.length;
		var x = this.cca(i);
		if(x != x) {
			$s.pop();
			return null;
		}
		$s.pop();
		return x;
		$s.pop();
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		$s.push("js.Boot::__init@246");
		var $spos = $s.length;
		if(pos != null && pos != 0 && len != null && len < 0) {
			$s.pop();
			return "";
		}
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		var $tmp = oldsub.apply(this,[pos,len]);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$closure = js.Boot.__closure;
	$s.pop();
}
js.Boot.prototype.__class__ = js.Boot;
thx.validation.TestStringLength = function(p) {
	$s.push("thx.validation.TestStringLength::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestStringLength.__name__ = ["thx","validation","TestStringLength"];
thx.validation.TestStringLength.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestStringLength.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestStringLength.prototype.testValidation = function() {
	$s.push("thx.validation.TestStringLength::testValidation");
	var $spos = $s.length;
	var validator = new thx.validation.StringLengthValidator(3,5);
	this.assertValidation(validator.validate(""),false,null,{ fileName : "TestStringLength.hx", lineNumber : 10, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abc"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 11, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abcde"),true,null,{ fileName : "TestStringLength.hx", lineNumber : 12, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	this.assertValidation(validator.validate("abcdef"),false,null,{ fileName : "TestStringLength.hx", lineNumber : 13, className : "thx.validation.TestStringLength", methodName : "testValidation"});
	$s.pop();
}
thx.validation.TestStringLength.prototype.__class__ = thx.validation.TestStringLength;
utest.ui.common.ResultStats = function(p) {
	if( p === $_ ) return;
	$s.push("utest.ui.common.ResultStats::new");
	var $spos = $s.length;
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
	$s.pop();
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
	$s.push("utest.ui.common.ResultStats::addSuccesses");
	var $spos = $s.length;
	if(v == 0) {
		$s.pop();
		return;
	}
	this.assertations += v;
	this.successes += v;
	this.onAddSuccesses.dispatch(v);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.addFailures = function(v) {
	$s.push("utest.ui.common.ResultStats::addFailures");
	var $spos = $s.length;
	if(v == 0) {
		$s.pop();
		return;
	}
	this.assertations += v;
	this.failures += v;
	this.hasFailures = this.failures > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddFailures.dispatch(v);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.addErrors = function(v) {
	$s.push("utest.ui.common.ResultStats::addErrors");
	var $spos = $s.length;
	if(v == 0) {
		$s.pop();
		return;
	}
	this.assertations += v;
	this.errors += v;
	this.hasErrors = this.errors > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddErrors.dispatch(v);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.addWarnings = function(v) {
	$s.push("utest.ui.common.ResultStats::addWarnings");
	var $spos = $s.length;
	if(v == 0) {
		$s.pop();
		return;
	}
	this.assertations += v;
	this.warnings += v;
	this.hasWarnings = this.warnings > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddWarnings.dispatch(v);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.sum = function(other) {
	$s.push("utest.ui.common.ResultStats::sum");
	var $spos = $s.length;
	this.addSuccesses(other.successes);
	this.addFailures(other.failures);
	this.addErrors(other.errors);
	this.addWarnings(other.warnings);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.subtract = function(other) {
	$s.push("utest.ui.common.ResultStats::subtract");
	var $spos = $s.length;
	this.addSuccesses(-other.successes);
	this.addFailures(-other.failures);
	this.addErrors(-other.errors);
	this.addWarnings(-other.warnings);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.wire = function(dependant) {
	$s.push("utest.ui.common.ResultStats::wire");
	var $spos = $s.length;
	dependant.onAddSuccesses.add($closure(this,"addSuccesses"));
	dependant.onAddFailures.add($closure(this,"addFailures"));
	dependant.onAddErrors.add($closure(this,"addErrors"));
	dependant.onAddWarnings.add($closure(this,"addWarnings"));
	this.sum(dependant);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.unwire = function(dependant) {
	$s.push("utest.ui.common.ResultStats::unwire");
	var $spos = $s.length;
	dependant.onAddSuccesses.remove($closure(this,"addSuccesses"));
	dependant.onAddFailures.remove($closure(this,"addFailures"));
	dependant.onAddErrors.remove($closure(this,"addErrors"));
	dependant.onAddWarnings.remove($closure(this,"addWarnings"));
	this.subtract(dependant);
	$s.pop();
}
utest.ui.common.ResultStats.prototype.__class__ = utest.ui.common.ResultStats;
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
thx.color.NamedColors.prototype.__class__ = thx.color.NamedColors;
thx.validation.SingleLineValidator = function(p) {
	$s.push("thx.validation.SingleLineValidator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.SingleLineValidator.__name__ = ["thx","validation","SingleLineValidator"];
thx.validation.SingleLineValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.SingleLineValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.SingleLineValidator.prototype.validate = function(value) {
	$s.push("thx.validation.SingleLineValidator::validate");
	var $spos = $s.length;
	if(thx.validation.SingleLineValidator._re.match(value)) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value contains one ore more line breaks",[],null)]);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.SingleLineValidator.prototype.__class__ = thx.validation.SingleLineValidator;
thx.validation.RangeValidator = function(min,max,mininclusive,maxinclusive) {
	if( min === $_ ) return;
	$s.push("thx.validation.RangeValidator::new");
	var $spos = $s.length;
	if(maxinclusive == null) maxinclusive = true;
	if(mininclusive == null) mininclusive = true;
	this.min = min;
	this.max = max;
	this.minInclusive = mininclusive;
	this.maxInclusive = maxinclusive;
	$s.pop();
}
thx.validation.RangeValidator.__name__ = ["thx","validation","RangeValidator"];
thx.validation.RangeValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.RangeValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.RangeValidator.prototype.min = null;
thx.validation.RangeValidator.prototype.max = null;
thx.validation.RangeValidator.prototype.minInclusive = null;
thx.validation.RangeValidator.prototype.maxInclusive = null;
thx.validation.RangeValidator.prototype.validate = function(value) {
	$s.push("thx.validation.RangeValidator::validate");
	var $spos = $s.length;
	if(null != this.min && (this.minInclusive && value < this.min || !this.minInclusive && value <= this.min)) {
		if(this.minInclusive) {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at least {0}",[this.min],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be greater than {0}",[this.min],null)]);
			$s.pop();
			return $tmp;
		}
	} else if(null != this.max && (this.maxInclusive && value > this.max || !this.maxInclusive && value >= this.max)) {
		if(this.maxInclusive) {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0}",[this.max],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be lower than {0}",[this.max],null)]);
			$s.pop();
			return $tmp;
		}
	} else {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.RangeValidator.prototype.__class__ = thx.validation.RangeValidator;
thx.validation.TestIncrement = function(p) {
	$s.push("thx.validation.TestIncrement::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestIncrement.__name__ = ["thx","validation","TestIncrement"];
thx.validation.TestIncrement.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestIncrement.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestIncrement.prototype.testValidation = function() {
	$s.push("thx.validation.TestIncrement::testValidation");
	var $spos = $s.length;
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
	$s.pop();
}
thx.validation.TestIncrement.prototype.__class__ = thx.validation.TestIncrement;
thx.util.TypeFactory = function(p) {
	if( p === $_ ) return;
	$s.push("thx.util.TypeFactory::new");
	var $spos = $s.length;
	this._binders = new Hash();
	$s.pop();
}
thx.util.TypeFactory.__name__ = ["thx","util","TypeFactory"];
thx.util.TypeFactory.prototype._binders = null;
thx.util.TypeFactory.prototype.instance = function(cls,o) {
	$s.push("thx.util.TypeFactory::instance");
	var $spos = $s.length;
	var $tmp = this.bind(cls,function() {
		$s.push("thx.util.TypeFactory::instance@18");
		var $spos = $s.length;
		$s.pop();
		return o;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.TypeFactory.prototype.bind = function(cls,f) {
	$s.push("thx.util.TypeFactory::bind");
	var $spos = $s.length;
	this._binders.set(Type.getClassName(cls),f);
	$s.pop();
	return this;
	$s.pop();
}
thx.util.TypeFactory.prototype.memoize = function(cls,f) {
	$s.push("thx.util.TypeFactory::memoize");
	var $spos = $s.length;
	var r = null;
	var $tmp = this.bind(cls,function() {
		$s.push("thx.util.TypeFactory::memoize@30");
		var $spos = $s.length;
		if(null == r) r = f();
		$s.pop();
		return r;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.TypeFactory.prototype.unbinded = function(cls) {
	$s.push("thx.util.TypeFactory::unbinded");
	var $spos = $s.length;
	$s.pop();
	return null;
	$s.pop();
}
thx.util.TypeFactory.prototype.get = function(cls) {
	$s.push("thx.util.TypeFactory::get");
	var $spos = $s.length;
	var f = this._binders.get(Type.getClassName(cls));
	if(null == f) {
		var $tmp = this.unbinded(cls);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = f();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.util.TypeFactory.prototype.__class__ = thx.util.TypeFactory;
thx.data.TestMemoryLoader = function(p) {
	$s.push("thx.data.TestMemoryLoader::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.TestMemoryLoader.__name__ = ["thx","data","TestMemoryLoader"];
thx.data.TestMemoryLoader.prototype.testLoad = function() {
	$s.push("thx.data.TestMemoryLoader::testLoad");
	var $spos = $s.length;
	var loader = new thx.data.MemoryLoader("my test");
	var f = utest.Assert.createEvent(function(s) {
		$s.push("thx.data.TestMemoryLoader::testLoad@10");
		var $spos = $s.length;
		utest.Assert.stringContains("test",s,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 11, className : "thx.data.TestMemoryLoader", methodName : "testLoad"});
		$s.pop();
	});
	loader.load(f);
	$s.pop();
}
thx.data.TestMemoryLoader.prototype.testError = function() {
	$s.push("thx.data.TestMemoryLoader::testError");
	var $spos = $s.length;
	var loader = new thx.data.MemoryLoader(null);
	var e = utest.Assert.createEvent(function(s) {
		$s.push("thx.data.TestMemoryLoader::testError@19");
		var $spos = $s.length;
		utest.Assert.isTrue(true,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 20, className : "thx.data.TestMemoryLoader", methodName : "testError"});
		$s.pop();
	});
	var h = function(_) {
		$s.push("thx.data.TestMemoryLoader::testError@22");
		var $spos = $s.length;
		haxe.Log.trace("should never reach this point",{ fileName : "TestMemoryLoader.hx", lineNumber : 23, className : "thx.data.TestMemoryLoader", methodName : "testError"});
		$s.pop();
	};
	loader.load(h,e);
	$s.pop();
}
thx.data.TestMemoryLoader.prototype.__class__ = thx.data.TestMemoryLoader;
utest.ui.common.ClassResult = function(className,setupName,teardownName) {
	if( className === $_ ) return;
	$s.push("utest.ui.common.ClassResult::new");
	var $spos = $s.length;
	this.fixtures = new Hash();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest.ui.common.ResultStats();
	$s.pop();
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
	$s.push("utest.ui.common.ClassResult::add");
	var $spos = $s.length;
	if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
	this.stats.wire(result.stats);
	this.methods++;
	this.fixtures.set(result.methodName,result);
	$s.pop();
}
utest.ui.common.ClassResult.prototype.get = function(method) {
	$s.push("utest.ui.common.ClassResult::get");
	var $spos = $s.length;
	var $tmp = this.fixtures.get(method);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.ClassResult.prototype.exists = function(method) {
	$s.push("utest.ui.common.ClassResult::exists");
	var $spos = $s.length;
	var $tmp = this.fixtures.exists(method);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.ClassResult.prototype.methodNames = function(errorsHavePriority) {
	$s.push("utest.ui.common.ClassResult::methodNames");
	var $spos = $s.length;
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
			$s.push("utest.ui.common.ClassResult::methodNames@54");
			var $spos = $s.length;
			var $as = me.get(a).stats;
			var bs = me.get(b).stats;
			if($as.hasErrors) {
				var $tmp = !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors);
				$s.pop();
				return $tmp;
			} else if(bs.hasErrors) {
				$s.pop();
				return 1;
			} else if($as.hasFailures) {
				var $tmp = !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures);
				$s.pop();
				return $tmp;
			} else if(bs.hasFailures) {
				$s.pop();
				return 1;
			} else if($as.hasWarnings) {
				var $tmp = !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings);
				$s.pop();
				return $tmp;
			} else if(bs.hasWarnings) {
				$s.pop();
				return 1;
			} else {
				var $tmp = Reflect.compare(a,b);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		});
	} else names.sort(function(a,b) {
		$s.push("utest.ui.common.ClassResult::methodNames@74");
		var $spos = $s.length;
		var $tmp = Reflect.compare(a,b);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return names;
	$s.pop();
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
	$s.push("haxe.Stack::callStack");
	var $spos = $s.length;
	var $tmp = haxe.Stack.makeStack("$s");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.exceptionStack = function() {
	$s.push("haxe.Stack::exceptionStack");
	var $spos = $s.length;
	var $tmp = haxe.Stack.makeStack("$e");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.toString = function(stack) {
	$s.push("haxe.Stack::toString");
	var $spos = $s.length;
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	var $tmp = b.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.itemToString = function(b,s) {
	$s.push("haxe.Stack::itemToString");
	var $spos = $s.length;
	switch( s[1] ) {
	case 0:
		b.b[b.b.length] = "a C function";
		break;
	case 1:
		var m = s[2];
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m;
		break;
	case 2:
		var line = s[4], file = s[3], s1 = s[2];
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
		var meth = s[3], cname = s[2];
		b.b[b.b.length] = cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth;
		break;
	case 4:
		var n = s[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n;
		break;
	}
	$s.pop();
}
haxe.Stack.makeStack = function(s) {
	$s.push("haxe.Stack::makeStack");
	var $spos = $s.length;
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		} catch( e ) {
			$r = (function($this) {
				var $r;
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				$r = [];
				return $r;
			}($this));
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
	$s.pop();
	return m;
	$s.pop();
}
haxe.Stack.prototype.__class__ = haxe.Stack;
thx.xml.TestXmlFormat = function(p) {
	$s.push("thx.xml.TestXmlFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.xml.TestXmlFormat.__name__ = ["thx","xml","TestXmlFormat"];
thx.xml.TestXmlFormat.createCompleteDom = function() {
	$s.push("thx.xml.TestXmlFormat::createCompleteDom");
	var $spos = $s.length;
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
	$s.pop();
	return xml;
	$s.pop();
}
thx.xml.TestXmlFormat.addTests = function(runner) {
	$s.push("thx.xml.TestXmlFormat::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.xml.TestXmlFormat());
	$s.pop();
}
thx.xml.TestXmlFormat.main = function() {
	$s.push("thx.xml.TestXmlFormat::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.xml.TestXmlFormat.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testBase = function() {
	$s.push("thx.xml.TestXmlFormat::testBase");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat(false);
	utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><!--COMMENT--><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 39, className : "thx.xml.TestXmlFormat", methodName : "testBase"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testStripComments = function() {
	$s.push("thx.xml.TestXmlFormat::testStripComments");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat(false);
	writer.stripComments = true;
	utest.Assert.equals("<?PROLOG?><!DOCTYPE DOCTYPE><body><child><nested/></child><child> </child><![CDATA[CDATA]]>PCDATA</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 46, className : "thx.xml.TestXmlFormat", methodName : "testStripComments"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testAutoFormat = function() {
	$s.push("thx.xml.TestXmlFormat::testAutoFormat");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat();
	utest.Assert.equals("<?PROLOG?>\n<!DOCTYPE DOCTYPE>\n<body>\n  <!--COMMENT-->\n  <child>\n    <nested/>\n  </child>\n  <child>\n    \n  </child>\n  <![CDATA[CDATA]]>\n  PCDATA\n</body>",writer.format(thx.xml.TestXmlFormat.createCompleteDom()),null,{ fileName : "TestXmlFormat.hx", lineNumber : 52, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testAutoFormat2 = function() {
	$s.push("thx.xml.TestXmlFormat::testAutoFormat2");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat();
	var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
	utest.Assert.equals("<html>\n  <head>\n    <title>\n      hello\n    </title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>\n          one\n        </li>\n        <li>\n          two\n        </li>\n        <li>\n          three\n        </li>\n      </ul>\n    </div>\n  </body>\n</html>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 60, className : "thx.xml.TestXmlFormat", methodName : "testAutoFormat2"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testAutoWidth = function() {
	$s.push("thx.xml.TestXmlFormat::testAutoWidth");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat();
	writer.wrapColumns = 36;
	var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
	utest.Assert.equals("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 89, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidth"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.testAutoWidthWithInlineElements = function() {
	$s.push("thx.xml.TestXmlFormat::testAutoWidthWithInlineElements");
	var $spos = $s.length;
	var writer = new thx.xml.XmlFormat();
	writer.wrapColumns = 36;
	var xml = "<body><b>Lorem</b> ipsum <b>dolor sit</b> amet<p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
	utest.Assert.equals("<body>\n  <b>\n    Lorem\n  </b>\n  ipsum\n  <b>\n    dolor sit\n  </b>\n  amet\n  <p>\n    consectetur\n    <b>\n      adipisicing\n    </b>\n    elit,\n    <b>\n      sed do\n    </b>\n    eiusmod tempor incididunt ut\n    labore et dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",writer.format(Xml.parse(xml)),null,{ fileName : "TestXmlFormat.hx", lineNumber : 121, className : "thx.xml.TestXmlFormat", methodName : "testAutoWidthWithInlineElements"});
	$s.pop();
}
thx.xml.TestXmlFormat.prototype.__class__ = thx.xml.TestXmlFormat;
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
	$s.push("Type::getClass");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return null;
	}
	if(o.__enum__ != null) {
		$s.pop();
		return null;
	}
	var $tmp = o.__class__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getEnum = function(o) {
	$s.push("Type::getEnum");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return null;
	}
	var $tmp = o.__enum__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getSuperClass = function(c) {
	$s.push("Type::getSuperClass");
	var $spos = $s.length;
	var $tmp = c.__super__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getClassName = function(c) {
	$s.push("Type::getClassName");
	var $spos = $s.length;
	var a = c.__name__;
	var $tmp = a.join(".");
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getEnumName = function(e) {
	$s.push("Type::getEnumName");
	var $spos = $s.length;
	var a = e.__ename__;
	var $tmp = a.join(".");
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.resolveClass = function(name) {
	$s.push("Type::resolveClass");
	var $spos = $s.length;
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		cl = null;
	}
	if(cl == null || cl.__name__ == null) {
		$s.pop();
		return null;
	}
	$s.pop();
	return cl;
	$s.pop();
}
Type.resolveEnum = function(name) {
	$s.push("Type::resolveEnum");
	var $spos = $s.length;
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		e = null;
	}
	if(e == null || e.__ename__ == null) {
		$s.pop();
		return null;
	}
	$s.pop();
	return e;
	$s.pop();
}
Type.createInstance = function(cl,args) {
	$s.push("Type::createInstance");
	var $spos = $s.length;
	if(args.length <= 3) {
		var $tmp = new cl(args[0],args[1],args[2]);
		$s.pop();
		return $tmp;
	}
	if(args.length > 8) throw "Too many arguments";
	var $tmp = new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.createEmptyInstance = function(cl) {
	$s.push("Type::createEmptyInstance");
	var $spos = $s.length;
	var $tmp = new cl($_);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.createEnum = function(e,constr,params) {
	$s.push("Type::createEnum");
	var $spos = $s.length;
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		var $tmp = f.apply(e,params);
		$s.pop();
		return $tmp;
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	$s.pop();
	return f;
	$s.pop();
}
Type.createEnumIndex = function(e,index,params) {
	$s.push("Type::createEnumIndex");
	var $spos = $s.length;
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	var $tmp = Type.createEnum(e,c,params);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getInstanceFields = function(c) {
	$s.push("Type::getInstanceFields");
	var $spos = $s.length;
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	$s.pop();
	return a;
	$s.pop();
}
Type.getClassFields = function(c) {
	$s.push("Type::getClassFields");
	var $spos = $s.length;
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	$s.pop();
	return a;
	$s.pop();
}
Type.getEnumConstructs = function(e) {
	$s.push("Type::getEnumConstructs");
	var $spos = $s.length;
	var a = e.__constructs__;
	var $tmp = a.copy();
	$s.pop();
	return $tmp;
	$s.pop();
}
Type["typeof"] = function(v) {
	$s.push("Type::typeof");
	var $spos = $s.length;
	switch(typeof(v)) {
	case "boolean":
		var $tmp = ValueType.TBool;
		$s.pop();
		return $tmp;
	case "string":
		var $tmp = ValueType.TClass(String);
		$s.pop();
		return $tmp;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			var $tmp = ValueType.TInt;
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TFloat;
		$s.pop();
		return $tmp;
	case "object":
		if(v == null) {
			var $tmp = ValueType.TNull;
			$s.pop();
			return $tmp;
		}
		var e = v.__enum__;
		if(e != null) {
			var $tmp = ValueType.TEnum(e);
			$s.pop();
			return $tmp;
		}
		var c = v.__class__;
		if(c != null) {
			var $tmp = ValueType.TClass(c);
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TObject;
		$s.pop();
		return $tmp;
	case "function":
		if(v.__name__ != null) {
			var $tmp = ValueType.TObject;
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TFunction;
		$s.pop();
		return $tmp;
	case "undefined":
		var $tmp = ValueType.TNull;
		$s.pop();
		return $tmp;
	default:
		var $tmp = ValueType.TUnknown;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.enumEq = function(a,b) {
	$s.push("Type::enumEq");
	var $spos = $s.length;
	if(a == b) {
		$s.pop();
		return true;
	}
	try {
		if(a[0] != b[0]) {
			$s.pop();
			return false;
		}
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) {
				$s.pop();
				return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) {
			$s.pop();
			return false;
		}
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
Type.enumConstructor = function(e) {
	$s.push("Type::enumConstructor");
	var $spos = $s.length;
	var $tmp = e[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.enumParameters = function(e) {
	$s.push("Type::enumParameters");
	var $spos = $s.length;
	var $tmp = e.slice(2);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.enumIndex = function(e) {
	$s.push("Type::enumIndex");
	var $spos = $s.length;
	var $tmp = e[1];
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.prototype.__class__ = Type;
thx.type.Types = function() { }
thx.type.Types.__name__ = ["thx","type","Types"];
thx.type.Types.isAnonymousObject = function(o) {
	$s.push("thx.type.Types::isAnonymousObject");
	var $spos = $s.length;
	var $tmp = Reflect.isObject(o) && null == Type.getClass(o);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.className = function(o) {
	$s.push("thx.type.Types::className");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(o)).split(".").pop();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.fullName = function(o) {
	$s.push("thx.type.Types::fullName");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(o));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.typeName = function(o) {
	$s.push("thx.type.Types::typeName");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		var $e = Type["typeof"](o);
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
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.hasSuperClass = function(type,sup) {
	$s.push("thx.type.Types::hasSuperClass");
	var $spos = $s.length;
	while(null != type) {
		if(type == sup) {
			$s.pop();
			return true;
		}
		type = Type.getSuperClass(type);
	}
	$s.pop();
	return false;
	$s.pop();
}
thx.type.Types.isAnonymous = function(v) {
	$s.push("thx.type.Types::isAnonymous");
	var $spos = $s.length;
	var $tmp = Reflect.isObject(v) && null == Type.getClass(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types["as"] = function(value,type) {
	$s.push("thx.type.Types::as");
	var $spos = $s.length;
	var $tmp = Std["is"](value,type)?value:null;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.ifIs = function(value,type,handler) {
	$s.push("thx.type.Types::ifIs");
	var $spos = $s.length;
	if(Std["is"](value,type)) handler(value);
	$s.pop();
	return value;
	$s.pop();
}
thx.type.Types.of = function(type,value) {
	$s.push("thx.type.Types::of");
	var $spos = $s.length;
	var $tmp = Std["is"](value,type)?value:null;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.type.Types.sameAs = function(a,b) {
	$s.push("thx.type.Types::sameAs");
	var $spos = $s.length;
	if(null == a && b == null) {
		$s.pop();
		return true;
	}
	if(null == a || b == null) {
		$s.pop();
		return false;
	}
	var tb = Type["typeof"](b);
	switch( tb[1] ) {
	case 6:
		var c = tb[2];
		var $tmp = Std["is"](a,c);
		$s.pop();
		return $tmp;
	case 7:
		var e = tb[2];
		var $tmp = Std["is"](a,e);
		$s.pop();
		return $tmp;
	default:
		var $tmp = Type["typeof"](a) == tb;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.type.Types.prototype.__class__ = thx.type.Types;
Floats = function() { }
Floats.__name__ = ["Floats"];
Floats.normalize = function(v) {
	$s.push("Floats::normalize");
	var $spos = $s.length;
	if(v < 0.0) {
		$s.pop();
		return 0.0;
	} else if(v > 1.0) {
		$s.pop();
		return 1.0;
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
Floats.clamp = function(v,min,max) {
	$s.push("Floats::clamp");
	var $spos = $s.length;
	if(v < min) {
		$s.pop();
		return min;
	} else if(v > max) {
		$s.pop();
		return max;
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
Floats.clampSym = function(v,max) {
	$s.push("Floats::clampSym");
	var $spos = $s.length;
	if(v < -max) {
		var $tmp = -max;
		$s.pop();
		return $tmp;
	} else if(v > max) {
		$s.pop();
		return max;
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
Floats.range = function(start,stop,step) {
	$s.push("Floats::range");
	var $spos = $s.length;
	if(step == null) step = 1.0;
	if(null == stop) {
		stop = start;
		start = 0.0;
	}
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Floats.hx", lineNumber : 47, className : "Floats", methodName : "range"});
	var range = [], i = -1.0, j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	$s.pop();
	return range;
	$s.pop();
}
Floats.sign = function(v) {
	$s.push("Floats::sign");
	var $spos = $s.length;
	var $tmp = v < 0?-1:1;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.abs = function(a) {
	$s.push("Floats::abs");
	var $spos = $s.length;
	var $tmp = a < 0?-a:a;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.min = function(a,b) {
	$s.push("Floats::min");
	var $spos = $s.length;
	var $tmp = a < b?a:b;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.max = function(a,b) {
	$s.push("Floats::max");
	var $spos = $s.length;
	var $tmp = a > b?a:b;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.wrap = function(v,min,max) {
	$s.push("Floats::wrap");
	var $spos = $s.length;
	var range = max - min + 1;
	if(v < min) v += range * ((min - v) / range + 1);
	var $tmp = min + (v - min) % range;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.circularWrap = function(v,max) {
	$s.push("Floats::circularWrap");
	var $spos = $s.length;
	v = v % max;
	if(v < 0) v += max;
	$s.pop();
	return v;
	$s.pop();
}
Floats.interpolate = function(f,interpolator,min,max) {
	$s.push("Floats::interpolate");
	var $spos = $s.length;
	if(max == null) max = 1.0;
	if(min == null) min = 0.0;
	if(null == interpolator) interpolator = $closure(thx.math.Equations,"linear");
	var $tmp = min + interpolator(f) * (max - min);
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.prototype.__class__ = Floats;
thx.type.TestAll = function(p) {
	$s.push("thx.type.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.type.TestAll.__name__ = ["thx","type","TestAll"];
thx.type.TestAll.addTests = function(runner) {
	$s.push("thx.type.TestAll::addTests");
	var $spos = $s.length;
	thx.type.TestTypes.addTests(runner);
	$s.pop();
}
thx.type.TestAll.main = function() {
	$s.push("thx.type.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.type.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.type.TestAll.prototype.__class__ = thx.type.TestAll;
if(!thx.text.json) thx.text.json = {}
thx.text.json.JsonDecoder = function(tabsize) {
	if( tabsize === $_ ) return;
	$s.push("thx.text.json.JsonDecoder::new");
	var $spos = $s.length;
	if(tabsize == null) tabsize = 4;
	this.tabsize = tabsize;
	$s.pop();
}
thx.text.json.JsonDecoder.__name__ = ["thx","text","json","JsonDecoder"];
thx.text.json.JsonDecoder.prototype.col = null;
thx.text.json.JsonDecoder.prototype.line = null;
thx.text.json.JsonDecoder.prototype.tabsize = null;
thx.text.json.JsonDecoder.prototype.rest = null;
thx.text.json.JsonDecoder.prototype["char"] = null;
thx.text.json.JsonDecoder.prototype.decode = function(s) {
	$s.push("thx.text.json.JsonDecoder::decode");
	var $spos = $s.length;
	this.col = 0;
	this.line = 0;
	this.rest = s;
	this["char"] = null;
	this.ignoreWhiteSpace();
	var p = null;
	try {
		p = this.parse();
	} catch( e ) {
		if( js.Boot.__instanceof(e,thx.text.json._JsonDecoder.StreamError) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			this.error("unexpected end of stream");
		} else ;
		throw(e);
	}
	this.ignoreWhiteSpace();
	if(this.rest.length > 0) this.error("the stream contains unrecognized characters at its end");
	$s.pop();
	return p;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.ignoreWhiteSpace = function() {
	$s.push("thx.text.json.JsonDecoder::ignoreWhiteSpace");
	var $spos = $s.length;
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
			$s.pop();
			return;
		}
	}
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parse = function() {
	$s.push("thx.text.json.JsonDecoder::parse");
	var $spos = $s.length;
	var c = this.readChar();
	switch(c) {
	case "{":
		this.col++;
		this.ignoreWhiteSpace();
		var $tmp = this.parseObject();
		$s.pop();
		return $tmp;
	case "[":
		this.col++;
		this.ignoreWhiteSpace();
		var $tmp = this.parseArray();
		$s.pop();
		return $tmp;
	case "\"":
		this["char"] = c;
		var $tmp = this.parseString();
		$s.pop();
		return $tmp;
	default:
		this["char"] = c;
		var $tmp = this.parseValue();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.readChar = function() {
	$s.push("thx.text.json.JsonDecoder::readChar");
	var $spos = $s.length;
	if(null == this["char"]) {
		if(this.rest.length == 0) throw thx.text.json._JsonDecoder.StreamError.Eof;
		var c = this.rest.substr(0,1);
		this.rest = this.rest.substr(1);
		$s.pop();
		return c;
	} else {
		var c = this["char"];
		this["char"] = null;
		$s.pop();
		return c;
	}
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.expect = function(word) {
	$s.push("thx.text.json.JsonDecoder::expect");
	var $spos = $s.length;
	var test = null == this["char"]?this.rest.substr(0,word.length):this["char"] + this.rest.substr(0,word.length - 1);
	if(test == word) {
		if(null == this["char"]) this.rest = this.rest.substr(word.length); else {
			this.rest = this.rest.substr(word.length - 1);
			this["char"] = null;
		}
		$s.pop();
		return true;
	} else {
		$s.pop();
		return false;
	}
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseObject = function() {
	$s.push("thx.text.json.JsonDecoder::parseObject");
	var $spos = $s.length;
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
	var $tmp = thx.config.ConfigExpr.CEObject(pairs);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseArray = function() {
	$s.push("thx.text.json.JsonDecoder::parseArray");
	var $spos = $s.length;
	this.ignoreWhiteSpace();
	var arr = [];
	var first = true;
	while(true) {
		this.ignoreWhiteSpace();
		if(this.expect("]")) break; else if(first) first = false; else if(this.expect(",")) this.ignoreWhiteSpace(); else this.error("expected ','");
		arr.push(this.parse());
	}
	var $tmp = thx.config.ConfigExpr.CEArray(arr);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseValue = function() {
	$s.push("thx.text.json.JsonDecoder::parseValue");
	var $spos = $s.length;
	if(this.expect("true")) {
		var $tmp = thx.config.ConfigExpr.CEBool(true);
		$s.pop();
		return $tmp;
	} else if(this.expect("false")) {
		var $tmp = thx.config.ConfigExpr.CEBool(false);
		$s.pop();
		return $tmp;
	} else if(this.expect("null")) {
		var $tmp = thx.config.ConfigExpr.CENull;
		$s.pop();
		return $tmp;
	} else {
		var $tmp = this.parseFloat();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseString = function() {
	$s.push("thx.text.json.JsonDecoder::parseString");
	var $spos = $s.length;
	var $tmp = thx.config.ConfigExpr.CEString(this._parseString());
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype._parseString = function() {
	$s.push("thx.text.json.JsonDecoder::_parseString");
	var $spos = $s.length;
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
	$s.pop();
	return buf;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseHexa = function() {
	$s.push("thx.text.json.JsonDecoder::parseHexa");
	var $spos = $s.length;
	var v = [];
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var c = this.readChar();
		var i1 = c.toLowerCase().charCodeAt(0);
		if(!(i1 >= 48 && i1 <= 57 || i1 >= 97 && i1 <= 102)) this.error("invalid hexadecimal value " + c);
		v.push(c);
	}
	var $tmp = Std.parseInt("0x" + v.join(""));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseFloat = function() {
	$s.push("thx.text.json.JsonDecoder::parseFloat");
	var $spos = $s.length;
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
		if( js.Boot.__instanceof(e,thx.text.json._JsonDecoder.StreamError) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			var $tmp = thx.config.ConfigExpr.CEInt(Std.parseInt(v));
			$s.pop();
			return $tmp;
		} else ;
		throw(e);
	}
	try {
		if(this.expect(".")) v += "." + this.parseDigits(1); else {
			var $tmp = thx.config.ConfigExpr.CEInt(Std.parseInt(v));
			$s.pop();
			return $tmp;
		}
		if(this.expect("e") || this.expect("E")) {
			v += "e";
			if(this.expect("+")) {
			} else if(this.expect("-")) v += "-";
			v += this.parseDigits(1);
		}
	} catch( e ) {
		if( js.Boot.__instanceof(e,thx.text.json._JsonDecoder.StreamError) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			var $tmp = thx.config.ConfigExpr.CEFloat(Std.parseFloat(v));
			$s.pop();
			return $tmp;
		} else ;
		throw(e);
	}
	var $tmp = thx.config.ConfigExpr.CEFloat(Std.parseFloat(v));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.parseDigits = function(atleast) {
	$s.push("thx.text.json.JsonDecoder::parseDigits");
	var $spos = $s.length;
	if(atleast == null) atleast = 0;
	var buf = "";
	while(true) {
		var c = null;
		try {
			c = this.readChar();
		} catch( e ) {
			if( js.Boot.__instanceof(e,thx.text.json._JsonDecoder.StreamError) ) {
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				if(buf.length < atleast) this.error("expected digit");
				$s.pop();
				return buf;
			} else ;
			throw(e);
		}
		var i = c.charCodeAt(0);
		if(i < 48 || i > 57) {
			if(buf.length < atleast) this.error("expected digit");
			this.col += buf.length;
			this["char"] = c;
			$s.pop();
			return buf;
		} else buf += c;
	}
	$s.pop();
	return null;
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.error = function(msg) {
	$s.push("thx.text.json.JsonDecoder::error");
	var $spos = $s.length;
	var context = this.rest.length == 0?"":"\nrest: " + (null != this["char"]?this["char"]:"") + this.rest + "...";
	throw new thx.error.Error("error at L {0} C {1}: {2}{3}",[this.line,this.col,msg,context],null,{ fileName : "JsonDecoder.hx", lineNumber : 348, className : "thx.text.json.JsonDecoder", methodName : "error"});
	$s.pop();
}
thx.text.json.JsonDecoder.prototype.__class__ = thx.text.json.JsonDecoder;
if(!thx.text.json._JsonDecoder) thx.text.json._JsonDecoder = {}
thx.text.json._JsonDecoder.StreamError = { __ename__ : ["thx","text","json","_JsonDecoder","StreamError"], __constructs__ : ["Eof"] }
thx.text.json._JsonDecoder.StreamError.Eof = ["Eof",0];
thx.text.json._JsonDecoder.StreamError.Eof.toString = $estr;
thx.text.json._JsonDecoder.StreamError.Eof.__enum__ = thx.text.json._JsonDecoder.StreamError;
utest.Runner = function(p) {
	if( p === $_ ) return;
	$s.push("utest.Runner::new");
	var $spos = $s.length;
	this.fixtures = new Array();
	this.onProgress = new utest.Dispatcher();
	this.onStart = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	this.length = 0;
	$s.pop();
}
utest.Runner.__name__ = ["utest","Runner"];
utest.Runner.prototype.fixtures = null;
utest.Runner.prototype.onProgress = null;
utest.Runner.prototype.onStart = null;
utest.Runner.prototype.onComplete = null;
utest.Runner.prototype.length = null;
utest.Runner.prototype.addCase = function(test,setup,teardown,prefix,pattern) {
	$s.push("utest.Runner::addCase");
	var $spos = $s.length;
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
	$s.pop();
}
utest.Runner.prototype.addFixture = function(fixture) {
	$s.push("utest.Runner::addFixture");
	var $spos = $s.length;
	this.fixtures.push(fixture);
	this.length++;
	$s.pop();
}
utest.Runner.prototype.getFixture = function(index) {
	$s.push("utest.Runner::getFixture");
	var $spos = $s.length;
	var $tmp = this.fixtures[index];
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Runner.prototype.isMethod = function(test,name) {
	$s.push("utest.Runner::isMethod");
	var $spos = $s.length;
	try {
		var $tmp = Reflect.isFunction(Reflect.field(test,name));
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		$s.pop();
		return false;
	}
	$s.pop();
}
utest.Runner.prototype.pos = null;
utest.Runner.prototype.run = function() {
	$s.push("utest.Runner::run");
	var $spos = $s.length;
	this.pos = 0;
	this.onStart.dispatch(this);
	this.runNext();
	$s.pop();
}
utest.Runner.prototype.runNext = function() {
	$s.push("utest.Runner::runNext");
	var $spos = $s.length;
	if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]); else this.onComplete.dispatch(this);
	$s.pop();
}
utest.Runner.prototype.runFixture = function(fixture) {
	$s.push("utest.Runner::runFixture");
	var $spos = $s.length;
	var handler = new utest.TestHandler(fixture);
	handler.onComplete.add($closure(this,"testComplete"));
	handler.execute();
	$s.pop();
}
utest.Runner.prototype.testComplete = function(h) {
	$s.push("utest.Runner::testComplete");
	var $spos = $s.length;
	this.onProgress.dispatch({ result : utest.TestResult.ofHandler(h), done : this.pos, totals : this.length});
	this.runNext();
	$s.pop();
}
utest.Runner.prototype.__class__ = utest.Runner;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	$s.push("Reflect::hasField");
	var $spos = $s.length;
	if(o.hasOwnProperty != null) {
		var $tmp = o.hasOwnProperty(field);
		$s.pop();
		return $tmp;
	}
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Reflect.field = function(o,field) {
	$s.push("Reflect::field");
	var $spos = $s.length;
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	$s.pop();
	return v;
	$s.pop();
}
Reflect.setField = function(o,field,value) {
	$s.push("Reflect::setField");
	var $spos = $s.length;
	o[field] = value;
	$s.pop();
}
Reflect.callMethod = function(o,func,args) {
	$s.push("Reflect::callMethod");
	var $spos = $s.length;
	var $tmp = func.apply(o,args);
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.fields = function(o) {
	$s.push("Reflect::fields");
	var $spos = $s.length;
	if(o == null) {
		var $tmp = new Array();
		$s.pop();
		return $tmp;
	}
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	$s.pop();
	return a;
	$s.pop();
}
Reflect.isFunction = function(f) {
	$s.push("Reflect::isFunction");
	var $spos = $s.length;
	var $tmp = typeof(f) == "function" && f.__name__ == null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.compare = function(a,b) {
	$s.push("Reflect::compare");
	var $spos = $s.length;
	var $tmp = a == b?0:a > b?1:-1;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.compareMethods = function(f1,f2) {
	$s.push("Reflect::compareMethods");
	var $spos = $s.length;
	if(f1 == f2) {
		$s.pop();
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		$s.pop();
		return false;
	}
	var $tmp = f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.isObject = function(v) {
	$s.push("Reflect::isObject");
	var $spos = $s.length;
	if(v == null) {
		$s.pop();
		return false;
	}
	var t = typeof(v);
	var $tmp = t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.deleteField = function(o,f) {
	$s.push("Reflect::deleteField");
	var $spos = $s.length;
	if(!Reflect.hasField(o,f)) {
		$s.pop();
		return false;
	}
	delete(o[f]);
	$s.pop();
	return true;
	$s.pop();
}
Reflect.copy = function(o) {
	$s.push("Reflect::copy");
	var $spos = $s.length;
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	$s.pop();
	return o2;
	$s.pop();
}
Reflect.makeVarArgs = function(f) {
	$s.push("Reflect::makeVarArgs");
	var $spos = $s.length;
	var $tmp = function() {
		$s.push("Reflect::makeVarArgs@108");
		var $spos = $s.length;
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		var $tmp = f(a);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.prototype.__class__ = Reflect;
TestAll = function() { }
TestAll.__name__ = ["TestAll"];
TestAll.addTests = function(runner) {
	$s.push("TestAll::addTests");
	var $spos = $s.length;
	thx.js.TestAll.addTests(runner);
	thx.collections.TestAll.addTests(runner);
	thx.color.TestAll.addTests(runner);
	thx.doc.TestAll.addTests(runner);
	runner.addCase(new thx.config.TestConfigs());
	thx.data.TestAll.addTests(runner);
	thx.error.TestAll.addTests(runner);
	thx.text.TestAll.addTests(runner);
	thx.html.TestAll.addTests(runner);
	thx.math.TestAll.addTests(runner);
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
	$s.pop();
}
TestAll.main = function() {
	$s.push("TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestAll.prototype.__class__ = TestAll;
thx.js.DataSelection = function(update,enter,exit) {
	if( update === $_ ) return;
	$s.push("thx.js.DataSelection::new");
	var $spos = $s.length;
	thx.js.Selection.call(this,update);
	this._enter = enter;
	this._exit = exit;
	$s.pop();
}
thx.js.DataSelection.__name__ = ["thx","js","DataSelection"];
thx.js.DataSelection.__super__ = thx.js.Selection;
for(var k in thx.js.Selection.prototype ) thx.js.DataSelection.prototype[k] = thx.js.Selection.prototype[k];
thx.js.DataSelection.prototype._enter = null;
thx.js.DataSelection.prototype._exit = null;
thx.js.DataSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.DataSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.DataSelection(groups,this._enter,this._exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.DataSelection.prototype.enter = function() {
	$s.push("thx.js.DataSelection::enter");
	var $spos = $s.length;
	var $tmp = new thx.js.InDataSelection(this._enter,this._exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.DataSelection.prototype.__class__ = thx.js.DataSelection;
thx.js.InDataSelection = function(groups,exit) {
	if( groups === $_ ) return;
	$s.push("thx.js.InDataSelection::new");
	var $spos = $s.length;
	this.groups = groups;
	this._exit = exit;
	$s.pop();
}
thx.js.InDataSelection.__name__ = ["thx","js","InDataSelection"];
thx.js.InDataSelection.prototype._exit = null;
thx.js.InDataSelection.prototype.groups = null;
thx.js.InDataSelection.prototype.append = function(name) {
	$s.push("thx.js.InDataSelection::append");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		$s.push("thx.js.InDataSelection::append@47");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		var $tmp = new thx.js.Node(n);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var appendNS = function(node) {
		$s.push("thx.js.InDataSelection::append@54");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		var $tmp = new thx.js.Node(n);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var $tmp = this._select(null == qname?append:appendNS);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.InDataSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.InDataSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.ExitDataSelection(groups,this._exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.InDataSelection.prototype._select = function(selectf) {
	$s.push("thx.js.InDataSelection::_select");
	var $spos = $s.length;
	var subgroups = [], subgroup, subnode, node;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		subgroups.push(subgroup = new thx.js.Group());
		subgroup.parentNode = group.parentNode;
		subgroup.parentData = group.parentData;
		var $it0 = group.iterator();
		while( $it0.hasNext() ) {
			var node1 = $it0.next();
			if(null != node1) {
				subgroup.push(subnode = selectf(group.parentNode.dom));
				subnode.data = node1.data;
			} else subgroup.push(null);
		}
	}
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.InDataSelection.prototype.__class__ = thx.js.InDataSelection;
thx.js.ExitDataSelection = function(groups,exit) {
	if( groups === $_ ) return;
	$s.push("thx.js.ExitDataSelection::new");
	var $spos = $s.length;
	thx.js.Selection.call(this,groups);
	this._exit = exit;
	$s.pop();
}
thx.js.ExitDataSelection.__name__ = ["thx","js","ExitDataSelection"];
thx.js.ExitDataSelection.__super__ = thx.js.Selection;
for(var k in thx.js.Selection.prototype ) thx.js.ExitDataSelection.prototype[k] = thx.js.Selection.prototype[k];
thx.js.ExitDataSelection.prototype._exit = null;
thx.js.ExitDataSelection.prototype.exit = function() {
	$s.push("thx.js.ExitDataSelection::exit");
	var $spos = $s.length;
	var $tmp = new thx.js.Selection(this._exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ExitDataSelection.prototype.__class__ = thx.js.ExitDataSelection;
thx.xml.XmlFormat = function(autoformat,indent,newline) {
	if( autoformat === $_ ) return;
	$s.push("thx.xml.XmlFormat::new");
	var $spos = $s.length;
	if(autoformat == null) autoformat = true;
	this.autoformat = autoformat;
	this.indent = indent;
	this.newline = newline;
	this.normalizeNewlines = true;
	$s.pop();
}
thx.xml.XmlFormat.__name__ = ["thx","xml","XmlFormat"];
thx.xml.XmlFormat.prototype.indent = null;
thx.xml.XmlFormat.prototype.newline = null;
thx.xml.XmlFormat.prototype.stripComments = null;
thx.xml.XmlFormat.prototype.autoformat = null;
thx.xml.XmlFormat.prototype.normalizeNewlines = null;
thx.xml.XmlFormat.prototype.wrapColumns = null;
thx.xml.XmlFormat.prototype.format = function(xml) {
	$s.push("thx.xml.XmlFormat::format");
	var $spos = $s.length;
	var valueFormat = this.createValueFormat();
	var attributeFormat = this.createAttributeFormat();
	var documentFormat = this.createDocumentFormat();
	var nodeFormat = this.createNodeFormat();
	documentFormat.nodeFormat = nodeFormat;
	nodeFormat.valueFormat = valueFormat;
	nodeFormat.attributeFormat = attributeFormat;
	var $tmp = documentFormat.format(xml);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlFormat.prototype.createValueFormat = function() {
	$s.push("thx.xml.XmlFormat::createValueFormat");
	var $spos = $s.length;
	if(this.autoformat) {
		var $tmp = new thx.xml.NormalizeWhitespaceValueFormat();
		$s.pop();
		return $tmp;
	} else if(this.normalizeNewlines) {
		var $tmp = new thx.xml.NormalizeNewlineValueFormat(this.newline);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = new thx.xml.ValueFormat();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.xml.XmlFormat.prototype.createAttributeFormat = function() {
	$s.push("thx.xml.XmlFormat::createAttributeFormat");
	var $spos = $s.length;
	var $tmp = new thx.xml.AttributeFormat();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlFormat.prototype.createDocumentFormat = function() {
	$s.push("thx.xml.XmlFormat::createDocumentFormat");
	var $spos = $s.length;
	var document;
	if(this.autoformat) {
		var doc = new thx.xml.AutoDocumentFormat();
		if(null != this.indent) doc.indent = this.indent;
		if(null != this.newline) doc.newline = this.newline;
		if(null != this.wrapColumns) doc.wrapColumns = this.wrapColumns;
		document = doc;
	} else document = new thx.xml.DocumentFormat();
	if(null != this.stripComments) document.stripComments = this.stripComments;
	$s.pop();
	return document;
	$s.pop();
}
thx.xml.XmlFormat.prototype.createNodeFormat = function() {
	$s.push("thx.xml.XmlFormat::createNodeFormat");
	var $spos = $s.length;
	var $tmp = new thx.xml.NodeFormat();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlFormat.prototype.__class__ = thx.xml.XmlFormat;
thx.validation.TestDateRange = function(p) {
	$s.push("thx.validation.TestDateRange::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestDateRange.__name__ = ["thx","validation","TestDateRange"];
thx.validation.TestDateRange.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestDateRange.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestDateRange.prototype.testValidation = function() {
	$s.push("thx.validation.TestDateRange::testValidation");
	var $spos = $s.length;
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
	$s.pop();
}
thx.validation.TestDateRange.prototype.__class__ = thx.validation.TestDateRange;
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
thx.color.TestAll = function(p) {
	$s.push("thx.color.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.color.TestAll.__name__ = ["thx","color","TestAll"];
thx.color.TestAll.addTests = function(runner) {
	$s.push("thx.color.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.color.TestCmyk());
	runner.addCase(new thx.color.TestHsl());
	runner.addCase(new thx.color.TestRgb());
	$s.pop();
}
thx.color.TestAll.main = function() {
	$s.push("thx.color.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.color.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.color.TestAll.prototype.__class__ = thx.color.TestAll;
utest.ui.text.PlainTextReport = function(runner,outputHandler) {
	if( runner === $_ ) return;
	$s.push("utest.ui.text.PlainTextReport::new");
	var $spos = $s.length;
	this.aggregator = new utest.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = utest.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest.ui.common.HeaderDisplayMode.AlwaysShowHeader;
	$s.pop();
}
utest.ui.text.PlainTextReport.__name__ = ["utest","ui","text","PlainTextReport"];
utest.ui.text.PlainTextReport.prototype.displaySuccessResults = null;
utest.ui.text.PlainTextReport.prototype.displayHeader = null;
utest.ui.text.PlainTextReport.prototype.handler = null;
utest.ui.text.PlainTextReport.prototype.aggregator = null;
utest.ui.text.PlainTextReport.prototype.newline = null;
utest.ui.text.PlainTextReport.prototype.indent = null;
utest.ui.text.PlainTextReport.prototype.setHandler = function(handler) {
	$s.push("utest.ui.text.PlainTextReport::setHandler");
	var $spos = $s.length;
	this.handler = handler;
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.startTime = null;
utest.ui.text.PlainTextReport.prototype.start = function(e) {
	$s.push("utest.ui.text.PlainTextReport::start");
	var $spos = $s.length;
	this.startTime = haxe.Timer.stamp();
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.indents = function(c) {
	$s.push("utest.ui.text.PlainTextReport::indents");
	var $spos = $s.length;
	var s = "";
	var _g = 0;
	while(_g < c) {
		var _ = _g++;
		s += this.indent;
	}
	$s.pop();
	return s;
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.dumpStack = function(stack) {
	$s.push("utest.ui.text.PlainTextReport::dumpStack");
	var $spos = $s.length;
	if(stack.length == 0) {
		$s.pop();
		return "";
	}
	var parts = haxe.Stack.toString(stack).split("\n");
	var r = [];
	var _g = 0;
	while(_g < parts.length) {
		var part = parts[_g];
		++_g;
		if(part.indexOf(" utest.") >= 0) continue;
		r.push(part);
	}
	var $tmp = r.join(this.newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.addHeader = function(buf,result) {
	$s.push("utest.ui.text.PlainTextReport::addHeader");
	var $spos = $s.length;
	if(!utest.ui.common.ReportTools.hasHeader(this,result.stats)) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.result = null;
utest.ui.text.PlainTextReport.prototype.getResults = function() {
	$s.push("utest.ui.text.PlainTextReport::getResults");
	var $spos = $s.length;
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
					switch( assertation[1] ) {
					case 0:
						var pos = assertation[2];
						buf.b[buf.b.length] = ".";
						break;
					case 1:
						var pos = assertation[3], msg = assertation[2];
						buf.b[buf.b.length] = "F";
						messages += this.indents(2) + "line: " + pos.lineNumber + ", " + msg + this.newline;
						break;
					case 2:
						var s = assertation[3], e = assertation[2];
						buf.b[buf.b.length] = "E";
						messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
						break;
					case 3:
						var s = assertation[3], e = assertation[2];
						buf.b[buf.b.length] = "S";
						messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
						break;
					case 4:
						var s = assertation[3], e = assertation[2];
						buf.b[buf.b.length] = "T";
						messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
						break;
					case 5:
						var s = assertation[3], missedAsyncs = assertation[2];
						buf.b[buf.b.length] = "O";
						messages += this.indents(2) + "missed async calls: " + missedAsyncs + this.dumpStack(s) + this.newline;
						break;
					case 6:
						var s = assertation[3], e = assertation[2];
						buf.b[buf.b.length] = "A";
						messages += this.indents(2) + Std.string(e) + this.dumpStack(s) + this.newline;
						break;
					case 7:
						var msg = assertation[2];
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
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.complete = function(result) {
	$s.push("utest.ui.text.PlainTextReport::complete");
	var $spos = $s.length;
	this.result = result;
	this.handler(this);
	$s.pop();
}
utest.ui.text.PlainTextReport.prototype.__class__ = utest.ui.text.PlainTextReport;
utest.ui.text.PlainTextReport.__interfaces__ = [utest.ui.common.IReport];
utest.ui.text.PrintReport = function(runner) {
	if( runner === $_ ) return;
	$s.push("utest.ui.text.PrintReport::new");
	var $spos = $s.length;
	utest.ui.text.PlainTextReport.call(this,runner,$closure(this,"_handler"));
	this.newline = "\n";
	this.indent = "  ";
	$s.pop();
}
utest.ui.text.PrintReport.__name__ = ["utest","ui","text","PrintReport"];
utest.ui.text.PrintReport.__super__ = utest.ui.text.PlainTextReport;
for(var k in utest.ui.text.PlainTextReport.prototype ) utest.ui.text.PrintReport.prototype[k] = utest.ui.text.PlainTextReport.prototype[k];
utest.ui.text.PrintReport.prototype.useTrace = null;
utest.ui.text.PrintReport.prototype._handler = function(report) {
	$s.push("utest.ui.text.PrintReport::_handler");
	var $spos = $s.length;
	this._trace(report.getResults());
	$s.pop();
}
utest.ui.text.PrintReport.prototype._trace = function(s) {
	$s.push("utest.ui.text.PrintReport::_trace");
	var $spos = $s.length;
	s = StringTools.replace(s,"  ",this.indent);
	s = StringTools.replace(s,"\n",this.newline);
	haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 68, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	$s.pop();
}
utest.ui.text.PrintReport.prototype.__class__ = utest.ui.text.PrintReport;
if(!thx.math) thx.math = {}
thx.math.Random = function(seed) {
	if( seed === $_ ) return;
	$s.push("thx.math.Random::new");
	var $spos = $s.length;
	if(seed == null) seed = 1;
	this.seed = seed;
	$s.pop();
}
thx.math.Random.__name__ = ["thx","math","Random"];
thx.math.Random.prototype.seed = null;
thx.math.Random.prototype["int"] = function() {
	$s.push("thx.math.Random::int");
	var $spos = $s.length;
	var $tmp = (this.seed = this.seed * 16807 % 2147483647) & 1073741823;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Random.prototype["float"] = function() {
	$s.push("thx.math.Random::float");
	var $spos = $s.length;
	var $tmp = ((this.seed = this.seed * 16807 % 2147483647) & 1073741823) / 1073741823.0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Random.prototype.__class__ = thx.math.Random;
thx.text.TestPaths = function(p) {
	$s.push("thx.text.TestPaths::new");
	var $spos = $s.length;
	$s.pop();
}
thx.text.TestPaths.__name__ = ["thx","text","TestPaths"];
thx.text.TestPaths.addTests = function(runner) {
	$s.push("thx.text.TestPaths::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.text.TestPaths());
	$s.pop();
}
thx.text.TestPaths.main = function() {
	$s.push("thx.text.TestPaths::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.text.TestPaths.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.text.TestPaths.prototype.__class__ = thx.text.TestPaths;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	$s.push("Lambda::array");
	var $spos = $s.length;
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	$s.pop();
	return a;
	$s.pop();
}
Lambda.list = function(it) {
	$s.push("Lambda::list");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.map = function(it,f) {
	$s.push("Lambda::map");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.mapi = function(it,f) {
	$s.push("Lambda::mapi");
	var $spos = $s.length;
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.has = function(it,elt,cmp) {
	$s.push("Lambda::has");
	var $spos = $s.length;
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) {
				$s.pop();
				return true;
			}
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) {
				$s.pop();
				return true;
			}
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Lambda.exists = function(it,f) {
	$s.push("Lambda::exists");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Lambda.foreach = function(it,f) {
	$s.push("Lambda::foreach");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) {
			$s.pop();
			return false;
		}
	}
	$s.pop();
	return true;
	$s.pop();
}
Lambda.iter = function(it,f) {
	$s.push("Lambda::iter");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
	$s.pop();
}
Lambda.filter = function(it,f) {
	$s.push("Lambda::filter");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.fold = function(it,f,first) {
	$s.push("Lambda::fold");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	$s.pop();
	return first;
	$s.pop();
}
Lambda.count = function(it,pred) {
	$s.push("Lambda::count");
	var $spos = $s.length;
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
	$s.pop();
	return n;
	$s.pop();
}
Lambda.empty = function(it) {
	$s.push("Lambda::empty");
	var $spos = $s.length;
	var $tmp = !it.iterator().hasNext();
	$s.pop();
	return $tmp;
	$s.pop();
}
Lambda.indexOf = function(it,v) {
	$s.push("Lambda::indexOf");
	var $spos = $s.length;
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) {
			$s.pop();
			return i;
		}
		i++;
	}
	$s.pop();
	return -1;
	$s.pop();
}
Lambda.concat = function(a,b) {
	$s.push("Lambda::concat");
	var $spos = $s.length;
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
	$s.pop();
	return l;
	$s.pop();
}
Lambda.prototype.__class__ = Lambda;
thx.validation.TestCustomValidator = function(p) {
	$s.push("thx.validation.TestCustomValidator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestCustomValidator.__name__ = ["thx","validation","TestCustomValidator"];
thx.validation.TestCustomValidator.prototype.testValidation = function() {
	$s.push("thx.validation.TestCustomValidator::testValidation");
	var $spos = $s.length;
	var validator = new thx.validation.CustomValidator();
	utest.Assert.same(thx.util.Result.Ok,validator.validate("a"),null,null,{ fileName : "TestCustomValidator.hx", lineNumber : 19, className : "thx.validation.TestCustomValidator", methodName : "testValidation"});
	validator.add(function(v) {
		$s.push("thx.validation.TestCustomValidator::testValidation@22");
		var $spos = $s.length;
		var $tmp = v.toUpperCase() == v?null:new thx.util.Message("string '{0}' must be all uppercase",null,v);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	utest.Assert.isTrue((function($this) {
		var $r;
		switch( validator.validate("a")[1] ) {
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
		$s.push("thx.validation.TestCustomValidator::testValidation@32");
		var $spos = $s.length;
		var $tmp = StringTools.replace(v," ","") == v?null:new thx.util.Message("string '{0}' must not contain spaces",null,v);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	utest.Assert.isTrue((function($this) {
		var $r;
		switch( validator.validate("A A")[1] ) {
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
	$s.pop();
}
thx.validation.TestCustomValidator.prototype.__class__ = thx.validation.TestCustomValidator;
thx.text.json.JsonEncoder = function(formatted,indent,newline) {
	if( formatted === $_ ) return;
	$s.push("thx.text.json.JsonEncoder::new");
	var $spos = $s.length;
	if(newline == null) newline = "\n";
	if(indent == null) indent = "\t";
	if(formatted == null) formatted = false;
	this.formatted = formatted;
	this.indent = indent;
	this.newline = newline;
	$s.pop();
}
thx.text.json.JsonEncoder.__name__ = ["thx","text","json","JsonEncoder"];
thx.text.json.JsonEncoder.prototype.formatted = null;
thx.text.json.JsonEncoder.prototype.indent = null;
thx.text.json.JsonEncoder.prototype.newline = null;
thx.text.json.JsonEncoder.prototype.lvl = null;
thx.text.json.JsonEncoder.prototype.encode = function(value) {
	$s.push("thx.text.json.JsonEncoder::encode");
	var $spos = $s.length;
	this.lvl = 0;
	var $tmp = this._encode(value);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonEncoder.prototype._encode = function(value) {
	$s.push("thx.text.json.JsonEncoder::_encode");
	var $spos = $s.length;
	switch( value[1] ) {
	case 0:
		var a = value[2];
		if(this.formatted) {
			this.lvl++;
			var r = this._encodeObject(a);
			this.lvl--;
			$s.pop();
			return r;
		} else {
			var $tmp = this._encodeInlineObject(a);
			$s.pop();
			return $tmp;
		}
		break;
	case 1:
		var arr = value[2];
		var $tmp = "[" + Lambda.map(arr,$closure(this,"encode")).join(", ") + "]";
		$s.pop();
		return $tmp;
	case 2:
		var s = value[2];
		var $tmp = this.quote(s);
		$s.pop();
		return $tmp;
	case 3:
		var f = value[2];
		var $tmp = "" + f;
		$s.pop();
		return $tmp;
	case 4:
		var i = value[2];
		var $tmp = "" + i;
		$s.pop();
		return $tmp;
	case 6:
		var b = value[2];
		var $tmp = b?"true":"false";
		$s.pop();
		return $tmp;
	case 7:
		$s.pop();
		return "null";
	default:
		var $tmp = (function($this) {
			var $r;
			throw new thx.error.Error("unsupported type {0}",null,Std.string(value),{ fileName : "JsonEncoder.hx", lineNumber : 55, className : "thx.text.json.JsonEncoder", methodName : "_encode"});
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.text.json.JsonEncoder.prototype.quote = function(s) {
	$s.push("thx.text.json.JsonEncoder::quote");
	var $spos = $s.length;
	var $tmp = "\"" + new EReg(".","").customReplace(new EReg("(\n)","g").replace(new EReg("(\"|\\\\)","g").replace(s,"\\$1"),"\\n"),function(r) {
		$s.push("thx.text.json.JsonEncoder::quote@61");
		var $spos = $s.length;
		var c = r.matched(0).charCodeAt(0);
		var $tmp = c >= 32 && c <= 127?String.fromCharCode(c):"\\u" + StringTools.hex(c,4);
		$s.pop();
		return $tmp;
		$s.pop();
	}) + "\"";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonEncoder.prototype._indent = function() {
	$s.push("thx.text.json.JsonEncoder::_indent");
	var $spos = $s.length;
	var arr = [];
	var _g1 = 0, _g = this.lvl;
	while(_g1 < _g) {
		var i = _g1++;
		arr.push(this.indent);
	}
	var $tmp = arr.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonEncoder.prototype._encodeObject = function(a) {
	$s.push("thx.text.json.JsonEncoder::_encodeObject");
	var $spos = $s.length;
	var me = this;
	var $tmp = "{" + Lambda.map(a,function(p) {
		$s.push("thx.text.json.JsonEncoder::_encodeObject@79");
		var $spos = $s.length;
		var $tmp = me.newline + me._indent() + me.quote(p.k) + "\t: " + me._encode(p.v);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(",") + this.newline + "}";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonEncoder.prototype._encodeInlineObject = function(a) {
	$s.push("thx.text.json.JsonEncoder::_encodeInlineObject");
	var $spos = $s.length;
	var me = this;
	var $tmp = "{" + Lambda.map(a,function(p) {
		$s.push("thx.text.json.JsonEncoder::_encodeInlineObject@90");
		var $spos = $s.length;
		var $tmp = me.quote(p.k) + ":" + me._encode(p.v);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(",") + "}";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.JsonEncoder.prototype.__class__ = thx.text.json.JsonEncoder;
if(!thx.config) thx.config = {}
thx.config.Configs = function() { }
thx.config.Configs.__name__ = ["thx","config","Configs"];
thx.config.Configs.toConfigExpr = function(o) {
	$s.push("thx.config.Configs::toConfigExpr");
	var $spos = $s.length;
	var $e = Type["typeof"](o);
	switch( $e[1] ) {
	case 8:
	case 7:
	case 5:
		var $tmp = (function($this) {
			var $r;
			throw new thx.error.Error("unsupported type '{0}'",null,Std.string(o),{ fileName : "Configs.hx", lineNumber : 14, className : "thx.config.Configs", methodName : "toConfigExpr"});
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	case 6:
		var c = $e[2];
		if(Std["is"](o,Array)) {
			var a = o;
			var arr = [];
			var _g = 0;
			while(_g < a.length) {
				var v = a[_g];
				++_g;
				arr.push(thx.config.Configs.toConfigExpr(v));
			}
			var $tmp = thx.config.ConfigExpr.CEArray(arr);
			$s.pop();
			return $tmp;
		} else if(Std["is"](o,Hash)) {
			var h = o;
			var arr = [];
			var $it0 = h.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				arr.push({ k : k, v : thx.config.Configs.toConfigExpr(h.get(k))});
			}
			var $tmp = thx.config.ConfigExpr.CEObject(arr);
			$s.pop();
			return $tmp;
		}
		switch(Type.getClassName(c)) {
		case "String":
			var $tmp = thx.config.ConfigExpr.CEString(o);
			$s.pop();
			return $tmp;
		case "Date":
			var $tmp = thx.config.ConfigExpr.CEDate(thx.config.Configs.dateToString(o));
			$s.pop();
			return $tmp;
		default:
			var $tmp = (function($this) {
				var $r;
				throw new thx.error.Error("unsupported class '{0}'",null,c,{ fileName : "Configs.hx", lineNumber : 37, className : "thx.config.Configs", methodName : "toConfigExpr"});
				return $r;
			}(this));
			$s.pop();
			return $tmp;
		}
		break;
	case 0:
		var $tmp = thx.config.ConfigExpr.CENull;
		$s.pop();
		return $tmp;
	case 3:
		var $tmp = thx.config.ConfigExpr.CEBool(o);
		$s.pop();
		return $tmp;
	case 1:
		var $tmp = thx.config.ConfigExpr.CEInt(o);
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = thx.config.ConfigExpr.CEFloat(o);
		$s.pop();
		return $tmp;
	case 4:
		var arr = [];
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			arr.push({ k : k, v : thx.config.Configs.toConfigExpr(Reflect.field(o,k))});
		}
		var $tmp = thx.config.ConfigExpr.CEObject(arr);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.config.Configs.toDynamic = function(ce) {
	$s.push("thx.config.Configs::toDynamic");
	var $spos = $s.length;
	switch( ce[1] ) {
	case 0:
		var o = ce[2];
		var obj = { };
		var _g = 0;
		while(_g < o.length) {
			var pair = o[_g];
			++_g;
			obj[pair.k] = thx.config.Configs.toDynamic(pair.v);
		}
		$s.pop();
		return obj;
	case 1:
		var a = ce[2];
		var arr = [];
		var _g = 0;
		while(_g < a.length) {
			var v = a[_g];
			++_g;
			arr.push(thx.config.Configs.toDynamic(v));
		}
		$s.pop();
		return arr;
	case 2:
		var s = ce[2];
		$s.pop();
		return s;
	case 3:
		var f = ce[2];
		$s.pop();
		return f;
	case 4:
		var i = ce[2];
		$s.pop();
		return i;
	case 5:
		var d = ce[2];
		var $tmp = thx.config.Configs.stringToDate(d);
		$s.pop();
		return $tmp;
	case 6:
		var b = ce[2];
		$s.pop();
		return b;
	case 7:
		$s.pop();
		return null;
	}
	$s.pop();
	return null;
	$s.pop();
}
thx.config.Configs.stringToDate = function(s) {
	$s.push("thx.config.Configs::stringToDate");
	var $spos = $s.length;
	var parts = s.split(".");
	var d = Date.fromString(StringTools.replace(parts[0],"T"," "));
	if(parts.length == 1 || parts[1] == "0") {
		$s.pop();
		return d;
	}
	var t = d.getTime();
	t += Std["int"](Std.parseFloat("0." + parts[1]) * 100);
	var $tmp = Date.fromTime(t);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.config.Configs.dateToString = function(d) {
	$s.push("thx.config.Configs::dateToString");
	var $spos = $s.length;
	var t = d.getTime() / 1000;
	var m = ("" + (t - Std["int"](t))).substr(1);
	var $tmp = DateTools.format(d,"%Y-%m-%dT%H:%M:%S" + m);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.config.Configs.prototype.__class__ = thx.config.Configs;
thx.html.Element = function() { }
thx.html.Element.__name__ = ["thx","html","Element"];
thx.html.Element.shouldPreserve = function(el) {
	$s.push("thx.html.Element::shouldPreserve");
	var $spos = $s.length;
	var $tmp = thx.html.Element._preserve.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isEmpty = function(el) {
	$s.push("thx.html.Element::isEmpty");
	var $spos = $s.length;
	var $tmp = thx.html.Element._empty.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isBlock = function(el) {
	$s.push("thx.html.Element::isBlock");
	var $spos = $s.length;
	var $tmp = thx.html.Element._block.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isInline = function(el) {
	$s.push("thx.html.Element::isInline");
	var $spos = $s.length;
	var $tmp = thx.html.Element._inline.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isBreakElement = function(el) {
	$s.push("thx.html.Element::isBreakElement");
	var $spos = $s.length;
	var $tmp = thx.html.Element._break.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isCloseSelf = function(el) {
	$s.push("thx.html.Element::isCloseSelf");
	var $spos = $s.length;
	var $tmp = thx.html.Element._closeSelf.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.isSpecial = function(el) {
	$s.push("thx.html.Element::isSpecial");
	var $spos = $s.length;
	var $tmp = thx.html.Element._special.exists(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.Element.prototype.__class__ = thx.html.Element;
thx.js.TestSizzle = function(p) {
	$s.push("thx.js.TestSizzle::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestSizzle.__name__ = ["thx","js","TestSizzle"];
thx.js.TestSizzle.addTests = function(runner) {
	$s.push("thx.js.TestSizzle::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.js.TestSizzle());
	$s.pop();
}
thx.js.TestSizzle.main = function() {
	$s.push("thx.js.TestSizzle::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.js.TestSizzle.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.js.TestSizzle.prototype.node = null;
thx.js.TestSizzle.prototype.setup = function() {
	$s.push("thx.js.TestSizzle::setup");
	var $spos = $s.length;
	this.node = js.Lib.document.createElement("div");
	this.node.id = "testsizzle";
	js.Lib.document.body.appendChild(this.node);
	$s.pop();
}
thx.js.TestSizzle.prototype.teardown = function() {
	$s.push("thx.js.TestSizzle::teardown");
	var $spos = $s.length;
	js.Lib.document.body.removeChild(this.node);
	$s.pop();
}
thx.js.TestSizzle.prototype.testSizzle = function() {
	$s.push("thx.js.TestSizzle::testSizzle");
	var $spos = $s.length;
	var selection = thx.js.Sizzle.select("#testsizzle");
	utest.Assert.equals(1,selection.length,null,{ fileName : "TestSizzle.hx", lineNumber : 32, className : "thx.js.TestSizzle", methodName : "testSizzle"});
	utest.Assert.equals(this.node,selection[0],null,{ fileName : "TestSizzle.hx", lineNumber : 33, className : "thx.js.TestSizzle", methodName : "testSizzle"});
	$s.pop();
}
thx.js.TestSizzle.prototype.__class__ = thx.js.TestSizzle;
utest.TestResult = function(p) {
	$s.push("utest.TestResult::new");
	var $spos = $s.length;
	$s.pop();
}
utest.TestResult.__name__ = ["utest","TestResult"];
utest.TestResult.ofHandler = function(handler) {
	$s.push("utest.TestResult::ofHandler");
	var $spos = $s.length;
	var r = new utest.TestResult();
	var path = Type.getClassName(Type.getClass(handler.fixture.target)).split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.method;
	r.setup = handler.fixture.setup;
	r.teardown = handler.fixture.teardown;
	r.assertations = handler.results;
	$s.pop();
	return r;
	$s.pop();
}
utest.TestResult.prototype.pack = null;
utest.TestResult.prototype.cls = null;
utest.TestResult.prototype.method = null;
utest.TestResult.prototype.setup = null;
utest.TestResult.prototype.teardown = null;
utest.TestResult.prototype.assertations = null;
utest.TestResult.prototype.__class__ = utest.TestResult;
thx.xml.TestXmlWriter = function(p) {
	$s.push("thx.xml.TestXmlWriter::new");
	var $spos = $s.length;
	$s.pop();
}
thx.xml.TestXmlWriter.__name__ = ["thx","xml","TestXmlWriter"];
thx.xml.TestXmlWriter.addTests = function(runner) {
	$s.push("thx.xml.TestXmlWriter::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.xml.TestXmlWriter());
	$s.pop();
}
thx.xml.TestXmlWriter.main = function() {
	$s.push("thx.xml.TestXmlWriter::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.xml.TestXmlWriter.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.xml.TestXmlWriter.prototype.w = null;
thx.xml.TestXmlWriter.prototype.testBasics = function() {
	$s.push("thx.xml.TestXmlWriter::testBasics");
	var $spos = $s.length;
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
	$s.pop();
}
thx.xml.TestXmlWriter.prototype.getWriter = function() {
	$s.push("thx.xml.TestXmlWriter::getWriter");
	var $spos = $s.length;
	var $tmp = new thx.xml.XmlWriter();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.TestXmlWriter.prototype.__class__ = thx.xml.TestXmlWriter;
thx.js.TestAll = function(p) {
	$s.push("thx.js.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestAll.__name__ = ["thx","js","TestAll"];
thx.js.TestAll.addTests = function(runner) {
	$s.push("thx.js.TestAll::addTests");
	var $spos = $s.length;
	thx.js.TestDom.addTests(runner);
	thx.js.TestSizzle.addTests(runner);
	$s.pop();
}
thx.js.TestAll.main = function() {
	$s.push("thx.js.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.js.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.js.TestAll.prototype.__class__ = thx.js.TestAll;
thx.util.Result = { __ename__ : ["thx","util","Result"], __constructs__ : ["Ok","Failure"] }
thx.util.Result.Ok = ["Ok",0];
thx.util.Result.Ok.toString = $estr;
thx.util.Result.Ok.__enum__ = thx.util.Result;
thx.util.Result.Failure = function(messages) { var $x = ["Failure",1,messages]; $x.__enum__ = thx.util.Result; $x.toString = $estr; return $x; }
thx.validation.TestPatternValidator = function(p) {
	$s.push("thx.validation.TestPatternValidator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestPatternValidator.__name__ = ["thx","validation","TestPatternValidator"];
thx.validation.TestPatternValidator.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestPatternValidator.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestPatternValidator.prototype.testValidation = function() {
	$s.push("thx.validation.TestPatternValidator::testValidation");
	var $spos = $s.length;
	var validator = new thx.validation.PatternValidator(new EReg("^[aeiou]+$","i"));
	this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 15, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("b"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 16, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("aba"),false,null,{ fileName : "TestPatternValidator.hx", lineNumber : 17, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("UiU"),true,null,{ fileName : "TestPatternValidator.hx", lineNumber : 18, className : "thx.validation.TestPatternValidator", methodName : "testValidation"});
	$s.pop();
}
thx.validation.TestPatternValidator.prototype.__class__ = thx.validation.TestPatternValidator;
thx.validation.TestOptionValidator = function(p) {
	$s.push("thx.validation.TestOptionValidator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestOptionValidator.__name__ = ["thx","validation","TestOptionValidator"];
thx.validation.TestOptionValidator.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestOptionValidator.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestOptionValidator.prototype.testValidation = function() {
	$s.push("thx.validation.TestOptionValidator::testValidation");
	var $spos = $s.length;
	var validator = new thx.validation.OptionValidator(null,["a","b","c"]);
	this.assertValidation(validator.validate("a"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 15, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("b"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 16, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("c"),true,null,{ fileName : "TestOptionValidator.hx", lineNumber : 17, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("A"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 18, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("d"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 19, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	this.assertValidation(validator.validate("aa"),false,null,{ fileName : "TestOptionValidator.hx", lineNumber : 20, className : "thx.validation.TestOptionValidator", methodName : "testValidation"});
	$s.pop();
}
thx.validation.TestOptionValidator.prototype.__class__ = thx.validation.TestOptionValidator;
StringBuf = function(p) {
	if( p === $_ ) return;
	$s.push("StringBuf::new");
	var $spos = $s.length;
	this.b = new Array();
	$s.pop();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	$s.push("StringBuf::add");
	var $spos = $s.length;
	this.b[this.b.length] = x;
	$s.pop();
}
StringBuf.prototype.addSub = function(s,pos,len) {
	$s.push("StringBuf::addSub");
	var $spos = $s.length;
	this.b[this.b.length] = s.substr(pos,len);
	$s.pop();
}
StringBuf.prototype.addChar = function(c) {
	$s.push("StringBuf::addChar");
	var $spos = $s.length;
	this.b[this.b.length] = String.fromCharCode(c);
	$s.pop();
}
StringBuf.prototype.toString = function() {
	$s.push("StringBuf::toString");
	var $spos = $s.length;
	var $tmp = this.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
thx.color.TestRgb = function(p) {
	$s.push("thx.color.TestRgb::new");
	var $spos = $s.length;
	$s.pop();
}
thx.color.TestRgb.__name__ = ["thx","color","TestRgb"];
thx.color.TestRgb.prototype.testBasics = function() {
	$s.push("thx.color.TestRgb::testBasics");
	var $spos = $s.length;
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.black,new thx.color.Rgb(0,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 15, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.white,new thx.color.Rgb(255,255,255)),null,{ fileName : "TestRgb.hx", lineNumber : 16, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,new thx.color.Rgb(255,0,0)),null,{ fileName : "TestRgb.hx", lineNumber : 17, className : "thx.color.TestRgb", methodName : "testBasics"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.NamedColors.red,thx.color.Rgb.fromInt(16711680)),null,{ fileName : "TestRgb.hx", lineNumber : 18, className : "thx.color.TestRgb", methodName : "testBasics"});
	$s.pop();
}
thx.color.TestRgb.prototype.__class__ = thx.color.TestRgb;
TestInts = function(p) {
	$s.push("TestInts::new");
	var $spos = $s.length;
	$s.pop();
}
TestInts.__name__ = ["TestInts"];
TestInts.addTests = function(runner) {
	$s.push("TestInts::addTests");
	var $spos = $s.length;
	runner.addCase(new TestInts());
	$s.pop();
}
TestInts.main = function() {
	$s.push("TestInts::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestInts.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestInts.prototype.testRange = function() {
	$s.push("TestInts::testRange");
	var $spos = $s.length;
	utest.Assert.same([0,1,2],Ints.range(3),null,null,{ fileName : "TestInts.hx", lineNumber : 14, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([3,4,5],Ints.range(3,6),null,null,{ fileName : "TestInts.hx", lineNumber : 15, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([4,6,8],Ints.range(4,9,2),null,null,{ fileName : "TestInts.hx", lineNumber : 16, className : "TestInts", methodName : "testRange"});
	utest.Assert.same([8,6,4],Ints.range(8,3,-2),null,null,{ fileName : "TestInts.hx", lineNumber : 17, className : "TestInts", methodName : "testRange"});
	$s.pop();
}
TestInts.prototype.testInterpolate = function() {
	$s.push("TestInts::testInterpolate");
	var $spos = $s.length;
	utest.Assert.equals(0,Math.round(Floats.interpolate(0.000,null,0,255)),null,{ fileName : "TestInts.hx", lineNumber : 22, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(127,Math.round(Floats.interpolate(0.499,null,0,255)),null,{ fileName : "TestInts.hx", lineNumber : 23, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(255,Math.round(Floats.interpolate(1.000,null,0,255)),null,{ fileName : "TestInts.hx", lineNumber : 24, className : "TestInts", methodName : "testInterpolate"});
	$s.pop();
}
TestInts.prototype.__class__ = TestInts;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	$s.push("haxe.Log::trace");
	var $spos = $s.length;
	js.Boot.__trace(v,infos);
	$s.pop();
}
haxe.Log.clear = function() {
	$s.push("haxe.Log::clear");
	var $spos = $s.length;
	js.Boot.__clear_trace();
	$s.pop();
}
haxe.Log.prototype.__class__ = haxe.Log;
thx.validation.IncrementValidator = function(increment) {
	if( increment === $_ ) return;
	$s.push("thx.validation.IncrementValidator::new");
	var $spos = $s.length;
	if(0 == increment) throw new thx.error.Error("increment must be different from zero (0)",null,null,{ fileName : "IncrementValidator.hx", lineNumber : 17, className : "thx.validation.IncrementValidator", methodName : "new"});
	this.increment = increment;
	$s.pop();
}
thx.validation.IncrementValidator.__name__ = ["thx","validation","IncrementValidator"];
thx.validation.IncrementValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.IncrementValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.IncrementValidator.prototype.increment = null;
thx.validation.IncrementValidator.prototype.validate = function(value) {
	$s.push("thx.validation.IncrementValidator::validate");
	var $spos = $s.length;
	var test = value / this.increment;
	if(test == Std["int"](test)) {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be an increment of {0}",[this.increment],null)]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.IncrementValidator.prototype.__class__ = thx.validation.IncrementValidator;
thx.util.Results = function() { }
thx.util.Results.__name__ = ["thx","util","Results"];
thx.util.Results.toString = function(value,glue) {
	$s.push("thx.util.Results::toString");
	var $spos = $s.length;
	if(glue == null) glue = "\n";
	switch( value[1] ) {
	case 0:
		$s.pop();
		return "Ok";
	case 1:
		var messages = value[2];
		var arr = [];
		var _g = 0;
		while(_g < messages.length) {
			var msg = messages[_g];
			++_g;
			arr.push(msg.toString());
		}
		var $tmp = arr.join(glue);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.util.Results.failure = function(msg,params,param,pos) {
	$s.push("thx.util.Results::failure");
	var $spos = $s.length;
	var $tmp = thx.util.Result.Failure([new thx.util.Message(msg,params,param)]);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.Results.prototype.__class__ = thx.util.Results;
if(!thx.util.type) thx.util.type = {}
thx.util.type.ITest = function() { }
thx.util.type.ITest.__name__ = ["thx","util","type","ITest"];
thx.util.type.ITest.prototype.sayHello = null;
thx.util.type.ITest.prototype.counter = null;
thx.util.type.ITest.prototype.__class__ = thx.util.type.ITest;
thx.util.type.TestImplementation = function(p) {
	if( p === $_ ) return;
	$s.push("thx.util.type.TestImplementation::new");
	var $spos = $s.length;
	this.counter = 0;
	$s.pop();
}
thx.util.type.TestImplementation.__name__ = ["thx","util","type","TestImplementation"];
thx.util.type.TestImplementation.prototype.counter = null;
thx.util.type.TestImplementation.prototype.sayHello = function() {
	$s.push("thx.util.type.TestImplementation::sayHello");
	var $spos = $s.length;
	$s.pop();
	return "hi";
	$s.pop();
}
thx.util.type.TestImplementation.prototype.__class__ = thx.util.type.TestImplementation;
thx.util.type.TestImplementation.__interfaces__ = [thx.util.type.ITest];
thx.xml.ValueFormat = function(p) {
	$s.push("thx.xml.ValueFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.xml.ValueFormat.__name__ = ["thx","xml","ValueFormat"];
thx.xml.ValueFormat.prototype.format = function(value) {
	$s.push("thx.xml.ValueFormat::format");
	var $spos = $s.length;
	$s.pop();
	return value;
	$s.pop();
}
thx.xml.ValueFormat.prototype.__class__ = thx.xml.ValueFormat;
thx.xml.NormalizeNewlineValueFormat = function(newline) {
	if( newline === $_ ) return;
	$s.push("thx.xml.NormalizeNewlineValueFormat::new");
	var $spos = $s.length;
	if(newline == null) newline = "\n";
	thx.xml.ValueFormat.call(this);
	this._newline = newline;
	this._newLineReplace = new EReg("(\r\n|\n\r|\n|\r)","m");
	$s.pop();
}
thx.xml.NormalizeNewlineValueFormat.__name__ = ["thx","xml","NormalizeNewlineValueFormat"];
thx.xml.NormalizeNewlineValueFormat.__super__ = thx.xml.ValueFormat;
for(var k in thx.xml.ValueFormat.prototype ) thx.xml.NormalizeNewlineValueFormat.prototype[k] = thx.xml.ValueFormat.prototype[k];
thx.xml.NormalizeNewlineValueFormat.prototype._newLineReplace = null;
thx.xml.NormalizeNewlineValueFormat.prototype._newline = null;
thx.xml.NormalizeNewlineValueFormat.prototype.format = function(value) {
	$s.push("thx.xml.NormalizeNewlineValueFormat::format");
	var $spos = $s.length;
	var $tmp = this._newLineReplace.replace(value,this._newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NormalizeNewlineValueFormat.prototype.__class__ = thx.xml.NormalizeNewlineValueFormat;
thx.data.TestAll = function(p) {
	$s.push("thx.data.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.TestAll.__name__ = ["thx","data","TestAll"];
thx.data.TestAll.addTests = function(runner) {
	$s.push("thx.data.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.data.TestMemoryLoader());
	$s.pop();
}
thx.data.TestAll.main = function() {
	$s.push("thx.data.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.data.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.data.TestAll.prototype.__class__ = thx.data.TestAll;
thx.config.ConfigExpr = { __ename__ : ["thx","config","ConfigExpr"], __constructs__ : ["CEObject","CEArray","CEString","CEFloat","CEInt","CEDate","CEBool","CENull"] }
thx.config.ConfigExpr.CEObject = function(o) { var $x = ["CEObject",0,o]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEArray = function(a) { var $x = ["CEArray",1,a]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEString = function(s) { var $x = ["CEString",2,s]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEFloat = function(f) { var $x = ["CEFloat",3,f]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEInt = function(i) { var $x = ["CEInt",4,i]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEDate = function(s) { var $x = ["CEDate",5,s]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CEBool = function(b) { var $x = ["CEBool",6,b]; $x.__enum__ = thx.config.ConfigExpr; $x.toString = $estr; return $x; }
thx.config.ConfigExpr.CENull = ["CENull",7];
thx.config.ConfigExpr.CENull.toString = $estr;
thx.config.ConfigExpr.CENull.__enum__ = thx.config.ConfigExpr;
thx.config.TestConfigs = function(p) {
	$s.push("thx.config.TestConfigs::new");
	var $spos = $s.length;
	$s.pop();
}
thx.config.TestConfigs.__name__ = ["thx","config","TestConfigs"];
thx.config.TestConfigs.prototype.testDynamicToConfigExpr = function() {
	$s.push("thx.config.TestConfigs::testDynamicToConfigExpr");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.config.TestConfigs.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.same(test.ce,thx.config.Configs.toConfigExpr(test.v),null,null,{ fileName : "TestConfigs.hx", lineNumber : 29, className : "thx.config.TestConfigs", methodName : "testDynamicToConfigExpr"});
	}
	$s.pop();
}
thx.config.TestConfigs.prototype.testConfigExprToDynamic = function() {
	$s.push("thx.config.TestConfigs::testConfigExprToDynamic");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.config.TestConfigs.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.same(test.v,thx.config.Configs.toDynamic(test.ce),null,null,{ fileName : "TestConfigs.hx", lineNumber : 35, className : "thx.config.TestConfigs", methodName : "testConfigExprToDynamic"});
	}
	$s.pop();
}
thx.config.TestConfigs.prototype.__class__ = thx.config.TestConfigs;
thx.xml.XmlWriter = function(xml) {
	if( xml === $_ ) return;
	$s.push("thx.xml.XmlWriter::new");
	var $spos = $s.length;
	if(null == xml) xml = Xml.createDocument();
	this._stack = [xml];
	this._current = this._stack[0];
	$s.pop();
}
thx.xml.XmlWriter.__name__ = ["thx","xml","XmlWriter"];
thx.xml.XmlWriter.prototype._stack = null;
thx.xml.XmlWriter.prototype._current = null;
thx.xml.XmlWriter.prototype.xml = function() {
	$s.push("thx.xml.XmlWriter::xml");
	var $spos = $s.length;
	var $tmp = this._stack[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlWriter.prototype.tag = function(name) {
	$s.push("thx.xml.XmlWriter::tag");
	var $spos = $s.length;
	this._current = Xml.createElement(name);
	this._stack[this._stack.length - 1].addChild(this._current);
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.open = function(tag) {
	$s.push("thx.xml.XmlWriter::open");
	var $spos = $s.length;
	this._current = Xml.createElement(tag);
	this._stack[this._stack.length - 1].addChild(this._current);
	this._stack.push(this._current);
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.attr = function(name,value) {
	$s.push("thx.xml.XmlWriter::attr");
	var $spos = $s.length;
	this._current.set(name,value);
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.appendTo = function(name,value) {
	$s.push("thx.xml.XmlWriter::appendTo");
	var $spos = $s.length;
	if(this._current.exists(name)) this._current.set(name,this._current.get(name) + " " + value); else this.attr(name,value);
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.attrIf = function(cond,name,value) {
	$s.push("thx.xml.XmlWriter::attrIf");
	var $spos = $s.length;
	if(null == cond && (null != value && "" != value) || cond) this.attr(name,value);
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.text = function(s) {
	$s.push("thx.xml.XmlWriter::text");
	var $spos = $s.length;
	this._stack[this._stack.length - 1].addChild(Xml.createPCData(StringTools.replace(StringTools.replace(StringTools.replace(s,"&","&amp;"),">","&gt;"),"<","&lt;")));
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.cdata = function(s) {
	$s.push("thx.xml.XmlWriter::cdata");
	var $spos = $s.length;
	this._stack[this._stack.length - 1].addChild(Xml.createCData(StringTools.replace(s,"]]>","]]&gt;")));
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.comment = function(s) {
	$s.push("thx.xml.XmlWriter::comment");
	var $spos = $s.length;
	this._stack[this._stack.length - 1].addChild(Xml.createComment(s));
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.close = function() {
	$s.push("thx.xml.XmlWriter::close");
	var $spos = $s.length;
	if(this._stack.length == 1) throw "no open tags to close";
	this._current = this._stack.pop();
	if(!this._current.elements().hasNext()) this._current.addChild(Xml.createPCData(""));
	$s.pop();
	return this;
	$s.pop();
}
thx.xml.XmlWriter.prototype.toString = function() {
	$s.push("thx.xml.XmlWriter::toString");
	var $spos = $s.length;
	var $tmp = this.xml().toString();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlWriter.prototype._t = function() {
	$s.push("thx.xml.XmlWriter::_t");
	var $spos = $s.length;
	var $tmp = this._stack[this._stack.length - 1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.XmlWriter.prototype.__class__ = thx.xml.XmlWriter;
thx.validation.TestUrl = function(p) {
	$s.push("thx.validation.TestUrl::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestUrl.__name__ = ["thx","validation","TestUrl"];
thx.validation.TestUrl.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestUrl.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestUrl.prototype.testValidUrls = function() {
	$s.push("thx.validation.TestUrl::testValidUrls");
	var $spos = $s.length;
	var validator = new thx.validation.UrlValidator();
	var urls = ["http://example.com","http://www.example.com","http://example.com/url/x%20y?a=b&c"];
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.assertValidation(validator.validate(url),true,url + " should be valid",{ fileName : "TestUrl.hx", lineNumber : 17, className : "thx.validation.TestUrl", methodName : "testValidUrls"});
	}
	$s.pop();
}
thx.validation.TestUrl.prototype.testInvalidUrls = function() {
	$s.push("thx.validation.TestUrl::testInvalidUrls");
	var $spos = $s.length;
	var validator = new thx.validation.UrlValidator();
	var urls = ["","htp://example.com","www.example.com"];
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.assertValidation(validator.validate(url),false,url + " should NOT be valid",{ fileName : "TestUrl.hx", lineNumber : 25, className : "thx.validation.TestUrl", methodName : "testInvalidUrls"});
	}
	$s.pop();
}
thx.validation.TestUrl.prototype.__class__ = thx.validation.TestUrl;
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
utest.ui.common.PackageResult = function(packageName) {
	if( packageName === $_ ) return;
	$s.push("utest.ui.common.PackageResult::new");
	var $spos = $s.length;
	this.packageName = packageName;
	this.classes = new Hash();
	this.packages = new Hash();
	this.stats = new utest.ui.common.ResultStats();
	$s.pop();
}
utest.ui.common.PackageResult.__name__ = ["utest","ui","common","PackageResult"];
utest.ui.common.PackageResult.prototype.packageName = null;
utest.ui.common.PackageResult.prototype.classes = null;
utest.ui.common.PackageResult.prototype.packages = null;
utest.ui.common.PackageResult.prototype.stats = null;
utest.ui.common.PackageResult.prototype.addResult = function(result,flattenPackage) {
	$s.push("utest.ui.common.PackageResult::addResult");
	var $spos = $s.length;
	var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
	var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
	var fix = this.createFixture(result.method,result.assertations);
	cls.add(fix);
	$s.pop();
}
utest.ui.common.PackageResult.prototype.addClass = function(result) {
	$s.push("utest.ui.common.PackageResult::addClass");
	var $spos = $s.length;
	this.classes.set(result.className,result);
	this.stats.wire(result.stats);
	$s.pop();
}
utest.ui.common.PackageResult.prototype.addPackage = function(result) {
	$s.push("utest.ui.common.PackageResult::addPackage");
	var $spos = $s.length;
	this.packages.set(result.packageName,result);
	this.stats.wire(result.stats);
	$s.pop();
}
utest.ui.common.PackageResult.prototype.existsPackage = function(name) {
	$s.push("utest.ui.common.PackageResult::existsPackage");
	var $spos = $s.length;
	var $tmp = this.packages.exists(name);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.existsClass = function(name) {
	$s.push("utest.ui.common.PackageResult::existsClass");
	var $spos = $s.length;
	var $tmp = this.classes.exists(name);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.getPackage = function(name) {
	$s.push("utest.ui.common.PackageResult::getPackage");
	var $spos = $s.length;
	if(this.packageName == null && name == "") {
		$s.pop();
		return this;
	}
	var $tmp = this.packages.get(name);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.getClass = function(name) {
	$s.push("utest.ui.common.PackageResult::getClass");
	var $spos = $s.length;
	var $tmp = this.classes.get(name);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.classNames = function(errorsHavePriority) {
	$s.push("utest.ui.common.PackageResult::classNames");
	var $spos = $s.length;
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
			$s.push("utest.ui.common.PackageResult::classNames@64");
			var $spos = $s.length;
			var $as = me.getClass(a).stats;
			var bs = me.getClass(b).stats;
			if($as.hasErrors) {
				var $tmp = !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors);
				$s.pop();
				return $tmp;
			} else if(bs.hasErrors) {
				$s.pop();
				return 1;
			} else if($as.hasFailures) {
				var $tmp = !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures);
				$s.pop();
				return $tmp;
			} else if(bs.hasFailures) {
				$s.pop();
				return 1;
			} else if($as.hasWarnings) {
				var $tmp = !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings);
				$s.pop();
				return $tmp;
			} else if(bs.hasWarnings) {
				$s.pop();
				return 1;
			} else {
				var $tmp = Reflect.compare(a,b);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		});
	} else names.sort(function(a,b) {
		$s.push("utest.ui.common.PackageResult::classNames@84");
		var $spos = $s.length;
		var $tmp = Reflect.compare(a,b);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return names;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.packageNames = function(errorsHavePriority) {
	$s.push("utest.ui.common.PackageResult::packageNames");
	var $spos = $s.length;
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
			$s.push("utest.ui.common.PackageResult::packageNames@98");
			var $spos = $s.length;
			var $as = me.getPackage(a).stats;
			var bs = me.getPackage(b).stats;
			if($as.hasErrors) {
				var $tmp = !bs.hasErrors?-1:$as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors);
				$s.pop();
				return $tmp;
			} else if(bs.hasErrors) {
				$s.pop();
				return 1;
			} else if($as.hasFailures) {
				var $tmp = !bs.hasFailures?-1:$as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures);
				$s.pop();
				return $tmp;
			} else if(bs.hasFailures) {
				$s.pop();
				return 1;
			} else if($as.hasWarnings) {
				var $tmp = !bs.hasWarnings?-1:$as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings);
				$s.pop();
				return $tmp;
			} else if(bs.hasWarnings) {
				$s.pop();
				return 1;
			} else {
				var $tmp = Reflect.compare(a,b);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		});
	} else names.sort(function(a,b) {
		$s.push("utest.ui.common.PackageResult::packageNames@118");
		var $spos = $s.length;
		var $tmp = Reflect.compare(a,b);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return names;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.createFixture = function(method,assertations) {
	$s.push("utest.ui.common.PackageResult::createFixture");
	var $spos = $s.length;
	var f = new utest.ui.common.FixtureResult(method);
	var $it0 = assertations.iterator();
	while( $it0.hasNext() ) {
		var assertation = $it0.next();
		f.add(assertation);
	}
	$s.pop();
	return f;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	$s.push("utest.ui.common.PackageResult::getOrCreateClass");
	var $spos = $s.length;
	if(pack.existsClass(cls)) {
		var $tmp = pack.getClass(cls);
		$s.pop();
		return $tmp;
	}
	var c = new utest.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	$s.pop();
	return c;
	$s.pop();
}
utest.ui.common.PackageResult.prototype.getOrCreatePackage = function(pack,flat,ref) {
	$s.push("utest.ui.common.PackageResult::getOrCreatePackage");
	var $spos = $s.length;
	if(pack == null || pack == "") {
		$s.pop();
		return ref;
	}
	if(flat) {
		if(ref.existsPackage(pack)) {
			var $tmp = ref.getPackage(pack);
			$s.pop();
			return $tmp;
		}
		var p = new utest.ui.common.PackageResult(pack);
		ref.addPackage(p);
		$s.pop();
		return p;
	} else {
		var parts = pack.split(".");
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			ref = this.getOrCreatePackage(part,true,ref);
		}
		$s.pop();
		return ref;
	}
	$s.pop();
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
	$s.push("thx.html.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.html.TestHtmlParser());
	runner.addCase(new thx.html.TestHtmlFormat());
	runner.addCase(new thx.html.TestXHtmlFormat());
	$s.pop();
}
thx.html.TestAll.main = function() {
	$s.push("thx.html.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.html.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.html.TestAll.prototype.__class__ = thx.html.TestAll;
thx.collections.TestAll = function(p) {
	$s.push("thx.collections.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.collections.TestAll.__name__ = ["thx","collections","TestAll"];
thx.collections.TestAll.addTests = function(runner) {
	$s.push("thx.collections.TestAll::addTests");
	var $spos = $s.length;
	$s.pop();
}
thx.collections.TestAll.main = function() {
	$s.push("thx.collections.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.collections.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.collections.TestAll.prototype.__class__ = thx.collections.TestAll;
utest.TestHandler = function(fixture) {
	if( fixture === $_ ) return;
	$s.push("utest.TestHandler::new");
	var $spos = $s.length;
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = new utest.Dispatcher();
	this.onTimeout = new utest.Dispatcher();
	this.onComplete = new utest.Dispatcher();
	$s.pop();
}
utest.TestHandler.__name__ = ["utest","TestHandler"];
utest.TestHandler.exceptionStack = function(pops) {
	$s.push("utest.TestHandler::exceptionStack");
	var $spos = $s.length;
	if(pops == null) pops = 2;
	var stack = haxe.Stack.exceptionStack();
	while(pops-- > 0) stack.pop();
	$s.pop();
	return stack;
	$s.pop();
}
utest.TestHandler.prototype.results = null;
utest.TestHandler.prototype.fixture = null;
utest.TestHandler.prototype.asyncStack = null;
utest.TestHandler.prototype.onTested = null;
utest.TestHandler.prototype.onTimeout = null;
utest.TestHandler.prototype.onComplete = null;
utest.TestHandler.prototype.execute = function() {
	$s.push("utest.TestHandler::execute");
	var $spos = $s.length;
	try {
		this.executeMethod(this.fixture.setup);
		try {
			this.executeMethod(this.fixture.method);
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			this.results.add(utest.Assertation.Error(e,utest.TestHandler.exceptionStack()));
		}
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		this.results.add(utest.Assertation.SetupError(e,utest.TestHandler.exceptionStack()));
	}
	this.checkTested();
	$s.pop();
}
utest.TestHandler.prototype.checkTested = function() {
	$s.push("utest.TestHandler::checkTested");
	var $spos = $s.length;
	if(this.expireson == null || this.asyncStack.length == 0) this.tested(); else if(haxe.Timer.stamp() > this.expireson) this.timeout(); else haxe.Timer.delay($closure(this,"checkTested"),10);
	$s.pop();
}
utest.TestHandler.prototype.expireson = null;
utest.TestHandler.prototype.setTimeout = function(timeout) {
	$s.push("utest.TestHandler::setTimeout");
	var $spos = $s.length;
	var newexpire = haxe.Timer.stamp() + timeout / 1000;
	this.expireson = this.expireson == null?newexpire:newexpire > this.expireson?newexpire:this.expireson;
	$s.pop();
}
utest.TestHandler.prototype.bindHandler = function() {
	$s.push("utest.TestHandler::bindHandler");
	var $spos = $s.length;
	utest.Assert.results = this.results;
	utest.Assert.createAsync = $closure(this,"addAsync");
	utest.Assert.createEvent = $closure(this,"addEvent");
	$s.pop();
}
utest.TestHandler.prototype.unbindHandler = function() {
	$s.push("utest.TestHandler::unbindHandler");
	var $spos = $s.length;
	utest.Assert.results = null;
	utest.Assert.createAsync = function(f,t) {
		$s.push("utest.TestHandler::unbindHandler@83");
		var $spos = $s.length;
		var $tmp = function() {
			$s.push("utest.TestHandler::unbindHandler@83@83");
			var $spos = $s.length;
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	utest.Assert.createEvent = function(f,t) {
		$s.push("utest.TestHandler::unbindHandler@84");
		var $spos = $s.length;
		var $tmp = function(e) {
			$s.push("utest.TestHandler::unbindHandler@84@84");
			var $spos = $s.length;
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
}
utest.TestHandler.prototype.addAsync = function(f,timeout) {
	$s.push("utest.TestHandler::addAsync");
	var $spos = $s.length;
	if(timeout == null) timeout = 250;
	this.asyncStack.add(f);
	var handler = this;
	this.setTimeout(timeout);
	var $tmp = function() {
		$s.push("utest.TestHandler::addAsync@115");
		var $spos = $s.length;
		if(!handler.asyncStack.remove(f)) {
			handler.results.add(utest.Assertation.AsyncError("method already executed",[]));
			$s.pop();
			return;
		}
		try {
			handler.bindHandler();
			f();
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			handler.results.add(utest.Assertation.AsyncError(e,utest.TestHandler.exceptionStack(0)));
		}
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.TestHandler.prototype.addEvent = function(f,timeout) {
	$s.push("utest.TestHandler::addEvent");
	var $spos = $s.length;
	if(timeout == null) timeout = 250;
	this.asyncStack.add(f);
	var handler = this;
	this.setTimeout(timeout);
	var $tmp = function(e) {
		$s.push("utest.TestHandler::addEvent@133");
		var $spos = $s.length;
		if(!handler.asyncStack.remove(f)) {
			handler.results.add(utest.Assertation.AsyncError("event already executed",[]));
			$s.pop();
			return;
		}
		try {
			handler.bindHandler();
			f(e);
		} catch( e1 ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			handler.results.add(utest.Assertation.AsyncError(e1,utest.TestHandler.exceptionStack(0)));
		}
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.TestHandler.prototype.executeMethod = function(name) {
	$s.push("utest.TestHandler::executeMethod");
	var $spos = $s.length;
	if(name == null) {
		$s.pop();
		return;
	}
	this.bindHandler();
	Reflect.field(this.fixture.target,name).apply(this.fixture.target,[]);
	$s.pop();
}
utest.TestHandler.prototype.tested = function() {
	$s.push("utest.TestHandler::tested");
	var $spos = $s.length;
	if(this.results.length == 0) this.results.add(utest.Assertation.Warning("no assertions"));
	this.onTested.dispatch(this);
	this.completed();
	$s.pop();
}
utest.TestHandler.prototype.timeout = function() {
	$s.push("utest.TestHandler::timeout");
	var $spos = $s.length;
	this.results.add(utest.Assertation.TimeoutError(this.asyncStack.length,[]));
	this.onTimeout.dispatch(this);
	this.completed();
	$s.pop();
}
utest.TestHandler.prototype.completed = function() {
	$s.push("utest.TestHandler::completed");
	var $spos = $s.length;
	try {
		this.executeMethod(this.fixture.teardown);
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		this.results.add(utest.Assertation.TeardownError(e,utest.TestHandler.exceptionStack(2)));
	}
	this.unbindHandler();
	this.onComplete.dispatch(this);
	$s.pop();
}
utest.TestHandler.prototype.__class__ = utest.TestHandler;
thx.xml.AttributeFormat = function(p) {
	$s.push("thx.xml.AttributeFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.xml.AttributeFormat.__name__ = ["thx","xml","AttributeFormat"];
thx.xml.AttributeFormat.prototype.formatAttributes = function(node) {
	$s.push("thx.xml.AttributeFormat::formatAttributes");
	var $spos = $s.length;
	var buf = new StringBuf();
	var $it0 = node.attributes();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		buf.b[buf.b.length] = " ";
		buf.b[buf.b.length] = this.formatAttribute(name,node.get(name));
	}
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AttributeFormat.prototype.formatAttribute = function(name,value) {
	$s.push("thx.xml.AttributeFormat::formatAttribute");
	var $spos = $s.length;
	var $tmp = name + "=\"" + value + "\"";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.AttributeFormat.prototype.__class__ = thx.xml.AttributeFormat;
thx.html.UnquotedHtmlAttributeFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.UnquotedHtmlAttributeFormat::new");
	var $spos = $s.length;
	thx.xml.AttributeFormat.call(this);
	this._containsWS = new EReg("\\s","m");
	$s.pop();
}
thx.html.UnquotedHtmlAttributeFormat.__name__ = ["thx","html","UnquotedHtmlAttributeFormat"];
thx.html.UnquotedHtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
for(var k in thx.xml.AttributeFormat.prototype ) thx.html.UnquotedHtmlAttributeFormat.prototype[k] = thx.xml.AttributeFormat.prototype[k];
thx.html.UnquotedHtmlAttributeFormat.prototype._containsWS = null;
thx.html.UnquotedHtmlAttributeFormat.prototype.formatAttribute = function(name,value) {
	$s.push("thx.html.UnquotedHtmlAttributeFormat::formatAttribute");
	var $spos = $s.length;
	if(thx.html.Attribute._fill.exists(name)) {
		$s.pop();
		return name;
	} else {
		var $tmp = name + "=" + this.quote(value);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.UnquotedHtmlAttributeFormat.prototype.quote = function(value) {
	$s.push("thx.html.UnquotedHtmlAttributeFormat::quote");
	var $spos = $s.length;
	if("" != value && !this._containsWS.match(value)) {
		$s.pop();
		return value;
	} else {
		var $tmp = "\"" + value + "\"";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.UnquotedHtmlAttributeFormat.prototype.__class__ = thx.html.UnquotedHtmlAttributeFormat;
utest.TestFixture = function(target,method,setup,teardown) {
	if( target === $_ ) return;
	$s.push("utest.TestFixture::new");
	var $spos = $s.length;
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
	$s.pop();
}
utest.TestFixture.__name__ = ["utest","TestFixture"];
utest.TestFixture.prototype.target = null;
utest.TestFixture.prototype.method = null;
utest.TestFixture.prototype.setup = null;
utest.TestFixture.prototype.teardown = null;
utest.TestFixture.prototype.checkMethod = function(name,arg) {
	$s.push("utest.TestFixture::checkMethod");
	var $spos = $s.length;
	var field = Reflect.field(this.target,name);
	if(field == null) throw arg + " function " + name + " is not a field of target";
	if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
	$s.pop();
}
utest.TestFixture.prototype.__class__ = utest.TestFixture;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	$s.push("Std::is");
	var $spos = $s.length;
	var $tmp = js.Boot.__instanceof(v,t);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.string = function(s) {
	$s.push("Std::string");
	var $spos = $s.length;
	var $tmp = js.Boot.__string_rec(s,"");
	$s.pop();
	return $tmp;
	$s.pop();
}
Std["int"] = function(x) {
	$s.push("Std::int");
	var $spos = $s.length;
	if(x < 0) {
		var $tmp = Math.ceil(x);
		$s.pop();
		return $tmp;
	}
	var $tmp = Math.floor(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.parseInt = function(x) {
	$s.push("Std::parseInt");
	var $spos = $s.length;
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) {
		$s.pop();
		return null;
	}
	var $tmp = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.parseFloat = function(x) {
	$s.push("Std::parseFloat");
	var $spos = $s.length;
	var $tmp = parseFloat(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.random = function(x) {
	$s.push("Std::random");
	var $spos = $s.length;
	var $tmp = Math.floor(Math.random() * x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.prototype.__class__ = Std;
thx.html.HtmlDocumentFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.HtmlDocumentFormat::new");
	var $spos = $s.length;
	thx.xml.DocumentFormat.call(this);
	this.indent = "  ";
	this.newline = "\n";
	this.wrapColumns = 80;
	this.specialElementContentFormat = thx.html.SpecialElementContentFormat.AsCommentedText;
	this._level = 0;
	this._begin = true;
	$s.pop();
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
	$s.push("thx.html.HtmlDocumentFormat::indentWrap");
	var $spos = $s.length;
	if("" == content) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.newline + Strings.wrapColumns(content,this.wrapColumns,Strings.repeat(this.indent,this._level),this.newline);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.format = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::format");
	var $spos = $s.length;
	var $tmp = Strings.ltrim(thx.xml.DocumentFormat.prototype.format.call(this,node),this.newline);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.isEmpty = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::isEmpty");
	var $spos = $s.length;
	var $tmp = thx.html.Element._empty.exists(node.getNodeName());
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineNode = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineNode");
	var $spos = $s.length;
	var t = node.nodeType;
	if(Xml.Element == t) {
		var $tmp = this.formatInlineElement(node);
		$s.pop();
		return $tmp;
	} else if(Xml.PCData == t) {
		var $tmp = this.formatInlinePCData(node);
		$s.pop();
		return $tmp;
	} else if(Xml.CData == t) {
		var $tmp = this.formatInlineCData(node);
		$s.pop();
		return $tmp;
	} else if(Xml.Comment == t) {
		var $tmp = this.formatInlineComment(node);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = (function($this) {
			var $r;
			throw "invalid node type: " + Std.string(t);
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineElement");
	var $spos = $s.length;
	if(this.isEmpty(node)) {
		var $tmp = this.formatInlineEmptyElement(node);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = this.formatInlineOpenElement(node) + this.formatInlineChildren(node) + this.formatInlineCloseElement(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.contentIsEmpty = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::contentIsEmpty");
	var $spos = $s.length;
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.nodeType != Xml.PCData || StringTools.trim(c.getNodeValue()) != "") {
			$s.pop();
			return false;
		}
	}
	$s.pop();
	return true;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatSpecialElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatSpecialElement");
	var $spos = $s.length;
	if(this.contentIsEmpty(node)) {
		var $tmp = this.indentWrap(this.formatInlineOpenElement(node) + this.formatInlineCloseElement(node));
		$s.pop();
		return $tmp;
	} else {
		var $tmp = this.formatOpenElement(node) + this.wrapSpecialElementContent(this.formatChildren(node)) + this.formatCloseElement(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.wrapSpecialElementContent = function(content) {
	$s.push("thx.html.HtmlDocumentFormat::wrapSpecialElementContent");
	var $spos = $s.length;
	switch( this.specialElementContentFormat[1] ) {
	case 0:
		$s.pop();
		return content;
	case 1:
		var $tmp = "<![CDATA[" + this.newline + content + this.newline + "]]>";
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = "<!--" + this.newline + content + this.newline + "// -->";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatElement");
	var $spos = $s.length;
	if(thx.html.Element._special.exists(node.getNodeName())) {
		var $tmp = this.formatSpecialElement(node);
		$s.pop();
		return $tmp;
	} else if(thx.html.Element._preserve.exists(node.getNodeName())) {
		var open = this.formatOpenElement(node);
		var content = "";
		var $it0 = node.iterator();
		while( $it0.hasNext() ) {
			var child = $it0.next();
			content += child.toString();
		}
		var close = this.formatInlineCloseElement(node);
		var $tmp = open + content + close;
		$s.pop();
		return $tmp;
	} else if(this.isEmpty(node)) {
		if(thx.html.Element._inline.exists(node.getNodeName())) {
			var $tmp = this.formatInlineEmptyElement(node);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = this.formatEmptyElement(node);
			$s.pop();
			return $tmp;
		}
	} else if(thx.html.Element._block.exists(node.getNodeName()) && this.inlineContent(node)) {
		var open = this.formatInlineOpenElement(node);
		var content = this.formatInlineChildren(node);
		var close = this.formatInlineCloseElement(node);
		if(this.indent.length * this._level + open.length + content.length + close.length <= this.wrapColumns) {
			var $tmp = this.indentWrap(open + content + close);
			$s.pop();
			return $tmp;
		} else {
			this._level++;
			content = this.indentWrap(content);
			this._level--;
			var $tmp = this.indentWrap(open) + content + this.indentWrap(close);
			$s.pop();
			return $tmp;
		}
	} else if(thx.html.Element._inline.exists(node.getNodeName())) {
		var $tmp = this.formatInlineOpenElement(node) + this.formatInlineChildren(node) + this.formatInlineCloseElement(node);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = this.formatOpenElement(node) + this.formatChildren(node) + this.formatCloseElement(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.inlineContent = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::inlineContent");
	var $spos = $s.length;
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		if(child.nodeType == Xml.PCData || child.nodeType == Xml.Element && thx.html.Element._inline.exists(child.getNodeName())) continue;
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatChildren = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatChildren");
	var $spos = $s.length;
	this._level++;
	var content = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	this._level--;
	$s.pop();
	return content;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineChildren = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineChildren");
	var $spos = $s.length;
	var buf = new StringBuf();
	var $it0 = node.iterator();
	while( $it0.hasNext() ) {
		var child = $it0.next();
		buf.b[buf.b.length] = this.formatInlineNode(child);
	}
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatDocType = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatDocType");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatDocType.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatProlog = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatProlog");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatProlog.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatComment = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatComment");
	var $spos = $s.length;
	if(this.stripComments) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.indentWrap(this.nodeFormat.formatComment(node));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineComment = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineComment");
	var $spos = $s.length;
	if(this.stripComments) {
		$s.pop();
		return "";
	} else {
		var $tmp = this.nodeFormat.formatComment(node);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatEmptyElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatEmptyElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatOpenElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatOpenElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatCloseElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatCloseElement");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineEmptyElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineEmptyElement");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatEmptyElement.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineOpenElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineOpenElement");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatOpenElement.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineCloseElement = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineCloseElement");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatCloseElement.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatDocument = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatDocument");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatChildren.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatPCData = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatPCData");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatPCData.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatCData = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatCData");
	var $spos = $s.length;
	var $tmp = this.indentWrap(thx.xml.DocumentFormat.prototype.formatCData.call(this,node));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlinePCData = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlinePCData");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatPCData.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlDocumentFormat.prototype.formatInlineCData = function(node) {
	$s.push("thx.html.HtmlDocumentFormat::formatInlineCData");
	var $spos = $s.length;
	var $tmp = thx.xml.DocumentFormat.prototype.formatCData.call(this,node);
	$s.pop();
	return $tmp;
	$s.pop();
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
thx.data.MemoryLoader = function(data) {
	if( data === $_ ) return;
	$s.push("thx.data.MemoryLoader::new");
	var $spos = $s.length;
	this.data = data;
	$s.pop();
}
thx.data.MemoryLoader.__name__ = ["thx","data","MemoryLoader"];
thx.data.MemoryLoader.prototype.data = null;
thx.data.MemoryLoader.prototype.load = function(completeHandler,errorHandler) {
	$s.push("thx.data.MemoryLoader::load");
	var $spos = $s.length;
	if(null != this.data) {
		completeHandler(this.data);
		$s.pop();
		return;
	}
	var error = "data is null";
	if(null != errorHandler) errorHandler(error); else throw error;
	$s.pop();
}
thx.data.MemoryLoader.prototype.__class__ = thx.data.MemoryLoader;
thx.data.MemoryLoader.__interfaces__ = [thx.data.ILoader];
thx.html.HtmlAttributeFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.HtmlAttributeFormat::new");
	var $spos = $s.length;
	thx.xml.AttributeFormat.call(this);
	$s.pop();
}
thx.html.HtmlAttributeFormat.__name__ = ["thx","html","HtmlAttributeFormat"];
thx.html.HtmlAttributeFormat.__super__ = thx.xml.AttributeFormat;
for(var k in thx.xml.AttributeFormat.prototype ) thx.html.HtmlAttributeFormat.prototype[k] = thx.xml.AttributeFormat.prototype[k];
thx.html.HtmlAttributeFormat.prototype.formatAttribute = function(name,value) {
	$s.push("thx.html.HtmlAttributeFormat::formatAttribute");
	var $spos = $s.length;
	if(thx.html.Attribute._fill.exists(name)) {
		$s.pop();
		return name;
	} else {
		var $tmp = name + "=\"" + value + "\"";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlAttributeFormat.prototype.__class__ = thx.html.HtmlAttributeFormat;
thx.math.TestAll = function(p) {
	$s.push("thx.math.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.TestAll.__name__ = ["thx","math","TestAll"];
thx.math.TestAll.addTests = function(runner) {
	$s.push("thx.math.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.math.TestRandom());
	runner.addCase(new thx.math.TestEquations());
	$s.pop();
}
thx.math.TestAll.main = function() {
	$s.push("thx.math.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.math.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.math.TestAll.prototype.__class__ = thx.math.TestAll;
thx.util.TestResults = function(p) {
	$s.push("thx.util.TestResults::new");
	var $spos = $s.length;
	$s.pop();
}
thx.util.TestResults.__name__ = ["thx","util","TestResults"];
thx.util.TestResults.prototype.testToString = function() {
	$s.push("thx.util.TestResults::testToString");
	var $spos = $s.length;
	utest.Assert.equals("Ok",thx.util.Results.toString(thx.util.Result.Ok),null,{ fileName : "TestResults.hx", lineNumber : 11, className : "thx.util.TestResults", methodName : "testToString"});
	utest.Assert.equals("a A b B",thx.util.Results.toString(thx.util.Result.Failure([new thx.util.Message("a {1} b {0}",["B","A"],null)])),null,{ fileName : "TestResults.hx", lineNumber : 12, className : "thx.util.TestResults", methodName : "testToString"});
	var error = new thx.error.Error("b {0}",null,"B",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}).setInner(new thx.error.Error("a {0}",null,"A",{ fileName : "TestResults.hx", lineNumber : 14, className : "thx.util.TestResults", methodName : "testToString"}));
	utest.Assert.equals("b B",thx.util.Results.toString(thx.util.Result.Failure([error])),null,{ fileName : "TestResults.hx", lineNumber : 16, className : "thx.util.TestResults", methodName : "testToString"});
	$s.pop();
}
thx.util.TestResults.prototype.__class__ = thx.util.TestResults;
thx.util.DynamicsT = function() { }
thx.util.DynamicsT.__name__ = ["thx","util","DynamicsT"];
thx.util.DynamicsT.toHash = function(ob) {
	$s.push("thx.util.DynamicsT::toHash");
	var $spos = $s.length;
	var hash = new Hash();
	var $tmp = thx.util.DynamicsT.copyToHash(ob,hash);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.DynamicsT.copyToHash = function(ob,hash) {
	$s.push("thx.util.DynamicsT::copyToHash");
	var $spos = $s.length;
	var _g = 0, _g1 = Reflect.fields(ob);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		hash.set(field,Reflect.field(ob,field));
	}
	$s.pop();
	return hash;
	$s.pop();
}
thx.util.DynamicsT.prototype.__class__ = thx.util.DynamicsT;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	$s.push("haxe.Timer::new");
	var $spos = $s.length;
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
	$s.pop();
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	$s.push("haxe.Timer::delay");
	var $spos = $s.length;
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		$s.push("haxe.Timer::delay@78");
		var $spos = $s.length;
		t.stop();
		f();
		$s.pop();
	};
	$s.pop();
	return t;
	$s.pop();
}
haxe.Timer.measure = function(f,pos) {
	$s.push("haxe.Timer::measure");
	var $spos = $s.length;
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	$s.pop();
	return r;
	$s.pop();
}
haxe.Timer.stamp = function() {
	$s.push("haxe.Timer::stamp");
	var $spos = $s.length;
	var $tmp = Date.now().getTime() / 1000;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	$s.push("haxe.Timer::stop");
	var $spos = $s.length;
	if(this.id == null) {
		$s.pop();
		return;
	}
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
	$s.pop();
}
haxe.Timer.prototype.run = function() {
	$s.push("haxe.Timer::run");
	var $spos = $s.length;
	$s.pop();
}
haxe.Timer.prototype.__class__ = haxe.Timer;
thx.xml.NodeFormat = function(p) {
	$s.push("thx.xml.NodeFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.xml.NodeFormat.__name__ = ["thx","xml","NodeFormat"];
thx.xml.NodeFormat.prototype.valueFormat = null;
thx.xml.NodeFormat.prototype.attributeFormat = null;
thx.xml.NodeFormat.prototype.formatEmptyElement = function(node) {
	$s.push("thx.xml.NodeFormat::formatEmptyElement");
	var $spos = $s.length;
	var $tmp = "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + "/>";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatOpenElement = function(node) {
	$s.push("thx.xml.NodeFormat::formatOpenElement");
	var $spos = $s.length;
	var $tmp = "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatCloseElement = function(node) {
	$s.push("thx.xml.NodeFormat::formatCloseElement");
	var $spos = $s.length;
	var $tmp = "</" + node.getNodeName() + ">";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatPCData = function(node) {
	$s.push("thx.xml.NodeFormat::formatPCData");
	var $spos = $s.length;
	var $tmp = this.valueFormat.format(node.getNodeValue());
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatDocType = function(node) {
	$s.push("thx.xml.NodeFormat::formatDocType");
	var $spos = $s.length;
	var $tmp = "<!DOCTYPE " + this.valueFormat.format(node.getNodeValue()) + ">";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatProlog = function(node) {
	$s.push("thx.xml.NodeFormat::formatProlog");
	var $spos = $s.length;
	var $tmp = "<?" + this.valueFormat.format(node.getNodeValue()) + "?>";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatComment = function(node) {
	$s.push("thx.xml.NodeFormat::formatComment");
	var $spos = $s.length;
	var $tmp = "<!--" + this.valueFormat.format(node.getNodeValue()) + "-->";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.formatCData = function(node) {
	$s.push("thx.xml.NodeFormat::formatCData");
	var $spos = $s.length;
	var $tmp = "<![CDATA[" + this.valueFormat.format(node.getNodeValue()) + "]]>";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.xml.NodeFormat.prototype.__class__ = thx.xml.NodeFormat;
thx.html.HtmlNodeFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.HtmlNodeFormat::new");
	var $spos = $s.length;
	thx.xml.NodeFormat.call(this);
	$s.pop();
}
thx.html.HtmlNodeFormat.__name__ = ["thx","html","HtmlNodeFormat"];
thx.html.HtmlNodeFormat.__super__ = thx.xml.NodeFormat;
for(var k in thx.xml.NodeFormat.prototype ) thx.html.HtmlNodeFormat.prototype[k] = thx.xml.NodeFormat.prototype[k];
thx.html.HtmlNodeFormat.prototype.formatEmptyElement = function(node) {
	$s.push("thx.html.HtmlNodeFormat::formatEmptyElement");
	var $spos = $s.length;
	var $tmp = "<" + node.getNodeName() + this.attributeFormat.formatAttributes(node) + ">";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlNodeFormat.prototype.__class__ = thx.html.HtmlNodeFormat;
thx.html.CloseSelfHtmlNodeFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.CloseSelfHtmlNodeFormat::new");
	var $spos = $s.length;
	thx.html.HtmlNodeFormat.call(this);
	$s.pop();
}
thx.html.CloseSelfHtmlNodeFormat.__name__ = ["thx","html","CloseSelfHtmlNodeFormat"];
thx.html.CloseSelfHtmlNodeFormat.__super__ = thx.html.HtmlNodeFormat;
for(var k in thx.html.HtmlNodeFormat.prototype ) thx.html.CloseSelfHtmlNodeFormat.prototype[k] = thx.html.HtmlNodeFormat.prototype[k];
thx.html.CloseSelfHtmlNodeFormat.prototype.formatCloseElement = function(node) {
	$s.push("thx.html.CloseSelfHtmlNodeFormat::formatCloseElement");
	var $spos = $s.length;
	if(thx.html.Element._closeSelf.exists(node.getNodeName())) {
		$s.pop();
		return "";
	} else {
		var $tmp = "</" + node.getNodeName() + ">";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.CloseSelfHtmlNodeFormat.prototype.__class__ = thx.html.CloseSelfHtmlNodeFormat;
thx.html.TestXHtmlFormat = function(p) {
	$s.push("thx.html.TestXHtmlFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.html.TestXHtmlFormat.__name__ = ["thx","html","TestXHtmlFormat"];
thx.html.TestXHtmlFormat.prototype.format = null;
thx.html.TestXHtmlFormat.prototype.setup = function() {
	$s.push("thx.html.TestXHtmlFormat::setup");
	var $spos = $s.length;
	this.format = new thx.html.XHtmlFormat();
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testBlockElement = function() {
	$s.push("thx.html.TestXHtmlFormat::testBlockElement");
	var $spos = $s.length;
	this.assertProcessed("<div></div>","<div/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestXHtmlFormat", methodName : "testBlockElement"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testEmptyElement = function() {
	$s.push("thx.html.TestXHtmlFormat::testEmptyElement");
	var $spos = $s.length;
	this.assertProcessed("<br/>","<br>doomed to be lost</br>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 25, className : "thx.html.TestXHtmlFormat", methodName : "testEmptyElement"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testInlineElement = function() {
	$s.push("thx.html.TestXHtmlFormat::testInlineElement");
	var $spos = $s.length;
	this.assertProcessed("<div>hello <b>world</b></div>","<div>hello <b>world</b></div>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 30, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElement"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testFillAttribute = function() {
	$s.push("thx.html.TestXHtmlFormat::testFillAttribute");
	var $spos = $s.length;
	this.assertProcessed("<input class=\"class\" disabled=\"disabled\"/>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 35, className : "thx.html.TestXHtmlFormat", methodName : "testFillAttribute"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testInlineElementInLongParagraph = function() {
	$s.push("thx.html.TestXHtmlFormat::testInlineElementInLongParagraph");
	var $spos = $s.length;
	this.format.wrapColumns = 28;
	this.assertProcessed("<p>\n  Lorem ipsum dolor\n  <b>sit</b> amet,\n  consectetur <b>adipisicing\n  elit</b>, sed do eiusmod\n  tempor incididunt\n  <b>ut</b> labore et dolore\n  magna aliqua.\n</p>","<p>Lorem ipsum dolor <b>sit</b> amet, consectetur <b>adipisicing elit</b>, sed do eiusmod tempor incididunt <b>ut</b> labore et dolore magna aliqua.</p>",{ fileName : "TestXHtmlFormat.hx", lineNumber : 41, className : "thx.html.TestXHtmlFormat", methodName : "testInlineElementInLongParagraph"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testAutoFormat2 = function() {
	$s.push("thx.html.TestXHtmlFormat::testAutoFormat2");
	var $spos = $s.length;
	var xml = "<html><head><title>hello</title></head><body><div><ul><li>one</li><li>two</li><li>three</li></ul></div></body></html>";
	this.assertProcessed("<html>\n  <head>\n    <title>hello</title>\n  </head>\n  <body>\n    <div>\n      <ul>\n        <li>one</li>\n        <li>two</li>\n        <li>three</li>\n      </ul>\n    </div>\n  </body>\n</html>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 56, className : "thx.html.TestXHtmlFormat", methodName : "testAutoFormat2"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testAutoWidth = function() {
	$s.push("thx.html.TestXHtmlFormat::testAutoWidth");
	var $spos = $s.length;
	this.format.wrapColumns = 36;
	var xml = "<body><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li></ul></body>";
	this.assertProcessed("<body>\n  <p>\n    Lorem ipsum dolor sit amet,\n    consectetur adipisicing elit,\n    sed do eiusmod tempor incididunt\n    ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam,\n    quis nostrud exercitation\n    ullamco laboris nisi ut aliquip\n    ex ea commodo consequat.\n  </p>\n  <ul>\n    <li>\n      Duis aute irure dolor in\n      reprehenderit in voluptate\n      velit esse cillum dolore eu\n      fugiat nulla pariatur.\n      Excepteur sint occaecat\n      cupidatat non proident, sunt\n      in culpa qui officia deserunt\n      mollit anim id est laborum.\n    </li>\n  </ul>\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 76, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidth"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.testAutoWidthWithInlineElements = function() {
	$s.push("thx.html.TestXHtmlFormat::testAutoWidthWithInlineElements");
	var $spos = $s.length;
	this.format.wrapColumns = 36;
	var xml = "<body><p><b>Lorem</b> ipsum <b>dolor sit</b> amet</p><p>consectetur <b>adipisicing</b> elit, <b>sed do</b> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</body>";
	this.assertProcessed("<body>\n  <p>\n    <b>Lorem</b> ipsum <b>dolor\n    sit</b> amet\n  </p>\n  <p>\n    consectetur <b>adipisicing</b>\n    elit, <b>sed do</b> eiusmod\n    tempor incididunt ut labore et\n    dolore magna aliqua.\n  </p>\n  Ut enim ad minim veniam, quis\n  nostrud exercitation ullamco\n  laboris nisi ut aliquip ex ea\n  commodo consequat.\n</body>",xml,{ fileName : "TestXHtmlFormat.hx", lineNumber : 107, className : "thx.html.TestXHtmlFormat", methodName : "testAutoWidthWithInlineElements"});
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.assertProcessed = function(expected,input,pos) {
	$s.push("thx.html.TestXHtmlFormat::assertProcessed");
	var $spos = $s.length;
	utest.Assert.equals(expected,this.toHtml(input),null,pos);
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.xmlToHtml = function(xml) {
	$s.push("thx.html.TestXHtmlFormat::xmlToHtml");
	var $spos = $s.length;
	var $tmp = this.format.format(xml);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.toHtml = function(s) {
	$s.push("thx.html.TestXHtmlFormat::toHtml");
	var $spos = $s.length;
	var $tmp = this.xmlToHtml(Xml.parse(s));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.TestXHtmlFormat.prototype.__class__ = thx.html.TestXHtmlFormat;
thx.error.TestAll = function(p) {
	$s.push("thx.error.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.error.TestAll.__name__ = ["thx","error","TestAll"];
thx.error.TestAll.addTests = function(runner) {
	$s.push("thx.error.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.error.TestNullArgument());
	$s.pop();
}
thx.error.TestAll.main = function() {
	$s.push("thx.error.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.error.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
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
	$s.push("thx.math.TestRandom::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.TestRandom.__name__ = ["thx","math","TestRandom"];
thx.math.TestRandom.prototype.testSequenceDefault = function() {
	$s.push("thx.math.TestRandom::testSequenceDefault");
	var $spos = $s.length;
	var s = [16807,282475249,548908249,984943658,70367106,470211272,101027544,384109054,385036099,933495885];
	var r = new thx.math.Random();
	var _g = 0;
	while(_g < s.length) {
		var v = s[_g];
		++_g;
		utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 12, className : "thx.math.TestRandom", methodName : "testSequenceDefault"});
	}
	$s.pop();
}
thx.math.TestRandom.prototype.testSequence7 = function() {
	$s.push("thx.math.TestRandom::testSequence7");
	var $spos = $s.length;
	var s = [117649,903584919,621132276,452154665,492569745,70253433,707192808,541279734,547769049,92020257];
	var r = new thx.math.Random(7);
	var _g = 0;
	while(_g < s.length) {
		var v = s[_g];
		++_g;
		utest.Assert.equals(v,(r.seed = r.seed * 16807 % 2147483647) & 1073741823,null,{ fileName : "TestRandom.hx", lineNumber : 20, className : "thx.math.TestRandom", methodName : "testSequence7"});
	}
	$s.pop();
}
thx.math.TestRandom.prototype.__class__ = thx.math.TestRandom;
thx.html.TestHtmlFormat = function(p) {
	$s.push("thx.html.TestHtmlFormat::new");
	var $spos = $s.length;
	$s.pop();
}
thx.html.TestHtmlFormat.__name__ = ["thx","html","TestHtmlFormat"];
thx.html.TestHtmlFormat.prototype.format = null;
thx.html.TestHtmlFormat.prototype.setup = function() {
	$s.push("thx.html.TestHtmlFormat::setup");
	var $spos = $s.length;
	this.format = new thx.html.HtmlFormat();
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testEmptyElement = function() {
	$s.push("thx.html.TestHtmlFormat::testEmptyElement");
	var $spos = $s.length;
	this.assertProcessed("<br>","<br>doomed to be lost</br>",{ fileName : "TestHtmlFormat.hx", lineNumber : 20, className : "thx.html.TestHtmlFormat", methodName : "testEmptyElement"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testUseCloseSelf = function() {
	$s.push("thx.html.TestHtmlFormat::testUseCloseSelf");
	var $spos = $s.length;
	this.format.useCloseSelf = true;
	this.assertProcessed("<ul>\n  <li>item\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 26, className : "thx.html.TestHtmlFormat", methodName : "testUseCloseSelf"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testDontUseCloseSelf = function() {
	$s.push("thx.html.TestHtmlFormat::testDontUseCloseSelf");
	var $spos = $s.length;
	this.assertProcessed("<ul>\n  <li>item</li>\n</ul>","<ul><li>item</li></ul>",{ fileName : "TestHtmlFormat.hx", lineNumber : 31, className : "thx.html.TestHtmlFormat", methodName : "testDontUseCloseSelf"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testFillAttribute = function() {
	$s.push("thx.html.TestHtmlFormat::testFillAttribute");
	var $spos = $s.length;
	this.assertProcessed("<input class=\"class\" disabled>","<input class=\"class\" disabled=\"disabled\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 36, className : "thx.html.TestHtmlFormat", methodName : "testFillAttribute"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testAutoQuotesRemoval = function() {
	$s.push("thx.html.TestHtmlFormat::testAutoQuotesRemoval");
	var $spos = $s.length;
	this.format.quotesRemoval = true;
	this.assertProcessed("<img class=\"a b\" id=c>","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 42, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemoval"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.testAutoQuotesRemovalOff = function() {
	$s.push("thx.html.TestHtmlFormat::testAutoQuotesRemovalOff");
	var $spos = $s.length;
	this.assertProcessed("<img class=\"a b\" id=\"c\">","<img class=\"a b\" id=\"c\"/>",{ fileName : "TestHtmlFormat.hx", lineNumber : 47, className : "thx.html.TestHtmlFormat", methodName : "testAutoQuotesRemovalOff"});
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.assertProcessed = function(expected,input,pos) {
	$s.push("thx.html.TestHtmlFormat::assertProcessed");
	var $spos = $s.length;
	utest.Assert.equals(expected,this.toHtml(input),null,pos);
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.xmlToHtml = function(xml) {
	$s.push("thx.html.TestHtmlFormat::xmlToHtml");
	var $spos = $s.length;
	var $tmp = this.format.format(xml);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.toHtml = function(s) {
	$s.push("thx.html.TestHtmlFormat::toHtml");
	var $spos = $s.length;
	var $tmp = this.xmlToHtml(Xml.parse(s));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.TestHtmlFormat.prototype.__class__ = thx.html.TestHtmlFormat;
Objects = function() { }
Objects.__name__ = ["Objects"];
Objects.keys = function(o) {
	$s.push("Objects::keys");
	var $spos = $s.length;
	var $tmp = Reflect.fields(o);
	$s.pop();
	return $tmp;
	$s.pop();
}
Objects.values = function(o) {
	$s.push("Objects::values");
	var $spos = $s.length;
	var arr = [];
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		arr.push(Reflect.field(o,key));
	}
	$s.pop();
	return arr;
	$s.pop();
}
Objects.entries = function(o) {
	$s.push("Objects::entries");
	var $spos = $s.length;
	var arr = [];
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		arr.push({ key : key, value : Reflect.field(o,key)});
	}
	$s.pop();
	return arr;
	$s.pop();
}
Objects.prototype.__class__ = Objects;
thx.js.TestDom = function(p) {
	$s.push("thx.js.TestDom::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestDom.__name__ = ["thx","js","TestDom"];
thx.js.TestDom.addTests = function(runner) {
	$s.push("thx.js.TestDom::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.js.TestDom());
	$s.pop();
}
thx.js.TestDom.main = function() {
	$s.push("thx.js.TestDom::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.js.TestDom.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.js.TestDom.prototype.testBody = function() {
	$s.push("thx.js.TestDom::testBody");
	var $spos = $s.length;
	var data = Arrays.map(Ints.range(10),function(_,_1) {
		$s.push("thx.js.TestDom::testBody@23");
		var $spos = $s.length;
		var $tmp = Std.random(60);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	var chart = thx.js.Dom.select("body").append("div").attr("class","chart");
	chart.selectAll("div").data(data).enter().append("div").style("width",null,function(n,_) {
		$s.push("thx.js.TestDom::testBody@31");
		var $spos = $s.length;
		var $tmp = n.data * 10 + "px";
		$s.pop();
		return $tmp;
		$s.pop();
	}).text(null,function(n,_) {
		$s.push("thx.js.TestDom::testBody@32");
		var $spos = $s.length;
		var $tmp = "" + n.data;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
}
thx.js.TestDom.prototype.__class__ = thx.js.TestDom;
thx.xml.TestAll = function() { }
thx.xml.TestAll.__name__ = ["thx","xml","TestAll"];
thx.xml.TestAll.addTests = function(runner) {
	$s.push("thx.xml.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.xml.TestXmlFormat());
	runner.addCase(new thx.xml.TestXmlWriter());
	$s.pop();
}
thx.xml.TestAll.main = function() {
	$s.push("thx.xml.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.xml.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.xml.TestAll.prototype.__class__ = thx.xml.TestAll;
thx.text.json.Json = function() { }
thx.text.json.Json.__name__ = ["thx","text","json","Json"];
thx.text.json.Json.encode = function(value) {
	$s.push("thx.text.json.Json::encode");
	var $spos = $s.length;
	var $tmp = new thx.text.json.JsonEncoder().encode(value);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.Json.decode = function(value) {
	$s.push("thx.text.json.Json::decode");
	var $spos = $s.length;
	var $tmp = new thx.text.json.JsonDecoder().decode(value);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.Json.encodeObject = function(o) {
	$s.push("thx.text.json.Json::encodeObject");
	var $spos = $s.length;
	var $tmp = thx.text.json.Json.encode(thx.config.Configs.toConfigExpr(o));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.Json.decodeObject = function(s) {
	$s.push("thx.text.json.Json::decodeObject");
	var $spos = $s.length;
	var $tmp = thx.config.Configs.toDynamic(thx.text.json.Json.decode(s));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.json.Json.prototype.__class__ = thx.text.json.Json;
thx.math.Equations = function() { }
thx.math.Equations.__name__ = ["thx","math","Equations"];
thx.math.Equations.linear = function(v) {
	$s.push("thx.math.Equations::linear");
	var $spos = $s.length;
	$s.pop();
	return v;
	$s.pop();
}
thx.math.Equations.polynomial = function(t,e) {
	$s.push("thx.math.Equations::polynomial");
	var $spos = $s.length;
	var $tmp = Math.pow(t,e);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.quadratic = function(t) {
	$s.push("thx.math.Equations::quadratic");
	var $spos = $s.length;
	var $tmp = thx.math.Equations.polynomial(2,t);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.cubic = function(t) {
	$s.push("thx.math.Equations::cubic");
	var $spos = $s.length;
	var $tmp = thx.math.Equations.polynomial(3,t);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.sin = function(t) {
	$s.push("thx.math.Equations::sin");
	var $spos = $s.length;
	var $tmp = 1 - Math.cos(t * Math.PI / 2);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.exponential = function(t) {
	$s.push("thx.math.Equations::exponential");
	var $spos = $s.length;
	var $tmp = t != 0?Math.pow(2,10 * (t - 1)) - 1e-3:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.circle = function(t) {
	$s.push("thx.math.Equations::circle");
	var $spos = $s.length;
	var $tmp = 1 - Math.sqrt(1 - t * t);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.elastic = function(t,a,p) {
	$s.push("thx.math.Equations::elastic");
	var $spos = $s.length;
	var s;
	if(null == p) p = 0.45;
	if(null == a) {
		a = 1;
		s = p / 4;
	} else s = p / (2 * Math.PI) / Math.asin(1 / a);
	var $tmp = 1 + a * Math.pow(2,10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.createElastic = function(a,p) {
	$s.push("thx.math.Equations::createElastic");
	var $spos = $s.length;
	var s;
	if(null == p) p = 0.45;
	if(null == a) {
		a = 1;
		s = p / 4;
	} else s = p / (2 * Math.PI) / Math.asin(1 / a);
	var $tmp = function(t) {
		$s.push("thx.math.Equations::createElastic@70");
		var $spos = $s.length;
		var $tmp = 1 + a * Math.pow(2,10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.back = function(t,s) {
	$s.push("thx.math.Equations::back");
	var $spos = $s.length;
	if(null == s) s = 1.70158;
	var $tmp = t * t * ((s + 1) * t - s);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.createBack = function(s) {
	$s.push("thx.math.Equations::createBack");
	var $spos = $s.length;
	if(null == s) s = 1.70158;
	var $tmp = function(t) {
		$s.push("thx.math.Equations::createBack@83");
		var $spos = $s.length;
		var $tmp = t * t * ((s + 1) * t - s);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.bounce = function(t) {
	$s.push("thx.math.Equations::bounce");
	var $spos = $s.length;
	var $tmp = t < 1 / 2.75?7.5625 * t * t:t < 2 / 2.75?7.5625 * (t -= 1.5 / 2.75) * t + .75:t < 2.5 / 2.75?7.5625 * (t -= 2.25 / 2.75) * t + .9375:7.5625 * (t -= 2.625 / 2.75) * t + .984375;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.createPolynomial = function(e) {
	$s.push("thx.math.Equations::createPolynomial");
	var $spos = $s.length;
	var $tmp = function(t) {
		$s.push("thx.math.Equations::createPolynomial@96");
		var $spos = $s.length;
		thx.math.Equations.polynomial(t,e);
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.prototype.__class__ = thx.math.Equations;
thx.text.TestInflections = function(p) {
	$s.push("thx.text.TestInflections::new");
	var $spos = $s.length;
	$s.pop();
}
thx.text.TestInflections.__name__ = ["thx","text","TestInflections"];
thx.text.TestInflections.addTests = function(runner) {
	$s.push("thx.text.TestInflections::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.text.TestInflections());
	$s.pop();
}
thx.text.TestInflections.main = function() {
	$s.push("thx.text.TestInflections::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.text.TestInflections.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.text.TestInflections.prototype.testUncountable = function() {
	$s.push("thx.text.TestInflections::testUncountable");
	var $spos = $s.length;
	utest.Assert.equals("information",thx.text.Inflections.pluralize("information"),null,{ fileName : "TestInflections.hx", lineNumber : 16, className : "thx.text.TestInflections", methodName : "testUncountable"});
	utest.Assert.equals("news",thx.text.Inflections.pluralize("news"),null,{ fileName : "TestInflections.hx", lineNumber : 17, className : "thx.text.TestInflections", methodName : "testUncountable"});
	$s.pop();
}
thx.text.TestInflections.prototype.testPluralize = function() {
	$s.push("thx.text.TestInflections::testPluralize");
	var $spos = $s.length;
	utest.Assert.equals("days",thx.text.Inflections.pluralize("day"),null,{ fileName : "TestInflections.hx", lineNumber : 22, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("women",thx.text.Inflections.pluralize("woman"),null,{ fileName : "TestInflections.hx", lineNumber : 23, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("autobuses",thx.text.Inflections.pluralize("autobus"),null,{ fileName : "TestInflections.hx", lineNumber : 24, className : "thx.text.TestInflections", methodName : "testPluralize"});
	utest.Assert.equals("quizzes",thx.text.Inflections.pluralize("quiz"),null,{ fileName : "TestInflections.hx", lineNumber : 25, className : "thx.text.TestInflections", methodName : "testPluralize"});
	$s.pop();
}
thx.text.TestInflections.prototype.testSingularize = function() {
	$s.push("thx.text.TestInflections::testSingularize");
	var $spos = $s.length;
	utest.Assert.equals("day",thx.text.Inflections.singularize("days"),null,{ fileName : "TestInflections.hx", lineNumber : 30, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("woman",thx.text.Inflections.singularize("women"),null,{ fileName : "TestInflections.hx", lineNumber : 31, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("autobus",thx.text.Inflections.singularize("autobuses"),null,{ fileName : "TestInflections.hx", lineNumber : 32, className : "thx.text.TestInflections", methodName : "testSingularize"});
	utest.Assert.equals("quiz",thx.text.Inflections.singularize("quizzes"),null,{ fileName : "TestInflections.hx", lineNumber : 33, className : "thx.text.TestInflections", methodName : "testSingularize"});
	$s.pop();
}
thx.text.TestInflections.prototype.__class__ = thx.text.TestInflections;
thx.text.TestAll = function(p) {
	$s.push("thx.text.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.text.TestAll.__name__ = ["thx","text","TestAll"];
thx.text.TestAll.addTests = function(runner) {
	$s.push("thx.text.TestAll::addTests");
	var $spos = $s.length;
	thx.text.TestPaths.addTests(runner);
	thx.text.TestInflections.addTests(runner);
	runner.addCase(new thx.text.json.TestJson());
	$s.pop();
}
thx.text.TestAll.main = function() {
	$s.push("thx.text.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.text.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
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
	$s.push("thx.validation.UrlValidator::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.UrlValidator.__name__ = ["thx","validation","UrlValidator"];
thx.validation.UrlValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.UrlValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.UrlValidator.prototype.validate = function(value) {
	$s.push("thx.validation.UrlValidator::validate");
	var $spos = $s.length;
	if(!thx.validation.UrlValidator._reUrl.match(value)) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("invalid url '{0}'",[value],null)]);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.UrlValidator.prototype.__class__ = thx.validation.UrlValidator;
thx.validation.CustomValidator = function(p) {
	if( p === $_ ) return;
	$s.push("thx.validation.CustomValidator::new");
	var $spos = $s.length;
	this.validators = [];
	$s.pop();
}
thx.validation.CustomValidator.__name__ = ["thx","validation","CustomValidator"];
thx.validation.CustomValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.CustomValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.CustomValidator.prototype.validators = null;
thx.validation.CustomValidator.prototype.validate = function(value) {
	$s.push("thx.validation.CustomValidator::validate");
	var $spos = $s.length;
	var _g = 0, _g1 = this.validators;
	while(_g < _g1.length) {
		var validator = _g1[_g];
		++_g;
		var message = validator(value);
		if(null != message) {
			var $tmp = thx.util.Result.Failure([message]);
			$s.pop();
			return $tmp;
		}
	}
	var $tmp = thx.util.Result.Ok;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.validation.CustomValidator.prototype.add = function(handler) {
	$s.push("thx.validation.CustomValidator::add");
	var $spos = $s.length;
	this.validators.push(handler);
	$s.pop();
}
thx.validation.CustomValidator.prototype.clear = function() {
	$s.push("thx.validation.CustomValidator::clear");
	var $spos = $s.length;
	this.validators = [];
	$s.pop();
}
thx.validation.CustomValidator.prototype.__class__ = thx.validation.CustomValidator;
thx.validation.TestEmail = function(p) {
	$s.push("thx.validation.TestEmail::new");
	var $spos = $s.length;
	$s.pop();
}
thx.validation.TestEmail.__name__ = ["thx","validation","TestEmail"];
thx.validation.TestEmail.__super__ = thx.validation.TestAll;
for(var k in thx.validation.TestAll.prototype ) thx.validation.TestEmail.prototype[k] = thx.validation.TestAll.prototype[k];
thx.validation.TestEmail.prototype.testValidEmails = function() {
	$s.push("thx.validation.TestEmail::testValidEmails");
	var $spos = $s.length;
	var validator = new thx.validation.EmailValidator(false);
	var emails = ["\"test\\\\blah\"@example.com","\"test\\\"blah\"@example.com","customer/department@example.com","$A12345@example.com","!def!xyz%abc@example.com","_Yosemite.Sam@example.com","~@example.com","\"Austin@Powers\"@example.com","Ima.Fool@example.com","\"Ima.Fool\"@example.com"];
	var _g = 0;
	while(_g < emails.length) {
		var email = emails[_g];
		++_g;
		this.assertValidation(validator.validate(email),true,email + " should be valid",{ fileName : "TestEmail.hx", lineNumber : 12, className : "thx.validation.TestEmail", methodName : "testValidEmails"});
	}
	$s.pop();
}
thx.validation.TestEmail.prototype.testInvalidEmails = function() {
	$s.push("thx.validation.TestEmail::testInvalidEmails");
	var $spos = $s.length;
	var validator = new thx.validation.EmailValidator(false);
	var emails = ["NotAnEmail","@NotAnEmail","\"test\rblah\"@example.com","\"test\"blah\"@example.com",".wooly@example.com","wo..oly@example.com","pootietang.@example.com",".@example.com","Ima Fool@example.com"];
	var _g = 0;
	while(_g < emails.length) {
		var email = emails[_g];
		++_g;
		this.assertValidation(validator.validate(email),false,email + " should NOT be valid",{ fileName : "TestEmail.hx", lineNumber : 20, className : "thx.validation.TestEmail", methodName : "testInvalidEmails"});
	}
	$s.pop();
}
thx.validation.TestEmail.prototype.testTopLevelDomain = function() {
	$s.push("thx.validation.TestEmail::testTopLevelDomain");
	var $spos = $s.length;
	var validator = new thx.validation.EmailValidator(true);
	this.assertValidation(validator.validate("a@b.fake"),false,null,{ fileName : "TestEmail.hx", lineNumber : 26, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
	var validator1 = new thx.validation.EmailValidator(false);
	this.assertValidation(validator1.validate("a@b.fake"),true,null,{ fileName : "TestEmail.hx", lineNumber : 28, className : "thx.validation.TestEmail", methodName : "testTopLevelDomain"});
	$s.pop();
}
thx.validation.TestEmail.prototype.__class__ = thx.validation.TestEmail;
thx.html.TestHtmlParser = function(p) {
	$s.push("thx.html.TestHtmlParser::new");
	var $spos = $s.length;
	$s.pop();
}
thx.html.TestHtmlParser.__name__ = ["thx","html","TestHtmlParser"];
thx.html.TestHtmlParser.assertHasElement = function(xml,element,pos) {
	$s.push("thx.html.TestHtmlParser::assertHasElement");
	var $spos = $s.length;
	var parts = element.split(">");
	var node = xml;
	while(null != node && parts.length > 0) {
		var it = node.elementsNamed(parts.shift());
		if(it.hasNext()) node = it.next(); else node = null;
	}
	utest.Assert.isTrue(node != null,null,pos);
	$s.pop();
}
thx.html.TestHtmlParser.prototype.testMain = function() {
	$s.push("thx.html.TestHtmlParser::testMain");
	var $spos = $s.length;
	var xml = thx.html.Html.toXml("<?xml version=\"1.0\"?><!doctype html><html><head><title></title></head><body></body></html>");
	thx.html.TestHtmlParser.assertHasElement(xml,"html",{ fileName : "TestHtmlParser.hx", lineNumber : 22, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>head",{ fileName : "TestHtmlParser.hx", lineNumber : 23, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>head>title",{ fileName : "TestHtmlParser.hx", lineNumber : 24, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	thx.html.TestHtmlParser.assertHasElement(xml,"html>body",{ fileName : "TestHtmlParser.hx", lineNumber : 25, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	var it = xml.iterator();
	utest.Assert.equals(Xml.Prolog,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 27, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	utest.Assert.equals(Xml.DocType,it.next().nodeType,null,{ fileName : "TestHtmlParser.hx", lineNumber : 28, className : "thx.html.TestHtmlParser", methodName : "testMain"});
	$s.pop();
}
thx.html.TestHtmlParser.prototype.__class__ = thx.html.TestHtmlParser;
thx.html.XHtmlFormat = function(autoformat,indent,newline) {
	if( autoformat === $_ ) return;
	$s.push("thx.html.XHtmlFormat::new");
	var $spos = $s.length;
	if(autoformat == null) autoformat = true;
	thx.xml.XmlFormat.call(this,autoformat,indent,newline);
	$s.pop();
}
thx.html.XHtmlFormat.__name__ = ["thx","html","XHtmlFormat"];
thx.html.XHtmlFormat.__super__ = thx.xml.XmlFormat;
for(var k in thx.xml.XmlFormat.prototype ) thx.html.XHtmlFormat.prototype[k] = thx.xml.XmlFormat.prototype[k];
thx.html.XHtmlFormat.prototype.createDocumentFormat = function() {
	$s.push("thx.html.XHtmlFormat::createDocumentFormat");
	var $spos = $s.length;
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
	$s.pop();
	return document;
	$s.pop();
}
thx.html.XHtmlFormat.prototype.__class__ = thx.html.XHtmlFormat;
thx.html.HtmlFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.html.HtmlFormat::new");
	var $spos = $s.length;
	thx.html.XHtmlFormat.call(this);
	this.useCloseSelf = false;
	this.quotesRemoval = false;
	$s.pop();
}
thx.html.HtmlFormat.__name__ = ["thx","html","HtmlFormat"];
thx.html.HtmlFormat.__super__ = thx.html.XHtmlFormat;
for(var k in thx.html.XHtmlFormat.prototype ) thx.html.HtmlFormat.prototype[k] = thx.html.XHtmlFormat.prototype[k];
thx.html.HtmlFormat.prototype.useCloseSelf = null;
thx.html.HtmlFormat.prototype.quotesRemoval = null;
thx.html.HtmlFormat.prototype.specialElementContentFormat = null;
thx.html.HtmlFormat.prototype.createAttributeFormat = function() {
	$s.push("thx.html.HtmlFormat::createAttributeFormat");
	var $spos = $s.length;
	if(this.quotesRemoval) {
		var $tmp = new thx.html.UnquotedHtmlAttributeFormat();
		$s.pop();
		return $tmp;
	} else {
		var $tmp = new thx.html.HtmlAttributeFormat();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlFormat.prototype.createNodeFormat = function() {
	$s.push("thx.html.HtmlFormat::createNodeFormat");
	var $spos = $s.length;
	if(this.useCloseSelf) {
		var $tmp = new thx.html.CloseSelfHtmlNodeFormat();
		$s.pop();
		return $tmp;
	} else {
		var $tmp = new thx.html.HtmlNodeFormat();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.HtmlFormat.prototype.createDocumentFormat = function() {
	$s.push("thx.html.HtmlFormat::createDocumentFormat");
	var $spos = $s.length;
	var doc = thx.html.XHtmlFormat.prototype.createDocumentFormat.call(this);
	if(null == this.specialElementContentFormat) {
		$s.pop();
		return doc;
	}
	var html = Std["is"](doc,thx.html.HtmlDocumentFormat)?doc:null;
	if(null == html) {
		$s.pop();
		return doc;
	}
	html.specialElementContentFormat = this.specialElementContentFormat;
	$s.pop();
	return html;
	$s.pop();
}
thx.html.HtmlFormat.prototype.__class__ = thx.html.HtmlFormat;
thx.validation.OptionValidator = function(options,it,showOptionsInFailureMessage) {
	if( options === $_ ) return;
	$s.push("thx.validation.OptionValidator::new");
	var $spos = $s.length;
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
	$s.pop();
}
thx.validation.OptionValidator.__name__ = ["thx","validation","OptionValidator"];
thx.validation.OptionValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.OptionValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.OptionValidator.prototype.options = null;
thx.validation.OptionValidator.prototype.showOptionsInFailureMessage = null;
thx.validation.OptionValidator.prototype.valueExists = function(v) {
	$s.push("thx.validation.OptionValidator::valueExists");
	var $spos = $s.length;
	var $tmp = Lambda.exists(this.options,function(a) {
		$s.push("thx.validation.OptionValidator::valueExists@31");
		var $spos = $s.length;
		var $tmp = a.value == v;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.validation.OptionValidator.prototype.labels = function() {
	$s.push("thx.validation.OptionValidator::labels");
	var $spos = $s.length;
	var arr = [];
	var _g = 0, _g1 = this.options;
	while(_g < _g1.length) {
		var option = _g1[_g];
		++_g;
		arr.push(option.label);
	}
	$s.pop();
	return arr;
	$s.pop();
}
thx.validation.OptionValidator.prototype.descriptions = function() {
	$s.push("thx.validation.OptionValidator::descriptions");
	var $spos = $s.length;
	var arr = [];
	var _g = 0, _g1 = this.options;
	while(_g < _g1.length) {
		var option = _g1[_g];
		++_g;
		if(option.label != option.value) arr.push(option.label + " (" + option.value + ")"); else arr.push(option.label);
	}
	$s.pop();
	return arr;
	$s.pop();
}
thx.validation.OptionValidator.prototype.validate = function(value) {
	$s.push("thx.validation.OptionValidator::validate");
	var $spos = $s.length;
	if(this.valueExists(value)) {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	} else if(this.showOptionsInFailureMessage) {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be one of the following options: {0}",[this.descriptions()],null)]);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Failure([new thx.util.Message("value is not a valid option",[],null)]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.OptionValidator.prototype.__class__ = thx.validation.OptionValidator;
utest.Assert = function() { }
utest.Assert.__name__ = ["utest","Assert"];
utest.Assert.results = null;
utest.Assert.isTrue = function(cond,msg,pos) {
	$s.push("utest.Assert::isTrue");
	var $spos = $s.length;
	if(utest.Assert.results == null) throw "Assert.results is not currently bound to any assert context";
	if(null == msg) msg = "expected true";
	if(cond) utest.Assert.results.add(utest.Assertation.Success(pos)); else utest.Assert.results.add(utest.Assertation.Failure(msg,pos));
	$s.pop();
}
utest.Assert.isFalse = function(value,msg,pos) {
	$s.push("utest.Assert::isFalse");
	var $spos = $s.length;
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value == false,msg,pos);
	$s.pop();
}
utest.Assert.isNull = function(value,msg,pos) {
	$s.push("utest.Assert::isNull");
	var $spos = $s.length;
	if(msg == null) msg = "expected null but was " + utest.Assert.q(value);
	utest.Assert.isTrue(value == null,msg,pos);
	$s.pop();
}
utest.Assert.notNull = function(value,msg,pos) {
	$s.push("utest.Assert::notNull");
	var $spos = $s.length;
	if(null == msg) msg = "expected false";
	utest.Assert.isTrue(value != null,msg,pos);
	$s.pop();
}
utest.Assert["is"] = function(value,type,msg,pos) {
	$s.push("utest.Assert::is");
	var $spos = $s.length;
	if(msg == null) msg = "expected type " + utest.Assert.typeToString(type) + " but was " + utest.Assert.typeToString(value);
	utest.Assert.isTrue(Std["is"](value,type),msg,pos);
	$s.pop();
}
utest.Assert.notEquals = function(expected,value,msg,pos) {
	$s.push("utest.Assert::notEquals");
	var $spos = $s.length;
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " and testa value " + utest.Assert.q(value) + " should be different";
	utest.Assert.isFalse(expected == value,msg,pos);
	$s.pop();
}
utest.Assert.equals = function(expected,value,msg,pos) {
	$s.push("utest.Assert::equals");
	var $spos = $s.length;
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	utest.Assert.isTrue(expected == value,msg,pos);
	$s.pop();
}
utest.Assert.match = function(pattern,value,msg,pos) {
	$s.push("utest.Assert::match");
	var $spos = $s.length;
	if(msg == null) msg = "the value " + utest.Assert.q(value) + "does not match the provided pattern";
	utest.Assert.isTrue(pattern.match(value),msg,pos);
	$s.pop();
}
utest.Assert._floatEquals = function(expected,value,approx) {
	$s.push("utest.Assert::_floatEquals");
	var $spos = $s.length;
	if(Math.isNaN(expected)) {
		if(Math.isNaN(value)) {
			$s.pop();
			return true;
		} else {
			$s.pop();
			return false;
		}
	} else if(Math.isNaN(value)) {
		$s.pop();
		return false;
	}
	if(null == approx) approx = 1e-5;
	var $tmp = Math.abs(value - expected) < approx;
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	$s.push("utest.Assert::floatEquals");
	var $spos = $s.length;
	if(msg == null) msg = "expected " + expected + " but was " + value;
	var $tmp = utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.getTypeName = function(v) {
	$s.push("utest.Assert::getTypeName");
	var $spos = $s.length;
	if(v == null) {
		$s.pop();
		return null;
	}
	if(Std["is"](v,Bool)) {
		$s.pop();
		return "Bool";
	}
	if(Std["is"](v,Int)) {
		$s.pop();
		return "Int";
	}
	if(Std["is"](v,Float)) {
		$s.pop();
		return "Float";
	}
	if(Std["is"](v,String)) {
		$s.pop();
		return "String";
	}
	var s = null;
	try {
		s = Type.getClassName(Type.getClass(v));
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	if(s != null) {
		$s.pop();
		return s;
	}
	if(Reflect.isObject(v)) {
		$s.pop();
		return "{}";
	}
	try {
		s = Type.getEnumName(Type.getEnum(v));
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	if(s != null) {
		$s.pop();
		return s;
	}
	try {
		s = Std.string(Type["typeof"](v));
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	$s.pop();
	return s;
	$s.pop();
}
utest.Assert.isIterable = function(v,isAnonym) {
	$s.push("utest.Assert::isIterable");
	var $spos = $s.length;
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"iterator")) {
		$s.pop();
		return false;
	}
	var $tmp = Reflect.isFunction(Reflect.field(v,"iterator"));
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.isIterator = function(v,isAnonym) {
	$s.push("utest.Assert::isIterator");
	var $spos = $s.length;
	var fields = isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) {
		$s.pop();
		return false;
	}
	var $tmp = Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.sameAs = function(expected,value,status) {
	$s.push("utest.Assert::sameAs");
	var $spos = $s.length;
	var texpected = utest.Assert.getTypeName(expected);
	var tvalue = utest.Assert.getTypeName(value);
	var isanonym = texpected == "{}";
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		$s.pop();
		return false;
	}
	if(expected == null) {
		if(value != null) {
			status.error = "expected null but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		$s.pop();
		return true;
	}
	if(Std["is"](expected,Float)) {
		var $tmp = utest.Assert._floatEquals(expected,value);
		$s.pop();
		return $tmp;
	} else if(Std["is"](expected,Bool) || Std["is"](expected,Int) || Std["is"](expected,String)) {
		if(expected != value) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		$s.pop();
		return true;
	}
	if(Std["is"](expected,Date)) {
		if(expected.getTime() != value.getTime()) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		$s.pop();
		return true;
	}
	if(Type.getEnum(expected) != null) {
		if(status.recursive || status.path == "") {
			if(expected[1] != value[1]) {
				status.error = "expected " + utest.Assert.q(expected[0]) + " but is " + utest.Assert.q(value[0]) + (status.path == ""?"":" for field " + status.path);
				$s.pop();
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
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	if(Std["is"](expected,Array)) {
		if(status.recursive || status.path == "") {
			if(expected.length != value.length) {
				status.error = "expected " + expected.length + " elements but they were " + value.length + (status.path == ""?"":" for field " + status.path);
				$s.pop();
				return false;
			}
			var path = status.path;
			var _g1 = 0, _g = expected.length;
			while(_g1 < _g) {
				var i = _g1++;
				status.path = path == ""?"array[" + i + "]":path + "[" + i + "]";
				if(!utest.Assert.sameAs(expected[i],value[i],status)) {
					status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	if(Std["is"](expected,haxe.io.Bytes)) {
		if(status.recursive || status.path == "") {
			var ebytes = expected;
			var vbytes = value;
			if(ebytes.length != vbytes.length) {
				$s.pop();
				return false;
			}
			var _g1 = 0, _g = ebytes.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(ebytes.b[i] != vbytes.b[i]) {
					status.error = "expected byte " + ebytes.b[i] + " but wss " + ebytes.b[i] + (status.path == ""?"":" for field " + status.path);
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	if(Std["is"](expected,Hash) || Std["is"](expected,IntHash)) {
		if(status.recursive || status.path == "") {
			var keys = Lambda.array({ iterator : function() {
				$s.push("utest.Assert::sameAs@300");
				var $spos = $s.length;
				var $tmp = expected.keys();
				$s.pop();
				return $tmp;
				$s.pop();
			}});
			var vkeys = Lambda.array({ iterator : function() {
				$s.push("utest.Assert::sameAs@301");
				var $spos = $s.length;
				var $tmp = value.keys();
				$s.pop();
				return $tmp;
				$s.pop();
			}});
			if(keys.length != vkeys.length) {
				status.error = "expected " + keys.length + " keys but they were " + vkeys.length + (status.path == ""?"":" for field " + status.path);
				$s.pop();
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
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	if(utest.Assert.isIterator(expected,isanonym)) {
		if(isanonym && !utest.Assert.isIterator(value,true)) {
			status.error = "expected Iterable but it is not " + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		if(status.recursive || status.path == "") {
			var evalues = Lambda.array({ iterator : function() {
				$s.push("utest.Assert::sameAs@326");
				var $spos = $s.length;
				$s.pop();
				return expected;
				$s.pop();
			}});
			var vvalues = Lambda.array({ iterator : function() {
				$s.push("utest.Assert::sameAs@327");
				var $spos = $s.length;
				$s.pop();
				return value;
				$s.pop();
			}});
			if(evalues.length != vvalues.length) {
				status.error = "expected " + evalues.length + " values in Iterator but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
				$s.pop();
				return false;
			}
			var path = status.path;
			var _g1 = 0, _g = evalues.length;
			while(_g1 < _g) {
				var i = _g1++;
				status.path = path == ""?"iterator[" + i + "]":path + "[" + i + "]";
				if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
					status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	if(utest.Assert.isIterable(expected,isanonym)) {
		if(isanonym && !utest.Assert.isIterable(value,true)) {
			status.error = "expected Iterator but it is not " + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		if(status.recursive || status.path == "") {
			var evalues = Lambda.array(expected);
			var vvalues = Lambda.array(value);
			if(evalues.length != vvalues.length) {
				status.error = "expected " + evalues.length + " values in Iterable but they were " + vvalues.length + (status.path == ""?"":" for field " + status.path);
				$s.pop();
				return false;
			}
			var path = status.path;
			var _g1 = 0, _g = evalues.length;
			while(_g1 < _g) {
				var i = _g1++;
				status.path = path == ""?"iterable[" + i + "]":path + "[" + i + "]";
				if(!utest.Assert.sameAs(evalues[i],vvalues[i],status)) {
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
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
					$s.pop();
					return false;
				}
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) continue;
				var v = Reflect.field(value,field);
				if(!utest.Assert.sameAs(e,v,status)) {
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	}
	var $tmp = (function($this) {
		var $r;
		throw "Unable to compare values: " + utest.Assert.q(expected) + " and " + utest.Assert.q(value);
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.q = function(v) {
	$s.push("utest.Assert::q");
	var $spos = $s.length;
	if(Std["is"](v,String)) {
		var $tmp = "\"" + StringTools.replace(v,"\"","\\\"") + "\"";
		$s.pop();
		return $tmp;
	} else if(v == null) {
		$s.pop();
		return "null";
	} else {
		var $tmp = "" + v;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
utest.Assert.same = function(expected,value,recursive,msg,pos) {
	$s.push("utest.Assert::same");
	var $spos = $s.length;
	if(null == recursive) recursive = true;
	var status = { recursive : recursive, path : "", error : null};
	if(utest.Assert.sameAs(expected,value,status)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?status.error:msg,pos);
	$s.pop();
}
utest.Assert.raises = function(method,type,msg,pos) {
	$s.push("utest.Assert::raises");
	var $spos = $s.length;
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		utest.Assert.fail("exception of type " + name + " not raised",pos);
	} catch( ex ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		utest.Assert.isTrue(Std["is"](ex,type),"expected throw of type " + name + " but was " + ex,pos);
	}
	$s.pop();
}
utest.Assert.allows = function(possibilities,value,msg,pos) {
	$s.push("utest.Assert::allows");
	var $spos = $s.length;
	if(Lambda.has(possibilities,value)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " not found in the expected possibilities " + possibilities:msg,pos);
	$s.pop();
}
utest.Assert.contains = function(match,values,msg,pos) {
	$s.push("utest.Assert::contains");
	var $spos = $s.length;
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + values + " do not contain " + match:msg,pos);
	$s.pop();
}
utest.Assert.notContains = function(match,values,msg,pos) {
	$s.push("utest.Assert::notContains");
	var $spos = $s.length;
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + values + " do contain " + match:msg,pos);
	$s.pop();
}
utest.Assert.stringContains = function(match,value,msg,pos) {
	$s.push("utest.Assert::stringContains");
	var $spos = $s.length;
	if(value != null && value.indexOf(match) >= 0) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"value " + utest.Assert.q(value) + " does not contain " + utest.Assert.q(match):msg,pos);
	$s.pop();
}
utest.Assert.stringSequence = function(sequence,value,msg,pos) {
	$s.push("utest.Assert::stringSequence");
	var $spos = $s.length;
	if(null == value) {
		utest.Assert.fail(msg == null?"null argument value":msg,{ fileName : "Assert.hx", lineNumber : 520, className : "utest.Assert", methodName : "stringSequence"});
		$s.pop();
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
			utest.Assert.fail(msg,{ fileName : "Assert.hx", lineNumber : 538, className : "utest.Assert", methodName : "stringSequence"});
			$s.pop();
			return;
		}
		p = pos1 + s.length;
	}
	utest.Assert.isTrue(true,msg,pos);
	$s.pop();
}
utest.Assert.fail = function(msg,pos) {
	$s.push("utest.Assert::fail");
	var $spos = $s.length;
	if(msg == null) msg = "failure expected";
	utest.Assert.isTrue(false,msg,pos);
	$s.pop();
}
utest.Assert.warn = function(msg) {
	$s.push("utest.Assert::warn");
	var $spos = $s.length;
	utest.Assert.results.add(utest.Assertation.Warning(msg));
	$s.pop();
}
utest.Assert.createAsync = function(f,timeout) {
	$s.push("utest.Assert::createAsync");
	var $spos = $s.length;
	var $tmp = function() {
		$s.push("utest.Assert::createAsync@577");
		var $spos = $s.length;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.createEvent = function(f,timeout) {
	$s.push("utest.Assert::createEvent");
	var $spos = $s.length;
	var $tmp = function(e) {
		$s.push("utest.Assert::createEvent@588");
		var $spos = $s.length;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.typeToString = function(t) {
	$s.push("utest.Assert::typeToString");
	var $spos = $s.length;
	try {
		var _t = Type.getClass(t);
		if(_t != null) t = _t;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	try {
		var $tmp = Type.getClassName(t);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) t = _t;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	try {
		var $tmp = Type.getEnumName(t);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	try {
		var $tmp = Std.string(Type["typeof"](t));
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	try {
		var $tmp = Std.string(t);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	$s.pop();
	return "<unable to retrieve type name>";
	$s.pop();
}
utest.Assert.prototype.__class__ = utest.Assert;
thx.text.json.TestJson = function(p) {
	$s.push("thx.text.json.TestJson::new");
	var $spos = $s.length;
	$s.pop();
}
thx.text.json.TestJson.__name__ = ["thx","text","json","TestJson"];
thx.text.json.TestJson.prototype.testEncode = function() {
	$s.push("thx.text.json.TestJson::testEncode");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.text.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.equals(test.s,thx.text.json.Json.encode(test.c),null,{ fileName : "TestJson.hx", lineNumber : 29, className : "thx.text.json.TestJson", methodName : "testEncode"});
	}
	$s.pop();
}
thx.text.json.TestJson.prototype.testDecode = function() {
	$s.push("thx.text.json.TestJson::testDecode");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.text.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		try {
			utest.Assert.same(test.c,thx.text.json.Json.decode(test.s),null,null,{ fileName : "TestJson.hx", lineNumber : 38, className : "thx.text.json.TestJson", methodName : "testDecode"});
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			utest.Assert.fail("error decoding: " + test.s + "\n" + Std.string(e),{ fileName : "TestJson.hx", lineNumber : 40, className : "thx.text.json.TestJson", methodName : "testDecode"});
			break;
		}
	}
	$s.pop();
}
thx.text.json.TestJson.prototype.__class__ = thx.text.json.TestJson;
thx.color.TestCmyk = function(p) {
	$s.push("thx.color.TestCmyk::new");
	var $spos = $s.length;
	$s.pop();
}
thx.color.TestCmyk.__name__ = ["thx","color","TestCmyk"];
thx.color.TestCmyk.prototype.testBasics = function() {
	$s.push("thx.color.TestCmyk::testBasics");
	var $spos = $s.length;
	var tests = [{ rgb : new thx.color.Rgb(255,0,0), cmyk : new thx.color.Cmyk(0,1,1,0)},{ rgb : new thx.color.Rgb(255,102,0), cmyk : new thx.color.Cmyk(0,0.6,1,0)},{ rgb : new thx.color.Rgb(0,255,0), cmyk : new thx.color.Cmyk(1,0,1,0)},{ rgb : new thx.color.Rgb(102,255,102), cmyk : new thx.color.Cmyk(0.6,0,0.6,0)},{ rgb : new thx.color.Rgb(0,102,255), cmyk : new thx.color.Cmyk(1,0.6,0,0)}];
	var _g = 0;
	while(_g < tests.length) {
		var test = tests[_g];
		++_g;
		utest.Assert.isTrue(thx.color.Rgb.equals(test.rgb,test.cmyk),"expected " + test.rgb + " but was " + test.cmyk + " for " + test.cmyk.toCmykString(),{ fileName : "TestCmyk.hx", lineNumber : 24, className : "thx.color.TestCmyk", methodName : "testBasics"});
		var c = thx.color.Cmyk.toCmyk(test.rgb);
		utest.Assert.isTrue(thx.color.Rgb.equals(c,test.cmyk),"expected " + c + " but was " + test.cmyk + " for " + test.cmyk.toCmykString(),{ fileName : "TestCmyk.hx", lineNumber : 26, className : "thx.color.TestCmyk", methodName : "testBasics"});
	}
	$s.pop();
}
thx.color.TestCmyk.prototype.__class__ = thx.color.TestCmyk;
thx.math.TestEquations = function(p) {
	$s.push("thx.math.TestEquations::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.TestEquations.__name__ = ["thx","math","TestEquations"];
thx.math.TestEquations.prototype.testLinear = function() {
	$s.push("thx.math.TestEquations::testLinear");
	var $spos = $s.length;
	utest.Assert.floatEquals(0.25,thx.math.Equations.linear(0.25),null,null,{ fileName : "TestEquations.hx", lineNumber : 10, className : "thx.math.TestEquations", methodName : "testLinear"});
	$s.pop();
}
thx.math.TestEquations.prototype.__class__ = thx.math.TestEquations;
thx.error.NullArgument = function(argumentName,posInfo) {
	if( argumentName === $_ ) return;
	$s.push("thx.error.NullArgument::new");
	var $spos = $s.length;
	thx.error.Error.call(this,"invalid null argument '{0}'",null,argumentName,posInfo);
	$s.pop();
}
thx.error.NullArgument.__name__ = ["thx","error","NullArgument"];
thx.error.NullArgument.__super__ = thx.error.Error;
for(var k in thx.error.Error.prototype ) thx.error.NullArgument.prototype[k] = thx.error.Error.prototype[k];
thx.error.NullArgument.throwIfNull = function(value,name,posInfo) {
	$s.push("thx.error.NullArgument::throwIfNull");
	var $spos = $s.length;
	if(null == value) throw new thx.error.NullArgument(name,posInfo);
	$s.pop();
}
thx.error.NullArgument.prototype.__class__ = thx.error.NullArgument;
thx.html.HtmlParser = function(html) {
	if( html === $_ ) return;
	$s.push("thx.html.HtmlParser::new");
	var $spos = $s.length;
	if(null == html) throw new thx.error.NullArgument("html",{ fileName : "HtmlParser.hx", lineNumber : 29, className : "thx.html.HtmlParser", methodName : "new"});
	this.html = html;
	$s.pop();
}
thx.html.HtmlParser.__name__ = ["thx","html","HtmlParser"];
thx.html.HtmlParser.prototype.handler = null;
thx.html.HtmlParser.prototype.html = null;
thx.html.HtmlParser.prototype.stack = null;
thx.html.HtmlParser.prototype.process = function(handler) {
	$s.push("thx.html.HtmlParser::process");
	var $spos = $s.length;
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
						$s.push("thx.html.HtmlParser::process@63");
						var $spos = $s.length;
						me.parseEndTag(re.matched(1));
						$s.pop();
						return "";
						$s.pop();
					});
					chars = false;
				}
			} else if(this.html.indexOf("<") == 0) {
				if(thx.html.HtmlParser.startTag.match(this.html)) {
					this.html = thx.html.HtmlParser.startTag.matchedRight();
					thx.html.HtmlParser.startTag.customReplace(thx.html.HtmlParser.startTag.matched(0),function(re) {
						$s.push("thx.html.HtmlParser::process@72");
						var $spos = $s.length;
						me.parseStartTag(re.matched(1),re.matched(2),re.matched(3) == "/");
						$s.pop();
						return "";
						$s.pop();
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
	$s.pop();
}
thx.html.HtmlParser.prototype.stacklast = function() {
	$s.push("thx.html.HtmlParser::stacklast");
	var $spos = $s.length;
	var $tmp = this.stack[this.stack.length - 1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.html.HtmlParser.prototype.parseStartTag = function(tagName,rest,unary) {
	$s.push("thx.html.HtmlParser::parseStartTag");
	var $spos = $s.length;
	if(thx.html.Element._block.exists(tagName)) while(this.stack[this.stack.length - 1] != null && thx.html.Element._inline.exists(this.stack[this.stack.length - 1])) this.parseEndTag(this.stack[this.stack.length - 1]);
	if(thx.html.Element._closeSelf.exists(tagName) && this.stack[this.stack.length - 1] == tagName) this.parseEndTag(tagName);
	unary = thx.html.Element._empty.exists(tagName) || unary;
	if(!unary) this.stack.push(tagName);
	var attrs = [];
	thx.html.HtmlParser.attr.customReplace(rest,function(re) {
		$s.push("thx.html.HtmlParser::parseStartTag@133");
		var $spos = $s.length;
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
		$s.pop();
		return "";
		$s.pop();
	});
	this.handler.start(tagName,attrs,unary);
	$s.pop();
}
thx.html.HtmlParser.prototype.parseEndTag = function(tagName) {
	$s.push("thx.html.HtmlParser::parseEndTag");
	var $spos = $s.length;
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
	$s.pop();
}
thx.html.HtmlParser.prototype.__class__ = thx.html.HtmlParser;
TestIterators = function(p) {
	$s.push("TestIterators::new");
	var $spos = $s.length;
	$s.pop();
}
TestIterators.__name__ = ["TestIterators"];
TestIterators.addTests = function(runner) {
	$s.push("TestIterators::addTests");
	var $spos = $s.length;
	runner.addCase(new TestIterators());
	$s.pop();
}
TestIterators.main = function() {
	$s.push("TestIterators::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestIterators.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestIterators.prototype.__class__ = TestIterators;
thx.validation.PatternValidator = function(pattern,failureMessage) {
	if( pattern === $_ ) return;
	$s.push("thx.validation.PatternValidator::new");
	var $spos = $s.length;
	if(failureMessage == null) failureMessage = "value doesn't match the required pattern";
	this.pattern = pattern;
	this.failureMessage = failureMessage;
	$s.pop();
}
thx.validation.PatternValidator.__name__ = ["thx","validation","PatternValidator"];
thx.validation.PatternValidator.__super__ = thx.validation.Validator;
for(var k in thx.validation.Validator.prototype ) thx.validation.PatternValidator.prototype[k] = thx.validation.Validator.prototype[k];
thx.validation.PatternValidator.prototype.pattern = null;
thx.validation.PatternValidator.prototype.failureMessage = null;
thx.validation.PatternValidator.prototype.validate = function(value) {
	$s.push("thx.validation.PatternValidator::validate");
	var $spos = $s.length;
	if(this.pattern.match(value)) {
		var $tmp = thx.util.Result.Ok;
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.util.Result.Failure([new thx.util.Message(this.failureMessage,[],null)]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.validation.PatternValidator.prototype.__class__ = thx.validation.PatternValidator;
thx.error.AbstractMethod = function(posInfo) {
	if( posInfo === $_ ) return;
	$s.push("thx.error.AbstractMethod::new");
	var $spos = $s.length;
	thx.error.Error.call(this,"method {0}.{1}() is abstract",[posInfo.className,posInfo.methodName],posInfo,{ fileName : "AbstractMethod.hx", lineNumber : 14, className : "thx.error.AbstractMethod", methodName : "new"});
	$s.pop();
}
thx.error.AbstractMethod.__name__ = ["thx","error","AbstractMethod"];
thx.error.AbstractMethod.__super__ = thx.error.Error;
for(var k in thx.error.Error.prototype ) thx.error.AbstractMethod.prototype[k] = thx.error.Error.prototype[k];
thx.error.AbstractMethod.prototype.__class__ = thx.error.AbstractMethod;
TestHashes = function(p) {
	$s.push("TestHashes::new");
	var $spos = $s.length;
	$s.pop();
}
TestHashes.__name__ = ["TestHashes"];
TestHashes.addTests = function(runner) {
	$s.push("TestHashes::addTests");
	var $spos = $s.length;
	runner.addCase(new TestHashes());
	$s.pop();
}
TestHashes.main = function() {
	$s.push("TestHashes::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestHashes.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestHashes.prototype.testCreate = function() {
	$s.push("TestHashes::testCreate");
	var $spos = $s.length;
	var hash = thx.util.DynamicsT.toHash({ name : "haxe", author : "nicolas"});
	utest.Assert.equals("haxe",hash.get("name"),null,{ fileName : "TestHashes.hx", lineNumber : 32, className : "TestHashes", methodName : "testCreate"});
	utest.Assert.equals("nicolas",hash.get("author"),null,{ fileName : "TestHashes.hx", lineNumber : 33, className : "TestHashes", methodName : "testCreate"});
	$s.pop();
}
TestHashes.prototype.__class__ = TestHashes;
DateTools = function() { }
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	$s.push("DateTools::__format_get");
	var $spos = $s.length;
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.__format = function(d,f) {
	$s.push("DateTools::__format");
	var $spos = $s.length;
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
	var $tmp = r.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.format = function(d,f) {
	$s.push("DateTools::format");
	var $spos = $s.length;
	var $tmp = DateTools.__format(d,f);
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.delta = function(d,t) {
	$s.push("DateTools::delta");
	var $spos = $s.length;
	var $tmp = Date.fromTime(d.getTime() + t);
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.getMonthDays = function(d) {
	$s.push("DateTools::getMonthDays");
	var $spos = $s.length;
	var month = d.getMonth();
	var year = d.getFullYear();
	if(month != 1) {
		var $tmp = DateTools.DAYS_OF_MONTH[month];
		$s.pop();
		return $tmp;
	}
	var isB = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	var $tmp = isB?29:28;
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.seconds = function(n) {
	$s.push("DateTools::seconds");
	var $spos = $s.length;
	var $tmp = n * 1000.0;
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.minutes = function(n) {
	$s.push("DateTools::minutes");
	var $spos = $s.length;
	var $tmp = n * 60.0 * 1000.0;
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.hours = function(n) {
	$s.push("DateTools::hours");
	var $spos = $s.length;
	var $tmp = n * 60.0 * 60.0 * 1000.0;
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.days = function(n) {
	$s.push("DateTools::days");
	var $spos = $s.length;
	var $tmp = n * 24.0 * 60.0 * 60.0 * 1000.0;
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.parse = function(t) {
	$s.push("DateTools::parse");
	var $spos = $s.length;
	var s = t / 1000;
	var m = s / 60;
	var h = m / 60;
	var $tmp = { ms : t % 1000, seconds : Std["int"](s % 60), minutes : Std["int"](m % 60), hours : Std["int"](h % 24), days : Std["int"](h / 24)};
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.make = function(o) {
	$s.push("DateTools::make");
	var $spos = $s.length;
	var $tmp = o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
	$s.pop();
	return $tmp;
	$s.pop();
}
DateTools.prototype.__class__ = DateTools;
TestObjects = function(p) {
	$s.push("TestObjects::new");
	var $spos = $s.length;
	$s.pop();
}
TestObjects.__name__ = ["TestObjects"];
TestObjects.addTests = function(runner) {
	$s.push("TestObjects::addTests");
	var $spos = $s.length;
	runner.addCase(new TestObjects());
	$s.pop();
}
TestObjects.main = function() {
	$s.push("TestObjects::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestObjects.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestObjects.prototype.testKeys = function() {
	$s.push("TestObjects::testKeys");
	var $spos = $s.length;
	utest.Assert.same(["a","b","c"],Arrays.order(Reflect.fields(TestObjects.testObject)),null,null,{ fileName : "TestObjects.hx", lineNumber : 12, className : "TestObjects", methodName : "testKeys"});
	$s.pop();
}
TestObjects.prototype.testValues = function() {
	$s.push("TestObjects::testValues");
	var $spos = $s.length;
	utest.Assert.same([1,2,3],Arrays.order(Objects.values(TestObjects.testObject)),null,null,{ fileName : "TestObjects.hx", lineNumber : 17, className : "TestObjects", methodName : "testValues"});
	$s.pop();
}
TestObjects.prototype.testEntries = function() {
	$s.push("TestObjects::testEntries");
	var $spos = $s.length;
	utest.Assert.same([{ key : "a", value : 1},{ key : "b", value : 2},{ key : "c", value : 3}],Arrays.order(Objects.entries(TestObjects.testObject),function(a,b) {
		$s.push("TestObjects::testEntries@22");
		var $spos = $s.length;
		var $tmp = Reflect.compare(a.key,b.key);
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestObjects.hx", lineNumber : 22, className : "TestObjects", methodName : "testEntries"});
	$s.pop();
}
TestObjects.prototype.__class__ = TestObjects;
thx.util.TypeServiceLocator = function(p) {
	if( p === $_ ) return;
	$s.push("thx.util.TypeServiceLocator::new");
	var $spos = $s.length;
	this._binders = new Hash();
	$s.pop();
}
thx.util.TypeServiceLocator.__name__ = ["thx","util","TypeServiceLocator"];
thx.util.TypeServiceLocator.prototype._binders = null;
thx.util.TypeServiceLocator.prototype.instance = function(cls,o) {
	$s.push("thx.util.TypeServiceLocator::instance");
	var $spos = $s.length;
	var $tmp = this.bind(cls,function() {
		$s.push("thx.util.TypeServiceLocator::instance@18");
		var $spos = $s.length;
		$s.pop();
		return o;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.TypeServiceLocator.prototype.bind = function(cls,f) {
	$s.push("thx.util.TypeServiceLocator::bind");
	var $spos = $s.length;
	this._binders.set(Type.getClassName(cls),f);
	$s.pop();
	return this;
	$s.pop();
}
thx.util.TypeServiceLocator.prototype.memoize = function(cls,f) {
	$s.push("thx.util.TypeServiceLocator::memoize");
	var $spos = $s.length;
	var r = null;
	var $tmp = this.bind(cls,function() {
		$s.push("thx.util.TypeServiceLocator::memoize@30");
		var $spos = $s.length;
		if(null == r) r = f();
		$s.pop();
		return r;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.TypeServiceLocator.prototype.unbinded = function(cls) {
	$s.push("thx.util.TypeServiceLocator::unbinded");
	var $spos = $s.length;
	$s.pop();
	return null;
	$s.pop();
}
thx.util.TypeServiceLocator.prototype.get = function(cls) {
	$s.push("thx.util.TypeServiceLocator::get");
	var $spos = $s.length;
	var f = this._binders.get(Type.getClassName(cls));
	if(null == f) {
		var $tmp = this.unbinded(cls);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = f();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.util.TypeServiceLocator.prototype.__class__ = thx.util.TypeServiceLocator;
thx.xml.NormalizeWhitespaceValueFormat = function(p) {
	if( p === $_ ) return;
	$s.push("thx.xml.NormalizeWhitespaceValueFormat::new");
	var $spos = $s.length;
	thx.xml.ValueFormat.call(this);
	this._wsReplace = new EReg("(\\s|\n|\r)+","g");
	$s.pop();
}
thx.xml.NormalizeWhitespaceValueFormat.__name__ = ["thx","xml","NormalizeWhitespaceValueFormat"];
thx.xml.NormalizeWhitespaceValueFormat.__super__ = thx.xml.ValueFormat;
for(var k in thx.xml.ValueFormat.prototype ) thx.xml.NormalizeWhitespaceValueFormat.prototype[k] = thx.xml.ValueFormat.prototype[k];
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsReplace = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsTestStart = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype._wsTestEnd = null;
thx.xml.NormalizeWhitespaceValueFormat.prototype.format = function(value) {
	$s.push("thx.xml.NormalizeWhitespaceValueFormat::format");
	var $spos = $s.length;
	var v = this._wsReplace.replace(value," ");
	if(v == " ") {
		$s.pop();
		return "";
	} else {
		$s.pop();
		return v;
	}
	$s.pop();
}
thx.xml.NormalizeWhitespaceValueFormat.prototype.__class__ = thx.xml.NormalizeWhitespaceValueFormat;
Xml = function(p) {
	$s.push("Xml::new");
	var $spos = $s.length;
	$s.pop();
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
	$s.push("Xml::parse");
	var $spos = $s.length;
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
						} else null;
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						} else null;
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
	$s.pop();
	return current;
	$s.pop();
}
Xml.createElement = function(name) {
	$s.push("Xml::createElement");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createPCData = function(data) {
	$s.push("Xml::createPCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createCData = function(data) {
	$s.push("Xml::createCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createComment = function(data) {
	$s.push("Xml::createComment");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createDocType = function(data) {
	$s.push("Xml::createDocType");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createProlog = function(data) {
	$s.push("Xml::createProlog");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createDocument = function() {
	$s.push("Xml::createDocument");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	$s.pop();
	return r;
	$s.pop();
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
	$s.push("Xml::getNodeName");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._nodeName;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.setNodeName = function(n) {
	$s.push("Xml::setNodeName");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._nodeName = n;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.getNodeValue = function() {
	$s.push("Xml::getNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	var $tmp = this._nodeValue;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.setNodeValue = function(v) {
	$s.push("Xml::setNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	var $tmp = this._nodeValue = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.getParent = function() {
	$s.push("Xml::getParent");
	var $spos = $s.length;
	var $tmp = this._parent;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.get = function(att) {
	$s.push("Xml::get");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.get(att);
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.set = function(att,value) {
	$s.push("Xml::set");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
	$s.pop();
}
Xml.prototype.remove = function(att) {
	$s.push("Xml::remove");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
	$s.pop();
}
Xml.prototype.exists = function(att) {
	$s.push("Xml::exists");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.exists(att);
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.attributes = function() {
	$s.push("Xml::attributes");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.keys();
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.iterator = function() {
	$s.push("Xml::iterator");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::iterator@281");
		var $spos = $s.length;
		var $tmp = this.cur < this.x.length;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::iterator@284");
		var $spos = $s.length;
		var $tmp = this.x[this.cur++];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.elements = function() {
	$s.push("Xml::elements");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::elements@295");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		var $tmp = k < l;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::elements@306");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				$s.pop();
				return n;
			}
		}
		$s.pop();
		return null;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.elementsNamed = function(name) {
	$s.push("Xml::elementsNamed");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::elementsNamed@327");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		var $tmp = k < l;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::elementsNamed@339");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				$s.pop();
				return n;
			}
		}
		$s.pop();
		return null;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.firstChild = function() {
	$s.push("Xml::firstChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = this._children[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.firstElement = function() {
	$s.push("Xml::firstElement");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) {
			$s.pop();
			return n;
		}
		cur++;
	}
	$s.pop();
	return null;
	$s.pop();
}
Xml.prototype.addChild = function(x) {
	$s.push("Xml::addChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
	$s.pop();
}
Xml.prototype.removeChild = function(x) {
	$s.push("Xml::removeChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	$s.pop();
	return b;
	$s.pop();
}
Xml.prototype.insertChild = function(x,pos) {
	$s.push("Xml::insertChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
	$s.pop();
}
Xml.prototype.toString = function() {
	$s.push("Xml::toString");
	var $spos = $s.length;
	if(this.nodeType == Xml.PCData) {
		var $tmp = this._nodeValue;
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.CData) {
		var $tmp = "<![CDATA[" + this._nodeValue + "]]>";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.Comment) {
		var $tmp = "<!--" + this._nodeValue + "-->";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.DocType) {
		var $tmp = "<!DOCTYPE " + this._nodeValue + ">";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.Prolog) {
		var $tmp = "<?" + this._nodeValue + "?>";
		$s.pop();
		return $tmp;
	}
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
			var $tmp = s.b.join("");
			$s.pop();
			return $tmp;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.__class__ = Xml;
utest.ui.common.FixtureResult = function(methodName) {
	if( methodName === $_ ) return;
	$s.push("utest.ui.common.FixtureResult::new");
	var $spos = $s.length;
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest.ui.common.ResultStats();
	$s.pop();
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
	$s.push("utest.ui.common.FixtureResult::iterator");
	var $spos = $s.length;
	var $tmp = this.list.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.common.FixtureResult.prototype.add = function(assertation) {
	$s.push("utest.ui.common.FixtureResult::add");
	var $spos = $s.length;
	this.list.add(assertation);
	switch( assertation[1] ) {
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
	$s.pop();
}
utest.ui.common.FixtureResult.prototype.__class__ = utest.ui.common.FixtureResult;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var stack = $s.copy();
		var f = js.Lib.onerror;
		$s.splice(0,$s.length);
		if( f == null ) {
			var i = stack.length;
			var s = "";
			while( --i >= 0 )
				s += "Called from "+stack[i]+"\n";
			alert(msg+"\n\n"+s);
			return false;
		}
		return f(msg,stack);
	}
}
{
	thx.color.NamedColors.aliceblue = thx.color.Rgb.fromInt(15792383);
	thx.color.NamedColors.antiquewhite = thx.color.Rgb.fromInt(16444375);
	thx.color.NamedColors.aqua = thx.color.Rgb.fromInt(65535);
	thx.color.NamedColors.aquamarine = thx.color.Rgb.fromInt(8388564);
	thx.color.NamedColors.azure = thx.color.Rgb.fromInt(15794175);
	thx.color.NamedColors.beige = thx.color.Rgb.fromInt(16119260);
	thx.color.NamedColors.bisque = thx.color.Rgb.fromInt(16770244);
	thx.color.NamedColors.black = thx.color.Rgb.fromInt(0);
	thx.color.NamedColors.blanchedalmond = thx.color.Rgb.fromInt(16772045);
	thx.color.NamedColors.blue = thx.color.Rgb.fromInt(255);
	thx.color.NamedColors.blueviolet = thx.color.Rgb.fromInt(9055202);
	thx.color.NamedColors.brown = thx.color.Rgb.fromInt(10824234);
	thx.color.NamedColors.burlywood = thx.color.Rgb.fromInt(14596231);
	thx.color.NamedColors.cadetblue = thx.color.Rgb.fromInt(6266528);
	thx.color.NamedColors.chartreuse = thx.color.Rgb.fromInt(8388352);
	thx.color.NamedColors.chocolate = thx.color.Rgb.fromInt(13789470);
	thx.color.NamedColors.coral = thx.color.Rgb.fromInt(16744272);
	thx.color.NamedColors.cornflowerblue = thx.color.Rgb.fromInt(6591981);
	thx.color.NamedColors.cornsilk = thx.color.Rgb.fromInt(16775388);
	thx.color.NamedColors.crimson = thx.color.Rgb.fromInt(14423100);
	thx.color.NamedColors.cyan = thx.color.Rgb.fromInt(65535);
	thx.color.NamedColors.darkblue = thx.color.Rgb.fromInt(139);
	thx.color.NamedColors.darkcyan = thx.color.Rgb.fromInt(35723);
	thx.color.NamedColors.darkgoldenrod = thx.color.Rgb.fromInt(12092939);
	thx.color.NamedColors.darkgray = thx.color.Rgb.fromInt(11119017);
	thx.color.NamedColors.darkgreen = thx.color.Rgb.fromInt(25600);
	thx.color.NamedColors.darkgrey = thx.color.Rgb.fromInt(11119017);
	thx.color.NamedColors.darkkhaki = thx.color.Rgb.fromInt(12433259);
	thx.color.NamedColors.darkmagenta = thx.color.Rgb.fromInt(9109643);
	thx.color.NamedColors.darkolivegreen = thx.color.Rgb.fromInt(5597999);
	thx.color.NamedColors.darkorange = thx.color.Rgb.fromInt(16747520);
	thx.color.NamedColors.darkorchid = thx.color.Rgb.fromInt(10040012);
	thx.color.NamedColors.darkred = thx.color.Rgb.fromInt(9109504);
	thx.color.NamedColors.darksalmon = thx.color.Rgb.fromInt(15308410);
	thx.color.NamedColors.darkseagreen = thx.color.Rgb.fromInt(9419919);
	thx.color.NamedColors.darkslateblue = thx.color.Rgb.fromInt(4734347);
	thx.color.NamedColors.darkslategray = thx.color.Rgb.fromInt(3100495);
	thx.color.NamedColors.darkslategrey = thx.color.Rgb.fromInt(3100495);
	thx.color.NamedColors.darkturquoise = thx.color.Rgb.fromInt(52945);
	thx.color.NamedColors.darkviolet = thx.color.Rgb.fromInt(9699539);
	thx.color.NamedColors.deeppink = thx.color.Rgb.fromInt(16716947);
	thx.color.NamedColors.deepskyblue = thx.color.Rgb.fromInt(49151);
	thx.color.NamedColors.dimgray = thx.color.Rgb.fromInt(6908265);
	thx.color.NamedColors.dimgrey = thx.color.Rgb.fromInt(6908265);
	thx.color.NamedColors.dodgerblue = thx.color.Rgb.fromInt(2003199);
	thx.color.NamedColors.firebrick = thx.color.Rgb.fromInt(11674146);
	thx.color.NamedColors.floralwhite = thx.color.Rgb.fromInt(16775920);
	thx.color.NamedColors.forestgreen = thx.color.Rgb.fromInt(2263842);
	thx.color.NamedColors.fuchsia = thx.color.Rgb.fromInt(16711935);
	thx.color.NamedColors.gainsboro = thx.color.Rgb.fromInt(14474460);
	thx.color.NamedColors.ghostwhite = thx.color.Rgb.fromInt(16316671);
	thx.color.NamedColors.gold = thx.color.Rgb.fromInt(16766720);
	thx.color.NamedColors.goldenrod = thx.color.Rgb.fromInt(14329120);
	thx.color.NamedColors.gray = thx.color.Rgb.fromInt(8421504);
	thx.color.NamedColors.green = thx.color.Rgb.fromInt(32768);
	thx.color.NamedColors.greenyellow = thx.color.Rgb.fromInt(11403055);
	thx.color.NamedColors.grey = thx.color.Rgb.fromInt(8421504);
	thx.color.NamedColors.honeydew = thx.color.Rgb.fromInt(15794160);
	thx.color.NamedColors.hotpink = thx.color.Rgb.fromInt(16738740);
	thx.color.NamedColors.indianred = thx.color.Rgb.fromInt(13458524);
	thx.color.NamedColors.indigo = thx.color.Rgb.fromInt(4915330);
	thx.color.NamedColors.ivory = thx.color.Rgb.fromInt(16777200);
	thx.color.NamedColors.khaki = thx.color.Rgb.fromInt(15787660);
	thx.color.NamedColors.lavender = thx.color.Rgb.fromInt(15132410);
	thx.color.NamedColors.lavenderblush = thx.color.Rgb.fromInt(16773365);
	thx.color.NamedColors.lawngreen = thx.color.Rgb.fromInt(8190976);
	thx.color.NamedColors.lemonchiffon = thx.color.Rgb.fromInt(16775885);
	thx.color.NamedColors.lightblue = thx.color.Rgb.fromInt(11393254);
	thx.color.NamedColors.lightcoral = thx.color.Rgb.fromInt(15761536);
	thx.color.NamedColors.lightcyan = thx.color.Rgb.fromInt(14745599);
	thx.color.NamedColors.lightgoldenrodyellow = thx.color.Rgb.fromInt(16448210);
	thx.color.NamedColors.lightgray = thx.color.Rgb.fromInt(13882323);
	thx.color.NamedColors.lightgreen = thx.color.Rgb.fromInt(9498256);
	thx.color.NamedColors.lightgrey = thx.color.Rgb.fromInt(13882323);
	thx.color.NamedColors.lightpink = thx.color.Rgb.fromInt(16758465);
	thx.color.NamedColors.lightsalmon = thx.color.Rgb.fromInt(16752762);
	thx.color.NamedColors.lightseagreen = thx.color.Rgb.fromInt(2142890);
	thx.color.NamedColors.lightskyblue = thx.color.Rgb.fromInt(8900346);
	thx.color.NamedColors.lightslategray = thx.color.Rgb.fromInt(7833753);
	thx.color.NamedColors.lightslategrey = thx.color.Rgb.fromInt(7833753);
	thx.color.NamedColors.lightsteelblue = thx.color.Rgb.fromInt(11584734);
	thx.color.NamedColors.lightyellow = thx.color.Rgb.fromInt(16777184);
	thx.color.NamedColors.lime = thx.color.Rgb.fromInt(65280);
	thx.color.NamedColors.limegreen = thx.color.Rgb.fromInt(3329330);
	thx.color.NamedColors.linen = thx.color.Rgb.fromInt(16445670);
	thx.color.NamedColors.magenta = thx.color.Rgb.fromInt(16711935);
	thx.color.NamedColors.maroon = thx.color.Rgb.fromInt(8388608);
	thx.color.NamedColors.mediumaquamarine = thx.color.Rgb.fromInt(6737322);
	thx.color.NamedColors.mediumblue = thx.color.Rgb.fromInt(205);
	thx.color.NamedColors.mediumorchid = thx.color.Rgb.fromInt(12211667);
	thx.color.NamedColors.mediumpurple = thx.color.Rgb.fromInt(9662683);
	thx.color.NamedColors.mediumseagreen = thx.color.Rgb.fromInt(3978097);
	thx.color.NamedColors.mediumslateblue = thx.color.Rgb.fromInt(8087790);
	thx.color.NamedColors.mediumspringgreen = thx.color.Rgb.fromInt(64154);
	thx.color.NamedColors.mediumturquoise = thx.color.Rgb.fromInt(4772300);
	thx.color.NamedColors.mediumvioletred = thx.color.Rgb.fromInt(13047173);
	thx.color.NamedColors.midnightblue = thx.color.Rgb.fromInt(1644912);
	thx.color.NamedColors.mintcream = thx.color.Rgb.fromInt(16121850);
	thx.color.NamedColors.mistyrose = thx.color.Rgb.fromInt(16770273);
	thx.color.NamedColors.moccasin = thx.color.Rgb.fromInt(16770229);
	thx.color.NamedColors.navajowhite = thx.color.Rgb.fromInt(16768685);
	thx.color.NamedColors.navy = thx.color.Rgb.fromInt(128);
	thx.color.NamedColors.oldlace = thx.color.Rgb.fromInt(16643558);
	thx.color.NamedColors.olive = thx.color.Rgb.fromInt(8421376);
	thx.color.NamedColors.olivedrab = thx.color.Rgb.fromInt(7048739);
	thx.color.NamedColors.orange = thx.color.Rgb.fromInt(16753920);
	thx.color.NamedColors.orangered = thx.color.Rgb.fromInt(16729344);
	thx.color.NamedColors.orchid = thx.color.Rgb.fromInt(14315734);
	thx.color.NamedColors.palegoldenrod = thx.color.Rgb.fromInt(15657130);
	thx.color.NamedColors.palegreen = thx.color.Rgb.fromInt(10025880);
	thx.color.NamedColors.paleturquoise = thx.color.Rgb.fromInt(11529966);
	thx.color.NamedColors.palevioletred = thx.color.Rgb.fromInt(14381203);
	thx.color.NamedColors.papayawhip = thx.color.Rgb.fromInt(16773077);
	thx.color.NamedColors.peachpuff = thx.color.Rgb.fromInt(16767673);
	thx.color.NamedColors.peru = thx.color.Rgb.fromInt(13468991);
	thx.color.NamedColors.pink = thx.color.Rgb.fromInt(16761035);
	thx.color.NamedColors.plum = thx.color.Rgb.fromInt(14524637);
	thx.color.NamedColors.powderblue = thx.color.Rgb.fromInt(11591910);
	thx.color.NamedColors.purple = thx.color.Rgb.fromInt(8388736);
	thx.color.NamedColors.red = thx.color.Rgb.fromInt(16711680);
	thx.color.NamedColors.rosybrown = thx.color.Rgb.fromInt(12357519);
	thx.color.NamedColors.royalblue = thx.color.Rgb.fromInt(4286945);
	thx.color.NamedColors.saddlebrown = thx.color.Rgb.fromInt(9127187);
	thx.color.NamedColors.salmon = thx.color.Rgb.fromInt(16416882);
	thx.color.NamedColors.sandybrown = thx.color.Rgb.fromInt(16032864);
	thx.color.NamedColors.seagreen = thx.color.Rgb.fromInt(3050327);
	thx.color.NamedColors.seashell = thx.color.Rgb.fromInt(16774638);
	thx.color.NamedColors.sienna = thx.color.Rgb.fromInt(10506797);
	thx.color.NamedColors.silver = thx.color.Rgb.fromInt(12632256);
	thx.color.NamedColors.skyblue = thx.color.Rgb.fromInt(8900331);
	thx.color.NamedColors.slateblue = thx.color.Rgb.fromInt(6970061);
	thx.color.NamedColors.slategray = thx.color.Rgb.fromInt(7372944);
	thx.color.NamedColors.slategrey = thx.color.Rgb.fromInt(7372944);
	thx.color.NamedColors.snow = thx.color.Rgb.fromInt(16775930);
	thx.color.NamedColors.springgreen = thx.color.Rgb.fromInt(65407);
	thx.color.NamedColors.steelblue = thx.color.Rgb.fromInt(4620980);
	thx.color.NamedColors.tan = thx.color.Rgb.fromInt(13808780);
	thx.color.NamedColors.teal = thx.color.Rgb.fromInt(32896);
	thx.color.NamedColors.thistle = thx.color.Rgb.fromInt(14204888);
	thx.color.NamedColors.tomato = thx.color.Rgb.fromInt(16737095);
	thx.color.NamedColors.turquoise = thx.color.Rgb.fromInt(4251856);
	thx.color.NamedColors.violet = thx.color.Rgb.fromInt(15631086);
	thx.color.NamedColors.wheat = thx.color.Rgb.fromInt(16113331);
	thx.color.NamedColors.white = thx.color.Rgb.fromInt(16777215);
	thx.color.NamedColors.whitesmoke = thx.color.Rgb.fromInt(16119285);
	thx.color.NamedColors.yellow = thx.color.Rgb.fromInt(16776960);
	thx.color.NamedColors.yellowgreen = thx.color.Rgb.fromInt(10145074);
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
{
	var d = Date;
	d.now = function() {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		var $tmp = new Date();
		$s.pop();
		return $tmp;
		$s.pop();
	};
	d.fromTime = function(t) {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		var d1 = new Date();
		d1["setTime"](t);
		$s.pop();
		return d1;
		$s.pop();
	};
	d.fromString = function(s) {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			$s.pop();
			return d1;
		case 10:
			var k = s.split("-");
			var $tmp = new Date(k[0],k[1] - 1,k[2],0,0,0);
			$s.pop();
			return $tmp;
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			var $tmp = new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
			$s.pop();
			return $tmp;
		default:
			throw "Invalid date format : " + s;
		}
		$s.pop();
	};
	d.prototype["toString"] = function() {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		var $tmp = date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		var $tmp = isFinite(i);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	Math.isNaN = function(i) {
		$s.push("utest.ui.common.FixtureResult::add");
		var $spos = $s.length;
		var $tmp = isNaN(i);
		$s.pop();
		return $tmp;
		$s.pop();
	};
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
Strings.__ucwordsPattern = new EReg("[^a-zA-Z]([a-z])","");
Strings.__ucwordswsPattern = new EReg("\\s([a-z])","");
Strings.__alphaNumPattern = new EReg("^[a-z0-9]+$","i");
Strings.__digitsPattern = new EReg("^[0-9]+$","");
thx.html.Attribute._fill = thx.collections.Set.ofArray("checked,compact,declare,defer,disabled,formnovalidate,novalidate,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,required,selected".split(","));
thx.text.Inflections.uncountable_words = ["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"];
thx.text.Inflections.plural_rules = [{ pattern : new EReg("(m)an$","gi"), replace : "$1en"},{ pattern : new EReg("(pe)rson$","gi"), replace : "$1ople"},{ pattern : new EReg("(child)$","gi"), replace : "$1ren"},{ pattern : new EReg("(ax|test)is$","gi"), replace : "$1es"},{ pattern : new EReg("(octop|vir)us$","gi"), replace : "$1i"},{ pattern : new EReg("(alias|status)$","gi"), replace : "$1es"},{ pattern : new EReg("(bu)s$","gi"), replace : "$1ses"},{ pattern : new EReg("(buffal|tomat)o$","gi"), replace : "$1oes"},{ pattern : new EReg("([ti])um$","gi"), replace : "$1a"},{ pattern : new EReg("sis$","gi"), replace : "ses"},{ pattern : new EReg("(?:([^f])fe|([lr])f)$","gi"), replace : "$1$2ves"},{ pattern : new EReg("(hive)$","gi"), replace : "$1s"},{ pattern : new EReg("([^aeiouy]|qu)y$","gi"), replace : "$1ies"},{ pattern : new EReg("(x|ch|ss|sh)$","gi"), replace : "$1es"},{ pattern : new EReg("(matr|vert|ind)ix|ex$","gi"), replace : "$1ices"},{ pattern : new EReg("([m|l])ouse$","gi"), replace : "$1ice"},{ pattern : new EReg("^(ox)$","gi"), replace : "$1en"},{ pattern : new EReg("(quiz)$","gi"), replace : "$1zes"},{ pattern : new EReg("s$","gi"), replace : "s"},{ pattern : new EReg("$","gi"), replace : "s"}];
thx.text.Inflections.singular_rules = [{ pattern : new EReg("(m)en$","gi"), replace : "$1an"},{ pattern : new EReg("(pe)ople$","gi"), replace : "$1rson"},{ pattern : new EReg("(child)ren$","gi"), replace : "$1"},{ pattern : new EReg("([ti])a$","gi"), replace : "$1um"},{ pattern : new EReg("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"), replace : "$1$2sis"},{ pattern : new EReg("(hive)s$","gi"), replace : "$1"},{ pattern : new EReg("(tive)s$","gi"), replace : "$1"},{ pattern : new EReg("([lr])ves$","gi"), replace : "$1f"},{ pattern : new EReg("([^fo])ves$","gi"), replace : "$1fe"},{ pattern : new EReg("([^aeiouy]|qu)ies$","gi"), replace : "$1y"},{ pattern : new EReg("(s)eries$","gi"), replace : "$1eries"},{ pattern : new EReg("(m)ovies$","gi"), replace : "$1ovie"},{ pattern : new EReg("(x|ch|ss|sh)es$","gi"), replace : "$1"},{ pattern : new EReg("([m|l])ice$","gi"), replace : "$1ouse"},{ pattern : new EReg("(bus)es$","gi"), replace : "$1"},{ pattern : new EReg("(o)es$","gi"), replace : "$1"},{ pattern : new EReg("(shoe)s$","gi"), replace : "$1"},{ pattern : new EReg("(cris|ax|test)es$","gi"), replace : "$1is"},{ pattern : new EReg("(octop|vir)i$","gi"), replace : "$1us"},{ pattern : new EReg("(alias|status)es$","gi"), replace : "$1"},{ pattern : new EReg("^(ox)en","gi"), replace : "$1"},{ pattern : new EReg("(vert|ind)ices$","gi"), replace : "$1ex"},{ pattern : new EReg("(matr)ices$","gi"), replace : "$1ix"},{ pattern : new EReg("(quiz)zes$","gi"), replace : "$1"},{ pattern : new EReg("s$","gi"), replace : ""}];
js.Lib.onerror = null;
thx.js.Dom.doc = (function() {
	$s.push("utest.ui.common.FixtureResult::add");
	var $spos = $s.length;
	var gs = new thx.js.Selection([new thx.js.Group(new thx.js.Node(js.Lib.document))]);
	gs.parentNode = new thx.js.Node(js.Lib.document.documentElement);
	$s.pop();
	return gs;
	$s.pop();
})();
thx.js.Dom.selectionEngine = new thx.js.SizzleEngine();
thx.validation.EmailValidator._reEmail = new EReg("^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$","i");
thx.validation.EmailValidator._reEmailDomain = new EReg("\\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$","i");
thx.xml.Namespace.prefix = (function() {
	$s.push("utest.ui.common.FixtureResult::add");
	var $spos = $s.length;
	var h = new Hash();
	h.set("svg","http://www.w3.org/2000/svg");
	h.set("xhtml","http://www.w3.org/1999/xhtml");
	h.set("xlink","http://www.w3.org/1999/xlink");
	h.set("xml","http://www.w3.org/XML/1998/namespace");
	h.set("xmlns","http://www.w3.org/2000/xmlns/");
	$s.pop();
	return h;
	$s.pop();
})();
utest.ui.text.HtmlReport.platform = "javascript";
thx.validation.SingleLineValidator._re = new EReg("(\n|\r)","m");
thx.html.Element._preserve = thx.collections.Set.ofArray("pre,textarea".split(","));
thx.html.Element._empty = thx.collections.Set.ofArray("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(","));
thx.html.Element._block = thx.collections.Set.ofArray("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,textarea,tfoot,th,thead,title,tr,ul".split(","));
thx.html.Element._inline = thx.collections.Set.ofArray("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,tt,u,var".split(","));
thx.html.Element._break = thx.collections.Set.ofArray("br,hr".split(","));
thx.html.Element._closeSelf = thx.collections.Set.ofArray("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr".split(","));
thx.html.Element._special = thx.collections.Set.ofArray("script,style".split(","));
thx.config.TestConfigs.tests = [{ v : 1, ce : thx.config.ConfigExpr.CEInt(1)},{ v : "hello", ce : thx.config.ConfigExpr.CEString("hello")},{ v : null, ce : thx.config.ConfigExpr.CENull},{ v : true, ce : thx.config.ConfigExpr.CEBool(true)},{ v : false, ce : thx.config.ConfigExpr.CEBool(false)},{ v : 0.1, ce : thx.config.ConfigExpr.CEFloat(0.1)},{ v : Date.fromString("2001-01-01"), ce : thx.config.ConfigExpr.CEDate("2001-01-01T00:00:00")},{ v : Date.fromTime(123456000.0), ce : thx.config.ConfigExpr.CEDate("1970-01-02T10:17:36")},{ v : [1,"a"], ce : thx.config.ConfigExpr.CEArray([thx.config.ConfigExpr.CEInt(1),thx.config.ConfigExpr.CEString("a")])},{ v : { a : "b", c : "d"}, ce : thx.config.ConfigExpr.CEObject([{ k : "a", v : thx.config.ConfigExpr.CEString("b")},{ k : "c", v : thx.config.ConfigExpr.CEString("d")}])}];
utest.TestHandler.POLLING_TIME = 10;
haxe.Timer.arr = new Array();
thx.validation.UrlValidator._reUrl = new EReg("^(http|ftp|https)://[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?$","");
thx.text.json.TestJson.tests = [{ c : thx.config.ConfigExpr.CENull, s : "null"},{ c : thx.config.ConfigExpr.CEString("a\nb"), s : "\"a\\nb\""},{ c : thx.config.ConfigExpr.CEInt(1), s : "1"},{ c : thx.config.ConfigExpr.CEFloat(-0.1), s : "-0.1"},{ c : thx.config.ConfigExpr.CEFloat(-1.234e-100), s : "-1.234e-100"},{ c : thx.config.ConfigExpr.CEBool(true), s : "true"},{ c : thx.config.ConfigExpr.CEBool(false), s : "false"},{ c : thx.config.ConfigExpr.CEArray([]), s : "[]"},{ c : thx.config.ConfigExpr.CEArray([thx.config.ConfigExpr.CENull,thx.config.ConfigExpr.CEBool(true)]), s : "[null, true]"},{ c : thx.config.ConfigExpr.CEObject([{ k : "name", v : thx.config.ConfigExpr.CEString("haxe")},{ k : "stars", v : thx.config.ConfigExpr.CEInt(5)}]), s : "{\"name\":\"haxe\",\"stars\":5}"}];
thx.html.HtmlParser.startTag = new EReg("^<(\\w+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(/?)>","");
thx.html.HtmlParser.endTag = new EReg("^</(\\w+)[^>]*>","");
thx.html.HtmlParser.attr = new EReg("(\\w+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?","g");
thx.html.HtmlParser.comment = new EReg("<!--(.*?)-->","g");
thx.html.HtmlParser.cdata = new EReg("<!\\[CDATA\\[(.*?)]]>","g");
thx.html.HtmlParser.doctype = new EReg("<!DOCTYPE(.*?)>","gi");
thx.html.HtmlParser.declaration = new EReg("<?xml(.*?)>","g");
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