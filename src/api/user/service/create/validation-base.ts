import { TimeUtil } from "utils/time";
import { yup } from "utils/yup";

import { HeadlineValues } from "core/enums/headline";
import { LanguageValues } from "core/enums/language";

import { BaseCreateUser } from "./types";

const schema = yup.object().shape({
	email: yup.string().required().strict().email(),
	username: yup.string().required().strict().username(),
	birthday: yup.date().required().strict().max(TimeUtil.newDate()),
	password: yup.string().required().strict().password(),
	fullName: yup.string().required().strict().fullName(),
	avatar: yup.string().notRequired().strict().url(),
	suggestedLanguage: yup
		.string()
		.notRequired()
		.strict()
		.oneOf(LanguageValues()),
	headline: yup.string().required().strict().oneOf(HeadlineValues()),
});

export const baseValidate = async (params: BaseCreateUser) =>
	schema.validate(params);
