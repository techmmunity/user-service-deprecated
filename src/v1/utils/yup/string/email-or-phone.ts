import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const emailOrPhone = (yup: Yup) => {
	yup.addMethod(yup.string, "emailOrPhone", function (fieldName: string) {
		return this.test({
			name: "emailOrPhone",
			message: `${fieldName} must be a valid email or phone number`,
			test: emailOrPhone => {
				const isPhone = check.isBrazillianPhone(emailOrPhone as string);
				const isEmail = check.isEmail(emailOrPhone as string);

				return isPhone || isEmail;
			},
		});
	});
};
