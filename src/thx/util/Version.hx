/**
 * ...
 * @author Franco Ponticelli
 */

package thx.util;

class Version 
{
	public var major(default, null) : Int;
	public var minor(default, null) : Int;
	public var maintenance(default, null) : Int;
	public var build(default, null) : Int;
	
	public function new(major : Int, minor : Int, maintenance : Int, build : Int) 
	{
		this.major = major;
		this.minor = minor;
		this.maintenance = maintenance;
		this.build = build;
	}
	
	public function fullVersion() return major + "." + minor + "." + maintenance + "." + build
	
	public function toString() return "V." + fullVersion()
}