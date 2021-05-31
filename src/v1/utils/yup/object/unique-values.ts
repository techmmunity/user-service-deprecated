/* eslint-disable @typescript-eslint/no-invalid-this */

import { Yup } from "..";

export const uniqueValues = (yup: Yup) => {
	yup.addMethod(yup.object, "uniqueValues", function (fields: Array<string>) {
		const fieldsFormatted = fields.join(", ");

		return this.test({
			name: "uniqueValues",
			message: `These fields must have unique values: ${fieldsFormatted}`,
			test: object => {
				const values = fields.map(field => object[field]);

				return values.length === new Set(values).size;
			},
		});
	});
};
