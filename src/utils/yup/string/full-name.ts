import { Yup } from "..";

export const fullName = (yup: Yup) => {
	yup.addMethod(yup.string, "fullName", function () {
		return this.test({
			name: "fullName",
			message: "fullName must have at least two words",
			test: fullName => {
				if (!fullName) return true;

				const splited = fullName.split(" ");

				if (splited.length < 2) return false;

				if (splited[0].length < 3 || splited[1].length < 3) return false;

				return true;
			},
		});
	});
};
