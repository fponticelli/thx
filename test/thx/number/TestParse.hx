/**
 * ...
 * @author Justin Donaldson
 */

package thx.number;

import utest.Assert;
import thx.number.NumberParser;
typedef N = NumberParser;
class TestParse
{
	public function new(){}
	public function testParse(){
		Assert.equals(N.parse("1", thx.cultures.EnIN.culture),1);
		Assert.equals(N.parse("-10", thx.cultures.EnIN.culture), -10);
		Assert.equals(N.parse("100", thx.cultures.EnIN.culture), 100);
		Assert.floatEquals(N.parse("1,00,0", thx.cultures.EnIN.culture), Math.NaN);
		Assert.equals(N.parse("1,000", thx.cultures.EnUS.culture), 1000);
		Assert.floatEquals(N.parse("1,00,000", thx.cultures.EnUS.culture), Math.NaN);
		Assert.equals(N.parse("1,00,000", thx.cultures.EnIN.culture), 100000);
		Assert.equals(N.parse("10-", thx.cultures.ArMA.culture), -10);
		Assert.equals(N.parse("10,000", thx.cultures.EnIN.culture), 10000);
		Assert.equals(N.parse("100.000,003", thx.cultures.DeDE.culture), 100000.003);
		Assert.equals(N.parse("10,00,000", thx.cultures.EnIN.culture), 1000000);
		Assert.equals(N.parse("1,00,00,000", thx.cultures.EnIN.culture), 10000000);
		Assert.equals(N.parse("10,00,00,000", thx.cultures.EnIN.culture), 100000000);
		Assert.equals(N.parse("10,00,00,000.232523", thx.cultures.EnIN.culture), 100000000.232523);
		Assert.equals(N.parse("0", thx.cultures.EnIN.culture), 0);
	}
}