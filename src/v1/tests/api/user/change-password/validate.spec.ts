import { v4 } from "uuid";
import { ChangePasswordParams } from "v1/api/user/service/change-password";

import { validate } from "v1/api/user/service/change-password/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > change-password > validate", () => {
	const confirmationTokenId = v4();
	const newPassword = "t6@CKCR";

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as ChangePasswordParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without confirmationTokenId", async () => {
		let result;

		try {
			await validate({
				newPassword,
			} as ChangePasswordParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["confirmationTokenId is a required field"],
		});
	});

	it("should throw an error with invalid confirmationTokenId", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId: "123",
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["confirmationTokenId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid confirmationTokenId type", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId: 123 as any,
				newPassword,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"confirmationTokenId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without newPassword", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
			} as ChangePasswordParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["newPassword is a required field"],
		});
	});

	it("should throw an error with invalid newPassword", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword: "123",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"newPassword must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			],
		});
	});

	it("should throw an error with invalid newPassword type", async () => {
		let result;

		try {
			await validate({
				confirmationTokenId,
				newPassword: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"newPassword must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
