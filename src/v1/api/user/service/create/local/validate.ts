import { CreateLocalParams } from ".";

import { email, username } from "../fields-validation";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	email,
	username,
	password: yup.string().required().strict().password(),
});

export const validate = async (params: CreateLocalParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
