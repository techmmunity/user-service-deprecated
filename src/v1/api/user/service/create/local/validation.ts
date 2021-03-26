import { CreateLocalParams } from ".";

import { baseValidate } from "../validation-base";

import { ErrorUtil } from "v1/utils/error";

export const validate = (params: CreateLocalParams) =>
	baseValidate(params).catch(err => ErrorUtil.badRequest(err.errors));
