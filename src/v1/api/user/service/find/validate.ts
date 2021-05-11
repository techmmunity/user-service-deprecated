import { FindParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	identifier: yup.string().required().strict(),
});

export const validate = async (params: FindParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
