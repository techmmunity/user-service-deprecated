import * as bcrypt from "bcrypt";
import { v4 } from "uuid";

import { validate } from "./validate";

import { UserType, UserRepository } from "v1/api/user/user.entity";

import { PinUtil } from "v1/utils/pin";

import { ContactTypeEnum } from "core/enums/contact-type";
import { HeadlineEnum } from "core/enums/headline";

export interface CreateParams {
	email: string;
	username: string;
	password: string;
	birthday: Date;
	headline: HeadlineEnum;
}

export interface Injectables {
	UserRepository: UserRepository;
}

const getPasswordEncrypted = (password: string) =>
	bcrypt.hashSync(password, 10);

export const formatData = ({
	username,
	birthday,
	headline,
	password,
}: CreateParams): UserType => ({
	id: v4(),
	password: getPasswordEncrypted(password),
	pin: PinUtil.gen(),
	birthday,
	username,
	headline,
});

export const create = async (
	{ UserRepository }: Injectables,
	params: CreateParams,
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
