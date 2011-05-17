package thx.ini;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestIni
{
	static var s = '
root=value
	
[owner]
name=John Doe
organization=Acme Widgets Inc.

[database]
server=192.0.2.62
port=143
file = "payroll.dat"

[database.more]

sequence = 1, 2, 3

';
	static var s2 = 'root=value

[database]
server=192.0.2.62
port=143
file=payroll.dat

[database.more]
sequence=1, 2, 3

[owner]
name=John Doe
organization=Acme Widgets Inc.';

	static var v = {
		root : "value",
		owner : {
			name : "John Doe",
			organization : "Acme Widgets Inc."
		},
		database : {
			server : "192.0.2.62",
			port : 143,
			file : "payroll.dat",
			more : {
				sequence : [1, 2, 3]
			}
		}
	};
	
	public function testEncode()
	{
		// Neko doesn't preserve object fields declaration order
		// for this reason the ini is encoded and decoded to test if
		// it generates a correct output
		Assert.same(v, Ini.decode(Ini.encode(v)));
	}
	
	public function testDecode()
	{
		var t = Ini.decode(s);
		Assert.same(v, t);
	}
	
	public function new(){}
}