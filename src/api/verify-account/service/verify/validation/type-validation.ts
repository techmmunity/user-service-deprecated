import { ErrorUtil } from "utils/error";

import { ValidationUtil } from "utils/validation";

import { VerifyAccountParams } from "..";

export const typeValidation = (params: VerifyAccountParams) => {
	if (ValidationUtil.invalidObject(params)) {
		ErrorUtil.badRequest("INVALID_PARAMS");
	}

	if (ValidationUtil.invalidString(params.confirmationCode)) {
		ErrorUtil.badRequest("INVALID_CONFIRMATION_CODE");
	}
};
