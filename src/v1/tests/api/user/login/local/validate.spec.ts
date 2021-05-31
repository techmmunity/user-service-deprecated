import { LoginLocalParams } from "v1/api/user/service/login/local";

import { validate } from "v1/api/user/service/login/local/validate";

import { invalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > login > local > validate", () => {
	const email = "foo@bar.com";
	const username = "foo_bar";
	const password = "54GbrFz%";

	it("should do nothing with valid params (email)", async () => {
		let result;

		try {
			await validate({
				password,
				identifier: email,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (username)", async () => {
		let result;

		try {
			await validate({
				password,
				identifier: username,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as LoginLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error without identifier", async () => {
		let result;

		try {
			await validate({
				password,
			} as LoginLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["identifier is a required field"],
		});
	});

	it("should throw an error with invalid identifier", async () => {
		let result;

		try {
			await validate({
				password,
				identifier: "invalid@value",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["identifier must be a valid email or username"],
		});
	});

	it("should throw an error with invalid identifier type", async () => {
		let result;

		try {
			await validate({
				password,
				identifier: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"identifier must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without password", async () => {
		let result;

		try {
			await validate({
				identifier: username,
			} as LoginLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["password is a required field"],
		});
	});

	it("should throw an error with invalid password", async () => {
		let result;

		try {
			await validate({
				identifier: username,
				password: "weak_password",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			],
		});
	});

	it("should throw an error with invalid password type", async () => {
		let result;

		try {
			await validate({
				identifier: username,
				password: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"password must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
