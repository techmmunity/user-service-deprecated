import { createRelations } from "./helpers/create-relations";
import { formatData } from "./helpers/format-data";
import { syncUserWithDiscordServer } from "./helpers/sync-user-with-discord-server";

import { businessValidation } from "./validation/business-validation";
import { duplicatedValidation } from "./validation/duplicated-validation";
import { typeValidation } from "./validation/type-validation";

import { BaseParams } from "../types";
import { CreateUser, CreateUserByDiscord } from "./types";

export const create = async ({
	DiscordService,
	UserRepository,
	...params
}: BaseParams & CreateUser) => {
	typeValidation(params);

	businessValidation(params);

	await duplicatedValidation(UserRepository, params);

	const userData = await formatData(params);

	const user = await UserRepository.save(userData);

	const { tutorial, settings, gamefication } = await createRelations({
		userId: user._id.toHexString(),
		...params,
	});

	await syncUserWithDiscordServer({
		DiscordService,
		user,
		language: settings.language,
		strategy: params.strategy,
		discordAccessToken: (params as CreateUserByDiscord).discordAccessToken,
	});

	return {
		user,
		tutorial,
		settings,
		gamefication,
	};
};
