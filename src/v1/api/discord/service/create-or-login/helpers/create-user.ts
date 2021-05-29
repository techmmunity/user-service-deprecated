import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail } from "@techmmunity/easy-check";
import * as moment from "moment";
import { v4 } from "uuid";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";
import { DiscordRepository } from "v1/api/discord/discord.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

interface CreateUserParams {
	DiscordRepository: DiscordRepository;
	ConfirmationTokenRepository: ConfirmationTokenRepository;
	email: string;
	username: string;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDateMillis: number;
}

export const createUser = async ({
	DiscordRepository,
	ConfirmationTokenRepository,
	email,
	username,
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordExpirationDateMillis,
}: CreateUserParams) => {
	const discordUser = await DiscordRepository.save({
		discordUserId,
		discordAccessToken,
		discordRefreshToken,
		discordExpirationDate: moment(discordExpirationDateMillis).toDate(),
		user: {
			username,
			id: v4(),
			pin: PinUtil.gen(),
			contacts: [
				{
					id: v4(),
					type: ContactTypeEnum.EMAIL,
					value: email,
					primary: true,
				},
			],
		},
	}).catch(
		DbHandler([
			{
				error: PgErrorEnum.UniqueViolation,
				table: "users",
				columns: ["username"],
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ username }) => ({
					errors: [`User with username "${username}" already exists`],
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
				makeError: ({ discord_user_id }) => ({
					errors: [
						`Discord user with ID "${discord_user_id}" is already registred`,
					],
				}),
			},
		]),
	);

	await ConfirmationTokenRepository.save({
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
