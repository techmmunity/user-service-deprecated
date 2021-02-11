import { check } from "@techmmunity/easy-check";

import { Yup } from ".";

export const username = (yup: Yup) => {
	yup.addMethod(yup.string, "username", function (username: string) {
		return this.test({
			name: "username",
			message: "INVALID_USERNAME",
			test: () => (username ? check.isSimpleUsername(username) : true),
		});
	});
};
