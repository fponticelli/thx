/**
 * ...
 * @author Franco Ponticelli
 */

package thx.translation;

import thx.translation.ITranslation;
import thx.culture.Info;
import thx.culture.Culture;

#if neko
import neko.db.Connection;
#elseif php
import php.db.Connection;
#end

class DBTranslation implements ITranslation
{
	public static inline var TABLE_IDS = "MSG_IDS";
	public static inline var TABLE_MESSAGES = "MSG_MESSAGES";
	public static inline var TABLE_DOMAINS = "MSG_DOMAINS";
	public var conn(default, null) : Connection;
	
	var _domain : String;
	var _tablePrefix : String;
	var _domains : Hash<{ id : Int, pluralRule : Int }>;
	var _automaticallyAddUntranslatedMessages : Bool;
	
	public function new(?domain : String, conn : Connection, automaticallyAddUntranslatedMessages = false, tableprefix = "translation_")
	{
		if (null == conn) throw "null argument conn";
		this.conn = conn;
		this._domains = new Hash();
		this._automaticallyAddUntranslatedMessages = automaticallyAddUntranslatedMessages;
		this._tablePrefix = tableprefix;
		this.domain = domain;
	}
	
	public var domain(getDomain, setDomain) : String;
	
	public function hasSchema()
	{
		return conn.request("SHOW TABLES LIKE " + conn.quote(getTableIds()) +";").hasNext();
	}
	
	public function createSchema()
	{
		conn.request("CREATE TABLE IF NOT EXISTS `" + getTableIds() + "` (
`id` INT NOT NULL AUTO_INCREMENT ,
`msgid` VARCHAR( 255 ) NOT NULL ,
PRIMARY KEY ( `id` ) ,
UNIQUE (`msgid`)
) ENGINE = MYISAM DEFAULT CHARACTER SET = utf8;");


		conn.request("CREATE TABLE IF NOT EXISTS `" + getTableDomains() + "` (
`id` INT NOT NULL AUTO_INCREMENT ,
`domain` VARCHAR( 255 ) NOT NULL ,
`pluralRule` INT NOT NULL ,
PRIMARY KEY ( `id` ) ,
UNIQUE (`domain`)
) ENGINE = MYISAM DEFAULT CHARACTER SET = utf8;");

		conn.request("CREATE TABLE IF NOT EXISTS `" + getTableMessages() + "` (
`id` INT NOT NULL AUTO_INCREMENT ,
`msgid` INT NOT NULL ,
`domainid` INT NOT NULL ,
`message` TEXT NOT NULL ,
`quantifier` INT NOT NULL ,
PRIMARY KEY ( `id` ) ,
INDEX ( `msgid` , `domainid` )
) ENGINE = MYISAM DEFAULT CHARACTER SET = utf8;");
	}
	
	public function addDomain(?domain : String, ?info : Info)
	{
		if (null == domain && null == info)
			throw "you have to pass at least a domain or a info";
		if (null == info)
			info = Culture.defaultCulture.language;
		if (null == domain)
			domain = info.iso2;
		if (null != _getDBDomainInfo(domain))
			throw "domain already added: " + domain;
		
		conn.request("INSERT INTO " + getTableDomains() + " (id, domain, pluralRule) VALUES (NULL, " + conn.quote(domain) + ", " + Std.int(info.pluralRule) + ");");
		
		if (null == _domain)
			this.domain = domain;
	}
	
	function _insertOrChangeMessage(msgid : Int, domainid : Int, msg : String, quantifier : Null<Int>)
	{
		var rs = conn.request("SELECT id FROM " + getTableMessages() + " WHERE msgid = " + msgid + " AND domainid = " + domainid + " AND quantifier " + (null == quantifier ? "IS NULL" : " = " + quantifier));
		if (!rs.hasNext())
		{
			conn.request("INSERT INTO " + getTableMessages() + " (id,msgid,domainid,message,quantifier) VALUES (NULL,"+msgid+","+domainid+","+conn.quote(msg)+","+quantifier+");");
		} else {
			conn.request("UPDATE " + getTableMessages() + " SET message = " + conn.quote(msg) + " WHERE id = "+rs.getIntResult(0)+";");
		}
	}
	
