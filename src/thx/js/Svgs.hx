package thx.js;
import js.Dom;
import thx.js.Selection;
import thx.js.AccessAttribute;


class Svgs {
	public static function translate<A,B>(ad:BoundSelection<A,B>, x:Float,y:Float) {
		ad.attr("transform").string("translate(" + x + "," + y + ")");
		return ad;
	}

}
class UnboundSvgs{
	public static function translate(ad:Selection, x:Float,y:Float) {
		ad.attr("transform").string("translate(" + x + "," + y + ")");
		return ad;
	}
}
class UnitHelpers{
	public static function pct(v:Float){ return v+"%";}
	public static function inches(v:Float){ return v+'in';}
	public static function cm(v:Float){ return v+'cm';}
	public static function mm(v:Float){ return v+'mm';}
	public static function em(v:Float){ return v+'em';}
	public static function ex(v:Float){ return v+'ex';}
	public static function pt(v:Float){ return v+'pt';}
	public static function pc(v:Float){ return v+'pc';}
	public static function px(v:Float){ return v+'px';}
}
