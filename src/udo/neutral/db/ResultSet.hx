package udo.neutral.db;

#if php
typedef ResultSet = php.db.ResultSet;
#elseif neko
typedef ResultSet = neko.db.ResultSet;
#end