import { UpdateParams } from "api/settings/service/update";
import { v4 } from "uuid";

import { validate } from "api/settings/service/update/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";
import { ThemeEnum, ThemeValues } from "core/enums/theme";

const userId = v4();
const languageEnumAllowedValues = LanguageValues().join(", ");
const themeEnumAllowedValues = ThemeValues().join(", ");

describe("SettingsService > update > validation", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await Promise.all([
				validate({
					userId,
					language: LanguageEnum.EN,
				}),
				validate({
					userId,
					language: LanguageEnum.PT_BR,
				}),
				validate({
					userId,
					theme: ThemeEnum.DARK,
				}),
				validate({
					userId,
					theme: ThemeEnum.LIGHT,
				}),
				validate({
					userId,
					language: LanguageEnum.EN,
					theme: ThemeEnum.LIGHT,
				}),
				validate({
					userId,
					language: LanguageEnum.EN,
					theme: ThemeEnum.DARK,
				}),
				validate({
					userId,
					language: LanguageEnum.PT_BR,
					theme: ThemeEnum.LIGHT,
				}),
				validate({
					userId,
					language: LanguageEnum.PT_BR,
					theme: ThemeEnum.DARK,
				}),
			]);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as UpdateParams);
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

	it("should throw an error with only user id", async () => {
		let result;

		try {
			await validate({
				userId,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["at least one field must be updated"],
		});
	});

	it("should throw an error with invalid user id type", async () => {
		let result;

		try {
			await validate({
				userId: 123 as any,
			} as UpdateParams);
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
			} as UpdateParams);
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
			} as UpdateParams);
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
			} as UpdateParams);
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

	it("should throw an error with invalid theme type", async () => {
		let result;

		try {
			await validate({
				userId,
				theme: 123 as any,
			} as UpdateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`theme must be one of the following values: ${themeEnumAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid theme", async () => {
		let result;

		try {
			await validate({
				userId,
				theme: "bar" as any,
			} as UpdateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`theme must be one of the following values: ${themeEnumAllowedValues}`,
			],
		});
	});
});
