package udo.neutral.db;

#if php
typedef Sqlite = php.db.Sqlite;
#elseif neko
typedef Sqlite = neko.db.Sqlite;
#end