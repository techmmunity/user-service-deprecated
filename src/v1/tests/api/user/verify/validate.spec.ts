import { v4 } from "uuid";
import { VerifyParams } from "v1/api/user/service/verify";
import { validate } from "v1/api/user/service/verify/validate";

import { PinUtil } from "v1/utils/pin";
import { InvalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > verify > validation", () => {
	const userId = v4();
	const verificationCode = PinUtil.gen();

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as VerifyParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without userId", async () => {
		let result;

		try {
			await validate({
				verificationCode,
			} as VerifyParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId is a required field"],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid userId type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without verificationCode", async () => {
		let result;

		try {
			await validate({
				userId,
			} as VerifyParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["verificationCode is a required field"],
		});
	});

	it("should throw an error with invalid verificationCode", async () => {
		let result;

		try {
			await validate({
				userId,
				verificationCode: "13212321",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["verificationCode must be exactly 4 characters"],
		});
	});

	it("should throw an error with invalid verificationCode type", async () => {
		let result;

		try {
			await validate({
				userId,
				verificationCode: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"verificationCode must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
