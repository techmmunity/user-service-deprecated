import { HasAcceptedParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { TERMS_AND_POLICIES_ALLOWED_VERSIONS } from "v1/config/terms-and-policies";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	version: yup
		.number()
		.required()
		.strict()
		.oneOf(TERMS_AND_POLICIES_ALLOWED_VERSIONS),
});

export const validate = async (params: HasAcceptedParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
