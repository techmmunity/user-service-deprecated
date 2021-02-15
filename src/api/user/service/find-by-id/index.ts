import { validate } from "./validate";

import { UserRepository } from "api/user/user.entity";

interface Injectables {
	UserRepository: UserRepository;
}

export interface FindByIdParams {
	id: string;
}

export const findById = async ({
	UserRepository,
	...params
}: FindByIdParams & Injectables) => {
	await validate(params);

	const { id } = params;

	return UserRepository.findOne(id);
};
