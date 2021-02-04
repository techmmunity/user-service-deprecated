import { CreateParams } from "api/tutorial/service/create";

import { typeValidation } from "api/tutorial/service/create/validation/type-validation";

describe("TutorialService > create > validation > type-validation", () => {
	it("should do nothing with valid params", () => {
		const result = typeValidation({
			userId: "foo",
		} as CreateParams);

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", () => {
		let result;

		try {
			result = typeValidation(("" as unknown) as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [],
		});
	});

	it("should throw an error with invalid user id", () => {
		let result;

		try {
			result = typeValidation({
				userId: 123 as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_USER_ID",
			statusCode: 400,
			errors: [],
		});
	});
});
