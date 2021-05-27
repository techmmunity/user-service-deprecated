import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail } from "@techmmunity/easy-check";
import * as moment from "moment";
import { v4 } from "uuid";

import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ContactTypeEnum } from "core/enums/contact-type";

interface Injectables {
	UserRepository: UserRepository;
}

export interface CreateDiscordParams {
	username: string;
	email: string;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDateMillis: number;
}

export const createDiscord = async (
	{ UserRepository }: Injectables,
	params: CreateDiscordParams,
) => {
	await validate(params);

	const {
		username,
		email,
		discordUserId,
		discordAccessToken,
		discordRefreshToken,
		discordExpirationDateMillis,
	} = params;

	const userId = v4();
	const contactId = v4();

	const user = await UserRepository.save({
		username,
		id: userId,
		pin: PinUtil.gen(),
		contacts: [
			{
				id: contactId,
				type: ContactTypeEnum.EMAIL,
				value: email,
				primary: true,
				userId,
			},
		],
		discord: {
			discordUserId,
			discordAccessToken,
			discordRefreshToken,
			discordExpirationDate: moment(discordExpirationDateMillis).toDate(),
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

	return {
		userId: user.id,
		pin: user.pin,
	};
};
