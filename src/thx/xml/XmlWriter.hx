package thx.xml;
using thx.text.UString;

import Xml;

class XmlWriter
{      
	static var _emptyPattern = ~/\s/m; 
	static var _newLineReplace = ~/(\r\n|\n\r|\n|\r)/m;
	public var indent : String; 
	public var newline : String;
	public var stripComments : Bool;
	public var autoformat : Bool;
	public var normalizeNewlines : Bool; 
	public var wrapColumns : Int;
	
	var _buf : StringBuf;
	var _level : Int;
	public function new(autoformat = true, indent = "  ", newline = "\n")
	{   
		this.autoformat = autoformat;
		this.indent = indent;
		this.newline = newline;
		this.stripComments = false;
		this.normalizeNewlines = true;
		this.wrapColumns = 78;
		this._level = 0;
	}
	
	public function render(xml : Xml)
	{
		_buf = new StringBuf();
		_renderXml(xml);
		return _buf.toString().rtrim(newline);
	}
	
	function _renderXml(node : Xml)
	{
		var t = node.nodeType;
		if(Xml.Element == t)
		{
			_renderElement(node);
		} else if(Xml.PCData == t) {
			_renderPCData(node);
		} else if(Xml.CData == t) {
            _renderCData(node);
		} else if(Xml.Document == t) {
			_renderDocument(node);
		} else if(Xml.DocType == t) {
            _renderDocType(node);
		} else if(Xml.Prolog == t) {
            _renderProlog(node);
	    } else if(Xml.Comment == t) {
            _renderComment(node);
	    } else {
			throw "invalid node type: " + Std.string(t);
		}
	}
	
	function _renderIndent()
	{   
		if(autoformat)
			_buf.add(indent.repeat(_level));
	}
	
	function _renderNewline()
	{
		if(autoformat)
			_buf.add(newline);
	}
	
	function _renderElement(node : Xml)
	{   
		_renderIndent();
		if(node.iterator().hasNext())
		{
			_renderOpenElement(node);
			var it = node.iterator();
			var first = true;
			var inl = false;
			_level++;
			while(it.hasNext())
			{
				var child = it.next();
				if(first && !it.hasNext() && Xml.PCData == child.nodeType)
				{                                                 
					var content = _processPCData(child.nodeValue);
					if(content.indexOf(newline) >= 0)
					{
						_renderNewline();
						_buf.add(content);
						_renderNewline();
					} else {
						_buf.add(child.nodeValue);
						inl = true;
					}
					break;
				} 
				if(first)
				{
					_renderNewline();
					first = false;
				}
				_renderXml(child);
			}
			_level--;
			if(!inl)
			{
				_renderIndent();
			}
			_renderCloseElement(node);
		} else {
			_renderEmptyElement(node);
		}
		_renderNewline();
	}
	
	function _renderAttributes(node : Xml)
	{
		for(name in node.attributes())
		{
			_buf.add(" ");
			_renderAttribute(name, node.get(name));
		}
	}
	
	function _renderAttribute(name : String, value : String)
	{
		_buf.add(name + '"' + value + '"');
	}
	
	function _renderEmptyElement(node : Xml)
	{
		_buf.add("<" + node.nodeName);
		_renderAttributes(node);
		_buf.add("/>");
	}
	
	function _renderOpenElement(node : Xml)
	{
		_buf.add("<" + node.nodeName);
		_renderAttributes(node);
		_buf.add(">");
	}
	
	function _renderCloseElement(node : Xml)
	{
		_buf.add("</" + node.nodeName + ">");
	}
	
	function _renderPCData(node : Xml)
	{   
		if(autoformat && _emptyPattern.match(node.nodeValue))
			return;
		_renderIndent();
		_buf.add(_processPCData(node.nodeValue));
		_renderNewline();
	}
	
	function _processPCData(content : String)
	{          
		if(normalizeNewlines)
			content = _newLineReplace.replace(content, newline);
		
		if(autoformat)
		{
			content = StringTools.trim(content);
			if(content.length > wrapColumns)
			{
				content = content.wrapColumns(wrapColumns, indent.repeat(_level), newline);
			}
		}
		return content;
	}
	
	function _renderDocument(node : Xml)
	{
		for(child in node.iterator())
			_renderXml(child);
	}
	
	function _renderDocType(node : Xml)
	{
		_buf.add("<!DOCTYPE " + node.nodeValue + ">");
		_renderNewline();
	}
	
	function _renderProlog(node : Xml)
	{
		_buf.add("<?" + node.nodeValue + "?>");
		_renderNewline();
	}
	
	function _renderComment(node : Xml)
	{   
		_renderIndent();
		if(!stripComments)
			_buf.add("<!--" + node.nodeValue + "-->");
		_renderNewline();
	}
	
	function _renderCData(node : Xml)
	{   
		_renderIndent();
		_buf.add("<![CDATA[" + node.nodeValue + "]]>");
		_renderNewline();
	}
}