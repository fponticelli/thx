package thx.data;
import haxe.Http;

/**
 * ...
 * @author Franco Ponticelli
 */

class HttpLoader implements ILoader<String, String>
{
	public var url : String;
	public var timeout : Int;
	public var headers : Hash<String>;
	public var post : Bool;
	public function new(url : String, timeout = 30, post = false, ?headers : Hash<String>)
	{
		this.url = url;
		this.timeout = timeout;
		this.post = post;
		if (null != headers)
			this.headers = headers;
		else
			this.headers = new Hash();
	}
	
	public function load(completeHandler : String -> Void, ?errorHandler : String -> Void)
	{
		var http = new Http(url);
		http.cnxTimeout = timeout;
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