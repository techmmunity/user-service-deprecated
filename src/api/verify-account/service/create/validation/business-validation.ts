import { ObjectID } from "typeorm";

import { ErrorUtil } from "utils/error";

export const businessValidation = (userId: string) => {
	if (!ObjectID.isValid(userId)) {
		ErrorUtil.badRequest("INVALID_USER_ID");
	}
};
