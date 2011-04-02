package thx.load;

import utest.Assert;

class MemoryLoader<TValue> implements ILoader<TValue, String>
{
	public var data : TValue;
	public function new(?data : TValue)
	{
		this.data = data;
	}
	
	public function load(completeHandler : TValue -> Void, ?errorHandler : String -> Void) : Void
	{
		if (null != data)
		{
			completeHandler(data);
			return;
		}
		var error = "data is null";
		if (null != errorHandler)
			errorHandler(error);
		else
			throw error;
	}
}