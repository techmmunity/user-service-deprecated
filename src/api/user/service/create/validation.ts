import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

import { HeadlineValues } from "core/enums/headline";
import { LanguageValues } from "core/enums/language";

import { BaseCreateUser } from "./types";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	username: yup.string().username().required(),
	birthday: yup.date().strict().required(),
	password: yup.string().password().required(),
	fullName: yup.string().fullName().required(),
	avatar: yup.string().url().notRequired(),
	suggestedLanguage: yup.string().oneOf(LanguageValues()).notRequired(),
	headline: yup.string().oneOf(HeadlineValues()).required(),
});

export const validate = async (params: BaseCreateUser) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
