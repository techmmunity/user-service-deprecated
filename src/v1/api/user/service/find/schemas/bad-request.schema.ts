import { ApiProperty } from "@nestjs/swagger";

import { invalidParamsErrorMessage } from "v1/utils/yup";

export class FindUserBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			invalidParamsErrorMessage,
			"identifier is a required field",
			"identifier must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
