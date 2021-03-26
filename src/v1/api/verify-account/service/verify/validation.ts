import { VerifyAccountParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	verificationCode: yup
		.string()
		.required()
		.strict()
		.length(Limits.verifyAccount.code.length),
});

export const validate = async (params: VerifyAccountParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
