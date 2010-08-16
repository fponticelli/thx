/**
 * ...
 * @author Franco Ponticelli
 */

package udo.neutral;

#if neko
typedef FileSystem = neko.FileSystem;
#elseif php
typedef FileSystem = php.FileSystem;
#elseif cpp
typedef FileSystem = cpp.FileSystem;
#end