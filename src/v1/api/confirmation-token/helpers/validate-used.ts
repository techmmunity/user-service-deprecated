import type { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";

import { errorUtil } from "v1/utils/error";

export const validateUsed = (confirmationToken: ConfirmationTokenEntity) => {
	if (confirmationToken.usedAt) {
		return errorUtil.conflict(["Confirmation token already used"]);
	}
};
