/**
 * ...
 * @author Franco Ponticelli
 */

package udo.error;

class NotImplemented
{
	public function new(?posInfo : PosInfos)
	{
		super("method {0}.{1}() needs to be implemented", [posInfo.className, posInfo.methodName], posInfo);
	}
}