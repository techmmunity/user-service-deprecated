import { ApiProperty } from "@nestjs/swagger";

export class CreateUserLocalConflictSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			'User with username "example" already exists',
			'Email "foo@bar.com" is already linked to an user',
		],
	})
	public errors: Array<string>;
}
