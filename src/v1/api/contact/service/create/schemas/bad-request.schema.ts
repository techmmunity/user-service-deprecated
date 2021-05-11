import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ContactTypeValues } from "core/enums/contact-type";

export class CreateContactBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"userId is a required field",
			"userId must be a valid UUID",
			"userId must be a `string` type, but the final value was: `123`.",
			"contacts is a required field",
			"contacts must be a `array` type, but the final value was: `123`.",
			"contacts field must have at least 1 items",
			"contacts[0] must be a `object` type, but the final value was: `123`.",
			`contacts[0].type must be one of the following values: ${ContactTypeValues().join(
				", ",
			)}`,
			"contacts[0].type must be a `string` type, but the final value was: `123`.",
			"contacts[0].value must be a valid email or phone number",
			"contacts[0].value must be a `string` type, but the final value was: `123`.",
			"contacts[0].value must be a `string` type, but the final value was: `123`.",
			"contacts[0].value must be a valid phone number",
			"contacts[0].value must be a valid email",
		],
	})
	public errors: Array<string>;
}
