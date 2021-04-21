import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

export class VerifyUserBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"userId is a required field",
			"userId must be a valid UUID",
			"userId must be a `string` type, but the final value was: `123`.",
			"verificationCode is a required field",
			"verificationCode must be exactly 4 characters",
			"verificationCode must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
