package thx.color;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;
using thx.color.Hsl;
using thx.color.Rgb;

class TestColors
{
	public function testParse()
	{
		var ab = NamedColors.aliceblue;
		Assert.isTrue(ab.equals(Colors.parse("aliceblue")));
		Assert.isTrue(ab.equals(Colors.parse("alice blue")));
		Assert.isTrue(ab.equals(Colors.parse("#F0F8FF")));
		Assert.isTrue(ab.equals(Colors.parse("rgb(240,248,255)")));
		Assert.isTrue(Rgb.fromInt(0xAABBCC).equals(Colors.parse("#ABC")));
		Assert.isTrue(Rgb.fromInt(0xAABBCC).equals(Colors.parse("#abc")));
		Assert.isTrue(new Hsl(120, 0.5, 0.75).equals(Colors.parse("hsl(120,50%,75%)")));
		Assert.isTrue(new Hsl(120, 0.5, 0.75).equals(Colors.parse("hsl(120,0.5,0.75)")));

		Assert.isNull(Colors.parse("!alice blue"));
	}

	public function new(){}
}