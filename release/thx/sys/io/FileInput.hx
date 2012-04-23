package thx.sys.io;

#if neko
typedef FileInput = neko.io.FileInput;
#elseif php
typedef FileInput = php.io.FileInput;
#elseif cpp
typedef FileInput = cpp.io.FileInput;
#end