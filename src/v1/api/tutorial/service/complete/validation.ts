import { CompleteParams } from ".";

import { ALLOWED_FIELDS_TO_UPDATE } from "v1/api/tutorial/tutorial.entity";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	field: yup.string().required().strict().oneOf(ALLOWED_FIELDS_TO_UPDATE),
});

export const validate = async (params: CompleteParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
