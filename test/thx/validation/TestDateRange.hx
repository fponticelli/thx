package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestDateRange extends TestAll
{
	public function testValidation()
	{
		var validator = new DateRangeValidator(Date.fromString("2011-01-01"), Date.fromString("2011-01-31"));
		assertValidation(validator.validate(Date.fromString("2011-01-01")), true);
		assertValidation(validator.validate(Date.fromString("2011-01-10")), true);
		assertValidation(validator.validate(Date.fromString("2011-01-31")), true);
		assertValidation(validator.validate(Date.fromString("2011-02-10")), false);
		
		var validator = new DateRangeValidator(Date.fromString("2011-01-01"), Date.fromString("2011-01-31"), false, false);
		assertValidation(validator.validate(Date.fromString("2011-01-01")), false);
		assertValidation(validator.validate(Date.fromString("2011-01-10")), true);
		assertValidation(validator.validate(Date.fromString("2011-01-31")), false);
		assertValidation(validator.validate(Date.fromString("2011-02-10")), false);
	}
	
	public function new();
}