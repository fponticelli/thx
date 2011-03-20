package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestOptionValidator extends TestAll
{
	public function testValidation()
	{
		var validator = new OptionValidator(["a", "b", "c"]);
		assertValidation(validator.validate("a"), true);
		assertValidation(validator.validate("b"), true);
		assertValidation(validator.validate("c"), true);
		assertValidation(validator.validate("A"), false);
		assertValidation(validator.validate("d"), false);
		assertValidation(validator.validate("aa"), false);
	}
	
	public function new();
}