/**
 * ...
 * @author Franco Ponticelli
 */

package udo.error;

import haxe.PosInfos;

class AbstractMethod extends Error
{
	public function new(?posInfo : PosInfos)
	{
		super("method {0}.{1}() is abstract", [posInfo.className, posInfo.methodName], posInfo);
	}
}