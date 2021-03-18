import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const password = (yup: Yup) => {
	yup.addMethod(yup.string, "password", function () {
		return this.test({
			name: "password",
			message:
				"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			test: password => (password ? check.isStrongPassword(password) : true),
		});
	});
};
