/**
 * ...
 * @author Franco Ponticelli
 */

package udo.neutral;

#if neko
typedef Sys = neko.Sys;
#elseif php
typedef Sys = php.Sys;
#elseif cpp
typedef Sys = cpp.Sys;
#end