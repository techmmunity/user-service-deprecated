import { isEmail, isBrazillianPhone } from "@techmmunity/easy-check";

import { Yup } from "..";

export const emailOrPhone = (yup: Yup) => {
	yup.addMethod(yup.string, "emailOrPhone", function () {
		return this.test({
			name: "emailOrPhone",
			message: "${path} must be a valid email or phone number",
			test: emailOrPhone =>
				isBrazillianPhone(emailOrPhone as string) ||
				isEmail(emailOrPhone as string),
		});
	});
};
