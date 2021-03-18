import { CreateVerificationCodeParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
});

export const validate = async (params: CreateVerificationCodeParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
