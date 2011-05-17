/**
 * ...
 * @author Franco Ponticelli
 */

package thx.validation;

import utest.Assert;

class TestUrl extends TestAll
{
	public function testValidUrls()
	{
		var validator = new UrlValidator();
		var urls = ['http://example.com', 'http://www.example.com', 'http://example.com/url/x%20y?a=b&c'];
		for(url in urls)
			assertValidation(validator.validate(url), true, url + " should be valid");
	}
	
	public function testInvalidUrls()
	{
		var validator = new UrlValidator();
		var urls = ['', 'htp://example.com', 'www.example.com'];
		for(url in urls)
			assertValidation(validator.validate(url), false, url + " should NOT be valid");
	}
	
	public function new(){}
}