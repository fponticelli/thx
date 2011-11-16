/**
 * ...
 * @author Franco Ponticelli
 */

package thx.js;

enum HostType
{
	UnknownServer;
	NodeJs;
	IE(version: String);
	Firefox(version: String);
	Safari(version: String);
	Chrome(version: String);
	Opera(version: String);
	Unknown(what: String);
}

enum EnvironmentType
{
	Mobile;
	Desktop;
	Server;
	UnknownEnvironment;
}

enum OSType
{
	Windows(version : String);
	IOs;
	Android;
	Mac;
	Linux;
	UnknownOs;
}

class ClientHost
{
	public static var host(default, null) : HostType;
	public static var environment(default, null) : EnvironmentType;
	public static var os(default, null) : OSType;

	public static function isIE()
	{
		return switch(host) { case IE(_): true; default: false; };
	}
	
	public static function hostVersion()
	{
		return switch(host)
		{
			case IE(v), Firefox(v), Safari(v), Chrome(v), Opera(v):
				v;
			default:
				null;
		};
	}
	
	public static function hostString()
	{
		return switch(host)
		{
			case UnknownServer: "unknown_server";
			case Unknown(_): "unknown";
			case NodeJs: "nodejs";
			default: Type.enumConstructor(host);
		}
	}
	
	public static function osString()
	{
		return Type.enumConstructor(os);
	}
	
	public static function osVersion()
	{
		return switch(os)
		{
			case Windows(v):
				v;
			default:
				null;
		}
	}
	
	public static function environmentString()
	{
		return Type.enumConstructor(environment);
	}
	
	static function userAgent() return "" + untyped __js__("navigator.userAgent")
	static function hasNavigator() : Bool return untyped __js__("typeof navigator !== 'undefined'")
	
	static function __init__()
	{
		var useragent = userAgent(),
			hasnavigator = hasNavigator(),
			pattern;
		// HOST
		host = if (!hasnavigator)
		{
			UnknownServer;
		} else if (untyped __js__("typeof module !== 'undefined' && module.exports")) {
			NodeJs;
		} else {
			if ((pattern = ~/MSIE(?:\/| )(\S*);/).match(useragent))
				IE(pattern.matched(1));
			else if ((pattern = ~/Firefox(?:\/| )(\S*)/).match(useragent))
				Firefox(pattern.matched(1));
			else if ((pattern = ~/Chrome(?:\/| )(\S*)/).match(useragent))
				Chrome(pattern.matched(1));
			else if ((pattern = ~/Version(?:\/| )(\S*) Safari(?:\/| )(\S*)/).match(useragent))
				Safari(pattern.matched(1));
			else if ((pattern = ~/Opera(?:\/| )(\S*)/).match(useragent))
				Opera(pattern.matched(1));
			else 
				Unknown(useragent);
		}
		
		// OS
		os = if (!hasnavigator) 
		{
			UnknownOs;
		} else {
			if ((pattern = ~/Windows NT\s+(\d+\.\d+)/).match(useragent)) 
			{
				var version = switch(pattern.matched(1))
				{
					case "5.1": "XP";
					case "5.2": "2003/XP x64";
					case "6.0": "Vista";
					case "6.1": "7";
					case "6.2": "8";
					default: "unknown";
				}
				Windows(version);
			}
			else if ((~/Mac OS X/).match(useragent)) Mac;
			else if ((~/(iPhone|iPad|iPod)/).match(useragent)) IOs;
			else if ((~/Linux/).match(useragent)) Linux;
			else if ((~/Android/).match(useragent)) Android;
			else UnknownOs;
		}
		
		// ENV
		environment = switch(host)
		{
			case UnknownServer: Server;
			case NodeJs: Server;
			case IE(_), Opera(_), Firefox(_): Desktop;
			case Safari(_):
				switch(os)
				{
					case IOs: Mobile;
					default: Desktop;
				}
			case Chrome(_):
				switch(os)
				{
					case Android: Mobile;
					default: Desktop;
				}
			case Unknown(_):
				switch(os)
				{
					case UnknownOs: UnknownEnvironment;
					default: Desktop;
				}
		};
		
	}
}