import { ChangePasswordParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

const schema = yup.object().shape({
	confirmationTokenId: yup.string().required().strict().uuid(),
	newPassword: yup.string().required().strict().password(),
});

export const validate = async (params: ChangePasswordParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
