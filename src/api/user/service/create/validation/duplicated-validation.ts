import { FindOneOptions } from "typeorm";

import { UserEntity, UserRepository } from "api/user/user.entity";

import { ErrorUtil } from "utils/error";

import { StrategyEnum } from "core/enums/strategy";

import { CreateUser, CreateUserByDiscord } from "api/user/service/create/types";

const duplicatedValidationBase = (
	user: UserEntity,
	{ email, username }: CreateUser,
) => {
	if (user.email === email) {
		ErrorUtil.badRequest("DUPLICATED_EMAIL");
	}
	if (user.username === username) {
		ErrorUtil.badRequest("DUPLICATED_USERNAME");
	}
};

const duplicatedValidationDiscord = (
	user: UserEntity,
	{ discordUserId }: CreateUserByDiscord,
) => {
	if (user.discordUserId === discordUserId) {
		ErrorUtil.badRequest("DUPLICATED_DISCORD_USER_ID");
	}
};

export const duplicatedValidation = async (
	UserRepository: UserRepository,
	createUser: CreateUser,
) => {
	const baseQuery: FindOneOptions<UserEntity>["where"] = [
		{ email: createUser.email },
		{ username: createUser.username },
	];

	switch (createUser.strategy) {
		case StrategyEnum.DISCORD:
			baseQuery.push({ discordUserId: createUser.discordUserId });
			break;
	}

	const user = await UserRepository.findOne({
		where: {
			$or: baseQuery,
		},
	});

	console.log(user);

	if (user) {
		duplicatedValidationBase(user, createUser);

		switch (createUser.strategy) {
			case StrategyEnum.DISCORD:
				duplicatedValidationDiscord(user, createUser);
				break;
		}
	}
};
