/**
 * ...
 * @author Franco Ponticelli
 */

package udo.error;
import haxe.PosInfos;

class NullArgument extends Error
{
	public function new(argumentName : String, ?posInfo : PosInfos)
	{
		super("invalid null argument '{0}'", argumentName, posInfo);
	}
	
	public static inline function throwIfNull(value : Dynamic, name : String, ?posInfo : PosInfos)
	{
		if (null == value)
			throw new NullArgument(name, posInfo);
	}
}