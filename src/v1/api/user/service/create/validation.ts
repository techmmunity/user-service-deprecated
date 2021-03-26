import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { TimeUtil } from "v1/utils/time";
import { yup } from "v1/utils/yup";

import { HeadlineValues } from "core/enums/headline";
import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	email: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.email.min)
		.max(Limits.user.email.max)
		.email(),
	username: yup
		.string()
		.required()
		.strict()
		.min(Limits.user.username.min)
		.max(Limits.user.username.max)
		.username(),
	birthday: yup.date().required().strict().max(TimeUtil.newDate()),
	password: yup.string().required().strict().password(),
	fullName: yup
		.string()
		.required()
		.strict()
		.max(Limits.user.name.max + Limits.user.surnames.max + 1)
		.fullName(),
	avatar: yup.string().notRequired().strict().max(Limits.user.avatar.max).url(),
	youtube: yup.string().required().strict().max(Limits.user.youtube.max),
	suggestedLanguage: yup
		.string()
		.notRequired()
		.strict()
		.oneOf(LanguageValues()),
	headline: yup.string().required().strict().oneOf(HeadlineValues()),
});

export const validate = async (params: CreateParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
