package thx.sys.io;

#if neko
typedef FileOutput = neko.io.FileOutput;
#elseif php
typedef FileOutput = php.io.FileOutput;
#elseif cpp
typedef FileOutput = cpp.io.FileOutput;
#end