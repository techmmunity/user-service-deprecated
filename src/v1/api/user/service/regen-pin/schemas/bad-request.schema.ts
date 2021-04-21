import { ApiProperty } from "@nestjs/swagger";

export class RegenPinBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			"userId is a required field",
			"userId must be a valid UUID",
			"userId must be a `string` type, but the final value was: `123`.",
		],
	})
	public errors: Array<string>;
}
