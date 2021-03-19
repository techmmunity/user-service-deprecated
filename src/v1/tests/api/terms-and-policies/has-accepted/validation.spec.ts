import { v4 } from "uuid";
import { HasAcceptedParams } from "v1/api/terms-and-policies/service/has-accepted";

import { validate } from "v1/api/terms-and-policies/service/has-accepted/validation";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { TERMS_AND_POLICIES_ALLOWED_VERSIONS } from "v1/config/terms-and-policies";

describe("TermsAndPoliciesService > hasAccepted > validation", () => {
	const userId = v4();

	const veriosnAllowedValues = TERMS_AND_POLICIES_ALLOWED_VERSIONS.join(", ");

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				userId,
				version: 1,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as HasAcceptedParams);
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
			await validate({
				version: 1,
			} as HasAcceptedParams);
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
				version: 1,
			} as HasAcceptedParams);
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
				version: 1,
			} as HasAcceptedParams);
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

	it("should throw an error without version", async () => {
		let result;

		try {
			await validate({
				userId,
			} as HasAcceptedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: ["version is a required field"],
		});
	});

	it("should throw an error with invalid version", async () => {
		let result;

		try {
			await validate({
				userId,
				version: 999999,
			} as HasAcceptedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				`version must be one of the following values: ${veriosnAllowedValues}`,
			],
		});
	});

	it("should throw an error with invalid version type", async () => {
		let result;

		try {
			await validate({
				userId,
				version: "1" as any,
			} as HasAcceptedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			code: "INVALID_PARAMS",
			statusCode: 400,
			errors: [
				'version must be a `number` type, but the final value was: `"1"`.',
			],
		});
	});
});
