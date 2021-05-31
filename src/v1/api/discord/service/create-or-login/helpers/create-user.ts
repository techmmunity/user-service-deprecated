import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail } from "@techmmunity/easy-check";
import * as moment from "moment";
import { v4 } from "uuid";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";
import { DiscordRepository } from "v1/api/discord/discord.entity";

import { dbHandler } from "v1/utils/db-handler";
import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

interface CreateUserParams {
	discordRepository: DiscordRepository;
	confirmationTokenRepository: ConfirmationTokenRepository;
	email: string;
	username: string;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDateMillis: number;
}

export const createUser = async ({
	discordRepository,
	confirmationTokenRepository,
	email,
	username,
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordExpirationDateMillis,
}: CreateUserParams) => {
	const discordUser = await discordRepository
		.save({
			discordUserId,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDate: moment(discordExpirationDateMillis).toDate(),
			user: {
				username,
				id: v4(),
				pin: pinUtil.gen(),
				contacts: [
					{
						id: v4(),
						type: ContactTypeEnum.EMAIL,
						value: email,
						primary: true,
					},
				],
			},
		})
		.catch(
			dbHandler([
				{
					error: PgErrorEnum.UniqueViolation,
					table: "users",
					columns: ["username"],
					responseCode: HttpCodeEnum.Conflict,
					makeError: ({ username: existantUserName }) => ({
						errors: [`User with username "${existantUserName}" already exists`],
					}),
				},
				{
					error: PgErrorEnum.UniqueViolation,
					table: "contacts",
					columns: ["value"],
					responseCode: HttpCodeEnum.Conflict,
					validate: ({ value }) => isEmail(value),
					makeError: ({ value }) => ({
						errors: [`Email "${value}" is already linked to an user`],
					}),
				},
				{
					error: PgErrorEnum.UniqueViolation,
					table: "discords",
					columns: ["discord_user_id"],
					responseCode: HttpCodeEnum.Conflict,
					makeError: ({ discord_user_id: existantDiscordUserId }) => ({
						errors: [
							`Discord user with ID "${existantDiscordUserId}" is already registred`,
						],
					}),
				},
			]),
		);

	await confirmationTokenRepository.save({
		id: v4(),
		contactId: discordUser.user.contacts.shift().id,
		type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		token: "N/A",
		usedAt: moment().toDate(),
	});

	return {
		userId: discordUser.user.id,
		pin: discordUser.user.pin,
	};
};
