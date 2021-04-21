import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

export class CreateUserLocalBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"email is a required field",
			"email must be a valid email",
			"email must be a `string` type, but the final value was: `123`.",
			"username is a required field",
			"username must be a valid username",
			"username must be a `string` type, but the final value was: `123`.",
			"password is a required field",
			"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			"password must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
