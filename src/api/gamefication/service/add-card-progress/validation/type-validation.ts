import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

export const typeValidation = (cardCode: string) => {
	if (ValidationUtil.invalidString(cardCode)) {
		ErrorUtil.badRequest("INVALID_CARD_CODE");
	}
};
