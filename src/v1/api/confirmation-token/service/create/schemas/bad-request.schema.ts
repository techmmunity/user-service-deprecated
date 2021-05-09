import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ConfirmationTokenTypeValues } from "core/enums/confirmation-token-type";

export class CreateConfirmationTokenBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"Only userId OR contactId should be provided",
			"userId or contactId must be provided",
			"userId must be a valid UUID",
			"userId must be a `string` type, but the final value was: `123`.",
			"contactId must be a valid UUID",
			"contactId must be a `string` type, but the final value was: `123`.",
			"type is a required field",
			`type must be one of the following values: ${ConfirmationTokenTypeValues().join(
				", ",
			)}`,
			"type must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
