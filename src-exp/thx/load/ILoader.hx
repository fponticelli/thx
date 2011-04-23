package thx.load;

/**
 * ...
 * @author Franco Ponticelli
 */

class ILoader<TValue, TError>
{
	public function load(completeHandler : TValue -> Void, ?errorHandler : TError -> Void) : Void;
}