package thx.csv;

/**
 * ...
 * @author Franco Ponticelli
 */

import haxe.PosInfos;
import utest.Assert;

class TestCsv
{
	static var s = 'Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.99
1999,Chevy,"Venture ""Extended Edition""",,4900.99
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.99
1996,Jeep,Grand Cherokee,"MUST SELL!\nair, moon roof, loaded",4799.99';

	static var v = [
		['Year',	'Make',		'Model',									'Description',							'Price'],
		[1997, 		'Ford', 	'E350',										'ac, abs, moon',						3000.99],
		[1999, 		'Chevy',	'Venture "Extended Edition"',				'',										4900.99],
		[1999, 		'Chevy',	'Venture "Extended Edition, Very Large"',	'',										5000.99],
		[1996, 		'Jeep', 	'Grand Cherokee', 							'MUST SELL!\nair, moon roof, loaded',	4799.99]
	];
		
	public function testDecode()
	{
		assertSame([[1997, "Ford", "E350"]], Csv.decode("1997,Ford,E350"));
		assertSame([[1997, " Ford ", " E350"]], Csv.decode("1997, Ford , E350"));
		assertSame([[1997, "Ford", "E350", 'Super, "luxurious" truck']], Csv.decode('1997,Ford,E350,"Super, ""luxurious"" truck"'));
		assertSame([[1997, "Ford", "E350", "Go get one now\nthey are going fast"]], Csv.decode('1997,Ford,E350,"Go get one now\nthey are going fast"'));

		assertSame(v, Csv.decode(s));
	}
	
	public function testEncode()
	{
		assertSame(s, Csv.encode(v));
	}
	
	function assertSame(expected : Dynamic, test : Dynamic, ?pos : PosInfos)
	{
		Assert.same(expected, test, "expected " + Dynamics.toString(expected) + " but was " + Dynamics.toString(test), pos);
	}
	
	public function new();
}