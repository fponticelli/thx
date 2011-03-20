package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestSingleLine extends TestAll
{
	public function testValidation()
	{
		var validator = new SingleLineValidator();
		assertValidation(validator.validate("a b"), true);
		assertValidation(validator.validate("a\nb"), false);
	}
	public function new();
}