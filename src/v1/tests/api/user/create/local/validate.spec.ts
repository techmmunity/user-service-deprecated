import { CreateParams } from "v1/api/user/service/create/local";
import { validate } from "v1/api/user/service/create/local/validate";

import { TimeUtil } from "v1/utils/time";
import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";

describe("UserService > create > local > validation", () => {
	const birthday = new Date(new Date().getTime() - TimeUtil.ONE_YEAR * 10);

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without birthday", async () => {
		let result;

		try {
			await validate({
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["birthday is a required field"],
		});
	});

	it("should throw an error with invalid birthday", async () => {
		let result;

		try {
			await validate({
				birthday: new Date(new Date().getTime() + TimeUtil.ONE_DAY),
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response.errors.length).toBe(1);
		expect(
			result.response.errors[0].startsWith(
				"birthday field must be at earlier than ",
			),
		).toBeTruthy();
	});

	it("should throw an error with invalid birthday type", async () => {
		let result;

		try {
			await validate({
				birthday: 123 as any,
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"birthday must be a `date` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without email", async () => {
		let result;

		try {
			await validate({
				birthday,
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			} as CreateParams);
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
				birthday,
				email: "invalid_email",
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
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
				birthday,
				email: 123 as any,
				username: "example",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
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
				birthday,
				email: "foo@bar.com",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
			} as CreateParams);
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
				birthday,
				email: "foo@bar.com",
				username: "foo@bar.com",
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
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
				birthday,
				email: "foo@bar.com",
				username: 123 as any,
				password: "p7qV%Ews",
				headline: HeadlineEnum.ANIMATOR,
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
				birthday,
				email: "foo@bar.com",
				username: "example",
				headline: HeadlineEnum.ANIMATOR,
			} as CreateParams);
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
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: "123",
				headline: HeadlineEnum.ANIMATOR,
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
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: 123 as any,
				headline: HeadlineEnum.ANIMATOR,
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

	it("should throw an error without headline", async () => {
		let result;

		try {
			await validate({
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["headline is a required field"],
		});
	});

	it("should throw an error with invalid headline", async () => {
		let result;

		try {
			await validate({
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: "123" as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`headline must be one of the following values: ${HeadlineValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error with invalid headline type", async () => {
		let result;

		try {
			await validate({
				birthday,
				email: "foo@bar.com",
				username: "example",
				password: "p7qV%Ews",
				headline: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"headline must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
