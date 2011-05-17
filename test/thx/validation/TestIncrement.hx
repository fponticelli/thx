package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestIncrement extends TestAll
{
	public function testValidation()
	{
		var validator = new IncrementValidator(1);
		assertValidation(validator.validate(0.5), false);
		assertValidation(validator.validate(1), true);
		assertValidation(validator.validate(2), true);
		assertValidation(validator.validate( -10), true);
		
		var validator = new IncrementValidator(0.3);
		assertValidation(validator.validate(0.5), false);
		assertValidation(validator.validate(1), false);
		assertValidation(validator.validate(0.6), true);
		assertValidation(validator.validate( -3), true);
		assertValidation(validator.validate(66.6), true);
	}
	public function new(){}
}