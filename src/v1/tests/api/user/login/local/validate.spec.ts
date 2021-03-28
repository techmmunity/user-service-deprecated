import { LoginLocalParams } from "v1/api/user/service/login/local";
import { validate } from "v1/api/user/service/login/local/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > login > local > validation", () => {
	const email = "foo@bar.com";
	const username = "foo_bar";
	const password = "54GbrFz%";

	it("should do nothing with valid params (email)", async () => {
		let result;

		try {
			await validate({
				password,
				emailOrUsername: email,
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
				emailOrUsername: username,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as LoginLocalParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without emailOrUsername", async () => {
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
			errors: ["emailOrUsername is a required field"],
		});
	});

	it("should throw an error with invalid emailOrUsername", async () => {
		let result;

		try {
			await validate({
				password,
				emailOrUsername: "invalid@value",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["emailOrUsername must be a valid email or username"],
		});
	});

	it("should throw an error with invalid emailOrUsername type", async () => {
		let result;

		try {
			await validate({
				password,
				emailOrUsername: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"emailOrUsername must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without password", async () => {
		let result;

		try {
			await validate({
				emailOrUsername: username,
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
				emailOrUsername: username,
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
				emailOrUsername: username,
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
