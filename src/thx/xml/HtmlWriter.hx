package thx.xml;

class Html5Writer
{   
	public var indent : String; 
	public var newline : String;
	public function new(indent = "  ", newline = "\n")
	{
		this.indent = indent;
		this.newline = newline;
	}
	
	public function render(dom : Xml)
	{
		
	}
}