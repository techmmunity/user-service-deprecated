import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalSchema {
	@ApiProperty({
		description: "User email or username",
		example: "foo@bar.com",
	})
	public emailOrUsername: string;

	@ApiProperty({
		description: "User strong password",
		example: "(T6^CKCR",
	})
	public password: string;
}
