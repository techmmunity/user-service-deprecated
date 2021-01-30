import { getRoles } from "./get-roles";

import { DiscordService } from "api/discord/discord.service";

import { UserEntity } from "api/user/entities/user.entity";

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
	const roles = getRoles({
		language,
		headline: user.headline,
	});

	let response = await DiscordService.addMemberToGuild({
		userId,
		defaultNick: user.username,
		accessToken: discordAccessToken,
		defaultRoles: roles,
	});

	if (response.status === 204) {
		response = await DiscordService.modifyMember({
			userId,
			defaultNick: user.username,
			defaultRoles: roles,
		});
	}

	if (![201, 204].includes(response.status)) {
		// Erro ao sincronizar usuário
		console.error(await response.json());
	}
};
