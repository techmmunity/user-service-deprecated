import { check } from "@techmmunity/easy-check";

import { ErrorUtil } from "utils/error";

export const businessValidation = (username: string) => {
	if (!check.isSimpleUsername(username)) {
		ErrorUtil.badRequest("INVALID_USERNAME");
	}
};
