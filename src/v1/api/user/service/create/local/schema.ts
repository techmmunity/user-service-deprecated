import { ApiProperty } from "@nestjs/swagger";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";
import { LanguageEnum, LanguageValues } from "core/enums/language";

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
		description: "User headline",
		enum: HeadlineValues(),
	})
	public headline: HeadlineEnum;

	@ApiProperty({
		description: "Suggested Language",
		enum: LanguageValues(),
	})
	public suggestedLanguage: LanguageEnum;
}
