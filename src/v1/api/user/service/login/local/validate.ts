import { LoginLocalParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	identifier: yup.string().required().strict().identifier(),
	password: yup.string().required().strict().password(),
});

export const validate = async (params: LoginLocalParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
