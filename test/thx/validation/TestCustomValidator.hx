package thx.validation;

/**
 * ...
 * @author Franco Ponticelli
 */

import thx.util.Message;
import utest.Assert;
import thx.util.Result;

class TestCustomValidator
{
	public function testValidation()
	{
		var validator = new CustomValidator<String>();
		
		// no validators
		Assert.same(Ok, validator.validate("a"));
		
		// one validator
		validator.add(function(v : String) {
			return v.toUpperCase() == v ? null : new Message("string '{0}' must be all uppercase", v);
		});
		Assert.isTrue(switch(validator.validate("a")) {
			case Ok: false;
			case Failure(_): true;
		});
		Assert.same(Ok, validator.validate("A"));
		
		// two validators
		validator.add(function(v : String) {
			return StringTools.replace(v, " ", "") == v ? null : new Message("string '{0}' must not contain spaces", v);
		});
		
		Assert.isTrue(switch(validator.validate("A A")) {
			case Ok: false;
			case Failure(_): true;
		});
		Assert.same(Ok, validator.validate("AA"));
	}
	
	public function new(){}
}