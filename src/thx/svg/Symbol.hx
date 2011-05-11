package thx.svg;

/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 */

class Symbol
{
	static var sqrt3 = Math.sqrt(3);
	static var tan30 = Math.tan(30 * Math.PI / 180);
	
	public static function triangleDowun(size : Float)
	{
		var rx = Math.sqrt(size / sqrt3),
			ry = rx * sqrt3 / 2;
		return "M0," + ry
			+ "L" + rx +"," + -ry
			+ " " + -rx + "," + -ry
			+ "Z";
	}
	
	public static function triangleUp(size : Float)
	{
		var rx = Math.sqrt(size / sqrt3),
			ry = rx * sqrt3 / 2;
		return "M0," + -ry
			+ "L" + rx +"," + ry
			+ " " + -rx + "," + ry
			+ "Z";
	}
	
	public static function square(size : Float)
	{
		var r = Math.sqrt(size) / 2;
		return "M" + -r + "," + -r
			+ "L" + r + "," + -r
			+ " " + r + "," + r
			+ " " + -r + "," + r
			+ "Z";
	}
	
	public static function diamond(size : Float)
	{
		var ry = Math.sqrt(size / (2 * tan30)),
			rx = ry * tan30;
		return "M0," + -ry
			+ "L" + rx + ",0"
			+ " 0," + ry
			+ " " + -rx + ",0"
			+ "Z";
	}
	
	public static function cross(size : Float)
	{
		var r = Math.sqrt(size / 5) / 2;
		return "M" + -3 * r + "," + -r
			+ "H" + -r
			+ "V" + -3 * r
			+ "H" + r
			+ "V" + -r
			+ "H" + 3 * r
			+ "V" + r
			+ "H" + r
			+ "V" + 3 * r
			+ "H" + -r
			+ "V" + r
			+ "H" + -3 * r
			+ "Z";
	}
	
	public static function circle(size : Float)
	{
		var r = Math.sqrt(size / Math.PI);
		return "M0," + r
			+ "A" + r + "," + r + " 0 1,1 0," + (-r)
			+ "A" + r + "," + r + " 0 1,1 0," + r
			+ "Z";
	}
}