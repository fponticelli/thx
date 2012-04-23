package thx.culture;

import thx.culture.core.DateTimeInfo;
import thx.culture.core.NumberInfo;

/**
* @todo add lazy loading
*/
class Culture extends Info
{
	public var language(default, null) : Language;
	
	public var date(default, null) : DateTimeInfo;
	public var englishCurrency(default, null) : String;
	public var nativeCurrency(default, null) : String;
	public var currencySymbol(default, null) : String;
	public var currencyIso(default, null) : String;

	public var englishRegion(default, null) : String;
	public var nativeRegion(default, null) : String;
	public var isMetric(default, null) : Bool;

	public var digits(default, null) : Null<Array<String>>;

	public var signNeg(default, null) : String;
	public var signPos(default, null) : String;

	public var symbolNaN(default, null) : String;
	public var symbolPercent(default, null) : String;
	public var symbolPermille(default, null) : String;
	public var symbolNegInf(default, null) : String;
	public var symbolPosInf(default, null) : String;

	public var number(default, null) : NumberInfo;
	public var currency(default, null) : NumberInfo;
	public var percent(default, null) : NumberInfo;

	static var cultures(getCultures, null) : Hash<Culture>;
	static function getCultures()
	{
		if (null == cultures)
			cultures = new Hash();
		return cultures;
	}
	
	public static function get(name : String) : Culture
	{
		return cultures.get(name.toLowerCase());
	}

	public static function names()
	{
		return cultures.keys();
	}

	public static function exists(culture:String)
	{
		return cultures.exists(culture.toLowerCase());
	}

	static var _defaultCulture : Culture;
	public static var defaultCulture(getDefaultCulture, setDefaultCulture) : Culture;
	
	static function getDefaultCulture()
	{
		if (null == _defaultCulture)
			return thx.cultures.EnUS.culture;
		else
			return _defaultCulture;
	}

	static function setDefaultCulture(culture : Culture)
	{
		return _defaultCulture = culture;
	}
	
	public static function add(culture : Culture)
	{
		if (null == _defaultCulture)
			_defaultCulture = culture;
		var name = culture.name.toLowerCase();
		if(!cultures.exists(name))
			cultures.set(name, culture);
	}
	

	public static function loadAll()
	{
#if php
		var dir = php.Sys.getCwd() + "lib/thx/cultures/";
		for (file in php.FileSystem.readDirectory(dir))
			untyped __call__("require_once", dir + file);
#end
	}
}