import { CreateParams } from "api/settings/service/create";
import { v4 } from "uuid";

import { validate } from "api/settings/service/create/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";

const userId = v4();
const languageEnumAllowedValues = [...LanguageValues(), undefined].join(", ");

describe("SettingsService > create > validation", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
				language: LanguageEnum.EN,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (without language)", async () => {
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

	it("should throw an error with invalid language type", async () => {
		let result;

		try {
			await validate({
				userId,
				language: 123 as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`language must be one of the following values: ${languageEnumAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid language", async () => {
		let result;

		try {
			await validate({
				userId,
				language: "bar" as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`language must be one of the following values: ${languageEnumAllowedValues}`,
			],
		});
	});
});
