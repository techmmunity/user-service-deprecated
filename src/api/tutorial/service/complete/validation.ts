import { CompleteParams } from ".";

import { ALLOWED_FIELDS_TO_UPDATE } from "api/tutorial/tutorial.entity";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	userId: yup.string().uuid().required(),
	field: yup.string().oneOf(ALLOWED_FIELDS_TO_UPDATE).required(),
});

export const validate = async (params: CompleteParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
