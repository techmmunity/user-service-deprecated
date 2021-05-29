import { ApiProperty } from "@nestjs/swagger";

export class CreateOrLoginConflictSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			'User with username "example" already exists',
			'Email "foo@bar.com" is already linked to an user',
			'Discord user with ID "705572674713157684" is already registred',
		],
	})
	public errors: Array<string>;
}
