import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	language: yup.string().notRequired().strict().oneOf(LanguageValues()),
});

export const validate = async (params: CreateParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
