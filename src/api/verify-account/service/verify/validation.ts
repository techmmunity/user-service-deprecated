import { VerifyAccountParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	confirmationCode: yup.string().required().strict().uuid(),
});

export const validate = async (params: VerifyAccountParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
