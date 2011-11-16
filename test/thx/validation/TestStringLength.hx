package thx.validation;

import utest.Assert;

class TestStringLength extends TestAll
{
	public function testValidation()
	{
		var validator = new StringLengthValidator(3, 5);
		assertValidation(validator.validate(""), false);
		assertValidation(validator.validate("abc"), true);
		assertValidation(validator.validate("abcde"), true);
		assertValidation(validator.validate("abcdef"), false);
	}
		
	public function new(){}
}