package thx.validation;

import utest.Assert;

class TestEmail extends TestAll
{
	public function testValidEmails()
	{
		var validator = new EmailValidator(false);
		var emails = ['"test\\\\blah"@example.com', '"test\\"blah"@example.com', "customer/department@example.com", "$A12345@example.com", "!def!xyz%abc@example.com", "_Yosemite.Sam@example.com", "~@example.com", '"Austin@Powers"@example.com', "Ima.Fool@example.com", '"Ima.Fool"@example.com'];
		for(email in emails)
			assertValidation(validator.validate(email), true, email + " should be valid");
	}
	
	public function testInvalidEmails()
	{
		var validator = new EmailValidator(false);
		var emails = ["NotAnEmail", "@NotAnEmail", '"test\rblah"@example.com', '"test"blah"@example.com', ".wooly@example.com", "wo..oly@example.com", "pootietang.@example.com", ".@example.com", "Ima Fool@example.com"];
		for(email in emails)
			assertValidation(validator.validate(email), false, email + " should NOT be valid");
	}
	
	public function testTopLevelDomain()
	{
		var validator = new EmailValidator(true);
		assertValidation(validator.validate("a@b.fake"), false);
		var validator = new EmailValidator(false);
		assertValidation(validator.validate("a@b.fake"), true);
	}
	
	public function new(){}
}