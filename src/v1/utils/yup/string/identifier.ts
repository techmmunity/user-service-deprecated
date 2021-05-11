import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const identifier = (yup: Yup) => {
	yup.addMethod(yup.string, "identifier", function () {
		return this.test({
			name: "identifier",
			message: "${path} must be a valid email or username",
			test: identifier => {
				const isUsername = check.isSimpleUsername(identifier as string);
				const isEmail = check.isEmail(identifier as string);

				return isUsername || isEmail;
			},
		});
	});
};
