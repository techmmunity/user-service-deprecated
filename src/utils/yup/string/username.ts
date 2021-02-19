import { check } from "@techmmunity/easy-check";

import { Yup } from "..";

export const username = (yup: Yup) => {
	yup.addMethod(yup.string, "username", function () {
		return this.test({
			name: "username",
			message: "username must be a valid username",
			test: username => (username ? check.isSimpleUsername(username) : true),
		});
	});
};
