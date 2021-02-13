import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const password = (yup: Yup) => {
	yup.addMethod(yup.string, "password", function (password: string) {
		return this.test({
			name: "password",
			message: "INVALID_PASSWORD",
			test: () => (password ? check.isStrongPassword(password) : true),
		});
	});
};
