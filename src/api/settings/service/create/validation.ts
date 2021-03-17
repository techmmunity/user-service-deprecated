import { CreateParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

import { LanguageValues } from "core/enums/language";

const schema = yup.object().shape({
	userId: yup.string().strict().required().uuid(),
	language: yup.string().notRequired().oneOf(LanguageValues()),
});

export const validate = async (params: CreateParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
