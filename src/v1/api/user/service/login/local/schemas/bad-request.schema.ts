import { ApiProperty } from "@nestjs/swagger";

import { invalidParamsErrorMessage } from "v1/utils/yup";

export class LoginLocalBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			"Invalid username, email or password",
			invalidParamsErrorMessage,
			"identifier is a required field",
			"identifier must be a valid email or username",
			"identifier must be a `string` type, but the final value was: `123`.",
			"password is a required field",
			"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			"password must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
