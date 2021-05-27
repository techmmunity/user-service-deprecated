import { ApiProperty } from "@nestjs/swagger";
import * as moment from "moment";

export class CreateUserDiscordInputSchema {
	@ApiProperty({
		description:
			"User nickname, for when the suggested user nickname was already being used",
		example: "discord_test",
	})
	public username: string;

	@ApiProperty({
		description: "Discord user email",
		example: "foo@bar.com",
	})
	public email: string;

	@ApiProperty({
		description: "Discord user ID",
		example: "705572674713157684",
	})
	public discordUserId: string;

	@ApiProperty({
		description: "Discord user username with discriminator",
		example: "razal#0042",
	})
	public discordUsername: string;

	@ApiProperty({
		description: "Discord user access token",
		example: "dcbadcbadcbadcbadcba",
	})
	public discordAccessToken: string;

	@ApiProperty({
		description: "Discord user refresh token",
		example: "abcdabcdabcdabcdabcd",
	})
	public discordRefreshToken: string;

	@ApiProperty({
		description:
			"Date in milliseconds to tell when the access token will be expired",
		example: moment().add(3, "days").valueOf(),
	})
	public discordExpirationDateMillis: number;
}
