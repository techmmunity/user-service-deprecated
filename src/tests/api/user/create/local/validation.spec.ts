import { validate } from "api/user/service/create/local/validation";

import { TimeUtil } from "utils/time";
import { InvalidParamsErrorMessage } from "utils/yup";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";
import { LanguageEnum, LanguageValues } from "core/enums/language";

describe("UserService > create > local > validation", () => {
	const headlineEnumAllowedValues = HeadlineValues().join(", ");

	const languageEnumAllowedValues = LanguageValues().join(", ");

	it("should do nothing with valid mandatory params", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid mandatory and opitional params", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as any);
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

	it("should throw an error without email", async () => {
		let result;

		try {
			await validate({
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["email is a required field"],
		});
	});

	it("should throw an error with invalid email", async () => {
		let result;

		try {
			await validate({
				email: "invalidemail",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["email must be a valid email"],
		});
	});

	it("should throw an error with invalid email type", async () => {
		let result;

		try {
			await validate({
				email: 123 as any,
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"email must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without username", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["username is a required field"],
		});
	});

	it("should throw an error with invalid username", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "invalid@username",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["username must be a valid username"],
		});
	});

	it("should throw an error with invalid username type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: 123 as any,
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"username must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without full name", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["fullName is a required field"],
		});
	});

	it("should throw an error with invalid full name", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["fullName must have at least two words"],
		});
	});

	it("should throw an error with invalid full name type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: 123 as any,
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"fullName must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without password", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["password is a required field"],
		});
	});

	it("should throw an error with invalid password", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "weakpass",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"password must have at least 1 special character, 1 lower case character, 1 upper case character, 1 number and a lenght between 6 and 24 characters",
			],
		});
	});

	it("should throw an error with invalid password type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: 123 as any,
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"password must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without birthday", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["birthday is a required field"],
		});
	});

	it("should throw an error with invalid birthday", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2100, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
		});
		expect(
			result.response.errors[0].startsWith(
				"birthday field must be at earlier than ",
			),
		).toBe(true);
	});

	it("should throw an error with invalid birthday type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: 123 as any,
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"birthday must be a `date` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without headline", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["headline is a required field"],
		});
	});

	it("should throw an error with invalid headline", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: "invalid_headline" as any,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`headline must be one of the following values: ${headlineEnumAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid headline type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: 123 as any,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"headline must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid suggestedLanguage", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: "invalid_language" as any,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`suggestedLanguage must be one of the following values: ${languageEnumAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid suggestedLanguage type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: 123 as any,
				avatar: "https://avatarurl.com",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"suggestedLanguage must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid avatar", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: "invalid_url",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["avatar must be a valid URL"],
		});
	});

	it("should throw an error with invalid avatar type", async () => {
		let result;

		try {
			await validate({
				email: "test@email.com",
				username: "test",
				fullName: "Test User",
				password: "$trongPass123",
				birthday: TimeUtil.newDate([2000, 4, 15]),
				headline: HeadlineEnum.ANIMATOR,
				suggestedLanguage: LanguageEnum.EN,
				avatar: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"avatar must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
