import { typeValidation } from "./validation/type-validation";

import { UserRepository } from "api/user/user.entity";

export interface Injectables {
	UserRepository: UserRepository;
}

export interface VerifyParams {
	userId: string;
}

export const verify = async ({
	UserRepository,
	userId,
}: VerifyParams & Injectables) => {
	typeValidation({ userId });

	await UserRepository.update(userId, {
		verified: true,
	});
};
