import { CreateParams } from "api/tutorial/service/create";
import { v4 } from "uuid";

import { validate } from "api/tutorial/service/create/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

const userId = v4();

describe("TutorialService > create > validation > type-validation", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			result = await validate(("" as unknown) as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error with invalid user id type", async () => {
		let result;

		try {
			result = await validate({
				userId: 123 as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid user id", async () => {
		let result;

		try {
			result = await validate({
				userId: "123",
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId must be a valid UUID"],
		});
	});
});
