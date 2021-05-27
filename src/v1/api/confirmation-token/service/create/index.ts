import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

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
				table: "confirmation_tokens",
				columns: ["user_id"],
				error: PgErrorEnum.ForeignKeyViolation,
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ user_id }) => ({
					errors: [`User with id "${user_id}" not found`],
				}),
			},
			{
				table: "confirmation_tokens",
				columns: ["contact_id"],
				error: PgErrorEnum.ForeignKeyViolation,
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ contact_id }) => ({
					errors: [`Contact with id "${contact_id}" not found`],
				}),
			},
		]),
	);
};
