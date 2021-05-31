import { v4 } from "uuid";
import { VerifyParams } from "v1/api/confirmation-token/service/verify";

import { validate } from "v1/api/confirmation-token/service/verify/validate";

import { pinUtil } from "v1/utils/pin";
import { invalidParamsErrorMessage } from "v1/utils/yup";

describe("ConfirmationTokenService > verify > validate", () => {
	const contactId = v4();
	const verificationCode = pinUtil.gen(6);

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				contactId,
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
			await validate("" as unknown as VerifyParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error without contactId", async () => {
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
			errors: ["contactId is a required field"],
		});
	});

	it("should throw an error with invalid contactId", async () => {
		let result;

		try {
			await validate({
				contactId: "123",
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contactId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid contactId type", async () => {
		let result;

		try {
			await validate({
				contactId: 123 as any,
				verificationCode,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contactId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without verificationCode", async () => {
		let result;

		try {
			await validate({
				contactId,
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
				contactId,
				verificationCode: "13212321",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["verificationCode must be exactly 6 characters"],
		});
	});

	it("should throw an error with invalid verificationCode type", async () => {
		let result;

		try {
			await validate({
				contactId,
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
