import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";

import { ErrorUtil } from "v1/utils/error";

export const validateUsed = (confirmationToken: ConfirmationTokenEntity) => {
	if (confirmationToken.usedAt) {
		return ErrorUtil.conflict(["Confirmation token already used"]);
	}
};
