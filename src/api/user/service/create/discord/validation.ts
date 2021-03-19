import { CreateDiscordParams } from ".";

import { baseValidate } from "../validation-base";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	discordUserId: yup.string().required().strict(),
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
