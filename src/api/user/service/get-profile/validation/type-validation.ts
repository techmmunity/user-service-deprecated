import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

export const typeValidation = (username: string) => {
	if (ValidationUtil.invalidString(username)) {
		ErrorUtil.badRequest("INVALID_USERNAME");
	}
};
