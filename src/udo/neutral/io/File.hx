package udo.neutral.io;

#if neko
typedef File = neko.io.File;
#elseif php
typedef File = php.io.File;
#elseif cpp
typedef File = cpp.io.File;
#end