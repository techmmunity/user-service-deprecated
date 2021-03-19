import { CreateLocalParams } from ".";

import { baseValidate } from "../validation-base";

import { ErrorUtil } from "utils/error";

export const validate = (params: CreateLocalParams) =>
	baseValidate(params).catch(err =>
		ErrorUtil.badRequest("INVALID_PARAMS", err.errors),
	);
