import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { TimeUtil } from "v1/utils/time";
import { yup } from "v1/utils/yup";

import { IntegrationsValues } from "core/enums/integrations";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	type: yup.string().notRequired().strict().oneOf(IntegrationsValues()),
	accessToken: yup.string().notRequired().strict(),
	refreshToken: yup.string().notRequired().strict(),
	expirationDate: yup.date().notRequired().strict().min(TimeUtil.newDate()),
});

export const validate = async (params: CreateParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
