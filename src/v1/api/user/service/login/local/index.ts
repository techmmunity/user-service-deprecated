import { validate } from "./validate";

import { UserEntity, UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";
import { PasswordUtil } from "v1/utils/password";

export interface LoginLocalParams {
	identifier: string;
	password: string;
}

export interface Injectables {
	UserRepository: UserRepository;
}

const formatReturn = (user: UserEntity) => {
	const toReturn = {
		id: user.id,
		username: user.username,
		pin: user.pin,
	};

	if (user.avatar) {
		return {
			...toReturn,
			avatar: user.avatar,
		};
	}

	return toReturn;
};

export const loginLocal = async (
	{ UserRepository }: Injectables,
	params: LoginLocalParams,
) => {
	await validate(params);

	const { identifier, password } = params;

	const user = await UserRepository.findOne({
		where: [
			{
				username: identifier,
			},
			{
				contacts: [
					{
						value: identifier,
					},
				],
			},
		],
	});

	if (!user) {
		return ErrorUtil.notFound(["User not found"]);
	}

	const isValidPassword = await PasswordUtil.verify(
		password,
		user.password as string,
	);

	if (!isValidPassword) {
		return ErrorUtil.badRequest(["Invalid username, email or password"]);
	}

	if (!user.verifiedAt) {
		return ErrorUtil.forbidden(["Account unverified"]);
	}

	return formatReturn(user);
};
