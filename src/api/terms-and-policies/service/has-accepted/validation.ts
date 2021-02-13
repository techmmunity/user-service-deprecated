import { HasAcceptedParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

import { TERMS_AND_POLICIES_ALLOWED_VERSIONS } from "config/terms-and-policies";

const schema = yup.object().shape({
	userId: yup.string().uuid().required(),
	version: yup.number().strict().oneOf(TERMS_AND_POLICIES_ALLOWED_VERSIONS),
});

export const validate = async (params: HasAcceptedParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
