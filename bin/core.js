$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof thx=='undefined') thx = {}
if(!thx.util) thx.util = {}
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
	var $tmp = Strings.format(this.message,this.params);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.Message.prototype.translate = function(translator) {
	$s.push("thx.util.Message::translate");
	var $spos = $s.length;
	var $tmp = Strings.format(translator(this.message),this.params);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.util.Message.prototype.__class__ = thx.util.Message;
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
		var $tmp = Strings.format(this.message,this.params);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		var ps = this.pos.className + "." + this.pos.methodName + "(" + this.pos.lineNumber + ")";
		var pa;
		if(0 == this.params.length) pa = "no parameters passed"; else pa = "wrong parameters passed ({0})";
		haxe.Log.trace("wrong parameters (" + this.params.join(", ") + ") passed for pattern '" + this.message + "' at " + ps + ": " + e,{ fileName : "Error.hx", lineNumber : 39, className : "thx.error.Error", methodName : "toString"});
		$s.pop();
		return "";
	}
	$s.pop();
}
thx.error.Error.prototype.__class__ = thx.error.Error;
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
if(!thx.js) thx.js = {}
thx.js.Access = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.Access::new");
	var $spos = $s.length;
	this.selection = selection;
	$s.pop();
}
thx.js.Access.__name__ = ["thx","js","Access"];
thx.js.Access.getData = function(d) {
	$s.push("thx.js.Access::getData");
	var $spos = $s.length;
	var $tmp = Reflect.field(d,"__data__");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.setData = function(d,v) {
	$s.push("thx.js.Access::setData");
	var $spos = $s.length;
	d["__data__"] = v;
	$s.pop();
}
thx.js.Access.emptyHtmlDom = function(v) {
	$s.push("thx.js.Access::emptyHtmlDom");
	var $spos = $s.length;
	var $tmp = { __data__ : v};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.eventName = function(event) {
	$s.push("thx.js.Access::eventName");
	var $spos = $s.length;
	var $tmp = "__on" + event;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.getEvent = function(d,event) {
	$s.push("thx.js.Access::getEvent");
	var $spos = $s.length;
	var $tmp = Reflect.field(d,"__on" + event);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.hasEvent = function(d,event) {
	$s.push("thx.js.Access::hasEvent");
	var $spos = $s.length;
	var $tmp = null != Reflect.field(d,"__on" + event);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.addEvent = function(d,event,listener) {
	$s.push("thx.js.Access::addEvent");
	var $spos = $s.length;
	d["__on" + event] = listener;
	$s.pop();
}
thx.js.Access.removeEvent = function(d,event) {
	$s.push("thx.js.Access::removeEvent");
	var $spos = $s.length;
	Reflect.deleteField(d,"__on" + event);
	$s.pop();
}
thx.js.Access.setTransition = function(d,id) {
	$s.push("thx.js.Access::setTransition");
	var $spos = $s.length;
	if(Reflect.hasField(d,"__transition__")) Reflect.field(d,"__transition__").owner = id; else d["__transition__"] = { owner : id};
	$s.pop();
}
thx.js.Access.getTransition = function(d) {
	$s.push("thx.js.Access::getTransition");
	var $spos = $s.length;
	var $tmp = Reflect.field(d,"__transition__");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.resetTransition = function(d) {
	$s.push("thx.js.Access::resetTransition");
	var $spos = $s.length;
	Reflect.deleteField(d,"__transition__");
	$s.pop();
}
thx.js.Access.prototype.selection = null;
thx.js.Access.prototype._that = function() {
	$s.push("thx.js.Access::_that");
	var $spos = $s.length;
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Access.prototype.__class__ = thx.js.Access;
thx.js.AccessClassed = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessClassed::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	$s.pop();
}
thx.js.AccessClassed.__name__ = ["thx","js","AccessClassed"];
thx.js.AccessClassed.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessClassed.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessClassed.prototype.remove = function(v) {
	$s.push("thx.js.AccessClassed::remove");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessClassed::remove@20");
		var $spos = $s.length;
		node.className = node.className.split(v).map(function(d,i1) {
			$s.push("thx.js.AccessClassed::remove@20@21");
			var $spos = $s.length;
			var $tmp = StringTools.trim(d);
			$s.pop();
			return $tmp;
			$s.pop();
		}).join(" ");
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessClassed.prototype.add = function(v) {
	$s.push("thx.js.AccessClassed::add");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessClassed::add@28");
		var $spos = $s.length;
		var cls = node.className;
		if(cls.indexOf(v) >= 0) {
			$s.pop();
			return;
		}
		node.className += (node.className.length > 0?" ":"") + v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessClassed.prototype.__class__ = thx.js.AccessClassed;
thx.js.AccessDataClassed = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessDataClassed::new");
	var $spos = $s.length;
	thx.js.AccessClassed.call(this,selection);
	$s.pop();
}
thx.js.AccessDataClassed.__name__ = ["thx","js","AccessDataClassed"];
thx.js.AccessDataClassed.__super__ = thx.js.AccessClassed;
for(var k in thx.js.AccessClassed.prototype ) thx.js.AccessDataClassed.prototype[k] = thx.js.AccessClassed.prototype[k];
thx.js.AccessDataClassed.prototype.__class__ = thx.js.AccessDataClassed;
if(typeof utest=='undefined') utest = {}
if(!utest.ui) utest.ui = {}
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
if(!thx.xml) thx.xml = {}
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
if(!thx.svg) thx.svg = {}
thx.svg.TestAll = function(p) {
	$s.push("thx.svg.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.svg.TestAll.__name__ = ["thx","svg","TestAll"];
thx.svg.TestAll.addTests = function(runner) {
	$s.push("thx.svg.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.svg.TestArc());
	runner.addCase(new thx.svg.TestArea());
	runner.addCase(new thx.svg.TestChord());
	runner.addCase(new thx.svg.TestLine());
	$s.pop();
}
thx.svg.TestAll.main = function() {
	$s.push("thx.svg.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.svg.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.svg.TestAll.prototype.assertSamePath = function(expected,value,pos) {
	$s.push("thx.svg.TestAll::assertSamePath");
	var $spos = $s.length;
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
	$s.pop();
}
thx.svg.TestAll.prototype.splitValues = function(s) {
	$s.push("thx.svg.TestAll::splitValues");
	var $spos = $s.length;
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
	$s.pop();
	return result;
	$s.pop();
}
thx.svg.TestAll.prototype.__class__ = thx.svg.TestAll;
Hash = function(p) {
	if( p === $_ ) return;
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
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
	var $tmp = new thx.color.Rgb(Ints.interpolate(r,0,255),Ints.interpolate(g,0,255),Ints.interpolate(b,0,255));
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
	var $tmp = new thx.color.Rgb(Ints.interpolate(t * color.red,0,255,interpolator),Ints.interpolate(t * color.green,0,255,interpolator),Ints.interpolate(t * color.blue,0,255,interpolator));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.interpolate = function(a,b,t,interpolator) {
	$s.push("thx.color.Rgb::interpolate");
	var $spos = $s.length;
	var $tmp = new thx.color.Rgb(Ints.interpolate(t,a.red,b.red,interpolator),Ints.interpolate(t,a.green,b.green,interpolator),Ints.interpolate(t,a.blue,b.blue,interpolator));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.interpolatef = function(a,b,interpolator) {
	$s.push("thx.color.Rgb::interpolatef");
	var $spos = $s.length;
	var r = Ints.interpolatef(a.red,b.red), g = Ints.interpolatef(a.green,b.green), b1 = Ints.interpolatef(a.blue,b.blue);
	var $tmp = function(t) {
		$s.push("thx.color.Rgb::interpolatef@96");
		var $spos = $s.length;
		var $tmp = new thx.color.Rgb(r(t),g(t),b1(t));
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Rgb.contrast = function(c) {
	$s.push("thx.color.Rgb::contrast");
	var $spos = $s.length;
	var nc = thx.color.Hsl.toHsl(c);
	if(nc.lightness < .5) {
		var $tmp = new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness + 0.5);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = new thx.color.Hsl(nc.hue,nc.saturation,nc.lightness - 0.5);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.color.Rgb.contrastBW = function(c) {
	$s.push("thx.color.Rgb::contrastBW");
	var $spos = $s.length;
	var nc = thx.color.Hsl.toHsl(c);
	if(nc.lightness < .5) {
		var $tmp = new thx.color.Hsl(nc.hue,nc.saturation,1.0);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = new thx.color.Hsl(nc.hue,nc.saturation,0);
		$s.pop();
		return $tmp;
	}
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
thx.color.Rgb.prototype.toCss = function() {
	$s.push("thx.color.Rgb::toCss");
	var $spos = $s.length;
	var $tmp = this.hex("#");
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
IntHash = function(p) {
	if( p === $_ ) return;
	$s.push("IntHash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
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
if(!thx.html) thx.html = {}
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
if(!thx.csv) thx.csv = {}
thx.csv.TestCsv = function(p) {
	$s.push("thx.csv.TestCsv::new");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.TestCsv.__name__ = ["thx","csv","TestCsv"];
thx.csv.TestCsv.prototype.testDecode = function() {
	$s.push("thx.csv.TestCsv::testDecode");
	var $spos = $s.length;
	this.assertSame([[1997,"Ford","E350"]],thx.csv.Csv.decode("1997,Ford,E350"),{ fileName : "TestCsv.hx", lineNumber : 29, className : "thx.csv.TestCsv", methodName : "testDecode"});
	this.assertSame([[1997," Ford "," E350"]],thx.csv.Csv.decode("1997, Ford , E350"),{ fileName : "TestCsv.hx", lineNumber : 30, className : "thx.csv.TestCsv", methodName : "testDecode"});
	this.assertSame([[1997,"Ford","E350","Super, \"luxurious\" truck"]],thx.csv.Csv.decode("1997,Ford,E350,\"Super, \"\"luxurious\"\" truck\""),{ fileName : "TestCsv.hx", lineNumber : 31, className : "thx.csv.TestCsv", methodName : "testDecode"});
	this.assertSame([[1997,"Ford","E350","Go get one now\nthey are going fast"]],thx.csv.Csv.decode("1997,Ford,E350,\"Go get one now\nthey are going fast\""),{ fileName : "TestCsv.hx", lineNumber : 32, className : "thx.csv.TestCsv", methodName : "testDecode"});
	this.assertSame(thx.csv.TestCsv.v,thx.csv.Csv.decode(thx.csv.TestCsv.s),{ fileName : "TestCsv.hx", lineNumber : 34, className : "thx.csv.TestCsv", methodName : "testDecode"});
	$s.pop();
}
thx.csv.TestCsv.prototype.testEncode = function() {
	$s.push("thx.csv.TestCsv::testEncode");
	var $spos = $s.length;
	this.assertSame(thx.csv.TestCsv.s,thx.csv.Csv.encode(thx.csv.TestCsv.v),{ fileName : "TestCsv.hx", lineNumber : 39, className : "thx.csv.TestCsv", methodName : "testEncode"});
	$s.pop();
}
thx.csv.TestCsv.prototype.assertSame = function(expected,test,pos) {
	$s.push("thx.csv.TestCsv::assertSame");
	var $spos = $s.length;
	utest.Assert.same(expected,test,null,"expected " + Dynamics.toString(expected) + " but was " + Dynamics.toString(test),pos);
	$s.pop();
}
thx.csv.TestCsv.prototype.__class__ = thx.csv.TestCsv;
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
	$s.pop();
}
thx.validation.TestAll.prototype.__class__ = thx.validation.TestAll;
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
if(!thx.math) thx.math = {}
if(!thx.math.scale) thx.math.scale = {}
thx.math.scale.NumericScale = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.NumericScale::new");
	var $spos = $s.length;
	this.x0 = 0;
	this.x1 = 1;
	this.y0 = 0;
	this.y1 = 1;
	this.kx = 1;
	this.ky = 1;
	this.f = Floats.interpolatef;
	this.i = this.f(this.y0,this.y1,null);
	this._clamp = false;
	this._clampmin = 0.0;
	this._clampmax = 1.0;
	$s.pop();
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
	$s.push("thx.math.scale.NumericScale::scale");
	var $spos = $s.length;
	x = (x - this.x0) * this.kx;
	var $tmp = this.i(this._clamp?Floats.clamp(x,this._clampmin,this._clampmax):x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.invert = function(y,_) {
	$s.push("thx.math.scale.NumericScale::invert");
	var $spos = $s.length;
	var $tmp = (y - this.y0) * this.ky + this.x0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getDomain = function() {
	$s.push("thx.math.scale.NumericScale::getDomain");
	var $spos = $s.length;
	var $tmp = [this.x0,this.x1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.domain = function(x0,x1) {
	$s.push("thx.math.scale.NumericScale::domain");
	var $spos = $s.length;
	this.x0 = x0;
	this.x1 = x1;
	this.kx = 1 / (x1 - x0);
	this.ky = (x1 - x0) / (this.y1 - this.y0);
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getRange = function() {
	$s.push("thx.math.scale.NumericScale::getRange");
	var $spos = $s.length;
	var $tmp = [this.y0,this.y1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.range = function(y0,y1) {
	$s.push("thx.math.scale.NumericScale::range");
	var $spos = $s.length;
	this.y0 = y0;
	this.y1 = y1;
	this.ky = (this.x1 - this.x0) / (y1 - y0);
	this.i = this.f(y0,y1,null);
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.rangeRound = function(x0,x1) {
	$s.push("thx.math.scale.NumericScale::rangeRound");
	var $spos = $s.length;
	this.x0 = x0;
	this.x1 = x1;
	this.range(x0,x1);
	this.interpolatef(Ints.interpolatef);
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getInterpolate = function() {
	$s.push("thx.math.scale.NumericScale::getInterpolate");
	var $spos = $s.length;
	var $tmp = this.f;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.interpolatef = function(x) {
	$s.push("thx.math.scale.NumericScale::interpolatef");
	var $spos = $s.length;
	this.i = (this.f = x)(this.y0,this.y1,null);
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getClamp = function() {
	$s.push("thx.math.scale.NumericScale::getClamp");
	var $spos = $s.length;
	var $tmp = this._clamp;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.clamp = function(v) {
	$s.push("thx.math.scale.NumericScale::clamp");
	var $spos = $s.length;
	this._clamp = v;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getClampMin = function() {
	$s.push("thx.math.scale.NumericScale::getClampMin");
	var $spos = $s.length;
	var $tmp = this._clampmin;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.clampMin = function(v) {
	$s.push("thx.math.scale.NumericScale::clampMin");
	var $spos = $s.length;
	this._clampmin = v;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.getClampMax = function() {
	$s.push("thx.math.scale.NumericScale::getClampMax");
	var $spos = $s.length;
	var $tmp = this._clampmax;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.clampMax = function(v) {
	$s.push("thx.math.scale.NumericScale::clampMax");
	var $spos = $s.length;
	this._clampmax = v;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.ticks = function() {
	$s.push("thx.math.scale.NumericScale::ticks");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 98, className : "thx.math.scale.NumericScale", methodName : "ticks"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.tickFormat = function(v,i) {
	$s.push("thx.math.scale.NumericScale::tickFormat");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "NumericScale.hx", lineNumber : 103, className : "thx.math.scale.NumericScale", methodName : "tickFormat"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.transform = function(scale,t,a,b) {
	$s.push("thx.math.scale.NumericScale::transform");
	var $spos = $s.length;
	var range = this.getRange().map(function(v,_) {
		$s.push("thx.math.scale.NumericScale::transform@108");
		var $spos = $s.length;
		var $tmp = (v - t) / scale;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	this.domain(a,b);
	var r = range.map($closure(this,"invert"));
	this.domain(r[0],r[1]);
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype._this = function() {
	$s.push("thx.math.scale.NumericScale::_this");
	var $spos = $s.length;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.NumericScale.prototype.__class__ = thx.math.scale.NumericScale;
thx.math.scale.Log = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Log::new");
	var $spos = $s.length;
	thx.math.scale.NumericScale.call(this);
	this.log = thx.math.scale.Log._log;
	this.pow = thx.math.scale.Log._pow;
	$s.pop();
}
thx.math.scale.Log.__name__ = ["thx","math","scale","Log"];
thx.math.scale.Log.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Log.prototype[k] = thx.math.scale.NumericScale.prototype[k];
thx.math.scale.Log._log = function(x) {
	$s.push("thx.math.scale.Log::_log");
	var $spos = $s.length;
	var $tmp = Math.log(x) / 2.302585092994046;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log._logn = function(x) {
	$s.push("thx.math.scale.Log::_logn");
	var $spos = $s.length;
	var $tmp = -Math.log(-x) / 2.302585092994046;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log._pow = function(x) {
	$s.push("thx.math.scale.Log::_pow");
	var $spos = $s.length;
	var $tmp = Math.pow(10,x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log._pown = function(x) {
	$s.push("thx.math.scale.Log::_pown");
	var $spos = $s.length;
	var $tmp = -Math.pow(10,-x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.log = null;
thx.math.scale.Log.prototype.pow = null;
thx.math.scale.Log.prototype.scale = function(x,i) {
	$s.push("thx.math.scale.Log::scale");
	var $spos = $s.length;
	var $tmp = thx.math.scale.NumericScale.prototype.scale.call(this,this.log(x));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.invert = function(x,i) {
	$s.push("thx.math.scale.Log::invert");
	var $spos = $s.length;
	var $tmp = this.pow(thx.math.scale.NumericScale.prototype.invert.call(this,x));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.getDomain = function() {
	$s.push("thx.math.scale.Log::getDomain");
	var $spos = $s.length;
	var me = this;
	var $tmp = thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
		$s.push("thx.math.scale.Log::getDomain@57");
		var $spos = $s.length;
		var $tmp = me.pow(d);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.domain = function(x0,x1) {
	$s.push("thx.math.scale.Log::domain");
	var $spos = $s.length;
	if((x0 < x1?x0:x1) < 0) {
		this.log = thx.math.scale.Log._logn;
		this.pow = thx.math.scale.Log._pown;
	} else {
		this.log = thx.math.scale.Log._log;
		this.pow = thx.math.scale.Log._pow;
	}
	var $tmp = thx.math.scale.NumericScale.prototype.domain.call(this,this.log(x0),this.log(x1));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.ticks = function() {
	$s.push("thx.math.scale.Log::ticks");
	var $spos = $s.length;
	var d = thx.math.scale.NumericScale.prototype.getDomain.call(this), ticks = [];
	if(d.every(function(d1,_) {
		$s.push("thx.math.scale.Log::ticks@76");
		var $spos = $s.length;
		var $tmp = Math.isFinite(d1);
		$s.pop();
		return $tmp;
		$s.pop();
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
	$s.pop();
	return ticks;
	$s.pop();
}
thx.math.scale.Log.prototype.tickFormatf = function() {
	$s.push("thx.math.scale.Log::tickFormatf");
	var $spos = $s.length;
	var $tmp = function(d) {
		$s.push("thx.math.scale.Log::tickFormatf@112");
		var $spos = $s.length;
		var $tmp = thx.culture.FormatNumber.decimal(d,1);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Log.prototype.__class__ = thx.math.scale.Log;
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
	$s.push("thx.culture.Info::toString");
	var $spos = $s.length;
	var $tmp = this["native"] + " (" + this.english + ")";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Info.prototype.__class__ = thx.culture.Info;
thx.culture.Culture = function() { }
thx.culture.Culture.__name__ = ["thx","culture","Culture"];
thx.culture.Culture.__super__ = thx.culture.Info;
for(var k in thx.culture.Info.prototype ) thx.culture.Culture.prototype[k] = thx.culture.Info.prototype[k];
thx.culture.Culture.cultures = null;
thx.culture.Culture.getCultures = function() {
	$s.push("thx.culture.Culture::getCultures");
	var $spos = $s.length;
	if(null == thx.culture.Culture.cultures) thx.culture.Culture.cultures = new Hash();
	var $tmp = thx.culture.Culture.cultures;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Culture.get = function(name) {
	$s.push("thx.culture.Culture::get");
	var $spos = $s.length;
	var $tmp = thx.culture.Culture.getCultures().get(name.toLowerCase());
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Culture.names = function() {
	$s.push("thx.culture.Culture::names");
	var $spos = $s.length;
	var $tmp = thx.culture.Culture.getCultures().keys();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Culture._defaultCulture = null;
thx.culture.Culture.defaultCulture = null;
thx.culture.Culture.getDefaultCulture = function() {
	$s.push("thx.culture.Culture::getDefaultCulture");
	var $spos = $s.length;
	if(null == thx.culture.Culture._defaultCulture) {
		var $tmp = thx.cultures.EnUS.getCulture();
		$s.pop();
		return $tmp;
	} else {
		var $tmp = thx.culture.Culture._defaultCulture;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.culture.Culture.setDefaultCulture = function(culture) {
	$s.push("thx.culture.Culture::setDefaultCulture");
	var $spos = $s.length;
	var $tmp = thx.culture.Culture._defaultCulture = culture;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Culture.add = function(culture) {
	$s.push("thx.culture.Culture::add");
	var $spos = $s.length;
	if(null == thx.culture.Culture._defaultCulture) thx.culture.Culture._defaultCulture = culture;
	var name = culture.name.toLowerCase();
	if(!thx.culture.Culture.getCultures().exists(name)) thx.culture.Culture.getCultures().set(name,culture);
	$s.pop();
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
Dates = function() { }
Dates.__name__ = ["Dates"];
Dates.format = function(d,param,params,culture) {
	$s.push("Dates::format");
	var $spos = $s.length;
	var $tmp = (Dates.formatf(param,params,culture))(d);
	$s.pop();
	return $tmp;
	$s.pop();
}
Dates.formatf = function(param,params,culture) {
	$s.push("Dates::formatf");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"D");
	var format = params.shift();
	switch(format) {
	case "D":
		var $tmp = function(d) {
			$s.push("Dates::formatf@25");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.date(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "DS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@27");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.dateShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "DST":
		var $tmp = function(d) {
			$s.push("Dates::formatf@29");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.dateShort(d,culture) + " " + thx.culture.FormatDate.time(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "DSTS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@31");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.dateShort(d,culture) + " " + thx.culture.FormatDate.timeShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "DTS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@33");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.date(d,culture) + " " + thx.culture.FormatDate.timeShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "Y":
		var $tmp = function(d) {
			$s.push("Dates::formatf@35");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.year(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "YM":
		var $tmp = function(d) {
			$s.push("Dates::formatf@37");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.yearMonth(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "M":
		var $tmp = function(d) {
			$s.push("Dates::formatf@39");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.month(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "MN":
		var $tmp = function(d) {
			$s.push("Dates::formatf@41");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.monthName(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "MS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@43");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.monthNameShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "MD":
		var $tmp = function(d) {
			$s.push("Dates::formatf@45");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.monthDay(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "WD":
		var $tmp = function(d) {
			$s.push("Dates::formatf@47");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.weekDay(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "WN":
		var $tmp = function(d) {
			$s.push("Dates::formatf@49");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.weekDayName(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "WS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@51");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.weekDayNameShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "R":
		var $tmp = function(d) {
			$s.push("Dates::formatf@53");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.dateRfc(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "DT":
		var $tmp = function(d) {
			$s.push("Dates::formatf@55");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.dateTime(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "U":
		var $tmp = function(d) {
			$s.push("Dates::formatf@57");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.universal(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "S":
		var $tmp = function(d) {
			$s.push("Dates::formatf@59");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.sortable(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "T":
		var $tmp = function(d) {
			$s.push("Dates::formatf@61");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.time(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "TS":
		var $tmp = function(d) {
			$s.push("Dates::formatf@63");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatDate.timeShort(d,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "C":
		var f = params[0];
		if(null == f) {
			var $tmp = function(d) {
				$s.push("Dates::formatf@67");
				var $spos = $s.length;
				var $tmp = thx.culture.FormatDate.date(d,culture);
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
		} else {
			var $tmp = function(d) {
				$s.push("Dates::formatf@69");
				var $spos = $s.length;
				var $tmp = thx.culture.FormatDate.format(f,d,culture,params[1] != null?params[1] == "true":true);
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
		}
		break;
	default:
		throw new thx.error.Error("Unsupported date format: {0}",null,format,{ fileName : "Dates.hx", lineNumber : 71, className : "Dates", methodName : "formatf"});
	}
	$s.pop();
}
Dates.interpolate = function(f,a,b,interpolator) {
	$s.push("Dates::interpolate");
	var $spos = $s.length;
	var $tmp = (Dates.interpolatef(a,b,interpolator))(f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Dates.interpolatef = function(a,b,interpolator) {
	$s.push("Dates::interpolatef");
	var $spos = $s.length;
	var f = Floats.interpolatef(a.getTime(),b.getTime(),interpolator);
	var $tmp = function(v) {
		$s.push("Dates::interpolatef@83");
		var $spos = $s.length;
		var $tmp = Date.fromTime(f(v));
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Dates.snap = function(time,period) {
	$s.push("Dates::snap");
	var $spos = $s.length;
	switch(period) {
	case "second":
		var $tmp = Math.round(time / 1000) * 1000;
		$s.pop();
		return $tmp;
	case "minute":
		var $tmp = Math.round(time / 60000) * 60000;
		$s.pop();
		return $tmp;
	case "hour":
		var $tmp = Math.round(time / 3600000) * 3600000;
		$s.pop();
		return $tmp;
	case "day":
		var $tmp = Math.round(time / 86400000) * 86400000;
		$s.pop();
		return $tmp;
	case "week":
		var $tmp = Math.round(time / 604800000) * 604800000;
		$s.pop();
		return $tmp;
	case "month":
		var d = Date.fromTime(time);
		var $tmp = new Date(d.getFullYear(),d.getMonth(),1,0,0,0).getTime();
		$s.pop();
		return $tmp;
	case "year":
		var d = Date.fromTime(time);
		var $tmp = new Date(d.getFullYear(),0,1,0,0,0).getTime();
		$s.pop();
		return $tmp;
	default:
		var $tmp = (function($this) {
			var $r;
			throw new thx.error.Error("unknown period '{0}'",null,period,{ fileName : "Dates.hx", lineNumber : 107, className : "Dates", methodName : "snap"});
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Dates.snapToWeekDay = function(time,day) {
	$s.push("Dates::snapToWeekDay");
	var $spos = $s.length;
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
	var $tmp = time - (d - s) % 7 * 24 * 60 * 60 * 1000;
	$s.pop();
	return $tmp;
	$s.pop();
}
Dates.canParse = function(s) {
	$s.push("Dates::canParse");
	var $spos = $s.length;
	var $tmp = Dates._reparse.match(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
Dates.parse = function(s) {
	$s.push("Dates::parse");
	var $spos = $s.length;
	var parts = s.split(".");
	var date = Date.fromString(StringTools.replace(parts[0],"T"," "));
	if(parts.length > 1) date = Date.fromTime(date.getTime() + Std.parseInt(parts[1]));
	$s.pop();
	return date;
	$s.pop();
}
Dates.prototype.__class__ = Dates;
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
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at least {0:D}",[this.min],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be greater than {0:D}",[this.min],null)]);
			$s.pop();
			return $tmp;
		}
	} else if(null != this.max && (this.maxInclusive && value.getTime() > this.max.getTime() || !this.maxInclusive && value.getTime() >= this.max.getTime())) {
		if(this.maxInclusive) {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be at no more than {0:D}",[this.max],null)]);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = thx.util.Result.Failure([new thx.util.Message("value must be lower than {0:D}",[this.max],null)]);
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
thx.math.Ease = function() { }
thx.math.Ease.__name__ = ["thx","math","Ease"];
thx.math.Ease.mode = function(easemode,f) {
	$s.push("thx.math.Ease::mode");
	var $spos = $s.length;
	if(null == f) f = thx.math.Equations.cubic;
	if(null == easemode) easemode = thx.math.EaseMode.EaseIn;
	switch( (easemode)[1] ) {
	case 0:
		$s.pop();
		return f;
	case 1:
		var $tmp = function(t) {
			$s.push("thx.math.Ease::mode@18");
			var $spos = $s.length;
			var $tmp = 1 - f(1 - t);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = function(t) {
			$s.push("thx.math.Ease::mode@20");
			var $spos = $s.length;
			var $tmp = .5 * (t < .5?f(2 * t):2 - f(2 - 2 * t));
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case 3:
		var $tmp = thx.math.Ease.mode(thx.math.EaseMode.EaseInEaseOut,thx.math.Ease.mode(thx.math.EaseMode.EaseOut,f));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.math.Ease.prototype.__class__ = thx.math.Ease;
if(!thx.cultures) thx.cultures = {}
thx.cultures.ItIT = function(p) {
	if( p === $_ ) return;
	$s.push("thx.cultures.ItIT::new");
	var $spos = $s.length;
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
	$s.pop();
}
thx.cultures.ItIT.__name__ = ["thx","cultures","ItIT"];
thx.cultures.ItIT.__super__ = thx.culture.Culture;
for(var k in thx.culture.Culture.prototype ) thx.cultures.ItIT.prototype[k] = thx.culture.Culture.prototype[k];
thx.cultures.ItIT.culture = null;
thx.cultures.ItIT.getCulture = function() {
	$s.push("thx.cultures.ItIT::getCulture");
	var $spos = $s.length;
	if(null == thx.cultures.ItIT.culture) thx.cultures.ItIT.culture = new thx.cultures.ItIT();
	var $tmp = thx.cultures.ItIT.culture;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.cultures.ItIT.prototype.__class__ = thx.cultures.ItIT;
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
thx.js.AccessProperty = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessProperty::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	this.name = name;
	$s.pop();
}
thx.js.AccessProperty.__name__ = ["thx","js","AccessProperty"];
thx.js.AccessProperty.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessProperty.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessProperty.prototype.name = null;
thx.js.AccessProperty.prototype.get = function() {
	$s.push("thx.js.AccessProperty::get");
	var $spos = $s.length;
	var n = this.name;
	var $tmp = this.selection.firstNode(function(node) {
		$s.push("thx.js.AccessProperty::get@21");
		var $spos = $s.length;
		var $tmp = Reflect.field(node,n);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessProperty.prototype.remove = function() {
	$s.push("thx.js.AccessProperty::remove");
	var $spos = $s.length;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessProperty::remove@27");
		var $spos = $s.length;
		Reflect.deleteField(node,n);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessProperty.prototype.string = function(v) {
	$s.push("thx.js.AccessProperty::string");
	var $spos = $s.length;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessProperty::string@33");
		var $spos = $s.length;
		node[n] = v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessProperty.prototype["float"] = function(v) {
	$s.push("thx.js.AccessProperty::float");
	var $spos = $s.length;
	var s = "" + v;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessProperty::float@40");
		var $spos = $s.length;
		node[n] = s;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessProperty.prototype.__class__ = thx.js.AccessProperty;
thx.js.AccessDataProperty = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessDataProperty::new");
	var $spos = $s.length;
	thx.js.AccessProperty.call(this,name,selection);
	$s.pop();
}
thx.js.AccessDataProperty.__name__ = ["thx","js","AccessDataProperty"];
thx.js.AccessDataProperty.__super__ = thx.js.AccessProperty;
for(var k in thx.js.AccessProperty.prototype ) thx.js.AccessDataProperty.prototype[k] = thx.js.AccessProperty.prototype[k];
thx.js.AccessDataProperty.prototype.stringf = function(v) {
	$s.push("thx.js.AccessDataProperty::stringf");
	var $spos = $s.length;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataProperty::stringf@55");
		var $spos = $s.length;
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) Reflect.deleteField(node,n); else node[n] = s;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataProperty.prototype.floatf = function(v) {
	$s.push("thx.js.AccessDataProperty::floatf");
	var $spos = $s.length;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataProperty::floatf@67");
		var $spos = $s.length;
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) Reflect.deleteField(node,n); else node[n] = "" + s;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataProperty.prototype.data = function() {
	$s.push("thx.js.AccessDataProperty::data");
	var $spos = $s.length;
	var $tmp = this.stringf(function(d,_) {
		$s.push("thx.js.AccessDataProperty::data@79");
		var $spos = $s.length;
		var $tmp = "" + d;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataProperty.prototype.__class__ = thx.js.AccessDataProperty;
DynamicsT = function() { }
DynamicsT.__name__ = ["DynamicsT"];
DynamicsT.toHash = function(ob) {
	$s.push("DynamicsT::toHash");
	var $spos = $s.length;
	var hash = new Hash();
	var $tmp = DynamicsT.copyToHash(ob,hash);
	$s.pop();
	return $tmp;
	$s.pop();
}
DynamicsT.copyToHash = function(ob,hash) {
	$s.push("DynamicsT::copyToHash");
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
DynamicsT.prototype.__class__ = DynamicsT;
thx.culture.FormatNumber = function() { }
thx.culture.FormatNumber.__name__ = ["thx","culture","FormatNumber"];
thx.culture.FormatNumber.decimal = function(v,decimals,culture) {
	$s.push("thx.culture.FormatNumber::decimal");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.number.patternNegative,culture.number.patternPositive,culture,null,null);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.percent = function(v,decimals,culture) {
	$s.push("thx.culture.FormatNumber::percent");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.percent.patternNegative,culture.percent.patternPositive,culture,"%",culture.symbolPercent);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.permille = function(v,decimals,culture) {
	$s.push("thx.culture.FormatNumber::permille");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.crunch(v,decimals,culture.percent,culture.percent.patternNegative,culture.percent.patternPositive,culture,"%",culture.symbolPermille);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.currency = function(v,symbol,decimals,culture) {
	$s.push("thx.culture.FormatNumber::currency");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.crunch(v,decimals,culture.currency,culture.currency.patternNegative,culture.currency.patternPositive,culture,"$",symbol == null?culture.currencySymbol:symbol);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber["int"] = function(v,culture) {
	$s.push("thx.culture.FormatNumber::int");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.decimal(v,0,culture);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.digits = function(v,culture) {
	$s.push("thx.culture.FormatNumber::digits");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.processDigits(v,culture.digits);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.crunch = function(v,decimals,info,negative,positive,culture,symbol,replace) {
	$s.push("thx.culture.FormatNumber::crunch");
	var $spos = $s.length;
	if(Math.isNaN(v)) {
		var $tmp = culture.symbolNaN;
		$s.pop();
		return $tmp;
	} else if(!Math.isFinite(v)) {
		var $tmp = v == Math.NEGATIVE_INFINITY?culture.symbolNegInf:culture.symbolPosInf;
		$s.pop();
		return $tmp;
	}
	var fv = thx.culture.FormatNumber.value(v,info,decimals == null?info.decimals:decimals < 0?0:decimals,culture.digits);
	if(symbol != null) {
		var $tmp = StringTools.replace(StringTools.replace(v < 0?negative:positive,"n",fv),symbol,replace);
		$s.pop();
		return $tmp;
	} else {
		var $tmp = StringTools.replace(v < 0?negative:positive,"n",fv);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.culture.FormatNumber.processDigits = function(s,digits) {
	$s.push("thx.culture.FormatNumber::processDigits");
	var $spos = $s.length;
	if(digits == null) {
		$s.pop();
		return s;
	}
	var o = [];
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		o.push(digits[Std.parseInt(s.substr(i,1))]);
	}
	var $tmp = o.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatNumber.value = function(v,info,decimals,digits) {
	$s.push("thx.culture.FormatNumber::value");
	var $spos = $s.length;
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
		var $tmp = intpart + info.decimalsSeparator + thx.culture.FormatNumber.processDigits(decpart,digits);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return intpart;
	}
	$s.pop();
}
thx.culture.FormatNumber.prototype.__class__ = thx.culture.FormatNumber;
TestDates = function(p) {
	$s.push("TestDates::new");
	var $spos = $s.length;
	$s.pop();
}
TestDates.__name__ = ["TestDates"];
TestDates.prototype.testCanParse = function() {
	$s.push("TestDates::testCanParse");
	var $spos = $s.length;
	utest.Assert.isTrue(Dates.canParse("2010-10-01"),null,{ fileName : "TestDates.hx", lineNumber : 7, className : "TestDates", methodName : "testCanParse"});
	utest.Assert.isTrue(Dates.canParse("2010-10-01 05:05:05"),null,{ fileName : "TestDates.hx", lineNumber : 8, className : "TestDates", methodName : "testCanParse"});
	utest.Assert.isTrue(Dates.canParse("2010-10-01T05:05:05"),null,{ fileName : "TestDates.hx", lineNumber : 9, className : "TestDates", methodName : "testCanParse"});
	utest.Assert.isTrue(Dates.canParse("2010-10-01 05:05:05.005"),null,{ fileName : "TestDates.hx", lineNumber : 10, className : "TestDates", methodName : "testCanParse"});
	$s.pop();
}
TestDates.prototype.__class__ = TestDates;
thx.math.scale.TestAll = function(p) {
	$s.push("thx.math.scale.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.scale.TestAll.__name__ = ["thx","math","scale","TestAll"];
thx.math.scale.TestAll.addTests = function(runner) {
	$s.push("thx.math.scale.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.math.scale.TestLinear());
	runner.addCase(new thx.math.scale.TestLinearString());
	runner.addCase(new thx.math.scale.TestLog());
	runner.addCase(new thx.math.scale.TestOrdinal());
	runner.addCase(new thx.math.scale.TestPow());
	runner.addCase(new thx.math.scale.TestQuantile());
	runner.addCase(new thx.math.scale.TestQuantize());
	$s.pop();
}
thx.math.scale.TestAll.main = function() {
	$s.push("thx.math.scale.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.math.scale.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.math.scale.TestAll.prototype.assertScale = function(scalef,expected,values,pos) {
	$s.push("thx.math.scale.TestAll::assertScale");
	var $spos = $s.length;
	var _g1 = 0, _g = expected.length;
	while(_g1 < _g) {
		var i = _g1++;
		utest.Assert.floatEquals(expected[i],scalef(values[i],i),1e-3,null,pos);
	}
	$s.pop();
}
thx.math.scale.TestAll.prototype.__class__ = thx.math.scale.TestAll;
utest.ui.common.ReportTools = function() { }
utest.ui.common.ReportTools.__name__ = ["utest","ui","common","ReportTools"];
utest.ui.common.ReportTools.hasHeader = function(report,stats) {
	$s.push("utest.ui.common.ReportTools::hasHeader");
	var $spos = $s.length;
	switch( (report.displayHeader)[1] ) {
	case 1:
		$s.pop();
		return false;
	case 2:
		if(!stats.isOk) {
			$s.pop();
			return true;
		}
		switch( (report.displaySuccessResults)[1] ) {
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
thx.js.BaseSelection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.BaseSelection::new");
	var $spos = $s.length;
	this.groups = groups;
	$s.pop();
}
thx.js.BaseSelection.__name__ = ["thx","js","BaseSelection"];
thx.js.BaseSelection.bindJoin = function(join,group,groupData,update,enter,exit) {
	$s.push("thx.js.BaseSelection::bindJoin");
	var $spos = $s.length;
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
	$s.pop();
}
thx.js.BaseSelection.bind = function(group,groupData,update,enter,exit) {
	$s.push("thx.js.BaseSelection::bind");
	var $spos = $s.length;
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
	$s.pop();
}
thx.js.BaseSelection.prototype.parentNode = null;
thx.js.BaseSelection.prototype.groups = null;
thx.js.BaseSelection.prototype.select = function(selector) {
	$s.push("thx.js.BaseSelection::select");
	var $spos = $s.length;
	var $tmp = this._select(function(el) {
		$s.push("thx.js.BaseSelection::select@357");
		var $spos = $s.length;
		var $tmp = thx.js.Dom.selectionEngine.select(selector,el);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.selectAll = function(selector) {
	$s.push("thx.js.BaseSelection::selectAll");
	var $spos = $s.length;
	var $tmp = this._selectAll(function(el) {
		$s.push("thx.js.BaseSelection::selectAll@364");
		var $spos = $s.length;
		var $tmp = thx.js.Dom.selectionEngine.selectAll(selector,el);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype._this = function() {
	$s.push("thx.js.BaseSelection::_this");
	var $spos = $s.length;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.append = function(name) {
	$s.push("thx.js.BaseSelection::append");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		$s.push("thx.js.BaseSelection::append@375");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		$s.pop();
		return n;
		$s.pop();
	};
	var appendNS = function(node) {
		$s.push("thx.js.BaseSelection::append@382");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		$s.pop();
		return n;
		$s.pop();
	};
	var $tmp = this._select(null == qname?append:appendNS);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.remove = function() {
	$s.push("thx.js.BaseSelection::remove");
	var $spos = $s.length;
	var $tmp = this.eachNode(function(node,i) {
		$s.push("thx.js.BaseSelection::remove@394");
		var $spos = $s.length;
		var parent = node.parentNode;
		if(null != parent) parent.removeChild(node);
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.eachNode = function(f) {
	$s.push("thx.js.BaseSelection::eachNode");
	var $spos = $s.length;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		group.each(f);
	}
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.insert = function(name,before,beforeSelector) {
	$s.push("thx.js.BaseSelection::insert");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var insertDom = function(node) {
		$s.push("thx.js.BaseSelection::insert@411");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node,node)[0]);
		$s.pop();
		return n;
		$s.pop();
	};
	var insertNsDom = function(node) {
		$s.push("thx.js.BaseSelection::insert@417");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node,node)[0]);
		$s.pop();
		return n;
		$s.pop();
	};
	var $tmp = this._select(null == qname?insertDom:insertNsDom);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.sortNode = function(comparator) {
	$s.push("thx.js.BaseSelection::sortNode");
	var $spos = $s.length;
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
	$s.pop();
	return this;
	$s.pop();
}
thx.js.BaseSelection.prototype.firstNode = function(f) {
	$s.push("thx.js.BaseSelection::firstNode");
	var $spos = $s.length;
	var _g = 0, _g1 = this.groups;
	while(_g < _g1.length) {
		var group = _g1[_g];
		++_g;
		var $it0 = group.nodes.iterator();
		while( $it0.hasNext() ) {
			var node = $it0.next();
			if(null != node) {
				var $tmp = f(node);
				$s.pop();
				return $tmp;
			}
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
thx.js.BaseSelection.prototype.node = function() {
	$s.push("thx.js.BaseSelection::node");
	var $spos = $s.length;
	var $tmp = this.firstNode(function(n) {
		$s.push("thx.js.BaseSelection::node@461");
		var $spos = $s.length;
		$s.pop();
		return n;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.empty = function() {
	$s.push("thx.js.BaseSelection::empty");
	var $spos = $s.length;
	var $tmp = null == this.firstNode(function(n) {
		$s.push("thx.js.BaseSelection::empty@466");
		var $spos = $s.length;
		$s.pop();
		return n;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.filterNode = function(f) {
	$s.push("thx.js.BaseSelection::filterNode");
	var $spos = $s.length;
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
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.onNode = function(type,listener) {
	$s.push("thx.js.BaseSelection::onNode");
	var $spos = $s.length;
	var i = type.indexOf("."), typo = i < 0?type:type.substr(0,i);
	var $tmp = this.eachNode(function(n,i1) {
		$s.push("thx.js.BaseSelection::onNode@496");
		var $spos = $s.length;
		var l = function(e) {
			$s.push("thx.js.BaseSelection::onNode@496@497");
			var $spos = $s.length;
			var o = thx.js.Dom.event;
			thx.js.Dom.event = e;
			try {
				listener(n,i1);
			} catch( e1 ) {
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
			}
			thx.js.Dom.event = o;
			$s.pop();
		};
		if(null != Reflect.field(n,"__on" + type)) {
			n.removeEventListener(typo,Reflect.field(n,"__on" + type),false);
			Reflect.deleteField(n,"__on" + type);
		}
		if(null != listener) {
			n["__on" + type] = l;
			n.addEventListener(typo,l,false);
		}
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.BaseSelection::createSelection");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Selection.hx", lineNumber : 522, className : "thx.js.BaseSelection", methodName : "createSelection"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype._select = function(selectf) {
	$s.push("thx.js.BaseSelection::_select");
	var $spos = $s.length;
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
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype._selectAll = function(selectallf) {
	$s.push("thx.js.BaseSelection::_selectAll");
	var $spos = $s.length;
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
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseSelection.prototype.__class__ = thx.js.BaseSelection;
thx.js.UnboundSelection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.UnboundSelection::new");
	var $spos = $s.length;
	thx.js.BaseSelection.call(this,groups);
	$s.pop();
}
thx.js.UnboundSelection.__name__ = ["thx","js","UnboundSelection"];
thx.js.UnboundSelection.__super__ = thx.js.BaseSelection;
for(var k in thx.js.BaseSelection.prototype ) thx.js.UnboundSelection.prototype[k] = thx.js.BaseSelection.prototype[k];
thx.js.UnboundSelection.prototype.html = function() {
	$s.push("thx.js.UnboundSelection::html");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessHtml(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.text = function() {
	$s.push("thx.js.UnboundSelection::text");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessText(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.attr = function(name) {
	$s.push("thx.js.UnboundSelection::attr");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessAttribute(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.classed = function() {
	$s.push("thx.js.UnboundSelection::classed");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessClassed(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.property = function(name) {
	$s.push("thx.js.UnboundSelection::property");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessProperty(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.style = function(name) {
	$s.push("thx.js.UnboundSelection::style");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessStyle(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.transition = function() {
	$s.push("thx.js.UnboundSelection::transition");
	var $spos = $s.length;
	var $tmp = new thx.js.UnboundTransition(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.data = function(d,join) {
	$s.push("thx.js.UnboundSelection::data");
	var $spos = $s.length;
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
	var $tmp = new thx.js.DataChoice(update,enter,exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.selectAllData = function(selector) {
	$s.push("thx.js.UnboundSelection::selectAllData");
	var $spos = $s.length;
	var selection = this.selectAll(selector);
	var $tmp = new thx.js.ResumeSelection(selection.groups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundSelection.prototype.__class__ = thx.js.UnboundSelection;
thx.js.Selection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.Selection::new");
	var $spos = $s.length;
	thx.js.UnboundSelection.call(this,groups);
	$s.pop();
}
thx.js.Selection.__name__ = ["thx","js","Selection"];
thx.js.Selection.__super__ = thx.js.UnboundSelection;
for(var k in thx.js.UnboundSelection.prototype ) thx.js.Selection.prototype[k] = thx.js.UnboundSelection.prototype[k];
thx.js.Selection.create = function(groups) {
	$s.push("thx.js.Selection::create");
	var $spos = $s.length;
	var $tmp = new thx.js.Selection(groups);
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
thx.js.Selection.prototype.__class__ = thx.js.Selection;
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
thx.js.Group = function(nodes) {
	if( nodes === $_ ) return;
	$s.push("thx.js.Group::new");
	var $spos = $s.length;
	this.nodes = nodes;
	$s.pop();
}
thx.js.Group.__name__ = ["thx","js","Group"];
thx.js.Group.prototype.parentNode = null;
thx.js.Group.prototype.nodes = null;
thx.js.Group.prototype.each = function(f) {
	$s.push("thx.js.Group::each");
	var $spos = $s.length;
	var _g1 = 0, _g = this.nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(null != this.nodes[i]) f(this.nodes[i],i);
	}
	$s.pop();
}
thx.js.Group.prototype.iterator = function() {
	$s.push("thx.js.Group::iterator");
	var $spos = $s.length;
	var $tmp = this.nodes.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Group.prototype.get = function(i) {
	$s.push("thx.js.Group::get");
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
thx.js.Group.prototype.sort = function(comparator) {
	$s.push("thx.js.Group::sort");
	var $spos = $s.length;
	this.nodes.sort(comparator);
	$s.pop();
}
thx.js.Group.prototype.__class__ = thx.js.Group;
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
thx.js.SizzleEngine.prototype.selectNode = function(n,p) {
	$s.push("thx.js.SizzleEngine::selectNode");
	var $spos = $s.length;
	var $tmp = thx.js.Sizzle.select(n,p)[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.SizzleEngine.prototype.selectAll = function(selector,node) {
	$s.push("thx.js.SizzleEngine::selectAll");
	var $spos = $s.length;
	var $tmp = thx.js.Sizzle.uniqueSort(thx.js.Sizzle.select(selector,node));
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
thx.js.Dom.selectAll = function(selector) {
	$s.push("thx.js.Dom::selectAll");
	var $spos = $s.length;
	var $tmp = thx.js.Dom.doc.selectAll(selector);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Dom.selectNode = function(node) {
	$s.push("thx.js.Dom::selectNode");
	var $spos = $s.length;
	var $tmp = thx.js.Selection.create([new thx.js.Group([node])]);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Dom.selectNodeData = function(node) {
	$s.push("thx.js.Dom::selectNodeData");
	var $spos = $s.length;
	var $tmp = thx.js.ResumeSelection.create([new thx.js.Group([node])]);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.Dom.event = null;
thx.js.Dom.prototype.__class__ = thx.js.Dom;
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
thx.culture.Language = function() { }
thx.culture.Language.__name__ = ["thx","culture","Language"];
thx.culture.Language.__super__ = thx.culture.Info;
for(var k in thx.culture.Info.prototype ) thx.culture.Language.prototype[k] = thx.culture.Info.prototype[k];
thx.culture.Language.languages = null;
thx.culture.Language.getLanguages = function() {
	$s.push("thx.culture.Language::getLanguages");
	var $spos = $s.length;
	if(null == thx.culture.Language.languages) thx.culture.Language.languages = new Hash();
	var $tmp = thx.culture.Language.languages;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Language.get = function(name) {
	$s.push("thx.culture.Language::get");
	var $spos = $s.length;
	var $tmp = thx.culture.Language.getLanguages().get(name.toLowerCase());
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Language.names = function() {
	$s.push("thx.culture.Language::names");
	var $spos = $s.length;
	var $tmp = thx.culture.Language.getLanguages().keys();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.Language.add = function(language) {
	$s.push("thx.culture.Language::add");
	var $spos = $s.length;
	if(!thx.culture.Language.getLanguages().exists(language.iso2)) thx.culture.Language.getLanguages().set(language.iso2,language);
	$s.pop();
}
thx.culture.Language.prototype.__class__ = thx.culture.Language;
thx.js.TestAll = function(p) {
	$s.push("thx.js.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestAll.__name__ = ["thx","js","TestAll"];
thx.js.TestAll.addTests = function(runner) {
	$s.push("thx.js.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.js.TestDom());
	runner.addCase(new thx.js.TestSizzle());
	runner.addCase(new thx.js.TestSelection());
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
thx.culture.FormatParams = function() { }
thx.culture.FormatParams.__name__ = ["thx","culture","FormatParams"];
thx.culture.FormatParams.cleanQuotes = function(p) {
	$s.push("thx.culture.FormatParams::cleanQuotes");
	var $spos = $s.length;
	if(p.length <= 1) {
		$s.pop();
		return p;
	}
	var f = p.substr(0,1);
	if(("\"" == f || "'" == f) && p.substr(-1) == f) {
		var $tmp = p.substr(1,p.length - 2);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return p;
	}
	$s.pop();
}
thx.culture.FormatParams.params = function(p,ps,alt) {
	$s.push("thx.culture.FormatParams::params");
	var $spos = $s.length;
	if(null != ps && null != p) {
		var $tmp = [p].concat(ps);
		$s.pop();
		return $tmp;
	}
	if((null == ps || ps.length == 0) && null == p) {
		var $tmp = [alt];
		$s.pop();
		return $tmp;
	}
	if(null == ps || ps.length == 0) {
		var parts = p.split(":");
		var $tmp = [parts[0]].concat(parts.length == 1?[]:parts[1].split(",").map(function(s,i) {
			$s.push("thx.culture.FormatParams::params@33");
			var $spos = $s.length;
			if(0 == i) {
				$s.pop();
				return s;
			} else {
				var $tmp = thx.culture.FormatParams.cleanQuotes(s);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}));
		$s.pop();
		return $tmp;
	}
	$s.pop();
	return ps;
	$s.pop();
}
thx.culture.FormatParams.prototype.__class__ = thx.culture.FormatParams;
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
utest.ui.common.IReport = function() { }
utest.ui.common.IReport.__name__ = ["utest","ui","common","IReport"];
utest.ui.common.IReport.prototype.displaySuccessResults = null;
utest.ui.common.IReport.prototype.displayHeader = null;
utest.ui.common.IReport.prototype.setHandler = null;
utest.ui.common.IReport.prototype.__class__ = utest.ui.common.IReport;
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
	this.oldTrace = haxe.Log.trace;
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
		buf.b[buf.b.length] = messages.join("<br/>");
		buf.b[buf.b.length] = "</div>\n";
	}
	buf.b[buf.b.length] = "</div>\n";
	buf.b[buf.b.length] = "</div></li>\n";
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getErrorDescription = function(e) {
	$s.push("utest.ui.text.HtmlReport::getErrorDescription");
	var $spos = $s.length;
	var $tmp = Std.string(e);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.ui.text.HtmlReport.prototype.getErrorStack = function(s,e) {
	$s.push("utest.ui.text.HtmlReport::getErrorStack");
	var $spos = $s.length;
	var $tmp = this.formatStack(s);
	$s.pop();
	return $tmp;
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
	return "function utestTooltip(ref, text) {\r\n\tvar el = document.getElementById(\"utesttip\");\r\n\tif(!el) {\r\n\t\tvar el = document.createElement(\"div\")\r\n\t\tel.id = \"utesttip\";\r\n\t\tel.style.position = \"absolute\";\r\n\t\tdocument.body.appendChild(el)\r\n\t}\r\n\tvar p = utestFindPos(ref);\r\n\tel.style.left = (4 + p[0]) + \"px\";\r\n\tel.style.top = (p[1] - 1) + \"px\";\r\n\tel.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n\tvar left = 0;\r\n\tvar top = 0;\r\n\tdo {\r\n\t\tleft += el.offsetLeft;\r\n\t\ttop += el.offsetTop;\r\n\t} while(el = el.offsetParent)\r\n\treturn [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n\tvar el = document.getElementById(\"utesttip\")\r\n\tif(el)\r\n\t\tdocument.body.removeChild(el)\r\n}";
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
		$s.push("utest.ui.text.HtmlReport::_handler@660");
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
	utest.Assert.same(["a","b","c"],[1,2,3].map(function(v,_) {
		$s.push("TestArrays::testMap@16");
		var $spos = $s.length;
		var $tmp = String.fromCharCode(v + 96);
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 16, className : "TestArrays", methodName : "testMap"});
	utest.Assert.same([0,1,2],[null,null,null].map(function(_,i) {
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
TestArrays.prototype.testSplit = function() {
	$s.push("TestArrays::testSplit");
	var $spos = $s.length;
	utest.Assert.same([[1,2,3],[4,5,6]],Arrays.split([1,2,3,100,4,5,6],function(v,_) {
		$s.push("TestArrays::testSplit@29");
		var $spos = $s.length;
		var $tmp = v == 100;
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 29, className : "TestArrays", methodName : "testSplit"});
	utest.Assert.same([[1],[3],[5]],Arrays.split([1,2,3,4,5,6],function(_,i) {
		$s.push("TestArrays::testSplit@30");
		var $spos = $s.length;
		var $tmp = i % 2 != 0;
		$s.pop();
		return $tmp;
		$s.pop();
	}),null,null,{ fileName : "TestArrays.hx", lineNumber : 30, className : "TestArrays", methodName : "testSplit"});
	$s.pop();
}
TestArrays.prototype.testFormat = function() {
	$s.push("TestArrays::testFormat");
	var $spos = $s.length;
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
	$s.pop();
}
TestArrays.prototype.testInterpolate = function() {
	$s.push("TestArrays::testInterpolate");
	var $spos = $s.length;
	utest.Assert.same([1.0,1.0,1.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 50, className : "TestArrays", methodName : "testInterpolate"});
	utest.Assert.same([1.0,3.0],Arrays.interpolate(0.5,[1.0,2.0,3.0],[1.0,4.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 51, className : "TestArrays", methodName : "testInterpolate"});
	utest.Assert.same([5.0,1.0,-1.0],Arrays.interpolate(0.5,[1.0,2.0],[9.0,0.0,-1.0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 52, className : "TestArrays", methodName : "testInterpolate"});
	$s.pop();
}
TestArrays.prototype.testInterpolateStrings = function() {
	$s.push("TestArrays::testInterpolateStrings");
	var $spos = $s.length;
	utest.Assert.same(["b20","a10"],Arrays.interpolateStrings(0.5,["b10","a20"],["b30","a0"]),null,null,{ fileName : "TestArrays.hx", lineNumber : 57, className : "TestArrays", methodName : "testInterpolateStrings"});
	$s.pop();
}
TestArrays.prototype.testInterpolateInts = function() {
	$s.push("TestArrays::testInterpolateInts");
	var $spos = $s.length;
	utest.Assert.same([20,10],Arrays.interpolateInts(0.5,[10,20],[30,0]),null,null,{ fileName : "TestArrays.hx", lineNumber : 62, className : "TestArrays", methodName : "testInterpolateInts"});
	$s.pop();
}
TestArrays.prototype.__class__ = TestArrays;
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
thx.math.scale.TestLinearString = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestLinearString::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestLinearString.__name__ = ["thx","math","scale","TestLinearString"];
thx.math.scale.TestLinearString.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLinearString.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLinearString.prototype.testRange = function() {
	$s.push("thx.math.scale.TestLinearString::testRange");
	var $spos = $s.length;
	var scale = new thx.math.scale.LinearString().domain(Arrays.min(thx.math.scale.TestLinearString.data),Arrays.max(thx.math.scale.TestLinearString.data)).range("0px","120px");
	utest.Assert.same(["0px","8px","24px","56px","120px"],thx.math.scale.TestLinearString.data.map($closure(scale,"scale")),null,null,{ fileName : "TestLinearString.hx", lineNumber : 21, className : "thx.math.scale.TestLinearString", methodName : "testRange"});
	$s.pop();
}
thx.math.scale.TestLinearString.prototype.__class__ = thx.math.scale.TestLinearString;
thx.csv.Csv = function() { }
thx.csv.Csv.__name__ = ["thx","csv","Csv"];
thx.csv.Csv.encode = function(value,delimiter,nulltoempty,newline) {
	$s.push("thx.csv.Csv::encode");
	var $spos = $s.length;
	var handler = new thx.csv.CsvEncoder(delimiter,nulltoempty,newline);
	new thx.data.ValueEncoder(handler).encode(value);
	var $tmp = handler.encodedString;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.csv.Csv.decode = function(value) {
	$s.push("thx.csv.Csv::decode");
	var $spos = $s.length;
	var handler = new thx.data.ValueHandler();
	new thx.csv.CsvDecoder(handler).decode(value);
	var $tmp = handler.value;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.csv.Csv.prototype.__class__ = thx.csv.Csv;
thx.svg.Chord = function(source,target,radius,startAngle,endAngle) {
	if( source === $_ ) return;
	$s.push("thx.svg.Chord::new");
	var $spos = $s.length;
	this._source = source;
	this._target = target;
	this._radius = radius;
	this._startAngle = startAngle;
	this._endAngle = endAngle;
	$s.pop();
}
thx.svg.Chord.__name__ = ["thx","svg","Chord"];
thx.svg.Chord.pathObject = function() {
	$s.push("thx.svg.Chord::pathObject");
	var $spos = $s.length;
	var $tmp = new thx.svg.Chord(function(d,_) {
		$s.push("thx.svg.Chord::pathObject@130");
		var $spos = $s.length;
		var $tmp = d.source;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Chord::pathObject@131");
		var $spos = $s.length;
		var $tmp = d.target;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Chord::pathObject@132");
		var $spos = $s.length;
		var $tmp = d.radius;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Chord::pathObject@133");
		var $spos = $s.length;
		var $tmp = d.startAngle;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Chord::pathObject@134");
		var $spos = $s.length;
		var $tmp = d.endAngle;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype._source = null;
thx.svg.Chord.prototype._target = null;
thx.svg.Chord.prototype._radius = null;
thx.svg.Chord.prototype._startAngle = null;
thx.svg.Chord.prototype._endAngle = null;
thx.svg.Chord.prototype.shape = function(d,i) {
	$s.push("thx.svg.Chord::shape");
	var $spos = $s.length;
	var s = this.subgroup(this._source,d,i), t = this.subgroup(this._target,d,i);
	var $tmp = "M" + s.p0 + this.arc(s.r,s.p1) + (this.equals(s,t)?this.curve(s.r,s.p1,s.r,s.p0):this.curve(s.r,s.p1,t.r,t.p0) + this.arc(t.r,t.p1) + this.curve(t.r,t.p1,s.r,s.p0)) + "Z";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.subgroup = function(f,d,i) {
	$s.push("thx.svg.Chord::subgroup");
	var $spos = $s.length;
	var sub = f(d,i), r = this._radius(sub,i), a0 = this._startAngle(sub,i) + thx.svg.LineInternals.arcOffset, a1 = this._endAngle(sub,i) + thx.svg.LineInternals.arcOffset;
	var $tmp = { r : r, a0 : a0, a1 : a1, p0 : [r * Math.cos(a0),r * Math.sin(a0)], p1 : [r * Math.cos(a1),r * Math.sin(a1)]};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.equals = function(a,b) {
	$s.push("thx.svg.Chord::equals");
	var $spos = $s.length;
	var $tmp = a.a0 == b.a0 && a.a1 == b.a1;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.arc = function(r,p) {
	$s.push("thx.svg.Chord::arc");
	var $spos = $s.length;
	var $tmp = "A" + r + "," + r + " 0 0,1 " + p;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.curve = function(r0,p0,r1,p1) {
	$s.push("thx.svg.Chord::curve");
	var $spos = $s.length;
	var $tmp = "Q 0,0 " + p1;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.getSource = function() {
	$s.push("thx.svg.Chord::getSource");
	var $spos = $s.length;
	var $tmp = this._source;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.source = function(v) {
	$s.push("thx.svg.Chord::source");
	var $spos = $s.length;
	this._source = function(_,_1) {
		$s.push("thx.svg.Chord::source@70");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.sourcef = function(v) {
	$s.push("thx.svg.Chord::sourcef");
	var $spos = $s.length;
	this._source = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.getTarget = function() {
	$s.push("thx.svg.Chord::getTarget");
	var $spos = $s.length;
	var $tmp = this._target;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.target = function(v) {
	$s.push("thx.svg.Chord::target");
	var $spos = $s.length;
	this._target = function(_,_1) {
		$s.push("thx.svg.Chord::target@82");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.targetf = function(v) {
	$s.push("thx.svg.Chord::targetf");
	var $spos = $s.length;
	this._target = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.getRadius = function() {
	$s.push("thx.svg.Chord::getRadius");
	var $spos = $s.length;
	var $tmp = this._radius;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.radius = function(v) {
	$s.push("thx.svg.Chord::radius");
	var $spos = $s.length;
	this._radius = function(_,_1) {
		$s.push("thx.svg.Chord::radius@94");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.radiusf = function(v) {
	$s.push("thx.svg.Chord::radiusf");
	var $spos = $s.length;
	this._radius = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.getStartAngle = function() {
	$s.push("thx.svg.Chord::getStartAngle");
	var $spos = $s.length;
	var $tmp = this._startAngle;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.startAngle = function(v) {
	$s.push("thx.svg.Chord::startAngle");
	var $spos = $s.length;
	this._startAngle = function(_,_1) {
		$s.push("thx.svg.Chord::startAngle@106");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.startAnglef = function(v) {
	$s.push("thx.svg.Chord::startAnglef");
	var $spos = $s.length;
	this._startAngle = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.getEndAngle = function() {
	$s.push("thx.svg.Chord::getEndAngle");
	var $spos = $s.length;
	var $tmp = this._endAngle;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Chord.prototype.endAngle = function(v) {
	$s.push("thx.svg.Chord::endAngle");
	var $spos = $s.length;
	this._endAngle = function(_,_1) {
		$s.push("thx.svg.Chord::endAngle@118");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.endAnglef = function(v) {
	$s.push("thx.svg.Chord::endAnglef");
	var $spos = $s.length;
	this._endAngle = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Chord.prototype.__class__ = thx.svg.Chord;
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
if(!thx.culture.core) thx.culture.core = {}
thx.culture.core.DateTimeInfo = function(months,abbrMonths,days,abbrDays,shortDays,am,pm,separatorDate,separatorTime,firstWeekDay,patternYearMonth,patternMonthDay,patternDate,patternDateShort,patternDateRfc,patternDateTime,patternUniversal,patternSortable,patternTime,patternTimeShort) {
	if( months === $_ ) return;
	$s.push("thx.culture.core.DateTimeInfo::new");
	var $spos = $s.length;
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
	$s.pop();
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
thx.js.Timer = function() { }
thx.js.Timer.__name__ = ["thx","js","Timer"];
thx.js.Timer.timer = function(f,delay) {
	$s.push("thx.js.Timer::timer");
	var $spos = $s.length;
	if(delay == null) delay = 0.0;
	var now = Date.now().getTime(), found = false, start = now + delay, t0, t1 = thx.js.Timer.queue;
	if(!Math.isFinite(delay)) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
thx.js.Timer.start = function() {
	$s.push("thx.js.Timer::start");
	var $spos = $s.length;
	thx.js.Timer.interval = 1;
	thx.js.Timer.timeout = 0;
	js.Lib.window.requestAnimationFrame(thx.js.Timer._step);
	$s.pop();
}
thx.js.Timer.step = function() {
	$s.push("thx.js.Timer::step");
	var $spos = $s.length;
	var elapsed, now = Date.now().getTime(), t0 = null, t1 = thx.js.Timer.queue;
	while(null != t1) {
		elapsed = now - t1.then;
		if(elapsed > t1.delay) t1.flush = t1.f(elapsed);
		t1 = (t0 = t1).next;
	}
	thx.js.Timer.flush();
	if(0 != thx.js.Timer.interval) js.Lib.window.requestAnimationFrame(thx.js.Timer._step);
	$s.pop();
}
thx.js.Timer.flush = function() {
	$s.push("thx.js.Timer::flush");
	var $spos = $s.length;
	var t0 = null, t1 = thx.js.Timer.queue;
	while(null != t1) t1 = t1.flush?null != t0?t0.next = t1.next:thx.js.Timer.queue = t1.next:(t0 = t1).next;
	if(null == t0) thx.js.Timer.interval = 0;
	$s.pop();
}
thx.js.Timer.prototype.__class__ = thx.js.Timer;
thx.math.scale.Quantile = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Quantile::new");
	var $spos = $s.length;
	this._domain = [];
	this._range = [];
	this._thresolds = [];
	$s.pop();
}
thx.math.scale.Quantile.__name__ = ["thx","math","scale","Quantile"];
thx.math.scale.Quantile.prototype._domain = null;
thx.math.scale.Quantile.prototype._range = null;
thx.math.scale.Quantile.prototype._thresolds = null;
thx.math.scale.Quantile.prototype.rescale = function() {
	$s.push("thx.math.scale.Quantile::rescale");
	var $spos = $s.length;
	var i = -1, n = this._range.length, k = this._domain.length / n;
	if(this._thresolds.length > n) this._thresolds = this._thresolds.splice(0,n);
	while(++i < n) this._thresolds[i] = this._domain[Std["int"](i * k)];
	$s.pop();
}
thx.math.scale.Quantile.prototype._quantile = function(value) {
	$s.push("thx.math.scale.Quantile::_quantile");
	var $spos = $s.length;
	if(Math.isNaN(value)) {
		$s.pop();
		return -1;
	}
	var low = 0, high = this._thresolds.length - 1;
	while(low <= high) {
		var mid = low + high >> 1, midValue = this._thresolds[mid];
		if(midValue < value) low = mid + 1; else if(midValue > value) high = mid - 1; else {
			$s.pop();
			return mid;
		}
	}
	var $tmp = high < 0?0:high;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.scaleMap = function(x,i) {
	$s.push("thx.math.scale.Quantile::scaleMap");
	var $spos = $s.length;
	var $tmp = this.scale(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.scale = function(v) {
	$s.push("thx.math.scale.Quantile::scale");
	var $spos = $s.length;
	var $tmp = this._range[this._quantile(v)];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.getDomain = function() {
	$s.push("thx.math.scale.Quantile::getDomain");
	var $spos = $s.length;
	var $tmp = this._domain;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.domain = function(x) {
	$s.push("thx.math.scale.Quantile::domain");
	var $spos = $s.length;
	this._domain = Arrays.filter(x,function(d) {
		$s.push("thx.math.scale.Quantile::domain@64");
		var $spos = $s.length;
		var $tmp = !Math.isNaN(d);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	this._domain.sort(Floats.ascending);
	this.rescale();
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Quantile.prototype.getRange = function() {
	$s.push("thx.math.scale.Quantile::getRange");
	var $spos = $s.length;
	var $tmp = this._range;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.range = function(x) {
	$s.push("thx.math.scale.Quantile::range");
	var $spos = $s.length;
	this._range = x.copy();
	this.rescale();
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Quantile.prototype.getQuantiles = function() {
	$s.push("thx.math.scale.Quantile::getQuantiles");
	var $spos = $s.length;
	var $tmp = $closure(this._thresolds,"copy");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantile.prototype.__class__ = thx.math.scale.Quantile;
if(!thx.text) thx.text = {}
thx.text.ERegs = function() { }
thx.text.ERegs.__name__ = ["thx","text","ERegs"];
thx.text.ERegs.escapeERegChars = function(s) {
	$s.push("thx.text.ERegs::escapeERegChars");
	var $spos = $s.length;
	var $tmp = thx.text.ERegs._escapePattern.customReplace(s,function(e) {
		$s.push("thx.text.ERegs::escapeERegChars@8");
		var $spos = $s.length;
		var $tmp = "\\" + e.matched(0);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.text.ERegs.prototype.__class__ = thx.text.ERegs;
thx.math.scale.TestPow = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestPow::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestPow.__name__ = ["thx","math","scale","TestPow"];
thx.math.scale.TestPow.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestPow.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestPow.prototype.testDomain = function() {
	$s.push("thx.math.scale.TestPow::testDomain");
	var $spos = $s.length;
	var scale = new thx.math.scale.Pow().exponent(2);
	var expected = [0.25,0.0,0.25,1.0,2.25];
	var values = [-0.5,0.0,0.5,1.0,1.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestPow.hx", lineNumber : 16, className : "thx.math.scale.TestPow", methodName : "testDomain"});
	$s.pop();
}
thx.math.scale.TestPow.prototype.testDomain12 = function() {
	$s.push("thx.math.scale.TestPow::testDomain12");
	var $spos = $s.length;
	var scale = new thx.math.scale.Pow().exponent(2).domain(1,2);
	var expected = [-0.25,0.0,0.417,1.0,1.75];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestPow.hx", lineNumber : 25, className : "thx.math.scale.TestPow", methodName : "testDomain12"});
	$s.pop();
}
thx.math.scale.TestPow.prototype.testSqrtDomain = function() {
	$s.push("thx.math.scale.TestPow::testSqrtDomain");
	var $spos = $s.length;
	var scale = thx.math.scale.Pow.sqrt();
	var expected = [Math.NaN,0.0,0.5,0.707,1.0,2.0];
	var values = [-0.5,0.0,0.25,0.5,1.0,4.0];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestPow.hx", lineNumber : 34, className : "thx.math.scale.TestPow", methodName : "testSqrtDomain"});
	$s.pop();
}
thx.math.scale.TestPow.prototype.testSqrtDomain12 = function() {
	$s.push("thx.math.scale.TestPow::testSqrtDomain12");
	var $spos = $s.length;
	var scale = thx.math.scale.Pow.sqrt().domain(1,2);
	var expected = [-0.707,0.0,0.543,1.0,1.403];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestPow.hx", lineNumber : 43, className : "thx.math.scale.TestPow", methodName : "testSqrtDomain12"});
	$s.pop();
}
thx.math.scale.TestPow.prototype.testSqrtDomain0n1 = function() {
	$s.push("thx.math.scale.TestPow::testSqrtDomain0n1");
	var $spos = $s.length;
	var scale = thx.math.scale.Pow.sqrt().domain(0,-1);
	var expected = [Math.NaN,0.0,0.5,0.707,1.0,2.0];
	var values = [0.5,0.0,-0.25,-0.5,-1.0,-4.0];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestPow.hx", lineNumber : 52, className : "thx.math.scale.TestPow", methodName : "testSqrtDomain0n1"});
	$s.pop();
}
thx.math.scale.TestPow.prototype.__class__ = thx.math.scale.TestPow;
if(!thx.languages) thx.languages = {}
thx.languages.En = function(p) {
	if( p === $_ ) return;
	$s.push("thx.languages.En::new");
	var $spos = $s.length;
	this.name = "en";
	this.english = "English";
	this["native"] = "English";
	this.iso2 = "en";
	this.iso3 = "eng";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
	$s.pop();
}
thx.languages.En.__name__ = ["thx","languages","En"];
thx.languages.En.__super__ = thx.culture.Language;
for(var k in thx.culture.Language.prototype ) thx.languages.En.prototype[k] = thx.culture.Language.prototype[k];
thx.languages.En.language = null;
thx.languages.En.getLanguage = function() {
	$s.push("thx.languages.En::getLanguage");
	var $spos = $s.length;
	if(null == thx.languages.En.language) thx.languages.En.language = new thx.languages.En();
	var $tmp = thx.languages.En.language;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.languages.En.prototype.__class__ = thx.languages.En;
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
thx.math.scale.TestQuantile = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestQuantile::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestQuantile.__name__ = ["thx","math","scale","TestQuantile"];
thx.math.scale.TestQuantile.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestQuantile.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestQuantile.prototype.__class__ = thx.math.scale.TestQuantile;
thx.svg.TestArc = function(p) {
	if( p === $_ ) return;
	$s.push("thx.svg.TestArc::new");
	var $spos = $s.length;
	thx.svg.TestAll.call(this);
	$s.pop();
}
thx.svg.TestArc.__name__ = ["thx","svg","TestArc"];
thx.svg.TestArc.__super__ = thx.svg.TestAll;
for(var k in thx.svg.TestAll.prototype ) thx.svg.TestArc.prototype[k] = thx.svg.TestAll.prototype[k];
thx.svg.TestArc.prototype.testDefault = function() {
	$s.push("thx.svg.TestArc::testDefault");
	var $spos = $s.length;
	var arc = new thx.svg.Arc().innerRadius(0).outerRadius(1).startAngle(0).endAngle(Math.PI);
	var shape = arc.shape();
	var expected = "M6.123031769111886e-17,-1A1,1 0 1,1 6.123031769111886e-17,1L0,0Z";
	this.assertSamePath(expected,shape,{ fileName : "TestArc.hx", lineNumber : 19, className : "thx.svg.TestArc", methodName : "testDefault"});
	$s.pop();
}
thx.svg.TestArc.prototype.__class__ = thx.svg.TestArc;
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
haxe.io.Bytes.prototype.toHex = function() {
	$s.push("haxe.io.Bytes::toHex");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
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
thx.math.Const = function() { }
thx.math.Const.__name__ = ["thx","math","Const"];
thx.math.Const.prototype.__class__ = thx.math.Const;
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
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Floats.hx", lineNumber : 50, className : "Floats", methodName : "range"});
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
Floats.interpolate = function(f,a,b,interpolator) {
	$s.push("Floats::interpolate");
	var $spos = $s.length;
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == interpolator) interpolator = thx.math.Equations.linear;
	var $tmp = a + interpolator(f) * (b - a);
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.interpolatef = function(a,b,interpolator) {
	$s.push("Floats::interpolatef");
	var $spos = $s.length;
	if(b == null) b = 1.0;
	if(a == null) a = 0.0;
	if(null == interpolator) interpolator = thx.math.Equations.linear;
	var d = b - a;
	var $tmp = function(f) {
		$s.push("Floats::interpolatef@106");
		var $spos = $s.length;
		var $tmp = a + interpolator(f) * d;
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.ascending = function(a,b) {
	$s.push("Floats::ascending");
	var $spos = $s.length;
	var $tmp = a < b?-1:a > b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.descending = function(a,b) {
	$s.push("Floats::descending");
	var $spos = $s.length;
	var $tmp = a > b?-1:a < b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.format = function(v,param,params,culture) {
	$s.push("Floats::format");
	var $spos = $s.length;
	var $tmp = (Floats.formatf(param,params,culture))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.formatf = function(param,params,culture) {
	$s.push("Floats::formatf");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"D");
	var format = params.shift();
	var decimals = params.length > 0?Std.parseInt(params[0]):null;
	switch(format) {
	case "D":
		var $tmp = function(v) {
			$s.push("Floats::formatf@125");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatNumber.decimal(v,decimals,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "I":
		var $tmp = function(v) {
			$s.push("Floats::formatf@127");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatNumber["int"](v,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "C":
		var s = params.length > 1?params[1]:null;
		var $tmp = function(v) {
			$s.push("Floats::formatf@130");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatNumber.currency(v,s,decimals,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "P":
		var $tmp = function(v) {
			$s.push("Floats::formatf@132");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatNumber.percent(v,decimals,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "M":
		var $tmp = function(v) {
			$s.push("Floats::formatf@134");
			var $spos = $s.length;
			var $tmp = thx.culture.FormatNumber.permille(v,decimals,culture);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	default:
		var $tmp = (function($this) {
			var $r;
			throw new thx.error.Error("Unsupported number format: {0}",null,format,{ fileName : "Floats.hx", lineNumber : 136, className : "Floats", methodName : "formatf"});
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Floats.canParse = function(s) {
	$s.push("Floats::canParse");
	var $spos = $s.length;
	var $tmp = Floats._reparse.match(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.parse = function(s) {
	$s.push("Floats::parse");
	var $spos = $s.length;
	if(s.substr(0,1) == "+") s = s.substr(1);
	var $tmp = Std.parseFloat(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.compare = function(a,b) {
	$s.push("Floats::compare");
	var $spos = $s.length;
	var $tmp = a < b?-1:a > b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Floats.prototype.__class__ = Floats;
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
utest.TestResult.prototype.allOk = function() {
	$s.push("utest.TestResult::allOk");
	var $spos = $s.length;
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
				$s.pop();
				return false;
			}
		}
	} catch( e ) { if( e != "__break__" ) throw e; }
	$s.pop();
	return true;
	$s.pop();
}
utest.TestResult.prototype.__class__ = utest.TestResult;
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
if(!thx.collections) thx.collections = {}
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
thx.culture.core.NumberInfo = function(decimals,decimalsSeparator,groups,groupsSeparator,patternNegative,patternPositive) {
	if( decimals === $_ ) return;
	$s.push("thx.culture.core.NumberInfo::new");
	var $spos = $s.length;
	this.decimals = decimals;
	this.decimalsSeparator = decimalsSeparator;
	this.groups = groups;
	this.groupsSeparator = groupsSeparator;
	this.patternNegative = patternNegative;
	this.patternPositive = patternPositive;
	$s.pop();
}
thx.culture.core.NumberInfo.__name__ = ["thx","culture","core","NumberInfo"];
thx.culture.core.NumberInfo.prototype.decimals = null;
thx.culture.core.NumberInfo.prototype.decimalsSeparator = null;
thx.culture.core.NumberInfo.prototype.groups = null;
thx.culture.core.NumberInfo.prototype.groupsSeparator = null;
thx.culture.core.NumberInfo.prototype.patternNegative = null;
thx.culture.core.NumberInfo.prototype.patternPositive = null;
thx.culture.core.NumberInfo.prototype.__class__ = thx.culture.core.NumberInfo;
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
	if(d != null) d.innerHTML = "";
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
thx.html.HtmlHandler = function() { }
thx.html.HtmlHandler.__name__ = ["thx","html","HtmlHandler"];
thx.html.HtmlHandler.prototype.start = null;
thx.html.HtmlHandler.prototype.end = null;
thx.html.HtmlHandler.prototype.chars = null;
thx.html.HtmlHandler.prototype.comment = null;
thx.html.HtmlHandler.prototype.doctype = null;
thx.html.HtmlHandler.prototype.declaration = null;
thx.html.HtmlHandler.prototype.__class__ = thx.html.HtmlHandler;
Dynamics = function() { }
Dynamics.__name__ = ["Dynamics"];
Dynamics.format = function(v,param,params,nullstring,culture) {
	$s.push("Dynamics::format");
	var $spos = $s.length;
	var $tmp = (Dynamics.formatf(param,params,nullstring,culture))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Dynamics.formatf = function(param,params,nullstring,culture) {
	$s.push("Dynamics::formatf");
	var $spos = $s.length;
	if(nullstring == null) nullstring = "null";
	var $tmp = function(v) {
		$s.push("Dynamics::formatf@18");
		var $spos = $s.length;
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			$s.pop();
			return nullstring;
		case 1:
			var $tmp = Ints.format(v,param,params,culture);
			$s.pop();
			return $tmp;
		case 2:
			var $tmp = Floats.format(v,param,params,culture);
			$s.pop();
			return $tmp;
		case 3:
			var $tmp = Bools.format(v,param,params,culture);
			$s.pop();
			return $tmp;
		case 6:
			var c = $e[2];
			if(c == String) {
				var $tmp = Strings.formatOne(v,param,params,culture);
				$s.pop();
				return $tmp;
			} else if(c == Array) {
				var $tmp = Arrays.format(v,param,params,culture);
				$s.pop();
				return $tmp;
			} else if(c == Date) {
				var $tmp = Dates.format(v,param,params,culture);
				$s.pop();
				return $tmp;
			} else {
				var $tmp = Std.string(v);
				$s.pop();
				return $tmp;
			}
			break;
		default:
			var $tmp = (function($this) {
				var $r;
				throw new thx.error.Error("Unsupported type format: {0}",null,Type["typeof"](v),{ fileName : "Dynamics.hx", lineNumber : 40, className : "Dynamics", methodName : "formatf"});
				return $r;
			}(this));
			$s.pop();
			return $tmp;
		}
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Dynamics.interpolate = function(v,a,b,interpolator) {
	$s.push("Dynamics::interpolate");
	var $spos = $s.length;
	var $tmp = (Dynamics.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Dynamics.interpolatef = function(a,b,interpolator) {
	$s.push("Dynamics::interpolatef");
	var $spos = $s.length;
	var ta = Type["typeof"](a);
	if(!Type.enumEq(ta,Type["typeof"](b))) throw new thx.error.Error("arguments a {0} and b {0} differ in types",[ta,Type["typeof"](b)],null,{ fileName : "Dynamics.hx", lineNumber : 54, className : "Dynamics", methodName : "interpolatef"});
	var $e = (ta);
	switch( $e[1] ) {
	case 0:
		var $tmp = function(_) {
			$s.push("Dynamics::interpolatef@57");
			var $spos = $s.length;
			$s.pop();
			return null;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case 1:
		var $tmp = Ints.interpolatef(a,b,interpolator);
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = Floats.interpolatef(a,b,interpolator);
		$s.pop();
		return $tmp;
	case 3:
		var $tmp = Bools.interpolatef(a,b,interpolator);
		$s.pop();
		return $tmp;
	case 4:
		var $tmp = Dynamics.interpolatef(a,b,interpolator);
		$s.pop();
		return $tmp;
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "String":
			var $tmp = Strings.interpolatef(a,b,interpolator);
			$s.pop();
			return $tmp;
		case "Date":
			var $tmp = Dates.interpolatef(a,b,interpolator);
			$s.pop();
			return $tmp;
		default:
			throw new thx.error.Error("cannot interpolate on instances of {0}",null,name,{ fileName : "Dynamics.hx", lineNumber : 68, className : "Dynamics", methodName : "interpolatef"});
		}
		break;
	default:
		throw new thx.error.Error("cannot interpolate on functions/enums/unknown",null,null,{ fileName : "Dynamics.hx", lineNumber : 70, className : "Dynamics", methodName : "interpolatef"});
	}
	$s.pop();
}
Dynamics.toString = function(v) {
	$s.push("Dynamics::toString");
	var $spos = $s.length;
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		$s.pop();
		return "null";
	case 1:
		var $tmp = Ints.format(v);
		$s.pop();
		return $tmp;
	case 2:
		var $tmp = Floats.format(v);
		$s.pop();
		return $tmp;
	case 3:
		var $tmp = Bools.format(v);
		$s.pop();
		return $tmp;
	case 4:
		var keys = Reflect.fields(v);
		var result = [];
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			result.push(key + " : " + Dynamics.toString(Reflect.field(v,key)));
		}
		var $tmp = "{" + result.join(", ") + "}";
		$s.pop();
		return $tmp;
	case 6:
		var c = $e[2];
		var name = Type.getClassName(c);
		switch(name) {
		case "Array":
			var $tmp = Arrays.toString(v);
			$s.pop();
			return $tmp;
		case "String":
			var s = v;
			if(s.indexOf("\"") < 0) {
				var $tmp = "\"" + s + "\"";
				$s.pop();
				return $tmp;
			} else if(s.indexOf("'") < 0) {
				var $tmp = "'" + s + "'";
				$s.pop();
				return $tmp;
			} else {
				var $tmp = "\"" + StringTools.replace(s,"\"","\\\"") + "\"";
				$s.pop();
				return $tmp;
			}
			break;
		case "Date":
			var $tmp = Dates.format(v);
			$s.pop();
			return $tmp;
		default:
			var $tmp = Std.string(v);
			$s.pop();
			return $tmp;
		}
		break;
	case 7:
		var e = $e[2];
		var $tmp = Enums.toString(v);
		$s.pop();
		return $tmp;
	case 8:
		$s.pop();
		return "<unknown>";
	case 5:
		$s.pop();
		return "<function>";
	}
	$s.pop();
}
Dynamics.prototype.__class__ = Dynamics;
thx.util.Result = { __ename__ : ["thx","util","Result"], __constructs__ : ["Ok","Failure"] }
thx.util.Result.Ok = ["Ok",0];
thx.util.Result.Ok.toString = $estr;
thx.util.Result.Ok.__enum__ = thx.util.Result;
thx.util.Result.Failure = function(messages) { var $x = ["Failure",1,messages]; $x.__enum__ = thx.util.Result; $x.toString = $estr; return $x; }
thx.js.AccessText = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessText::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	$s.pop();
}
thx.js.AccessText.__name__ = ["thx","js","AccessText"];
thx.js.AccessText.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessText.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessText.prototype.get = function() {
	$s.push("thx.js.AccessText::get");
	var $spos = $s.length;
	var $tmp = this.selection.firstNode(function(node) {
		$s.push("thx.js.AccessText::get@16");
		var $spos = $s.length;
		var $tmp = node.textContent;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype.string = function(v) {
	$s.push("thx.js.AccessText::string");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,_) {
		$s.push("thx.js.AccessText::string@22");
		var $spos = $s.length;
		node.textContent = v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype.clear = function() {
	$s.push("thx.js.AccessText::clear");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessText::clear@28");
		var $spos = $s.length;
		node.textContent = "";
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype["float"] = function(v) {
	$s.push("thx.js.AccessText::float");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,_) {
		$s.push("thx.js.AccessText::float@35");
		var $spos = $s.length;
		node.textContent = "" + v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype.stringfNode = function(v) {
	$s.push("thx.js.AccessText::stringfNode");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessText::stringfNode@42");
		var $spos = $s.length;
		var x = v(node,i);
		if(null != x) node.textContent = x;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype.floatNode = function(v) {
	$s.push("thx.js.AccessText::floatNode");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessText::floatNode@52");
		var $spos = $s.length;
		var x = v(node,i);
		if(null != x) node.textContent = "" + x;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessText.prototype.__class__ = thx.js.AccessText;
thx.js.AccessDataText = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessDataText::new");
	var $spos = $s.length;
	thx.js.AccessText.call(this,selection);
	$s.pop();
}
thx.js.AccessDataText.__name__ = ["thx","js","AccessDataText"];
thx.js.AccessDataText.__super__ = thx.js.AccessText;
for(var k in thx.js.AccessText.prototype ) thx.js.AccessDataText.prototype[k] = thx.js.AccessText.prototype[k];
thx.js.AccessDataText.prototype.stringf = function(v) {
	$s.push("thx.js.AccessDataText::stringf");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataText::stringf@70");
		var $spos = $s.length;
		var x = v(Reflect.field(node,"__data__"),i);
		if(null != x) node.textContent = x;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataText.prototype.floatf = function(v) {
	$s.push("thx.js.AccessDataText::floatf");
	var $spos = $s.length;
	this.clear();
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataText::floatf@80");
		var $spos = $s.length;
		var x = v(Reflect.field(node,"__data__"),i);
		if(null != x) node.textContent = "" + x;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataText.prototype.data = function() {
	$s.push("thx.js.AccessDataText::data");
	var $spos = $s.length;
	var $tmp = this.stringf(function(d,_) {
		$s.push("thx.js.AccessDataText::data@89");
		var $spos = $s.length;
		var $tmp = "" + d;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataText.prototype.__class__ = thx.js.AccessDataText;
thx.js.TestSizzle = function(p) {
	$s.push("thx.js.TestSizzle::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestSizzle.__name__ = ["thx","js","TestSizzle"];
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
if(!thx.load) thx.load = {}
thx.load.ILoader = function() { }
thx.load.ILoader.__name__ = ["thx","load","ILoader"];
thx.load.ILoader.prototype.load = function(completeHandler,errorHandler) {
	$s.push("thx.load.ILoader::load");
	var $spos = $s.length;
	$s.pop();
}
thx.load.ILoader.prototype.__class__ = thx.load.ILoader;
thx.js.AccessTween = function(transition,tweens) {
	if( transition === $_ ) return;
	$s.push("thx.js.AccessTween::new");
	var $spos = $s.length;
	this.transition = transition;
	this.tweens = tweens;
	$s.pop();
}
thx.js.AccessTween.__name__ = ["thx","js","AccessTween"];
thx.js.AccessTween.prototype.transition = null;
thx.js.AccessTween.prototype.tweens = null;
thx.js.AccessTween.prototype.transitionColorTween = function(value) {
	$s.push("thx.js.AccessTween::transitionColorTween");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionColorTween@22");
		var $spos = $s.length;
		var $tmp = thx.color.Rgb.interpolatef(a,value);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.transitionColorTweenf = function(f) {
	$s.push("thx.js.AccessTween::transitionColorTweenf");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionColorTweenf@27");
		var $spos = $s.length;
		var $tmp = thx.color.Rgb.interpolatef(a,f(d,i));
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.transitionStringTween = function(value) {
	$s.push("thx.js.AccessTween::transitionStringTween");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionStringTween@32");
		var $spos = $s.length;
		var $tmp = Strings.interpolatef(a,value);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.transitionStringTweenf = function(f) {
	$s.push("thx.js.AccessTween::transitionStringTweenf");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionStringTweenf@37");
		var $spos = $s.length;
		var $tmp = Strings.interpolatef(a,f(d,i));
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.transitionFloatTween = function(value) {
	$s.push("thx.js.AccessTween::transitionFloatTween");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionFloatTween@42");
		var $spos = $s.length;
		var $tmp = Floats.interpolatef(a,value);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.transitionFloatTweenf = function(f) {
	$s.push("thx.js.AccessTween::transitionFloatTweenf");
	var $spos = $s.length;
	var $tmp = function(d,i,a) {
		$s.push("thx.js.AccessTween::transitionFloatTweenf@47");
		var $spos = $s.length;
		var $tmp = Floats.interpolatef(a,f(d,i));
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype._that = function() {
	$s.push("thx.js.AccessTween::_that");
	var $spos = $s.length;
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTween.prototype.__class__ = thx.js.AccessTween;
thx.js.AccessTweenStyle = function(name,transition,tweens) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessTweenStyle::new");
	var $spos = $s.length;
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
	$s.pop();
}
thx.js.AccessTweenStyle.__name__ = ["thx","js","AccessTweenStyle"];
thx.js.AccessTweenStyle.__super__ = thx.js.AccessTween;
for(var k in thx.js.AccessTween.prototype ) thx.js.AccessTweenStyle.prototype[k] = thx.js.AccessTween.prototype[k];
thx.js.AccessTweenStyle.prototype.name = null;
thx.js.AccessTweenStyle.prototype.floatfNode = function(f,priority) {
	$s.push("thx.js.AccessTweenStyle::floatfNode");
	var $spos = $s.length;
	var $tmp = this.floatTween(this.transitionFloatTweenf(f),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype["float"] = function(value,priority) {
	$s.push("thx.js.AccessTweenStyle::float");
	var $spos = $s.length;
	var $tmp = this.floatTween(this.transitionFloatTween(value),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.floatTween = function(tween,priority) {
	$s.push("thx.js.AccessTweenStyle::floatTween");
	var $spos = $s.length;
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		$s.push("thx.js.AccessTweenStyle::floatTween@38");
		var $spos = $s.length;
		var f = tween(d,i,Std.parseFloat(js.Lib.window.getComputedStyle(d,null).getPropertyValue(name)));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenStyle::floatTween@38@41");
			var $spos = $s.length;
			d.style.setProperty(name,"" + f(t),priority);
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	this.tweens.set("style." + name,styleTween);
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.stringfNode = function(f,priority) {
	$s.push("thx.js.AccessTweenStyle::stringfNode");
	var $spos = $s.length;
	var $tmp = this.stringTween(this.transitionStringTweenf(f),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.string = function(value,priority) {
	$s.push("thx.js.AccessTweenStyle::string");
	var $spos = $s.length;
	var $tmp = this.stringTween(this.transitionStringTween(value),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.stringTween = function(tween,priority) {
	$s.push("thx.js.AccessTweenStyle::stringTween");
	var $spos = $s.length;
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		$s.push("thx.js.AccessTweenStyle::stringTween@65");
		var $spos = $s.length;
		var f = tween(d,i,js.Lib.window.getComputedStyle(d,null).getPropertyValue(name));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenStyle::stringTween@65@68");
			var $spos = $s.length;
			d.style.setProperty(name,f(t),priority);
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	this.tweens.set("style." + name,styleTween);
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.colorfNode = function(f,priority) {
	$s.push("thx.js.AccessTweenStyle::colorfNode");
	var $spos = $s.length;
	var $tmp = this.colorTween(this.transitionColorTweenf(f),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.color = function(value,priority) {
	$s.push("thx.js.AccessTweenStyle::color");
	var $spos = $s.length;
	var $tmp = this.colorTween(this.transitionColorTween(thx.color.Colors.parse(value)),priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.colorTween = function(tween,priority) {
	$s.push("thx.js.AccessTweenStyle::colorTween");
	var $spos = $s.length;
	if(null == priority) priority = null;
	var name = this.name;
	var styleTween = function(d,i) {
		$s.push("thx.js.AccessTweenStyle::colorTween@92");
		var $spos = $s.length;
		var f = tween(d,i,thx.color.Colors.parse(js.Lib.window.getComputedStyle(d,null).getPropertyValue(name)));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenStyle::colorTween@92@95");
			var $spos = $s.length;
			d.style.setProperty(name,f(t).toRgbString(),priority);
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	this.tweens.set("style." + name,styleTween);
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenStyle.prototype.__class__ = thx.js.AccessTweenStyle;
thx.js.AccessDataTweenStyle = function(name,transition,tweens) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessDataTweenStyle::new");
	var $spos = $s.length;
	thx.js.AccessTweenStyle.call(this,name,transition,tweens);
	$s.pop();
}
thx.js.AccessDataTweenStyle.__name__ = ["thx","js","AccessDataTweenStyle"];
thx.js.AccessDataTweenStyle.__super__ = thx.js.AccessTweenStyle;
for(var k in thx.js.AccessTweenStyle.prototype ) thx.js.AccessDataTweenStyle.prototype[k] = thx.js.AccessTweenStyle.prototype[k];
thx.js.AccessDataTweenStyle.prototype.floatf = function(f,priority) {
	$s.push("thx.js.AccessDataTweenStyle::floatf");
	var $spos = $s.length;
	var $tmp = this.floatfNode(function(n,i) {
		$s.push("thx.js.AccessDataTweenStyle::floatf@114");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	},priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataTweenStyle.prototype.stringf = function(f,priority) {
	$s.push("thx.js.AccessDataTweenStyle::stringf");
	var $spos = $s.length;
	var $tmp = this.stringfNode(function(n,i) {
		$s.push("thx.js.AccessDataTweenStyle::stringf@119");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	},priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataTweenStyle.prototype.colorf = function(f,priority) {
	$s.push("thx.js.AccessDataTweenStyle::colorf");
	var $spos = $s.length;
	var $tmp = this.colorfNode(function(n,i) {
		$s.push("thx.js.AccessDataTweenStyle::colorf@124");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	},priority);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataTweenStyle.prototype.__class__ = thx.js.AccessDataTweenStyle;
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
if(!thx.json) thx.json = {}
thx.json.Json = function() { }
thx.json.Json.__name__ = ["thx","json","Json"];
thx.json.Json.encode = function(value) {
	$s.push("thx.json.Json::encode");
	var $spos = $s.length;
	var handler = new thx.json.JsonEncoder();
	new thx.data.ValueEncoder(handler).encode(value);
	var $tmp = handler.encodedString;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.json.Json.decode = function(value) {
	$s.push("thx.json.Json::decode");
	var $spos = $s.length;
	var handler = new thx.data.ValueHandler();
	var r = new thx.json.JsonDecoder(handler).decode(value);
	var $tmp = handler.value;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.json.Json.prototype.__class__ = thx.json.Json;
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
utest.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	$s.push("utest.Assert::floatEquals");
	var $spos = $s.length;
	if(msg == null) msg = "expected " + utest.Assert.q(expected) + " but was " + utest.Assert.q(value);
	var $tmp = utest.Assert.isTrue(utest.Assert._floatEquals(expected,value,approx),msg,pos);
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert._floatEquals = function(expected,value,approx) {
	$s.push("utest.Assert::_floatEquals");
	var $spos = $s.length;
	if(Math.isNaN(expected)) {
		var $tmp = Math.isNaN(value);
		$s.pop();
		return $tmp;
	} else if(Math.isNaN(value)) {
		$s.pop();
		return false;
	} else if(!Math.isFinite(expected) && !Math.isFinite(value)) {
		var $tmp = expected > 0 == value > 0;
		$s.pop();
		return $tmp;
	}
	if(null == approx) approx = 1e-5;
	var $tmp = Math.abs(value - expected) < approx;
	$s.pop();
	return $tmp;
	$s.pop();
}
utest.Assert.getTypeName = function(v) {
	$s.push("utest.Assert::getTypeName");
	var $spos = $s.length;
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		$s.pop();
		return "[null]";
	case 1:
		$s.pop();
		return "Int";
	case 2:
		$s.pop();
		return "Float";
	case 3:
		$s.pop();
		return "Bool";
	case 5:
		$s.pop();
		return "function";
	case 6:
		var c = $e[2];
		var $tmp = Type.getClassName(c);
		$s.pop();
		return $tmp;
	case 7:
		var e = $e[2];
		var $tmp = Type.getEnumName(e);
		$s.pop();
		return $tmp;
	case 4:
		$s.pop();
		return "Object";
	case 8:
		$s.pop();
		return "Unknown";
	}
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
	var isanonym = texpected == "Object";
	if(texpected != tvalue) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == ""?"":" for field " + status.path);
		$s.pop();
		return false;
	}
	var $e = (Type["typeof"](expected));
	switch( $e[1] ) {
	case 2:
		var $tmp = utest.Assert._floatEquals(expected,value);
		$s.pop();
		return $tmp;
	case 0:
	case 1:
	case 3:
		if(expected != value) {
			status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		$s.pop();
		return true;
	case 5:
		if(!Reflect.compareMethods(expected,value)) {
			status.error = "expected same function reference" + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		$s.pop();
		return true;
	case 6:
		var c = $e[2];
		var cexpected = Type.getClassName(c);
		var cvalue = Type.getClassName(Type.getClass(value));
		if(cexpected != cvalue) {
			status.error = "expected instance of " + utest.Assert.q(cexpected) + " but it is " + utest.Assert.q(cvalue) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
		if(Std["is"](expected,String) && expected != value) {
			status.error = "expected '" + expected + "' but it is '" + value + "'";
			$s.pop();
			return false;
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
		if(Std["is"](expected,Date)) {
			if(expected.getTime() != value.getTime()) {
				status.error = "expected " + utest.Assert.q(expected) + " but it is " + utest.Assert.q(value) + (status.path == ""?"":" for field " + status.path);
				$s.pop();
				return false;
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
					$s.push("utest.Assert::sameAs@285");
					var $spos = $s.length;
					var $tmp = expected.keys();
					$s.pop();
					return $tmp;
					$s.pop();
				}});
				var vkeys = Lambda.array({ iterator : function() {
					$s.push("utest.Assert::sameAs@286");
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
		if(utest.Assert.isIterator(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					$s.push("utest.Assert::sameAs@307");
					var $spos = $s.length;
					$s.pop();
					return expected;
					$s.pop();
				}});
				var vvalues = Lambda.array({ iterator : function() {
					$s.push("utest.Assert::sameAs@308");
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
		if(utest.Assert.isIterable(expected,false)) {
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
				if(!utest.Assert.sameAs(e,v,status)) {
					$s.pop();
					return false;
				}
			}
		}
		$s.pop();
		return true;
	case 7:
		var e = $e[2];
		var eexpected = Type.getEnumName(e);
		var evalue = Type.getEnumName(Type.getEnum(value));
		if(eexpected != evalue) {
			status.error = "expected enumeration of " + utest.Assert.q(eexpected) + " but it is " + utest.Assert.q(evalue) + (status.path == ""?"":" for field " + status.path);
			$s.pop();
			return false;
		}
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
			if(tfields.length > 0) {
				status.error = "the tested object has extra field(s) (" + tfields.join(", ") + ") not included in the expected ones";
				$s.pop();
				return false;
			}
		}
		if(utest.Assert.isIterator(expected,true)) {
			if(!utest.Assert.isIterator(value,true)) {
				status.error = "expected Iterable but it is not " + (status.path == ""?"":" for field " + status.path);
				$s.pop();
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					$s.push("utest.Assert::sameAs@423");
					var $spos = $s.length;
					$s.pop();
					return expected;
					$s.pop();
				}});
				var vvalues = Lambda.array({ iterator : function() {
					$s.push("utest.Assert::sameAs@424");
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
		if(utest.Assert.isIterable(expected,true)) {
			if(!utest.Assert.isIterable(value,true)) {
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
		$s.pop();
		return true;
	case 8:
		var $tmp = (function($this) {
			var $r;
			throw "Unable to compare two unknown types";
			return $r;
		}(this));
		$s.pop();
		return $tmp;
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
	} else {
		var $tmp = Std.string(v);
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
utest.Assert.raises = function(method,type,msgNotThrown,msgWrongType,pos) {
	$s.push("utest.Assert::raises");
	var $spos = $s.length;
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		if(null == msgNotThrown) msgNotThrown = "exception of type " + name + " not raised";
		utest.Assert.fail(msgNotThrown,pos);
	} catch( ex ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		if(null == msgWrongType) msgWrongType = "expected throw of type " + name + " but was " + ex;
		utest.Assert.isTrue(Std["is"](ex,type),msgWrongType,pos);
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
	if(Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do not contain " + match:msg,pos);
	$s.pop();
}
utest.Assert.notContains = function(match,values,msg,pos) {
	$s.push("utest.Assert::notContains");
	var $spos = $s.length;
	if(!Lambda.has(values,match)) utest.Assert.isTrue(true,msg,pos); else utest.Assert.fail(msg == null?"values " + utest.Assert.q(values) + " do contain " + match:msg,pos);
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
		utest.Assert.fail(msg == null?"null argument value":msg,pos);
		$s.pop();
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
			$s.pop();
			return;
		}
		p = p2 + s.length;
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
		$s.push("utest.Assert::createAsync@664");
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
		$s.push("utest.Assert::createEvent@675");
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
Strings = function() { }
Strings.__name__ = ["Strings"];
Strings.format = function(pattern,values,nullstring,culture) {
	$s.push("Strings::format");
	var $spos = $s.length;
	if(nullstring == null) nullstring = "null";
	var $tmp = (Strings.formatf(pattern,nullstring,culture))(values);
	$s.pop();
	return $tmp;
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
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.formatf = function(pattern,nullstring,culture) {
	$s.push("Strings::formatf");
	var $spos = $s.length;
	if(nullstring == null) nullstring = "null";
	var buf = [];
	while(true) {
		if(!Strings._reFormat.match(pattern)) {
			buf.push((function() {
				$s.push("Strings::formatf@142");
				var $spos = $s.length;
				var $tmp = function(_) {
					$s.push("Strings::formatf@142@142");
					var $spos = $s.length;
					$s.pop();
					return pattern;
					$s.pop();
				};
				$s.pop();
				return $tmp;
				$s.pop();
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
			$s.push("Strings::formatf@160");
			var $spos = $s.length;
			var $tmp = function(_) {
				$s.push("Strings::formatf@160@160");
				var $spos = $s.length;
				var $tmp = left[0];
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})(left));
		var df = [Dynamics.formatf(format,params,nullstring,culture)];
		buf.push(((function() {
			$s.push("Strings::formatf@162");
			var $spos = $s.length;
			var $tmp = function(f,a1) {
				$s.push("Strings::formatf@162@162");
				var $spos = $s.length;
				var $tmp = (function() {
					$s.push("Strings::formatf@162@162@162");
					var $spos = $s.length;
					var $tmp = function(a2) {
						$s.push("Strings::formatf@162@162@162@162");
						var $spos = $s.length;
						var $tmp = f(a1,a2);
						$s.pop();
						return $tmp;
						$s.pop();
					};
					$s.pop();
					return $tmp;
					$s.pop();
				})();
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})())((function(df) {
			$s.push("Strings::formatf@162");
			var $spos = $s.length;
			var $tmp = function(i,v) {
				$s.push("Strings::formatf@162@162");
				var $spos = $s.length;
				var $tmp = df[0](v[i]);
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})(df),pos));
		pattern = Strings._reFormat.matchedRight();
	}
	var $tmp = function(values) {
		$s.push("Strings::formatf@165");
		var $spos = $s.length;
		if(null == values) values = [];
		var $tmp = buf.map(function(df,_) {
			$s.push("Strings::formatf@165@169");
			var $spos = $s.length;
			var $tmp = df(values);
			$s.pop();
			return $tmp;
			$s.pop();
		}).join("");
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.formatOne = function(v,param,params,culture) {
	$s.push("Strings::formatOne");
	var $spos = $s.length;
	var $tmp = (Strings.formatOnef(param,params,culture))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.formatOnef = function(param,params,culture) {
	$s.push("Strings::formatOnef");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"S");
	var format = params.shift();
	switch(format) {
	case "S":
		var $tmp = function(v) {
			$s.push("Strings::formatOnef@185");
			var $spos = $s.length;
			$s.pop();
			return v;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "T":
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var elipsis = params.length < 2?"...":params[1];
		var $tmp = function(v) {
			$s.push("Strings::formatOnef@189");
			var $spos = $s.length;
			if(v.length > len) {
				var $tmp = v.substr(0,len) + elipsis;
				$s.pop();
				return $tmp;
			} else {
				$s.pop();
				return v;
			}
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "PR":
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var pad = params.length < 2?" ":params[1];
		var $tmp = function(v) {
			$s.push("Strings::formatOnef@201");
			var $spos = $s.length;
			var $tmp = StringTools.rpad(v,pad,len);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "PL":
		var len = params.length < 1?10:Std.parseInt(params[0]);
		var pad = params.length < 2?" ":params[1];
		var $tmp = function(v) {
			$s.push("Strings::formatOnef@205");
			var $spos = $s.length;
			var $tmp = StringTools.lpad(v,pad,len);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	default:
		var $tmp = (function($this) {
			var $r;
			throw "Unsupported string format: " + format;
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
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
	var $tmp = value == null || value == "";
	$s.pop();
	return $tmp;
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
	var $tmp = Strings.__ucwordsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),Strings.__upperMatch);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.ucwordsws = function(value) {
	$s.push("Strings::ucwordsws");
	var $spos = $s.length;
	var $tmp = Strings.__ucwordswsPattern.customReplace(value == null?null:value.charAt(0).toUpperCase() + value.substr(1),Strings.__upperMatch);
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
Strings.ascending = function(a,b) {
	$s.push("Strings::ascending");
	var $spos = $s.length;
	var $tmp = a < b?-1:a > b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.descending = function(a,b) {
	$s.push("Strings::descending");
	var $spos = $s.length;
	var $tmp = a > b?-1:a < b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.interpolate = function(v,a,b,interpolator) {
	$s.push("Strings::interpolate");
	var $spos = $s.length;
	var $tmp = (Strings.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.interpolatef = function(a,b,interpolator) {
	$s.push("Strings::interpolatef");
	var $spos = $s.length;
	var extract = function(value,s,f) {
		$s.push("Strings::interpolatef@453");
		var $spos = $s.length;
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
		$s.pop();
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
					$s.push("Strings::interpolatef@491");
					var $spos = $s.length;
					var $tmp = function(_) {
						$s.push("Strings::interpolatef@491@491");
						var $spos = $s.length;
						var $tmp = s[0];
						$s.pop();
						return $tmp;
						$s.pop();
					};
					$s.pop();
					return $tmp;
					$s.pop();
				})(s));
			} else {
				var f = [Floats.interpolatef(fa[i],fb[i],interpolator)];
				functions.push((function(f) {
					$s.push("Strings::interpolatef@494");
					var $spos = $s.length;
					var $tmp = function(t) {
						$s.push("Strings::interpolatef@494@494");
						var $spos = $s.length;
						var $tmp = "" + f[0](t);
						$s.pop();
						return $tmp;
						$s.pop();
					};
					$s.pop();
					return $tmp;
					$s.pop();
				})(f));
			}
		} else {
			var s = [sa[i]];
			functions.push((function(s) {
				$s.push("Strings::interpolatef@498");
				var $spos = $s.length;
				var $tmp = function(_) {
					$s.push("Strings::interpolatef@498@498");
					var $spos = $s.length;
					var $tmp = s[0];
					$s.pop();
					return $tmp;
					$s.pop();
				};
				$s.pop();
				return $tmp;
				$s.pop();
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
		$s.push("Strings::interpolatef@512");
		var $spos = $s.length;
		$s.pop();
		return rest;
		$s.pop();
	});
	var $tmp = function(t) {
		$s.push("Strings::interpolatef@513");
		var $spos = $s.length;
		var $tmp = functions.map(function(f,_) {
			$s.push("Strings::interpolatef@513@514");
			var $spos = $s.length;
			var $tmp = f(t);
			$s.pop();
			return $tmp;
			$s.pop();
		}).join("");
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Strings.prototype.__class__ = Strings;
thx.json.JsonDecoder = function(handler,tabsize) {
	if( handler === $_ ) return;
	$s.push("thx.json.JsonDecoder::new");
	var $spos = $s.length;
	if(tabsize == null) tabsize = 4;
	this.handler = handler;
	this.tabsize = tabsize;
	$s.pop();
}
thx.json.JsonDecoder.__name__ = ["thx","json","JsonDecoder"];
thx.json.JsonDecoder.prototype.col = null;
thx.json.JsonDecoder.prototype.line = null;
thx.json.JsonDecoder.prototype.tabsize = null;
thx.json.JsonDecoder.prototype.rest = null;
thx.json.JsonDecoder.prototype["char"] = null;
thx.json.JsonDecoder.prototype.handler = null;
thx.json.JsonDecoder.prototype.decode = function(s) {
	$s.push("thx.json.JsonDecoder::decode");
	var $spos = $s.length;
	this.col = 0;
	this.line = 0;
	this.rest = s;
	this["char"] = null;
	this.ignoreWhiteSpace();
	var p = null;
	this.handler.start();
	try {
		p = this.parse();
	} catch( e ) {
		if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			this.error("unexpected end of stream");
		} else throw(e);
	}
	this.ignoreWhiteSpace();
	if(this.rest.length > 0) this.error("the stream contains unrecognized characters at its end");
	this.handler.end();
	$s.pop();
}
thx.json.JsonDecoder.prototype.ignoreWhiteSpace = function() {
	$s.push("thx.json.JsonDecoder::ignoreWhiteSpace");
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
thx.json.JsonDecoder.prototype.parse = function() {
	$s.push("thx.json.JsonDecoder::parse");
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
thx.json.JsonDecoder.prototype.readChar = function() {
	$s.push("thx.json.JsonDecoder::readChar");
	var $spos = $s.length;
	if(null == this["char"]) {
		if(this.rest.length == 0) throw thx.json._JsonDecoder.StreamError.Eof;
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
thx.json.JsonDecoder.prototype.expect = function(word) {
	$s.push("thx.json.JsonDecoder::expect");
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
thx.json.JsonDecoder.prototype.parseObject = function() {
	$s.push("thx.json.JsonDecoder::parseObject");
	var $spos = $s.length;
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
	$s.pop();
}
thx.json.JsonDecoder.prototype.parseArray = function() {
	$s.push("thx.json.JsonDecoder::parseArray");
	var $spos = $s.length;
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
	$s.pop();
}
thx.json.JsonDecoder.prototype.parseValue = function() {
	$s.push("thx.json.JsonDecoder::parseValue");
	var $spos = $s.length;
	if(this.expect("true")) this.handler.bool(true); else if(this.expect("false")) this.handler.bool(false); else if(this.expect("null")) this.handler["null"](); else this.parseFloat();
	$s.pop();
}
thx.json.JsonDecoder.prototype.parseString = function() {
	$s.push("thx.json.JsonDecoder::parseString");
	var $spos = $s.length;
	this.handler.string(this._parseString());
	$s.pop();
}
thx.json.JsonDecoder.prototype._parseString = function() {
	$s.push("thx.json.JsonDecoder::_parseString");
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
thx.json.JsonDecoder.prototype.parseHexa = function() {
	$s.push("thx.json.JsonDecoder::parseHexa");
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
	this.handler["int"](Std.parseInt("0x" + v.join("")));
	var $tmp = Std.parseInt("0x" + v.join(""));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.json.JsonDecoder.prototype.parseFloat = function() {
	$s.push("thx.json.JsonDecoder::parseFloat");
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
		if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			this.handler["int"](Std.parseInt(v));
			$s.pop();
			return;
		} else throw(e);
	}
	try {
		if(this.expect(".")) v += "." + this.parseDigits(1); else {
			this.handler["int"](Std.parseInt(v));
			$s.pop();
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
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			this.handler["float"](Std.parseFloat(v));
			$s.pop();
			return;
		} else throw(e);
	}
	this.handler["float"](Std.parseFloat(v));
	$s.pop();
}
thx.json.JsonDecoder.prototype.parseDigits = function(atleast) {
	$s.push("thx.json.JsonDecoder::parseDigits");
	var $spos = $s.length;
	if(atleast == null) atleast = 0;
	var buf = "";
	while(true) {
		var c = null;
		try {
			c = this.readChar();
		} catch( e ) {
			if( js.Boot.__instanceof(e,thx.json._JsonDecoder.StreamError) ) {
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				if(buf.length < atleast) this.error("expected digit");
				$s.pop();
				return buf;
			} else throw(e);
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
thx.json.JsonDecoder.prototype.error = function(msg) {
	$s.push("thx.json.JsonDecoder::error");
	var $spos = $s.length;
	var context = this.rest.length == 0?"":"\nrest: " + (null != this["char"]?this["char"]:"") + this.rest + "...";
	throw new thx.error.Error("error at L {0} C {1}: {2}{3}",[this.line,this.col,msg,context],null,{ fileName : "JsonDecoder.hx", lineNumber : 358, className : "thx.json.JsonDecoder", methodName : "error"});
	$s.pop();
}
thx.json.JsonDecoder.prototype.__class__ = thx.json.JsonDecoder;
if(!thx.json._JsonDecoder) thx.json._JsonDecoder = {}
thx.json._JsonDecoder.StreamError = { __ename__ : ["thx","json","_JsonDecoder","StreamError"], __constructs__ : ["Eof"] }
thx.json._JsonDecoder.StreamError.Eof = ["Eof",0];
thx.json._JsonDecoder.StreamError.Eof.toString = $estr;
thx.json._JsonDecoder.StreamError.Eof.__enum__ = thx.json._JsonDecoder.StreamError;
thx.cultures.EnUS = function(p) {
	if( p === $_ ) return;
	$s.push("thx.cultures.EnUS::new");
	var $spos = $s.length;
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
	$s.pop();
}
thx.cultures.EnUS.__name__ = ["thx","cultures","EnUS"];
thx.cultures.EnUS.__super__ = thx.culture.Culture;
for(var k in thx.culture.Culture.prototype ) thx.cultures.EnUS.prototype[k] = thx.culture.Culture.prototype[k];
thx.cultures.EnUS.culture = null;
thx.cultures.EnUS.getCulture = function() {
	$s.push("thx.cultures.EnUS::getCulture");
	var $spos = $s.length;
	if(null == thx.cultures.EnUS.culture) thx.cultures.EnUS.culture = new thx.cultures.EnUS();
	var $tmp = thx.cultures.EnUS.culture;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.cultures.EnUS.prototype.__class__ = thx.cultures.EnUS;
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
thx.math.scale.LinearString = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.LinearString::new");
	var $spos = $s.length;
	this.x0 = 0;
	this.x1 = 1;
	this.y0 = "";
	this.y1 = "";
	this.kx = 1;
	this.f = Strings.interpolatef;
	this.i = this.f(this.y0,this.y1,null);
	$s.pop();
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
	$s.push("thx.math.scale.LinearString::scale");
	var $spos = $s.length;
	var $tmp = this.i((x - this.x0) * this.kx);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.getDomain = function() {
	$s.push("thx.math.scale.LinearString::getDomain");
	var $spos = $s.length;
	var $tmp = [this.x0,this.x1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.domain = function(x0,x1) {
	$s.push("thx.math.scale.LinearString::domain");
	var $spos = $s.length;
	this.x0 = x0;
	this.x1 = x1;
	this.kx = 1 / (x1 - x0);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.LinearString.prototype.getRange = function() {
	$s.push("thx.math.scale.LinearString::getRange");
	var $spos = $s.length;
	var $tmp = [this.y0,this.y1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.range = function(y0,y1) {
	$s.push("thx.math.scale.LinearString::range");
	var $spos = $s.length;
	this.y0 = y0;
	this.y1 = y1;
	this.i = this.f(y0,y1,null);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.LinearString.prototype.getInterpolate = function() {
	$s.push("thx.math.scale.LinearString::getInterpolate");
	var $spos = $s.length;
	var $tmp = this.f;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.interpolatef = function(x) {
	$s.push("thx.math.scale.LinearString::interpolatef");
	var $spos = $s.length;
	this.i = (this.f = x)(this.y0,this.y1,null);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.LinearString.prototype.tickRange = function(m) {
	$s.push("thx.math.scale.LinearString::tickRange");
	var $spos = $s.length;
	var start = Math.min(this.x0,this.x1), stop = Math.max(this.x0,this.x1), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / m) / 2.302585092994046)), err = m / (span / step);
	if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= -75) step *= 2;
	var $tmp = { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.ticks = function(m) {
	$s.push("thx.math.scale.LinearString::ticks");
	var $spos = $s.length;
	var range = this.tickRange(m);
	var $tmp = Floats.range(range.start,range.stop,range.step);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.tickFormat = function(m) {
	$s.push("thx.math.scale.LinearString::tickFormat");
	var $spos = $s.length;
	var n = Math.max(0,-Math.floor(Math.log(this.tickRange(m).step) / 2.302585092994046 + .01));
	var $tmp = Floats.formatf("D:" + n);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.LinearString.prototype.__class__ = thx.math.scale.LinearString;
thx.csv.CsvDecoder = function(handler,delimiter,trimvalues,emptytonull) {
	if( handler === $_ ) return;
	$s.push("thx.csv.CsvDecoder::new");
	var $spos = $s.length;
	if(emptytonull == null) emptytonull = false;
	if(trimvalues == null) trimvalues = false;
	if(delimiter == null) delimiter = ",";
	this.handler = handler;
	this.delimiter = delimiter;
	this.trimvalues = trimvalues;
	this.emptytonull = emptytonull;
	this._end = new EReg("(" + thx.text.ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|$)","");
	$s.pop();
}
thx.csv.CsvDecoder.__name__ = ["thx","csv","CsvDecoder"];
thx.csv.CsvDecoder.prototype.delimiter = null;
thx.csv.CsvDecoder.prototype.trimvalues = null;
thx.csv.CsvDecoder.prototype.emptytonull = null;
thx.csv.CsvDecoder.prototype.handler = null;
thx.csv.CsvDecoder.prototype._s = null;
thx.csv.CsvDecoder.prototype._end = null;
thx.csv.CsvDecoder.prototype.decode = function(s) {
	$s.push("thx.csv.CsvDecoder::decode");
	var $spos = $s.length;
	this._s = s;
	this.handler.start();
	this.handler.startArray();
	while(this._s.length > 0) this.parseLine();
	this.handler.endArray();
	this.handler.end();
	$s.pop();
}
thx.csv.CsvDecoder.prototype.parseLine = function() {
	$s.push("thx.csv.CsvDecoder::parseLine");
	var $spos = $s.length;
	this.handler.startItem();
	this.handler.startArray();
	while(this.parseValue()) {
	}
	this.handler.endArray();
	this.handler.endItem();
	$s.pop();
}
thx.csv.CsvDecoder.prototype.parseValue = function() {
	$s.push("thx.csv.CsvDecoder::parseValue");
	var $spos = $s.length;
	if(this._s.substr(0,1) == "\"") {
		var pos = this._s.indexOf("\"",1);
		while(this._s.substr(pos + 1,1) == "\"") pos = this._s.indexOf("\"",pos + 2);
		var v = this._s.substr(1,pos - 1);
		this._s = this._s.substr(pos + 1);
		this.typeToken(StringTools.replace(v,"\"\"","\""),false);
		if(!this._end.match(this._s)) throw new thx.error.Error("invalid string value '{0}'",null,this._s,{ fileName : "CsvDecoder.hx", lineNumber : 61, className : "thx.csv.CsvDecoder", methodName : "parseValue"});
		this._s = this._end.matchedRight();
		var $tmp = this._end.matched(0) == this.delimiter;
		$s.pop();
		return $tmp;
	}
	if(!this._end.match(this._s)) throw new thx.error.Error("invalid string value '{0}'",null,this._s,{ fileName : "CsvDecoder.hx", lineNumber : 68, className : "thx.csv.CsvDecoder", methodName : "parseValue"});
	this._s = this._end.matchedRight();
	this.typeToken(this._end.matchedLeft(),this.trimvalues);
	if(this._end.matched(0) == this.delimiter) {
		$s.pop();
		return true;
	} else {
		this._s = StringTools.ltrim(this._s);
		$s.pop();
		return false;
	}
	$s.pop();
}
thx.csv.CsvDecoder.prototype.typeToken = function(s,trim) {
	$s.push("thx.csv.CsvDecoder::typeToken");
	var $spos = $s.length;
	if(trim) s = StringTools.trim(s);
	this.handler.startItem();
	if(Ints.canParse(s)) this.handler["int"](Ints.parse(s)); else if(Floats.canParse(s)) this.handler["float"](Floats.parse(s)); else if(Bools.canParse(s)) this.handler.bool(Bools.parse(s)); else if(Dates.canParse(s)) this.handler.date(Dates.parse(s)); else if(this.emptytonull && "" == s) this.handler["null"](); else this.handler.string(s);
	this.handler.endItem();
	$s.pop();
}
thx.csv.CsvDecoder.prototype.__class__ = thx.csv.CsvDecoder;
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
thx.math.scale.Linear = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Linear::new");
	var $spos = $s.length;
	thx.math.scale.NumericScale.call(this);
	this.m = 10;
	$s.pop();
}
thx.math.scale.Linear.__name__ = ["thx","math","scale","Linear"];
thx.math.scale.Linear.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Linear.prototype[k] = thx.math.scale.NumericScale.prototype[k];
thx.math.scale.Linear.prototype.m = null;
thx.math.scale.Linear.prototype.getModulo = function() {
	$s.push("thx.math.scale.Linear::getModulo");
	var $spos = $s.length;
	var $tmp = this.m;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Linear.prototype.modulo = function(m) {
	$s.push("thx.math.scale.Linear::modulo");
	var $spos = $s.length;
	this.m = m;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Linear.prototype.tickRange = function() {
	$s.push("thx.math.scale.Linear::tickRange");
	var $spos = $s.length;
	var start = Math.min(this.x0,this.x1), stop = Math.max(this.x0,this.x1), span = stop - start, step = Math.pow(10,Math.floor(Math.log(span / this.m) / 2.302585092994046)), err = this.m / (span / step);
	if(err <= .15) step *= 10; else if(err <= .35) step *= 5; else if(err <= .75) step *= 2;
	var $tmp = { start : Math.ceil(start / step) * step, stop : Math.floor(stop / step) * step + step * .5, step : step};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Linear.prototype.ticks = function() {
	$s.push("thx.math.scale.Linear::ticks");
	var $spos = $s.length;
	var range = this.tickRange();
	var $tmp = Floats.range(range.start,range.stop,range.step);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Linear.prototype.tickFormat = function(v,i) {
	$s.push("thx.math.scale.Linear::tickFormat");
	var $spos = $s.length;
	var n = Math.max(0,-Math.floor(Math.log(this.tickRange().step) / 2.302585092994046 + .01));
	var $tmp = Floats.format(v,"D:" + n);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Linear.prototype.__class__ = thx.math.scale.Linear;
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
	var hash = DynamicsT.toHash({ name : "haxe", author : "nicolas"});
	utest.Assert.equals("haxe",hash.get("name"),null,{ fileName : "TestHashes.hx", lineNumber : 32, className : "TestHashes", methodName : "testCreate"});
	utest.Assert.equals("nicolas",hash.get("author"),null,{ fileName : "TestHashes.hx", lineNumber : 33, className : "TestHashes", methodName : "testCreate"});
	$s.pop();
}
TestHashes.prototype.__class__ = TestHashes;
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
thx.svg.Shape = function() { }
thx.svg.Shape.__name__ = ["thx","svg","Shape"];
thx.svg.Shape.prototype.apply = function(o,d) {
	$s.push("thx.svg.Shape::apply");
	var $spos = $s.length;
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
	$s.pop();
}
thx.svg.Shape.prototype.shape = function(d,i) {
	$s.push("thx.svg.Shape::shape");
	var $spos = $s.length;
	this.apply(this,d);
	$s.pop();
	return "";
	$s.pop();
}
thx.svg.Shape.prototype.__class__ = thx.svg.Shape;
thx.svg.Arc = function(p) {
	if( p === $_ ) return;
	$s.push("thx.svg.Arc::new");
	var $spos = $s.length;
	this.r0 = 0;
	this.r1 = 1;
	this.a0 = 0;
	this.a1 = Math.PI;
	$s.pop();
}
thx.svg.Arc.__name__ = ["thx","svg","Arc"];
thx.svg.Arc.__super__ = thx.svg.Shape;
for(var k in thx.svg.Shape.prototype ) thx.svg.Arc.prototype[k] = thx.svg.Shape.prototype[k];
thx.svg.Arc.prototype.r0 = null;
thx.svg.Arc.prototype.r1 = null;
thx.svg.Arc.prototype.a0 = null;
thx.svg.Arc.prototype.a1 = null;
thx.svg.Arc.prototype.getInnerRadius = function() {
	$s.push("thx.svg.Arc::getInnerRadius");
	var $spos = $s.length;
	var $tmp = this.r0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.innerRadius = function(v) {
	$s.push("thx.svg.Arc::innerRadius");
	var $spos = $s.length;
	this.r0 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Arc.prototype.getOuterRadius = function() {
	$s.push("thx.svg.Arc::getOuterRadius");
	var $spos = $s.length;
	var $tmp = this.r0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.outerRadius = function(v) {
	$s.push("thx.svg.Arc::outerRadius");
	var $spos = $s.length;
	this.r1 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Arc.prototype.getStartAngle = function() {
	$s.push("thx.svg.Arc::getStartAngle");
	var $spos = $s.length;
	var $tmp = this.r0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.startAngle = function(v) {
	$s.push("thx.svg.Arc::startAngle");
	var $spos = $s.length;
	this.a0 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Arc.prototype.getEndAngle = function() {
	$s.push("thx.svg.Arc::getEndAngle");
	var $spos = $s.length;
	var $tmp = this.r0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.endAngle = function(v) {
	$s.push("thx.svg.Arc::endAngle");
	var $spos = $s.length;
	this.a1 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Arc.prototype.shape = function(d,i) {
	$s.push("thx.svg.Arc::shape");
	var $spos = $s.length;
	thx.svg.Shape.prototype.shape.call(this,d,i);
	var a0 = this.a0 + thx.svg.LineInternals.arcOffset, a1 = this.a1 + thx.svg.LineInternals.arcOffset, da = a1 - a0, df = da < Math.PI?"0":"1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
	var $tmp = da >= thx.svg.LineInternals.arcMax?this.r0 != 0?"M0," + this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + -this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + this.r1 + "M0," + this.r0 + "A" + this.r0 + "," + this.r0 + " 0 1,1 0," + -this.r0 + "A" + this.r0 + "," + this.r0 + " 0 1,1 0," + this.r0 + "Z":"M0," + this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + -this.r1 + "A" + this.r1 + "," + this.r1 + " 0 1,1 0," + this.r1 + "Z":this.r0 != 0?"M" + this.r1 * c0 + "," + this.r1 * s0 + "A" + this.r1 + "," + this.r1 + " 0 " + df + ",1 " + this.r1 * c1 + "," + this.r1 * s1 + "L" + this.r0 * c1 + "," + this.r0 * s1 + "A" + this.r0 + "," + this.r0 + " 0 " + df + ",0 " + this.r0 * c0 + "," + this.r0 * s0 + "Z":"M" + this.r1 * c0 + "," + this.r1 * s0 + "A" + this.r1 + "," + this.r1 + " 0 " + df + ",1 " + this.r1 * c1 + "," + this.r1 * s1 + "L0,0" + "Z";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.centroid = function() {
	$s.push("thx.svg.Arc::centroid");
	var $spos = $s.length;
	var r = (this.r0 + this.r1) / 2, a = (this.a0 + this.a1) / 2 + thx.svg.LineInternals.arcOffset;
	var $tmp = [Math.cos(a) * r,Math.sin(a) * r];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Arc.prototype.__class__ = thx.svg.Arc;
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
if(!thx.data) thx.data = {}
thx.data.IDataHandler = function() { }
thx.data.IDataHandler.__name__ = ["thx","data","IDataHandler"];
thx.data.IDataHandler.prototype.start = null;
thx.data.IDataHandler.prototype.end = null;
thx.data.IDataHandler.prototype.startObject = null;
thx.data.IDataHandler.prototype.startField = null;
thx.data.IDataHandler.prototype.endField = null;
thx.data.IDataHandler.prototype.endObject = null;
thx.data.IDataHandler.prototype.startArray = null;
thx.data.IDataHandler.prototype.startItem = null;
thx.data.IDataHandler.prototype.endItem = null;
thx.data.IDataHandler.prototype.endArray = null;
thx.data.IDataHandler.prototype.date = null;
thx.data.IDataHandler.prototype.string = null;
thx.data.IDataHandler.prototype["int"] = null;
thx.data.IDataHandler.prototype["float"] = null;
thx.data.IDataHandler.prototype["null"] = null;
thx.data.IDataHandler.prototype.bool = null;
thx.data.IDataHandler.prototype.comment = null;
thx.data.IDataHandler.prototype.__class__ = thx.data.IDataHandler;
thx.csv.CsvEncoder = function(delimiter,nulltoempty,newline) {
	if( delimiter === $_ ) return;
	$s.push("thx.csv.CsvEncoder::new");
	var $spos = $s.length;
	if(newline == null) newline = "\n";
	if(nulltoempty == null) nulltoempty = true;
	if(delimiter == null) delimiter = ",";
	this.delimiter = delimiter;
	this.nulltoempty = nulltoempty;
	this.newline = newline;
	this.re = new EReg("(" + thx.text.ERegs.escapeERegChars(delimiter) + "|\n\r|\n|\r|\")","");
	$s.pop();
}
thx.csv.CsvEncoder.__name__ = ["thx","csv","CsvEncoder"];
thx.csv.CsvEncoder.prototype.delimiter = null;
thx.csv.CsvEncoder.prototype.nulltoempty = null;
thx.csv.CsvEncoder.prototype.newline = null;
thx.csv.CsvEncoder.prototype.encodedString = null;
thx.csv.CsvEncoder.prototype.re = null;
thx.csv.CsvEncoder.prototype.buf = null;
thx.csv.CsvEncoder.prototype.lineContext = null;
thx.csv.CsvEncoder.prototype.valueContext = null;
thx.csv.CsvEncoder.prototype.firstLine = null;
thx.csv.CsvEncoder.prototype.firstValue = null;
thx.csv.CsvEncoder.prototype.start = function() {
	$s.push("thx.csv.CsvEncoder::start");
	var $spos = $s.length;
	this.buf = new StringBuf();
	this.firstLine = true;
	this.lineContext = true;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.end = function() {
	$s.push("thx.csv.CsvEncoder::end");
	var $spos = $s.length;
	this.encodedString = this.buf.b.join("");
	$s.pop();
}
thx.csv.CsvEncoder.prototype.startObject = function() {
	$s.push("thx.csv.CsvEncoder::startObject");
	var $spos = $s.length;
	throw new thx.error.Error("objects cannot be encoded to CSV",null,null,{ fileName : "CsvEncoder.hx", lineNumber : 48, className : "thx.csv.CsvEncoder", methodName : "startObject"});
	$s.pop();
}
thx.csv.CsvEncoder.prototype.startField = function(name) {
	$s.push("thx.csv.CsvEncoder::startField");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.endField = function() {
	$s.push("thx.csv.CsvEncoder::endField");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.endObject = function() {
	$s.push("thx.csv.CsvEncoder::endObject");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.startArray = function() {
	$s.push("thx.csv.CsvEncoder::startArray");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.startItem = function() {
	$s.push("thx.csv.CsvEncoder::startItem");
	var $spos = $s.length;
	if(this.lineContext) {
		this.lineContext = false;
		this.firstValue = true;
		if(this.firstLine) this.firstLine = false; else this.buf.add(this.newline);
	} else if(this.firstValue) this.firstValue = false; else this.buf.add(this.delimiter);
	$s.pop();
}
thx.csv.CsvEncoder.prototype.endItem = function() {
	$s.push("thx.csv.CsvEncoder::endItem");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.endArray = function() {
	$s.push("thx.csv.CsvEncoder::endArray");
	var $spos = $s.length;
	if(!this.lineContext) this.lineContext = true;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.date = function(d) {
	$s.push("thx.csv.CsvEncoder::date");
	var $spos = $s.length;
	if(d.getSeconds() == 0 && d.getMinutes() == 0 && d.getHours() == 0) this.buf.add(Dates.format(d,"C",["%Y-%m-%d"])); else this.buf.add(Dates.format(d,"C",["%Y-%m-%d %H:%M:%S"]));
	$s.pop();
}
thx.csv.CsvEncoder.prototype.string = function(s) {
	$s.push("thx.csv.CsvEncoder::string");
	var $spos = $s.length;
	if(this.re.match(s)) this.buf.add("\"" + StringTools.replace(s,"\"","\"\"") + "\""); else this.buf.add(s);
	$s.pop();
}
thx.csv.CsvEncoder.prototype["int"] = function(i) {
	$s.push("thx.csv.CsvEncoder::int");
	var $spos = $s.length;
	this.buf.add(i);
	$s.pop();
}
thx.csv.CsvEncoder.prototype["float"] = function(f) {
	$s.push("thx.csv.CsvEncoder::float");
	var $spos = $s.length;
	this.buf.add(f);
	$s.pop();
}
thx.csv.CsvEncoder.prototype["null"] = function() {
	$s.push("thx.csv.CsvEncoder::null");
	var $spos = $s.length;
	if(!this.nulltoempty) this.buf.add("null");
	$s.pop();
}
thx.csv.CsvEncoder.prototype.bool = function(b) {
	$s.push("thx.csv.CsvEncoder::bool");
	var $spos = $s.length;
	this.buf.add(b?"true":"false");
	$s.pop();
}
thx.csv.CsvEncoder.prototype.comment = function(s) {
	$s.push("thx.csv.CsvEncoder::comment");
	var $spos = $s.length;
	$s.pop();
}
thx.csv.CsvEncoder.prototype.__class__ = thx.csv.CsvEncoder;
thx.csv.CsvEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.svg.TestChord = function(p) {
	$s.push("thx.svg.TestChord::new");
	var $spos = $s.length;
	$s.pop();
}
thx.svg.TestChord.__name__ = ["thx","svg","TestChord"];
thx.svg.TestChord.prototype.__class__ = thx.svg.TestChord;
thx.math.scale.Ordinal = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Ordinal::new");
	var $spos = $s.length;
	this._domain = [];
	this._range = [];
	this.rangeBand = 0.0;
	$s.pop();
}
thx.math.scale.Ordinal.__name__ = ["thx","math","scale","Ordinal"];
thx.math.scale.Ordinal.prototype._domain = null;
thx.math.scale.Ordinal.prototype._range = null;
thx.math.scale.Ordinal.prototype.rangeBand = null;
thx.math.scale.Ordinal.prototype.scalef = function() {
	$s.push("thx.math.scale.Ordinal::scalef");
	var $spos = $s.length;
	var $tmp = $closure(this,"scale");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.scaleMap = function(x,i) {
	$s.push("thx.math.scale.Ordinal::scaleMap");
	var $spos = $s.length;
	var $tmp = this.scale(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.scale = function(x) {
	$s.push("thx.math.scale.Ordinal::scale");
	var $spos = $s.length;
	var i = this._domain.indexOf(x);
	if(i < 0) {
		this._domain.push(x);
		i = this._domain.length - 1;
	}
	var $tmp = this._range[i];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.getDomain = function() {
	$s.push("thx.math.scale.Ordinal::getDomain");
	var $spos = $s.length;
	var $tmp = this._domain.copy();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.domain = function(x) {
	$s.push("thx.math.scale.Ordinal::domain");
	var $spos = $s.length;
	this._domain = x.copy();
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.getRange = function() {
	$s.push("thx.math.scale.Ordinal::getRange");
	var $spos = $s.length;
	var $tmp = this._range.copy();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.range = function(a) {
	$s.push("thx.math.scale.Ordinal::range");
	var $spos = $s.length;
	this._range = a.copy();
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.rangePoints = function(start,stop,padding) {
	$s.push("thx.math.scale.Ordinal::rangePoints");
	var $spos = $s.length;
	if(padding == null) padding = 0.0;
	var step = (stop - start) / (this._domain.length - 1 + padding);
	var range = this._domain.length == 1?[(start + stop) / 2]:Floats.range(start + step * padding / 2,stop + step / 2,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = 0;
	$s.pop();
	return ordinal;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.rangeBands = function(start,stop,padding) {
	$s.push("thx.math.scale.Ordinal::rangeBands");
	var $spos = $s.length;
	if(padding == null) padding = 0.0;
	var step = (stop - start) / (this._domain.length + padding);
	var range = Floats.range(start + step * padding,stop,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = step * (1 - padding);
	$s.pop();
	return ordinal;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.rangeRoundBands = function(start,stop,padding) {
	$s.push("thx.math.scale.Ordinal::rangeRoundBands");
	var $spos = $s.length;
	if(padding == null) padding = 0.0;
	var diff = stop - start, step = Math.floor(diff / (this._domain.length + padding)), err = diff - (this._domain.length - padding) * step;
	var range = Ints.range(start + Math.round(err / 2),stop,step);
	var ordinal = new thx.math.scale.Ordinal().domain(this._domain).range(range);
	ordinal.rangeBand = Math.round(step * (1 - padding));
	$s.pop();
	return ordinal;
	$s.pop();
}
thx.math.scale.Ordinal.prototype.__class__ = thx.math.scale.Ordinal;
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
thx.math.scale.TestLinear = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestLinear::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestLinear.__name__ = ["thx","math","scale","TestLinear"];
thx.math.scale.TestLinear.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLinear.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLinear.prototype.testDomain = function() {
	$s.push("thx.math.scale.TestLinear::testDomain");
	var $spos = $s.length;
	var scale = new thx.math.scale.Linear();
	var expected = [-0.5,0.0,0.5,1.0,1.5];
	var values = [-0.5,0.0,0.5,1.0,1.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestLinear.hx", lineNumber : 20, className : "thx.math.scale.TestLinear", methodName : "testDomain"});
	$s.pop();
}
thx.math.scale.TestLinear.prototype.testDomain12 = function() {
	$s.push("thx.math.scale.TestLinear::testDomain12");
	var $spos = $s.length;
	var scale = new thx.math.scale.Linear().domain(1,2);
	var expected = [-0.5,0.0,0.5,1.0,1.5];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestLinear.hx", lineNumber : 29, className : "thx.math.scale.TestLinear", methodName : "testDomain12"});
	$s.pop();
}
thx.math.scale.TestLinear.prototype.testTicks = function() {
	$s.push("thx.math.scale.TestLinear::testTicks");
	var $spos = $s.length;
	var scale = new thx.math.scale.Linear();
	utest.Assert.equals("0, 1",scale.modulo(1).ticks().map(function(d,_) {
		$s.push("thx.math.scale.TestLinear::testTicks@36");
		var $spos = $s.length;
		var $tmp = scale.tickFormat(d);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 36, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.5, 1.0",scale.modulo(2).ticks().map(function(d,_) {
		$s.push("thx.math.scale.TestLinear::testTicks@37");
		var $spos = $s.length;
		var $tmp = scale.tickFormat(d);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 37, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.2, 0.4, 0.6, 0.8, 1.0",scale.modulo(5).ticks().map(function(d,_) {
		$s.push("thx.math.scale.TestLinear::testTicks@38");
		var $spos = $s.length;
		var $tmp = scale.tickFormat(d);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 38, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	utest.Assert.equals("0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0",scale.modulo(10).ticks().map(function(d,_) {
		$s.push("thx.math.scale.TestLinear::testTicks@39");
		var $spos = $s.length;
		var $tmp = scale.tickFormat(d);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(", "),null,{ fileName : "TestLinear.hx", lineNumber : 39, className : "thx.math.scale.TestLinear", methodName : "testTicks"});
	$s.pop();
}
thx.math.scale.TestLinear.prototype.__class__ = thx.math.scale.TestLinear;
thx.js.AccessAttribute = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessAttribute::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
	$s.pop();
}
thx.js.AccessAttribute.__name__ = ["thx","js","AccessAttribute"];
thx.js.AccessAttribute.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessAttribute.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessAttribute.prototype.name = null;
thx.js.AccessAttribute.prototype.qname = null;
thx.js.AccessAttribute.prototype.get = function() {
	$s.push("thx.js.AccessAttribute::get");
	var $spos = $s.length;
	var n = this.name, q = this.qname;
	var $tmp = this.selection.firstNode(function(node) {
		$s.push("thx.js.AccessAttribute::get@25");
		var $spos = $s.length;
		var $tmp = q == null?node.getAttribute(n):node.getAttributeNS(q.space,q.local);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessAttribute.prototype.remove = function() {
	$s.push("thx.js.AccessAttribute::remove");
	var $spos = $s.length;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::remove@32");
			var $spos = $s.length;
			node.removeAttribute(n);
			$s.pop();
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::remove@35");
			var $spos = $s.length;
			node.removeAttributeNS(q.space,q.local);
			$s.pop();
		});
	}
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessAttribute.prototype.string = function(v) {
	$s.push("thx.js.AccessAttribute::string");
	var $spos = $s.length;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::string@44");
			var $spos = $s.length;
			node.setAttribute(n,v);
			$s.pop();
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::string@47");
			var $spos = $s.length;
			node.setAttributeNS(q.space,q.local,v);
			$s.pop();
		});
	}
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessAttribute.prototype["float"] = function(v) {
	$s.push("thx.js.AccessAttribute::float");
	var $spos = $s.length;
	var s = "" + v;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::float@57");
			var $spos = $s.length;
			node.setAttribute(n,s);
			$s.pop();
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessAttribute::float@60");
			var $spos = $s.length;
			node.setAttributeNS(q.space,q.local,s);
			$s.pop();
		});
	}
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessAttribute.prototype.__class__ = thx.js.AccessAttribute;
thx.js.AccessDataAttribute = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessDataAttribute::new");
	var $spos = $s.length;
	thx.js.AccessAttribute.call(this,name,selection);
	$s.pop();
}
thx.js.AccessDataAttribute.__name__ = ["thx","js","AccessDataAttribute"];
thx.js.AccessDataAttribute.__super__ = thx.js.AccessAttribute;
for(var k in thx.js.AccessAttribute.prototype ) thx.js.AccessDataAttribute.prototype[k] = thx.js.AccessAttribute.prototype[k];
thx.js.AccessDataAttribute.prototype.stringf = function(v) {
	$s.push("thx.js.AccessDataAttribute::stringf");
	var $spos = $s.length;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessDataAttribute::stringf@78");
			var $spos = $s.length;
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttribute(n); else node.setAttribute(n,s);
			$s.pop();
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessDataAttribute::stringf@87");
			var $spos = $s.length;
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttributeNS(n); else node.setAttributeNS(q.space,q.local,s);
			$s.pop();
		});
	}
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataAttribute.prototype.floatf = function(v) {
	$s.push("thx.js.AccessDataAttribute::floatf");
	var $spos = $s.length;
	if(null == this.qname) {
		var n = this.name;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessDataAttribute::floatf@102");
			var $spos = $s.length;
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttribute(n); else node.setAttribute(n,"" + s);
			$s.pop();
		});
	} else {
		var q = this.qname;
		this.selection.eachNode(function(node,i) {
			$s.push("thx.js.AccessDataAttribute::floatf@111");
			var $spos = $s.length;
			var s = v(Reflect.field(node,"__data__"),i);
			if(null == s) node.removeAttributeNS(n); else node.setAttributeNS(q.space,q.local,"" + s);
			$s.pop();
		});
	}
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataAttribute.prototype.data = function() {
	$s.push("thx.js.AccessDataAttribute::data");
	var $spos = $s.length;
	var $tmp = this.stringf(function(d,_) {
		$s.push("thx.js.AccessDataAttribute::data@124");
		var $spos = $s.length;
		var $tmp = "" + d;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataAttribute.prototype.__class__ = thx.js.AccessDataAttribute;
thx.languages.It = function(p) {
	if( p === $_ ) return;
	$s.push("thx.languages.It::new");
	var $spos = $s.length;
	this.name = "it";
	this.english = "Italian";
	this["native"] = "italiano";
	this.iso2 = "it";
	this.iso3 = "ita";
	this.pluralRule = 1;
	thx.culture.Language.add(this);
	$s.pop();
}
thx.languages.It.__name__ = ["thx","languages","It"];
thx.languages.It.__super__ = thx.culture.Language;
for(var k in thx.culture.Language.prototype ) thx.languages.It.prototype[k] = thx.culture.Language.prototype[k];
thx.languages.It.language = null;
thx.languages.It.getLanguage = function() {
	$s.push("thx.languages.It::getLanguage");
	var $spos = $s.length;
	if(null == thx.languages.It.language) thx.languages.It.language = new thx.languages.It();
	var $tmp = thx.languages.It.language;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.languages.It.prototype.__class__ = thx.languages.It;
thx.math.TestEquations = function(p) {
	$s.push("thx.math.TestEquations::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.TestEquations.__name__ = ["thx","math","TestEquations"];
thx.math.TestEquations.prototype.testLinear = function() {
	$s.push("thx.math.TestEquations::testLinear");
	var $spos = $s.length;
	this.assertEquation([0.0,0.25,0.5,0.75,1.0],thx.math.Equations.linear,"linear");
	$s.pop();
}
thx.math.TestEquations.prototype.testQuad = function() {
	$s.push("thx.math.TestEquations::testQuad");
	var $spos = $s.length;
	this.assertEquation([0.0,0.0625,0.25,0.5625,1.0],thx.math.Equations.quadratic,"quadratic");
	$s.pop();
}
thx.math.TestEquations.prototype.testCubic = function() {
	$s.push("thx.math.TestEquations::testCubic");
	var $spos = $s.length;
	this.assertEquation([0.0,0.015625,0.125,0.421875,1.0],thx.math.Equations.cubic,"cubic");
	$s.pop();
}
thx.math.TestEquations.prototype.testSin = function() {
	$s.push("thx.math.TestEquations::testSin");
	var $spos = $s.length;
	this.assertEquation([0.0,0.07612046748871326,0.2928932188134524,0.6173165676349102,1.0],thx.math.Equations.sin,"sin");
	$s.pop();
}
thx.math.TestEquations.prototype.testExp = function() {
	$s.push("thx.math.TestEquations::testExp");
	var $spos = $s.length;
	this.assertEquation([0.0,0.004524271728019903,0.03025,0.1757766952966369,0.9999],thx.math.Equations.exponential,"exp");
	$s.pop();
}
thx.math.TestEquations.prototype.testCircle = function() {
	$s.push("thx.math.TestEquations::testCircle");
	var $spos = $s.length;
	this.assertEquation([0.0,0.031754163448145745,0.1339745962155614,0.3385621722338523,1.0],thx.math.Equations.circle,"circle");
	$s.pop();
}
thx.math.TestEquations.prototype.testElastic = function() {
	$s.push("thx.math.TestEquations::testElastic");
	var $spos = $s.length;
	this.assertEquation([0.0,1.1661157560971687,0.9760611111525319,1.00276213586401,1.0],thx.math.Equations.elasticf(),"elastic");
	$s.pop();
}
thx.math.TestEquations.prototype.testBack = function() {
	$s.push("thx.math.TestEquations::testBack");
	var $spos = $s.length;
	this.assertEquation([0.0,-0.06413656250000001,-0.08769750000000004,0.1825903124999999,1.0],thx.math.Equations.backf(),"back");
	$s.pop();
}
thx.math.TestEquations.prototype.testBounce = function() {
	$s.push("thx.math.TestEquations::testBounce");
	var $spos = $s.length;
	this.assertEquation([0.0,0.47265625,0.765625,0.97265625,1.0],thx.math.Equations.bounce,"bounce");
	$s.pop();
}
thx.math.TestEquations.prototype.assertEquation = function(expected,f,name) {
	$s.push("thx.math.TestEquations::assertEquation");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		var s = i * .25;
		var v = f(s);
		var e = expected[i];
		utest.Assert.floatEquals(e,v,1e-3,name + " expected " + e + " but is " + v + " for " + s,{ fileName : "TestEquations.hx", lineNumber : 60, className : "thx.math.TestEquations", methodName : "assertEquation"});
	}
	$s.pop();
}
thx.math.TestEquations.prototype.__class__ = thx.math.TestEquations;
if(!thx.ini) thx.ini = {}
thx.ini.TestIni = function(p) {
	$s.push("thx.ini.TestIni::new");
	var $spos = $s.length;
	$s.pop();
}
thx.ini.TestIni.__name__ = ["thx","ini","TestIni"];
thx.ini.TestIni.prototype.testEncode = function() {
	$s.push("thx.ini.TestIni::testEncode");
	var $spos = $s.length;
	utest.Assert.same(thx.ini.TestIni.v,thx.ini.Ini.decode(thx.ini.Ini.encode(thx.ini.TestIni.v)),null,null,{ fileName : "TestIni.hx", lineNumber : 64, className : "thx.ini.TestIni", methodName : "testEncode"});
	$s.pop();
}
thx.ini.TestIni.prototype.testDecode = function() {
	$s.push("thx.ini.TestIni::testDecode");
	var $spos = $s.length;
	var t = thx.ini.Ini.decode(thx.ini.TestIni.s);
	utest.Assert.same(thx.ini.TestIni.v,t,null,null,{ fileName : "TestIni.hx", lineNumber : 70, className : "thx.ini.TestIni", methodName : "testDecode"});
	$s.pop();
}
thx.ini.TestIni.prototype.__class__ = thx.ini.TestIni;
Enums = function() { }
Enums.__name__ = ["Enums"];
Enums.toString = function(e) {
	$s.push("Enums::toString");
	var $spos = $s.length;
	var cons = e[0];
	var params = [];
	var _g = 0, _g1 = e.slice(2);
	while(_g < _g1.length) {
		var param = _g1[_g];
		++_g;
		params.push(Dynamics.toString(param));
	}
	var $tmp = cons + (params.length == 0?"":"(" + params.join(", ") + ")");
	$s.pop();
	return $tmp;
	$s.pop();
}
Enums.prototype.__class__ = Enums;
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
thx.js.TestDom = function(p) {
	$s.push("thx.js.TestDom::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestDom.__name__ = ["thx","js","TestDom"];
thx.js.TestDom.prototype.testDocument = function() {
	$s.push("thx.js.TestDom::testDocument");
	var $spos = $s.length;
	utest.Assert.isFalse(thx.js.Dom.doc.empty(),null,{ fileName : "TestDom.hx", lineNumber : 25, className : "thx.js.TestDom", methodName : "testDocument"});
	utest.Assert.equals(js.Lib.document,thx.js.Dom.doc.node(),null,{ fileName : "TestDom.hx", lineNumber : 26, className : "thx.js.TestDom", methodName : "testDocument"});
	$s.pop();
}
thx.js.TestDom.prototype.__class__ = thx.js.TestDom;
thx.collections.IntHashList = function(p) {
	if( p === $_ ) return;
	$s.push("thx.collections.IntHashList::new");
	var $spos = $s.length;
	this.length = 0;
	this.__keys = [];
	this.__hash = new IntHash();
	$s.pop();
}
thx.collections.IntHashList.__name__ = ["thx","collections","IntHashList"];
thx.collections.IntHashList.prototype.length = null;
thx.collections.IntHashList.prototype.set = function(key,value) {
	$s.push("thx.collections.IntHashList::set");
	var $spos = $s.length;
	if(!this.__hash.exists(key)) {
		this.__keys.push(key);
		this.length++;
	}
	this.__hash.set(key,value);
	$s.pop();
}
thx.collections.IntHashList.prototype.get = function(key) {
	$s.push("thx.collections.IntHashList::get");
	var $spos = $s.length;
	var $tmp = this.__hash.get(key);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.IntHashList.prototype.getAt = function(index) {
	$s.push("thx.collections.IntHashList::getAt");
	var $spos = $s.length;
	var $tmp = this.__hash.get(this.__keys[index]);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.IntHashList.prototype.exists = function(key) {
	$s.push("thx.collections.IntHashList::exists");
	var $spos = $s.length;
	var $tmp = this.__hash.exists(key);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.IntHashList.prototype.remove = function(key) {
	$s.push("thx.collections.IntHashList::remove");
	var $spos = $s.length;
	var item = this.__hash.get(key);
	if(item == null) {
		$s.pop();
		return null;
	}
	this.__hash.remove(key);
	this.__keys.remove(key);
	this.length--;
	$s.pop();
	return item;
	$s.pop();
}
thx.collections.IntHashList.prototype.removeAt = function(index) {
	$s.push("thx.collections.IntHashList::removeAt");
	var $spos = $s.length;
	if(index < 0 || index >= this.length) {
		$s.pop();
		return null;
	}
	var key = this.__keys[index];
	var item = this.__hash.get(key);
	this.__hash.remove(key);
	this.__keys.remove(key);
	this.length--;
	$s.pop();
	return item;
	$s.pop();
}
thx.collections.IntHashList.prototype.keys = function() {
	$s.push("thx.collections.IntHashList::keys");
	var $spos = $s.length;
	var $tmp = this.__keys.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.IntHashList.prototype.iterator = function() {
	$s.push("thx.collections.IntHashList::iterator");
	var $spos = $s.length;
	var $tmp = this.array().iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.collections.IntHashList.prototype.clear = function() {
	$s.push("thx.collections.IntHashList::clear");
	var $spos = $s.length;
	this.__hash = new IntHash();
	this.__keys = [];
	this.length = 0;
	$s.pop();
}
thx.collections.IntHashList.prototype.array = function() {
	$s.push("thx.collections.IntHashList::array");
	var $spos = $s.length;
	var values = [];
	var _g = 0, _g1 = this.__keys;
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		values.push(this.__hash.get(k));
	}
	$s.pop();
	return values;
	$s.pop();
}
thx.collections.IntHashList.prototype.toString = function() {
	$s.push("thx.collections.IntHashList::toString");
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
thx.collections.IntHashList.prototype.__keys = null;
thx.collections.IntHashList.prototype.__hash = null;
thx.collections.IntHashList.prototype.__class__ = thx.collections.IntHashList;
thx.culture.FormatDate = function() { }
thx.culture.FormatDate.__name__ = ["thx","culture","FormatDate"];
thx.culture.FormatDate.format = function(pattern,date,culture,leadingspace) {
	$s.push("thx.culture.FormatDate::format");
	var $spos = $s.length;
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
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.yearMonth = function(date,culture) {
	$s.push("thx.culture.FormatDate::yearMonth");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternYearMonth,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.monthDay = function(date,culture) {
	$s.push("thx.culture.FormatDate::monthDay");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternMonthDay,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.date = function(date,culture) {
	$s.push("thx.culture.FormatDate::date");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternDate,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.dateShort = function(date,culture) {
	$s.push("thx.culture.FormatDate::dateShort");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternDateShort,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.dateRfc = function(date,culture) {
	$s.push("thx.culture.FormatDate::dateRfc");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternDateRfc,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.dateTime = function(date,culture) {
	$s.push("thx.culture.FormatDate::dateTime");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternDateTime,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.universal = function(date,culture) {
	$s.push("thx.culture.FormatDate::universal");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternUniversal,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.sortable = function(date,culture) {
	$s.push("thx.culture.FormatDate::sortable");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternSortable,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.time = function(date,culture) {
	$s.push("thx.culture.FormatDate::time");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternTime,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.timeShort = function(date,culture) {
	$s.push("thx.culture.FormatDate::timeShort");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatDate.format(culture.date.patternTimeShort,date,culture,false);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.year = function(date,culture) {
	$s.push("thx.culture.FormatDate::year");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.digits("" + date.getFullYear(),culture);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.month = function(date,culture) {
	$s.push("thx.culture.FormatDate::month");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.digits("" + (date.getMonth() + 1),culture);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.monthName = function(date,culture) {
	$s.push("thx.culture.FormatDate::monthName");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = culture.date.abbrMonths[date.getMonth()];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.monthNameShort = function(date,culture) {
	$s.push("thx.culture.FormatDate::monthNameShort");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = culture.date.months[date.getMonth()];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.weekDay = function(date,culture) {
	$s.push("thx.culture.FormatDate::weekDay");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = thx.culture.FormatNumber.digits("" + (date.getDay() + culture.date.firstWeekDay),culture);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.weekDayName = function(date,culture) {
	$s.push("thx.culture.FormatDate::weekDayName");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = culture.date.abbrDays[date.getDay()];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.weekDayNameShort = function(date,culture) {
	$s.push("thx.culture.FormatDate::weekDayNameShort");
	var $spos = $s.length;
	if(null == culture) culture = thx.culture.Culture.getDefaultCulture();
	var $tmp = culture.date.days[date.getDay()];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.culture.FormatDate.prototype.__class__ = thx.culture.FormatDate;
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
thx.math.scale.TestLog = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestLog::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestLog.__name__ = ["thx","math","scale","TestLog"];
thx.math.scale.TestLog.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestLog.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestLog.prototype.testRange = function() {
	$s.push("thx.math.scale.TestLog::testRange");
	var $spos = $s.length;
	var scale = new thx.math.scale.Log().domain(1,10).range(0,1);
	var expected = [Math.NaN,Math.NEGATIVE_INFINITY,-2.0,-1.0,0,0.69897,1.0,2.0];
	var values = [-5.0,0.0,0.01,0.1,1,5,10,100];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestLog.hx", lineNumber : 20, className : "thx.math.scale.TestLog", methodName : "testRange"});
	$s.pop();
}
thx.math.scale.TestLog.prototype.testInvert = function() {
	$s.push("thx.math.scale.TestLog::testInvert");
	var $spos = $s.length;
	var scale = new thx.math.scale.Log().domain(1,10).range(0,1);
	var expected = [1.0,1.023,1.258,3.162,10];
	var values = [0.0,0.01,0.1,0.5,1];
	this.assertScale($closure(scale,"invert"),expected,values,{ fileName : "TestLog.hx", lineNumber : 29, className : "thx.math.scale.TestLog", methodName : "testInvert"});
	$s.pop();
}
thx.math.scale.TestLog.prototype.testRange12 = function() {
	$s.push("thx.math.scale.TestLog::testRange12");
	var $spos = $s.length;
	var scale = new thx.math.scale.Log().domain(1,2).range(0,1);
	var expected = [-1,0.0,0.585,1.0,1.322];
	var values = [0.5,1.0,1.5,2.0,2.5];
	this.assertScale($closure(scale,"scale"),expected,values,{ fileName : "TestLog.hx", lineNumber : 38, className : "thx.math.scale.TestLog", methodName : "testRange12"});
	$s.pop();
}
thx.math.scale.TestLog.prototype.testInvert12 = function() {
	$s.push("thx.math.scale.TestLog::testInvert12");
	var $spos = $s.length;
	var scale = new thx.math.scale.Log().domain(1,2).range(0,1);
	var expected = [1.0,1.007,1.072,1.414,2];
	var values = [0.0,0.01,0.1,0.5,1];
	this.assertScale($closure(scale,"invert"),expected,values,{ fileName : "TestLog.hx", lineNumber : 47, className : "thx.math.scale.TestLog", methodName : "testInvert12"});
	$s.pop();
}
thx.math.scale.TestLog.prototype.__class__ = thx.math.scale.TestLog;
thx.math.scale.TestOrdinal = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestOrdinal::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestOrdinal.__name__ = ["thx","math","scale","TestOrdinal"];
thx.math.scale.TestOrdinal.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestOrdinal.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestOrdinal.prototype.testRange = function() {
	$s.push("thx.math.scale.TestOrdinal::testRange");
	var $spos = $s.length;
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).range([0,1,2,3,4]);
	utest.Assert.same([0,1,2,3,4],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 15, className : "thx.math.scale.TestOrdinal", methodName : "testRange"});
	$s.pop();
}
thx.math.scale.TestOrdinal.prototype.testRangeBands = function() {
	$s.push("thx.math.scale.TestOrdinal::testRangeBands");
	var $spos = $s.length;
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangeBands(0,100);
	utest.Assert.same([0.0,20.0,40.0,60.0,80.0],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 23, className : "thx.math.scale.TestOrdinal", methodName : "testRangeBands"});
	$s.pop();
}
thx.math.scale.TestOrdinal.prototype.testRangePoints = function() {
	$s.push("thx.math.scale.TestOrdinal::testRangePoints");
	var $spos = $s.length;
	var scale = new thx.math.scale.Ordinal().domain(thx.math.scale.TestOrdinal.data).rangePoints(0,100);
	utest.Assert.same([0.0,25.0,50.0,75.0,100.0],thx.math.scale.TestOrdinal.data.map($closure(scale,"scaleMap")),null,null,{ fileName : "TestOrdinal.hx", lineNumber : 31, className : "thx.math.scale.TestOrdinal", methodName : "testRangePoints"});
	$s.pop();
}
thx.math.scale.TestOrdinal.prototype.__class__ = thx.math.scale.TestOrdinal;
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
Bools = function() { }
Bools.__name__ = ["Bools"];
Bools.format = function(v,param,params,culture) {
	$s.push("Bools::format");
	var $spos = $s.length;
	var $tmp = (Bools.formatf(param,params,culture))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Bools.formatf = function(param,params,culture) {
	$s.push("Bools::formatf");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"B");
	var format = params.shift();
	switch(format) {
	case "B":
		var $tmp = function(v) {
			$s.push("Bools::formatf@23");
			var $spos = $s.length;
			var $tmp = v?"true":"false";
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "N":
		var $tmp = function(v) {
			$s.push("Bools::formatf@25");
			var $spos = $s.length;
			var $tmp = v?"1":"0";
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "R":
		if(params.length != 2) throw "bool format R requires 2 parameters";
		var $tmp = function(v) {
			$s.push("Bools::formatf@29");
			var $spos = $s.length;
			var $tmp = v?params[0]:params[1];
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	default:
		throw "Unsupported bool format: " + format;
	}
	$s.pop();
}
Bools.interpolate = function(v,a,b,interpolator) {
	$s.push("Bools::interpolate");
	var $spos = $s.length;
	var $tmp = (Bools.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Bools.interpolatef = function(a,b,interpolator) {
	$s.push("Bools::interpolatef");
	var $spos = $s.length;
	if(a == b) {
		var $tmp = function(_) {
			$s.push("Bools::interpolatef@43");
			var $spos = $s.length;
			$s.pop();
			return a;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	} else {
		var f = Floats.interpolatef(0,1,interpolator);
		var $tmp = function(v) {
			$s.push("Bools::interpolatef@47");
			var $spos = $s.length;
			var $tmp = f(v) < 0.5?a:b;
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Bools.canParse = function(s) {
	$s.push("Bools::canParse");
	var $spos = $s.length;
	s = s.toLowerCase();
	var $tmp = s == "true" || s == "false";
	$s.pop();
	return $tmp;
	$s.pop();
}
Bools.parse = function(s) {
	$s.push("Bools::parse");
	var $spos = $s.length;
	var $tmp = s.toLowerCase() == "true";
	$s.pop();
	return $tmp;
	$s.pop();
}
Bools.prototype.__class__ = Bools;
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
thx.math.TestAll = function(p) {
	$s.push("thx.math.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.math.TestAll.__name__ = ["thx","math","TestAll"];
thx.math.TestAll.addTests = function(runner) {
	$s.push("thx.math.TestAll::addTests");
	var $spos = $s.length;
	thx.math.scale.TestAll.addTests(runner);
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
thx.load.MemoryLoader = function(data) {
	if( data === $_ ) return;
	$s.push("thx.load.MemoryLoader::new");
	var $spos = $s.length;
	this.data = data;
	$s.pop();
}
thx.load.MemoryLoader.__name__ = ["thx","load","MemoryLoader"];
thx.load.MemoryLoader.prototype.data = null;
thx.load.MemoryLoader.prototype.load = function(completeHandler,errorHandler) {
	$s.push("thx.load.MemoryLoader::load");
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
thx.load.MemoryLoader.prototype.__class__ = thx.load.MemoryLoader;
thx.load.MemoryLoader.__interfaces__ = [thx.load.ILoader];
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
thx.js.TestSelection = function(p) {
	$s.push("thx.js.TestSelection::new");
	var $spos = $s.length;
	$s.pop();
}
thx.js.TestSelection.__name__ = ["thx","js","TestSelection"];
thx.js.TestSelection.prototype.sel = null;
thx.js.TestSelection.prototype.testAppendRemove = function() {
	$s.push("thx.js.TestSelection::testAppendRemove");
	var $spos = $s.length;
	utest.Assert.isTrue(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 12, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
	this.sel.append("div");
	utest.Assert.isFalse(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 14, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
	this.sel.select("div").remove();
	utest.Assert.isTrue(this.sel.select("div").empty(),null,{ fileName : "TestSelection.hx", lineNumber : 16, className : "thx.js.TestSelection", methodName : "testAppendRemove"});
	$s.pop();
}
thx.js.TestSelection.prototype.testSelectAll = function() {
	$s.push("thx.js.TestSelection::testSelectAll");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var counter = 0;
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testSelectAll@25");
		var $spos = $s.length;
		utest.Assert.equals(counter,i,null,{ fileName : "TestSelection.hx", lineNumber : 26, className : "thx.js.TestSelection", methodName : "testSelectAll"});
		utest.Assert.equals("" + counter,n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 27, className : "thx.js.TestSelection", methodName : "testSelectAll"});
		counter++;
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testUpdate = function() {
	$s.push("thx.js.TestSelection::testUpdate");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c","e"];
	var update = this.sel.selectAll("div").data(data).update().text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testUpdate@42");
		var $spos = $s.length;
		utest.Assert.equals(data[i],Reflect.field(n,"__data__"),null,{ fileName : "TestSelection.hx", lineNumber : 43, className : "thx.js.TestSelection", methodName : "testUpdate"});
		utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 44, className : "thx.js.TestSelection", methodName : "testUpdate"});
		$s.pop();
	});
	update.each(function(d,i) {
		$s.push("thx.js.TestSelection::testUpdate@47");
		var $spos = $s.length;
		utest.Assert.equals(data[i],d,null,{ fileName : "TestSelection.hx", lineNumber : 47, className : "thx.js.TestSelection", methodName : "testUpdate"});
		$s.pop();
	});
	update.text().stringf(function(d,i) {
		$s.push("thx.js.TestSelection::testUpdate@49");
		var $spos = $s.length;
		var $tmp = d.toUpperCase();
		$s.pop();
		return $tmp;
		$s.pop();
	});
	update.eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testUpdate@50");
		var $spos = $s.length;
		utest.Assert.equals(data[i].toUpperCase(),n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 50, className : "thx.js.TestSelection", methodName : "testUpdate"});
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testExit = function() {
	$s.push("thx.js.TestSelection::testExit");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).exit().text().string("X");
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testExit@63");
		var $spos = $s.length;
		if(i < data.length) utest.Assert.equals("" + i,n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 65, className : "thx.js.TestSelection", methodName : "testExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 67, className : "thx.js.TestSelection", methodName : "testExit"});
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testUpdateExit = function() {
	$s.push("thx.js.TestSelection::testUpdateExit");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).update().text().data().exit().text().string("X");
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testUpdateExit@83");
		var $spos = $s.length;
		if(i < data.length) utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 85, className : "thx.js.TestSelection", methodName : "testUpdateExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 87, className : "thx.js.TestSelection", methodName : "testUpdateExit"});
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testEnter = function() {
	$s.push("thx.js.TestSelection::testEnter");
	var $spos = $s.length;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		this.sel.append("div").text()["float"](i);
	}
	var data = ["a","b","c","d","e"];
	this.sel.selectAll("div").data(data).update().text().stringf(function(d,i) {
		$s.push("thx.js.TestSelection::testEnter@99");
		var $spos = $s.length;
		var $tmp = d.toUpperCase();
		$s.pop();
		return $tmp;
		$s.pop();
	}).enter().append("div").text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testEnter@103");
		var $spos = $s.length;
		if(i < 3) utest.Assert.equals(data[i].toUpperCase(),n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 105, className : "thx.js.TestSelection", methodName : "testEnter"}); else utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 107, className : "thx.js.TestSelection", methodName : "testEnter"});
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testEnterUpdateExit = function() {
	$s.push("thx.js.TestSelection::testEnterUpdateExit");
	var $spos = $s.length;
	this.sel.append("div").text().string("X");
	var data = ["a","b","c"];
	this.sel.selectAll("div").data(data).enter().append("div").text().data();
	this.sel.selectAll("div").eachNode(function(n,i) {
		$s.push("thx.js.TestSelection::testEnterUpdateExit@120");
		var $spos = $s.length;
		if(i > 0) utest.Assert.equals(data[i],n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 122, className : "thx.js.TestSelection", methodName : "testEnterUpdateExit"}); else utest.Assert.equals("X",n.innerHTML,null,{ fileName : "TestSelection.hx", lineNumber : 124, className : "thx.js.TestSelection", methodName : "testEnterUpdateExit"});
		$s.pop();
	});
	$s.pop();
}
thx.js.TestSelection.prototype.testDataAttributeAccess = function() {
	$s.push("thx.js.TestSelection::testDataAttributeAccess");
	var $spos = $s.length;
	var classes = ["first","second"];
	this.sel.selectAll("div").data(classes).enter().append("div").attr("class").stringf(function(d,i) {
		$s.push("thx.js.TestSelection::testDataAttributeAccess@135");
		var $spos = $s.length;
		$s.pop();
		return d;
		$s.pop();
	});
	utest.Assert.equals("first",this.sel.select("div").attr("class").get(),null,{ fileName : "TestSelection.hx", lineNumber : 136, className : "thx.js.TestSelection", methodName : "testDataAttributeAccess"});
	$s.pop();
}
thx.js.TestSelection.prototype.setup = function() {
	$s.push("thx.js.TestSelection::setup");
	var $spos = $s.length;
	this.sel = thx.js.Dom.doc.select("body").append("div");
	$s.pop();
}
thx.js.TestSelection.prototype.teardown = function() {
	$s.push("thx.js.TestSelection::teardown");
	var $spos = $s.length;
	this.sel.remove();
	$s.pop();
}
thx.js.TestSelection.prototype.__class__ = thx.js.TestSelection;
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
	switch( (this.specialElementContentFormat)[1] ) {
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
TestAllExp = function() { }
TestAllExp.__name__ = ["TestAllExp"];
TestAllExp.addTests = function(runner) {
	$s.push("TestAllExp::addTests");
	var $spos = $s.length;
	thx.culture.Culture.setDefaultCulture(thx.cultures.EnUS.getCulture());
	thx.doc.TestAll.addTests(runner);
	thx.load.TestAll.addTests(runner);
	$s.pop();
}
TestAllExp.main = function() {
	$s.push("TestAllExp::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	TestAllExp.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
TestAllExp.prototype.__class__ = TestAllExp;
thx.html.Html = function() { }
thx.html.Html.__name__ = ["thx","html","Html"];
thx.html.Html.getFormatter = function(version) {
	$s.push("thx.html.Html::getFormatter");
	var $spos = $s.length;
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
	switch( (version)[1] ) {
	case 0:
	case 1:
	case 2:
	case 3:
		var $tmp = thx.html.Html.toXml;
		$s.pop();
		return $tmp;
	case 4:
	case 6:
	case 5:
	case 7:
		var $tmp = Xml.parse;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.html.Html.getTemplate = function(version) {
	$s.push("thx.html.Html::getTemplate");
	var $spos = $s.length;
	switch( (version)[1] ) {
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
Arrays = function() { }
Arrays.__name__ = ["Arrays"];
Arrays.addIf = function(arr,condition,value) {
	$s.push("Arrays::addIf");
	var $spos = $s.length;
	if(null != condition) {
		if(condition) arr.push(value);
	} else if(null != value) arr.push(value);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.add = function(arr,value) {
	$s.push("Arrays::add");
	var $spos = $s.length;
	arr.push(value);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays["delete"] = function(arr,value) {
	$s.push("Arrays::delete");
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
Arrays.floatMin = function(arr,f) {
	$s.push("Arrays::floatMin");
	var $spos = $s.length;
	if(arr.length == 0) {
		var $tmp = Math.NaN;
		$s.pop();
		return $tmp;
	}
	var a = f(arr[0]), b;
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a > (b = f(arr[i]))) a = b;
	}
	$s.pop();
	return a;
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
Arrays.floatMax = function(arr,f) {
	$s.push("Arrays::floatMax");
	var $spos = $s.length;
	if(arr.length == 0) {
		var $tmp = Math.NaN;
		$s.pop();
		return $tmp;
	}
	var a = f(arr[0]), b;
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a < (b = f(arr[i]))) a = b;
	}
	$s.pop();
	return a;
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
Arrays.reduce = function(arr,f,initialValue) {
	$s.push("Arrays::reduce");
	var $spos = $s.length;
	var $tmp = Iterators.reduce(arr.iterator(),f,initialValue);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.order = function(arr,f) {
	$s.push("Arrays::order");
	var $spos = $s.length;
	arr.sort(null == f?Reflect.compare:f);
	$s.pop();
	return arr;
	$s.pop();
}
Arrays.split = function(arr,f) {
	$s.push("Arrays::split");
	var $spos = $s.length;
	if(null == f) f = function(v,_) {
		$s.push("Arrays::split@124");
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
Arrays.format = function(v,param,params,culture) {
	$s.push("Arrays::format");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"J");
	var format = params.shift();
	switch(format) {
	case "J":
		if(v.length == 0) {
			var empty = null == params[1]?"[]":params[1];
			$s.pop();
			return empty;
		}
		var sep = null == params[2]?", ":params[2];
		var max = params[3] == null?null:"" == params[3]?null:Std.parseInt(params[3]);
		if(null != max && max < v.length) {
			var elipsis = null == params[4]?" ...":params[4];
			var $tmp = v.copy().splice(0,max).map(function(d,i) {
				$s.push("Arrays::format@173");
				var $spos = $s.length;
				var $tmp = Dynamics.format(d,params[0],null,null,culture);
				$s.pop();
				return $tmp;
				$s.pop();
			}).join(sep) + elipsis;
			$s.pop();
			return $tmp;
		} else {
			var $tmp = v.map(function(d,i) {
				$s.push("Arrays::format@175");
				var $spos = $s.length;
				var $tmp = Dynamics.format(d,params[0],null,null,culture);
				$s.pop();
				return $tmp;
				$s.pop();
			}).join(sep);
			$s.pop();
			return $tmp;
		}
		break;
	case "C":
		var $tmp = Ints.format(v.length,"I",[],culture);
		$s.pop();
		return $tmp;
	default:
		throw "Unsupported array format: " + format;
	}
	$s.pop();
}
Arrays.formatf = function(param,params,culture) {
	$s.push("Arrays::formatf");
	var $spos = $s.length;
	params = thx.culture.FormatParams.params(param,params,"J");
	var format = params.shift();
	switch(format) {
	case "J":
		var $tmp = function(v) {
			$s.push("Arrays::formatf@190");
			var $spos = $s.length;
			if(v.length == 0) {
				var empty = null == params[1]?"[]":params[1];
				$s.pop();
				return empty;
			}
			var sep = null == params[2]?", ":params[2];
			var max = params[3] == null?null:"" == params[3]?null:Std.parseInt(params[3]);
			if(null != max && max < v.length) {
				var elipsis = null == params[4]?" ...":params[4];
				var $tmp = v.copy().splice(0,max).map(function(d,i) {
					$s.push("Arrays::formatf@190@203");
					var $spos = $s.length;
					var $tmp = Dynamics.format(d,params[0],null,null,culture);
					$s.pop();
					return $tmp;
					$s.pop();
				}).join(sep) + elipsis;
				$s.pop();
				return $tmp;
			} else {
				var $tmp = v.map(function(d,i) {
					$s.push("Arrays::formatf@190@205");
					var $spos = $s.length;
					var $tmp = Dynamics.format(d,params[0],null,null,culture);
					$s.pop();
					return $tmp;
					$s.pop();
				}).join(sep);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		};
		$s.pop();
		return $tmp;
	case "C":
		var f = Ints.formatf("I",[],culture);
		var $tmp = function(v) {
			$s.push("Arrays::formatf@209");
			var $spos = $s.length;
			var $tmp = f(v.length);
			$s.pop();
			return $tmp;
			$s.pop();
		};
		$s.pop();
		return $tmp;
	default:
		throw "Unsupported array format: " + format;
	}
	$s.pop();
}
Arrays.interpolate = function(v,a,b,interpolator) {
	$s.push("Arrays::interpolate");
	var $spos = $s.length;
	var $tmp = (Arrays.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.interpolatef = function(a,b,interpolator) {
	$s.push("Arrays::interpolatef");
	var $spos = $s.length;
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				$s.push("Arrays::interpolatef@231");
				var $spos = $s.length;
				var $tmp = function(_) {
					$s.push("Arrays::interpolatef@231@231");
					var $spos = $s.length;
					var $tmp = v[0];
					$s.pop();
					return $tmp;
					$s.pop();
				};
				$s.pop();
				return $tmp;
				$s.pop();
			})(v));
		} else functions.push(Floats.interpolatef(a[i],b[i],interpolator));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			$s.push("Arrays::interpolatef@239");
			var $spos = $s.length;
			var $tmp = function(_) {
				$s.push("Arrays::interpolatef@239@239");
				var $spos = $s.length;
				var $tmp = v[0];
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})(v));
		i++;
	}
	var $tmp = function(t) {
		$s.push("Arrays::interpolatef@242");
		var $spos = $s.length;
		var $tmp = functions.map(function(f,_) {
			$s.push("Arrays::interpolatef@242@242");
			var $spos = $s.length;
			var $tmp = f(t);
			$s.pop();
			return $tmp;
			$s.pop();
		});
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.interpolateStrings = function(v,a,b,interpolator) {
	$s.push("Arrays::interpolateStrings");
	var $spos = $s.length;
	var $tmp = (Arrays.interpolateStringsf(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.interpolateStringsf = function(a,b,interpolator) {
	$s.push("Arrays::interpolateStringsf");
	var $spos = $s.length;
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				$s.push("Arrays::interpolateStringsf@261");
				var $spos = $s.length;
				var $tmp = function(_) {
					$s.push("Arrays::interpolateStringsf@261@261");
					var $spos = $s.length;
					var $tmp = v[0];
					$s.pop();
					return $tmp;
					$s.pop();
				};
				$s.pop();
				return $tmp;
				$s.pop();
			})(v));
		} else functions.push(Strings.interpolatef(a[i],b[i],interpolator));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			$s.push("Arrays::interpolateStringsf@269");
			var $spos = $s.length;
			var $tmp = function(_) {
				$s.push("Arrays::interpolateStringsf@269@269");
				var $spos = $s.length;
				var $tmp = v[0];
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})(v));
		i++;
	}
	var $tmp = function(t) {
		$s.push("Arrays::interpolateStringsf@272");
		var $spos = $s.length;
		var $tmp = functions.map(function(f,_) {
			$s.push("Arrays::interpolateStringsf@272@272");
			var $spos = $s.length;
			var $tmp = f(t);
			$s.pop();
			return $tmp;
			$s.pop();
		});
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.interpolateInts = function(v,a,b,interpolator) {
	$s.push("Arrays::interpolateInts");
	var $spos = $s.length;
	var $tmp = (Arrays.interpolateIntsf(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.interpolateIntsf = function(a,b,interpolator) {
	$s.push("Arrays::interpolateIntsf");
	var $spos = $s.length;
	var functions = [], i = 0, min = Ints.min(a.length,b.length);
	while(i < min) {
		if(a[i] == b[i]) {
			var v = [b[i]];
			functions.push((function(v) {
				$s.push("Arrays::interpolateIntsf@291");
				var $spos = $s.length;
				var $tmp = function(_) {
					$s.push("Arrays::interpolateIntsf@291@291");
					var $spos = $s.length;
					var $tmp = v[0];
					$s.pop();
					return $tmp;
					$s.pop();
				};
				$s.pop();
				return $tmp;
				$s.pop();
			})(v));
		} else functions.push(Ints.interpolatef(a[i],b[i],interpolator));
		i++;
	}
	while(i < b.length) {
		var v = [b[i]];
		functions.push((function(v) {
			$s.push("Arrays::interpolateIntsf@299");
			var $spos = $s.length;
			var $tmp = function(_) {
				$s.push("Arrays::interpolateIntsf@299@299");
				var $spos = $s.length;
				var $tmp = v[0];
				$s.pop();
				return $tmp;
				$s.pop();
			};
			$s.pop();
			return $tmp;
			$s.pop();
		})(v));
		i++;
	}
	var $tmp = function(t) {
		$s.push("Arrays::interpolateIntsf@302");
		var $spos = $s.length;
		var $tmp = functions.map(function(f,_) {
			$s.push("Arrays::interpolateIntsf@302@302");
			var $spos = $s.length;
			var $tmp = f(t);
			$s.pop();
			return $tmp;
			$s.pop();
		});
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.indexOf = function(arr,el) {
	$s.push("Arrays::indexOf");
	var $spos = $s.length;
	var $tmp = arr.indexOf(el);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.every = function(arr,f) {
	$s.push("Arrays::every");
	var $spos = $s.length;
	var $tmp = arr.every(f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.each = function(arr,f) {
	$s.push("Arrays::each");
	var $spos = $s.length;
	arr.forEach(f);
	$s.pop();
}
Arrays.any = function(arr,f) {
	$s.push("Arrays::any");
	var $spos = $s.length;
	var $tmp = Iterators.any(arr.iterator(),f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.all = function(arr,f) {
	$s.push("Arrays::all");
	var $spos = $s.length;
	var $tmp = Iterators.all(arr.iterator(),f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.random = function(arr) {
	$s.push("Arrays::random");
	var $spos = $s.length;
	var $tmp = arr[Std.random(arr.length)];
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.toString = function(arr) {
	$s.push("Arrays::toString");
	var $spos = $s.length;
	var $tmp = "[" + arr.map(function(v,_) {
		$s.push("Arrays::toString@357");
		var $spos = $s.length;
		var $tmp = Dynamics.toString(v);
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(", ") + "]";
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.last = function(arr) {
	$s.push("Arrays::last");
	var $spos = $s.length;
	var $tmp = arr[arr.length - 1];
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.first = function(arr) {
	$s.push("Arrays::first");
	var $spos = $s.length;
	var $tmp = arr[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Arrays.prototype.__class__ = Arrays;
utest.Assertation = { __ename__ : ["utest","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
utest.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
utest.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = utest.Assertation; $x.toString = $estr; return $x; }
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
thx.ini.Ini = function() { }
thx.ini.Ini.__name__ = ["thx","ini","Ini"];
thx.ini.Ini.encode = function(value) {
	$s.push("thx.ini.Ini::encode");
	var $spos = $s.length;
	var handler = new thx.ini.IniEncoder();
	new thx.data.ValueEncoder(handler).encode(value);
	var $tmp = handler.encodedString;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.ini.Ini.decode = function(value) {
	$s.push("thx.ini.Ini::decode");
	var $spos = $s.length;
	var handler = new thx.data.ValueHandler();
	var r = new thx.ini.IniDecoder(handler).decode(value);
	var $tmp = handler.value;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.ini.Ini.prototype.__class__ = thx.ini.Ini;
thx.svg.TestLine = function(p) {
	if( p === $_ ) return;
	$s.push("thx.svg.TestLine::new");
	var $spos = $s.length;
	thx.svg.TestAll.call(this);
	$s.pop();
}
thx.svg.TestLine.__name__ = ["thx","svg","TestLine"];
thx.svg.TestLine.__super__ = thx.svg.TestAll;
for(var k in thx.svg.TestAll.prototype ) thx.svg.TestLine.prototype[k] = thx.svg.TestAll.prototype[k];
thx.svg.TestLine.prototype.testDefault = function() {
	$s.push("thx.svg.TestLine::testDefault");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray();
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 12, className : "thx.svg.TestLine", methodName : "testDefault"});
	this.assertSamePath("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 13, className : "thx.svg.TestLine", methodName : "testDefault"});
	this.assertSamePath("M0,0L1,1L2,0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 14, className : "thx.svg.TestLine", methodName : "testDefault"});
	$s.pop();
}
thx.svg.TestLine.prototype.testY = function() {
	$s.push("thx.svg.TestLine::testY");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().y(function(_,_1) {
		$s.push("thx.svg.TestLine::testY@19");
		var $spos = $s.length;
		$s.pop();
		return -1;
		$s.pop();
	});
	this.assertSamePath("M0,-1",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 21, className : "thx.svg.TestLine", methodName : "testY"});
	this.assertSamePath("M0,-1L1,-1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 22, className : "thx.svg.TestLine", methodName : "testY"});
	this.assertSamePath("M0,-1L1,-1L2,-1",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 23, className : "thx.svg.TestLine", methodName : "testY"});
	$s.pop();
}
thx.svg.TestLine.prototype.testXY = function() {
	$s.push("thx.svg.TestLine::testXY");
	var $spos = $s.length;
	var line = thx.svg.Line.pointObject();
	this.assertSamePath("M0,0",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestLine.hx", lineNumber : 30, className : "thx.svg.TestLine", methodName : "testXY"});
	this.assertSamePath("M0,0L1,1",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestLine.hx", lineNumber : 31, className : "thx.svg.TestLine", methodName : "testXY"});
	this.assertSamePath("M0,0L1,1L2,0",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestLine.hx", lineNumber : 32, className : "thx.svg.TestLine", methodName : "testXY"});
	$s.pop();
}
thx.svg.TestLine.prototype.testStepBefore = function() {
	$s.push("thx.svg.TestLine::testStepBefore");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepBefore);
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 39, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	this.assertSamePath("M0,0V1H1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 40, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	this.assertSamePath("M0,0V1H1V0H2",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 41, className : "thx.svg.TestLine", methodName : "testStepBefore"});
	$s.pop();
}
thx.svg.TestLine.prototype.testStepAfter = function() {
	$s.push("thx.svg.TestLine::testStepAfter");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.StepAfter);
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 48, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	this.assertSamePath("M0,0H1V1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 49, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	this.assertSamePath("M0,0H1V1H2V0",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 50, className : "thx.svg.TestLine", methodName : "testStepAfter"});
	$s.pop();
}
thx.svg.TestLine.prototype.testBasis = function() {
	$s.push("thx.svg.TestLine::testBasis");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Basis);
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 57, className : "thx.svg.TestLine", methodName : "testBasis"});
	this.assertSamePath("M0,0L1,1",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestLine.hx", lineNumber : 58, className : "thx.svg.TestLine", methodName : "testBasis"});
	this.assertSamePath("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 59, className : "thx.svg.TestLine", methodName : "testBasis"});
	$s.pop();
}
thx.svg.TestLine.prototype.testBasisClosed = function() {
	$s.push("thx.svg.TestLine::testBasisClosed");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.BasisClosed);
	this.assertSamePath("M0,0C0,0,0,0,0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 66, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	this.assertSamePath("M2,2C2,2,4,4,4,4C4,4,2,2,2,2",line.shape([[0.0,0.0],[6.0,6.0]]),{ fileName : "TestLine.hx", lineNumber : 67, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	this.assertSamePath("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 68, className : "thx.svg.TestLine", methodName : "testBasisClosed"});
	$s.pop();
}
thx.svg.TestLine.prototype.testCardinal = function() {
	$s.push("thx.svg.TestLine::testCardinal");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.Cardinal());
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 75, className : "thx.svg.TestLine", methodName : "testCardinal"});
	this.assertSamePath("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestLine.hx", lineNumber : 76, className : "thx.svg.TestLine", methodName : "testCardinal"});
	this.assertSamePath("M0,0Q4,5,5,5Q6,5,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 77, className : "thx.svg.TestLine", methodName : "testCardinal"});
	$s.pop();
}
thx.svg.TestLine.prototype.testCardinalClosed = function() {
	$s.push("thx.svg.TestLine::testCardinalClosed");
	var $spos = $s.length;
	var line = thx.svg.Line.pointArray().interpolator(thx.svg.LineInterpolator.CardinalClosed());
	this.assertSamePath("M0,0",line.shape([[0.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 84, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	this.assertSamePath("M0,0L5,5",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestLine.hx", lineNumber : 85, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	this.assertSamePath("M0,0C0,0,3.5,5,5,5S10,0,10,0",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestLine.hx", lineNumber : 86, className : "thx.svg.TestLine", methodName : "testCardinalClosed"});
	$s.pop();
}
thx.svg.TestLine.prototype.__class__ = thx.svg.TestLine;
Types = function() { }
Types.__name__ = ["Types"];
Types.className = function(o) {
	$s.push("Types::className");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(o)).split(".").pop();
	$s.pop();
	return $tmp;
	$s.pop();
}
Types.fullName = function(o) {
	$s.push("Types::fullName");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(o));
	$s.pop();
	return $tmp;
	$s.pop();
}
Types.typeName = function(o) {
	$s.push("Types::typeName");
	var $spos = $s.length;
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
Types.hasSuperClass = function(type,sup) {
	$s.push("Types::hasSuperClass");
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
Types.isAnonymous = function(v) {
	$s.push("Types::isAnonymous");
	var $spos = $s.length;
	var $tmp = Reflect.isObject(v) && null == Type.getClass(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Types["as"] = function(value,type) {
	$s.push("Types::as");
	var $spos = $s.length;
	var $tmp = Std["is"](value,type)?value:null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Types.ifIs = function(value,type,handler) {
	$s.push("Types::ifIs");
	var $spos = $s.length;
	if(Std["is"](value,type)) handler(value);
	$s.pop();
	return value;
	$s.pop();
}
Types.of = function(type,value) {
	$s.push("Types::of");
	var $spos = $s.length;
	var $tmp = Std["is"](value,type)?value:null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Types.sameAs = function(a,b) {
	$s.push("Types::sameAs");
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
	var $e = (tb);
	switch( $e[1] ) {
	case 6:
		var c = $e[2];
		var $tmp = Std["is"](a,c);
		$s.pop();
		return $tmp;
	case 7:
		var e = $e[2];
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
Types.prototype.__class__ = Types;
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
	haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 66, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	$s.pop();
}
utest.ui.text.PrintReport.prototype.__class__ = utest.ui.text.PrintReport;
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
TestObjects.prototype.testInterpolate = function() {
	$s.push("TestObjects::testInterpolate");
	var $spos = $s.length;
	var a = { a : 10, b : "x1y2", color : "hsl(30, 0.1, 0.5)", d : "extra"};
	var b = { a : 20, b : "x3y4", color : "hsl(330, 0.3, 0.7)", e : "other"};
	var f = Objects.interpolatef(a,b);
	utest.Assert.same({ d : "extra", e : "other", a : 15, b : "x2y3", color : "rgb(171,142,147)"},f(0.5),null,null,{ fileName : "TestObjects.hx", lineNumber : 42, className : "TestObjects", methodName : "testInterpolate"});
	$s.pop();
}
TestObjects.prototype.__class__ = TestObjects;
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
thx.data.ValueEncoder = function(handler) {
	if( handler === $_ ) return;
	$s.push("thx.data.ValueEncoder::new");
	var $spos = $s.length;
	this.handler = handler;
	$s.pop();
}
thx.data.ValueEncoder.__name__ = ["thx","data","ValueEncoder"];
thx.data.ValueEncoder.prototype.handler = null;
thx.data.ValueEncoder.prototype.encode = function(o) {
	$s.push("thx.data.ValueEncoder::encode");
	var $spos = $s.length;
	this.handler.start();
	this.encodeValue(o);
	this.handler.end();
	$s.pop();
}
thx.data.ValueEncoder.prototype.encodeValue = function(o) {
	$s.push("thx.data.ValueEncoder::encodeValue");
	var $spos = $s.length;
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
	$s.pop();
}
thx.data.ValueEncoder.prototype.encodeObject = function(o) {
	$s.push("thx.data.ValueEncoder::encodeObject");
	var $spos = $s.length;
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
	$s.pop();
}
thx.data.ValueEncoder.prototype.encodeHash = function(o) {
	$s.push("thx.data.ValueEncoder::encodeHash");
	var $spos = $s.length;
	this.handler.startObject();
	var $it0 = o.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		this.handler.startField(key);
		this.encodeValue(o.get(key));
		this.handler.endField();
	}
	this.handler.endObject();
	$s.pop();
}
thx.data.ValueEncoder.prototype.encodeList = function(list) {
	$s.push("thx.data.ValueEncoder::encodeList");
	var $spos = $s.length;
	this.handler.startArray();
	var $it0 = list.iterator();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		this.handler.startItem();
		this.encodeValue(item);
		this.handler.endItem();
	}
	this.handler.endArray();
	$s.pop();
}
thx.data.ValueEncoder.prototype.encodeArray = function(a) {
	$s.push("thx.data.ValueEncoder::encodeArray");
	var $spos = $s.length;
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
	$s.pop();
}
thx.data.ValueEncoder.prototype.__class__ = thx.data.ValueEncoder;
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
thx.js.DataChoice = function(update,enter,exit) {
	if( update === $_ ) return;
	$s.push("thx.js.DataChoice::new");
	var $spos = $s.length;
	this._update = update;
	this._enter = enter;
	this._exit = exit;
	$s.pop();
}
thx.js.DataChoice.__name__ = ["thx","js","DataChoice"];
thx.js.DataChoice.prototype._update = null;
thx.js.DataChoice.prototype._enter = null;
thx.js.DataChoice.prototype._exit = null;
thx.js.DataChoice.prototype.enter = function() {
	$s.push("thx.js.DataChoice::enter");
	var $spos = $s.length;
	var $tmp = new thx.js.PreEnterSelection(this._enter,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.DataChoice.prototype.exit = function() {
	$s.push("thx.js.DataChoice::exit");
	var $spos = $s.length;
	var $tmp = new thx.js.ExitSelection(this._exit,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.DataChoice.prototype.update = function() {
	$s.push("thx.js.DataChoice::update");
	var $spos = $s.length;
	var $tmp = new thx.js.UpdateSelection(this._update,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.DataChoice.prototype.__class__ = thx.js.DataChoice;
thx.js.BoundSelection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.BoundSelection::new");
	var $spos = $s.length;
	thx.js.BaseSelection.call(this,groups);
	$s.pop();
}
thx.js.BoundSelection.__name__ = ["thx","js","BoundSelection"];
thx.js.BoundSelection.__super__ = thx.js.BaseSelection;
for(var k in thx.js.BaseSelection.prototype ) thx.js.BoundSelection.prototype[k] = thx.js.BaseSelection.prototype[k];
thx.js.BoundSelection.prototype.html = function() {
	$s.push("thx.js.BoundSelection::html");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataHtml(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.text = function() {
	$s.push("thx.js.BoundSelection::text");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataText(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.attr = function(name) {
	$s.push("thx.js.BoundSelection::attr");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataAttribute(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.classed = function() {
	$s.push("thx.js.BoundSelection::classed");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataClassed(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.property = function(name) {
	$s.push("thx.js.BoundSelection::property");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataProperty(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.style = function(name) {
	$s.push("thx.js.BoundSelection::style");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataStyle(name,this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.transition = function() {
	$s.push("thx.js.BoundSelection::transition");
	var $spos = $s.length;
	var $tmp = new thx.js.BoundTransition(this);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.data = function(d,join) {
	$s.push("thx.js.BoundSelection::data");
	var $spos = $s.length;
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
	var $tmp = new thx.js.DataChoice(update,enter,exit);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.dataf = function(fd,join) {
	$s.push("thx.js.BoundSelection::dataf");
	var $spos = $s.length;
	if(null == join) {
		var update = [], enter = [], exit = [], i = 0;
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bind(group,fd(Reflect.field(group.parentNode,"__data__"),i++),update,enter,exit);
		}
		var $tmp = new thx.js.DataChoice(update,enter,exit);
		$s.pop();
		return $tmp;
	} else {
		var update = [], enter = [], exit = [], i = 0;
		var _g = 0, _g1 = this.groups;
		while(_g < _g1.length) {
			var group = _g1[_g];
			++_g;
			thx.js.BaseSelection.bindJoin(join,group,fd(Reflect.field(group.parentNode,"__data__"),i++),update,enter,exit);
		}
		var $tmp = new thx.js.DataChoice(update,enter,exit);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.js.BoundSelection.prototype.selfData = function() {
	$s.push("thx.js.BoundSelection::selfData");
	var $spos = $s.length;
	var $tmp = this.dataf(function(d,i) {
		$s.push("thx.js.BoundSelection::selfData@164");
		var $spos = $s.length;
		$s.pop();
		return d;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.each = function(f) {
	$s.push("thx.js.BoundSelection::each");
	var $spos = $s.length;
	var $tmp = this.eachNode(function(n,i) {
		$s.push("thx.js.BoundSelection::each@169");
		var $spos = $s.length;
		f(Reflect.field(n,"__data__"),i);
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.sort = function(comparator) {
	$s.push("thx.js.BoundSelection::sort");
	var $spos = $s.length;
	var $tmp = this.sortNode(function(a,b) {
		$s.push("thx.js.BoundSelection::sort@174");
		var $spos = $s.length;
		var $tmp = comparator(Reflect.field(a,"__data__"),Reflect.field(b,"__data__"));
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.filter = function(f) {
	$s.push("thx.js.BoundSelection::filter");
	var $spos = $s.length;
	var $tmp = this.filterNode(function(n,i) {
		$s.push("thx.js.BoundSelection::filter@179");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.map = function(f) {
	$s.push("thx.js.BoundSelection::map");
	var $spos = $s.length;
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
	var $tmp = this.createSelection(ngroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.first = function(f) {
	$s.push("thx.js.BoundSelection::first");
	var $spos = $s.length;
	var $tmp = this.firstNode(function(n) {
		$s.push("thx.js.BoundSelection::first@202");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"));
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.on = function(type,listener) {
	$s.push("thx.js.BoundSelection::on");
	var $spos = $s.length;
	var $tmp = this.onNode(type,null == listener?null:function(n,i) {
		$s.push("thx.js.BoundSelection::on@207");
		var $spos = $s.length;
		listener(Reflect.field(n,"__data__"),i);
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundSelection.prototype.__class__ = thx.js.BoundSelection;
thx.js.ResumeSelection = function(groups) {
	if( groups === $_ ) return;
	$s.push("thx.js.ResumeSelection::new");
	var $spos = $s.length;
	thx.js.BoundSelection.call(this,groups);
	$s.pop();
}
thx.js.ResumeSelection.__name__ = ["thx","js","ResumeSelection"];
thx.js.ResumeSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.ResumeSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.ResumeSelection.create = function(groups) {
	$s.push("thx.js.ResumeSelection::create");
	var $spos = $s.length;
	var $tmp = new thx.js.ResumeSelection(groups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ResumeSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.ResumeSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.ResumeSelection(groups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ResumeSelection.prototype.__class__ = thx.js.ResumeSelection;
thx.js.PreEnterSelection = function(enter,choice) {
	if( enter === $_ ) return;
	$s.push("thx.js.PreEnterSelection::new");
	var $spos = $s.length;
	this.groups = enter;
	this._choice = choice;
	$s.pop();
}
thx.js.PreEnterSelection.__name__ = ["thx","js","PreEnterSelection"];
thx.js.PreEnterSelection.prototype.groups = null;
thx.js.PreEnterSelection.prototype._choice = null;
thx.js.PreEnterSelection.prototype.append = function(name) {
	$s.push("thx.js.PreEnterSelection::append");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var append = function(node) {
		$s.push("thx.js.PreEnterSelection::append@224");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.appendChild(n);
		$s.pop();
		return n;
		$s.pop();
	};
	var appendNS = function(node) {
		$s.push("thx.js.PreEnterSelection::append@231");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.appendChild(n);
		$s.pop();
		return n;
		$s.pop();
	};
	var $tmp = this._select(null == qname?append:appendNS);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.PreEnterSelection.prototype.insert = function(name,before,beforeSelector) {
	$s.push("thx.js.PreEnterSelection::insert");
	var $spos = $s.length;
	var qname = thx.xml.Namespace.qualify(name);
	var insertDom = function(node) {
		$s.push("thx.js.PreEnterSelection::insert@244");
		var $spos = $s.length;
		var n = js.Lib.document.createElement(name);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node)[0]);
		$s.pop();
		return n;
		$s.pop();
	};
	var insertNsDom = function(node) {
		$s.push("thx.js.PreEnterSelection::insert@250");
		var $spos = $s.length;
		var n = js.Lib.document.createElementNS(qname.space,qname.local);
		node.insertBefore(n,Sizzle(null != before?before:beforeSelector,node)[0]);
		$s.pop();
		return n;
		$s.pop();
	};
	var $tmp = this._select(null == qname?insertDom:insertNsDom);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.PreEnterSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.PreEnterSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.EnterSelection(groups,this._choice);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.PreEnterSelection.prototype._select = function(selectf) {
	$s.push("thx.js.PreEnterSelection::_select");
	var $spos = $s.length;
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
	var $tmp = this.createSelection(subgroups);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.PreEnterSelection.prototype.__class__ = thx.js.PreEnterSelection;
thx.js.EnterSelection = function(enter,choice) {
	if( enter === $_ ) return;
	$s.push("thx.js.EnterSelection::new");
	var $spos = $s.length;
	thx.js.BoundSelection.call(this,enter);
	this._choice = choice;
	$s.pop();
}
thx.js.EnterSelection.__name__ = ["thx","js","EnterSelection"];
thx.js.EnterSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.EnterSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.EnterSelection.prototype._choice = null;
thx.js.EnterSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.EnterSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.EnterSelection(groups,this._choice);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.EnterSelection.prototype.exit = function() {
	$s.push("thx.js.EnterSelection::exit");
	var $spos = $s.length;
	var $tmp = this._choice.exit();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.EnterSelection.prototype.update = function() {
	$s.push("thx.js.EnterSelection::update");
	var $spos = $s.length;
	var $tmp = this._choice.update();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.EnterSelection.prototype.__class__ = thx.js.EnterSelection;
thx.js.ExitSelection = function(exit,choice) {
	if( exit === $_ ) return;
	$s.push("thx.js.ExitSelection::new");
	var $spos = $s.length;
	thx.js.UnboundSelection.call(this,exit);
	this._choice = choice;
	$s.pop();
}
thx.js.ExitSelection.__name__ = ["thx","js","ExitSelection"];
thx.js.ExitSelection.__super__ = thx.js.UnboundSelection;
for(var k in thx.js.UnboundSelection.prototype ) thx.js.ExitSelection.prototype[k] = thx.js.UnboundSelection.prototype[k];
thx.js.ExitSelection.prototype._choice = null;
thx.js.ExitSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.ExitSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.ExitSelection(groups,this._choice);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ExitSelection.prototype.enter = function() {
	$s.push("thx.js.ExitSelection::enter");
	var $spos = $s.length;
	var $tmp = this._choice.enter();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ExitSelection.prototype.update = function() {
	$s.push("thx.js.ExitSelection::update");
	var $spos = $s.length;
	var $tmp = this._choice.update();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.ExitSelection.prototype.__class__ = thx.js.ExitSelection;
thx.js.UpdateSelection = function(update,choice) {
	if( update === $_ ) return;
	$s.push("thx.js.UpdateSelection::new");
	var $spos = $s.length;
	thx.js.BoundSelection.call(this,update);
	this._choice = choice;
	$s.pop();
}
thx.js.UpdateSelection.__name__ = ["thx","js","UpdateSelection"];
thx.js.UpdateSelection.__super__ = thx.js.BoundSelection;
for(var k in thx.js.BoundSelection.prototype ) thx.js.UpdateSelection.prototype[k] = thx.js.BoundSelection.prototype[k];
thx.js.UpdateSelection.prototype._choice = null;
thx.js.UpdateSelection.prototype.createSelection = function(groups) {
	$s.push("thx.js.UpdateSelection::createSelection");
	var $spos = $s.length;
	var $tmp = new thx.js.UpdateSelection(groups,this._choice);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UpdateSelection.prototype.enter = function() {
	$s.push("thx.js.UpdateSelection::enter");
	var $spos = $s.length;
	var $tmp = this._choice.enter();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UpdateSelection.prototype.exit = function() {
	$s.push("thx.js.UpdateSelection::exit");
	var $spos = $s.length;
	var $tmp = this._choice.exit();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UpdateSelection.prototype.__class__ = thx.js.UpdateSelection;
thx.svg.TestArea = function(p) {
	if( p === $_ ) return;
	$s.push("thx.svg.TestArea::new");
	var $spos = $s.length;
	thx.svg.TestAll.call(this);
	$s.pop();
}
thx.svg.TestArea.__name__ = ["thx","svg","TestArea"];
thx.svg.TestArea.__super__ = thx.svg.TestAll;
for(var k in thx.svg.TestAll.prototype ) thx.svg.TestArea.prototype[k] = thx.svg.TestAll.prototype[k];
thx.svg.TestArea.prototype.testArea = function() {
	$s.push("thx.svg.TestArea::testArea");
	var $spos = $s.length;
	var area = thx.svg.Area.pointArray2();
	this.assertSamePath("M0,0L0,0Z",area.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 17, className : "thx.svg.TestArea", methodName : "testArea"});
	this.assertSamePath("M0,0L1,1L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 18, className : "thx.svg.TestArea", methodName : "testArea"});
	this.assertSamePath("M0,0L1,1L2,0L2,0L1,0L0,0Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 19, className : "thx.svg.TestArea", methodName : "testArea"});
	$s.pop();
}
thx.svg.TestArea.prototype.testArean1 = function() {
	$s.push("thx.svg.TestArea::testArean1");
	var $spos = $s.length;
	var area = thx.svg.Area.pointArray2().y0(function(_,_1) {
		$s.push("thx.svg.TestArea::testArean1@24");
		var $spos = $s.length;
		$s.pop();
		return -1;
		$s.pop();
	});
	this.assertSamePath("M0,0L0,-1Z",area.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 26, className : "thx.svg.TestArea", methodName : "testArean1"});
	this.assertSamePath("M0,0L1,1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 27, className : "thx.svg.TestArea", methodName : "testArean1"});
	this.assertSamePath("M0,0L1,1L2,0L2,-1L1,-1L0,-1Z",area.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 28, className : "thx.svg.TestArea", methodName : "testArean1"});
	$s.pop();
}
thx.svg.TestArea.prototype.testXY = function() {
	$s.push("thx.svg.TestArea::testXY");
	var $spos = $s.length;
	var line = thx.svg.Area.pointObjectXY();
	this.assertSamePath("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 35, className : "thx.svg.TestArea", methodName : "testXY"});
	this.assertSamePath("M0,0L1,1L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestArea.hx", lineNumber : 36, className : "thx.svg.TestArea", methodName : "testXY"});
	this.assertSamePath("M0,0L1,1L2,0L2,0L1,0L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 37, className : "thx.svg.TestArea", methodName : "testXY"});
	$s.pop();
}
thx.svg.TestArea.prototype.testXYnY0 = function() {
	$s.push("thx.svg.TestArea::testXYnY0");
	var $spos = $s.length;
	var line = thx.svg.Area.pointObjectXY().y0(function(d,_) {
		$s.push("thx.svg.TestArea::testXYnY0@42");
		var $spos = $s.length;
		var $tmp = -d.y;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	this.assertSamePath("M0,0L0,0Z",line.shape([{ x : 0.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 44, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	this.assertSamePath("M0,0L1,1L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0}]),{ fileName : "TestArea.hx", lineNumber : 45, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	this.assertSamePath("M0,0L1,1L2,0L2,0L1,-1L0,0Z",line.shape([{ x : 0.0, y : 0.0},{ x : 1.0, y : 1.0},{ x : 2.0, y : 0.0}]),{ fileName : "TestArea.hx", lineNumber : 46, className : "thx.svg.TestArea", methodName : "testXYnY0"});
	$s.pop();
}
thx.svg.TestArea.prototype.testStepBefore = function() {
	$s.push("thx.svg.TestArea::testStepBefore");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepBefore);
	this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 53, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	this.assertSamePath("M0,0V1H1L1,0V0H0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 54, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	this.assertSamePath("M0,0V1H1V0H2L2,0V0H1V0H0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 55, className : "thx.svg.TestArea", methodName : "testStepBefore"});
	$s.pop();
}
thx.svg.TestArea.prototype.testStepAfter = function() {
	$s.push("thx.svg.TestArea::testStepAfter");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.StepAfter);
	this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 62, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	this.assertSamePath("M0,0H1V1L1,0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 63, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	this.assertSamePath("M0,0H1V1H2V0L2,0H1V0H0V0Z",line.shape([[0.0,0.0],[1.0,1.0],[2.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 64, className : "thx.svg.TestArea", methodName : "testStepAfter"});
	$s.pop();
}
thx.svg.TestArea.prototype.testBasis = function() {
	$s.push("thx.svg.TestArea::testBasis");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Basis);
	this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 71, className : "thx.svg.TestArea", methodName : "testBasis"});
	this.assertSamePath("M0,0L1,1L1,0L0,0Z",line.shape([[0.0,0.0],[1.0,1.0]]),{ fileName : "TestArea.hx", lineNumber : 72, className : "thx.svg.TestArea", methodName : "testBasis"});
	this.assertSamePath("M0,0C0,0,0,0,1,1C2,2,4,4,6,4C8,4,10,2,11,1C12,0,12,0,12,0L12,0C12,0,12,0,11,0C10,0,8,0,6,0C4,0,2,0,1,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 73, className : "thx.svg.TestArea", methodName : "testBasis"});
	$s.pop();
}
thx.svg.TestArea.prototype.testBasisClosed = function() {
	$s.push("thx.svg.TestArea::testBasisClosed");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.BasisClosed);
	this.assertSamePath("M0,0C0,0,0,0,0,0L0,0C0,0,0,0,0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 80, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	this.assertSamePath("M2,2C2,2,4,4,4,4C4,4,2,2,2,2L4,0C4,0,2,0,2,0C2,0,4,0,4,0Z",line.shape([[0.0,0.0],[6.0,6.0]]),{ fileName : "TestArea.hx", lineNumber : 81, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	this.assertSamePath("M9,1C8,0,4,0,3,1C2,2,4,4,6,4C8,4,10,2,9,1L3,0C4,0,8,0,9,0C10,0,8,0,6,0C4,0,2,0,3,0Z",line.shape([[0.0,0.0],[6.0,6.0],[12.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 82, className : "thx.svg.TestArea", methodName : "testBasisClosed"});
	$s.pop();
}
thx.svg.TestArea.prototype.testCardinal = function() {
	$s.push("thx.svg.TestArea::testCardinal");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.Cardinal());
	this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 89, className : "thx.svg.TestArea", methodName : "testCardinal"});
	this.assertSamePath("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestArea.hx", lineNumber : 90, className : "thx.svg.TestArea", methodName : "testCardinal"});
	this.assertSamePath("M0,0Q4,5,5,5Q6,5,10,0L10,0Q6,0,5,0Q4,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 91, className : "thx.svg.TestArea", methodName : "testCardinal"});
	$s.pop();
}
thx.svg.TestArea.prototype.testCardinalClosed = function() {
	$s.push("thx.svg.TestArea::testCardinalClosed");
	var $spos = $s.length;
	var line = thx.svg.Area.pointArray2().interpolator(thx.svg.LineInterpolator.CardinalClosed());
	this.assertSamePath("M0,0L0,0Z",line.shape([[0.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 98, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	this.assertSamePath("M0,0L5,5L5,0L0,0Z",line.shape([[0.0,0.0],[5.0,5.0]]),{ fileName : "TestArea.hx", lineNumber : 99, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	this.assertSamePath("M0,0C0,0,3.5,5,5,5S10,0,10,0L10,0C10,0,6.5,0,5,0S0,0,0,0Z",line.shape([[0.0,0.0],[5.0,5.0],[10.0,0.0]]),{ fileName : "TestArea.hx", lineNumber : 100, className : "thx.svg.TestArea", methodName : "testCardinalClosed"});
	$s.pop();
}
thx.svg.TestArea.prototype.__class__ = thx.svg.TestArea;
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
	$s.pop();
}
utest.ui.common.FixtureResult.prototype.__class__ = utest.ui.common.FixtureResult;
thx.color.Cmyk = function(cyan,magenta,yellow,black) {
	if( cyan === $_ ) return;
	$s.push("thx.color.Cmyk::new");
	var $spos = $s.length;
	thx.color.Rgb.call(this,Ints.interpolate(Floats.normalize(1 - cyan - black),0,255,null),Ints.interpolate(Floats.normalize(1 - magenta - black),0,255,null),Ints.interpolate(Floats.normalize(1 - yellow - black),0,255,null));
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
	var $tmp = new thx.color.Cmyk(Floats.interpolate(t,a.cyan,b.cyan,interpolator),Floats.interpolate(t,a.magenta,b.magenta,interpolator),Floats.interpolate(t,a.yellow,b.yellow,interpolator),Floats.interpolate(t,a.black,b.black,interpolator));
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
thx.math.scale.Pow = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Pow::new");
	var $spos = $s.length;
	thx.math.scale.NumericScale.call(this);
	this.tick = new thx.math.scale.Linear();
	this._exponent = 1;
	this.powb = this.powp = function(v) {
		$s.push("thx.math.scale.Pow::new@25");
		var $spos = $s.length;
		$s.pop();
		return v;
		$s.pop();
	};
	$s.pop();
}
thx.math.scale.Pow.__name__ = ["thx","math","scale","Pow"];
thx.math.scale.Pow.__super__ = thx.math.scale.NumericScale;
for(var k in thx.math.scale.NumericScale.prototype ) thx.math.scale.Pow.prototype[k] = thx.math.scale.NumericScale.prototype[k];
thx.math.scale.Pow.sqrt = function() {
	$s.push("thx.math.scale.Pow::sqrt");
	var $spos = $s.length;
	var $tmp = new thx.math.scale.Pow().exponent(.5);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow._pow = function(e) {
	$s.push("thx.math.scale.Pow::_pow");
	var $spos = $s.length;
	var $tmp = function(v) {
		$s.push("thx.math.scale.Pow::_pow@90");
		var $spos = $s.length;
		var $tmp = Math.pow(v,e);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow._pown = function(e) {
	$s.push("thx.math.scale.Pow::_pown");
	var $spos = $s.length;
	var $tmp = function(v) {
		$s.push("thx.math.scale.Pow::_pown@95");
		var $spos = $s.length;
		var $tmp = -Math.pow(-v,e);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.tick = null;
thx.math.scale.Pow.prototype._exponent = null;
thx.math.scale.Pow.prototype.powp = null;
thx.math.scale.Pow.prototype.powb = null;
thx.math.scale.Pow.prototype.scale = function(x,i) {
	$s.push("thx.math.scale.Pow::scale");
	var $spos = $s.length;
	var $tmp = thx.math.scale.NumericScale.prototype.scale.call(this,this.powp(x));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.invert = function(x,i) {
	$s.push("thx.math.scale.Pow::invert");
	var $spos = $s.length;
	var $tmp = this.powb(thx.math.scale.NumericScale.prototype.invert.call(this,x));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.getDomain = function() {
	$s.push("thx.math.scale.Pow::getDomain");
	var $spos = $s.length;
	var me = this;
	var $tmp = thx.math.scale.NumericScale.prototype.getDomain.call(this).map(function(d,_) {
		$s.push("thx.math.scale.Pow::getDomain@40");
		var $spos = $s.length;
		var $tmp = me.powb(d);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.domain = function(x0,x1) {
	$s.push("thx.math.scale.Pow::domain");
	var $spos = $s.length;
	var pow = (x0 < x1?x0:x1) < 0?thx.math.scale.Pow._pown:thx.math.scale.Pow._pow;
	this.powp = pow(this._exponent);
	this.powb = pow(1.0 / this._exponent);
	thx.math.scale.NumericScale.prototype.domain.call(this,this.powp(x0),this.powp(x1));
	this.tick.domain(x0,x1);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Pow.prototype.ticks = function() {
	$s.push("thx.math.scale.Pow::ticks");
	var $spos = $s.length;
	var $tmp = this.tick.ticks();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.tickFormat = function(v,i) {
	$s.push("thx.math.scale.Pow::tickFormat");
	var $spos = $s.length;
	var $tmp = this.tick.tickFormat(v,i);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.getModulo = function() {
	$s.push("thx.math.scale.Pow::getModulo");
	var $spos = $s.length;
	var $tmp = this.tick.getModulo();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.modulo = function(v) {
	$s.push("thx.math.scale.Pow::modulo");
	var $spos = $s.length;
	this.tick.modulo(v);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Pow.prototype.getExponent = function() {
	$s.push("thx.math.scale.Pow::getExponent");
	var $spos = $s.length;
	var $tmp = this._exponent;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Pow.prototype.exponent = function(x) {
	$s.push("thx.math.scale.Pow::exponent");
	var $spos = $s.length;
	var dom = this.getDomain();
	this._exponent = x;
	this.domain(dom[0],dom[1]);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Pow.prototype.__class__ = thx.math.scale.Pow;
thx.data.ValueHandler = function(p) {
	$s.push("thx.data.ValueHandler::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ValueHandler.__name__ = ["thx","data","ValueHandler"];
thx.data.ValueHandler.prototype.value = null;
thx.data.ValueHandler.prototype._stack = null;
thx.data.ValueHandler.prototype._names = null;
thx.data.ValueHandler.prototype.start = function() {
	$s.push("thx.data.ValueHandler::start");
	var $spos = $s.length;
	this._stack = [];
	this._names = [];
	$s.pop();
}
thx.data.ValueHandler.prototype.end = function() {
	$s.push("thx.data.ValueHandler::end");
	var $spos = $s.length;
	this.value = this._stack.pop();
	$s.pop();
}
thx.data.ValueHandler.prototype.startObject = function() {
	$s.push("thx.data.ValueHandler::startObject");
	var $spos = $s.length;
	this._stack.push({ });
	$s.pop();
}
thx.data.ValueHandler.prototype.endObject = function() {
	$s.push("thx.data.ValueHandler::endObject");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ValueHandler.prototype.startField = function(name) {
	$s.push("thx.data.ValueHandler::startField");
	var $spos = $s.length;
	this._names.push(name);
	$s.pop();
}
thx.data.ValueHandler.prototype.endField = function() {
	$s.push("thx.data.ValueHandler::endField");
	var $spos = $s.length;
	var value = this._stack.pop();
	var last = Arrays.last(this._stack);
	last[this._names.pop()] = value;
	$s.pop();
}
thx.data.ValueHandler.prototype.startArray = function() {
	$s.push("thx.data.ValueHandler::startArray");
	var $spos = $s.length;
	this._stack.push([]);
	$s.pop();
}
thx.data.ValueHandler.prototype.endArray = function() {
	$s.push("thx.data.ValueHandler::endArray");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ValueHandler.prototype.startItem = function() {
	$s.push("thx.data.ValueHandler::startItem");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ValueHandler.prototype.endItem = function() {
	$s.push("thx.data.ValueHandler::endItem");
	var $spos = $s.length;
	var value = this._stack.pop();
	var last = Arrays.last(this._stack);
	last.push(value);
	$s.pop();
}
thx.data.ValueHandler.prototype.date = function(d) {
	$s.push("thx.data.ValueHandler::date");
	var $spos = $s.length;
	this._stack.push(d);
	$s.pop();
}
thx.data.ValueHandler.prototype.string = function(s) {
	$s.push("thx.data.ValueHandler::string");
	var $spos = $s.length;
	this._stack.push(s);
	$s.pop();
}
thx.data.ValueHandler.prototype["int"] = function(i) {
	$s.push("thx.data.ValueHandler::int");
	var $spos = $s.length;
	this._stack.push(i);
	$s.pop();
}
thx.data.ValueHandler.prototype["float"] = function(f) {
	$s.push("thx.data.ValueHandler::float");
	var $spos = $s.length;
	this._stack.push(f);
	$s.pop();
}
thx.data.ValueHandler.prototype["null"] = function() {
	$s.push("thx.data.ValueHandler::null");
	var $spos = $s.length;
	this._stack.push(null);
	$s.pop();
}
thx.data.ValueHandler.prototype.bool = function(b) {
	$s.push("thx.data.ValueHandler::bool");
	var $spos = $s.length;
	this._stack.push(b);
	$s.pop();
}
thx.data.ValueHandler.prototype.comment = function(s) {
	$s.push("thx.data.ValueHandler::comment");
	var $spos = $s.length;
	$s.pop();
}
thx.data.ValueHandler.prototype.__class__ = thx.data.ValueHandler;
thx.data.ValueHandler.__interfaces__ = [thx.data.IDataHandler];
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
thx.color.Hsl = function(h,s,l) {
	if( h === $_ ) return;
	$s.push("thx.color.Hsl::new");
	var $spos = $s.length;
	this.hue = h = Floats.circularWrap(h,360);
	this.saturation = s = Floats.normalize(s);
	this.lightness = l = Floats.normalize(l);
	thx.color.Rgb.call(this,Ints.interpolate(thx.color.Hsl._c(h + 120,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h,s,l),0,255,null),Ints.interpolate(thx.color.Hsl._c(h - 120,s,l),0,255,null));
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
	var $tmp = new thx.color.Hsl(Floats.interpolate(t,a.hue,b.hue,interpolator),Floats.interpolate(t,a.saturation,b.saturation,interpolator),Floats.interpolate(t,a.lightness,b.lightness,interpolator));
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
		$s.push("thx.validation.TestCustomValidator::testValidation@32");
		var $spos = $s.length;
		var $tmp = StringTools.replace(v," ","") == v?null:new thx.util.Message("string '{0}' must not contain spaces",null,v);
		$s.pop();
		return $tmp;
		$s.pop();
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
	$s.pop();
}
thx.validation.TestCustomValidator.prototype.__class__ = thx.validation.TestCustomValidator;
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
thx.data.TestValueHandler = function(p) {
	$s.push("thx.data.TestValueHandler::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.TestValueHandler.__name__ = ["thx","data","TestValueHandler"];
thx.data.TestValueHandler.prototype.testBasicValues = function() {
	$s.push("thx.data.TestValueHandler::testBasicValues");
	var $spos = $s.length;
	var ed = Date.fromString("2001-01-02");
	var td = Date.fromString("2001-01-02");
	this.assertHandler(7,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@16");
		var $spos = $s.length;
		h["int"](7);
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 16, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler(0.007,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@17");
		var $spos = $s.length;
		h["float"](0.007);
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 17, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler(true,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@18");
		var $spos = $s.length;
		h.bool(true);
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 18, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler(false,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@19");
		var $spos = $s.length;
		h.bool(false);
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 19, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler("hello",function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@20");
		var $spos = $s.length;
		h.string("hello");
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 20, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler(null,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@21");
		var $spos = $s.length;
		h["null"]();
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 21, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	this.assertHandler(ed,function(h) {
		$s.push("thx.data.TestValueHandler::testBasicValues@22");
		var $spos = $s.length;
		h.date(td);
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 22, className : "thx.data.TestValueHandler", methodName : "testBasicValues"});
	$s.pop();
}
thx.data.TestValueHandler.prototype.testArray = function() {
	$s.push("thx.data.TestValueHandler::testArray");
	var $spos = $s.length;
	this.assertHandler([],function(h) {
		$s.push("thx.data.TestValueHandler::testArray@27");
		var $spos = $s.length;
		h.startArray();
		h.endArray();
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 27, className : "thx.data.TestValueHandler", methodName : "testArray"});
	this.assertHandler(["a",1,true],function(h) {
		$s.push("thx.data.TestValueHandler::testArray@31");
		var $spos = $s.length;
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
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 31, className : "thx.data.TestValueHandler", methodName : "testArray"});
	$s.pop();
}
thx.data.TestValueHandler.prototype.testObject = function() {
	$s.push("thx.data.TestValueHandler::testObject");
	var $spos = $s.length;
	this.assertHandler({ },function(h) {
		$s.push("thx.data.TestValueHandler::testObject@48");
		var $spos = $s.length;
		h.startObject();
		h.endObject();
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 48, className : "thx.data.TestValueHandler", methodName : "testObject"});
	this.assertHandler({ name : "thx", coolness : 5},function(h) {
		$s.push("thx.data.TestValueHandler::testObject@52");
		var $spos = $s.length;
		h.startObject();
		h.startField("name");
		h.string("thx");
		h.endField();
		h.startField("coolness");
		h["int"](5);
		h.endField();
		h.endObject();
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 52, className : "thx.data.TestValueHandler", methodName : "testObject"});
	$s.pop();
}
thx.data.TestValueHandler.prototype.testNested = function() {
	$s.push("thx.data.TestValueHandler::testNested");
	var $spos = $s.length;
	this.assertHandler({ values : [{ id : 0, value : 0.1},{ id : 1, value : 0.2, notes : [1,2,3]}]},function(h) {
		$s.push("thx.data.TestValueHandler::testNested@66");
		var $spos = $s.length;
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
		$s.pop();
	},{ fileName : "TestValueHandler.hx", lineNumber : 66, className : "thx.data.TestValueHandler", methodName : "testNested"});
	$s.pop();
}
thx.data.TestValueHandler.prototype.assertHandler = function(expected,f,pos) {
	$s.push("thx.data.TestValueHandler::assertHandler");
	var $spos = $s.length;
	var h = new thx.data.ValueHandler();
	h.start();
	f(h);
	h.end();
	utest.Assert.same(expected,h.value,null,"expected: " + Dynamics.toString(expected) + " but was " + Dynamics.toString(h.value),pos);
	$s.pop();
}
thx.data.TestValueHandler.prototype.__class__ = thx.data.TestValueHandler;
thx.js.AccessStyle = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessStyle::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	this.name = name;
	$s.pop();
}
thx.js.AccessStyle.__name__ = ["thx","js","AccessStyle"];
thx.js.AccessStyle.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessStyle.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessStyle.prototype.name = null;
thx.js.AccessStyle.prototype.get = function() {
	$s.push("thx.js.AccessStyle::get");
	var $spos = $s.length;
	var n = this.name;
	var $tmp = this.selection.firstNode(function(node) {
		$s.push("thx.js.AccessStyle::get@21");
		var $spos = $s.length;
		var $tmp = js.Lib.window.getComputedStyle(node,null).getPropertyValue(n);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessStyle.prototype.remove = function() {
	$s.push("thx.js.AccessStyle::remove");
	var $spos = $s.length;
	var n = this.name;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessStyle::remove@27");
		var $spos = $s.length;
		node.style.removeProperty(n);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessStyle.prototype.string = function(v,priority) {
	$s.push("thx.js.AccessStyle::string");
	var $spos = $s.length;
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessStyle::string@35");
		var $spos = $s.length;
		node.style.setProperty(n,v,priority);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessStyle.prototype["float"] = function(v,priority) {
	$s.push("thx.js.AccessStyle::float");
	var $spos = $s.length;
	var s = "" + v, n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessStyle::float@44");
		var $spos = $s.length;
		node.style.setProperty(n,s,priority);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessStyle.prototype.__class__ = thx.js.AccessStyle;
thx.js.AccessDataStyle = function(name,selection) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessDataStyle::new");
	var $spos = $s.length;
	thx.js.AccessStyle.call(this,name,selection);
	$s.pop();
}
thx.js.AccessDataStyle.__name__ = ["thx","js","AccessDataStyle"];
thx.js.AccessDataStyle.__super__ = thx.js.AccessStyle;
for(var k in thx.js.AccessStyle.prototype ) thx.js.AccessDataStyle.prototype[k] = thx.js.AccessStyle.prototype[k];
thx.js.AccessDataStyle.prototype.stringf = function(v,priority) {
	$s.push("thx.js.AccessDataStyle::stringf");
	var $spos = $s.length;
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataStyle::stringf@61");
		var $spos = $s.length;
		var s = v(Reflect.field(node,"__data__"),i);
		if(s == null) node.style.removeProperty(n); else node.style.setProperty(n,s,priority);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataStyle.prototype.floatf = function(v,priority) {
	$s.push("thx.js.AccessDataStyle::floatf");
	var $spos = $s.length;
	var n = this.name;
	if(null == priority) priority = null;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataStyle::floatf@75");
		var $spos = $s.length;
		var s = v(Reflect.field(node,"__data__"),i);
		if(s == null) node.style.removeProperty(n); else node.style.setProperty(n,"" + s,priority);
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataStyle.prototype.data = function() {
	$s.push("thx.js.AccessDataStyle::data");
	var $spos = $s.length;
	var $tmp = this.stringf(function(d,_) {
		$s.push("thx.js.AccessDataStyle::data@87");
		var $spos = $s.length;
		var $tmp = "" + d;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataStyle.prototype.__class__ = thx.js.AccessDataStyle;
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
	if(null == f) f = function() {
		$s.push("utest.TestHandler::addAsync@113");
		var $spos = $s.length;
		$s.pop();
	};
	this.asyncStack.add(f);
	var handler = this;
	this.setTimeout(timeout);
	var $tmp = function() {
		$s.push("utest.TestHandler::addAsync@117");
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
		$s.push("utest.TestHandler::addEvent@135");
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
thx.js.BaseTransition = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.BaseTransition::new");
	var $spos = $s.length;
	this.selection = selection;
	var tid = this._transitionId = thx.js.BaseTransition._inheritid > 0?thx.js.BaseTransition._inheritid:++thx.js.BaseTransition._id;
	this._tweens = new Hash();
	this._interpolators = [];
	this._remove = false;
	this._stage = [];
	this._delay = [];
	this._duration = [];
	this._ease = thx.math.Ease.mode(thx.math.EaseMode.EaseInEaseOut,thx.math.Equations.cubic);
	this._step = $closure(this,"step");
	selection.eachNode(function(n,_) {
		$s.push("thx.js.BaseTransition::new@54");
		var $spos = $s.length;
		if(Reflect.hasField(n,"__transition__")) Reflect.field(n,"__transition__").owner = tid; else n["__transition__"] = { owner : tid};
		$s.pop();
	});
	this.delay(null,0);
	this.duration(null,250);
	$s.pop();
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
	$s.push("thx.js.BaseTransition::step");
	var $spos = $s.length;
	var clear = true, k = -1, me = this;
	this.selection.eachNode(function(n,i) {
		$s.push("thx.js.BaseTransition::step@67");
		var $spos = $s.length;
		if(2 == me._stage[++k]) {
			$s.pop();
			return;
		}
		var t = (elapsed - me._delay[k]) / me._duration[k], tx = Reflect.field(n,"__transition__"), te, tk, ik = me._interpolators[k];
		if(t < 1) {
			clear = false;
			if(t < 0) {
				$s.pop();
				return;
			}
		} else t = 1;
		if(null != me._stage[k]) {
			if(null == tx || tx.active != me._transitionId) {
				me._stage[k] = 2;
				$s.pop();
				return;
			}
		} else if(null == tx || tx.active > me._transitionId) {
			me._stage[k] = 2;
			$s.pop();
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
		$s.pop();
	});
	$s.pop();
	return clear;
	$s.pop();
}
thx.js.BaseTransition.prototype.startNode = function(f) {
	$s.push("thx.js.BaseTransition::startNode");
	var $spos = $s.length;
	this._start = f;
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.endNode = function(f) {
	$s.push("thx.js.BaseTransition::endNode");
	var $spos = $s.length;
	this._end = f;
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.stop = function() {
	$s.push("thx.js.BaseTransition::stop");
	var $spos = $s.length;
	var k = -1, me = this;
	this.selection.eachNode(function(n,i) {
		$s.push("thx.js.BaseTransition::stop@156");
		var $spos = $s.length;
		me._stage[++k] = 2;
		Reflect.deleteField(n,"__transition__");
		$s.pop();
	});
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.delay = function(f,v) {
	$s.push("thx.js.BaseTransition::delay");
	var $spos = $s.length;
	if(v == null) v = 0.0;
	var delayMin = Math.POSITIVE_INFINITY, k = -1, me = this;
	if(null != f) this.selection.eachNode(function(n,i) {
		$s.push("thx.js.BaseTransition::delay@170");
		var $spos = $s.length;
		var x = me._delay[++k] = f(n,i);
		if(x < delayMin) delayMin = x;
		$s.pop();
	}); else {
		delayMin = v;
		this.selection.eachNode(function(n,i) {
			$s.push("thx.js.BaseTransition::delay@177");
			var $spos = $s.length;
			me._delay[++k] = delayMin;
			$s.pop();
		});
	}
	thx.js.Timer.timer(this._step,delayMin);
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.duration = function(f,v) {
	$s.push("thx.js.BaseTransition::duration");
	var $spos = $s.length;
	if(v == null) v = 0.0;
	var k = -1, me = this;
	if(null != f) {
		this._durationMax = 0;
		this.selection.eachNode(function(n,i) {
			$s.push("thx.js.BaseTransition::duration@192");
			var $spos = $s.length;
			var x = me._duration[++k] = f(n,i);
			if(x > me._durationMax) me._durationMax = x;
			$s.pop();
		});
	} else {
		this._durationMax = v;
		this.selection.eachNode(function(n,i) {
			$s.push("thx.js.BaseTransition::duration@199");
			var $spos = $s.length;
			me._duration[++k] = me._durationMax;
			$s.pop();
		});
	}
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.ease = function(f,easemode) {
	$s.push("thx.js.BaseTransition::ease");
	var $spos = $s.length;
	this._ease = thx.math.Ease.mode(easemode,f);
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.remove = function(v) {
	$s.push("thx.js.BaseTransition::remove");
	var $spos = $s.length;
	if(v == null) v = true;
	this._remove = v;
	var $tmp = this._this();
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.select = function(selector) {
	$s.push("thx.js.BaseTransition::select");
	var $spos = $s.length;
	var k, t = this.createTransition(this.selection.select(selector));
	t._ease = this._ease;
	var delay = this._delay;
	var duration = this._duration;
	k = -1;
	t.delay(function(d,i) {
		$s.push("thx.js.BaseTransition::select@224");
		var $spos = $s.length;
		var $tmp = delay[++k];
		$s.pop();
		return $tmp;
		$s.pop();
	});
	k = -1;
	t.delay(function(d,i) {
		$s.push("thx.js.BaseTransition::select@225");
		var $spos = $s.length;
		var $tmp = duration[++k];
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return t;
	$s.pop();
}
thx.js.BaseTransition.prototype.selectAll = function(selector) {
	$s.push("thx.js.BaseTransition::selectAll");
	var $spos = $s.length;
	var k, t = this.createTransition(this.selection.selectAll(selector));
	t._ease = this._ease;
	var delay = this._delay;
	var duration = this._duration;
	k = -1;
	t.delay(function(d,i) {
		$s.push("thx.js.BaseTransition::selectAll@235");
		var $spos = $s.length;
		var $tmp = delay[i > 0?k:++k];
		$s.pop();
		return $tmp;
		$s.pop();
	});
	k = -1;
	t.delay(function(d,i) {
		$s.push("thx.js.BaseTransition::selectAll@236");
		var $spos = $s.length;
		var $tmp = duration[i > 0?k:++k];
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return t;
	$s.pop();
}
thx.js.BaseTransition.prototype.createTransition = function(selection) {
	$s.push("thx.js.BaseTransition::createTransition");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw new thx.error.AbstractMethod({ fileName : "Transition.hx", lineNumber : 242, className : "thx.js.BaseTransition", methodName : "createTransition"});
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype._this = function() {
	$s.push("thx.js.BaseTransition::_this");
	var $spos = $s.length;
	var $tmp = this;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BaseTransition.prototype.__class__ = thx.js.BaseTransition;
thx.js.UnboundTransition = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.UnboundTransition::new");
	var $spos = $s.length;
	thx.js.BaseTransition.call(this,selection);
	$s.pop();
}
thx.js.UnboundTransition.__name__ = ["thx","js","UnboundTransition"];
thx.js.UnboundTransition.__super__ = thx.js.BaseTransition;
for(var k in thx.js.BaseTransition.prototype ) thx.js.UnboundTransition.prototype[k] = thx.js.BaseTransition.prototype[k];
thx.js.UnboundTransition.prototype.style = function(name) {
	$s.push("thx.js.UnboundTransition::style");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessTweenStyle(name,this,this._tweens);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundTransition.prototype.attr = function(name) {
	$s.push("thx.js.UnboundTransition::attr");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessTweenAttribute(name,this,this._tweens);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundTransition.prototype.createTransition = function(selection) {
	$s.push("thx.js.UnboundTransition::createTransition");
	var $spos = $s.length;
	var $tmp = new thx.js.UnboundTransition(selection);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.UnboundTransition.prototype.__class__ = thx.js.UnboundTransition;
thx.js.BoundTransition = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.BoundTransition::new");
	var $spos = $s.length;
	thx.js.BaseTransition.call(this,selection);
	$s.pop();
}
thx.js.BoundTransition.__name__ = ["thx","js","BoundTransition"];
thx.js.BoundTransition.__super__ = thx.js.BaseTransition;
for(var k in thx.js.BaseTransition.prototype ) thx.js.BoundTransition.prototype[k] = thx.js.BaseTransition.prototype[k];
thx.js.BoundTransition.prototype.style = function(name) {
	$s.push("thx.js.BoundTransition::style");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataTweenStyle(name,this,this._tweens);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundTransition.prototype.attr = function(name) {
	$s.push("thx.js.BoundTransition::attr");
	var $spos = $s.length;
	var $tmp = new thx.js.AccessDataTweenAttribute(name,this,this._tweens);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundTransition.prototype.start = function(f) {
	$s.push("thx.js.BoundTransition::start");
	var $spos = $s.length;
	var $tmp = this.startNode(function(n,i) {
		$s.push("thx.js.BoundTransition::start@271");
		var $spos = $s.length;
		f(Reflect.field(n,"__data__"),i);
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundTransition.prototype.end = function(f) {
	$s.push("thx.js.BoundTransition::end");
	var $spos = $s.length;
	var $tmp = this.endNode(function(n,i) {
		$s.push("thx.js.BoundTransition::end@276");
		var $spos = $s.length;
		f(Reflect.field(n,"__data__"),i);
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundTransition.prototype.createTransition = function(selection) {
	$s.push("thx.js.BoundTransition::createTransition");
	var $spos = $s.length;
	var $tmp = new thx.js.BoundTransition(selection);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.BoundTransition.prototype.__class__ = thx.js.BoundTransition;
thx.ini.IniDecoder = function(handler,explodesections,emptytonull) {
	if( handler === $_ ) return;
	$s.push("thx.ini.IniDecoder::new");
	var $spos = $s.length;
	if(emptytonull == null) emptytonull = true;
	if(explodesections == null) explodesections = true;
	this.explodesections = explodesections;
	if(explodesections) {
		this.handler = this.value = new thx.data.ValueHandler();
		this.other = handler;
	} else this.handler = handler;
	this.emptytonull = emptytonull;
	$s.pop();
}
thx.ini.IniDecoder.__name__ = ["thx","ini","IniDecoder"];
thx.ini.IniDecoder.explodeSections = function(o) {
	$s.push("thx.ini.IniDecoder::explodeSections");
	var $spos = $s.length;
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
	$s.pop();
	return o;
	$s.pop();
}
thx.ini.IniDecoder.prototype.emptytonull = null;
thx.ini.IniDecoder.prototype.explodesections = null;
thx.ini.IniDecoder.prototype.handler = null;
thx.ini.IniDecoder.prototype.other = null;
thx.ini.IniDecoder.prototype.value = null;
thx.ini.IniDecoder.prototype.insection = null;
thx.ini.IniDecoder.prototype.decode = function(s) {
	$s.push("thx.ini.IniDecoder::decode");
	var $spos = $s.length;
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
	$s.pop();
}
thx.ini.IniDecoder.prototype.decodeLines = function(s) {
	$s.push("thx.ini.IniDecoder::decodeLines");
	var $spos = $s.length;
	var lines = new EReg("(\n\r|\n|\r)","g").split(s);
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		this.decodeLine(line);
	}
	$s.pop();
}
thx.ini.IniDecoder.prototype.decodeLine = function(line) {
	$s.push("thx.ini.IniDecoder::decodeLine");
	var $spos = $s.length;
	if(StringTools.trim(line) == "") {
		$s.pop();
		return;
	}
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
		$s.pop();
		return;
	case "#":case ";":
		this.handler.comment(line.substr(1));
		$s.pop();
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
	$s.pop();
}
thx.ini.IniDecoder.prototype.dec = function(s) {
	$s.push("thx.ini.IniDecoder::dec");
	var $spos = $s.length;
	var _g1 = 0, _g = thx.ini.IniEncoder.encoded.length;
	while(_g1 < _g) {
		var i = _g1++;
		s = StringTools.replace(s,thx.ini.IniEncoder.encoded[i],thx.ini.IniEncoder.decoded[i]);
	}
	$s.pop();
	return s;
	$s.pop();
}
thx.ini.IniDecoder.prototype.decodeValue = function(s) {
	$s.push("thx.ini.IniDecoder::decodeValue");
	var $spos = $s.length;
	s = StringTools.trim(s);
	var c = s.substr(0,1);
	if(c == "\"" || c == "'" && s.substr(-1) == c) {
		this.handler.string(this.dec(s.substr(1,s.length - 2)));
		$s.pop();
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
	$s.pop();
}
thx.ini.IniDecoder.prototype.__class__ = thx.ini.IniDecoder;
if(!thx.type) thx.type = {}
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
	if((stop - start) / step == Math.POSITIVE_INFINITY) throw new thx.error.Error("infinite range",null,null,{ fileName : "Ints.hx", lineNumber : 19, className : "Ints", methodName : "range"});
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
Ints.interpolate = function(f,min,max,interpolator) {
	$s.push("Ints::interpolate");
	var $spos = $s.length;
	if(max == null) max = 100.0;
	if(min == null) min = 0.0;
	if(null == interpolator) interpolator = thx.math.Equations.linear;
	var $tmp = Math.round(min + interpolator(f) * (max - min));
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.interpolatef = function(min,max,interpolator) {
	$s.push("Ints::interpolatef");
	var $spos = $s.length;
	if(max == null) max = 1.0;
	if(min == null) min = 0.0;
	if(null == interpolator) interpolator = thx.math.Equations.linear;
	var d = max - min;
	var $tmp = function(f) {
		$s.push("Ints::interpolatef@85");
		var $spos = $s.length;
		var $tmp = Math.round(min + interpolator(f) * d);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.ascending = function(a,b) {
	$s.push("Ints::ascending");
	var $spos = $s.length;
	var $tmp = a < b?-1:a > b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.descending = function(a,b) {
	$s.push("Ints::descending");
	var $spos = $s.length;
	var $tmp = a > b?-1:a < b?1:0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.format = function(v,param,params,culture) {
	$s.push("Ints::format");
	var $spos = $s.length;
	var $tmp = (Ints.formatf(param,params,culture))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.formatf = function(param,params,culture) {
	$s.push("Ints::formatf");
	var $spos = $s.length;
	var $tmp = Floats.formatf(null,thx.culture.FormatParams.params(param,params,"I"),culture);
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.canParse = function(s) {
	$s.push("Ints::canParse");
	var $spos = $s.length;
	var $tmp = Ints._reparse.match(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.parse = function(s) {
	$s.push("Ints::parse");
	var $spos = $s.length;
	if(s.substr(0,1) == "+") s = s.substr(1);
	var $tmp = Std.parseInt(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.compare = function(a,b) {
	$s.push("Ints::compare");
	var $spos = $s.length;
	var $tmp = a - b;
	$s.pop();
	return $tmp;
	$s.pop();
}
Ints.prototype.__class__ = Ints;
thx.svg.Line = function(x,y,interpolator) {
	if( x === $_ ) return;
	$s.push("thx.svg.Line::new");
	var $spos = $s.length;
	this._x = x;
	this._y = y;
	this._interpolator = interpolator;
	$s.pop();
}
thx.svg.Line.__name__ = ["thx","svg","Line"];
thx.svg.Line.pointArray = function(interpolator) {
	$s.push("thx.svg.Line::pointArray");
	var $spos = $s.length;
	var $tmp = new thx.svg.Line(function(d,_) {
		$s.push("thx.svg.Line::pointArray@53");
		var $spos = $s.length;
		var $tmp = d[0];
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Line::pointArray@53");
		var $spos = $s.length;
		var $tmp = d[1];
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.pointObject = function(interpolator) {
	$s.push("thx.svg.Line::pointObject");
	var $spos = $s.length;
	var $tmp = new thx.svg.Line(function(d,_) {
		$s.push("thx.svg.Line::pointObject@58");
		var $spos = $s.length;
		var $tmp = d.x;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Line::pointObject@58");
		var $spos = $s.length;
		var $tmp = d.y;
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.prototype._x = null;
thx.svg.Line.prototype._y = null;
thx.svg.Line.prototype._interpolator = null;
thx.svg.Line.prototype.shape = function(data,i) {
	$s.push("thx.svg.Line::shape");
	var $spos = $s.length;
	var $tmp = data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y),this._interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.prototype.getInterpolator = function() {
	$s.push("thx.svg.Line::getInterpolator");
	var $spos = $s.length;
	var $tmp = this._interpolator;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.prototype.interpolator = function(type) {
	$s.push("thx.svg.Line::interpolator");
	var $spos = $s.length;
	this._interpolator = type;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Line.prototype.getX = function() {
	$s.push("thx.svg.Line::getX");
	var $spos = $s.length;
	var $tmp = this._x;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.prototype.x = function(v) {
	$s.push("thx.svg.Line::x");
	var $spos = $s.length;
	this._x = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Line.prototype.getY = function() {
	$s.push("thx.svg.Line::getY");
	var $spos = $s.length;
	var $tmp = this._y;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Line.prototype.y = function(v) {
	$s.push("thx.svg.Line::y");
	var $spos = $s.length;
	this._y = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Line.prototype.__class__ = thx.svg.Line;
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
	runner.addCase(new thx.color.TestColors());
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
thx.load.TestAll = function(p) {
	$s.push("thx.load.TestAll::new");
	var $spos = $s.length;
	$s.pop();
}
thx.load.TestAll.__name__ = ["thx","load","TestAll"];
thx.load.TestAll.addTests = function(runner) {
	$s.push("thx.load.TestAll::addTests");
	var $spos = $s.length;
	runner.addCase(new thx.load.TestMemoryLoader());
	$s.pop();
}
thx.load.TestAll.main = function() {
	$s.push("thx.load.TestAll::main");
	var $spos = $s.length;
	var runner = new utest.Runner();
	thx.load.TestAll.addTests(runner);
	utest.ui.Report.create(runner);
	runner.run();
	$s.pop();
}
thx.load.TestAll.prototype.__class__ = thx.load.TestAll;
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
thx.ini.IniEncoder = function(newline,ignorecomments) {
	if( newline === $_ ) return;
	$s.push("thx.ini.IniEncoder::new");
	var $spos = $s.length;
	if(ignorecomments == null) ignorecomments = true;
	if(newline == null) newline = "\n";
	this.newline = newline;
	this.ignorecomments = ignorecomments;
	$s.pop();
}
thx.ini.IniEncoder.__name__ = ["thx","ini","IniEncoder"];
thx.ini.IniEncoder.prototype.ignorecomments = null;
thx.ini.IniEncoder.prototype.newline = null;
thx.ini.IniEncoder.prototype.buf = null;
thx.ini.IniEncoder.prototype.encodedString = null;
thx.ini.IniEncoder.prototype.inarray = null;
thx.ini.IniEncoder.prototype.cache = null;
thx.ini.IniEncoder.prototype.value = null;
thx.ini.IniEncoder.prototype.stack = null;
thx.ini.IniEncoder.prototype.start = function() {
	$s.push("thx.ini.IniEncoder::start");
	var $spos = $s.length;
	this.inarray = 0;
	this.stack = [];
	this.cache = new Hash();
	$s.pop();
}
thx.ini.IniEncoder.prototype.end = function() {
	$s.push("thx.ini.IniEncoder::end");
	var $spos = $s.length;
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
	$s.pop();
}
thx.ini.IniEncoder.prototype.startObject = function() {
	$s.push("thx.ini.IniEncoder::startObject");
	var $spos = $s.length;
	if(this.inarray > 0) throw new thx.error.Error("arrays must contain only primitive values",null,null,{ fileName : "IniEncoder.hx", lineNumber : 60, className : "thx.ini.IniEncoder", methodName : "startObject"});
	$s.pop();
}
thx.ini.IniEncoder.prototype.startField = function(name) {
	$s.push("thx.ini.IniEncoder::startField");
	var $spos = $s.length;
	this.stack.push(this.enc(name));
	this.value = "";
	$s.pop();
}
thx.ini.IniEncoder.prototype.endField = function() {
	$s.push("thx.ini.IniEncoder::endField");
	var $spos = $s.length;
	if(null == this.value) {
		$s.pop();
		return;
	}
	var key = this.stack.pop();
	var name = this.stack.join(".");
	var section = this.getSection(name);
	section.push(key + "=" + this.value);
	this.value = null;
	$s.pop();
}
thx.ini.IniEncoder.prototype.getSection = function(name) {
	$s.push("thx.ini.IniEncoder::getSection");
	var $spos = $s.length;
	var section = this.cache.get(name);
	if(null == section) {
		section = [];
		this.cache.set(name,section);
	}
	$s.pop();
	return section;
	$s.pop();
}
thx.ini.IniEncoder.prototype.endObject = function() {
	$s.push("thx.ini.IniEncoder::endObject");
	var $spos = $s.length;
	this.stack.pop();
	$s.pop();
}
thx.ini.IniEncoder.prototype.startArray = function() {
	$s.push("thx.ini.IniEncoder::startArray");
	var $spos = $s.length;
	if(this.inarray > 0) throw new thx.error.Error("nested arrays are not supported in the .ini format",null,null,{ fileName : "IniEncoder.hx", lineNumber : 99, className : "thx.ini.IniEncoder", methodName : "startArray"});
	this.inarray = 1;
	this.value = "";
	$s.pop();
}
thx.ini.IniEncoder.prototype.startItem = function() {
	$s.push("thx.ini.IniEncoder::startItem");
	var $spos = $s.length;
	if(this.inarray == 1) this.inarray = 2; else this.value += ", ";
	$s.pop();
}
thx.ini.IniEncoder.prototype.endItem = function() {
	$s.push("thx.ini.IniEncoder::endItem");
	var $spos = $s.length;
	$s.pop();
}
thx.ini.IniEncoder.prototype.endArray = function() {
	$s.push("thx.ini.IniEncoder::endArray");
	var $spos = $s.length;
	this.inarray = 0;
	$s.pop();
}
thx.ini.IniEncoder.prototype.date = function(d) {
	$s.push("thx.ini.IniEncoder::date");
	var $spos = $s.length;
	if(d.getSeconds() == 0 && d.getMinutes() == 0 && d.getHours() == 0) this.value += Dates.format(d,"C",["%Y-%m-%d"]); else this.value += Dates.format(d,"C",["%Y-%m-%d %H:%M:%S"]);
	$s.pop();
}
thx.ini.IniEncoder.prototype.string = function(s) {
	$s.push("thx.ini.IniEncoder::string");
	var $spos = $s.length;
	if(StringTools.trim(s) == s) this.value += this.enc(s); else this.value += this.quote(s);
	$s.pop();
}
thx.ini.IniEncoder.prototype.enc = function(s) {
	$s.push("thx.ini.IniEncoder::enc");
	var $spos = $s.length;
	var _g1 = 0, _g = thx.ini.IniEncoder.decoded.length;
	while(_g1 < _g) {
		var i = _g1++;
		s = StringTools.replace(s,thx.ini.IniEncoder.decoded[i],thx.ini.IniEncoder.encoded[i]);
	}
	$s.pop();
	return s;
	$s.pop();
}
thx.ini.IniEncoder.prototype.quote = function(s) {
	$s.push("thx.ini.IniEncoder::quote");
	var $spos = $s.length;
	var $tmp = "\"" + StringTools.replace(this.enc(s),"\"","\\\"") + "\"";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.ini.IniEncoder.prototype["int"] = function(i) {
	$s.push("thx.ini.IniEncoder::int");
	var $spos = $s.length;
	this.value += i;
	$s.pop();
}
thx.ini.IniEncoder.prototype["float"] = function(f) {
	$s.push("thx.ini.IniEncoder::float");
	var $spos = $s.length;
	this.value += f;
	$s.pop();
}
thx.ini.IniEncoder.prototype["null"] = function() {
	$s.push("thx.ini.IniEncoder::null");
	var $spos = $s.length;
	this.value += "";
	$s.pop();
}
thx.ini.IniEncoder.prototype.comment = function(s) {
	$s.push("thx.ini.IniEncoder::comment");
	var $spos = $s.length;
	if(!this.ignorecomments) this.value += "#" + s;
	$s.pop();
}
thx.ini.IniEncoder.prototype.bool = function(b) {
	$s.push("thx.ini.IniEncoder::bool");
	var $spos = $s.length;
	this.value += b?"ON":"OFF";
	$s.pop();
}
thx.ini.IniEncoder.prototype.__class__ = thx.ini.IniEncoder;
thx.ini.IniEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.svg.Area = function(x,y0,y1,interpolator) {
	if( x === $_ ) return;
	$s.push("thx.svg.Area::new");
	var $spos = $s.length;
	this._x = x;
	this._y0 = y0;
	this._y1 = y1;
	this._interpolator = interpolator;
	$s.pop();
}
thx.svg.Area.__name__ = ["thx","svg","Area"];
thx.svg.Area.pointArray = function(interpolator) {
	$s.push("thx.svg.Area::pointArray");
	var $spos = $s.length;
	var $tmp = new thx.svg.Area(function(d,_) {
		$s.push("thx.svg.Area::pointArray@65");
		var $spos = $s.length;
		var $tmp = d[0];
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointArray@65");
		var $spos = $s.length;
		var $tmp = d[1];
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointArray@65");
		var $spos = $s.length;
		var $tmp = d[2];
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.pointObject = function(interpolator) {
	$s.push("thx.svg.Area::pointObject");
	var $spos = $s.length;
	var $tmp = new thx.svg.Area(function(d,_) {
		$s.push("thx.svg.Area::pointObject@70");
		var $spos = $s.length;
		var $tmp = d.x;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointObject@70");
		var $spos = $s.length;
		var $tmp = d.y0;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointObject@70");
		var $spos = $s.length;
		var $tmp = d.y1;
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.pointArray2 = function(interpolator) {
	$s.push("thx.svg.Area::pointArray2");
	var $spos = $s.length;
	var $tmp = new thx.svg.Area(function(d,_) {
		$s.push("thx.svg.Area::pointArray2@75");
		var $spos = $s.length;
		var $tmp = d[0];
		$s.pop();
		return $tmp;
		$s.pop();
	},function(_,_1) {
		$s.push("thx.svg.Area::pointArray2@75");
		var $spos = $s.length;
		$s.pop();
		return 0.0;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointArray2@75");
		var $spos = $s.length;
		var $tmp = d[1];
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.pointObjectXY = function(interpolator) {
	$s.push("thx.svg.Area::pointObjectXY");
	var $spos = $s.length;
	var $tmp = new thx.svg.Area(function(d,_) {
		$s.push("thx.svg.Area::pointObjectXY@80");
		var $spos = $s.length;
		var $tmp = d.x;
		$s.pop();
		return $tmp;
		$s.pop();
	},function(_,_1) {
		$s.push("thx.svg.Area::pointObjectXY@80");
		var $spos = $s.length;
		$s.pop();
		return 0.0;
		$s.pop();
	},function(d,_) {
		$s.push("thx.svg.Area::pointObjectXY@80");
		var $spos = $s.length;
		var $tmp = d.y;
		$s.pop();
		return $tmp;
		$s.pop();
	},interpolator);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype._x = null;
thx.svg.Area.prototype._y0 = null;
thx.svg.Area.prototype._y1 = null;
thx.svg.Area.prototype._interpolator = null;
thx.svg.Area.prototype.shape = function(data,i) {
	$s.push("thx.svg.Area::shape");
	var $spos = $s.length;
	var second = thx.svg.LineInternals.linePoints(data,this._x,this._y0);
	second.reverse();
	var $tmp = data.length < 1?null:"M" + thx.svg.LineInternals.interpolatePoints(thx.svg.LineInternals.linePoints(data,this._x,this._y1),this._interpolator) + "L" + thx.svg.LineInternals.interpolatePoints(second,this._interpolator) + "Z";
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype.getInterpolator = function() {
	$s.push("thx.svg.Area::getInterpolator");
	var $spos = $s.length;
	var $tmp = this._interpolator;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype.interpolator = function(type) {
	$s.push("thx.svg.Area::interpolator");
	var $spos = $s.length;
	this._interpolator = type;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Area.prototype.getX = function() {
	$s.push("thx.svg.Area::getX");
	var $spos = $s.length;
	var $tmp = this._x;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype.x = function(v) {
	$s.push("thx.svg.Area::x");
	var $spos = $s.length;
	this._x = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Area.prototype.getY0 = function() {
	$s.push("thx.svg.Area::getY0");
	var $spos = $s.length;
	var $tmp = this._y0;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype.y0 = function(v) {
	$s.push("thx.svg.Area::y0");
	var $spos = $s.length;
	this._y0 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Area.prototype.getY1 = function() {
	$s.push("thx.svg.Area::getY1");
	var $spos = $s.length;
	var $tmp = this._y1;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.Area.prototype.y1 = function(v) {
	$s.push("thx.svg.Area::y1");
	var $spos = $s.length;
	this._y1 = v;
	$s.pop();
	return this;
	$s.pop();
}
thx.svg.Area.prototype.__class__ = thx.svg.Area;
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
	utest.Assert.isTrue(Types.sameAs(1,2),null,{ fileName : "TestTypes.hx", lineNumber : 33, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isTrue(Types.sameAs("a","b"),null,{ fileName : "TestTypes.hx", lineNumber : 34, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 35, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(Types.sameAs(1,"a"),null,{ fileName : "TestTypes.hx", lineNumber : 36, className : "thx.type.TestTypes", methodName : "testSameAs"});
	utest.Assert.isFalse(Types.sameAs(1,null),null,{ fileName : "TestTypes.hx", lineNumber : 37, className : "thx.type.TestTypes", methodName : "testSameAs"});
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
	utest.Assert.equals("null",Types.typeName(null),null,{ fileName : "TestTypes.hx", lineNumber : 64, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("thx.type.TestTypes",Types.typeName(this),null,{ fileName : "TestTypes.hx", lineNumber : 65, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Int",Types.typeName(1),null,{ fileName : "TestTypes.hx", lineNumber : 66, className : "thx.type.TestTypes", methodName : "testTypeName"});
	utest.Assert.equals("Bool",Types.typeName(true),null,{ fileName : "TestTypes.hx", lineNumber : 67, className : "thx.type.TestTypes", methodName : "testTypeName"});
	$s.pop();
}
thx.type.TestTypes.prototype.__class__ = thx.type.TestTypes;
thx.json.JsonEncoder = function(p) {
	$s.push("thx.json.JsonEncoder::new");
	var $spos = $s.length;
	$s.pop();
}
thx.json.JsonEncoder.__name__ = ["thx","json","JsonEncoder"];
thx.json.JsonEncoder.prototype.encodedString = null;
thx.json.JsonEncoder.prototype.buf = null;
thx.json.JsonEncoder.prototype.lvl = null;
thx.json.JsonEncoder.prototype.count = null;
thx.json.JsonEncoder.prototype.start = function() {
	$s.push("thx.json.JsonEncoder::start");
	var $spos = $s.length;
	this.lvl = 0;
	this.buf = new StringBuf();
	this.encodedString = null;
	this.count = [];
	$s.pop();
}
thx.json.JsonEncoder.prototype.end = function() {
	$s.push("thx.json.JsonEncoder::end");
	var $spos = $s.length;
	this.encodedString = this.buf.b.join("");
	this.buf = null;
	$s.pop();
}
thx.json.JsonEncoder.prototype.startObject = function() {
	$s.push("thx.json.JsonEncoder::startObject");
	var $spos = $s.length;
	this.buf.add("{");
	this.count.push(0);
	$s.pop();
}
thx.json.JsonEncoder.prototype.startField = function(name) {
	$s.push("thx.json.JsonEncoder::startField");
	var $spos = $s.length;
	if(this.count[this.count.length - 1]++ > 0) this.buf.add(",");
	this.buf.add(this.quote(name) + ":");
	$s.pop();
}
thx.json.JsonEncoder.prototype.endField = function() {
	$s.push("thx.json.JsonEncoder::endField");
	var $spos = $s.length;
	$s.pop();
}
thx.json.JsonEncoder.prototype.endObject = function() {
	$s.push("thx.json.JsonEncoder::endObject");
	var $spos = $s.length;
	this.buf.add("}");
	this.count.pop();
	$s.pop();
}
thx.json.JsonEncoder.prototype.startArray = function() {
	$s.push("thx.json.JsonEncoder::startArray");
	var $spos = $s.length;
	this.buf.add("[");
	this.count.push(0);
	$s.pop();
}
thx.json.JsonEncoder.prototype.startItem = function() {
	$s.push("thx.json.JsonEncoder::startItem");
	var $spos = $s.length;
	if(this.count[this.count.length - 1]++ > 0) this.buf.add(",");
	$s.pop();
}
thx.json.JsonEncoder.prototype.endItem = function() {
	$s.push("thx.json.JsonEncoder::endItem");
	var $spos = $s.length;
	$s.pop();
}
thx.json.JsonEncoder.prototype.endArray = function() {
	$s.push("thx.json.JsonEncoder::endArray");
	var $spos = $s.length;
	this.buf.add("]");
	this.count.pop();
	$s.pop();
}
thx.json.JsonEncoder.prototype.date = function(d) {
	$s.push("thx.json.JsonEncoder::date");
	var $spos = $s.length;
	this.buf.add(d.getTime());
	$s.pop();
}
thx.json.JsonEncoder.prototype.string = function(s) {
	$s.push("thx.json.JsonEncoder::string");
	var $spos = $s.length;
	this.buf.add(this.quote(s));
	$s.pop();
}
thx.json.JsonEncoder.prototype["int"] = function(i) {
	$s.push("thx.json.JsonEncoder::int");
	var $spos = $s.length;
	this.buf.add(i);
	$s.pop();
}
thx.json.JsonEncoder.prototype["float"] = function(f) {
	$s.push("thx.json.JsonEncoder::float");
	var $spos = $s.length;
	this.buf.add(f);
	$s.pop();
}
thx.json.JsonEncoder.prototype["null"] = function() {
	$s.push("thx.json.JsonEncoder::null");
	var $spos = $s.length;
	this.buf.add("null");
	$s.pop();
}
thx.json.JsonEncoder.prototype.bool = function(b) {
	$s.push("thx.json.JsonEncoder::bool");
	var $spos = $s.length;
	this.buf.add(b?"true":"false");
	$s.pop();
}
thx.json.JsonEncoder.prototype.comment = function(s) {
	$s.push("thx.json.JsonEncoder::comment");
	var $spos = $s.length;
	$s.pop();
}
thx.json.JsonEncoder.prototype.quote = function(s) {
	$s.push("thx.json.JsonEncoder::quote");
	var $spos = $s.length;
	var $tmp = "\"" + new EReg(".","").customReplace(new EReg("(\n)","g").replace(new EReg("(\"|\\\\)","g").replace(s,"\\$1"),"\\n"),function(r) {
		$s.push("thx.json.JsonEncoder::quote@100");
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
thx.json.JsonEncoder.prototype.__class__ = thx.json.JsonEncoder;
thx.json.JsonEncoder.__interfaces__ = [thx.data.IDataHandler];
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
	thx.culture.Culture.setDefaultCulture(thx.cultures.EnUS.getCulture());
	thx.js.TestAll.addTests(runner);
	thx.collections.TestAll.addTests(runner);
	thx.color.TestAll.addTests(runner);
	runner.addCase(new thx.data.TestValueEncoder());
	runner.addCase(new thx.data.TestValueHandler());
	runner.addCase(new thx.csv.TestCsv());
	runner.addCase(new thx.json.TestJson());
	runner.addCase(new thx.ini.TestIni());
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
	TestAllExp.addTests(runner);
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
		utest.Assert.equals(item.expected,Strings.ucwordsws(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 41, className : "TestStrings", methodName : "testUcwordsws"});
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
		utest.Assert.equals(item.expected,Strings.ucwords(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 54, className : "TestStrings", methodName : "testUcwords"});
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
		utest.Assert.equals(item.expected,Strings.isAlphaNum(item.test),null,{ fileName : "TestStrings.hx", lineNumber : 67, className : "TestStrings", methodName : "testAlphaNum"});
	}
	$s.pop();
}
TestStrings.prototype.testFormat = function() {
	$s.push("TestStrings::testFormat");
	var $spos = $s.length;
	utest.Assert.equals("CAB",Strings.format("{2}{0}{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 72, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("C.A.B",Strings.format("{2}.{0}.{1}",["A","B","C"]),null,{ fileName : "TestStrings.hx", lineNumber : 73, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("X.",Strings.format("{0:T,1,.}",["XYZ"]),null,{ fileName : "TestStrings.hx", lineNumber : 74, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("{0INVALIDMODIFIER}",Strings.format("{0INVALIDMODIFIER}",["X"]),null,{ fileName : "TestStrings.hx", lineNumber : 75, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("$1,000.01",Strings.format("{0:C}",[1000.01]),null,{ fileName : "TestStrings.hx", lineNumber : 76, className : "TestStrings", methodName : "testFormat"});
	utest.Assert.equals("€ 1.000,01",Strings.format("{0:C}",[1000.01],null,thx.cultures.ItIT.getCulture()),null,{ fileName : "TestStrings.hx", lineNumber : 77, className : "TestStrings", methodName : "testFormat"});
	$s.pop();
}
TestStrings.prototype.testHumanize = function() {
	$s.push("TestStrings::testHumanize");
	var $spos = $s.length;
	utest.Assert.equals("hello world",Strings.humanize("helloWorld"),null,{ fileName : "TestStrings.hx", lineNumber : 82, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("my long string",Strings.humanize("my_long_string"),null,{ fileName : "TestStrings.hx", lineNumber : 83, className : "TestStrings", methodName : "testHumanize"});
	utest.Assert.equals("ignore many",Strings.humanize("ignoreMANY"),null,{ fileName : "TestStrings.hx", lineNumber : 84, className : "TestStrings", methodName : "testHumanize"});
	$s.pop();
}
TestStrings.prototype.testWrapColumn = function() {
	$s.push("TestStrings::testWrapColumn");
	var $spos = $s.length;
	var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\nconsectetur\nadipisicing elit,\nsed do eiusmod\ntempor incididunt ut\nlabore et dolore\nmagna aliqua. Ut\nenim ad minim\nveniam, quis nostrud\nexercitation ullamco\nlaboris nisi ut\naliquip ex ea\ncommodo consequat.",Strings.wrapColumns(text,20),null,{ fileName : "TestStrings.hx", lineNumber : 91, className : "TestStrings", methodName : "testWrapColumn"});
	utest.Assert.equals("    Lorem ipsum\n    dolor sit amet,\n    consectetur\n    adipisicing\n    elit, sed do\n    eiusmod tempor\n    incididunt ut\n    labore et dolore\n    magna aliqua. Ut\n    enim ad minim\n    veniam, quis\n    nostrud\n    exercitation\n    ullamco laboris\n    nisi ut aliquip\n    ex ea commodo\n    consequat.",Strings.wrapColumns(text,20,"    "),null,{ fileName : "TestStrings.hx", lineNumber : 108, className : "TestStrings", methodName : "testWrapColumn"});
	$s.pop();
}
TestStrings.prototype.testWrapColumnPreserveNewLines = function() {
	$s.push("TestStrings::testWrapColumnPreserveNewLines");
	var $spos = $s.length;
	var text = "Lorem ipsum dolor sit amet,\n\nconsectetur adipisicing elit";
	utest.Assert.equals("Lorem ipsum dolor\nsit amet,\n\nconsectetur\nadipisicing elit",Strings.wrapColumns(text,18),null,{ fileName : "TestStrings.hx", lineNumber : 133, className : "TestStrings", methodName : "testWrapColumnPreserveNewLines"});
	$s.pop();
}
TestStrings.prototype.testWrapColumnLong = function() {
	$s.push("TestStrings::testWrapColumnLong");
	var $spos = $s.length;
	var text = "aaaaaaaaaa aaaa aaa aa";
	utest.Assert.equals("aaaaaaaaaa\naaaa\naaa aa",Strings.wrapColumns(text,6),null,{ fileName : "TestStrings.hx", lineNumber : 145, className : "TestStrings", methodName : "testWrapColumnLong"});
	$s.pop();
}
TestStrings.prototype.testInterpolate = function() {
	$s.push("TestStrings::testInterpolate");
	var $spos = $s.length;
	var a = Floats.interpolatef(10,100);
	var b = Floats.interpolatef(20,200);
	var tests = [{ test : function(t) {
		$s.push("TestStrings::testInterpolate@157");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t);
		$s.pop();
		return $tmp;
		$s.pop();
	}, a : "a10b20", b : "a100b200"},{ test : function(t) {
		$s.push("TestStrings::testInterpolate@158");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t);
		$s.pop();
		return $tmp;
		$s.pop();
	}, a : "a10b20c10", b : "a100b200"},{ test : function(t) {
		$s.push("TestStrings::testInterpolate@159");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t) + "c10";
		$s.pop();
		return $tmp;
		$s.pop();
	}, a : "a10b20", b : "a100b200c10"},{ test : function(t) {
		$s.push("TestStrings::testInterpolate@160");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t) + "s";
		$s.pop();
		return $tmp;
		$s.pop();
	}, a : "a10b20s", b : "a100b200s"},{ test : function(t) {
		$s.push("TestStrings::testInterpolate@161");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t);
		$s.pop();
		return $tmp;
		$s.pop();
	}, a : "a10b20s", b : "a100b200"},{ test : function(t) {
		$s.push("TestStrings::testInterpolate@162");
		var $spos = $s.length;
		var $tmp = "a" + a(t) + "b" + b(t) + "s";
		$s.pop();
		return $tmp;
		$s.pop();
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
	$s.pop();
}
TestStrings.prototype.__class__ = TestStrings;
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
	utest.Assert.floatEquals(0.0,Floats.normalize(0.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 11, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 12, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.5,Floats.normalize(0.5),null,null,{ fileName : "TestFloats.hx", lineNumber : 13, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(0.0,Floats.normalize(-1.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 14, className : "TestFloats", methodName : "testNormalize"});
	utest.Assert.floatEquals(1.0,Floats.normalize(10.0),null,null,{ fileName : "TestFloats.hx", lineNumber : 15, className : "TestFloats", methodName : "testNormalize"});
	$s.pop();
}
TestFloats.prototype.testAbs = function() {
	$s.push("TestFloats::testAbs");
	var $spos = $s.length;
	utest.Assert.floatEquals(0.1,0.1 < 0?-0.1:0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 20, className : "TestFloats", methodName : "testAbs"});
	utest.Assert.floatEquals(0.1,-0.1 < 0?0.1:-0.1,null,null,{ fileName : "TestFloats.hx", lineNumber : 21, className : "TestFloats", methodName : "testAbs"});
	$s.pop();
}
TestFloats.prototype.testClamp = function() {
	$s.push("TestFloats::testClamp");
	var $spos = $s.length;
	utest.Assert.floatEquals(10,Floats.clamp(0,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 27, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(10,Floats.clamp(10,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 28, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(50,Floats.clamp(50,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 29, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(100,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 30, className : "TestFloats", methodName : "testClamp"});
	utest.Assert.floatEquals(100,Floats.clamp(110,10,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 31, className : "TestFloats", methodName : "testClamp"});
	$s.pop();
}
TestFloats.prototype.testClampSym = function() {
	$s.push("TestFloats::testClampSym");
	var $spos = $s.length;
	utest.Assert.floatEquals(-10,Floats.clampSym(-100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 36, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(10,Floats.clampSym(100,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 37, className : "TestFloats", methodName : "testClampSym"});
	utest.Assert.floatEquals(0,Floats.clampSym(0,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 38, className : "TestFloats", methodName : "testClampSym"});
	$s.pop();
}
TestFloats.prototype.testMax = function() {
	$s.push("TestFloats::testMax");
	var $spos = $s.length;
	utest.Assert.floatEquals(10,10,null,null,{ fileName : "TestFloats.hx", lineNumber : 43, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 44, className : "TestFloats", methodName : "testMax"});
	utest.Assert.floatEquals(-5,-5,null,null,{ fileName : "TestFloats.hx", lineNumber : 45, className : "TestFloats", methodName : "testMax"});
	$s.pop();
}
TestFloats.prototype.testMin = function() {
	$s.push("TestFloats::testMin");
	var $spos = $s.length;
	utest.Assert.floatEquals(5,5,null,null,{ fileName : "TestFloats.hx", lineNumber : 50, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 51, className : "TestFloats", methodName : "testMin"});
	utest.Assert.floatEquals(-10,-10,null,null,{ fileName : "TestFloats.hx", lineNumber : 52, className : "TestFloats", methodName : "testMin"});
	$s.pop();
}
TestFloats.prototype.testRange = function() {
	$s.push("TestFloats::testRange");
	var $spos = $s.length;
	utest.Assert.same([0.1,0.2,0.3,0.4],Floats.range(0.1,0.5,0.1),null,null,{ fileName : "TestFloats.hx", lineNumber : 57, className : "TestFloats", methodName : "testRange"});
	$s.pop();
}
TestFloats.prototype.testSign = function() {
	$s.push("TestFloats::testSign");
	var $spos = $s.length;
	utest.Assert.isTrue((0.1 < 0?-1:1) > 0,null,{ fileName : "TestFloats.hx", lineNumber : 62, className : "TestFloats", methodName : "testSign"});
	utest.Assert.isTrue((-0.1 < 0?-1:1) < 0,null,{ fileName : "TestFloats.hx", lineNumber : 63, className : "TestFloats", methodName : "testSign"});
	$s.pop();
}
TestFloats.prototype.testWrap = function() {
	$s.push("TestFloats::testWrap");
	var $spos = $s.length;
	utest.Assert.floatEquals(5,Floats.wrap(-1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 68, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(1,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 69, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(5,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 70, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(6,Floats.wrap(6,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 71, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(10,Floats.wrap(10,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 72, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(11,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 73, className : "TestFloats", methodName : "testWrap"});
	utest.Assert.floatEquals(5,Floats.wrap(29,5,10),null,null,{ fileName : "TestFloats.hx", lineNumber : 74, className : "TestFloats", methodName : "testWrap"});
	$s.pop();
}
TestFloats.prototype.testCircularWrap = function() {
	$s.push("TestFloats::testCircularWrap");
	var $spos = $s.length;
	utest.Assert.floatEquals(0,Floats.circularWrap(0,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 79, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 80, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(0,Floats.circularWrap(100,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 81, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 82, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-50,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 83, className : "TestFloats", methodName : "testCircularWrap"});
	utest.Assert.floatEquals(50,Floats.circularWrap(-150,100),null,null,{ fileName : "TestFloats.hx", lineNumber : 84, className : "TestFloats", methodName : "testCircularWrap"});
	$s.pop();
}
TestFloats.prototype.testInterpolate = function() {
	$s.push("TestFloats::testInterpolate");
	var $spos = $s.length;
	utest.Assert.equals(100,Floats.interpolate(0.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 89, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(150,Floats.interpolate(0.5,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 90, className : "TestFloats", methodName : "testInterpolate"});
	utest.Assert.equals(200,Floats.interpolate(1.0,100,200),null,{ fileName : "TestFloats.hx", lineNumber : 91, className : "TestFloats", methodName : "testInterpolate"});
	$s.pop();
}
TestFloats.prototype.testFormat = function() {
	$s.push("TestFloats::testFormat");
	var $spos = $s.length;
	utest.Assert.equals("0.10",Floats.format(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 96, className : "TestFloats", methodName : "testFormat"});
	utest.Assert.equals("0",Floats.format(0.1,"I"),null,{ fileName : "TestFloats.hx", lineNumber : 97, className : "TestFloats", methodName : "testFormat"});
	$s.pop();
}
TestFloats.prototype.testFormatF = function() {
	$s.push("TestFloats::testFormatF");
	var $spos = $s.length;
	utest.Assert.equals("0.10",(Floats.formatf())(0.1),null,{ fileName : "TestFloats.hx", lineNumber : 102, className : "TestFloats", methodName : "testFormatF"});
	$s.pop();
}
TestFloats.prototype.__class__ = TestFloats;
thx.util.Results = function() { }
thx.util.Results.__name__ = ["thx","util","Results"];
thx.util.Results.toString = function(value,glue) {
	$s.push("thx.util.Results::toString");
	var $spos = $s.length;
	if(glue == null) glue = "\n";
	var $e = (value);
	switch( $e[1] ) {
	case 0:
		$s.pop();
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
thx.color.TestColors = function(p) {
	$s.push("thx.color.TestColors::new");
	var $spos = $s.length;
	$s.pop();
}
thx.color.TestColors.__name__ = ["thx","color","TestColors"];
thx.color.TestColors.prototype.testParse = function() {
	$s.push("thx.color.TestColors::testParse");
	var $spos = $s.length;
	var ab = thx.color.NamedColors.aliceblue;
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("aliceblue")),null,{ fileName : "TestColors.hx", lineNumber : 17, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("#F0F8FF")),null,{ fileName : "TestColors.hx", lineNumber : 18, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(ab,thx.color.Colors.parse("rgb(240,248,255)")),null,{ fileName : "TestColors.hx", lineNumber : 19, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#ABC")),null,{ fileName : "TestColors.hx", lineNumber : 20, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(thx.color.Rgb.fromInt(11189196),thx.color.Colors.parse("#abc")),null,{ fileName : "TestColors.hx", lineNumber : 21, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,50%,75%)")),null,{ fileName : "TestColors.hx", lineNumber : 22, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.isTrue(thx.color.Rgb.equals(new thx.color.Hsl(120,0.5,0.75),thx.color.Colors.parse("hsl(120,0.5,0.75)")),null,{ fileName : "TestColors.hx", lineNumber : 23, className : "thx.color.TestColors", methodName : "testParse"});
	utest.Assert.raises(function() {
		$s.push("thx.color.TestColors::testParse@25");
		var $spos = $s.length;
		thx.color.Colors.parse("alice blue");
		$s.pop();
	},Dynamic,null,null,{ fileName : "TestColors.hx", lineNumber : 25, className : "thx.color.TestColors", methodName : "testParse"});
	$s.pop();
}
thx.color.TestColors.prototype.__class__ = thx.color.TestColors;
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
thx.json.TestJson = function(p) {
	$s.push("thx.json.TestJson::new");
	var $spos = $s.length;
	$s.pop();
}
thx.json.TestJson.__name__ = ["thx","json","TestJson"];
thx.json.TestJson.prototype.testEncode = function() {
	$s.push("thx.json.TestJson::testEncode");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		utest.Assert.equals(test.s,thx.json.Json.encode(test.c),null,{ fileName : "TestJson.hx", lineNumber : 24, className : "thx.json.TestJson", methodName : "testEncode"});
	}
	$s.pop();
}
thx.json.TestJson.prototype.testDecode = function() {
	$s.push("thx.json.TestJson::testDecode");
	var $spos = $s.length;
	var _g = 0, _g1 = thx.json.TestJson.tests;
	while(_g < _g1.length) {
		var test = _g1[_g];
		++_g;
		try {
			utest.Assert.same(test.c,thx.json.Json.decode(test.s),null,null,{ fileName : "TestJson.hx", lineNumber : 33, className : "thx.json.TestJson", methodName : "testDecode"});
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			utest.Assert.fail("error decoding: " + test.s + "\n" + Std.string(e),{ fileName : "TestJson.hx", lineNumber : 35, className : "thx.json.TestJson", methodName : "testDecode"});
			break;
		}
	}
	$s.pop();
}
thx.json.TestJson.prototype.__class__ = thx.json.TestJson;
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
thx.load.TestMemoryLoader = function(p) {
	$s.push("thx.load.TestMemoryLoader::new");
	var $spos = $s.length;
	$s.pop();
}
thx.load.TestMemoryLoader.__name__ = ["thx","load","TestMemoryLoader"];
thx.load.TestMemoryLoader.prototype.testLoad = function() {
	$s.push("thx.load.TestMemoryLoader::testLoad");
	var $spos = $s.length;
	var loader = new thx.load.MemoryLoader("my test");
	var f = utest.Assert.createEvent(function(s) {
		$s.push("thx.load.TestMemoryLoader::testLoad@10");
		var $spos = $s.length;
		utest.Assert.stringContains("test",s,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 11, className : "thx.load.TestMemoryLoader", methodName : "testLoad"});
		$s.pop();
	});
	loader.load(f);
	$s.pop();
}
thx.load.TestMemoryLoader.prototype.testError = function() {
	$s.push("thx.load.TestMemoryLoader::testError");
	var $spos = $s.length;
	var loader = new thx.load.MemoryLoader(null);
	var e = utest.Assert.createEvent(function(s) {
		$s.push("thx.load.TestMemoryLoader::testError@19");
		var $spos = $s.length;
		utest.Assert.isTrue(true,null,{ fileName : "TestMemoryLoader.hx", lineNumber : 20, className : "thx.load.TestMemoryLoader", methodName : "testError"});
		$s.pop();
	});
	var h = function(_) {
		$s.push("thx.load.TestMemoryLoader::testError@22");
		var $spos = $s.length;
		haxe.Log.trace("should never reach this point",{ fileName : "TestMemoryLoader.hx", lineNumber : 23, className : "thx.load.TestMemoryLoader", methodName : "testError"});
		$s.pop();
	};
	loader.load(h,e);
	$s.pop();
}
thx.load.TestMemoryLoader.prototype.__class__ = thx.load.TestMemoryLoader;
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
thx.svg.LineInternals = function() { }
thx.svg.LineInternals.__name__ = ["thx","svg","LineInternals"];
thx.svg.LineInternals.linePoints = function(data,x,y) {
	$s.push("thx.svg.LineInternals::linePoints");
	var $spos = $s.length;
	var points = [], i = -1, n = data.length, fx = null != x, fy = null != y, value;
	while(++i < n) {
		value = data[i];
		points.push([x(value,i),y(value,i)]);
	}
	$s.pop();
	return points;
	$s.pop();
}
thx.svg.LineInternals.interpolatePoints = function(points,type) {
	$s.push("thx.svg.LineInternals::interpolatePoints");
	var $spos = $s.length;
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
		if(points.length < 3) {
			var $tmp = thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
			$s.pop();
			return $tmp;
		}
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
		if(points.length < 3) {
			var $tmp = thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
			$s.pop();
			return $tmp;
		} else {
			var $tmp = points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents(points,tension));
			$s.pop();
			return $tmp;
		}
		break;
	case 6:
		var tension = $e[2];
		if(null == tension) tension = .7;
		var $tmp = points.length < 3?thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear):points[0][0] + "," + points[0][1] + thx.svg.LineInternals._lineHermite(points,thx.svg.LineInternals._lineCardinalTangents([points[points.length - 2]].concat(points).concat([points[1]]),tension));
		$s.pop();
		return $tmp;
	}
	var $tmp = path.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.LineInternals._lineDot4 = function(a,b) {
	$s.push("thx.svg.LineInternals::_lineDot4");
	var $spos = $s.length;
	var $tmp = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.svg.LineInternals._lineBasisBezier = function(path,x,y) {
	$s.push("thx.svg.LineInternals::_lineBasisBezier");
	var $spos = $s.length;
	path.push("C" + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier1,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier2,y) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,x) + "," + thx.svg.LineInternals._lineDot4(thx.svg.LineInternals._lineBasisBezier3,y));
	$s.pop();
}
thx.svg.LineInternals._lineHermite = function(points,tangents) {
	$s.push("thx.svg.LineInternals::_lineHermite");
	var $spos = $s.length;
	if(tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
		var $tmp = thx.svg.LineInternals.interpolatePoints(points,thx.svg.LineInterpolator.Linear);
		$s.pop();
		return $tmp;
	}
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
	$s.pop();
	return path;
	$s.pop();
}
thx.svg.LineInternals._lineCardinalTangents = function(points,tension) {
	$s.push("thx.svg.LineInternals::_lineCardinalTangents");
	var $spos = $s.length;
	var tangents = [], a = (1 - tension) / 2, p0 = points[0], p1 = points[1], p2 = points[2], i = 2, n = points.length;
	while(++i < n) {
		tangents.push([a * (p2[0] - p0[0]),a * (p2[1] - p0[1])]);
		p0 = p1;
		p1 = p2;
		p2 = points[i];
	}
	tangents.push([a * (p2[0] - p0[0]),a * (p2[1] - p0[1])]);
	$s.pop();
	return tangents;
	$s.pop();
}
thx.svg.LineInternals.prototype.__class__ = thx.svg.LineInternals;
thx.math.scale.Quantize = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.Quantize::new");
	var $spos = $s.length;
	this.x0 = 0;
	this.x1 = 1;
	this.kx = 2;
	this.i = 1;
	this._range = [0.0,1.0];
	$s.pop();
}
thx.math.scale.Quantize.__name__ = ["thx","math","scale","Quantize"];
thx.math.scale.Quantize.prototype.x0 = null;
thx.math.scale.Quantize.prototype.x1 = null;
thx.math.scale.Quantize.prototype.kx = null;
thx.math.scale.Quantize.prototype.i = null;
thx.math.scale.Quantize.prototype._range = null;
thx.math.scale.Quantize.prototype.scaleMap = function(x,i) {
	$s.push("thx.math.scale.Quantize::scaleMap");
	var $spos = $s.length;
	var $tmp = this.scale(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantize.prototype.scale = function(x) {
	$s.push("thx.math.scale.Quantize::scale");
	var $spos = $s.length;
	var $tmp = this._range[Std["int"](Math.max(0,Math.min(this.i,Math.floor(this.kx * (x - this.x0)))))];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantize.prototype.getDomain = function() {
	$s.push("thx.math.scale.Quantize::getDomain");
	var $spos = $s.length;
	var $tmp = [this.x0,this.x1];
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantize.prototype.domain = function(x0,x1) {
	$s.push("thx.math.scale.Quantize::domain");
	var $spos = $s.length;
	this.x0 = x0;
	this.x1 = x1;
	this.kx = this._range.length / (x1 - x0);
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Quantize.prototype.getRange = function() {
	$s.push("thx.math.scale.Quantize::getRange");
	var $spos = $s.length;
	var $tmp = $closure(this._range,"copy");
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.scale.Quantize.prototype.range = function(x) {
	$s.push("thx.math.scale.Quantize::range");
	var $spos = $s.length;
	this._range = x.copy();
	this.kx = this._range.length / (this.x1 - this.x0);
	this.i = this._range.length - 1;
	$s.pop();
	return this;
	$s.pop();
}
thx.math.scale.Quantize.prototype.__class__ = thx.math.scale.Quantize;
thx.js.AccessTweenAttribute = function(name,transition,tweens) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessTweenAttribute::new");
	var $spos = $s.length;
	thx.js.AccessTween.call(this,transition,tweens);
	this.name = name;
	this.qname = thx.xml.Namespace.qualify(name);
	$s.pop();
}
thx.js.AccessTweenAttribute.__name__ = ["thx","js","AccessTweenAttribute"];
thx.js.AccessTweenAttribute.__super__ = thx.js.AccessTween;
for(var k in thx.js.AccessTween.prototype ) thx.js.AccessTweenAttribute.prototype[k] = thx.js.AccessTween.prototype[k];
thx.js.AccessTweenAttribute.prototype.name = null;
thx.js.AccessTweenAttribute.prototype.qname = null;
thx.js.AccessTweenAttribute.prototype.stringfNode = function(f) {
	$s.push("thx.js.AccessTweenAttribute::stringfNode");
	var $spos = $s.length;
	var $tmp = this.stringTween(this.transitionStringTweenf(f));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype.string = function(value) {
	$s.push("thx.js.AccessTweenAttribute::string");
	var $spos = $s.length;
	var $tmp = this.stringTween(this.transitionStringTween(value));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype.stringTween = function(tween) {
	$s.push("thx.js.AccessTweenAttribute::stringTween");
	var $spos = $s.length;
	var name = this.name;
	var attrTween = function(d,i) {
		$s.push("thx.js.AccessTweenAttribute::stringTween@37");
		var $spos = $s.length;
		var f = tween(d,i,d.getAttribute(name));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenAttribute::stringTween@37@40");
			var $spos = $s.length;
			d.setAttribute(name,f(t));
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var attrTweenNS = function(d,i) {
		$s.push("thx.js.AccessTweenAttribute::stringTween@45");
		var $spos = $s.length;
		var f = tween(d,i,d.getAttributeNS(name.space,name.local));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenAttribute::stringTween@45@48");
			var $spos = $s.length;
			d.setAttributeNS(name.space,name.local,f(t));
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype.floatNode = function(f) {
	$s.push("thx.js.AccessTweenAttribute::floatNode");
	var $spos = $s.length;
	var $tmp = this.floatTween(this.transitionFloatTweenf(f));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype["float"] = function(value) {
	$s.push("thx.js.AccessTweenAttribute::float");
	var $spos = $s.length;
	var $tmp = this.floatTween(this.transitionFloatTween(value));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype.floatTween = function(tween) {
	$s.push("thx.js.AccessTweenAttribute::floatTween");
	var $spos = $s.length;
	var name = this.name;
	var attrTween = function(d,i) {
		$s.push("thx.js.AccessTweenAttribute::floatTween@71");
		var $spos = $s.length;
		var f = tween(d,i,Std.parseFloat(d.getAttribute(name)));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenAttribute::floatTween@71@74");
			var $spos = $s.length;
			d.setAttribute(name,"" + f(t));
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var attrTweenNS = function(d,i) {
		$s.push("thx.js.AccessTweenAttribute::floatTween@79");
		var $spos = $s.length;
		var f = tween(d,i,Std.parseFloat(d.getAttributeNS(name.space,name.local)));
		var $tmp = function(t) {
			$s.push("thx.js.AccessTweenAttribute::floatTween@79@82");
			var $spos = $s.length;
			haxe.Log.trace(t,{ fileName : "AccessTweenAttribute.hx", lineNumber : 83, className : "thx.js.AccessTweenAttribute", methodName : "floatTween"});
			d.setAttributeNS(name.space,name.local,"" + f(t));
			$s.pop();
		};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	this.tweens.set("attr." + name,null == this.qname?attrTween:attrTweenNS);
	var $tmp = this.transition;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessTweenAttribute.prototype.__class__ = thx.js.AccessTweenAttribute;
thx.js.AccessDataTweenAttribute = function(name,transition,tweens) {
	if( name === $_ ) return;
	$s.push("thx.js.AccessDataTweenAttribute::new");
	var $spos = $s.length;
	thx.js.AccessTweenAttribute.call(this,name,transition,tweens);
	$s.pop();
}
thx.js.AccessDataTweenAttribute.__name__ = ["thx","js","AccessDataTweenAttribute"];
thx.js.AccessDataTweenAttribute.__super__ = thx.js.AccessTweenAttribute;
for(var k in thx.js.AccessTweenAttribute.prototype ) thx.js.AccessDataTweenAttribute.prototype[k] = thx.js.AccessTweenAttribute.prototype[k];
thx.js.AccessDataTweenAttribute.prototype.stringf = function(f) {
	$s.push("thx.js.AccessDataTweenAttribute::stringf");
	var $spos = $s.length;
	var $tmp = this.stringfNode(function(n,i) {
		$s.push("thx.js.AccessDataTweenAttribute::stringf@102");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataTweenAttribute.prototype.floatf = function(f) {
	$s.push("thx.js.AccessDataTweenAttribute::floatf");
	var $spos = $s.length;
	var $tmp = this.floatNode(function(n,i) {
		$s.push("thx.js.AccessDataTweenAttribute::floatf@107");
		var $spos = $s.length;
		var $tmp = f(Reflect.field(n,"__data__"),i);
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataTweenAttribute.prototype.__class__ = thx.js.AccessDataTweenAttribute;
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
thx.js.AccessHtml = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessHtml::new");
	var $spos = $s.length;
	thx.js.Access.call(this,selection);
	$s.pop();
}
thx.js.AccessHtml.__name__ = ["thx","js","AccessHtml"];
thx.js.AccessHtml.__super__ = thx.js.Access;
for(var k in thx.js.Access.prototype ) thx.js.AccessHtml.prototype[k] = thx.js.Access.prototype[k];
thx.js.AccessHtml.prototype.get = function() {
	$s.push("thx.js.AccessHtml::get");
	var $spos = $s.length;
	var $tmp = this.selection.firstNode(function(node) {
		$s.push("thx.js.AccessHtml::get@14");
		var $spos = $s.length;
		var $tmp = node.innerHTML;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessHtml.prototype.string = function(v) {
	$s.push("thx.js.AccessHtml::string");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessHtml::string@19");
		var $spos = $s.length;
		node.innerHTML = v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessHtml.prototype.clear = function() {
	$s.push("thx.js.AccessHtml::clear");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessHtml::clear@25");
		var $spos = $s.length;
		node.innerHTML = "";
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessHtml.prototype["float"] = function(v) {
	$s.push("thx.js.AccessHtml::float");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessHtml::float@31");
		var $spos = $s.length;
		node.innerHTML = "" + v;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessHtml.prototype.__class__ = thx.js.AccessHtml;
thx.js.AccessDataHtml = function(selection) {
	if( selection === $_ ) return;
	$s.push("thx.js.AccessDataHtml::new");
	var $spos = $s.length;
	thx.js.AccessHtml.call(this,selection);
	$s.pop();
}
thx.js.AccessDataHtml.__name__ = ["thx","js","AccessDataHtml"];
thx.js.AccessDataHtml.__super__ = thx.js.AccessHtml;
for(var k in thx.js.AccessHtml.prototype ) thx.js.AccessDataHtml.prototype[k] = thx.js.AccessHtml.prototype[k];
thx.js.AccessDataHtml.prototype.stringf = function(v) {
	$s.push("thx.js.AccessDataHtml::stringf");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataHtml::stringf@45");
		var $spos = $s.length;
		var s = v(Reflect.field(node,"__data__"),i);
		if(null == s) s = "";
		node.innerHTML = s;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataHtml.prototype.floatf = function(v) {
	$s.push("thx.js.AccessDataHtml::floatf");
	var $spos = $s.length;
	this.selection.eachNode(function(node,i) {
		$s.push("thx.js.AccessDataHtml::floatf@56");
		var $spos = $s.length;
		var f = v(Reflect.field(node,"__data__"),i);
		if(null == f) node.innerHTML = ""; else node.innerHTML = "" + f;
		$s.pop();
	});
	var $tmp = this.selection;
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataHtml.prototype.data = function() {
	$s.push("thx.js.AccessDataHtml::data");
	var $spos = $s.length;
	var $tmp = this.stringf(function(d,_) {
		$s.push("thx.js.AccessDataHtml::data@69");
		var $spos = $s.length;
		var $tmp = "" + d;
		$s.pop();
		return $tmp;
		$s.pop();
	});
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.js.AccessDataHtml.prototype.__class__ = thx.js.AccessDataHtml;
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
Iterators = function() { }
Iterators.__name__ = ["Iterators"];
Iterators.indexOf = function(it,v,f) {
	$s.push("Iterators::indexOf");
	var $spos = $s.length;
	if(null == f) f = function(v2) {
		$s.push("Iterators::indexOf@11");
		var $spos = $s.length;
		var $tmp = v == v2;
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var c = 0;
	while( it.hasNext() ) {
		var i = it.next();
		if(f(i)) {
			$s.pop();
			return c;
		} else c++;
	}
	$s.pop();
	return -1;
	$s.pop();
}
Iterators.contains = function(it,v,f) {
	$s.push("Iterators::contains");
	var $spos = $s.length;
	if(null == f) f = function(v2) {
		$s.push("Iterators::contains@24");
		var $spos = $s.length;
		var $tmp = v == v2;
		$s.pop();
		return $tmp;
		$s.pop();
	};
	var c = 0;
	while( it.hasNext() ) {
		var i = it.next();
		if(f(i)) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Iterators.array = function(it) {
	$s.push("Iterators::array");
	var $spos = $s.length;
	var result = [];
	while( it.hasNext() ) {
		var v = it.next();
		result.push(v);
	}
	$s.pop();
	return result;
	$s.pop();
}
Iterators.map = function(it,f) {
	$s.push("Iterators::map");
	var $spos = $s.length;
	var result = [], i = 0;
	while( it.hasNext() ) {
		var v = it.next();
		result.push(f(v,i++));
	}
	$s.pop();
	return result;
	$s.pop();
}
Iterators.each = function(it,f) {
	$s.push("Iterators::each");
	var $spos = $s.length;
	var i = 0;
	while( it.hasNext() ) {
		var o = it.next();
		f(o,i++);
	}
	$s.pop();
}
Iterators.reduce = function(it,f,initialValue) {
	$s.push("Iterators::reduce");
	var $spos = $s.length;
	var accumulator = initialValue, i = 0;
	while( it.hasNext() ) {
		var o = it.next();
		accumulator = f(accumulator,o,i++);
	}
	$s.pop();
	return accumulator;
	$s.pop();
}
Iterators.random = function(it) {
	$s.push("Iterators::random");
	var $spos = $s.length;
	var $tmp = Arrays.random(Iterators.array(it));
	$s.pop();
	return $tmp;
	$s.pop();
}
Iterators.any = function(it,f) {
	$s.push("Iterators::any");
	var $spos = $s.length;
	while( it.hasNext() ) {
		var v = it.next();
		if(f(v)) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Iterators.all = function(it,f) {
	$s.push("Iterators::all");
	var $spos = $s.length;
	while( it.hasNext() ) {
		var v = it.next();
		if(!f(v)) {
			$s.pop();
			return false;
		}
	}
	$s.pop();
	return true;
	$s.pop();
}
Iterators.last = function(it) {
	$s.push("Iterators::last");
	var $spos = $s.length;
	var o = null;
	while(it.hasNext()) o = it.next();
	$s.pop();
	return o;
	$s.pop();
}
Iterators.first = function(it) {
	$s.push("Iterators::first");
	var $spos = $s.length;
	var $tmp = it.next();
	$s.pop();
	return $tmp;
	$s.pop();
}
Iterators.order = function(it,f) {
	$s.push("Iterators::order");
	var $spos = $s.length;
	var $tmp = Arrays.order(Iterators.array(it),f);
	$s.pop();
	return $tmp;
	$s.pop();
}
Iterators.prototype.__class__ = Iterators;
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
Objects = function() { }
Objects.__name__ = ["Objects"];
Objects.field = function(o,fieldname,alt) {
	$s.push("Objects::field");
	var $spos = $s.length;
	var $tmp = Reflect.hasField(o,fieldname)?Reflect.field(o,fieldname):alt;
	$s.pop();
	return $tmp;
	$s.pop();
}
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
Objects["with"] = function(ob,f) {
	$s.push("Objects::with");
	var $spos = $s.length;
	f(ob);
	$s.pop();
	return ob;
	$s.pop();
}
Objects.toHash = function(ob) {
	$s.push("Objects::toHash");
	var $spos = $s.length;
	var hash = new Hash();
	var $tmp = Objects.copyToHash(ob,hash);
	$s.pop();
	return $tmp;
	$s.pop();
}
Objects.copyToHash = function(ob,hash) {
	$s.push("Objects::copyToHash");
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
Objects.interpolate = function(v,a,b,interpolator) {
	$s.push("Objects::interpolate");
	var $spos = $s.length;
	var $tmp = (Objects.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
Objects.interpolatef = function(a,b,interpolator) {
	$s.push("Objects::interpolatef");
	var $spos = $s.length;
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
	var $tmp = function(t) {
		$s.push("Objects::interpolatef@82");
		var $spos = $s.length;
		var _g = 0, _g1 = Reflect.fields(i);
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			c[k] = Reflect.field(i,k).apply(i,[t]);
		}
		$s.pop();
		return c;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Objects.interpolateByName = function(k,v) {
	$s.push("Objects::interpolateByName");
	var $spos = $s.length;
	var $tmp = Std["is"](v,String) && Objects._reCheckKeyIsColor.match(k)?thx.color.Colors.interpolatef:Dynamics.interpolatef;
	$s.pop();
	return $tmp;
	$s.pop();
}
Objects.applyTo = function(src,dest) {
	$s.push("Objects::applyTo");
	var $spos = $s.length;
	var _g = 0, _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		if(!Reflect.hasField(dest,field)) continue;
		if(Reflect.isObject(Reflect.field(src,field)) && Reflect.isObject(Reflect.field(dest,field))) Objects.applyTo(Reflect.field(src,field),Reflect.field(dest,field)); else dest[field] = Reflect.field(src,field);
	}
	$s.pop();
	return dest;
	$s.pop();
}
Objects.copyTo = function(src,dest) {
	$s.push("Objects::copyTo");
	var $spos = $s.length;
	var _g = 0, _g1 = Reflect.fields(src);
	while(_g < _g1.length) {
		var field = _g1[_g];
		++_g;
		if(Reflect.isObject(Reflect.field(src,field)) && Reflect.isObject(Reflect.field(dest,field))) Objects.copyTo(Reflect.field(src,field),Reflect.field(dest,field)); else dest[field] = Reflect.field(src,field);
	}
	$s.pop();
	return dest;
	$s.pop();
}
Objects.prototype.__class__ = Objects;
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
		} else throw(exc);
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
		} else throw(exc);
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
thx.color.Colors = function() { }
thx.color.Colors.__name__ = ["thx","color","Colors"];
thx.color.Colors.interpolatef = function(a,b,interpolator) {
	$s.push("thx.color.Colors::interpolatef");
	var $spos = $s.length;
	var ca = thx.color.Colors.parse(a);
	var cb = thx.color.Colors.parse(b);
	var f = thx.color.Rgb.interpolatef(ca,cb,interpolator);
	var $tmp = function(v) {
		$s.push("thx.color.Colors::interpolatef@20");
		var $spos = $s.length;
		var $tmp = f(v).toString();
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Colors.interpolate = function(v,a,b,interpolator) {
	$s.push("thx.color.Colors::interpolate");
	var $spos = $s.length;
	var $tmp = (thx.color.Colors.interpolatef(a,b,interpolator))(v);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Colors.parse = function(s) {
	$s.push("thx.color.Colors::parse");
	var $spos = $s.length;
	if(!thx.color.Colors._reParse.match(s)) {
		var v = thx.color.NamedColors.byName.get(s);
		if(null == v) {
			if("transparent" == s) {
				var $tmp = thx.color.Rgb.fromInt(16777215);
				$s.pop();
				return $tmp;
			} else {
				var $tmp = (function($this) {
					var $r;
					throw new thx.error.Error("invalid color: '{0}'",null,s,{ fileName : "Colors.hx", lineNumber : 39, className : "thx.color.Colors", methodName : "parse"});
					return $r;
				}(this));
				$s.pop();
				return $tmp;
			}
		} else {
			$s.pop();
			return v;
		}
	}
	var type = thx.color.Colors._reParse.matched(1);
	if(!Strings.empty(type)) {
		var values = thx.color.Colors._reParse.matched(2).split(",");
		switch(type.toLowerCase()) {
		case "rgb":case "rgba":
			var $tmp = new thx.color.Rgb(thx.color.Colors._c(values[0]),thx.color.Colors._c(values[1]),thx.color.Colors._c(values[2]));
			$s.pop();
			return $tmp;
		case "hsl":
			var $tmp = new thx.color.Hsl(thx.color.Colors._d(values[0]),thx.color.Colors._p(values[1]),thx.color.Colors._p(values[2]));
			$s.pop();
			return $tmp;
		case "cmyk":
			var $tmp = new thx.color.Cmyk(thx.color.Colors._p(values[0]),thx.color.Colors._p(values[1]),thx.color.Colors._p(values[2]),thx.color.Colors._p(values[3]));
			$s.pop();
			return $tmp;
		}
	}
	var color = thx.color.Colors._reParse.matched(3);
	if(color.length == 3) color = color.split("").map(function(d,_) {
		$s.push("thx.color.Colors::parse@56");
		var $spos = $s.length;
		var $tmp = d + d;
		$s.pop();
		return $tmp;
		$s.pop();
	}).join(""); else if(color.length != 6) {
		var $tmp = (function($this) {
			var $r;
			throw new thx.error.Error("invalid color: '{0}'",null,s,{ fileName : "Colors.hx", lineNumber : 58, className : "thx.color.Colors", methodName : "parse"});
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	var $tmp = thx.color.Rgb.fromInt(Std.parseInt("0x" + color));
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Colors._c = function(s) {
	$s.push("thx.color.Colors::_c");
	var $spos = $s.length;
	var $tmp = Std.parseInt(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Colors._d = function(s) {
	$s.push("thx.color.Colors::_d");
	var $spos = $s.length;
	var s1 = StringTools.trim(s);
	if(s1.substr(-3) == "deg") s1 = s1.substr(0,-3); else if(s1.substr(-1) == "º") s1 = s1.substr(0,-1);
	var $tmp = Std.parseFloat(s1);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.color.Colors._p = function(s) {
	$s.push("thx.color.Colors::_p");
	var $spos = $s.length;
	var s1 = StringTools.trim(s);
	if(s1.substr(-1) == "%") {
		var $tmp = Std.parseFloat(s1.substr(0,-1)) / 100;
		$s.pop();
		return $tmp;
	} else {
		var $tmp = Std.parseFloat(s1);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
thx.color.Colors.prototype.__class__ = thx.color.Colors;
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
	utest.Assert.equals(0,Ints.interpolate(0.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 22, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(127,Ints.interpolate(0.499,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 23, className : "TestInts", methodName : "testInterpolate"});
	utest.Assert.equals(255,Ints.interpolate(1.000,0,255,null),null,{ fileName : "TestInts.hx", lineNumber : 24, className : "TestInts", methodName : "testInterpolate"});
	$s.pop();
}
TestInts.prototype.__class__ = TestInts;
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
thx.data.TestValueEncoder = function(p) {
	$s.push("thx.data.TestValueEncoder::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.TestValueEncoder.__name__ = ["thx","data","TestValueEncoder"];
thx.data.TestValueEncoder.prototype.testEncodeSequence = function() {
	$s.push("thx.data.TestValueEncoder::testEncodeSequence");
	var $spos = $s.length;
	var handler = new thx.data.CustomerEncoder();
	var encoder = new thx.data.ValueEncoder(handler);
	encoder.encode({ name : "thx", values : [Date.fromString("2010-01-01"),2,"a",{ a : 0, b : true}]});
	utest.Assert.same(["start","startObject","startField:name","string:thx","endField","startField:values","startArray","startItem","date:" + Date.fromString("2010-01-01").getTime(),"endItem","startItem","int:2","endItem","startItem","string:a","endItem","startItem","startObject","startField:a","int:0","endField","startField:b","bool:true","endField","endObject","endItem","endArray","endField","endObject","end"],handler.result,null,null,{ fileName : "TestValueEncoder.hx", lineNumber : 14, className : "thx.data.TestValueEncoder", methodName : "testEncodeSequence"});
	$s.pop();
}
thx.data.TestValueEncoder.prototype.__class__ = thx.data.TestValueEncoder;
thx.data.CustomerEncoder = function(p) {
	$s.push("thx.data.CustomerEncoder::new");
	var $spos = $s.length;
	$s.pop();
}
thx.data.CustomerEncoder.__name__ = ["thx","data","CustomerEncoder"];
thx.data.CustomerEncoder.prototype.result = null;
thx.data.CustomerEncoder.prototype.start = function() {
	$s.push("thx.data.CustomerEncoder::start");
	var $spos = $s.length;
	this.result = ["start"];
	$s.pop();
}
thx.data.CustomerEncoder.prototype.end = function() {
	$s.push("thx.data.CustomerEncoder::end");
	var $spos = $s.length;
	this.result.push("end");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.startObject = function() {
	$s.push("thx.data.CustomerEncoder::startObject");
	var $spos = $s.length;
	this.result.push("startObject");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.startField = function(name) {
	$s.push("thx.data.CustomerEncoder::startField");
	var $spos = $s.length;
	this.result.push("startField:" + name);
	$s.pop();
}
thx.data.CustomerEncoder.prototype.endField = function() {
	$s.push("thx.data.CustomerEncoder::endField");
	var $spos = $s.length;
	this.result.push("endField");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.endObject = function() {
	$s.push("thx.data.CustomerEncoder::endObject");
	var $spos = $s.length;
	this.result.push("endObject");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.startArray = function() {
	$s.push("thx.data.CustomerEncoder::startArray");
	var $spos = $s.length;
	this.result.push("startArray");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.startItem = function() {
	$s.push("thx.data.CustomerEncoder::startItem");
	var $spos = $s.length;
	this.result.push("startItem");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.endItem = function() {
	$s.push("thx.data.CustomerEncoder::endItem");
	var $spos = $s.length;
	this.result.push("endItem");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.endArray = function() {
	$s.push("thx.data.CustomerEncoder::endArray");
	var $spos = $s.length;
	this.result.push("endArray");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.date = function(d) {
	$s.push("thx.data.CustomerEncoder::date");
	var $spos = $s.length;
	this.result.push("date:" + d.getTime());
	$s.pop();
}
thx.data.CustomerEncoder.prototype.string = function(s) {
	$s.push("thx.data.CustomerEncoder::string");
	var $spos = $s.length;
	this.result.push("string:" + s);
	$s.pop();
}
thx.data.CustomerEncoder.prototype["int"] = function(i) {
	$s.push("thx.data.CustomerEncoder::int");
	var $spos = $s.length;
	this.result.push("int:" + i);
	$s.pop();
}
thx.data.CustomerEncoder.prototype["float"] = function(f) {
	$s.push("thx.data.CustomerEncoder::float");
	var $spos = $s.length;
	this.result.push("float:" + f);
	$s.pop();
}
thx.data.CustomerEncoder.prototype["null"] = function() {
	$s.push("thx.data.CustomerEncoder::null");
	var $spos = $s.length;
	this.result.push("null");
	$s.pop();
}
thx.data.CustomerEncoder.prototype.bool = function(b) {
	$s.push("thx.data.CustomerEncoder::bool");
	var $spos = $s.length;
	this.result.push("bool:" + b);
	$s.pop();
}
thx.data.CustomerEncoder.prototype.comment = function(s) {
	$s.push("thx.data.CustomerEncoder::comment");
	var $spos = $s.length;
	this.result.push("comment:" + s);
	$s.pop();
}
thx.data.CustomerEncoder.prototype.__class__ = thx.data.CustomerEncoder;
thx.data.CustomerEncoder.__interfaces__ = [thx.data.IDataHandler];
thx.math.scale.TestQuantize = function(p) {
	if( p === $_ ) return;
	$s.push("thx.math.scale.TestQuantize::new");
	var $spos = $s.length;
	thx.math.scale.TestAll.call(this);
	$s.pop();
}
thx.math.scale.TestQuantize.__name__ = ["thx","math","scale","TestQuantize"];
thx.math.scale.TestQuantize.__super__ = thx.math.scale.TestAll;
for(var k in thx.math.scale.TestAll.prototype ) thx.math.scale.TestQuantize.prototype[k] = thx.math.scale.TestAll.prototype[k];
thx.math.scale.TestQuantize.prototype.__class__ = thx.math.scale.TestQuantize;
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
	var $tmp = thx.math.Equations.polynomial(t,2);
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.cubic = function(t) {
	$s.push("thx.math.Equations::cubic");
	var $spos = $s.length;
	var $tmp = thx.math.Equations.polynomial(t,3);
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
thx.math.Equations.elasticf = function(a,p) {
	$s.push("thx.math.Equations::elasticf");
	var $spos = $s.length;
	var s;
	if(null == p) p = 0.45;
	if(null == a) {
		a = 1;
		s = p / 4;
	} else s = p / (2 * Math.PI) / Math.asin(1 / a);
	var $tmp = function(t) {
		$s.push("thx.math.Equations::elasticf@70");
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
thx.math.Equations.backf = function(s) {
	$s.push("thx.math.Equations::backf");
	var $spos = $s.length;
	if(null == s) s = 1.70158;
	var $tmp = function(t) {
		$s.push("thx.math.Equations::backf@83");
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
thx.math.Equations.polynomialf = function(e) {
	$s.push("thx.math.Equations::polynomialf");
	var $spos = $s.length;
	var $tmp = function(t) {
		$s.push("thx.math.Equations::polynomialf@96");
		var $spos = $s.length;
		thx.math.Equations.polynomial(t,e);
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
thx.math.Equations.prototype.__class__ = thx.math.Equations;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
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
thx.cultures.ItIT.getCulture();
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
window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 1000 / 60); } ;
thx.languages.En.getLanguage();
thx.cultures.EnUS.getCulture();
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
{
	var d = Date;
	d.now = function() {
		$s.push("thx.math.Equations::polynomialf");
		var $spos = $s.length;
		var $tmp = new Date();
		$s.pop();
		return $tmp;
		$s.pop();
	};
	d.fromTime = function(t) {
		$s.push("thx.math.Equations::polynomialf");
		var $spos = $s.length;
		var d1 = new Date();
		d1["setTime"](t);
		$s.pop();
		return d1;
		$s.pop();
	};
	d.fromString = function(s) {
		$s.push("thx.math.Equations::polynomialf");
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
		$s.push("thx.math.Equations::polynomialf");
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
		$s.push("thx.math.Equations::polynomialf");
		var $spos = $s.length;
		var $tmp = isFinite(i);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	Math.isNaN = function(i) {
		$s.push("thx.math.Equations::polynomialf");
		var $spos = $s.length;
		var $tmp = isNaN(i);
		$s.pop();
		return $tmp;
		$s.pop();
	};
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
thx.svg.TestAll._renumber = new EReg("([+-]?\\d+(\\.\\d+)?(e-?\\d+)?)","");
thx.csv.TestCsv.s = "Year,Make,Model,Description,Price\n1997,Ford,E350,\"ac, abs, moon\",3000.99\n1999,Chevy,\"Venture \"\"Extended Edition\"\"\",,4900.99\n1999,Chevy,\"Venture \"\"Extended Edition, Very Large\"\"\",,5000.99\n1996,Jeep,Grand Cherokee,\"MUST SELL!\nair, moon roof, loaded\",4799.99";
thx.csv.TestCsv.v = [["Year","Make","Model","Description","Price"],[1997,"Ford","E350","ac, abs, moon",3000.99],[1999,"Chevy","Venture \"Extended Edition\"","",4900.99],[1999,"Chevy","Venture \"Extended Edition, Very Large\"","",5000.99],[1996,"Jeep","Grand Cherokee","MUST SELL!\nair, moon roof, loaded",4799.99]];
Dates._reparse = new EReg("^\\d{4}-\\d\\d-\\d\\d(( |T)\\d\\d:\\d\\d:\\d\\d(.\\d{1,3})?)?$","");
js.Lib.onerror = null;
thx.js.Dom.doc = (function() {
	$s.push("thx.math.Equations::polynomialf");
	var $spos = $s.length;
	var gs = thx.js.Selection.create([new thx.js.Group([js.Lib.document])]);
	gs.parentNode = js.Lib.document.documentElement;
	$s.pop();
	return gs;
	$s.pop();
})();
thx.js.Dom.selectionEngine = new thx.js.SizzleEngine();
utest.ui.text.HtmlReport.platform = "javascript";
thx.math.scale.TestLinearString.data = [4,8,16,32,64];
thx.js.Timer.timeout = 0;
thx.js.Timer.queue = null;
thx.js.Timer.interval = 0;
thx.js.Timer._step = thx.js.Timer.step;
thx.text.ERegs._escapePattern = new EReg("[*+?|{[()^$.# \\\\]","");
thx.math.Const.TWO_PI = 6.283185307179586477;
thx.math.Const.PI = 3.141592653589793238;
thx.math.Const.HALF_PI = 1.570796326794896619;
thx.math.Const.TO_DEGREE = 57.29577951308232088;
thx.math.Const.TO_RADIAN = 0.01745329251994329577;
thx.math.Const.LN10 = 2.302585092994046;
Floats._reparse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
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
thx.html.HtmlParser.startTag = new EReg("^<(\\w+)((?:\\s+\\w+(?:\\s*=\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(/?)>","");
thx.html.HtmlParser.endTag = new EReg("^</(\\w+)[^>]*>","");
thx.html.HtmlParser.attr = new EReg("(\\w+)(?:\\s*=\\s*(?:(?:\"((?:\\\\.|[^\"])*)\")|(?:'((?:\\\\.|[^'])*)')|([^>\\s]+)))?","g");
thx.html.HtmlParser.comment = new EReg("<!--(.*?)-->","g");
thx.html.HtmlParser.cdata = new EReg("<!\\[CDATA\\[(.*?)]]>","g");
thx.html.HtmlParser.doctype = new EReg("<!DOCTYPE(.*?)>","gi");
thx.html.HtmlParser.declaration = new EReg("<?xml(.*?)>","g");
thx.html.Element._preserve = thx.collections.Set.ofArray("pre,textarea".split(","));
thx.html.Element._empty = thx.collections.Set.ofArray("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(","));
thx.html.Element._block = thx.collections.Set.ofArray("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,textarea,tfoot,th,thead,title,tr,ul".split(","));
thx.html.Element._inline = thx.collections.Set.ofArray("a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,tt,u,var".split(","));
thx.html.Element._break = thx.collections.Set.ofArray("br,hr".split(","));
thx.html.Element._closeSelf = thx.collections.Set.ofArray("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr".split(","));
thx.html.Element._special = thx.collections.Set.ofArray("script,style".split(","));
thx.ini.TestIni.s = "\nroot=value\n\t\n[owner]\nname=John Doe\norganization=Acme Widgets Inc.\n\n[database]\nserver=192.0.2.62\nport=143\nfile = \"payroll.dat\"\n\n[database.more]\n\nsequence = 1, 2, 3\n\n";
thx.ini.TestIni.s2 = "root=value\n\n[database]\nserver=192.0.2.62\nport=143\nfile=payroll.dat\n\n[database.more]\nsequence=1, 2, 3\n\n[owner]\nname=John Doe\norganization=Acme Widgets Inc.";
thx.ini.TestIni.v = { root : "value", owner : { name : "John Doe", organization : "Acme Widgets Inc."}, database : { server : "192.0.2.62", port : 143, file : "payroll.dat", more : { sequence : [1,2,3]}}};
thx.validation.SingleLineValidator._re = new EReg("(\n|\r)","m");
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
thx.math.scale.TestOrdinal.data = [4,8,16,32,64];
thx.validation.EmailValidator._reEmail = new EReg("^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$","i");
thx.validation.EmailValidator._reEmailDomain = new EReg("\\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$","i");
thx.html.Attribute._fill = thx.collections.Set.ofArray("checked,compact,declare,defer,disabled,formnovalidate,novalidate,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,required,selected".split(","));
TestObjects.testObject = { a : 1, b : 2, c : 3};
thx.validation.UrlValidator._reUrl = new EReg("^(http|ftp|https)://[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&amp;:/~\\+#]*[\\w\\-\\@?^=%&amp;/~\\+#])?$","");
utest.TestHandler.POLLING_TIME = 10;
thx.js.BaseTransition._id = 0;
thx.js.BaseTransition._inheritid = 0;
thx.ini.IniDecoder.linesplitter = new EReg("[^\\\\](#|;)","");
Ints._reparse = new EReg("^(\\+|-)?\\d+$","");
thx.xml.Namespace.prefix = (function() {
	$s.push("thx.math.Equations::polynomialf");
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
thx.text.Inflections.uncountable_words = ["equipment","information","rice","money","species","series","fish","sheep","moose","deer","news"];
thx.text.Inflections.plural_rules = [{ pattern : new EReg("(m)an$","gi"), replace : "$1en"},{ pattern : new EReg("(pe)rson$","gi"), replace : "$1ople"},{ pattern : new EReg("(child)$","gi"), replace : "$1ren"},{ pattern : new EReg("(ax|test)is$","gi"), replace : "$1es"},{ pattern : new EReg("(octop|vir)us$","gi"), replace : "$1i"},{ pattern : new EReg("(alias|status)$","gi"), replace : "$1es"},{ pattern : new EReg("(bu)s$","gi"), replace : "$1ses"},{ pattern : new EReg("(buffal|tomat)o$","gi"), replace : "$1oes"},{ pattern : new EReg("([ti])um$","gi"), replace : "$1a"},{ pattern : new EReg("sis$","gi"), replace : "ses"},{ pattern : new EReg("(?:([^f])fe|([lr])f)$","gi"), replace : "$1$2ves"},{ pattern : new EReg("(hive)$","gi"), replace : "$1s"},{ pattern : new EReg("([^aeiouy]|qu)y$","gi"), replace : "$1ies"},{ pattern : new EReg("(x|ch|ss|sh)$","gi"), replace : "$1es"},{ pattern : new EReg("(matr|vert|ind)ix|ex$","gi"), replace : "$1ices"},{ pattern : new EReg("([m|l])ouse$","gi"), replace : "$1ice"},{ pattern : new EReg("^(ox)$","gi"), replace : "$1en"},{ pattern : new EReg("(quiz)$","gi"), replace : "$1zes"},{ pattern : new EReg("s$","gi"), replace : "s"},{ pattern : new EReg("$","gi"), replace : "s"}];
thx.text.Inflections.singular_rules = [{ pattern : new EReg("(m)en$","gi"), replace : "$1an"},{ pattern : new EReg("(pe)ople$","gi"), replace : "$1rson"},{ pattern : new EReg("(child)ren$","gi"), replace : "$1"},{ pattern : new EReg("([ti])a$","gi"), replace : "$1um"},{ pattern : new EReg("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$","gi"), replace : "$1$2sis"},{ pattern : new EReg("(hive)s$","gi"), replace : "$1"},{ pattern : new EReg("(tive)s$","gi"), replace : "$1"},{ pattern : new EReg("([lr])ves$","gi"), replace : "$1f"},{ pattern : new EReg("([^fo])ves$","gi"), replace : "$1fe"},{ pattern : new EReg("([^aeiouy]|qu)ies$","gi"), replace : "$1y"},{ pattern : new EReg("(s)eries$","gi"), replace : "$1eries"},{ pattern : new EReg("(m)ovies$","gi"), replace : "$1ovie"},{ pattern : new EReg("(x|ch|ss|sh)es$","gi"), replace : "$1"},{ pattern : new EReg("([m|l])ice$","gi"), replace : "$1ouse"},{ pattern : new EReg("(bus)es$","gi"), replace : "$1"},{ pattern : new EReg("(o)es$","gi"), replace : "$1"},{ pattern : new EReg("(shoe)s$","gi"), replace : "$1"},{ pattern : new EReg("(cris|ax|test)es$","gi"), replace : "$1is"},{ pattern : new EReg("(octop|vir)i$","gi"), replace : "$1us"},{ pattern : new EReg("(alias|status)es$","gi"), replace : "$1"},{ pattern : new EReg("^(ox)en","gi"), replace : "$1"},{ pattern : new EReg("(vert|ind)ices$","gi"), replace : "$1ex"},{ pattern : new EReg("(matr)ices$","gi"), replace : "$1ix"},{ pattern : new EReg("(quiz)zes$","gi"), replace : "$1"},{ pattern : new EReg("s$","gi"), replace : ""}];
thx.ini.IniEncoder.decoded = ["\\",String.fromCharCode(0),String.fromCharCode(7),String.fromCharCode(8),"\t","\r","\n",";","#","=",":"];
thx.ini.IniEncoder.encoded = ["\\\\","\\0","\\a","\\b","\\t","\\r","\\n","\\;","\\#","\\=","\\:"];
thx.json.TestJson.tests = [{ c : null, s : "null"},{ c : "a\nb", s : "\"a\\nb\""},{ c : 1, s : "1"},{ c : -0.1, s : "-0.1"},{ c : -1.234e-100, s : "-1.234e-100"},{ c : true, s : "true"},{ c : false, s : "false"},{ c : [], s : "[]"},{ c : [null,true], s : "[null,true]"},{ c : { name : "haxe", stars : 5}, s : "{\"name\":\"haxe\",\"stars\":5}"}];
thx.svg.LineInternals.arcOffset = -Math.PI / 2;
thx.svg.LineInternals.arcMax = 2 * Math.PI - 1e-6;
thx.svg.LineInternals._lineBasisBezier1 = [0,2 / 3,1 / 3,0];
thx.svg.LineInternals._lineBasisBezier2 = [0,1 / 3,2 / 3,0];
thx.svg.LineInternals._lineBasisBezier3 = [0,1 / 6,2 / 3,1 / 6];
Objects._reCheckKeyIsColor = new EReg("color\\b|\\bbackground\\b|\\bstroke\\b|\\bfill\\b","");
thx.color.Colors._reParse = new EReg("^\\s*(?:(hsl|rgb|rgba|cmyk)\\(([^)]+)\\))|(?:(?:0x|#)([a-f0-9]{3,6}))\\s*$","i");
haxe.Timer.arr = new Array();
TestAll.main()