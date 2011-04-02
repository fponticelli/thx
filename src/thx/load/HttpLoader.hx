package thx.load;
import haxe.Http;

/**
 * ...
 * @author Franco Ponticelli
 */

class HttpLoader implements ILoader<String, String>
{
	public var url : String;
#if (neko || php)
	public var timeout : Int;
#end
	public var headers : Hash<String>;
	public var post : Bool;
	public function new(url : String, #if (neko || php) timeout = 30, #end post = false, ?headers : Hash<String>)
	{
		this.url = url;
#if (neko || php)
		this.timeout = timeout;
#end
		this.post = post;
		if (null != headers)
			this.headers = headers;
		else
			this.headers = new Hash();
	}
	
	public function load(completeHandler : String -> Void, ?errorHandler : String -> Void)
	{
		var http = new Http(url);
#if (neko || php)
		http.cnxTimeout = timeout;
#else
		http.async = true;
#end
		for (key in headers.keys())
			http.setHeader(key, headers.get(key));
		http.onData = completeHandler;
		if (null == errorHandler)
			http.onError = function(e) throw e;
		else
			http.onError = errorHandler;
		http.request(post);
	}
}