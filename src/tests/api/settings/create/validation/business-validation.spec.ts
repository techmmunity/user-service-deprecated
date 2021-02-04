import { CreateParams } from "api/settings/service/create";

import { businessValidation } from "api/settings/service/create/validation/business-validation";

import { LanguageEnum } from "core/enums/language";

describe("SettingsService > create > validation > business-validation", () => {
	it("should do nothing with valid language", () => {
		const result = businessValidation({
			language: LanguageEnum.EN,
		} as CreateParams);

		expect(result).toBeUndefined();
	});

	it("should do nothing with no language", () => {
		const result = businessValidation({} as CreateParams);

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid language", () => {
		let result;

		try {
			result = businessValidation({
				language: "invalid_language" as any,
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_LANGUAGE",
			statusCode: 400,
			errors: [],
		});
	});
});
