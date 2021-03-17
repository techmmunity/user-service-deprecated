import { FindByIdParams } from ".";

import { ErrorUtil } from "utils/error";
import { yup } from "utils/yup";

const schema = yup.object().shape({
	id: yup.string().uuid().required(),
});

export const validate = async (params: FindByIdParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));