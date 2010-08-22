package udo.neutral.db;

#if php
typedef Transaction = php.db.Transaction;
#elseif neko
typedef Transaction = neko.db.Transaction;
#end