import { CreateOrLoginParams } from ".";
import {
	email,
	username,
} from "../../../user/service/create/fields-validation";

import { errorUtil } from "v1/utils/error";
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

export const validate = (params: CreateOrLoginParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
