import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

interface Injectables {
	UserRepository: UserRepository;
}

export interface FindByIdParams {
	userId: string;
}

export const findById = async ({
	UserRepository,
	...params
}: FindByIdParams & Injectables) => {
	await validate(params);

	const { userId } = params;

	return UserRepository.findOne(userId);
};