	function _retrieveOrAddMessageId(msgid : String) : Int
	{
		var rs = conn.request("SELECT id FROM " + getTableIds() + " WHERE msgid = " + conn.quote(msgid) + ";");
		if (rs.hasNext())
			return rs.getIntResult(0);
		conn.request("INSERT INTO " + getTableIds() + " (id, msgid) VALUES (NULL, " + conn.quote(msgid) + ");");
		return conn.lastInsertId();
	}
	
	public function addSingular(id : String, text : String, ?domain : String)
	{
		if (null == domain)
			domain = this.domain;
		var msgid = _retrieveOrAddMessageId(id);
		var info = _getDomainInfo(domain);
		_insertOrChangeMessage(msgid, info.id, text, 0);
	}
	
	public function addPlural(ids : String, idp : String, texts : Array<String>, ?domain : String)
	{
		if (null == domain)
			domain = this.domain;
		addSingular(ids, texts[0], domain);
		var midp = _retrieveOrAddMessageId(idp);
		var info = _getDomainInfo(domain);
		for (i in 1...PluralForms.pluralForms[info.pluralRule])
		{
			var txt = texts[i];
			if (null == txt)
				throw "translation cannot be null, you should provide " + PluralForms.pluralForms[info.pluralRule] + " forms";
			_insertOrChangeMessage(midp, info.id, txt, i);
		}
	}
	
	function _getMessage(id : String, domain : String, quantifier : Int)
	{
		var tids = getTableIds();
		var tmsg = getTableMessages();
		var info = _getDomainInfo(domain);
		var sql = "SELECT message FROM " + tmsg +
				" LEFT JOIN " + tids + " ON " + tmsg + ".msgid = " + tids + ".id" +
				" WHERE " + tids + ".msgid = " + conn.quote(id) + " AND " + tmsg + ".domainid = " +info.id + " AND quantifier = " + quantifier + ";";
		var rs = conn.request(sql);
		if (!rs.hasNext())
			return null;
		else
			return rs.getResult(0);
	}
	
	public function _(id : String, ?domain : String)
	{
		
		if (null == domain)
			domain = this.domain;
		var result = _getMessage(id, domain, 0);
		if (null == result)
		{
			if (_automaticallyAddUntranslatedMessages)
				_retrieveOrAddMessageId(id);
			return id;
		} else
			return result;
	}
	
	public function __(ids : String, idp : String, quantifier : Int, ?domain : String)
	{
		if (null == domain)
			domain = this.domain;
		var info = _getDomainInfo(domain);
		var q = PluralForms.pluralRules[info.pluralRule](quantifier);
		if (0 == q)
			return _(ids, domain);
		else {
			var result = _getMessage(idp, domain, q);
			if (null == result)
			{
				if (_automaticallyAddUntranslatedMessages)
					_retrieveOrAddMessageId(idp);
				return idp;
			} else
				return result;
		}
	}
	
	function getDomain()
	{
		if (null == _domain)
			throw "default domain is not set";
		return _domain;
	}
	
	function setDomain(value : String)
	{
		if (value != null &&!conn.request("SELECT COUNT(*) FROM " + getTableDomains() + " WHERE domain = " + conn.quote(value)).hasNext())
			throw "invalid domain " + value;
		return _domain = value;
	}
	
	function _getDomainInfo(domain : String)
	{
		if (_domains.exists(domain))
			return _domains.get(domain);
		var d = _getDBDomainInfo(domain);
		if (null == d)
			throw "invalid domain " + domain;
		_domains.set(domain, d);
		return d;
	}
	
	function _getDBDomainInfo(domain : String) : Null<{ id : Int, pluralRule : Int }>
	{
		var sql = "SELECT id, pluralRule FROM " + getTableDomains() + " WHERE domain = " + conn.quote(domain) + ";";
		var rs = conn.request(sql);
		if (!rs.hasNext())
			return null;
		else
			return rs.next();
	}
	
	inline function getTableIds() return _tablePrefix + TABLE_IDS
	inline function getTableMessages() return _tablePrefix + TABLE_MESSAGES
	inline function getTableDomains() return _tablePrefix + TABLE_DOMAINS
}