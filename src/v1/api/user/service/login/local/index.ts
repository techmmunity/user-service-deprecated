import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";
import { PasswordUtil } from "v1/utils/password";

export interface LoginLocalParams {
	identifier: string;
	password: string;
}

export interface Injectables {
	UserRepository: UserRepository;
}

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
		select: ["id", "password", "pin"],
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

	return {
		id: user.id,
		pin: user.pin,
	};
};
