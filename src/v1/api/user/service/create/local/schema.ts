import { ApiProperty } from "@nestjs/swagger";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";

export class CreateUserSchema {
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

	@ApiProperty({
		description: "User birthday",
	})
	public birthday: Date;

	@ApiProperty({
		description: "User headline",
		enum: HeadlineValues(),
	})
	public headline: HeadlineEnum;
}
