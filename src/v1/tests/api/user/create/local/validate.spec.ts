import { CreateLocalParams } from "v1/api/user/service/create/local";
import { validate } from "v1/api/user/service/create/local/validate";

import { invalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > create > local > validate", () => {
	const email = "foo@bar.com";
	const username = "example";
	const password = "p7qV%Ews";

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as CreateLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error without email", async () => {
		let result;

		try {
			await validate({
				username,
				password,
			} as CreateLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["email is a required field"],
		});
	});

	it("should throw an error with invalid email", async () => {
		let result;

		try {
			await validate({
				email: "invalid_email",
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["email must be a valid email"],
		});
	});

	it("should throw an error with invalid email type", async () => {
		let result;

		try {
			await validate({
				email: 123 as any,
				username,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"email must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without username", async () => {
		let result;

		try {
			await validate({
				email,
				password,
			} as CreateLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["username is a required field"],
		});
	});

	it("should throw an error with invalid username", async () => {
		let result;

		try {
			await validate({
				email,
				username: "foo@bar.com",
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["username must be a valid username"],
		});
	});

	it("should throw an error with invalid username type", async () => {
		let result;

		try {
			await validate({
				email,
				username: 123 as any,
				password,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"username must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without password", async () => {
		let result;

		try {
			await validate({
				email,
				username,
			} as CreateLocalParams);
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
				email,
				username,
				password: "123",
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
				email,
				username,
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
