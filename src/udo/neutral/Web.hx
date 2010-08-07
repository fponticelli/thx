/**
 * ...
 * @author Franco Ponticelli
 */

package udo.neutral;

#if neko
typedef Web = neko.Web;
#elseif php
typedef Web = php.Web;
#elseif cpp
typedef Web = cpp.Web;
#end