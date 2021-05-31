import { v4 } from "uuid";

import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

export interface CreateConfirmationTokenDoc {
	id?: string;
	userId?: string;
	contactId?: string;
	type: ConfirmationTokenTypeEnum;
	token?: string;
	usedAt?: Date;
	createdAt?: Date;
}

export const doc = ({
	id,
	userId,
	contactId,
	type,
	token,
	usedAt,
	createdAt,
}: CreateConfirmationTokenDoc) => ({
	userId,
	contactId,
	type,
	usedAt,
	id: id || v4(),
	token: token || pinUtil.gen(6),
	createdAt: createdAt || new Date(),
});
