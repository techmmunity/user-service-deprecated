import { UpdateParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

import { LanguageValues } from "core/enums/language";
import { ThemeValues } from "core/enums/theme";

const schema = yup.object().shape({
	userId: yup.string().uuid().required(),
	language: yup.string().oneOf(LanguageValues()).notRequired(),
	theme: yup.string().oneOf(ThemeValues()).notRequired(),
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
