import { PasswordUtil } from "v1/utils/password";
import { PinUtil } from "v1/utils/pin";

import { HeadlineEnum } from "core/enums/headline";

export interface CreateUserDoc {
	id: string;
	username: string;
	headline?: HeadlineEnum;
	birthday?: Date;
	verifiedAt?: Date;
	fullName?: string;
	password?: string;
	avatar?: string;
	youtube?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	id,
	username,
	headline,
	birthday,
	verifiedAt,
	fullName,
	password,
	avatar,
	youtube,
	createdAt,
	updatedAt,
}: CreateUserDoc) => ({
	id,
	username,
	headline,
	birthday,
	verifiedAt,
	fullName,
	password: password ? PasswordUtil.encrypt(password) : undefined,
	avatar,
	youtube,
	pin: PinUtil.gen(),
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
