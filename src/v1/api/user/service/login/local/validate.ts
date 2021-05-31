import { LoginLocalParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	identifier: yup.string().required().strict().identifier(),
	password: yup.string().required().strict().password(),
});

export const validate = (params: LoginLocalParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
