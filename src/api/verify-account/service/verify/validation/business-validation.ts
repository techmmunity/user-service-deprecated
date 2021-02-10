import { check } from "@techmmunity/easy-check";

import { ErrorUtil } from "utils/error";

import { VerifyAccountParams } from "..";

export const businessValidation = ({
	confirmationCode,
}: VerifyAccountParams) => {
	if (!check.isUUIDv4(confirmationCode)) {
		ErrorUtil.badRequest("INVALID_CONFIRMATION_CODE");
	}
};
