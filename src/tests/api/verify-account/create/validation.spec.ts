import { CreateVerificationCodeParams } from "api/verify-account/service/create";
import { v4 } from "uuid";

import { validate } from "api/verify-account/service/create/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

const userId = v4();

describe("VerifyAccountService > create > validation", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
			} as CreateVerificationCodeParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as CreateVerificationCodeParams);
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

	it("should throw an error with invalid userId type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
			} as CreateVerificationCodeParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
			} as CreateVerificationCodeParams);
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
