import * as moment from "moment";
import { CreateOrLoginParams } from "v1/api/discord/service/create-or-login";

import { validate } from "v1/api/discord/service/create-or-login/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

describe("UserService > create > discord > validate", () => {
	const email = "foo@bar.com";
	const username = "foo_bar";
	const discordUserId = "308994132968210433";
	const discordAccessToken = "3bcrVOWjlrzlJWu240yODtJRHcZB1l";
	const discordRefreshToken = "CZhtkLDpNYXgPH9Ml6shqh2OwykChw";
	const discordExpirationDateMillis = moment().add(3, "days").valueOf();

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as CreateOrLoginParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without username", async () => {
		let result;

		try {
			await validate({
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			} as CreateOrLoginParams);
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
				username: "foo@bar.com",
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
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
				username: 123 as any,
				email,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
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

	it("should throw an error without email", async () => {
		let result;

		try {
			await validate({
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			} as CreateOrLoginParams);
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
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
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
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
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

	it("should throw an error without discordUserId", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			} as CreateOrLoginParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordUserId is a required field"],
		});
	});

	it("should throw an error with invalid discordUserId", async () => {
		let result;

		try {
			await validate({
				discordUserId: "abc",
				email,
				username,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordUserId must be a valid discord snowflake"],
		});
	});

	it("should throw an error with invalid discordUserId type", async () => {
		let result;

		try {
			await validate({
				discordUserId: 123 as any,
				email,
				username,
				discordAccessToken,
				discordRefreshToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"discordUserId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without discordAccessToken", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				discordUserId,
				discordRefreshToken,
				discordExpirationDateMillis,
			} as CreateOrLoginParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordAccessToken is a required field"],
		});
	});

	it("should throw an error with invalid discordAccessToken type", async () => {
		let result;

		try {
			await validate({
				discordAccessToken: 123 as any,
				email,
				username,
				discordUserId,
				discordRefreshToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"discordAccessToken must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without discordRefreshToken", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordExpirationDateMillis,
			} as CreateOrLoginParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordRefreshToken is a required field"],
		});
	});

	it("should throw an error with invalid discordRefreshToken type", async () => {
		let result;

		try {
			await validate({
				discordRefreshToken: 123 as any,
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"discordRefreshToken must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with discordRefreshToken = discordAccessToken", async () => {
		let result;

		try {
			await validate({
				discordRefreshToken: discordAccessToken,
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordExpirationDateMillis,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"These fields must have unique values: discordAccessToken, discordRefreshToken",
			],
		});
	});

	it("should throw an error without discordExpirationDateMillis", async () => {
		let result;

		try {
			await validate({
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
			} as CreateOrLoginParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordExpirationDateMillis is a required field"],
		});
	});

	it("should throw an error with invalid discordExpirationDateMillis (past)", async () => {
		let result;

		try {
			await validate({
				discordExpirationDateMillis: moment().add(-1, "day").valueOf(),
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordExpirationDateMillis must be a date in the future"],
		});
	});

	it("should throw an error with invalid discordExpirationDateMillis (present)", async () => {
		let result;

		try {
			await validate({
				discordExpirationDateMillis: moment().valueOf(),
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["discordExpirationDateMillis must be a date in the future"],
		});
	});

	it("should throw an error with invalid discordUserId type", async () => {
		let result;

		try {
			await validate({
				discordExpirationDateMillis: "123" as any,
				email,
				username,
				discordUserId,
				discordAccessToken,
				discordRefreshToken,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				'discordExpirationDateMillis must be a `number` type, but the final value was: `"123"`.',
			],
		});
	});
});
