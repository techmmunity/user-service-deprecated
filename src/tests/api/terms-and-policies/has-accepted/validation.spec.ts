import { HasAcceptedParams } from "api/terms-and-policies/service/has-accepted";
import { v4 } from "uuid";

import { validate } from "api/terms-and-policies/service/has-accepted/validation";

import { InvalidParamsErrorMessage } from "utils/yup";

import { TERMS_AND_POLICIES_ALLOWED_VERSIONS } from "config/terms-and-policies";

const userId = v4();
const veriosnAllowedValues = TERMS_AND_POLICIES_ALLOWED_VERSIONS.join(", ");

describe("TermsAndPoliciesService > hasAccepted > validation", () => {
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
