import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

export class FindUserBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"identifier is a required field",
			"identifier must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
