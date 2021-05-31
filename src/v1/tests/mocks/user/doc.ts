import { passwordUtil } from "v1/utils/password";
import { pinUtil } from "v1/utils/pin";

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
	password: password ? passwordUtil.encrypt(password) : undefined,
	avatar,
	youtube,
	pin: pinUtil.gen(),
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
