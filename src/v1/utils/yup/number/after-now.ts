/* eslint-disable @typescript-eslint/no-invalid-this */

import * as moment from "moment";

import { Yup } from "..";

export const afterNow = (yup: Yup) => {
	yup.addMethod(yup.number, "afterNow", function () {
		return this.test({
			name: "afterNow",
			message: "${path} must be a date in the future",
			test: date => moment().isBefore(date),
		});
	});
};
