import { Yup } from "..";

export const uniqueValues = (yup: Yup) => {
	yup.addMethod(yup.object, "uniqueValues", function (fields: Array<string>) {
		const fieldsFormatted = fields.join(", ");

		return this.test({
			name: "uniqueValues",
			message: `These fields must have unique values: ${fieldsFormatted}`,
			test: object => {
				const values = fields.map(field => object[field]);

				const uniqueValues = new Set(values);

				return values.length === uniqueValues.size;
			},
		});
	});
};
