import { CreateVerifyAccountParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
});

export const validate = async (params: CreateVerifyAccountParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
