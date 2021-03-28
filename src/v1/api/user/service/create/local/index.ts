import { v4 } from "uuid";

import { validate } from "./validate";

import { UserType, UserRepository } from "v1/api/user/user.entity";

import { PasswordUtil } from "v1/utils/password";
import { PinUtil } from "v1/utils/pin";

import { ContactTypeEnum } from "core/enums/contact-type";

export interface CreateLocalParams {
	email: string;
	username: string;
	password: string;
}

export interface Injectables {
	UserRepository: UserRepository;
}

export const formatData = ({
	username,
	password,
}: CreateLocalParams): UserType => ({
	id: v4(),
	password: PasswordUtil.encrypt(password),
	pin: PinUtil.gen(),
	username,
});

export const createLocal = async (
	{ UserRepository }: Injectables,
	params: CreateLocalParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const user = await UserRepository.save({
		...userData,
		contacts: [
			{
				id: v4(),
				type: ContactTypeEnum.EMAIL,
				value: params.email,
				primary: true,
			},
		],
	});

	return {
		userId: user.id,
		verificationCode: user.pin,
	};
};
