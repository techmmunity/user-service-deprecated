import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalInputSchema {
	@ApiProperty({
		description: "User email or username",
		example: "foo@bar.com",
	})
	public identifier: string;

	@ApiProperty({
		description: "User strong password",
		example: "t6@CKCR",
	})
	public password: string;
}
