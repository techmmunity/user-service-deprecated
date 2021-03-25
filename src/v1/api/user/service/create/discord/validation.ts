import { CreateDiscordParams } from ".";

import { baseValidate } from "../validation-base";

import { ErrorUtil } from "v1/utils/error";
import { TimeUtil } from "v1/utils/time";
import { yup } from "v1/utils/yup";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	discordUserId: yup.string().required().max(Limits.ids.random.max).strict(),
	discordAccessToken: yup.string().required().strict(),
	discordRefreshToken: yup.string().required().strict(),
	discordTokenExpirationDate: yup
		.date()
		.required()
		.strict()
		.min(TimeUtil.newDate()),
});

export const validate = async (params: CreateDiscordParams) =>
	baseValidate(params)
		.then(() => schema.validate(params))
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
