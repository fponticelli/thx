package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import utest.Assert;

class TestPatternValidator extends TestAll
{
	public function testValidation()
	{
		var validator = new PatternValidator(~/^[aeiou]+$/i);
		assertValidation(validator.validate("a"), true);
		assertValidation(validator.validate("b"), false);
		assertValidation(validator.validate("aba"), false);
		assertValidation(validator.validate("UiU"), true);
	}
	
	public function new(){}
}