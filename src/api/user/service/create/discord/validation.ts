import { CreateDiscordParams } from ".";

import { validate as baseValidate } from "../validation";

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

export const validate = async (params: CreateDiscordParams) => {
	await baseValidate(params).catch(err =>
		ErrorUtil.badRequest("INVALID_PARAMS", err.errors),
	);

	return schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
};
