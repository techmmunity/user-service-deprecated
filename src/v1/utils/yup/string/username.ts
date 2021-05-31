/* eslint-disable @typescript-eslint/no-invalid-this */

import { isSimpleUsername } from "@techmmunity/easy-check";

import { Yup } from "..";

export const username = (yup: Yup) => {
	yup.addMethod(yup.string, "username", function () {
		return this.test({
			name: "username",
			message: "${path} must be a valid username",
			test: value => (value ? isSimpleUsername(value) : true),
		});
	});
};
