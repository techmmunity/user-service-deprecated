import { CreateDiscordParams } from ".";

import { validate as baseValidate } from "../validation";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	discordUserId: yup.string().required(),
	discordAccessToken: yup.string().required(),
	discordRefreshToken: yup.string().required(),
	discordTokenExpirationDate: yup.date().required().min(TimeUtil.newDate()),
});

export const validate = async (params: CreateDiscordParams) => {
	await baseValidate(params).catch(err =>
		ErrorUtil.badRequest("INVALID_PARAMS", err.errors),
	);

	return schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
};
