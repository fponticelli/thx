package thx.translation;

interface ITranslation
{
	public var domain(getDomain, setDomain) : String;
	public function _(id : String, ?domain : String) : String;
	public function __(ids : String, idp : String, quantifier : Int, ?domain : String) : String;
}