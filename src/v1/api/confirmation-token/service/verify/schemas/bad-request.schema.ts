import { ApiProperty } from "@nestjs/swagger";

import { invalidParamsErrorMessage } from "v1/utils/yup";

export class VerifyConfirmationTokenBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			invalidParamsErrorMessage,
			"userId is a required field",
			"userId must be a valid UUID",
			"userId must be a `string` type, but the final value was: `123`.",
			"verificationCode is a required field",
			"verificationCode must be exactly 6 characters",
			"verificationCode must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
