import { createUser } from "./helpers/create-user";
import { updateDiscordUser } from "./helpers/update-discord-user";

import { validate } from "./validate";

import { DiscordRepository } from "../../discord.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

interface Injectables {
	DiscordRepository: DiscordRepository;
	ConfirmationTokenRepository: ConfirmationTokenRepository;
}

export interface CreateOrLoginParams {
	username: string;
	email: string;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDateMillis: number;
}

export const createOrLogin = async (
	{ DiscordRepository, ConfirmationTokenRepository }: Injectables,
	params: CreateOrLoginParams,
) => {
	await validate(params);

	const {
		username,
		email,
		discordUserId,
		discordAccessToken,
		discordRefreshToken,
		discordExpirationDateMillis,
	} = params;

	const userExistant = await DiscordRepository.findOne({
		where: {
			discordUserId,
		},
		relations: ["user"],
	});

	if (userExistant) {
		return updateDiscordUser({
			userExistant,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDateMillis,
		});
	}

	return createUser({
		DiscordRepository,
		ConfirmationTokenRepository,
		email,
		username,
		discordUserId,
		discordAccessToken,
		discordRefreshToken,
		discordExpirationDateMillis,
	});
};
