import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const emailOrUsername = (yup: Yup) => {
	yup.addMethod(yup.string, "emailOrUsername", function (fieldName: string) {
		return this.test({
			name: "emailOrUsername",
			message: `${fieldName} must be a valid email or username`,
			test: emailOrUsername => {
				const isUsername = check.isSimpleUsername(emailOrUsername as string);
				const isEmail = check.isEmail(emailOrUsername as string);

				return isUsername || isEmail;
			},
		});
	});
};
