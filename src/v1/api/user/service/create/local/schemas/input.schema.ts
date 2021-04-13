import { ApiProperty } from "@nestjs/swagger";

export class CreateUserLocalInputSchema {
	@ApiProperty({
		description: "User email",
		example: "foo@bar.com",
	})
	public email: string;

	@ApiProperty({
		description: "User nickname",
		example: "foo_bar",
	})
	public username: string;

	@ApiProperty({
		description: "User strong password",
		example: "(T6^CKCR",
	})
	public password: string;
}
