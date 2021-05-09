import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { DbErrorEnum } from "core/enums/db-error";

interface Injectables {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
}

export interface CreateParams {
	userId?: string;
	contactId?: string;
	type: ConfirmationTokenTypeEnum;
}

export const create = async (
	{ ConfirmationTokenRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { userId, contactId, type } = params;

	return ConfirmationTokenRepository.save({
		id: v4(),
		token: PinUtil.gen(6),
		userId,
		contactId,
		type,
	}).catch(
		DbHandler([
			{
				error: DbErrorEnum.ForeignKeyViolation,
				table: "confirmation_tokens",
				handleWith: "conflict",
				message: () =>
					`User or contact with id "${userId || contactId}" not found`,
			},
		]),
	);
};
