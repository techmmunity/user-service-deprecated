import { VerifyParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	contactId: yup.string().required().strict().uuid(),
	verificationCode: yup
		.string()
		.required()
		.strict()
		.length(Limits.confirmationToken.token.length),
});

export const validate = async (params: VerifyParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));