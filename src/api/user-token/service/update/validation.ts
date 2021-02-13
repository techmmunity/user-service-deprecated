import { UpdateTokenParams } from ".";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";
import { yup } from "utils/yup";

import { IntegrationsValues } from "core/enums/integrations";

const schema = yup.object().shape({
	userId: yup.string().strict().uuid().required(),
	type: yup.string().strict().oneOf(IntegrationsValues()),
	accessToken: yup.string().strict().required(),
	refreshToken: yup.string().strict().required(),
	expirationDate: yup.date().strict().min(TimeUtil.newDate()).required(),
});

export const validate = async (params: UpdateTokenParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
