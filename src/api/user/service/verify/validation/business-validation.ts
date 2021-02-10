import { check } from "@techmmunity/easy-check";

import { ErrorUtil } from "utils/error";

import { VerifyParams } from "..";

export const businessValidation = ({ userId }: VerifyParams) => {
	if (!check.isUUIDv4(userId)) {
		ErrorUtil.badRequest("INVALID_USER_ID");
	}
};
