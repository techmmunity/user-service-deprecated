import { ErrorUtil } from "utils/error";

import { ValidationUtil } from "utils/validation";

import { CreateParams } from "..";

export const typeValidation = (params: CreateParams) => {
	if (ValidationUtil.invalidObject(params)) {
		ErrorUtil.badRequest("INVALID_PARAMS");
	}

	if (ValidationUtil.invalidString(params.userId)) {
		ErrorUtil.badRequest("INVALID_USER_ID");
	}

	if (ValidationUtil.invalidString(params.language, true)) {
		ErrorUtil.badRequest("INVALID_LANGUAGE");
	}
};
