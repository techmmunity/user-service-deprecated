import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

export const typeValidation = (reason: string) => {
	if (ValidationUtil.invalidString(reason)) {
		ErrorUtil.badRequest("INVALID_REASON");
	}
};
