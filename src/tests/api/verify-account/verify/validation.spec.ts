import { VerifyAccountParams } from "api/verify-account/service/verify";
import { v4 } from "uuid";

import { validate } from "api/verify-account/service/verify/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

describe("VerifyAccountService > verify > validation", () => {
	const confirmationCode = v4();

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				confirmationCode,
			} as VerifyAccountParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as VerifyAccountParams);
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

	it("should throw an error without confirmationCode", async () => {
		let result;

		try {
			await validate({} as VerifyAccountParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["confirmationCode is a required field"],
		});
	});

	it("should throw an error with invalid confirmationCode", async () => {
		let result;

		try {
			await validate({
				confirmationCode: "123",
			} as VerifyAccountParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["confirmationCode must be a valid UUID"],
		});
	});

	it("should throw an error with invalid confirmationCode type", async () => {
		let result;

		try {
			await validate({
				confirmationCode: 123 as any,
			} as VerifyAccountParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"confirmationCode must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
