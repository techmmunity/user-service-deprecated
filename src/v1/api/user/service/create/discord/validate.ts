import { CreateDiscordParams } from ".";
import { email, username } from "../fields-validation";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

/**
 * Random limits are being applied just for precaution
 */
const schema = yup
	.object()
	.shape({
		email,
		username,
		discordUserId: yup.string().required().strict().isDiscordSnowflake(),
		discordAccessToken: yup.string().required().strict().min(20).max(100),
		discordRefreshToken: yup.string().required().strict().min(20).max(100),
		discordExpirationDateMillis: yup.number().required().strict().afterNow(),
	})
	.uniqueValues(["discordAccessToken", "discordRefreshToken"]);

export const validate = async (params: CreateDiscordParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
