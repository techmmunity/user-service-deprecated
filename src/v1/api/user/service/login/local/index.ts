import { getUser } from "./helpers/get-user";
import { verifyPassword } from "./helpers/verify-password";

import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { errorUtil } from "v1/utils/error";

export interface LoginLocalParams {
	identifier: string;
	password: string;
}

export interface Injectables {
	userRepository: UserRepository;
}

export const loginLocal = async (
	{ userRepository }: Injectables,
	params: LoginLocalParams,
) => {
	await validate(params);

	const user = await getUser({
		userRepository,
		...params,
	});

	await verifyPassword({
		password: params.password,
		passwordHash: user.password as string,
	});

	/**
	 * The verified field of contact comes in the user entity,
	 * because of the raw query. USER DOESN'T HAVE A VERIFIED FIELD!
	 */
	if (!user.verified) {
		return errorUtil.forbidden(["Contact unverified"]);
	}

	return {
		userId: user.id,
		pin: user.pin,
	};
};
