import { CreateParams } from ".";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";
import { yup } from "utils/yup";

import { IntegrationsValues } from "core/enums/integrations";

const schema = yup.object().shape({
	userId: yup.string().uuid().required(),
	type: yup.string().oneOf([...IntegrationsValues(), undefined]),
	accessToken: yup.string().notRequired(),
	refreshToken: yup.string().notRequired(),
	expirationDate: yup.date().min(TimeUtil.newDate()).notRequired(),
});

export const validate = async (params: CreateParams) =>
	schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest("INVALID_PARAMS", err.errors));
