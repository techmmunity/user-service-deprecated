import { UpdateTokenParams } from "api/user-token/service/update";
import { v4 } from "uuid";

import { validate } from "api/user-token/service/update/validation";

import { TimeUtil } from "utils/time";
import { InvalidParamsErrorMessage } from "utils/yup";

import { IntegrationsEnum, IntegrationsValues } from "core/enums/integrations";

const userId = v4();
const integrationsEnumAllowedValues = IntegrationsValues().join(", ");

describe("UserTokenService > update > validation", () => {
	let expirationDate: Date;
	let invalidExpirationDate: Date;

	beforeAll(() => {
		const now = TimeUtil.newDate().getTime();

		expirationDate = TimeUtil.newDate(now + TimeUtil.ONE_HOUR);
		invalidExpirationDate = TimeUtil.newDate(now - TimeUtil.ONE_HOUR);
	});

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await Promise.all(
				IntegrationsValues().map(integration =>
					validate({
						userId,
						expirationDate,
						type: integration as IntegrationsEnum,
						accessToken: "foo_bar",
						refreshToken: "foo_bar",
					}),
				),
			);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as UpdateTokenParams);
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

	it("should throw an error with invalid user id type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid user id", async () => {
		let result;

		try {
			await validate({
				userId: "123",
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid access token type", async () => {
		let result;

		try {
			await validate({
				accessToken: 123 as any,
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"accessToken must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid refresh token type", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: 123 as any,
				type: IntegrationsEnum.DISCORD,
				expirationDate,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"refreshToken must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid type type", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: 123 as any,
				expirationDate,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["type must be a `string` type, but the final value was: `123`."],
		});
	});

	it("should throw an error with invalid type", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: "foo+_bar" as any,
				expirationDate,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`type must be one of the following values: ${integrationsEnumAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid expiration date type (number)", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate: 123 as any,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				"expirationDate must be a `date` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid expiration date type (string)", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate: "123" as any,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				'expirationDate must be a `date` type, but the final value was: `"123"`.',
			],
		});
	});

	it("should throw an error with invalid expiration date", async () => {
		let result;

		try {
			await validate({
				accessToken: "foo_bar",
				refreshToken: "foo_bar",
				type: IntegrationsEnum.DISCORD,
				expirationDate: invalidExpirationDate,
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toEqual(
			expect.objectContaining({
				code: "INVALID_PARAMS",
				statusCode: 400,
			}),
		);
		expect(
			result.response.errors[0].startsWith(
				"expirationDate field must be later than ",
			),
		).toBeTruthy();
	});
});
