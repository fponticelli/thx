package thx.validation;

import utest.Assert;

class TestRange extends TestAll
{
	public function testValidation()
	{
		var validator = new RangeValidator(-5.0, 5.0);
		assertValidation(validator.validate(-6.0), false);
		assertValidation(validator.validate(-5.0), true);
		assertValidation(validator.validate( 0.0), true);
		assertValidation(validator.validate( 5.0), true);
		assertValidation(validator.validate( 6.0), false);
		var validator = new RangeValidator( -5.0, 5.0, false, false);
		assertValidation(validator.validate(-6.0), false);
		assertValidation(validator.validate(-5.0), false);
		assertValidation(validator.validate( 0.0), true);
		assertValidation(validator.validate( 5.0), false);
		assertValidation(validator.validate( 6.0), false);
	}
	
	public function new(){}
}