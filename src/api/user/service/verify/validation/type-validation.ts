import { ErrorUtil } from "utils/error";

import { ValidationUtil } from "utils/validation";

import { VerifyParams } from "..";

export const typeValidation = (params: VerifyParams) => {
	if (ValidationUtil.invalidObject(params)) {
		ErrorUtil.badRequest("INVALID_PARAMS");
	}

	if (ValidationUtil.invalidString(params.userId)) {
		ErrorUtil.badRequest("INVALID_USER_ID");
	}
};
