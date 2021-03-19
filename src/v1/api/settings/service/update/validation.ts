import { UpdateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";
import { ThemeValues } from "core/enums/theme";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	language: yup.string().notRequired().strict().oneOf(LanguageValues()),
	theme: yup.string().notRequired().strict().oneOf(ThemeValues()),
});

export const validate = async (params: UpdateParams) => {
	await schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));

	const { userId, ...otherParams } = params;

	if (JSON.stringify(otherParams) === "{}") {
		ErrorUtil.badRequest("INVALID_PARAMS", [
			"at least one field must be updated",
		]);
	}
};
