/* eslint-disable @typescript-eslint/no-invalid-this */

import { isSimpleUsername, isEmail } from "@techmmunity/easy-check";

import { Yup } from "..";

export const identifier = (yup: Yup) => {
	yup.addMethod(yup.string, "identifier", function () {
		return this.test({
			name: "identifier",
			message: "${path} must be a valid email or username",
			test: value => {
				if (!value) return true;

				return isSimpleUsername(value as string) || isEmail(value as string);
			},
		});
	});
};
