import { FindConditions } from "typeorm";

import { UserEntity, UserRepository } from "api/user/user.entity";

import { ErrorUtil } from "utils/error";

interface DuplicatedValidationParams {
	UserRepository: UserRepository;
	email: string;
	username: string;
	extraConditions?: FindConditions<UserEntity>;
}

export const duplicatedValidation = async ({
	UserRepository,
	email,
	username,
	extraConditions,
}: DuplicatedValidationParams) => {
	const user = await UserRepository.findOne({
		where: {
			$or: [{ email }, { username }, extraConditions].filter(Boolean),
		},
	});

	if (user) {
		ErrorUtil.badRequest("DUPLICATED_USER");
	}
};
