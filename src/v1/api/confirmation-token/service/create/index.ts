import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { dbHandler } from "v1/utils/db-handler";
import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

interface Injectables {
	confirmationTokenRepository: ConfirmationTokenRepository;
}

export interface CreateParams {
	userId?: string;
	contactId?: string;
	type: ConfirmationTokenTypeEnum;
}

export const create = async (
	{ confirmationTokenRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { userId, contactId, type } = params;

	return confirmationTokenRepository
		.save({
			id: v4(),
			token: pinUtil.gen(6),
			userId,
			contactId,
			type,
		})
		.catch(
			dbHandler([
				{
					table: "confirmation_tokens",
					columns: ["user_id"],
					error: PgErrorEnum.ForeignKeyViolation,
					responseCode: HttpCodeEnum.Conflict,
					makeError: ({ user_id: existentUserId }) => ({
						errors: [`User with id "${existentUserId}" not found`],
					}),
				},
				{
					table: "confirmation_tokens",
					columns: ["contact_id"],
					error: PgErrorEnum.ForeignKeyViolation,
					responseCode: HttpCodeEnum.Conflict,
					makeError: ({ contact_id: existantContactId }) => ({
						errors: [`Contact with id "${existantContactId}" not found`],
					}),
				},
			]),
		);
};
