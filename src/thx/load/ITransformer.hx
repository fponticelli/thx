package thx.load;

/**
 * ...
 * @author Franco Ponticelli
 */

class ITransformer<TIn, TOut, TError>
{
	public function transform(input : TIn, ?errorHandler : TError -> Void) : TOut;
}