import { CreateLocalParams } from ".";

import { email, username } from "../fields-validation";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	email,
	username,
	password: yup.string().required().strict().password(),
});

export const validate = (params: CreateLocalParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
