import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

export class ChangePasswordBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			"Invalid confirmation token",
			InvalidParamsErrorMessage,
			"confirmationTokenId is a required field",
			"confirmationTokenId must be a valid UUID",
			"confirmationTokenId must be a `string` type, but the final value was: `123`.",
			"newPassword is a required field",
			"newPassword must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			"newPassword must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
