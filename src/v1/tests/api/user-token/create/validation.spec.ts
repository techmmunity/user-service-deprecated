import { v4 } from "uuid";
import { CreateParams } from "v1/api/user-token/service/create";

import { validate } from "v1/api/user-token/service/create/validation";

import { TimeUtil } from "v1/utils/time";
import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { IntegrationsValues } from "core/enums/integrations";

describe("UserTokenService > create > validation", () => {
	const userId = v4();

	let expirationDate: Date;

	const integrationsEnumAllowedValues = IntegrationsValues().join(", ");

	beforeAll(() => {
		const now = TimeUtil.newDate().getTime();

		expirationDate = TimeUtil.newDate(now + TimeUtil.ONE_HOUR);
	});

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with ALL integration)", async () => {
		let result;

		try {
			await Promise.all(
				IntegrationsValues().map(integration =>
					validate({
						userId,
						type: integration,
						accessToken: "ACCESS_TOKEN",
						refreshToken: "REFRESH_TOKEN",
						expirationDate,
					} as CreateParams),
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
			await validate(("" as unknown) as CreateParams);
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

	it("should throw an error without userId", async () => {
		let result;

		try {
			await validate({} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["userId is a required field"],
		});
	});

	it("should throw an error with invalid userId", async () => {
		let result;

		try {
			await validate({
				userId: "123",
			} as CreateParams);
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

	it("should throw an error with invalid userId type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
			} as CreateParams);
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

	it("should throw an error with invalid type", async () => {
		let result;

		try {
			await validate({
				userId,
				type: "bar" as any,
			} as CreateParams);
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

	it("should throw an error with invalid type type", async () => {
		let result;

		try {
			await validate({
				userId,
				type: 123 as any,
			} as CreateParams);
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

	it("should throw an error with invalid expirationDate", async () => {
		let result;

		try {
			await validate({
				userId,
				expirationDate: TimeUtil.newDate(
					TimeUtil.newDate().getTime() - TimeUtil.ONE_DAY,
				),
			} as CreateParams);
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
				"expirationDate field must be later than ",
			),
		).toBe(true);
	});
});
