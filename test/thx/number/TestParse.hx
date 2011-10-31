/**
 * ...
 * @author Justin Donaldson
 */

package thx.number;
import thx.cultures.DeDE;
import thx.cultures.ArMA;
import thx.cultures.EnUS;
import thx.cultures.EnIN;

import utest.Assert;
import thx.number.NumberParser;
typedef N = NumberParser;
using Math;


class TestParse
{
	public function new(){}
	public function testParse(){
		Assert.equals(1, N.parse("1", EnIN.culture));
		Assert.equals(-10, N.parse("-10", EnIN.culture));
		Assert.equals(100, N.parse("100", EnIN.culture));
		Assert.isTrue(N.parse("1,00,0", EnIN.culture).isNaN());
		Assert.equals(1000, N.parse("1,000", EnUS.culture));
		Assert.isTrue(N.parse("1,00,000", EnUS.culture).isNaN());
		Assert.equals(100000, N.parse("1,00,000", EnIN.culture));
		Assert.equals(-10, N.parse("10-", ArMA.culture));
		Assert.equals(10000, N.parse("10,000", EnIN.culture));
		Assert.equals(100000.003, N.parse("100.000,003", DeDE.culture));
		Assert.equals(1000000, N.parse("10,00,000", EnIN.culture));
		Assert.equals(10000000, N.parse("1,00,00,000", EnIN.culture));
		Assert.equals(100000000, N.parse("10,00,00,000", EnIN.culture));
		Assert.equals(100000000.232523, N.parse("10,00,00,000.232523", EnIN.culture));
		Assert.equals(0, N.parse("0", EnIN.culture));
		Assert.equals(3000.99, N.parse("3000,99", DeDE.culture));
		Assert.isTrue(N.parse("10,", EnUS.culture).isNaN());
	}
}