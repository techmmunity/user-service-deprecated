import { VerifyParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { LIMITS } from "v1/config/limits";

const schema = yup.object().shape({
	contactId: yup.string().required().strict().uuid(),
	verificationCode: yup
		.string()
		.required()
		.strict()
		.length(LIMITS.confirmationToken.token.length),
});

export const validate = (params: VerifyParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
