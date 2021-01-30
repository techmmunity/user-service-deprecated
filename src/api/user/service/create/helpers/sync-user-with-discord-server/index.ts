import { DiscordService } from "api/discord/discord.service";

import { UserEntity } from "api/user/user.entity";

import { LanguageEnum } from "core/enums/language";
import { StrategyEnum } from "core/enums/strategy";

interface SyncUserWithDiscordServerParams {
	DiscordService: DiscordService;
	strategy: StrategyEnum;
	language: LanguageEnum;
	user: UserEntity;
	discordAccessToken: string;
}

export const syncUserWithDiscordServer = async ({
	DiscordService,
	strategy,
	language,
	discordAccessToken,
	user,
}: SyncUserWithDiscordServerParams) => {
	if (strategy !== StrategyEnum.DISCORD) return;

	const userId = user._id.toHexString();

	await DiscordService.registerMemberOnDiscord({
		userId,
		language,
		nick: user.username,
		accessToken: discordAccessToken,
		headline: user.headline,
		birthday: user.birthday,
	});
};
