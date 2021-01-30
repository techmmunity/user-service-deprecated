import { UserRepository } from "api/user/user.entity";

import { ErrorUtil } from "utils/error";

interface GetUserParams {
	UserRepository: UserRepository;
	username: string;
}

export const getUser = async ({ UserRepository, username }: GetUserParams) => {
	const user = await UserRepository.findOne(null, {
		where: {
			username,
		},
	});

	if (!user) {
		ErrorUtil.notFound("USER_NOT_FOUND");
	}

	return user;
};
