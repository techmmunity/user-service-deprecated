import { ApiProperty } from "@nestjs/swagger";

export class CreateContactConflictSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			'Email "foo@bar.com" is already linked to an user',
			'Phone "19999904610" is already linked to an user',
		],
	})
	public errors: Array<string>;
}
