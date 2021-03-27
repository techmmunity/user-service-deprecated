import { RegenPinParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
});

export const validate = async (params: RegenPinParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));