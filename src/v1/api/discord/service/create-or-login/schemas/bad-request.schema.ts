import { ApiProperty } from "@nestjs/swagger";

import { invalidParamsErrorMessage } from "v1/utils/yup";

export class CreateOrLoginBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			invalidParamsErrorMessage,
			"username is a required field",
			"username must be a valid username",
			"username must be a `string` type, but the final value was: `123`.",
			"email is a required field",
			"email must be a valid email",
			"email must be a `string` type, but the final value was: `123`.",
			"discordUserId is a required field",
			"discordUserId must be a valid discord snowflake",
			"discordUserId must be a `string` type, but the final value was: `123`.",
			"discordAccessToken is a required field",
			"discordAccessToken must be a `string` type, but the final value was: `123`.",
			"discordRefreshToken is a required field",
			"discordRefreshToken must be a `string` type, but the final value was: `123`.",
			"These fields must have unique values: discordAccessToken, discordRefreshToken",
			"discordExpirationDateMillis is a required field",
			"discordExpirationDateMillis must be a date in the future",
			'discordExpirationDateMillis must be a `number` type, but the final value was: `"123"`.',
		],
	})
	public errors: Array<string>;
}
