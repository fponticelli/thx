/**
 * Based on D3.js by Michael Bostock
 * @author Franco Ponticelli
 * Derived from Tom Carden's Albers implementation for Protovis.
 * http://gist.github.com/476238
 * http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html
 */

package thx.geo;
import thx.math.Const;

class Albers implements IProjection
{
	public var origin(getOrigin, setOrigin) : Array<Float>;
	public var parallels(getParallels, setParallels) : Array<Float>;
	public var translate(getTranslate, setTranslate) : Array<Float>;
	public var scale(getScale, setScale) : Float;
	var lng0 : Float;
	var n : Float;
	var C : Float;
	var p0 : Float;

	public function new() 
	{
		Reflect.setField(this, "origin",    [-98.0, 38]);
		Reflect.setField(this, "parallels", [ 29.5, 45.5]);
		scale     = 1000;
		translate = [480.0, 250];
		reload();
	}
	
	public function project(coords : Array<Float>)
	{
		var t = n * (Const.TO_RADIAN * coords[0] - lng0),
			p = Math.sqrt(C - 2 * n * Math.sin(Const.TO_RADIAN * coords[1])) / n;
		return [
			scale * p * Math.sin(t) + translate[0],
			scale * (p * Math.cos(t) - p0) + translate[1]
		];
	}
	
	public function invert(coords : Array<Float>)
	{
		var x = (coords[0] - translate[0]) / scale,
			y = (coords[1] - translate[1]) / scale,
			p0y = p0 + y,
			t = Math.atan2(x, p0y),
			p = Math.sqrt(x * x + p0y * p0y);
		return [
			(lng0 + t / n) / Const.TO_RADIAN,
			Math.asin((C - p * p * n * n) / (2 * n)) / Const.TO_RADIAN
		];
	}
	
	function getOrigin() return origin.copy()
	function setOrigin(origin : Array<Float>)
	{
		this.origin = [origin[0], origin[1]];
		reload();
		return origin;
	}
	
	function getParallels() return parallels.copy()
	function setParallels(parallels : Array<Float>)
	{
		this.parallels = [parallels[0], parallels[1]];
		reload();
		return parallels;
	}
	
	function getTranslate() return translate.copy()
	function setTranslate(translate : Array<Float>)
	{
		this.translate = [translate[0], translate[1]];
		return translate;
	}
	
	function reload()
	{
		var phi1 = Const.TO_RADIAN * parallels[0],
			phi2 = Const.TO_RADIAN * parallels[1],
			lat0 = Const.TO_RADIAN * origin[1],
			s = Math.sin(phi1),
			c = Math.cos(phi1);
		lng0 = Const.TO_RADIAN * origin[0];
		n = .5 * (s + Math.sin(phi2));
		C = c * c + 2 * n * s;
		p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
		return this;
	}

	function setScale(scale : Float) return this.scale = scale
	function getScale() return scale
}