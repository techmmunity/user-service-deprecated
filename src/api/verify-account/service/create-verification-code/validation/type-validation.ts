import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

export const typeValidation = (userId: string) => {
	if (ValidationUtil.invalidString(userId)) {
		ErrorUtil.badRequest("INVALID_USER_ID");
	}
};
