import { FindParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	identifier: yup.string().required().strict(),
});

export const validate = (params: FindParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
