import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordConflictSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			"Confirmation token already used",
			"Confirmation token is expired",
		],
	})
	public errors: Array<string>;
}
