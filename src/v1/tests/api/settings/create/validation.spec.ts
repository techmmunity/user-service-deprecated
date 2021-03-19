import { v4 } from "uuid";
import { CreateParams } from "v1/api/settings/service/create";

import { validate } from "v1/api/settings/service/create/validation";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageValues } from "core/enums/language";

describe("SettingsService > create > validation", () => {
	const userId = v4();

	const languageEnumAllowedValues = LanguageValues().join(", ");

	it("should do nothing with valid params", async () => {
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

	it("should do nothing with valid params (without language)", async () => {
		let result;

		try {
			await validate({
				userId,
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
				"language must be a `string` type, but the final value was: `123`.",
			],
		});
	});
});
