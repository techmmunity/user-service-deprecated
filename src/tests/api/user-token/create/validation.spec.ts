import { CreateParams } from "api/user-token/service/create";
import { v4 } from "uuid";

import { validate } from "api/user-token/service/create/validation";

import { TimeUtil } from "utils/time";
import { InvalidParamsErrorMessage } from "utils/yup";

import { IntegrationsEnum, IntegrationsValues } from "core/enums/integrations";

const userId = v4();
const integrationsEnumAllowedValues = [...IntegrationsValues(), undefined].join(
	", ",
);

describe("UserTokenService > create > validation", () => {
	let expirationDate: Date;

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

	it("should do nothing with valid params (with DISCORD integration)", async () => {
		let result;

		try {
			await validate({
				userId,
				type: IntegrationsEnum.DISCORD,
				accessToken: "ACCESS_TOKEN",
				refreshToken: "REFRESH_TOKEN",
				expirationDate,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with GOOGLE integration)", async () => {
		let result;

		try {
			await validate({
				userId,
				type: IntegrationsEnum.GOOGLE,
				accessToken: "ACCESS_TOKEN",
				refreshToken: "REFRESH_TOKEN",
				expirationDate,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with GITHUB integration)", async () => {
		let result;

		try {
			await validate({
				userId,
				type: IntegrationsEnum.GITHUB,
				accessToken: "ACCESS_TOKEN",
				refreshToken: "REFRESH_TOKEN",
				expirationDate,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with LINKEDIN integration)", async () => {
		let result;

		try {
			await validate({
				userId,
				type: IntegrationsEnum.LINKEDIN,
				accessToken: "ACCESS_TOKEN",
				refreshToken: "REFRESH_TOKEN",
				expirationDate,
			} as CreateParams);
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

	it("should throw an error with invalid user id type", async () => {
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
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw an error with invalid user id", async () => {
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
			errors: [
				`type must be one of the following values: ${integrationsEnumAllowedValues}`,
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
});
