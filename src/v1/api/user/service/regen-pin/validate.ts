import { RegenPinParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
});

export const validate = (params: RegenPinParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
