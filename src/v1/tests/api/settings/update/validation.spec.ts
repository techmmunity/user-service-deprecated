import { v4 } from "uuid";
import { UpdateParams } from "v1/api/settings/service/update";

import { validate } from "v1/api/settings/service/update/validation";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";
import { ThemeValues } from "core/enums/theme";

describe("SettingsService > update > validation", () => {
	const userId = v4();

	const languageEnumAllowedValues = LanguageValues().join(", ");

	const themeEnumAllowedValues = ThemeValues().join(", ");

	it("should do nothing with valid params (with ALL languages)", async () => {
		let result;

		try {
			await Promise.all(
				LanguageValues().map(language =>
					validate({
						userId,
						language,
					}),
				),
			);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with ALL themes)", async () => {
		let result;

		try {
			await Promise.all(
				ThemeValues().map(theme =>
					validate({
						userId,
						theme,
					}),
				),
			);
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (with ALL languages and ALL themes)", async () => {
		let result;

		const languagesArray = LanguageValues();
		const themesArray = ThemeValues();

		try {
			await Promise.all(
				languagesArray
					.map(language => {
						themesArray.map(theme =>
							validate({
								userId,
								language,
								theme,
							}),
						);
					})
					.flat(),
			);
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

	it("should throw an error without userId", async () => {
		let result;

		try {
			await validate({} as any);
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

	it("should throw an error with only userId", async () => {
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

	it("should throw an error with invalid userId type", async () => {
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
			errors: [
				"userId must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid userId", async () => {
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
				"language must be a `string` type, but the final value was: `123`.",
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
				"theme must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
