import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ConfirmationTokenTypeValues } from "core/enums/confirmation-token-type";

const schema = yup.object().shape({
	userId: yup.string().notRequired().strict().uuid(),
	contactId: yup.string().notRequired().strict().uuid(),
	type: yup.string().required().strict().oneOf(ConfirmationTokenTypeValues()),
});

export const validate = async (params: CreateParams) => {
	const result = await schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest(err.errors));

	const { userId, contactId } = params;

	if (!userId && !contactId) {
		return ErrorUtil.badRequest(["userId or contactId must be provided"]);
	}
	if (userId && contactId) {
		return ErrorUtil.badRequest([
			"Only userId OR contactId should be provided",
		]);
	}

	return result;
};
