package thx.translation;
import thx.culture.Info;
import thx.culture.Culture;
import thx.translation.ITranslation;
import thx.translation.PluralForms;

class DictionaryTranslation implements ITranslation
{
	public var domain(getDomain, setDomain) : String;
	var _domain : String;
	
	var _infos : Hash<Info>;
	var _domainss : Hash<Hash<String>>;
	var _domainsp : Hash<Hash<Array<String>>>;
	
	public function new(?domain : String, ?info : Info)
	{
		_infos = new Hash();
		_domainss = new Hash();
		_domainsp = new Hash();
		if (null != domain)
		{
			addDomain(domain, info);
		}
	}
	
	public function addDomain(?domain : String, ?info : Info)
	{
		if (null == domain && null == info)
			throw "you have to pass at least a domain or a info";
		if (null == info)
			info = Culture.defaultCulture.language;
		if (null == domain)
			domain = info.iso2;
		if (_infos.exists(domain))
			throw "domain already added: " + domain;
		
		_infos.set(domain, info);
		_domainss.set(domain, new Hash());
		_domainsp.set(domain, new Hash());
		
		if (null == _domain)
			this.domain = domain;
	}
	
	public function addSingular(id : String, text : String, ?domain : String)
	{
		if (null == domain)
			domain = this.domain;
		_domainss.get(domain).set(id, text);
	}
	
	public function addPlural(ids : String, idp : String, texts : Array<String>, ?domain : String)
	{
		if (null == domain)
			domain = this.domain;
		_domainss.get(domain).set(ids, texts[0]);
		_domainsp.get(domain).set(idp, texts);
	}
	
	public function _(id : String, ?domain : String) : String
	{
		if (null == domain)
			domain = this.domain;
		var v = _domainss.get(domain).get(id);
		if (null == v)
			return id;
		else
			return v;
	}
	
	public function __(ids : String, idp : String, quantifier : Int, ?domain : String) : String
	{
		if (null == domain)
			domain = this.domain;

		var index = PluralForms.pluralRules[_infos.get(domain).pluralRule](quantifier);
		var v = _domainsp.get(domain).get(idp)[index];
		if (null == v)
		{
			if (quantifier == 1)
				return ids;
			else
				return idp;
		} else
			return v;
	}
	
	function getDomain()
	{
		if (null == _domain)
			throw "default domain not yet set";
		return _domain;
	}
	function setDomain(v : String) return _domain = v
}