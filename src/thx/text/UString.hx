/**
 * ...
 * @author Franco Ponticelli
 */

package thx.text;

import thx.error.Error;

class UString
{
	static var _re = new EReg("[{](\\d+)(?::[^}]*)?[}]", "m");
	inline public static function format(pattern : String, params : Array<Dynamic>)
	{                  
#if hxculture
		return hxculture.Format.string(pattern, params, hxculture.Culture.defaultCulture);
#else
		return plainFormat(pattern, params);
#end
	}
	
	public static function plainFormat(pattern : String, params : Array<Dynamic>)
	{
		return _re.customReplace(pattern, function(ereg : EReg) {
			var index = Std.parseInt(ereg.matched(1));
			if (index >= params.length || index < 0)
				throw new Error("format index {0} out of range", index);
			return "" + params[index];
		});
	}
	
	// TODO, test me
	public static function upTo(value : String, searchFor : String)
	{
		var pos = value.indexOf(searchFor);
		if (pos < 0)
			return value;
		else
			return value.substr(0, pos);
	}
	
	// TODO, test me
	public static function startFrom(value : String, searchFor : String)
	{
		var pos = value.indexOf(searchFor);
		if (pos < 0)
			return value;
		else
			return value.substr(pos + searchFor.length);
	}
	
	// TODO, test me
	public static function rtrim(value : String, charlist : String) : String
	{
#if php
		return untyped __call__("rtrim", charlist);
#else
		var len = value.length;
		while (len > 0)
		{
			var c = value.substr(len - 1, 1);
			if (charlist.indexOf(c) < 0)
				break;
			len--;
		}
		return value.substr(0, len);
#end
	}
	
	// TODO, test me
	public static function ltrim(value : String, charlist : String) : String
	{
#if php
		return untyped __call__("ltrim", charlist);
#else
		var start = 0;
		while (start < value.length)
		{
			var c = value.substr(start, 1);
			if (charlist.indexOf(c) < 0)
				break;
			start++;
		}
		return value.substr(start);
#end
	}
	
	public static inline function trim(value : String, charlist : String) : String
	{
#if php
		return untyped __call__("trim", charlist);
#else
		var len = value.length;
		var pos;
		while (len > 0)
		{
			var c = value.substr(len - 1, 1);
			if (charlist.indexOf(c) < 0)
				break;
			len--;
		}
		return rtrim(ltrim(value, charlist), charlist);
#end
	}
	
	public static inline function ucfirst(value : String) : String
	{
		return (value == null ? null : value.charAt(0).toUpperCase() + value.substr(1));
	}
	
	public static inline function lcfirst(value : String) : String
	{
		return (value == null ? null : value.charAt(0).toLowerCase() + value.substr(1));
	}
	
	public static function empty(value : String)
	{
		if (value == null || value == '')
			return true;
		else if (StringTools.trim(value) == '')
			return true;
		else
			return false;
	}
	
	public static inline function isAlphaNum(value : String) : Bool
	{
#if php
		return untyped __call__("ctype_alnum", value);
#else
		return (value == null ? false : __alphaNumPattern.match(value));
#end
	}
	
	public static inline function digitsOnly(value : String) : Bool
	{
#if php
		return untyped __call__("ctype_digit", value);
#else
		return (value == null ? false : __digitsPattern.match(value));
#end
	}
	
	public static function ucwords(value : String) : String
	{
		return __ucwordsPattern.customReplace(ucfirst(value), __upperMatch);
	}
	
	/**
	 * Like ucwords but uses only white spaces as boundaries
	 * @param	value
	 * @return
	 */
	public static function ucwordsws(value : String) : String
	{
#if php
		return untyped __call__("ucwords", value);
#else
		return __ucwordswsPattern.customReplace(ucfirst(value), __upperMatch);
#end
	}
	
	static function __upperMatch(re : EReg)
	{
		return re.matched(0).toUpperCase();
	}
	static var __ucwordsPattern = new EReg('[^a-zA-Z]([a-z])', '');
#if !php
	static var __ucwordswsPattern = new EReg('\\s([a-z])', '');
	static var __alphaNumPattern = new EReg('^[a-z0-9]+$', 'i');
	static var __digitsPattern = new EReg('^[0-9]+$', '');
#end
}