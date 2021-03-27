import { CreateParams } from ".";

import { email, username, headline, birthday } from "../fields-validation";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	email,
	username,
	headline,
	birthday,
	password: yup.string().required().strict().password(),
});

export const validate = async (params: CreateParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));