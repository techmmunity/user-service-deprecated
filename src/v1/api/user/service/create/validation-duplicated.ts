import { FindConditions } from "typeorm";

import { UserEntity, UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";

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
		ErrorUtil.conflict("DUPLICATED_USER");
	}
};
