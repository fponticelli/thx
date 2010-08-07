/**
 * ...
 * @author Franco Ponticelli
 */

package udo.neutral;

#if neko
typedef Lib = neko.Lib;
#elseif php
typedef Lib = php.Lib;
#elseif cpp
typedef Lib = cpp.Lib;
#end