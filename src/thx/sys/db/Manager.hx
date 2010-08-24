package thx.sys.db;

#if php
typedef Manager = php.db.Manager;
#elseif neko
typedef Manager = neko.db.Manager;
#end