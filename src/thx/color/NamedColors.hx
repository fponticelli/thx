package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

class NamedColors
{
	public static var black(default, null) : RGBColor;
	public static var blue(default, null) : RGBColor;
	public static var cyan(default, null) : RGBColor;
	public static var darkGrey(default, null) : RGBColor;
	public static var grey(default, null) : RGBColor;
	public static var green(default, null) : RGBColor;
	public static var lightGrey(default, null) : RGBColor;
	public static var magenta(default, null) : RGBColor;
	public static var orange(default, null) : RGBColor;
	public static var pink(default, null) : RGBColor;
	public static var red(default, null) : RGBColor;
	public static var white(default, null) : RGBColor;
	public static var yellow(default, null) : RGBColor;
	
	public static var greyBlack(default, null) : GreyColor;
	public static var greyWhite(default, null) : GreyColor;
	
	static function __init__()
	{
		black =       new RGBColor( 0, 0, 0 );
		blue =        new RGBColor( 0, 0, 255 );
		cyan =        new RGBColor( 0, 255, 255 );
		darkGrey =    new RGBColor( 64, 64, 64 );
		grey =        new RGBColor( 128, 128, 128 );
		green =       new RGBColor( 0, 255, 0 );
		lightGrey =   new RGBColor( 192, 192, 192 );
		magenta =     new RGBColor( 255, 0, 255 );
		orange =      new RGBColor( 255, 200, 0 );
		pink =        new RGBColor( 255, 175, 175 );
		red =         new RGBColor( 255, 0, 0 );
		white =       new RGBColor( 255, 255, 255 );
		yellow =      new RGBColor( 255, 255, 0 );
		
		greyBlack = new GreyColor(0);
		greyWhite = new GreyColor(1);
	}
}